"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WorkItem } from "@/lib/data";
import TiltImage from "./TiltImage";

export default function HorizontalGallery({ items }: { items: WorkItem[] }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", `-${(items.length - 1) * 34}%`]);

  return (
    <div ref={container} className="relative" style={{ height: `${items.length * 65}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 md:gap-10 px-6 md:px-10 will-change-transform">
          {items.map((item, i) => (
            <div key={item.title} className="shrink-0 w-[78vw] sm:w-[46vw] md:w-[30vw]">
              <TiltImage src={item.image} alt={item.title} className="aspect-[4/5]" intensity={8} />
              <div className="mt-4 flex items-baseline gap-3">
                <span className="reel-eyebrow text-brass">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-display text-xl md:text-2xl">{item.title}</p>
                  <p className="text-ink-soft text-sm">{item.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
