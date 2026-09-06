export type Difficulty = 'Easy' | 'Medium' | 'Hard';

// SM-2 / Ebbinghaus Recall Grades:
// 1: Again (完全卡壳/遗忘，重置回第1阶)
// 2: Hard (困难/勉强做出，保持当前阶)
// 3: Good (良好/正常解答，稳步跃迁至下一阶)
// 4: Easy (熟练/秒杀，跳级跃迁至下下阶)
export type ReviewGrade = 1 | 2 | 3 | 4;

export interface ReviewLog {
  id: string;
  timestamp: number;
  date: string; // YYYY-MM-DD
  grade: ReviewGrade;
  intervalDays: number;
  repetition: number;
  easeFactor: number;
}

export interface Problem {
  id: string; // e.g. "lc-206"
  number: string; // "206"
  title: string; // "反转链表"
  slug: string; // "reverse-linked-list"
  url: string; // "https://leetcode.cn/problems/reverse-linked-list/"
  difficulty: Difficulty;
  tags: string[]; // ["链表", "双指针", "递归"]
  notes?: string; // 核心解题思路或易错点
  createdAt: number;
  repetition: number; // 成功复习阶梯索引 (0 -> 1d, 1 -> 2d, 2 -> 4d...)
  interval: number; // 当前复习间隔天数
  easeFactor: number; // 记忆衰减乘数 (初始 2.5)
  nextReviewDate: string; // 下次复习日期 YYYY-MM-DD
  lastReviewedDate?: string; // 上次复习日期 YYYY-MM-DD
  isSample?: boolean; // 是否为预置示例数据
  history: ReviewLog[];
}

export interface UserSettings {
  dailyTarget: number;
  showLeetCodeFloatingWidget: boolean;
  theme: 'dark' | 'light' | 'system';
  ladder: number[]; // 艾宾浩斯周期阶梯 [1, 2, 4, 7, 15, 30, 60, 120]
}

export interface DailySummary {
  todayStr: string;
  totalDue: number;
  completedToday: number;
  overdueCount: number;
  totalTracked: number;
  retentionRate: number; // 0 - 100
  streakDays: number;
}
