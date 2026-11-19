import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import { SITE } from "@/lib/config";
import { IS_DEMO, SITE_URL } from "@/lib/site";

const serif = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: IS_DEMO ? { index: false, follow: false, nocache: true } : { index: true, follow: true },
  title: {
    default: "MYLOFT STUDIO | Fotostudio & Eventlocation in Oberursel bei Frankfurt",
    template: "%s | MYLOFT STUDIO",
  },
  description:
    "Dein Studio bei Frankfurt für Shootings, Content und Events. Zwei Etagen, Profi-Equipment inklusive. Ab 190 €. 5,0 ★ bei Google, täglich 7–24 Uhr.",
  openGraph: {
    title: "MYLOFT STUDIO | Dein Studio. Deine Story.",
    description: "Fotostudio & Eventlocation in Oberursel bei Frankfurt. Zwei Etagen, Profi-Equipment inklusive.",
    type: "website",
    locale: "de_DE",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf7",
  width: "device-width",
  initialScale: 1,
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "PhotographyBusiness"],
  name: SITE.fullName,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.png`,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    postalCode: SITE.address.zip,
    addressLocality: "Oberursel (Taunus)",
    addressCountry: "DE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "24:00",
    },
  ],
  sameAs: [SITE.instagram.url],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <Header />
          <main className="min-h-screen pb-24 md:pb-0">{children}</main>
          <Footer />
          <StickyBar />
        </Providers>
      </body>
    </html>
  );
}
