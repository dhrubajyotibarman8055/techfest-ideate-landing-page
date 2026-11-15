import type { CSSProperties } from "react";

const S = { stroke: "#d9b25f", strokeWidth: 1.5, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

function gear(cx: number, cy: number, ro: number, ri: number, teeth: number) {
  let d = "";
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts = [
      [ri, a - step * 0.28],
      [ro, a - step * 0.16],
      [ro, a + step * 0.16],
      [ri, a + step * 0.28],
    ];
    pts.forEach(([r, ang], j) => {
      d += `${i === 0 && j === 0 ? "M" : "L"}${(cx + Math.cos(ang) * r).toFixed(1)} ${(cy + Math.sin(ang) * r).toFixed(1)}`;
    });
  }
  return d + "Z";
}

const spin = (s: number, rev = false): CSSProperties => ({ animation: `rotor ${s}s linear infinite ${rev ? "reverse" : ""}` });

const glyphs: Record<string, () => React.ReactElement> = {
  robowars: () => (
    <>
      <g className="glyph-anim svg-box" style={spin(8)}>
        <path d={gear(48, 66, 30, 23, 10)} {...S} />
        <circle cx="48" cy="66" r="7" {...S} />
      </g>
      <g className="glyph-anim svg-box" style={spin(5.6, true)}>
        <path d={gear(92, 34, 20, 15, 7)} {...S} stroke="#ff8aa8" />
        <circle cx="92" cy="34" r="5" {...S} stroke="#ff8aa8" />
      </g>
    </>
  ),
  coding: () => (
    <>
      <path d="M42 36L18 60l24 24M78 36l24 24-24 24M66 30L54 90" {...S} />
      <rect x="48" y="98" width="24" height="3" fill="#8ef0e4" className="glyph-anim" style={{ animation: "blink 1s steps(2) infinite" }} />
    </>
  ),
  aero: () => (
    <>
      <path d="M28 28l64 64M92 28L28 92" {...S} />
      <rect x="48" y="48" width="24" height="24" rx="6" {...S} />
      {[
        [28, 28],
        [92, 28],
        [28, 92],
        [92, 92],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill="#d9b25f" />
          <g className="glyph-anim svg-box" style={spin(0.5)}>
            <ellipse cx={x} cy={y} rx="17" ry="3.2" {...S} stroke="#ff8aa8" />
          </g>
        </g>
      ))}
    </>
  ),
  auv: () => (
    <>
      <g className="glyph-anim" style={{ animation: "float-y 2.5s ease-in-out infinite" }}>
        <ellipse cx="58" cy="46" rx="32" ry="14" {...S} />
        <circle cx="68" cy="44" r="5" {...S} />
        <path d="M26 46l-10-10v20zM54 32l6-8h8l-4 8" {...S} />
      </g>
      <clipPath id="auvClip">
        <rect x="0" y="62" width="120" height="50" />
      </clipPath>
      <g clipPath="url(#auvClip)">
        {[70, 82, 94].map((y, i) => (
          <path
            key={y}
            className="glyph-anim"
            style={{ animation: `wave-x ${2 + i * 0.6}s linear infinite` }}
            d={`M0 ${y} q15 -9 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0`}
            {...S}
            stroke={i === 0 ? "#8ef0e4" : "#d9b25f"}
            strokeOpacity={1 - i * 0.25}
          />
        ))}
      </g>
    </>
  ),
  micromouse: () => (
    <>
      <path d="M16 16h88v88H16zM16 40h40M40 40v32M64 16v40h24M88 56v32M40 88h32M64 72v32" {...S} strokeOpacity="0.55" />
      <path
        pathLength={1}
        d="M28 28V52H52V80H76V96M76 96h12"
        {...S}
        stroke="#8ef0e4"
        strokeWidth="2.5"
        strokeDasharray="1"
        className="glyph-anim"
        style={{ animation: "draw 2.6s linear infinite", strokeDashoffset: 1 }}
      />
    </>
  ),
  throttle: () => (
    <>
      <g className="glyph-anim svg-box" style={spin(1.2)}>
        <circle cx="68" cy="64" r="28" {...S} />
        <circle cx="68" cy="64" r="8" {...S} />
        <path d="M68 36v56M40 64h56M48 44l40 40M88 44L48 84" {...S} strokeOpacity="0.6" />
      </g>
      {[48, 62, 76].map((y, i) => (
        <path key={y} d={`M${4 + i * 6} ${y}h22`} {...S} stroke="#ff8aa8" className="glyph-anim" style={{ animation: `wave-x ${0.5 + i * 0.15}s linear infinite` }} />
      ))}
    </>
  ),
  technoholix: () => (
    <>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect
          key={i}
          x={16 + i * 14}
          y="22"
          width="8"
          height="76"
          rx="4"
          fill={i % 2 ? "#ff8aa8" : "#d9b25f"}
          className="glyph-anim"
          style={{ transformBox: "fill-box", transformOrigin: "bottom", animation: `eq ${0.7 + (i % 4) * 0.22}s ease-in-out ${i * 0.09}s infinite`, transform: "scaleY(0.3)" }}
        />
      ))}
    </>
  ),
  workshops: () => {
    const n = [
      [60, 60],
      [24, 30],
      [96, 28],
      [100, 88],
      [28, 92],
    ];
    return (
      <>
        <path d="M60 60L24 30M60 60L96 28M60 60L100 88M60 60L28 92M24 30L96 28M100 88L28 92" {...S} strokeOpacity="0.45" />
        {n.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === 0 ? 9 : 6}
            fill={i === 0 ? "#d9b25f" : "#8b7cff"}
            className="glyph-anim svg-box"
            style={{ animation: `node-pulse 1.8s ease-in-out ${i * 0.25}s infinite` }}
          />
        ))}
      </>
    );
  },
  lectures: () => (
    <>
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx="60"
          cy="60"
          r="46"
          {...S}
          stroke="#ff8aa8"
          className="glyph-anim svg-box"
          style={{ animation: `sonar 2.4s ease-out ${i * 0.8}s infinite` }}
        />
      ))}
      <rect x="52" y="38" width="16" height="30" rx="8" {...S} />
      <path d="M44 62a16 16 0 0 0 32 0M60 78v14M50 92h20" {...S} />
    </>
  ),
};

export function EventGlyph({ k, className = "" }: { k: string; className?: string }) {
  const G = glyphs[k] ?? glyphs.robowars;
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <G />
    </svg>
  );
}
