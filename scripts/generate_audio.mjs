import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// Muat .env jika ada (Node.js 20+)
const envPath = join(process.cwd(), ".env");
if (existsSync(envPath) && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(envPath);
}

const FPS = 30;
const PADDING_SECONDS = 0.8;

// Cek argumen CLI: --elevenlabs atau --edge
const args = process.argv.slice(2);
const forceElevenLabs = args.includes("--elevenlabs") || args.includes("-eleven");
const forceEdge = args.includes("--edge");

const elevenApiKey = process.env.ELEVENLABS_API_KEY;
const elevenVoiceId = process.env.ELEVENLABS_VOICE_ID;

let useElevenLabs = false;
if (forceElevenLabs) {
  if (!elevenApiKey || !elevenVoiceId) {
    console.error("\n❌ ERROR: Mode --elevenlabs dipilih, tetapi ELEVENLABS_API_KEY atau ELEVENLABS_VOICE_ID belum disetel!");
    console.error("👉 Silakan buat file .env di root proyek dengan format:");
    console.error("   ELEVENLABS_API_KEY=kunci_anda");
    console.error("   ELEVENLABS_VOICE_ID=voice_id_pilihan\n");
    process.exit(1);
  }
  useElevenLabs = true;
} else if (!forceEdge && elevenApiKey && elevenVoiceId) {
  // Jika tidak dipaksa edge dan ada key di env, beri info
  useElevenLabs = false; // Tetap default ke Edge agar hemat kredit kecuali user minta --elevenlabs
}

console.log("\n========================================================");
if (useElevenLabs) {
  console.log("🎙️  MODE: FINAL MASTER (ELEVENLABS AI)");
  console.log("⚡ Menghasilkan audio ekspresif kualitas studio (memakai kredit ElevenLabs).");
} else {
  console.log("🎧 MODE: PREVIEW DRAFT (EDGE-TTS)");
  console.log("💡 100% GRATIS & Bebas Kredit. Cocok untuk cek timing, teks & visual.");
}
console.log("========================================================\n");

const scenes = [
  {
    id: "scene1",
    title: "Hook: Paradoks Ayam Panggang",
    text: "Pernahkah kamu berpikir, bagaimana mungkin supermarket menjual ayam panggang utuh seharga hanya lima puluh ribu rupiah, sementara ayam mentahnya sendiri lebih mahal? Apakah mereka rugi? Jawabannya: Ya, mereka sengaja rugi miliaran rupiah. Tapi di akhir bulan, mereka justru meraup triliunan keuntungan.",
  },
  {
    id: "scene2",
    title: "Konsep Loss Leader",
    text: "Dalam ilmu ekonomi, strategi ini disebut Loss Leader. Konsepnya sederhana: jadikan satu produk populer sebagai umpan dengan harga di bawah modal, hanya untuk satu tujuan: memaksa pembeli datang dan melangkahkan kaki ke dalam toko.",
  },
  {
    id: "scene3",
    title: "Bedah Struk Belanja",
    text: "Mari kita bedah struk belanja aslinya. Kamu berniat hanya membeli ayam murah seharga lima puluh ribu rupiah. Tapi saat di kasir, total strukmu melonjak menjadi dua ratus lima puluh ribu rupiah. Kenapa? Karena kamu menambahkan minuman bersoda, saus bumbu, dan camilan, yang semuanya memiliki margin keuntungan bersih hingga tujuh puluh persen!",
  },
  {
    id: "scene4",
    title: "Psikologi Tata Letak Toko",
    text: "Dan ini bukan kebetulan. Pernahkah kamu menyadari, produk murah seperti susu segar atau ayam panggang selalu diletakkan di sudut paling belakang toko? Supermarket sengaja memaksa kita melewati puluhan lorong berisi barang-barang mahal sebelum kita bisa meraih produk murah tersebut.",
  },
  {
    id: "scene5",
    title: "Contoh Ekstrim Lainnya",
    text: "Strategi ini tidak hanya ada di supermarket. Industri teknologi juga menggunakannya. Printer dijual sangat murah tanpa keuntungan, karena mereka tahu kamu terpaksa membeli tinta mahal selama bertahun-tahun. Konsol game sering dijual impas atau rugi, karena keuntungan aslinya ada di penjualan kaset game dan langganan bulanan.",
  },
  {
    id: "scene6",
    title: "Pelajaran Finansial & Penutup",
    text: "Pelajaran pentingnya: Dalam bisnis, terkadang kamu harus rela kehilangan bidak kecil untuk memenangkan papan catur yang besar. Produk umpan apa yang paling sering membuatmu tergoda belanja? Tulis di kolom komentar, dan jangan lupa subscribe untuk strategi bisnis berikutnya.",
  },
];

const voDir = join(process.cwd(), "public", "vo");
const musicDir = join(process.cwd(), "public", "music");
mkdirSync(voDir, { recursive: true });
mkdirSync(musicDir, { recursive: true });

function splitIntoShortPhrases(text, startFrame, endFrame, maxWords = 4) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) {
    return [{ text, startFrame, endFrame }];
  }

  const chunks = [];
  let current = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    current.push(word);
    const hasPunctuation = /[,.?!;:]$/.test(word);

    if (current.length >= maxWords || (current.length >= 3 && hasPunctuation) || i === words.length - 1) {
      chunks.push(current.join(" "));
      current = [];
    }
  }

  if (current.length > 0) {
    if (chunks.length > 0 && current.length <= 2) {
      chunks[chunks.length - 1] += " " + current.join(" ");
    } else {
      chunks.push(current.join(" "));
    }
  }

  const totalChars = chunks.reduce((acc, c) => acc + c.length, 0);
  const totalDuration = endFrame - startFrame;
  let currentStart = startFrame;
  const result = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const fraction = chunk.length / totalChars;
    const duration = Math.round(fraction * totalDuration);
    const currentEnd = i === chunks.length - 1 ? endFrame : currentStart + duration;

    result.push({
      text: chunk,
      startFrame: currentStart,
      endFrame: currentEnd,
    });

    currentStart = currentEnd;
  }

  return result;
}

function parseVttCues(vttContent, fps = 30) {
  const blocks = vttContent.trim().split(/\n\s*\n/);
  const rawCues = [];
  let maxEndSec = 0;

  for (const block of blocks) {
    const lines = block.trim().split("\n");
    const timeLine = lines.find((l) => l.includes("-->"));
    if (!timeLine) continue;

    const match = timeLine.match(/(\d{2}):(\d{2}):(\d{2})[.,](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[.,](\d{3})/);
    if (!match) continue;

    const startSec = parseInt(match[1], 10) * 3600 + parseInt(match[2], 10) * 60 + parseInt(match[3], 10) + parseInt(match[4], 10) / 1000;
    const endSec = parseInt(match[5], 10) * 3600 + parseInt(match[6], 10) * 60 + parseInt(match[7], 10) + parseInt(match[8], 10) / 1000;

    if (endSec > maxEndSec) maxEndSec = endSec;

    const timeIndex = lines.indexOf(timeLine);
    const text = lines.slice(timeIndex + 1).join(" ").trim();
    if (text) {
      rawCues.push({
        text,
        startFrame: Math.round(startSec * fps),
        endFrame: Math.round(endSec * fps),
      });
    }
  }

  const shortCues = [];
  for (const cue of rawCues) {
    const phrases = splitIntoShortPhrases(cue.text, cue.startFrame, cue.endFrame, 4);
    shortCues.push(...phrases);
  }

  return { cues: shortCues, maxEndSec };
}

const timingData = {};
let totalFrames = 0;

for (let i = 0; i < scenes.length; i++) {
  const scene = scenes[i];
  const audioFile = join(voDir, `${scene.id}.mp3`);
  const vttFile = join(voDir, `${scene.id}.vtt`);

  if (useElevenLabs) {
    console.log(`[${i + 1}/${scenes.length}] [ElevenLabs] Menghasilkan ${scene.title}...`);
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${elevenVoiceId}?output_format=mp3_44100_128`, {
      method: "POST",
      headers: { "xi-api-key": elevenApiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        text: scene.text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.35 },
      }),
    });
    if (!res.ok) {
      console.error(`❌ Gagal memanggil ElevenLabs baris ${i + 1}:`, await res.text());
      process.exit(1);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(audioFile, buf);

    // Hitung durasi presisi dari buffer CBR (128 kbps)
    const sec = (buf.length * 8) / (128 * 1000);
    const mins = Math.floor(sec / 60).toString().padStart(2, "0");
    const secs = Math.floor(sec % 60).toString().padStart(2, "0");
    const ms = Math.round((sec % 1) * 1000).toString().padStart(3, "0");
    const mockVtt = `1\n00:00:00.100 --> 00:${mins}:${secs}.${ms}\n${scene.text}\n`;
    writeFileSync(vttFile, mockVtt);
  } else {
    console.log(`[${i + 1}/${scenes.length}] [Edge-TTS Gratis] Menghasilkan ${scene.title}...`);
    const cmd = `/home/noob/.local/bin/edge-tts --voice id-ID-ArdiNeural --rate="+8%" --text "${scene.text}" --write-media "${audioFile}" --write-subtitles "${vttFile}"`;
    execSync(cmd, { stdio: "pipe" });
  }

  const vttContent = readFileSync(vttFile, "utf-8");
  const { cues, maxEndSec } = parseVttCues(vttContent, FPS);
  const totalSceneSeconds = maxEndSec + PADDING_SECONDS;
  const frames = Math.ceil(totalSceneSeconds * FPS);

  timingData[scene.id] = {
    title: scene.title,
    text: scene.text,
    durationSeconds: parseFloat(maxEndSec.toFixed(2)),
    frames,
    subtitles: cues,
  };

  totalFrames += frames;
}

// Tulis ke src/data/lossLeaderTiming.ts
const timingTsContent = `// DIBUAT OTOMATIS oleh scripts/generate_audio.mjs
export interface SubtitleCue {
  text: string;
  startFrame: number;
  endFrame: number;
}

export interface SceneTiming {
  title: string;
  text: string;
  durationSeconds: number;
  frames: number;
  subtitles: SubtitleCue[];
}

export const lossLeaderTiming = {
  fps: ${FPS},
  totalFrames: ${totalFrames},
  totalSeconds: ${(totalFrames / FPS).toFixed(1)},
  scenes: ${JSON.stringify(timingData, null, 2)} as Record<string, SceneTiming>,
};
`;

writeFileSync(join(process.cwd(), "src", "data", "lossLeaderTiming.ts"), timingTsContent);

console.log("\n========================================================");
console.log(`✅ SUKSES! Audio diperbarui.`);
console.log(`⏱️  Total durasi video: ${(totalFrames / FPS).toFixed(1)} detik (${totalFrames} frames)`);
console.log("========================================================\n");
