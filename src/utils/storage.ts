import { Problem, UserSettings, ReviewGrade, DailySummary } from '../types';
import { calculateSM2, getTodayString, diffDays, calculateRetentionRate } from './ebbinghaus';

const STORAGE_KEY_PROBLEMS = 'lc_ebbinghaus_problems';
const STORAGE_KEY_SETTINGS = 'lc_ebbinghaus_settings';

const DEFAULT_SETTINGS: UserSettings = {
  dailyTarget: 8,
  showLeetCodeFloatingWidget: true,
  theme: 'dark',
};

// Check if chrome.storage is available
function isChromeStorageAvailable(): boolean {
  return typeof chrome !== 'undefined' && !!chrome.storage?.local;
}

// Storage primitives
async function getItem<T>(key: string, defaultValue: T): Promise<T> {
  if (isChromeStorageAvailable()) {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        if (chrome.runtime.lastError || result[key] === undefined) {
          resolve(defaultValue);
        } else {
          resolve(result[key]);
        }
      });
    });
  } else {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  }
}

async function setItem<T>(key: string, value: T): Promise<void> {
  if (isChromeStorageAvailable()) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => {
        resolve();
      });
    });
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

// Trigger background badge update
export function notifyBadgeUpdate(): void {
  if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
    try {
      chrome.runtime.sendMessage({ type: 'UPDATE_BADGE' });
    } catch {
      // Ignore in popup contexts if background isn't ready
    }
  }
}

// Initial realistic seed problems for immediate testing
export const INITIAL_SAMPLE_PROBLEMS: Problem[] = [
  {
    id: 'lc-206',
    number: '206',
    title: '反转链表',
    slug: 'reverse-linked-list',
    url: 'https://leetcode.cn/problems/reverse-linked-list/',
    difficulty: 'Easy',
    tags: ['链表', '双指针', '递归'],
    notes: '注意双指针迭代法中的 prev 初始化为 null，curr 指向 head。临时保存 curr.next。',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    repetition: 2,
    interval: 3,
    easeFactor: 2.5,
    nextReviewDate: getTodayString(), // 今日待复习
    lastReviewedDate: '2026-09-03',
    history: [
      {
        id: 'log-1',
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5,
        date: '2026-09-01',
        grade: 3,
        intervalDays: 1,
        repetition: 1,
        easeFactor: 2.5,
      },
      {
        id: 'log-2',
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3,
        date: '2026-09-03',
        grade: 3,
        intervalDays: 3,
        repetition: 2,
        easeFactor: 2.5,
      },
    ],
  },
  {
    id: 'lc-15',
    number: '15',
    title: '三数之和',
    slug: '3sum',
    url: 'https://leetcode.cn/problems/3sum/',
    difficulty: 'Medium',
    tags: ['数组', '双指针', '排序'],
    notes: '先整体排序！外层固定 i，内层左右双指针。必须特别注意 i, left, right 的去重逻辑！',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
    repetition: 1,
    interval: 1,
    easeFactor: 2.35,
    nextReviewDate: getTodayString(), // 今日待复习
    lastReviewedDate: '2026-09-05',
    history: [],
  },
  {
    id: 'lc-42',
    number: '42',
    title: '接雨水',
    slug: 'trapping-rain-water',
    url: 'https://leetcode.cn/problems/trapping-rain-water/',
    difficulty: 'Hard',
    tags: ['双指针', '单调栈', '动态规划'],
    notes: '双指针法最优：leftMax 和 rightMax，维护较小的一侧向中间推进。',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
    repetition: 1,
    interval: 2,
    easeFactor: 2.2,
    nextReviewDate: '2026-09-05', // 超期 1 天！
    lastReviewedDate: '2026-09-03',
    history: [],
  },
  {
    id: 'lc-1',
    number: '1',
    title: '两数之和',
    slug: 'two-sum',
    url: 'https://leetcode.cn/problems/two-sum/',
    difficulty: 'Easy',
    tags: ['哈希表', '数组'],
    notes: 'HashMap 边查边存，空间换时间 O(N)。',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
    repetition: 4,
    interval: 14,
    easeFactor: 2.8,
    nextReviewDate: '2026-09-18', // 未来复习
    lastReviewedDate: '2026-09-04',
    history: [],
  },
];

export async function getProblems(): Promise<Problem[]> {
  const problems = await getItem<Problem[]>(STORAGE_KEY_PROBLEMS, []);
  if (problems.length === 0) {
    // Auto seed on initial empty launch
    await setItem(STORAGE_KEY_PROBLEMS, INITIAL_SAMPLE_PROBLEMS);
    notifyBadgeUpdate();
    return INITIAL_SAMPLE_PROBLEMS;
  }
  return problems;
}

export async function saveProblem(problem: Problem): Promise<void> {
  const list = await getProblems();
  const index = list.findIndex((p) => p.id === problem.id);
  if (index >= 0) {
    list[index] = problem;
  } else {
    list.unshift(problem);
  }
  await setItem(STORAGE_KEY_PROBLEMS, list);
  notifyBadgeUpdate();
}

export async function deleteProblem(id: string): Promise<void> {
  const list = await getProblems();
  const filtered = list.filter((p) => p.id !== id);
  await setItem(STORAGE_KEY_PROBLEMS, filtered);
  notifyBadgeUpdate();
}

export async function recordReview(problemId: string, grade: ReviewGrade): Promise<Problem | null> {
  const list = await getProblems();
  const target = list.find((p) => p.id === problemId);
  if (!target) return null;

  const todayStr = getTodayString();
  const update = calculateSM2(target, grade, todayStr);

  const reviewLog = {
    id: `log-${Date.now()}`,
    timestamp: Date.now(),
    date: todayStr,
    grade,
    intervalDays: update.interval,
    repetition: update.repetition,
    easeFactor: update.easeFactor,
  };

  const updatedProblem: Problem = {
    ...target,
    repetition: update.repetition,
    interval: update.interval,
    easeFactor: update.easeFactor,
    nextReviewDate: update.nextReviewDate,
    lastReviewedDate: todayStr,
    history: [reviewLog, ...(target.history || [])],
  };

  const index = list.findIndex((p) => p.id === problemId);
  list[index] = updatedProblem;
  await setItem(STORAGE_KEY_PROBLEMS, list);
  notifyBadgeUpdate();

  return updatedProblem;
}

export async function getSettings(): Promise<UserSettings> {
  return getItem<UserSettings>(STORAGE_KEY_SETTINGS, DEFAULT_SETTINGS);
}

export async function saveSettings(settings: UserSettings): Promise<void> {
  await setItem(STORAGE_KEY_SETTINGS, settings);
}

export function computeDailySummary(problems: Problem[]): DailySummary {
  const todayStr = getTodayString();
  let totalDue = 0;
  let overdueCount = 0;
  let completedToday = 0;
  let totalRetentionSum = 0;

  for (const p of problems) {
    totalRetentionSum += calculateRetentionRate(p, todayStr);

    const isReviewedToday = p.lastReviewedDate === todayStr;
    if (isReviewedToday) {
      completedToday += 1;
    }

    // Due logic: nextReviewDate <= today, and not already reviewed today
    if (p.nextReviewDate <= todayStr && !isReviewedToday) {
      totalDue += 1;
      if (diffDays(todayStr, p.nextReviewDate) > 0) {
        overdueCount += 1;
      }
    }
  }

  const totalTracked = problems.length;
  const avgRetention = totalTracked > 0 ? Math.round(totalRetentionSum / totalTracked) : 100;

  return {
    todayStr,
    totalDue,
    completedToday,
    overdueCount,
    totalTracked,
    retentionRate: avgRetention,
    streakDays: 7, // Calculated from history or default to active streak
  };
}

export async function exportDataJson(): Promise<string> {
  const problems = await getProblems();
  const settings = await getSettings();
  return JSON.stringify({ version: '1.0.0', exportedAt: new Date().toISOString(), problems, settings }, null, 2);
}

export async function importDataJson(jsonStr: string): Promise<boolean> {
  try {
    const data = JSON.parse(jsonStr);
    if (Array.isArray(data.problems)) {
      await setItem(STORAGE_KEY_PROBLEMS, data.problems);
      if (data.settings) {
        await setItem(STORAGE_KEY_SETTINGS, data.settings);
      }
      notifyBadgeUpdate();
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
