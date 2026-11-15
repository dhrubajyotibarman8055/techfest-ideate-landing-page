import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";

const LINES = ["Calibrating the astrolabe", "Gathering the aether", "Aligning heritage & horizon", "Opening the doors"];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const c = animate(0, 100, {
      duration: 2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(onDone, 250),
    });
    return () => c.stop();
  }, [onDone]);

  const R = 90;
  const C = 2 * Math.PI * R;

  return (
    <motion.div
      role="status"
      aria-label="Loading Techfest"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
      initial={{ y: 0 }}
      exit={{ y: "-100%", borderBottomLeftRadius: "50% 12%", borderBottomRightRadius: "50% 12%" }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative grid h-[260px] w-[260px] place-items-center">
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(217,178,95,.18)" strokeWidth="1" />
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="#d9b25f"
            strokeWidth="1.5"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - n / 100)}
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(217,178,95,.25)" strokeDasharray="2 6" className="spin-slow svg-box" />
        </svg>
        <span className="font-display text-5xl font-semibold tabular-nums text-parchment">{n}</span>
      </div>
      <p className="mt-10 h-5 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-gold">
        {LINES[Math.min(LINES.length - 1, Math.floor(n / 26))]}…
      </p>
      <p className="absolute bottom-8 font-serif text-lg italic text-parchment/50">Techfest · XXX · IIT Bombay</p>
    </motion.div>
  );
}
