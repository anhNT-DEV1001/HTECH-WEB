import {ChevronLeft, ChevronRight, ArrowUpRight} from 'lucide-react';

export default function NewsSection() {
  const newsList = [
      {
        image: "/news-1.jpg",
        title: "Open Innovation Day 2025: Kết nối hệ sinh thái đổi mới sáng tạo toàn cầu",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,..."
      },
      {
        image: "/news-2.jpg",
        title: "Year End Party 2025: Kết nối đại gia đình, hướng đến năm mới hứng khởi, thành công",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,..."
      },
      {
        image: "/news-3.jpg",
        title: "Khởi động Chương trình Thử thách Đổi mới Sáng tạo Qualcomm Việt Nam 2026",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,..."
      }
    ];
  
  return (
    <section id="section-news" className="flex flex-col items-center py-16 px-4 w-full bg-white overflow-hidden">
      <div className="w-full max-w-7xl flex flex-col items-center">
        
        {/* Header */}
        <h2 className="text-[#1E0D01] font-bold text-3xl md:text-4xl mb-12 text-center">
          Cập nhật tin tức - hoạt động
        </h2>

        {/* Carousel Container */}
        <div className="relative w-full flex items-center justify-center">
          
          {/* Nút Previous (Mũi tên trái) */}
          <button 
            className="hidden md:flex absolute -left-4 lg:-left-12 z-10 items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 text-[#1E0D01] hover:bg-gray-50 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full px-4 md:px-8 lg:px-0">
            {newsList.map((item, index) => (
              <div key={index} className="flex flex-col gap-4 group cursor-pointer">
                <div className="w-full h-[200px] md:h-[240px] overflow-hidden rounded-[2rem]">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover bg-gray-200 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-2 px-1">
                  <h3 className="text-[#1E0D01] font-bold text-lg leading-tight group-hover:text-[#FF4A3F] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[#1E0D01]/60 text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Nút Next (Mũi tên phải) */}
          <button 
            className="hidden md:flex absolute -right-4 lg:-right-12 z-10 items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 text-[#1E0D01] hover:bg-gray-50 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

        </div>

        {/* Nút Xem thêm */}
        <button className="mt-12 px-8 py-3 bg-[#EF5941] text-white rounded-full font-medium flex items-center gap-2 hover:bg-[#E63E35] transition-colors shadow-sm hover:shadow-md">
          Xem thêm 
          <ArrowUpRight size={20} strokeWidth={2.5} />
        </button>

      </div>
    </section>
  )
}