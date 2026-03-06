"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { buildReadableFormSections } from "@/lib/admin/formDataPresentation";
import type {
  AdminSubmissionDetail,
  SubmissionStatus,
  SubmissionType,
  UpdateSubmissionPayload,
} from "@/lib/admin/types";

interface SubmissionDetailRef {
  id: string;
  submissionType: SubmissionType;
}

interface SubmissionDetailPanelProps {
  locale: string;
  selected: SubmissionDetailRef | null;
  onClose: () => void;
  onSaved: (submission: AdminSubmissionDetail) => void;
}

function formatDateTime(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "he" ? "he-IL" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function SubmissionDetailPanel({
  locale,
  selected,
  onClose,
  onSaved,
}: SubmissionDetailPanelProps) {
  const tDetail = useTranslations("admin.detail");
  const tQueue = useTranslations("admin.queue");
  const tErrors = useTranslations("admin.errors");
  const router = useRouter();

  const [detail, setDetail] = useState<AdminSubmissionDetail | null>(null);
  const [status, setStatus] = useState<SubmissionStatus>("pending");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const isOpen = Boolean(selected);
  const isHebrew = locale === "he";

  useEffect(() => {
    if (!selected) {
      setDetail(null);
      setError(null);
      setSaveMessage(null);
      return;
    }

    const controller = new AbortController();

    const loadDetail = async () => {
      setIsLoading(true);
      setError(null);
      setSaveMessage(null);

      try {
        const response = await fetch(
          `/api/admin/submissions/${selected.submissionType}/${selected.id}`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (response.status === 401) {
          router.push(`/${locale}/admin/login`);
          return;
        }

        if (response.status === 403) {
          setError(tErrors("forbidden"));
          return;
        }

        const result = (await response.json()) as {
          data?: AdminSubmissionDetail;
          error?: string;
        };

        if (!response.ok || !result.data) {
          throw new Error(result.error || tDetail("errorFallback"));
        }

        setDetail(result.data);
        setStatus(result.data.status);
        setNotes(result.data.notes ?? "");
      } catch (loadError) {
        if (controller.signal.aborted) {
          return;
        }

        const message =
          loadError instanceof Error ? loadError.message : tDetail("errorFallback");
        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadDetail();

    return () => controller.abort();
  }, [locale, router, selected, tDetail, tErrors]);

  const hasChanges = useMemo(() => {
    if (!detail) {
      return false;
    }

    const normalizedIncomingNotes = notes.trim();
    const normalizedStoredNotes = (detail.notes ?? "").trim();
    return status !== detail.status || normalizedIncomingNotes !== normalizedStoredNotes;
  }, [detail, notes, status]);

  const handleSave = async () => {
    if (!detail || !hasChanges) {
      return;
    }

    const payload: UpdateSubmissionPayload = {};

    if (status !== detail.status) {
      payload.status = status;
    }

    const normalizedNotes = notes.trim();
    const normalizedStoredNotes = (detail.notes ?? "").trim();
    if (normalizedNotes !== normalizedStoredNotes) {
      payload.notes = normalizedNotes.length > 0 ? normalizedNotes : null;
    }

    setIsSaving(true);
    setError(null);
    setSaveMessage(null);

    try {
      const response = await fetch(
        `/api/admin/submissions/${detail.submissionType}/${detail.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.status === 401) {
        router.push(`/${locale}/admin/login`);
        return;
      }

      if (response.status === 403) {
        setError(tErrors("forbidden"));
        return;
      }

      const result = (await response.json()) as {
        data?: AdminSubmissionDetail;
        error?: string;
      };

      if (!response.ok || !result.data) {
        throw new Error(result.error || tDetail("errorFallback"));
      }

      setDetail(result.data);
      setStatus(result.data.status);
      setNotes(result.data.notes ?? "");
      setSaveMessage(tDetail("saved"));
      onSaved(result.data);
    } catch (saveError) {
      const message =
        saveError instanceof Error ? saveError.message : tDetail("errorFallback");
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !selected) {
    return null;
  }

  const statusLabelByValue: Record<SubmissionStatus, string> = {
    pending: tQueue("statusPending"),
    approved: tQueue("statusApproved"),
    rejected: tQueue("statusRejected"),
  };
  const readableFormSections = detail
    ? buildReadableFormSections(detail.submissionType, detail.formData, locale)
    : [];

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/35" onClick={onClose} />
      <aside
        className={`absolute top-0 h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl ${
          isHebrew ? "left-0" : "right-0"
        }`}
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">{tDetail("title")}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
          >
            {tDetail("close")}
          </button>
        </div>

        {isLoading && <p className="px-6 py-4 text-sm text-gray-600">{tDetail("loading")}</p>}

        {!isLoading && error && (
          <p className="px-6 py-4 text-sm text-red-700">{error}</p>
        )}

        {!isLoading && detail && (
          <div className="space-y-6 px-6 py-5">
            <div className="grid gap-4 rounded-lg border bg-gray-50 p-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">{tQueue("type")}</p>
                <p className="text-sm font-medium text-gray-900">
                  {detail.submissionType === "healer"
                    ? tQueue("typeHealer")
                    : tQueue("typePatient")}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">{tDetail("submittedAt")}</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDateTime(detail.createdAt, locale)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">{tQueue("name")}</p>
                <p className="text-sm font-medium text-gray-900">{detail.name}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">{tQueue("email")}</p>
                <p className="text-sm font-medium text-gray-900">{detail.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">{tQueue("phone")}</p>
                <p className="text-sm font-medium text-gray-900">{detail.phone}</p>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {tDetail("status")}
                  </label>
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value as SubmissionStatus)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  >
                    {Object.entries(statusLabelByValue).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {tDetail("notes")}
                </label>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder={tDetail("notesPlaceholder")}
                  rows={5}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {saveMessage && <p className="mt-3 text-sm text-emerald-700">{saveMessage}</p>}

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!hasChanges || isSaving}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? tDetail("saving") : tDetail("save")}
                </button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">{tDetail("formData")}</h3>
              {readableFormSections.length > 0 ? (
                <div className="space-y-4">
                  {readableFormSections.map((section) => (
                    <section key={section.id} className="space-y-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {section.title}
                      </h4>
                      <dl className="space-y-3 rounded-md bg-gray-50 p-3">
                        {section.fields.map((field) => (
                          <div key={field.key} className="space-y-1 md:grid md:grid-cols-[13rem_1fr] md:gap-4">
                            <dt className="text-xs font-medium text-gray-600">{field.label}</dt>
                            <dd
                              className={`text-sm text-gray-900 whitespace-pre-wrap break-words ${
                                field.isStructuredValue ? "font-mono text-xs leading-relaxed" : ""
                              }`}
                            >
                              {field.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">{tDetail("noData")}</p>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
