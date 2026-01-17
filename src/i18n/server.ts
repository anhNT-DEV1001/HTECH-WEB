import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

/**
 * @author Nguyễn Tuấn Anh
 * @created_at : 17/01/2026
 * @updated_at : 17/01/2026
 * @description Khởi tạo i18next cho server-side với file ngôn ngữ trong thư mục locales
 * @param lng
 * @param ns
 * @returns
 */
const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

/**
 * @author Nguyễn Tuấn Anh
 * @created_at : 17/01/2026
 * @updated_at : 17/01/2026
 * @description Sử dụng i18next trên server-side để dịch nội dung. Truyền vào lng và file dịch
 * @example useTranslation("vi", "menu") ==> Sử dụng enum JsonLangFile.MENU để tránh lỗi do tên file
 * @param lng
 * @param ns
 * @param options
 * @returns
 */
export async function useTranslation(
  lng: string,
  ns?: string,
  options: any = {},
) {
  const i18nextInstance = await initI18next(lng, ns || "translation");
  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix,
    ),
    i18n: i18nextInstance,
  };
}
