"use client";

import { 
  ArrowUpRight, 
  Facebook, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Mail, 
  Phone 
} from "lucide-react";
import Link from "next/link";
import { useClientTranslation } from "@/i18n";

export default function Footer({ lng }: { lng: string }) {
  const { t } = useClientTranslation(lng);

  return (
    <footer className="bg-[#f4f6f9] pt-10 md:py-12 text-[#1a1a1a]">
      <div className="mx-auto max-w-6xl px-6 space-y-8 md:space-y-12">
        
        {/* SECTION 1: Logo, Giới thiệu, Sản phẩm */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Cột 1: Logo */}
          <div className="md:col-span-5 space-y-4 flex flex-col items-start">
            <img src="/assets/logo.png" alt="HTECH Logo" className="h-10 md:h-12 w-auto object-contain" />
            <h1 className="text-sm md:text-base font-bold uppercase tracking-wide">
              {t('footer_company_name')}
            </h1>
          </div>
          
          {/* Cột 2: Giới thiệu */}
          <div className="md:col-span-4 space-y-3 md:space-y-4">
            <h2 className="text-base md:text-lg font-bold">{t('footer_about')}</h2>
            <div className="flex flex-col space-y-3 text-sm md:text-base text-gray-600">
              <Link href="/" className="hover:text-[#EF5941] transition-colors py-1 md:py-0">{t('footer_home')}</Link>
              <Link href="/abouts" className="hover:text-[#EF5941] transition-colors py-1 md:py-0">{t('footer_about_us')}</Link>
              <Link href="/partner" className="hover:text-[#EF5941] transition-colors py-1 md:py-0">{t('footer_partnership')}</Link>
              <Link href="/privacy" className="hover:text-[#EF5941] transition-colors py-1 md:py-0">{t('footer_privacy')}</Link>
              <Link href="/terms" className="hover:text-[#EF5941] transition-colors py-1 md:py-0">{t('footer_terms')}</Link>
            </div>
          </div>

          {/* Cột 3: Sản phẩm */}
          <div className="md:col-span-3 space-y-3 md:space-y-4">
            <h2 className="text-base md:text-lg font-bold">{t('footer_products')}</h2>
            <div className="flex flex-col space-y-3 text-sm md:text-base text-gray-600">
              <Link href="/services" className="hover:text-[#EF5941] transition-colors py-1 md:py-0">{t('footer_services')}</Link>
              <Link href="/projects" className="hover:text-[#EF5941] transition-colors py-1 md:py-0">{t('footer_projects')}</Link>
              <Link href="/news" className="hover:text-[#EF5941] transition-colors py-1 md:py-0">{t('footer_news')}</Link>
            </div>
          </div>
        </section>

        {/* SECTION 2: Liên hệ, Kết nối */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Cột 1: Thông tin liên hệ */}
          <div className="md:col-span-5 space-y-3 md:space-y-4">
            <h2 className="text-base md:text-lg font-bold">{t('footer_contact')}</h2>
            <div className="flex flex-col space-y-3 text-sm md:text-base text-gray-600">
              <p className="flex items-start md:items-center gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5 md:mt-0" />
                <span>{t('footer_address')}: 120 phố Yên Lãng, Đống Đa, Hà Nội</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <span>Email: physicmommaycry@gmail.com</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <span>Tel: (024) 67676789</span>
              </p>
            </div>
          </div>

          {/* Cột 2: Mạng xã hội */}
          <div className="md:col-span-4 space-y-3 md:space-y-4">
            <h2 className="text-base md:text-lg font-bold">{t('footer_social')}</h2>
            <div className="flex flex-col space-y-3 text-sm md:text-base text-gray-600">
              <Link href="#" className="flex items-center w-fit hover:text-[#EF5941] transition-colors py-1 md:py-0">
                <Facebook className="h-5 w-5" /> <span className="ml-2">htechevent.com</span>
              </Link>
              <Link href="#" className="flex items-center w-fit hover:text-[#EF5941] transition-colors py-1 md:py-0">
                <Instagram className="h-5 w-5" /> <span className="ml-2">htechevent.com</span>
              </Link>
              <Link href="#" className="flex items-center w-fit hover:text-[#EF5941] transition-colors py-1 md:py-0">
                <Linkedin className="h-5 w-5" /> <span className="ml-2">htechevent.com</span>
              </Link>
            </div>
          </div>
          
          {/* Cột 3: Để trống duy trì Grid trên PC */}
          <div className="hidden md:block md:col-span-3"></div>
        </section>

        {/* SECTION 3: Box Liên hệ hợp tác */}
        <section className="flex flex-col sm:flex-row items-center justify-between rounded-2xl bg-white p-5 sm:px-8 sm:py-4 shadow-sm gap-4 text-center sm:text-left">
          <p className="text-base md:text-lg font-semibold">{t('footer_cta_text')}</p>
          <Link 
            href="/abouts" 
            className="flex items-center justify-center w-full sm:w-auto gap-2 rounded-xl bg-[#EF5941] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#d84e38]"
          >
            {t('footer_cta_button')} <ArrowUpRight className="h-5 w-5"/>
          </Link>
        </section>

        {/* Bản quyền */}
        <section className="pt-2 pb-2 text-center text-xs md:text-sm text-gray-500 border-t border-gray-200/60 md:border-none md:pt-4">
          <p>© 2026 HTECH. All Rights Reserved.</p>
        </section>

      </div>
    </footer>
  )
}