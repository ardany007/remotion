import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { iceMeltTheme } from "../../theme/iceMeltTheme";

export const EarthRotationGauge: React.FC = () => {
  const frame = useCurrentFrame();

  // Figure skater arm position (0: arms in/fast, 1: arms out/slow)
  const armExpansion = interpolate(frame, [20, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rotation speed slows down as arm expands
  const spinSpeed = interpolate(armExpansion, [0, 1], [4, 1.2]);
  const rotationAngle = (frame * spinSpeed) % 360;

  // Milliseconds added to day
  const msAdded = (interpolate(armExpansion, [0, 1], [0, 2.8])).toFixed(2);

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
      {/* Figure Skater & Earth Bulge Visual Card */}
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 40px",
        }}
      >
        {/* Left: Figure Skater Analogy */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 13, color: iceMeltTheme.colors.primaryCyan, fontWeight: 800, marginBottom: 12 }}>
            ANALOGI ATLET SELUNCUR ES
          </div>

          <svg width="240" height="280" viewBox="0 0 240 280">
            {/* Spinning Indicator Spiral */}
            <circle
              cx="120"
              cy="230"
              r="60"
              fill="none"
              stroke="rgba(56, 189, 248, 0.3)"
              strokeWidth="3"
              strokeDasharray="12 8"
              transform={`rotate(${rotationAngle}, 120, 230)`}
            />

            {/* Skater Head */}
            <circle cx="120" cy="60" r="22" fill="#bae6fd" stroke="#38bdf8" strokeWidth="3" />

            {/* Skater Body */}
            <line x1="120" y1="82" x2="120" y2="180" stroke="#bae6fd" strokeWidth="8" strokeLinecap="round" />

            {/* Dynamic Arms: Close to body vs Spread wide */}
            {armExpansion < 0.5 ? (
              // Arms In (Tightly crossed)
              <path d="M 120,105 L 95,135 L 120,145 L 145,135 Z" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              // Arms Extended Outward
              <path
                d={`M ${120 - armExpansion * 90},110 L 120,110 L ${120 + armExpansion * 90},110`}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="6"
                strokeLinecap="round"
              />
            )}

            {/* Legs */}
            <line x1="120" y1="180" x2="105" y2="245" stroke="#bae6fd" strokeWidth="7" strokeLinecap="round" />
            <line x1="120" y1="180" x2="135" y2="245" stroke="#bae6fd" strokeWidth="7" strokeLinecap="round" />
          </svg>

          <span
            style={{
              fontSize: 14,
              color: armExpansion > 0.5 ? "#fca5a5" : "#38bdf8",
              fontWeight: 800,
              marginTop: 4,
            }}
          >
            {armExpansion > 0.5 ? "TANGAN MERENTANG (PUTARAN LAMBAT)" : "TANGAN MERAPAT (PUTARAN CEPAT)"}
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: 1.5, height: 320, backgroundColor: "rgba(255,255,255,0.12)" }} />

        {/* Right: Earth Bulge at Equator */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 13, color: iceMeltTheme.colors.primaryCyan, fontWeight: 800, marginBottom: 12 }}>
            REDISTRIBUSI MASSA AIR BUMI
          </div>

          <svg width="260" height="260" viewBox="0 0 260 260">
            {/* Earth Ellipse: Becomes wider at equator (rx increases) */}
            <ellipse
              cx="130"
              cy="130"
              rx={95 + armExpansion * 18}
              ry={95 - armExpansion * 10}
              fill="rgba(3, 105, 161, 0.35)"
              stroke="#38bdf8"
              strokeWidth="3.5"
            />
            {/* Axis Line */}
            <line x1="130" y1="15" x2="130" y2="245" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
            <text x="130" y="10" fill="#ef4444" fontSize="11" fontWeight="800" textAnchor="middle">
              POROS ROTASI
            </text>

            {/* Centrifugal Water Bulge Arrows */}
            {armExpansion > 0.3 && (
              <g opacity={armExpansion}>
                <line x1="110" y1="130" x2="10" y2="130" stroke="#facc15" strokeWidth="3" markerEnd="url(#arrow)" />
                <line x1="150" y1="130" x2="250" y2="130" stroke="#facc15" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="130" y="125" fill="#facc15" fontSize="11" fontWeight="800" textAnchor="middle">
                  AIR MENUMPUK DI EKUSATOR
                </text>
              </g>
            )}
          </svg>

          {/* Formula Kinetik */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              borderRadius: 10,
              padding: "6px 16px",
              fontFamily: iceMeltTheme.typography.monoFont,
              color: "#38bdf8",
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            L = I × ω (Kekal)
          </div>
        </div>
      </div>

      {/* Side Stats */}
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
            DURASI 1 HARI BUMI
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
            24 Jam +{msAdded} ms
          </div>
          <p style={{ fontSize: 14, color: iceMeltTheme.colors.textSecondary, marginTop: 8, lineHeight: 1.5 }}>
            Momen inersia planet ($I$) melonjak karena triliunan ton air menjauh dari sumbu rotasi kutub menuju lingkar khatulistiwa.
          </p>
        </div>

        <div
          style={{
            background: "rgba(239, 68, 68, 0.12)",
            border: `1.5px solid ${iceMeltTheme.colors.warningRed}`,
            borderRadius: 20,
            padding: "24px 28px",
            boxShadow: `0 0 30px ${iceMeltTheme.colors.warningRedGlow}`,
          }}
        >
          <div style={{ fontSize: 13, color: "#fca5a5", fontWeight: 800, letterSpacing: 1.2 }}>
            SISTEM GPS & SATELIT
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
            True Polar Wander (~12m)
          </div>
          <p style={{ fontSize: 14, color: "#fecaca", marginTop: 6, lineHeight: 1.5 }}>
            Poros bumi oleng puluhan meter. Seluruh konstelasi satelit navigasi global kehilangan kalibrasi koordinat presisi.
          </p>
        </div>
      </div>
    </div>
  );
};
