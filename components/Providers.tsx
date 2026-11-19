"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

// Animations-Features werden asynchron nachgeladen, damit sie den ersten Render nicht blockieren.
const features = () => import("./motionFeatures").then((m) => m.default);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={features} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
