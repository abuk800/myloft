import type { Metadata } from "next";
import Vouchers from "@/components/vouchers/Vouchers";

export const metadata: Metadata = {
  title: "Gutscheine: Shooting verschenken",
  description: "Shooting verschenken: Wert- oder Paket-Gutschein für das MYLOFT STUDIO in Oberursel bei Frankfurt, als PDF per E-Mail.",
};

export default function Page() {
  return <Vouchers />;
}
