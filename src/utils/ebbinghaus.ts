import { Problem, ReviewGrade } from '../types';

export function getTodayString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return getTodayString(d);
}

export function diffDays(dateStr1: string, dateStr2: string): number {
  const d1 = new Date(dateStr1 + 'T00:00:00').getTime();
  const d2 = new Date(dateStr2 + 'T00:00:00').getTime();
  return Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
}

/**
 * SM-2 / Anki 经典四档间隔重复计算
 */
export function calculateSM2(
  problem: Problem,
  grade: ReviewGrade,
  reviewDate: string = getTodayString()
): {
  repetition: number;
  interval: number;
  easeFactor: number;
  nextReviewDate: string;
} {
  let repetition = problem.repetition;
  let interval = problem.interval || 1;
  let easeFactor = problem.easeFactor || 2.5;

  switch (grade) {
    case 1: // Again (重来)
      repetition = 0;
      interval = 1;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
      break;

    case 2: // Hard (困难)
      repetition += 1;
      interval = Math.max(1, Math.round(interval * 1.2));
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      break;

    case 3: // Good (良好)
      repetition += 1;
      if (repetition === 1) {
        interval = 1;
      } else if (repetition === 2) {
        interval = 3;
      } else {
        interval = Math.max(interval + 1, Math.round(interval * easeFactor));
      }
      break;

    case 4: // Easy (熟练)
      repetition += 1;
      if (repetition === 1) {
        interval = 2;
      } else if (repetition === 2) {
        interval = 6;
      } else {
        interval = Math.max(interval + 2, Math.round(interval * easeFactor * 1.3));
      }
      easeFactor = Math.min(3.5, easeFactor + 0.15);
      break;
  }

  const nextReviewDate = addDays(reviewDate, interval);

  return {
    repetition,
    interval,
    easeFactor: Number(easeFactor.toFixed(2)),
    nextReviewDate,
  };
}

/**
 * 预估当前题目的记忆留存率 (0 - 100%)
 * 基于 Ebbinghaus 幂律曲线模型 R = exp(-t / S)
 */
export function calculateRetentionRate(problem: Problem, currentDate: string = getTodayString()): number {
  if (!problem.lastReviewedDate) {
    return 100;
  }
  const daysElapsed = Math.max(0, diffDays(currentDate, problem.lastReviewedDate));
  if (daysElapsed === 0) return 100;

  // 记忆稳定性 S: 基于当前复习间隔与难度衰减因子
  const stability = Math.max(1, problem.interval * (problem.easeFactor / 2.5));
  const retention = Math.exp(-daysElapsed / stability);
  return Math.max(10, Math.min(100, Math.round(retention * 100)));
}

export interface GradeMeta {
  grade: ReviewGrade;
  name: string;
  sub: string;
  nextDaysText: (interval: number, ease: number, rep: number) => string;
}

export const GRADE_CONFIG: Record<ReviewGrade, GradeMeta> = {
  1: {
    grade: 1,
    name: '重来',
    sub: '完全遗忘',
    nextDaysText: () => '1天后',
  },
  2: {
    grade: 2,
    name: '困难',
    sub: '卡壳看题解',
    nextDaysText: (int) => `${Math.max(1, Math.round(int * 1.2))}天后`,
  },
  3: {
    grade: 3,
    name: '良好',
    sub: '独立AC',
    nextDaysText: (int, ease, rep) => {
      if (rep === 0) return '1天后';
      if (rep === 1) return '3天后';
      return `${Math.max(int + 1, Math.round(int * ease))}天后`;
    },
  },
  4: {
    grade: 4,
    name: '简单',
    sub: '极速秒杀',
    nextDaysText: (int, ease, rep) => {
      if (rep === 0) return '2天后';
      if (rep === 1) return '6天后';
      return `${Math.max(int + 2, Math.round(int * ease * 1.3))}天后`;
    },
  },
};
