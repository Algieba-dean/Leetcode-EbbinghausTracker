import { describe, it, expect, beforeEach } from 'vitest';
import { extractProblemFromPage, checkSubmissionAccepted } from '../index';

describe('Content Script In-Page Parser & Detection', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.title = '';
  });

  describe('extractProblemFromPage', () => {
    it('extracts number and title from document.title on LeetCode CN', () => {
      // Set location
      delete (window as any).location;
      window.location = new URL('https://leetcode.cn/problems/two-sum/description/') as any;

      document.title = '1. 两数之和 - 力扣（LeetCode）';
      document.body.innerHTML = `
        <div class="text-difficulty-easy">简单</div>
        <a href="/tag/hash-table/">哈希表</a>
        <a href="/tag/array/">数组</a>
      `;

      const meta = extractProblemFromPage();
      expect(meta.slug).toBe('two-sum');
      expect(meta.number).toBe('1');
      expect(meta.title).toBe('两数之和');
      expect(meta.difficulty).toBe('Easy');
      expect(meta.tags).toContain('哈希表');
      expect(meta.tags).toContain('数组');
    });

    it('extracts number and title from DOM element when document.title is incomplete', () => {
      delete (window as any).location;
      window.location = new URL('https://leetcode.cn/problems/reverse-linked-list/') as any;

      document.title = '力扣（LeetCode）';
      document.body.innerHTML = `
        <h4 data-cypress="QuestionTitle">206. 反转链表</h4>
        <div class="text-difficulty-easy">简单</div>
        <a href="/tag/linked-list/">链表</a>
      `;

      const meta = extractProblemFromPage();
      expect(meta.slug).toBe('reverse-linked-list');
      expect(meta.number).toBe('206');
      expect(meta.title).toBe('反转链表');
      expect(meta.difficulty).toBe('Easy');
      expect(meta.tags).toContain('链表');
    });

    it('falls back to capitalized slug when no title is found', () => {
      delete (window as any).location;
      window.location = new URL('https://leetcode.cn/problems/trapping-rain-water/') as any;

      document.title = '';
      document.body.innerHTML = `
        <div class="text-difficulty-hard">困难</div>
      `;

      const meta = extractProblemFromPage();
      expect(meta.slug).toBe('trapping-rain-water');
      expect(meta.title).toBe('Trapping Rain Water');
      expect(meta.difficulty).toBe('Hard');
    });
  });

  describe('checkSubmissionAccepted', () => {
    it('MUST NOT trigger on problem description text containing "通过率" or "通过次数" (false positive prevention)', () => {
      document.body.innerHTML = `
        <div class="problem-stats">
          <span>通过次数 5,821,399</span>
          <span>提交次数 10,654,120</span>
          <span>通过率 54.6%</span>
          <span>Acceptance Rate 54.6%</span>
        </div>
      `;

      expect(checkSubmissionAccepted()).toBe(false);
    });

    it('triggers when data-e2e-locator="submission-result" has exact "通过"', () => {
      document.body.innerHTML = `
        <div data-e2e-locator="submission-result">
          通过
        </div>
      `;

      expect(checkSubmissionAccepted()).toBe(true);
    });

    it('triggers when data-e2e-locator="submission-result" has exact "Accepted"', () => {
      document.body.innerHTML = `
        <div data-e2e-locator="submission-result">
          Accepted
        </div>
      `;

      expect(checkSubmissionAccepted()).toBe(true);
    });

    it('does NOT trigger when submission result is Wrong Answer or Compile Error', () => {
      document.body.innerHTML = `
        <div data-e2e-locator="submission-result">
          解答错误
        </div>
      `;

      expect(checkSubmissionAccepted()).toBe(false);
    });

    it('triggers when a green badge contains exact "通过"', () => {
      document.body.innerHTML = `
        <div class="submission-panel">
          <span class="text-green-500 font-bold">通过</span>
        </div>
      `;

      expect(checkSubmissionAccepted()).toBe(true);
    });
  });
});
