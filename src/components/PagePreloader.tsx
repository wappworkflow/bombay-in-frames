"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Aperture } from "lucide-react";
import { BRAND } from "@/lib/data";

const BLADES = 8;

export default function PagePreloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    // Only show the full preloader on the very first load of a browser
    // session — not on every client-side route change.
    let seen = false;
    try {
      seen = sessionStorage.getItem("bif-preloader-seen") === "1";
    } catch {
      seen = false;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client mount guard reading sessionStorage
    setSkip(seen);
    if (seen) return;

    try {
      sessionStorage.setItem("bif-preloader-seen", "1");
    } catch {
      /* ignore */
    }

    const start = performance.now();
    const DURATION = 1900;
    let raf: number;

    const tick = (t: number) => {
      const elapsed = t - start;
      const pct = Math.min(1, elapsed / DURATION);
      // ease-out so it feels like it's "arriving", not linear
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(Math.round(eased * 100));
      if (pct < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center overflow-hidden"
        >
          {/* film strip decoration, top and bottom */}
          <div className="absolute top-0 inset-x-0 h-4 sprocket-rail opacity-30" />
          <div className="absolute bottom-0 inset-x-0 h-4 sprocket-rail opacity-30" />

          {/* camera shutter blades closing/opening around the logo */}
          <div className="relative w-28 h-28 md:w-32 md:h-32 mb-8">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              {Array.from({ length: BLADES }).map((_, i) => (
                <motion.polygon
                  key={i}
                  points="50,50 100,38 100,62"
                  fill="#100d09"
                  stroke="#dcb876"
                  strokeWidth={0.5}
                  style={{ transformOrigin: "50px 50px" }}
                  animate={{
                    rotate: [i * (360 / BLADES), i * (360 / BLADES) + (progress > 92 ? 46 : 0)],
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </svg>
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Aperture className="w-10 h-10 md:w-12 md:h-12 text-brass-light" strokeWidth={1.1} />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display text-paper text-2xl md:text-3xl mb-6 tracking-tight"
          >
            {BRAND.name}
          </motion.p>

          <div className="w-48 md:w-56 h-[2px] bg-paper/15 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brass-light"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
          <p className="reel-eyebrow text-paper/40 mt-4">
            {String(progress).padStart(2, "0")}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
