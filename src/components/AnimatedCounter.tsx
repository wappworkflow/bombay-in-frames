"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedCounter({
  value,
  className = "",
}: {
  value: string; // e.g. "80+", "3.5x", "12"
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const match = value.match(/-?\d+(\.\d+)?/);
  const numeric = match ? parseFloat(match[0]) : 0;
  const prefix = match ? value.slice(0, match.index) : "";
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : value;
  const decimals = match && match[0].includes(".") ? match[0].split(".")[1].length : 0;

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 70, damping: 20 });
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) motionVal.set(numeric);
  }, [inView, numeric, motionVal]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = v.toFixed(decimals);
      }
    });
  }, [spring, decimals]);

  return (
    <motion.p ref={ref} className={className}>
      {prefix}
      <span ref={displayRef}>0</span>
      {suffix}
    </motion.p>
  );
}
