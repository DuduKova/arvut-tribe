"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import SubmissionDetailPanel from "@/components/admin/SubmissionDetailPanel";
import type {
  AdminSubmissionListItem,
  AdminSubmissionListResponse,
  SubmissionStatus,
  SubmissionType,
} from "@/lib/admin/types";

const PAGE_SIZE = 25;

interface AdminQueueProps {
  locale: string;
}

export default function AdminQueue({ locale }: AdminQueueProps) {
  const t = useTranslations("admin.queue");
  const tErrors = useTranslations("admin.errors");
  const router = useRouter();

  const [items, setItems] = useState<AdminSubmissionListItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [typeFilter, setTypeFilter] = useState<"all" | SubmissionType>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | SubmissionStatus>("all");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selected, setSelected] = useState<
    { id: string; submissionType: SubmissionType } | null
  >(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [typeFilter, statusFilter, debouncedSearch]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchList = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(PAGE_SIZE),
        });

        if (typeFilter !== "all") {
          params.set("type", typeFilter);
        }

        if (statusFilter !== "all") {
          params.set("status", statusFilter);
        }

        if (debouncedSearch) {
          params.set("search", debouncedSearch);
        }

        const response = await fetch(`/api/admin/submissions?${params.toString()}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (response.status === 401) {
          router.push(`/${locale}/admin/login`);
          return;
        }

        if (response.status === 403) {
          setError(tErrors("forbidden"));
          return;
        }

        const payload = (await response.json()) as
          | AdminSubmissionListResponse
          | { error?: string };

        if (!response.ok || !("data" in payload)) {
          const responseError = "error" in payload ? payload.error : undefined;
          throw new Error(responseError || t("errorFallback"));
        }

        setItems(payload.data);
        setTotal(payload.total);
        setTotalPages(Math.max(payload.totalPages, 1));
      } catch (fetchError) {
        if (controller.signal.aborted) {
          return;
        }

        const message =
          fetchError instanceof Error ? fetchError.message : t("errorFallback");
        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchList();

    return () => controller.abort();
  }, [debouncedSearch, locale, page, reloadKey, router, statusFilter, t, tErrors, typeFilter]);

  const statusLabelByValue: Record<SubmissionStatus, string> = useMemo(
    () => ({
      pending: t("statusPending"),
      approved: t("statusApproved"),
      rejected: t("statusRejected"),
    }),
    [t],
  );

  const statusClassByValue: Record<SubmissionStatus, string> = {
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-emerald-100 text-emerald-800",
    rejected: "bg-rose-100 text-rose-800",
  };

  const onSaved = () => {
    setReloadKey((value) => value + 1);
  };

  const disablePrev = page <= 1;
  const disableNext = page >= totalPages;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{t("title")}</h1>
        <p className="mt-1 text-sm text-gray-600">{t("description")}</p>
      </div>

      <div className="rounded-lg border bg-white p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value as "all" | SubmissionType)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="all">{t("allTypes")}</option>
            <option value="healer">{t("typeHealer")}</option>
            <option value="patient">{t("typePatient")}</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as "all" | SubmissionStatus)
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="all">{t("allStatuses")}</option>
            <option value="pending">{t("statusPending")}</option>
            <option value="approved">{t("statusApproved")}</option>
            <option value="rejected">{t("statusRejected")}</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-start text-xs font-medium uppercase tracking-wide text-gray-500">
                  {t("createdAt")}
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium uppercase tracking-wide text-gray-500">
                  {t("name")}
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium uppercase tracking-wide text-gray-500">
                  {t("email")}
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium uppercase tracking-wide text-gray-500">
                  {t("phone")}
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium uppercase tracking-wide text-gray-500">
                  {t("type")}
                </th>
                <th className="px-4 py-3 text-start text-xs font-medium uppercase tracking-wide text-gray-500">
                  {t("status")}
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-sm">
              {isLoading && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-600">
                    {t("loading")}
                  </td>
                </tr>
              )}

              {!isLoading && error && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-red-700">
                    {error}
                  </td>
                </tr>
              )}

              {!isLoading && !error && items.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-600">
                    {t("empty")}
                  </td>
                </tr>
              )}

              {!isLoading &&
                !error &&
                items.map((item) => (
                  <tr key={`${item.submissionType}-${item.id}`} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                      {new Intl.DateTimeFormat(locale === "he" ? "he-IL" : "en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(item.createdAt))}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{item.name}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">{item.email}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">{item.phone}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                      {item.submissionType === "healer" ? t("typeHealer") : t("typePatient")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          statusClassByValue[item.status]
                        }`}
                      >
                        {statusLabelByValue[item.status]}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-end">
                      <button
                        type="button"
                        onClick={() =>
                          setSelected({
                            id: item.id,
                            submissionType: item.submissionType,
                          })
                        }
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                      >
                        {t("open")}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-gray-50 px-4 py-3">
          <p className="text-sm text-gray-600">{t("total", { count: total })}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
              disabled={disablePrev}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {t("prev")}
            </button>
            <span className="text-sm text-gray-700">
              {t("pagination", { page, totalPages })}
            </span>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(current + 1, totalPages))}
              disabled={disableNext}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {t("next")}
            </button>
          </div>
        </div>
      </div>

      <SubmissionDetailPanel
        locale={locale}
        selected={selected}
        onClose={() => setSelected(null)}
        onSaved={onSaved}
      />
    </div>
  );
}
