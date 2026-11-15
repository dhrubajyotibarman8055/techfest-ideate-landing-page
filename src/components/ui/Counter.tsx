import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 2.4,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(to);
      return;
    }
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} aria-label={`${prefix}${to.toLocaleString("en-US")}${suffix}`}>
      <span aria-hidden>
        {prefix}
        {v.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  );
}
