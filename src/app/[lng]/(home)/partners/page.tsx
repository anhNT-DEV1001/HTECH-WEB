import ContactSection from "@/common/components/about/ContactSection";
import HeroPartnerSection from "@/common/components/partner/HeroPartnerSection";
import MissionPartnerSection from "@/common/components/partner/MissionPartnerSection";
import PartnerLogoSection from "@/common/components/partner/PartnerLogoSection";
import { useServerTranslation } from "@/i18n";

interface Props {
  params: Promise<{ lng: string }>;
}

export default async function Partners({ params }: Props) {
  const { lng } = await params;
  const { t } = await useServerTranslation(lng);

  return (
    <div>
      <HeroPartnerSection lng={lng} />
      <MissionPartnerSection lng={lng} />
      <PartnerLogoSection
        title={t("partner_global_title")}
        highlight={t("partner_global_highlight")}
        subtitle={t("partner_global_subtitle")}
      />
      {/* Orange divider */}
      <div className="max-w-3xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[#EF5941]/40 to-transparent" />
      </div>
      <PartnerLogoSection
        title={t("partner_vn_title")}
        highlight={t("partner_vn_highlight")}
      />
      <ContactSection />
    </div>
  );
}