"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

/**
 * @author Nguyễn Tuấn Anh
 * @created_at : 17/01/2026
 * @updated_at : 25/01/2026
 * @updated_by : Đức Minh
 * @description Component chuyển đổi ngôn ngữ giữa Tiếng Việt và Tiếng Anh
 * @params null
 * @returns
 */
export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLang = pathname.split("/")[1];

  const toggleLanguage = () => {
    const newLang = currentLang === "vi" ? "en" : "vi";
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2  hover:bg-gray-200 rounded-lg transition-colors"
      aria-label="Change Language"
    >
      <Image
        src={currentLang === "vi" ? "/assets/en.webp" : "/assets/vi.webp"}
        alt={currentLang === "vi" ? "English" : "Tiếng Việt"}
        width={24}
        height={24}
      />
    </button>
  );
}
