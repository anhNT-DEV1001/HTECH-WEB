import { languages } from "@/i18n";
import "@/app/globals.css";
import type { Metadata } from "next";
import Header from "@/common/components/ui/Header";
import Footer from "@/common/components/ui/Footer";
import ScrollToTop from "@/common/components/ui/ScrollToTop";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  const isVi = lng === "vi";
  
  const siteName = "HTECH - Global Nexus";
  const title = isVi 
    ? "HTECH - Nâng tầm trí tuệ Việt Nam | Giải pháp Công nghệ Toàn diện" 
    : "HTECH - Elevating Vietnamese Intellect | Comprehensive Tech Solutions";
  
  const description = isVi 
    ? "HTECH là công ty công nghệ tiên phong tại Việt Nam, chuyên cung cấp giải pháp chuyển đổi số, phát triển phần mềm và kết nối hệ sinh thái công nghệ thực tiễn."
    : "HTECH is a pioneering technology company in Vietnam, specializing in digital transformation solutions, software development, and connecting technology ecosystems.";

  const keywords = isVi
    ? ["HTECH", "Công nghệ", "Chuyển đổi số", "Phần mềm", "Giải pháp IT", "HTech Event", "htechevent", "Công nghệ Việt Nam"]
    : ["HTECH", "Technology", "Digital Transformation", "Software Development", "IT Solutions", "HTech Event", "htechevent", "Vietnam Tech"];

  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://htechevent.com";

  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description: description,
    keywords: keywords,
    authors: [{ name: "HTECH Team", url: url }],
    creator: "HTECH",
    publisher: "HTECH",
    
    // Đa ngôn ngữ (Cực kỳ quan trọng cho SEO đa ngôn ngữ)
    alternates: {
      canonical: `/${lng}`,
      languages: {
        "vi-VN": "/vi",
        "en-US": "/en",
        "x-default": "/vi", // Mặc định về tiếng Việt nếu ngôn ngữ khác không khớp
      },
    },

    openGraph: {
      title: title,
      description: description,
      url: `/${lng}`,
      siteName: siteName,
      images: [
        {
          url: "/assets/banner.jpg",
          width: 1200,
          height: 630,
          alt: isVi ? "HTECH - Nâng tầm trí tuệ Việt Nam" : "HTECH - Elevating Vietnamese Intellect",
        },
      ],
      locale: isVi ? "vi_VN" : "en_US",
      type: "website",
    },
    
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["/assets/banner.jpg"],
      creator: "@htechevent",
    },
    
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png", // Nếu bạn có ảnh icon riêng cho Apple
    },

    verification: {
      google: "google-site-verification-id", // Thay bằng mã thật khi bạn có
      // yandex: "yandex-verification-id",
    },
  };
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;

  return (
    <html lang={lng}>
      <body className="font-sans h-full w-full relative">
        <Header slug={lng} />
        <div className="pt-20">
          {children}
        </div>
        <Footer lng={lng} />
        <ScrollToTop />
      </body>
    </html>
  );
}
