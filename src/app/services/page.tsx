import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import TiltImage from "@/components/TiltImage";
import { SERVICES, PROCESS } from "@/lib/data";

export default function ServicesPage() {
  return (
    <div className="pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-2xl mb-20 md:mb-28">
          <p className="reel-eyebrow text-brass mb-4">Reel 02 — Services</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05]">
            One studio, run like four departments.
          </h1>
          <p className="mt-6 text-ink-soft text-lg leading-relaxed">
            Production, social, performance and web — kept under one roof so
            nothing gets lost in a handoff between agencies.
          </p>
        </Reveal>
      </div>

      <div className="space-y-28 md:space-y-40 pb-28 md:pb-36">
        {SERVICES.map((s, i) => (
          <div key={s.n} className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <Reveal className={i % 2 === 1 ? "md:order-last" : ""}>
                <TiltImage src={s.image} alt={s.title} className="aspect-[4/5] md:aspect-[16/12]" />
              </Reveal>

              <Reveal delay={0.1}>
                <span className="reel-eyebrow text-brass">{s.n}</span>
                <h2 className="font-display text-3xl md:text-5xl mt-3 mb-2">{s.title}</h2>
                <p className="text-brass italic font-display text-lg mb-5">{s.strap}</p>
                <p className="text-ink-soft leading-relaxed mb-7 max-w-md">{s.copy}</p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-ink/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-brass shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        ))}
      </div>

      {/* Process */}
      <section className="bg-bottle text-paper py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="max-w-xl mb-16">
            <p className="reel-eyebrow text-brass-light mb-4">How A Project Runs</p>
            <h2 className="font-display text-4xl md:text-5xl">The four cuts.</h2>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-8">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <p className="reel-eyebrow text-brass-light mb-4">{p.n}</p>
                <h3 className="font-display text-xl mb-2">{p.title}</h3>
                <p className="text-paper/70 text-sm leading-relaxed">{p.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-36 text-center">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl mb-8 max-w-2xl mx-auto">
            Tell us what needs telling.
          </h2>
          <Button href="/contact" variant="dark">
            Get in touch
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
