import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { extractSlugFromUrl, fetchLeetCodeMeta } from '../leetcodeApi';

describe('LeetCode API & URL Parsing', () => {
  describe('extractSlugFromUrl', () => {
    it('extracts slug from standard LeetCode CN problem URL', () => {
      expect(extractSlugFromUrl('https://leetcode.cn/problems/two-sum/')).toBe('two-sum');
    });

    it('extracts slug from URL with description query params', () => {
      const url = 'https://leetcode.cn/problems/two-sum/description/?envType=study-plan-v2&envId=top-100-liked';
      expect(extractSlugFromUrl(url)).toBe('two-sum');
    });

    it('extracts slug from LeetCode US solutions URL', () => {
      const url = 'https://leetcode.com/problems/reverse-linked-list/solutions/999/';
      expect(extractSlugFromUrl(url)).toBe('reverse-linked-list');
    });

    it('extracts slug from relative pathname', () => {
      expect(extractSlugFromUrl('/problems/3sum/description/')).toBe('3sum');
    });

    it('recognizes direct slug string', () => {
      expect(extractSlugFromUrl('trapping-rain-water')).toBe('trapping-rain-water');
    });

    it('returns null for purely numeric problem numbers (allows fallback to search)', () => {
      expect(extractSlugFromUrl('206')).toBeNull();
      expect(extractSlugFromUrl('1')).toBeNull();
    });

    it('returns null for Chinese keywords', () => {
      expect(extractSlugFromUrl('反转链表')).toBeNull();
    });
  });

  describe('fetchLeetCodeMeta', () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
      vi.restoreAllMocks();
    });

    afterEach(() => {
      global.fetch = originalFetch;
    });

    it('returns null for empty input', async () => {
      expect(await fetchLeetCodeMeta('')).toBeNull();
      expect(await fetchLeetCodeMeta('   ')).toBeNull();
    });

    it('fetches metadata directly by slug when URL is provided', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        json: async () => ({
          data: {
            question: {
              questionFrontendId: '206',
              translatedTitle: '反转链表',
              title: 'Reverse Linked List',
              difficulty: 'Easy',
              topicTags: [
                { name: 'Linked List', translatedName: '链表' },
                { name: 'Recursion', translatedName: '递归' },
              ],
            },
          },
        }),
      } as any);

      const result = await fetchLeetCodeMeta('https://leetcode.cn/problems/reverse-linked-list/');
      expect(result).not.toBeNull();
      expect(result?.number).toBe('206');
      expect(result?.title).toBe('反转链表');
      expect(result?.slug).toBe('reverse-linked-list');
      expect(result?.difficulty).toBe('Easy');
      expect(result?.tags).toEqual(['链表', '递归']);
    });

    it('falls back to searchKeywords when input is a problem number', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        json: async () => ({
          data: {
            problemsetQuestionList: {
              questions: [
                {
                  frontendQuestionId: '1',
                  title: 'Two Sum',
                  titleCn: '两数之和',
                  titleSlug: 'two-sum',
                  difficulty: 'EASY',
                  topicTags: [{ name: '哈希表' }, { name: '数组' }],
                },
              ],
            },
          },
        }),
      } as any);

      const result = await fetchLeetCodeMeta('1');
      expect(result).not.toBeNull();
      expect(result?.number).toBe('1');
      expect(result?.title).toBe('两数之和');
      expect(result?.slug).toBe('two-sum');
      expect(result?.difficulty).toBe('Easy');
      expect(result?.tags).toEqual(['哈希表', '数组']);
    });

    it('returns null gracefully on network or JSON parsing error', async () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      vi.spyOn(console, 'error').mockImplementation(() => {});
      global.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));
      const result = await fetchLeetCodeMeta('non-existent-problem');
      expect(result).toBeNull();
    });
  });
});
