import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { StardustParticles } from "./StardustParticles";
import { CircularSpectrum } from "./CircularSpectrum";
import { WaveformBars } from "./WaveformBars";
import { TrackInfoOverlay } from "./TrackInfoOverlay";

export interface CinematicPianoProps {
  title?: string;
  artist?: string;
  audioFileName?: string;
  accentColor?: string;
}

export const CinematicPianoVideo: React.FC<CinematicPianoProps> = ({
  title = "MIDNIGHT CONCERTO",
  artist = "Ardany Music",
  audioFileName = "music/loss-leader-bgm.mp3", // Default sample
  accentColor = "#38bdf8",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const audioSrc = staticFile(audioFileName);

  // Ambil data visualisasi audio dari file musik
  const audioData = useAudioData(audioSrc);

  // Jika audioData sudah siap, ekstrak frekuensi per-frame
  // Jika sedang loading/render cepat, gunakan fallback gelombang matematis yang mulus
  const frequencies = useMemo(() => {
    if (audioData) {
      return visualizeAudio({
        fps,
        frame,
        audioData,
        numberOfSamples: 64,
        smoothing: true,
      });
    }

    // Fallback prosedural anggun saat audioData belum ter-buffer
    const fallback: number[] = [];
    for (let i = 0; i < 64; i++) {
      const wave1 = Math.sin(frame * 0.08 + i * 0.25) * 0.5 + 0.5;
      const wave2 = Math.cos(frame * 0.05 + i * 0.15) * 0.5 + 0.5;
      fallback.push(Math.max(0.05, wave1 * 0.4 + wave2 * 0.3));
    }
    return fallback;
  }, [audioData, fps, frame]);

  // Hitung energi rata-rata
  const avgEnergy =
    frequencies.length > 0
      ? frequencies.reduce((a, b) => a + b, 0) / frequencies.length
      : 0;

  // Kamera Drift Sinematik (Ken Burns Effect) agar YouTube tidak menganggap video statis
  const cameraScale = interpolate(frame, [0, durationInFrames], [1, 1.05], {
    extrapolateRight: "clamp",
  });
  const cameraDriftX = Math.sin((frame / durationInFrames) * Math.PI) * 15;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#020617",
        overflow: "hidden",
      }}
    >
      {/* File Musik Suno */}
      <Audio src={audioSrc} />

      {/* Kontainer Kamera Bergerak */}
      <AbsoluteFill
        style={{
          transform: `scale(${cameraScale}) translateX(${cameraDriftX}px)`,
          transformOrigin: "center center",
        }}
      >
        {/* Background Nebula & Cosmic Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 45%, rgba(14, 165, 233, 0.15) 0%, rgba(15, 23, 42, 0.6) 50%, rgba(2, 6, 23, 1) 90%)",
          }}
        />

        {/* Ambient Floating Stardust Particles (Reaktif terhadap audio) */}
        <StardustParticles count={80} audioEnergy={avgEnergy} />

        {/* Central Audio Reactive Ring Visualizer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 40,
          }}
        >
          <CircularSpectrum
            frequencies={frequencies}
            radius={170}
            glowColor={accentColor}
          />
        </div>

        {/* Waveform Horizontal di bawah spektrum melingkar */}
        <div
          style={{
            position: "absolute",
            bottom: 220,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WaveformBars frequencies={frequencies} glowColor={accentColor} />
        </div>
      </AbsoluteFill>

      {/* On-Screen Track Info, Timeline & YPP Compliance Overlay */}
      <TrackInfoOverlay
        title={title}
        artist={artist}
        accentColor={accentColor}
      />
    </AbsoluteFill>
  );
};
