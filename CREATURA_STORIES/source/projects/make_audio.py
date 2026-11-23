#!/usr/bin/env python3
"""Original (royalty-free) sound for project stories, synthesised from scratch.
   music_ambient.wav — calm ambient pad + sparse soft 'glass' notes, no vocals, 48 kHz stereo
   sfx_whoosh.wav    — soft airy whoosh for transitions
   sfx_tick.wav      — very quiet tactile tick for text reveals
Usage: python3 make_audio.py <out_dir> [seconds]"""
import sys, os, wave
import numpy as np

SR = 48000
out = sys.argv[1]; dur = float(sys.argv[2]) if len(sys.argv) > 2 else 36
os.makedirs(out, exist_ok=True)
rng = np.random.default_rng(7)
t = np.arange(int(SR * dur)) / SR

def hz(n):  # MIDI note → Hz
    return 440.0 * 2 ** ((n - 69) / 12)

def onepole_lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); s = 0.0
    for i in range(len(x)):
        s = (1 - a) * x[i] + a * s; y[i] = s
    return y

def reverb(x, mix=0.35):
    """Small Schroeder reverb: 4 combs + 2 allpasses (vectorised by blocks)."""
    def comb(sig, d, g):
        y = sig.copy()
        for i in range(d, len(y), d):
            y[i:i + d] += g * y[i - d:i][: len(y[i:i + d])]
        return y
    def allpass(sig, d, g):
        y = np.zeros_like(sig); buf = np.zeros(d)
        for i in range(len(sig)):
            b = buf[i % d]; v = sig[i] + g * b; y[i] = b - g * v; buf[i % d] = v
        return y
    w = sum(comb(x, int(SR * d), g) for d, g in ((0.0297, .78), (0.0371, .76), (0.0411, .74), (0.0437, .72))) / 4
    w = allpass(allpass(w, int(SR * .005), .7), int(SR * .0017), .7)
    return (1 - mix) * x + mix * w

# chords: Fmaj9 – Am7 – Dm9 – Bbmaj7(#11), 8 s each, smooth crossfades
chords = [[41, 53, 57, 60, 64, 67], [45, 52, 55, 60, 64], [38, 50, 53, 57, 60, 64], [46, 53, 57, 62, 64]]
seg = 8.0
pad = np.zeros_like(t)
for k in range(int(np.ceil(dur / seg)) + 1):
    notes = chords[k % len(chords)]; t0 = k * seg - 1.5
    env = np.clip((t - t0) / 2.5, 0, 1) * np.clip((t0 + seg + 3.0 - t) / 2.5, 0, 1)
    if not env.any(): continue
    for j, n in enumerate(notes):
        f = hz(n); lfo = 0.75 + 0.25 * np.sin(2 * np.pi * (0.07 + 0.013 * j) * t + j)
        v = np.sin(2 * np.pi * f * t) + 0.6 * np.sin(2 * np.pi * f * 1.003 * t + 1.3) + 0.12 * np.sin(2 * np.pi * 2 * f * t)
        pad += env * lfo * v * (0.5 if n < 48 else 0.32)
pad = onepole_lp(pad, 1800) / 6

# sparse soft notes (pentatonic around F), decaying like a felt piano / glass
bell = np.zeros_like(t)
scale = [65, 67, 69, 72, 74, 77, 79, 81]
tt = 1.2
while tt < dur - 2:
    n = scale[rng.integers(len(scale))]; i0 = int(tt * SR); L = int(SR * 3.5)
    x = np.arange(min(L, len(t) - i0)) / SR; f = hz(n)
    note = (np.sin(2 * np.pi * f * x) + 0.25 * np.sin(2 * np.pi * 2.01 * f * x)) * np.exp(-x * 1.6) * np.minimum(x / 0.01, 1)
    bell[i0:i0 + len(x)] += note * 0.16
    tt += rng.choice([1.6, 2.4, 3.2])
mono = reverb(pad + bell, 0.4)
# gentle stereo: slight delay on right channel
r = np.concatenate([np.zeros(int(SR * .012)), mono])[: len(mono)]
st = np.stack([mono, 0.92 * r + 0.08 * mono], 1)
fade = np.minimum(1, np.minimum(t / 1.5, (dur - t) / 2.5))[:, None]
st *= fade; st /= np.abs(st).max() / 0.5   # leave headroom (≈ −6 dBFS peak)

def save(name, a):
    a = np.clip(a, -1, 1); a = (a * 32767).astype('<i2')
    if a.ndim == 1: a = np.stack([a, a], 1)
    with wave.open(os.path.join(out, name), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(a.tobytes())

save('music_ambient.wav', st)

# whoosh: filtered noise with rising/falling band, 0.9 s
n = int(SR * 0.9); x = np.arange(n) / SR
noise = rng.standard_normal(n)
lo = onepole_lp(noise, 2500) - onepole_lp(noise, 300)
env = np.sin(np.pi * np.clip(x / 0.9, 0, 1)) ** 2
save('sfx_whoosh.wav', reverb(lo * env * 0.6, 0.3) * 0.7)

# tick: tiny damped click
n = int(SR * 0.12); x = np.arange(n) / SR
tick = (np.sin(2 * np.pi * 2400 * x) * 0.5 + rng.standard_normal(n) * 0.2) * np.exp(-x * 90)
save('sfx_tick.wav', tick * 0.35)
print('ok', out)
