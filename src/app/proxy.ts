import { fallbackLng, languages } from "@/i18n";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

/**
 * @author Nguyễn Tuấn Anh
 * @created_at : 17/01/2026
 * @updated_at : 17/01/2026
 * @description Middleware (Proxy) để tự động thêm ngôn ngữ mặc định vào URL nếu người dùng không chỉ định ngôn ngữ
 * @param req
 * @returns
 */
export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const pathnameIsMissingLocale = languages.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
  if (pathnameIsMissingLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${fallbackLng}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
