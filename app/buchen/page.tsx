import type { Metadata } from "next";
import { Suspense } from "react";
import BookingFlow from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Studio buchen",
  description: "Studio-Slot online buchen: Paket wählen, Termin aussuchen, fertig. Ab 190 € inklusive Profikamera und Dauerlicht.",
};

export default function BuchenPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <BookingFlow />
    </Suspense>
  );
}
