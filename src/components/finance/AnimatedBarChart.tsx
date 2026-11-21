import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { financeTheme } from "../../theme/financeTheme";

export interface BarChartItem {
  label: string;
  value: number;
  displayValue?: string;
  color?: string;
  highlighted?: boolean;
}

interface AnimatedBarChartProps {
  title: string;
  subtitle?: string;
  items: BarChartItem[];
  height?: number;
  width?: number;
}

export const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({
  title,
  subtitle,
  items,
  height = 420,
  width = 900,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const maxValue = Math.max(...items.map((i) => i.value), 1);

  return (
    <div
      style={{
        background: financeTheme.colors.bgCard,
        border: `1px solid ${financeTheme.colors.borderCard}`,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        borderRadius: 24,
        padding: "36px 44px",
        width,
        fontFamily: financeTheme.fonts.main,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div>
        <h3
          style={{
            margin: 0,
            fontSize: 26,
            fontWeight: 700,
            color: financeTheme.colors.textPrimary,
          }}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            style={{
              margin: "6px 0 0 0",
              fontSize: 16,
              color: financeTheme.colors.textSecondary,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Area Grafik Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          height,
          borderBottom: `2px solid ${financeTheme.colors.borderCard}`,
          paddingBottom: 12,
          position: "relative",
        }}
      >
        {items.map((item, index) => {
          const delay = index * 8 + 5;
          const adjustedFrame = Math.max(0, frame - delay);

          const barSpring = spring({
            frame: adjustedFrame,
            fps,
            config: { damping: 14, stiffness: 90 },
          });

          const barHeightPercent = (item.value / maxValue) * 100;
          const currentHeight = (barHeightPercent * barSpring * height) / 100;

          const barColor =
            item.color ||
            (item.highlighted
              ? financeTheme.colors.green
              : financeTheme.colors.blue);

          const opacity = interpolate(adjustedFrame, [0, 10], [0, 1], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                flex: 1,
                maxWidth: 140,
                opacity,
              }}
            >
              {/* Nilai / Angka di atas bar */}
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  fontFamily: financeTheme.fonts.mono,
                  color: item.highlighted
                    ? financeTheme.colors.green
                    : financeTheme.colors.textPrimary,
                  transform: `translateY(${(1 - barSpring) * 10}px)`,
                }}
              >
                {item.displayValue || item.value.toLocaleString("id-ID")}
              </span>

              {/* Batang Bar */}
              <div
                style={{
                  width: "100%",
                  height: Math.max(8, currentHeight),
                  backgroundColor: barColor,
                  borderRadius: "12px 12px 4px 4px",
                  boxShadow: item.highlighted
                    ? `0 0 25px ${financeTheme.colors.greenGlow}`
                    : "none",
                  transition: "background-color 0.2s",
                }}
              />

              {/* Label Kategori */}
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: item.highlighted
                    ? financeTheme.colors.textPrimary
                    : financeTheme.colors.textSecondary,
                  textAlign: "center",
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
