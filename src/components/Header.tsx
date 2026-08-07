"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Aperture } from "lucide-react";
import { BRAND } from "@/lib/data";
import Button from "./Button";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    setHidden(latest > prev && latest > 240 && !open);
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the mobile menu when the route changes is intentional external sync
    setOpen(false);
  }, [pathname]);

  const isDark = pathname === "/"; // home starts on a dark hero
  const light = scrolled || !isDark; // whether we render the "light" (paper) chrome

  return (
    <motion.header
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-3 md:top-5 inset-x-0 z-[65] px-3 md:px-6"
    >
      {/* gradient-border wrapper: 1px padding reveals the gradient underneath */}
      <motion.div
        animate={{ maxWidth: scrolled ? 1040 : 1280 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto rounded-full p-[1px] shadow-[0_8px_40px_-14px_rgba(33,28,21,0.35)]"
        style={{
          background:
            "linear-gradient(120deg, rgba(220,184,118,0.65), rgba(220,184,118,0.05) 45%, rgba(220,184,118,0.45) 100%)",
        }}
      >
        <motion.div
          animate={{ paddingTop: scrolled ? 8 : 14, paddingBottom: scrolled ? 8 : 14 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex items-center justify-between rounded-full px-5 md:px-7 backdrop-blur-xl transition-colors duration-500 ${
            light ? "bg-paper/75" : "bg-ink/30"
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" data-cursor-hover>
            <motion.span
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative inline-flex"
            >
              <Aperture
                className={`w-6 h-6 md:w-7 md:h-7 transition-colors duration-500 ${
                  light ? "text-brass" : "text-brass-light"
                }`}
                strokeWidth={1.4}
              />
            </motion.span>
            <span
              className={`font-display text-base md:text-lg leading-tight transition-colors duration-500 ${
                light ? "text-ink" : "text-paper"
              }`}
            >
              {BRAND.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-cursor-hover
                className={`reel-eyebrow relative pb-1 transition-colors group ${
                  pathname === l.href
                    ? "text-brass"
                    : light
                    ? "text-ink/70 hover:text-ink"
                    : "text-paper/75 hover:text-paper"
                }`}
              >
                {l.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-brass origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    pathname === l.href ? "scale-x-100" : ""
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href="/contact" size="sm" variant={light ? "dark" : "light"}>
              Let&apos;s talk
            </Button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${
              light ? "border-ink/15 text-ink" : "border-paper/30 text-paper"
            }`}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden mt-2 mx-auto max-w-md rounded-3xl overflow-hidden bg-paper/90 backdrop-blur-xl border border-ink/10 shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`font-display text-2xl ${
                    pathname === l.href ? "text-brass" : "text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
