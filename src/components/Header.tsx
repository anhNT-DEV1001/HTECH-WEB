"use client"
import { useClientTranslation } from "@/i18n";
/**
 * @author Ta Duc Minh
 * @created_at : 26/01/2026
 * @updated_at : 30/01/2026
 * @description update max width
 * @params null
 * @returns
 */

import LanguageSwitcher from "./LanguageSwitcher";
import { useRouter } from "next/navigation";
import { JsonLangFile } from "@/enums";

export default function Header({lng} : {lng: string}){
  const router = useRouter();
  const toggleLogo = () => {
    router.push("/");
  }
  const {t} = useClientTranslation(lng, JsonLangFile.MENU);
  return (
    <header className="sticky top-0">
      <div className="py-2">
        <div className="flex flex-row justify-between max-w-6xl lg:w-2/3 
        sm:w-4/5 px-4 mx-auto items-center">
          <div className="flex wrap">
            <button
              onClick={toggleLogo}
              className="hover:opacity-75 transitions-opacity cursor-pointer"
              aria-label="Go to homepage"
            >
              <img
                src="/assets/htech-logo.webp"
                className="w-auto h-7 sm:h-10"
                alt="logo"
              />
            </button>
          </div>
          <div className="flex">
            <div className="hidden sm:flex flex-row items-center ">
              <li className="flex flex-row px-4 text-sm md:text-lg 
              gap-2 items-center">
                <ul>{t("home")}</ul>
                <ul>{t("services")}</ul>
                <ul>{t("contact")}</ul>
                <ul>{t("cooperate")}</ul>
                <ul>{t("news")}</ul>
                <ul>{t("aboutUs")}</ul>
              </li>
            </div>
            <div className="">
              <LanguageSwitcher />
            </div>
            <div className="sm:hidden">Side bar</div>
          </div>
        </div>
      </div>
    </header>
  );
}