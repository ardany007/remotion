import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
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
    process.exit(1);
  }
  useElevenLabs = true;
} else if (!forceEdge && elevenApiKey && elevenVoiceId) {
  useElevenLabs = true; // User minta render final dengan elevenlabs
}

console.log("\n========================================================");
if (useElevenLabs) {
  console.log("🎙️  MODE: FINAL MASTER (ELEVENLABS AI)");
  console.log(`⚡ Menggunakan Voice ID: ${elevenVoiceId}`);
  console.log("⚡ Menghasilkan audio ekspresif kualitas studio + alignment presisi.");
} else {
  console.log("🎧 MODE: PREVIEW DRAFT (EDGE-TTS GRATIS)");
  console.log("💡 100% GRATIS & Bebas Kredit. Cocok untuk cek timing, teks & visual.");
}
console.log("========================================================\n");

const scenes = [
  {
    id: "scene1",
    title: "Hook & Hilangnya 28 Triliun Ton Es",
    text: "Bayangkan kalau besok pagi kamu bangun, dan seluruh lapisan es di kutub lenyap total. Kalau kamu pikir bahaya terbesarnya cuma air laut yang meluap dan bikin banjir bandang... kamu keliru besar. Di film-film fiksi ilmiah, mencairnya es kutub selalu digambarkan sebagai bencana air bah raksasa. Tapi dari sudut pandang fisika bumi dan geofisika, banjir itu cuma puncak gunung es dari apa yang sebenarnya bakal terjadi. Saat lebih dari dua puluh delapan triliun ton es di Greenland dan Antarktika berubah jadi air dalam semalam, kerak bumi bakal membal ke atas, puluhan gunung berapi purba meletus serentak, dan jam di ponselmu bahkan harus disetel ulang karena putaran bumi melambat. Kok bisa perpindahan es mengubah cara berputar dan berdirinya planet kita? Mari kita bongkar sains gilanya.",
  },
  {
    id: "scene2",
    title: "Tenggelamnya Pesisir & Naiknya Air Laut 66 Meter",
    text: "Hal pertama yang harus kita luruskan adalah: es jenis mana yang mencair? Kalau kamu melelehkan es batu di dalam segelas air penuh, airnya tidak akan tumpah. Itu hukum Archimedes dasar. Jadi, mencairnya es di Kutub Utara—yang sebagian besar adalah es laut mengapung—sebenarnya tidak banyak mengubah tinggi muka air laut. Masalah utamanya ada di Greenland dan Antarktika. Lapisan es di sana bukan mengapung di laut, melainkan duduk di atas daratan bebatuan raksasa dengan ketebalan rata-rata lebih dari dua kilometer! Begitu triliunan ton es daratan ini mencair dan mengalir ke samudra, permukaan laut global akan langsung melonjak setinggi enam puluh enam sampai tujuh puluh meter. Angka enam puluh enam meter itu setara dengan gedung bertingkat dua puluh. Kota-kota seperti Tokyo, New York, London, Singapura, sampai seluruh daratan Belanda bakal terhapus dari peta dunia. Di Indonesia, pantai utara Jawa, pesisir Sumatra, dan sebagian besar Kalimantan bakal berubah jadi terumbu karang baru di bawah laut. Lebih dari empat puluh persen populasi manusia di bumi langsung kehilangan tempat tinggal dalam hitungan jam.",
  },
  {
    id: "scene3",
    title: "Ketika Kerak Bumi Membal (Isostasy & Letusan Magma)",
    text: "Tapi banjir global tadi cuma pemanasan. Efek berikutnya terjadi di bawah kaki kita, di dalam perut bumi. Kerak bumi tempat kita berpijak itu sebenarnya mengapung di atas mantel bumi yang semi-cair dan panas, mirip perahu di atas danau. Selama jutaan tahun, benua Antarktika dan Greenland tertekan ke bawah karena menopang beban lapisan es yang luar biasa berat. Saat beban raksasa itu lenyap seketika, terjadi fenomena yang disebut Post-Glacial Rebound atau penyesuaian isostatik. Kerak bumi yang tadinya tertekan bakal membal balik ke atas seperti kasur busa yang dilepas tindihannya. Masalahnya, kerak bumi itu batuan padat, bukan karet. Pelepasan beban yang mendadak ini bakal memicu retakan tektonik besar-besaran dan gempa bumi beruntun berkekuatan di atas magnitudo delapan di seluruh lingkar kutub. Dan yang lebih mengerikan: di bawah es Antarktika dan Islandia, tersimpan lebih dari seratus gunung berapi yang selama ini tertidur karena ditekan oleh beban es. Begitu bebannya hilang, tekanan di dapur magma turun drastis—fenomena yang disebut dekompresi magma. Gunung-gunung berapi ini akan meletus serentak, menyemburkan abu vulkanik dan gas sulfur ke atmosfer dalam skala global.",
  },
  {
    id: "scene4",
    title: "Hari yang Menjadi Lebih Panjang (Rotasi & Poros Bumi)",
    text: "Sekarang, mari kita lihat apa yang terjadi pada jam tangan dan satelit GPS kita. Di sekolah kita belajar hukum fisika dasar: Kekekalan Momentum Sudut. Kamu pasti pernah melihat atlet seluncur es yang sedang berputar di arena es. Saat mereka merapatkan kedua tangannya ke badan, putarannya jadi sangat cepat. Tapi saat mereka merentangkan kedua tangannya lebar-lebar, putaran mereka otomatis melambat. Bumi kita bekerja dengan prinsip fisika yang persis sama. Selama ini, triliunan ton es terkonsentrasi di Kutub Utara dan Kutub Selatan—artinya sangat dekat dengan poros putaran bumi. Tapi ketika es itu mencair, airnya mengalir dan menyebar ke seluruh samudra, terutama menumpuk di area khatulistiwa karena adanya gaya sentrifugal. Bumi kita jadi lebih gemuk di bagian tengah. Akibatnya? Momen inersia bumi meningkat, dan rotasi bumi otomatis melambat! Satu hari tidak lagi tepat dua puluh empat jam, melainkan bertambah panjang beberapa milidetik. Nggak cuma itu, pergeseran massa air yang sangat masif ini bakal membuat sumbu kemiringan bumi bergoyang puluhan meter, mengacaukan sistem navigasi satelit global seketika.",
  },
  {
    id: "scene5",
    title: "Runtuhnya Sabuk Arus Laut & Pembekuan Eropa",
    text: "Nah, ini bagian yang paling ironis: mencairnya es kutub karena panas, justru bisa membekukan separuh benua di bumi. Di samudra kita, ada sistem sabuk sirkulasi raksasa yang disebut AMOC atau Atlantic Meridional Overturning Circulation. Sabuk ini bekerja seperti konveyor pemanas ruangan alami planet bumi. Air hangat dari teluk tropis mengalir ke utara menuju Eropa, membawa udara hangat yang bikin negara-negara seperti Inggris dan Jerman tetap nyaman dihuni. Di utara, air itu mendingin, menjadi lebih asin dan padat, lalu tenggelam ke dasar laut dan mengalir kembali ke selatan. Tapi kalau es Greenland mencair dalam semalam, samudra Atlantik utara bakal dibanjiri oleh jutaan kilometer kubik air tawar dingin. Air tawar punya massa jenis yang jauh lebih ringan dibanding air laut asin. Akibatnya, air di utara tidak bisa lagi tenggelam ke dasar laut. Mesin pompa sirkulasi AMOC ini bakal mogok total. Tanpa pasokan air hangat dari tropis, suhu di Eropa Barat, Kanada, dan Amerika Utara bakal anjlok drastis sampai minus dua puluh derajat Celsius. Badai salju abadi bakal menyapu wilayah utara, memicu musim dingin ekstrem di tengah bumi yang sedang memanas.",
  },
  {
    id: "scene6",
    title: "Monster di Balik Permafrost & Penutup Penasaran",
    text: "Dan ancaman terakhir yang terbangun dari es bukanlah air... melainkan apa yang terkubur di bawah tanah beku Siberia dan kutub, yang dikenal sebagai Permafrost. Tanah permafrost ini menyimpan sekitar seribu lima ratus miliar ton karbon organik purba—hampir dua kali lipat dari seluruh karbon yang ada di atmosfer bumi saat ini. Kalau lapisan ini mencair seketika, mikroba pengurai akan langsung berpesta, melepaskan miliaran ton gas metana dan karbon dioksida ke udara. Efek rumah kaca bakal meledak ke level yang belum pernah dilihat oleh peradaban manusia modern. Belum lagi ancaman mikroorganisme atau virus purba yang terawetkan dalam es selama puluhan ribu tahun, yang sistem kekebalan tubuh kita sama sekali belum mengenalnya. Untungnya, skenario mencair dalam semalam ini secara termodinamika tidak mungkin terjadi seketika, karena mencairkan es sebanyak itu butuh energi panas yang setara miliaran bom nuklir. Tapi sains di balik skenario ini memberi tahu kita satu hal penting: bumi kita bukan cuma bongkahan batu dengan air di permukaannya, melainkan satu sistem fisika raksasa yang saling terhubung erat. Kalau satu baut penahannya copot, seluruh mekanisme planet ini akan bergetar. Menurutmu, dari semua dampak tadi, mana efek yang paling bikin kamu merinding? Tulis pendapatmu di kolom komentar di bawah!",
  },
];

const voDir = join(process.cwd(), "public", "vo", "ice-melt");
mkdirSync(voDir, { recursive: true });

function alignmentToCues(alignment, fps = 30, maxWords = 5) {
  const chars = alignment.characters;
  const starts = alignment.character_start_times_seconds;
  const ends = alignment.character_end_times_seconds;

  const words = [];
  let curWord = "";
  let curStart = null;
  let curEnd = null;

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (ch === " " || ch === "\n" || ch === "\t") {
      if (curWord.length > 0) {
        words.push({ text: curWord, startSec: curStart, endSec: curEnd });
        curWord = "";
        curStart = null;
        curEnd = null;
      }
    } else {
      if (curStart === null) curStart = starts[i];
      curEnd = ends[i];
      curWord += ch;
    }
  }
  if (curWord.length > 0) {
    words.push({ text: curWord, startSec: curStart, endSec: curEnd });
  }

  const cues = [];
  let curGroup = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    curGroup.push(w);
    const hasPunctuation = /[,.?!;:]$/.test(w.text);
    if (curGroup.length >= maxWords || (curGroup.length >= 3 && hasPunctuation) || i === words.length - 1) {
      cues.push({
        text: curGroup.map((x) => x.text).join(" "),
        startFrame: Math.round(curGroup[0].startSec * fps),
        endFrame: Math.round(curGroup[curGroup.length - 1].endSec * fps),
      });
      curGroup = [];
    }
  }
  const maxEndSec = ends[ends.length - 1] || 0;
  return { cues, maxEndSec };
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
  return { cues: rawCues, maxEndSec };
}

const timingData = {};
let totalFrames = 0;

for (let i = 0; i < scenes.length; i++) {
  const scene = scenes[i];
  const audioFile = join(voDir, `${scene.id}.mp3`);
  let cues = [];
  let maxEndSec = 0;

  if (useElevenLabs) {
    console.log(`[${i + 1}/${scenes.length}] [ElevenLabs] Menghasilkan ${scene.title}...`);
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${elevenVoiceId}/with-timestamps?output_format=mp3_44100_128`, {
      method: "POST",
      headers: { "xi-api-key": elevenApiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        text: scene.text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.55, similarity_boost: 0.8, style: 0.3 },
      }),
    });
    if (!res.ok) {
      console.error(`❌ Gagal memanggil ElevenLabs baris ${i + 1}:`, await res.text());
      process.exit(1);
    }
    const data = await res.json();
    const audioBuf = Buffer.from(data.audio_base64, "base64");
    writeFileSync(audioFile, audioBuf);

    const parsed = alignmentToCues(data.alignment, FPS, 5);
    cues = parsed.cues;
    maxEndSec = parsed.maxEndSec;
  } else {
    console.log(`[${i + 1}/${scenes.length}] [Edge-TTS Gratis] Menghasilkan ${scene.title}...`);
    const vttFile = join(voDir, `${scene.id}.vtt`);
    const cmd = `/home/noob/.local/bin/edge-tts --voice id-ID-ArdiNeural --rate="+5%" --text "${scene.text}" --write-media "${audioFile}" --write-subtitles "${vttFile}"`;
    execSync(cmd, { stdio: "pipe" });
    const vttContent = readFileSync(vttFile, "utf-8");
    const parsed = parseVttCues(vttContent, FPS);
    cues = parsed.cues;
    maxEndSec = parsed.maxEndSec;
  }

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

// Tulis ke src/data/iceMeltTiming.ts
const timingTsContent = `// DIBUAT OTOMATIS oleh scripts/generate_ice_melt_audio.mjs
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

export const iceMeltTiming = {
  fps: ${FPS},
  totalFrames: ${totalFrames},
  totalSeconds: ${(totalFrames / FPS).toFixed(1)},
  scenes: ${JSON.stringify(timingData, null, 2)} as Record<string, SceneTiming>,
};
`;

writeFileSync(join(process.cwd(), "src", "data", "iceMeltTiming.ts"), timingTsContent);

console.log("\n========================================================");
console.log(`✅ SUKSES! Audio ElevenLabs & Timing presisi berhasil dibuat.`);
console.log(`⏱️  Total durasi video: ${(totalFrames / FPS).toFixed(1)} detik (${totalFrames} frames)`);
console.log("========================================================\n");
