"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

type Variant = "brass" | "dark" | "light" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  brass: "bg-brass text-ink hover:bg-brass-light",
  dark: "bg-ink text-paper hover:bg-bottle",
  light: "bg-paper text-ink hover:bg-brass-light",
  ghost: "bg-transparent border border-current/30 hover:border-current/70",
};

const SIZES: Record<Size, string> = {
  sm: "px-5 py-2.5 text-xs gap-1.5",
  md: "px-7 py-4 text-sm gap-2",
  lg: "px-9 py-5 text-base gap-2.5",
};

type Ripple = { id: number; x: number; y: number };

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "brass",
  size = "md",
  icon = true,
  className = "",
  magnetic = true,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  className?: string;
  magnetic?: boolean;
}) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const spawnRipple = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
  };

  const inner = (
    <motion.span
      onMouseDown={spawnRipple}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-colors duration-300 select-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      style={{
        boxShadow:
          variant === "brass"
            ? "0 0 0 rgba(220,184,118,0)"
            : undefined,
      }}
    >
      {/* glow */}
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(60%_100%_at_50%_0%,rgba(220,184,118,0.35),transparent_70%)]" />

      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ opacity: 0.35, scale: 0 }}
          animate={{ opacity: 0, scale: 3.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-none absolute rounded-full bg-current/40"
          style={{ left: r.x, top: r.y, width: 16, height: 16, marginLeft: -8, marginTop: -8 }}
        />
      ))}

      <span className="relative z-10 inline-flex items-center gap-inherit">
        {children}
        {icon && (
          <ArrowUpRight className="w-[1em] h-[1em] transition-transform duration-300 group-hover:translate-x-0.5" />
        )}
      </span>
    </motion.span>
  );

  const content = href ? (
    <Link href={href} data-cursor-hover className="group inline-block">
      {inner}
    </Link>
  ) : (
    <button type={type} onClick={onClick} data-cursor-hover className="group">
      {inner}
    </button>
  );

  return magnetic ? <MagneticButton>{content}</MagneticButton> : content;
}
