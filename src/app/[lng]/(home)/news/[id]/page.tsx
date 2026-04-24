import { htechService } from '@/common/services/htech.service';
import { getLocalizedField } from '@/common/utils/localizedField';
import { useServerTranslation as getServerTranslation } from '@/i18n';
import Link from 'next/link';
import ImageWithFallback from '@/common/components/ui/ImageWithFallback';

export const revalidate = 0; // Disable static caching so it always fetches fresh data

type NewsCategory = {
  name_vn?: string;
  name_en?: string;
};

type NewsArticle = {
  id: number;
  category_id?: number;
  category?: NewsCategory | null;
  title_vn?: string;
  title_en?: string;
  content_vn?: string;
  content_en?: string;
  thumbnail_url?: string;
  created_at?: string;
};

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ lng: string; id: string }>;
}) {
  const resolvedParams = await params;
  const lng = resolvedParams.lng;
  const id = resolvedParams.id;
  const { t } = await getServerTranslation(lng);

  let article: NewsArticle | null = null;
  let relatedNews: NewsArticle[] = [];

  try {
    // 1. Fetch main article details
    const res = await htechService.getNewsById(id) as { data?: NewsArticle };
    if (res?.data) {
      article = res.data;

      // Format main article thumbnail
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const host = apiUrl.replace(/\/api\/v1\/?$/, '');
      if (article.thumbnail_url && !article.thumbnail_url.startsWith('http')) {
        article.thumbnail_url = `${host}${article.thumbnail_url.startsWith('/') ? article.thumbnail_url : `/${article.thumbnail_url}`}`;
      }

      // 2. Fetch related articles based on the same category
      const relatedRes = await htechService.getAllNews({
        limit: 4, // Fetch 4 in case one of them is the current article
        category_id: article.category_id,
      }) as { data?: { records?: NewsArticle[] }; records?: NewsArticle[] };

      const records = relatedRes?.data?.records || relatedRes?.records || [];
      if (records && Array.isArray(records)) {
        // Filter out the current article and take only 3
        relatedNews = records
          .filter((item) => String(item.id) !== String(id))
          .slice(0, 3)
          .map((item) => {
            let url = item.thumbnail_url;
            if (url && !url.startsWith('http')) {
              url = `${host}${url.startsWith('/') ? url : `/${url}`}`;
            }
            return { ...item, thumbnail_url: url || '/placeholder-image.jpg' };
          });
      }
    }
  } catch (error) {
    console.error('Error fetching detail news relative to id:', id, error);
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-10 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('news_detail_not_found_title')}</h2>
          <p className="text-gray-500 mb-6">{t('news_detail_not_found_desc')}</p>
          <Link href={`/${lng}/news`} className="bg-[#FF4A3F] text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors">
            {t('news_detail_back_to_news')}
          </Link>
        </div>
      </div>
    );
  }

  const title = getLocalizedField(article, "title", lng);
  const content = getLocalizedField(article, "content", lng);

  const formattedDate = article.created_at ? new Date(article.created_at).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <div className="min-h-screen bg-white pt-15 pb-5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link href={`/${lng}/news`} className="text-gray-500 hover:text-[#FF4A3F] flex items-center gap-2 text-sm font-medium transition-colors">
            <span className="text-lg leading-none tracking-tighter">«</span>
            {t('news_detail_back_label')}
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main Article Content (Left Column - 2/3 width on desktop) */}
          <article className="w-full lg:w-2/3">
            {/* Header */}
            <header className="mb-8">
              {article.category && (
                <div className="mb-4">
                  <span className="text-xs font-semibold text-[#FF4A3F] uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full inline-block">
                    {getLocalizedField(article.category, 'name', lng)}
                  </span>
                </div>
              )}

              <h1 className="text-3xl md:text-5xl font-bold uppercase text-[#1E0D01] leading-tight mb-4">
                {title}
              </h1>

              {formattedDate && (
                <div className="text-gray-500 font-medium">
                  {formattedDate}
                </div>
              )}
            </header>

            {/* Thumbnail */}
            {article.thumbnail_url && (
              <div className="w-full rounded-[2rem] overflow-hidden mb-10 shadow-sm border border-gray-100">
                <ImageWithFallback
                  src={article.thumbnail_url}
                  alt={title}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            )}

            {/* HTML Content */}
            <div
              className="prose prose-lg max-w-none text-gray-800 prose-headings:text-[#1E0D01] prose-a:text-[#FF4A3F] hover:prose-a:text-red-600 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </article>


          {/* Sidebar - Related Articles (Right Column - 1/3 width on desktop) */}
          <aside className="w-full lg:w-1/3">
            <div className="sticky top-32">
              <h3 className="text-xl font-bold uppercase px-4 mb-6 text-[#1E0D01]">
                {t('news_related_title')}
              </h3>

              {relatedNews.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {relatedNews.map((item) => {
                    const relTitle = getLocalizedField(item, "title", lng);
                    const relDate = item.created_at ? new Date(item.created_at).toLocaleDateString(lng === 'vi' ? 'vi-VN' : 'en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : '';

                    return (
                      <Link
                        key={item.id}
                        href={`/${lng}/news/${item.id}`}
                        className="group flex flex-col gap-3 items-start bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
                          <ImageWithFallback
                            src={item.thumbnail_url}
                            alt={relTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex flex-col gap-2 w-full px-1">
                          <h4 className="font-bold text-[#1E0D01] text-lg group-hover:text-[#FF4A3F] transition-colors line-clamp-2 leading-snug">
                            {relTitle}
                          </h4>
                          <span className="text-sm text-gray-500 font-medium">
                            {relDate}
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <p className="text-gray-500 italic text-sm">{t('news_related_empty')}</p>
              )}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
