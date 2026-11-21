import React from "react";
import {
  AbsoluteFill,
  CalculateMetadataFunction,
  Composition,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  title?: string;
  subtitle?: string;
};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

export const MyComposition: React.FC = () => {
  return (
    <Composition
      id="Main"
      component={MainScene}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        title: "Halo dari Remotion!",
        subtitle: "Proyek remotion-antigravity (Horizontal 16:9 - 1080p)",
      }}
      calculateMetadata={calculateMetadata}
    />
  );
};

export const MainScene: React.FC<Props> = ({
  title = "Halo dari Remotion!",
  subtitle = "Proyek remotion-antigravity (Horizontal 16:9 - 1080p)",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animasi entrance teks judul
  const titleEntrance = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Animasi entrance subtitle
  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subtitleTranslateY = interpolate(frame, [15, 35], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          transform: `scale(${titleEntrance})`,
          opacity: titleOpacity,
          fontSize: 72,
          fontWeight: 800,
          background: "linear-gradient(135deg, #38bdf8, #818cf8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        {title}
      </div>

      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleTranslateY}px)`,
          fontSize: 32,
          color: "#94a3b8",
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
