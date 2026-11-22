import math
import struct
import wave
import subprocess
import os

SAMPLE_RATE = 44100
DURATION = 120.0  # 2 menit loopable ambient soundtrack
NUM_SAMPLES = int(SAMPLE_RATE * DURATION)
BPM = 72
BEAT_DUR = 60.0 / BPM

def note_freq(note_name):
    # D minor scale notes
    notes = {
        'D2': 73.42, 'A2': 110.00, 'C3': 130.81, 'D3': 146.83,
        'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08,
        'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
        'G4': 392.00, 'A4': 440.00, 'C5': 523.25, 'D5': 587.33
    }
    return notes.get(note_name, 220.0)

def generate_track():
    print(f"🎵 Mensintesis BGM orisinal (Durasi: {DURATION}s, Sample Rate: {SAMPLE_RATE}Hz)...")
    
    # Pre-calculate audio buffer
    left_channel = [0.0] * NUM_SAMPLES
    right_channel = [0.0] * NUM_SAMPLES

    # 1. Deep Oceanic Sub Drone (D2 & A2 with slow LFO)
    f_d2 = note_freq('D2')
    f_a2 = note_freq('A2')
    f_d3 = note_freq('D3')
    
    for i in range(NUM_SAMPLES):
        t = i / SAMPLE_RATE
        lfo1 = 0.5 + 0.5 * math.sin(2 * math.pi * 0.1 * t)      # 10s period swell
        lfo2 = 0.5 + 0.5 * math.sin(2 * math.pi * 0.05 * t + 1)  # 20s period swell
        
        # Sub drone
        drone = (
            0.28 * math.sin(2 * math.pi * f_d2 * t) +
            0.18 * math.sin(2 * math.pi * f_a2 * t + 0.5) +
            0.12 * math.sin(2 * math.pi * f_d3 * t + 1.2)
        ) * (0.6 + 0.4 * lfo1)
        
        # Pad warmth (harmonics)
        pad = 0.08 * math.sin(2 * math.pi * (f_d3 * 1.5) * t) * lfo2
        
        left_channel[i] += drone * 0.85 + pad * 0.7
        right_channel[i] += drone * 0.85 + pad * 0.9

    # 2. Planetary Bass Pulse (setiap 2 ketukan)
    pulse_interval = BEAT_DUR * 2
    num_pulses = int(DURATION / pulse_interval)
    pulse_samples = int(SAMPLE_RATE * 1.8)
    
    for p in range(num_pulses):
        start_idx = int(p * pulse_interval * SAMPLE_RATE)
        # Pitch sequence: D -> Bb -> C -> A
        chord_idx = (p // 4) % 4
        pitch = [note_freq('D2'), note_freq('Bb3') * 0.5, note_freq('C3') * 0.5, note_freq('A2')][chord_idx]
        
        for j in range(min(pulse_samples, NUM_SAMPLES - start_idx)):
            idx = start_idx + j
            tj = j / SAMPLE_RATE
            env = math.exp(-3.5 * tj) * math.sin(math.pi * min(1.0, tj * 15))  # punch envelope
            wave_val = 0.22 * math.sin(2 * math.pi * pitch * tj) * env
            left_channel[idx] += wave_val
            right_channel[idx] += wave_val

    # 3. Ambient Shimmering Arpeggio (Sci-Fi Plucks with delay)
    arp_notes = ['D4', 'F4', 'A4', 'C5', 'A4', 'F4', 'G4', 'D5']
    step_dur = BEAT_DUR * 0.5  # 16th/8th note feel
    total_steps = int(DURATION / step_dur)
    pluck_len = int(SAMPLE_RATE * 0.9)
    delay_samples = int(SAMPLE_RATE * (step_dur * 0.75))
    
    for s in range(total_steps):
        note = arp_notes[s % len(arp_notes)]
        freq = note_freq(note)
        start_idx = int(s * step_dur * SAMPLE_RATE)
        pan = 0.5 + 0.35 * math.sin(s * 0.4)  # stereo pan movement
        
        for j in range(min(pluck_len, NUM_SAMPLES - start_idx)):
            idx = start_idx + j
            tj = j / SAMPLE_RATE
            env = math.exp(-5.0 * tj) * (0.8 + 0.2 * math.sin(2 * math.pi * 8 * tj))
            val = 0.09 * (
                math.sin(2 * math.pi * freq * tj) +
                0.3 * math.sin(2 * math.pi * freq * 2.0 * tj)
            ) * env
            
            # Direct
            left_channel[idx] += val * (1.0 - pan)
            right_channel[idx] += val * pan
            
            # Simple ping-pong delay feedback
            if idx + delay_samples < NUM_SAMPLES:
                left_channel[idx + delay_samples] += val * pan * 0.35
                right_channel[idx + delay_samples] += val * (1.0 - pan) * 0.35

    # 4. Normalize & Soft Clipper
    max_amp = max(max(abs(x) for x in left_channel), max(abs(x) for x in right_channel), 0.001)
    target_peak = 0.85
    gain = target_peak / max_amp
    
    print(f"🎛️  Normalisasi Audio (Peak: {max_amp:.3f} -> Gain: {gain:.3f})...")
    
    wav_path = "public/music/temp_ice_melt_bgm.wav"
    mp3_path = "public/music/ice-melt-bgm.mp3"
    
    with wave.open(wav_path, 'wb') as wav_file:
        wav_file.setnchannels(2)
        wav_file.setsampwidth(2)
        wav_file.setframerate(SAMPLE_RATE)
        
        frames = bytearray()
        for i in range(NUM_SAMPLES):
            # Soft tanh clip
            l = math.tanh(left_channel[i] * gain)
            r = math.tanh(right_channel[i] * gain)
            
            l_int = max(-32767, min(32767, int(l * 32767)))
            r_int = max(-32767, min(32767, int(r * 32767)))
            
            frames.extend(struct.pack('<hh', l_int, r_int))
            
        wav_file.writeframes(frames)
    
    print("✨ Mengonversi WAV ke MP3 via FFmpeg...")
    ffmpeg_bin = "./node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg"
    cmd = [ffmpeg_bin, "-y", "-i", wav_path, "-b:a", "192k", mp3_path]
    subprocess.run(cmd, check=True)
    
    if os.path.exists(wav_path):
        os.remove(wav_path)
        
    print(f"✅ BGM Berhasil dibuat: {mp3_path} ({os.path.getsize(mp3_path):,} bytes)")

if __name__ == "__main__":
    generate_track()
