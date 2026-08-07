"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const PARTICLES = Array.from({ length: 22 }).map((_, i) => ({
  id: i,
  left: (i * 47) % 100,
  size: 1 + ((i * 13) % 3),
  delay: (i % 10) * 0.6,
  duration: 9 + (i % 6) * 2.2,
  drift: ((i % 5) - 2) * 18,
}));

export default function HeroAtmosphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(35);
  const glowX = useSpring(mx, { stiffness: 60, damping: 20 });
  const glowY = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set(((e.clientX - rect.left) / rect.width) * 100);
      my.set(((e.clientY - rect.top) / rect.height) * 100);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[5]">
      {/* mouse-follow glow */}
      <motion.div
        className="absolute w-[46vw] h-[46vw] rounded-full opacity-50"
        style={{
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(220,184,118,0.16) 0%, rgba(220,184,118,0.04) 45%, transparent 70%)",
        }}
      />

      {/* slow animated gradient blobs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 w-[36vw] h-[36vw] rounded-full bg-brass/10 blur-[90px]"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 26, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-0 w-[30vw] h-[30vw] rounded-full bg-bottle-light/20 blur-[100px]"
      />

      {/* lens flare */}
      <motion.div
        animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[18%] right-[22%] w-40 h-40 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute inset-0 rounded-full bg-brass-light/40 blur-2xl" />
        <div className="absolute left-1/2 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper/80 blur-[2px]" />
        <div className="absolute left-[130%] top-1/2 w-10 h-10 -translate-y-1/2 rounded-full bg-brass/25 blur-md" />
        <div className="absolute left-[220%] top-1/2 w-4 h-4 -translate-y-1/2 rounded-full bg-brass-light/30 blur-sm" />
      </motion.div>

      {/* floating particles */}
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-brass-light/70"
          style={{ left: `${p.left}%`, bottom: "-4%", width: p.size, height: p.size }}
          animate={{
            y: ["0%", "-115vh"],
            x: [0, p.drift, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 50%, transparent 45%, rgba(16,13,9,0.55) 100%)",
        }}
      />
    </div>
  );
}
