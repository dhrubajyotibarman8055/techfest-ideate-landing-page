import { useEffect, useState } from "react";

export type CountdownState = "upcoming" | "live" | "ended";

export function useCountdown(start: string, end: string) {
  const compute = () => {
    const now = Date.now();
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    const diff = Math.max(0, s - now);
    const state: CountdownState = now < s ? "upcoming" : now <= e ? "live" : "ended";
    return {
      state,
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(compute);
  useEffect(() => {
    const id = setInterval(() => setT(compute()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end]);
  return t;
}
