import { ArrowUpRight } from 'lucide-react';
import { htechService } from '@/common/services/htech.service';
import NewsCarousel from './NewsCarousel';

export default async function NewsSection() {
  let newsList: any[] = [];
  try {
    const response: any = await htechService.getOutstandingNews();
    if (response?.data?.data) {
       newsList = response.data.data;
    } else if (Array.isArray(response?.data)) {
       newsList = response.data;
    }

    // Format the thumbnail URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const host = apiUrl.replace(/\/api\/v1\/?$/, ''); // Remove /api/v1 from host

    newsList = newsList.map((item: any) => {
      let url = item.thumbnail_url;
      if (url && !url.startsWith('http')) {
        url = `${host}${url.startsWith('/') ? url : `/${url}`}`;
      }
      return { ...item, thumbnail_url: url || '/placeholder-image.jpg' };
    });
  } catch (error) {
    console.error("Error fetching outstanding news:", error);
  }

  
  return (
    <section id="section-news" className="flex flex-col items-center py-16 px-4 w-full bg-white overflow-hidden">
      <div className="w-full max-w-7xl flex flex-col items-center">
        
        {/* Header */}
        <h2 className="text-[#1E0D01] font-bold text-3xl md:text-4xl mb-12 text-center">
          Cập nhật tin tức - hoạt động
        </h2>

        {/* Carousel Container */}
        <NewsCarousel newsList={newsList} />

        {/* Nút Xem thêm */}
        <button className="mt-12 px-8 py-3 bg-[#EF5941] text-white rounded-full font-medium flex items-center gap-2 hover:bg-[#E63E35] transition-colors shadow-sm hover:shadow-md">
          Xem thêm 
          <ArrowUpRight size={20} strokeWidth={2.5} />
        </button>

      </div>
    </section>
  )
}