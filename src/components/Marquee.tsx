"use client";

import { motion } from "framer-motion";

export default function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const loop = [...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex gap-10 will-change-transform"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <span key={i} className="font-display text-4xl md:text-6xl flex items-center gap-10 shrink-0">
            {item}
            <span className="text-brass text-2xl">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
