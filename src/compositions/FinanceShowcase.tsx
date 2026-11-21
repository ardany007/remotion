import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { AnimatedBarChart } from "../components/finance/AnimatedBarChart";
import { Background } from "../components/finance/Background";
import { ChapterBadge } from "../components/finance/ChapterBadge";
import { ComparisonCard } from "../components/finance/ComparisonCard";
import { KineticHeadline } from "../components/finance/KineticHeadline";
import { MetricCounter } from "../components/finance/MetricCounter";
import { financeTheme } from "../theme/financeTheme";

export const FinanceShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: financeTheme.colors.bgDark }}>
      <Series>
        {/* Scene 1: Hook Pembuka (4 Detik / 120 frames) */}
        <Series.Sequence durationInFrames={120}>
          <Background glowColor={financeTheme.colors.greenGlow} />
          <ChapterBadge chapter="1" title="ANATOMI ARUS KAS" />
          <AbsoluteFill
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 80px",
            }}
          >
            <KineticHeadline
              tag="STUDI KASUS FINANSIAL"
              mainText="Bagaimana Brand Ritel Menguasai"
              highlightedText="Miliaran Dolar Arus Kas Bebas Bunga"
              subtitle="Membedah strategi cerdas di balik perputaran modal raksasa korporasi dunia."
              highlightColor={financeTheme.colors.green}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* Scene 2: Metrik Finansial Bergerak (5 Detik / 150 frames) */}
        <Series.Sequence durationInFrames={150}>
          <Background glowColor="rgba(245, 158, 11, 0.2)" />
          <ChapterBadge chapter="2" title="AKUMULASI DANA MENGENDAP" color={financeTheme.colors.gold} />
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 48,
              padding: "0 80px",
            }}
          >
            <MetricCounter
              label="Dana Mengendap (Float Cash)"
              value={1600}
              prefix="$"
              suffix=" Juta"
              trendPercent={24.8}
              trendLabel="YoY"
              subtitle="Saldo customer yang belum dibelanjakan (bebas bunga)"
              delay={0}
            />
            <MetricCounter
              label="Margin Laba Modal Kas"
              value={84}
              prefix=""
              suffix="%"
              trendPercent={12.4}
              trendLabel="Efisiensi"
              subtitle="Likuiditas instan untuk ekspansi tanpa hutang bank"
              delay={10}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* Scene 3: Grafik Batang Pertumbuhan (6 Detik / 180 frames) */}
        <Series.Sequence durationInFrames={180}>
          <Background glowColor="rgba(56, 189, 248, 0.2)" />
          <ChapterBadge chapter="3" title="KOMPOSISI SUMBER LABA" color={financeTheme.colors.blue} />
          <AbsoluteFill
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AnimatedBarChart
              title="Perbandingan Margin per Lini Bisnis (%)"
              subtitle="Mengapa pendapatan finansial melampaui penjualan produk fisik tradisional"
              items={[
                { label: "Produk Fisik", value: 18, displayValue: "18%", color: "#64748b" },
                { label: "Royalti Waralaba", value: 38, displayValue: "38%", color: "#0284c7" },
                { label: "Langganan / Digital", value: 62, displayValue: "62%", color: "#818cf8" },
                {
                  label: "Floating Saldo",
                  value: 85,
                  displayValue: "85%",
                  highlighted: true,
                },
              ]}
              width={1000}
              height={400}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* Scene 4: Perbandingan Model Bisnis (5 Detik / 150 frames) */}
        <Series.Sequence durationInFrames={150}>
          <Background glowColor={financeTheme.colors.greenGlow} />
          <ChapterBadge chapter="4" title="PERBANDINGAN STRATEGI" />
          <AbsoluteFill
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 80px",
            }}
          >
            <ComparisonCard
              leftTitle="Model Bisnis Moneter Modern"
              leftSubtitle="Arus kas positif di muka (Customer membayar sebelum konsumsi)"
              leftPoints={[
                "Modal kerja gratis dari saldo customer",
                "Arus kas instan dan bebas bunga pinjaman bank",
                "Risiko piutang / bad debt mendekati nol",
              ]}
              rightTitle="Model Ritel Tradisional"
              rightSubtitle="Bergantung pada perputaran stok barang fisik"
              rightPoints={[
                "Beban bunga pinjaman modal kerja tinggi",
                "Margin tergerus depresiasi dan biaya gudang",
                "Perputaran kas lambat (siklus tagihan 30-60 hari)",
              ]}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* Scene 5: Outro & Call to Action (4 Detik / 120 frames) */}
        <Series.Sequence durationInFrames={120}>
          <Background glowColor="rgba(168, 85, 247, 0.25)" />
          <AbsoluteFill
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 80px",
            }}
          >
            <KineticHeadline
              tag="ANALISIS BISNIS & FINANSIAL"
              mainText="Ingin Membedah Rahasia Finansial Lainnya?"
              highlightedText="Like & Subscribe untuk Analisis Mendalam"
              subtitle="Tuliskan di kolom komentar: Brand korporasi mana yang ingin dibedah berikutnya?"
              highlightColor={financeTheme.colors.purple}
            />
          </AbsoluteFill>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
