'use client';

import { useState, useTransition } from 'react';
import { getLocalizedField } from '@/common/utils/localizedField';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Newspaper, X, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useClientTranslation } from '@/i18n/client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ImageWithFallback from '@/common/components/ui/ImageWithFallback';

type NewsCategory = {
  id: number;
  name_vn?: string;
  name_en?: string;
};

type NewsItem = {
  id: number;
  category?: NewsCategory | null;
  title_vn?: string;
  title_en?: string;
  summary_vn?: string;
  summary_en?: string;
  description_vn?: string;
  description_en?: string;
  thumbnail_url?: string;
  created_at?: string;
};

type NewsMeta = {
  page: number;
  total?: number;
  totalPages: number;
};

type NewsClientProps = {
  lng: string;
  initialCategories: NewsCategory[];
  initialNewsList: NewsItem[];
  meta: NewsMeta;
  currentCategory?: number;
  currentSearch: string;
};

export default function NewsClient({ lng, initialCategories, initialNewsList, meta, currentCategory, currentSearch }: NewsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t } = useClientTranslation(lng);

  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Update URL function
  const updateUrl = (newParams: Record<string, string | undefined>) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl({ search: searchInput, page: '1' });
  };

  const handleCategoryClick = (id?: number) => {
    updateUrl({ category_id: id ? String(id) : undefined, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= meta.totalPages) {
      updateUrl({ page: String(newPage) });
    }
  };

  return (
    <div>
      {/* <section className="relative w-full h-[70vh] md:h-[85vh] -mt-20 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[1.12] saturate-105"
          style={{ backgroundImage: "url('/assets/services/duan.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-12 md:pb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="hero-title-logo-gradient hero-title-vn-safe text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase"
            >
              {t('news_page_title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-left text-white/90 text-sm md:text-xl lg:text-xl leading-relaxed max-w-md md:max-w-lg mt-4"
            >
              {t('news_title')}
            </motion.p>
          </div>
        </div>
      </section> */}

      <section className="w-full bg-[#F8F9FC] py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-1">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#EF5941]">{t('news_page_title')}</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900">
              {t('news_title')}
              {typeof meta.total === 'number' && meta.total > 0 && (
                <span className="ml-3 text-base font-semibold text-gray-400">({meta.total})</span>
              )}
            </h2>
          </div>

          <form onSubmit={handleSearch} className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('news_search_placeholder')}
                className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-10 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-[#EF5941] focus:outline-none focus:ring-2 focus:ring-[#EF5941]/20 transition"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    updateUrl({ search: undefined, page: '1' });
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button type="submit" className="hidden">Search</button>
            </div>
          </form>

          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryClick(undefined)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${!currentCategory
                ? 'border-[#EF5941] bg-[#EF5941] text-white shadow-md shadow-[#EF5941]/25'
                : 'border-gray-200 bg-white text-gray-600 hover:border-[#EF5941]/50 hover:text-[#EF5941]'
                }`}
              disabled={isPending}
            >
              {t('news_all_categories')}
            </button>
            {initialCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${currentCategory === category.id
                  ? 'border-[#EF5941] bg-[#EF5941] text-white shadow-md shadow-[#EF5941]/25'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-[#EF5941]/50 hover:text-[#EF5941]'
                  }`}
                disabled={isPending}
              >
                {getLocalizedField(category, 'name', lng)}
              </button>
            ))}
          </div>

          {isPending ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-white shadow border border-gray-100 animate-pulse">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : initialNewsList.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <Newspaper className="h-9 w-9" />
              </div>
              <p className="text-lg font-semibold text-gray-700">{t('news_empty_title')}</p>
              <p className="text-sm text-gray-400 max-w-xs">{t('news_empty_desc')}</p>
              <button
                onClick={() => {
                  setSearchInput('');
                  handleCategoryClick(undefined);
                }}
                className="mt-2 rounded-full bg-[#EF5941] px-5 py-2 text-sm font-semibold text-white hover:bg-[#d84e38] transition"
              >
                {t('news_all_categories')}
              </button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${meta.page}-${currentCategory}-${currentSearch}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {initialNewsList.map((item, index: number) => {
                  const title = getLocalizedField(item, 'title', lng);
                  const summary = getLocalizedField(item, 'summary', lng) || getLocalizedField(item, 'description', lng);
                  const categoryName = item.category ? getLocalizedField(item.category, 'name', lng) : '';
                  const formattedDate = item.created_at ? new Date(item.created_at).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : '';

                  return (
                    <motion.div
                      key={item.id || index}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl border border-gray-100 hover:border-[#EF5941]/20 transition-all duration-300"
                    >
                      <Link href={`/${lng}/news/${item.id}`} className="absolute inset-0 z-10" aria-label={title} />
                      <div className="relative h-52 overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={item.thumbnail_url}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="flex flex-col flex-1 p-5 gap-2">
                        {categoryName && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#EF5941]">
                            <Tag className="h-3 w-3" />
                            {categoryName}
                          </span>
                        )}

                        <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#EF5941] transition-colors duration-200" title={title}>
                          {title}
                        </h3>

                        {summary && (
                          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                            {summary}
                          </p>
                        )}

                        {formattedDate && (
                          <div className="mt-auto pt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-gray-100">
                            <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                              <Calendar className="h-3.5 w-3.5 shrink-0" />
                              {formattedDate}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[#EF5941]/15 transition-all duration-300 pointer-events-none" />
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {!isPending && meta.totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(meta.page - 1)}
                disabled={meta.page === 1}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 disabled:opacity-40 hover:border-[#EF5941] hover:text-[#EF5941] transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === meta.totalPages || Math.abs(p - meta.page) <= 1)
                .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('...');
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, i) =>
                  item === '...' ? (
                    <span key={`ellipsis-${i}`} className="px-1 text-gray-400 text-sm">...</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => handlePageChange(item as number)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold border transition ${meta.page === item
                        ? 'border-[#EF5941] bg-[#EF5941] text-white shadow-md shadow-[#EF5941]/25'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-[#EF5941]/50 hover:text-[#EF5941]'
                        }`}
                    >
                      {item}
                    </button>
                  )
                )}

              <button
                onClick={() => handlePageChange(meta.page + 1)}
                disabled={meta.page === meta.totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 disabled:opacity-40 hover:border-[#EF5941] hover:text-[#EF5941] transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <span className="ml-2 text-sm text-gray-400">
                {meta.page} / {meta.totalPages}
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
