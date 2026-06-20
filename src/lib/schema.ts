import { absoluteUrl } from "./seo";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Star Sim",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/logo-starsim.png")
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Star Sim",
    url: absoluteUrl("/")
  };
}

export function eventJsonLd(event: {
  title: string;
  excerpt: string;
  startsAt: Date;
  endsAt?: Date | null;
  locationName: string;
  address?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.excerpt,
    startDate: event.startsAt.toISOString(),
    endDate: event.endsAt?.toISOString(),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.locationName,
      address: event.address || event.locationName
    },
    organizer: { "@type": "Organization", name: "Star Sim", url: absoluteUrl("/") }
  };
}
