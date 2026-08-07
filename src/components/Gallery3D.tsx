"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeroAtmosphere from "./HeroAtmosphere";
import Button from "./Button";
import { BRAND } from "@/lib/data";

const GalleryScene = dynamic(() => import("./GalleryScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-ink" />,
});

export default function Gallery3D() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-mount guard so the WebGL canvas only renders after hydration
    setReady(true);
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      progress.current = total > 0 ? scrolled / total : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={trackRef} className="relative h-[420vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-ink">
        {ready && <GalleryScene progress={progress} />}

        <HeroAtmosphere />

        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/80 pointer-events-none" />
        <div className="film-grain-local absolute inset-0 pointer-events-none opacity-[0.06] z-[6]" />

        <div className="relative z-10 h-full flex flex-col items-start justify-end md:justify-center px-6 md:px-10 pb-16 md:pb-0 max-w-7xl mx-auto pointer-events-none">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="reel-eyebrow text-brass-light mb-5"
          >
            Production House · Mumbai
          </motion.p>
          <h1 className="font-display text-paper text-5xl sm:text-6xl md:text-8xl leading-[0.98] max-w-3xl">
            {"We don't just shoot.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.22 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-[0.28em]"
                style={{ transformPerspective: 600 }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            {"We build legacies.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-[0.28em] bg-gradient-to-r from-paper via-brass-light to-paper bg-clip-text text-transparent"
                style={{ transformPerspective: 600 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-paper/70 text-lg max-w-md leading-relaxed"
          >
            Film production, social media, performance marketing and web
            development — {BRAND.name} runs your whole story from one roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-9 flex items-center gap-5 pointer-events-auto"
          >
            <Button href="/contact" variant="brass">
              Start a project
            </Button>
            <Button href="/work" variant="ghost" icon={false} className="text-paper">
              See the work
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-paper/60 z-10"
        >
          <ChevronDown className="w-6 h-6" />
          <p className="reel-eyebrow text-paper/40 mt-1 text-center">Scroll the gallery</p>
        </motion.div>
      </div>
    </div>
  );
}
