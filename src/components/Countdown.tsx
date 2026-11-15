import { useCountdown } from "../hooks/useCountdown";
import { FEST } from "../data/content";

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const t = useCountdown(FEST.start, FEST.end);

  if (t.state !== "upcoming") {
    return (
      <div className={className}>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-gold">
          {t.state === "live" ? "● The festival is live now" : "Thank you for thirty editions"}
        </p>
      </div>
    );
  }

  const cells = [
    ["Days", t.d],
    ["Hrs", t.h],
    ["Min", t.m],
    ["Sec", t.s],
  ] as const;

  return (
    <div className={className} role="timer" aria-label={`Countdown to ${FEST.dates}`}>
      <div className={`flex items-end ${size === "lg" ? "gap-3 md:gap-10" : "gap-2 md:gap-5"}`}>
        {cells.map(([label, v], i) => (
          <div key={label} className={`flex items-end ${size === "lg" ? "gap-3 md:gap-10" : "gap-2 md:gap-5"}`}>
            <div>
              <div
                className={`font-display font-semibold tabular-nums leading-none text-parchment ${
                  size === "lg" ? "text-3xl sm:text-4xl md:text-7xl" : "text-xl sm:text-2xl md:text-4xl"
                }`}
              >
                {pad(v)}
              </div>
              <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-gold/80">{label}</div>
            </div>
            {i < 3 && <span className={`pb-5 font-serif italic text-gold/60 ${size === "lg" ? "text-4xl md:pb-8" : "text-2xl"}`}>:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
