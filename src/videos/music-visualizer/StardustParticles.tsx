import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  twinkleSpeed: number;
  color: string;
}

export const StardustParticles: React.FC<{ count?: number; audioEnergy?: number }> = ({
  count = 75,
  audioEnergy = 0,
}) => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    const list: Particle[] = [];
    const colors = ["#ffffff", "#e0f2fe", "#fef08a", "#fbcfe8", "#bae6fd"];

    for (let i = 0; i < count; i++) {
      const seed1 = Math.sin(i * 19.34);
      const seed2 = Math.cos(i * 47.12);
      const seed3 = Math.sin(i * 83.71);

      list.push({
        x: Math.abs(seed1 * 1920),
        y: Math.abs(seed2 * 1080),
        size: 1.5 + Math.abs(seed3 * 4.5),
        speed: 0.15 + Math.abs(seed1 * 0.45),
        opacity: 0.3 + Math.abs(seed2 * 0.5),
        twinkleSpeed: 0.04 + Math.abs(seed3 * 0.08),
        color: colors[i % colors.length],
      });
    }
    return list;
  }, [count]);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map((p, idx) => {
        // Melayang perlahan ke atas dan sedikit ke kanan
        const currentY = (p.y - frame * p.speed + 1080 * 10) % 1080;
        const currentX = (p.x + Math.sin(frame * 0.02 + idx) * 30 + 1920) % 1920;

        // Efek kelap-kelip lembut + reaktif terhadap energi audio
        const twinkle = Math.sin(frame * p.twinkleSpeed + idx);
        const dynamicOpacity = Math.max(
          0.1,
          Math.min(1, p.opacity + twinkle * 0.25 + audioEnergy * 0.35)
        );
        const dynamicScale = 1 + audioEnergy * 0.25;

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: currentX,
              top: currentY,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: p.color,
              opacity: dynamicOpacity,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              transform: `scale(${dynamicScale})`,
              transition: "transform 0.1s ease-out",
            }}
          />
        );
      })}
    </div>
  );
};
