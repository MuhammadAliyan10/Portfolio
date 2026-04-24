"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Preloader() {
  const container = useRef<HTMLDivElement>(null);
  const topHalf = useRef<HTMLDivElement>(null);
  const bottomHalf = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);

  // Handle body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0); // Force scroll to top
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setComplete(true);
          // CRITICAL: Refresh all ScrollTriggers after the preloader is gone
          // This fixes "stuck" Hero pinning.
          ScrollTrigger.refresh();
        },
        delay: 0.2,
      });

      // 1. The Trace: Line grows from 0% to 100%
      tl.fromTo(
        line.current,
        { width: "0%", opacity: 1 },
        {
          width: "100%",
          duration: 1.2,
          ease: "expo.inOut",
        },
      )

        // 2. The Anticipation (tiny pause)
        .to({}, { duration: 0.3 })

        // 3. The Shutter Reveal: Split halves and fade line
        .to(
          line.current,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.inOut",
          },
          "reveal",
        )
        .to(
          topHalf.current,
          {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
          },
          "reveal",
        )
        .to(
          bottomHalf.current,
          {
            yPercent: 100,
            duration: 1.2,
            ease: "power4.inOut",
          },
          "reveal",
        );
    },
    { scope: container },
  );

  if (complete) return null;

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Top Half */}
      <div
        ref={topHalf}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0A0A0A] z-10"
      />

      {/* Bottom Half */}
      <div
        ref={bottomHalf}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0A0A0A] z-10"
      />

      {/* The Seam Line */}
      <div
        ref={line}
        className="absolute w-0 h-[1px] bg-[#F4F4F5] z-20 top-1/2 left-0"
      />
    </div>
  );
}
