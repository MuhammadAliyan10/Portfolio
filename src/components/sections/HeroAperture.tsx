"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EB_Garamond } from "next/font/google";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "700", "800"],
});

gsap.registerPlugin(ScrollTrigger);

export default function HeroAperture() {
  const sectionRef = useRef<HTMLElement>(null);
  const apertureRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Mouse Parallax (Desktop Only)
      const xTo = gsap.quickTo(textRef.current, "x", {
        duration: 0.8,
        ease: "power3",
      });
      const yTo = gsap.quickTo(textRef.current, "y", {
        duration: 0.8,
        ease: "power3",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const xPos = (e.clientX / innerWidth - 0.5) * -40;
        const yPos = (e.clientY / innerHeight - 0.5) * -40;
        xTo(xPos);
        yTo(yPos);
      };

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      });

      // 2. Scroll Expansion
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl.to(textRef.current, {
        scale: 0.85,
        opacity: 0,
        ease: "power2.inOut",
      }).to(
        apertureRef.current,
        {
          scale: 30, // Absolute coverage
          duration: 2,
          ease: "power3.inOut",
        },
        0,
      );

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F4F4F5] overflow-hidden flex items-center justify-center"
    >
      {/* The Aperture (The Black Void) */}
      <div
        ref={apertureRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] md:w-[22vw] aspect-[3/4] bg-[#0A0A0A] z-10 will-change-transform"
      />

      {/* Blending Typography Layer */}
      <div
        ref={textRef}
        className="relative z-20 w-full flex flex-col items-center justify-center pointer-events-none mix-blend-difference will-change-transform px-6 md:px-12"
      >
        <div className="flex flex-col items-center justify-center w-full max-w-7xl">
          <h1
            className={`${ebGaramond.className} text-[12vw] md:text-[10vw] lg:text-[8.5vw] leading-[0.8] tracking-tighter text-[#F4F4F5] italic font-medium text-center`}
          >
            SYSTEMS &
          </h1>
          <h1
            className={`${ebGaramond.className} text-[12vw] md:text-[10vw] lg:text-[8.5vw] leading-[0.8] tracking-tighter text-[#F4F4F5] italic font-medium text-center`}
          >
            ARCHITECTURE.
          </h1>
        </div>
      </div>
    </section>
  );
}
