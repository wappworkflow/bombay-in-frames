"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 40, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 140, damping: 20, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 140, damping: 20, mass: 0.6 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <div className="hidden [@media(pointer:fine)]:contents">
      <motion.div
        style={{ left: springX, top: springY }}
        className="pointer-events-none fixed z-[80] w-2 h-2 -ml-1 -mt-1 rounded-full bg-brass mix-blend-difference hidden md:block"
      />
      <motion.div
        style={{ left: ringX, top: ringY }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          opacity: hovering ? 0.9 : 0.5,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="pointer-events-none fixed z-[80] -ml-4 -mt-4 rounded-full border border-brass mix-blend-difference hidden md:block"
      />
    </div>
  );
}
