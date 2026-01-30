"use client"
import { JsonLangFile } from "@/enums";
import { useClientTranslation } from "@/i18n";
/**
 * @author Ta Duc Minh
 * @created_at : 26/01/2026
 * @updated_at : 30/01/2026
 * @description big update
 * @params lng
 * @returns
 */

export default function Footer({lng} : {lng : string}){
  const {t} = useClientTranslation(lng, JsonLangFile.MENU);
  return(
    <footer>
      <div className="py-10">
        <div className="flex grid grid-col-1 sm:grid-cols-8 justify-between mx-auto 
        px-2 max-w-6xl lg:w-2/3 sm:w-4/5 px-4 gap-2">
          <div className="flex flex-col sm:col-span-4 col-span-3">
            <div>
              <img
                src="/assets/htech-logo.webp"
                className="w-auto h-7 sm:h-10"
                alt="logo"
              />
            </div>
            <p className="text-sm md:text-lg">Cong ty co phan cong nghe va su kien HTECH</p>
          </div>
          <div className="flex flex-col text-sm md:text-lg col-span-2">
            <p className="font-bold">Gioi Thieu</p>
            <a>Ve chung toi</a>
            <a>Chinh sach quyen rieng tu</a>
            <a>Dieu khoan dich vu</a>
          </div>
          <div className="flex flex-col text-sm md:text-lg col-span-2">
            <p className="font-bold">Lien he</p>
            <p>120 Yen lang, Dong Da, Ha Noi</p>
            <p>Email: 123@gmail.com</p>
            <p>Tel: 0123456789</p>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between mx-auto 
        px-2 max-w-6xl lg:w-2/3 sm:w-4/5 px-4 gap-4">
          <div>Media logo</div>
          <div>BO PC logo</div>
        </div>
      </div>
      
    </footer>
  )
}