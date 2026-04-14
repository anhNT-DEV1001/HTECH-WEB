import MissionVisionSection from "@/common/components/about/Mission";
import MissionDetailsSection from "@/common/components/about/MissionDetail";
import ShapeSection from "@/common/components/about/ShapeSection";

export default async function Abouts({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return (
    <div className="">
      <ShapeSection lng={lng} />
      <MissionVisionSection lng={lng} />
      <MissionDetailsSection lng={lng} />
      {/* <ContactSection /> */}
    </div>
  )
}
