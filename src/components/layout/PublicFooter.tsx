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
              {contact?.phone || "+40 723 123 456"}
            </p>
            <p className="flex gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-starsim-gold" />
              {contact?.address || "București, România"}
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
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-4 text-xs text-white/65 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} Star Sim - {footerCopyright}</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/politica-de-confidentialitate">Politica de confidențialitate</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/termeni-si-conditii">Termeni și condiții</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
