"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// Deterministic pseudo-random generator so server & client render identical
// scatter values (avoids hydration mismatches from Math.random()).
function seeded(seed: number) {
  let t = seed + 0x6d2b79f5;
  return function random() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function Tile({
  progress,
  col,
  row,
  cols,
  rows,
  image,
  seed,
}: {
  progress: MotionValue<number>;
  col: number;
  row: number;
  cols: number;
  rows: number;
  image: string;
  seed: number;
}) {
  const rand = seeded(seed);
  const dirX = rand() > 0.5 ? 1 : -1;
  const dirY = rand() > 0.5 ? 1 : -1;
  const scatterX = dirX * (60 + rand() * 220);
  const scatterY = dirY * (60 + rand() * 220);
  const scatterRot = (rand() - 0.5) * 60;
  const delay = (row + col) / (rows + cols);

  const range = [
    Math.max(0, delay * 0.5),
    Math.min(1, 0.4 + delay * 0.5),
  ];

  const x = useTransform(progress, range, [scatterX, 0]);
  const y = useTransform(progress, range, [scatterY, 0]);
  const rotate = useTransform(progress, range, [scatterRot, 0]);
  const opacity = useTransform(progress, range, [0.15, 1]);
  const scale = useTransform(progress, range, [0.7, 1]);

  return (
    <motion.div
      style={{ x, y, rotate, opacity, scale }}
      className="relative overflow-hidden"
    >
      <div
        className="absolute"
        style={{
          width: `${cols * 100}%`,
          height: `${rows * 100}%`,
          left: `-${col * 100}%`,
          top: `-${row * 100}%`,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: `${(col / Math.max(cols - 1, 1)) * 100}% ${(row / Math.max(rows - 1, 1)) * 100}%`,
        }}
      />
    </motion.div>
  );
}

export default function ImageMosaic({
  image,
  cols = 6,
  rows = 4,
  className = "",
  seedBase = 1,
}: {
  image: string;
  cols?: number;
  rows?: number;
  className?: string;
  seedBase?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.25"],
  });

  const tiles = useMemo(() => {
    const arr: { row: number; col: number; seed: number }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push({ row: r, col: c, seed: seedBase * 1000 + r * cols + c });
      }
    }
    return arr;
  }, [rows, cols, seedBase]);

  return (
    <div
      ref={ref}
      className={`grid rounded-2xl md:rounded-3xl overflow-hidden ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {tiles.map((t) => (
        <Tile
          key={`${t.row}-${t.col}`}
          progress={scrollYProgress}
          col={t.col}
          row={t.row}
          cols={cols}
          rows={rows}
          image={image}
          seed={t.seed}
        />
      ))}
    </div>
  );
}
