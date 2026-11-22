import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { iceMeltTheme } from "../../theme/iceMeltTheme";

interface RotatingGlobeProps {
  meltProgress?: number; // 0 (full ice) to 1 (all melted)
}

export const RotatingGlobe: React.FC<RotatingGlobeProps> = ({ meltProgress = 0 }) => {
  const frame = useCurrentFrame();
  const rotation = (frame * 0.4) % 360;

  // Ice opacity decreases as meltProgress increases
  const iceOpacity = interpolate(meltProgress, [0, 1], [0.95, 0.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const waterPulse = 1 + 0.03 * Math.sin(frame * 0.08);

  return (
    <div
      style={{
        position: "relative",
        width: 480,
        height: 480,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer Atmosphere Glow */}
      <div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(56, 189, 248, 0.05) 60%, transparent 80%)",
          filter: "blur(20px)",
          transform: `scale(${waterPulse})`,
        }}
      />

      {/* Main Globe Sphere */}
      <svg
        width="440"
        height="440"
        viewBox="0 0 440 440"
        style={{
          borderRadius: "50%",
          boxShadow: `0 0 60px ${iceMeltTheme.colors.cyanGlow}, inset -40px -40px 80px rgba(0, 0, 0, 0.8), inset 20px 20px 40px rgba(56, 189, 248, 0.4)`,
          background: "linear-gradient(135deg, #0f172a 0%, #0369a1 50%, #082f49 100%)",
        }}
      >
        <defs>
          <clipPath id="globeClip">
            <circle cx="220" cy="220" r="215" />
          </clipPath>
          <linearGradient id="iceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={iceOpacity} />
            <stop offset="80%" stopColor="#bae6fd" stopOpacity={iceOpacity * 0.8} />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="southIceGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={iceOpacity} />
            <stop offset="80%" stopColor="#bae6fd" stopOpacity={iceOpacity * 0.8} />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g clipPath="url(#globeClip)">
          {/* Latitudinal Grids */}
          <ellipse cx="220" cy="220" rx="215" ry="70" fill="none" stroke="rgba(56, 189, 248, 0.18)" strokeWidth="1.5" />
          <ellipse cx="220" cy="220" rx="215" ry="140" fill="none" stroke="rgba(56, 189, 248, 0.18)" strokeWidth="1.5" />
          <line x1="5" y1="220" x2="435" y2="220" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="2" strokeDasharray="6 4" />

          {/* Continents (Stylized Flat Vector Landmasses repeating for rotation) */}
          <g transform={`translate(${(-rotation * 2.2) % 440}, 0)`}>
            {/* Continent Set 1 */}
            <path
              d="M 60,140 Q 110,120 150,150 Q 180,180 160,220 Q 130,260 90,240 Q 50,200 60,140 Z"
              fill="rgba(34, 197, 94, 0.25)"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <path
              d="M 220,130 Q 300,100 340,160 Q 370,220 310,260 Q 260,280 230,220 Q 200,170 220,130 Z"
              fill="rgba(34, 197, 94, 0.25)"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <path
              d="M 120,280 Q 170,270 190,320 Q 160,370 110,360 Q 90,310 120,280 Z"
              fill="rgba(34, 197, 94, 0.25)"
              stroke="#22c55e"
              strokeWidth="2"
            />

            {/* Continent Set 2 (offset 440px for infinite scroll) */}
            <path
              d="M 500,140 Q 550,120 590,150 Q 620,180 600,220 Q 570,260 530,240 Q 490,200 500,140 Z"
              fill="rgba(34, 197, 94, 0.25)"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <path
              d="M 660,130 Q 740,100 780,160 Q 810,220 750,260 Q 700,280 670,220 Q 640,170 660,130 Z"
              fill="rgba(34, 197, 94, 0.25)"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <path
              d="M 560,280 Q 610,270 630,320 Q 600,370 550,360 Q 530,310 560,280 Z"
              fill="rgba(34, 197, 94, 0.25)"
              stroke="#22c55e"
              strokeWidth="2"
            />
          </g>

          {/* North Pole Ice Cap */}
          <path
            d="M 120,15 Q 220,75 320,15 Q 360,60 300,75 Q 220,95 140,75 Q 80,60 120,15 Z"
            fill="url(#iceGrad)"
          />

          {/* South Pole Ice Cap (Antarctica) */}
          <path
            d="M 90,420 Q 220,345 350,420 Q 320,370 220,360 Q 120,370 90,420 Z"
            fill="url(#southIceGrad)"
          />

          {/* Melt Water Droplets / Floating Particles */}
          {meltProgress > 0.2 && (
            <g opacity={meltProgress}>
              <circle cx="160" cy="110" r="4" fill="#38bdf8" />
              <circle cx="280" cy="120" r="5" fill="#38bdf8" />
              <circle cx="210" cy="330" r="4.5" fill="#38bdf8" />
              <circle cx="310" cy="340" r="3.5" fill="#38bdf8" />
            </g>
          )}

          {/* Shading Overlay */}
          <circle cx="220" cy="220" r="215" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
};
