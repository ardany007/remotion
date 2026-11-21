import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const envPath = join(process.cwd(), ".env");
if (existsSync(envPath) && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(envPath);
}

const FPS = 30;
const PADDING_SECONDS = 0.5;

const args = process.argv.slice(2);
const forceElevenLabs = args.includes("--elevenlabs") || args.includes("-eleven");

const elevenApiKey = process.env.ELEVENLABS_API_KEY;
const elevenVoiceId = process.env.ELEVENLABS_VOICE_ID;

let useElevenLabs = false;
if (forceElevenLabs) {
  if (!elevenApiKey || !elevenVoiceId) {
    console.error("❌ ERROR: Mode --elevenlabs dipilih, tetapi ELEVENLABS_API_KEY atau ELEVENLABS_VOICE_ID belum disetel di .env!");
    process.exit(1);
  }
  useElevenLabs = true;
}

console.log("\n========================================================");
if (useElevenLabs) {
  console.log("🎙️  MODE SHORT: FINAL MASTER (ELEVENLABS AI)");
} else {
  console.log("🎧 MODE SHORT: PREVIEW (EDGE-TTS 100% GRATIS)");
}
console.log("========================================================\n");

const scenes = [
  {
    id: "short1",
    title: "Hook: Paradoks Ayam 50 Ribu",
    text: "Pernah mikir nggak, kenapa supermarket jual ayam panggang matang cuma lima puluh ribu rupiah, padahal ayam mentahnya lebih mahal?",
  },
  {
    id: "short2",
    title: "Kasir & Struk Belanja",
    text: "Jawabannya: Mereka sengaja rugi! Karena begitu kamu masuk, kamu nggak cuma beli ayam. Kamu comot saus, soda, dan camilan dengan margin untung tujuh puluh persen. Niat belanja lima puluh ribu, keluar kasir habis tiga ratus ribu rupiah!",
  },
  {
    id: "short3",
    title: "Strategi Loss Leader",
    text: "Di dunia bisnis, ini disebut strategi Loss Leader. Jadikan satu produk umpan dengan harga rugi, hanya agar kamu melangkahkan kaki dan memborong produk mahal lainnya.",
  },
  {
    id: "short4",
    title: "Call to Action",
    text: "Produk umpan apa yang paling sering bikin kamu boncos belanja? Tulis di komentar dan subscribe untuk trik bisnis lainnya!",
  },
];

const shortVoDir = join(process.cwd(), "public", "vo", "short");
mkdirSync(shortVoDir, { recursive: true });

function splitIntoShortPhrases(text, startFrame, endFrame, maxWords = 3) {
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

    if (current.length >= maxWords || hasPunctuation || i === words.length - 1) {
      chunks.push(current.join(" "));
      current = [];
    }
  }

  if (current.length > 0) {
    chunks.push(current.join(" "));
  }

  const totalChars = chunks.reduce((sum, c) => sum + c.length, 0);
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
    const phrases = splitIntoShortPhrases(cue.text, cue.startFrame, cue.endFrame, 3);
    shortCues.push(...phrases);
  }

  return { cues: shortCues, maxEndSec };
}

const timingData = {};
let totalFrames = 0;

for (let i = 0; i < scenes.length; i++) {
  const scene = scenes[i];
  const audioFile = join(shortVoDir, `${scene.id}.mp3`);
  const vttFile = join(shortVoDir, `${scene.id}.vtt`);

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
      console.error(`❌ Gagal memanggil ElevenLabs:`, await res.text());
      process.exit(1);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(audioFile, buf);

    const sec = (buf.length * 8) / (128 * 1000);
    const mins = Math.floor(sec / 60).toString().padStart(2, "0");
    const secs = Math.floor(sec % 60).toString().padStart(2, "0");
    const ms = Math.round((sec % 1) * 1000).toString().padStart(3, "0");
    const mockVtt = `1\n00:00:00.100 --> 00:${mins}:${secs}.${ms}\n${scene.text}\n`;
    writeFileSync(vttFile, mockVtt);
  } else {
    console.log(`[${i + 1}/${scenes.length}] [Edge-TTS Gratis] Menghasilkan ${scene.title}...`);
    const edgeTtsBin = existsSync("/home/noob/.local/bin/edge-tts") ? "/home/noob/.local/bin/edge-tts" : "edge-tts";
    const cmd = `${edgeTtsBin} --voice id-ID-ArdiNeural --rate="+12%" --text "${scene.text}" --write-media "${audioFile}" --write-subtitles "${vttFile}"`;
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

const timingTsContent = `// DIBUAT OTOMATIS oleh scripts/generate_short_audio.mjs
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

export const lossLeaderShortTiming = {
  fps: ${FPS},
  totalFrames: ${totalFrames},
  totalSeconds: ${(totalFrames / FPS).toFixed(1)},
  scenes: ${JSON.stringify(timingData, null, 2)} as Record<string, SceneTiming>,
};
`;

writeFileSync(join(process.cwd(), "src", "data", "lossLeaderShortTiming.ts"), timingTsContent);

console.log("\n========================================================");
console.log(`✅ SUKSES! Audio Short siap digunakan.`);
console.log(`⏱️  Total durasi Short: ${(totalFrames / FPS).toFixed(1)} detik (${totalFrames} frames)`);
console.log("========================================================\n");
