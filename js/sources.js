/* Sources for every lesson and example.
 *
 * Lessons were written for this app; each one cites the chapter/pages of the reference book that cover
 * the same material (page numbers checked against the book's contents and pages).
 * Examples say who wrote them: "written for this app", or the composer/work for real melodies.
 */

const BOOK = {
  short: 'Kostka & Payne, Tonal Harmony',
  full: 'Stefan Kostka & Dorothy Payne, <i>Tonal Harmony, with an Introduction to Twentieth-Century Music</i>, 3rd ed. (New York: McGraw-Hill, 1995)',
};

const APP_EXAMPLE = 'Example written for this app';

// refs: [chapter, chapter title, section, pages]
const LESSON_SOURCES = {
  pitch: {
    refs: [[1, 'Elements of Pitch', 'The Keyboard and Octave Registers', 'p. 3']],
    note: 'Frequencies in hertz use the standard tuning A4 = 440 Hz; they are not taken from the book.',
  },
  alphabet: { refs: [[1, 'Elements of Pitch', 'The Keyboard and Octave Registers', 'pp. 3–4']] },
  treble: { refs: [[1, 'Elements of Pitch', 'Notation on the Staff', 'pp. 4–5']] },
  bass: { refs: [[1, 'Elements of Pitch', 'Notation on the Staff (clefs, grand staff)', 'pp. 4–5']] },
  accidentals: { refs: [[1, 'Elements of Pitch', 'The Major Scale (half and whole steps, table of accidentals)', 'pp. 6–8']] },
  'note-values': {
    refs: [
      [2, 'Elements of Rhythm', 'Durational Symbols', 'p. 27'],
      [2, 'Elements of Rhythm', 'More on Durational Symbols', 'p. 39'],
    ],
  },
  rests: { refs: [[2, 'Elements of Rhythm', 'Durational Symbols (table of notes and rests)', 'p. 27']] },
  meter: {
    refs: [
      [2, 'Elements of Rhythm', 'Beat and Tempo; Meter; Division of the Beat', 'pp. 28–31'],
      [2, 'Elements of Rhythm', 'Simple and Compound Time Signatures', 'pp. 32–37'],
    ],
  },
  reading: { refs: [[5, 'Principles of Voice Leading', 'The Melodic Line', 'p. 78']] },
  'major-scale': { refs: [[1, 'Elements of Pitch', 'The Major Scale', 'pp. 6–9']] },
  degrees: { refs: [[1, 'Elements of Pitch', 'Scale Degree Names', 'p. 18']] },
  'key-signatures': {
    refs: [
      [1, 'Elements of Pitch', 'The Major Key Signatures', 'p. 9'],
      [1, 'Elements of Pitch', 'Minor Key Signatures', 'p. 14'],
    ],
  },
  'minor-scales': {
    refs: [
      [1, 'Elements of Pitch', 'Minor Scales', 'p. 13'],
      [4, 'Diatonic Chords in Major and Minor Keys', 'The Minor Scale', 'p. 61'],
    ],
  },
  'other-scales': {
    refs: [[28, 'An Introduction to Twentieth-Century Practices', 'Scales (church modes pp. 480–482, pentatonic p. 484)', 'pp. 480–484']],
    note: 'The blues scale is not covered in this book.',
  },
  intervals: { refs: [[1, 'Elements of Pitch', 'Intervals', 'p. 19']] },
  'interval-quality': {
    refs: [
      [1, 'Elements of Pitch', 'Perfect, Major, and Minor Intervals', 'p. 20'],
      [1, 'Elements of Pitch', 'Augmented and Diminished Intervals', 'p. 23'],
    ],
    note: 'The song cues for recognizing intervals by ear are common teaching mnemonics, not from the book.',
  },
  triads: { refs: [[3, 'Introduction to Triads and Seventh Chords', 'Triads', 'p. 45']] },
  inversions: {
    refs: [
      [3, 'Introduction to Triads and Seventh Chords', 'Inversions of Chords', 'p. 50'],
      [3, 'Introduction to Triads and Seventh Chords', 'Inversion Symbols and Figured Bass', 'p. 51'],
    ],
  },
  'diatonic-chords': {
    refs: [
      [4, 'Diatonic Chords in Major and Minor Keys', 'Diatonic Triads in Major', 'p. 64'],
      [4, 'Diatonic Chords in Major and Minor Keys', 'Diatonic Triads in Minor', 'p. 65'],
    ],
  },
  'seventh-chords': {
    refs: [
      [3, 'Introduction to Triads and Seventh Chords', 'Seventh Chords', 'p. 48'],
      [4, 'Diatonic Chords in Major and Minor Keys', 'Diatonic Seventh Chords in Major / in Minor', 'pp. 68–69'],
      [13, 'The V7 Chord', '', 'p. 205'],
    ],
  },
  function: { refs: [[7, 'Harmonic Progression', '', 'pp. 106–119']] },
  cadences: { refs: [[10, 'Cadences, Phrases, and Periods', 'Cadences', 'p. 152']] },
  progressions: {
    refs: [[7, 'Harmonic Progression', 'Sequences and the Circle of Fifths', 'p. 107']],
    note: 'The pop, 50s and 12-bar blues progressions are not covered in this book.',
  },
  'voice-leading': {
    refs: [
      [5, 'Principles of Voice Leading', 'Voicing a Single Triad; Parallels', 'pp. 81–84'],
      [6, 'Root Position Part Writing', '', 'p. 91'],
    ],
  },
  'non-chord-tones': {
    refs: [
      [11, 'Non-Chord Tones 1', 'Classification of Non-Chord Tones (table)', 'p. 175'],
      [11, 'Non-Chord Tones 1', 'Passing Tones; Neighboring Tones; Suspensions and Retardations', 'pp. 176–184'],
      [12, 'Non-Chord Tones 2', 'Appoggiaturas; Escape Tones; Anticipations; The Pedal Point', 'pp. 190–196'],
    ],
  },
  'chromatic-harmony': {
    refs: [
      [16, 'Secondary Functions 1', 'Secondary Dominant Chords', 'pp. 255–260'],
      [18, 'Modulations Using Diatonic Common Chords', 'Common-Chord Modulation', 'p. 305'],
    ],
  },
  'mode-mixture': {
    refs: [
      [21, 'Mode Mixture', 'Introduction; Borrowed Chords in Minor (Picardy third)', 'pp. 355–356'],
      [21, 'Mode Mixture', 'The Use of ♭6 in Major', 'pp. 356–358'],
      [21, 'Mode Mixture', 'Other Borrowed Chords in Major', 'pp. 359–361'],
      [21, 'Mode Mixture', 'Modulations Involving Mode Mixture', 'pp. 362–363'],
    ],
  },
  neapolitan: {
    refs: [
      [22, 'The Neapolitan Chord', 'Introduction', 'p. 372'],
      [22, 'The Neapolitan Chord', 'Conventional Use of the Neapolitan', 'pp. 372–374'],
      [22, 'The Neapolitan Chord', 'Other Uses of the Neapolitan', 'pp. 375–377'],
      [22, 'The Neapolitan Chord', 'Summary', 'p. 378'],
    ],
  },
  'augmented-sixths': {
    refs: [
      [23, 'Augmented Sixth Chords 1', 'The Interval of the Augmented Sixth', 'pp. 384–385'],
      [23, 'Augmented Sixth Chords 1', 'The Italian, French and German Augmented Sixth Chords', 'pp. 385–390'],
      [23, 'Augmented Sixth Chords 1', 'Other Uses of Conventional Augmented Sixth Chords; Summary', 'pp. 391–393'],
      [24, 'Augmented Sixth Chords 2', 'Other Bass Positions', 'pp. 400–402'],
      [24, 'Augmented Sixth Chords 2', 'Resolutions to Other Scale Degrees / Chord Members; Other Types', 'pp. 402–405'],
    ],
  },
  'six-four': {
    refs: [
      [9, 'Triads in Second Inversion', 'Introduction; Bass Arpeggiation and the Melodic Bass', 'pp. 140–142'],
      [9, 'Triads in Second Inversion', 'The Cadential Six-Four', 'pp. 142–144'],
      [9, 'Triads in Second Inversion', 'The Passing Six-Four', 'pp. 144–146'],
      [9, 'Triads in Second Inversion', 'The Pedal Six-Four', 'pp. 146–148'],
      [9, 'Triads in Second Inversion', 'Part Writing for Second Inversion Triads; Summary', 'pp. 148–149'],
    ],
  },
  phrases: {
    refs: [
      [10, 'Cadences, Phrases, and Periods', 'Musical Form; Cadences (PAC, IAC, Phrygian half cadence, table of cadence types)', 'pp. 152–157'],
      [10, 'Cadences, Phrases, and Periods', 'Motives and Phrases', 'pp. 158–160'],
      [10, 'Cadences, Phrases, and Periods', 'Period Forms (parallel, contrasting, double period, phrase group)', 'pp. 162–168'],
      [10, 'Cadences, Phrases, and Periods', 'Summary', 'p. 169'],
    ],
  },
  'secondary-leading-tone': {
    refs: [
      [17, 'Secondary Functions 2', 'Secondary Leading-Tone Chords (tables in major and minor)', 'pp. 273–274'],
      [17, 'Secondary Functions 2', 'Spelling / Recognizing Secondary Leading-Tone Chords', 'p. 275'],
      [17, 'Secondary Functions 2', 'Secondary Leading-Tone Chords in Context', 'pp. 277–282'],
      [17, 'Secondary Functions 2', 'Sequences Involving Secondary Functions', 'pp. 283–286'],
      [17, 'Secondary Functions 2', 'Deceptive Resolutions of Secondary Functions', 'p. 287'],
    ],
  },
  forms: {
    refs: [
      [20, 'Binary and Ternary Forms', 'Formal Terminology', 'p. 335'],
      [20, 'Binary and Ternary Forms', 'Binary Forms (sectional, continuous, two-reprise)', 'pp. 335–338'],
      [20, 'Binary and Ternary Forms', 'Ternary Forms', 'pp. 338–342'],
      [20, 'Binary and Ternary Forms', 'Rounded Binary Forms', 'pp. 342–343'],
      [20, 'Binary and Ternary Forms', 'Sonata form and rondo form; Summary', 'pp. 346–347'],
    ],
    note: 'The book illustrates these forms with “Greensleeves”, “Oh, Susannah” and movements by Haydn; the app uses its own short examples instead.',
  },
  'enharmonic-modulation': {
    refs: [
      [25, 'Enharmonic Spellings and Enharmonic Modulations', 'Enharmonic Spellings', 'pp. 410–413'],
      [25, 'Enharmonic Spellings and Enharmonic Modulations', 'Enharmonic Reinterpretation', 'pp. 413–414'],
      [25, 'Enharmonic Spellings and Enharmonic Modulations', 'Enharmonic Modulations Using the Major-Minor Seventh Sonority', 'pp. 414–416'],
      [25, 'Enharmonic Spellings and Enharmonic Modulations', 'Enharmonic Modulations Using the Diminished Seventh Chord', 'pp. 416–419'],
      [25, 'Enharmonic Spellings and Enharmonic Modulations', 'Summary', 'p. 419'],
    ],
  },
  'ninth-chords': {
    refs: [[26, 'Further Elements of the Harmonic Vocabulary', 'Ninth, Eleventh, and Thirteenth Chords', 'pp. 431–432']],
  },
  'late-romantic': {
    refs: [
      [27, 'Tonal Harmony in the Late Nineteenth Century', 'Introduction', 'pp. 451–452'],
      [27, 'Tonal Harmony in the Late Nineteenth Century', 'Counterpoint (Tristan chord, whole-tone scale, mystic chord)', 'pp. 452–457'],
      [27, 'Tonal Harmony in the Late Nineteenth Century', 'Treatment of Dominant Harmony', 'pp. 457–460'],
      [27, 'Tonal Harmony in the Late Nineteenth Century', 'Sequence (including the omnibus)', 'pp. 460–463'],
      [27, 'Tonal Harmony in the Late Nineteenth Century', 'Shifting Keys', 'pp. 463–464'],
      [27, 'Tonal Harmony in the Late Nineteenth Century', 'Expanded Tonality; Summary', 'pp. 465–469'],
    ],
  },
  rock: {
    refs: [
      [21, 'Mode Mixture', 'Other Borrowed Chords in Major (♭VI, ♭VII)', 'pp. 359–361'],
      [12, 'Non-Chord Tones 2', 'The Pedal Point', 'p. 195'],
      [28, 'An Introduction to Twentieth-Century Practices', 'Scales (pentatonic, church modes)', 'pp. 480–484'],
    ],
    note: 'Kostka & Payne do not cover rock music; the references point to the classical concepts these techniques come from. All musical examples in this lesson are original; the songs in “Listen for it” are named only, because they are under copyright.',
  },
  'note-reading': {
    by: 'Exercise written for this app',
    refs: [[1, 'Elements of Pitch', 'Notation on the Staff', 'pp. 4–5']],
  },
  'ear-intervals': {
    by: 'Exercise written for this app',
    refs: [[1, 'Elements of Pitch', 'Intervals; Perfect, Major, and Minor Intervals', 'pp. 19–23']],
  },
  'ear-chords': {
    by: 'Exercise written for this app',
    refs: [[3, 'Introduction to Triads and Seventh Chords', 'Triads; Seventh Chords', 'pp. 45–48']],
  },
};

// Per-example sources, keyed "lessonId::example title". Anything not listed is APP_EXAMPLE,
// referencing its lesson's first book section.
const EXAMPLE_SOURCES = {
  'reading::“Ode to Joy” (Beethoven)': {
    by: 'Melody: Ludwig van Beethoven, Symphony No. 9 in D minor, Op. 125 (1824), finale, “Ode to Joy” theme (simplified)',
  },
  'reading::“Twinkle, Twinkle, Little Star”': {
    by: 'Melody: traditional (the French song “Ah! vous dirai-je, maman”, 18th century); English words by Jane Taylor (1806)',
  },
  'meter::6/8: “Row, Row, Row Your Boat”': { by: 'Melody: traditional (American, 19th century)' },
  'progressions::I – V – vi – IV (pop)': { by: 'A common progression in popular music; voicing written for this app' },
  'progressions::I – vi – IV – V (50s)': { by: 'A common progression in 1950s popular music; voicing written for this app' },
  'progressions::12-bar blues in C': { by: 'Traditional 12-bar blues form; voicing written for this app' },
  'progressions::Pachelbel’s Canon progression (in D)': {
    by: 'Chord progression: Johann Pachelbel, Canon in D (late 17th century); voicing written for this app',
  },
  'major-scale::G major': { ref: [1, 'Elements of Pitch', 'The Major Scale (compare Ex. 1-10)', 'p. 9'] },
  'other-scales::C major pentatonic': { ref: [28, 'An Introduction to Twentieth-Century Practices', 'Scales (compare Ex. 28-7)', 'p. 484'] },
  'other-scales::A minor pentatonic & A blues scale': {
    ref: [28, 'An Introduction to Twentieth-Century Practices', 'Scales (pentatonic, compare Ex. 28-7)', 'p. 484'],
  },
  'other-scales::D Dorian': { ref: [28, 'An Introduction to Twentieth-Century Practices', 'Scales (compare Ex. 28-2)', 'p. 480'] },
  'other-scales::F Lydian': { ref: [28, 'An Introduction to Twentieth-Century Practices', 'Scales (compare Ex. 28-2)', 'p. 480'] },
  'other-scales::G Mixolydian': { ref: [28, 'An Introduction to Twentieth-Century Practices', 'Scales (compare Ex. 28-2)', 'p. 480'] },
  'non-chord-tones::Passing tones': { ref: [11, 'Non-Chord Tones 1', 'Passing Tones', 'p. 176'] },
  'non-chord-tones::Neighboring tones': { ref: [11, 'Non-Chord Tones 1', 'Neighboring Tones', 'p. 178'] },
  'non-chord-tones::The 4–3 suspension': { ref: [11, 'Non-Chord Tones 1', 'Suspensions and Retardations', 'pp. 179–180'] },
  'non-chord-tones::9–8 and 7–6 suspensions': { ref: [11, 'Non-Chord Tones 1', 'Suspensions and Retardations (compare Ex. 11-7)', 'p. 180'] },
  'non-chord-tones::Retardation': { ref: [11, 'Non-Chord Tones 1', 'Classification of Non-Chord Tones; Suspensions and Retardations', 'pp. 175, 179'] },
  'non-chord-tones::Appoggiatura': { ref: [12, 'Non-Chord Tones 2', 'Appoggiaturas', 'p. 190'] },
  'non-chord-tones::Escape tone': { ref: [12, 'Non-Chord Tones 2', 'Escape Tones', 'p. 192'] },
  'non-chord-tones::Anticipation': { ref: [12, 'Non-Chord Tones 2', 'Anticipations', 'p. 193'] },
  'non-chord-tones::Tonic pedal point': { ref: [12, 'Non-Chord Tones 2', 'The Pedal Point', 'p. 195'] },
  'mode-mixture::IV vs. borrowed iv': { ref: [21, 'Mode Mixture', 'The Use of ♭6 in Major (compare Ex. 21-2)', 'pp. 356–358'] },
  'mode-mixture::Borrowed iiø7 and vii°7': { ref: [21, 'Mode Mixture', 'The Use of ♭6 in Major (compare Ex. 21-2)', 'p. 356'] },
  'mode-mixture::iv6 over a descending bass': { ref: [21, 'Mode Mixture', 'The Use of ♭6 in Major (compare Ex. 21-5)', 'p. 358'] },
  'mode-mixture::Deceptive cadence to ♭VI': { ref: [21, 'Mode Mixture', 'Other Borrowed Chords in Major (V–♭VI)', 'p. 359'] },
  'mode-mixture::♭VII and ♭III': { ref: [21, 'Mode Mixture', 'Other Borrowed Chords in Major (compare Ex. 21-7)', 'pp. 359–360'] },
  'mode-mixture::Picardy third': { ref: [21, 'Mode Mixture', 'Borrowed Chords in Minor (compare Ex. 21-1)', 'pp. 355–356'] },
  'neapolitan::i – N6 – V – i': { ref: [22, 'The Neapolitan Chord', 'Conventional Use of the Neapolitan (compare Ex. 22-2)', 'pp. 372–373'] },
  'neapolitan::Through the cadential i6/4': { ref: [22, 'The Neapolitan Chord', 'Conventional Use of the Neapolitan (compare Ex. 22-2c)', 'p. 373'] },
  'neapolitan::Through vii°7/V': { ref: [22, 'The Neapolitan Chord', 'Conventional Use of the Neapolitan (compare Ex. 22-2d)', 'p. 373'] },
  'neapolitan::VI – N6 – V – i': { ref: [22, 'The Neapolitan Chord', 'Conventional Use of the Neapolitan (compare Ex. 22-2a)', 'p. 373'] },
  'neapolitan::Root-position N, tonicized by V7/N': { ref: [22, 'The Neapolitan Chord', 'Other Uses of the Neapolitan (compare Ex. 22-5)', 'p. 375'] },
  'neapolitan::The Neapolitan in a major key': { ref: [22, 'The Neapolitan Chord', 'Other Uses of the Neapolitan (compare Ex. 22-6)', 'pp. 375–376'] },
  'augmented-sixths::The augmented 6th expands to an octave': { ref: [23, 'Augmented Sixth Chords 1', 'The Interval of the Augmented Sixth (compare Ex. 23-1c)', 'p. 384'] },
  'augmented-sixths::Italian sixth: It+6 – V – i': { ref: [23, 'Augmented Sixth Chords 1', 'The Italian Augmented Sixth Chord (compare Ex. 23-4)', 'pp. 385–386'] },
  'augmented-sixths::French sixth: Fr+6 – V – i': { ref: [23, 'Augmented Sixth Chords 1', 'The French Augmented Sixth Chord (compare Ex. 23-7)', 'pp. 386–387'] },
  'augmented-sixths::German sixth straight to V (parallel 5ths)': { ref: [23, 'Augmented Sixth Chords 1', 'The German Augmented Sixth Chord (compare Ex. 23-10)', 'p. 388'] },
  'augmented-sixths::German sixth through the cadential i6/4': { ref: [23, 'Augmented Sixth Chords 1', 'The German Augmented Sixth Chord (compare Ex. 23-12a)', 'p. 389'] },
  'augmented-sixths::German sixth in a major key (spelled with D♯)': { ref: [23, 'Augmented Sixth Chords 1', 'The German Augmented Sixth Chord (compare Ex. 23-12c)', 'p. 389'] },
  'augmented-sixths::F♯ in the bass: a diminished 3rd': { ref: [24, 'Augmented Sixth Chords 2', 'Other Bass Positions (compare Ex. 24-1)', 'pp. 400–401'] },
  'six-four::An incidental six-four (bass arpeggiation)': { ref: [9, 'Triads in Second Inversion', 'Bass Arpeggiation and the Melodic Bass (compare Ex. 9-2)', 'p. 141'] },
  'six-four::The cadential six-four': { ref: [9, 'Triads in Second Inversion', 'The Cadential Six-Four (compare Ex. 9-4)', 'pp. 142–143'] },
  'six-four::Passing six-fours': { ref: [9, 'Triads in Second Inversion', 'The Passing Six-Four (compare Ex. 9-7)', 'pp. 144–145'] },
  'six-four::Pedal six-fours': { ref: [9, 'Triads in Second Inversion', 'The Pedal Six-Four (compare Exx. 9-10, 9-12)', 'pp. 146–147'] },
  'phrases::Authentic cadences: PAC and three kinds of IAC': { ref: [10, 'Cadences, Phrases, and Periods', 'Cadences (compare Exx. 10-1 to 10-4)', 'pp. 152–154'] },
  'phrases::Phrygian half cadence': { ref: [10, 'Cadences, Phrases, and Periods', 'Cadences (compare Ex. 10-7)', 'pp. 155–156'] },
  'phrases::A parallel period (a a′)': { ref: [10, 'Cadences, Phrases, and Periods', 'Period Forms (parallel period, compare Ex. 10-12)', 'pp. 162–164'] },
  'phrases::A contrasting period (a b)': { ref: [10, 'Cadences, Phrases, and Periods', 'Period Forms (contrasting period, compare Ex. 10-14)', 'p. 164'] },
  'phrases::A repeated phrase (not a period)': { ref: [10, 'Cadences, Phrases, and Periods', 'Period Forms (repeated phrase)', 'p. 163'] },
  'secondary-leading-tone::vii°7/V resolving to V': { ref: [17, 'Secondary Functions 2', 'Secondary Leading-Tone Chords in Context (compare Ex. 17-1)', 'p. 277'] },
  'secondary-leading-tone::vii°7/ii tonicizes D minor': { ref: [17, 'Secondary Functions 2', 'Secondary Leading-Tone Chords (table, major)', 'pp. 273–274'] },
  'secondary-leading-tone::vii°7/vi after V7': { ref: [17, 'Secondary Functions 2', 'Secondary Leading-Tone Chords in Context (compare Ex. 17-1, second phrase)', 'p. 277'] },
  'secondary-leading-tone::Circle-of-fifths sequence (diatonic)': { ref: [17, 'Secondary Functions 2', 'Sequences Involving Secondary Functions (chart)', 'p. 283'] },
  'secondary-leading-tone::The same sequence with secondary dominants': { ref: [17, 'Secondary Functions 2', 'Sequences Involving Secondary Functions (compare Ex. 17-6)', 'pp. 283–284'] },
  'secondary-leading-tone::The sequence with leading-tone sevenths': { ref: [17, 'Secondary Functions 2', 'Sequences Involving Secondary Functions (variations chart)', 'p. 283'] },
  'secondary-leading-tone::Deceptive resolution: V7/V to vi/V': { ref: [17, 'Secondary Functions 2', 'Deceptive Resolutions of Secondary Functions', 'p. 287'] },
  'forms::Sectional binary (A B)': { ref: [20, 'Binary and Ternary Forms', 'Binary Forms (sectional binary, compare Ex. 20-1)', 'pp. 335–336'] },
  'forms::Continuous binary (A B)': { ref: [20, 'Binary and Ternary Forms', 'Binary Forms (continuous binary, compare Ex. 20-2)', 'pp. 336–338'] },
  'forms::Ternary (A B A)': { ref: [20, 'Binary and Ternary Forms', 'Ternary Forms', 'pp. 338–339'] },
  'forms::Rounded binary (A B ½A)': { ref: [20, 'Binary and Ternary Forms', 'Rounded Binary Forms (phrase diagram; compare Ex. 20-6)', 'pp. 342–343'] },
  'ninth-chords::Stacking thirds on the dominant': { ref: [26, 'Further Elements of the Harmonic Vocabulary', 'Ninth, Eleventh, and Thirteenth Chords (compare Ex. 26-11)', 'p. 431'] },
  'ninth-chords::The 9th slips down to the root (V♭9 – V7 – i)': { ref: [26, 'Further Elements of the Harmonic Vocabulary', 'Ninth, Eleventh, and Thirteenth Chords (compare Ex. 26-12)', 'p. 431'] },
  'ninth-chords::Arpeggiating from the 9th down to the 7th': { ref: [26, 'Further Elements of the Harmonic Vocabulary', 'Ninth, Eleventh, and Thirteenth Chords (compare Ex. 26-13)', 'pp. 431–432'] },
  'ninth-chords::A 9th that resolves down by step (V9 – I)': { ref: [26, 'Further Elements of the Harmonic Vocabulary', 'Ninth, Eleventh, and Thirteenth Chords (compare Ex. 26-14)', 'p. 432'] },
  'ninth-chords::A non-dominant ninth: iv9 in A minor': { ref: [26, 'Further Elements of the Harmonic Vocabulary', 'Ninth, Eleventh, and Thirteenth Chords (compare Ex. 26-15)', 'pp. 432–433'] },
  'enharmonic-modulation::vii°7/V to I6/4, spelled with E♭': { ref: [25, 'Enharmonic Spellings and Enharmonic Modulations', 'Enharmonic Spellings (compare Ex. 25-1a)', 'p. 410'] },
  'enharmonic-modulation::The same chord respelled with D♯': { ref: [25, 'Enharmonic Spellings and Enharmonic Modulations', 'Enharmonic Spellings (compare Ex. 25-1b)', 'p. 410'] },
  'enharmonic-modulation::G7 as V7/IV in G major (the expected resolution)': { ref: [25, 'Enharmonic Spellings and Enharmonic Modulations', 'Modulations Using the Major-Minor Seventh (compare Ex. 25-6, top staff)', 'pp. 414–415'] },
  'enharmonic-modulation::The same sound as a German sixth: G major to B major': { ref: [25, 'Enharmonic Spellings and Enharmonic Modulations', 'Modulations Using the Major-Minor Seventh (compare Ex. 25-6, bottom staff)', 'pp. 414–415'] },
  'enharmonic-modulation::One diminished seventh, four keys': { ref: [25, 'Enharmonic Spellings and Enharmonic Modulations', 'Enharmonic Reinterpretation; Modulations Using the Diminished Seventh (compare Exx. 25-5b, 25-8)', 'pp. 413, 416'] },
  'enharmonic-modulation::Modulating with a diminished seventh: C to E♭': { ref: [25, 'Enharmonic Spellings and Enharmonic Modulations', 'Modulations Using the Diminished Seventh Chord (compare Ex. 25-8, bottom staff)', 'p. 416'] },
  'late-romantic::The Tristan chord': {
    by: 'Harmony: Richard Wagner, <i>Tristan und Isolde</i>, Prelude (1859), opening bars; rhythm simplified for this app',
    ref: [27, 'Tonal Harmony in the Late Nineteenth Century', 'Counterpoint (compare Ex. 27-1)', 'p. 453'],
  },
  'late-romantic::The whole-tone scale': { ref: [27, 'Tonal Harmony in the Late Nineteenth Century', 'Counterpoint (compare Ex. 27-4)', 'pp. 456–457'] },
  'late-romantic::Scriabin’s mystic chord': { ref: [27, 'Tonal Harmony in the Late Nineteenth Century', 'Counterpoint (the mystic chord)', 'p. 457'] },
  'late-romantic::Parallel dominant sevenths': { ref: [27, 'Tonal Harmony in the Late Nineteenth Century', 'Treatment of Dominant Harmony (compare Exx. 27-5, 27-6)', 'pp. 458–459'] },
  'late-romantic::A sequence of tonicizations a whole step apart': { ref: [27, 'Tonal Harmony in the Late Nineteenth Century', 'Sequence (compare Ex. 27-8)', 'pp. 460–461'] },
  'late-romantic::Double chromatic mediants': { ref: [27, 'Tonal Harmony in the Late Nineteenth Century', 'Shifting Keys (compare Ex. 27-11)', 'p. 463'] },
  'bass::Bach: Cello Suite No. 1, Prelude': { by: 'Johann Sebastian Bach, Cello Suite No. 1 in G major, BWV 1007, Prelude (c. 1720), bars 1–2, exact pitches' },
  'accidentals::Rimsky-Korsakov: “Flight of the Bumblebee”': { by: 'Nikolai Rimsky-Korsakov, “Flight of the Bumblebee” from <i>The Tale of Tsar Saltan</i> (1900), opening chromatic figure, shown an octave lower' },
  'rests::Mozart: Eine kleine Nachtmusik': { by: 'Wolfgang Amadeus Mozart, Serenade No. 13 “Eine kleine Nachtmusik”, K. 525 (1787), I, bars 1–4, first violin' },
  'meter::Minuet in G (from the Anna Magdalena Bach Notebook)': { by: 'Minuet in G major, BWV Anh. 114, from the 1725 Notebook for Anna Magdalena Bach (now attributed to Christian Petzold), bars 1–8, right hand' },
  'major-scale::“Joy to the World”': { by: 'Hymn tune “Antioch”, arranged by Lowell Mason (1839) from themes attributed to Handel; words by Isaac Watts. First phrase, final note lengthened' },
  'minor-scales::“Greensleeves”': { by: 'Traditional English (16th century), bars 1–8, transcribed from the book’s Ex. 20-1', ref: [20, 'Binary and Ternary Forms', 'Binary Forms (Ex. 20-1)', 'p. 336'] },
  'other-scales::“Amazing Grace”': { by: 'Hymn tune “New Britain” (1829); words by John Newton. First eight bars', ref: [28, 'An Introduction to Twentieth-Century Practices', 'Scales (pentatonic, compare Ex. 28-7)', 'p. 484'] },
  'other-scales::“Scarborough Fair”': { by: 'Traditional English ballad, first two phrases; melody only, rhythm simplified', ref: [28, 'An Introduction to Twentieth-Century Practices', 'Scales (church modes, compare Ex. 28-2)', 'p. 480'] },
  'intervals::Famous openings, by interval': { by: 'Opening notes of: Beethoven, Symphony No. 9, finale (“Ode to Joy”); Beethoven, Symphony No. 5, I; Wagner, <i>Lohengrin</i>, “Bridal Chorus”; “Twinkle, Twinkle, Little Star” (traditional); “My Bonnie Lies over the Ocean” (traditional). Pitches only, rhythm simplified' },
  'interval-quality::Beethoven: Symphony No. 5': { by: 'Ludwig van Beethoven, Symphony No. 5 in C minor, Op. 67 (1808), I, bars 1–5, without fermatas' },
  'triads::“The Star-Spangled Banner”': { by: 'John Stafford Smith, “To Anacreon in Heaven” (c. 1773), the tune of “The Star-Spangled Banner”, opening bars' },
  'seventh-chords::Bach: Prelude in C major, BWV 846': { by: 'Johann Sebastian Bach, <i>The Well-Tempered Clavier</i>, Book I, Prelude No. 1 in C major, BWV 846 (1722), bars 1–4; each bar’s arpeggio shown as one chord' },
  'phrases::Beethoven: “Ode to Joy” as a parallel period': { by: 'Ludwig van Beethoven, Symphony No. 9 in D minor, Op. 125 (1824), finale, “Ode to Joy” theme, transposed to C', ref: [10, 'Cadences, Phrases, and Periods', 'Period Forms (parallel period)', 'pp. 162–164'] },
  'forms::“Greensleeves” (sectional binary)': { by: 'Traditional English (16th century), transcribed from the book’s Ex. 20-1; section and cadence labels follow the book’s diagram', ref: [20, 'Binary and Ternary Forms', 'Binary Forms (Ex. 20-1)', 'p. 336'] },
  'forms::“Twinkle, Twinkle, Little Star” (ternary)': { by: 'Traditional (the French song “Ah! vous dirai-je, maman”, 18th century)', ref: [20, 'Binary and Ternary Forms', 'Ternary Forms', 'pp. 338–339'] },
  'non-chord-tones::Beethoven: “Für Elise”': { by: 'Ludwig van Beethoven, Bagatelle in A minor, WoO 59, “Für Elise” (1810), bars 1–3; left hand reduced', ref: [11, 'Non-Chord Tones 1', 'Neighboring Tones', 'p. 178'] },
  'neapolitan::Beethoven: “Moonlight” Sonata, Op. 27 No. 2, I': { by: 'Ludwig van Beethoven, Piano Sonata No. 14 in C♯ minor, Op. 27 No. 2 (“Moonlight”, 1801), I, bars 1–5, harmonic reduction', ref: [22, 'The Neapolitan Chord', 'Conventional Use of the Neapolitan', 'pp. 372–374'] },
  'accidentals::Grieg: “In the Hall of the Mountain King”': { by: 'Edvard Grieg, <i>Peer Gynt</i>, Op. 23, “In the Hall of the Mountain King” (1875), opening theme, bars 1–2' },
  'minor-scales::Bach: Toccata in D minor, BWV 565': { by: 'Toccata and Fugue in D minor, BWV 565, traditionally attributed to J. S. Bach, opening; rhythm approximate' },
  'non-chord-tones::Mozart: Symphony No. 40 in G minor': { by: 'Wolfgang Amadeus Mozart, Symphony No. 40 in G minor, K. 550 (1788), I, opening bars, first violins' },
  'rock::Power chords': { ref: [1, 'Elements of Pitch', 'Perfect, Major, and Minor Intervals (the perfect 5th)', 'p. 20'] },
  'rock::A minor-pentatonic riff': { ref: [28, 'An Introduction to Twentieth-Century Practices', 'Scales (pentatonic)', 'p. 484'] },
  'rock::A blues-scale riff with the “blue note”': { ref: [11, 'Non-Chord Tones 1', 'Passing Tones (chromatic passing tone)', 'p. 176'] },
  'rock::Galloping pedal point': { ref: [12, 'Non-Chord Tones 2', 'The Pedal Point', 'p. 195'] },
  'rock::The tritone riff': { ref: [1, 'Elements of Pitch', 'Augmented and Diminished Intervals (the tritone)', 'p. 23'] },
  'rock::I – ♭VII – IV – I (Mixolydian)': { ref: [28, 'An Introduction to Twentieth-Century Practices', 'Scales (church modes: Mixolydian)', 'pp. 480–482'] },
  'rock::i – VII – VI – VII (Aeolian loop)': { ref: [4, 'Diatonic Chords in Major and Minor Keys', 'Diatonic Triads in Minor', 'p. 65'] },
  'rock::Descending chromatic bass under a minor chord': { ref: [3, 'Introduction to Triads and Seventh Chords', 'Inversions of Chords', 'p. 50'] },
};

const Sources = {
  formatRef([ch, chTitle, section, pages], withBook = true) {
    const where = `Ch. ${ch}, “${chTitle}”${section ? `, ${section}` : ''}, ${pages}`;
    return withBook ? `${BOOK.short}, ${where}` : where;
  },
  lesson(id) { return LESSON_SOURCES[id] || null; },
  example(lessonId, title) {
    const own = EXAMPLE_SOURCES[`${lessonId}::${title}`] || {};
    const lesson = LESSON_SOURCES[lessonId];
    return { by: own.by || APP_EXAMPLE, ref: own.ref || (lesson && lesson.refs[0]) || null };
  },
};
