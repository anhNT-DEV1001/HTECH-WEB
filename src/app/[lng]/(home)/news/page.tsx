import { htechService } from '@/common/services/htech.service';
import NewsClient from './NewsClient';

export const revalidate = 0; // Disable static caching so it always fetches fresh data

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

  let categories = [];
  let newsList = [];
  let meta = { page: currentPage, limit, totalPages: 1 };

  try {
    const [catRes, newsRes] = await Promise.all([
      htechService.getAllCategories(),
      htechService.getAllNews({
        page: currentPage,
        limit,
        category_id: currentCategory,
        search: currentSearch,
        searchBy: 'title_vn',
      })
    ]);

    // Parse categories
    const _catRes: any = catRes;
    if (_catRes?.data && Array.isArray(_catRes.data)) {
      categories = _catRes.data;
    } else if (Array.isArray(_catRes)) {
      categories = _catRes;
    }

    // Parse news data
    const _newsRes: any = newsRes;
    const records = _newsRes?.data?.records || _newsRes?.records || [];
    const returnedMeta = _newsRes?.data?.meta || _newsRes?.meta || { page: currentPage, limit, totalPages: 1 };

    if (records && Array.isArray(records)) {
      // Format thumbnail URLs
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const host = apiUrl.replace(/\/api\/v1\/?$/, '');

      newsList = records.map((item: any) => {
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