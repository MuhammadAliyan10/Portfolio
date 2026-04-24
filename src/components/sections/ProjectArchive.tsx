"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EB_Garamond } from "next/font/google";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "700", "800"],
});

const PROJECTS = [
  {
    id: 1,
    year: "2024",
    title: "Zero-Trust Platform",
    tech: "Go / NATS / Crypto",
    image: "/projects/zero_trust_platform_mockup_1777011349099.png",
  },
  {
    id: 2,
    year: "2024",
    title: "Real-time Collab",
    tech: "React / WebSocket",
    image:
      "/Users/muhammadaliyan/.gemini/antigravity/brain/3deea2d6-0793-43bd-b7a4-5fd1c37a7a3d/realtime_collaboration_mockup_1777016645979.png",
  },
  {
    id: 3,
    year: "2024",
    title: "PaceDream Engine",
    tech: "Next.js / Redux",
    image: "/projects/pacedream_booking_mockup_1777011363820.png",
  },
  {
    id: 4,
    year: "2023",
    title: "Cloud Infrastructure",
    tech: "AWS / Terraform",
    image: "/projects/cloud_infra_automation_mockup_1777011380103.png",
  },
  {
    id: 5,
    year: "2023",
    title: "Architectural Visualizer",
    tech: "Three.js / GLSL",
    image: "/projects/cloud_infra_automation_mockup_1777011380103.png",
  },
  {
    id: 6,
    year: "2022",
    title: "Secure Payments",
    tech: "Node.js / Stripe",
    image: "/projects/zero_trust_platform_mockup_1777011349099.png",
  },
];

export default function ProjectArchive() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-48 px-6 md:px-24 bg-[#0A0A0A] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-24">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-zinc-600">
            Index // Selected Works
          </span>
          <h2
            className={`${ebGaramond.className} text-6xl md:text-9xl text-[#F4F4F5] font-medium tracking-tight`}
          >
            Archive & <span className="italic font-normal">Index.</span>
          </h2>
        </div>

        <ul className="flex flex-col border-t border-zinc-800">
          {PROJECTS.map((project) => (
            <li key={project.id} className="relative">
              <Link
                href={`/projects/${project.id}`}
                className="group flex flex-col md:flex-row items-center justify-between gap-8 py-8 md:py-12 border-b border-zinc-800 transition-all duration-500 hover:bg-zinc-900/30"
              >
                <div className="flex items-center gap-8 w-full group-hover:translate-x-4 md:group-hover:translate-x-8 transition-transform duration-500">
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-zinc-600 shrink-0 w-12 md:w-24">
                    {project.year}
                  </span>

                  <h3
                    className={`${ebGaramond.className} text-3xl md:text-7xl lg:text-8xl text-[#F4F4F5]`}
                  >
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-8 md:gap-12 shrink-0">
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-zinc-500 hidden md:block">
                    {project.tech}
                  </span>

                  <div className="flex items-center gap-2 text-[#4F46E5] font-bold tracking-widest text-[10px] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    EXPLORE <span className="text-lg">↗</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        ul:hover li:not(:hover) {
          opacity: 0.2;
        }
      `}</style>
    </section>
  );
}
