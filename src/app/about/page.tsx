import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import TiltImage from "@/components/TiltImage";
import ImageMosaic from "@/components/ImageMosaic";
import { VALUES, TIMELINE } from "@/lib/data";

export default function AboutPage() {
  return (
    <div className="pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center mb-24 md:mb-32">
        <Reveal>
          <p className="reel-eyebrow text-brass mb-4">Reel 04 — About</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05]">
            A production house that never stopped at production.
          </h1>
          <p className="mt-6 text-ink-soft text-lg leading-relaxed max-w-lg">
            Bombay In Frames was built on a simple idea: the brands worth
            remembering are the ones whose story is consistent everywhere it
            appears — on set, on the feed, in the ad and on the site.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <TiltImage
            src="https://picsum.photos/seed/bif-about-studio/1100/1300"
            alt="Bombay In Frames studio at work"
            className="aspect-[4/5]"
          />
        </Reveal>
      </div>

      {/* Segregation / merge signature moment */}
      <section className="mx-auto max-w-4xl px-6 md:px-10 mb-24 md:mb-32">
        <Reveal className="text-center mb-10">
          <p className="reel-eyebrow text-brass mb-4">One Studio, Assembled</p>
          <h2 className="font-display text-3xl md:text-4xl">
            Four departments. One frame.
          </h2>
        </Reveal>
        <ImageMosaic
          image="https://picsum.photos/seed/bif-about-mosaic/1200/1200"
          cols={6}
          rows={6}
          seedBase={3}
          className="aspect-square"
        />
      </section>

      {/* Values */}
      <section className="bg-bottle text-paper py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="max-w-xl mb-14">
            <p className="reel-eyebrow text-brass-light mb-4">What Guides The Frame</p>
            <h2 className="font-display text-4xl md:text-5xl">Vision, story, emotion.</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <span className="reel-eyebrow text-brass-light block mb-5">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-2xl mb-2">{v.title}</h3>
                <p className="text-paper/70 leading-relaxed">{v.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-6 md:px-10 py-28 md:py-36">
        <Reveal className="mb-16">
          <p className="reel-eyebrow text-brass mb-4">The Studio&apos;s Reel</p>
          <h2 className="font-display text-4xl md:text-5xl">How we got here.</h2>
        </Reveal>

        <div className="relative border-l border-ink/15 pl-8 md:pl-12 space-y-16">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.06} className="relative">
              <span className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full bg-brass border-4 border-parchment" />
              <p className="reel-eyebrow text-brass mb-2">
                {t.n} — {t.year}
              </p>
              <h3 className="font-display text-2xl md:text-3xl mb-2">{t.title}</h3>
              <p className="text-ink-soft leading-relaxed max-w-lg">{t.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-28 md:pb-36 text-center">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl mb-8 max-w-2xl mx-auto">
            Come and see how we&apos;d frame you.
          </h2>
          <Button href="/contact" variant="dark">
            Get in touch
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
