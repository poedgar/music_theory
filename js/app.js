/* App shell: navigation, lesson pages, example players, piano, widgets and practice games. */

const App = (() => {
  // ───────── persistence (per-browser conveniences only) ─────────
  const store = {
    get(k, d) { try { const v = localStorage.getItem('mt:' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('mt:' + k, JSON.stringify(v)); } catch { /* ignore */ } },
  };

  const state = {
    speed: store.get('speed', 1),
    names: store.get('names', false),
    done: new Set(store.get('done', [])),
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.floor(Math.random() * a.length)];

  // ───────── scores mounted on the current page ─────────
  let mounted = [];

  /** Render a score and keep it re-renderable (resize, note-name toggle). */
  function mountScore(container, cfg) {
    const sc = { container, cfg, groups: [] };
    sc.draw = () => {
      const r = Notation.render(container, {
        ...cfg,
        showNames: cfg.showNames ?? state.names,
        width: container.clientWidth,
        onNoteClick: cfg.clickable === false ? null : i => playSingle(sc, i),
      });
      sc.groups = r.groups;
    };
    sc.draw();
    mounted = mounted.filter(m => m.container !== container);
    mounted.push(sc);
    return sc;
  }

  function highlight(sc, i, on) {
    sc.groups[i]?.classList.toggle('playing', on);
    const ev = sc.cfg.events[i];
    if (ev?.notes) ev.notes.forEach(n => Piano.mark(n.midi, on));
  }

  function playSingle(sc, i) {
    const ev = sc.cfg.events[i];
    Player.play([ev], {
      bpm: 70, speed: 1, instrument: sc.cfg.instrument,
      onEvent: (_, on) => highlight(sc, i, on),
    });
  }

  function playScore(sc, opts = {}) {
    return Player.play(sc.cfg.events, {
      bpm: sc.cfg.bpm || 96,
      speed: state.speed,
      broken: opts.broken,
      instrument: sc.cfg.instrument,
      owner: opts.owner,
      onEvent: (i, on) => highlight(sc, i, on),
      onEnd: opts.onEnd,
    });
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => mounted.forEach(sc => sc.container.isConnected && sc.draw()), 150);
  });

  // ───────── piano ─────────
  const Piano = (() => {
    const LO = 36, HI = 84; // C2 … C6
    const keys = new Map();
    const BLACK = new Set([1, 3, 6, 8, 10]);
    const MAP = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', ';'];
    let base = 60;
    const held = new Map();
    const marks = new Map();

    function build() {
      const root = $('#piano');
      let whiteIndex = 0;
      for (let m = LO; m <= HI; m++) {
        const pc = m % 12;
        let k;
        if (BLACK.has(pc)) {
          k = h(`<div class="black" style="left:${whiteIndex * 30 - 10}px"></div>`);
        } else {
          k = h(`<div class="white">${pc === 0 ? `<span class="lbl">C${m / 12 - 1}</span>` : ''}</div>`);
          whiteIndex++;
        }
        k.dataset.midi = m;
        k.addEventListener('pointerdown', e => {
          e.preventDefault();
          const v = AudioEngine.playNote(m, null, 1.6, 0.85);
          mark(m, true);
          const up = () => { v.release(); mark(m, false); window.removeEventListener('pointerup', up); };
          window.addEventListener('pointerup', up);
        });
        keys.set(m, k);
        root.appendChild(k);
      }
      updateHints();
      // Start scrolled to middle C on small screens.
      requestAnimationFrame(() => {
        const wrap = $('#piano-wrap');
        const c4 = keys.get(60);
        wrap.scrollLeft = c4.offsetLeft - wrap.clientWidth / 2 + 100;
      });

      window.addEventListener('keydown', e => {
        if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
        if (/INPUT|SELECT|TEXTAREA/.test(document.activeElement?.tagName) && document.activeElement.type !== 'range' && document.activeElement.type !== 'checkbox') return;
        const key = e.key.toLowerCase();
        if (key === 'z') { base = Math.max(LO, base - 12); updateHints(); return; }
        if (key === 'x') { base = Math.min(HI - 12, base + 12); updateHints(); return; }
        const idx = MAP.indexOf(key);
        if (idx < 0) return;
        const m = base + idx;
        if (m > HI || held.has(key)) return;
        held.set(key, { m, v: AudioEngine.playNote(m, null, 6, 0.85) });
        mark(m, true);
      });
      window.addEventListener('keyup', e => {
        const key = e.key.toLowerCase();
        const n = held.get(key);
        if (!n) return;
        n.v.release(); mark(n.m, false); held.delete(key);
      });
      window.addEventListener('blur', () => { held.forEach(n => { n.v.release(); mark(n.m, false); }); held.clear(); });

      $('#piano-toggle').addEventListener('click', () => {
        const wrap = $('#piano-wrap');
        const hidden = wrap.classList.toggle('hidden');
        $('#piano-toggle').textContent = (hidden ? '▸' : '▾') + ' Keyboard';
        store.set('pianoHidden', hidden);
      });
      if (store.get('pianoHidden', false)) $('#piano-toggle').click();
    }

    function updateHints() {
      keys.forEach(k => k.querySelector('.hint')?.remove());
      MAP.forEach((ch, i) => {
        const k = keys.get(base + i);
        if (k) k.insertAdjacentHTML('beforeend', `<span class="hint">${ch.toUpperCase()}</span>`);
      });
      $('#piano-octave').textContent = `Keys start at C${base / 12 - 1}`;
    }

    // Reference-counted so overlapping highlights don't clear each other.
    function mark(m, on) {
      const n = (marks.get(m) || 0) + (on ? 1 : -1);
      marks.set(m, Math.max(0, n));
      keys.get(m)?.classList.toggle('on', n > 0);
    }

    return { build, mark };
  })();

  // ───────── sidebar ─────────
  function renderSidebar(activeId) {
    const sb = $('#sidebar');
    const total = LESSONS.length;
    const done = LESSONS.filter(l => state.done.has(l.id)).length;
    sb.innerHTML = `
      <div class="px-4 pb-3 pt-5">
        <div class="mb-1 flex justify-between text-xs font-medium text-stone-500 dark:text-stone-400"><span>Your progress</span><span>${done} / ${total}</span></div>
        <div class="h-1.5 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800"><div class="h-full rounded-full bg-indigo-500 transition-all" style="width:${(done / total) * 100}%"></div></div>
      </div>
      <nav class="px-2">
        ${SECTIONS.map((s, si) => `
          <div class="mt-3">
            <div class="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">${si + 1}. ${s.title}</div>
            ${LESSONS.filter(l => l.section === s.id).map(l => `
              <a href="#${l.id}" class="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${l.id === activeId
                ? 'bg-indigo-100 font-semibold text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100'
                : 'text-stone-700 hover:bg-stone-200/60 dark:text-stone-300 dark:hover:bg-stone-800'}">
                <span class="grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[10px] ${state.done.has(l.id)
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : 'border-stone-300 dark:border-stone-600'}">${state.done.has(l.id) ? '✓' : ''}</span>
                <span class="truncate">${l.title}</span>
              </a>`).join('')}
          </div>`).join('')}
      </nav>`;
  }

  function closeMenu() {
    $('#sidebar').classList.add('-translate-x-full');
    $('#backdrop').classList.add('hidden');
  }

  // ───────── pages ─────────
  function renderHome() {
    const c = $('#content');
    const next = LESSONS.find(l => !state.done.has(l.id)) || LESSONS[0];
    c.innerHTML = `
      <div class="mx-auto max-w-3xl">
        <div class="mb-8 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-lg sm:p-10">
          <div class="mb-3 font-music text-5xl opacity-90">𝄞 ♪ ♫</div>
          <h1 class="font-display text-3xl font-bold leading-tight sm:text-4xl">Learn music, from your first note to real harmony</h1>
          <p class="mt-3 max-w-xl text-indigo-100">${LESSONS.length} short lessons. Every idea comes with written examples you can play, so you see the notes and hear them at the same time.</p>
          <a href="#${next.id}" class="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-semibold text-indigo-700 shadow hover:bg-indigo-50">${state.done.size ? 'Continue' : 'Start learning'}: ${next.title} →</a>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          ${SECTIONS.map((s, si) => {
            const ls = LESSONS.filter(l => l.section === s.id);
            const d = ls.filter(l => state.done.has(l.id)).length;
            return `<a href="#${ls[0].id}" class="card group block transition hover:border-indigo-300 hover:shadow-md dark:hover:border-indigo-700">
              <div class="flex items-baseline justify-between">
                <span class="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Part ${si + 1}</span>
                <span class="text-xs text-stone-400">${d}/${ls.length}</span>
              </div>
              <h2 class="mt-1 font-display text-xl font-bold group-hover:text-indigo-700 dark:group-hover:text-indigo-300">${s.title}</h2>
              <p class="mt-1 text-sm text-stone-600 dark:text-stone-400">${s.blurb}</p>
              <p class="mt-3 text-xs text-stone-500 dark:text-stone-500">${ls.map(l => l.title).join(' · ')}</p>
            </a>`;
          }).join('')}
        </div>
      </div>`;
  }

  function renderLesson(lesson) {
    const c = $('#content');
    const idx = LESSONS.indexOf(lesson);
    const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
    const section = SECTIONS.find(s => s.id === lesson.section);
    const sIdx = SECTIONS.indexOf(section);

    c.innerHTML = `
      <article class="mx-auto max-w-3xl">
        <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Part ${sIdx + 1} · ${section.title}</div>
        <h1 class="font-display text-3xl font-bold leading-tight sm:text-4xl">${lesson.title}</h1>
        <p class="mt-2 text-lg text-stone-500 dark:text-stone-400">${lesson.summary}</p>
        <div class="lesson-body mt-6 text-[15.5px]">${lesson.body}</div>
        <div id="widget"></div>
        <div id="examples" class="mt-6 space-y-5"></div>
        ${lesson.listen ? `
        <section class="mt-8 rounded-2xl border border-rose-200 bg-rose-50/60 p-4 text-sm dark:border-rose-900/60 dark:bg-rose-950/30">
          <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-300">🎧 Listen for it</h2>
          <ul class="list-disc space-y-1 pl-5 text-stone-700 dark:text-stone-300">${lesson.listen.map(x => `<li>${x}</li>`).join('')}</ul>
        </section>` : ''}
        ${sourcesBox(lesson)}
        <div class="mt-10 flex flex-wrap items-center gap-3 border-t border-stone-200 pt-6 dark:border-stone-800">
          ${prev ? `<a href="#${prev.id}" class="btn-ghost">← ${prev.title}</a>` : ''}
          <button id="done-btn" class="btn-ghost"></button>
          ${next ? `<a href="#${next.id}" id="next-btn" class="btn-primary ml-auto">Next: ${next.title} →</a>` : `<a href="#" id="next-btn" class="btn-primary ml-auto">Finish 🎉</a>`}
        </div>
      </article>`;

    const ex = $('#examples', c);
    if (lesson.examples?.length) {
      ex.insertAdjacentHTML('beforebegin', `<h2 class="mt-8 font-display text-xl font-bold">Examples <span class="text-sm font-normal text-stone-500 dark:text-stone-400">· click any note to hear it alone</span></h2>`);
      lesson.examples.forEach(e => ex.appendChild(exampleCard(e, lesson.id)));
    }
    if (lesson.widget) Widgets[lesson.widget]($('#widget', c));

    const doneBtn = $('#done-btn', c);
    const paintDone = () => {
      const d = state.done.has(lesson.id);
      doneBtn.innerHTML = d ? '✓ Completed' : 'Mark complete';
      doneBtn.classList.toggle('!border-emerald-500', d);
      doneBtn.classList.toggle('!text-emerald-700', d);
    };
    paintDone();
    doneBtn.addEventListener('click', () => {
      state.done.has(lesson.id) ? state.done.delete(lesson.id) : state.done.add(lesson.id);
      store.set('done', [...state.done]);
      paintDone();
      renderSidebar(lesson.id);
    });
    $('#next-btn', c).addEventListener('click', () => {
      state.done.add(lesson.id);
      store.set('done', [...state.done]);
    });
  }

  const TONICS = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];

  function exampleInfo(ex) {
    const tonicName = ex.tonic || (ex.key ? ex.key.replace(/m$/, '') : 'C');
    return {
      tonic: Theory.parseNote(tonicName + '4'),
      mode: ex.mode || (ex.key && ex.key.endsWith('m') ? 'minor' : 'major'),
      fifths: Theory.keyFifths(ex.key),
    };
  }

  /** The 12 keys an example can move to in `mode`, each spelled with the simplest key signature. */
  function keyOptions(info, mode) {
    // The parallel minor has 3 more flats (or 3 fewer sharps) than the major.
    const shift = mode === info.mode ? 0 : mode === 'minor' ? -3 : 3;
    const byPc = new Map();
    for (const t of TONICS) {
      const n = Theory.parseNote(t + '4');
      const f = Theory.fifthsBetween(info.tonic, n);
      if (f === null) continue;
      const fifths = info.fifths + shift + f;
      if (Math.abs(fifths) > 7) continue;
      const cur = byPc.get(n.midi % 12);
      if (!cur || Math.abs(fifths) < Math.abs(cur.fifths)) byPc.set(n.midi % 12, { t, f, fifths, pc: n.midi % 12 });
    }
    return [...byPc.values()].sort((a, b) => a.pc - b.pc).map(o => ({ ...o, mode, label: `${Theory.prettyName(o.t)} ${mode}` }));
  }

  function sourcesBox(lesson) {
    const src = Sources.lesson(lesson.id);
    if (!src) return '';
    return `
      <section class="mt-8 rounded-2xl border border-stone-200 bg-stone-100/60 p-4 text-sm dark:border-stone-800 dark:bg-stone-900/60">
        <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">Sources</h2>
        <p class="text-stone-700 dark:text-stone-300">${src.by || 'Lesson text written for this app'}. Reference: ${BOOK.full}:</p>
        <ul class="mt-1.5 list-disc space-y-0.5 pl-5 text-stone-600 dark:text-stone-400">
          ${src.refs.map(r => `<li>${Sources.formatRef(r, false)}</li>`).join('')}
        </ul>
        ${src.note ? `<p class="mt-2 text-stone-500 dark:text-stone-400">${src.note}</p>` : ''}
      </section>`;
  }

  function exampleCard(ex, lessonId) {
    const source = Sources.example(lessonId, ex.title);
    const original = Theory.parseScore(ex.score);
    const hasChords = original.some(e => e.notes && e.notes.length > 1);
    const info = exampleInfo(ex);
    const otherMode = info.mode === 'major' ? 'minor' : info.mode === 'minor' ? 'major' : null;
    // Offer the major/minor switch only when it is meaningful and actually changes some notes.
    let canSwitch = false;
    if (otherMode && ex.modeSwitch !== false) {
      const conv = Theory.changeMode(original, info.tonic, otherMode);
      canSwitch = conv.some((ev, i) => ev.notes && ev.notes.some((n, k) => n.midi !== original[i].notes[k].midi));
    }
    const card = h(`
      <section class="card">
        <div class="flex flex-col gap-3">
          <div class="min-w-0 flex-1">
            ${ex.instrument === 'guitar' ? '<span class="mb-1 mr-1 inline-block rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-rose-800 dark:bg-rose-900/50 dark:text-rose-200">⚡ Distorted guitar</span>' : ''}
            ${ex.repertoire ? '<span class="mb-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">♫ From the repertoire</span>' : ''}
            <h3 class="font-semibold">${ex.title}</h3>
            ${ex.desc ? `<p class="mt-0.5 text-sm text-stone-600 dark:text-stone-400">${ex.desc}</p>` : ''}
            <p class="key-note mt-1 hidden text-xs italic text-amber-700 dark:text-amber-300"></p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            ${canSwitch ? `
            <div class="inline-flex rounded-lg border border-stone-300 p-0.5 text-sm dark:border-stone-700" role="group" aria-label="Mode">
              ${['major', 'minor'].map(m => `<button class="mode-btn rounded-md px-2.5 py-1 capitalize" data-mode="${m}">${m}</button>`).join('')}
            </div>` : ''}
            <label class="${ex.transpose === false ? 'hidden' : 'flex'} items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400" title="Transpose this example to another key">
              Key
              <select class="key-sel rounded-lg border border-stone-300 bg-white py-1.5 pl-2 pr-7 text-sm text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"></select>
            </label>
            <button class="play btn-primary">▶ Play</button>
            ${hasChords ? '<button class="broken btn-ghost" title="Play chord notes one at a time">Arpeggiate</button>' : ''}
          </div>
        </div>
        <div class="score mt-3"></div>
        <p class="mt-2 text-xs text-stone-500 dark:text-stone-400">
          <span class="font-medium">Source:</span> ${source.by}.${source.ref ? ` <span class="font-medium">Reference:</span> ${Sources.formatRef(source.ref)}.` : ''}
        </p>
      </section>`);

    const sel = $('.key-sel', card);
    const note = $('.key-note', card);
    let mode = info.mode;
    let opts = [];
    const origLabel = keyOptions(info, info.mode).find(o => o.f === 0).label;

    const fillKeys = pc => {
      opts = keyOptions(info, mode);
      sel.innerHTML = opts.map((o, i) => {
        const isOrig = o.f === 0 && mode === info.mode;
        return `<option value="${i}">${o.label}${isOrig ? ' (original)' : ''}</option>`;
      }).join('');
      sel.value = Math.max(0, opts.findIndex(o => o.pc === pc));
    };
    const paintModes = () => card.querySelectorAll('.mode-btn').forEach(b => {
      b.className = 'mode-btn rounded-md px-2.5 py-1 capitalize ' + (b.dataset.mode === mode ? 'bg-indigo-600 text-white' : 'text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800');
    });
    fillKeys(info.tonic.midi % 12);
    paintModes();

    requestAnimationFrame(() => {
      const sc = mountScore($('.score', card), { events: original, clef: ex.clef, key: ex.key, time: ex.time, bpm: ex.bpm, instrument: ex.instrument });
      const playBtn = $('.play', card);
      wirePlayButton(playBtn, sc, false);
      if (hasChords) wirePlayButton($('.broken', card), sc, true);

      const apply = () => {
        const o = opts[+sel.value];
        Player.stop();
        const base = mode === info.mode ? original : Theory.changeMode(original, info.tonic, mode);
        sc.cfg.events = Theory.transposeEvents(base, o.f);
        sc.cfg.key = o.fifths;
        sc.draw();
        const changed = o.label !== origLabel;
        note.classList.toggle('hidden', !changed);
        note.textContent = changed ? `Shown in ${o.label} (original: ${origLabel}). Note names in the text above refer to the original.` : '';
        // Play straight away so the change can be heard.
        playScore(sc, { owner: playBtn, onEnd: () => { playBtn.innerHTML = '▶ Play'; } });
        playBtn.innerHTML = '■ Stop';
      };
      sel.addEventListener('change', apply);
      card.querySelectorAll('.mode-btn').forEach(b => b.addEventListener('click', () => {
        if (b.dataset.mode === mode) return;
        const pc = opts[+sel.value].pc;
        mode = b.dataset.mode;
        fillKeys(pc);
        paintModes();
        apply();
      }));
    });
    return card;
  }

  function wirePlayButton(btn, sc, broken) {
    const label = btn.innerHTML;
    btn.addEventListener('click', () => {
      if (Player.isPlaying(btn)) { Player.stop(); return; }
      playScore(sc, {
        broken, owner: btn,
        onEnd: () => { btn.innerHTML = label; },
      });
      btn.innerHTML = '■ Stop';
    });
  }

  // ───────── widgets ─────────
  const INTERVALS = [
    { id: 'm2', name: 'minor 2nd', steps: 1, semis: 1 },
    { id: 'M2', name: 'Major 2nd', steps: 1, semis: 2 },
    { id: 'm3', name: 'minor 3rd', steps: 2, semis: 3 },
    { id: 'M3', name: 'Major 3rd', steps: 2, semis: 4 },
    { id: 'P4', name: 'Perfect 4th', steps: 3, semis: 5 },
    { id: 'TT', name: 'Tritone', steps: 3, semis: 6 },
    { id: 'P5', name: 'Perfect 5th', steps: 4, semis: 7 },
    { id: 'm6', name: 'minor 6th', steps: 5, semis: 8 },
    { id: 'M6', name: 'Major 6th', steps: 5, semis: 9 },
    { id: 'm7', name: 'minor 7th', steps: 6, semis: 10 },
    { id: 'M7', name: 'Major 7th', steps: 6, semis: 11 },
    { id: 'P8', name: 'Octave', steps: 7, semis: 12 },
  ];

  const CHORDS = {
    maj: { name: 'Major', sym: '', f: [[0, 0], [2, 4], [4, 7]], desc: 'M3 + m3' },
    min: { name: 'Minor', sym: 'm', f: [[0, 0], [2, 3], [4, 7]], desc: 'm3 + M3' },
    dim: { name: 'Diminished', sym: '°', f: [[0, 0], [2, 3], [4, 6]], desc: 'm3 + m3' },
    aug: { name: 'Augmented', sym: '+', f: [[0, 0], [2, 4], [4, 8]], desc: 'M3 + M3' },
    sus2: { name: 'Suspended 2nd', sym: 'sus2', f: [[0, 0], [1, 2], [4, 7]], desc: 'M2 + P4 (no 3rd)' },
    sus4: { name: 'Suspended 4th', sym: 'sus4', f: [[0, 0], [3, 5], [4, 7]], desc: 'P4 + M2 (no 3rd)' },
    maj7: { name: 'Major 7th', sym: 'maj7', f: [[0, 0], [2, 4], [4, 7], [6, 11]], desc: 'major triad + M7' },
    dom7: { name: 'Dominant 7th', sym: '7', f: [[0, 0], [2, 4], [4, 7], [6, 10]], desc: 'major triad + m7' },
    min7: { name: 'Minor 7th', sym: 'm7', f: [[0, 0], [2, 3], [4, 7], [6, 10]], desc: 'minor triad + m7' },
    hdim7: { name: 'Half-diminished 7th', sym: 'ø7', f: [[0, 0], [2, 3], [4, 6], [6, 10]], desc: 'diminished triad + m7' },
    dim7: { name: 'Diminished 7th', sym: '°7', f: [[0, 0], [2, 3], [4, 6], [6, 9]], desc: 'diminished triad + d7' },
  };
  const ROLE = ['root', '3rd', '5th', '7th'];

  function rootNote(name, low = false) {
    const li = Theory.LETTERS.indexOf(name[0]);
    return Theory.parseNote(name + (li >= (low ? 4 : 5) ? 3 : 4));
  }

  function buildChord(root, quality, inversion = 0) {
    const f = CHORDS[quality].f;
    const notes = f.map(([s, x], i) => ({ note: Theory.transpose(root, s, x), role: f.length === 3 && quality.startsWith('sus') && i === 1 ? (s === 1 ? '2nd' : '4th') : ROLE[i] }));
    for (let i = 0; i < inversion; i++) {
      const [s, x] = f[i];
      notes[i].note = Theory.transpose(root, s + 7, x + 12);
    }
    return notes.sort((a, b) => a.note.midi - b.note.midi);
  }

  const Widgets = {
    circle(root) {
      const MAJ = [['C', 0], ['G', 1], ['D', 2], ['A', 3], ['E', 4], ['B', 5], ['F#', 6], ['Db', -5], ['Ab', -4], ['Eb', -3], ['Bb', -2], ['F', -1]];
      const MIN = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'Bb', 'F', 'C', 'G', 'D'];
      const cx = 170, cy = 170;
      const pos = (i, r) => { const a = (i * 30 - 90) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
      const wrap = h(`
        <section class="card mt-6">
          <h3 class="font-display text-xl font-bold">Interactive circle of fifths</h3>
          <p class="mt-1 text-sm text-stone-600 dark:text-stone-400">Outer ring: major keys. Inner ring: their relative minors. Click a key to see its key signature and hear its scale.</p>
          <div class="mt-4 grid items-center gap-6 md:grid-cols-[300px_1fr]">
            <svg viewBox="0 0 340 340" class="mx-auto w-full max-w-[300px] select-none">
              <circle cx="${cx}" cy="${cy}" r="152" class="fill-stone-100 dark:fill-stone-800"/>
              <circle cx="${cx}" cy="${cy}" r="96" class="fill-white dark:fill-stone-900"/>
              <circle cx="${cx}" cy="${cy}" r="52" class="fill-stone-100 dark:fill-stone-800"/>
              ${MAJ.map(([k, f], i) => {
                const [x, y] = pos(i, 125), [mx, my] = pos(i, 74), [sx, sy] = pos(i, 166);
                const acc = f === 0 ? '' : f > 0 ? f + '♯' : -f + '♭';
                return `
                  <g class="ck cursor-pointer" data-i="${i}" data-m="maj">
                    <circle cx="${x}" cy="${y}" r="22" class="fill-white stroke-stone-300 dark:fill-stone-900 dark:stroke-stone-600"/>
                    <text x="${x}" y="${y + 5}" text-anchor="middle" class="fill-stone-800 dark:fill-stone-100" font-weight="700" font-size="15">${Theory.prettyName(k)}</text>
                  </g>
                  <g class="ck cursor-pointer" data-i="${i}" data-m="min">
                    <circle cx="${mx}" cy="${my}" r="17" class="fill-stone-100 stroke-stone-300 dark:fill-stone-800 dark:stroke-stone-600"/>
                    <text x="${mx}" y="${my + 4}" text-anchor="middle" class="fill-stone-600 dark:fill-stone-300" font-weight="600" font-size="11.5">${Theory.prettyName(MIN[i])}m</text>
                  </g>
                  <text x="${sx}" y="${sy + 4}" text-anchor="middle" class="fill-stone-400" font-size="10.5">${acc}</text>`;
              }).join('')}
              <text x="${cx}" y="${cy + 4}" text-anchor="middle" class="fill-stone-400" font-size="10">fifths</text>
            </svg>
            <div>
              <div id="cof-info" class="text-sm text-stone-600 dark:text-stone-400">Pick a key on the circle.</div>
              <div id="cof-score" class="score mt-3"></div>
              <button id="cof-play" class="btn-primary mt-2 hidden">▶ Play scale</button>
            </div>
          </div>
        </section>`);
      root.appendChild(wrap);
      let sc = null;
      const select = (i, mode) => {
        wrap.querySelectorAll('.ck circle').forEach(c => c.classList.remove('!fill-indigo-500', '!stroke-indigo-600'));
        wrap.querySelectorAll('.ck text').forEach(t => t.classList.remove('!fill-white'));
        const g = wrap.querySelector(`.ck[data-i="${i}"][data-m="${mode}"]`);
        g.querySelector('circle').classList.add('!fill-indigo-500', '!stroke-indigo-600');
        g.querySelector('text').classList.add('!fill-white');

        const [majName, fifths] = MAJ[i];
        const tonicName = mode === 'maj' ? majName : MIN[i];
        const tonic = rootNote(tonicName);
        const steps = mode === 'maj' ? [0, 2, 4, 5, 7, 9, 11, 12] : [0, 2, 3, 5, 7, 8, 10, 12];
        const notes = steps.map((s, d) => Theory.transpose(tonic, d, s));
        const accNotes = Object.entries(Theory.keyMap(fifths)).filter(([, a]) => a).map(([l, a]) => l + (a > 0 ? '♯' : '♭'));
        const order = fifths > 0 ? 'FCGDAEB' : 'BEADGCF';
        accNotes.sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
        const nb = i === 0 ? '' : ` · neighbors: ${Theory.prettyName(MAJ[(i + 11) % 12][0])} and ${Theory.prettyName(MAJ[(i + 1) % 12][0])} major`;
        $('#cof-info', wrap).innerHTML = `
          <div class="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">${Theory.prettyName(tonicName)} ${mode === 'maj' ? 'major' : 'minor'}</div>
          <div class="mt-1">${fifths === 0 ? 'No sharps or flats' : `${Math.abs(fifths)} ${fifths > 0 ? 'sharp' : 'flat'}${Math.abs(fifths) > 1 ? 's' : ''}: <b>${accNotes.join(' ')}</b>`}</div>
          <div class="mt-0.5">Relative ${mode === 'maj' ? 'minor' : 'major'}: <b>${mode === 'maj' ? Theory.prettyName(MIN[i]) + ' minor' : Theory.prettyName(majName) + ' major'}</b>${mode === 'maj' ? nb : ''}</div>`;
        const events = Theory.parseScore(notes.map((n, d) => `${n.name}${d === 7 ? '/h' : ''}`).join(' '));
        sc = mountScore($('#cof-score', wrap), { events, key: fifths, bpm: 150 });
        $('#cof-play', wrap).classList.remove('hidden');
        playScore(sc);
      };
      wrap.querySelectorAll('.ck').forEach(g => g.addEventListener('click', () => select(+g.dataset.i, g.dataset.m)));
      $('#cof-play', wrap).addEventListener('click', () => sc && playScore(sc));
    },

    chordBuilder(root) {
      const ROOTS = ['C', 'C#', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
      const wrap = h(`
        <section class="card mt-6">
          <h3 class="font-display text-xl font-bold">Chord builder</h3>
          <p class="mt-1 text-sm text-stone-600 dark:text-stone-400">Build any triad or seventh chord on any root. Each change plays the chord.</p>
          <div class="mt-4 flex flex-wrap gap-3 text-sm">
            <label class="flex flex-col gap-1"><span class="text-xs font-medium text-stone-500">Root</span>
              <select id="cb-root" class="rounded-lg border border-stone-300 bg-white px-2 py-1.5 dark:border-stone-700 dark:bg-stone-800">${ROOTS.map(r => `<option value="${r}">${Theory.prettyName(r)}</option>`).join('')}</select></label>
            <label class="flex flex-col gap-1"><span class="text-xs font-medium text-stone-500">Quality</span>
              <select id="cb-q" class="rounded-lg border border-stone-300 bg-white px-2 py-1.5 dark:border-stone-700 dark:bg-stone-800">${Object.entries(CHORDS).map(([k, c]) => `<option value="${k}">${c.name}</option>`).join('')}</select></label>
            <label class="flex flex-col gap-1"><span class="text-xs font-medium text-stone-500">Inversion</span>
              <select id="cb-inv" class="rounded-lg border border-stone-300 bg-white px-2 py-1.5 dark:border-stone-700 dark:bg-stone-800"></select></label>
            <button id="cb-play" class="btn-primary self-end">▶ Play</button>
          </div>
          <div id="cb-info" class="mt-4 text-sm"></div>
          <div id="cb-score" class="score mt-2"></div>
        </section>`);
      root.appendChild(wrap);
      let sc;
      const invSel = $('#cb-inv', wrap);
      const fillInv = () => {
        const n = CHORDS[$('#cb-q', wrap).value].f.length;
        const prev = +invSel.value || 0;
        invSel.innerHTML = ['Root position', '1st inversion', '2nd inversion', '3rd inversion'].slice(0, n).map((t, i) => `<option value="${i}">${t}</option>`).join('');
        invSel.value = Math.min(prev, n - 1);
      };
      const update = (play = true) => {
        const rName = $('#cb-root', wrap).value, q = $('#cb-q', wrap).value, inv = +invSel.value;
        const r = rootNote(rName, true);
        const chord = buildChord(r, q, inv);
        if (chord.some(c => !c.note)) { $('#cb-info', wrap).textContent = 'That chord needs a triple accidental. Try an enharmonic root.'; return; }
        const c = CHORDS[q];
        const bass = chord[0].note;
        const sym = Theory.prettyName(rName) + c.sym + (inv ? '/' + Theory.pretty(bass) : '');
        $('#cb-info', wrap).innerHTML = `
          <span class="font-display text-2xl font-bold">${sym}</span>
          <span class="ml-2 text-stone-500">${Theory.prettyName(rName)} ${c.name.toLowerCase()} · ${c.desc}</span>
          <div class="mt-1 text-stone-600 dark:text-stone-400">Notes: ${chord.map(x => `<b>${Theory.pretty(x.note)}</b> <span class="text-xs">(${x.role})</span>`).join(' · ')}</div>`;
        const names = chord.map(x => x.note.name);
        const src = chord.map(x => `${x.note.name}/q:${x.role}`).join(' ') + ` | (${names.join(' ')})/w:${sym.replace(/ /g, '_')} ||`;
        sc = mountScore($('#cb-score', wrap), { events: Theory.parseScore(src), bpm: 120 });
        if (play) playScore(sc);
      };
      $('#cb-root', wrap).addEventListener('change', () => update());
      $('#cb-q', wrap).addEventListener('change', () => { fillInv(); update(); });
      invSel.addEventListener('change', () => update());
      $('#cb-play', wrap).addEventListener('click', () => sc && playScore(sc));
      fillInv();
      requestAnimationFrame(() => update(false));
    },

    noteReader(root) {
      const wrap = h(`
        <section class="card mt-2">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="inline-flex rounded-lg border border-stone-300 p-0.5 text-sm dark:border-stone-700" role="group">
              <button data-clef="treble" class="clef-btn rounded-md px-3 py-1">Treble</button>
              <button data-clef="bass" class="clef-btn rounded-md px-3 py-1">Bass</button>
              <button data-clef="both" class="clef-btn rounded-md px-3 py-1">Both</button>
            </div>
            <div id="nr-score-text" class="text-sm text-stone-600 dark:text-stone-400"></div>
          </div>
          <div id="nr-score" class="score mx-auto mt-4 max-w-xs"></div>
          <div id="nr-btns" class="mt-4 grid grid-cols-7 gap-2">${'CDEFGAB'.split('').map(l => `<button class="answer-btn text-base font-semibold" data-l="${l}">${l}</button>`).join('')}</div>
          <p id="nr-fb" class="mt-3 h-5 text-center text-sm font-medium"></p>
        </section>`);
      root.appendChild(wrap);
      let clef = store.get('nrClef', 'treble'), note, noteClef, right = 0, total = 0, streak = 0, locked = false, last;
      const paintClef = () => wrap.querySelectorAll('.clef-btn').forEach(b => b.className = 'clef-btn rounded-md px-3 py-1 ' + (b.dataset.clef === clef ? 'bg-indigo-600 text-white' : 'hover:bg-stone-100 dark:hover:bg-stone-800'));
      const paintScore = () => { $('#nr-score-text', wrap).innerHTML = `Score <b>${right}/${total}</b> · streak <b>${streak}</b>`; };
      const nextNote = () => {
        noteClef = clef === 'both' ? pick(['treble', 'bass']) : clef;
        const [lo, hi] = noteClef === 'treble' ? [28, 40] : [16, 28];
        let d;
        do { d = lo + Math.floor(Math.random() * (hi - lo + 1)); } while (d === last);
        last = d;
        note = Theory.makeNote(d % 7, 0, Math.floor(d / 7));
        mountScore($('#nr-score', wrap), { events: Theory.parseScore(note.name + '/w'), clef: noteClef, showNames: false, clickable: false });
        wrap.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('correct', 'wrong'));
        $('#nr-fb', wrap).textContent = '';
        locked = false;
      };
      wrap.querySelectorAll('.clef-btn').forEach(b => b.addEventListener('click', () => { clef = b.dataset.clef; store.set('nrClef', clef); paintClef(); nextNote(); }));
      wrap.querySelectorAll('.answer-btn').forEach(b => b.addEventListener('click', () => {
        if (locked) return;
        locked = true; total++;
        AudioEngine.playNote(note.midi, null, 0.9, 0.85);
        const ok = b.dataset.l === note.letter;
        if (ok) { right++; streak++; b.classList.add('correct'); $('#nr-fb', wrap).innerHTML = `<span class="text-emerald-600 dark:text-emerald-400">Correct! That's ${note.letter}${note.oct}.</span>`; }
        else {
          streak = 0; b.classList.add('wrong');
          wrap.querySelector(`.answer-btn[data-l="${note.letter}"]`).classList.add('correct');
          $('#nr-fb', wrap).innerHTML = `<span class="text-rose-600 dark:text-rose-400">Not quite. That's ${note.letter}${note.oct}.</span>`;
        }
        paintScore();
        setTimeout(nextNote, ok ? 800 : 1600);
      }));
      paintClef(); paintScore();
      requestAnimationFrame(nextNote);
    },

    intervalTrainer(root) {
      const LEVELS = {
        basic: ['M2', 'M3', 'P4', 'P5', 'P8'],
        medium: ['m2', 'M2', 'm3', 'M3', 'P4', 'P5', 'm6', 'M6', 'P8'],
        all: INTERVALS.map(i => i.id),
      };
      const ROOTS = ['C', 'D', 'E', 'F', 'G', 'A', 'Bb', 'Eb', 'F#', 'Ab', 'Db', 'B'];
      const wrap = h(`
        <section class="card mt-2">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <select id="it-level" class="rounded-lg border border-stone-300 bg-white px-2 py-1.5 text-sm dark:border-stone-700 dark:bg-stone-800">
              <option value="basic">Basic: M2 M3 P4 P5 P8</option>
              <option value="medium">Intermediate: + minor intervals, 6ths</option>
              <option value="all">All 12 intervals</option>
            </select>
            <div id="it-score-text" class="text-sm text-stone-600 dark:text-stone-400"></div>
          </div>
          <div class="mt-4 flex flex-wrap justify-center gap-2">
            <button id="it-replay" class="btn-primary">↻ Hear again</button>
            <button id="it-next" class="btn-ghost">Skip →</button>
          </div>
          <div id="it-btns" class="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4"></div>
          <p id="it-fb" class="mt-3 min-h-5 text-center text-sm font-medium"></p>
          <div id="it-score" class="score mx-auto mt-2 max-w-sm"></div>
        </section>`);
      root.appendChild(wrap);
      const lvlSel = $('#it-level', wrap);
      lvlSel.value = store.get('itLevel', 'basic');
      let cur, right = 0, total = 0, locked = false;
      const paintScore = () => { $('#it-score-text', wrap).innerHTML = `Score <b>${right}/${total}</b>`; };
      const play = () => {
        if (!cur) return;
        const ev = Theory.parseScore(`${cur.a.name}/q ${cur.b.name}/q (${cur.a.name} ${cur.b.name})/h`);
        Player.play(ev, { bpm: 90, speed: state.speed });
      };
      const paintBtns = () => {
        $('#it-btns', wrap).innerHTML = LEVELS[lvlSel.value].map(id => {
          const iv = INTERVALS.find(x => x.id === id);
          return `<button class="answer-btn flex-col !gap-0" data-id="${id}"><span class="font-semibold">${id === 'TT' ? 'TT' : id}</span><span class="text-[11px] opacity-70">${iv.name}</span></button>`;
        }).join('');
        wrap.querySelectorAll('.answer-btn').forEach(b => b.addEventListener('click', () => answer(b)));
      };
      const next = () => {
        const ids = LEVELS[lvlSel.value];
        let iv, a, b;
        do {
          iv = INTERVALS.find(x => x.id === pick(ids));
          a = rootNote(pick(ROOTS), true);
          b = Theory.transpose(a, iv.steps, iv.semis);
        } while (!b);
        cur = { iv, a, b };
        locked = false;
        $('#it-fb', wrap).textContent = '';
        $('#it-score', wrap).innerHTML = '';
        wrap.querySelectorAll('.answer-btn').forEach(x => x.classList.remove('correct', 'wrong'));
        play();
      };
      const answer = (btn) => {
        if (locked || !cur) return;
        locked = true; total++;
        const ok = btn.dataset.id === cur.iv.id;
        if (ok) right++;
        btn.classList.add(ok ? 'correct' : 'wrong');
        wrap.querySelector(`.answer-btn[data-id="${cur.iv.id}"]`)?.classList.add('correct');
        $('#it-fb', wrap).innerHTML = ok
          ? `<span class="text-emerald-600 dark:text-emerald-400">Correct: ${cur.iv.name} (${cur.iv.semis} half steps).</span>`
          : `<span class="text-rose-600 dark:text-rose-400">That was a ${cur.iv.name} (${cur.iv.semis} half steps).</span>`;
        $('#it-fb', wrap).insertAdjacentHTML('beforeend', ` <button class="ml-2 text-indigo-600 underline dark:text-indigo-300" id="it-cont">Next →</button>`);
        $('#it-cont', wrap).addEventListener('click', next);
        const label = `${Theory.pretty(cur.a)}–${Theory.pretty(cur.b)}`.replace(/ /g, '_');
        mountScore($('#it-score', wrap), { events: Theory.parseScore(`${cur.a.name}/q ${cur.b.name}/q (${cur.a.name} ${cur.b.name})/h:${label}`), bpm: 90 });
        paintScore();
      };
      lvlSel.addEventListener('change', () => { store.set('itLevel', lvlSel.value); paintBtns(); next(); });
      $('#it-replay', wrap).addEventListener('click', () => cur ? play() : next());
      $('#it-next', wrap).addEventListener('click', next);
      paintBtns(); paintScore();
      $('#it-fb', wrap).innerHTML = '<span class="text-stone-500">Press “Hear again” to start.</span>';
      $('#it-replay', wrap).textContent = '▶ Start';
      $('#it-replay', wrap).addEventListener('click', () => { $('#it-replay', wrap).textContent = '↻ Hear again'; }, { once: true });
    },

    chordTrainer(root) {
      const ROOTS = ['C', 'D', 'E', 'F', 'G', 'A', 'Bb', 'Eb', 'Ab', 'B', 'F#', 'Db'];
      const wrap = h(`
        <section class="card mt-2">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <label class="flex cursor-pointer items-center gap-2 text-sm"><input id="ct-7" type="checkbox" class="h-4 w-4 accent-indigo-600"> Include seventh chords</label>
            <div id="ct-score-text" class="text-sm text-stone-600 dark:text-stone-400"></div>
          </div>
          <div class="mt-4 flex flex-wrap justify-center gap-2">
            <button id="ct-replay" class="btn-primary">▶ Start</button>
            <button id="ct-next" class="btn-ghost">Skip →</button>
          </div>
          <div id="ct-btns" class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"></div>
          <p id="ct-fb" class="mt-3 min-h-5 text-center text-sm font-medium"></p>
          <div id="ct-score" class="score mx-auto mt-2 max-w-sm"></div>
        </section>`);
      root.appendChild(wrap);
      const sev = $('#ct-7', wrap);
      sev.checked = store.get('ct7', false);
      let cur, right = 0, total = 0, locked = false;
      const types = () => sev.checked ? ['maj', 'min', 'dim', 'aug', 'maj7', 'dom7', 'min7', 'hdim7', 'dim7'] : ['maj', 'min', 'dim', 'aug'];
      const paintScore = () => { $('#ct-score-text', wrap).innerHTML = `Score <b>${right}/${total}</b>`; };
      const play = () => {
        if (!cur) return;
        const names = cur.notes.map(n => n.note.name);
        Player.play(Theory.parseScore(names.map(n => n + '/e').join(' ') + ` (${names.join(' ')})/h`), { bpm: 100, speed: state.speed });
      };
      const paintBtns = () => {
        $('#ct-btns', wrap).innerHTML = types().map(t => `<button class="answer-btn flex-col !gap-0" data-q="${t}"><span class="font-semibold">${CHORDS[t].name}</span><span class="text-[11px] opacity-70">${CHORDS[t].desc}</span></button>`).join('');
        wrap.querySelectorAll('.answer-btn').forEach(b => b.addEventListener('click', () => answer(b)));
      };
      const next = () => {
        let q, r, notes;
        do {
          q = pick(types());
          r = rootNote(pick(ROOTS), true);
          notes = buildChord(r, q, 0);
        } while (notes.some(n => !n.note));
        cur = { q, r, notes };
        locked = false;
        $('#ct-fb', wrap).textContent = '';
        $('#ct-score', wrap).innerHTML = '';
        $('#ct-replay', wrap).textContent = '↻ Hear again';
        wrap.querySelectorAll('.answer-btn').forEach(x => x.classList.remove('correct', 'wrong'));
        play();
      };
      const answer = (btn) => {
        if (locked || !cur) return;
        locked = true; total++;
        const ok = btn.dataset.q === cur.q;
        if (ok) right++;
        btn.classList.add(ok ? 'correct' : 'wrong');
        wrap.querySelector(`.answer-btn[data-q="${cur.q}"]`)?.classList.add('correct');
        const c = CHORDS[cur.q];
        const sym = Theory.pretty(cur.r) + c.sym;
        $('#ct-fb', wrap).innerHTML = (ok
          ? `<span class="text-emerald-600 dark:text-emerald-400">Correct: ${sym} (${c.name.toLowerCase()}).</span>`
          : `<span class="text-rose-600 dark:text-rose-400">That was ${sym} (${c.name.toLowerCase()}).</span>`) +
          ` <button class="ml-2 text-indigo-600 underline dark:text-indigo-300" id="ct-cont">Next →</button>`;
        $('#ct-cont', wrap).addEventListener('click', next);
        const names = cur.notes.map(n => n.note.name);
        mountScore($('#ct-score', wrap), { events: Theory.parseScore(names.map((n, i) => `${n}/q:${cur.notes[i].role}`).join(' ') + ` | (${names.join(' ')})/w:${sym} ||`), bpm: 100 });
        paintScore();
      };
      sev.addEventListener('change', () => { store.set('ct7', sev.checked); paintBtns(); next(); });
      $('#ct-replay', wrap).addEventListener('click', () => cur ? play() : next());
      $('#ct-next', wrap).addEventListener('click', next);
      paintBtns(); paintScore();
    },
  };

  // ───────── routing ─────────
  function route() {
    Player.stop();
    mounted = [];
    const id = location.hash.slice(1);
    const lesson = LESSONS.find(l => l.id === id);
    renderSidebar(lesson?.id);
    if (lesson) renderLesson(lesson); else renderHome();
    document.title = (lesson ? lesson.title + ' · ' : '') + 'Music Theory';
    window.scrollTo(0, 0);
    closeMenu();
  }

  function init() {
    Piano.build();

    const speed = $('#speed'), speedVal = $('#speed-val');
    speed.value = state.speed;
    speedVal.textContent = Math.round(state.speed * 100) + '%';
    speed.addEventListener('input', () => {
      state.speed = +speed.value;
      speedVal.textContent = Math.round(state.speed * 100) + '%';
      store.set('speed', state.speed);
    });

    const names = $('#names');
    names.checked = state.names;
    names.addEventListener('change', () => {
      state.names = names.checked;
      store.set('names', state.names);
      mounted.forEach(sc => sc.container.isConnected && sc.cfg.showNames === undefined && sc.draw());
    });

    $('#menu-btn').addEventListener('click', () => {
      $('#sidebar').classList.remove('-translate-x-full');
      $('#backdrop').classList.remove('hidden');
    });
    $('#backdrop').addEventListener('click', closeMenu);

    window.addEventListener('hashchange', route);
    route();
    // Fonts arriving late can shift glyphs; redraw once they're ready.
    document.fonts?.ready.then(() => mounted.forEach(sc => sc.container.isConnected && sc.draw()));
  }

  return { init };
})();

App.init();
