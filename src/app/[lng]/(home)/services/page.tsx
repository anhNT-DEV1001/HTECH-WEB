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
      <ServiceSliderSection lng={lng} />
      {/* <ContactSection /> */}
    </div>
  )
}
