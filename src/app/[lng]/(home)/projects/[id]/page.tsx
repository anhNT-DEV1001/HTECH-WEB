import { htechService } from "@/common/services/htech.service";
import { useServerTranslation as getServerTranslation } from "@/i18n";
import Link from "next/link";
import ProjectImage from "@/common/components/project/ProjectImage";
import ProjectGallery from "@/common/components/project/ProjectGallery";
import {
  Calendar,
  Building2,
  MapPin,
  Layers,
  Tag,
  Globe,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Hourglass,
} from "lucide-react";

export const revalidate = 0;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const API_ORIGIN = (() => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1";
    return new URL(url).origin;
  } catch {
    return "http://localhost:5050";
  }
})();

function resolveImage(url: string): string {
  if (!url) return "/assets/projects/duck-project-placeholder.jpg";
  if (url.startsWith("http")) return url;
  return `${API_ORIGIN}${url}`;
}

function formatDate(dateStr: string | null, lng: string) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString(lng === "en" ? "en-US" : "vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

type ProjectImageItem = {
  id: number;
  image_url: string;
  alt_text?: string;
  sort_order?: number;
};

type Project = {
  title_vn?: string;
  title_en?: string;
  summary_vn?: string;
  summary_en?: string;
  description_vn?: string;
  description_en?: string;
  venue_vn?: string;
  venue_en?: string;
  industry_vn?: string;
  industry_en?: string;
  thumbnail_url: string;
  client_name?: string;
  scale?: string;
  start_date?: string;
  end_date?: string | null;
  status: "COMPLETED" | "IN_PROGRESS" | "UPCOMING";
  is_featured?: boolean;
  category?: { name_vn?: string; name_en?: string } | null;
  location_url?: string;
  projectImages?: ProjectImageItem[];
};

const STATUS_CONFIG = {
  COMPLETED: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", labelKey: "project_status_completed" },
  IN_PROGRESS: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50 border-amber-200", labelKey: "project_status_in_progress" },
  UPCOMING: { icon: Hourglass, color: "text-sky-600", bg: "bg-sky-50 border-sky-200", labelKey: "project_status_upcoming" },
} as const;

// ─── InfoCard component ───────────────────────────────────────────────────────

function InfoCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#EF5941]/20 transition-all duration-200 h-full">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF0ED]">
          <Icon className="h-4 w-4 text-[#EF5941]" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</span>
      </div>
      <p className={`text-sm font-semibold text-gray-800 leading-snug ${href ? "text-[#EF5941]" : ""}`}>
        {value}
      </p>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <div>{inner}</div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lng: string; id: string }>;
}) {
  const { lng, id } = await params;
  const { t } = await getServerTranslation(lng);
  let project: Project | null = null;

  try {
    const res = await htechService.getProjectById(id);
    if (res?.data) {
      project = res.data as Project;
      project.thumbnail_url = resolveImage(project.thumbnail_url);
      project.projectImages = (project.projectImages ?? []).map((img, index) => ({
        ...img,
        id: img.id ?? index,
        image_url: resolveImage(img.image_url),
      }));
    }
  } catch (err) {
    console.error("Error fetching project:", id, err);
  }

  // Not found
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <p className="text-5xl mb-4">🗂️</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("project_detail_not_found_title")}</h2>
          <p className="text-gray-500 mb-6">{t("project_detail_not_found_desc")}</p>
          <Link href={`/${lng}/projects`} className="bg-[#EF5941] text-white px-6 py-3 rounded-full hover:bg-[#d84e38] transition font-semibold">
            {t("project_detail_back_to_list")}
          </Link>
        </div>
      </div>
    );
  }

  const title = (lng === "vi" ? project.title_vn : (project.title_en || project.title_vn)) || "";
  const summary = (lng === "vi" ? project.summary_vn : (project.summary_en || project.summary_vn)) || "";
  const description = (lng === "vi" ? project.description_vn : (project.description_en || project.description_vn)) || "";
  const venue = (lng === "vi" ? project.venue_vn : (project.venue_en || project.venue_vn)) || "";
  const industry = (lng === "vi" ? project.industry_vn : (project.industry_en || project.industry_vn)) || "";
  const statusCfg = STATUS_CONFIG[project.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.UPCOMING;
  const StatusIcon = statusCfg.icon;
  const images = project.projectImages ?? [];
  const statusLabel = t(statusCfg.labelKey);
  const categoryName = project.category
    ? ((lng === "en" ? (project.category.name_en || project.category.name_vn) : project.category.name_vn) || "")
    : "";

  const infoCards: { icon: React.ElementType; label: string; value: string; href?: string }[] = [
    ...(project.client_name ? [{ icon: Building2, label: t("project_detail_client"), value: project.client_name }] : []),
    ...(industry ? [{ icon: Tag, label: t("project_detail_industry"), value: industry }] : []),
    ...(project.scale ? [{ icon: Layers, label: t("project_detail_scale"), value: project.scale }] : []),
    ...(venue ? [{ icon: MapPin, label: t("project_detail_location"), value: venue }] : []),
    ...(project.start_date ? [{
      icon: Calendar,
      label: t("project_detail_time"),
      value: `${formatDate(project.start_date, lng)}${project.end_date ? ` → ${formatDate(project.end_date, lng)}` : ` – ${t("project_status_in_progress")}`}`,
    }] : []),
    ...(categoryName ? [{ icon: Tag, label: t("project_detail_category"), value: categoryName }] : []),
    ...(project.location_url ? [{ icon: Globe, label: t("project_detail_map_title"), value: t("project_detail_map"), href: project.location_url }] : []),
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FC]">

      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <div className="relative w-full h-[340px] sm:h-[420px] overflow-hidden bg-slate-900 -mt-20">
        <ProjectImage
          src={project.thumbnail_url}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent" />

        <div className="relative z-10 flex flex-col justify-end h-full max-w-6xl mx-auto px-4 sm:px-8 pb-10 gap-3">
          <Link
            href={`/${lng}/projects`}
            className="absolute top-24 left-4 sm:left-8 inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("project_detail_back_list")}
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {project.category && (
              <span className="rounded-full bg-[#EF5941]/20 border border-[#EF5941]/40 px-3 py-0.5 text-xs font-semibold text-[#EF5941]">
                {categoryName}
              </span>
            )}
            <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-xs font-semibold backdrop-blur-sm ${statusCfg.bg} ${statusCfg.color}`}>
              <StatusIcon className="h-3 w-3" />
              {statusLabel}
            </span>
            {project.is_featured && (
              <span className="rounded-full bg-amber-400 px-3 py-0.5 text-xs font-bold text-amber-900">★ {t("project_featured")}</span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-white leading-tight drop-shadow-lg max-w-3xl">
            {title}
          </h1>
          <div className="h-1 w-16 rounded-full bg-[#EF5941]" />
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 flex flex-col lg:flex-row gap-10">

        {/* Left: content */}
        <main className="flex-1 min-w-0 flex flex-col gap-10">

          {/* Summary quote */}
          {summary && (
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed border-l-4 border-[#EF5941] pl-5 italic bg-white rounded-r-xl py-4 pr-5 shadow-sm">
              {summary}
            </p>
          )}

          {/* Info cards */}
          {infoCards.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase text-gray-900 mb-4 flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-[#EF5941] inline-block" />
                {t("project_detail_info_title")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {infoCards.map((card, i) => (
                  <InfoCard key={i} {...card} />
                ))}
              </div>
            </section>
          )}

          {/* Description */}
          {description && (
            <section>
              <h2 className="text-lg font-bold uppercase text-gray-900 mb-4 flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-[#EF5941] inline-block" />
                {t("project_detail_description_title")}
              </h2>
              <div
                className="prose prose-base max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-[#EF5941] prose-img:rounded-xl bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </section>
          )}

          {/* Image Gallery */}
          {images.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase text-gray-900 mb-4 flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-[#EF5941] inline-block" />
                {t("project_detail_images_title")}
              </h2>
              <ProjectGallery images={images} title={title} />
            </section>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-[280px] shrink-0">
          <div className="sticky top-24 flex flex-col gap-4">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-3">{t("project_detail_summary_title")}</h3>

              {project.client_name && (
                <div className="flex items-start gap-3">
                  <Building2 className="h-4 w-4 text-[#EF5941] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{t("project_detail_client")}</p>
                    <p className="text-sm font-semibold text-gray-800">{project.client_name}</p>
                  </div>
                </div>
              )}

              {industry && (
                <div className="flex items-start gap-3">
                  <Tag className="h-4 w-4 text-[#EF5941] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{t("project_detail_industry")}</p>
                    <p className="text-sm font-semibold text-gray-800">{industry}</p>
                  </div>
                </div>
              )}

              {project.start_date && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-[#EF5941] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{t("project_detail_time")}</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {formatDate(project.start_date, lng)}
                      {project.end_date && <><br />{`→ ${formatDate(project.end_date, lng)}`}</>}
                    </p>
                  </div>
                </div>
              )}

              {project.scale && (
                <div className="flex items-start gap-3">
                  <Layers className="h-4 w-4 text-[#EF5941] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{t("project_detail_scale")}</p>
                    <p className="text-sm font-semibold text-gray-800">{project.scale}</p>
                  </div>
                </div>
              )}

              <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${statusCfg.bg}`}>
                <StatusIcon className={`h-4 w-4 ${statusCfg.color}`} />
                <span className={`text-sm font-semibold ${statusCfg.color}`}>{statusLabel}</span>
              </div>
            </div>

            <Link
              href={`/${lng}/projects`}
              className="flex items-center justify-center gap-2 rounded-full border border-[#EF5941] px-6 py-3 text-sm font-semibold text-[#EF5941] hover:bg-[#EF5941] hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("project_detail_all_projects")}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
