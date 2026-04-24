"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Inter, EB_Garamond } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "700"],
});

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "I do not just write code. I architect systems. I believe that true engineering is the pursuit of absolute reliability under extreme constraints. From zero-trust cryptography to resilient cloud infrastructure, every line serves a singular purpose: flawless execution.";

export default function StoryIllumination() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      // 1. Split Text into Words
      const words = textRef.current?.querySelectorAll(".word");
      if (!words) return;

      // 2. Scroll Illumination
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(words, {
        color: "#F4F4F5",
        stagger: 0.1,
        ease: "none",
      });

      return () => ScrollTrigger.getAll().forEach((st) => st.kill());
    },
    { scope: sectionRef },
  );

  // Word Splitter Utility
  const splitWords = (text: string) => {
    return text.split(" ").map((word, i) => {
      const isItalic = word.includes("*");
      const cleanWord = word.replace(/\*/g, "");

      return (
        <span
          key={i}
          className="inline-block mr-[0.25em] word text-[#27272a] transition-colors duration-500 will-change-colors"
        >
          <span className={isItalic ? "italic font-normal serif-italic" : ""}>
            {cleanWord}
          </span>
        </span>
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden flex items-center justify-center px-6 md:px-24"
    >
      <div className="max-w-6xl w-full z-10">
        <p
          ref={textRef}
          className={`${ebGaramond.className} text-[7vw] md:text-[5vw] lg:text-[4.5vw] leading-[1.1] tracking-tight text-left font-medium select-none`}
        >
          {splitWords(TEXT)}
        </p>
      </div>
    </section>
  );
}
