export const fallbackLng = "vi";
export const languages = [fallbackLng, "en"];
export const defaultNS = "translation";
export const cookieName = "i18next";

/**
 * @author Nguyễn Tuấn Anh
 * @created_at : 17/01/2026
 * @updated_at : 17/01/2026
 * @description Cấu hình i18next chung cho cả server và client
 * @param lng
 * @param ns
 * @returns
 */
export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
