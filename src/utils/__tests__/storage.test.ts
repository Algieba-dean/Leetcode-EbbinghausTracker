import { describe, it, expect, beforeEach } from 'vitest';
import {
  getProblems,
  saveProblem,
  deleteProblem,
  clearSampleProblems,
  clearAllProblems,
  isSampleProblem,
  computeDailySummary,
  INITIAL_SAMPLE_PROBLEMS,
} from '../storage';
import { Problem } from '../../types';

describe('Storage & Problem Lifecycle Management', () => {
  let mockStorage: Record<string, any> = {};

  beforeEach(() => {
    mockStorage = {};
    // Mock chrome.storage.local
    (global as any).chrome = {
      storage: {
        local: {
          get: (keys: string[], callback: (res: Record<string, any>) => void) => {
            const result: Record<string, any> = {};
            for (const k of keys) {
              if (k in mockStorage) {
                result[k] = mockStorage[k];
              }
            }
            callback(result);
          },
          set: (items: Record<string, any>, callback?: () => void) => {
            Object.assign(mockStorage, items);
            callback?.();
          },
          clear: (callback?: () => void) => {
            mockStorage = {};
            callback?.();
          },
        },
      },
      runtime: {
        sendMessage: (_msg: any, callback?: () => void) => {
          callback?.();
        },
        lastError: null,
      },
    };
  });

  describe('isSampleProblem', () => {
    it('identifies modern sample problem with isSample: true', () => {
      const p: Problem = {
        id: 'user-custom-sample',
        number: '999',
        title: 'Custom Sample',
        slug: 'custom-sample',
        url: 'https://leetcode.cn',
        difficulty: 'Easy',
        tags: [],
        createdAt: Date.now(),
        repetition: 0,
        interval: 1,
        easeFactor: 2.5,
        nextReviewDate: '2026-09-06',
        isSample: true,
        history: [],
      };
      expect(isSampleProblem(p)).toBe(true);
    });

    it('identifies preset sample problems by ID even if isSample is undefined (legacy data)', () => {
      for (const sample of INITIAL_SAMPLE_PROBLEMS) {
        const legacy: Problem = {
          ...sample,
          isSample: undefined,
        };
        expect(isSampleProblem(legacy)).toBe(true);
      }
    });

    it('identifies preset sample problems by notes fingerprint', () => {
      const p: Problem = {
        id: 'some-random-id',
        number: '206',
        title: '反转链表',
        slug: 'reverse-linked-list',
        url: 'https://leetcode.cn',
        difficulty: 'Easy',
        tags: [],
        notes: '注意双指针迭代法中的 prev 初始化为 null，curr 指向 head。临时保存 curr.next。',
        createdAt: Date.now(),
        repetition: 0,
        interval: 1,
        easeFactor: 2.5,
        nextReviewDate: '2026-09-06',
        history: [],
      };
      expect(isSampleProblem(p)).toBe(true);
    });

    it('returns false for authentic user added problems', () => {
      const userProblem: Problem = {
        id: 'lc-100-myproblem',
        number: '100',
        title: '相同的树',
        slug: 'same-tree',
        url: 'https://leetcode.cn/problems/same-tree/',
        difficulty: 'Easy',
        tags: ['树', '深度优先搜索'],
        notes: '递归遍历左右子树，base case 判断两节点是否都为 null。',
        createdAt: Date.now(),
        repetition: 0,
        interval: 1,
        easeFactor: 2.5,
        nextReviewDate: '2026-09-06',
        isSample: false,
        history: [],
      };
      expect(isSampleProblem(userProblem)).toBe(false);
    });
  });

  describe('getProblems & Initialization', () => {
    it('seeds INITIAL_SAMPLE_PROBLEMS on true first cold launch', async () => {
      const list = await getProblems();
      expect(list.length).toBe(INITIAL_SAMPLE_PROBLEMS.length);
      expect(mockStorage['lc_ebbinghaus_initialized']).toBe(true);
    });

    it('NEVER resurrects sample problems if user cleared the library to 0 items', async () => {
      // First cold launch
      await getProblems();

      // User clears all problems
      await clearAllProblems();
      expect(mockStorage['lc_ebbinghaus_problems']).toEqual([]);

      // Second launch / re-reading storage
      const refreshed = await getProblems();
      expect(refreshed).toEqual([]); // Must remain empty!
    });
  });

  describe('Problem Deletion & Clear operations', () => {
    it('clearSampleProblems removes only sample problems and preserves user problems', async () => {
      const userProblem: Problem = {
        id: 'user-p1',
        number: '53',
        title: '最大子数组和',
        slug: 'maximum-subarray',
        url: 'https://leetcode.cn/problems/maximum-subarray/',
        difficulty: 'Medium',
        tags: ['数组', '动态规划'],
        createdAt: Date.now(),
        repetition: 1,
        interval: 2,
        easeFactor: 2.5,
        nextReviewDate: '2026-09-08',
        isSample: false,
        history: [],
      };

      // Seed with initial problems + 1 user problem
      await saveProblem(userProblem);

      const count = await clearSampleProblems();
      expect(count).toBe(INITIAL_SAMPLE_PROBLEMS.length);

      const remaining = await getProblems();
      expect(remaining.length).toBe(1);
      expect(remaining[0].id).toBe('user-p1');
    });

    it('deleteProblem deletes a specific problem by id', async () => {
      await getProblems(); // seed initial
      const initial = await getProblems();
      const targetId = initial[0].id;

      await deleteProblem(targetId);

      const updated = await getProblems();
      expect(updated.find((p) => p.id === targetId)).toBeUndefined();
      expect(updated.length).toBe(initial.length - 1);
    });
  });

  describe('computeDailySummary', () => {
    it('calculates daily progress, overdue count, and retention rate correctly', () => {
      const today = '2026-09-06';
      const testList: Problem[] = [
        {
          id: 'p-due-1',
          number: '1',
          title: '两数之和',
          slug: 'two-sum',
          url: '',
          difficulty: 'Easy',
          tags: [],
          createdAt: Date.now(),
          repetition: 0,
          interval: 1,
          easeFactor: 2.5,
          nextReviewDate: '2026-09-06', // due today
          history: [],
        },
        {
          id: 'p-overdue-1',
          number: '2',
          title: '两数相加',
          slug: 'add-two-numbers',
          url: '',
          difficulty: 'Medium',
          tags: [],
          createdAt: Date.now(),
          repetition: 1,
          interval: 2,
          easeFactor: 2.5,
          nextReviewDate: '2026-09-04', // overdue 2 days
          history: [],
        },
        {
          id: 'p-done-today',
          number: '3',
          title: '无重复字符的最长子串',
          slug: 'longest-substring',
          url: '',
          difficulty: 'Medium',
          tags: [],
          createdAt: Date.now(),
          repetition: 2,
          interval: 4,
          easeFactor: 2.5,
          nextReviewDate: '2026-09-10',
          lastReviewedDate: today, // reviewed today
          history: [],
        },
      ];

      const summary = computeDailySummary(testList);
      expect(summary.totalDue).toBe(2); // p-due-1 + p-overdue-1
      expect(summary.completedToday).toBe(1); // p-done-today
      expect(summary.overdueCount).toBe(1); // p-overdue-1
      expect(summary.totalTracked).toBe(3);
      expect(summary.retentionRate).toBeGreaterThan(0);
    });
  });
});
