"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronLeft, ChevronRight, ChevronDown, Briefcase } from "lucide-react";
import { htechService } from "@/common/services/htech.service";
import { getLocalizedField } from "@/common/utils/localizedField";
import { useClientTranslation } from "@/i18n";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FieldOfWork {
  id: number;
  name_vn: string;
  name_en: string;
  slug: string;
}

interface Job {
  id: number;
  title_vn: string;
  title_en?: string;
  slug: string;
  job_type_vn?: string;
  job_type_en?: string;
  experience_vn?: string;
  experience_en?: string;
  field_of_work_id: number;
  field_of_work?: FieldOfWork;
  description_vn: string;
  description_en?: string;
  recruitment_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Dropdown Component ───────────────────────────────────────────────────────

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label || label;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
          value
            ? "border-[#EF5941] bg-[#FFF0ED] text-[#EF5941]"
            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
        }`}
      >
        {selectedLabel}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 min-w-[180px] rounded-xl border border-gray-100 bg-white py-1.5 shadow-xl z-50">
          <button
            onClick={() => { onChange(""); setOpen(false); }}
            className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-[#FFF0ED] hover:text-[#EF5941] ${
              !value ? "text-[#EF5941] font-medium" : "text-gray-600"
            }`}
          >
            {label}
          </button>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-[#FFF0ED] hover:text-[#EF5941] ${
                value === opt.value ? "text-[#EF5941] font-medium" : "text-gray-600"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Skeleton Card ───────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 p-6 animate-pulse shadow-sm">
      <div className="h-4 bg-gray-200 rounded w-20 mb-4" />
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-6" />
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-9 bg-gray-200 rounded-full w-24" />
      </div>
    </div>
  );
}

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({
  job,
  index,
  lng,
  t,
}: {
  job: Job;
  index: number;
  lng: string;
  t: (key: string) => string;
}) {
  const title = getLocalizedField(job, "title", lng);
  const description = getLocalizedField(job, "description", lng);
  const jobType = getLocalizedField(job, "job_type", lng);
  const experience = getLocalizedField(job, "experience", lng);

  // Strip HTML tags for card preview
  const plainDescription = description
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Determine salary display: nếu description chứa VND thì lấy, nếu không thì "Thỏa thuận"
  const salaryMatch = description.match(/(\d[\d.,]*\s*VND)/i);
  const salaryText = salaryMatch ? `${t("jobs_salary_prefix")} ${salaryMatch[1]}` : t("jobs_salary_nego");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      className="group relative flex flex-col rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:border-[#EF5941]/20 transition-all duration-300"
    >
      {/* Job Type Badge */}
      {jobType && (
        <span className="inline-flex items-center self-start rounded-md text-xs font-semibold uppercase tracking-wider text-[#EF5941] mb-3">
          {jobType}
        </span>
      )}

      {/* Title */}
      <h3 className="text-lg font-bold text-[#1E0D01] leading-snug line-clamp-2 group-hover:text-[#EF5941] transition-colors duration-200 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed flex-1 mb-5">
        {plainDescription}
      </p>

      {/* Footer: Salary + Apply Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <span className={`text-sm font-semibold ${salaryMatch ? "text-[#EF5941]" : "text-[#EF5941]"}`}>
          {salaryText}
        </span>
        {job.recruitment_url ? (
          <a
            href={job.recruitment_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#EF5941] px-5 py-2 text-sm font-semibold text-[#EF5941] hover:bg-[#EF5941] hover:text-white transition-all duration-200"
          >
            {t("jobs_apply")}
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EF5941] px-5 py-2 text-sm font-semibold text-[#EF5941] hover:bg-[#EF5941] hover:text-white transition-all duration-200 cursor-pointer">
            {t("jobs_apply")}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Props {
  lng: string;
}

export default function JobsListSection({ lng }: Props) {
  const { t } = useClientTranslation(lng);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [fieldsOfWork, setFieldsOfWork] = useState<FieldOfWork[]>([]);
  const [meta, setMeta] = useState<Meta>({ total: 0, page: 1, limit: 6, totalPages: 1 });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [filterField, setFilterField] = useState("");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [fieldsLoading, setFieldsLoading] = useState(true);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Debounce search ──────────────────────────────────────────────────────
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [search]);

  // ── Reset page on filter change ──────────────────────────────────────────
  useEffect(() => {
    setPage(1);
  }, [filterType, filterExperience, filterField]);

  // ── Fetch fields of work ─────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res: any = await htechService.getFieldsOfWork();
        setFieldsOfWork(res?.data ?? []);
      } catch {
        /* silent */
      } finally {
        setFieldsLoading(false);
      }
    })();
  }, []);

  // ── Fetch jobs ───────────────────────────────────────────────────────────
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 6, orderBy: "sort_order", sortBy: "asc" };
      if (debouncedSearch) params.search = debouncedSearch;
      if (filterType) params.job_type = filterType;
      if (filterExperience) params.experience = filterExperience;
      if (filterField) params.field_of_work_id = Number(filterField);

      const res: any = await htechService.getAllJobs(params);
      setJobs(res?.data?.records ?? []);
      setMeta(res?.data?.meta ?? { total: 0, page: 1, limit: 6, totalPages: 1 });
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, filterType, filterExperience, filterField]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // ── Collect unique job types and experience values for filters ───────────
  const jobTypeOptions = React.useMemo(() => {
    const uniqueTypes = new Set<string>();
    jobs.forEach((j) => {
      const val = getLocalizedField(j, "job_type", lng);
      if (val) uniqueTypes.add(val);
    });
    return Array.from(uniqueTypes).map((v) => ({ value: v, label: v }));
  }, [jobs, lng]);

  const experienceOptions = React.useMemo(() => {
    const unique = new Set<string>();
    jobs.forEach((j) => {
      const val = getLocalizedField(j, "experience", lng);
      if (val) unique.add(val);
    });
    return Array.from(unique).map((v) => ({ value: v, label: v }));
  }, [jobs, lng]);

  const fieldOptions = React.useMemo(() => {
    return fieldsOfWork.map((f) => ({
      value: String(f.id),
      label: getLocalizedField(f, "name", lng),
    }));
  }, [fieldsOfWork, lng]);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <section className="w-full bg-[#F8F9FC] py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ── Section Header ────────────────────────────────────────────── */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#1E0D01] mb-6">
          {t("jobs_section_title")}
        </h2>

        {/* ── Filter Bar ────────────────────────────────────────────────── */}
        <div className="mb-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-0 w-full sm:w-auto">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("jobs_search_placeholder")}
              className="w-full rounded-full border border-gray-200 bg-white pl-10 pr-10 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-[#EF5941] focus:outline-none focus:ring-2 focus:ring-[#EF5941]/20 transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap gap-2">
            <FilterDropdown
              label={t("jobs_filter_type")}
              options={jobTypeOptions}
              value={filterType}
              onChange={setFilterType}
            />
            <FilterDropdown
              label={t("jobs_filter_experience")}
              options={experienceOptions}
              value={filterExperience}
              onChange={setFilterExperience}
            />
            <FilterDropdown
              label={t("jobs_filter_field")}
              options={fieldOptions}
              value={filterField}
              onChange={setFilterField}
            />
          </div>
        </div>

        {/* ── Grid / States ──────────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Briefcase className="h-9 w-9 text-gray-400" />
            </div>
            <p className="text-lg font-semibold text-gray-700">{t("jobs_empty")}</p>
            <p className="text-sm text-gray-400 max-w-xs">{t("jobs_empty_desc")}</p>
            {(search || filterType || filterExperience || filterField) && (
              <button
                onClick={() => {
                  setSearch("");
                  setFilterType("");
                  setFilterExperience("");
                  setFilterField("");
                }}
                className="mt-2 rounded-full bg-[#EF5941] px-5 py-2 text-sm font-semibold text-white hover:bg-[#d84e38] transition"
              >
                {t("jobs_view_all")}
              </button>
            )}
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${page}-${filterType}-${filterExperience}-${filterField}-${debouncedSearch}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              {jobs.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} lng={lng} t={t} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── Pagination ────────────────────────────────────────────── */}
        {!loading && meta.totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 disabled:opacity-40 hover:border-[#EF5941] hover:text-[#EF5941] transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 || p === meta.totalPages || Math.abs(p - page) <= 1
              )
              .reduce<(number | "...")[  ]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1)
                  acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((item, i) =>
                item === "..." ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="px-1 text-gray-400 text-sm"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setPage(item as number)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold border transition ${
                      page === item
                        ? "border-[#EF5941] bg-[#EF5941] text-white shadow-md shadow-[#EF5941]/25"
                        : "border-gray-200 bg-white text-gray-600 hover:border-[#EF5941]/50 hover:text-[#EF5941]"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

            <button
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={page === meta.totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 disabled:opacity-40 hover:border-[#EF5941] hover:text-[#EF5941] transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <span className="ml-2 text-sm text-gray-400">
              {page} / {meta.totalPages}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
