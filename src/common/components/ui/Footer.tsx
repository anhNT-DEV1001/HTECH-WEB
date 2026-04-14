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
  address?: string;
  email?: string;
  phone?: string;
};

type CompanyInfoResponse = {
  data?: CompanyInfo;
};

export default function Footer({ lng }: { lng: string }) {
  const { t } = useClientTranslation(lng);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
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

  return (
    <footer className="bg-[#f4f6f9] pt-10 md:py-12 text-[#1a1a1a]">
      <div className="mx-auto max-w-6xl px-6 space-y-8 md:space-y-12">
        {/* SECTION 2: Logo (Footage), Liên hệ, Giới thiệu, Sản phẩm */}
        <section className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-12">
          {/* Footage / Logo */}
          <div className="lg:col-span-3 space-y-4">
            <img src="/assets/logo.png" alt="HTECH Logo" className="h-12 md:h-16 w-auto object-contain" />
            <p className="text-sm text-gray-500 italic">{companyInfo?.name || t('footer_company_name')}</p>
          </div>
          {/* Giới thiệu */}
          <div className="lg:col-span-3 space-y-4 whitespace-nowrap">
            <h2 className="text-lg font-bold text-[#EF5941]">{t('footer_about')}</h2>
            <div className="flex flex-col space-y-2 text-sm md:text-base text-gray-600">
              <Link href={getLocalizedUrl("/")} className="hover:text-[#EF5941] transition-colors">{t('footer_home')}</Link>
              <Link href={getLocalizedUrl("/abouts")} className="hover:text-[#EF5941] transition-colors">{t('footer_about_us')}</Link>
              <Link href={getLocalizedUrl("/partners")} className="hover:text-[#EF5941] transition-colors">{t('footer_partnership')}</Link>
              <Link href={getLocalizedUrl("/privacy")} className="hover:text-[#EF5941] transition-colors">{t('footer_privacy')}</Link>
              <Link href={getLocalizedUrl("/terms")} className="hover:text-[#EF5941] transition-colors">{t('footer_terms')}</Link>
            </div>
          </div>

          {/* Sản phẩm */}
          <div className="lg:col-span-2 space-y-4 whitespace-nowrap">
            <h2 className="text-lg font-bold text-[#EF5941]">{t('footer_products')}</h2>
            <div className="flex flex-col space-y-2 text-sm md:text-base text-gray-600">
              <Link href={getLocalizedUrl("/services")} className="hover:text-[#EF5941] transition-colors">{t('footer_services')}</Link>
              <Link href={getLocalizedUrl("/projects")} className="hover:text-[#EF5941] transition-colors">{t('footer_projects')}</Link>
              <Link href={getLocalizedUrl("/news")} className="hover:text-[#EF5941] transition-colors">{t('footer_news')}</Link>
            </div>
          </div>
          {/* Liên hệ */}
          <div className="lg:col-span-4 space-y-4 whitespace-nowrap">
            <h2 className="text-lg font-bold text-[#EF5941]">{t('footer_contact')}</h2>
            <div className="flex flex-col space-y-3 text-sm md:text-base text-gray-600">
              <p className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-[#EF5941]" />
                <span>{t('footer_address')}: {companyInfo?.address || '120 phố Yên Lãng, Đống Đa, Hà Nội'}</span>
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

        {/* SECTION 3: Mạng xã hội (Hàng ngang) */}
        <section className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6">
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

          {/* Bản quyền (Chuyển xuống đây cho gọn) */}
          <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
            <p>© 2026 HTECH. All Rights Reserved.</p>
          </div>
        </section>

        {/* SECTION 3: Box Liên hệ hợp tác */}
        {/* <section className="flex flex-col sm:flex-row items-center justify-between rounded-2xl bg-white p-5 sm:px-8 sm:py-4 shadow-sm gap-4 text-center sm:text-left">
          <p className="text-base md:text-lg font-semibold">{t('footer_cta_text')}</p>
          <Link 
            href="/abouts" 
            className="flex items-center justify-center w-full sm:w-auto gap-2 rounded-xl bg-[#EF5941] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#d84e38]"
          >
            {t('footer_cta_button')} <ArrowUpRight className="h-5 w-5"/>
          </Link>
        </section> */}


      </div>
    </footer>
  )
}
