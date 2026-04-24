"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    index: "01",
    title: "Zero-Trust Contest Platform",
    tech: "GO, NATS, CRYPTOGRAPHY",
    desc: "Mission-critical, offline-first competitive programming engine with real-time sync.",
    image: "/projects/zero_trust_platform_mockup_1777011349099.png",
  },
  {
    index: "02",
    title: "PaceDream Booking Engine",
    tech: "REACT, REDUX, PAYMENTS",
    desc: "Complex flight booking workflows and secure payment architecture.",
    image: "/projects/pacedream_booking_mockup_1777011363820.png",
  },
  {
    index: "03",
    title: "Automated Cloud Infra",
    tech: "AWS, TERRAFORM, K8S",
    desc: "Scalable, resilient infrastructure automation and deployment pipelines.",
    image: "/projects/cloud_infra_automation_mockup_1777011380103.png",
  },
];

export default function ProjectExhibition() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const horizontalDistance = trackWidth - viewportWidth;

        // Main Horizontal Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${trackWidth * 1.5}`, // Expanded for more "time" per project
            pin: true,
            scrub: 2, // Heavy smoothing for "premium" feel
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Move the track
        tl.to(track, {
          x: -horizontalDistance,
          ease: "none",
        });

        // 2. Synchronized Parallax for all images
        const images = gsap.utils.toArray<HTMLElement>(".parallax-image");
        images.forEach((img) => {
          tl.to(
            img,
            {
              xPercent: -30, // Stronger parallax
              ease: "none",
            },
            0,
          ); // Start at the same time as track move
        });

        return () => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
        };
      });

      // Mobile Fade-in Logic
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".project-block").forEach((block) => {
          gsap.from(block, {
            opacity: 0,
            y: 50,
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0A0A0A] overflow-hidden"
    >
      {/* Sticky Header Label */}
      <div className="absolute top-12 left-6 md:left-12 z-50 mix-blend-difference pointer-events-none">
        <span className="font-mono text-xs md:text-sm uppercase tracking-[0.6em] text-[#F4F4F5]">
          SELECTED WORKS // ARCHITECTURAL COMPILATION
        </span>
      </div>

      {/* Horizontal Track Container */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row h-auto md:h-screen w-full md:w-[280vw] items-center px-6 md:px-0"
      >
        {PROJECTS.map((project, i) => (
          <div
            key={project.index}
            className="project-block relative shrink-0 w-full md:w-[80vw] h-[70vh] md:h-screen flex flex-col justify-center px-0 md:px-24 mb-24 md:mb-0"
          >
            {/* Background Index Number */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
              <span className="text-[40vw] md:text-[30vw] font-black leading-none text-transparent [-webkit-text-stroke:1px_#18181B] opacity-50 block">
                {project.index}
              </span>
            </div>

            <div className="relative z-10 flex flex-col gap-8 md:gap-12 w-full max-w-6xl">
              {/* Media Window */}
              <div className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden bg-[#18181B] group">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="parallax-image object-cover scale-150 will-change-transform"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                {/* Visual Indicators */}
                <div className="absolute top-4 left-4 font-mono text-[8px] text-[#F4F4F5]/40 leading-tight">
                  SYSTEM_ID: 0x0{i + 1} <br />
                  ENCRYPTION: AES-256
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-sm text-[#4F46E5] uppercase tracking-widest font-bold">
                    {project.tech}
                  </span>
                  <h3 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter text-[#F4F4F5] leading-[0.9]">
                    {project.title}
                  </h3>
                  <p className="text-[#F4F4F5]/60 text-sm md:text-lg max-w-xl font-medium">
                    {project.desc}
                  </p>
                </div>

                <button className="px-8 py-3 bg-[#F4F4F5] text-[#0A0A0A] font-bold text-xs uppercase tracking-widest hover:bg-[#4F46E5] hover:text-[#F4F4F5] transition-all duration-300">
                  Execute Case Study
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Final Padding for horizontal scroll */}
        <div className="hidden md:block w-[10vw]" />
      </div>
    </section>
  );
}
