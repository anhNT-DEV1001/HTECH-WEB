import ContactSection from "@/common/components/about/ContactSection";

export default async function Contact({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return (
    <ContactSection lng={lng} />
  )
}
