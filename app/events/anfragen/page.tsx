import type { Metadata } from "next";
import EventInquiry from "@/components/events/EventInquiry";

export const metadata: Metadata = {
  title: "Event anfragen",
  description: "Eventlocation in Oberursel anfragen: Anlass, Wunschtermin und Gästezahl in vier Schritten. 750 € ganztägig bis 31.12.2026.",
};

export default function Page() {
  return <EventInquiry />;
}
