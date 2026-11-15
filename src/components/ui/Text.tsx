import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade/slide-up wrapper triggered on viewport entry. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const emph = "font-serif italic font-medium text-gold";

function tokens(text: string) {
  return text.split(" ").map((w) => {
    const e = w.startsWith("*") && w.endsWith("*") && w.length > 2;
    return { w: e ? w.slice(1, -1) : w, e };
  });
}

/** Masked word-by-word heading reveal. Wrap a word in *asterisks* for serif-italic emphasis. */
export function SplitHeading({
  text,
  className = "",
  delay = 0,
  emphClass = emph,
}: {
  text: string;
  className?: string;
  delay?: number;
  emphClass?: string;
}) {
  return (
    <span className={className} aria-label={text.replace(/\*/g, "")}>
      {tokens(text).map(({ w, e }, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
          <motion.span
            className={`inline-block ${e ? emphClass : ""}`}
            initial={{ y: "115%", rotate: 4 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.1, delay: delay + i * 0.06, ease: EASE }}
          >
            {w}
          </motion.span>
          {"\u00A0"}
        </span>
      ))}
    </span>
  );
}

function ScrubWord({ w, e, p, range }: { w: string; e: boolean; p: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(p, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block ${e ? "font-serif italic font-semibold text-[#9b6f12]" : ""}`}>
      {w}
      {"\u00A0"}
    </motion.span>
  );
}

/** Words light up as the paragraph scrolls through the viewport. */
export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const toks = tokens(text);
  return (
    <p ref={ref} className={className}>
      {toks.map(({ w, e }, i) => {
        const s = i / toks.length;
        return <ScrubWord key={i} w={w} e={e} p={scrollYProgress} range={[s, Math.min(1, s + 1.5 / toks.length)]} />;
      })}
    </p>
  );
}

export function Eyebrow({ n, children, light = false }: { n: string; children: ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.28em] ${light ? "text-ink/70" : "text-gold"}`}>
      <span>{n}</span>
      <span className={`h-px w-12 ${light ? "bg-ink/40" : "bg-gold/50"}`} />
      <span>{children}</span>
    </div>
  );
}
