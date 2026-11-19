import type { Metadata } from "next";
import BookingFlow from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Studio buchen",
  description: "Studio-Slot online buchen: Paket wählen, Termin aussuchen, fertig. Ab 190 € inklusive Profikamera und Dauerlicht.",
};

/** Das vorgewählte Paket (?paket=4h) wird serverseitig gelesen, die Seite wird nicht komplett im Browser gerendert. */
export default async function BuchenPage({ searchParams }: { searchParams: Promise<{ paket?: string | string[] }> }) {
  const sp = await searchParams;
  const paket = Array.isArray(sp.paket) ? sp.paket[0] : sp.paket;
  return <BookingFlow initialPackage={paket ?? null} />;
}
