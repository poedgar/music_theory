/* Web Audio piano-like synth and a simple score player. */

const AudioEngine = (() => {
  let ctx = null;
  let master, reverb, wave;
  const voices = new Set();

  function impulse(seconds, decay) {
    const rate = ctx.sampleRate;
    const len = Math.floor(rate * seconds);
    const buf = ctx.createBuffer(2, len, rate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }

  function init() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -20; comp.knee.value = 18; comp.ratio.value = 3;
      comp.attack.value = 0.004; comp.release.value = 0.25;
      comp.connect(ctx.destination);
      master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(comp);
      reverb = ctx.createConvolver();
      reverb.buffer = impulse(2.2, 3);
      const wet = ctx.createGain();
      wet.gain.value = 0.2;
      reverb.connect(wet);
      wet.connect(comp);
      const amps = [0, 1, 0.6, 0.28, 0.2, 0.1, 0.07, 0.04, 0.03, 0.02, 0.015, 0.01];
      wave = ctx.createPeriodicWave(new Float32Array(amps.length), new Float32Array(amps));
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  let driveCurve = null;
  function distortionCurve() {
    if (driveCurve) return driveCurve;
    const n = 2048, k = 40;
    driveCurve = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      driveCurve[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
    }
    return driveCurve;
  }

  // Overdriven electric guitar: detuned saws through a waveshaper and a speaker-like band-pass.
  function playGuitar(midi, when, dur, vel) {
    const t = Math.max(when ?? 0, ctx.currentTime);
    const f = 440 * Math.pow(2, (midi - 69) / 12);
    const out = ctx.createGain();
    out.connect(master);
    out.connect(reverb);
    const pre = ctx.createGain();
    pre.gain.value = 2.5;
    const shaper = ctx.createWaveShaper();
    shaper.curve = distortionCurve();
    shaper.oversample = '4x';
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 90;
    const cab = ctx.createBiquadFilter();
    cab.type = 'lowpass'; cab.frequency.value = 3200; cab.Q.value = 0.9;
    const mid = ctx.createBiquadFilter();
    mid.type = 'peaking'; mid.frequency.value = 800; mid.gain.value = 4;
    pre.connect(shaper); shaper.connect(hp); hp.connect(mid); mid.connect(cab); cab.connect(out);
    const oscs = [-7, 7].map(det => {
      const o = ctx.createOscillator();
      o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = det;
      o.connect(pre);
      return o;
    });
    const level = 0.07 * vel;
    const g = out.gain;
    g.setValueAtTime(0.0001, t);
    g.exponentialRampToValueAtTime(level, t + 0.004);
    g.setTargetAtTime(level * 0.75, t + 0.02, 0.4);
    const end = t + dur;
    g.setTargetAtTime(0.0001, end, 0.05);
    oscs.forEach(o => { o.start(t); o.stop(end + 0.5); });
    const voice = {
      release() {
        const now = ctx.currentTime;
        if (g.cancelAndHoldAtTime) g.cancelAndHoldAtTime(now); else g.cancelScheduledValues(now);
        g.setTargetAtTime(0.0001, now, 0.04);
        oscs.forEach(o => { try { o.stop(now + 0.4); } catch (e) { /* already stopped */ } });
      },
    };
    voices.add(voice);
    oscs[0].onended = () => { voices.delete(voice); out.disconnect(); };
    return voice;
  }

  /** Play a MIDI note at `when` (AudioContext time) for `dur` seconds. Returns a handle with release(). */
  function playNote(midi, when, dur, vel = 0.8, instrument = 'piano') {
    init();
    if (instrument === 'guitar') return playGuitar(midi, when, dur, vel);
    const t = Math.max(when ?? 0, ctx.currentTime);
    const f = 440 * Math.pow(2, (midi - 69) / 12);

    const out = ctx.createGain();
    out.connect(master);
    out.connect(reverb);

    const filt = ctx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.Q.value = 0.7;
    filt.frequency.setValueAtTime(Math.min(16000, f * (4 + 6 * vel) + 800), t);
    filt.frequency.exponentialRampToValueAtTime(Math.max(f * 2, 500), t + 1.2);
    filt.connect(out);

    const o1 = ctx.createOscillator();
    o1.setPeriodicWave(wave); o1.frequency.value = f; o1.detune.value = -3;
    const o2 = ctx.createOscillator();
    o2.setPeriodicWave(wave); o2.frequency.value = f; o2.detune.value = 3;
    const o3 = ctx.createOscillator();
    o3.type = 'sine'; o3.frequency.value = f;
    const g2 = ctx.createGain();
    g2.gain.value = 0.5;
    o1.connect(filt); o2.connect(g2); g2.connect(filt); o3.connect(filt);

    const level = 0.11 * vel * (midi < 48 ? 1.3 : midi > 76 ? 0.8 : 1);
    const g = out.gain;
    g.setValueAtTime(0.0001, t);
    g.exponentialRampToValueAtTime(level, t + 0.006);
    g.setTargetAtTime(level * 0.4, t + 0.01, 0.18);
    const end = t + dur;
    if (t + 0.5 < end) g.setTargetAtTime(0.0001, t + 0.5, Math.max(0.5, 1.6 - (midi - 60) * 0.02));
    g.setTargetAtTime(0.0001, end, 0.09);

    const oscs = [o1, o2, o3];
    oscs.forEach(o => { o.start(t); o.stop(end + 0.8); });

    const voice = {
      release() {
        const now = ctx.currentTime;
        if (g.cancelAndHoldAtTime) g.cancelAndHoldAtTime(now); else g.cancelScheduledValues(now);
        g.setTargetAtTime(0.0001, now, 0.06);
        oscs.forEach(o => { try { o.stop(now + 0.5); } catch (e) { /* already stopped */ } });
      },
    };
    voices.add(voice);
    o1.onended = () => { voices.delete(voice); out.disconnect(); };
    return voice;
  }

  function stopAll() { voices.forEach(v => v.release()); }
  function now() { return init().currentTime; }

  return { init, playNote, stopAll, now };
})();

const Player = (() => {
  let current = null;

  function stop() {
    if (!current) return;
    const c = current;
    current = null;
    c.timers.forEach(clearTimeout);
    AudioEngine.stopAll();
    c.events.forEach((ev, i) => { if (!ev.bar) c.onEvent?.(i, false); });
    c.onEnd?.();
  }

  /**
   * Play parsed events. opts: { bpm, speed, broken, instrument, onEvent(i, on), onEnd(), owner }
   * "broken" spreads chords out note by note (arpeggio).
   */
  function play(events, opts = {}) {
    stop();
    const ctx = AudioEngine.init();
    const spb = 60 / ((opts.bpm || 96) * (opts.speed || 1));
    const start = ctx.currentTime + 0.08;
    const timers = [];
    const hasBars = events.some(e => e.bar);
    let accent = true;
    let t = 0;
    const self = { timers, events, onEvent: opts.onEvent, onEnd: opts.onEnd, owner: opts.owner };
    current = self;

    // Tied notes ("~") are struck once and held; `held` collects their total length.
    const held = new Map();
    const flush = midi => {
      const h = held.get(midi);
      AudioEngine.playNote(midi, start + h.t0 * spb, h.beats * spb * 0.97, h.vel, opts.instrument);
      held.delete(midi);
    };

    events.forEach((ev, i) => {
      if (ev.bar) { accent = true; return; }
      let beats = ev.beats;
      const vel = hasBars ? (accent ? 0.95 : 0.72) : 0.85;
      accent = false;
      for (const m of [...held.keys()]) if (ev.rest || opts.broken || !ev.notes.some(n => n.midi === m)) flush(m);
      if (!ev.rest) {
        const notes = ev.notes;
        if (opts.broken && notes.length > 1) {
          const step = 0.5;
          const total = Math.max(beats, notes.length * step + 1);
          [...notes].sort((a, b) => a.midi - b.midi).forEach((n, k) => {
            AudioEngine.playNote(n.midi, start + (t + k * step) * spb, (total - k * step) * spb, vel, opts.instrument);
          });
          beats = total;
        } else {
          notes.forEach(n => {
            const h = held.get(n.midi);
            if (h) h.beats += beats; else held.set(n.midi, { t0: t, beats, vel });
            if (!n.tie) flush(n.midi);
          });
        }
      }
      const onAt = (start - ctx.currentTime + t * spb) * 1000;
      const offAt = onAt + beats * spb * 1000 - 25;
      timers.push(setTimeout(() => current === self && opts.onEvent?.(i, true), onAt));
      timers.push(setTimeout(() => current === self && opts.onEvent?.(i, false), offAt));
      t += beats;
    });
    [...held.keys()].forEach(flush);

    timers.push(setTimeout(() => {
      if (current !== self) return;
      current = null;
      opts.onEnd?.();
    }, (start - ctx.currentTime + t * spb) * 1000 + 150));
    return self;
  }

  function isPlaying(owner) { return !!current && (owner === undefined || current.owner === owner); }

  return { play, stop, isPlaying };
})();
