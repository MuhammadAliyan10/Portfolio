"use client";

import { useRef } from "react";
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

const STATEMENTS = [
  {
    prefix: "The engineering process begins with",
    highlight: "deep system",
    suffix: "thinking.",
    from: -100, // Left
  },
  {
    prefix: "Building reliability and",
    highlight: "scalability",
    suffix: "directly into the architecture.",
    from: 100, // Right
  },
  {
    prefix: "Optimizing logic, performance, and deployments under",
    highlight: "real-world",
    suffix: "constraints.",
    from: -100, // Left
  },
];

export default function StoryConvergence() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 1,
          },
        });

        const cards = gsap.utils.toArray<HTMLElement>(".narrative-block");

        cards.forEach((card, i) => {
          const direction = STATEMENTS[i].from;

          tl.fromTo(
            card,
            {
              xPercent: direction * 1.5,
              opacity: 0,
            },
            {
              xPercent: 0,
              opacity: 1,
              duration: 1,
              ease: "none",
            },
          ).to(
            card,
            {
              xPercent: -direction * 1.5,
              opacity: 0,
              duration: 1,
              ease: "none",
            },
            "+=0.5",
          ); // Short hold in center
        });
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1,
          },
        });

        const cards = gsap.utils.toArray<HTMLElement>(".narrative-block");
        cards.forEach((card) => {
          tl.fromTo(
            card,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1 },
          ).to(card, { opacity: 0, y: -30, duration: 1 }, "+=0.5");
        });
      });

      return () => ScrollTrigger.getAll().forEach((st) => st.kill());
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden"
    >
      <div className="absolute top-12 left-12 z-30">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#4F46E5] font-bold">
          NARRATIVE_TRACE // M.A.N.
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center px-6 md:px-24"
      >
        {STATEMENTS.map((stmt, i) => (
          <div
            key={i}
            className="narrative-block absolute w-full max-w-7xl flex flex-col items-center justify-center opacity-0"
          >
            <h2
              className={`${ebGaramond.className} text-[8vw] md:text-[6vw] lg:text-[5vw] leading-[0.85] tracking-tighter text-[#F4F4F5] text-center font-medium`}
            >
              {stmt.prefix}{" "}
              <span className="italic font-normal">{stmt.highlight}</span>{" "}
              {stmt.suffix}
            </h2>
            <div className="h-[1px] w-32 bg-zinc-800 mt-12" />
          </div>
        ))}
      </div>
    </section>
  );
}
