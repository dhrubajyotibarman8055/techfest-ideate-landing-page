import { useMemo } from "react";

const CX = 500;
const CY = 500;
const ROMAN = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

function ticksPath(r1: number, rLong: number, rShort: number, count: number, every: number) {
  let d = "";
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const r0 = i % every === 0 ? rLong : rShort;
    d += `M${CX + Math.sin(a) * r0} ${CY - Math.cos(a) * r0}L${CX + Math.sin(a) * r1} ${CY - Math.cos(a) * r1}`;
  }
  return d;
}

function spiralPath() {
  const b = Math.log((1 + Math.sqrt(5)) / 2) / (Math.PI / 2);
  let d = "";
  for (let t = 0; t < 14.4; t += 0.06) {
    const r = 4 * Math.exp(b * t);
    const x = CX + Math.cos(t) * r;
    const y = CY + Math.sin(t) * r;
    d += `${d ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

function polygon(n: number, r: number, rot = 0) {
  return (
    Array.from({ length: n }, (_, i) => {
      const a = rot + (i / n) * Math.PI * 2;
      return `${i ? "L" : "M"}${(CX + Math.sin(a) * r).toFixed(1)} ${(CY - Math.cos(a) * r).toFixed(1)}`;
    }).join("") + "Z"
  );
}

const circlePath = (r: number) => `M${CX - r} ${CY}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

/** Renaissance-instrument composition: astrolabe rings, Vitruvian circle & square, golden spiral. */
export function Astrolabe({ ready = true, className = "" }: { ready?: boolean; className?: string }) {
  const ticks = useMemo(() => ticksPath(480, 462, 472, 144, 6), []);
  const spiral = useMemo(spiralPath, []);
  const sq = useMemo(() => polygon(4, 330, Math.PI / 4), []);
  const star = useMemo(() => polygon(8, 330, 0), []);
  const tri = useMemo(() => polygon(3, 235, 0), []);
  const dr = (delay: number) =>
    ({
      pathLength: 1,
      strokeDasharray: 1,
      strokeDashoffset: ready ? undefined : 1,
      ["--d" as string]: `${delay}s`,
    }) as React.CSSProperties;
  const dc = ready ? "draw" : "";

  return (
    <svg viewBox="0 0 1000 1000" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="gSpiral" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0d48e" />
          <stop offset="0.55" stopColor="#ff8aa8" />
          <stop offset="1" stopColor="#8b7cff" />
        </linearGradient>
        <radialGradient id="gCore">
          <stop offset="0" stopColor="#f0d48e" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f0d48e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer ticks ring */}
      <g className="spin-slow svg-box" style={{ animationDuration: "260s" }}>
        <path d={ticks} stroke="#d9b25f" strokeOpacity="0.55" strokeWidth="1.2" />
      </g>
      <circle cx={CX} cy={CY} r="452" stroke="#d9b25f" strokeOpacity="0.35" className={dc} style={dr(0.2)} />

      {/* Roman numerals ring */}
      <g className="spin-rev svg-box" style={{ animationDuration: "200s" }}>
        {ROMAN.map((n, i) => (
          <text
            key={n}
            x={CX}
            y={CY - 418}
            textAnchor="middle"
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            fontSize="30"
            fill="#d9b25f"
            fillOpacity="0.7"
            transform={`rotate(${i * 30} ${CX} ${CY})`}
          >
            {n}
          </text>
        ))}
      </g>

      {/* Dashed ring with orbiting jewels */}
      <g className="spin-slow svg-box" style={{ animationDuration: "150s" }}>
        <circle cx={CX} cy={CY} r="380" stroke="#d9b25f" strokeOpacity="0.4" strokeDasharray="3 9" />
      </g>
      <circle r="6" fill="#8ef0e4">
        <animateMotion dur="38s" repeatCount="indefinite" path={circlePath(380)} />
      </circle>
      <circle r="4" fill="#ff8aa8">
        <animateMotion dur="55s" repeatCount="indefinite" path={circlePath(452)} />
      </circle>

      {/* Vitruvian circle + square + star */}
      <circle cx={CX} cy={CY} r="330" stroke="#efe6d0" strokeOpacity="0.5" className={dc} style={dr(0.5)} />
      <g className="spin-slow svg-box" style={{ animationDuration: "180s" }}>
        <path d={sq} stroke="#d9b25f" strokeOpacity="0.8" strokeWidth="1.3" className={dc} style={dr(0.8)} />
        <path d={star} stroke="#d9b25f" strokeOpacity="0.28" className={dc} style={dr(1)} />
      </g>
      <g className="spin-rev svg-box" style={{ animationDuration: "120s" }}>
        <path d={tri} stroke="#8b7cff" strokeOpacity="0.55" className={dc} style={dr(1.2)} />
      </g>
      <circle cx={CX} cy={CY} r="233" stroke="#efe6d0" strokeOpacity="0.22" className={dc} style={dr(1)} />

      {/* Golden spiral */}
      <path d={spiral} stroke="url(#gSpiral)" strokeWidth="2" strokeLinecap="round" className={dc} style={{ ...dr(0.6), animationDuration: "4.5s" }} />

      {/* Cross hairs */}
      <path d={`M${CX} ${CY - 330}V${CY + 330}M${CX - 330} ${CY}H${CX + 330}`} stroke="#efe6d0" strokeOpacity="0.14" />

      {/* Core */}
      <circle cx={CX} cy={CY} r="46" fill="url(#gCore)">
        <animate attributeName="r" values="40;58;40" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx={CX} cy={CY} r="5" fill="#f0d48e" />
    </svg>
  );
}
