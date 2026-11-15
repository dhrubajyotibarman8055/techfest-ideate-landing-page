import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.35 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.35 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const withLabel = t?.closest?.("[data-cursor]");
      setLabel(withLabel ? withLabel.getAttribute("data-cursor") : null);
      setHover(!!t?.closest?.("a,button,[role=button],[data-cursor]"));
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  const big = !!label;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[120] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-gold-2 mix-blend-difference"
      />
      <motion.div
        aria-hidden
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[119]"
      >
        <motion.div
          animate={{ scale: big ? 1 : hover ? 1.6 : 1, backgroundColor: big ? "rgba(217,178,95,1)" : "rgba(217,178,95,0)" }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="-ml-[26px] -mt-[26px] grid h-[52px] w-[52px] place-items-center rounded-full border border-gold/70"
          style={{ width: big ? 84 : 52, height: big ? 84 : 52, marginLeft: big ? -42 : -26, marginTop: big ? -42 : -26 }}
        >
          {big && <span className="font-mono text-[0.6rem] uppercase tracking-widest text-ink">{label}</span>}
        </motion.div>
      </motion.div>
    </>
  );
}
