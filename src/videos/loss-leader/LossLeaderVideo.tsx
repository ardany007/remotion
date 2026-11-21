import React from "react";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { CameraDrift } from "../../components/common/CameraDrift";
import { AnimatedReceipt } from "../../components/loss-leader/AnimatedReceipt";
import { StorePathMap } from "../../components/loss-leader/StorePathMap";
import { Background } from "../../components/finance/Background";
import { ChapterBadge } from "../../components/finance/ChapterBadge";
import { ComparisonCard } from "../../components/finance/ComparisonCard";
import { KineticHeadline } from "../../components/finance/KineticHeadline";
import { MetricCounter } from "../../components/finance/MetricCounter";
import { SubtitleBar } from "../../components/finance/SubtitleBar";
import { lossLeaderTiming } from "../../data/lossLeaderTiming";
import { financeTheme } from "../../theme/financeTheme";

export const LossLeaderVideo: React.FC = () => {
  const { scenes } = lossLeaderTiming;

  return (
    <AbsoluteFill style={{ backgroundColor: financeTheme.colors.bgDark }}>
      {/* Backsound Musik Latar (Volume 12% agar narasi tetap jernih) */}
      <Audio
        src={staticFile("music/loss-leader-bgm.mp3")}
        volume={0.12}
        loop
      />

      <Series>
        {/* ========================================================
            SCENE 1: HOOK - PARADOKS AYAM PANGGANG (Cinematic Zoom In)
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.scene1.frames}>
          <Audio src={staticFile("vo/scene1.mp3")} volume={1} />
          <Background glowColor="rgba(245, 158, 11, 0.25)" />
          <ChapterBadge chapter="PROLOG" title="PARADOKS PRODUK MURAH" color={financeTheme.colors.gold} />

          <CameraDrift type="zoom-in" intensity={0.07}>
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 80px 100px 80px",
                gap: 32,
              }}
            >
              <KineticHeadline
                tag="BEDAH STRATEGI RITEL"
                mainText="Mengapa Supermarket Sengaja Jual"
                highlightedText="Ayam Panggang Lebih Murah Dari Ayam Mentah?"
                subtitle="Mereka sengaja rugi miliaran rupiah demi meraup triliunan keuntungan."
                highlightColor={financeTheme.colors.gold}
              />

              {/* Perbandingan Harga Kontras */}
              <div style={{ display: "flex", gap: 36, marginTop: 10 }}>
                <div
                  style={{
                    background: financeTheme.colors.bgCard,
                    border: `1.5px solid ${financeTheme.colors.borderCard}`,
                    borderRadius: 20,
                    padding: "22px 38px",
                    textAlign: "center",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <span style={{ fontSize: 16, color: financeTheme.colors.textSecondary, fontWeight: 600 }}>
                    Ayam Mentah di Pasar
                  </span>
                  <div style={{ fontSize: 38, fontWeight: 800, color: "#cbd5e1", marginTop: 4 }}>
                    Rp 65.000 <span style={{ fontSize: 16 }}>/kg</span>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(239, 68, 68, 0.16)",
                    border: `2px solid ${financeTheme.colors.red}`,
                    borderRadius: 20,
                    padding: "22px 38px",
                    textAlign: "center",
                    boxShadow: `0 0 35px ${financeTheme.colors.redGlow}, 0 20px 40px rgba(0, 0, 0, 0.5)`,
                  }}
                >
                  <span style={{ fontSize: 16, color: "#fca5a5", fontWeight: 800 }}>
                    Ayam Panggang Matang (Toko)
                  </span>
                  <div style={{ fontSize: 38, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
                    Rp 50.000 <span style={{ fontSize: 16, color: "#f87171" }}>(Sengaja Rugi -15%)</span>
                  </div>
                </div>
              </div>
            </AbsoluteFill>
          </CameraDrift>

          <SubtitleBar cues={scenes.scene1.subtitles} />
        </Series.Sequence>

        {/* ========================================================
            SCENE 2: KONSEP STRATEGI LOSS LEADER (Cinematic Pan Right)
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.scene2.frames}>
          <Audio src={staticFile("vo/scene2.mp3")} volume={1} />
          <Background glowColor="rgba(56, 189, 248, 0.22)" />
          <ChapterBadge chapter="1" title="MEKANISME LOSS LEADER" color={financeTheme.colors.blue} />

          <CameraDrift type="pan-right" intensity={0.06}>
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 80px 100px 80px",
                gap: 40,
              }}
            >
              <KineticHeadline
                tag="PRINSIP DASAR EKONOMI"
                mainText="Strategi 'Loss Leader':"
                highlightedText="Jual Rugi Demi Memancing Trafik Konsumen"
                subtitle="Satu produk murah dijadikan umpan untuk memicu transaksi bernilai tinggi."
                highlightColor={financeTheme.colors.blue}
              />

              {/* Alur 3 Langkah Loss Leader */}
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div
                  style={{
                    background: financeTheme.colors.bgCard,
                    border: `1.5px solid ${financeTheme.colors.red}`,
                    borderRadius: 20,
                    padding: "26px 34px",
                    textAlign: "center",
                    maxWidth: 320,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 900, color: financeTheme.colors.red }}>LANGKAH 1</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", marginTop: 8 }}>
                    Produk Umpan Murah
                  </div>
                  <div style={{ fontSize: 13, color: financeTheme.colors.textSecondary, marginTop: 4 }}>
                    Harga di bawah modal (Margin Negatif)
                  </div>
                </div>

                <span style={{ fontSize: 32, color: financeTheme.colors.blue, fontWeight: 900 }}>➔</span>

                <div
                  style={{
                    background: financeTheme.colors.bgCard,
                    border: `1.5px solid ${financeTheme.colors.blue}`,
                    borderRadius: 20,
                    padding: "26px 34px",
                    textAlign: "center",
                    maxWidth: 320,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 900, color: financeTheme.colors.blue }}>LANGKAH 2</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", marginTop: 8 }}>
                    Trafik Konsumen Masuk
                  </div>
                  <div style={{ fontSize: 13, color: financeTheme.colors.textSecondary, marginTop: 4 }}>
                    Ribuan orang melangkah masuk ke dalam toko
                  </div>
                </div>

                <span style={{ fontSize: 32, color: financeTheme.colors.green, fontWeight: 900 }}>➔</span>

                <div
                  style={{
                    background: financeTheme.colors.bgCard,
                    border: `1.5px solid ${financeTheme.colors.green}`,
                    borderRadius: 20,
                    padding: "26px 34px",
                    textAlign: "center",
                    maxWidth: 320,
                    boxShadow: `0 0 30px ${financeTheme.colors.greenGlow}, 0 20px 40px rgba(0, 0, 0, 0.5)`,
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 900, color: financeTheme.colors.green }}>LANGKAH 3</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", marginTop: 8 }}>
                    Laba Bersih Meroket
                  </div>
                  <div style={{ fontSize: 13, color: financeTheme.colors.textSecondary, marginTop: 4 }}>
                    Barang pelengkap margin 70% terbeli
                  </div>
                </div>
              </div>
            </AbsoluteFill>
          </CameraDrift>

          <SubtitleBar cues={scenes.scene2.subtitles} />
        </Series.Sequence>

        {/* ========================================================
            SCENE 3: BEDAH STRUK BELANJA ASLI (Laser + Stamp Effect)
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.scene3.frames}>
          <Audio src={staticFile("vo/scene3.mp3")} volume={1} />
          <Background glowColor={financeTheme.colors.greenGlow} />
          <ChapterBadge chapter="2" title="ANATOMI STRUK BELANJA" color={financeTheme.colors.green} />

          <CameraDrift type="zoom-in" intensity={0.06}>
            <AbsoluteFill
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 100px 100px 100px",
                gap: 60,
              }}
            >
              {/* Struk Kasir Animasi Interaktif */}
              <AnimatedReceipt />

              {/* Metrik Nilai Keranjang */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
                <MetricCounter
                  label="Total Belanjaan Konsumen"
                  value={155000}
                  prefix="Rp "
                  suffix=""
                  trendPercent={210}
                  trendLabel="Lonjakan Basket Size"
                  subtitle="Niat awal hanya beli ayam Rp 50.000, pulang habis Rp 155.000"
                  delay={20}
                />

                <div
                  style={{
                    background: "rgba(16, 185, 129, 0.12)",
                    border: `1.5px solid ${financeTheme.colors.green}60`,
                    borderRadius: 20,
                    padding: "24px 28px",
                    boxShadow: `0 0 25px ${financeTheme.colors.greenGlow}`,
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 800, color: financeTheme.colors.green }}>
                    KUNCI STRATEGI RITEL:
                  </div>
                  <p style={{ margin: "8px 0 0 0", fontSize: 15, color: financeTheme.colors.textPrimary, lineHeight: 1.5 }}>
                    Toko rela rugi Rp 7.500 di ayam panggang, karena otomatis menjual saus, minuman, dan snack dengan keuntungan bersih lebih dari Rp 68.000!
                  </p>
                </div>
              </div>
            </AbsoluteFill>
          </CameraDrift>

          <SubtitleBar cues={scenes.scene3.subtitles} />
        </Series.Sequence>

        {/* ========================================================
            SCENE 4: PSIKOLOGI TATA LETAK TOKO (Moving Cart on Path)
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.scene4.frames}>
          <Audio src={staticFile("vo/scene4.mp3")} volume={1} />
          <Background glowColor="rgba(245, 158, 11, 0.18)" />
          <ChapterBadge chapter="3" title="PSIKOLOGI DENAH TOKO" color={financeTheme.colors.gold} />

          <CameraDrift type="zoom-in" intensity={0.05}>
            <AbsoluteFill
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 80px 100px 80px",
              }}
            >
              <StorePathMap />
            </AbsoluteFill>
          </CameraDrift>

          <SubtitleBar cues={scenes.scene4.subtitles} />
        </Series.Sequence>

        {/* ========================================================
            SCENE 5: CONTOH DI INDUSTRI TEKNOLOGI (Cinematic Pan Left)
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.scene5.frames}>
          <Audio src={staticFile("vo/scene5.mp3")} volume={1} />
          <Background glowColor="rgba(168, 85, 247, 0.22)" />
          <ChapterBadge chapter="4" title="CONTOH INDUSTRI LAIN" color={financeTheme.colors.purple} />

          <CameraDrift type="pan-left" intensity={0.06}>
            <AbsoluteFill
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 80px 100px 80px",
              }}
            >
              <ComparisonCard
                leftTitle="Perangkat Keras (Hardware)"
                leftSubtitle="Sengaja dijual tanpa margin atau rugi demi penetrasi pasar"
                leftPoints={[
                  "Printer rumahan dijual sangat murah di bawah biaya riset",
                  "Konsol PlayStation & Xbox sering dijual impas saat peluncuran",
                  "Tujuan utama: Mengunci konsumen ke dalam ekosistem produk",
                ]}
                rightTitle="Konsumsi Berulang (Consumables)"
                rightSubtitle="Mesin uang berulang dengan margin keuntungan raksasa"
                rightPoints={[
                  "Tinta isi ulang printer memiliki margin laba di atas 80%",
                  "Penjualan kaset game & royalti lisensi developer 30%",
                  "Langganan game pass bulanan menghasilkan arus kas stabil",
                ]}
              />
            </AbsoluteFill>
          </CameraDrift>

          <SubtitleBar cues={scenes.scene5.subtitles} />
        </Series.Sequence>

        {/* ========================================================
            SCENE 6: KESIMPULAN & CALL TO ACTION (Cinematic Zoom In)
            ======================================================== */}
        <Series.Sequence durationInFrames={scenes.scene6.frames}>
          <Audio src={staticFile("vo/scene6.mp3")} volume={1} />
          <Background glowColor={financeTheme.colors.greenGlow} />
          <ChapterBadge chapter="KESIMPULAN" title="PELAJARAN FINANSIAL" color={financeTheme.colors.green} />

          <CameraDrift type="zoom-in" intensity={0.08}>
            <AbsoluteFill
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 80px 100px 80px",
              }}
            >
              <KineticHeadline
                tag="PRINSIP UTAMA BISNIS"
                mainText="Rela Kehilangan Bidak Kecil"
                highlightedText="Untuk Memenangkan Papan Catur Besar"
                subtitle="Produk umpan apa yang paling sering membuatmu tergoda belanja? Tulis di komentar, dan subscribe untuk strategi bisnis berikutnya!"
                highlightColor={financeTheme.colors.green}
              />
            </AbsoluteFill>
          </CameraDrift>

          <SubtitleBar cues={scenes.scene6.subtitles} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
