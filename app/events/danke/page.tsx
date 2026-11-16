import type { Metadata } from "next";
import { Suspense } from "react";
import Danke from "@/components/events/Danke";

export const metadata: Metadata = { title: "Danke für deine Anfrage", robots: { index: false } };

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-night" />}>
      <Danke />
    </Suspense>
  );
}
