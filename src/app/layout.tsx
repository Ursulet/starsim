import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = buildMetadata({
  title: "Star Sim",
  description: "De la o stea, la un vis."
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <a
          href="#main-content"
          className="fixed left-2 top-2 z-[100] -translate-y-16 rounded-lg bg-starsim-navy px-4 py-2 text-sm font-bold text-white shadow-premium transition focus:translate-y-0"
        >
          Sari la conținut
        </a>
        {children}
      </body>
    </html>
  );
}
