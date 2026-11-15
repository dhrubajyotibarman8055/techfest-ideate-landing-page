import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Eyebrow, Reveal, ScrubText } from "./ui/Text";
import { TIMELINE, VOICES } from "../data/content";

/** Vitruvian circle + square + spiral that draws itself as the story is read. */
function Vitruvian({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const p = (a: number, b: number) => useTransform(progress, [a, b], [0, 1]);
  const p1 = p(0, 0.35);
  const p2 = p(0.15, 0.55);
  const p3 = p(0.3, 0.75);
  const p4 = p(0.5, 1);
  const rot = useTransform(progress, [0, 1], [-20, 40]);
  const spiral = (() => {
    const b = Math.log((1 + Math.sqrt(5)) / 2) / (Math.PI / 2);
    let d = "";
    for (let t = 0; t < 11; t += 0.08) {
      const r = 3 * Math.exp(b * t);
      d += `${d ? "L" : "M"}${(200 + Math.cos(t) * r).toFixed(1)} ${(200 + Math.sin(t) * r).toFixed(1)}`;
    }
    return d;
  })();

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" fill="none" aria-hidden>
      <motion.circle cx="200" cy="200" r="178" stroke="#06070d" strokeWidth="1.3" style={{ pathLength: p1 }} />
      <motion.rect x="82" y="82" width="236" height="236" stroke="#06070d" strokeWidth="1.3" style={{ pathLength: p2 }} />
      <motion.g style={{ rotate: rot, originX: "200px", originY: "200px" }}>
        <motion.rect x="82" y="82" width="236" height="236" stroke="#9b6f12" strokeWidth="1" style={{ pathLength: p3 }} />
      </motion.g>
      <motion.path d="M200 22L318 318H82Z" stroke="#06070d" strokeOpacity=".5" style={{ pathLength: p3 }} />
      <motion.path d="M22 200H378M200 22V378" stroke="#06070d" strokeOpacity=".3" style={{ pathLength: p2 }} />
      <motion.path d={spiral} stroke="#9b6f12" strokeWidth="2" strokeLinecap="round" style={{ pathLength: p4 }} />
      <circle cx="200" cy="200" r="4" fill="#9b6f12" />
    </svg>
  );
}

export function About() {
  const wrap = useRef<HTMLDivElement>(null);
  const tl = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 70%", "end 60%"] });
  const sp = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const { scrollYProgress: tlP } = useScroll({ target: tl, offset: ["start 70%", "end 65%"] });
  const line = useSpring(tlP, { stiffness: 90, damping: 30 });

  return (
    <section
      id="about"
      className="relative -mt-0 rounded-t-[2.5rem] bg-parchment pb-28 pt-28 text-ink md:rounded-t-[5rem] md:pb-40 md:pt-44"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <Eyebrow n="01" light>
            The Idea
          </Eyebrow>
        </Reveal>

        <ScrubText
          className="mt-10 max-w-6xl font-serif text-[clamp(2rem,5.2vw,4.9rem)] font-medium leading-[1.04] tracking-tight"
          text="Since 1998, the students of IIT Bombay have turned three days of December into *Asia's* *largest* science and technology festival. For its *thirtieth* edition, Techfest returns to an old question: what happens when *heritage* meets *futuristic* *technology?*"
        />

        <div ref={wrap} className="mt-24 grid gap-14 md:mt-32 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div className="md:sticky md:top-28 md:self-start">
            <div className="mx-auto aspect-square w-full max-w-md">
              <Vitruvian progress={sp} />
            </div>
            <p className="mx-auto mt-6 max-w-md text-center font-serif text-lg italic text-ink/60">
              Fig. XXX — circle and square: the proportion of an idea, thirty editions in the making.
            </p>
          </div>

          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold leading-tight md:text-4xl">
                Thirty editions. <span className="font-serif font-medium italic text-[#9b6f12]">One restless idea.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70">
                Techfest is organised by the student community of IIT Bombay — a non-profit, under the patronage of UNESCO and UNICEF — and welcomes students, makers, researchers and curious minds from across the globe.
              </p>
            </Reveal>

            <ol ref={tl} className="relative mt-14 space-y-10 pl-8 md:pl-12">
              <span aria-hidden className="absolute bottom-0 left-[5px] top-2 w-px bg-ink/15 md:left-[7px]" />
              <motion.span
                aria-hidden
                style={{ scaleY: line }}
                className="absolute bottom-0 left-[5px] top-2 w-px origin-top bg-[#9b6f12] md:left-[7px]"
              />
              {TIMELINE.map((t, i) => (
                <li key={t.year} className="relative">
                  <span className="absolute -left-8 top-3 h-[11px] w-[11px] rounded-full border border-[#9b6f12] bg-parchment md:-left-12 md:h-[15px] md:w-[15px]" aria-hidden />
                  <Reveal delay={0.05 * i} y={30}>
                    <p className="font-display text-4xl font-semibold tracking-tight md:text-6xl">{t.year}</p>
                    <p className="mt-2 font-serif text-2xl font-semibold italic text-[#9b6f12] md:text-3xl">{t.title}</p>
                    <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-ink/70">{t.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* voices */}
        <div className="mt-28 border-t border-ink/15 pt-12 md:mt-40">
          <Reveal>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-ink/60">Voices that have taken the Techfest stage</p>
          </Reveal>
          <ul className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-3 md:gap-x-10">
            {VOICES.map((v, i) => (
              <motion.li
                key={v}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.8 }}
                className="group flex items-baseline gap-6 md:gap-10"
              >
                <span
                  data-cursor="✦"
                  className="font-serif text-[clamp(1.8rem,4.2vw,3.8rem)] italic leading-tight text-ink/80 transition-all duration-500 hover:-translate-y-1 hover:text-[#9b6f12]"
                >
                  {v}
                </span>
                {i < VOICES.length - 1 && <span className="text-xl text-[#9b6f12]">✦</span>}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
