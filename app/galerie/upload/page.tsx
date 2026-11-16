import type { Metadata } from "next";
import Upload from "@/components/gallery/Upload";

export const metadata: Metadata = {
  title: "Customer Cam: Bilder hochladen",
  description: "Zeig uns dein Shooting: Lade deine Lieblingsbilder aus dem MYLOFT STUDIO hoch und erscheine auf unserer Wand.",
};

export default function Page() {
  return <Upload />;
}
