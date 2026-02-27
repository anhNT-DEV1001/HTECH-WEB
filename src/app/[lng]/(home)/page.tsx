import { JsonLangFile } from "@/enums";
import { useServerTranslation } from "@/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await useServerTranslation(lng, JsonLangFile.MENU);

  return (
    <main className="min-h-screen pt-4 flex flex-col">
      {/* Đã thêm background trắng và gradient overlay 25% vào hero-section */}
      <section 
        id="hero-section" 
        className="flex flex-col items-center bg-white bg-gradient-to-b from-transparent via-orange-500/25 to-transparent pb-10"
      >
        <h1 className="text-[#1E0D01] font-bold text-3xl">HTECH - GLOBAL NEXUS</h1>
        <small className="text-[#1E0D01]/80">Connecting Technologies – Shaping Sustainable Growth</small>
        <img src="" alt="banner" className="my-4" />
        <div className="text-[#1E0D01]">Description</div>
        <small className="text-wrap text-center text-[#1E0D01]/70 max-w-2xl px-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos numquam dicta, sed vero sunt reiciendis nisi iusto quae molestias ut voluptates fugiat recusandae magni eius hic laborum similique et provident.
        </small>
      </section>
    </main>
  );
}