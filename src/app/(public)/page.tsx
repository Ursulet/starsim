import { ContributionSection } from "@/components/home/ContributionSection";
import { EventsSection } from "@/components/home/EventsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionSection } from "@/components/home/MissionSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomepageEvents, getHomepagePrograms } from "@/lib/queries/home";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema";

export default async function HomePage() {
  const [programs, events] = await Promise.all([getHomepagePrograms(), getHomepageEvents()]);
  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <HeroSection />
      <MissionSection />
      <ProgramsSection programs={programs} />
      <EventsSection events={events} />
      <ContributionSection />
    </>
  );
}
