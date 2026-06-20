import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { publicNavigation } from "@/lib/navigation";
import { getContactSettings } from "@/lib/queries/settings";

export async function PublicFooter() {
  const contact = await getContactSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-starsim-navy text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/images/logo-starsim.png" alt="Star Sim" width={210} height={80} className="h-16 w-auto rounded bg-white/95 p-1" />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/75">
            Asociatie dedicata promovarii astronomiei, educatiei stiintifice si inspirarii copiilor sa viseze mai departe.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Contact</h3>
          <div className="mt-5 space-y-3 text-sm text-white/78">
            <p className="flex gap-3"><Mail className="h-4 w-4 text-starsim-gold" /> {contact?.email || "contact@starsim.ro"}</p>
            <p className="flex gap-3"><Phone className="h-4 w-4 text-starsim-gold" /> {contact?.phone || "+40 723 123 456"}</p>
            <p className="flex gap-3"><MapPin className="h-4 w-4 text-starsim-gold" /> {contact?.address || "Bucuresti, Romania"}</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Navigare rapida</h3>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/78">
            {publicNavigation.slice(0, 8).map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-starsim-gold">{item.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Urmareste-ne</h3>
          <div className="mt-4 flex gap-3">
            {[Facebook, Instagram, Youtube].map((Icon, index) => (
              <a key={index} href="#" className="focus-ring rounded-full border border-white/20 p-2 text-white/80 hover:text-starsim-gold" aria-label="Social Star Sim">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <h3 className="mt-6 font-semibold">Newsletter</h3>
          <NewsletterForm />
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-4 text-xs text-white/65 md:flex-row md:items-center md:justify-between">
          <p>© {year} Star Sim - De la o stea, la un vis. Toate drepturile rezervate.</p>
          <div className="flex gap-5">
            <Link href="/politica-de-confidentialitate">Politica de confidentialitate</Link>
            <Link href="/termeni-si-conditii">Termeni si conditii</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
