"use client";

import Gallery3D from "./Gallery3D";
import ImageMosaic from "./ImageMosaic";

export default function Hero() {
  return (
    <div>
      <Gallery3D />

      {/* Signature effect: image segregates into tiles, then reassembles on scroll */}
      <section className="py-24 md:py-32 bg-parchment">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <div>
            <p className="reel-eyebrow text-brass mb-4">Frame By Frame</p>
            <h2 className="font-display text-3xl md:text-5xl leading-tight mb-5">
              Every story arrives in pieces.
              <br />
              We cut it together.
            </h2>
            <p className="text-ink-soft leading-relaxed max-w-md">
              Scroll to watch the frame come together — the same way we take
              a scattered brief and assemble it into one clean, cinematic
              story across production, social, performance and web.
            </p>
          </div>
          <ImageMosaic
            image="https://picsum.photos/seed/bif-mosaic-hero/1400/1400"
            cols={7}
            rows={5}
            seedBase={7}
            className="aspect-square"
          />
        </div>
      </section>
    </div>
  );
}
