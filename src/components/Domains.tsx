import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DomainArt } from "./DomainArt";
import { Eyebrow, Reveal, SplitHeading } from "./ui/Text";
import { DOMAINS } from "../data/content";

export function Domains() {
  const [active, setActive] = useState(0);
  const d = DOMAINS[active];

  return (
    <section id="domains" className="blueprint relative -mt-10 overflow-hidden rounded-t-[2.5rem] bg-ink pb-28 pt-28 md:-mt-20 md:rounded-t-[5rem] md:pb-40 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-rose/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <Eyebrow n="03">Instruments of the new renaissance</Eyebrow>
        </Reveal>
        <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5.4vw,5rem)] font-semibold leading-[1.02] tracking-tight">
          <SplitHeading text="Six domains where *ideas* become machines." />
        </h2>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-[1.05fr_1fr] md:gap-16">
          {/* list */}
          <ul role="tablist" aria-label="Domains" className="border-t border-parchment/10">
            {DOMAINS.map((x, i) => {
              const on = i === active;
              return (
                <li key={x.key} className="border-b border-parchment/10">
                  <button
                    role="tab"
                    aria-selected={on}
                    aria-controls="domain-panel"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    data-cursor="View"
                    className="group flex w-full items-center gap-4 py-5 text-left md:gap-6 md:py-6"
                  >
                    <span className={`font-mono text-xs transition-colors ${on ? "text-gold" : "text-parchment/40"}`}>{x.n}</span>
                    <span
                      className={`flex-1 transition-all duration-500 ${
                        on
                          ? "translate-x-3 font-serif text-[clamp(2rem,4.4vw,3.8rem)] italic text-gold-2"
                          : "font-display text-[clamp(1.4rem,3.2vw,2.6rem)] font-semibold text-parchment/45 group-hover:text-parchment"
                      } leading-none`}
                    >
                      {x.title}
                    </span>
                    <span className={`h-px transition-all duration-500 ${on ? "w-10 bg-gold md:w-20" : "w-4 bg-parchment/20"}`} />
                  </button>

                  {/* mobile inline art + text */}
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden md:hidden"
                      >
                        <div className="pb-6">
                          <DomainArt k={x.key} className="mx-auto h-64 w-64" />
                          <p className="mt-2 text-sm leading-relaxed text-parchment/70">{x.text}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* panel (desktop) */}
          <div id="domain-panel" role="tabpanel" className="relative hidden md:block">
            <div className="sticky top-28">
              <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-parchment/10 bg-ink-2/80 p-8">
                <span className="absolute left-6 top-6 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-gold">Fig. {d.n}</span>
                <span className="absolute right-6 top-6 font-serif text-lg italic text-parchment/50">{d.line}</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={d.key}
                    initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full pt-6"
                  >
                    <DomainArt k={d.key} className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={d.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6"
                >
                  <p className="max-w-md text-base leading-relaxed text-parchment/75">{d.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {d.tags.map((t) => (
                      <span key={t} className="rounded-full border border-gold/40 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
