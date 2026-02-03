"use client";

import { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";

const NAME = "ALIYAN";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mistRef = useRef<HTMLDivElement>(null);
  const flickerRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const [isGlitching, setIsGlitching] = useState(false);

  // Random glitch trigger
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Mist animation
  useEffect(() => {
    const mistLayers = mistRef.current?.querySelectorAll(".mist-layer");
    if (!mistLayers) return;

    mistLayers.forEach((layer, i) => {
      gsap.to(layer, {
        x: i % 2 === 0 ? "10%" : "-10%",
        duration: gsap.utils.random(8, 15),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(charsRef.current, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        scale: 0.5,
      });
      gsap.set([topLineRef.current, bottomLineRef.current], { scaleX: 0 });
      gsap.set(".tag-item", { opacity: 0, y: 20 });
      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 30,
        letterSpacing: "0em",
      });
      gsap.set(yearRef.current, { opacity: 0, scale: 0 });

      const tl = gsap.timeline({ delay: 5.8 });

      // Top line draws
      tl.to(topLineRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Characters flicker in one by one
      charsRef.current.forEach((char, i) => {
        if (!char) return;

        // Flicker sequence for each character
        tl.to(
          char,
          {
            opacity: 1,
            duration: 0.05,
          },
          `-=${i === 0 ? 0 : 0.15}`,
        );

        tl.to(char, {
          opacity: 0,
          duration: 0.05,
        });

        tl.to(char, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        });
      });

      // Bottom line draws
      tl.to(
        bottomLineRef.current,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3",
      );

      // Tags fade in
      tl.to(
        ".tag-item",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.5",
      );

      // Subtitle with letter spacing animation
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.5em",
          duration: 1,
          ease: "power2.out",
        },
        "-=0.3",
      );

      // Year pops in
      tl.to(
        yearRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.5",
      );

      // Continuous character hover animation
      charsRef.current.forEach((char, i) => {
        if (!char) return;

        gsap.to(char, {
          y: gsap.utils.random(-5, 5),
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // Random flicker effect
      const flickerLoop = () => {
        gsap.to(flickerRef.current, {
          opacity: gsap.utils.random(0.02, 0.08),
          duration: 0.05,
          onComplete: () => {
            gsap.to(flickerRef.current, {
              opacity: 0,
              duration: 0.1,
              delay: gsap.utils.random(2, 6),
              onComplete: flickerLoop,
            });
          },
        });
      };
      flickerLoop();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#000" }}
    >
      {/* SVG Filters */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={isGlitching ? 15 : 0}
            />
          </filter>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Mist/Fog Layers */}
      <div
        ref={mistRef}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <div
          className="mist-layer absolute -left-1/4 bottom-0 w-[150%] h-[35%]"
          style={{
            background:
              "linear-gradient(to top, rgba(20,20,20,0.9) 0%, transparent 100%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="mist-layer absolute -right-1/4 bottom-0 w-[150%] h-[25%]"
          style={{
            background:
              "linear-gradient(to top, rgba(40,40,40,0.7) 0%, transparent 100%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Flicker overlay */}
      <div
        ref={flickerRef}
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ backgroundColor: "#fff", opacity: 0 }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        {/* Top decorative line */}
        <div
          ref={topLineRef}
          className="w-full max-w-[600px] mx-auto h-[1px] mb-8 md:mb-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            transformOrigin: "center center",
          }}
        />

        {/* Top Tags */}
        <div className="flex justify-center gap-6 md:gap-12 lg:gap-20 mb-6 md:mb-10">
          <div className="tag-item">
            <span className="font-body text-[9px] md:text-[11px] uppercase tracking-[0.4em] text-white/40">
              Full Stack Developer
            </span>
          </div>
          <div className="tag-item hidden md:block">
            <span className="text-white/20">◆</span>
          </div>
          <div className="tag-item">
            <span className="font-body text-[9px] md:text-[11px] uppercase tracking-[0.4em] text-white/40">
              DevOps Engineer
            </span>
          </div>
        </div>

        {/* Main Name - Spaced Characters */}
        <div
          className="flex justify-center items-center gap-3 md:gap-6 lg:gap-8"
          style={{ perspective: "1000px" }}
        >
          {NAME.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                charsRef.current[i] = el;
              }}
              className="font-display text-[14vw] md:text-[11vw] lg:text-[9vw] font-black leading-none inline-block"
              style={{
                color: "#fff",
                textShadow: `
                  0 0 10px rgba(255,255,255,0.5),
                  0 0 30px rgba(255,255,255,0.3),
                  0 0 60px rgba(255,255,255,0.2)
                `,
                transformStyle: "preserve-3d",
                filter: isGlitching ? "url(#noise)" : "none",
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Glitch layers */}
        {isGlitching && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-3 md:gap-6 lg:gap-8 pointer-events-none">
            {NAME.split("").map((char, i) => (
              <span
                key={`glitch-r-${i}`}
                className="font-display text-[14vw] md:text-[11vw] lg:text-[9vw] font-black leading-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,0,0,0.4)",
                  transform: "translate(-3px, -3px)",
                }}
              >
                {char}
              </span>
            ))}
          </div>
        )}
        {isGlitching && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-3 md:gap-6 lg:gap-8 pointer-events-none">
            {NAME.split("").map((char, i) => (
              <span
                key={`glitch-c-${i}`}
                className="font-display text-[14vw] md:text-[11vw] lg:text-[9vw] font-black leading-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(0,255,255,0.4)",
                  transform: "translate(3px, 3px)",
                }}
              >
                {char}
              </span>
            ))}
          </div>
        )}

        {/* Subtitle */}
        <div ref={subtitleRef} className="mt-6 md:mt-10">
          <span className="font-body text-[10px] md:text-xs uppercase text-white/50">
            Creative Polymath
          </span>
        </div>

        {/* Bottom decorative line */}
        <div
          ref={bottomLineRef}
          className="w-full max-w-[400px] mx-auto h-[1px] mt-8 md:mt-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            transformOrigin: "center center",
          }}
        />

        {/* Year */}
        <div ref={yearRef} className="mt-6">
          <span className="font-display text-xs md:text-sm font-bold tracking-[0.3em] text-white/30">
            2026
          </span>
        </div>

        {/* Bottom Tags */}
        <div className="flex justify-center gap-8 md:gap-16 mt-8">
          <div className="tag-item">
            <span className="font-body text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-white/30">
              Based in Pakistan
            </span>
          </div>
          <div className="tag-item">
            <span className="font-body text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-white/30">
              Available Worldwide
            </span>
          </div>
        </div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, #000 100%)",
        }}
      />

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none z-25 opacity-[0.02]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay" style={{ opacity: 0.03 }} />
    </section>
  );
}
