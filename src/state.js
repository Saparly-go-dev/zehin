import { QUESTIONS } from './data/questions.js';

export const TEST_DURATION_MS = 15 * 60 * 1000;
export const URGENT_THRESHOLD_MS = 2 * 60 * 1000;

/** Single source of truth for the test session. */
export const state = {
  /** @type {'home' | 'test' | 'result'} */
  mode: 'home',
  /** @type {(number|null)[]} */
  answers: [],
  index: 0,
  startedAt: 0,
  deadline: 0,
  finishedAt: 0,
  timedOut: false,
};

export function resetSession() {
  const now = Date.now();
  Object.assign(state, {
    mode: 'test',
    answers: Array(QUESTIONS.length).fill(null),
    index: 0,
    startedAt: now,
    deadline: now + TEST_DURATION_MS,
    finishedAt: 0,
    timedOut: false,
  });
}

export const timeLeft = () => state.deadline - Date.now();
export const answeredCount = () => state.answers.filter((a) => a !== null).length;
export const unansweredCount = () => state.answers.length - answeredCount();
