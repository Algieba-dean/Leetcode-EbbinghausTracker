import { Problem, ReviewGrade } from '../types';

export const DEFAULT_EBBINGHAUS_LADDER = [1, 2, 4, 7, 15, 30, 60, 120];

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
 * 经典艾宾浩斯阶梯 + SM-2 智能跃迁调度
 * 阶梯默认为：1天 -> 2天 -> 4天 -> 7天 -> 15天 -> 30天 -> 60天 -> 120天
 */
export function calculateSM2(
  problem: Problem,
  grade: ReviewGrade,
  reviewDate: string = getTodayString(),
  ladder: number[] = DEFAULT_EBBINGHAUS_LADDER
): {
  repetition: number;
  interval: number;
  easeFactor: number;
  nextReviewDate: string;
} {
  let rep = problem.repetition ?? 0;
  let ease = problem.easeFactor || 2.5;
  let nextInterval: number;

  switch (grade) {
    case 1: // Again (重来 · 完全遗忘)
      rep = 0;
      nextInterval = ladder[0] || 1;
      ease = Math.max(1.3, ease - 0.2);
      break;

    case 2: // Hard (困难 · 勉强做出)
      // 保持在当前阶梯，巩固当前周期
      nextInterval = ladder[Math.min(rep, ladder.length - 1)] || 1;
      ease = Math.max(1.3, ease - 0.15);
      break;

    case 3: // Good (良好 · 稳步推进)
      // 递增一阶
      rep = rep + 1;
      if (rep < ladder.length) {
        nextInterval = ladder[rep];
      } else {
        // 超出阶梯后按复利倍增
        const last = ladder[ladder.length - 1];
        nextInterval = Math.max(last + 15, Math.round(problem.interval * ease));
      }
      break;

    case 4: // Easy (熟练 · 跳级秒杀)
      // 跳跃两阶！
      rep = rep + 2;
      if (rep < ladder.length) {
        nextInterval = ladder[rep];
      } else {
        const last = ladder[ladder.length - 1];
        nextInterval = Math.max(last + 30, Math.round(problem.interval * ease * 1.3));
      }
      ease = Math.min(3.5, ease + 0.15);
      break;
  }

  const nextReviewDate = addDays(reviewDate, nextInterval);

  return {
    repetition: rep,
    interval: nextInterval,
    easeFactor: Number(ease.toFixed(2)),
    nextReviewDate,
  };
}

/**
 * 预估当前题目的记忆留存率 (0 - 100%)
 */
export function calculateRetentionRate(problem: Problem, currentDate: string = getTodayString()): number {
  if (!problem.lastReviewedDate) {
    return 100;
  }
  const daysElapsed = Math.max(0, diffDays(currentDate, problem.lastReviewedDate));
  if (daysElapsed === 0) return 100;

  const stability = Math.max(1, problem.interval * (problem.easeFactor / 2.5));
  const retention = Math.exp(-daysElapsed / stability);
  return Math.max(10, Math.min(100, Math.round(retention * 100)));
}

export interface GradeMeta {
  grade: ReviewGrade;
  name: string;
  sub: string;
  getNextDays: (rep: number, interval: number, ladder?: number[]) => string;
}

export const GRADE_CONFIG: Record<ReviewGrade, GradeMeta> = {
  1: {
    grade: 1,
    name: '重来',
    sub: '完全卡壳',
    getNextDays: (_rep, _int, ladder = DEFAULT_EBBINGHAUS_LADDER) => `${ladder[0] || 1}天后`,
  },
  2: {
    grade: 2,
    name: '困难',
    sub: '勉强写出',
    getNextDays: (rep, _int, ladder = DEFAULT_EBBINGHAUS_LADDER) => {
      const days = ladder[Math.min(rep, ladder.length - 1)] || 1;
      return `${days}天后`;
    },
  },
  3: {
    grade: 3,
    name: '良好',
    sub: '独立AC',
    getNextDays: (rep, int, ladder = DEFAULT_EBBINGHAUS_LADDER) => {
      const nextIdx = rep + 1;
      if (nextIdx < ladder.length) {
        return `${ladder[nextIdx]}天后`;
      }
      return `${Math.round(int * 2.5)}天后`;
    },
  },
  4: {
    grade: 4,
    name: '简单',
    sub: '秒杀跳阶',
    getNextDays: (rep, int, ladder = DEFAULT_EBBINGHAUS_LADDER) => {
      const nextIdx = rep + 2;
      if (nextIdx < ladder.length) {
        return `${ladder[nextIdx]}天后`;
      }
      return `${Math.round(int * 3.2)}天后`;
    },
  },
};
