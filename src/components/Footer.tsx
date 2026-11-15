import { ArrowUp, ArrowUpRight, MapPin } from "lucide-react";
import { LogoMark } from "./Logo";
import { FEST, NAV, SITE, SOCIALS } from "../data/content";
import { scrollToTarget } from "../lib/scroll";

const OFFICIAL = [
  { label: "techfest.org", href: SITE },
  { label: "Competitions", href: `${SITE}/competitions` },
  { label: "Workshops", href: `${SITE}/workshops` },
];

export function Footer() {
  return (
    <footer className="relative -mt-10 overflow-hidden rounded-t-[2.5rem] bg-ink pt-20 md:-mt-20 md:rounded-t-[5rem] md:pt-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-11 w-11" />
              <span className="font-display text-lg font-semibold tracking-[0.12em]">TECHFEST</span>
            </div>
            <p className="mt-6 max-w-xs font-serif text-2xl italic leading-snug text-gradient-aether">{FEST.theme}</p>
            <p className="mt-3 text-sm text-parchment/60">
              The {FEST.edition} edition · {FEST.dates}
            </p>
            <p className="mt-6 flex items-start gap-2 text-sm text-parchment/60">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>
                IIT Bombay, Powai,
                <br />
                Mumbai 400076, Maharashtra, India
              </span>
            </p>
          </div>

          <FooterCol title="Explore">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget(`#${n.id}`);
                  }}
                  className="inline-block transition-all hover:translate-x-1 hover:text-gold"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Official">
            {OFFICIAL.map((n) => (
              <li key={n.href}>
                <a href={n.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-gold">
                  {n.label} <ArrowUpRight size={13} />
                </a>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Connect">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-gold">
                  {s.label} <ArrowUpRight size={13} />
                </a>
              </li>
            ))}
          </FooterCol>
        </div>

        <div
          aria-hidden
          className="mt-20 select-none whitespace-nowrap text-center font-display font-bold leading-none tracking-[-0.05em]"
          style={{ fontSize: "min(15.5vw, 15rem)", color: "transparent", WebkitTextStroke: "1px rgba(217,178,95,0.4)" }}
        >
          TECHFEST
        </div>

        <div className="flex flex-col items-start justify-between gap-5 border-t border-parchment/10 py-8 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-parchment/45 md:flex-row md:items-center">
          <p className="max-w-xl leading-relaxed">
            An independent creative concept for Techfest, IIT Bombay. All facts and registrations belong to the official site —{" "}
            <a href={SITE} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
              techfest.org
            </a>
            .
          </p>
          <button
            onClick={() => scrollToTarget(0)}
            data-cursor="Top"
            className="flex items-center gap-2 rounded-full border border-parchment/20 px-4 py-2 text-parchment/70 transition-colors hover:border-gold hover:text-gold"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-gold">{title}</p>
      <ul className="mt-5 space-y-3 text-sm text-parchment/70">{children}</ul>
    </div>
  );
}
