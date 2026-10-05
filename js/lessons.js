/* Curriculum. Each example uses the mini score language described in notation.js (Theory.parseScore). */

const SECTIONS = [
  { id: 'fundamentals', title: 'Fundamentals', blurb: 'Pitch, note names, the staff and clefs, sharps and flats.' },
  { id: 'rhythm', title: 'Rhythm & Meter', blurb: 'Note values, rests, time signatures and reading melodies.' },
  { id: 'scales', title: 'Scales & Keys', blurb: 'Major and minor scales, key signatures, modes.' },
  { id: 'intervals', title: 'Intervals', blurb: 'Measuring the distance between two notes.' },
  { id: 'chords', title: 'Chords', blurb: 'Triads, inversions, chords in a key, seventh chords.' },
  { id: 'harmony', title: 'Harmony', blurb: 'Function, cadences, progressions, voice leading, modulation.' },
  { id: 'practice', title: 'Practice', blurb: 'Note reading and ear-training games.' },
];

const LESSONS = [
  // ───────────────────────── Fundamentals ─────────────────────────
  {
    id: 'pitch', section: 'fundamentals', title: 'Sound & Pitch',
    summary: 'What a note is, and why notes an octave apart sound alike.',
    body: `
      <p>Music is organized sound. Every musical sound, a <b>note</b>, has four basic qualities:</p>
      <ul>
        <li><b>Pitch</b>: how high or low it sounds. Pitch comes from the speed of vibration (frequency). Faster vibrations sound higher.</li>
        <li><b>Duration</b>: how long it lasts.</li>
        <li><b>Dynamics</b>: how loud or soft it is.</li>
        <li><b>Timbre</b>: the "color" of the sound. A violin and a flute playing the same pitch still sound different.</li>
      </ul>
      <p>When one note vibrates exactly <b>twice as fast</b> as another, the two blend so well that we give them the same letter name. The distance between them is an <b>octave</b>. The A above middle C vibrates 440 times per second (440&nbsp;Hz). The next A up vibrates at 880&nbsp;Hz.</p>
      <div class="tip"><b>Try it:</b> the keyboard at the bottom of the screen is playable. Click the keys, or use your computer keys <kbd>A</kbd> <kbd>W</kbd> <kbd>S</kbd> <kbd>E</kbd> <kbd>D</kbd> <kbd>F</kbd> <kbd>T</kbd> <kbd>G</kbd> <kbd>Y</kbd> <kbd>H</kbd> <kbd>U</kbd> <kbd>J</kbd> <kbd>K</kbd>. Press <kbd>Z</kbd> or <kbd>X</kbd> to change octave.</div>`,
    examples: [
      {
        title: 'The same note in four octaves',
        desc: 'Each C vibrates twice as fast as the one before it. They sound like "the same note, only higher."',
        clef: 'grand', bpm: 80,
        score: 'C3/h:131_Hz C4/h:262_Hz C5/h:523_Hz C6/h:1047_Hz',
      },
      {
        title: 'Higher and lower',
        desc: 'A melody is a series of pitches that rise and fall. Watch the notes climb up the staff and come back down.',
        bpm: 110,
        score: 'C4/q E4/q G4/q C5/q | G4/q E4/q C4/h ||',
      },
    ],
  },
  {
    id: 'alphabet', section: 'fundamentals', title: 'The Musical Alphabet',
    summary: 'Seven letters, repeating forever, laid out on the piano.',
    body: `
      <p>Notes are named with just seven letters: <b>A B C D E F G</b>. After G the alphabet starts again at A, one octave higher.</p>
      <p>On a piano the <b>white keys</b> carry these letter names. The <b>black keys</b> come in groups of two and three, and those groups are your landmarks:</p>
      <ul>
        <li><b>C</b> is the white key just to the left of every group of <i>two</i> black keys.</li>
        <li><b>F</b> is the white key just to the left of every group of <i>three</i> black keys.</li>
      </ul>
      <p>To say which octave a note is in, we add a number: <b>C4</b> is <b>middle C</b>, the C near the center of the piano. The number goes up by one at every C, so the notes above middle C are D4, E4 … B4, and then C5.</p>`,
    examples: [
      {
        title: 'White keys from C to C', modeSwitch: false,
        desc: 'Seven different letters, then C again: one octave.',
        bpm: 100,
        score: 'C4:C D4:D E4:E F4:F G4:G A4:A B4:B C5:C',
      },
      {
        title: 'The alphabet wraps around', modeSwitch: false,
        desc: 'Starting on A: after G we are back to A, an octave higher. The octave number changes at C (B3 → C4).',
        bpm: 100,
        score: 'A3:A3 B3:B3 C4:C4 D4:D4 E4:E4 F4:F4 G4:G4 A4:A4',
      },
    ],
  },
  {
    id: 'treble', section: 'fundamentals', title: 'The Staff & Treble Clef',
    summary: 'Five lines, four spaces, and a clef that names them.',
    body: `
      <p>Music is written on a <b>staff</b>: five horizontal lines and the four spaces between them. The higher a note sits on the staff, the higher it sounds. Each step from a line to the next space, or from a space to the next line, is the next letter of the alphabet.</p>
      <p>A <b>clef</b> at the start of the staff tells you which pitch goes with which line. The <b>treble clef</b> (also called the G clef) curls around the second line from the bottom and marks it as <b>G4</b>. It is used for higher sounds: right hand on piano, violin, flute, voice.</p>
      <ul>
        <li>Lines, bottom to top: <b>E G B D F</b> ("<i>Every Good Boy Does Fine</i>")</li>
        <li>Spaces, bottom to top: <b>F A C E</b> (they spell "<i>FACE</i>")</li>
      </ul>
      <p>Notes above or below the staff use short extra lines called <b>ledger lines</b>. Middle C sits on one ledger line below the treble staff.</p>`,
    examples: [
      { title: 'The lines: E G B D F', modeSwitch: false, desc: '“Every Good Boy Does Fine”', bpm: 90, score: 'E4/h:E G4/h:G B4/h:B D5/h:D F5/h:F' },
      { title: 'The spaces: F A C E', modeSwitch: false, desc: 'The spaces spell the word FACE.', bpm: 90, score: 'F4/h:F A4/h:A C5/h:C E5/h:E' },
      {
        title: 'Ledger lines', modeSwitch: false,
        desc: 'Notes below and above the staff. Middle C (C4) needs one ledger line, and so does A5.',
        bpm: 100,
        score: 'A3:A3 B3:B3 C4:middle_C D4:D4 | G5:G5 A5:A5 B5:B5 C6:C6',
      },
    ],
  },
  {
    id: 'bass', section: 'fundamentals', title: 'The Bass Clef & Grand Staff',
    summary: 'The F clef for low notes, and how the two staves join.',
    body: `
      <p>The <b>bass clef</b> (or F clef) is for lower sounds: the left hand on piano, cello, bass guitar, tuba. Its two dots sit on either side of the fourth line, which marks that line as <b>F3</b>.</p>
      <ul>
        <li>Lines, bottom to top: <b>G B D F A</b> ("<i>Good Boys Do Fine Always</i>")</li>
        <li>Spaces, bottom to top: <b>A C E G</b> ("<i>All Cows Eat Grass</i>")</li>
      </ul>
      <p>Piano music joins a treble staff and a bass staff with a brace. This is the <b>grand staff</b>. Middle C sits exactly between the two staves: one ledger line below the treble staff, or one ledger line above the bass staff.</p>`,
    examples: [
      { title: 'Bass clef lines: G B D F A', modeSwitch: false, desc: '“Good Boys Do Fine Always”', clef: 'bass', bpm: 90, score: 'G2/h:G B2/h:B D3/h:D F3/h:F A3/h:A' },
      { title: 'Bass clef spaces: A C E G', modeSwitch: false, desc: '“All Cows Eat Grass”', clef: 'bass', bpm: 90, score: 'A2/h:A C3/h:C E3/h:E G3/h:G' },
      {
        title: 'Climbing the grand staff', modeSwitch: false,
        desc: 'Two octaves from C3 to C5. Middle C (C4) is where the music crosses from the bass staff into the treble staff.',
        clef: 'grand', bpm: 130,
        score: 'C3/q D3/q E3/q F3/q G3/q A3/q B3/q C4/q:middle_C D4/q E4/q F4/q G4/q A4/q B4/q C5/h',
      },
      {
        title: 'Bach: Cello Suite No. 1, Prelude', repertoire: true,
        desc: 'One of the most famous openings for a bass-clef instrument. The low open G string anchors each bar while the arpeggio climbs to B and C.',
        clef: 'bass', key: 'G', bpm: 72, time: [4, 4], modeSwitch: false,
        score: 'G2/s D3/s B3/s A3/s B3/s D3/s B3/s D3/s G2/s D3/s B3/s A3/s B3/s D3/s B3/s D3/s | G2/s E3/s C4/s B3/s C4/s E3/s C4/s E3/s G2/s E3/s C4/s B3/s C4/s E3/s C4/s E3/s ||',
      },
    ],
  },
  {
    id: 'accidentals', section: 'fundamentals', title: 'Half Steps, Whole Steps & Accidentals',
    summary: 'Sharps, flats, naturals, and the smallest distances in music.',
    body: `
      <p>A <b>half step</b> (semitone) is the smallest distance in Western music: from one key on the piano to the very next key, black or white. A <b>whole step</b> (tone) is two half steps.</p>
      <p>Most neighboring white keys are a whole step apart, with a black key between them. There are two exceptions: <b>E–F</b> and <b>B–C</b> have no black key between them, so they are only a half step apart.</p>
      <p><b>Accidentals</b> change a note's pitch:</p>
      <table>
        <tr><th>Symbol</th><th>Name</th><th>Effect</th></tr>
        <tr><td class="music">♯</td><td>Sharp</td><td>raises a note one half step</td></tr>
        <tr><td class="music">♭</td><td>Flat</td><td>lowers a note one half step</td></tr>
        <tr><td class="music">♮</td><td>Natural</td><td>cancels a sharp or flat</td></tr>
        <tr><td class="music">𝄪 / 𝄫</td><td>Double sharp / flat</td><td>raises / lowers a note two half steps</td></tr>
      </table>
      <p>An accidental lasts until the end of its <b>measure</b> (bar). A black key has two names: the key between C and D is both <b>C♯</b> and <b>D♭</b>. Two names for the same sound are called <b>enharmonic</b> equivalents.</p>`,
    examples: [
      {
        title: 'The chromatic scale: every half step', modeSwitch: false,
        desc: 'All twelve different pitches inside one octave, each a half step above the last.',
        bpm: 90, time: [4, 4],
        score: 'C4/e C#4/e D4/e D#4/e E4/e F4/e F#4/e G4/e | G#4/e A4/e A#4/e B4/e C5/h ||',
      },
      {
        title: 'Half steps vs. whole steps', modeSwitch: false,
        desc: 'E–F and B–C are natural half steps. C–D and F–G are whole steps.',
        bpm: 90,
        score: 'E4/q:half F4/q | B4/q:half C5/q | C4/q:whole D4/q | F4/q:whole G4/q ||',
      },
      {
        title: 'Sharp, natural, flat', modeSwitch: false,
        desc: 'G, then G♯ (higher), then G♮ (back to G), then G♭ (lower). The natural sign is needed because the sharp still applies until the bar line.',
        bpm: 80,
        score: 'G4/q:G G#4/q:G♯ G4/q:G♮ Gb4/q:G♭ ||',
      },
      {
        title: 'Enharmonic notes', modeSwitch: false,
        desc: 'F♯ and G♭ are written differently but sound identical, and so are C♯ and D♭.',
        bpm: 80,
        score: 'F#4/h:F♯ Gb4/h:G♭ | C#5/h:C♯ Db5/h:D♭ ||',
      },
      {
        title: 'Rimsky-Korsakov: “Flight of the Bumblebee”', repertoire: true,
        desc: 'The buzzing comes from the chromatic scale: almost every note is a half step from the last. Shown an octave lower than the original.',
        bpm: 66, time: [2, 4], modeSwitch: false,
        score: 'E5/s D#5/s D5/s C#5/s D5/s C#5/s C5/s B4/s | C5/s B4/s Bb4/s A4/s G#4/s G4/s F#4/s F4/s ||',
      },
      {
        title: 'Grieg: “In the Hall of the Mountain King”', repertoire: true,
        desc: 'In B minor. The theme climbs the scale, then sinks by half steps (F♯ – F – E) on its way back down.',
        clef: 'bass', key: 'Bm', bpm: 100, time: [4, 4], modeSwitch: false,
        score: 'B2/e C#3/e D3/e E3/e F#3/e D3/e F#3/q | Fn3/e C#3/e Fn3/q E3/e C3/e E3/q ||',
      },
    ],
  },

  // ───────────────────────── Rhythm ─────────────────────────
  {
    id: 'note-values', section: 'rhythm', title: 'Note Values',
    summary: 'How long notes last: whole, half, quarter, eighth, and dotted notes.',
    body: `
      <p>Under most music there is a steady pulse called the <b>beat</b>, the thing you tap your foot to. A note's shape tells you how many beats it lasts:</p>
      <table>
        <tr><th>Note</th><th>Looks like</th><th>Beats (in 4/4)</th></tr>
        <tr><td>Whole note</td><td>hollow, no stem</td><td>4</td></tr>
        <tr><td>Half note</td><td>hollow, with stem</td><td>2</td></tr>
        <tr><td>Quarter note</td><td>filled, with stem</td><td>1</td></tr>
        <tr><td>Eighth note</td><td>filled, stem + one flag</td><td>½</td></tr>
        <tr><td>Sixteenth note</td><td>filled, stem + two flags</td><td>¼</td></tr>
      </table>
      <p>Each value is half the length of the one above it. A <b>dot</b> after a note adds half of the note's value: a dotted half note lasts 2 + 1 = 3 beats, and a dotted quarter lasts 1 + ½ = 1½ beats.</p>
      <div class="tip"><b>Counting:</b> count quarter notes as “1, 2, 3, 4”. For eighth notes, add “and” between the beats: “1 & 2 & 3 & 4 &”.</div>`,
    examples: [
      {
        title: 'From whole notes to eighth notes',
        desc: 'Each bar lasts 4 beats, split into smaller and smaller pieces.',
        bpm: 90, time: [4, 4],
        score: 'G4/w:whole | G4/h:half G4/h | G4/q:quarter G4/q G4/q G4/q | G4/e:eighths G4/e G4/e G4/e G4/e G4/e G4/e G4/e ||',
      },
      {
        title: 'Dotted notes',
        desc: 'Dotted half (3 beats) + quarter (1). Then dotted quarter (1½) + eighth (½) + half (2).',
        bpm: 90, time: [4, 4],
        score: 'C5/h.:dotted_half G4/q | E4/q.:dotted_qtr F4/e G4/h ||',
      },
    ],
  },
  {
    id: 'rests', section: 'rhythm', title: 'Rests',
    summary: 'Silence is part of rhythm too.',
    body: `
      <p>A <b>rest</b> is a measured silence. Every note value has a matching rest that lasts exactly as long:</p>
      <ul>
        <li><b>Whole rest</b>: a small block hanging <i>below</i> the 4th line. It also means "rest for a whole bar".</li>
        <li><b>Half rest</b>: a small block sitting <i>on top of</i> the middle line.</li>
        <li><b>Quarter rest</b>: a zigzag.</li>
        <li><b>Eighth rest</b>: a slanted stroke with one "flag" dot.</li>
      </ul>
      <p>Keep counting through rests. The beat doesn't stop just because you stop playing. Rests placed on the beat make the notes fall on the "and"s in between, which is called <b>syncopation</b>.</p>`,
    examples: [
      {
        title: 'Notes and rests',
        desc: 'Quarter rests, a half rest, then a full bar of silence (whole rest).',
        bpm: 100, time: [4, 4],
        score: 'G4/q R/q G4/q R/q | G4/h R/h | R/w | C5/w ||',
      },
      {
        title: 'Off-beats with eighth rests',
        desc: 'The rests fall on the beats, so the notes land on the “and”s. This gives a bouncy, off-beat feel.',
        bpm: 100, time: [4, 4],
        score: 'R/e G4/e R/e G4/e R/e G4/e R/e G4/e | C5/q R/q G4/q R/q ||',
      },
      {
        title: 'Mozart: Eine kleine Nachtmusik', repertoire: true,
        desc: 'The famous opening: eighth rests separate the first notes, so each one rings out like a call.',
        key: 'G', bpm: 120, time: [4, 4], modeSwitch: false,
        score: 'G4/q R/e D4/e G4/q R/e D4/e | G4/e D4/e G4/e B4/e D5/q R/q | C5/q R/e A4/e C5/q R/e A4/e | C5/e A4/e F#4/e A4/e D4/q R/q ||',
      },
    ],
  },
  {
    id: 'meter', section: 'rhythm', title: 'Meter & Time Signatures',
    summary: 'How beats are grouped into measures.',
    body: `
      <p>Beats are grouped into <b>measures</b> (bars), separated by <b>bar lines</b>. The <b>time signature</b> at the start of the piece says how they are grouped:</p>
      <ul>
        <li><b>Top number</b>: how many beats are in each measure.</li>
        <li><b>Bottom number</b>: which note value gets one beat (4 = quarter note, 8 = eighth note, 2 = half note).</li>
      </ul>
      <table>
        <tr><th>Time sig.</th><th>Feel</th><th>Typical music</th></tr>
        <tr><td>4/4</td><td><b>1</b> 2 <b>3</b> 4</td><td>Most pop, rock, marches (also written C, "common time")</td></tr>
        <tr><td>3/4</td><td><b>1</b> 2 3</td><td>Waltzes, minuets</td></tr>
        <tr><td>2/4</td><td><b>1</b> 2</td><td>Polkas, marches</td></tr>
        <tr><td>6/8</td><td><b>1</b> 2 3 <b>4</b> 5 6</td><td>Jigs, lullabies: two beats, each split into three</td></tr>
      </table>
      <p>The first beat of each measure, the <b>downbeat</b>, is usually the strongest. Listen for the slight accent in the examples below. 4/4 and 3/4 are <b>simple</b> meters: each beat divides into two. 6/8 is <b>compound</b>: each beat divides into three.</p>`,
    examples: [
      {
        title: '4/4: march feel',
        desc: 'Four beats per bar. Count “1 2 3 4” and listen for the stronger first beat.',
        bpm: 110, time: [4, 4],
        score: 'C4/q G4/q E4/q G4/q | C4/q G4/q E4/q G4/q | D4/q G4/q F4/q G4/q | E4/w ||',
      },
      {
        title: '3/4: waltz',
        desc: 'OOM-pah-pah: a low note on beat 1, a chord on beats 2 and 3.',
        bpm: 150, time: [3, 4],
        score: 'C4/q (E4 G4)/q (E4 G4)/q | G3/q (D4 F4)/q (D4 F4)/q | G3/q (D4 F4)/q (D4 F4)/q | C4/q (E4 G4)/q (E4 G4)/q ||',
      },
      {
        title: '6/8: “Row, Row, Row Your Boat”',
        desc: 'Two big beats per bar, each divided into three eighths: “ONE-and-a TWO-and-a”.',
        bpm: 100, time: [6, 8],
        score: 'C4/q. C4/q. | C4/q D4/e E4/q. | E4/q D4/e E4/q F4/e | G4/h. ||',
      },
      {
        title: 'Minuet in G (from the Anna Magdalena Bach Notebook)', repertoire: true,
        desc: 'A minuet is a dance in 3/4. Feel the strong first beat of each bar.',
        key: 'G', bpm: 120, time: [3, 4], modeSwitch: false,
        score: 'D5/q G4/e A4/e B4/e C5/e | D5/q G4/q G4/q | E5/q C5/e D5/e E5/e F#5/e | G5/q G4/q G4/q | C5/q D5/e C5/e B4/e A4/e | B4/q C5/e B4/e A4/e G4/e | F#4/q G4/e A4/e B4/e G4/e | A4/h. ||',
      },
    ],
  },
  {
    id: 'reading', section: 'rhythm', title: 'Reading a Melody',
    summary: 'Putting pitch and rhythm together.',
    body: `
      <p>Now you can read real music. Before you play, scan the page:</p>
      <ol>
        <li><b>Clef</b>: which notes are on which lines?</li>
        <li><b>Key signature</b>: any sharps or flats that apply throughout? (More on this soon.)</li>
        <li><b>Time signature</b>: how many beats per bar?</li>
        <li><b>Shape of the melody</b>: does it move by <b>step</b> (to the next line or space), by <b>skip</b>, or by <b>leap</b>? Do any patterns repeat?</li>
      </ol>
      <p>Most melodies move mostly by step, with an occasional leap for interest. Both melodies below are built almost entirely from steps.</p>
      <div class="tip">Turn on <b>Note names</b> in the top bar to see the name under each note while you learn.</div>`,
    examples: [
      {
        title: '“Ode to Joy” (Beethoven)',
        desc: 'Almost entirely stepwise. Notice the dotted rhythm at the end of each phrase.',
        bpm: 120, time: [4, 4],
        score: 'E4/q E4/q F4/q G4/q | G4/q F4/q E4/q D4/q | C4/q C4/q D4/q E4/q | E4/q. D4/e D4/h | E4/q E4/q F4/q G4/q | G4/q F4/q E4/q D4/q | C4/q C4/q D4/q E4/q | D4/q. C4/e C4/h ||',
      },
      {
        title: '“Twinkle, Twinkle, Little Star”',
        desc: 'Opens with a leap (C up to G), then steps back down to C.',
        bpm: 110, time: [4, 4],
        score: 'C4/q C4/q G4/q G4/q | A4/q A4/q G4/h | F4/q F4/q E4/q E4/q | D4/q D4/q C4/h ||',
      },
    ],
  },

  // ───────────────────────── Scales & Keys ─────────────────────────
  {
    id: 'major-scale', section: 'scales', title: 'The Major Scale',
    summary: 'The W-W-H-W-W-W-H pattern behind most Western music.',
    body: `
      <p>A <b>scale</b> is a set of notes in order, from a starting note (the <b>tonic</b>) up to its octave. The <b>major scale</b> follows this pattern of whole (W) and half (H) steps:</p>
      <p class="pattern">W &nbsp; W &nbsp; <span>H</span> &nbsp; W &nbsp; W &nbsp; W &nbsp; <span>H</span></p>
      <p>Starting on C, the white keys follow this pattern exactly, because the half steps E–F and B–C land in the right places. Starting on any other note, you need sharps or flats to keep the pattern. That is why the G major scale needs F♯, and the F major scale needs B♭.</p>
      <p>The half steps between degrees 3–4 and 7–8 give the major scale its bright, settled sound. Because the 7th degree sits just a half step under the tonic, it pulls strongly toward "home".</p>`,
    examples: [
      { title: 'C major', modeSwitch: false, desc: 'All white keys. The half steps are E–F (3–4) and B–C (7–8).', bpm: 110, score: 'C4:1 D4:2 E4:3 F4:4 G4:5 A4:6 B4:7 C5:8' },
      { title: 'G major', modeSwitch: false, desc: 'F♯ makes degree 7 a half step below G.', bpm: 110, score: 'G4:1 A4:2 B4:3 C5:4 D5:5 E5:6 F#5:7 G5:8' },
      { title: 'F major', modeSwitch: false, desc: 'B♭ makes degrees 3–4 (A–B♭) a half step.', bpm: 110, score: 'F4:1 G4:2 A4:3 Bb4:4 C5:5 D5:6 E5:7 F5:8' },
      { title: 'D major, up and down', modeSwitch: false, desc: 'Two sharps: F♯ and C♯.', bpm: 130, score: 'D4 E4 F#4 G4 A4 B4 C#5 D5 | C#5 B4 A4 G4 F#4 E4 D4/h ||' },
      {
        title: '“Joy to the World”', repertoire: true,
        desc: 'The melody walks straight down the D major scale, from 8 to 1. The last note is lengthened here so the phrase ends on the tonic.',
        key: 'D', bpm: 88, time: [2, 4], modeSwitch: false,
        score: 'D5/q:8 C#5/e.:7 B4/s:6 | A4/q.:5 G4/e:4 | F#4/q:3 E4/q:2 | D4/h:1 ||',
      },
    ],
  },
  {
    id: 'degrees', section: 'scales', title: 'Scale Degrees',
    summary: 'Every note in a scale has a number, a name and a job.',
    body: `
      <p>Each note of a scale is a <b>scale degree</b>, numbered 1–7 (written with carets: 1̂, 2̂ …). Each degree also has a name:</p>
      <table>
        <tr><th>Degree</th><th>Name</th><th>Role</th></tr>
        <tr><td>1</td><td>Tonic</td><td>home, rest, the center of the key</td></tr>
        <tr><td>2</td><td>Supertonic</td><td>step above the tonic</td></tr>
        <tr><td>3</td><td>Mediant</td><td>decides major or minor</td></tr>
        <tr><td>4</td><td>Subdominant</td><td>a 5th <i>below</i> the tonic</td></tr>
        <tr><td>5</td><td>Dominant</td><td>the second-strongest note; creates expectation</td></tr>
        <tr><td>6</td><td>Submediant</td><td>halfway between tonic and subdominant below</td></tr>
        <tr><td>7</td><td>Leading tone</td><td>a half step below the tonic, it "leads" up to it</td></tr>
      </table>
      <p>These roles matter far more than the letter names. "5 going to 1" feels the same in every key. Musicians think in degrees so they can play in any key.</p>`,
    examples: [
      {
        title: 'Degree names in C major', modeSwitch: false,
        bpm: 90,
        score: 'C4:Tonic D4:Supertonic E4:Mediant F4:Subdominant G4:Dominant A4:Submediant B4:Leading_tone C5:Tonic',
      },
      {
        title: 'The leading tone wants to resolve',
        desc: 'The melody comes down the scale, dips to B, and resolves up to C. Try stopping on B and you will hear how unfinished it sounds.',
        bpm: 110, time: [4, 4],
        score: 'C5/q B4/q A4/q G4/q | F4/q E4/q D4/q B3/q:leading_tone | C4/w:tonic ||',
      },
    ],
  },
  {
    id: 'key-signatures', section: 'scales', title: 'Key Signatures & the Circle of Fifths',
    summary: 'Writing sharps and flats once, and the map that connects all 12 keys.',
    widget: 'circle',
    body: `
      <p>Music in G major uses F♯ all the time, so instead of writing a sharp on every F we write it once at the start of every line. This is the <b>key signature</b>. It applies to that note <i>in every octave</i> until the key changes.</p>
      <p>Sharps and flats always appear in the same order:</p>
      <ul>
        <li><b>Sharps:</b> F C G D A E B ("<i>Father Charles Goes Down And Ends Battle</i>")</li>
        <li><b>Flats:</b> B E A D G C F (the same order backwards)</li>
      </ul>
      <p>Two tricks for naming a major key from its signature:</p>
      <ul>
        <li><b>Sharp keys:</b> go up a half step from the last sharp. (Last sharp C♯ → D major)</li>
        <li><b>Flat keys:</b> the second-to-last flat is the key. (B♭ E♭ A♭ → E♭ major). One flat is F major.</li>
      </ul>
      <p>The <b>circle of fifths</b> arranges all keys so each step clockwise moves up a perfect fifth and adds one sharp (or removes a flat). Keys next to each other share all but one note, so they sound closely related. <b>Click any key below</b> to see its signature and hear its scale.</p>`,
    examples: [
      { title: 'G major with its key signature', modeSwitch: false, desc: 'F♯ is in the signature, so there is no sharp next to the F.', key: 'G', bpm: 110, score: 'G4 A4 B4 C5 D5 E5 F#5 G5' },
      { title: 'B♭ major', modeSwitch: false, desc: 'Two flats: B♭ and E♭.', key: 'Bb', bpm: 110, score: 'Bb3 C4 D4 Eb4 F4 G4 A4 Bb4' },
      { title: 'E major', modeSwitch: false, desc: 'Four sharps: F♯ C♯ G♯ D♯. The last sharp is D♯, and a half step up gives E.', key: 'E', bpm: 110, score: 'E4 F#4 G#4 A4 B4 C#5 D#5 E5' },
    ],
  },
  {
    id: 'minor-scales', section: 'scales', title: 'Minor Scales',
    summary: 'Natural, harmonic and melodic minor, plus relative and parallel keys.',
    body: `
      <p>The <b>natural minor</b> scale follows the pattern <span class="pattern-inline">W H W W H W W</span>. Its lowered 3rd degree makes it sound darker than major.</p>
      <p>Every major key has a <b>relative minor</b> that uses the same notes and the same key signature, starting on the major scale's 6th degree. A minor is the relative minor of C major: both have no sharps or flats. A key with the same tonic but a different mode is its <b>parallel</b> key: C major and C minor are parallel.</p>
      <p>Natural minor has no leading tone: its 7th degree is a whole step below the tonic. Composers fix this with two variants:</p>
      <ul>
        <li><b>Harmonic minor</b> raises the 7th (G → G♯ in A minor). This creates a strong pull to the tonic and an exotic-sounding gap (an augmented 2nd) between 6 and 7.</li>
        <li><b>Melodic minor</b> raises both 6 and 7 going <i>up</i> to smooth that gap, and uses natural minor coming <i>down</i>.</li>
      </ul>`,
    examples: [
      { title: 'A natural minor', modeSwitch: false, desc: 'Same notes as C major, starting on A.', key: 'Am', bpm: 110, score: 'A4:1 B4:2 C5:♭3 D5:4 E5:5 F5:♭6 G5:♭7 A5:1' },
      { title: 'A harmonic minor', modeSwitch: false, desc: 'The raised 7th (G♯) is written as an accidental. The key signature doesn\'t include it.', key: 'Am', bpm: 110, score: 'A4 B4 C5 D5 E5 F5 G#5:7 A5' },
      { title: 'A melodic minor', modeSwitch: false, desc: 'F♯ and G♯ going up, F♮ and G♮ coming down.', key: 'Am', bpm: 130, score: 'A4 B4 C5 D5 E5 F#5 G#5 A5 | Gn5 Fn5 E5 D5 C5 B4 A4/h ||' },
      { title: 'Parallel major and minor', modeSwitch: false, desc: 'C major, then C natural minor. Same tonic, but the minor scale lowers degrees 3, 6 and 7.', bpm: 130, score: 'C4 D4 E4 F4 G4 A4 B4 C5/h | C4 D4 Eb4 F4 G4 Ab4 Bb4 C5/h ||' },
      {
        title: '“Greensleeves”', repertoire: true,
        desc: 'In G minor. The melody borrows the raised 6th and 7th (E♮ and F♯) from melodic minor as it rises to the tonic.',
        key: 'Gm', bpm: 66, time: [6, 8], modeSwitch: false,
        score: 'G4/e | Bb4/q C5/e D5/e. Eb5/s D5/e | C5/q A4/e F4/e. G4/s A4/e | Bb4/q G4/e G4/e. F#4/s G4/e | A4/q F#4/e D4/q G4/e | Bb4/q C5/e D5/e. Eb5/s D5/e | C5/q A4/e F4/e. G4/s A4/e | Bb4/e. A4/s G4/e F#4/e. En4/s F#4/e | G4/q. G4/q. ||',
      },
      {
        title: 'Bach: Toccata in D minor, BWV 565', repertoire: true,
        desc: 'The famous organ opening: an ornamented A, then a run down D minor that touches the raised 7th, C♯, before landing on D. Rhythm approximate: the original is free, with fermatas.',
        key: 'Dm', bpm: 60, modeSwitch: false,
        score: 'A5/s G5/s A5/h. | G5/s F5/s E5/s D5/s C#5/q:raised_7th D5/h ||',
      },
    ],
  },
  {
    id: 'other-scales', section: 'scales', title: 'Pentatonic, Blues & Modes',
    summary: 'Scales beyond major and minor.',
    body: `
      <p>The <b>pentatonic scale</b> has five notes. Major pentatonic uses degrees 1 2 3 5 6 of the major scale and leaves out the half steps, so no two notes clash. That is why it appears in folk music around the world, and why improvising on the black keys alone always sounds good.</p>
      <p>The <b>minor pentatonic</b> (1 ♭3 4 5 ♭7) is the backbone of rock and blues guitar. Add a ♭5 "blue note" and you get the <b>blues scale</b>.</p>
      <p>The <b>modes</b> come from starting the major scale on each of its degrees. Each mode keeps the same notes but has a different center, and so a different color:</p>
      <table>
        <tr><th>Mode</th><th>On white keys</th><th>Character</th></tr>
        <tr><td>Ionian</td><td>C–C</td><td>= major</td></tr>
        <tr><td>Dorian</td><td>D–D</td><td>minor with a bright ♮6, jazzy/folky</td></tr>
        <tr><td>Phrygian</td><td>E–E</td><td>minor with a dark ♭2, Spanish flavor</td></tr>
        <tr><td>Lydian</td><td>F–F</td><td>major with a dreamy ♯4</td></tr>
        <tr><td>Mixolydian</td><td>G–G</td><td>major with a bluesy ♭7, rock</td></tr>
        <tr><td>Aeolian</td><td>A–A</td><td>= natural minor</td></tr>
        <tr><td>Locrian</td><td>B–B</td><td>diminished, very unstable</td></tr>
      </table>`,
    examples: [
      { title: 'C major pentatonic', modeSwitch: false, desc: 'C D E G A, with no F or B. There are no half steps.', bpm: 120, score: 'C4 D4 E4 G4 A4 C5/h' },
      { title: 'A minor pentatonic & A blues scale', modeSwitch: false, key: 'Am', desc: 'Then the same scale with the blue note E♭ added.', bpm: 130, score: 'A3 C4 D4 E4 G4 A4/h | A3 C4 D4 Eb4:blue_note E4 G4 A4/h ||' },
      { title: 'D Dorian', tonic: 'D', mode: 'Dorian', desc: 'The white keys from D to D. Like D minor, but with a B♮ (raised 6th).', bpm: 120, score: 'D4 E4 F4 G4 A4 B4:♮6 C5 D5' },
      { title: 'F Lydian', tonic: 'F', mode: 'Lydian', desc: 'The white keys from F to F. Like F major, but with a B♮ (raised 4th).', bpm: 120, score: 'F4 G4 A4 B4:♯4 C5 D5 E5 F5' },
      { title: 'G Mixolydian', tonic: 'G', mode: 'Mixolydian', desc: 'The white keys from G to G. Like G major, but with an F♮ (lowered 7th).', bpm: 120, score: 'G4 A4 B4 C5 D5 E5 F5:♭7 G5' },
      {
        title: '“Amazing Grace”', repertoire: true,
        desc: 'The whole tune uses only the five notes of the major pentatonic scale: G A B D E.',
        key: 'G', bpm: 90, time: [3, 4], modeSwitch: false,
        score: 'D4/q | G4/h B4/e G4/e | B4/h A4/q | G4/h E4/q | D4/h D4/q | G4/h B4/e G4/e | B4/h A4/q | D5/h. ||',
      },
      {
        title: '“Scarborough Fair”', repertoire: true,
        desc: 'A traditional English ballad in D Dorian. The B♮ in the second phrase is the raised 6th that makes it Dorian rather than plain minor. Melody only, rhythm simplified.',
        tonic: 'D', mode: 'Dorian', bpm: 96, time: [3, 4], modeSwitch: false,
        score: 'D4/h D4/q | A4/h A4/q | E4/q. F4/e E4/q | D4/h. | A4/q C5/h | D5/q C5/q A4/q | B4/q:♮6 G4/q A4/q | A4/h. ||',
      },
      {
        title: 'Rock: a pentatonic riff', key: 'Em',
        desc: 'The minor pentatonic scale is the backbone of rock guitar. This original riff uses only E–G–A–B–D.',
        instrument: 'guitar', clef: 'bass', bpm: 110, time: [4, 4], modeSwitch: false,
        score: 'E2/e E2/e G2/e E2/e A2/e E2/e B2/q | D3/e B2/e A2/e G2/e E2/h ||',
      },
    ],
  },

  // ───────────────────────── Intervals ─────────────────────────
  {
    id: 'intervals', section: 'intervals', title: 'Intervals',
    summary: 'Measuring the distance between two notes.',
    body: `
      <p>An <b>interval</b> is the distance between two pitches. When the two notes are played one after the other, the interval is <b>melodic</b>. When they are played together, it is <b>harmonic</b>.</p>
      <p>To find an interval's <b>number</b>, count the letter names from the bottom note to the top note, <i>including both</i>:</p>
      <p class="pattern">C → E = C, D, E = 3 letters = a <b>3rd</b></p>
      <p>Same note = <b>unison</b>, then 2nd, 3rd, 4th, 5th, 6th, 7th, and <b>octave</b> (8th).</p>
      <p>On the staff: odd intervals (3rd, 5th, 7th) go line→line or space→space. Even intervals (2nd, 4th, 6th, octave) go line→space or space→line. A 3rd looks like two notes on neighboring lines.</p>`,
    examples: [
      {
        title: 'Melodic intervals from C', modeSwitch: false,
        bpm: 110,
        score: 'C4:2nd D4 | C4:3rd E4 | C4:4th F4 | C4:5th G4 | C4:6th A4 | C4:7th B4 | C4:octave C5 ||',
      },
      {
        title: 'Harmonic intervals from C', modeSwitch: false,
        desc: 'The same intervals as chords. Use “Arpeggiate” to hear the two notes one at a time.',
        bpm: 80,
        score: '(C4 D4)/h:2nd | (C4 E4)/h:3rd | (C4 F4)/h:4th | (C4 G4)/h:5th | (C4 A4)/h:6th | (C4 B4)/h:7th | (C4 C5)/h:octave ||',
      },
      {
        title: 'Parallel 3rds', modeSwitch: false,
        desc: 'A 3rd is always line-line or space-space, two notes stacked like a snowman.',
        bpm: 110,
        score: '(C4 E4) (D4 F4) (E4 G4) (F4 A4) (G4 B4) (A4 C5) (B4 D5) (C5 E5)/h',
      },
      {
        title: 'Famous openings, by interval', repertoire: true,
        desc: 'The first interval of a well-known tune is an easy way to remember how it sounds: Beethoven “Ode to Joy” (m2 up), Beethoven Symphony No. 5 (M3 down), Wagner “Bridal Chorus” from Lohengrin (P4 up), “Twinkle, Twinkle” (P5 up), “My Bonnie Lies over the Ocean” (M6 up).',
        bpm: 100, modeSwitch: false,
        score: 'E4/q:m2_Ode E4/q F4/q G4/q | G4/q:M3_Beeth._5 G4/q G4/q Eb4/q | F4/q:P4_Wagner Bb4/q Bb4/q Bb4/q | C4/q:P5_Twinkle C4/q G4/q G4/q | G4/q:M6_My_Bonnie E5/q D5/q C5/q ||',
      },
      {
        title: 'Rock: the power chord is a perfect 5th', key: 'Em',
        desc: 'Root and 5th, then with the octave on top. With no 3rd, the chord is neither major nor minor. See the Harmony in Rock lesson.',
        instrument: 'guitar', clef: 'bass', bpm: 72, modeSwitch: false,
        score: '(E2 B2)/h:P5 (E2 B2 E3)/h:E5 | (A2 E3)/h:P5 (A2 E3 A3)/h:A5 ||',
      },
    ],
  },
  {
    id: 'interval-quality', section: 'intervals', title: 'Interval Quality',
    summary: 'Major, minor, perfect, augmented, diminished, and how they sound.',
    body: `
      <p>The number alone isn't enough. C→E and C→E♭ are both 3rds, but they span different numbers of half steps and sound very different. So intervals also have a <b>quality</b>:</p>
      <ul>
        <li><b>Perfect</b> (P): unisons, 4ths, 5ths, octaves</li>
        <li><b>Major</b> (M) / <b>minor</b> (m): 2nds, 3rds, 6ths, 7ths. Minor is one half step smaller than major.</li>
        <li><b>Augmented</b> (A) is one half step larger than perfect or major. <b>Diminished</b> (d) is one half step smaller than perfect or minor.</li>
      </ul>
      <table>
        <tr><th>Half steps</th><th>Interval</th><th>Example from C</th></tr>
        <tr><td>1</td><td>minor 2nd (m2)</td><td>C–D♭</td></tr>
        <tr><td>2</td><td>Major 2nd (M2)</td><td>C–D</td></tr>
        <tr><td>3</td><td>minor 3rd (m3)</td><td>C–E♭</td></tr>
        <tr><td>4</td><td>Major 3rd (M3)</td><td>C–E</td></tr>
        <tr><td>5</td><td>Perfect 4th (P4)</td><td>C–F</td></tr>
        <tr><td>6</td><td>Augmented 4th / diminished 5th (tritone)</td><td>C–F♯ / C–G♭</td></tr>
        <tr><td>7</td><td>Perfect 5th (P5)</td><td>C–G</td></tr>
        <tr><td>8</td><td>minor 6th (m6)</td><td>C–A♭</td></tr>
        <tr><td>9</td><td>Major 6th (M6)</td><td>C–A</td></tr>
        <tr><td>10</td><td>minor 7th (m7)</td><td>C–B♭</td></tr>
        <tr><td>11</td><td>Major 7th (M7)</td><td>C–B</td></tr>
        <tr><td>12</td><td>Perfect octave (P8)</td><td>C–C</td></tr>
      </table>
      <p><b>Consonance and dissonance.</b> Perfect intervals and 3rds/6ths sound stable and blended (<b>consonant</b>). 2nds, 7ths and the tritone sound tense (<b>dissonant</b>) and want to move. Dissonance isn't "bad". It is the tension that makes the music move forward.</p>
      <div class="tip"><b>Ear tricks:</b> P4 = “Here Comes the Bride”, P5 = “Twinkle Twinkle” (C→G), M6 = “My Bonnie”, octave = “Somewhere Over the Rainbow”, tritone = “Maria” (West Side Story).</div>`,
    examples: [
      {
        title: 'All twelve intervals from C', modeSwitch: false,
        bpm: 80,
        score: '(C4 Db4)/h:m2 (C4 D4)/h:M2 (C4 Eb4)/h:m3 (C4 E4)/h:M3 | (C4 F4)/h:P4 (C4 F#4)/h:A4 (C4 G4)/h:P5 (C4 Ab4)/h:m6 | (C4 A4)/h:M6 (C4 Bb4)/h:m7 (C4 B4)/h:M7 (C4 C5)/h:P8 ||',
      },
      {
        title: 'Major vs. minor 3rds', modeSwitch: false,
        desc: 'The 3rd decides whether a chord sounds happy (major) or sad (minor).',
        bpm: 70,
        score: '(C4 E4)/h:M3 (C4 Eb4)/h:m3 | (D4 F#4)/h:M3 (D4 F4)/h:m3 ||',
      },
      {
        title: 'Consonant vs. dissonant', modeSwitch: false,
        desc: 'Three stable intervals, then three tense ones.',
        bpm: 70,
        score: '(C4 G4)/h:P5 (C4 E4)/h:M3 (C4 A4)/h:M6 | (E4 F4)/h:m2 (C4 B4)/h:M7 (F4 B4)/h:tritone ||',
      },
      {
        title: 'Beethoven: Symphony No. 5', repertoire: true,
        desc: 'The most famous motive in music is two falling 3rds of different quality: G–E♭ is a major 3rd, F–D a minor 3rd. (The fermatas are left out.)',
        key: 'Cm', bpm: 108, time: [2, 4], modeSwitch: false,
        score: 'R/e G4/e G4/e G4/e | Eb4/h:M3 | R/e F4/e F4/e F4/e | D4/h:m3 ||',
      },
    ],
  },

  // ───────────────────────── Chords ─────────────────────────
  {
    id: 'triads', section: 'chords', title: 'Triads',
    summary: 'Three notes stacked in thirds: the building block of harmony.',
    widget: 'chordBuilder',
    body: `
      <p>A <b>chord</b> is three or more notes sounding together. The most basic chord is the <b>triad</b>: a note (the <b>root</b>), plus a 3rd above it, plus a 5th above the root. On the staff a root-position triad looks like a snowman: three notes on three neighboring lines, or three neighboring spaces.</p>
      <p>The sizes of the two 3rds decide the triad's <b>quality</b>:</p>
      <table>
        <tr><th>Quality</th><th>Bottom 3rd</th><th>Top 3rd</th><th>Symbol</th><th>Sound</th></tr>
        <tr><td>Major</td><td>M3</td><td>m3</td><td>C</td><td>bright, stable</td></tr>
        <tr><td>Minor</td><td>m3</td><td>M3</td><td>Cm</td><td>dark, stable</td></tr>
        <tr><td>Diminished</td><td>m3</td><td>m3</td><td>C°</td><td>tense, unstable</td></tr>
        <tr><td>Augmented</td><td>M3</td><td>M3</td><td>C+</td><td>dreamy, unresolved</td></tr>
      </table>
      <p>Major and minor triads both have a perfect 5th between root and top note, which is part of why they sound stable. Diminished and augmented triads don't, so they sound tense and want to move.</p>`,
    examples: [
      {
        title: 'Building a C major triad',
        desc: 'Root, add a 3rd, add a 5th, then all three together.',
        bpm: 90,
        score: 'C4:root E4:3rd G4:5th (C4 E4 G4)/h:C_major',
      },
      {
        title: 'Four qualities on C', modeSwitch: false,
        bpm: 70,
        score: '(C4 E4 G4)/w:C | (C4 Eb4 G4)/w:Cm | (C4 Eb4 Gb4)/w:C° | (C4 E4 G#4)/w:C+ ||',
      },
      {
        title: '“The Star-Spangled Banner”', repertoire: true,
        desc: 'The tune by John Stafford Smith opens by spelling out a C major triad, down and up: G–E–C–E–G–C.',
        bpm: 84, time: [3, 4], modeSwitch: false,
        score: 'G4/e. E4/s | C4/q:root E4/q:3rd G4/q:5th | C5/h:root E5/e. D5/s | C5/q E4/q F#4/q | G4/h ||',
      },
    ],
  },
  {
    id: 'inversions', section: 'chords', title: 'Inversions',
    summary: 'Same chord, different bass note.',
    body: `
      <p>The notes of a chord can be stacked in different orders. What matters most is which note is in the <b>bass</b> (the lowest note):</p>
      <ul>
        <li><b>Root position</b>: the root is in the bass (C–E–G)</li>
        <li><b>First inversion</b>: the 3rd is in the bass (E–G–C)</li>
        <li><b>Second inversion</b>: the 5th is in the bass (G–C–E)</li>
      </ul>
      <p>Pop and jazz charts show inversions with <b>slash chords</b>: C/E means "C chord, E in the bass". Classical analysis uses figures based on the intervals above the bass: root position = <sup>5</sup><sub>3</sub>, first inversion = <sup>6</sup>, second inversion = <sup>6</sup><sub>4</sub>.</p>
      <p>Inversions let a bass line move smoothly by step instead of jumping from root to root. They also let the upper voices stay close together.</p>`,
    examples: [
      {
        title: 'C major in every position',
        bpm: 80,
        score: '(C4 E4 G4)/h:root (E4 G4 C5)/h:1st_inv (G4 C5 E5)/h:2nd_inv (C5 E5 G5)/h:root ||',
      },
      {
        title: 'A walking bass line made of inversions',
        desc: 'The bass steps down C–B–A–G–F–E–D, then G–C, while the upper voices barely move.',
        clef: 'grand', bpm: 90, time: [4, 4],
        score: '(C3 E4 G4 C5)/h:C (B2 D4 G4 B4)/h:G/B | (A2 C4 E4 A4)/h:Am (G2 C4 E4 G4)/h:C/G | (F2 C4 F4 A4)/h:F (E2 C4 E4 G4)/h:C/E | (D2 D4 F4 A4)/h:Dm (G2 D4 G4 B4)/h:G | (C3 C4 E4 G4 C5)/w:C ||',
      },
    ],
  },
  {
    id: 'six-four', section: 'chords', title: 'Six-Four Chords',
    summary: 'Second-inversion triads: cadential, passing and pedal six-fours.',
    body: `
      <p>It would seem logical for second-inversion triads (<b>six-four chords</b>, with the 5th in the bass) to be used like first-inversion triads. They are not. A six-four chord has a <b>perfect 4th above the bass</b>, and for centuries a 4th against the lowest voice was treated as a <b>dissonance</b>. Composers of the tonal era therefore heard the six-four as unstable and did <i>not</i> use it as a substitute for a root-position or first-inversion chord.</p>
      <p>A six-four can appear <b>incidentally</b>, when the bass arpeggiates a chord or when the bass carries a melody. Otherwise it is used in three stock ways:</p>
      <table>
        <tr><th>Type</th><th>What happens</th><th>Typical progressions</th></tr>
        <tr><td><b>Cadential</b></td><td>A tonic six-four delays the arrival of V. It falls on a <b>stronger beat</b> than the V it delays.</td><td>ii6 – <b>I6/4 – V</b> – I</td></tr>
        <tr><td><b>Passing</b></td><td>Harmonizes the middle note of a three-note scale in the bass, usually on a <b>weak beat</b>.</td><td>I – (V6/4) – I6, &nbsp;IV6 – (I6/4) – ii6</td></tr>
        <tr><td><b>Pedal</b></td><td>Over a held bass, the 3rd and 5th of a chord step <b>up and back down</b>, usually on a <b>weak beat</b>.</td><td>I – (IV6/4) – I, &nbsp;V – (I6/4) – V</td></tr>
      </table>
      <p>The <b>cadential six-four</b> is the most familiar. It contains all the notes of the tonic triad, but its function is decorative. It depends entirely on the V that follows, so it is often analyzed as part of V: <b>I6/4–V</b>. Concertos make the most dramatic use of it. The orchestra stops on a cadential six-four, the soloist plays a cadenza, and the orchestra returns with V–I.</p>
      <p>Passing and pedal six-fours have such a weak harmonic function that their Roman numerals are written in <b>parentheses</b>, as in (V6/4).</p>
      <p><b>Part writing:</b> in four voices, <b>double the bass</b> (the 5th of the chord). Move the other voices smoothly, usually by step, into and out of the six-four.</p>`,
    examples: [
      {
        title: 'An incidental six-four (bass arpeggiation)',
        desc: 'The upper voices hold a C chord while the bass arpeggiates C–E–G. The G in the bass makes a six-four, but it is just part of one prolonged tonic.',
        clef: 'grand', bpm: 90, time: [4, 4],
        score: '(C3 E4~ G4~ C5~)/q:I (E3 E4~ G4~ C5~)/q (G3 E4~ G4~ C5~)/q:(6/4) (C3 E4 G4 C5)/q | (G2 D4 G4 B4)/h:V (C3 E4 G4 C5)/h:I ||',
      },
      {
        title: 'The cadential six-four',
        desc: 'First ii6 goes straight to V. Then the same cadence with I6/4 on beat 3, a stronger beat than the V it delays. The upper voices step down into V over the same bass G.',
        clef: 'grand', bpm: 72, time: [4, 4],
        score: '(C3 E4 G4 C5)/h:I (F3 F4 A4 D5)/h:ii6 | (G3 D4 G4 B4)/h:V (C3 E4 G4 C5)/h:I | (C3 E4 G4 C5)/q:I (F3 F4 A4 D5)/q:ii6 (G3~ E4 G4 C5)/q:I6/4 (G3 D4 G4 B4)/q:V | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: 'Passing six-fours',
        desc: 'The bass moves C–D–E, then A–G–F. The middle notes are harmonized by passing six-fours, (V6/4) and (I6/4), on weak beats. A cadential I6/4 ends the phrase.',
        clef: 'grand', bpm: 80, time: [4, 4],
        score: '(C3 E4 G4 C5)/q:I (D3 D4 G4 B4)/q:(V6/4) (E3 E4 G4 C5)/h:I6 | (A2 F4 A4 C5)/q:IV6 (G2 E4 G4 C5)/q:(I6/4) (F2 F4 A4 D5)/h:ii6 | (G2~ E4 G4 C5)/h:I6/4 (G2 D4 G4 B4)/h:V | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: 'Pedal six-fours',
        desc: 'Over a held bass, the 3rd and 5th of the chord step up and back: I – (IV6/4) – I, then V – (I6/4) – V.',
        clef: 'grand', bpm: 80, time: [4, 4],
        score: '(C3~ E4 G4 C5~)/q:I (C3~ F4 A4 C5~)/q:(IV6/4) (C3 E4 G4 C5)/h:I | (G2~ D4 G4~ B4)/q:V (G2~ E4 G4~ C5)/q:(I6/4) (G2 D4 G4 B4)/h:V | (C3 E4 G4 C5)/w:I ||',
      },
    ],
  },
  {
    id: 'diatonic-chords', section: 'chords', title: 'Chords in a Key',
    summary: 'Roman numerals and the seven diatonic triads.',
    body: `
      <p>Build a triad on every note of a scale, using only notes from that scale, and you get its seven <b>diatonic chords</b>. We name them with <b>Roman numerals</b> for their scale degree: uppercase for major, lowercase for minor, ° for diminished.</p>
      <p class="pattern">Major key: &nbsp; I &nbsp; ii &nbsp; iii &nbsp; IV &nbsp; V &nbsp; vi &nbsp; vii°</p>
      <p>This pattern is the same in <i>every</i> major key. In C major: C, Dm, Em, F, G, Am, B°. In G major: G, Am, Bm, C, D, Em, F♯°.</p>
      <p>In a minor key the chords are usually i, ii°, III, iv, <b>V</b>, VI, vii°. The V chord and vii° borrow the raised 7th from harmonic minor so the dominant has a leading tone.</p>
      <p>The three <b>primary chords</b> (I, IV and V) together contain every note of the scale. Many folk, blues and rock songs use nothing else.</p>`,
    examples: [
      {
        title: 'Diatonic triads in C major', modeSwitch: false,
        bpm: 90,
        score: '(C4 E4 G4)/h:I (D4 F4 A4)/h:ii (E4 G4 B4)/h:iii (F4 A4 C5)/h:IV | (G4 B4 D5)/h:V (A4 C5 E5)/h:vi (B4 D5 F5)/h:vii° (C5 E5 G5)/h:I ||',
      },
      {
        title: 'Diatonic triads in G major', modeSwitch: false,
        desc: 'The same pattern of qualities, in a different key.',
        key: 'G', bpm: 90,
        score: '(G3 B3 D4)/h:I (A3 C4 E4)/h:ii (B3 D4 F#4)/h:iii (C4 E4 G4)/h:IV | (D4 F#4 A4)/h:V (E4 G4 B4)/h:vi (F#4 A4 C5)/h:vii° (G4 B4 D5)/h:I ||',
      },
      {
        title: 'i – iv – V – i in A minor',
        desc: 'The V chord (E major) uses G♯ from harmonic minor.',
        key: 'Am', clef: 'grand', bpm: 80,
        score: '(A2 E4 A4 C5)/h:i (D3 D4 F4 A4)/h:iv | (E3 E4 G#4 B4)/h:V (A2 E4 A4 C5)/h:i ||',
      },
    ],
  },
  {
    id: 'seventh-chords', section: 'chords', title: 'Seventh Chords',
    summary: 'Adding a fourth note for richer color.',
    body: `
      <p>Stack one more 3rd on top of a triad and you get a <b>seventh chord</b>. It is named for the interval of a 7th between the root and the new top note. The five most common types:</p>
      <table>
        <tr><th>Name</th><th>Triad + 7th</th><th>On C</th><th>Symbol</th></tr>
        <tr><td>Major 7th</td><td>major + M7</td><td>C E G B</td><td>Cmaj7</td></tr>
        <tr><td>Dominant 7th</td><td>major + m7</td><td>C E G B♭</td><td>C7</td></tr>
        <tr><td>Minor 7th</td><td>minor + m7</td><td>C E♭ G B♭</td><td>Cm7</td></tr>
        <tr><td>Half-diminished</td><td>diminished + m7</td><td>C E♭ G♭ B♭</td><td>Cø7 (Cm7♭5)</td></tr>
        <tr><td>Diminished 7th</td><td>diminished + d7</td><td>C E♭ G♭ B𝄫</td><td>C°7</td></tr>
      </table>
      <p>In a major key, the diatonic seventh chords are <b>Imaj7, ii7, iii7, IVmaj7, V7, vi7, viiø7</b>. The <b>dominant 7th</b> (V7) is the most important. Its 3rd and 7th form a tritone, and that tension resolves strongly to the tonic. Seventh chords are the everyday harmony of jazz, soul and R&amp;B.</p>
      <p>Use the chord builder in the <a href="#triads">Triads</a> lesson to build any seventh chord on any root.</p>`,
    examples: [
      {
        title: 'Five seventh chords on C', modeSwitch: false,
        bpm: 60,
        score: '(C4 E4 G4 B4)/w:Cmaj7 | (C4 E4 G4 Bb4)/w:C7 | (C4 Eb4 G4 Bb4)/w:Cm7 | (C4 Eb4 Gb4 Bb4)/w:Cø7 | (C4 Eb4 Gb4 Bbb4)/w:C°7 ||',
      },
      {
        title: 'Diatonic seventh chords in C major', modeSwitch: false,
        bpm: 80,
        score: '(C4 E4 G4 B4)/h:Cmaj7 (D4 F4 A4 C5)/h:Dm7 | (E4 G4 B4 D5)/h:Em7 (F4 A4 C5 E5)/h:Fmaj7 | (G4 B4 D5 F5)/h:G7 (A4 C5 E5 G5)/h:Am7 | (B4 D5 F5 A5)/h:Bø7 (C5 E5 G5 B5)/h:Cmaj7 ||',
      },
      {
        title: 'The dominant 7th resolves',
        desc: 'In G7 → C, B rises to C (leading tone), F falls to E, and D falls to C.',
        clef: 'grand', bpm: 60,
        score: '(G2 F4 B4 D5)/h:G7 (C3 E4 C5)/h:C ||',
      },
      {
        title: 'Bach: Prelude in C major, BWV 846', repertoire: true,
        desc: 'The first prelude of The Well-Tempered Clavier, bars 1–4, with each bar’s arpeggio shown as a block chord. Two seventh chords in inversion sit between the C major chords: Dm7 over C and G7 over B.',
        clef: 'grand', bpm: 60, time: [4, 4], modeSwitch: false,
        score: '(C4 E4 G4 C5 E5)/w:I | (C4 D4 A4 D5 F5)/w:ii4/2 | (B3 D4 G4 D5 F5)/w:V6/5 | (C4 E4 G4 C5 E5)/w:I ||',
      },
    ],
  },

  // ───────────────────────── Harmony ─────────────────────────
  {
    id: 'function', section: 'harmony', title: 'Harmonic Function',
    summary: 'Tonic, predominant, dominant: the jobs chords do.',
    body: `
      <p>Chords in a key aren't interchangeable. Each one has a <b>function</b>, a role in the story of tension and release:</p>
      <table>
        <tr><th>Function</th><th>Chords</th><th>Feeling</th></tr>
        <tr><td><b>Tonic</b> (T)</td><td>I (also vi, iii)</td><td>home, rest, stability</td></tr>
        <tr><td><b>Predominant</b> (PD)</td><td>IV, ii</td><td>moving away, setting up the dominant</td></tr>
        <tr><td><b>Dominant</b> (D)</td><td>V, V7, vii°</td><td>tension that wants to resolve to I</td></tr>
      </table>
      <p>The basic phrase model is <b>T → PD → D → T</b>: leave home, build tension, return. Most music, from Bach to the Beatles, is built from this cycle.</p>
      <p>Why does V pull so strongly to I? The V chord contains the <b>leading tone</b> (B in C major), a half step below the tonic. V7 adds the 4th scale degree (F), which falls to the 3rd (E). Their tritone (B–F) collapses inward to C–E, a perfect resolution.</p>`,
    examples: [
      {
        title: 'T – PD – D – T in C major',
        desc: 'Home (I), away (IV), tension (V), home again (I).',
        clef: 'grand', bpm: 72, time: [4, 4],
        score: '(C3 E4 G4 C5)/h:I_(T) (F3 F4 A4 C5)/h:IV_(PD) | (G3 D4 G4 B4)/h:V_(D) (C3 E4 G4 C5)/h:I_(T) ||',
      },
      {
        title: 'With ii7 and V7',
        desc: 'The same journey with richer chords. Notice how little the upper voices move.',
        clef: 'grand', bpm: 72, time: [4, 4],
        score: '(C3 E4 G4 C5)/h:I (D3 F4 A4 C5)/h:ii7 | (G2 F4 G4 B4)/h:V7 (C3 E4 G4 C5)/h:I ||',
      },
    ],
  },
  {
    id: 'cadences', section: 'harmony', title: 'Cadences',
    summary: 'Musical punctuation at the ends of phrases.',
    body: `
      <p>A <b>cadence</b> is the chord progression that ends a phrase. Cadences work like punctuation: some feel like a period, others like a comma or a question mark.</p>
      <ul>
        <li><b>Authentic cadence</b> (V → I): the strongest ending, a full stop. It is a <i>perfect</i> authentic cadence when both chords are in root position and the melody ends on the tonic.</li>
        <li><b>Plagal cadence</b> (IV → I): a softer ending, the “Amen” at the end of hymns.</li>
        <li><b>Half cadence</b> (… → V): stops on the dominant, like a comma or a question waiting for an answer.</li>
        <li><b>Deceptive cadence</b> (V → vi): sets up a V → I ending, then swerves to vi. A surprise that keeps the music going.</li>
      </ul>`,
    examples: [
      { title: 'Authentic cadence: IV – V – I', clef: 'grand', bpm: 72, time: [4, 4], score: '(F3 F4 A4 C5)/h:IV (G3 D4 G4 B4)/h:V | (C3 E4 G4 C5)/w:I ||' },
      { title: 'Plagal cadence: IV – I (“Amen”)', clef: 'grand', bpm: 66, time: [4, 4], score: '(C3 E4 G4 C5)/h:I (F3 F4 A4 C5)/h:IV | (C3 E4 G4 C5)/w:I ||' },
      { title: 'Half cadence: ends on V', desc: 'It sounds unfinished, like a question.', clef: 'grand', bpm: 72, time: [4, 4], score: '(C3 E4 G4 C5)/h:I (A2 E4 A4 C5)/h:vi | (F2 F4 A4 C5)/h:IV (G2 D4 G4 B4)/h:V ||' },
      { title: 'Deceptive cadence: V – vi', desc: 'You expect C major, and A minor arrives instead.', clef: 'grand', bpm: 72, time: [4, 4], score: '(C3 E4 G4 C5)/h:I (G2 D4 G4 B4)/h:V | (A2 C4 E4 C5)/w:vi ||' },
    ],
  },
  {
    id: 'phrases', section: 'harmony', title: 'Phrases & Periods',
    summary: 'Motives, phrases and periods, and the finer types of cadence that shape them.',
    body: `
      <p><b>Musical form</b> is the way a piece is shaped into a meaningful experience for the listener. Long pieces are built from small units, and cadences mark where those units end.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Cadences in more detail</h3>
      <p>The <a href="#cadences">Cadences</a> lesson introduced the four main types. An authentic cadence can be more or less final:</p>
      <ul>
        <li><b>Perfect authentic cadence (PAC):</b> V (or V7) – I with <i>both chords in root position</i> and the <b>tonic in the melody</b> over the final I. It is the most final-sounding cadence of all, and most tonal pieces end with one.</li>
        <li><b>Imperfect authentic cadence (IAC):</b> any authentic cadence that is not a PAC. It can be a <i>root-position IAC</i> (3̂ or 5̂ in the melody), an <i>inverted IAC</i> (one or both chords inverted), or a <i>leading-tone IAC</i> (vii° in place of V).</li>
        <li><b>Phrygian half cadence:</b> iv6 – V in minor. The bass descends by half step, ♭6 → 5.</li>
      </ul>
      <p>A useful general rule classifies every cadence by its two chords:</p>
      <table>
        <tr><th>Cadence</th><th>First chord</th><th>Second chord</th><th>Group</th></tr>
        <tr><td>Authentic</td><td>contains the leading tone</td><td>tonic</td><td>conclusive</td></tr>
        <tr><td>Plagal</td><td>no leading tone</td><td>tonic</td><td>conclusive</td></tr>
        <tr><td>Deceptive</td><td>contains the leading tone</td><td>not tonic</td><td>progressive</td></tr>
        <tr><td>Half</td><td>no leading tone</td><td>not tonic (V)</td><td>progressive</td></tr>
      </table>
      <p>Not every V–I is a cadence. It counts as one only when the I is the <b>goal</b> of a passage, usually at least a few measures long.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Motives and phrases</h3>
      <ul>
        <li>A <b>motive</b> is the smallest identifiable musical idea: a pitch pattern, a rhythm, or both. Composers develop motives throughout a piece. A rhythmic motive is usually the easiest to recognize when it returns.</li>
        <li>A <b>phrase</b> is a relatively independent musical idea that ends with a <b>cadence</b>. Phrases are labeled with lowercase letters: a, b, c.</li>
        <li>A <b>phrase segment</b> is a distinct part of a phrase that is too short, or lacks a cadence, to stand as a phrase. Sometimes the last note of one phrase is also the first note of the next. This is called an <b>elision</b>.</li>
      </ul>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Periods</h3>
      <p>Two phrases often combine into a <b>period</b>: an <b>antecedent</b> and a <b>consequent</b>, like a question and its answer. The second phrase ends with a <i>stronger</i> cadence than the first, typically <b>HC → PAC</b> or <b>IAC → PAC</b>.</p>
      <ul>
        <li><b>Parallel period</b> (a a′): both phrases <i>begin</i> with similar material.</li>
        <li><b>Contrasting period</b> (a b): the phrase beginnings are different.</li>
        <li>If both phrases end with the <i>same</i> cadence, the result is a <b>repeated phrase</b>, not a period. Repetition matters in tonal music, but it does not build a larger form.</li>
        <li>A <b>double period</b> has four phrases in two pairs, with the strongest cadence at the end of the second pair. A <b>phrase group</b> is a set of phrases that belong together without forming a period.</li>
      </ul>
      <div class="tip">The period examples below share a rhythmic <b>motive</b>, a dotted quarter followed by an eighth, which opens almost every bar. Listen for it.</div>`,
    examples: [
      {
        title: 'Authentic cadences: PAC and three kinds of IAC',
        desc: 'Only the first has root-position V and I with the tonic C on top: a perfect authentic cadence. The others end less conclusively: E on top, V in first inversion, and vii°6 instead of V.',
        clef: 'grand', bpm: 72, time: [4, 4],
        score: '(G2 D4 G4 B4)/h:V (C3 E4 G4 C5)/h:I_(PAC) | (G2 G4 B4 D5)/h:V (C3 G4 C5 E5)/h:I_(IAC) | (B2 D4 G4 D5)/h:V6 (C3 E4 G4 C5)/h:I_(inv._IAC) | (D3 F4 B4 D5)/h:vii°6 (C3 E4 C5 E5)/h:I_(LT_IAC) ||',
      },
      {
        title: 'Phrygian half cadence',
        desc: 'iv6 – V in C minor. The bass falls a half step from A♭ to G, the sound that gave this cadence its name.',
        key: 'Cm', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 Eb4 G4 C5)/h:i (Ab2 F4 Ab4 C5)/h:iv6 | (G2 D4 G4 B4)/w:V_(HC) ||',
      },
      {
        title: 'A parallel period (a a′)',
        desc: 'The antecedent (bars 1–4) ends with a half cadence on V. The consequent begins with the same material but ends more strongly, with a perfect authentic cadence: V7 to I with C on top.',
        clef: 'grand', bpm: 100, time: [4, 4],
        score: '(C3~ C5)/q.:a (C3 B4)/e (F2~ A4)/q (F2 G4)/q | (D3~ F4)/q. (D3 E4)/e (G2 D4)/h | (C3~ E4)/q. (C3 F4)/e (A2~ G4)/q (A2 E4)/q | (G2 B3 D4)/w:HC | (C3~ C5)/q.:a′ (C3 B4)/e (F2~ A4)/q (F2 G4)/q | (D3~ F4)/q. (D3 E4)/e (G2 D4)/h | (C3~ E4)/q. (C3 G4)/e (G2~ F4)/q (G2 D4)/q | (C3 C4)/w:PAC ||',
      },
      {
        title: 'A contrasting period (a b)',
        desc: 'The same antecedent, but the consequent begins with new material. It still closes with a PAC, so the two phrases form a period.',
        clef: 'grand', bpm: 100, time: [4, 4],
        score: '(C3~ C5)/q.:a (C3 B4)/e (F2~ A4)/q (F2 G4)/q | (D3~ F4)/q. (D3 E4)/e (G2 D4)/h | (C3~ E4)/q. (C3 F4)/e (A2~ G4)/q (A2 E4)/q | (G2 B3 D4)/w:HC | (F3 A4)/h:b (E3 G4)/h | (D3~ F4)/q (D3 E4)/q (G2~ D4)/q (G2 G4)/q | (C3~ E4)/q. (C3 G4)/e (G2~ F4)/q (G2 D4)/q | (C3 C4)/w:PAC ||',
      },
      {
        title: 'A repeated phrase (not a period)',
        desc: 'The antecedent played twice. Both phrases end with the same half cadence, so the second one answers nothing. This is a repeated phrase, not a period.',
        clef: 'grand', bpm: 100, time: [4, 4],
        score: '(C3~ C5)/q.:a (C3 B4)/e (F2~ A4)/q (F2 G4)/q | (D3~ F4)/q. (D3 E4)/e (G2 D4)/h | (C3~ E4)/q. (C3 F4)/e (A2~ G4)/q (A2 E4)/q | (G2 B3 D4)/w:HC | (C3~ C5)/q.:a (C3 B4)/e (F2~ A4)/q (F2 G4)/q | (D3~ F4)/q. (D3 E4)/e (G2 D4)/h | (C3~ E4)/q. (C3 F4)/e (A2~ G4)/q (A2 E4)/q | (G2 B3 D4)/w:HC ||',
      },
      {
        title: 'Beethoven: “Ode to Joy” as a parallel period', repertoire: true,
        desc: 'Both phrases begin the same way. The first ends on D over the dominant (a half cadence), the second on C (an authentic cadence), so together they form a parallel period.',
        bpm: 120, time: [4, 4], modeSwitch: false,
        score: 'E4/q:a E4/q F4/q G4/q | G4/q F4/q E4/q D4/q | C4/q C4/q D4/q E4/q | E4/q. D4/e D4/h:HC | E4/q:a′ E4/q F4/q G4/q | G4/q F4/q E4/q D4/q | C4/q C4/q D4/q E4/q | D4/q. C4/e C4/h:PAC ||',
      },
    ],
  },
  {
    id: 'forms', section: 'harmony', title: 'Binary & Ternary Forms',
    summary: 'How phrases and periods combine into whole pieces: binary, ternary and rounded binary.',
    body: `
      <p>The <a href="#phrases">Phrases &amp; Periods</a> lesson used terms that most writers agree on. The terms in this lesson are just as widely used, but writers on musical form <b>disagree</b> on some details of their meaning. Any other book on form will differ from these definitions to some extent.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Binary form</h3>
      <p>A <b>binary form</b> has <b>two approximately equivalent sections</b>. A short introduction followed by the main body is not binary, because the parts are not equivalent. Periods and double periods are technically binary too, but the more specific period terms are used for them.</p>
      <ul>
        <li><b>Sectional binary:</b> the first section ends on the <b>tonic triad in the main key</b>.</li>
        <li><b>Continuous binary:</b> the first section ends on anything else, usually V or a cadence in a new key. The difference matters: sectional forms give each part tonal independence, while continuous forms create long-range tonal drive.</li>
      </ul>
      <p>Most binary forms lie somewhere between <b>AA′</b> and <b>AB</b>. The second section usually mixes continuation of the first section's ideas with contrast.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Ternary form</h3>
      <p><b>Ternary form</b>, <b>ABA</b>, follows the idea of <b>statement – contrast – return</b>. It can shape anything from a short theme to a long movement. The B section contrasts with A in <b>melody, texture, tonality</b>, or a combination of these. Like binary, ternary forms are <b>sectional</b> or <b>continuous</b>, depending on whether the first A ends on the tonic in the main key. In short ternary pieces, B is often clearly based on A material.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Rounded binary</h3>
      <p>Often the return of A brings back only <b>half</b> of the first A section: <b>A B ½A</b>. Some writers call this <b>rounded binary</b>. A typical sectional rounded binary has the phrase plan <i>a (HC) – a′ (PAC) – b (HC) – a′ (PAC)</i>. Many traditional tunes, such as “Oh, Susannah”, use this form.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Repeats, transitions and codas</h3>
      <p>Many binary, ternary and rounded binary pieces are <b>two-reprise</b> forms: two sections, each repeated. The first repeated section is always the first A. Repeats do not change the formal analysis, and composers sometimes write them out with variations. The main sections may be joined by <b>transitions</b>, and the piece may end with a <b>coda</b>.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Larger forms, briefly</h3>
      <p><b>Sonata form</b>, usually the first movement of a sonata, quartet or symphony, grew out of two-reprise continuous ternary: an <b>exposition</b> (themes A and B, with B in V, or in III in minor), a <b>development</b> that works with the old material, and a <b>recapitulation</b> with both themes in the tonic. <b>Rondo form</b>, common in final movements, alternates a refrain with contrasting episodes, for example <b>A B A C A</b>.</p>
      <div class="tip">The four examples are built from the same short phrases, so you can hear how the arrangement alone changes the form. Section letters appear under each section's first note, and cadences under its last bar.</div>`,
    examples: [
      {
        title: 'Sectional binary (A B)',
        desc: 'Both sections end with a PAC in C. Because A already ends on the tonic, the form is sectional.',
        clef: 'grand', bpm: 132, time: [3, 4], modeSwitch: false,
        score: '(C3~ G4)/q:A (C3~ C5)/q (C3 E5)/q | (F3~ A4)/q (F3~ C5)/q (F3 F5)/q | (G2~ F5)/q (G2~ D5)/q (G2 B4)/q | (C3 C5)/h.:PAC | (A2~ E5)/q:B (A2~ C5)/q (A2 A4)/q | (D3~ F5)/q (D3~ D5)/q (D3 A4)/q | (G2~ F5)/q (G2~ D5)/q (G2 B4)/q | (C3 C5)/h.:PAC ||',
      },
      {
        title: 'Continuous binary (A B)',
        desc: 'A moves to the dominant, using F♯, and ends with a cadence in G major instead of the tonic. B leads back to C.',
        clef: 'grand', bpm: 132, time: [3, 4], modeSwitch: false,
        score: '(C3~ G4)/q:A (C3~ C5)/q (C3 E5)/q | (A2~ A4)/q (A2~ C5)/q (A2 E5)/q | (D3~ A4)/q (D3~ D5)/q (D3 F#5)/q | (G2 G5)/h.:PAC_in_G | (G2~ F5)/q:B (G2~ D5)/q (G2 B4)/q | (C3~ E5)/q (C3~ C5)/q (C3 G4)/q | (G2~ F5)/q (G2~ D5)/q (G2 B4)/q | (C3 C5)/h.:PAC ||',
      },
      {
        title: 'Ternary (A B A)',
        desc: 'Statement, contrast, return. B contrasts in tonality: it moves to A minor, the relative minor. Then A returns exactly.',
        clef: 'grand', bpm: 132, time: [3, 4], modeSwitch: false,
        score: '(C3~ G4)/q:A (C3~ C5)/q (C3 E5)/q | (F3~ A4)/q (F3~ C5)/q (F3 F5)/q | (G2~ F5)/q (G2~ D5)/q (G2 B4)/q | (C3 C5)/h.:PAC | (A2~ A4)/q:B_(A_minor) (A2~ C5)/q (A2 E5)/q | (D3~ D5)/q (D3~ F5)/q (D3 A5)/q | (E3~ B4)/q (E3~ E5)/q (E3 G#5)/q | (A2 A5)/h.:PAC_in_a | (C3~ G4)/q:A (C3~ C5)/q (C3 E5)/q | (F3~ A4)/q (F3~ C5)/q (F3 F5)/q | (G2~ F5)/q (G2~ D5)/q (G2 B4)/q | (C3 C5)/h.:PAC ||',
      },
      {
        title: 'Rounded binary (A B ½A)',
        desc: 'A is a parallel period (a – HC, a′ – PAC). B ends on a half cadence. Then only the second half of A (a′) returns: A B ½A.',
        clef: 'grand', bpm: 132, time: [3, 4], modeSwitch: false,
        score: '(C3~ G4)/q:A:_a (C3~ C5)/q (C3 E5)/q | (F3~ A4)/q (F3~ C5)/q (F3 F5)/q | (E3~ E5)/q (E3~ D5)/q (E3 C5)/q | (G2 D5)/h.:HC | (C3~ G4)/q:a′ (C3~ C5)/q (C3 E5)/q | (F3~ A4)/q (F3~ C5)/q (F3 F5)/q | (G2~ F5)/q (G2~ D5)/q (G2 B4)/q | (C3 C5)/h.:PAC | (A2~ E5)/q:B (A2~ C5)/q (A2 A4)/q | (D3~ F5)/q (D3~ D5)/q (D3 A4)/q | (G2~ G4)/q (G2~ B4)/q (G2 D5)/q | (G2 G5)/h.:HC | (C3~ G4)/q:½A:_a′ (C3~ C5)/q (C3 E5)/q | (F3~ A4)/q (F3~ C5)/q (F3 F5)/q | (G2~ F5)/q (G2~ D5)/q (G2 B4)/q | (C3 C5)/h.:PAC ||',
      },
      {
        title: '“Greensleeves” (sectional binary)', repertoire: true,
        desc: 'The book’s own example: two parallel periods. The first part ends with tonic harmony, so the binary form is sectional.',
        key: 'Gm', bpm: 66, time: [6, 8], modeSwitch: false,
        score: 'G4/e:a | Bb4/q C5/e D5/e. Eb5/s D5/e | C5/q A4/e F4/e. G4/s A4/e | Bb4/q G4/e G4/e. F#4/s G4/e | A4/q:HC F#4/e D4/q G4/e:a′ | Bb4/q C5/e D5/e. Eb5/s D5/e | C5/q A4/e F4/e. G4/s A4/e | Bb4/e. A4/s G4/e F#4/e. En4/s F#4/e | G4/q.:AC G4/q. | F5/q.:b F5/e. E5/s D5/e | C5/q A4/e F4/e. G4/s A4/e | Bb4/q G4/e G4/e. F#4/s G4/e | A4/q F#4/e D4/q.:HC | F5/q.:b′ F5/e. E5/s D5/e | C5/q A4/e F4/e. G4/s A4/e | Bb4/e. A4/s G4/e F#4/e. En4/s F#4/e | G4/q.:AC G4/q. ||',
      },
      {
        title: '“Twinkle, Twinkle, Little Star” (ternary)', repertoire: true,
        desc: 'Statement, contrast, return: A ends on the tonic, B hovers around the dominant, then A comes back unchanged.',
        bpm: 120, time: [4, 4], modeSwitch: false,
        score: 'C4/q:A C4/q G4/q G4/q | A4/q A4/q G4/h | F4/q F4/q E4/q E4/q | D4/q D4/q C4/h:PAC | G4/q:B G4/q F4/q F4/q | E4/q E4/q D4/h | G4/q G4/q F4/q F4/q | E4/q E4/q D4/h:HC | C4/q:A C4/q G4/q G4/q | A4/q A4/q G4/h | F4/q F4/q E4/q E4/q | D4/q D4/q C4/h:PAC ||',
      },
    ],
  },
  {
    id: 'progressions', section: 'harmony', title: 'Chord Progressions',
    summary: 'The famous patterns behind thousands of songs.',
    body: `
      <p>A <b>chord progression</b> is a series of chords. A few progressions are so effective that they have been reused in thousands of songs. All of them follow the T → PD → D → T logic, or play with it.</p>
      <ul>
        <li><b>I – V – vi – IV</b>: the “four chord song” of modern pop.</li>
        <li><b>I – vi – IV – V</b>: the “50s progression” of doo-wop ballads.</li>
        <li><b>ii – V – I</b>: the cornerstone of jazz, usually with seventh chords.</li>
        <li><b>12-bar blues</b>: I for four bars, IV for two, I for two, then V – IV – I – V. Usually played with dominant 7ths.</li>
        <li><b>The Pachelbel canon</b>: I – V – vi – iii – IV – I – IV – V.</li>
      </ul>
      <p>Root movement by 4th or 5th (C→F, G→C) sounds strong and purposeful. Movement by 3rd (C→Am) sounds gentle, because the two chords share two notes.</p>`,
    examples: [
      { title: 'I – V – vi – IV (pop)', clef: 'grand', bpm: 92, time: [4, 4], score: '(C3 E4 G4 C5)/w:C_(I) | (G2 D4 G4 B4)/w:G_(V) | (A2 C4 E4 A4)/w:Am_(vi) | (F2 C4 F4 A4)/w:F_(IV) ||' },
      { title: 'I – vi – IV – V (50s)', clef: 'grand', bpm: 92, time: [4, 4], score: '(C3 E4 G4 C5)/w:C | (A2 E4 A4 C5)/w:Am | (F2 F4 A4 C5)/w:F | (G2 D4 G4 B4)/w:G ||' },
      {
        title: 'ii7 – V7 – Imaj7 (jazz)',
        desc: 'F stays put (Dm7 → G7), then falls to E. A→G and C→B move by step.',
        clef: 'grand', bpm: 80, time: [4, 4],
        score: '(D3 F4 A4 C5)/w:Dm7 | (G2 F4 G4 B4)/w:G7 | (C3 E4 G4 B4)/w:Cmaj7 ||',
      },
      {
        title: '12-bar blues in C', modeSwitch: false,
        desc: 'Dominant 7th chords on I, IV and V.',
        clef: 'grand', bpm: 140, time: [4, 4],
        score: '(C3 E4 G4 Bb4)/h:C7 (C3 E4 G4 Bb4)/h | (C3 E4 G4 Bb4)/h (C3 E4 G4 Bb4)/h | (C3 E4 G4 Bb4)/h (C3 E4 G4 Bb4)/h | (C3 E4 G4 Bb4)/h (C3 E4 G4 Bb4)/h | ' +
          '(F2 Eb4 A4 C5)/h:F7 (F2 Eb4 A4 C5)/h | (F2 Eb4 A4 C5)/h (F2 Eb4 A4 C5)/h | (C3 E4 G4 Bb4)/h:C7 (C3 E4 G4 Bb4)/h | (C3 E4 G4 Bb4)/h (C3 E4 G4 Bb4)/h | ' +
          '(G2 D4 F4 B4)/h:G7 (G2 D4 F4 B4)/h | (F2 Eb4 A4 C5)/h:F7 (F2 Eb4 A4 C5)/h | (C3 E4 G4 Bb4)/h:C7 (C3 E4 G4 Bb4)/h | (G2 D4 F4 B4)/h:G7 (G2 D4 F4 B4)/h ||',
      },
      {
        title: 'Pachelbel’s Canon progression (in D)',
        key: 'D', clef: 'grand', bpm: 80, time: [4, 4],
        score: '(D3 F#4 A4 D5)/h:I (A2 E4 A4 C#5)/h:V | (B2 F#4 B4 D5)/h:vi (F#2 F#4 A4 C#5)/h:iii | (G2 G4 B4 D5)/h:IV (D3 F#4 A4 D5)/h:I | (G2 G4 B4 D5)/h:IV (A2 E4 A4 C#5)/h:V ||',
      },
    ],
  },
  {
    id: 'voice-leading', section: 'harmony', title: 'Voice Leading',
    summary: 'Connecting chords smoothly, the way singers would.',
    body: `
      <p>Think of each note in a chord as a separate singer, or <b>voice</b>. <b>Voice leading</b> is the craft of moving each voice gracefully from one chord to the next. The traditional guidelines:</p>
      <ol>
        <li><b>Keep common tones.</b> If two chords share a note, keep it in the same voice.</li>
        <li><b>Move by step.</b> Move the other voices to the nearest available chord tone.</li>
        <li><b>Resolve tendency tones.</b> The leading tone (7) rises to 1. The 7th of a chord falls by step.</li>
        <li><b>Avoid parallel 5ths and octaves.</b> Two voices moving in parallel perfect 5ths or octaves lose their independence and sound hollow.</li>
        <li><b>Contrary motion.</b> When the bass goes up, upper voices often go down, and vice versa.</li>
      </ol>
      <p>Compare the two versions below. They use the same chords, but the second sounds connected and the first sounds jumpy.</p>`,
    examples: [
      {
        title: 'Jumpy: every chord in root position',
        desc: 'All voices leap together, with parallel 5ths and octaves throughout.',
        clef: 'grand', bpm: 72, time: [4, 4],
        score: '(C3 C4 E4 G4)/h:C (F3 F4 A4 C5)/h:F | (G3 G4 B4 D5)/h:G (C3 C4 E4 G4)/h:C ||',
      },
      {
        title: 'Smooth: common tones held, steps elsewhere',
        desc: 'C is held into the F chord. Every other voice moves by step or not at all.',
        clef: 'grand', bpm: 72, time: [4, 4],
        score: '(C3 E4 G4 C5)/h:C (F3 F4 A4 C5)/h:F | (G3 D4 G4 B4)/h:G (C3 E4 G4 C5)/h:C ||',
      },
    ],
  },
  {
    id: 'non-chord-tones', section: 'harmony', title: 'Non-Chord Tones',
    summary: 'Melody notes outside the chord: passing tones, neighbors, suspensions and more.',
    body: `
      <p>Not every melody note belongs to the chord underneath it. A <b>non-chord tone</b> (NCT) is a note, diatonic or chromatic, that is not a member of the chord sounding with it. NCTs let a melody flow smoothly from one chord tone to the next, and they create most of the dissonance you hear on strong beats in tonal music.</p>
      <p>Each type of NCT is defined by <b>how it is approached</b> and <b>how it is left</b>:</p>
      <table>
        <tr><th>Non-chord tone</th><th>Approached by</th><th>Left by</th></tr>
        <tr><td>Passing tone</td><td>step</td><td>step in the same direction</td></tr>
        <tr><td>Neighboring tone</td><td>step</td><td>step in the opposite direction</td></tr>
        <tr><td>Suspension</td><td>same tone</td><td>step down</td></tr>
        <tr><td>Retardation</td><td>same tone</td><td>step up</td></tr>
        <tr><td>Appoggiatura</td><td>leap</td><td>step</td></tr>
        <tr><td>Escape tone</td><td>step</td><td>leap in the opposite direction</td></tr>
        <tr><td>Anticipation</td><td>step or leap</td><td>same tone (it arrives early)</td></tr>
        <tr><td>Pedal point</td><td colspan="2">a note held while the chords change around it</td></tr>
      </table>
      <p>NCTs are also described by where they fall in the beat. <b>Accented</b> NCTs land on a strong beat or the strong part of a beat. Suspensions and appoggiaturas are almost always accented, and they produce the most noticeable dissonances. <b>Unaccented</b> NCTs fall between beats, as most passing and neighboring tones do. An NCT can be <b>diatonic</b> or <b>chromatic</b>. A chromatic lower neighbor, for example, works like a temporary leading tone to the note it decorates.</p>
      <p><b>Suspensions</b> have their own vocabulary:</p>
      <ul>
        <li><b>Preparation</b>: the chord tone just before the suspension.</li>
        <li><b>Suspension</b>: the same note, held (usually tied) while the harmony changes underneath it. It is now dissonant.</li>
        <li><b>Resolution</b>: the note steps <i>down</i> to a chord tone. If it steps <i>up</i> instead, it is a <b>retardation</b>.</li>
      </ul>
      <p>A suspension is named by the intervals above the bass at the suspension and at the resolution: <b>4–3</b>, <b>7–6</b>, <b>9–8</b>, or <b>2–3</b> when the bass itself is suspended.</p>
      <p>The <b>pedal point</b> is a special case. A note, usually the tonic or the dominant and usually in the bass, is held while the chords above it change. It starts as a chord tone, becomes a non-chord tone when the harmony moves away, and becomes a chord tone again when the harmony returns.</p>
      <div class="tip">In the examples, non-chord tones are shown in <b class="text-rose-600 dark:text-rose-400">red</b>. The curved lines are <b>ties</b>: a tied note is held, not played again. Try the minor switch too, because the NCTs work the same way in minor keys.</div>`,
    examples: [
      {
        title: 'Passing tones',
        desc: 'Each passing tone fills the gap of a 3rd between two chord tones: E–D–C over I, then B–C–D over V. They are approached and left by step in the same direction.',
        clef: 'grand', bpm: 76, time: [4, 4],
        score: '(C3~ E4~ G4~ E5)/q:I (C3~ E4~ G4~ D5*)/q:passing (C3 E4 G4 C5)/h | (G2~ D4~ G4~ B4)/q:V (G2~ D4~ G4~ C5*)/q:passing (G2 D4 G4 D5)/h | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: 'Neighboring tones',
        desc: 'The melody steps away from E and comes straight back: up to F (upper neighbor), then down to D (lower neighbor).',
        clef: 'grand', bpm: 76, time: [4, 4],
        score: '(C3~ G4~ C5~ E5)/q:I (C3~ G4~ C5~ F5*)/q:upper_n. (C3 G4 C5 E5)/h | (C3~ G4~ C5~ E5)/q (C3~ G4~ C5~ D5*)/q:lower_n. (C3 G4 C5 E5)/h ||',
      },
      {
        title: 'The 4–3 suspension',
        desc: 'C is prepared as a chord tone of vi, then held while the bass moves to G. Above G it is a dissonant 4th, and it resolves down by step to B, the 3rd of V.',
        clef: 'grand', bpm: 66, time: [4, 4],
        score: '(C3 E4 G4 C5)/h:I (A2 E4 A4 C5~)/h:vi_(prep.) | (G2~ D4~ G4~ C5*)/h:4_(sus.) (G2 D4 G4 B4)/h:3_(res.) | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: '9–8 and 7–6 suspensions',
        desc: 'D is held from the V chord into the next chord: first a 9th above C resolving to the octave (9–8), then a 7th above E resolving to the 6th (7–6).',
        clef: 'grand', bpm: 66, time: [4, 4],
        score: '(G2 D4 G4 B4 D5~)/h:V (C3~ E4~ G4~ D5*)/q:9 (C3 E4 G4 C5)/q:8 | (G2 D4 G4 B4 D5~)/h:V (E3~ G4~ D5*)/q:7 (E3 G4 C5)/q:6 | (F3 F4 A4 C5)/h:IV (G3 D4 G4 B4)/h:V | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: 'Retardation',
        desc: 'Like a suspension, but it resolves upward. The leading tone B is held into the I chord and then rises to C.',
        clef: 'grand', bpm: 66, time: [4, 4],
        score: '(F3 F4 A4 C5)/h:IV (G2 D4 G4 B4~)/h:V | (C3~ E4~ G4~ B4*)/h:retardation (C3 E4 G4 C5)/h:I ||',
      },
      {
        title: 'Appoggiatura',
        desc: 'The melody leaps up from C to G, a dissonance against the IV chord, then steps down to the chord tone F.',
        clef: 'grand', bpm: 72, time: [4, 4],
        score: '(C3 E4 G4 C5)/h:I (F3~ A4~ C5~ G5*)/q:app. (F3 A4 C5 F5)/q:IV | (G3 B4 D5 F5)/h:V7 (C3 G4 C5 E5)/h:I ||',
      },
      {
        title: 'Escape tone',
        desc: 'At this cadence the melody steps up from D to E and then leaps down to C: step in, leap out in the opposite direction.',
        clef: 'grand', bpm: 72, time: [4, 4],
        score: '(C3 E4 G4 C5)/h:I (G2~ G4~ B4~ D5)/q:V (G2 G4 B4 E5*)/q:esc. | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: 'Anticipation',
        desc: 'The melody reaches C, the note of the next chord, while V is still sounding. When I arrives, C is simply repeated.',
        clef: 'grand', bpm: 72, time: [4, 4],
        score: '(C3 E4 G4 E5)/h:I (G2~ D4~ G4~ D5)/q:V (G2 D4 G4 C5*)/q:ant. | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: 'Tonic pedal point',
        desc: 'The bass holds C while the harmony moves I – IV – V – I above it. The pedal C belongs to I and IV, so it is a non-chord tone only under V.',
        clef: 'grand', bpm: 66, time: [4, 4],
        score: '(C3~ E4 G4 C5)/h:I (C3~ F4 A4 C5)/h:IV | (C3~* D4 G4 B4)/h:V (C3 E4 G4 C5)/h:I ||',
      },
      {
        title: 'Beethoven: “Für Elise”', repertoire: true,
        desc: 'The famous opening rocks between E and its lower neighbor D♯ before the melody falls to A. The left hand is reduced to a single bass note per bar.',
        clef: 'grand', bpm: 66, modeSwitch: false,
        score: 'E5/s D#5*/s:neighbor | E5/s D#5*/s E5/s B4/s D5/s C5/s | (A2 A4)/e R/s C4/s E4/s A4/s | (E2 B4)/e R/s E4/s G#4/s B4/s | (A2 C5)/e ||',
      },
      {
        title: 'Mozart: Symphony No. 40 in G minor', repertoire: true,
        desc: 'The opening sighs back and forth between D and its upper neighbor E♭ before leaping up to B♭.',
        key: 'Gm', bpm: 112, time: [4, 4], modeSwitch: false,
        score: 'Eb5*/e D5/e | D5/q Eb5*/e:upper_n. D5/e D5/q Eb5*/e D5/e | D5/q Bb5/q R/q Bb5/e A5/e ||',
      },
    ],
  },
  {
    id: 'chromatic-harmony', section: 'harmony', title: 'Secondary Dominants & Modulation',
    summary: 'Borrowing tension from other keys, and changing key.',
    body: `
      <p>Any major or minor chord in a key can get its own "dominant", the V (or V7) chord of <i>that</i> chord. These <b>secondary dominants</b> are written V/V ("five of five"), V/vi, and so on.</p>
      <p>In C major, G is the V chord. The V of G is <b>D major</b> (D–F♯–A). The F♯ isn't in C major, so it adds color and a strong pull toward G: it acts as a temporary leading tone.</p>
      <table>
        <tr><th>Target (in C)</th><th>Secondary dominant</th><th>New note</th></tr>
        <tr><td>G (V)</td><td>D7 = V7/V</td><td>F♯</td></tr>
        <tr><td>Am (vi)</td><td>E7 = V7/vi</td><td>G♯</td></tr>
        <tr><td>Dm (ii)</td><td>A7 = V7/ii</td><td>C♯</td></tr>
        <tr><td>F (IV)</td><td>C7 = V7/IV</td><td>B♭</td></tr>
      </table>
      <p>When the music settles in a new key for good, it is a <b>modulation</b>. A smooth way to modulate is a <b>pivot chord</b> that belongs to both keys. Am is vi in C major and also ii in G major, so it can lead naturally into G's dominant (D7) and then to G.</p>`,
    examples: [
      {
        title: 'V7/V: D7 leads to G', modeSwitch: false,
        desc: 'F♯ rises to G, just as a leading tone would.',
        clef: 'grand', bpm: 72, time: [4, 4],
        score: '(C3 E4 G4 C5)/h:I (D3 F#4 A4 C5)/h:V7/V | (G2 G4 B4 D5)/h:V (C3 G4 C5 E5)/h:I ||',
      },
      {
        title: 'V7/vi: E7 leads to A minor', modeSwitch: false,
        desc: 'G♯ acts as a temporary leading tone to A.',
        clef: 'grand', bpm: 72, time: [4, 4],
        score: '(C3 E4 G4 C5)/h:I (E3 D4 G#4 B4)/h:V7/vi | (A2 C4 A4 C5)/w:vi ||',
      },
      {
        title: 'Modulating from C to G with a pivot chord', modeSwitch: false,
        desc: 'Am is vi in C and ii in G. After it, D7 confirms the new key.',
        clef: 'grand', bpm: 72, time: [4, 4],
        score: '(C3 E4 G4 C5)/h:C:_I (A2 E4 A4 C5)/h:vi_=_ii | (D3 F#4 A4 C5)/h:G:_V7 (G2 D4 G4 B4)/h:I ||',
      },
    ],
  },


  {
    id: 'secondary-leading-tone', section: 'harmony', title: 'Secondary Leading-Tone Chords & Sequences',
    summary: 'Tonicizing with vii°7 instead of V7, and circle-of-fifths sequences built from secondary functions.',
    body: `
      <p>V(7) and vii°(7) do the same job in a key: both lead to the tonic. The same is true of secondary functions. <b>Any chord that can be tonicized by a V(7) can also be tonicized by a vii°(7)</b>, a leading-tone chord built a half step below the chord it leads to. These are <b>secondary leading-tone chords</b>: vii°/ii, vii°7/V, viiø7/IV and so on.</p>
      <p>Which kind of seventh chord to use? Almost all music follows two principles:</p>
      <ol>
        <li>If the triad being tonicized is <b>minor</b>, use <b>vii°7</b> (fully diminished).</li>
        <li>If it is <b>major</b>, use either vii°7 or viiø7. The fully diminished version is more common.</li>
      </ol>
      <p>Leading-tone chords of ii, IV, iv, V and vi are much more common than the others. There is no viiø7/V in minor, because the key of the dominant in minor is itself a minor key.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Spelling and recognizing them</h3>
      <p><b>To spell one:</b> find the root of the chord being tonicized, go <b>down a minor 2nd</b>, and build a diminished triad, diminished seventh, or half-diminished seventh on that note. For example, vii°7/vi in E♭ major: vi is C minor, a m2 below C is B, and B°7 is B–D–F–A♭.</p>
      <p><b>To recognize one:</b> if an altered chord is not a V(7)/something, check whether it is a diminished triad or a diminished or half-diminished seventh. If so, go up a m2 from its root. If a major or minor triad on that note is diatonic in the key, the altered chord is probably a secondary leading-tone chord.</p>
      <p><b>Resolution:</b> as with any leading-tone chord, the <b>leading tone goes up</b> and the <b>7th goes down</b>. Be careful not to double the target chord's 3rd by accident, and keep the voice leading smooth.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Sequences with secondary functions</h3>
      <p>The <b>circle-of-fifths sequence</b> (roots falling by 5ths, e.g. iii7 – vi7 – ii7 – V7 – I) often swaps diatonic chords for secondary functions. Any of the first chords can become a V7/ or vii°7/ of the next:</p>
      <table>
        <tr><th>Version (in C)</th><th colspan="5">Chords</th></tr>
        <tr><td>Diatonic</td><td>Em7</td><td>Am7</td><td>Dm7</td><td>G7</td><td>C</td></tr>
        <tr><td>V7/ substitutes</td><td>E7 (V7/vi)</td><td>A7 (V7/ii)</td><td>D7 (V7/V)</td><td>G7</td><td>C</td></tr>
        <tr><td>vii°7/ substitutes</td><td>G♯°7 (vii°7/vi)</td><td>C♯°7 (vii°7/ii)</td><td>F♯°7 (vii°7/V)</td><td>G7</td><td>C</td></tr>
      </table>
      <p>You can mix one choice from each column. In a chain of dominant sevenths, each <b>leading tone resolves down by chromatic half step</b> to become the 7th of the next chord. In four voices with roots in the bass, <b>incomplete</b> and <b>complete</b> seventh chords alternate.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Deceptive resolutions</h3>
      <p>Most secondary V(7) and vii°(7) chords resolve as expected, but not all. A common exception moves V7/X <b>up to the vi of X</b>, the secondary version of a deceptive cadence. In C, D7 (V7/V) can resolve to E minor, which is vi of G.</p>
      <div class="tip">Chromatic notes from outside the key are shown in <b class="text-violet-600 dark:text-violet-400">purple</b>. In each example, follow the purple leading tone up by half step, and the chord's 7th down by step.</div>`,
    examples: [
      {
        title: 'vii°7/V resolving to V',
        desc: 'F♯°7 (F♯–A–C–E♭) leads to G. F♯ rises to G, and the 7th, E♭, falls to D.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (F#3! Eb4! A4 C5)/h:vii°7/V | (G3 D4 G4 B4)/h:V (C3 E4 G4 C5)/h:I ||',
      },
      {
        title: 'vii°7/ii tonicizes D minor',
        desc: 'C♯°7 (C♯–E–G–B♭) leads to ii. The minor target calls for a fully diminished seventh. C♯ rises to D and B♭ falls to A.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (C#3! E4 G4 Bb4!)/h:vii°7/ii | (D3 D4 F4 A4)/h:ii (G2 D4 F4 B4)/h:V7 | (C3 C4 E4 C5)/w:I ||',
      },
      {
        title: 'vii°7/vi after V7',
        desc: 'Only the bass moves, from G to G♯, turning G7 into G♯°7. G♯ then rises to A for vi.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (G2 D4 F4 B4)/h:V7 | (G#2! D4 F4 B4)/h:vii°7/vi (A2 C4 E4 A4)/h:vi | (F2 C4 F4 A4)/h:IV (G2 D4 G4 B4)/h:V | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: 'Circle-of-fifths sequence (diatonic)',
        desc: 'Roots fall by 5ths: E – A – D – G – C. Each 7th steps down to the 3rd of the next chord.',
        clef: 'grand', bpm: 80, time: [4, 4], modeSwitch: false,
        score: '(E3 D4 G4 B4)/h:iii7 (A2 C4 G4 A4)/h:vi7 | (D3 C4 F4 A4)/h:ii7 (G2 B3 F4 G4)/h:V7 | (C3 C4 E4 G4)/w:I ||',
      },
      {
        title: 'The same sequence with secondary dominants',
        desc: 'Every chord becomes a dominant 7th. Each leading tone (G♯, C♯, F♯) slides down a chromatic half step to become the 7th of the next chord. Complete and incomplete chords alternate.',
        clef: 'grand', bpm: 80, time: [4, 4], modeSwitch: false,
        score: '(E3 D4 G#4! B4)/h:V7/vi (A2 C#4! G4 A4)/h:V7/ii | (D3 C4 F#4! A4)/h:V7/V (G2 B3 F4 G4)/h:V7 | (C3 C4 E4 G4)/w:I ||',
      },
      {
        title: 'The sequence with leading-tone sevenths',
        desc: 'One of the variations from the chart: G♯°7 – A7 – F♯°7 – G – C. Leading-tone chords alternate with dominant chords.',
        clef: 'grand', bpm: 80, time: [4, 4], modeSwitch: false,
        score: '(G#2! F4 B4 D5)/h:vii°7/vi (A2 E4 G4 C#5!)/h:V7/ii | (F#2! Eb4! A4 C5)/h:vii°7/V (G2 D4 G4 B4)/h:V | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: 'Deceptive resolution: V7/V to vi/V',
        desc: 'D7 sets up G, but the bass rises to E instead: E minor is vi of G. F♯ still rises to G.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (D3 F#4! A4 C5)/h:V7/V | (E3 G4 B4)/h:vi/V (G2 D4 G4 B4)/h:V | (C3 E4 G4 C5)/w:I ||',
      },
    ],
  },
  {
    id: 'mode-mixture', section: 'harmony', title: 'Mode Mixture',
    summary: 'Borrowing notes and chords from the parallel major or minor.',
    body: `
      <p><b>Mode mixture</b> means using tones from one mode, major or minor, in a passage that is mostly in the other. The mixing almost always goes one way: a major key borrows notes from its <b>parallel minor</b> (C major borrows from C minor). The chords that result are called <b>borrowed chords</b>. Mode mixture is mainly expressive. A single borrowed note can cast a shadow over a bright major passage.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Borrowing in minor: the Picardy third</h3>
      <p>In minor, scale degrees 6 and 7 already have two forms (natural and raised), so the only note a minor key can really borrow from major is the <b>raised 3rd</b>. It almost always appears in the final tonic chord, which turns it into a major triad. This is the <b>Picardy third</b>, and it ended most minor-key compositions from the early 1500s until about 1750. The analysis just writes an uppercase <b>I</b>.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Borrowing ♭6 in major</h3>
      <p>Lowering the 6th degree (A → A♭ in C major) creates four borrowed chords that are common in major keys:</p>
      <table>
        <tr><th>Chord</th><th>In C major</th><th>Replaces</th></tr>
        <tr><td><b>iv</b></td><td>F–A♭–C</td><td>IV (F–A–C)</td></tr>
        <tr><td><b>ii°</b></td><td>D–F–A♭</td><td>ii (D–F–A)</td></tr>
        <tr><td><b>iiø7</b></td><td>D–F–A♭–C</td><td>ii7 (D–F–A–C)</td></tr>
        <tr><td><b>vii°7</b></td><td>B–D–F–A♭</td><td>viiø7 (B–D–F–A)</td></tr>
      </table>
      <p>The borrowed <b>♭6 usually moves down a half step to 5</b> (A♭ → G). It is often approached by step, from ♮6 or from 5. The borrowed iv often appears in first inversion (iv6) as part of a stepwise descending bass line, and the iiø7 is used more often than ii° because its 7th gives it a stronger sense of direction.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Other borrowed chords</h3>
      <p>Lowering degrees 3, 6 or 7 as well gives more borrowed chords: the minor tonic <b>i</b> (usually in longer passages that slip into the parallel minor), <b>♭VI</b>, <b>♭III</b> and <b>♭VII</b>. ♭III and ♭VII are relatively rare. The ♭ in the Roman numeral shows that the chord's root has been lowered, whatever accidental actually appears in the music. In C major, ♭VI is A♭ major, ♭III is E♭ major and ♭VII is B♭ major. A dramatic use of ♭VI is the deceptive cadence <b>V–♭VI</b>.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Mixture and modulation</h3>
      <p>Mode mixture also opens the door to keys that are far from the home key. A passage in F major that slips into F minor can move easily to the keys closely related to F minor, such as A♭ major, which would otherwise be a remote destination.</p>
      <div class="tip">In the examples, borrowed notes are shown in <b class="text-violet-600 dark:text-violet-400">purple</b>. Each one comes from the parallel mode. Listen for how the borrowed chord darkens the sound compared with its plain diatonic form.</div>`,
    examples: [
      {
        title: 'IV vs. borrowed iv',
        desc: 'The same progression twice: first with the major IV (A♮), then with the borrowed minor iv (A♭). Notice A♭ falling a half step to G.',
        clef: 'grand', bpm: 72, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (F3 F4 A4 C5)/h:IV | (G3 D4 G4 B4)/h:V (C3 E4 G4 C5)/h:I | (C3 E4 G4 C5)/h:I (F3 F4 Ab4! C5)/h:iv | (G3 D4 G4 B4)/h:V (C3 E4 G4 C5)/h:I ||',
      },
      {
        title: 'Borrowed iiø7 and vii°7',
        desc: 'Two more chords made with ♭6. In both, A♭ resolves down to G.',
        clef: 'grand', bpm: 72, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (D3 F4 Ab4! C5)/h:iiø7 | (G2 F4 G4 B4)/h:V7 (C3 E4 G4 C5)/h:I | (B2 D4 F4 Ab4!)/h:vii°7 (C3 C4 E4 G4)/h:I ||',
      },
      {
        title: 'iv6 over a descending bass',
        desc: 'The bass walks down C–B–A♭–G. The borrowed A♭ in the bass falls by half step to the dominant.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (B2 D4 G4 B4)/h:V6 | (Ab2! C4 F4 C5)/h:iv6 (G2 D4 G4 B4)/h:V | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: 'Deceptive cadence to ♭VI',
        desc: 'V seems headed for I but moves to A♭ major (♭VI). Every voice moves by step. Borrowed iv then leads back to V and home.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (G2 D4 G4 B4)/h:V | (Ab2! Eb4! Ab4! C5)/w:♭VI | (F2 F4 Ab4! C5)/h:iv (G2 D4 G4 B4)/h:V | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: '♭VII and ♭III',
        desc: 'The rarer borrowed chords. Here B♭ major (♭VII) acts as the dominant of E♭ major (♭III), before borrowed iv returns to V and I.',
        clef: 'grand', bpm: 72, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (Bb2! D4 F4 Bb4!)/h:♭VII | (Eb3! Eb4! G4 Bb4!)/h:♭III (F3 F4 Ab4! C5)/h:iv | (G2 D4 G4 B4)/h:V (C3 E4 G4 C5)/h:I ||',
      },
      {
        title: 'Picardy third',
        desc: 'A phrase in C minor that ends on a C major chord. The raised 3rd (E♮) is borrowed from the parallel major.',
        key: 'Cm', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 Eb4 G4 C5)/h:i (F3 F4 Ab4 C5)/h:iv | (G3 D4 G4 B4)/h:V (C3 E4! G4 C5)/h:I ||',
      },
      {
        title: 'Rock: the ♭VI – ♭VII – I ending',
        desc: 'Two borrowed chords from C minor, A♭ and B♭, rise by step to a major tonic. It replaces V – I and is a favorite “heroic” ending in rock and film music.',
        instrument: 'guitar', clef: 'grand', bpm: 80, time: [4, 4], modeSwitch: false,
        score: '(C3 G3 C4 E4)/w:I | (Ab2! Eb3! Ab3! C4)/h:♭VI (Bb2! F3 Bb3! D4)/h:♭VII | (C3 G3 C4 E4)/w:I ||',
      },
    ],
  },

  {
    id: 'neapolitan', section: 'harmony', title: 'The Neapolitan Chord',
    summary: 'A major triad on the lowered 2nd degree: the most colorful way to approach V.',
    body: `
      <p>The V–I progression organizes tonal music, but much of the interest comes from <i>how</i> the dominant is approached. One of the most colorful chords used before V is the <b>Neapolitan</b>, abbreviated <b>N</b>. Its name comes from a group of 18th-century opera composers associated with Naples, who used it often but did not invent it.</p>
      <p>The Neapolitan is a <b>major triad built on the lowered 2nd scale degree</b>. In C minor that is D♭–F–A♭. It needs one accidental in a minor key (D♭) and two in a major key (D♭ and A♭).</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Conventional use: the Neapolitan sixth</h3>
      <p>The Neapolitan is usually found in the <b>minor mode</b> and in <b>first inversion</b>, with the 3rd (F in C minor) in the bass. This is so typical that the chord is often called the <b>Neapolitan sixth</b> (<b>N6</b>). Its usual behavior:</p>
      <ol>
        <li>When a tone is doubled, it is usually the <b>3rd</b> (the bass note).</li>
        <li>N6 moves to <b>V</b>, sometimes passing through <b>i6/4</b> or <b>vii°7/V</b> on the way. It is not normally followed by iv or ii°.</li>
        <li>The <b>♭2</b> (D♭) moves <b>down</b>, especially in the melody. Its goal is the leading tone (B), a diminished 3rd below. When N6 moves first to i6/4 or vii°7/V, the tonic (C) fills in that gap: D♭–C–B.</li>
        <li>When N6 moves to i6/4, the upper voices move in <b>parallel 4ths</b>, which avoids parallel 5ths.</li>
        <li>Like ii6, N6 is usually <b>preceded by VI, iv or i</b>.</li>
      </ol>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Other uses</h3>
      <ul>
        <li><b>Root position</b> (N), or rarely second inversion. Here the bass is usually doubled.</li>
        <li>In the <b>major mode</b>, often prepared by mode mixture.</li>
        <li><b>Tonicized</b> by its own dominant (V7/N). Its root is a tritone away from V (D♭ vs. G), a striking relationship.</li>
        <li>As the <b>common chord in a modulation</b>, or as a <b>neighbor chord</b> instead of a pre-dominant. In rare cases it has a 7th (NM7).</li>
      </ul>
      <div class="tip">In the examples, the lowered 2nd degree (and other chromatic notes) are shown in <b class="text-violet-600 dark:text-violet-400">purple</b>. Follow the purple D♭ in the top voice: it almost always steps down toward the leading tone B.</div>`,
    examples: [
      {
        title: 'i – N6 – V – i',
        desc: 'The basic pattern in C minor. The bass F (the doubled 3rd) rises to G, while the top voice falls from D♭ to B: a diminished 3rd.',
        key: 'Cm', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 Eb4 G4 C5)/h:i (F3 F4 Ab4 Db5!)/h:N6 | (G3 D4 G4 B4)/h:V (C3 Eb4 G4 C5)/h:i ||',
      },
      {
        title: 'Through the cadential i6/4',
        desc: 'D♭ moves to C (the i6/4) before reaching B, so the tonic fills in the diminished 3rd. The upper voices move in parallel 4ths.',
        key: 'Cm', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 Eb4 G4 C5)/h:i (F3 F4 Ab4 Db5!)/h:N6 | (G3~ Eb4 G4 C5)/h:i6/4 (G3 D4 G4 B4)/h:V | (C3 Eb4 G4 C5)/w:i ||',
      },
      {
        title: 'Through vii°7/V',
        desc: 'The bass rises chromatically F–F♯–G. D♭ again resolves through C to B.',
        key: 'Cm', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 Eb4 G4 C5)/h:i (F3 F4 Ab4 Db5!)/h:N6 | (F#3 Eb4 A4 C5)/h:vii°7/V (G3 D4 G4 B4)/h:V | (C3 Eb4 G4 C5)/w:i ||',
      },
      {
        title: 'VI – N6 – V – i',
        desc: 'N6 is often preceded by VI. Only one note changes between them: C rises to D♭, then falls to B.',
        key: 'Cm', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 Eb4 G4 C5)/h:i (Ab2 Eb4 Ab4 C5)/h:VI | (F2 F4 Ab4 Db5!)/h:N6 (G2 D4 G4 B4)/h:V | (C3 Eb4 G4 C5)/w:i ||',
      },
      {
        title: 'Root-position N, tonicized by V7/N',
        desc: 'A♭7 acts as the dominant of D♭ (V7/N). The Neapolitan is then in root position with the bass doubled. Notice the tritone in the bass from D♭ to G.',
        key: 'Cm', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 Eb4 G4 C5)/h:i (Ab2 Eb4 Gb4! C5)/h:V7/N | (Db3! F4 Ab4 Db5!)/h:N (G2 F4 G4 B4)/h:V7 | (C3 Eb4 G4 C5)/w:i ||',
      },
      {
        title: 'The Neapolitan in a major key',
        desc: 'In C major the N6 needs two accidentals, D♭ and A♭. Here borrowed iv prepares it, so only one note has to change.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (F3 F4 Ab4! C5)/h:iv | (F3 F4 Ab4! Db5!)/h:N6 (G3 D4 G4 B4)/h:V | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: 'Beethoven: “Moonlight” Sonata, Op. 27 No. 2, I', repertoire: true,
        desc: 'Bars 1–5 as a harmonic reduction (the triplet arpeggios are shown as chords). In bar 3, A major moves to D major over F♯: a Neapolitan sixth in C♯ minor, followed by the dominant.',
        key: 'C#m', clef: 'grand', bpm: 40, time: [4, 4], modeSwitch: false,
        score: '(C#3 G#3 C#4 E4)/w:i | (B2 G#3 C#4 E4)/w:i4/2 | (A2 A3 C#4 E4)/h:VI (F#2 A3 D4! F#4)/h:N6 | (G#2 G#3 B#3 F#4)/w:V7 | (C#3 G#3 C#4 E4)/w:i ||',
      },
    ],
  },

  {
    id: 'augmented-sixths', section: 'harmony', title: 'Augmented Sixth Chords',
    summary: 'Italian, French and German sixths: approaching V by half step from both sides.',
    body: `
      <p>A strong way to emphasize a note is to approach it by half step. Approach the <b>dominant</b> by half step from <i>above and below at the same time</i>, and the two approaching notes form the interval of an <b>augmented 6th</b>. In C minor, A♭ in the bass falls to G while F♯ in an upper voice rises to G. The augmented 6th (A♭–F♯) expands outward to an octave on the dominant. Chords built around this interval are called <b>augmented sixth chords</b>.</p>
      <p>Most augmented sixth chords share three features:</p>
      <ol>
        <li>The chord being approached is <b>V</b>.</li>
        <li>The minor-mode <b>6</b> (♭6 in a major key) is in the <b>bass</b>.</li>
        <li><b>♯4</b> is in an <b>upper part</b>.</li>
      </ol>
      <p>The augmented 6th sounds the same as a minor 7th on the piano (A♭–F♯ = A♭–G♭), but it behaves completely differently: it resolves <i>outward</i> to an octave. The analysis symbol is an arabic <b>+6</b>, not a Roman numeral. The chord is one of the strongest approaches to the dominant, and it usually moves directly to V or to i6/4–V. It started in minor keys but is just as useful in major, where it is often prepared by mode mixture.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">The three types</h3>
      <p>Most +6 chords add other notes to the A♭–F♯ pair. The three common types have geographical names, which are traditional labels with no historical basis:</p>
      <table>
        <tr><th>Type</th><th>Scale degrees</th><th>In C minor</th><th>Notes</th></tr>
        <tr><td><b>Italian</b> (It+6)</td><td>♭6, 1, ♯4</td><td>A♭–C–F♯</td><td>In four voices the tonic is doubled</td></tr>
        <tr><td><b>French</b> (Fr+6)</td><td>♭6, 1, 2, ♯4</td><td>A♭–C–D–F♯</td><td>Italian + 2̂</td></tr>
        <tr><td><b>German</b> (Ger+6)</td><td>♭6, 1, ♭3, ♯4</td><td>A♭–C–E♭–F♯</td><td>Italian + minor 3̂; sounds like a dominant 7th</td></tr>
      </table>
      <p>When the <b>German sixth</b> moves straight to V, parallel 5ths result (A♭–E♭ to G–D). The ear is distracted by the resolving augmented 6th, so they are not very objectionable, but composers usually hide them, or delay V with a <b>cadential i6/4</b>. In a major key, a German sixth that moves to I6/4 is often spelled with <b>♯2</b> instead of ♭3 (D♯ instead of E♭ in C), because a raised note rising to E looks more logical than E♭ moving to E♮.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Less common uses</h3>
      <ul>
        <li><b>Other bass positions.</b> An augmented sixth chord is a linear sonority with no root, but ♭6 is its usual bass. With <b>♯4 in the bass</b>, the interval becomes a <b>diminished 3rd</b> (F♯–A♭) that resolves <i>inward</i> to the dominant. The tonic in the bass is the only other position that occurs often.</li>
        <li>As a <b>neighbor chord</b>, V – +6 – V. Sometimes another chord, such as V/V or vii°7/V, comes between the +6 and V.</li>
        <li>Built on other scale degrees, embellishing a chord other than V (for example +6/I), and occasionally a +6 chord that is none of the three standard types.</li>
      </ul>
      <div class="tip">Chromatic notes are shown in <b class="text-violet-600 dark:text-violet-400">purple</b>. Watch the bass A♭ and the purple F♯ in each example: they move in opposite directions and land on G an octave apart.</div>`,
    examples: [
      {
        title: 'The augmented 6th expands to an octave',
        desc: 'Just the two essential notes: A♭ in the bass falls a half step and F♯ above rises a half step, meeting on G, the dominant, an octave apart.',
        key: 'Cm', clef: 'grand', bpm: 60, time: [4, 4], modeSwitch: false,
        score: '(C3 Eb4)/h:i (Ab2 F#4!)/h:+6 | (G2 G4)/w:V ||',
      },
      {
        title: 'Italian sixth: It+6 – V – i',
        desc: 'A♭, C and F♯, with the tonic C doubled. C and G stay put or move by step while the A♭–F♯ pair expands to G.',
        key: 'Cm', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 Eb4 G4 C5)/h:i (Ab2 C4 F#4! C5)/h:It+6 | (G2 D4 G4 B4)/h:V (C3 Eb4 G4 C5)/h:i ||',
      },
      {
        title: 'French sixth: Fr+6 – V – i',
        desc: 'The Italian sixth plus D (2̂). It has a distinctive whole-tone color, and D is held into the V chord.',
        key: 'Cm', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 Eb4 G4 C5)/h:i (Ab2 D4~ F#4! C5)/h:Fr+6 | (G2 D4 G4 B4)/h:V (C3 Eb4 G4 C5)/h:i ||',
      },
      {
        title: 'German sixth straight to V (parallel 5ths)',
        desc: 'The Italian sixth plus E♭ (minor 3̂). Moving directly to V, the bass A♭–G and the E♭–D above it form parallel perfect 5ths.',
        key: 'Cm', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 Eb4 G4 C5)/h:i (Ab2 Eb4 F#4! C5)/h:Ger+6 | (G2 D4 G4 B4)/h:V (C3 Eb4 G4 C5)/h:i ||',
      },
      {
        title: 'German sixth through the cadential i6/4',
        desc: 'The usual cure for the 5ths: E♭ and C are held into i6/4, and only then step down to D and B over the same bass G.',
        key: 'Cm', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 Eb4 G4 C5)/h:i (Ab2 Eb4~ F#4! C5~)/h:Ger+6 | (G2~ Eb4 G4 C5)/h:i6/4 (G2 D4 G4 B4)/h:V | (C3 Eb4 G4 C5)/w:i ||',
      },
      {
        title: 'German sixth in a major key (spelled with D♯)',
        desc: 'In C major, both A♭ and the 3rd come from outside the key. Because the chord goes to I6/4, the 3rd is spelled D♯, which rises to E.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (Ab2! D#4! F#4! C5~)/h:Ger+6 | (G2~ E4 G4 C5)/h:I6/4 (G2 D4 G4 B4)/h:V | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: 'F♯ in the bass: a diminished 3rd',
        desc: 'With ♯4 in the bass, the augmented 6th turns into a diminished 3rd (F♯–A♭), which resolves inward to G.',
        key: 'Cm', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 Eb4 G4 C5)/h:i (F#2! C4 Eb4 Ab4)/h:Ger+6 | (G2~ C4 Eb4 G4)/h:i6/4 (G2 B3 D4 G4)/h:V | (C3 C4 Eb4 G4)/w:i ||',
      },
    ],
  },
  {
    id: 'enharmonic-modulation', section: 'harmony', title: 'Enharmonic Spellings & Modulations',
    summary: 'Respelling notes for the eye, and reinterpreting chords for the ear to reach distant keys.',
    body: `
      <p>Two notes that sound the same but are written differently, such as A♭ and G♯, are <b>enharmonic</b>. Composers use enharmonic spellings for two very different reasons.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Enharmonic spelling (for the eye)</h3>
      <ul>
        <li><b>To show where a line is going.</b> In C major, vii°7/V is F♯–A–C–E♭. If it moves to a cadential I6/4, the E♭ has to go <i>up</i> to E. That looks odd, so composers often write D♯ instead: D♯ rising to E looks natural, because we expect raised notes to rise and lowered notes to fall. The sound and the function don't change. If the chord goes straight to V, the E♭ spelling is fine, because the 7th falls to D.</li>
        <li><b>To make the music easier to read.</b> A passage that drifts into a key like G♭ minor (nine flats!) is usually written in F♯ minor instead. Sometimes the key signature changes, sometimes the composer just uses accidentals.</li>
      </ul>
      <p>Spellings like these are for the performer. The listener cannot hear them.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Enharmonic reinterpretation (for the ear)</h3>
      <p>Four sonorities can be heard in a <i>different key</i> when they are reinterpreted enharmonically. The listener hears this when the chord resolves:</p>
      <table>
        <tr><th>Sonority</th><th>Can be heard as</th><th>Use</th></tr>
        <tr><td><b>Major-minor seventh</b></td><td>V7 (or secondary V7) in one key = <b>Ger+6</b> in another</td><td>common</td></tr>
        <tr><td><b>Diminished seventh</b></td><td>vii°7 in four different keys: any of its notes can be the leading tone</td><td>common</td></tr>
        <tr><td>Augmented triad</td><td>III+ in several keys</td><td>rare</td></tr>
        <tr><td>French sixth</td><td>Fr+6 in two keys</td><td>rare</td></tr>
      </table>
      <p>An <b>enharmonic modulation</b> uses one of these chords as the common chord between two keys. It doesn't matter how the chord is written: in the old key, the new one, or both. What matters is that the chord can be <i>heard</i> as a sensible chord in both keys. The listener expects one resolution and gets another, equally logical one. Composers save this for especially dramatic moments.</p>
      <ul>
        <li><b>Using the major-minor seventh:</b> any V7 or secondary V7 in the first key can become a Ger+6 in the new key, or the other way round. Most often the common chord is a Ger+6 in the second key, and the most common pairing is <b>V7/IV becoming Ger+6</b>. In G major, G7 (V7/IV) can turn into a German sixth in B major (G–B–D–E♯).</li>
        <li><b>Using the diminished seventh:</b> it can lead in four directions. Either vii°7 resolves straight to the new tonic, or vii°7 – V7 – I. Surprisingly, it is used less often for enharmonic modulation than the major-minor seventh.</li>
      </ul>
      <div class="tip">The enharmonically reinterpreted notes are shown in <b class="text-violet-600 dark:text-violet-400">purple</b>. Play the examples in pairs: the chord sounds the same each time, but it leads somewhere different.</div>`,
    examples: [
      {
        title: 'vii°7/V to I6/4, spelled with E♭',
        desc: 'The 7th, E♭, has to rise to E in the I6/4. Written this way, the line looks wrong.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (F#3! Eb4! A4 C5)/h:vii°7/V | (G3~ E4 G4 C5)/h:I6/4 (G3 D4 G4 B4)/h:V | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: 'The same chord respelled with D♯',
        desc: 'It sounds identical, but D♯ rising to E looks natural. The analysis is still vii°7/V.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (F#3! D#4! A4 C5)/h:vii°7/V | (G3~ E4 G4 C5)/h:I6/4 (G3 D4 G4 B4)/h:V | (C3 E4 G4 C5)/w:I ||',
      },
      {
        title: 'G7 as V7/IV in G major (the expected resolution)',
        desc: 'In G major, G7 sounds like the dominant of C (IV), and it resolves there.',
        key: 'G', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(G2 D4 G4 B4)/h:I (G2 D4 F4! B4)/h:V7/IV | (C3 C4 E4 C5)/h:IV (D3 C4 F#4 A4)/h:V7 | (G2 B3 G4 B4)/w:I ||',
      },
      {
        title: 'The same sound as a German sixth: G major to B major',
        desc: 'Now the chord is spelled G–B–D–E♯: a Ger+6 in B major. Instead of going to C, it resolves to B’s cadential I6/4, and the music is suddenly in a key far from G.',
        key: 'G', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(G2 D4 G4 B4)/h:G:_I (G2 D4 E#4! B4)/h:B:_Ger+6 | (F#2 D#4 F#4 B4)/h:B:_I6/4 (F#2 C#4 E4 A#4)/h:V7 | (B2 D#4 F#4 B4)/w:I ||',
      },
      {
        title: 'One diminished seventh, four keys',
        desc: 'The upper notes never change in sound. Each time, a different note of the chord is treated as the leading tone, and the chord resolves to C minor, E♭ major, G♭ major and A minor.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false, transpose: false,
        score: '(B2 D4 F4 Ab4)/h:Cm:_vii°7 (C3 C4 Eb4 G4)/h:i | (D3 F4 Ab4 Cb5!)/h:E♭:_vii°7 (Eb3 Eb4 G4 Bb4)/h:I | (F3 Ab4 Cb5! Ebb5!)/h:G♭:_vii°7 (Gb3 Gb4 Bb4 Db5)/h:I | (G#2! D4 F4 B4)/h:Am:_vii°7 (A2 C4 E4 A4)/h:i ||',
      },
      {
        title: 'Modulating with a diminished seventh: C to E♭',
        desc: 'After IV in C, the diminished seventh sounds like vii°7 of C. It is respelled as D–F–A♭–C♭, vii°7 of E♭, and goes on to E♭’s V7 and I. This is the vii°7 – V7 – I method.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:C:_I (F3 F4 A4 C5)/h:IV | (D3 F4 Ab4 Cb5!)/h:E♭:_vii°7 (Bb2 F4 Ab4 Bb4)/h:V7 | (Eb3 Eb4 G4 Bb4)/w:I ||',
      },
    ],
  },
  {
    id: 'ninth-chords', section: 'harmony', title: 'Ninth, Eleventh & Thirteenth Chords',
    summary: 'Stacking thirds beyond the seventh, and how ninths behave in tonal music.',
    body: `
      <p>Stacking 3rds produces triads and seventh chords. Keep stacking and you get <b>ninth</b>, <b>eleventh</b> and <b>thirteenth</b> chords. This is not how these sounds actually developed historically, but it is a convenient way to describe them. On G, the dominant of C major:</p>
      <table>
        <tr><th>Chord</th><th>Notes</th><th>Added interval above the root</th></tr>
        <tr><td>V</td><td>G–B–D</td><td>(triad)</td></tr>
        <tr><td>V7</td><td>G–B–D–F</td><td>7th</td></tr>
        <tr><td>V9 / V♭9</td><td>G–B–D–F–A (or A♭)</td><td>9th (major or minor)</td></tr>
        <tr><td>V11</td><td>G–B–D–F–A–C</td><td>11th</td></tr>
        <tr><td>V13</td><td>G–B–D–F–A–C–E</td><td>13th</td></tr>
      </table>
      <p>Triads and seventh chords were the everyday material of 18th- and 19th-century music. <b>True elevenths and thirteenths are rare before impressionism.</b> Ninths appear throughout the tonal era, but the 9th can often be analyzed as a <b>non-chord tone</b>, and it usually <b>disappears before the chord resolves</b>.</p>
      <ul>
        <li>The most common treatment: the 9th <b>slips down a step to double the root</b>, turning V9 into V7 before the resolution.</li>
        <li>The melody can also <b>arpeggiate down from the 9th to the 7th</b>.</li>
        <li>Some ninth chords keep their 9th all the way to the resolution. Then the 9th <b>resolves down by step</b>.</li>
        <li><b>Dominant ninths</b> are the most common, but other ninth chords occur, for example <b>iv9</b>.</li>
      </ul>
      <p>The symbols for ninth chords are not standardized. The simplest approach is to let the Roman numeral show the triad type and add a 9: V9, V♭9, iv9. Inverted ninth chords are less common than inverted triads and seventh chords. For them, the seventh-chord inversion figures can be added in parentheses, such as V9(6/5).</p>
      <div class="tip">In the examples the <b>9th</b> of each chord is shown in <b class="text-violet-600 dark:text-violet-400">purple</b>. Follow it: it almost always moves down by step.</div>`,
    examples: [
      {
        title: 'Stacking thirds on the dominant',
        desc: 'G major triad, then the 7th, the minor and major 9th, the 11th, and the full 13th chord: all seven notes of the scale, stacked in 3rds.',
        clef: 'grand', bpm: 60, time: [4, 4], modeSwitch: false,
        score: '(G2 G3 B3 D4)/w:V | (G2 B3 D4 F4)/w:V7 | (G2 B3 D4 F4 Ab4!)/w:V♭9 | (G2 B3 D4 F4 A4!)/w:V9 | (G2 B3 D4 F4 A4! C5)/w:V11 | (G2 B3 D4 F4 A4! C5 E5)/w:V13 ||',
      },
      {
        title: 'The 9th slips down to the root (V♭9 – V7 – i)',
        desc: 'In C minor, the minor 9th A♭ falls a step to G, the root, so V♭9 becomes V7 before resolving to i.',
        key: 'Cm', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 C4 Eb4 G4)/h:i (G2 B3 F4 Ab4!)/h:V♭9 | (G2 B3 F4 G4)/h:V7 (C3 C4 Eb4 G4)/h:i ||',
      },
      {
        title: 'Arpeggiating from the 9th down to the 7th',
        desc: 'The melody leaps from A (the 9th) down to F (the 7th), which then resolves to E.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 C4 E4 G4)/w:I | (G2~ B3~ D4~ A4!)/h:V9 (G2 B3 D4 F4)/h:V7 | (C3 C4 E4)/w:I ||',
      },
      {
        title: 'A 9th that resolves down by step (V9 – I)',
        desc: 'Here the 9th, A, stays until the resolution and then falls to G. B rises to C and F falls to E.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (F3 F4 A4 C5)/h:IV | (G2 B3 F4 A4!)/h:V9 (C3 C4 E4 G4)/h:I ||',
      },
      {
        title: 'A non-dominant ninth: iv9 in A minor',
        desc: 'D–F–A–C–E. The 9th, E, falls to D, the 7th of the following V7, which then resolves to i.',
        key: 'Am', clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(A2 E4 A4 C5)/h:i (D3 F4 A4 C5 E5!)/h:iv9 | (E3 E4 G#4 B4 D5)/h:V7 (A2 E4 A4 C5)/h:i ||',
      },
    ],
  },
  {
    id: 'late-romantic', section: 'harmony', title: 'Late Nineteenth-Century Harmony',
    summary: 'How post-Romantic composers stretched tonality: chromatic counterpoint, new chord types, free dominants and shifting keys.',
    body: `
      <p>The forces that eventually ended the dominance of the tonal system grew naturally out of the way music had been developing all through the 19th century. In the <b>post-Romantic era</b>, roughly the last two decades of the 19th century and the first two of the 20th, these practices became the norm rather than the exception. The trends include:</p>
      <ul>
        <li>more <b>contrapuntal</b> writing;</li>
        <li>harmonies blurred by long, strong <b>non-chord tones</b>;</li>
        <li>rapid movement from one passing tonality to another;</li>
        <li>avoiding <b>dominant-to-tonic cadences</b> for long stretches, sometimes leaving the main key unclear until late in the piece;</li>
        <li>melodies freed from their traditional harmonic roles, and chord successions valued for their <b>color</b> alone.</li>
      </ul>
      <p>The same period saw large forms expand (Bruckner, Mahler, Wagner's music dramas, the tone poems of Liszt and Sibelius) and a wave of <b>nationalism</b>, from the Russian Five to Grieg, Dvořák and Elgar.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Counterpoint that blurs the harmony</h3>
      <p>When supporting voices move chromatically and independently, individual chords and any clear sense of progression become hard to pin down. Wagner, perhaps the most influential composer of the era, opens the Prelude to <i>Tristan und Isolde</i> with a chord (F–B–D♯–G♯) that sounds like a half-diminished seventh. The G♯ moves up to A, which makes the chord a French sixth in A, and it resolves to E7, the dominant of A. Even so, the tonic A never arrives: the music implies the key without confirming it.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">New sonorities</h3>
      <p>Scriabin liked sounds that kept a hint of traditional function but resisted analysis as triads. Two important ones:</p>
      <ul>
        <li>The <b>whole-tone scale</b> divides the octave into six equal whole steps. It has no perfect 5th and no half step for a leading tone, so a clear tonal center is impossible, and three whole steps in a row frame a restless tritone. Its chords are augmented triads.</li>
        <li>The <b>mystic chord</b> (C–F♯–B♭–E–A–D) is usually voiced in 4ths. Collapsed into a scale (C–D–E–F♯–A–B♭), it is almost a whole-tone scale.</li>
      </ul>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Dominant harmony set free</h3>
      <p>The structural pillar of the tonal system is the inviolable <b>V–I</b> progression. When that relationship is tampered with, the result, however consonant on the surface, is a significant departure. Late-Romantic composers wrote <b>chains of major-minor seventh chords</b> that each suggest a dominant but resolve deceptively or move <b>in parallel</b>, used for color rather than function (Brahms, Fauré). Tchaikovsky enlivened a simple V–I by harmonizing a whole chromatic scale in between.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Sequence</h3>
      <p><b>Sequence</b> became a main tool of modulation, and it could make unusual key relationships sound logical. Rimsky-Korsakov, for example, moves through tonicizations a whole step apart. The <b>omnibus</b> is a chromatically saturated sequence: the bass and soprano move chromatically in contrary motion while the inner voices hold or exchange notes, so the progression seems to grow out of one prolonged V7.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Shifting keys</h3>
      <p>Three kinds of mediant relationship (roots a 3rd apart) give three levels of surprise:</p>
      <table>
        <tr><th>Relationship</th><th>Example from C major</th><th>Common tones</th><th>Chromatic changes</th></tr>
        <tr><td>Diatonic mediant</td><td>C → A minor</td><td>2</td><td>none</td></tr>
        <tr><td>Chromatic mediant</td><td>C → A major, C → E♭ major</td><td>1</td><td>1 (same quality)</td></tr>
        <tr><td><b>Double chromatic mediant</b></td><td>C → A♭ minor, C → E♭ minor</td><td>0</td><td>2 (opposite quality)</td></tr>
      </table>
      <p>The double chromatic mediant shares no notes with the original chord and cannot belong to the same diatonic key, so it guarantees a startling tonal shift. Composers also changed key by purely <b>linear</b> means, letting chromatic voice leading carry the music somewhere new.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Expanded tonality</h3>
      <p>Some pieces avoid confirming the tonic for so long that the listener is never quite sure what the main key is (Hugo Wolf). Others end in a different key from the one they began in. This is called <b>nonconcentric tonality</b>, the opposite of the traditional <b>concentric</b> plan in which the opening and closing keys agree (Mahler, <i>Kindertotenlieder</i>).</p>
      <div class="tip">These examples are short sketches of each technique, not quotations, except for the Tristan chord, which uses Wagner's own pitches. Listen for what is <i>missing</i>: a confirmed tonic, a leading tone, a dominant that resolves where it should.</div>`,
    examples: [
      {
        title: 'The Tristan chord',
        desc: 'A leap up from A, a chromatic descent, then F–B–D♯–G♯. The G♯ rises to A, making a French sixth, which resolves to E7. The key of A is implied, but its tonic never comes.',
        clef: 'grand', bpm: 50, modeSwitch: false,
        score: 'A3/q F4/h. E4/q | (F3 B3 D#4 G#4*)/h.:Tristan_chord (F3 B3 D#4 A4)/q:Fr+6 | (E3 B3 D4 G#4)/w:V7_(of_A) ||',
      },
      {
        title: 'The whole-tone scale',
        desc: 'Six whole steps fill the octave, with no half steps and no perfect 5th. The only triads it contains are augmented triads.',
        bpm: 100, modeSwitch: false,
        score: 'C4 D4 E4 F#4 G#4 A#4 C5/h | (C4 E4 G#4)/h:aug. (D4 F#4 A#4)/h:aug. ||',
      },
      {
        title: 'Scriabin’s mystic chord',
        desc: 'C–F♯–B♭–E–A–D, stacked mostly in 4ths. Collapsed into a scale it becomes C–D–E–F♯–A–B♭, nearly whole-tone.',
        clef: 'grand', bpm: 72, modeSwitch: false,
        score: '(C3 F#3 Bb3 E4 A4 D5)/w:mystic_chord | C4 D4 E4 F#4 A4 Bb4 C5/h ||',
      },
      {
        title: 'Parallel dominant sevenths',
        desc: 'Each chord sounds like a dominant, but instead of resolving it slides down a half step in parallel motion. Only the last one, G7, is a real V7, and it resolves to I.',
        clef: 'grand', bpm: 66, time: [4, 4], modeSwitch: false,
        score: '(C3 E4 G4 C5)/h:I (Bb2 D4 F4 Ab4)/h:B♭7 | (A2 C#4 E4 G4)/h:A7 (Ab2 C4 Eb4 Gb4)/h:A♭7 | (G2 B3 D4 F4)/h:V7 (C3 C4 E4 G4)/h:I ||',
      },
      {
        title: 'A sequence of tonicizations a whole step apart',
        desc: 'The same V7–I pattern three times, each a whole step higher: to G, to A, to B. The sequence makes the distant keys sound logical.',
        clef: 'grand', bpm: 76, time: [4, 4], modeSwitch: false,
        score: '(D3 C4 F#4 A4)/h:D7 (G2 D4 G4 B4)/h:G | (E3 D4 G#4 B4)/h:E7 (A2 E4 A4 C#5)/h:A | (F#3 E4 A#4 C#5)/h:F♯7 (B2 F#4 B4 D#5)/h:B ||',
      },
      {
        title: 'Double chromatic mediants',
        desc: 'Triads a 3rd apart, of opposite quality, with no notes in common: A minor to C♯ major and F♯ major, then A major to C minor and F minor.',
        clef: 'grand', bpm: 60, time: [4, 4], modeSwitch: false,
        score: '(A2 E4 A4 C5)/w:Am | (C#3 E#4 G#4 C#5)/w:C♯ | (A2 E4 A4 C5)/w:Am | (F#2 F#4 A#4 C#5)/w:F♯ | (A2 E4 A4 C#5)/w:A | (C3 Eb4 G4 C5)/w:Cm | (A2 E4 A4 C#5)/w:A | (F2 F4 Ab4 C5)/w:Fm ||',
      },
    ],
  },
  {
    id: 'rock', section: 'harmony', title: 'Harmony in Rock',
    summary: 'Power chords, pentatonic riffs, modal progressions and pedal points: the same theory, turned up loud.',
    body: `
      <p>Hard rock and heavy metal grow out of the blues, and they use the theory in this app in their own way. The core ideas:</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Power chords</h3>
      <p>A <b>power chord</b> is just a root and a <b>perfect 5th</b>, often with the octave added (E–B–E). It is written <b>E5</b>. It has no 3rd, so it is neither major nor minor. That suits distortion: when a heavily overdriven guitar plays a full triad, the distortion adds harsh extra tones that muddy the 3rd, while the simple 2:3 ratio of a perfect 5th stays clean and powerful.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Riffs from the pentatonic and blues scales</h3>
      <p>A <b>riff</b> is a short, repeated figure, rock's version of a <b>motive</b>. Most riffs come from the <b>minor pentatonic</b> scale (E–G–A–B–D in E) or the <b>blues scale</b>, which adds the ♭5 “blue note”. Low E and A are the guitar's open strings, which is why so many riffs are in E or A.</p>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Modal harmony and mode mixture</h3>
      <p>Rock often avoids the V–I cadence and prefers chords on the lowered degrees, the same chords classical composers borrowed through <a href="#mode-mixture">mode mixture</a>:</p>
      <ul>
        <li><b>I – ♭VII – IV – I</b> (D–C–G–D): the ♭VII comes from the Mixolydian mode. Moving ♭VII → IV → I is two plagal (down-a-4th) moves in a row, sometimes called a <b>double plagal</b> cadence.</li>
        <li><b>i – VII – VI – VII</b> in minor (Am–G–F–G): an Aeolian loop with no leading tone at all. Rock players usually call these chords ♭VII and ♭VI.</li>
        <li><b>♭VI – ♭VII – I</b> in a major key: a grand, “heroic” ending built from borrowed chords instead of V.</li>
      </ul>
      <h3 class="mb-2 mt-6 font-display text-lg font-bold">Other techniques</h3>
      <ul>
        <li><b>Pedal point:</b> a palm-muted low string chugs on one note while chords move above it, just like a classical <a href="#non-chord-tones">pedal point</a>. A long-short-short rhythm gives the metal “gallop”.</li>
        <li><b>The tritone:</b> the “devil's interval” (E–B♭) became the signature sound of heavy metal.</li>
        <li><b>Chromatic bass lines</b> descending under a minor chord (A–G♯–G–F♯), a device as old as the Baroque lament bass.</li>
        <li>The <a href="#progressions">12-bar blues</a> runs through rock 'n' roll and hard rock alike.</li>
      </ul>
      <div class="tip"><b>About the examples:</b> famous hard-rock songs are still under copyright, so the riffs and progressions below are original examples written for this app in the style of each technique. The <b>Listen for it</b> list below names well-known recordings that use the same ideas. Examples marked ⚡ play with a distorted electric-guitar sound.</div>`,
    listen: [
      'Power chords: The Kinks, “You Really Got Me” (1964); AC/DC, “Back in Black” (1980)',
      'Blues-scale riffs: Cream, “Sunshine of Your Love” (1967); Led Zeppelin, “Whole Lotta Love” (1969); Deep Purple, “Smoke on the Water” (1972), whose riff includes the ♭5 blue note',
      'The tritone: Black Sabbath, “Black Sabbath” (1970)',
      'I – ♭VII – IV: Lynyrd Skynyrd, “Sweet Home Alabama” (1974); Guns N’ Roses, “Sweet Child o’ Mine” (1987)',
      'i – ♭VII – ♭VI – ♭VII loop: Jimi Hendrix, “All Along the Watchtower” (1968)',
      'Galloping pedal-point riffs: Iron Maiden, “The Trooper” (1983); Metallica, “Master of Puppets” (1986)',
      'Descending chromatic bass under a minor chord: Led Zeppelin, “Stairway to Heaven” (1971), introduction',
    ],
    examples: [
      {
        title: 'Power chords', key: 'Em',
        desc: 'Root, 5th and octave, with no 3rd. E5 – G5 – A5 – C5 – E5 all fit the E minor pentatonic scale.',
        instrument: 'guitar', clef: 'bass', bpm: 100, time: [4, 4], modeSwitch: false,
        score: '(E2 B2 E3)/h:E5 (G2 D3 G3)/h:G5 | (A2 E3 A3)/h:A5 (C3 G3 C4)/h:C5 | (E2 B2 E3)/w:E5 ||',
      },
      {
        title: 'A minor-pentatonic riff', key: 'Em',
        desc: 'Single notes from E–G–A–B–D, always returning to the open low E.',
        instrument: 'guitar', clef: 'bass', bpm: 110, time: [4, 4], modeSwitch: false,
        score: 'E2/e E2/e G2/e E2/e A2/e E2/e B2/q | D3/e B2/e A2/e G2/e E2/h ||',
      },
      {
        title: 'A blues-scale riff with the “blue note”', key: 'Am',
        desc: 'The A blues scale: A–C–D–E♭–E–G. The E♭ (♭5) is a chromatic passing note between D and E.',
        instrument: 'guitar', clef: 'bass', bpm: 100, time: [4, 4], modeSwitch: false,
        score: 'A2/e C3/e D3/e Eb3*/e:♭5 E3/e G3/e A3/q | G3/e E3/e Eb3*/e D3/e C3/e A2/e A2/q ||',
      },
      {
        title: 'Galloping pedal point', key: 'Em',
        desc: 'A palm-muted low E in a long-short-short rhythm, with power chords stabbing above it. The E is a pedal point under changing harmony.',
        instrument: 'guitar', clef: 'bass', bpm: 120, time: [4, 4], modeSwitch: false,
        score: 'E2/e:pedal E2/s E2/s E2/e E2/s E2/s (G2 D3)/q:G5 (A2 E3)/q:A5 | E2/e E2/s E2/s E2/e E2/s E2/s (C3 G3)/q:C5 (B2 F#3)/q:B5 ||',
      },
      {
        title: 'The tritone riff', key: 'Em',
        desc: 'Low E, its octave, then down a tritone to B♭: the “devil’s interval” that defined the sound of early heavy metal.',
        instrument: 'guitar', clef: 'bass', bpm: 72, time: [4, 4], modeSwitch: false,
        score: 'E2/q E3/q Bb2/h:tritone | E2/q E3/q Bb2/q A2/q ||',
      },
      {
        title: 'I – ♭VII – IV – I (Mixolydian)',
        desc: 'D – C – G – D. C major is ♭VII, borrowed from D Mixolydian. ♭VII → IV → I moves down a 4th twice: a “double plagal” cadence.',
        instrument: 'guitar', clef: 'grand', key: 'G', tonic: 'D', mode: 'Mixolydian', bpm: 96, time: [4, 4], modeSwitch: false,
        score: '(D3 A3 D4 F#4)/h:I (C3 G3 C4 E4)/h:♭VII | (G2 D3 G3 B3)/h:IV (D3 A3 D4 F#4)/h:I ||',
      },
      {
        title: 'i – VII – VI – VII (Aeolian loop)',
        desc: 'Am – G – F – G, in natural minor with no leading tone. Rock players call these chords ♭VII and ♭VI.',
        instrument: 'guitar', clef: 'grand', key: 'Am', bpm: 88, time: [4, 4], modeSwitch: false,
        score: '(A2 E3 A3 C4)/w:i | (G2 D3 G3 B3)/w:VII | (F2 C3 F3 A3)/w:VI | (G2 D3 G3 B3)/w:VII ||',
      },
      {
        title: 'Descending chromatic bass under a minor chord',
        desc: 'The bass slides A – G♯ – G – F♯ – F – E while the upper notes barely move: Am, E/G♯, C/G, D/F♯, F, E, Am.',
        clef: 'grand', key: 'Am', bpm: 72, time: [4, 4], modeSwitch: false,
        score: '(A2 A3 C4 E4)/h:Am (G#2 B3 E4)/h:E/G♯ | (G2 C4 E4)/h:C/G (F#2 A3 D4)/h:D/F♯ | (F2 A3 C4)/h:F (E2 B3 E4)/h:E | (A2 A3 C4 E4)/w:Am ||',
      },
    ],
  },
  // ───────────────────────── Practice ─────────────────────────
  {
    id: 'note-reading', section: 'practice', title: 'Note Reading',
    summary: 'Name the note on the staff.',
    widget: 'noteReader',
    body: `<p>A note appears on the staff. Click its letter name. You'll hear the note after each answer. Switch between treble and bass clef any time.</p>`,
  },
  {
    id: 'ear-intervals', section: 'practice', title: 'Interval Ear Training',
    summary: 'Hear two notes and name the interval.',
    widget: 'intervalTrainer',
    body: `<p>Listen to the two notes, played one after the other and then together, and pick the interval. Start with the basic set and add more as you improve. The tips from the <a href="#interval-quality">Interval Quality</a> lesson help.</p>`,
  },
  {
    id: 'ear-chords', section: 'practice', title: 'Chord Ear Training',
    summary: 'Hear a chord and name its quality.',
    widget: 'chordTrainer',
    body: `<p>Listen to the chord, first broken and then together, and pick its quality. Major sounds bright, minor dark, diminished tense and squeezed, augmented dreamy and unresolved. Turn on seventh chords for an extra challenge.</p>`,
  },
];
