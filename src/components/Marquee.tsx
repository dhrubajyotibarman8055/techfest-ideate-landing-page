import { TICKER } from "../data/content";

function Strip({ reverse = false, tone }: { reverse?: boolean; tone: "gold" | "ink" }) {
  const items = [...TICKER, ...TICKER];
  const color = tone === "gold" ? "bg-gold text-ink" : "bg-ink text-gold border-y border-gold/40";
  return (
    <div className={`overflow-hidden py-3 md:py-4 ${color}`}>
      <div
        className="marquee-track flex w-max items-center whitespace-nowrap"
        style={{ animation: `marquee ${reverse ? 60 : 48}s linear infinite ${reverse ? "reverse" : ""}` }}
      >
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center" aria-hidden={k === 1}>
            {items.map((t, i) => (
              <span key={i} className="flex items-center">
                <span
                  className={`px-6 font-display text-lg font-semibold uppercase tracking-tight md:px-10 md:text-3xl ${
                    i % 2 ? "font-serif font-medium normal-case italic tracking-normal" : ""
                  }`}
                >
                  {t}
                </span>
                <span className="text-xl md:text-3xl">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two crossing strips — a dynamic seam between hero and story. */
export function MarqueeCross() {
  return (
    <div className="relative z-20 -mb-10 -mt-14 h-[9.5rem] overflow-hidden md:-mt-20 md:h-[13rem]" aria-label="Disciplines at Techfest">
      <div className="absolute inset-x-[-5%] top-8 -rotate-[2.5deg] md:top-12">
        <Strip tone="gold" />
      </div>
      <div className="absolute inset-x-[-5%] top-12 rotate-[2deg] md:top-[4.6rem]">
        <Strip tone="ink" reverse />
      </div>
    </div>
  );
}
