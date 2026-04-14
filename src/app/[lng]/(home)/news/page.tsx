import { htechService } from '@/common/services/htech.service';
import NewsClient from './NewsClient';

export const revalidate = 0; // Disable static caching so it always fetches fresh data

type NewsCategory = {
  id: number;
  name_vn?: string;
  name_en?: string;
};

type NewsItem = {
  id: number;
  thumbnail_url?: string;
};

type NewsMeta = {
  page: number;
  limit: number;
  totalPages: number;
};

export default async function NewsServerPage({
  params,
  searchParams,
}: {
  params: Promise<{ lng: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const lng = resolvedParams.lng;

  // Extract search params
  const currentCategory = resolvedSearchParams.category_id ? Number(resolvedSearchParams.category_id) : undefined;
  const currentSearch = (resolvedSearchParams.search as string) || '';
  const currentPage = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1;
  const limit = 4;

  let categories: NewsCategory[] = [];
  let newsList: NewsItem[] = [];
  let meta = { page: currentPage, limit, totalPages: 1 };

  try {
    const [catRes, newsRes] = await Promise.all([
      htechService.getAllCategories(),
      htechService.getAllNews({
        page: currentPage,
        limit,
        category_id: currentCategory,
        search: currentSearch,
        searchBy: lng === 'en' ? 'title_en' : 'title_vn',
      })
    ]);

    // Parse categories
    const _catRes = catRes as { data?: NewsCategory[] } | NewsCategory[];
    if (_catRes?.data && Array.isArray(_catRes.data)) {
      categories = _catRes.data;
    } else if (Array.isArray(_catRes)) {
      categories = _catRes;
    }

    // Parse news data
    const _newsRes = newsRes as { data?: { records?: NewsItem[]; meta?: NewsMeta }; records?: NewsItem[]; meta?: NewsMeta };
    const records = _newsRes?.data?.records || _newsRes?.records || [];
    const returnedMeta = _newsRes?.data?.meta || _newsRes?.meta || { page: currentPage, limit, totalPages: 1 };

    if (records && Array.isArray(records)) {
      // Format thumbnail URLs
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const host = apiUrl.replace(/\/api\/v1\/?$/, '');

      newsList = records.map((item) => {
        let url = item.thumbnail_url;
        if (url && !url.startsWith('http')) {
          url = `${host}${url.startsWith('/') ? url : `/${url}`}`;
        }
        return { ...item, thumbnail_url: url || '/placeholder-image.jpg' };
      });
      meta = returnedMeta;
    }
  } catch (error) {
    console.error('Error fetching news page data server side:', error);
  }

  return (
    <NewsClient
      lng={lng}
      initialCategories={categories}
      initialNewsList={newsList}
      meta={meta}
      currentCategory={currentCategory}
      currentSearch={currentSearch}
      currentPage={currentPage}
    />
  );
}
