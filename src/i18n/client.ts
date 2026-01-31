"use client";

import { useEffect } from "react";
import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions } from "./settings";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ["path", "htmlTag", "cookie"],
    },
  });

export function useClientTranslation(lng: string, ns?: string, options?: any) {
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;
  useEffect(() => {
    if (lng && i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  return ret;
}
