import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Astrolabe } from "./Astrolabe";
import { Countdown } from "./Countdown";
import { Button } from "./ui/Button";
import { Reveal, SplitHeading } from "./ui/Text";
import { FEST, SITE } from "../data/content";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 1.15]);

  return (
    <section
      id="join"
      ref={ref}
      className="relative isolate -mt-10 overflow-hidden rounded-t-[2.5rem] bg-ink-2 pb-28 pt-28 text-center md:-mt-20 md:rounded-t-[5rem] md:pb-40 md:pt-44"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(60% 55% at 50% 55%, rgba(139,124,255,.28), transparent 70%), radial-gradient(40% 40% at 20% 20%, rgba(255,138,168,.15), transparent 70%)" }}
      />
      <motion.div aria-hidden style={{ rotate, scale }} className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[150vmin] w-[150vmin] -translate-x-1/2 -translate-y-1/2 opacity-45">
        <Astrolabe className="h-full w-full" />
      </motion.div>

      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <Reveal>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-gold">06 — {FEST.dates} · IIT Bombay</p>
        </Reveal>

        <h2 className="mt-8 font-display text-[clamp(2.6rem,9vw,9rem)] font-bold leading-[0.95] tracking-[-0.04em]">
          <SplitHeading text="Be there for" />
          <br />
          <SplitHeading text="the *thirtieth.*" delay={0.2} emphClass="font-serif italic font-medium text-gradient-aether tracking-normal" />
        </h2>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-parchment/70 md:text-lg">
            Compete, learn, build, watch, wonder. Register for competitions and workshops on the official Techfest website — and step into{" "}
            <span className="font-serif text-xl italic text-gold-2">{FEST.theme}.</span>
          </p>
        </Reveal>

        <Reveal delay={0.4} className="mt-12 flex flex-wrap justify-center gap-4">
          <Button href={SITE} cursor="Register">
            Register on techfest.org
          </Button>
          <Button href={`${SITE}/workshops`} variant="outline" cursor="Learn">
            Browse workshops
          </Button>
        </Reveal>

        <Reveal delay={0.5} className="mt-16 flex justify-center">
          <Countdown size="lg" />
        </Reveal>
      </div>
    </section>
  );
}
