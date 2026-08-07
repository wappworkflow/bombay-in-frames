import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import AnimatedCounter from "@/components/AnimatedCounter";
import HorizontalGallery from "@/components/HorizontalGallery";
import ImageMosaic from "@/components/ImageMosaic";
import { STATS, WORK } from "@/lib/data";

export default function WorkPage() {
  return (
    <div className="pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-2xl mb-16 md:mb-20">
          <p className="reel-eyebrow text-brass mb-4">Reel 03 — Work</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05]">
            Every frame, a client&apos;s story.
          </h1>
          <p className="mt-6 text-ink-soft text-lg leading-relaxed">
            A selection of production, marketing and web work — scroll the
            reel below the way you&apos;d rewind a favourite film.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-ink/10 py-10 mb-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <AnimatedCounter value={s.n} className="font-display text-3xl md:text-4xl text-brass mb-1" />
              <p className="text-ink-soft text-sm leading-snug">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <HorizontalGallery items={WORK} />

      <section className="mx-auto max-w-4xl px-6 md:px-10 py-28 md:py-36">
        <Reveal className="text-center mb-10">
          <p className="reel-eyebrow text-brass mb-4">A Closer Look</p>
          <h2 className="font-display text-3xl md:text-4xl">One frame, taken apart.</h2>
        </Reveal>
        <ImageMosaic
          image="https://picsum.photos/seed/bif-work-mosaic/1200/1200"
          cols={6}
          rows={5}
          seedBase={11}
          className="aspect-[6/5]"
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-36 text-center">
        <Reveal>
          <p className="reel-eyebrow text-brass mb-5">Reel 04 — Your Turn</p>
          <h2 className="font-display text-4xl md:text-5xl mb-8 max-w-2xl mx-auto">
            Ready to add your frame to the reel?
          </h2>
          <Button href="/contact" variant="dark">
            Start a project
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
