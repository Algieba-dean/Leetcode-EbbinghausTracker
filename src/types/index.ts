export type Difficulty = 'Easy' | 'Medium' | 'Hard';

// SM-2 Recall Grades:
// 1: Again (完全卡壳/遗忘，重置周期)
// 2: Hard (困难/看了部分题解，微增周期)
// 3: Good (良好/正常解答，按记忆因子倍增)
// 4: Easy (熟练/秒杀，加速倍增)
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
  repetition: number; // 成功复习轮次
  interval: number; // 当前复习间隔天数
  easeFactor: number; // 记忆衰减乘数 (初始 2.5)
  nextReviewDate: string; // 下次复习日期 YYYY-MM-DD
  lastReviewedDate?: string; // 上次复习日期 YYYY-MM-DD
  history: ReviewLog[];
}

export interface UserSettings {
  dailyTarget: number;
  showLeetCodeFloatingWidget: boolean;
  theme: 'dark' | 'light' | 'system';
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
