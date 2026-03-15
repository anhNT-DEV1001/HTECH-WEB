"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, X, Calendar, Building2, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { htechService } from "@/common/services/htech.service";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectCategory {
  id: number;
  name_vn: string;
  name_en: string;
  slug: string;
}

interface Project {
  id: number;
  title_vn: string;
  title_en: string;
  summary_vn: string;
  thumbnail_url: string;
  client_name: string;
  industry_vn: string;
  start_date: string;
  end_date: string | null;
  status: "UPCOMING" | "IN_PROGRESS" | "COMPLETED";
  is_featured: boolean;
  category: ProjectCategory | null;
  slug: string;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_MAP = {
  COMPLETED: { label: "Hoàn thành", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  IN_PROGRESS: { label: "Đang thực hiện", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  UPCOMING: { label: "Sắp triển khai", color: "bg-sky-500/15 text-sky-400 border-sky-500/30" },
};

const API_ORIGIN = (() => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1";
    return new URL(url).origin; // e.g. "http://localhost:5050"
  } catch { return "http://localhost:5050"; }
})();

function resolveImage(url: string): string {
  if (!url) return "/assets/projects/duck-project-placeholder.jpg";
  if (url.startsWith("http")) return url;
  return `${API_ORIGIN}${url}`;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("vi-VN", { month: "2-digit", year: "numeric" });
}

// ─── Skeleton Card ───────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow border border-gray-100 animate-pulse">
      <div className="h-52 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="flex gap-2 mt-4">
          <div className="h-3 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index, slug }: { project: Project; index: number; slug?: string }) {
  const status = STATUS_MAP[project.status] ?? STATUS_MAP.UPCOMING;
  const detailHref = `/${slug || 'vi'}/projects/${project.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl border border-gray-100 hover:border-[#EF5941]/20 transition-all duration-300"
    >
      <Link href={detailHref} className="absolute inset-0 z-10" aria-label={project.title_vn} />
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={resolveImage(project.thumbnail_url)}
          alt={project.title_vn}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            if (img.dataset.errored) return;
            img.dataset.errored = "1";
            img.src = "/assets/projects/duck-project-placeholder.jpg";
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured badge */}
        {project.is_featured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#EF5941] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
            ★ Nổi bật
          </span>
        )}

        {/* Status badge */}
        <span className={`absolute top-3 right-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-sm ${status.color}`}>
          {status.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        {/* Category */}
        {project.category && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#EF5941]">
            <Tag className="h-3 w-3" />
            {project.category.name_vn}
          </span>
        )}

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#EF5941] transition-colors duration-200">
          {project.title_vn}
        </h3>

        {/* Summary */}
        {project.summary_vn && (
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {project.summary_vn}
          </p>
        )}

        {/* Meta info */}
        <div className="mt-auto pt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-gray-100">
          {project.client_name && (
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              {project.client_name}
            </span>
          )}
          {(project.start_date || project.end_date) && (
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              {formatDate(project.start_date)}
              {project.end_date && ` → ${formatDate(project.end_date)}`}
            </span>
          )}
        </div>
      </div>

      {/* Hover ring */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[#EF5941]/15 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Props {
  slug?: string;
}

export default function ProjectListSection({ slug }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [meta, setMeta] = useState<Meta>({ total: 0, page: 1, limit: 12, totalPages: 1 });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [catLoading, setCatLoading] = useState(true);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, [search]);

  // Reset page on filter change
  useEffect(() => { setPage(1); }, [activeCategoryId]);

  // Fetch categories once
  useEffect(() => {
    (async () => {
      try {
        const res: any = await htechService.getProjectCategories();
        setCategories(res?.data ?? []);
      } catch { /* silent */ }
      finally { setCatLoading(false); }
    })();
  }, []);

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 12 };
      if (debouncedSearch) params.search = debouncedSearch;
      if (activeCategoryId) params.category_id = activeCategoryId;
      const res: any = await htechService.getAllProjects(params);
      setProjects(res?.data?.records ?? []);
      setMeta(res?.data?.meta ?? { total: 0, page: 1, limit: 12, totalPages: 1 });
    } catch { setProjects([]); }
    finally { setLoading(false); }
  }, [page, debouncedSearch, activeCategoryId]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <section className="w-full bg-[#F8F9FC] py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="mb-8 flex flex-col gap-1">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#EF5941]">Danh mục dự án</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Tất cả dự án
            {meta.total > 0 && (
              <span className="ml-3 text-base font-semibold text-gray-400">({meta.total})</span>
            )}
          </h2>
        </div>

        {/* ── Search + Filter row ─────────────────────────────────────────────── */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm dự án..."
              className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-10 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-[#EF5941] focus:outline-none focus:ring-2 focus:ring-[#EF5941]/20 transition"
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
        </div>

        {/* ── Category Tabs ───────────────────────────────────────────────────── */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategoryId(null)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${activeCategoryId === null
                ? "border-[#EF5941] bg-[#EF5941] text-white shadow-md shadow-[#EF5941]/25"
                : "border-gray-200 bg-white text-gray-600 hover:border-[#EF5941]/50 hover:text-[#EF5941]"
              }`}
          >
            Tất cả
          </button>
          {catLoading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-gray-200" />
            ))
            : categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id === activeCategoryId ? null : cat.id)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${activeCategoryId === cat.id
                    ? "border-[#EF5941] bg-[#EF5941] text-white shadow-md shadow-[#EF5941]/25"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#EF5941]/50 hover:text-[#EF5941]"
                  }`}
              >
                {cat.name_vn}
              </button>
            ))}
        </div>

        {/* ── Grid / States ───────────────────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl">
              🗂️
            </div>
            <p className="text-lg font-semibold text-gray-700">Không tìm thấy dự án nào</p>
            <p className="text-sm text-gray-400 max-w-xs">
              Thử thay đổi từ khoá tìm kiếm hoặc chọn danh mục khác.
            </p>
            <button
              onClick={() => { setSearch(""); setActiveCategoryId(null); }}
              className="mt-2 rounded-full bg-[#EF5941] px-5 py-2 text-sm font-semibold text-white hover:bg-[#d84e38] transition"
            >
              Xem tất cả dự án
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${page}-${activeCategoryId}-${debouncedSearch}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} slug={slug} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── Pagination ──────────────────────────────────────────────────────── */}
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
              .filter((p) => p === 1 || p === meta.totalPages || Math.abs(p - page) <= 1)
              .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((item, i) =>
                item === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-1 text-gray-400 text-sm">…</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setPage(item as number)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold border transition ${page === item
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
