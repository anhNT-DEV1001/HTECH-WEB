import { readdir } from "node:fs/promises";
import path from "node:path";
import HeroPartnerSection from "@/common/components/partner/HeroPartnerSection";
import MissionPartnerSection from "@/common/components/partner/MissionPartnerSection";
import PartnerLogoSection from "@/common/components/partner/PartnerLogoSection";
import { useServerTranslation } from "@/i18n";

interface Props {
  params: Promise<{ lng: string }>;
}

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".avif"]);

async function getPartnerLogos(folder: "in" | "out") {
  const directory = path.join(process.cwd(), "public", "assets", "parttern-logo", folder);

  try {
    const entries = await readdir(directory, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => encodeURI(`/assets/parttern-logo/${folder}/${entry.name}`))
      .sort((left, right) => left.localeCompare(right, "vi", { numeric: true, sensitivity: "base" }));
  } catch (error) {
    console.error(`Error reading partner logos from ${folder}:`, error);
    return [];
  }
}

export default async function Partners({ params }: Props) {
  const { lng } = await params;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useServerTranslation(lng);
  const [globalLogos, domesticLogos] = await Promise.all([
    getPartnerLogos("out"),
    getPartnerLogos("in"),
  ]);

  return (
    <div>
      <HeroPartnerSection lng={lng} />
      <MissionPartnerSection lng={lng} />
      <PartnerLogoSection
        title={t("partner_global_title")}
        highlight={t("partner_global_highlight")}
        subtitle={t("partner_global_subtitle")}
        logos={globalLogos}
      />
      {/* Orange divider */}
      <div className="max-w-3xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[#EF5941]/40 to-transparent" />
      </div>
      <PartnerLogoSection
        title={t("partner_vn_title")}
        highlight={t("partner_vn_highlight")}
        logos={domesticLogos}
      />
      {/* <ContactSection /> */}
    </div>
  );
}
