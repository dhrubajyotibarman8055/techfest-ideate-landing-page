import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Counter } from "./ui/Counter";
import { Eyebrow, Reveal, SplitHeading } from "./ui/Text";

function useOn() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return { ref, on };
}

function Dots({ count, cols, tone, step = 4 }: { count: number; cols: number; tone: string; step?: number }) {
  const { ref, on } = useOn();
  return (
    <div ref={ref} aria-hidden className="grid gap-[5px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`aspect-square rounded-full transition-all duration-700 ${tone}`}
          style={{ transitionDelay: `${i * step}ms`, opacity: on ? 1 : 0.1, transform: on ? "scale(1)" : "scale(0.3)" }}
        />
      ))}
    </div>
  );
}

function Bar({ w, className, delay = 0 }: { w: number; className: string; delay?: number }) {
  const { ref, on } = useOn();
  return (
    <div ref={ref} className="h-2.5 overflow-hidden rounded-full bg-current/10">
      <motion.div
        className={`h-full rounded-full ${className}`}
        initial={{ width: 0 }}
        animate={{ width: on ? `${w}%` : 0 }}
        transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function Card({ className = "", dark = false, children }: { className?: string; dark?: boolean; children: ReactNode }) {
  return (
    <Reveal className={`${className}`}>
      <div
        className={`relative h-full overflow-hidden rounded-[1.75rem] p-6 md:rounded-[2.25rem] md:p-9 ${
          dark ? "bg-ink text-parchment" : "border border-ink/25 text-ink"
        }`}
      >
        {children}
      </div>
    </Reveal>
  );
}

const Label = ({ children, dark }: { children: ReactNode; dark?: boolean }) => (
  <p className={`font-mono text-[0.66rem] uppercase tracking-[0.24em] ${dark ? "text-gold" : "text-ink/65"}`}>{children}</p>
);
const Big = ({ children, dark, size = "lg" }: { children: ReactNode; dark?: boolean; size?: "lg" | "xl" }) => (
  <p
    className={`mt-4 font-display font-semibold leading-none tracking-tight ${dark ? "text-gold-2" : "text-ink"} ${
      size === "xl" ? "text-[clamp(2.6rem,7.4vw,7rem)]" : "text-[clamp(2.4rem,4.6vw,4.4rem)]"
    }`}
  >
    {children}
  </p>
);

export function Stats() {
  return (
    <section id="numbers" className="relative -mt-10 rounded-t-[2.5rem] bg-gold pb-24 pt-24 text-ink md:-mt-20 md:rounded-t-[5rem] md:pb-36 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <Eyebrow n="04" light>
            Scale, in numbers
          </Eyebrow>
        </Reveal>
        <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5.4vw,5rem)] font-semibold leading-[1.02] tracking-tight">
          <SplitHeading text="Asia's largest, *measured.*" emphClass="font-serif italic font-semibold text-ink/60" />
        </h2>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-6 md:gap-5">
          <Card dark className="md:col-span-4">
            <Label dark>Footfall</Label>
            <Big dark size="xl">
              <Counter to={180000} suffix="+" />
            </Big>
            <p className="mt-3 max-w-sm text-sm text-parchment/65">people across three days on the IIT Bombay campus.</p>
            <div className="mt-8">
              <Dots count={180} cols={30} tone="bg-gold" step={6} />
              <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-parchment/45">● ≈ 1,000 visitors</p>
            </div>
          </Card>

          <Card className="md:col-span-2">
            <Label>Editions</Label>
            <Big>
              <Counter to={30} duration={1.8} />
            </Big>
            <p className="mt-3 text-sm text-ink/70">editions since 1998 — and counting.</p>
            <div className="mt-8">
              <Dots count={30} cols={10} tone="bg-ink" step={40} />
            </div>
          </Card>

          <Card className="md:col-span-3">
            <Label>Outreach</Label>
            <div className="mt-5 space-y-7">
              <div>
                <div className="flex items-end justify-between gap-4">
                  <p className="font-display text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-none">
                    <Counter to={2500} suffix="+" />
                  </p>
                  <p className="text-right text-sm text-ink/70">Indian colleges</p>
                </div>
                <div className="mt-3 text-ink">
                  <Bar w={100} className="bg-ink" />
                </div>
              </div>
              <div>
                <div className="flex items-end justify-between gap-4">
                  <p className="font-display text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-none">
                    <Counter to={500} suffix="+" />
                  </p>
                  <p className="text-right text-sm text-ink/70">international institutions</p>
                </div>
                <div className="mt-3 text-ink">
                  <Bar w={20} className="bg-[#7a3bff]" delay={0.2} />
                </div>
              </div>
            </div>
          </Card>

          <Card dark className="md:col-span-3">
            <Label dark>Competitions · 2025 edition</Label>
            <div className="mt-4 flex items-end gap-8">
              <div>
                <Big dark>
                  <Counter to={35000} suffix="+" />
                </Big>
                <p className="mt-3 text-sm text-parchment/65">participants</p>
              </div>
              <div>
                <p className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-semibold leading-none text-parchment">
                  <Counter to={20} suffix="+" />
                </p>
                <p className="mt-3 text-sm text-parchment/65">countries</p>
              </div>
            </div>
            <div className="mt-8 max-w-xs">
              <Dots count={20} cols={10} tone="bg-rose" step={60} />
            </div>
          </Card>

          <Card dark className="md:col-span-3">
            <Label dark>Prize pool · 2026</Label>
            <Big dark>
              ₹<Counter to={1} suffix=" crore+" duration={1.2} />
            </Big>
            <p className="mt-3 max-w-xs text-sm text-parchment/65">across robotics challenges, hackathons and case competitions — free to register.</p>
            <div className="mt-6 flex items-end gap-2" aria-hidden>
              {[28, 44, 62, 80, 100].map((h, i) => (
                <motion.span
                  key={h}
                  initial={{ height: 0 }}
                  whileInView={{ height: h * 0.7 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="w-8 rounded-t-md bg-gradient-to-t from-gold to-gold-2"
                />
              ))}
            </div>
          </Card>

          <Card className="md:col-span-3">
            <Label>Workshops</Label>
            <Big>
              <Counter to={25} suffix="+" duration={1.8} />
            </Big>
            <p className="mt-3 max-w-xs text-sm text-ink/70">in-demand domains — hands-on, with industry experts and IIT Bombay certification.</p>
            <div className="mt-6 max-w-[16rem]">
              <Dots count={25} cols={5} tone="bg-ink" step={50} />
            </div>
          </Card>
        </div>

        <p className="mt-8 max-w-2xl font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.18em] text-ink/60">
          Figures as published by Techfest, IIT Bombay and in coverage of the 29th–30th editions. Verify the latest on techfest.org.
        </p>
      </div>
    </section>
  );
}
