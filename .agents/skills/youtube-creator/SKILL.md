---
name: youtube-creator
description: >-
  Panduan dan alur kerja komprehensif untuk merancang ide, menulis naskah sains populer berbahasa Indonesia,
  memproduksi animasi motion graphic dengan Remotion (Shorts 1080x1920 & video panjang), membuat backsound orisinal,
  dan mencatat log anti-repetisi sesuai kebijakan YouTube Partner Program (YPP). Gunakan skill ini saat merancang ide,
  membuat naskah, atau memprogram video di channel YouTube.
---

# YouTube Creator & Remotion Workflow

Pedoman lengkap pembuatan konten YouTube (Shorts dan video panjang) yang ramah monetisasi YouTube Partner Program (YPP), berbasis sains akurat, visual flat motion graphic kinetik di Remotion, dan sistem ketat anti-repetisi.

---

## 1. Tujuan & Kebijakan Monetisasi (YPP)

- **Target**: Channel YouTube untuk monetisasi YPP (Shorts dan video panjang).
- **Integritas Konten**:
  - Semua ide, naskah, dan metadata harus aman terhadap kebijakan YouTube / YPP.
  - Wajib konten asli (original), bukan daur ulang (reused content), bukan hasil produksi massal ber-template (repetitious content).
  - Tanpa klaim menyesatkan (misleading claims) dan tanpa pelanggaran hak cipta.
  - Jika ragu terhadap aturan tertentu, lakukan riset ke sumber resmi YouTube dan sebutkan rujukannya.

---

## 2. Gaya Konten & Bahasa

- **Bahasa**: Bahasa Indonesia santai, jelas, dan akurat secara ilmiah.
- **Struktur Alur**:
  1. **Hook kuat**: 1-2 detik pertama (harus langsung memikat perhatian).
  2. **Penjelasan singkat**: Inti pesan/sains yang padat, mudah dipahami, tanpa bertele-tele.
  3. **Penutup penasaran**: Ending yang memancing rasa penasaran / diskusi penonton.
- **Gaya Visual (Sejak 2026-11-19)**:
  - Motion graphic flat vektor + teks kinetik.
  - **BUKAN** diorama miniatur stop motion (video lama tidak perlu diubah).
  - Tanpa aset eksternal yang memiliki hak cipta.

---

## 3. Aturan Wajib: Anti-Repetisi

Setiap video harus terasa unik dan berbeda dari video-video sebelumnya, namun tetap mempertahankan identitas channel yang konsisten. Variasi diterapkan di 4 level:

1. **Prompt / Permintaan**: Variasikan sudut pandang narator dan urutan penyampaian informasi.
2. **Kerangka Cerita**: Rotasi format narasi, misalnya:
   - Mitos vs Fakta
   - Eksperimen "Bagaimana Jika" (*What If*)
   - Sebab - Akibat
   - Perbandingan dua objek / fenomena
   - Hitung mundur (*Countdown*)
   - Zoom skala (dari mikro ke makro atau sebaliknya)
   - Misteri terungkap
3. **Tipe Hook**: **DILARANG** memakai tipe hook yang sama dua kali berturut-turut. Rotasi:
   - Pertanyaan mengejutkan
   - Pernyataan kontra-intuitif
   - Fakta angka mengejutkan
   - Skenario pengandaian ("Bayangkan jika...")
   - Tebak-tebakan langsung
   - Kutipan salah kaprah
4. **Gaya Video**: Variasikan ritme tempo, pergerakan kamera, palet warna, jenis transisi, gaya subtitle, dan mood backsound.

### Prosedur Anti-Repetisi:
* Sebelum merancang atau mengusulkan ide/naskah baru, **wajib membaca log video** (`video-log.md` dan `video-log-lanjutan.md`).
* Hindari tema, hook, dan kerangka yang mirip dengan entri sebelumnya.
* Akhiri setiap output perencanaan dengan ringkasan kombinasi (Hook, Kerangka, Gaya Visual) dan catat di log.

---

## 4. Format Output untuk Setiap Ide / Naskah

Sajikan dengan singkat, padat, dan langsung:
1. **Judul**
2. **Hook (1-2 detik)**
3. **Naskah Narasi per Adegan**: Lengkap dengan penanda waktu (*timestamp / cues*).
4. **Ide Visual**: Deskripsi elemen visual, teks kinetik, dan komposisi.
5. **Deskripsi & Tag**: Metadata SEO YouTube yang aman dan relevan.
6. **Verifikasi Sains**: Tandai fakta sains yang perlu diverifikasi, sertakan sumber ilmiah/resmi.
7. **Ringkasan Anti-Repetisi**: Kombinasi hook, kerangka, dan gaya visual yang dipakai.

> *Catatan*: Jika permintaan pengguna kurang jelas, ajukan **maksimal SATU pertanyaan klarifikasi**.

---

## 5. Alur Kerja Produksi (Workflow)

1. **Ideasi**: Usulkan beberapa opsi ide baru (pastikan terhindar dari ide yang sudah dipakai/ditolak di log). Tunggu pengguna memilih satu.
2. **Paket Naskah**: Tulis naskah lengkap (Judul, hook, narasi adegan, visual, deskripsi, tag, fakta verifikasi).
3. **Implementasi Remotion**:
   - Bangun kode video di Remotion (Modular, TypeScript, React).
   - Lakukan `typecheck` untuk memastikan tidak ada error.
   - Buat musik latar (backsound) orisinal via sintesis kode dengan mood spesifik dan ducking otomatis.
   - **Render beberapa still frame** untuk meminta persetujuan visual pengguna. **JANGAN** langsung render video penuh.
4. **Pencatatan Log & Pelaporan**:
   - Catat video baru ke file log.
   - Laporkan ke pengguna secara ringkas: status pemasangan, lokasi file audio, estimasi durasi, fakta yang perlu dicek, serta ringkasan anti-repetisi.

---

## 6. Standar Teknis (Remotion, TypeScript, React)

- **Format & Dimensi**:
  - Shorts: `1080 x 1920` (vertikal 9:16), `30 fps`.
  - **Jangan pernah menimpa file video lama**.
- **Struktur Kode Modular**:
  - Konfigurasi tema: `src/lib/theme.tsx` (preset tema, `TransitionKind`, `SubtitleStyle`, `themes`).
  - Transisi: `src/lib/transitions.ts` & transisi DOM-only kustom (misal `src/lib/blok.tsx`, `src/lib/lingkar.tsx`).
  - Subtitle: `src/components/Subtitles.tsx` (area aman zona vertikal $y \approx 1250 - 1500$, hindari teks penting di sana).
  - Registry composition: `src/Root.tsx`.
- **Manajemen Audio & Timing**:
  - Estimasi frame naskah: `src/lib/cues.ts` (`buildCues`: estimasi dari panjang kalimat, diskalakan ke panjang audio; `AUDIO_SEC` = ukuran file mp3 / 16000 detik asumsi 128 kbps). Ingatkan pengguna bahwa ini adalah estimasi.
  - Komponen musik: `src/lib/Backsound.tsx` (prop `src`, `speech`, ducking otomatis). File mp3 di `public/music/`.
- **Panggung Visual Flat**:
  - Folder `components/datar/*` (Datar, Kinetik: Slam, Tile, Coret).
  - Folder `components/efek/*` (Glow, Kerlip, Latar, Malam, Pendar).
- **Struktur Folder Video Baru**:
  - Letakkan di `src/videos/<nama-video>/` berisi `script.ts`, `scenes.tsx`, dan komponen utama.
  - Daftarkan `Composition` di `src/Root.tsx`.
- **Pratinjau Still Frame**:
  - Gunakan font lokal (misal fallback DejaVu) saat render still jika Google Fonts bermasalah.
  - Render still frame: `npx remotion still <CompositionName> out.png --frame=<N> --overwrite`.

---

## 7. Sistem Log Video (`video-log.md`)

- **`video-log.md`**: Untuk entri 1 s/d 15.
- **`video-log-lanjutan.md`**: Untuk entri 16 dan seterusnya.
- **Format Tiap Entri**:
  - Judul Video
  - Nama Komposisi Remotion (`Composition`)
  - Tipe Hook
  - Kerangka Narasi
  - Gaya Visual & Palet Warna
  - Komponen Baru yang Dibuat
  - Fakta yang Perlu Dicek & Sumber
  - **"Untuk video berikutnya HINDARI"**: Catatan pola/elemen yang tidak boleh dipakai berurutan.
  - Sisa Ide yang Belum Terpakai

---

## 8. Preferensi Khusus Pengguna

- **Topik yang Ditolak Permanen**:
  - *"Kenapa suaramu terdengar aneh di rekaman?"* (JANGAN disarankan lagi).
  - *"Kenapa kita tidak bisa menggelitik diri sendiri?"* (JANGAN disarankan lagi).
  - Tidak tertarik dengan topik *pareidolia*.
- **Backsound**: Wajib orisinal buatan sendiri, mood berbeda tiap video.
- **Visual**: Hindari bentuk diorama. Prioritaskan motion graphic yang menarik (glow, parallax, partikel, camera drift/kinetic movement).
- **Review Workflow**: Selalu tunjukkan still frame untuk persetujuan visual sebelum melangkah lebih jauh.
