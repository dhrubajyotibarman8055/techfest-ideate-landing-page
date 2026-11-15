import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { scrollToTarget } from "../../lib/scroll";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "outline" | "ink";
  className?: string;
  cursor?: string;
};

const styles = {
  gold: "bg-gold text-ink",
  outline: "border border-parchment/30 text-parchment",
  ink: "bg-ink text-parchment",
};
const fills = {
  gold: "bg-parchment",
  outline: "bg-gold",
  ink: "bg-gold",
};
const hoverText = {
  gold: "group-hover:text-ink",
  outline: "group-hover:text-ink",
  ink: "group-hover:text-ink",
};

export function Button({ href, children, variant = "gold", className = "", cursor }: Props) {
  const internal = href.startsWith("#");
  const onClick = (e: React.MouseEvent) => {
    if (internal) {
      e.preventDefault();
      scrollToTarget(href);
    }
  };
  return (
    <Magnetic>
      <a
        href={href}
        onClick={onClick}
        data-cursor={cursor ?? (internal ? "Go" : "Open")}
        {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 font-mono text-[0.72rem] uppercase tracking-[0.18em] ${styles[variant]} ${className}`}
      >
        <span
          aria-hidden
          className={`absolute inset-0 translate-y-full rounded-[inherit] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 ${fills[variant]}`}
        />
        <span className={`relative z-10 transition-colors duration-300 ${hoverText[variant]}`}>{children}</span>
        <ArrowUpRight
          size={16}
          className={`relative z-10 transition-all duration-300 group-hover:rotate-45 ${hoverText[variant]}`}
        />
      </a>
    </Magnetic>
  );
}
