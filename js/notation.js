/* Music theory helpers + a small SVG staff renderer. */

const Theory = (() => {
  const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const SEMI = [0, 2, 4, 5, 7, 9, 11];
  const ACC_ALTER = { '': 0, '#': 1, '##': 2, x: 2, b: -1, bb: -2, n: 0 };
  const ACC_STR = { '-2': 'bb', '-1': 'b', '0': '', '1': '#', '2': '##' };
  const GLYPH = { '-2': '𝄫', '-1': '♭', '0': '♮', '1': '♯', '2': '𝄪' };
  const DUR = { w: 4, h: 2, q: 1, e: 0.5, s: 0.25 };

  const KEYS = {
    C: 0, G: 1, D: 2, A: 3, E: 4, B: 5, 'F#': 6, 'C#': 7,
    F: -1, Bb: -2, Eb: -3, Ab: -4, Db: -5, Gb: -6, Cb: -7,
    Am: 0, Em: 1, Bm: 2, 'F#m': 3, 'C#m': 4, 'G#m': 5, 'D#m': 6,
    Dm: -1, Gm: -2, Cm: -3, Fm: -4, Bbm: -5, Ebm: -6,
  };
  const SHARP_ORDER = 'FCGDAEB';
  const FLAT_ORDER = 'BEADGCF';

  function parseNote(str) {
    const m = /^([A-G])(##|#|x|bb|b|n)?(-?\d)$/.exec(str);
    if (!m) throw new Error('Bad note: ' + str);
    const li = LETTERS.indexOf(m[1]);
    const acc = m[2] || '';
    const alter = ACC_ALTER[acc];
    const oct = +m[3];
    return {
      name: str, letter: m[1], li, alter, oct,
      forceNatural: acc === 'n',
      diatonic: li + oct * 7,
      midi: (oct + 1) * 12 + SEMI[li] + alter,
    };
  }

  function makeNote(li, alter, oct) {
    if (!(String(alter) in ACC_STR)) return null;
    return parseNote(LETTERS[li] + ACC_STR[alter] + oct);
  }

  /** Move a note by a number of letter steps and semitones, spelling the result correctly. */
  function transpose(note, steps, semis) {
    const total = note.li + steps;
    const li = ((total % 7) + 7) % 7;
    const oct = note.oct + Math.floor(total / 7);
    const natural = (oct + 1) * 12 + SEMI[li];
    return makeNote(li, note.midi + semis - natural, oct);
  }

  function pretty(n, withOct = false) {
    return n.letter + (n.alter ? GLYPH[n.alter] : '') + (withOct ? n.oct : '');
  }

  function prettyName(s) {
    return s.replace(/##/g, '𝄪').replace(/#/g, '♯').replace(/(?<=[A-G])bb/g, '𝄫').replace(/(?<=[A-G])b/g, '♭');
  }

  function keyFifths(k) {
    if (k == null) return 0;
    if (typeof k === 'number') return k;
    return KEYS[k] ?? 0;
  }

  function keyMap(fifths) {
    const m = { C: 0, D: 0, E: 0, F: 0, G: 0, A: 0, B: 0 };
    if (fifths > 0) for (let i = 0; i < fifths; i++) m[SHARP_ORDER[i]] = 1;
    else for (let i = 0; i < -fifths; i++) m[FLAT_ORDER[i]] = -1;
    return m;
  }

  // Copy the tie / non-chord-tone / borrowed-tone markers from one note to its replacement.
  function withFlags(n, from) {
    if (n && from) { n.tie = !!from.tie; n.nct = !!from.nct; n.mix = !!from.mix; }
    return n;
  }

  /**
   * Mini score language:
   *   C4/q D4/h. (C4 E4 G4)/w:Label_text R/q | ||
   * Durations: w h q e s, optional "." for dotted. Default q.
   * Note suffixes: "~" ties the note into the next event, "*" marks a non-chord tone,
   *   "!" marks a tone borrowed from the parallel mode (highlighted, but still a chord tone).
   * "|" bar line, "||" final bar line, "R" rest, "_" in labels becomes a space.
   */
  function parseScore(src) {
    const tokens = src.match(/\([^)]*\)\S*|\S+/g) || [];
    const events = [];
    for (const t of tokens) {
      if (t === '|') { events.push({ bar: 'single' }); continue; }
      if (t === '||') { events.push({ bar: 'end' }); continue; }
      const m = /^(?:\(([^)]*)\)|([^/:]+))(?:\/([whqes])(\.?))?(?::(.+))?$/.exec(t);
      if (!m) throw new Error('Bad token: ' + t);
      const body = (m[1] ?? m[2]).trim();
      const base = DUR[m[3] || 'q'];
      const dots = m[4] ? 1 : 0;
      const ev = { base, dots, beats: base * (dots ? 1.5 : 1), label: m[5] ? m[5].replace(/_/g, ' ') : null };
      if (body === 'R') ev.rest = true;
      else ev.notes = body.split(/\s+/).map(tok => {
        const m2 = /^(.*?)([~*!]*)$/.exec(tok);
        return withFlags(parseNote(m2[1]), { tie: m2[2].includes('~'), nct: m2[2].includes('*'), mix: m2[2].includes('!') });
      });
      events.push(ev);
    }
    return events;
  }

  // ───────── transposition ─────────
  const mod = (a, n) => ((a % n) + n) % n;
  const pc = n => mod(SEMI[n.li] + n.alter, 12);

  /** Distance between two tonics measured in perfect fifths (e.g. C→G = 1, C→F = -1, C→Db = -5). */
  function fifthsBetween(a, b) {
    for (let f = -11; f <= 11; f++) {
      if (mod(4 * f, 7) === mod(b.li - a.li, 7) && mod(7 * f, 12) === mod(pc(b) - pc(a), 12)) return f;
    }
    return null; // too far apart to be a sensible respelling
  }

  /** Turn a fifths distance into the closest interval (letter steps + semitones), up to a tritone either way. */
  function intervalForFifths(f) {
    let steps = mod(4 * f, 7);
    const base = mod(7 * f, 12);
    const approx = steps * 12 / 7;
    let semis = [base - 12, base, base + 12].reduce((best, s) => Math.abs(s - approx) < Math.abs(best - approx) ? s : best);
    if (semis > 6) { steps -= 7; semis -= 12; }
    return { steps, semis };
  }

  function transposeSafe(n, iv) {
    return transpose(n, iv.steps, iv.semis)
      || transpose(n, iv.steps + 1, iv.semis)
      || transpose(n, iv.steps - 1, iv.semis);
  }

  const ACC_SYM = { '♯': 1, '♭': -1, '𝄪': 2, '𝄫': -2, '♮': 0 };

  // Transposes labels that are note or chord names (C, G/B, Am (vi), Cmaj7, C: I, F♯4).
  // Roman numerals, degrees and interval names are left alone.
  function transposeLabel(label, iv, ev) {
    const single = ev.notes && ev.notes.length === 1;
    if (single && /^\d+ Hz$/.test(label)) {
      return Math.round(440 * Math.pow(2, (ev.notes[0].midi - 69) / 12)) + ' Hz';
    }
    const m = /^([A-G])(♯|♭|♮|𝄪|𝄫)?(\d)?((?:maj7|m7|m|7|°7|°|ø7|\+)?)(?:\/([A-G])(♯|♭)?)?((?::| major| minor| \().*)?$/.exec(label);
    if (!m) return label;
    // On a chord, a trailing 7 or 5 is a chord symbol, not an octave number (A7, B♭7, power chord E5).
    if (m[3] && !single) {
      if (!['5', '7'].includes(m[3]) || m[4] || m[5]) return label;
      m[4] = m[3]; m[3] = undefined;
    }
    const tr = (letter, acc, oct) => {
      const n = makeNote(LETTERS.indexOf(letter), ACC_SYM[acc] || 0, oct ?? 4);
      const t = transposeSafe(n, iv);
      if (!t) return letter + (acc || '');
      return t.letter + (t.alter ? GLYPH[t.alter] : acc === '♮' ? '♮' : '') + (oct != null ? t.oct : '');
    };
    let out = tr(m[1], m[2], m[3] != null ? +m[3] : null) + m[4];
    if (m[5]) out += '/' + tr(m[5], m[6], null);
    return out + (m[7] || '');
  }

  /** Return a transposed copy of parsed events, moved by `f` fifths. */
  function transposeEvents(events, f) {
    if (!f) return events.map(ev => ({ ...ev, notes: ev.notes && ev.notes.map(n => withFlags(parseNote(n.name), n)) }));
    const iv = intervalForFifths(f);
    return events.map(ev => {
      if (ev.bar || ev.rest) return { ...ev };
      const notes = ev.notes.map(n => withFlags(transposeSafe(n, iv) || parseNote(n.name), n));
      const out = { ...ev, notes, layout: undefined };
      if (ev.label) out.label = transposeLabel(ev.label, iv, out);
      return out;
    });
  }

  // ───────── chord analysis + major/minor conversion ─────────

  /** Find root and quality of a chord built in thirds. Returns null for single notes or non-tertian clusters. */
  function analyzeChord(notes) {
    const uniq = [];
    for (const n of notes) if (!uniq.some(u => u.li === n.li)) uniq.push(n);
    if (uniq.length < 2) return null;
    for (const r of uniq) {
      if (!uniq.every(n => [0, 2, 4, 6].includes(mod(n.li - r.li, 7)))) continue;
      const iv = o => { const n = uniq.find(u => mod(u.li - r.li, 7) === o); return n ? mod(pc(n) - pc(r), 12) : null; };
      const third = iv(2), fifth = iv(4) ?? 7, seventh = iv(6);
      let q = 'maj';
      if (third === 4 && fifth === 8) q = 'aug';
      else if (third === 3 && fifth === 6) q = 'dim';
      else if (third === 3) q = 'min';
      let sev = '';
      if (seventh != null) {
        if (q === 'dim') sev = seventh === 9 ? '°7' : 'ø7';
        else if (seventh === 11) sev = q === 'min' ? 'm(maj7)' : 'maj7';
        else sev = q === 'min' ? 'm7' : '7';
      }
      const bass = notes.reduce((a, b) => (a.midi <= b.midi ? a : b));
      return { root: r, q, sev, bass };
    }
    return null;
  }

  // The chord an event implies: non-chord tones (marked "*") don't count.
  function harmonyOf(ev) {
    const tones = ev.notes.filter(n => !n.nct);
    return tones.length > 1 ? analyzeChord(tones) : null;
  }

  function chordSymbol(a) {
    if (a.sev) return pretty(a.root) + a.sev;
    return pretty(a.root) + { maj: '', min: 'm', dim: '°', aug: '+' }[a.q];
  }

  const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  function romanFor(a, tonic) {
    const deg = mod(a.root.li - tonic.li, 7);
    let s = a.q === 'maj' || a.q === 'aug' ? NUMERALS[deg] : NUMERALS[deg].toLowerCase();
    if (a.sev === '°7' || a.sev === 'ø7') return s + a.sev;
    if (a.q === 'dim') s += '°';
    if (a.q === 'aug') s += '+';
    if (a.sev === 'maj7') s += 'maj7';
    else if (a.sev === 'm(maj7)') s += '(maj7)';
    else if (a.sev) s += '7';
    return s;
  }

  // Rebuild a chord/Roman-numeral label from the (changed) notes; other labels are kept.
  function relabelForMode(label, ev, tonic) {
    const a = harmonyOf(ev);
    // Roman numeral, optionally in parentheses and with an inversion figure: I, ii7, (V6/4), viiø6/5, V7/V …
    const rm = /^(\()?(vii|vi|v|iv|iii|ii|i|VII|VI|V|IV|III|II|I)(°7|ø7|°|ø|\+)?(maj7|6\/5|4\/3|4\/2|6\/4|7|6)?(\))?((?:[ /(:]).*)?$/.exec(label);
    if (rm) {
      if (!a) return label;
      let num = romanFor(a, tonic);
      const fig = rm[4];
      if (fig === '6' || fig === '6/4') num += fig; // inverted triad
      else if (fig && fig !== '7' && fig !== 'maj7') num = num.replace(/\(maj7\)$|(maj)?7$/, '') + fig; // inverted 7th chord
      return (rm[1] || '') + num + (rm[5] || '') + (rm[6] || '');
    }
    const lm = /^([A-G])(♯|♭|♮|𝄪|𝄫)?(\d)?((?:m\(maj7\)|maj7|m7|m|7|°7|°|ø7|\+)?)(\/[A-G](?:♯|♭)?)?((?:: | major| minor| \().*)?$/.exec(label);
    if (!lm) return label;
    if (!a) {
      const n = ev.notes[0];
      return ev.notes.length === 1 && !lm[4] && !lm[5] && !lm[6] ? pretty(n) + (lm[3] ? n.oct : '') : label;
    }
    let out = chordSymbol(a);
    if (lm[5]) out += '/' + pretty(a.bass);
    let tail = lm[6] || '';
    if (/^ (major|minor)$/.test(tail)) {
      out = pretty(a.root);
      tail = ' ' + { maj: 'major', min: 'minor', dim: 'diminished', aug: 'augmented' }[a.q];
    } else if (/^ \(.*\)$/.test(tail)) {
      tail = ' (' + relabelForMode(tail.slice(2, -1), ev, tonic) + ')';
    }
    return out + tail;
  }

  /**
   * Convert events between a major key and its parallel minor (same tonic).
   * Going to minor lowers degrees 3, 6 and 7, but keeps the raised leading tone in V / vii° chords
   * and in melodies where it resolves up to the tonic (harmonic-minor practice).
   */
  function changeMode(events, tonic, target) {
    const playable = events.map((_, i) => i).filter(i => !events[i].bar && !events[i].rest);
    let tiedIn = []; // [original, converted] pairs tied from the previous event
    return events.map((ev, i) => {
      if (ev.bar) return { ...ev };
      if (ev.rest) { tiedIn = []; return { ...ev }; }
      const a = harmonyOf(ev);
      let keepLT = a ? [4, 6].includes(mod(a.root.li - tonic.li, 7)) : false;
      if (!a && ev.notes.length === 1) {
        const nx = playable.find(j => j > i);
        const nn = nx != null ? events[nx].notes : null;
        keepLT = !!nn && nn.length === 1 && nn[0].li === tonic.li && pc(nn[0]) === pc(tonic);
      }
      const notes = ev.notes.map(n => {
        // A tied continuation keeps whatever its first note became.
        const tied = tiedIn.find(([o]) => o.midi === n.midi && o.diatonic === n.diatonic);
        if (tied) return withFlags(parseNote(tied[1].name), n);
        const deg = mod(n.li - tonic.li, 7);
        const s = mod(pc(n) - pc(tonic), 12);
        let d = 0;
        if (target === 'minor') {
          if ((deg === 2 && s === 4) || (deg === 5 && s === 9) || (deg === 6 && s === 11 && !keepLT)) d = -1;
        } else if ((deg === 2 && s === 3) || (deg === 5 && s === 8) || (deg === 6 && s === 10)) d = 1;
        return withFlags((d && makeNote(n.li, n.alter + d, n.oct)) || parseNote(n.name), n);
      });
      tiedIn = ev.notes.map((n, k) => [n, notes[k]]).filter(([n]) => n.tie);
      const out = { ...ev, notes, layout: undefined };
      if (ev.label) out.label = relabelForMode(ev.label, out, tonic);
      return out;
    });
  }

  return {
    LETTERS, SEMI, GLYPH, parseNote, makeNote, transpose, pretty, prettyName, keyFifths, keyMap, parseScore,
    fifthsBetween, transposeEvents, changeMode, analyzeChord,
  };
})();

const Notation = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  const STEP = 5; // half a staff space
  const REF = { treble: 30, bass: 18 }; // diatonic number of the bottom staff line (E4 / G2)
  const KEY_POS = {
    treble: { sharp: [38, 35, 39, 36, 33, 37, 34], flat: [34, 37, 33, 36, 32, 35, 31] },
    bass: { sharp: [24, 21, 25, 22, 19, 23, 20], flat: [20, 23, 19, 22, 18, 21, 17] },
  };
  const MUSIC_FONT = "'Noto Music', 'Apple Symbols', 'Segoe UI Symbol', serif";
  const MIDDLE_C = 28;
  const HEAD_SHIFT = 11;

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function line(g, x1, y1, x2, y2, w = 1, cls) {
    return el('line', { x1, y1, x2, y2, stroke: 'currentColor', 'stroke-width': w, ...(cls ? { class: cls } : {}) }, g);
  }

  function text(g, x, y, str, attrs = {}) {
    const t = el('text', { x, y, fill: 'currentColor', 'text-anchor': 'middle', ...attrs }, g);
    t.textContent = str;
    return t;
  }

  function staffOf(note, clef) {
    if (clef !== 'grand') return clef;
    return note.diatonic >= MIDDLE_C ? 'treble' : 'bass';
  }

  function layoutChord(notes, ref, ev) {
    const sorted = [...notes].sort((a, b) => a.diatonic - b.diatonic);
    const lo = sorted[0].diatonic;
    const hi = sorted[sorted.length - 1].diatonic;
    const hasStem = ev.base < 4;
    const up = (lo + hi) / 2 < ref + 4;
    const off = new Map();
    // Notes a second apart sit on opposite sides of the stem.
    if (up || !hasStem) {
      let prev = false;
      sorted.forEach((n, i) => {
        const s = i > 0 && n.diatonic - sorted[i - 1].diatonic === 1 && !prev ? 1 : 0;
        off.set(n, s); prev = !!s;
      });
    } else {
      let prev = false;
      for (let i = sorted.length - 1; i >= 0; i--) {
        const n = sorted[i];
        const s = i < sorted.length - 1 && sorted[i + 1].diatonic - n.diatonic === 1 && !prev ? -1 : 0;
        off.set(n, s); prev = !!s;
      }
    }
    // Stack accidentals in columns so they don't collide.
    const placed = [];
    let accCols = 0;
    for (const n of [...sorted].reverse()) {
      if (!n.glyph) continue;
      let c = 0;
      while (placed.some(p => p.c === c && Math.abs(p.d - n.diatonic) < 6)) c++;
      placed.push({ c, d: n.diatonic });
      n.accCol = c;
      accCols = Math.max(accCols, c + 1);
    }
    const shifts = [...off.values()];
    return { sorted, up, hasStem, off, accCols, leftShift: shifts.includes(-1), rightShift: shifts.includes(1) };
  }

  // Work out which accidentals to print (key signature + accidentals carried through the bar).
  function prepare(events, clef, fifths) {
    const key = Theory.keyMap(fifths);
    let mem = {};
    let tiedIn = [];
    for (const ev of events) {
      if (ev.bar) { mem = {}; continue; }
      if (ev.rest) { tiedIn = []; continue; }
      for (const n of ev.notes) {
        n.tieFrom = tiedIn.some(t => t.midi === n.midi && t.diatonic === n.diatonic);
        const current = n.diatonic in mem ? mem[n.diatonic] : key[n.letter];
        // A tied continuation never repeats its accidental, even across a bar line.
        n.glyph = !n.tieFrom && (n.forceNatural || n.alter !== current) ? Theory.GLYPH[n.alter] : null;
      }
      for (const n of ev.notes) if (!n.tieFrom) mem[n.diatonic] = n.alter;
      tiedIn = ev.notes.filter(n => n.tie);
      const parts = {};
      for (const n of ev.notes) (parts[staffOf(n, clef)] ||= []).push(n);
      ev.layout = {};
      for (const st in parts) ev.layout[st] = layoutChord(parts[st], REF[st], ev);
    }
  }

  function metrics(ev, showNames) {
    if (ev.bar) return { w: ev.bar === 'end' ? 12 : 16 };
    let accCols = 0, left = 0, right = 0;
    if (!ev.rest) {
      for (const st in ev.layout) {
        const L = ev.layout[st];
        accCols = Math.max(accCols, L.accCols);
        if (L.leftShift) left = HEAD_SHIFT;
        if (L.rightShift) right = HEAD_SHIFT;
      }
    }
    const lead = (accCols ? 4 + accCols * 10 : 0) + left + 9;
    const labelW = ev.label ? ev.label.length * 6.6 + 10 : 0;
    const nameW = showNames && ev.notes && ev.notes.length === 1 ? 30 : 0;
    const half = Math.max(labelW, nameW) / 2;
    const headOff = Math.max(lead, half);
    const flag = ev.base < 1 && !ev.rest ? 6 : 0;
    const after = 10 + right + (ev.dots ? 8 : 0) + flag + 8 + ev.beats * 13;
    return { w: Math.max(headOff + after, headOff + half + 4), headOff };
  }

  function drawHead(g, cx, cy, base) {
    if (base >= 4) {
      el('ellipse', { cx, cy, rx: 6, ry: 4, fill: 'none', stroke: 'currentColor', 'stroke-width': 2.2 }, g);
    } else {
      el('ellipse', {
        cx, cy, rx: 5.7, ry: 3.9,
        transform: `rotate(-22 ${cx} ${cy})`,
        fill: base >= 2 ? 'none' : 'currentColor',
        stroke: 'currentColor', 'stroke-width': base >= 2 ? 1.7 : 0.6,
      }, g);
    }
  }

  // Accidentals are drawn as paths so they look the same regardless of installed fonts.
  function drawAccidental(g, x, y, glyph) {
    const stroke = (d, w) => el('path', { d, fill: 'none', stroke: 'currentColor', 'stroke-width': w, 'stroke-linecap': 'butt' }, g);
    const flat = fx => {
      stroke(`M${fx - 2.5} ${y - 15} L${fx - 2.5} ${y + 5}`, 1.3);
      stroke(`M${fx - 2.5} ${y + 5} C${fx + 6} ${y - 1} ${fx + 4} ${y - 7} ${fx - 2.5} ${y - 1.5}`, 1.8);
    };
    switch (glyph) {
      case '♯':
        stroke(`M${x - 1.8} ${y - 11} L${x - 1.8} ${y + 13} M${x + 2} ${y - 13} L${x + 2} ${y + 11}`, 1.2);
        stroke(`M${x - 4.5} ${y - 2.5} L${x + 4.5} ${y - 5.5} M${x - 4.5} ${y + 5.5} L${x + 4.5} ${y + 2.5}`, 2.6);
        break;
      case '♭': flat(x); break;
      case '𝄫': flat(x - 3); flat(x + 4); break;
      case '♮':
        stroke(`M${x - 2.8} ${y - 13} L${x - 2.8} ${y + 5.5} M${x + 2.8} ${y - 5.5} L${x + 2.8} ${y + 13}`, 1.2);
        stroke(`M${x - 2.8} ${y - 2.5} L${x + 2.8} ${y - 4.5} M${x - 2.8} ${y + 4.5} L${x + 2.8} ${y + 2.5}`, 2.6);
        break;
      case '𝄪':
        stroke(`M${x - 3.5} ${y - 3.5} L${x + 3.5} ${y + 3.5} M${x - 3.5} ${y + 3.5} L${x + 3.5} ${y - 3.5}`, 2.2);
        break;
    }
  }

  function drawChord(g, hx, top, ref, ev, L) {
    const y = d => top + 40 - (d - ref) * STEP;
    const { sorted, up, hasStem, off } = L;
    const lo = sorted[0].diatonic;
    const hi = sorted[sorted.length - 1].diatonic;

    const lx1 = hx - 9 - (L.leftShift ? HEAD_SHIFT : 0);
    const lx2 = hx + 9 + (L.rightShift ? HEAD_SHIFT : 0);
    for (let d = ref - 2; d >= lo; d -= 2) line(g, lx1, y(d), lx2, y(d), 1.2);
    for (let d = ref + 10; d <= hi; d += 2) line(g, lx1, y(d), lx2, y(d), 1.2);

    for (const n of sorted) {
      const cx = hx + off.get(n) * HEAD_SHIFT;
      const cy = y(n.diatonic);
      const hg = n.nct || n.mix ? el('g', { class: n.nct ? 'nct' : 'mix' }, g) : g; // highlighted notes
      drawHead(hg, cx, cy, ev.base);
      n.head = { x: cx, y: cy, up };
      if (ev.dots) {
        const onLine = (n.diatonic - ref) % 2 === 0;
        el('circle', { cx: hx + (L.rightShift ? HEAD_SHIFT : 0) + 10, cy: onLine ? cy - STEP : cy, r: 1.8, fill: 'currentColor' }, g);
      }
      if (n.glyph) {
        const ax = hx - 14 - (L.leftShift ? HEAD_SHIFT : 0) - n.accCol * 10;
        drawAccidental(hg, ax, cy, n.glyph);
      }
    }

    if (!hasStem) return;
    const sx = up ? hx + 5.2 : hx - 5.2;
    let y1, y2;
    if (up) { y1 = y(lo) - 1; y2 = Math.min(y(hi) - 31, top + 20); }
    else { y1 = y(hi) + 1; y2 = Math.max(y(lo) + 31, top + 20); }
    line(g, sx, y1, sx, y2, 1.4);
    const flags = ev.base === 0.5 ? 1 : ev.base === 0.25 ? 2 : 0;
    for (let k = 0; k < flags; k++) {
      const fy = up ? y2 + k * 7 : y2 - k * 7;
      const d = up ? `M${sx} ${fy} q1 7 7 10 q4 4 1 11` : `M${sx} ${fy} q1 -7 7 -10 q4 -4 1 -11`;
      el('path', { d, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round' }, g);
    }
  }

  function drawRest(g, x, top, ev) {
    const b = ev.base;
    if (b >= 4) el('rect', { x: x - 6, y: top + 10, width: 12, height: 5, fill: 'currentColor' }, g);
    else if (b >= 2) el('rect', { x: x - 6, y: top + 15, width: 12, height: 5, fill: 'currentColor' }, g);
    else if (b >= 1) {
      el('path', {
        d: `M${x - 2} ${top + 7} L${x + 4} ${top + 14} L${x - 1} ${top + 20} L${x + 4} ${top + 27} Q${x - 4} ${top + 24} ${x + 1} ${top + 33}`,
        fill: 'none', stroke: 'currentColor', 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
      }, g);
    } else {
      el('circle', { cx: x - 2, cy: top + 16, r: 2.4, fill: 'currentColor' }, g);
      el('path', { d: `M${x - 3} ${top + 17} Q${x + 1} ${top + 19} ${x + 4} ${top + 14} L${x - 1} ${top + 29}`, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.6 }, g);
    }
    if (ev.dots) el('circle', { cx: x + 9, cy: top + 15, r: 1.8, fill: 'currentColor' }, g);
  }

  function drawClef(g, clef, top) {
    if (clef === 'treble') text(g, 18, top + 31, '𝄞', { 'font-family': MUSIC_FONT, 'font-size': 41 });
    else text(g, 18, top + 30.5, '𝄢', { 'font-family': MUSIC_FONT, 'font-size': 41 });
  }

  // Curved tie between two noteheads of the same pitch; split in two when it crosses a line break.
  function drawTies(events) {
    const arc = (sg, x1, x2, y, up) => {
      const dir = up ? 1 : -1; // tie curves away from the stem
      const y0 = y + dir * 5, h = dir * Math.min(9, 3 + (x2 - x1) / 10);
      el('path', {
        d: `M${x1} ${y0} Q${(x1 + x2) / 2} ${y0 + h * 1.6} ${x2} ${y0} Q${(x1 + x2) / 2} ${y0 + h * 1.2} ${x1} ${y0} Z`,
        fill: 'currentColor', stroke: 'currentColor', 'stroke-width': 0.5, class: 'tie',
      }, sg);
    };
    const playable = events.map((e, i) => i).filter(i => events[i].notes);
    playable.forEach((i, k) => {
      const next = events[playable[k + 1]];
      if (!next || events.slice(i + 1, playable[k + 1]).some(e => e.rest)) return;
      for (const n of events[i].notes) {
        if (!n.tie || !n.head) continue;
        const m = next.notes.find(t => t.midi === n.midi && t.diatonic === n.diatonic);
        if (!m || !m.head) continue;
        const a = n.head, b = m.head;
        if (a.si === b.si) arc(a.sg, a.x + 6, b.x - 6, a.y, a.up);
        else { arc(a.sg, a.x + 6, a.endX - 2, a.y, a.up); arc(b.sg, b.startX - 14, b.x - 6, b.y, b.up); }
      }
    });
  }

  /**
   * Render events into container.
   * cfg: { events, clef: 'treble'|'bass'|'grand', key, time: [4,4], showNames, onNoteClick(i) }
   */
  function render(container, cfg) {
    const clef = cfg.clef || 'treble';
    const staves = clef === 'grand' ? ['treble', 'bass'] : [clef];
    const fifths = Theory.keyFifths(cfg.key);
    const events = cfg.events;
    prepare(events, clef, fifths);
    const showNames = !!cfg.showNames;
    const ms = events.map(ev => metrics(ev, showNames));
    const W = Math.max(280, Math.floor(cfg.width || container.clientWidth || 700));
    const keyW = Math.abs(fifths) * 10;
    const header = first => 40 + keyW + (first && cfg.time ? 26 : 0) + 8;

    // Group into chunks (measures, or single events when there are no bar lines), then into systems.
    const hasBars = events.some(e => e.bar);
    const chunks = [];
    let cur = [];
    events.forEach((ev, i) => {
      cur.push(i);
      if (!hasBars || ev.bar) { chunks.push(cur); cur = []; }
    });
    if (cur.length) chunks.push(cur);
    const systems = [];
    let sys = [], sx = header(true);
    for (const ch of chunks) {
      const cw = ch.reduce((s, i) => s + ms[i].w, 0);
      if (sys.length && sx + cw > W - 6) { systems.push(sys); sys = []; sx = header(false); }
      sys.push(...ch); sx += cw;
    }
    if (sys.length) systems.push(sys);

    const hasLabels = events.some(e => e.label);
    const hasNames = showNames && events.some(e => e.notes && e.notes.length === 1);
    const TOP = 46;
    const tops = staves.length === 2 ? [TOP, TOP + 108] : [TOP];
    const bottom = tops[tops.length - 1] + 40;
    let yy = bottom + 34;
    const namesY = yy; if (hasNames) yy += 18;
    const labelsY = yy; if (hasLabels) yy += 16;
    const sysH = Math.max(yy, bottom + 36) + 2;

    const svg = el('svg', {
      viewBox: `0 0 ${W} ${systems.length * sysH}`, width: W, height: systems.length * sysH,
      class: 'score-svg', role: 'img',
    });
    const groups = [];

    systems.forEach((idxs, si) => {
      const sg = el('g', { transform: `translate(0 ${si * sysH})` }, svg);
      const first = si === 0;
      const isLast = si === systems.length - 1;
      let x = header(first);
      const natural = idxs.reduce((s, i) => s + ms[i].w, 0);
      const noteCount = idxs.filter(i => !events[i].bar).length || 1;
      let per = Math.max(0, W - 6 - x - natural) / noteCount;
      if (isLast) per = Math.min(per, systems.length > 1 ? 30 : 60);
      const endX = x + natural + per * idxs.filter(i => !events[i].bar).length;

      staves.forEach((st, k) => {
        const top = tops[k];
        const sg2 = el('g', { class: 'staff' }, sg);
        for (let l = 0; l < 5; l++) line(sg2, 4, top + l * 10, endX, top + l * 10, 1, 'staff-line');
        drawClef(sg2, st, top);
        const kind = fifths > 0 ? 'sharp' : 'flat';
        for (let i = 0; i < Math.abs(fifths); i++) {
          const d = KEY_POS[st][kind][i];
          drawAccidental(sg2, 44 + i * 10, top + 40 - (d - REF[st]) * STEP, fifths > 0 ? '♯' : '♭');
        }
        if (first && cfg.time) {
          const tx = 40 + keyW + 14;
          const attrs = { 'font-family': "Georgia, 'Times New Roman', serif", 'font-weight': 700, 'font-size': 23 };
          text(sg2, tx, top + 18, String(cfg.time[0]), attrs);
          text(sg2, tx, top + 38, String(cfg.time[1]), attrs);
        }
      });
      if (staves.length === 2) {
        line(sg, 4, tops[0], 4, tops[1] + 40, 1.4);
        el('path', {
          d: `M2 ${tops[0]} q-6 ${(tops[1] + 40 - tops[0]) / 4} -2 ${(tops[1] + 40 - tops[0]) / 2} q-4 ${(tops[1] + 40 - tops[0]) / 4} 2 ${(tops[1] + 40 - tops[0]) / 2}`,
          fill: 'none', stroke: 'currentColor', 'stroke-width': 2.2,
        }, sg);
      }

      for (const i of idxs) {
        const ev = events[i];
        const m = ms[i];
        if (ev.bar) {
          const yTop = tops[0], yBot = tops[tops.length - 1] + 40;
          if (ev.bar === 'end') {
            line(sg, x + m.w - 7, yTop, x + m.w - 7, yBot, 1.2);
            el('rect', { x: x + m.w - 4, y: yTop, width: 4, height: yBot - yTop, fill: 'currentColor' }, sg);
          } else {
            line(sg, x + m.w / 2, yTop, x + m.w / 2, yBot, 1.2);
          }
          x += m.w;
          continue;
        }
        const w = m.w + per;
        const g = el('g', { class: 'ev', 'data-i': i }, sg);
        el('rect', { x, y: tops[0] - 40, width: w, height: bottom - tops[0] + 80, fill: 'transparent' }, g);
        const hx = x + m.headOff;
        if (ev.rest) staves.forEach((st, k) => drawRest(g, hx, tops[k], ev));
        else for (const st in ev.layout) drawChord(g, hx, tops[staves.indexOf(st)], REF[st], ev, ev.layout[st]);
        if (hasNames && ev.notes && ev.notes.length === 1) {
          text(g, hx, namesY, Theory.pretty(ev.notes[0], true), { 'font-size': 11, class: 'note-name' });
        }
        if (ev.label) text(g, hx, labelsY, ev.label, { 'font-size': 12, 'font-weight': 600, class: 'note-label' });
        if (cfg.onNoteClick && !ev.rest) {
          g.style.cursor = 'pointer';
          g.addEventListener('click', () => cfg.onNoteClick(i));
        }
        if (ev.notes) ev.notes.forEach(n => { if (n.head) { n.head.sg = sg; n.head.si = si; n.head.endX = endX; n.head.startX = header(false); } });
        groups[i] = g;
        x += w;
      }
    });

    drawTies(events);
    container.innerHTML = '';
    container.appendChild(svg);
    return { svg, groups };
  }

  return { render };
})();
