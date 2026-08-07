"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, MapPin, Check, MessageCircle } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { BRAND } from "@/lib/data";

const REASONS = [
  "Production House",
  "Marketing & Social",
  "Performance Marketing",
  "Web & App Development",
  "Something else",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-32 md:pt-40 pb-28 md:pb-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-16">
        <div>
          <Reveal>
            <p className="reel-eyebrow text-brass mb-4">Reel 05 — Contact</p>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-6">
              Let&apos;s roll camera.
            </h1>
            <p className="text-ink-soft text-lg leading-relaxed max-w-md">
              Tell us a little about the brand and what needs telling. We
              reply within one working day with next steps.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14 space-y-6">
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-4 group" data-cursor-hover>
              <span className="w-11 h-11 rounded-full bg-ink text-paper flex items-center justify-center shrink-0 group-hover:bg-brass transition-colors">
                <Mail className="w-4 h-4" />
              </span>
              <span className="text-ink-soft group-hover:text-ink transition-colors">{BRAND.email}</span>
            </a>
            <a href={`tel:+91${BRAND.phone}`} className="flex items-center gap-4 group" data-cursor-hover>
              <span className="w-11 h-11 rounded-full bg-ink text-paper flex items-center justify-center shrink-0 group-hover:bg-brass transition-colors">
                <Phone className="w-4 h-4" />
              </span>
              <span className="text-ink-soft group-hover:text-ink transition-colors">{BRAND.phoneDisplay}</span>
            </a>
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
              data-cursor-hover
            >
              <span className="w-11 h-11 rounded-full bg-ink text-paper flex items-center justify-center shrink-0 group-hover:bg-brass transition-colors">
                <MessageCircle className="w-4 h-4" />
              </span>
              <span className="text-ink-soft group-hover:text-ink transition-colors">Chat on WhatsApp</span>
            </a>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
              data-cursor-hover
            >
              <span className="w-11 h-11 rounded-full bg-ink text-paper flex items-center justify-center shrink-0 group-hover:bg-brass transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </span>
              <span className="text-ink-soft group-hover:text-ink transition-colors">{BRAND.instagramHandle}</span>
            </a>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-ink text-paper flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </span>
              <span className="text-ink-soft">{BRAND.location}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-3xl border border-ink/10 bg-paper p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 flex justify-between px-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 mt-1 rounded-[2px] bg-ink/10" />
              ))}
            </div>

            <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center relative"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    animate={{
                      opacity: 0,
                      x: Math.cos((i / 10) * Math.PI * 2) * 90,
                      y: Math.sin((i / 10) * Math.PI * 2) * 90,
                      scale: 0,
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    className="absolute left-1/2 top-16 w-2 h-2 rounded-full bg-brass"
                  />
                ))}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                  className="w-14 h-14 rounded-full bg-brass/15 text-brass flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-6 h-6" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="font-display text-3xl mb-3"
                >
                  Cut. That&apos;s a take.
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-ink-soft"
                >
                  Thanks — we&apos;ve got your brief. We&apos;ll be in touch within one working day.
                </motion.p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="reel-eyebrow text-ink-soft/70 mb-2 block">Name</span>
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-transparent border-b border-ink/20 py-2.5 focus:outline-none focus:border-brass transition-colors"
                    />
                  </label>
                  <label className="block">
                    <span className="reel-eyebrow text-ink-soft/70 mb-2 block">Brand</span>
                    <input
                      type="text"
                      placeholder="Your brand"
                      className="w-full bg-transparent border-b border-ink/20 py-2.5 focus:outline-none focus:border-brass transition-colors"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="reel-eyebrow text-ink-soft/70 mb-2 block">Email</span>
                  <input
                    required
                    type="email"
                    placeholder="you@brand.com"
                    className="w-full bg-transparent border-b border-ink/20 py-2.5 focus:outline-none focus:border-brass transition-colors"
                  />
                </label>

                <div>
                  <span className="reel-eyebrow text-ink-soft/70 mb-3 block">What needs telling?</span>
                  <div className="flex flex-wrap gap-2">
                    {REASONS.map((r) => (
                      <label
                        key={r}
                        className="cursor-pointer text-sm rounded-full border border-ink/15 px-4 py-2 has-[:checked]:bg-ink has-[:checked]:text-paper has-[:checked]:border-ink transition-colors"
                      >
                        <input type="radio" name="reason" value={r} className="sr-only" />
                        {r}
                      </label>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="reel-eyebrow text-ink-soft/70 mb-2 block">A little about the project</span>
                  <textarea
                    rows={4}
                    placeholder="What are you trying to say, and to whom?"
                    className="w-full bg-transparent border-b border-ink/20 py-2.5 focus:outline-none focus:border-brass transition-colors resize-none"
                  />
                </label>

                <Button type="submit" variant="dark" magnetic={false}>
                  Send the brief
                </Button>
              </motion.form>
            )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
