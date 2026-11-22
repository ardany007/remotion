import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { iceMeltTheme } from "../../theme/iceMeltTheme";

export const PermafrostMethane: React.FC = () => {
  const frame = useCurrentFrame();

  // Thawing animation: soil heats up from blue/frozen to brown/melted
  const thawProgress = interpolate(frame, [20, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const methaneBubbles = [
    { x: 180, delay: 10, size: 14 },
    { x: 260, delay: 35, size: 20 },
    { x: 340, delay: 18, size: 16 },
    { x: 420, delay: 42, size: 24 },
    { x: 500, delay: 25, size: 18 },
    { x: 580, delay: 50, size: 22 },
  ];

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
      {/* Permafrost Cross Section Visual */}
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
            <linearGradient id="tundraSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#020617" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="soilFrozen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="100%" stopColor="#0c1e33" />
            </linearGradient>
            <linearGradient id="soilThawed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>

          {/* Sky / Atmosphere */}
          <rect width="760" height="200" fill="url(#tundraSky)" />

          {/* Ground Soil (Interpolates from frozen blue to thawed brown) */}
          <rect
            y="200"
            width="760"
            height="280"
            fill="url(#soilFrozen)"
          />
          <rect
            y="200"
            width="760"
            height="280"
            fill="url(#soilThawed)"
            opacity={thawProgress * 0.9}
          />

          {/* Grass / Tundra Surface Line */}
          <line x1="0" y1="200" x2="760" y2="200" stroke={thawProgress > 0.5 ? "#15803d" : "#7dd3fc"} strokeWidth="5" />

          {/* Ancient Roots & Organisms in the Soil */}
          <path d="M 120,200 Q 150,260 140,340 T 170,420" fill="none" stroke="#92400e" strokeWidth="4" opacity={0.6} />
          <path d="M 380,200 Q 360,280 400,360 T 370,440" fill="none" stroke="#92400e" strokeWidth="5" opacity={0.6} />
          <path d="M 620,200 Q 640,290 610,380" fill="none" stroke="#92400e" strokeWidth="4" opacity={0.6} />

          {/* Ancient Dormant Microbes & Viruses */}
          {[
            { cx: 200, cy: 300 },
            { cx: 310, cy: 380 },
            { cx: 480, cy: 320 },
            { cx: 660, cy: 400 },
          ].map((m, idx) => (
            <g key={idx}>
              <circle cx={m.cx} cy={m.cy} r="10" fill="rgba(244, 63, 94, 0.4)" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
              <text x={m.cx} y={m.cy + 4} fill="#fecdd3" fontSize="9" fontWeight="900" textAnchor="middle">
                VIRUS
              </text>
            </g>
          ))}

          {/* Rising Neon Methane Bubbles (CH4) */}
          {methaneBubbles.map((b, idx) => {
            const bubbleY = interpolate(
              (frame + b.delay) % 90,
              [0, 90],
              [380, 40]
            );
            const bubbleOpacity = interpolate(
              (frame + b.delay) % 90,
              [0, 20, 80, 90],
              [0, 0.9, 0.9, 0]
            );

            return (
              <g key={idx} opacity={thawProgress * bubbleOpacity}>
                <circle
                  cx={b.x}
                  cy={bubbleY}
                  r={b.size}
                  fill="rgba(16, 185, 129, 0.35)"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  filter="drop-shadow(0 0 10px #10b981)"
                />
                <text
                  x={b.x}
                  y={bubbleY + 4}
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="900"
                  textAnchor="middle"
                  fontFamily={iceMeltTheme.typography.monoFont}
                >
                  CH₄
                </text>
              </g>
            );
          })}
        </svg>

        {/* Status Badge */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 24,
            background: "rgba(15, 23, 42, 0.9)",
            border: `1.5px solid ${iceMeltTheme.colors.methaneGreen}`,
            borderRadius: 14,
            padding: "8px 18px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: iceMeltTheme.colors.methaneGreen }} />
          <span style={{ fontSize: 13, fontWeight: 800, color: "#a7f3d0" }}>
            PELEPASAN GAS PERMAFROST: AKTIF
          </span>
        </div>
      </div>

      {/* Side Stats */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 440 }}>
        <div
          style={{
            background: "rgba(16, 185, 129, 0.12)",
            border: `1.5px solid ${iceMeltTheme.colors.methaneGreen}`,
            borderRadius: 20,
            padding: "24px 28px",
            boxShadow: `0 0 30px ${iceMeltTheme.colors.methaneGlow}`,
          }}
        >
          <div style={{ fontSize: 13, color: "#6ee7b7", fontWeight: 800, letterSpacing: 1.2 }}>
            CADANGAN KARBON ORGANIK PURBA
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#ffffff",
              marginTop: 4,
              fontFamily: iceMeltTheme.typography.monoFont,
            }}
          >
            1.500 Miliar Ton
          </div>
          <p style={{ fontSize: 14, color: "#d1fae5", marginTop: 8, lineHeight: 1.5 }}>
            2× lipat total karbon di seluruh atmosfer bumi. Saat tanah beku mencair, mikroba melepaskan gas metana ($CH_4$) dengan efek rumah kaca 28× lebih kuat dari $CO_2$.
          </p>
        </div>

        <div
          style={{
            background: iceMeltTheme.colors.bgCard,
            border: `1.5px solid ${iceMeltTheme.colors.borderCard}`,
            borderRadius: 20,
            padding: "24px 28px",
            boxShadow: `0 10px 30px rgba(0,0,0,0.4)`,
          }}
        >
          <div style={{ fontSize: 13, color: "#f43f5e", fontWeight: 800, letterSpacing: 1.2 }}>
            MIKROBA PURBA (ZOMBIE VIRUS)
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", marginTop: 4 }}>
            Terisolasi Selama 48.000 Tahun
          </div>
          <p style={{ fontSize: 14, color: iceMeltTheme.colors.textSecondary, marginTop: 6, lineHeight: 1.5 }}>
            Patogen purba yang terawetkan di lapisan es dalam berpotensi terbangun kembali tanpa adanya kekebalan alami pada manusia modern.
          </p>
        </div>
      </div>
    </div>
  );
};
