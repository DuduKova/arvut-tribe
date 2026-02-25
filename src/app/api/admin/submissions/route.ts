import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";
import {
  requireAdminApiUser,
  jsonNoStore,
} from "@/lib/admin/auth";
import {
  SUBMISSION_STATUSES,
  SUBMISSION_TYPES,
  type AdminSubmissionListItem,
  type SubmissionStatus,
  type SubmissionType,
} from "@/lib/admin/types";

export const dynamic = "force-dynamic";

const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
  type: z.enum(SUBMISSION_TYPES).optional(),
  status: z.enum(SUBMISSION_STATUSES).optional(),
  search: z.string().trim().max(200).optional(),
});

interface AdminSubmissionRow {
  submission_type: SubmissionType;
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  status: SubmissionStatus;
  notes: string | null;
}

function normalizeSearchTerm(search: string | undefined) {
  if (!search) {
    return "";
  }

  return search
    .replace(/[,%]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toListItem(row: AdminSubmissionRow): AdminSubmissionListItem {
  return {
    id: row.id,
    submissionType: row.submission_type,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone,
    status: row.status,
    notes: row.notes,
  };
}

export async function GET(request: Request) {
  const auth = await requireAdminApiUser();
  if ("response" in auth) {
    return auth.response;
  }

  const url = new URL(request.url);
  const parseResult = querySchema.safeParse({
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    type: url.searchParams.get("type") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
  });

  if (!parseResult.success) {
    return jsonNoStore(
      {
        error: "Invalid query parameters",
        details: parseResult.error.flatten(),
      },
      { status: 400 },
    );
  }

  const { page, pageSize, type, status, search } = parseResult.data;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const normalizedSearch = normalizeSearchTerm(search);

  const supabase = createServiceClient();
  let query = supabase
    .from("admin_submissions")
    .select(
      "submission_type,id,created_at,name,email,phone,status,notes",
      { count: "exact" },
    )
    .order("created_at", { ascending: false });

  if (type) {
    query = query.eq("submission_type", type);
  }

  if (status) {
    query = query.eq("status", status);
  }

  if (normalizedSearch) {
    query = query.or(
      `name.ilike.%${normalizedSearch}%,email.ilike.%${normalizedSearch}%,phone.ilike.%${normalizedSearch}%`,
    );
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    return jsonNoStore(
      { error: "Failed to fetch submissions", details: error.message },
      { status: 500 },
    );
  }

  const rows = (data ?? []) as AdminSubmissionRow[];
  const total = count ?? 0;
  const totalPages = total === 0 ? 1 : Math.ceil(total / pageSize);

  return jsonNoStore({
    data: rows.map(toListItem),
    page,
    pageSize,
    total,
    totalPages,
  });
}
