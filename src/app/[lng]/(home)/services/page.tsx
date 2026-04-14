import ContactSection from "@/common/components/about/ContactSection";
import HeroServiceSection from "@/common/components/services/HeroServiceSection";
import ServiceSliderSection from "@/common/components/services/ServiceSliderSection";

interface Props {
  params: {
    lng: string;
  };
}

export default function Services({ params: { lng } }: Props) {
  return (
    <div className="">
      <HeroServiceSection lng={lng} />
      <ServiceSliderSection />
      {/* <ContactSection /> */}
    </div>
  )
}