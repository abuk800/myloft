import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-01-utils/marquee";

export type MarqueeReview = { name: string; username?: string; body: string; profile?: string };

const defaults: MarqueeReview[] = [
  { name: "Gast 1", username: "Google-Bewertung", body: "Beispieltext 1" },
  { name: "Gast 2", username: "Google-Bewertung", body: "Beispieltext 2" },
];

const ReviewCard = ({ profile, name, username, body }: MarqueeReview) => (
  <Card className="relative h-full w-72 overflow-hidden border-border bg-card p-5 shadow-none">
    <CardContent className="flex flex-col gap-3 p-0">
      <div className="flex flex-row items-center gap-3">
        {profile ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="rounded-full" width="36" height="36" alt="" src={profile} />
        ) : (
          <span className="grid h-9 w-9 place-items-center rounded-full bg-cream font-serif text-lg text-ink">{name[0]}</span>
        )}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-foreground">{name}</p>
          {username && <p className="text-xs font-medium text-muted-foreground">{username}</p>}
        </div>
      </div>
      <p className="text-sm leading-relaxed text-foreground">„{body}“</p>
    </CardContent>
  </Card>
);

export default function TestimonialMarquee({ reviews = defaults }: { reviews?: MarqueeReview[] }) {
  const half = Math.ceil(reviews.length / 2);
  const firstRow = reviews.slice(0, half);
  const secondRow = reviews.slice(half).length ? reviews.slice(half) : reviews;
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:45s]">
        {firstRow.map((r) => <ReviewCard key={r.name} {...r} />)}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:45s]">
        {secondRow.map((r) => <ReviewCard key={r.name} {...r} />)}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background" />
    </div>
  );
}
