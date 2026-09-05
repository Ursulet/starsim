import Image from "next/image";
import Link from "next/link";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Music2, Phone, Youtube } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { publicNavigation } from "@/lib/navigation";
import { getContactSettings } from "@/lib/queries/settings";

const fallbackFooterDescription =
  "Asociație dedicată promovării astronomiei, educației științifice și inspirării copiilor să viseze mai departe.";
const fallbackFooterCopyright = "De la o stea, la un vis. Toate drepturile rezervate.";

export async function PublicFooter() {
  const contact = await getContactSettings();
  const year = new Date().getFullYear();
  const footerDescription = contact?.footerDescription || fallbackFooterDescription;
  const footerCopyright = contact?.footerCopyright || fallbackFooterCopyright;
  const socialLinks = [
    { href: contact?.facebookUrl, label: "Facebook Star Sim", Icon: Facebook },
    { href: contact?.instagramUrl, label: "Instagram Star Sim", Icon: Instagram },
    { href: contact?.youtubeUrl, label: "YouTube Star Sim", Icon: Youtube },
    { href: contact?.tiktokUrl, label: "TikTok Star Sim", Icon: Music2 },
    { href: contact?.linkedinUrl, label: "LinkedIn Star Sim", Icon: Linkedin }
  ].filter((item): item is { href: string; label: string; Icon: typeof Facebook } => Boolean(item.href));

  return (
    <footer className="bg-starsim-navy text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/images/logo-starsim.png" alt="Star Sim" width={210} height={80} className="h-16 w-auto rounded bg-white/95 p-1" />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/75">{footerDescription}</p>
        </div>

        <div>
          <h3 className="font-semibold">Contact</h3>
          <div className="mt-5 space-y-3 text-sm text-white/78">
            <p className="flex gap-3">
              <Mail className="h-4 w-4 shrink-0 text-starsim-gold" />
              {contact?.email || "contact@starsim.ro"}
            </p>
            <p className="flex gap-3">
              <Phone className="h-4 w-4 shrink-0 text-starsim-gold" />
              {!contact?.phone || contact.phone === "+40 723 123 456" ? "+40 730 991 523" : contact.phone}
            </p>
            <p className="flex gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-starsim-gold" />
              {!contact?.address || contact.address === "București, România" ? "Str. Viceamiral Ioan Murgescu 56, Constanța, România" : contact.address}
            </p>
            {contact?.schedule ? (
              <p className="flex gap-3">
                <Clock className="h-4 w-4 shrink-0 text-starsim-gold" />
                {contact.schedule}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Navigare rapida</h3>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/78">
            {publicNavigation.slice(0, 8).map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-starsim-gold">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          {socialLinks.length ? (
            <>
              <h3 className="font-semibold">Urmărește-ne</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring rounded-full border border-white/20 p-2 text-white/80 hover:text-starsim-gold"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </>
          ) : null}
          <h3 className={socialLinks.length ? "mt-6 font-semibold" : "font-semibold"}>Newsletter</h3>
          <NewsletterForm />
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-xs text-white/50">Realizat cu ❤️ de:</span>
            <a 
              href="https://smdg.ro" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group inline-block w-fit"
              title="SMDG - Servicii IT & C"
            >
              <Image 
                src="/images/logo-smdg.png" 
                alt="SMDG - Servicii IT & C" 
                width={140} 
                height={45} 
                className="h-10 w-auto object-contain transition-all duration-300 filter drop-shadow-[0_0_12px_rgba(6,182,212,0.35)] group-hover:drop-shadow-[0_0_16px_rgba(6,182,212,0.55)] group-hover:scale-102" 
              />
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-white/65 lg:flex-row lg:items-center lg:justify-between">
          <p className="shrink-0">&copy; {year} Star Sim - {footerCopyright}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/politica-de-confidentialitate" className="hover:text-starsim-gold transition-colors">Confidențialitate</Link>
            <Link href="/cookies" className="hover:text-starsim-gold transition-colors">Cookies</Link>
            <Link href="/termeni-si-conditii" className="hover:text-starsim-gold transition-colors">Termeni și condiții</Link>
            <Link href="/politica-donatii-sponsorizari" className="hover:text-starsim-gold transition-colors">Donații și sponsorizări</Link>
            <Link href="/foto-video" className="hover:text-starsim-gold transition-colors">Foto-video și drept la imagine</Link>
            <Link href="/protectia-copiilor" className="hover:text-starsim-gold transition-colors">Protecția copiilor</Link>
            <Link href="/transparenta" className="hover:text-starsim-gold transition-colors">Transparență</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
