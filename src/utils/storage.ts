import { Problem, UserSettings, ReviewGrade, DailySummary } from '../types';
import { calculateSM2, getTodayString, diffDays, calculateRetentionRate, DEFAULT_EBBINGHAUS_LADDER } from './ebbinghaus';

const STORAGE_KEY_PROBLEMS = 'lc_ebbinghaus_problems';
const STORAGE_KEY_SETTINGS = 'lc_ebbinghaus_settings';

export const DEFAULT_SETTINGS: UserSettings = {
  dailyTarget: 8,
  showLeetCodeFloatingWidget: true,
  theme: 'dark',
  ladder: DEFAULT_EBBINGHAUS_LADDER,
};

function isChromeStorageAvailable(): boolean {
  return typeof chrome !== 'undefined' && !!chrome.storage?.local;
}

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

export function notifyBadgeUpdate(): void {
  if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
    try {
      chrome.runtime.sendMessage({ type: 'UPDATE_BADGE' }, () => {
        if (chrome.runtime.lastError) {
          // ignore
        }
      });
    } catch {
      // Ignore
    }
  }
}

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
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    repetition: 2, // 处于阶梯第3阶 (4天)
    interval: 4,
    easeFactor: 2.5,
    nextReviewDate: getTodayString(),
    lastReviewedDate: '2026-09-02',
    isSample: true,
    history: [],
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
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    repetition: 1, // 处于第2阶 (2天)
    interval: 2,
    easeFactor: 2.5,
    nextReviewDate: getTodayString(),
    lastReviewedDate: '2026-09-04',
    isSample: true,
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
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
    repetition: 1,
    interval: 2,
    easeFactor: 2.2,
    nextReviewDate: '2026-09-05', // 超期 1 天
    lastReviewedDate: '2026-09-03',
    isSample: true,
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
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15,
    repetition: 4, // 处于第5阶 (15天)
    interval: 15,
    easeFactor: 2.8,
    nextReviewDate: '2026-09-20',
    lastReviewedDate: '2026-09-05',
    isSample: true,
    history: [],
  },
];

const STORAGE_KEY_INITIALIZED = 'lc_ebbinghaus_initialized';

export async function getProblems(): Promise<Problem[]> {
  const isInitialized = await getItem<boolean>(STORAGE_KEY_INITIALIZED, false);
  const problems = await getItem<Problem[] | null>(STORAGE_KEY_PROBLEMS, null);

  // If this is the true first run (never initialized and no data stored)
  if (!isInitialized && problems === null) {
    await setItem(STORAGE_KEY_INITIALIZED, true);
    await setItem(STORAGE_KEY_PROBLEMS, INITIAL_SAMPLE_PROBLEMS);
    notifyBadgeUpdate();
    return INITIAL_SAMPLE_PROBLEMS;
  }

  // Once initialized, user may intentionally have 0 problems ([]). Never auto-restore!
  if (!isInitialized) {
    await setItem(STORAGE_KEY_INITIALIZED, true);
  }

  return Array.isArray(problems) ? problems : [];
}

export async function saveProblem(problem: Problem): Promise<void> {
  const list = await getProblems();
  const index = list.findIndex((p) => p.id === problem.id);
  if (index >= 0) {
    list[index] = problem;
  } else {
    list.unshift(problem);
  }
  await setItem(STORAGE_KEY_INITIALIZED, true);
  await setItem(STORAGE_KEY_PROBLEMS, list);
  notifyBadgeUpdate();
}

export async function deleteProblem(id: string): Promise<void> {
  const list = await getProblems();
  const filtered = list.filter((p) => p.id !== id);
  await setItem(STORAGE_KEY_INITIALIZED, true);
  await setItem(STORAGE_KEY_PROBLEMS, filtered);
  notifyBadgeUpdate();
}

export async function clearSampleProblems(): Promise<void> {
  const list = await getProblems();
  const filtered = list.filter((p) => !p.isSample);
  await setItem(STORAGE_KEY_INITIALIZED, true);
  await setItem(STORAGE_KEY_PROBLEMS, filtered);
  notifyBadgeUpdate();
}

export async function clearAllProblems(): Promise<void> {
  await setItem(STORAGE_KEY_INITIALIZED, true);
  await setItem(STORAGE_KEY_PROBLEMS, []);
  notifyBadgeUpdate();
}

export async function recordReview(problemId: string, grade: ReviewGrade): Promise<Problem | null> {
  const list = await getProblems();
  const target = list.find((p) => p.id === problemId);
  if (!target) return null;

  const settings = await getSettings();
  const ladder = settings.ladder || DEFAULT_EBBINGHAUS_LADDER;
  const todayStr = getTodayString();
  const update = calculateSM2(target, grade, todayStr, ladder);

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
    streakDays: 7,
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
