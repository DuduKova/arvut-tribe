import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";
import { jsonNoStore, requireAdminApiUser } from "@/lib/admin/auth";
import {
  SUBMISSION_STATUSES,
  SUBMISSION_TYPES,
  type AdminSubmissionDetail,
  type SubmissionStatus,
  type SubmissionType,
} from "@/lib/admin/types";

export const dynamic = "force-dynamic";

const routeParamsSchema = z.object({
  type: z.enum(SUBMISSION_TYPES),
  id: z.string().uuid(),
});

const updateSchema = z
  .object({
    status: z.enum(SUBMISSION_STATUSES).optional(),
    notes: z.union([z.string().max(10000), z.null()]).optional(),
  })
  .refine((value) => value.status !== undefined || value.notes !== undefined, {
    message: "At least one field (status or notes) must be provided",
  });

interface SubmissionRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  status: SubmissionStatus;
  notes: string | null;
  form_data: Record<string, unknown> | null;
}

function getSubmissionTable(type: SubmissionType) {
  return type === "healer" ? "healer_applications" : "patient_registrations";
}

function toDetail(row: SubmissionRow, type: SubmissionType): AdminSubmissionDetail {
  return {
    id: row.id,
    submissionType: type,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone,
    status: row.status,
    notes: row.notes,
    formData: row.form_data,
  };
}

async function parseRouteParams(context: { params: Promise<{ type: string; id: string }> }) {
  const params = await context.params;
  const parsed = routeParamsSchema.safeParse(params);

  if (!parsed.success) {
    return {
      error: jsonNoStore(
        {
          error: "Invalid route parameters",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      ),
      params: null,
    };
  }

  return { error: null, params: parsed.data };
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ type: string; id: string }> },
) {
  const auth = await requireAdminApiUser();
  if ("response" in auth) {
    return auth.response;
  }

  const parsedRoute = await parseRouteParams(context);
  if (parsedRoute.error) {
    return parsedRoute.error;
  }

  const { type, id } = parsedRoute.params;
  const tableName = getSubmissionTable(type);

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from(tableName)
    .select("id,created_at,name,email,phone,status,notes,form_data")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return jsonNoStore(
      { error: "Failed to fetch submission", details: error.message },
      { status: 500 },
    );
  }

  if (!data) {
    return jsonNoStore({ error: "Submission not found" }, { status: 404 });
  }

  return jsonNoStore({ data: toDetail(data as SubmissionRow, type) });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ type: string; id: string }> },
) {
  const auth = await requireAdminApiUser();
  if ("response" in auth) {
    return auth.response;
  }

  const parsedRoute = await parseRouteParams(context);
  if (parsedRoute.error) {
    return parsedRoute.error;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonNoStore({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsedBody = updateSchema.safeParse(body);
  if (!parsedBody.success) {
    return jsonNoStore(
      {
        error: "Invalid request body",
        details: parsedBody.error.flatten(),
      },
      { status: 400 },
    );
  }

  const { type, id } = parsedRoute.params;
  const tableName = getSubmissionTable(type);

  const updates: Record<string, string | null> = {};
  if (parsedBody.data.status !== undefined) {
    updates.status = parsedBody.data.status;
  }

  if (parsedBody.data.notes !== undefined) {
    if (typeof parsedBody.data.notes === "string") {
      const trimmedNotes = parsedBody.data.notes.trim();
      updates.notes = trimmedNotes.length > 0 ? trimmedNotes : null;
    } else {
      updates.notes = null;
    }
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from(tableName)
    .update(updates)
    .eq("id", id)
    .select("id,created_at,name,email,phone,status,notes,form_data")
    .maybeSingle();

  if (error) {
    return jsonNoStore(
      { error: "Failed to update submission", details: error.message },
      { status: 500 },
    );
  }

  if (!data) {
    return jsonNoStore({ error: "Submission not found" }, { status: 404 });
  }

  return jsonNoStore({ data: toDetail(data as SubmissionRow, type) });
}
