import ContactSection from "@/common/components/about/ContactSection";
import HeroServiceSection from "@/common/components/services/HeroServiceSection";
import ServiceSliderSection from "@/common/components/services/ServiceSliderSection";

export default function Services() {
  return (
    <div className="">
      <HeroServiceSection />
      <ServiceSliderSection />
      <ContactSection />
    </div>
  )
}