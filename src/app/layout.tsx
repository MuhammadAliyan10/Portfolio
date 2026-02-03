import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Algorithmic Editorial",
  description: "A living identity system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${spaceGrotesk.variable} antialiased bg-void text-flash`}
      >
        <div className="noise-overlay" />

        {/* Ambient Lighting Orbs */}
        <div className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5D3FD3] rounded-full blur-[120px] opacity-40 animate-float pointer-events-none -z-10" />
        <div className="fixed bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-[#EB5939] rounded-full blur-[120px] opacity-30 animate-float-delayed pointer-events-none -z-10" />

        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
