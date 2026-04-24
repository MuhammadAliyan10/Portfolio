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

const CARDS = [
  {
    id: 1,
    year: "PRESENT",
    role: "Solo Platform Architect",
    company: "The University of Lahore",
    desc: "Mission-critical offline-first platform. Zero-trust security, real-time sync, cryptographic access.",
    tech: "GO / NATS / TEMPORAL",
    theme: "dark",
    bg: "bg-[#18181B]",
    text: "text-[#F4F4F5]",
    stroke: "#3f3f46",
  },
  {
    id: 2,
    year: "2024",
    role: "Senior Frontend Lead",
    company: "PaceDream Company",
    desc: "Led senior frontend development. Managed 4 developers, delivering complex flight workflows and secure payments.",
    tech: "NEXT.JS / TS / REDUX",
    theme: "light",
    bg: "bg-[#F4F4F5]",
    text: "text-[#0A0A0A]",
    stroke: "#D4D4D8",
  },
  {
    id: 3,
    year: "2023",
    role: "AWS DevOps Intern",
    company: "The DevOps Team",
    desc: "Automated scalable infrastructure. Hands-on with heavy cloud deployments.",
    tech: "AWS / TERRAFORM / K8S",
    theme: "accent",
    bg: "bg-[#4F46E5]",
    text: "text-[#F4F4F5]",
    stroke: "#818cf8",
  },
];

export default function ExperienceArchive() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".archive-card");

      cards.forEach((card, index) => {
        // Don't animate the last card pushing back
        if (index === cards.length - 1) return;

        gsap.to(card, {
          scale: 0.9,
          filter: "brightness(0.3)",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative w-full bg-[#0A0A0A]">
      {CARDS.map((card, i) => (
        <div
          key={card.id}
          className={`archive-card sticky top-0 h-screen w-full flex flex-col justify-center px-6 md:px-24 will-change-transform origin-top overflow-hidden ${card.bg} ${card.text}`}
        >
          {/* Background Typography */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none w-full text-center">
            <span
              className="font-black text-[25vw] md:text-[20vw] leading-none tracking-tighter opacity-20 block"
              style={{
                color: "transparent",
                WebkitTextStroke: `2px ${card.stroke}`,
              }}
            >
              {card.year}
            </span>
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col gap-8 max-w-7xl">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] opacity-40">
                SYSTEM ARCHITECTURE // ROLE 0{i + 1}
              </span>
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9]">
                {card.role}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-end pt-8">
              <div className="flex flex-col gap-4 border-l border-current/20 pl-6">
                <span className="font-mono text-xs md:text-sm uppercase font-bold opacity-80">
                  @{card.company}
                </span>
                <p
                  className={`${ebGaramond.className} text-xl md:text-3xl font-medium leading-[1.2] max-w-xl opacity-90`}
                >
                  {card.desc}
                </p>
              </div>

              <div className="flex flex-col gap-4 items-end">
                <div className="h-[2px] w-32 bg-current opacity-20 mb-2" />
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] opacity-30 text-right">
                  {card.tech}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
