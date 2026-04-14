import ContactSection from "@/common/components/about/ContactSection";
import HeroJobsSection from "@/common/components/jobs/HeroJobsSection";
import JobsListSection from "@/common/components/jobs/JobsListSection";
import { htechService } from "@/common/services/htech.service";

interface Props {
  params: Promise<{ lng: string }>;
}

export default async function Jobs({ params }: Props) {
  const { lng } = await params;

  let companyInfo = null;
  try {
    const res: any = await htechService.getCompanyInfo();
    if (res?.data) {
      companyInfo = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch company info", error);
  }

  // Format banner URL
  let bannerUrl = companyInfo?.banner || "";
  if (bannerUrl && !bannerUrl.startsWith('http')) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const host = apiUrl.replace(/\/api\/v1\/?$/, '');
    bannerUrl = `${host}${bannerUrl.startsWith('/') ? bannerUrl : `/${bannerUrl}`}`;
  }

  const isVideo = bannerUrl ? /\.(mp4|webm|ogg)(\?.*)?$/i.test(bannerUrl) : false;

  return (
    <div className="w-full">
      {bannerUrl && (
        <div className="w-full aspect-video md:h-[400px] lg:h-[500px]">
          {isVideo ? (
            <video 
              src={bannerUrl} 
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={bannerUrl} 
              alt="Company Banner" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}
      <HeroJobsSection lng={lng} />
      <JobsListSection lng={lng} />
      {/* <ContactSection /> */}
    </div>
  );
}