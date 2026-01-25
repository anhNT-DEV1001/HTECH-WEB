import { JsonLangFile } from "@/enums";
import { useTranslation } from "@/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await useTranslation(lng, JsonLangFile.MENU);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">{t("home")}</h1>
      <h2>Check Ci / CD by Tuấn Anh</h2>
      <p>{t("about")}</p>
    </main>
  );
}
