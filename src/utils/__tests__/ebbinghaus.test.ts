import { describe, it, expect } from 'vitest';
import {
  calculateSM2,
  calculateRetentionRate,
  getTodayString,
  addDays,
  diffDays,
  DEFAULT_EBBINGHAUS_LADDER,
  GRADE_CONFIG,
} from '../ebbinghaus';
import { Problem } from '../../types';

describe('Ebbinghaus & SM-2 Core Algorithm', () => {
  const baseProblem: Problem = {
    id: 'test-1',
    number: '1',
    title: '两数之和',
    slug: 'two-sum',
    url: 'https://leetcode.cn/problems/two-sum/',
    difficulty: 'Easy',
    tags: ['哈希表'],
    createdAt: Date.now(),
    repetition: 0,
    interval: 1,
    easeFactor: 2.5,
    nextReviewDate: '2026-09-06',
    history: [],
  };

  describe('Date utilities', () => {
    it('formats date correctly in YYYY-MM-DD', () => {
      const d = new Date(2026, 8, 6); // Sep 6, 2026
      expect(getTodayString(d)).toBe('2026-09-06');
    });

    it('adds days correctly across months', () => {
      expect(addDays('2026-09-06', 4)).toBe('2026-09-10');
      expect(addDays('2026-09-28', 5)).toBe('2026-10-03');
    });

    it('calculates diff days correctly', () => {
      expect(diffDays('2026-09-10', '2026-09-06')).toBe(4);
      expect(diffDays('2026-09-06', '2026-09-10')).toBe(-4);
      expect(diffDays('2026-09-06', '2026-09-06')).toBe(0);
    });
  });

  describe('SM-2 Grade Transitions', () => {
    it('Grade 1 (Again / 完全遗忘): resets to repetition 0 and step 1 (1 day)', () => {
      const advanced: Problem = {
        ...baseProblem,
        repetition: 4, // 15 days
        interval: 15,
        easeFactor: 2.5,
      };

      const result = calculateSM2(advanced, 1, '2026-09-06');
      expect(result.repetition).toBe(0);
      expect(result.interval).toBe(1); // 1st ladder step
      expect(result.easeFactor).toBe(2.3); // lowered by 0.2
      expect(result.nextReviewDate).toBe('2026-09-07');
    });

    it('Grade 2 (Hard / 勉强写出): stays on current ladder step and consolidates', () => {
      const stage2: Problem = {
        ...baseProblem,
        repetition: 2, // 3rd step in [1, 2, 4, 7, 15, 30, 60, 120] -> 4 days
        interval: 4,
        easeFactor: 2.5,
      };

      const result = calculateSM2(stage2, 2, '2026-09-06');
      expect(result.repetition).toBe(2);
      expect(result.interval).toBe(4); // remains 4 days
      expect(result.easeFactor).toBe(2.35); // slightly lowered by 0.15
      expect(result.nextReviewDate).toBe('2026-09-10');
    });

    it('Grade 3 (Good / 稳步推进): advances +1 ladder step', () => {
      const stage1: Problem = {
        ...baseProblem,
        repetition: 1, // step 2 -> 2 days
        interval: 2,
        easeFactor: 2.5,
      };

      const result = calculateSM2(stage1, 3, '2026-09-06');
      expect(result.repetition).toBe(2); // advances to step 3 (index 2)
      expect(result.interval).toBe(4); // 4 days
      expect(result.nextReviewDate).toBe('2026-09-10');
    });

    it('Grade 4 (Easy / 秒杀跳阶): advances +2 ladder steps and increases easeFactor', () => {
      const stage0: Problem = {
        ...baseProblem,
        repetition: 0, // step 1 -> 1 day
        interval: 1,
        easeFactor: 2.5,
      };

      const result = calculateSM2(stage0, 4, '2026-09-06');
      expect(result.repetition).toBe(2); // skips from index 0 to 2
      expect(result.interval).toBe(4); // 4 days
      expect(result.easeFactor).toBe(2.65); // increased by 0.15
      expect(result.nextReviewDate).toBe('2026-09-10');
    });

    it('supports custom ladder configuration', () => {
      const customLadder = [1, 3, 7, 14, 30];
      const result = calculateSM2(baseProblem, 3, '2026-09-06', customLadder);
      expect(result.repetition).toBe(1);
      expect(result.interval).toBe(3); // 2nd step in custom ladder
      expect(result.nextReviewDate).toBe('2026-09-09');
    });

    it('handles progression beyond maximum ladder step using compound ease multiplier', () => {
      const maxStage: Problem = {
        ...baseProblem,
        repetition: 7, // index 7 is 120 days (last step)
        interval: 120,
        easeFactor: 2.5,
      };

      const result = calculateSM2(maxStage, 3, '2026-09-06');
      expect(result.repetition).toBe(8);
      // Beyond ladder: max(120 + 15, round(120 * 2.5)) = 300 days
      expect(result.interval).toBe(300);
    });
  });

  describe('Retention Rate Simulation', () => {
    it('returns 100% when reviewed today', () => {
      const p: Problem = {
        ...baseProblem,
        lastReviewedDate: '2026-09-06',
        interval: 4,
      };
      expect(calculateRetentionRate(p, '2026-09-06')).toBe(100);
    });

    it('returns 100% when not reviewed yet', () => {
      const p: Problem = {
        ...baseProblem,
        lastReviewedDate: undefined,
      };
      expect(calculateRetentionRate(p, '2026-09-06')).toBe(100);
    });

    it('exponentially decays as days pass', () => {
      const p: Problem = {
        ...baseProblem,
        lastReviewedDate: '2026-09-01', // 5 days ago
        interval: 4,
        easeFactor: 2.5,
      };

      const rate5Days = calculateRetentionRate(p, '2026-09-06');
      const rate10Days = calculateRetentionRate(p, '2026-09-11');

      expect(rate5Days).toBeLessThan(100);
      expect(rate10Days).toBeLessThan(rate5Days);
      expect(rate10Days).toBeGreaterThanOrEqual(10); // clamped floor at 10%
    });
  });

  describe('GRADE_CONFIG metadata', () => {
    it('provides correct next days preview text across grades', () => {
      const ladder = DEFAULT_EBBINGHAUS_LADDER;
      // repetition: 1 (2d), interval: 2
      expect(GRADE_CONFIG[1].getNextDays(1, 2, ladder)).toBe('1天后');
      expect(GRADE_CONFIG[2].getNextDays(1, 2, ladder)).toBe('2天后');
      expect(GRADE_CONFIG[3].getNextDays(1, 2, ladder)).toBe('4天后');
      expect(GRADE_CONFIG[4].getNextDays(1, 2, ladder)).toBe('7天后');
    });
  });
});
