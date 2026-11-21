import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { financeTheme } from "../../theme/financeTheme";

interface ReceiptItem {
  name: string;
  price: string;
  margin: string;
  isLoss?: boolean;
}

const items: ReceiptItem[] = [
  { name: "Ayam Panggang Utuh (1 Ekor)", price: "Rp 50.000", margin: "-15% (Rugi)", isLoss: true },
  { name: "Minuman Soda 1.5L", price: "Rp 25.000", margin: "+60% Margin" },
  { name: "Saus BBQ & Bumbu Tambahan", price: "Rp 35.000", margin: "+75% Margin" },
  { name: "Camilan Keripik Jumbo", price: "Rp 45.000", margin: "+65% Margin" },
];

export const AnimatedReceipt: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animasi kertas struk jatuh memantul
  const paperEntrance = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Animasi sinar laser barcode scanner (bergerak naik-turun berkala)
  const laserY = interpolate(
    Math.sin(frame / 12),
    [-1, 1],
    [80, 380]
  );

  // Animasi stempel "SENGANJA RUGI" terbanting di detik ke-2 (frame 60)
  const stampFrame = Math.max(0, frame - 55);
  const stampDrop = spring({
    frame: stampFrame,
    fps,
    config: { damping: 10, stiffness: 220 }, // Bantingan keras
  });

  // Efek guncangan layar saat stempel terbanting
  const shake =
    stampFrame > 0 && stampFrame < 15
      ? Math.sin(stampFrame * 2) * (15 - stampFrame) * 0.8
      : 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${paperEntrance}) translateY(${(1 - paperEntrance) * -40 + shake}px)`,
        opacity,
        fontFamily: financeTheme.fonts.mono,
        position: "relative",
      }}
    >
      {/* Kertas Struk Belanja Realistis */}
      <div
        style={{
          width: 580,
          background: "#ffffff",
          color: "#0f172a",
          borderRadius: 16,
          boxShadow: "0 30px 70px rgba(0, 0, 0, 0.7), 0 0 50px rgba(255, 255, 255, 0.15)",
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Sinar Laser Scanner Merah Berkelip */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: laserY,
            height: 3,
            backgroundColor: "#ef4444",
            boxShadow: "0 0 16px 4px rgba(239, 68, 68, 0.85)",
            pointerEvents: "none",
            zIndex: 30,
          }}
        />

        {/* Header Struk Kasir */}
        <div style={{ textAlign: "center", borderBottom: "2px dashed #cbd5e1", paddingBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 18, color: "#ef4444" }}>● REC</span>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, letterSpacing: "0.08em" }}>
              MEGA MART KASIR #04
            </h2>
          </div>
          <p style={{ margin: "4px 0 0 0", fontSize: 13, color: "#64748b" }}>
            TRANSAKSI STRATEGI LOSS LEADER
          </p>
        </div>

        {/* Daftar Barang Belanjaan dengan Animasi */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, margin: "8px 0" }}>
          {items.map((item, index) => {
            const itemDelay = 15 + index * 12;
            const itemProgress = spring({
              frame: Math.max(0, frame - itemDelay),
              fps,
              config: { damping: 13, stiffness: 110 },
            });

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transform: `translateX(${(1 - itemProgress) * -20}px)`,
                  padding: "6px 10px",
                  borderRadius: 8,
                  backgroundColor: item.isLoss ? "rgba(239, 68, 68, 0.08)" : "transparent",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#1e293b" }}>
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: item.isLoss ? "#dc2626" : "#16a34a",
                      marginTop: 2,
                    }}
                  >
                    {item.margin}
                  </span>
                </div>

                <span style={{ fontSize: 17, fontWeight: 800, color: "#0f172a" }}>
                  {item.price}
                </span>

                {/* Stempel Sengaja Rugi pada Item 1 */}
                {item.isLoss && stampFrame > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      right: 120,
                      top: -6,
                      border: "3px solid #dc2626",
                      color: "#dc2626",
                      fontWeight: 900,
                      fontSize: 16,
                      letterSpacing: "0.1em",
                      padding: "4px 10px",
                      borderRadius: 6,
                      transform: `scale(${stampDrop}) rotate(-12deg)`,
                      opacity: stampDrop > 0.1 ? 1 : 0,
                      textTransform: "uppercase",
                      boxShadow: "0 0 10px rgba(220, 38, 38, 0.3)",
                      zIndex: 25,
                    }}
                  >
                    SENGAJA RUGI!
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Divider Garis Putus-putus & Total */}
        <div style={{ borderTop: "2px dashed #cbd5e1", paddingTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>TOTAL STRUK:</span>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#dc2626" }}>Rp 155.000</span>
          </div>

          <div
            style={{
              marginTop: 12,
              padding: "12px 14px",
              borderRadius: 10,
              backgroundColor: "#f0fdf4",
              border: "1.5px solid #86efac",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: "#166534" }}>
              ★ LABA BERSIH TOKO:
            </span>
            <span style={{ fontSize: 16, fontWeight: 900, color: "#15803d" }}>
              +Rp 68.000 (+44%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
