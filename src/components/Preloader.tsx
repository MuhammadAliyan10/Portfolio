"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import gsap from "gsap";

// Generate frame paths
const TOTAL_FRAMES = 48;
const frames = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/Loader/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`,
);

const TEXT_LINE1 = "Welcome to";
const TEXT_LINE2 = "Imagination";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimOverlayRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const animationStarted = useRef(false);

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    frames.forEach((src, index) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        images[index] = img;
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  // Draw frame on canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[Math.floor(frameIndex)];

    if (!canvas || !ctx || !img) return;

    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height,
    );
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, []);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useLayoutEffect(() => {
    if (!imagesLoaded || animationStarted.current) return;
    animationStarted.current = true;

    const ctx = gsap.context(() => {
      document.body.style.overflow = "hidden";

      // Initial states
      gsap.set(canvasRef.current, { autoAlpha: 0 });
      gsap.set(dimOverlayRef.current, { autoAlpha: 1 });
      gsap.set(textContainerRef.current, { autoAlpha: 0 });
      gsap.set(line1Ref.current, { y: 60, autoAlpha: 0 });
      gsap.set(line2Ref.current, { y: 80, autoAlpha: 0, scale: 0.8 });

      // Draw first frame (hidden)
      drawFrame(0);

      const frameObj = { value: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
          gsap.to(containerRef.current, {
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(containerRef.current, { display: "none" });
            },
          });
        },
      });

      // === PHASE 1: REVEAL VIDEO ===
      tl.to(canvasRef.current, {
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      // Dim overlay fades but stays slightly dark
      tl.to(
        dimOverlayRef.current,
        {
          autoAlpha: 0.3,
          duration: 1,
          ease: "power2.out",
        },
        "<",
      );

      // === PHASE 3: FRAME SEQUENCE ===
      tl.to(frameObj, {
        value: TOTAL_FRAMES - 1,
        duration: 3.5,
        ease: "none",
        onUpdate: () => {
          drawFrame(frameObj.value);
        },
      });

      // === PHASE 3: LIGHT FLICKER BEFORE TEXT ===
      // Quick flicker 1
      tl.to(dimOverlayRef.current, { autoAlpha: 1, duration: 0.09 });
      tl.to(dimOverlayRef.current, { autoAlpha: 0.2, duration: 0.09 });

      // Quick flicker 2
      tl.to(dimOverlayRef.current, { autoAlpha: 1, duration: 0.09 });
      tl.to(dimOverlayRef.current, { autoAlpha: 0.2, duration: 0.09 });

      // Quick flicker 3
      tl.to(dimOverlayRef.current, { autoAlpha: 1, duration: 0.09 });
      tl.to(dimOverlayRef.current, { autoAlpha: 0.1, duration: 0.09 });

      tl.to(dimOverlayRef.current, { autoAlpha: 1, duration: 0.09 });
      tl.to(dimOverlayRef.current, { autoAlpha: 0.2, duration: 0.09 });

      // === PHASE 4: TEXT APPEARS ===
      tl.to(
        textContainerRef.current,
        {
          autoAlpha: 1,
          duration: 0.3,
        },
        "-=0.3",
      );

      // Line 1: "Welcome to" - subtle slide
      tl.to(
        line1Ref.current,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.2",
      );

      // Line 2: "Imagination" - dramatic entrance
      tl.to(
        line2Ref.current,
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.8)",
        },
        "-=0.5",
      );

      // Hold at end
      tl.to({}, { duration: 0.6 });
    }, containerRef);

    return () => ctx.revert();
  }, [imagesLoaded, drawFrame]);

  return (
    <div
      ref={containerRef}
      id="preloader"
      className="fixed inset-0 z-[9999]"
      style={{ backgroundColor: "#000" }}
    >
      {/* Canvas for frame sequence */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Dim/Darkness overlay for light effect */}
      <div
        ref={dimOverlayRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: "#000" }}
      />

      {/* Typography Text - Centered */}
      <div
        ref={textContainerRef}
        className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center px-8">
          {/* Line 1: Welcome to */}
          <div ref={line1Ref} className="overflow-hidden">
            <p
              className="font-body text-sm md:text-lg lg:text-xl uppercase tracking-[0.5em] md:tracking-[0.8em]"
              style={{
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.5em",
              }}
            >
              {TEXT_LINE1}
            </p>
          </div>

          {/* Line 2: Imagination - Main typography */}
          <div ref={line2Ref} className="overflow-hidden mt-2 md:mt-4">
            <h1
              className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase"
              style={{
                color: "#fff",
                textShadow: `
                  0 0 80px rgba(255,255,255,0.3),
                  0 0 120px rgba(255,255,255,0.2),
                  0 4px 30px rgba(0,0,0,0.8)
                `,
                WebkitTextStroke: "1px rgba(255,255,255,0.1)",
              }}
            >
              {TEXT_LINE2}
            </h1>
          </div>

          {/* Decorative line under text */}
          <div className="mt-6 md:mt-8 flex items-center justify-center gap-4">
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
            <div className="w-1 h-1 bg-white/50 rounded-full" />
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-white/30" />
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
          <div className="text-center">
            <div className="w-10 h-10 border border-white/20 border-t-white/60 rounded-full animate-spin mb-4 mx-auto" />
            <p className="font-body text-xs uppercase tracking-[0.3em] text-white/40">
              Loading
            </p>
          </div>
        </div>
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}
