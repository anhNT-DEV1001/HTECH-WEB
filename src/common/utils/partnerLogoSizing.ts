const boostedLogos = new Set([
  "bộ công an.png",
  "bộ xây dựng.png",
]);

const reducedLogos = new Set([
  "3.2 Vossloh_Logo.svg.png",
  "3.3 Maccaferri logo.png",
  "Ammann_Group_logo.svg.png",
  "Hitachi_logo.png",
  "IWASAKY ELECTRIC PNG.png",
  "Jenbacher.png",
  "Korea National Railway.png",
  "Mitsubishi_Heavy_Industries.png",
  "Pandrol.png",
  "Trimble PNG.png",
  "Zephir PNG.png",
  "htech.png",
  "hyster.png",
  "schlattergroup PNG.png",
]);

function getLogoFileName(logo: string) {
  const normalizedLogo = decodeURIComponent(logo);
  return normalizedLogo.split("/").pop() ?? normalizedLogo;
}

export function getPartnerLogoScaleClass(logo: string) {
  const fileName = getLogoFileName(logo);

  if (boostedLogos.has(fileName)) {
    return "scale-110 md:scale-115";
  }

  if (reducedLogos.has(fileName)) {
    return "scale-90 md:scale-[0.85]";
  }

  return "scale-100";
}
