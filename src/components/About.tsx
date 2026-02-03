"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Bio Scanner Animation
      const bioSplit = new SplitType(bioRef.current!, { types: "words" });

      // Set initial state (dim)
      gsap.set(bioSplit.words, { opacity: 0.2 });

      gsap.to(bioSplit.words, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
      });

      // 2. Kinetic Marquee
      const rows = marqueeRef.current?.querySelectorAll(".marquee-row");

      rows?.forEach((row, index) => {
        const direction = index % 2 === 0 ? -1 : 1; // Left for even, Right for odd
        const content = row.querySelector(".marquee-content");

        // Clone content for infinite loop
        if (content) {
          const clonesNeeded = 4;
          for (let i = 0; i < clonesNeeded; i++) {
            const clone = content.cloneNode(true);
            row.appendChild(clone);
          }
        }

        // Base animation
        const duration = 20;
        const tl = gsap.to(row, {
          xPercent: direction * -50,
          ease: "none",
          duration: duration,
          repeat: -1,
        });

        // Physics (Velocity -> Skew & Speed)
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const skewAmount = velocity / 300;
            const timeScale = 1 + Math.abs(velocity / 500);

            // Apply Skew
            gsap.to(row, {
              skewX: -skewAmount, // Invert skew for natural feel
              overwrite: "auto",
              duration: 0.1,
            });

            // Apply Speed
            gsap.to(tl, {
              timeScale: timeScale,
              overwrite: "auto",
              duration: 0.1,
            });

            // Return to normal
            gsap.to(row, { skewX: 0, duration: 0.5, delay: 0.1 });
            gsap.to(tl, { timeScale: 1, duration: 0.5, delay: 0.1 });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const techItems =
    "NEXT.JS • REACT • TYPESCRIPT • TAILWIND • GSAP • PYTHON • DOCKER • AWS • ";
  const vibeItems =
    "REAL MADRID • CR7 • SORCERER • 2004 • LAHORE • JUJUTSU KAISEN • ";

  return (
    <section
      ref={containerRef}
      className="flex min-h-screen flex-col justify-center py-32 overflow-hidden"
    >
      {/* Bio Block */}
      <div className="container-custom mb-32">
        <p
          ref={bioRef}
          className="max-w-4xl font-body text-3xl font-medium leading-tight text-flash md:text-5xl"
        >
          I engineer digital dominance. Full Stack Developer based in Lahore,
          crafting high-performance systems with AI and Cloud architecture.
        </p>
      </div>

      {/* Kinetic Marquee */}
      <div ref={marqueeRef} className="flex flex-col gap-4">
        {/* Row 1: Tech (Solid) */}
        <div className="marquee-row flex w-full whitespace-nowrap overflow-hidden">
          <div className="marquee-content flex">
            <span className="font-display text-8xl font-bold text-flash mr-8 md:text-9xl">
              {techItems}
            </span>
          </div>
        </div>

        {/* Row 2: Vibe (Outline) */}
        <div className="marquee-row flex w-full whitespace-nowrap overflow-hidden">
          <div className="marquee-content flex">
            <span
              className="font-display text-8xl font-bold text-transparent mr-8 md:text-9xl"
              style={{ WebkitTextStroke: "1px var(--color-mist)" }}
            >
              {vibeItems}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
