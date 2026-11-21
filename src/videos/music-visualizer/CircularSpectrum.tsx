import React from "react";
import { useCurrentFrame } from "remotion";

interface CircularSpectrumProps {
  frequencies: number[]; // 0 to 1
  radius?: number;
  centerImage?: string;
  glowColor?: string;
}

export const CircularSpectrum: React.FC<CircularSpectrumProps> = ({
  frequencies,
  radius = 160,
  glowColor = "#38bdf8",
}) => {
  const frame = useCurrentFrame();

  // Rotasi pelan berkelanjutan
  const rotation = frame * 0.25;

  // Hitung rata-rata energi untuk detak denyutan lingkaran tengah
  const avgEnergy =
    frequencies.length > 0
      ? frequencies.reduce((a, b) => a + b, 0) / frequencies.length
      : 0;

  const coreScale = 1 + avgEnergy * 0.18;

  // Buat 48 bilah spektrum melingkar
  const barCount = 48;
  const bars = [];

  for (let i = 0; i < barCount; i++) {
    const angleDeg = (i / barCount) * 360;
    const angleRad = (angleDeg * Math.PI) / 180;

    // Ambil sampel frekuensi yang sesuai (menggunakan interpolasi simetris)
    const freqIdx = Math.floor(
      (Math.abs(i - barCount / 2) / (barCount / 2)) * (frequencies.length - 1)
    );
    const value = frequencies[freqIdx] ?? 0.05;

    // Panjang bilah frekuensi
    const barHeight = Math.max(8, value * 110);

    const x1 = Math.cos(angleRad) * radius;
    const y1 = Math.sin(angleRad) * radius;
    const x2 = Math.cos(angleRad) * (radius + barHeight);
    const y2 = Math.sin(angleRad) * (radius + barHeight);

    bars.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={glowColor}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.6 + value * 0.4}
        style={{
          filter: `drop-shadow(0 0 ${4 + value * 8}px ${glowColor})`,
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 600,
        height: 600,
      }}
    >
      {/* Glow Halo di belakang */}
      <div
        style={{
          position: "absolute",
          width: radius * 2.8,
          height: radius * 2.8,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glowColor}25 0%, transparent 70%)`,
          transform: `scale(${coreScale})`,
          transition: "transform 0.08s ease-out",
          pointerEvents: "none",
        }}
      />

      {/* SVG Spectrum Lingkaran yang berputar perlahan */}
      <svg
        width={600}
        height={600}
        viewBox="-300 -300 600 600"
        style={{
          transform: `rotate(${rotation}deg)`,
          overflow: "visible",
        }}
      >
        {/* Ring garis dasar */}
        <circle
          r={radius}
          fill="none"
          stroke={glowColor}
          strokeWidth={2}
          strokeDasharray="4 6"
          opacity={0.4}
        />

        {/* Bilah-bilah audio reaktif */}
        {bars}
      </svg>

      {/* Lingkaran Inti Minimalis Elegan */}
      <div
        style={{
          position: "absolute",
          width: radius * 1.6,
          height: radius * 1.6,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(3, 7, 18, 0.98))",
          border: `2px solid ${glowColor}`,
          boxShadow: `0 0 35px ${glowColor}40, inset 0 0 25px rgba(0, 0, 0, 0.8)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${coreScale})`,
          transition: "transform 0.08s ease-out",
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.9 }}>🎹</div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.2em",
            color: glowColor,
            textTransform: "uppercase",
            marginTop: 6,
          }}
        >
          RELAXING PIANO
        </div>
      </div>
    </div>
  );
};
