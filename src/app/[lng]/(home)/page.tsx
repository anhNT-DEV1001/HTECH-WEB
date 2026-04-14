import HeroSection from "@/common/components/home/HeroSection";
// import ServiceSection from "@/common/components/home/ServiceSection";
import FieldSection from "@/common/components/home/FieldSection";
import ProjectSection from "@/common/components/home/ProjectSection";
import NewsSection from "@/common/components/home/NewsSection";
export default async function Home({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return (
    <main className="min-h-screen pt-4 flex flex-col">
      {/* Đã thêm background trắng và gradient overlay 25% vào hero-section */}
      <HeroSection lng={lng} />
      {/* <ServiceSection lng={lng} /> */}
      <FieldSection lng={lng} />
      <ProjectSection lng={lng} />
      <NewsSection lng={lng} />
    </main>
  );
}
