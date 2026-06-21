import { ContributionSection } from "@/components/home/ContributionSection";
import { EventsSection } from "@/components/home/EventsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionSection } from "@/components/home/MissionSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { 
  getHomepageEvents, 
  getHomepagePrograms, 
  getHomepageSettings,
  getHomepageGallery,
  getHomepageArticles,
  getHomepageTestimonials,
  getHomepagePartners
} from "@/lib/queries/home";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema";

export default async function HomePage() {
  const [
    programs, 
    events, 
    settings,
    galleryAlbums,
    articles,
    testimonials,
    partners
  ] = await Promise.all([
    getHomepagePrograms(), 
    getHomepageEvents(), 
    getHomepageSettings(),
    getHomepageGallery(),
    getHomepageArticles(),
    getHomepageTestimonials(),
    getHomepagePartners()
  ]);

  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <HeroSection settings={settings} />
      <MissionSection settings={settings} />
      <ProgramsSection programs={programs} title={settings.programsTitle} />
      <EventsSection events={events} settings={settings} />
      
      {galleryAlbums.length > 0 && <GallerySection albums={galleryAlbums} />}
      {articles.length > 0 && <ArticlesSection articles={articles} />}
      {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}
      {partners.length > 0 && <PartnersSection partners={partners} />}
      
      <ContributionSection settings={settings} />
    </>
  );
}

