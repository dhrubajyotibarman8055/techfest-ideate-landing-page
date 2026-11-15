import type { CSSProperties } from "react";

const G = "#d9b25f";
const L = { stroke: G, strokeWidth: 1.6, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

function gear(cx: number, cy: number, ro: number, ri: number, teeth: number) {
  let d = "";
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    [
      [ri, a - step * 0.27],
      [ro, a - step * 0.15],
      [ro, a + step * 0.15],
      [ri, a + step * 0.27],
    ].forEach(([r, ang], j) => {
      d += `${i === 0 && j === 0 ? "M" : "L"}${(cx + Math.cos(ang) * r).toFixed(1)} ${(cy + Math.sin(ang) * r).toFixed(1)}`;
    });
  }
  return d + "Z";
}

const origin = (x: number, y: number, anim: string): CSSProperties => ({ transformOrigin: `${x}px ${y}px`, animation: anim });

function Robotics() {
  return (
    <>
      <path d="M90 350h220M120 350v-24h160v24" {...L} />
      <circle cx="200" cy="300" r="26" {...L} />
      <g style={origin(200, 300, "swing-a 3.6s ease-in-out infinite alternate")}>
        <path d="M188 300L196 170h8l8 130z" {...L} fill="rgba(217,178,95,.08)" />
        <circle cx="200" cy="170" r="20" {...L} stroke="#ff8aa8" />
        <g style={origin(200, 170, "swing-b 2.8s ease-in-out infinite alternate")}>
          <path d="M192 170L196 70h8l4 100z" {...L} fill="rgba(217,178,95,.08)" />
          <circle cx="200" cy="70" r="12" {...L} stroke="#8ef0e4" />
          <path d="M188 60l-12-14M212 60l12-14" {...L} stroke="#8ef0e4" />
        </g>
      </g>
      <circle cx="200" cy="300" r="5" fill={G} />
      <path d="M40 60h40M40 60v40M360 60h-40M360 60v40" {...L} strokeOpacity=".4" />
    </>
  );
}

function AI() {
  const layers = [3, 5, 5, 2];
  const pos = layers.map((n, li) => Array.from({ length: n }, (_, i) => [70 + li * 87, 200 + (i - (n - 1) / 2) * 56]));
  const lines: React.ReactElement[] = [];
  pos.forEach((layer, li) => {
    if (li === layers.length - 1) return;
    layer.forEach(([x1, y1], a) =>
      pos[li + 1].forEach(([x2, y2], b) =>
        lines.push(
          <line
            key={`${li}-${a}-${b}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={G}
            strokeOpacity=".35"
            strokeDasharray="6 120"
            style={{ animation: `dash-flow ${2.4 + ((a + b) % 3) * 0.5}s linear ${(a * 0.3 + b * 0.2) % 1.5}s infinite` }}
          />,
        ),
      ),
    );
  });
  return (
    <>
      {pos.flatMap((layer, li) =>
        li === layers.length - 1
          ? []
          : layer.flatMap(([x1, y1], a) =>
              pos[li + 1].map(([x2, y2], b) => <line key={`b${li}-${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={G} strokeOpacity=".12" />),
            ),
      )}
      {lines}
      {pos.flat().map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="10"
          fill="#06070d"
          stroke={i % 3 === 0 ? "#8ef0e4" : i % 3 === 1 ? G : "#ff8aa8"}
          strokeWidth="1.6"
          className="svg-box"
          style={{ animation: `node-pulse 2.2s ease-in-out ${(i % 7) * 0.22}s infinite` }}
        />
      ))}
    </>
  );
}

function Tech() {
  const traces = [
    "M160 160H90V90H40",
    "M160 200H30",
    "M160 240H90V310H50",
    "M240 160H310V90H360",
    "M240 200H370",
    "M240 240H310V310H350",
    "M180 160V70M220 160V40",
    "M180 240V330M220 240V360",
  ];
  return (
    <>
      <rect x="160" y="160" width="80" height="80" rx="8" {...L} fill="rgba(217,178,95,.08)" />
      <rect x="178" y="178" width="44" height="44" rx="4" {...L} stroke="#8ef0e4" />
      {traces.map((d, i) => (
        <g key={i}>
          <path d={d} {...L} strokeOpacity=".35" />
          <path d={d} {...L} stroke={i % 2 ? "#ff8aa8" : "#8ef0e4"} strokeWidth="2.4" strokeDasharray="14 226" style={{ animation: `dash-flow ${2 + (i % 4) * 0.4}s linear ${i * 0.2}s infinite` }} />
        </g>
      ))}
    </>
  );
}

function Engineering() {
  return (
    <>
      <g style={origin(150, 170, "rotor 14s linear infinite")}>
        <path d={gear(150, 170, 90, 74, 16)} {...L} fill="rgba(217,178,95,.06)" />
        <circle cx="150" cy="170" r="22" {...L} />
        <path d="M150 90v160M70 170h160" {...L} strokeOpacity=".3" />
      </g>
      <g style={origin(283, 238, "rotor 8.75s linear infinite reverse")}>
        <path d={gear(283, 238, 56, 43, 10)} {...L} stroke="#ff8aa8" />
        <circle cx="283" cy="238" r="14" {...L} stroke="#ff8aa8" />
      </g>
      <g style={origin(300, 100, "rotor 6s linear infinite")}>
        <path d={gear(300, 100, 34, 25, 8)} {...L} stroke="#8ef0e4" />
        <circle cx="300" cy="100" r="8" {...L} stroke="#8ef0e4" />
      </g>
    </>
  );
}

function Innovation() {
  return (
    <>
      <circle cx="200" cy="200" r="150" {...L} strokeOpacity=".7" />
      <rect x="94" y="94" width="212" height="212" {...L} />
      <g style={origin(200, 200, "rotor 40s linear infinite")}>
        <rect x="94" y="94" width="212" height="212" {...L} stroke="#ff8aa8" strokeOpacity=".7" />
        <path d="M200 50L330 275H70Z" {...L} stroke="#8ef0e4" strokeOpacity=".6" />
      </g>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="200" cy="200" r="60" {...L} stroke="#f0d48e" className="svg-box" style={{ animation: `sonar 3.6s ease-out ${i * 1.2}s infinite`, transform: "scale(.3)" }} />
      ))}
      <path d="M50 200h300M200 50v300" {...L} strokeOpacity=".25" />
      <circle cx="200" cy="200" r="8" fill="#f0d48e" />
    </>
  );
}

function Learn() {
  const tiles: React.ReactElement[] = [];
  for (let r = 0; r < 6; r++)
    for (let c = 0; c < 6; c++)
      tiles.push(
        <rect
          key={`${r}-${c}`}
          x={60 + c * 48}
          y={60 + r * 48}
          width="38"
          height="38"
          rx="6"
          fill={(r + c) % 3 === 0 ? "#8ef0e4" : (r + c) % 3 === 1 ? G : "#ff8aa8"}
          style={{ animation: `tile-glow 3.2s ease-in-out ${((r + c) * 0.18).toFixed(2)}s infinite` }}
        />,
      );
  return <>{tiles}</>;
}

const ART: Record<string, () => React.ReactElement> = { robotics: Robotics, ai: AI, tech: Tech, eng: Engineering, innovation: Innovation, learn: Learn };

export function DomainArt({ k, className = "" }: { k: string; className?: string }) {
  const A = ART[k] ?? Robotics;
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden>
      <A />
    </svg>
  );
}
