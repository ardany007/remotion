import React from "react";
import { AbsoluteFill, Audio, Series, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ShortSubtitle } from "../../components/shorts/ShortSubtitle";
import { lossLeaderShortTiming } from "../../data/lossLeaderShortTiming";
import { financeTheme } from "../../theme/financeTheme";

export const LossLeaderShortVideo: React.FC = () => {
  const { scenes } = lossLeaderShortTiming;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#030712",
        fontFamily: financeTheme.fonts.main,
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Background Music Looping */}
      <Audio
        src={staticFile("music/loss-leader-bgm.mp3")}
        volume={0.12}
        loop
      />

      <Series>
        {/* ========================================================
            SCENE 1: HOOK - PARADOKS AYAM PANGGANG (0 - 201 frames)
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.short1.frames}>
          <Audio src={staticFile("vo/short/short1.mp3")} volume={1} />
          <ShortScene1 />
          <ShortSubtitle cues={scenes.short1.subtitles} />
        </Series.Sequence>

        {/* ========================================================
            SCENE 2: STRUK BELANJA & KASIR (201 - 665 frames)
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.short2.frames}>
          <Audio src={staticFile("vo/short/short2.mp3")} volume={1} />
          <ShortScene2 />
          <ShortSubtitle cues={scenes.short2.subtitles} />
        </Series.Sequence>

        {/* ========================================================
            SCENE 3: STRATEGI LOSS LEADER (665 - 956 frames)
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.short3.frames}>
          <Audio src={staticFile("vo/short/short3.mp3")} volume={1} />
          <ShortScene3 />
          <ShortSubtitle cues={scenes.short3.subtitles} />
        </Series.Sequence>

        {/* ========================================================
            SCENE 4: CALL TO ACTION & LOOP (956 - 1170 frames)
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.short4.frames}>
          <Audio src={staticFile("vo/short/short4.mp3")} volume={1} />
          <ShortScene4 />
          <ShortSubtitle cues={scenes.short4.subtitles} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

// ========================================================
// SCENE 1 IMPLEMENTATION
// ========================================================
const ShortScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const popBadge = spring({ frame, fps, config: { damping: 12, stiffness: 180 } });
  const card1Spring = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 160 } });
  const card2Spring = spring({ frame: frame - 35, fps, config: { damping: 12, stiffness: 160 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "160px 50px",
        background: "radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.15) 0%, rgba(3, 7, 18, 1) 75%)",
      }}
    >
      {/* Top Header Badge */}
      <div
        style={{
          transform: `scale(${popBadge})`,
          background: "rgba(245, 158, 11, 0.2)",
          border: "2px solid #f59e0b",
          padding: "12px 28px",
          borderRadius: 9999,
          color: "#fbbf24",
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          boxShadow: "0 0 25px rgba(245, 158, 11, 0.3)",
          marginBottom: 36,
        }}
      >
        🔥 TRIK PSIKOLOGI HARGA
      </div>

      {/* Main Kinetic Headline */}
      <div
        style={{
          fontSize: 54,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.15,
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          maxWidth: 920,
          marginBottom: 60,
          textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
        }}
      >
        KENAPA AYAM PANGGANG CUMA{" "}
        <span style={{ color: "#fbbf24", textDecoration: "underline" }}>50 RIBU?</span>
      </div>

      {/* Comparison Cards Vertically Stacked */}
      <div style={{ display: "flex", flexDirection: "column", gap: 30, width: "100%", maxWidth: 860 }}>
        {/* Card 1: Ayam Mentah */}
        <div
          style={{
            transform: `scale(${card1Spring})`,
            opacity: card1Spring,
            background: "rgba(30, 41, 59, 0.75)",
            border: "2px solid rgba(239, 68, 68, 0.5)",
            borderRadius: 24,
            padding: "28px 36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
          }}
        >
          <div>
            <div style={{ color: "#94a3b8", fontSize: 24, fontWeight: 700, textTransform: "uppercase" }}>
              Bahan Baku
            </div>
            <div style={{ fontSize: 38, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Ayam Utuh Mentah
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span
              style={{
                background: "rgba(239, 68, 68, 0.25)",
                color: "#f87171",
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              LEBIH MAHAL
            </span>
            <div style={{ fontSize: 44, fontWeight: 900, color: "#ef4444", marginTop: 6 }}>
              Rp 65.000
            </div>
          </div>
        </div>

        {/* Card 2: Ayam Panggang Matang */}
        <div
          style={{
            transform: `scale(${card2Spring})`,
            opacity: card2Spring,
            background: "rgba(30, 41, 59, 0.9)",
            border: "3px solid #10b981",
            borderRadius: 24,
            padding: "32px 36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 15px 40px rgba(16, 185, 129, 0.3)",
          }}
        >
          <div>
            <div style={{ color: "#34d399", fontSize: 24, fontWeight: 800, textTransform: "uppercase" }}>
              Siap Santap (Matang)
            </div>
            <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Ayam Panggang Rotisserie
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span
              style={{
                background: "rgba(16, 185, 129, 0.25)",
                color: "#34d399",
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              JUAL RUGI
            </span>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#10b981", marginTop: 6 }}>
              Rp 50.000
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ========================================================
// SCENE 2 IMPLEMENTATION
// ========================================================
const ShortScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const receiptSpring = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const pulseAlert = 1 + Math.sin(frame * 0.2) * 0.04;

  const items = [
    { name: "Ayam Panggang (Umpan)", price: "Rp 50.000", tag: "Margin 0%", color: "#94a3b8" },
    { name: "Saus BBQ & Bumbu", price: "Rp 35.000", tag: "+75% Margin", color: "#34d399" },
    { name: "Minuman Soda 1.5L", price: "Rp 45.000", tag: "+80% Margin", color: "#34d399" },
    { name: "Snack & Camilan", price: "Rp 170.000", tag: "+70% Margin", color: "#34d399" },
  ];

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "140px 50px",
        background: "radial-gradient(circle at 50% 35%, rgba(239, 68, 68, 0.15) 0%, rgba(3, 7, 18, 1) 80%)",
      }}
    >
      {/* Top Header Badge */}
      <div
        style={{
          background: "rgba(239, 68, 68, 0.2)",
          border: "2px solid #ef4444",
          padding: "12px 28px",
          borderRadius: 9999,
          color: "#f87171",
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          boxShadow: "0 0 25px rgba(239, 68, 68, 0.3)",
          marginBottom: 24,
        }}
      >
        🛒 JEBAKAN DI MEJA KASIR
      </div>

      <div
        style={{
          fontSize: 50,
          fontWeight: 900,
          textAlign: "center",
          textTransform: "uppercase",
          marginBottom: 36,
          letterSpacing: "-0.02em",
        }}
      >
        STRUK BELANJA BOCOR
      </div>

      {/* Animated Vertical Receipt */}
      <div
        style={{
          transform: `scale(${receiptSpring}) translateY(${interpolate(receiptSpring, [0, 1], [60, 0])}px)`,
          opacity: receiptSpring,
          width: "100%",
          maxWidth: 860,
          background: "#ffffff",
          color: "#0f172a",
          borderRadius: 24,
          padding: "36px 40px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(239, 68, 68, 0.2)",
          fontFamily: financeTheme.fonts.mono,
        }}
      >
        <div style={{ textAlign: "center", borderBottom: "2px dashed #cbd5e1", paddingBottom: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "0.05em" }}>SUPERMARKET STRUK</div>
          <div style={{ fontSize: 16, color: "#64748b" }}>============================</div>
        </div>

        {/* Item Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {items.map((item, idx) => (
            <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24 }}>
              <div>
                <span style={{ fontWeight: 700 }}>{item.name}</span>
                <span
                  style={{
                    marginLeft: 10,
                    fontSize: 14,
                    background: item.color === "#34d399" ? "#dcfce7" : "#f1f5f9",
                    color: item.color === "#34d399" ? "#15803d" : "#475569",
                    padding: "3px 8px",
                    borderRadius: 6,
                    fontWeight: 800,
                  }}
                >
                  {item.tag}
                </span>
              </div>
              <span style={{ fontWeight: 800 }}>{item.price}</span>
            </div>
          ))}
        </div>

        {/* Receipt Divider */}
        <div style={{ borderTop: "3px solid #0f172a", marginTop: 24, paddingTop: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 18, color: "#dc2626", fontWeight: 900 }}>TOTAL AKHIR:</div>
              <div style={{ fontSize: 14, color: "#64748b" }}>(NIAT: RP 50.000)</div>
            </div>
            <div
              style={{
                fontSize: 46,
                fontWeight: 900,
                color: "#dc2626",
                transform: `scale(${pulseAlert})`,
              }}
            >
              Rp 300.000
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ========================================================
// SCENE 3 IMPLEMENTATION
// ========================================================
const ShortScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const step1 = spring({ frame: frame - 5, fps, config: { damping: 12, stiffness: 180 } });
  const step2 = spring({ frame: frame - 25, fps, config: { damping: 12, stiffness: 180 } });
  const step3 = spring({ frame: frame - 45, fps, config: { damping: 12, stiffness: 180 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "150px 50px",
        background: "radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.18) 0%, rgba(3, 7, 18, 1) 80%)",
      }}
    >
      {/* Top Header Badge */}
      <div
        style={{
          background: "rgba(56, 189, 248, 0.2)",
          border: "2px solid #38bdf8",
          padding: "12px 28px",
          borderRadius: 9999,
          color: "#38bdf8",
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          boxShadow: "0 0 25px rgba(56, 189, 248, 0.3)",
          marginBottom: 30,
        }}
      >
        🧠 STRATEGI BISNIS
      </div>

      <div
        style={{
          fontSize: 56,
          fontWeight: 900,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          marginBottom: 50,
        }}
      >
        STRATEGI <span style={{ color: "#38bdf8" }}>"LOSS LEADER"</span>
      </div>

      {/* 3 Step Flow Diagram */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%", maxWidth: 860, alignItems: "center" }}>
        {/* Step 1 */}
        <div
          style={{
            transform: `scale(${step1})`,
            opacity: step1,
            width: "100%",
            background: "rgba(30, 41, 59, 0.8)",
            border: "2px solid rgba(239, 68, 68, 0.5)",
            borderRadius: 20,
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div style={{ fontSize: 36 }}>🎯</div>
          <div>
            <div style={{ fontSize: 20, color: "#f87171", fontWeight: 800 }}>TAHAP 1: UMPAN MURAH</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff" }}>
              Jual Ayam Rugi Rp 15.000 / Ekor
            </div>
          </div>
        </div>

        {/* Arrow Down */}
        <div style={{ fontSize: 32, color: "#38bdf8" }}>⬇️</div>

        {/* Step 2 */}
        <div
          style={{
            transform: `scale(${step2})`,
            opacity: step2,
            width: "100%",
            background: "rgba(30, 41, 59, 0.8)",
            border: "2px solid rgba(56, 189, 248, 0.5)",
            borderRadius: 20,
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div style={{ fontSize: 36 }}>🚶‍♂️</div>
          <div>
            <div style={{ fontSize: 20, color: "#38bdf8", fontWeight: 800 }}>TAHAP 2: TRAFIK MASUK TOKO</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff" }}>
              Ribuan Pembeli Datang ke Toko
            </div>
          </div>
        </div>

        {/* Arrow Down */}
        <div style={{ fontSize: 32, color: "#10b981" }}>⬇️</div>

        {/* Step 3 */}
        <div
          style={{
            transform: `scale(${step3})`,
            opacity: step3,
            width: "100%",
            background: "rgba(30, 41, 59, 0.95)",
            border: "3px solid #10b981",
            borderRadius: 20,
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            gap: 20,
            boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
          }}
        >
          <div style={{ fontSize: 36 }}>💰</div>
          <div>
            <div style={{ fontSize: 20, color: "#34d399", fontWeight: 800 }}>TAHAP 3: MERAUP KEUNTUNGAN</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: "#10b981" }}>
              Profit Bersih Rp 120.000 / Keranjang!
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ========================================================
// SCENE 4 IMPLEMENTATION
// ========================================================
const ShortScene4: React.FC = () => {
  const frame = useCurrentFrame();

  const bounceCTA = 1 + Math.sin(frame * 0.15) * 0.05;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "160px 50px",
        background: "radial-gradient(circle at 50% 30%, rgba(239, 68, 68, 0.2) 0%, rgba(3, 7, 18, 1) 80%)",
      }}
    >
      {/* Top Header Badge */}
      <div
        style={{
          background: "rgba(245, 158, 11, 0.2)",
          border: "2px solid #f59e0b",
          padding: "12px 28px",
          borderRadius: 9999,
          color: "#fbbf24",
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          boxShadow: "0 0 25px rgba(245, 158, 11, 0.3)",
          marginBottom: 36,
        }}
      >
        💬 TANYA KOMENTAR
      </div>

      <div
        style={{
          fontSize: 52,
          fontWeight: 900,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          marginBottom: 50,
          maxWidth: 900,
        }}
      >
        PRODUK APA YANG BIKIN KAMU <span style={{ color: "#f87171" }}>TERGODA?</span>
      </div>

      {/* Interactive Options Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%", maxWidth: 840 }}>
        {["🍗 Ayam Panggang Diskon", "🥛 Susu Segar Murah", "☕ Kopi Beli 1 Gratis 1"].map((text, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(30, 41, 59, 0.8)",
              border: "2px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 20,
              padding: "20px 30px",
              fontSize: 32,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{text}</span>
            <span style={{ fontSize: 24, color: "#94a3b8" }}>PILIH DI KOMEN ✍️</span>
          </div>
        ))}
      </div>

      {/* Subscribe Button (Shorts Style) */}
      <div
        style={{
          marginTop: 60,
          transform: `scale(${bounceCTA})`,
          background: "#ef4444",
          color: "#ffffff",
          padding: "20px 48px",
          borderRadius: 9999,
          fontSize: 34,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: "0 10px 40px rgba(239, 68, 68, 0.6)",
          textTransform: "uppercase",
          letterSpacing: "0.03em",
        }}
      >
        <span>🔔</span>
        <span>SUBSCRIBE SEKARANG</span>
      </div>
    </AbsoluteFill>
  );
};
