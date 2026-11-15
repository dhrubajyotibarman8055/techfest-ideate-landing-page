import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "./Logo";
import { Magnetic } from "./ui/Magnetic";
import { FEST, NAV, SITE, SOCIALS } from "../data/content";
import { scrollToTarget, startScroll, stopScroll } from "../lib/scroll";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > 400);
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (open) stopScroll();
    else startScroll();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToTarget(`#${id}`), 120);
  };

  return (
    <>
      <a
        href="#about"
        className="fixed left-4 top-4 z-[150] -translate-y-24 rounded bg-gold px-4 py-2 font-mono text-xs text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        animate={{ y: hidden && !open ? "-110%" : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[110] transition-colors duration-500 ${
          scrolled && !open ? "bg-ink/70 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav aria-label="Primary" className="flex items-center justify-between px-5 py-4 md:px-10">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              scrollToTarget(0);
            }}
            className="flex items-center gap-3"
            aria-label="Techfest — back to top"
            data-cursor="Top"
          >
            <LogoMark />
            <span className="font-display text-sm font-semibold tracking-[0.12em] text-parchment">
              TECHFEST<span className="ml-2 hidden font-serif text-base font-medium italic tracking-normal text-gold sm:inline">XXX</span>
            </span>
          </a>

          <div className="flex items-center gap-3 md:gap-5">
            <Magnetic className="max-sm:!hidden">
              <a
                href={SITE}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Register"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink"
              >
                <span className="absolute inset-0 translate-y-full bg-parchment transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0" aria-hidden />
                <span className="relative">Register</span>
                <ArrowUpRight size={14} className="relative" />
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Close menu" : "Open menu"}
              data-cursor={open ? "Close" : "Menu"}
              className="group flex items-center gap-3 rounded-full border border-parchment/25 py-2 pl-5 pr-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-parchment transition-colors hover:border-gold"
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span className="relative block h-3 w-5" aria-hidden>
                <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px bg-current transition-all duration-500 ${open ? "top-1.5 w-full -rotate-45" : "top-full w-3/5 group-hover:w-full"}`} />
              </span>
            </button>
          </div>
        </nav>
        <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-gradient-to-r from-gold via-rose to-aether" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="blueprint fixed inset-0 z-[105] overflow-y-auto bg-ink-2"
          >
            <div className="mx-auto grid min-h-full max-w-7xl gap-12 px-5 pb-10 pt-28 md:grid-cols-[1.6fr_1fr] md:px-10 md:pt-36">
              <ul className="flex flex-col justify-center">
                {NAV.map((l, i) => (
                  <li key={l.id} className="overflow-hidden border-b border-parchment/10">
                    <motion.a
                      href={`#${l.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(l.id);
                      }}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex items-baseline gap-5 py-3 md:py-4"
                      data-cursor="Go"
                    >
                      <span className="font-mono text-xs text-gold">{l.n}</span>
                      <span className="font-display text-[clamp(1.8rem,5.5vw,4rem)] font-semibold tracking-tight text-parchment transition-all duration-500 group-hover:translate-x-4 group-hover:font-serif group-hover:italic group-hover:text-gold-2">
                        {l.label}
                      </span>
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.9 }}
                className="flex flex-col justify-end gap-8 text-parchment/70"
              >
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-gold">The {FEST.edition} edition</p>
                  <p className="mt-3 font-serif text-3xl italic text-gradient-aether">{FEST.theme}</p>
                  <p className="mt-3 text-sm">{FEST.dates}<br />{FEST.venue}</p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest">
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                      {s.label}
                    </a>
                  ))}
                </div>
                <a
                  href={SITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink"
                >
                  Register on techfest.org <ArrowUpRight size={14} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
