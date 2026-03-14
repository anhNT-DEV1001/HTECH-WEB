'use client';

import { useState, useCallback, useTransition } from 'react';
import { getLocalizedField } from '@/common/utils/localizedField';
import { Search, ChevronLeft, ChevronRight, Newspaper } from 'lucide-react';
import { useClientTranslation } from '@/i18n/client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function NewsClient({ lng, initialCategories, initialNewsList, meta, currentCategory, currentSearch, currentPage }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t } = useClientTranslation(lng);

  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Update URL function
  const updateUrl = (newParams: Record<string, string | undefined>) => {
    let currentParams = new URLSearchParams(searchParams.toString());
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
    <div className="min-h-screen bg-gray-50 pt-15 pb-5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-[#1E0D01]">{'Tin Tức'}</h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#FF4A3F] focus:ring-1 focus:ring-[#FF4A3F] transition-all bg-white"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button type="submit" className="hidden">Search</button>
          </form>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => handleCategoryClick(undefined)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!currentCategory
              ? 'bg-[#ff832b] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            disabled={isPending}
          >
            Tất cả
          </button>
          {initialCategories.map((category: any) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentCategory === category.id
                ? 'bg-[#FF4A3F] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              disabled={isPending}
            >
              {getLocalizedField(category, 'name', lng)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {isPending ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4A3F]"></div>
          </div>
        ) : initialNewsList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Newspaper className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Không tìm thấy bài viết nào</h3>
            <p className="text-gray-500">Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* News Grid */}
            <div className="flex flex-col gap-6 w-full mb-16">
              {initialNewsList.map((item: any, index: number) => {
                const title = getLocalizedField(item, "title", lng);
                const summary = getLocalizedField(item, "summary", lng) || getLocalizedField(item, "description", lng);

                return (
                  <Link
                    key={item.id || index}
                    href={`/${lng}/news/${item.id}`}
                    className="flex flex-col md:flex-row group/card cursor-pointer bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50 overflow-hidden"
                  >
                    <div className="w-full md:w-1/3 h-[300px] md:h-[260px] shrink-0">
                      <img
                        src={item.thumbnail_url}
                        alt={title}
                        className="w-full h-full object-cover bg-gray-100 group-hover/card:scale-105 transition-all duration-500 ease-out"
                      />
                    </div>
                    <div className="flex flex-col justify-start gap-4 p-6 w-full">
                      <h3 className="text-[#1E0D01] font-bold text-2xl md:text-3xl leading-tight group-hover/card:text-[#FF4A3F] transition-colors line-clamp-2" title={title}>
                        {title}
                      </h3>
                      <p className="text-[#1E0D01]/60 text-base md:text-lg leading-relaxed line-clamp-3">
                        {summary}
                      </p>

                      {/* Push the date to the bottom if container grows */}
                      <div className="flex items-center mt-auto pt-2 text-sm text-gray-500 font-medium border-t border-gray-100">
                        {item.created_at ? new Date(item.created_at).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : ''}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-8">
                <button
                  onClick={() => handlePageChange(meta.page - 1)}
                  disabled={meta.page === 1 || isPending}
                  className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-xl leading-none tracking-tighter">«</span>
                </button>

                <div className="flex items-center gap-1 mx-2">
                  {[...Array(meta.totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === meta.totalPages ||
                      (pageNum >= meta.page - 1 && pageNum <= meta.page + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          disabled={isPending}
                          className={`flex items-center justify-center w-8 h-8 text-sm font-medium rounded-md transition-colors ${meta.page === pageNum
                            ? 'bg-[#FF4A3F] text-white'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      pageNum === meta.page - 2 ||
                      pageNum === meta.page + 2
                    ) {
                      return <span key={pageNum} className="flex items-center justify-center w-8 h-8 text-sm text-gray-400 font-medium">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(meta.page + 1)}
                  disabled={meta.page === meta.totalPages || isPending}
                  className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-xl leading-none tracking-tighter">»</span>
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
