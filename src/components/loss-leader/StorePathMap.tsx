import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { financeTheme } from "../../theme/financeTheme";

export const StorePathMap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animasi garis rute jalan pembeli
  const pathLength = 800;
  const drawProgress = interpolate(frame, [15, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const strokeDashoffset = pathLength * (1 - drawProgress);

  // Pergerakan Troli Belanja Konsumen mengikuti alur jalan
  const cartProgress = interpolate(frame, [20, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Waypoints koordinat jalan:
  const waypoints = [
    { x: 60, y: 440 },
    { x: 180, y: 350 },
    { x: 270, y: 270 },
    { x: 380, y: 360 },
    { x: 480, y: 430 },
    { x: 600, y: 280 },
    { x: 800, y: 190 },
  ];

  const totalSegments = waypoints.length - 1;
  const currentSegmentFloat = cartProgress * totalSegments;
  const segmentIndex = Math.min(Math.floor(currentSegmentFloat), totalSegments - 1);
  const segmentFraction = currentSegmentFloat - segmentIndex;

  const p1 = waypoints[segmentIndex];
  const p2 = waypoints[segmentIndex + 1];

  const cartX = p1.x + (p2.x - p1.x) * segmentFraction;
  const cartY = p1.y + (p2.y - p1.y) * segmentFraction;

  // Efek pulsa radar di rak lorong (warning zone)
  const radarScale = interpolate(
    Math.sin(frame / 8),
    [-1, 1],
    [0.95, 1.08]
  );

  const containerScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${containerScale})`,
        fontFamily: financeTheme.fonts.main,
      }}
    >
      {/* Denah Tata Letak Supermarket Interaktif */}
      <div
        style={{
          width: 1060,
          height: 540,
          background: "rgba(11, 17, 32, 0.95)",
          border: `2px solid ${financeTheme.colors.borderCard}`,
          borderRadius: 24,
          padding: 32,
          position: "relative",
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
        }}
      >
        {/* Header HUD */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                boxShadow: "0 0 10px #ef4444",
              }}
            />
            <h3 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: "#ffffff", letterSpacing: "0.02em" }}>
              DENAH PSIKOLOGI TOKO: REKAYASA RUTE KONSUMEN
            </h3>
          </div>

          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: "#f59e0b",
              background: "rgba(245, 158, 11, 0.18)",
              padding: "6px 16px",
              borderRadius: 9999,
              border: "1px solid rgba(245, 158, 11, 0.4)",
              letterSpacing: "0.04em",
            }}
          >
            🚨 DIPAKSA MELEWATI 3 ZONA LABA TINGGI
          </span>
        </div>

        {/* Visual Lorong Rak 1: Snack & Biskuit */}
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 210,
            width: 140,
            height: 190,
            background: "rgba(245, 158, 11, 0.08)",
            border: "1.5px solid rgba(245, 158, 11, 0.3)",
            borderRadius: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            transform: `scale(${radarScale})`,
            boxShadow: "0 0 20px rgba(245, 158, 11, 0.1)",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 800, color: "#f59e0b", textAlign: "center" }}>LORONG 1</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#ffffff", marginTop: 4, textAlign: "center" }}>
            Snack & Biskuit
          </span>
          <span style={{ fontSize: 13, fontWeight: 900, color: "#10b981", marginTop: 6, background: "rgba(16, 185, 129, 0.2)", padding: "2px 8px", borderRadius: 4 }}>
            Margin +65%
          </span>
        </div>

        {/* Visual Lorong Rak 2: Minuman Soda */}
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 420,
            width: 140,
            height: 190,
            background: "rgba(56, 189, 248, 0.08)",
            border: "1.5px solid rgba(56, 189, 248, 0.3)",
            borderRadius: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            boxShadow: "0 0 20px rgba(56, 189, 248, 0.1)",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 800, color: "#38bdf8", textAlign: "center" }}>LORONG 2</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#ffffff", marginTop: 4, textAlign: "center" }}>
            Minuman Dingin
          </span>
          <span style={{ fontSize: 13, fontWeight: 900, color: "#10b981", marginTop: 6, background: "rgba(16, 185, 129, 0.2)", padding: "2px 8px", borderRadius: 4 }}>
            Margin +60%
          </span>
        </div>

        {/* Visual Lorong Rak 3: Saus & Bumbu */}
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 630,
            width: 140,
            height: 190,
            background: "rgba(168, 85, 247, 0.08)",
            border: "1.5px solid rgba(168, 85, 247, 0.3)",
            borderRadius: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            boxShadow: "0 0 20px rgba(168, 85, 247, 0.1)",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 800, color: "#a855f7", textAlign: "center" }}>LORONG 3</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#ffffff", marginTop: 4, textAlign: "center" }}>
            Saus & Bumbu
          </span>
          <span style={{ fontSize: 13, fontWeight: 900, color: "#10b981", marginTop: 6, background: "rgba(16, 185, 129, 0.2)", padding: "2px 8px", borderRadius: 4 }}>
            Margin +75%
          </span>
        </div>

        {/* Titik Masuk (Entrance) */}
        <div
          style={{
            position: "absolute",
            bottom: 35,
            left: 50,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(30, 41, 59, 0.8)",
            padding: "8px 16px",
            borderRadius: 9999,
            border: "1px solid rgba(56, 189, 248, 0.4)",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#38bdf8",
              boxShadow: "0 0 10px #38bdf8",
            }}
          />
          <span style={{ fontSize: 15, fontWeight: 800, color: "#ffffff" }}>
            PINTU MASUK
          </span>
        </div>

        {/* Titik Tujuan: Loss Leader di Sudut Paling Belakang (Kanan Atas) */}
        <div
          style={{
            position: "absolute",
            top: 105,
            right: 40,
            width: 140,
            height: 210,
            background: "rgba(239, 68, 68, 0.18)",
            border: `2px solid ${financeTheme.colors.red}`,
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
            boxShadow: `0 0 30px ${financeTheme.colors.redGlow}`,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 900, color: "#fca5a5", letterSpacing: "0.08em" }}>
            SUDUT PALING BELAKANG
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              color: "#ffffff",
              marginTop: 6,
              textAlign: "center",
            }}
          >
            Ayam Panggang / Susu
          </span>
          <div
            style={{
              marginTop: 10,
              background: "#ef4444",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 900,
              padding: "4px 8px",
              borderRadius: 6,
            }}
          >
            PRODUK UMPAN (-15%)
          </div>
        </div>

        {/* SVG Path Jalur yang Dilalui Pembeli */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <path
            d="M 60 440 L 150 440 Q 180 440 180 380 L 180 320 Q 180 270 270 270 L 330 270 Q 380 270 380 340 L 380 380 Q 380 430 480 430 L 540 430 Q 600 430 600 350 L 600 240 Q 600 190 700 190 L 800 190"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="5"
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Ikon Troli Pembeli yang Bergerak Aktif Mengikuti Alur */}
        <div
          style={{
            position: "absolute",
            left: cartX - 22,
            top: cartY - 22,
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: "#f59e0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            boxShadow: "0 0 25px #f59e0b, 0 0 10px #ffffff",
            border: "2px solid #ffffff",
            zIndex: 40,
            transform: `scale(${1 + Math.sin(frame / 6) * 0.1})`,
            transition: "transform 0.1s",
          }}
        >
          🛒
        </div>
      </div>
    </div>
  );
};
