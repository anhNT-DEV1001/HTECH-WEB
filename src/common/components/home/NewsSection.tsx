import { ArrowUpRight } from 'lucide-react';
import { htechService } from '@/common/services/htech.service';
import NewsCarousel from './NewsCarousel';
import { useServerTranslation as getServerTranslation } from '@/i18n';
import Link from 'next/link';
import { extractListFromApiResponse, resolveApiAssetUrl } from '@/common/utils/api';
import { homeSectionTitleClass } from './homeSectionStyles';

type NewsSectionItem = {
  id?: number | string;
  thumbnail_url?: string | null;
  title_vn?: string;
  title_en?: string;
  summary_vn?: string;
  summary_en?: string;
  description_vn?: string;
  description_en?: string;
};

export default async function NewsSection({ lng }: { lng: string }) {
  const { t } = await getServerTranslation(lng);

  let newsList: NewsSectionItem[] = [];
  try {
    const response = await htechService.getOutstandingNews();
    newsList = extractListFromApiResponse<NewsSectionItem>(response).map((item) => ({
      ...item,
      thumbnail_url: resolveApiAssetUrl(item.thumbnail_url, '/placeholder-image.jpg'),
    }));
  } catch (error) {
    console.error("Error fetching outstanding news:", error);
  }


  return (
    <section id="section-news" className="flex flex-col items-center py-16 px-4 w-full bg-white overflow-hidden">
      <div className="w-full max-w-7xl flex flex-col items-center">

        {/* Header */}
        <h2 className={`${homeSectionTitleClass} mb-12 text-center`}>
          {t('news_title')}
        </h2>

        {/* Carousel Container */}
        <NewsCarousel lng={lng} newsList={newsList} />

        {/* Nút Xem thêm */}
        <Link href={`/${lng}/news`} className="mt-12 px-8 py-3 bg-[#EF5941] text-white rounded-full font-medium flex items-center gap-2 hover:bg-[#E63E35] transition-colors shadow-sm hover:shadow-md">
          {t('news_view_more')}
          <ArrowUpRight size={20} strokeWidth={2.5} />
        </Link>

      </div>
    </section>
  )
}
