import { PublicHeader } from "./PublicHeader";
import { PublicFooter } from "./PublicFooter";
import { CookieBanner } from "./CookieBanner";
import { WhatsAppButton } from "./WhatsAppButton";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}
