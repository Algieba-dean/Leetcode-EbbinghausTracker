import React, { createContext, useContext, useMemo } from 'react';
import { Language, ReviewGrade } from '../types';
import { DEFAULT_EBBINGHAUS_LADDER } from './ebbinghaus';

export type ResolvedLanguage = 'zh' | 'en';

export const translations = {
  zh: {
    // App & Header
    'app.title': 'LeetCode 艾宾浩斯',
    'app.subtitle': '间隔重复 · 科学掌握算法',
    'app.addTooltip': '手动录入新题',
    'app.settingsTooltip': '设置与数据管理',
    'header.todayProgress': '今日复习进度',
    'header.tasksCount': '{completed} / {total} 题',
    'header.progressAria': '今日复习完成度',
    'header.streak': '连续 {n} 天',
    'header.retention': '总留存率:',
    'header.library': '题库:',
    'header.unitProblem': '题',
    'tab.due': '今日待办',
    'tab.completed': '已完成',
    'tab.library': '题库档案',
    'tab.calendar': '日历负荷',
    'tab.navAria': '复习视图导航',
    'app.loading': '加载艾宾浩斯记忆库...',

    // Ingestion Banner (App.tsx)
    'banner.detected': '检测到力扣当前页：#{number} {title}',
    'banner.import': '一键收录',
    'banner.alreadyTracked': '当前页面题目已在艾宾浩斯复习库中',
    'banner.trackedBadge': '已跟踪',

    // Due Queue
    'due.overdueAlert': '有 {count} 道题目已超期，建议趁热打铁优先重做！',

    // Zero Inbox
    'zero.title': '今日复习任务已全部清空！',
    'zero.description': '艾宾浩斯记忆模型处于最佳留存点。保持专注与连续打卡，让算法直觉自然沉淀。',
    'zero.solveNew': '去力扣刷一道新题',
    'zero.browseLibrary': '浏览题库档案库',

    // Problem Card
    'card.openLeetCode': '在力扣中打开',
    'card.openLeetCodeAria': '在力扣中打开题目 #{number} {title}',
    'card.overdue': '超期 {days} 天',
    'card.dueToday': '今日到期',
    'card.sampleBadge': '示例',
    'card.stage': '阶段 第 {stage} 阶',
    'card.interval': '间隔 {interval}d',
    'card.retention': '留存 {rate}%',
    'card.retentionTooltip': '预估记忆强度',
    'card.notesTitle': '解题思路卡片',
    'card.notesAriaExpand': '查看解题思路卡片',
    'card.notesAriaCollapse': '收起解题思路卡片',
    'card.deleteConfirm': '确定从艾宾浩斯复习库中删除题目 #{number} {title} 吗？',
    'card.deleteTooltip': '删除此题',
    'card.deleteAria': '从艾宾浩斯复习库中删除题目 #{number} {title}',
    'card.feedbackLabel': '掌握度反馈:',
    'card.gradeAria': '掌握度评定为{name}（{sub}），下次复习将在{days}',

    // Grades
    'grade.again.name': '重来',
    'grade.again.sub': '完全卡壳',
    'grade.hard.name': '困难',
    'grade.hard.sub': '勉强写出',
    'grade.good.name': '良好',
    'grade.good.sub': '独立AC',
    'grade.easy.name': '简单',
    'grade.easy.sub': '秒杀跳阶',
    'grade.daysSuffix': '{n}天后',

    // Completed List
    'completed.emptyTitle': '今日尚未完成任何复习',
    'completed.emptyDesc': '在「今日待办」中完成做题并点击掌握度评定即可记录。',
    'completed.countToday': '今日已打卡 {count} 题',
    'completed.nextStage': '已进入下阶段',
    'completed.nextReview': '下次复习日: {date}',

    // Problem Library
    'library.searchPlaceholder': '搜索题号、题目名、算法标签...',
    'library.searchAria': '搜索题号、题目名或算法标签',
    'library.filterDiffAria': '按难度筛选',
    'library.filterAll': '全部',
    'library.sortAria': '题目排序规则',
    'library.sortNextDate': '下次复习',
    'library.sortNumber': '力扣题号',
    'library.sortRepetition': '复习轮次',
    'library.matchCount': '共匹配 {count} 道题目',
    'library.emptyLibraryTitle': '题库当前已清空（0 道题）',
    'library.emptyLibraryDesc': '你已清除所有题目。可以在力扣网页右下角点击悬浮胶囊一键收录，或点击右上角「+ 录入题目」添加新题！',
    'library.noMatch': '没有找到匹配的题目',
    'library.nextLabel': '下次: {date}',
    'library.deleteBtn': '删除',
    'library.deleteConfirm': '确定从记忆库中删除题目 #{number} {title} 吗？',

    // Calendar Forecast
    'calendar.loadTitle': '未来 7 天复习负荷分布',
    'calendar.totalDue': '共 {count} 题待复习',
    'calendar.today': '今日',
    'calendar.tomorrow': '明天',
    'calendar.weekdays': '周日,周一,周二,周三,周四,周五,周六',
    'calendar.healthTitle': '题库记忆留存健康度',
    'calendar.totalTracked': '总计 {count} 题',
    'calendar.strong': '牢固 (>80%)',
    'calendar.moderate': '稳步 (50-80%)',
    'calendar.critical': '临界 (<50%)',
    'calendar.strongTooltip': '牢固掌握: {count} 题',
    'calendar.moderateTooltip': '稳步记忆: {count} 题',
    'calendar.criticalTooltip': '临界遗忘: {count} 题',

    // Add Problem Modal
    'add.modalTitle': '智能自动导入题目',
    'add.closeAria': '关闭导入窗口',
    'add.inputLabel': '输入题号、题目名或粘贴力扣链接：',
    'add.inputPlaceholder': '例如 206 / 两数之和 / 粘贴网址',
    'add.fetchBtn': '自动解析',
    'add.notFound': '未找到匹配的力扣题目，请检查题号（如 206）或完整题目链接',
    'add.networkError': '网络解析失败，请检查网络或使用手动录入',
    'add.metaSuccess': '已自动识别力扣官方元数据',
    'add.notesLabel': '思路卡片 / 核心破局要点 (选填)',
    'add.notesPlaceholder': '可记录关键算法套路或易错点...',
    'add.submitBtn': '立即纳入艾宾浩斯复习计划',
    'add.manualToggle': '非力扣题目？点击展开纯手动模式',
    'add.manualNumberLabel': '编号',
    'add.manualNumberPlaceholder': '题号',
    'add.manualTitleLabel': '题目名称 *',
    'add.manualTitlePlaceholder': '题目名称',
    'add.manualTagsPlaceholder': '标签 (例如 动态规划, 背包)',
    'add.manualSubmit': '添加手动卡片',

    // Settings Modal
    'settings.title': '复习算法设置与数据管理',
    'settings.closeAria': '关闭设置窗口',
    'settings.languageSection': '界面语言 / Language',
    'settings.langSystem': '跟随系统 / Auto',
    'settings.langZh': '🇨🇳 简体中文',
    'settings.langEn': '🇺🇸 English',
    'settings.ladderTitle': '艾宾浩斯复习阶梯 (天数序列)',
    'settings.ladderReset': '恢复标准',
    'settings.ladderDesc': '每次良好(Good)解答稳步前进1阶，秒杀(Easy)跳跃2阶，完全遗忘(Again)退回第1阶。',
    'settings.ladderPlaceholder': '例如 1, 2, 4, 7, 15, 30, 60, 120',
    'settings.ladderSave': '保存',
    'settings.ladderError': '阶梯至少需要包含 2 个递增天数！',
    'settings.ladderSaved': '已更新艾宾浩斯复习阶梯: [{ladder}] 天',
    'settings.ladderRestored': '已恢复默认标准阶梯：[1, 2, 4, 7, 15, 30, 60, 120] 天',
    'settings.backupTitle': '数据备份与迁移',
    'settings.exportBtn': '导出题库备份',
    'settings.exportSuccess': '数据已成功导出为 JSON 文件！',
    'settings.importBtn': '导入备份文件',
    'settings.importSuccess': '题库备份导入成功！',
    'settings.importFailed': '导入失败：JSON 格式不正确',
    'settings.manageTitle': '题库管理与重置',
    'settings.clearSampleBtn': '一键移除预置示例题目 (保留自选题)',
    'settings.clearSampleConfirm': '确定清除预设的示例题目吗？(您自己添加的题目将被保留)',
    'settings.clearSampleSuccess': '已成功清除 {count} 道初始预置示例题目！',
    'settings.clearSampleNone': '题库中没有检测到预设的示例题目。',
    'settings.reloadSampleBtn': '重新载入初始示例题目',
    'settings.reloadSampleConfirm': '是否重新加载默认演示题目数据？',
    'settings.reloadSampleSuccess': '已载入演示数据！',
    'settings.clearAllBtn': '清空全部题目数据',
    'settings.clearAllConfirm': '⚠️ 警告：确定清空全部题库吗？该操作不可撤销，建议先导出备份！',
    'settings.clearAllSuccess': '题库已全部清空！',

    // Content Script Floating Capsule
    'capsule.pillTracked': '🧠 艾宾浩斯: 第{stage}阶 ({interval}d)',
    'capsule.pillUntracked': '🧠 艾宾浩斯: 一键收录',
    'capsule.panelTitleTracked': '🧠 艾宾浩斯复习',
    'capsule.panelTitleUntracked': '🧠 艾宾浩斯复习计划',
    'capsule.autoAcBanner': '🎉 检测到提交通过！已自动记录。',
    'capsule.currentStage': '当前阶段：第 {stage} 阶 (间隔 {interval} 天)',
    'capsule.nextReview': '下次复习：{date}',
    'capsule.reviewedToday': '✅ 今日复习已打卡！',
    'capsule.dueToday': '⏱️ 今日待做题并评定',
    'capsule.doneBanner': '🎉 记忆已刷新至下个周期！',
    'capsule.ratePrompt': '做完后评定记忆熟练度：',
    'capsule.trackingFooter': '艾宾浩斯跟踪中',
    'capsule.removeBtn': '从复习库移除此题',
    'capsule.removeConfirm': '确定从艾宾浩斯复习库中移除题目 #{number} {title} 吗？',
    'capsule.untrackedDesc': '已自动识别题目信息。点击下方按钮即可一键纳入，明天准时开启第 1 轮复习！',
    'capsule.notesPlaceholder': '关键解题思路或易错点卡片 (选填)...',
    'capsule.submitAdd': '🚀 一键纳入艾宾浩斯复习',
    'capsule.autoAcNotes': '做题提交通过，自动收录',
  },
  en: {
    // App & Header
    'app.title': 'LeetCode Ebbinghaus',
    'app.subtitle': 'Spaced Repetition · Algorithmic Mastery',
    'app.addTooltip': 'Add New Problem',
    'app.settingsTooltip': 'Settings & Data',
    'header.todayProgress': "Today's Review Progress",
    'header.tasksCount': '{completed} / {total} due',
    'header.progressAria': "Today's review completion progress",
    'header.streak': '{n}-day streak',
    'header.retention': 'Retention:',
    'header.library': 'Tracked:',
    'header.unitProblem': 'probs',
    'tab.due': 'Due Today',
    'tab.completed': 'Completed',
    'tab.library': 'Library',
    'tab.calendar': 'Forecast',
    'tab.navAria': 'Review view navigation',
    'app.loading': 'Loading review library...',

    // Ingestion Banner (App.tsx)
    'banner.detected': 'Detected LeetCode tab: #{number} {title}',
    'banner.import': 'One-Click Add',
    'banner.alreadyTracked': 'This problem is already in your review schedule',
    'banner.trackedBadge': 'Tracked',

    // Due Queue
    'due.overdueAlert': '{count} problem(s) overdue! Refresh them while memories are fresh.',

    // Zero Inbox
    'zero.title': 'All Reviews Completed for Today!',
    'zero.description': 'Your memory retention is optimal. Keep up the daily streak to build lasting algorithmic intuition.',
    'zero.solveNew': 'Solve a New Problem on LeetCode',
    'zero.browseLibrary': 'Browse Problem Library',

    // Problem Card
    'card.openLeetCode': 'Open in LeetCode',
    'card.openLeetCodeAria': 'Open problem #{number} {title} in LeetCode',
    'card.overdue': '{days}d overdue',
    'card.dueToday': 'Due today',
    'card.sampleBadge': 'Demo',
    'card.stage': 'Stage {stage}',
    'card.interval': 'Interval {interval}d',
    'card.retention': 'Retention {rate}%',
    'card.retentionTooltip': 'Estimated retention rate',
    'card.notesTitle': 'Solution Notes Card',
    'card.notesAriaExpand': 'View solution notes',
    'card.notesAriaCollapse': 'Hide solution notes',
    'card.deleteConfirm': 'Remove problem #{number} {title} from your review list?',
    'card.deleteTooltip': 'Delete problem',
    'card.deleteAria': 'Remove problem #{number} {title} from review list',
    'card.feedbackLabel': 'Recall Feedback:',
    'card.gradeAria': 'Rate as {name} ({sub}), next review in {days}',

    // Grades
    'grade.again.name': 'Again',
    'grade.again.sub': 'Blackout',
    'grade.hard.name': 'Hard',
    'grade.hard.sub': 'Struggled',
    'grade.good.name': 'Good',
    'grade.good.sub': 'Solved AC',
    'grade.easy.name': 'Easy',
    'grade.easy.sub': 'Speedrun',
    'grade.daysSuffix': 'in {n}d',

    // Completed List
    'completed.emptyTitle': 'No reviews completed today yet',
    'completed.emptyDesc': 'Finish due problems in "Due Today" and rate your recall proficiency to log them.',
    'completed.countToday': '{count} problem(s) reviewed today',
    'completed.nextStage': 'Moved to next stage',
    'completed.nextReview': 'Next review: {date}',

    // Problem Library
    'library.searchPlaceholder': 'Search by #, title, tag, notes...',
    'library.searchAria': 'Search problems by number, title, or tag',
    'library.filterDiffAria': 'Filter by difficulty',
    'library.filterAll': 'All',
    'library.sortAria': 'Problem sorting order',
    'library.sortNextDate': 'Next Review',
    'library.sortNumber': 'Problem #',
    'library.sortRepetition': 'Stage Ladder',
    'library.matchCount': '{count} problem(s) found',
    'library.emptyLibraryTitle': 'Library is currently empty (0 problems)',
    'library.emptyLibraryDesc': 'All problems have been cleared. You can track problems via the floating capsule on LeetCode or by clicking the "+" button above!',
    'library.noMatch': 'No matching problems found',
    'library.nextLabel': 'Next: {date}',
    'library.deleteBtn': 'Delete',
    'library.deleteConfirm': 'Remove problem #{number} {title} from library?',

    // Calendar Forecast
    'calendar.loadTitle': 'Next 7-Day Review Load Distribution',
    'calendar.totalDue': '{count} problem(s) scheduled',
    'calendar.today': 'Today',
    'calendar.tomorrow': 'Tmrw',
    'calendar.weekdays': 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    'calendar.healthTitle': 'Memory Retention Health',
    'calendar.totalTracked': '{count} total problem(s)',
    'calendar.strong': 'Strong (>80%)',
    'calendar.moderate': 'Moderate (50-80%)',
    'calendar.critical': 'Critical (<50%)',
    'calendar.strongTooltip': 'Strong: {count} problem(s)',
    'calendar.moderateTooltip': 'Moderate: {count} problem(s)',
    'calendar.criticalTooltip': 'Critical: {count} problem(s)',

    // Add Problem Modal
    'add.modalTitle': 'Auto-Import LeetCode Problem',
    'add.closeAria': 'Close import dialog',
    'add.inputLabel': 'Enter problem #, title, or paste LeetCode URL:',
    'add.inputPlaceholder': 'e.g. 206 / two-sum / paste URL',
    'add.fetchBtn': 'Fetch Meta',
    'add.notFound': 'No matching LeetCode problem found. Please check the problem number (e.g. 206) or URL.',
    'add.networkError': 'Network request failed. Please check your connection or use manual entry.',
    'add.metaSuccess': 'LeetCode metadata successfully detected',
    'add.notesLabel': 'Solution Notes / Core Takeaways (Optional)',
    'add.notesPlaceholder': 'Key algorithm patterns, pitfalls, or insights...',
    'add.submitBtn': 'Add to Spaced Repetition Plan',
    'add.manualToggle': 'Non-LeetCode problem? Switch to manual mode',
    'add.manualNumberLabel': 'Number',
    'add.manualNumberPlaceholder': 'Prob #',
    'add.manualTitleLabel': 'Problem Title *',
    'add.manualTitlePlaceholder': 'Problem Title',
    'add.manualTagsPlaceholder': 'Tags (e.g. Dynamic Programming, DFS)',
    'add.manualSubmit': 'Add Custom Problem',

    // Settings Modal
    'settings.title': 'Settings & Data Management',
    'settings.closeAria': 'Close settings',
    'settings.languageSection': 'Language / 界面语言',
    'settings.langSystem': 'System Default',
    'settings.langZh': '🇨🇳 简体中文',
    'settings.langEn': '🇺🇸 English',
    'settings.ladderTitle': 'Ebbinghaus Review Ladder (Day Intervals)',
    'settings.ladderReset': 'Reset Default',
    'settings.ladderDesc': 'Good advances +1 stage, Easy jumps +2 stages, Again resets to stage 1.',
    'settings.ladderPlaceholder': 'e.g. 1, 2, 4, 7, 15, 30, 60, 120',
    'settings.ladderSave': 'Save',
    'settings.ladderError': 'Ladder must contain at least 2 increasing positive numbers!',
    'settings.ladderSaved': 'Updated interval ladder: [{ladder}] days',
    'settings.ladderRestored': 'Reset to default standard ladder: [1, 2, 4, 7, 15, 30, 60, 120] days',
    'settings.backupTitle': 'Data Backup & Migration',
    'settings.exportBtn': 'Export Backup (JSON)',
    'settings.exportSuccess': 'Data successfully exported as JSON file!',
    'settings.importBtn': 'Import Backup (JSON)',
    'settings.importSuccess': 'Problem library backup imported successfully!',
    'settings.importFailed': 'Import failed: Invalid JSON format',
    'settings.manageTitle': 'Library Management & Reset',
    'settings.clearSampleBtn': 'Remove Demo Problems (Keep Custom)',
    'settings.clearSampleConfirm': 'Remove preset demo problems? (Your custom problems will be kept)',
    'settings.clearSampleSuccess': 'Successfully removed {count} demo problem(s)!',
    'settings.clearSampleNone': 'No demo problems detected in library.',
    'settings.reloadSampleBtn': 'Reload Default Demo Problems',
    'settings.reloadSampleConfirm': 'Reload default demo problems into library?',
    'settings.reloadSampleSuccess': 'Demo problems reloaded!',
    'settings.clearAllBtn': 'Clear All Problems',
    'settings.clearAllConfirm': '⚠️ Warning: Clear all problems? This cannot be undone! Please export a backup first.',
    'settings.clearAllSuccess': 'All problem data cleared!',

    // Content Script Floating Capsule
    'capsule.pillTracked': '🧠 Ebbinghaus: Stage {stage} ({interval}d)',
    'capsule.pillUntracked': '🧠 Ebbinghaus: Track Problem',
    'capsule.panelTitleTracked': '🧠 Spaced Review',
    'capsule.panelTitleUntracked': '🧠 Spaced Repetition',
    'capsule.autoAcBanner': '🎉 Submission Accepted! Automatically tracked.',
    'capsule.currentStage': 'Current Stage: Stage {stage} ({interval}d interval)',
    'capsule.nextReview': 'Next Review: {date}',
    'capsule.reviewedToday': '✅ Reviewed today!',
    'capsule.dueToday': '⏱️ Due today - review & rate',
    'capsule.doneBanner': '🎉 Memory schedule advanced to next cycle!',
    'capsule.ratePrompt': 'Rate recall proficiency after solving:',
    'capsule.trackingFooter': 'Tracking in Ebbinghaus',
    'capsule.removeBtn': 'Remove from review list',
    'capsule.removeConfirm': 'Remove #{number} {title} from your review list?',
    'capsule.untrackedDesc': 'Problem details detected. Click below to add to your spaced repetition schedule starting tomorrow!',
    'capsule.notesPlaceholder': 'Key algorithm notes, pitfalls, or insights (optional)...',
    'capsule.submitAdd': '🚀 Track in Spaced Repetition',
    'capsule.autoAcNotes': 'Accepted on submission, auto-tracked',
  },
};

export type TranslationKey = keyof typeof translations.zh;

export function resolveLanguage(lang: Language = 'system', hostname?: string): ResolvedLanguage {
  if (lang === 'zh' || lang === 'en') return lang;
  if (hostname) {
    if (hostname.includes('leetcode.com')) return 'en';
    if (hostname.includes('leetcode.cn')) return 'zh';
  }
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  }
  return 'zh';
}

export function translate(
  lang: ResolvedLanguage,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  const dict = translations[lang] || translations.zh;
  let text = dict[key] || translations.zh[key] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.split(`{${k}}`).join(String(v));
    }
  }
  return text;
}

export function createI18n(resolvedLang: ResolvedLanguage) {
  return {
    lang: resolvedLang,
    t: (key: TranslationKey, params?: Record<string, string | number>) =>
      translate(resolvedLang, key, params),
  };
}

export function formatNextDays(days: number, lang: ResolvedLanguage): string {
  return translate(lang, 'grade.daysSuffix', { n: days });
}

export interface LocalizedGradeMeta {
  grade: ReviewGrade;
  name: string;
  sub: string;
  nextDays: string;
  nextDaysNumber: number;
}

export function getLocalizedGradeMeta(
  grade: ReviewGrade,
  rep: number,
  interval: number,
  ladder: number[] = DEFAULT_EBBINGHAUS_LADDER,
  lang: ResolvedLanguage = 'zh'
): LocalizedGradeMeta {
  let nextDaysNumber: number;
  switch (grade) {
    case 1:
      nextDaysNumber = ladder[0] || 1;
      break;
    case 2:
      nextDaysNumber = ladder[Math.min(rep, ladder.length - 1)] || 1;
      break;
    case 3:
      const nextIdx3 = rep + 1;
      nextDaysNumber = nextIdx3 < ladder.length ? ladder[nextIdx3] : Math.round(interval * 2.5);
      break;
    case 4:
      const nextIdx4 = rep + 2;
      nextDaysNumber = nextIdx4 < ladder.length ? ladder[nextIdx4] : Math.round(interval * 3.2);
      break;
  }

  const gradeKey = ({ 1: 'again', 2: 'hard', 3: 'good', 4: 'easy' } as const)[grade];
  return {
    grade,
    name: translate(lang, `grade.${gradeKey}.name` as TranslationKey),
    sub: translate(lang, `grade.${gradeKey}.sub` as TranslationKey),
    nextDays: formatNextDays(nextDaysNumber, lang),
    nextDaysNumber,
  };
}

// React Context for Seamless UI Consumption
interface I18nContextValue {
  lang: ResolvedLanguage;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'zh',
  t: (key, params) => translate('zh', key, params),
});

export const I18nProvider: React.FC<{
  language: Language;
  children: React.ReactNode;
}> = ({ language, children }) => {
  const resolvedLang = useMemo(() => resolveLanguage(language), [language]);

  const value = useMemo(
    () => ({
      lang: resolvedLang,
      t: (key: TranslationKey, params?: Record<string, string | number>) =>
        translate(resolvedLang, key, params),
    }),
    [resolvedLang]
  );

  return React.createElement(I18nContext.Provider, { value }, children);
};

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}
