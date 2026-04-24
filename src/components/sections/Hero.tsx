"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Separator } from "@/components/ui/separator";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const creativeRef = useRef<HTMLSpanElement>(null);
  const engineerRef = useRef<HTMLSpanElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Hover floating effect for typography
      gsap.to([creativeRef.current, engineerRef.current], {
        y: "1.5%",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. Kinetic Split Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.5,
        },
      });

      tl.to(
        creativeRef.current,
        {
          xPercent: -80,
          opacity: 0.2,
          scale: 0.9,
          ease: "power2.inOut",
        },
        0,
      )
        .to(
          engineerRef.current,
          {
            xPercent: 80,
            opacity: 0.2,
            scale: 0.9,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          manifestoRef.current,
          {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "expo.out",
          },
          0.1,
        )
        .to(
          gridRef.current,
          {
            opacity: 0.3,
            scale: 1.1,
            ease: "none",
          },
          0,
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden flex items-center justify-center pt-20"
    >
      {/* Background Blueprint Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#F4F4F5 1px, transparent 1px), linear-gradient(90deg, #F4F4F5 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Layer 1: The Revealed Manifesto */}
      <div
        ref={manifestoRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 opacity-0 scale-95 translate-y-10 pointer-events-none"
      >
        <div className="max-w-2xl text-center flex flex-col items-center gap-8">
          {/* Restored shadcn Separator */}
          <Separator className="w-12 bg-[#4F46E5] h-1" />

          <p className="font-sans text-xl md:text-3xl font-medium leading-tight text-[#F4F4F5] tracking-tight">
            I architect high-performance digital ecosystems where technical
            complexity meets
            <span className="text-[#4F46E5]"> editorial precision.</span>
          </p>
          <div className="flex gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#F4F4F5]/40 border border-[#F4F4F5]/20 px-3 py-1 rounded-full">
              Based in Lahore
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#F4F4F5]/40 border border-[#F4F4F5]/20 px-3 py-1 rounded-full">
              Available 2026
            </span>
          </div>
        </div>
      </div>

      {/* Layer 2: Kinetic Typography */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full select-none pointer-events-none">
        <h1 className="flex flex-col items-center leading-[0.8] text-[#F4F4F5] font-black">
          <span
            ref={creativeRef}
            className="text-[18vw] md:text-[15vw] tracking-tighter will-change-transform"
          >
            CREATIVE
          </span>
          <span
            ref={engineerRef}
            className="text-[18vw] md:text-[15vw] tracking-tighter text-transparent [-webkit-text-stroke:2px_#F4F4F5] will-change-transform"
          >
            ENGINEER
          </span>
        </h1>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-12 bottom-0 w-[1px] bg-[#F4F4F5]/5" />
      <div className="absolute top-0 right-12 bottom-0 w-[1px] bg-[#F4F4F5]/5" />
    </section>
  );
}
