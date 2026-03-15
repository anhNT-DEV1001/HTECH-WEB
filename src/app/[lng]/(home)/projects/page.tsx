import ContactSection from "@/common/components/about/ContactSection";
import HeroProjectSection from "@/common/components/project/HeroProjectSection";
import ProjectListSection from "@/common/components/project/ProjectListSection";

interface Props {
  params: Promise<{ lng: string }>;
}

export default async function Projects({ params }: Props) {
  const { lng } = await params;
  return (
    <div>
      <HeroProjectSection />
      <ProjectListSection slug={lng} />
      <ContactSection />
    </div>
  );
}