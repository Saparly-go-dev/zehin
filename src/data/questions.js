/**
 * @typedef {Object} Question
 * @property {number} cat       Category id (see categories.js)
 * @property {string} q         Question text
 * @property {string} [visual]  Number/shape sequence shown in mono font
 * @property {string[]} [figure] Rows of a figure grid
 * @property {string[]} a       Four answer options
 * @property {number} key       Index of the correct answer
 */

/** @type {Question[]} */
export const QUESTIONS = [
  { cat: 3, q: 'Yzygiderlilikde indiki san haýsy?', visual: '2 · 4 · 8 · 16 · ?', a: ['24', '28', '32', '36'], key: 2 },
  { cat: 0, q: 'Ähli bägüller güldür. Ähli güller ösümlikdir. Haýsy netije hökman dogry?', a: ['Ähli ösümlikler bägüldir', 'Ähli bägüller ösümlikdir', 'Hiç bir gül ösümlik däl', 'Ähli güller bägüldir'], key: 1 },
  { cat: 1, q: '3 depder 18 manat bolsa, şol bahadan 5 depder näçe manat bolar?', a: ['24', '28', '30', '36'], key: 2 },
  { cat: 2, q: 'Ok her ädimde sagat diliniň ugruna 90° öwrülýär. Indiki ugur haýsy?', visual: '↑  →  ↓  ?', a: ['↑', '→', '↓', '←'], key: 3 },
  { cat: 3, q: 'Boş ýere haýsy san gelmeli?', visual: '3 · 6 · 11 · 18 · ?', a: ['25', '27', '29', '30'], key: 1 },
  { cat: 0, q: 'Aýna Merdandan uzyn. Merdan Selbiden uzyn. Iň gysga boýly kim?', a: ['Aýna', 'Merdan', 'Selbi', 'Kesgitläp bolmaýar'], key: 2 },
  { cat: 1, q: '80 sanynyň 25 göterimi näçe?', a: ['15', '20', '25', '40'], key: 1 },
  { cat: 2, q: 'Şekilleriň yzygiderliliginde indiki şekil haýsy?', visual: '○  △  □  ○  △  ?', a: ['○', '◇', '△', '□'], key: 3 },
  { cat: 3, q: 'Yzygiderlilikde indiki san haýsy?', visual: '1 · 1 · 2 · 3 · 5 · 8 · ?', a: ['10', '11', '13', '15'], key: 2 },
  { cat: 0, q: 'Ähli ussalar sabyrly. Käbir ussalar talyp. Haýsy netije hökman dogry?', a: ['Ähli talyplar ussa', 'Käbir talyplar sabyrly', 'Hiç bir talyp sabyrly däl', 'Ähli sabyrly adamlar talyp'], key: 1 },
  { cat: 1, q: 'Bir san 3-e köpeldilip, üstüne 6 goşulanda 27 bolýar. Ol san näçe?', a: ['6', '7', '8', '9'], key: 1 },
  { cat: 2, q: 'Her hatarda şekiller çepe bir orun süýşýär. Soňky boş ýere näme gelmeli?', figure: ['○ △ □', '△ □ ○', '□ ○ ?'], a: ['□', '○', '△', '◇'], key: 2 },
  { cat: 3, q: 'Yzygiderlilikde indiki san haýsy?', visual: '81 · 27 · 9 · 3 · ?', a: ['0', '1', '2', '6'], key: 1 },
  { cat: 0, q: '«Eger ýagyş ýagsa, ýol çygly bolýar» diýlen şert dogry. Ýol çygly däl. Haýsy netije dogry?', a: ['Ýagyş ýagdy', 'Ýagyş ýagmady', 'Ýol hökman buzly', 'Şertden netije çykaryp bolmaýar'], key: 1 },
  { cat: 1, q: '5 enjam 5 minutda 5 önüm öndürýär. Şol tizlikde 10 enjam 10 önümi näçe minutda öndürer?', a: ['5 minut', '10 minut', '15 minut', '20 minut'], key: 0 },
  { cat: 2, q: 'Nokatlaryň sany her ädimde bir artýar. Boş ýeri dolduryň.', figure: ['●   ●●   ●●●   ?'], a: ['●●', '●●●', '●●●●', '●●●●●'], key: 2 },
  { cat: 3, q: 'Yzygiderlilikde indiki san haýsy?', visual: '2 · 6 · 12 · 20 · 30 · ?', a: ['36', '40', '42', '48'], key: 2 },
  { cat: 0, q: 'Üç gutynyň diňe birinde sowgat bar. Sowgat birinji gutuda däl we üçünji gutuda däl. Sowgat nirede?', a: ['Birinji gutuda', 'Ikinji gutuda', 'Üçünji gutuda', 'Ähli gutularda'], key: 1 },
  { cat: 1, q: 'Torbada 3 gyzyl we 2 gök top bar. Tötänleýin alnan bir topuň gök bolmak ähtimallygy näçe?', a: ['1/5', '2/5', '3/5', '1/2'], key: 1 },
  { cat: 2, q: 'Her setirde gara tegelekleriň sany 1, 2, 3 bolup artýar. Soňky öýjük haýsy?', figure: ['●   ●●   ●●●', '●   ●●   ?'], a: ['●', '●●', '●●●', '●●●●'], key: 2 },
];
