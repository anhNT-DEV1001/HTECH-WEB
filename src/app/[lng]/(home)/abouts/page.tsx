import ContactSection from "@/common/components/about/ContactSection";
import MissionVisionSection from "@/common/components/about/Mission";
import MissionDetailsSection from "@/common/components/about/MissionDetail";
import ShapeSection from "@/common/components/about/ShapeSection";

export default function Abouts() {
  return (
    <div className="">
      <ShapeSection/>
      <MissionVisionSection/>
      <MissionDetailsSection/>
      <ContactSection/>
    </div>
  )
}