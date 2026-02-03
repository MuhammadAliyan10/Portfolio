"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI Image Engine",
    year: "2024",
    tags: ["Python", "TensorFlow", "React"],
    description: "Project Alpha",
  },
  {
    title: "Fintech Dashboard",
    year: "2025",
    tags: ["Next.js", "Tailwind", "Postgres"],
    description: "Project Beta",
  },
  {
    title: "E-Commerce V2",
    year: "2025",
    tags: ["Shopify", "Liquid", "GSAP"],
    description: "Project Gamma",
  },
  {
    title: "Cloud Architecture",
    year: "2026",
    tags: ["AWS", "Docker", "Terraform"],
    description: "Project Delta",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card || index === cardsRef.current.length - 1) return;

        const nextCard = cardsRef.current[index + 1];
        if (!nextCard) return;

        gsap.to(card, {
          scale: 0.9,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom", // When next card enters viewport
            end: "top 10vh", // When next card hits the sticky position (top-[10vh])
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32">
      {/* Section Header */}
      <div className="container-custom mb-20 flex justify-between text-sm uppercase tracking-widest text-mist font-body">
        <span>Selected Works</span>
        <span>2022 — 2026</span>
      </div>

      {/* Cards Container */}
      <div className="container-custom flex flex-col gap-20 pb-[50vh]">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="sticky top-[10vh] flex h-[80vh] w-full flex-col justify-between border border-white/10 bg-surface p-8 md:p-12"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <h2 className="font-display text-5xl font-bold uppercase text-flash md:text-7xl">
                {project.title}
              </h2>
              <span className="font-body text-xl text-mist">
                {project.year}
              </span>
            </div>

            {/* Body (Placeholder) */}
            <div className="h-full w-full my-8 bg-gradient-to-br from-white/5 to-transparent rounded-sm border border-white/5" />

            {/* Footer */}
            <div className="flex flex-wrap gap-4">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/20 px-4 py-2 font-body text-sm uppercase tracking-wide text-mist transition-colors hover:border-white hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
