import { PublicHeader } from "./PublicHeader";
import { PublicFooter } from "./PublicFooter";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </>
  );
}
