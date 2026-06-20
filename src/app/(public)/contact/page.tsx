import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/public/PageHero";
import { Container } from "@/components/ui/Container";
import { getContactSettings } from "@/lib/queries/settings";

export default async function ContactPage() {
  const contact = await getContactSettings();
  return (
    <>
      <PageHero title="Scrie-ne" eyebrow="Contact" intro={contact?.introText || "Suntem aici pentru programe, evenimente, voluntariat si parteneriate."} />
      <section className="section-padding"><Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="premium-card p-6">
          <h2 className="font-serif text-2xl text-starsim-navy">Date de contact</h2>
          <div className="mt-6 space-y-4 text-starsim-muted">
            <p className="flex gap-3"><Mail className="h-5 w-5 text-starsim-gold" /> {contact?.email}</p>
            <p className="flex gap-3"><Phone className="h-5 w-5 text-starsim-gold" /> {contact?.phone}</p>
            <p className="flex gap-3"><MapPin className="h-5 w-5 text-starsim-gold" /> {contact?.address}</p>
          </div>
        </div>
        <ContactForm />
      </Container></section>
    </>
  );
}
