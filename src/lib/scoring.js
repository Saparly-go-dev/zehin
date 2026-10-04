import { CATEGORIES } from '../data/categories.js';

export const BASE_IQ = 70;
export const POINTS_PER_ANSWER = 3;

export const iqFromCorrect = (correct) => BASE_IQ + correct * POINTS_PER_ANSWER;

/**
 * @param {import('../data/questions.js').Question[]} questions
 * @param {(number|null)[]} answers
 */
export function calculate(questions, answers) {
  const isCorrect = (q, i) => answers[i] === q.key;
  const correct = questions.filter(isCorrect).length;

  const byCategory = CATEGORIES.map(({ id }) => {
    const items = questions.map((q, i) => [q, i]).filter(([q]) => q.cat === id);
    return { total: items.length, correct: items.filter(([q, i]) => isCorrect(q, i)).length };
  });

  return { correct, total: questions.length, iq: iqFromCorrect(correct), byCategory };
}

export function verdict(correct) {
  if (correct >= 16) return {
    label: 'Ajaýyp synanyşyk',
    description: 'Soraglaryň köpüsini dogry çözdüňiz. Bu synagda kanunalaýyklyklary we baglanyşyklary gowy tapdyňyz.',
  };
  if (correct >= 10) return {
    label: 'Gowy synanyşyk',
    description: 'Birnäçe ugurda dogry çözgüt tapdyňyz. Yzygiderli maşk etmek täze çözgüt usullaryny öwrenmäge kömek eder.',
  };
  return {
    label: 'Maşk etmäge mümkinçilik',
    description: 'Bu netije diňe şu soraglara beren jogaplaryňyzy görkezýär. Arkaýyn pikirlenip, ýene bir gezek synanyşyp bilersiňiz.',
  };
}
