import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { iceMeltTheme } from "../../theme/iceMeltTheme";

export const OceanConveyorMap: React.FC = () => {
  const frame = useCurrentFrame();

  // Fresh water flood event triggers AMOC shutdown around frame 60
  const amocCollapse = interpolate(frame, [50, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tempEurope = Math.round(interpolate(amocCollapse, [0, 1], [14, -18]));

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
      {/* Atlantic Conveyor Visual Map */}
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
            <linearGradient id="warmStream" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="coldStream" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>

          {/* Ocean Water Background */}
          <rect width="760" height="480" fill="#0c1a30" />

          {/* Grid lines */}
          <line x1="0" y1="240" x2="760" y2="240" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <line x1="380" y1="0" x2="380" y2="480" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

          {/* Flat Continents Silhouettes: North America (Left), Europe/Africa (Right) */}
          {/* North America */}
          <path
            d="M 40,60 L 160,80 L 190,140 L 140,210 L 170,280 L 110,310 L 80,240 L 40,140 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="2"
          />
          <text x="110" y="160" fill="#64748b" fontSize="13" fontWeight="800">
            AMERIKA UTARA
          </text>

          {/* Greenland (Top Center) */}
          <path
            d="M 280,40 L 360,50 L 340,110 L 290,100 Z"
            fill={amocCollapse > 0.5 ? "#0284c7" : "#f8fafc"}
            stroke="#38bdf8"
            strokeWidth="2"
          />
          <text x="320" y="80" fill={amocCollapse > 0.5 ? "#f8fafc" : "#0369a1"} fontSize="11" fontWeight="800" textAnchor="middle">
            GREENLAND
          </text>

          {/* Europe & Africa (Right) */}
          <path
            d="M 520,70 L 680,60 L 660,160 L 580,180 L 540,130 Z"
            fill={amocCollapse > 0.4 ? "rgba(56, 189, 248, 0.4)" : "#1e293b"}
            stroke={amocCollapse > 0.4 ? "#38bdf8" : "#334155"}
            strokeWidth="2"
          />
          <text x="600" y="120" fill={amocCollapse > 0.4 ? "#bae6fd" : "#64748b"} fontSize="13" fontWeight="800">
            EROPA {amocCollapse > 0.5 && "❄️ MEMBEKU"}
          </text>

          <path
            d="M 540,200 L 680,210 L 660,400 L 560,380 L 520,280 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="2"
          />
          <text x="600" y="300" fill="#64748b" fontSize="13" fontWeight="800">
            AFRIKA
          </text>

          {/* AMOC Conveyor Belt Warm Gulf Stream (Red/Orange) */}
          {amocCollapse < 0.8 ? (
            <path
              d="M 180,270 Q 260,240 340,190 T 540,110"
              fill="none"
              stroke="url(#warmStream)"
              strokeWidth={amocCollapse > 0 ? 8 * (1 - amocCollapse) : 8}
              strokeDasharray={amocCollapse > 0.2 ? "12 8" : "none"}
              strokeLinecap="round"
            />
          ) : (
            // Broken Conveyor Glitch
            <g>
              <line x1="330" y1="180" x2="350" y2="200" stroke="#ef4444" strokeWidth="4" />
              <line x1="350" y1="180" x2="330" y2="200" stroke="#ef4444" strokeWidth="4" />
              <text x="340" y="225" fill="#fca5a5" fontSize="12" fontWeight="800" textAnchor="middle">
                SIRKULASI TERPUTUS
              </text>
            </g>
          )}

          {/* Cold Deep Return Current (Blue) */}
          <path
            d="M 520,130 Q 420,240 320,330 T 220,410"
            fill="none"
            stroke="url(#coldStream)"
            strokeWidth="6"
            strokeDasharray="8 6"
            strokeLinecap="round"
          />

          {/* Fresh Meltwater Flush from Greenland */}
          {frame > 30 && (
            <g opacity={Math.min(1, (frame - 30) / 40)}>
              <circle cx="330" cy="120" r="14" fill="rgba(56, 189, 248, 0.4)" />
              <circle cx="330" cy="145" r="22" fill="rgba(56, 189, 248, 0.3)" />
              <circle cx="330" cy="175" r="30" fill="rgba(56, 189, 248, 0.2)" />
              <text x="330" y="180" fill="#38bdf8" fontSize="11" fontWeight="800" textAnchor="middle">
                BANJIR AIR TAWAR DINGIN
              </text>
            </g>
          )}
        </svg>

        {/* Live Status Badge */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 24,
            background: "rgba(15, 23, 42, 0.9)",
            border: `1.5px solid ${amocCollapse > 0.5 ? iceMeltTheme.colors.warningRed : iceMeltTheme.colors.primaryCyan}`,
            borderRadius: 14,
            padding: "8px 18px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: amocCollapse > 0.5 ? iceMeltTheme.colors.warningRed : "#22c55e",
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 800, color: "#ffffff" }}>
            AMOC: {amocCollapse > 0.5 ? "MOGOK TOTAL (COLLAPSED)" : "Sirkulasi Aktif"}
          </span>
        </div>
      </div>

      {/* Side Stats */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 440 }}>
        <div
          style={{
            background: amocCollapse > 0.5 ? "rgba(56, 189, 248, 0.15)" : iceMeltTheme.colors.bgCard,
            border: `1.5px solid ${amocCollapse > 0.5 ? iceMeltTheme.colors.primaryCyan : iceMeltTheme.colors.borderCard}`,
            borderRadius: 20,
            padding: "24px 28px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div style={{ fontSize: 13, color: iceMeltTheme.colors.primaryCyan, fontWeight: 800, letterSpacing: 1.2 }}>
            SUHU RATA-RATA EROPA BARAT
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: tempEurope <= 0 ? "#7dd3fc" : "#ffffff",
              marginTop: 4,
              fontFamily: iceMeltTheme.typography.monoFont,
            }}
          >
            {tempEurope > 0 ? `+${tempEurope}°C` : `${tempEurope}°C (Ekstrem)`}
          </div>
          <p style={{ fontSize: 14, color: iceMeltTheme.colors.textSecondary, marginTop: 8, lineHeight: 1.5 }}>
            Tanpa konveyor pemanas alami dari Teluk Meksiko, Eropa dan pesisir timur AS membeku dalam badai salju permanen.
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
          <div style={{ fontSize: 13, color: "#facc15", fontWeight: 800, letterSpacing: 1.2 }}>
            PENYEBAB: KERUNTUHAN SALINITAS
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", marginTop: 4 }}>
            Air Tawar Menolak Tenggelam
          </div>
          <p style={{ fontSize: 14, color: iceMeltTheme.colors.textSecondary, marginTop: 6, lineHeight: 1.5 }}>
            Densitas air tawar dari es mencair jauh lebih ringan. Pompa hidrolik alami termohalin samudra kehilangan tenaga pendorong.
          </p>
        </div>
      </div>
    </div>
  );
};
