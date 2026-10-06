import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  DM_Sans,
  Figtree,
  JetBrains_Mono,
  Manrope,
  Outfit,
  Plus_Jakarta_Sans,
  Sora,
  Unbounded,
} from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { StyleSwitcher } from "@/components/style-switcher";
import { JsonLd } from "@/components/json-ld";
import { websiteJsonLd } from "@/lib/seo/jsonld";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import { STYLE_BOOT_SCRIPT } from "@/lib/styles";

// Each visual style pairs a display face with a body face. Aurora (the
// default) preloads its fonts; the others load on first use.
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], display: "swap", preload: false });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap", preload: false });
const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["latin"], display: "swap", preload: false });
const dmSans = DM_Sans({ variable: "--font-dmsans", subsets: ["latin"], display: "swap", preload: false });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap", preload: false });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], display: "swap", preload: false });

const fontVariables = [bricolage, jakarta, jetbrains, sora, manrope, unbounded, dmSans, outfit, figtree]
  .map((font) => font.variable)
  .join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s · ${SITE_NAME}`,
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
  },
  description: SITE_DESCRIPTION,
};

export const viewport: Viewport = {
  themeColor: "#5B3CF5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-style is set by the boot script before first paint, so the server
    // value ("aurora") is allowed to differ from the DOM at hydration.
    <html lang="en" data-style="aurora" data-scroll-behavior="smooth" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: STYLE_BOOT_SCRIPT }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <JsonLd data={websiteJsonLd()} />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <StyleSwitcher />
      </body>
    </html>
  );
}
