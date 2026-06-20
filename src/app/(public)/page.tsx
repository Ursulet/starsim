import { ContributionSection } from "@/components/home/ContributionSection";
import { EventsSection } from "@/components/home/EventsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionSection } from "@/components/home/MissionSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomepageEvents, getHomepagePrograms, getHomepageSettings } from "@/lib/queries/home";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema";

export default async function HomePage() {
  const [programs, events, settings] = await Promise.all([getHomepagePrograms(), getHomepageEvents(), getHomepageSettings()]);
  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <HeroSection settings={settings} />
      <MissionSection settings={settings} />
      <ProgramsSection programs={programs} title={settings.programsTitle} />
      <EventsSection events={events} settings={settings} />
      <ContributionSection settings={settings} />
    </>
  );
}
