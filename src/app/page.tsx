import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import TiltImage from "@/components/TiltImage";
import HorizontalGallery from "@/components/HorizontalGallery";
import Marquee from "@/components/Marquee";
import Button from "@/components/Button";
import AnimatedCounter from "@/components/AnimatedCounter";
import Testimonials from "@/components/Testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, WORK, STATS } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Statement */}
      <section className="mx-auto max-w-5xl px-6 md:px-10 py-28 md:py-36 text-center">
        <Reveal>
          <p className="reel-eyebrow text-brass mb-6">The Statement</p>
          <p className="font-display text-2xl md:text-4xl leading-snug text-ink/90">
            Every brand has a story worth telling well. We build the frame
            around it — the film, the feed, the funnel and the site — so the
            story travels further than the budget did.
          </p>
        </Reveal>
      </section>

      {/* Services, tilt cards */}
      <section className="bg-bottle text-paper py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="max-w-xl mb-16">
            <p className="reel-eyebrow text-brass-light mb-4">What We Roll On</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Four reels, one production house.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <TiltImage src={s.image} alt={s.title} className="aspect-[16/10] mb-6" intensity={10} />
                <div className="flex items-start justify-between mb-3">
                  <span className="reel-eyebrow text-brass-light">{s.n}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl mb-3">{s.title}</h3>
                <p className="text-paper/70 leading-relaxed max-w-sm">{s.copy}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-14">
            <Button href="/services" variant="ghost" className="text-paper">
              See every service
            </Button>
          </Reveal>
        </div>
      </section>

      <Marquee
        items={["Production", "Social Media", "Performance Marketing", "Web & App Development"]}
        className="py-10 md:py-14 border-y border-ink/10 text-ink/15"
      />

      {/* Work — pinned horizontal reel */}
      <section className="pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex items-end justify-between mb-4">
          <Reveal>
            <p className="reel-eyebrow text-brass mb-4">The Showreel</p>
            <h2 className="font-display text-4xl md:text-5xl">Recent frames.</h2>
          </Reveal>
          <Reveal delay={0.1} className="hidden md:block">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors"
            >
              View full reel <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
        <HorizontalGallery items={WORK.slice(0, 5)} />
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28 grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-ink/10">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <AnimatedCounter value={s.n} className="font-display text-3xl md:text-5xl text-brass mb-2" />
            <p className="text-ink-soft text-sm leading-snug">{s.label}</p>
          </Reveal>
        ))}
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
        <Reveal className="text-center mb-14">
          <p className="reel-eyebrow text-brass mb-4">In Their Words</p>
          <h2 className="font-display text-4xl md:text-5xl">Client-side reviews.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Testimonials />
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
        <Reveal className="text-center mb-14">
          <p className="reel-eyebrow text-brass mb-4">Before You Ask</p>
          <h2 className="font-display text-4xl md:text-5xl">A few common questions.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <FaqAccordion />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-36">
        <Reveal className="rounded-3xl bg-ink text-paper px-8 md:px-16 py-16 md:py-24 text-center relative overflow-hidden">
          <p className="reel-eyebrow text-brass-light mb-5">Reel 05 — Roll Camera</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl mx-auto mb-8">
            Let&apos;s build your brand&apos;s legacy.
          </h2>
          <Button href="/contact" variant="brass">
            Start a project
          </Button>
        </Reveal>
      </section>
    </>
  );
}
