import { languages } from "@/i18n";
import "../globals.css";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Header from "@/common/components/ui/Header";
import Footer from "@/common/components/ui/Footer";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  
  const isVi = lng === "vi";
  const title = isVi ? "HTECH - Nâng tầm trí tuệ Việt Nam" : "HTECH - Elevating Vietnamese Intellect";
  const description = isVi 
    ? "HTECH là công ty công nghệ tiên phong, đồng hành cùng doanh nghiệp trong chuyển đổi số và kết nối công nghệ với thực tiễn thị trường."
    : "HTECH is a pioneering technology company, accompanying businesses in digital transformation and connecting technology with market realities.";

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://htechevent.com"
    ),
    
    title: {
      default: title,
      template: "%s | HTECH",
    },
    description: description,
    keywords: ["HTECH", "Công nghệ", "Chuyển đổi số", "Phần mềm", "IT Solutions","HTech Event", "htechevent"],
    
    openGraph: {
      title: title,
      description: description,
      url: "/",
      siteName: "HTECH",
      images: [
        {
          url: "/assets/banner.jpg",
          width: 1200,
          height: 630,
          alt: "HTECH Banner",
        },
      ],
      locale: isVi ? "vi_VN" : "en_US",
      type: "website",
    },
    
    // Tối ưu cho việc chia sẻ lên X (Twitter)
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["/assets/banner.jpg"],
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
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
      <body
        className={`${beVietnamPro.variable} font-sans h-full w-full relative`}>
        <Header slug={lng} />
        {children}
        <Footer />
      </body>
    </html>
  );
}