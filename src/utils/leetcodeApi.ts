import { Difficulty } from '../types';

export interface FetchedProblemMeta {
  number: string;
  title: string;
  slug: string;
  url: string;
  difficulty: Difficulty;
  tags: string[];
}

export function extractSlugFromUrl(urlOrText: string): string | null {
  const match = urlOrText.match(/\/problems\/([^/?#]+)/);
  if (match) return match[1];
  // If it's pure slug like 'two-sum'
  if (/^[a-z0-9-]+$/.test(urlOrText.trim()) && isNaN(Number(urlOrText.trim()))) {
    return urlOrText.trim();
  }
  return null;
}

/**
 * 通过力扣官方 GraphQL 接口全自动解析题目元数据
 * 支持：
 * 1. 完整力扣链接 (https://leetcode.cn/problems/two-sum/ 或 leetcode.com)
 * 2. 题号 (例如 1, 206, 42)
 * 3. 题目英文别名 slug (例如 two-sum, reverse-linked-list)
 * 4. 题目中文名关键词 (例如 反转链表, 接雨水)
 */
export async function fetchLeetCodeMeta(keywordOrUrl: string): Promise<FetchedProblemMeta | null> {
  const input = keywordOrUrl.trim();
  if (!input) return null;

  const slug = extractSlugFromUrl(input);

  // If we have a direct slug, query by slug first for exact data
  if (slug) {
    try {
      const res = await fetch('https://leetcode.cn/graphql/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query questionData($titleSlug: String!) {
              question(titleSlug: $titleSlug) {
                questionFrontendId
                translatedTitle
                title
                difficulty
                topicTags {
                  name
                  translatedName
                }
              }
            }
          `,
          variables: { titleSlug: slug },
        }),
      });

      const json = await res.json();
      const q = json?.data?.question;
      if (q) {
        const diffMap: Record<string, Difficulty> = {
          Easy: 'Easy',
          Medium: 'Medium',
          Hard: 'Hard',
          EASY: 'Easy',
          MEDIUM: 'Medium',
          HARD: 'Hard',
        };

        const tags: string[] = (q.topicTags || []).map(
          (t: any) => t.translatedName || t.name
        );

        return {
          number: q.questionFrontendId || '0',
          title: q.translatedTitle || q.title || slug,
          slug,
          url: `https://leetcode.cn/problems/${slug}/`,
          difficulty: diffMap[q.difficulty] || 'Medium',
          tags: tags.length > 0 ? tags : ['算法'],
        };
      }
    } catch (err) {
      console.warn('Failed to query questionData by slug, falling back to search:', err);
    }
  }

  // Fallback: search by keyword or number (e.g. "206" or "反转链表")
  try {
    const res = await fetch('https://leetcode.cn/graphql/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
            problemsetQuestionList(categorySlug: $categorySlug, limit: $limit, skip: $skip, filters: $filters) {
              questions {
                frontendQuestionId
                title
                titleCn
                titleSlug
                difficulty
                topicTags {
                  name
                  id
                }
              }
            }
          }
        `,
        variables: {
          categorySlug: '',
          skip: 0,
          limit: 1,
          filters: { searchKeywords: input },
        },
      }),
    });

    const json = await res.json();
    const qList = json?.data?.problemsetQuestionList?.questions;
    if (qList && qList.length > 0) {
      const q = qList[0];
      const diffMap: Record<string, Difficulty> = {
        EASY: 'Easy',
        MEDIUM: 'Medium',
        HARD: 'Hard',
        Easy: 'Easy',
        Medium: 'Medium',
        Hard: 'Hard',
      };

      const tags: string[] = (q.topicTags || []).map((t: any) => t.name);

      return {
        number: q.frontendQuestionId || '0',
        title: q.titleCn || q.title || q.titleSlug,
        slug: q.titleSlug,
        url: `https://leetcode.cn/problems/${q.titleSlug}/`,
        difficulty: diffMap[q.difficulty] || 'Medium',
        tags: tags.length > 0 ? tags : ['算法'],
      };
    }
  } catch (err) {
    console.error('Failed to search LeetCode problem:', err);
  }

  return null;
}
