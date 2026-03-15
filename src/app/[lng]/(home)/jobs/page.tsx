import ContactSection from "@/common/components/about/ContactSection";
import HeroJobsSection from "@/common/components/jobs/HeroJobsSection";
import JobsListSection from "@/common/components/jobs/JobsListSection";

interface Props {
  params: Promise<{ lng: string }>;
}

export default async function Jobs({ params }: Props) {
  const { lng } = await params;
  return (
    <div>
      <HeroJobsSection lng={lng} />
      <JobsListSection lng={lng} />
      <ContactSection />
    </div>
  );
}