"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";
import { useClientTranslation } from "@/i18n";
import { useEffect, useState } from "react";
import { htechService } from "@/common/services/htech.service";

type CompanyInfo = {
  name?: string;
  name_en?: string;
  address?: string;
  address_en?: string;
  email?: string;
  phone?: string;
};

type CompanyInfoResponse = {
  data?: CompanyInfo;
};

export default function Footer({ lng }: { lng: string }) {
  const { t } = useClientTranslation(lng);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const getLocalizedCompanyField = (
    fieldName: "name" | "address",
    fallback: string,
  ) => {
    if (!companyInfo) return fallback;

    const englishValue = companyInfo[`${fieldName}_en`];
    const defaultValue = companyInfo[fieldName];

    if (lng === "en" && englishValue) {
      return englishValue;
    }

    return defaultValue || fallback;
  };
  const getLocalizedUrl = (path: string) => {
    const cleanPath = path === "/" ? "" : path;
    return `/${lng}${cleanPath}`;
  };

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await htechService.getCompanyInfo() as CompanyInfoResponse;
        if (res?.data) {
          setCompanyInfo(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch company info", error);
      }
    };
    fetchCompanyInfo();
  }, []);

  const companyName = getLocalizedCompanyField("name", t('footer_company_name'));
  const companyAddress = getLocalizedCompanyField("address", '120 phố Yên Lãng, Đống Đa, Hà Nội');

  return (
    <footer className="bg-[#f4f6f9] pt-10 md:py-12 text-[#1a1a1a]">
      <div className="mx-auto max-w-6xl px-6 space-y-8 md:space-y-12">
        <section className="flex justify-center md:justify-start">
          <div className="flex min-w-0 flex-col items-center gap-10 text-center md:items-start md:text-left">
            <img src="/assets/logo.png" alt="HTECH Logo" className="h-12 w-auto object-contain md:h-16" />
            <p
              className="text-sm text-gray-500 italic md:text-base"
              title={companyName}
            >
              {companyName}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-50 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <div className="min-w-0 space-y-4">
            <h2 className="text-lg font-bold text-[#EF5941]">{t('footer_about')}</h2>
            <div className="flex flex-col space-y-2 text-sm md:text-base text-gray-600">
              <Link href={getLocalizedUrl("/")} className="hover:text-[#EF5941] transition-colors">{t('footer_home')}</Link>
              <Link href={getLocalizedUrl("/abouts")} className="hover:text-[#EF5941] transition-colors">{t('footer_about_us')}</Link>
              <Link href={getLocalizedUrl("/partners")} className="hover:text-[#EF5941] transition-colors">{t('footer_partnership')}</Link>
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            <h2 className="text-lg font-bold text-[#EF5941]">{t('footer_products')}</h2>
            <div className="flex flex-col space-y-2 text-sm md:text-base text-gray-600">
              <Link href={getLocalizedUrl("/services")} className="hover:text-[#EF5941] transition-colors">{t('footer_services')}</Link>
              <Link href={getLocalizedUrl("/projects")} className="hover:text-[#EF5941] transition-colors">{t('footer_projects')}</Link>
              <Link href={getLocalizedUrl("/news")} className="hover:text-[#EF5941] transition-colors">{t('footer_news')}</Link>
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            <h2 className="text-lg font-bold text-[#EF5941]">{t('footer_contact')}</h2>
            <div className="flex flex-col space-y-3 text-sm md:text-base text-gray-600">
              <p className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-[#EF5941]" />
                <span>{t('footer_address')}: {companyAddress}</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#EF5941]" />
                <span>Email: {companyInfo?.email || 'physicmommaycry@gmail.com'}</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-[#EF5941]" />
                <span>Tel: {companyInfo?.phone || '(024) 67676789'}</span>
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2 md:gap-x-28 lg:grid-cols-3 lg:gap-16">
          <div className="flex items-center gap-4">
            <h2 className="text-base font-bold text-gray-700 whitespace-nowrap">{t('footer_social')}:</h2>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-gray-600 hover:text-[#EF5941] transition-all transform hover:scale-110">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#EF5941] transition-all transform hover:scale-110">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#EF5941] transition-all transform hover:scale-110">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap md:self-end lg:col-start-3 lg:col-span-1">
            <p>© 2026 HTECH. All Rights Reserved.</p>
          </div>
        </section>
      </div>
    </footer>
  )
}
