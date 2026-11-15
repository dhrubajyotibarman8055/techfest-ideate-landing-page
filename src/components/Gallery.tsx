import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, Reveal, SplitHeading } from "./ui/Text";
import { GALLERY } from "../data/content";

const SHAPES = ["arch", "round", "arch", "rect", "arch", "round", "rect"] as const;
// per-tile layout on md+: column span, aspect ratio, offset & parallax strength
const LAYOUT = [
  { col: "md:col-span-4", ratio: "aspect-[3/4]", speed: 60 },
  { col: "md:col-span-3 md:mt-32", ratio: "aspect-[3/4]", speed: -30 },
  { col: "md:col-span-5", ratio: "aspect-[4/5]", speed: 90 },
  { col: "md:col-span-4 md:-mt-10", ratio: "aspect-[4/3]", speed: -50 },
  { col: "md:col-span-3 md:mt-16", ratio: "aspect-[3/4]", speed: 40 },
  { col: "md:col-span-5 md:-mt-24", ratio: "aspect-square", speed: -70 },
  { col: "md:col-span-4 md:mt-10", ratio: "aspect-[4/3]", speed: 30 },
];

function Tile({ i }: { i: number }) {
  const g = GALLERY[i];
  const l = LAYOUT[i];
  const shape = SHAPES[i];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [l.speed, -l.speed]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const radius =
    shape === "arch" ? "rounded-t-[999px] rounded-b-2xl" : shape === "round" ? "rounded-[999px]" : "rounded-[2rem]";

  return (
    <motion.figure ref={ref} style={{ y }} className={`group relative ${l.col}`} data-cursor="Look">
      <div className={`relative overflow-hidden ${l.ratio} ${radius} bg-ink-3`}>
        <motion.img
          src={g.src}
          alt={g.alt}
          loading="lazy"
          decoding="async"
          style={{ y: imgY }}
          className="absolute -top-[10%] h-[120%] w-full object-cover grayscale-[0.85] sepia-[0.25] transition-all duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0 group-hover:sepia-0"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-aether/10 mix-blend-multiply" />
        <div aria-hidden className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-gold/30" />
      </div>
      <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-2">
        <span className="whitespace-nowrap font-serif text-2xl italic text-gold-2 md:text-3xl">{g.label}</span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-parchment/50">{g.sub}</span>
      </figcaption>
    </motion.figure>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="relative -mt-10 overflow-hidden rounded-t-[2.5rem] bg-ink pb-28 pt-28 md:-mt-20 md:rounded-t-[5rem] md:pb-44 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute right-0 top-20 h-[40rem] w-[40rem] rounded-full bg-aether/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <Eyebrow n="05">Atmosphere</Eyebrow>
        </Reveal>
        <h2 className="mt-6 max-w-5xl font-display text-[clamp(2.2rem,5.4vw,5rem)] font-semibold leading-[1.02] tracking-tight">
          <SplitHeading text="Heritage and horizon, *one* campus." />
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-parchment/65">
          Robots in the arena, drones overhead, lasers by night, lecture halls full. Three days where the whole of IIT Bombay becomes the exhibit.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-24 md:grid-cols-12 md:gap-y-12">
          {GALLERY.map((_, i) => (
            <Tile key={i} i={i} />
          ))}
        </div>

        <p className="mt-20 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-parchment/40 md:mt-32">
          Atmosphere imagery: representative photography via Pexels — see official galleries on techfest.org.
        </p>
      </div>
    </section>
  );
}
