import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { iceMeltTheme } from "../../theme/iceMeltTheme";

export const IsostaticRebound: React.FC = () => {
  const frame = useCurrentFrame();

  // Ice disappears from frame 10 to 60
  const iceOpacity = interpolate(frame, [10, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Crust rebound: rises upward from frame 50 to 110
  const crustRebound = interpolate(frame, [50, 110], [0, -35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Volcanic eruption intensity
  const eruptionProgress = interpolate(frame, [80, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const magmaPulse = Math.sin(frame * 0.15) * 4;

  return (
    <div
      style={{
        display: "flex",
        gap: 48,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: 1400,
      }}
    >
      {/* Cross-Section Diagram */}
      <div
        style={{
          position: "relative",
          width: 760,
          height: 480,
          background: iceMeltTheme.colors.bgCard,
          border: `1.5px solid ${iceMeltTheme.colors.borderCard}`,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.7)`,
        }}
      >
        <svg viewBox="0 0 760 480" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="magmaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="60%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
            <linearGradient id="crustGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="iceSheetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Mantle / Magma Layer (Bottom) */}
          <rect x="0" y="320" width="760" height="160" fill="url(#magmaGrad)" />

          {/* Magma Convection Arrows */}
          <g opacity={0.6}>
            <circle cx="180" cy="400" r={30 + magmaPulse} fill="none" stroke="#fed7aa" strokeWidth="3" strokeDasharray="6 6" />
            <circle cx="380" cy="390" r={35 - magmaPulse} fill="none" stroke="#fed7aa" strokeWidth="3" strokeDasharray="6 6" />
            <circle cx="580" cy="410" r={28 + magmaPulse} fill="none" stroke="#fed7aa" strokeWidth="3" strokeDasharray="6 6" />
          </g>

          {/* Rebounding Crust Layer */}
          <g transform={`translate(0, ${crustRebound})`}>
            {/* The Earth's Lithosphere Crust */}
            <path
              d="M 0,220 L 220,220 L 260,170 L 300,220 L 460,220 L 500,160 L 540,220 L 760,220 L 760,330 L 0,330 Z"
              fill="url(#crustGrad)"
              stroke="#64748b"
              strokeWidth="2"
            />

            {/* Magma Conduits / Volcano Vents */}
            <path d="M 280,320 L 280,180" stroke="#f97316" strokeWidth="8" strokeLinecap="round" />
            <path d="M 520,320 L 520,170" stroke="#f97316" strokeWidth="10" strokeLinecap="round" />

            {/* Ice Sheet (2km Thick Layer on top of bedrock) */}
            <g opacity={iceOpacity}>
              <rect x="80" y="110" width="600" height="100" rx="12" fill="url(#iceSheetGrad)" stroke="#bae6fd" strokeWidth="2" />
              <text x="380" y="165" fill="#0369a1" fontSize="20" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                BEBAN ES ANTARKTIKA & GREENLAND (2 KM)
              </text>
            </g>

            {/* Volcanic Eruption Particles when decompressing */}
            {eruptionProgress > 0 && (
              <g opacity={eruptionProgress}>
                {/* Volcano 1 Vents */}
                <circle cx="280" cy={140 - eruptionProgress * 50} r="9" fill="#f97316" />
                <circle cx="265" cy={110 - eruptionProgress * 60} r="6" fill="#ef4444" />
                <circle cx="295" cy={90 - eruptionProgress * 70} r="8" fill="#fbbf24" />
                {/* Volcano 2 Vents */}
                <circle cx="520" cy={130 - eruptionProgress * 65} r="12" fill="#f97316" />
                <circle cx="500" cy={100 - eruptionProgress * 80} r="8" fill="#ef4444" />
                <circle cx="540" cy={80 - eruptionProgress * 90} r="10" fill="#fbbf24" />
              </g>
            )}

            {/* Rebound Upward Arrows */}
            {crustRebound < -5 && (
              <g opacity={Math.abs(crustRebound) / 35}>
                <line x1="160" y1="290" x2="160" y2="250" stroke="#38bdf8" strokeWidth="5" markerEnd="url(#arrow)" />
                <line x1="380" y1="290" x2="380" y2="250" stroke="#38bdf8" strokeWidth="5" markerEnd="url(#arrow)" />
                <line x1="620" y1="290" x2="620" y2="250" stroke="#38bdf8" strokeWidth="5" markerEnd="url(#arrow)" />
              </g>
            )}
          </g>
        </svg>

        {/* Phase Indicator Badge */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 24,
            background: "rgba(15, 23, 42, 0.9)",
            border: `1.5px solid ${iceMeltTheme.colors.magmaOrange}`,
            borderRadius: 14,
            padding: "8px 18px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: iceMeltTheme.colors.magmaOrange }} />
          <span style={{ fontSize: 13, fontWeight: 800, color: "#fed7aa" }}>
            {frame < 50 ? "1. TINDIHAN BEBAN ES" : frame < 90 ? "2. ISOSTATIC REBOUND (KERAK MEMBAL)" : "3. DEKOMPRESI MAGMA (>100 GUNUNG BERAPI)"}
          </span>
        </div>
      </div>

      {/* Explanation Side Panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 440 }}>
        <div
          style={{
            background: iceMeltTheme.colors.bgCard,
            border: `1.5px solid ${iceMeltTheme.colors.borderCard}`,
            borderRadius: 20,
            padding: "24px 28px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div style={{ fontSize: 13, color: iceMeltTheme.colors.primaryCyan, fontWeight: 800, letterSpacing: 1.2 }}>
            MEKANISME GEOFISIKA
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", marginTop: 6 }}>
            Post-Glacial Rebound
          </div>
          <p style={{ fontSize: 14, color: iceMeltTheme.colors.textSecondary, marginTop: 8, lineHeight: 1.5 }}>
            Kerak bumi mengapung di atas mantel cair. Saat beban es 28 triliun ton lenyap seketika, kerak bumi membal ke atas layaknya kasur busa.
          </p>
        </div>

        <div
          style={{
            background: "rgba(249, 115, 22, 0.12)",
            border: `1.5px solid ${iceMeltTheme.colors.magmaOrange}`,
            borderRadius: 20,
            padding: "24px 28px",
            boxShadow: `0 0 30px ${iceMeltTheme.colors.magmaGlow}`,
          }}
        >
          <div style={{ fontSize: 13, color: "#fed7aa", fontWeight: 800, letterSpacing: 1.2 }}>
            DEKOMPRESI VULKANIK
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
            &gt; 100 Gunung Berapi
          </div>
          <p style={{ fontSize: 14, color: "#ffedd5", marginTop: 6, lineHeight: 1.5 }}>
            Di bawah es Antarktika & Islandia, penurunan tekanan litosfer memicu titik didih magma turun dan letusan serentak.
          </p>
        </div>
      </div>
    </div>
  );
};
