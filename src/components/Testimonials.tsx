"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  const current = TESTIMONIALS[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative max-w-3xl mx-auto"
    >
      <div className="relative rounded-[28px] border border-ink/10 bg-paper/70 backdrop-blur-xl shadow-[0_30px_70px_-30px_rgba(33,28,21,0.35)] px-8 md:px-14 py-12 md:py-16 text-center overflow-hidden min-h-[280px] flex flex-col items-center justify-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 0%, rgba(220,184,118,0.14), transparent 55%)",
          }}
        />
        <Quote className="w-8 h-8 text-brass/50 mb-6 relative" strokeWidth={1.2} />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <p className="font-display text-xl md:text-2xl leading-relaxed text-ink max-w-xl mx-auto mb-7">
              &ldquo;{current.quote}&rdquo;
            </p>
            <p className="reel-eyebrow text-brass">{current.name}</p>
            <p className="text-ink-soft text-sm mt-1">{current.role}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => go(-1)}
          data-cursor-hover
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-paper hover:border-ink transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="relative w-6 h-1.5 rounded-full bg-ink/10 overflow-hidden"
            >
              {i === index && (
                <motion.span
                  layoutId="testimonial-dot"
                  className="absolute inset-0 bg-brass rounded-full"
                />
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => go(1)}
          data-cursor-hover
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-paper hover:border-ink transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
