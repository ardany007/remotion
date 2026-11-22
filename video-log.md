# Video Log Channel YouTube (Anti-Repetisi)
*File ini mencatat entri 1 s/d 15 untuk memastikan rotasi hook, kerangka narasi, gaya visual, dan variasi konten aman kebijakan YouTube Partner Program (YPP).*

---

## Entri #1: Bagaimana Jika Semua Es di Bumi Mencair Dalam Semalam?
* **Tanggal:** 2026-11-22
* **Format:** Long-Form 16:9 Landscape (1920x1080), 30 fps
* **Komposisi Remotion:** `IceMelt` (`src/videos/ice-melt/IceMeltVideo.tsx`)
* **Total Frame / Durasi:** 14.652 frames (~488,4 detik / ~8,1 menit Final Master ElevenLabs)
* **Tipe Hook:** Skenario Pengandaian (*"Bayangkan kalau besok pagi kamu bangun, dan seluruh lapisan es di kutub lenyap total..."*)
* **Kerangka Cerita:** Eksperimen "What-If" & Rantai Efek Sebab-Akibat Berjenjang (Air Laut $\rightarrow$ Kerak Bumi $\rightarrow$ Rotasi Bumi $\rightarrow$ Arus Samudra AMOC $\rightarrow$ Permafrost)
* **Gaya Visual:** Flat Motion Graphic Topografi Geofisika, diagram cross-section kerak bumi, kinetic formula display, dan particle glow.
  - Palet Warna: Navy (`#050914`), Arctic Cyan (`#38BDF8`), Warning Red (`#EF4444`), Magma Orange (`#F97316`), Methane Green (`#10B981`).
* **Komponen Baru:**
  - `src/components/ice-melt/RotatingGlobe.tsx` (Globe vektor berputar dengan pelelehan lapisan es kutub)
  - `src/components/ice-melt/SeaLevelRise.tsx` (Simulasi banjir perkotaan +66m & hukum Archimedes)
  - `src/components/ice-melt/IsostaticRebound.tsx` (Kerak membal & dekompresi magma >100 gunung berapi)
  - `src/components/ice-melt/EarthRotationGauge.tsx` (Analogi atlet seluncur es, rumus momentum sudut $L=I\omega$, jam +ms)
  - `src/components/ice-melt/OceanConveyorMap.tsx` (Peta sabuk arus laut Atlantik AMOC mogok & pembekuan Eropa)
  - `src/components/ice-melt/PermafrostMethane.tsx` (Pelepasan gas $CH_4$ permafrost & kebangkitan virus purba)
  - `src/components/ice-melt/IceMeltSubtitleBar.tsx` (Subtitle kinetik pop-in dengan safe area zona bawah)
  - `src/theme/iceMeltTheme.ts`
* **Audio & Musik:**
  - **Voiceover:** Preview draft dibuat via `scripts/generate_ice_melt_audio.mjs` (`edge-tts` suara `id-ID-ArdiNeural`). Siap di-switch ke ElevenLabs saat render final.
  - **Backsound Orisinal:** `public/music/ice-melt-bgm.mp3` (disintesis via kode `scripts/synthesize_ice_melt_bgm.py`, Sci-Fi Tension Ambient D-minor 72 BPM dengan auto-ducking volume 12%).
* **Verifikasi Sains:**
  1. Kenaikan laut ~66–70m: *USGS*.
  2. Post-glacial isostatic rebound & dekompresi magma: *Nature Geoscience & USGS*.
  3. Perlambatan rotasi bumi / momen inersia: *NASA JPL & Science Advances*.
  4. Runtuhnya konveyor samudra AMOC: *IPCC AR6 & Nature Climate Change*.
  5. Cadangan karbon permafrost 1.500 miliar ton: *NOAA Arctic Report Card*.
* **Untuk Video Berikutnya HINDARI:**
  - **Tipe Hook:** Skenario Pengandaian ("Bayangkan jika...") $\rightarrow$ *Wajib ganti ke tipe lain (misal: Pertanyaan Mengejutkan atau Fakta Kontra-Intuitif).*
  - **Kerangka:** Eksperimen "What-If" / Bencana Planet $\rightarrow$ *Wajib rotasi ke format lain (misal: Zoom Skala atau Mitos vs Fakta).*
  - **Tema:** Pencairan kutub / pemanasan global / kenaikan muka laut.
  - **Palet Warna:** Dominan Navy Blue dan Arctic Cyan.
* **Sisa Ide yang Belum Terpakai:**
  - *Ide A (Zoom Skala):* Kamu Sebenarnya Tidak Pernah Menyentuh Apapun (Fisika Kuantum & Biologi Kulit)
  - *Ide B (Misteri Terungkap):* Apakah Waktu Itu Nyata Atau Cuma Ilusi Otak Kita? (Entropi, Relativitas, & Block Universe)
