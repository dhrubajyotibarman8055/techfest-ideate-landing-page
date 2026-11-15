import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { EventGlyph } from "./EventGlyphs";
import { Eyebrow, SplitHeading } from "./ui/Text";
import { Button } from "./ui/Button";
import { EVENTS, SITE, type EventItem } from "../data/content";
import { gsap, ScrollTrigger } from "../lib/scroll";

function Card({ e }: { e: EventItem }) {
  const onMove = (ev: React.PointerEvent<HTMLAnchorElement>) => {
    const r = ev.currentTarget.getBoundingClientRect();
    ev.currentTarget.style.setProperty("--mx", `${ev.clientX - r.left}px`);
    ev.currentTarget.style.setProperty("--my", `${ev.clientY - r.top}px`);
  };
  return (
    <a
      href={e.href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={onMove}
      data-cursor="Details"
      aria-label={`${e.title} — details on techfest.org`}
      className="group relative flex h-[32rem] w-[80vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[2rem] border border-parchment/10 bg-ink/60 p-7 backdrop-blur-sm transition-all duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-3 hover:border-gold/60 sm:w-[26rem] md:h-[min(35rem,74vh)] md:w-[26rem]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,0%), rgba(217,178,95,.2), transparent 60%)" }}
      />
      <div className="relative flex items-start justify-between">
        <span className="font-serif text-6xl italic leading-none text-gold md:text-7xl">{e.numeral}</span>
        <span className="rounded-full border border-parchment/20 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-parchment/70">
          {e.tag}
        </span>
      </div>

      <EventGlyph k={e.key} className="relative -my-2 h-28 w-28 self-center transition-transform duration-700 group-hover:scale-110 md:h-32 md:w-32" />

      <div className="relative">
        <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-parchment md:text-xl">{e.title}</h3>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-parchment/65">{e.text}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-gold">
          Details <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </a>
  );
}

export function Events() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const dist = () => Math.max(0, track.current!.scrollWidth - window.innerWidth);
      const tween = gsap.to(track.current, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return (
    <section ref={section} id="events" className="relative overflow-hidden bg-ink-2 py-20 md:flex md:h-screen md:items-center md:py-0">
      <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-40" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-aether/10 blur-[120px]" />

      <div
        className="relative w-full overflow-x-auto [scrollbar-width:none] md:overflow-visible [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: undefined }}
      >
        <div ref={track} className="flex w-max items-center gap-5 px-5 will-change-transform md:gap-8 md:px-10">
          {/* intro panel */}
          <div className="w-[84vw] shrink-0 pr-4 md:w-[38rem] md:pr-16">
            <Eyebrow n="02">Codex of Competitions</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-[1.02] tracking-tight text-parchment">
              <SplitHeading text="Nine plates. Hundreds of *challenges.*" />
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-parchment/70">
              Robots battle, drones race, code is written against the clock. Compete for a prize pool exceeding <span className="text-gold-2">₹1 crore</span> —
              competition registration is free.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-parchment/60">
              {["Hackathons", "Case competitions", "Exhibitions", "Ozone"].map((t) => (
                <span key={t} className="rounded-full border border-parchment/15 px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-10 hidden items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.25em] text-gold md:flex">
              Keep scrolling <span className="inline-block h-px w-16 bg-gold/60" /> →
            </p>
            <p className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-gold md:hidden">Swipe → </p>
          </div>

          {EVENTS.map((e) => (
            <Card key={e.key} e={e} />
          ))}

          {/* outro */}
          <div className="relative flex h-[32rem] w-[80vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] bg-gold p-8 text-ink sm:w-[26rem] md:h-[min(35rem,74vh)]">
            <span aria-hidden className="absolute -right-10 -top-10 h-56 w-56 rounded-full border border-ink/20" />
            <span aria-hidden className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-ink/15" />
            <p className="relative font-mono text-[0.68rem] uppercase tracking-[0.25em]">The full programme</p>
            <div className="relative">
              <p className="font-serif text-5xl italic leading-[0.95] md:text-6xl">Every arena, every rulebook.</p>
              <p className="mt-4 max-w-xs text-sm text-ink/75">Rules, prizes, zonals and deadlines live on the official site.</p>
              <div className="mt-7">
                <Button href={`${SITE}/competitions`} variant="ink" cursor="Open">
                  All competitions
                </Button>
              </div>
            </div>
          </div>
          <div className="w-2 shrink-0 md:w-10" aria-hidden />
        </div>
      </div>

      <div aria-hidden className="absolute inset-x-10 bottom-8 hidden h-px bg-parchment/10 md:block">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-gold" />
      </div>
    </section>
  );
}
