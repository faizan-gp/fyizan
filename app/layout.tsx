import type { Metadata } from "next";
import { Archivo, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { personJsonLd } from "@/lib/seo/jsonld";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { person } from "@/content/person";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s · ${SITE_NAME}`,
    default: `${SITE_NAME} — Full-Stack Engineer & Indie Maker`,
  },
  description: person.oneLiner,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${archivo.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-bg font-body text-ink">
        <JsonLd data={personJsonLd()} />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
