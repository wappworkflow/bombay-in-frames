"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send } from "lucide-react";
import { FAQ, FAQ_FALLBACK, BRAND } from "@/lib/data";

type Msg = { from: "bot" | "user"; text: string };

function getReply(input: string): string {
  const lower = input.toLowerCase();
  for (const entry of FAQ) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.answer;
  }
  return FAQ_FALLBACK;
}

export default function AIChatBot() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: `Hi, I'm Frame — the studio assistant for ${BRAND.name}. Ask me about services, pricing, or how to reach the team.`,
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    const text = value.trim();
    if (!text) return;
    const reply = getReply(text);
    setMessages((m) => [...m, { from: "user", text }, { from: "bot", text: reply }]);
    setValue("");
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        data-cursor-hover
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-[75] w-14 h-14 rounded-full bg-ink text-paper shadow-xl flex items-center justify-center"
        aria-label="Open studio assistant"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles className="w-5 h-5 text-brass-light" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[75] w-[88vw] sm:w-96 max-h-[68vh] flex flex-col rounded-3xl border border-ink/10 bg-paper shadow-2xl overflow-hidden"
          >
            <div className="px-5 py-4 bg-ink text-paper flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-brass-light" />
              <div>
                <p className="font-display text-lg leading-tight">Frame</p>
                <p className="text-paper/50 text-xs">Studio assistant</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.from === "bot"
                      ? "bg-ink/5 text-ink"
                      : "bg-brass text-ink ml-auto"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-ink/10 flex items-center gap-2">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about services, pricing…"
                className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none"
              />
              <button
                onClick={send}
                data-cursor-hover
                className="w-9 h-9 shrink-0 rounded-full bg-ink text-paper flex items-center justify-center hover:bg-brass transition-colors"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
