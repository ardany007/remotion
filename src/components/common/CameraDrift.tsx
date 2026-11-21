import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface CameraDriftProps {
  children: React.ReactNode;
  type?: "zoom-in" | "zoom-out" | "pan-right" | "pan-left";
  intensity?: number;
}

export const CameraDrift: React.FC<CameraDriftProps> = ({
  children,
  type = "zoom-in",
  intensity = 0.08, // Perubahan skala 8% selama durasi adegan
}) => {
  const frame = useCurrentFrame();

  let scale = 1;
  let translateX = 0;
  let translateY = 0;

  if (type === "zoom-in") {
    scale = interpolate(frame, [0, 600], [1, 1 + intensity], {
      extrapolateRight: "clamp",
    });
    translateY = interpolate(frame, [0, 600], [0, -15], {
      extrapolateRight: "clamp",
    });
  } else if (type === "zoom-out") {
    scale = interpolate(frame, [0, 600], [1 + intensity, 1], {
      extrapolateRight: "clamp",
    });
    translateY = interpolate(frame, [0, 600], [-15, 0], {
      extrapolateRight: "clamp",
    });
  } else if (type === "pan-right") {
    scale = 1.05;
    translateX = interpolate(frame, [0, 600], [-30, 30], {
      extrapolateRight: "clamp",
    });
  } else if (type === "pan-left") {
    scale = 1.05;
    translateX = interpolate(frame, [0, 600], [30, -30], {
      extrapolateRight: "clamp",
    });
  }

  // Efek napas organik halus (subtle organic breathing)
  const subtleDrift = Math.sin(frame / 40) * 2;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        transform: `scale(${scale}) translate(${translateX}px, ${translateY + subtleDrift}px)`,
        transformOrigin: "center center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};
