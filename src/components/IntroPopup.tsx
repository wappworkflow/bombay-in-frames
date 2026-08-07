"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X, ArrowRight, Check, Loader2 } from "lucide-react";
import { BRAND } from "@/lib/data";

const STORAGE_KEY = "bif-intro-popup-seen-v2";

type Status = "idle" | "submitting" | "success" | "error";

export default function IntroPopup() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client mount guard, reading localStorage is a legitimate external sync
    setReady(true);
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;

    const reveal = () => {
      setOpen((v) => {
        if (!v) {
          try {
            localStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
        }
        return true;
      });
    };

    const timer = setTimeout(reveal,100);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrolled = window.scrollY / max;
      if (scrolled > 0.4) {
        reveal();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!ready) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 backdrop-blur-md px-6"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92, rotateX: 14 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 24, scale: 0.94, rotateX: 8 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1400 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl grid md:grid-cols-[1.05fr_1fr] rounded-[28px] overflow-hidden border border-brass/25 bg-bottle/80 backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]"
          >
            <button
              onClick={() => setOpen(false)}
              data-cursor-hover
              aria-label="Close"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-ink/40 border border-paper/20 text-paper flex items-center justify-center hover:bg-ink/70 hover:rotate-90 transition-all duration-300"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative hidden md:block min-h-[420px]">
              <Image
                src="https://picsum.photos/seed/bif-popup-cover/900/1200"
                alt="Bombay In Frames — behind the scenes"
                fill
                sizes="420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bottle/60" />
            </div>

            <div className="relative px-8 md:px-10 py-12 md:py-14 text-paper flex flex-col justify-center overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 80% 0%, rgba(220,184,118,0.28), transparent 55%)",
                }}
              />

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <div className="w-14 h-14 rounded-full bg-brass/20 border border-brass/40 flex items-center justify-center mb-6">
                    <Check className="w-6 h-6 text-brass-light" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl leading-tight mb-3">
                    You&apos;re on the list.
                  </h2>
                  <p className="text-paper/70 leading-relaxed mb-8">
                    Thanks, {name.split(" ")[0]}. Our team will reach out to you
                    shortly at {phone}.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    data-cursor-hover
                    className="relative inline-flex items-center gap-2 rounded-full bg-brass text-ink px-7 py-3.5 text-sm font-medium hover:bg-brass-light transition-colors w-fit"
                  >
                    Continue exploring <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <>
                  <p className="relative reel-eyebrow text-brass-light mb-4">
                    Welcome to the reel
                  </p>
                  <h2 className="relative font-display text-3xl md:text-4xl leading-tight mb-4">
                    {BRAND.name}
                  </h2>
                  <p className="relative text-paper/70 leading-relaxed mb-7">
                    {BRAND.tagline} Leave your details and we&apos;ll get in
                    touch to talk about your next shoot.
                  </p>

                  <form onSubmit={handleSubmit} className="relative space-y-3.5">
                    <div>
                      <input
                        type="text"
                        required
                        minLength={2}
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={status === "submitting"}
                        className="w-full rounded-xl bg-paper/5 border border-paper/20 px-4 py-3 text-sm text-paper placeholder:text-paper/40 focus:outline-none focus:border-brass/60 focus:bg-paper/10 transition-colors disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "submitting"}
                        className="w-full rounded-xl bg-paper/5 border border-paper/20 px-4 py-3 text-sm text-paper placeholder:text-paper/40 focus:outline-none focus:border-brass/60 focus:bg-paper/10 transition-colors disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={status === "submitting"}
                        className="w-full rounded-xl bg-paper/5 border border-paper/20 px-4 py-3 text-sm text-paper placeholder:text-paper/40 focus:outline-none focus:border-brass/60 focus:bg-paper/10 transition-colors disabled:opacity-50"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-300/90">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      data-cursor-hover
                      className="relative inline-flex items-center justify-center gap-2 rounded-full bg-brass text-ink px-7 py-3.5 text-sm font-medium hover:bg-brass-light transition-colors w-full disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          Step inside <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-paper/40 pt-1">
                      We&apos;ll only use these details to get in touch about
                      your project. No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
