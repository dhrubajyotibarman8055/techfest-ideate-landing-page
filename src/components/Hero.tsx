import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Astrolabe } from "./Astrolabe";
import { AetherCanvas } from "./AetherCanvas";
import { Countdown } from "./Countdown";
import { Button } from "./ui/Button";
import { FEST, SITE } from "../data/content";

const WORD = "TECHFEST".split("");
const EASE = [0.16, 1, 0.3, 1] as const;

function RollLetter({ ch, i, active, ready, onHover }: { ch: string; i: number; active: boolean; ready: boolean; onHover: (i: number | null) => void }) {
  return (
    <span
      aria-hidden
      onPointerEnter={() => onHover(i)}
      onPointerLeave={() => onHover(null)}
      data-cursor="Flip"
      className="relative inline-block overflow-hidden"
      style={{ height: "1.12em", lineHeight: 1.12 }}
    >
      <motion.span
        className="block"
        initial={{ y: "120%" }}
        animate={{ y: ready ? 0 : "120%" }}
        transition={{ duration: 1.3, delay: 0.15 + i * 0.07, ease: EASE }}
      >
        <span
          className="block transition-transform duration-[650ms] ease-[var(--ease-out-expo)]"
          style={{ transform: active ? "translateY(-100%)" : "none" }}
        >
          <span className="block h-[1.12em]">{ch}</span>
          <span className="flex h-[1.12em] scale-[1.18] items-center justify-center font-serif font-medium italic text-gold-2">
            {ch.toLowerCase()}
          </span>
        </span>
      </motion.span>
    </span>
  );
}

function Seal() {
  const text = "30TH EDITION ✦ 16–18 DECEMBER 2026 ✦ IIT BOMBAY ✦ ";
  return (
    <div className="relative grid h-28 w-28 shrink-0 place-items-center md:h-40 md:w-40" aria-hidden>
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" style={{ animationDuration: "30s" }}>
        <defs>
          <path id="seal" d="M100 100m-82 0a82 82 0 1 1 164 0a82 82 0 1 1-164 0" />
        </defs>
        <text fontFamily="JetBrains Mono, monospace" fontSize="11.5" letterSpacing="3.1" fill="#d9b25f">
          <textPath href="#seal">{text}</textPath>
        </text>
      </svg>
      <div className="grid h-[58%] w-[58%] place-items-center rounded-full border border-gold/50 bg-ink/40 backdrop-blur-sm">
        <span className="font-serif text-3xl italic text-gold-2 md:text-5xl">XXX</span>
      </div>
    </div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [wave, setWave] = useState<number | null>(null);

  // idle "ripple" so the wordmark feels alive without a pointer (and on touch)
  useEffect(() => {
    if (!ready) return;
    const timers: number[] = [];
    const run = () => {
      WORD.forEach((_, i) => {
        timers.push(window.setTimeout(() => setWave(i), i * 110));
      });
      timers.push(window.setTimeout(() => setWave(null), WORD.length * 110 + 500));
    };
    const first = window.setTimeout(run, 2600);
    const loop = window.setInterval(run, 7000);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(first);
      clearInterval(loop);
    };
  }, [ready]);

  // pointer parallax + scroll parallax for the astrolabe
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  useEffect(() => {
    const move = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * -40);
      my.set((e.clientY / window.innerHeight - 0.5) * -40);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.45]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const fadeUp = (d: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 1.1, delay: d, ease: EASE },
  });

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      {/* atmospheric glows */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 25%, rgba(139,124,255,.22), transparent 70%), radial-gradient(50% 45% at 15% 85%, rgba(255,138,168,.14), transparent 70%), radial-gradient(40% 40% at 50% 50%, rgba(217,178,95,.12), transparent 70%)",
        }}
      />
      <div className="blueprint absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_45%,#000,transparent)]" aria-hidden />

      <AetherCanvas className="absolute inset-0 -z-10 h-full w-full" />

      <motion.div
        aria-hidden
        style={{ x: sx, y: sy, opacity: fade }}
        className="pointer-events-none absolute inset-0 -z-10 grid place-items-center"
      >
        <motion.div style={{ scale, rotate }} className="h-[132vmin] w-[132vmin] max-w-none md:h-[150vmin] md:w-[150vmin]">
          <Astrolabe ready={ready} className="h-full w-full" />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 flex flex-1 flex-col px-5 pb-6 pt-28 md:px-10 md:pt-32">
        {/* eyebrow */}
        <motion.div
          {...fadeUp(0.1)}
          className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.28em] text-gold md:text-[0.7rem]"
        >
          <span>IIT Bombay presents</span>
          <span className="hidden items-center gap-3 sm:flex">
            <span className="h-px w-10 bg-gold/50" />
            Asia's largest science &amp; technology festival
          </span>
        </motion.div>

        {/* wordmark */}
        <div className="flex flex-1 items-center justify-center py-6">
          <h1
            aria-label="Techfest"
            className="select-none whitespace-nowrap font-display font-bold leading-none tracking-[-0.05em] text-parchment"
            style={{ fontSize: "min(12.4vw, 18rem)" }}
          >
            {WORD.map((ch, i) => (
              <RollLetter key={i} ch={ch} i={i} ready={ready} active={hover === i || wave === i} onHover={setHover} />
            ))}
          </h1>
        </div>

        {/* theme + CTAs */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <motion.p
              {...fadeUp(1.0)}
              className="font-serif text-[clamp(2.4rem,6.2vw,5.6rem)] italic leading-[0.95] text-gradient-aether"
            >
              {FEST.theme}
            </motion.p>
            <motion.p {...fadeUp(1.15)} className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-parchment/70 md:text-base">
              Where heritage meets futuristic technology. Three days at IIT Bombay as Asia's largest science and technology festival turns thirty.
            </motion.p>
            <motion.div {...fadeUp(1.3)} className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#events" cursor="Explore">
                Explore the festival
              </Button>
              <Button href={SITE} variant="outline" cursor="Register">
                Register · techfest.org
              </Button>
            </motion.div>
          </div>
          <motion.div {...fadeUp(1.2)} className="flex items-end justify-between gap-4 md:flex-col md:items-end md:gap-6">
            <Seal />
            <Countdown />
          </motion.div>
        </div>

        {/* bottom bar + scroll indicator */}
        <motion.div
          {...fadeUp(1.5)}
          className="mt-10 flex items-center justify-between border-t border-parchment/10 pt-5 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-parchment/50"
        >
          <span>{FEST.dates}</span>
          <span className="flex items-center gap-3">
            Scroll
            <span className="relative block h-10 w-px overflow-hidden bg-parchment/20" aria-hidden>
              <span className="absolute inset-x-0 top-0 h-1/3 bg-gold" style={{ animation: "scroll-dot 1.8s var(--ease-out-expo) infinite" }} />
            </span>
          </span>
          <span className="hidden sm:inline">Powai · Mumbai</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
