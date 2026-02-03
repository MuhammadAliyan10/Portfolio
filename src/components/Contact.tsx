"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [time, setTime] = useState("");

  // Clock Logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "Asia/Karachi",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Magnetic Button
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const button = buttonRef.current;
      if (button) {
        const xTo = gsap.quickTo(button, "x", {
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });
        const yTo = gsap.quickTo(button, "y", {
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });

        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = button.getBoundingClientRect();
          const x = clientX - (left + width / 2);
          const y = clientY - (top + height / 2);

          const distance = Math.sqrt(x * x + y * y);
          if (distance < 150) {
            xTo(x * 0.3);
            yTo(y * 0.3);
          } else {
            xTo(0);
            yTo(0);
          }
        };

        const handleMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEmail = () => {
    window.location.href = "mailto:contact@aliyan.dev";
  };

  return (
    <section
      ref={containerRef}
      className="flex min-h-screen flex-col justify-between py-32"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-4 px-6">
        <h1 className="text-center font-display text-[15vw] font-extrabold leading-[0.8] tracking-tighter text-flash uppercase">
          LETS WORK
        </h1>
        <p className="text-center font-body text-xl text-mist uppercase tracking-widest">
          TURN VISION INTO REALITY
        </p>
      </div>

      {/* Magnetic Button */}
      <div className="flex flex-1 items-center justify-center py-20">
        <button
          ref={buttonRef}
          onClick={handleEmail}
          className="group relative flex h-40 w-40 items-center justify-center rounded-full border border-mist bg-transparent transition-all duration-300 hover:scale-110 hover:bg-flash hover:border-flash md:h-56 md:w-56"
        >
          <span className="font-display text-lg font-bold uppercase text-flash transition-colors duration-300 group-hover:text-void md:text-xl">
            GET IN TOUCH
          </span>
        </button>
      </div>

      {/* Footer Bar */}
      <div className="flex w-full flex-col justify-between gap-8 px-6 font-body text-sm uppercase tracking-widest text-mist md:flex-row">
        <div>© 2026 MUHAMMAD ALIYAN</div>

        <div className="flex gap-8">
          <a href="#" className="hover:text-flash transition-colors">
            GITHUB
          </a>
          <a href="#" className="hover:text-flash transition-colors">
            LINKEDIN
          </a>
          <a href="#" className="hover:text-flash transition-colors">
            INSTAGRAM
          </a>
        </div>

        <div className="text-right">LHR [{time}] PKT</div>
      </div>
    </section>
  );
}
