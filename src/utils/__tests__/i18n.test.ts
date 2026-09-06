import { describe, it, expect } from 'vitest';
import {
  translations,
  resolveLanguage,
  translate,
  createI18n,
  formatNextDays,
  getLocalizedGradeMeta,
  TranslationKey,
} from '../i18n';

describe('i18n localization module', () => {
  it('should have parity between zh and en dictionaries with zero missing keys', () => {
    const zhKeys = Object.keys(translations.zh).sort();
    const enKeys = Object.keys(translations.en).sort();

    expect(zhKeys).toEqual(enKeys);
    expect(zhKeys.length).toBeGreaterThan(60);

    for (const key of zhKeys as TranslationKey[]) {
      expect(translations.zh[key]).toBeTruthy();
      expect(translations.en[key]).toBeTruthy();
      // Verify no untranslated empty strings
      expect(translations.zh[key].trim().length).toBeGreaterThan(0);
      expect(translations.en[key].trim().length).toBeGreaterThan(0);
    }
  });

  it('should resolve language according to preference and host', () => {
    expect(resolveLanguage('zh')).toBe('zh');
    expect(resolveLanguage('en')).toBe('en');

    // System resolution with host
    expect(resolveLanguage('system', 'leetcode.com')).toBe('en');
    expect(resolveLanguage('system', 'https://leetcode.com/problems/two-sum/')).toBe('en');
    expect(resolveLanguage('system', 'leetcode.cn')).toBe('zh');
    expect(resolveLanguage('system', 'https://leetcode.cn/problems/two-sum/')).toBe('zh');

    // Explicit override takes precedence over hostname
    expect(resolveLanguage('zh', 'leetcode.com')).toBe('zh');
    expect(resolveLanguage('en', 'leetcode.cn')).toBe('en');
  });

  it('should substitute parameters correctly', () => {
    const zhText = translate('zh', 'header.tasksCount', { completed: 3, total: 10 });
    expect(zhText).toBe('3 / 10 题');

    const enText = translate('en', 'header.tasksCount', { completed: 3, total: 10 });
    expect(enText).toBe('3 / 10 due');

    const streakZh = translate('zh', 'header.streak', { n: 7 });
    expect(streakZh).toBe('连续 7 天');

    const streakEn = translate('en', 'header.streak', { n: 7 });
    expect(streakEn).toBe('7-day streak');
  });

  it('should create scoped i18n helpers', () => {
    const i18nZh = createI18n('zh');
    expect(i18nZh.lang).toBe('zh');
    expect(i18nZh.t('app.title')).toBe('LeetCode 艾宾浩斯');

    const i18nEn = createI18n('en');
    expect(i18nEn.lang).toBe('en');
    expect(i18nEn.t('app.title')).toBe('LeetCode Ebbinghaus');
  });

  it('should format next days properly in both languages', () => {
    expect(formatNextDays(1, 'zh')).toBe('1天后');
    expect(formatNextDays(4, 'zh')).toBe('4天后');

    expect(formatNextDays(1, 'en')).toBe('in 1d');
    expect(formatNextDays(4, 'en')).toBe('in 4d');
  });

  it('should localize SM-2 grade ratings and descriptions', () => {
    // Grade 1 (Again)
    const g1Zh = getLocalizedGradeMeta(1, 0, 1, [1, 2, 4], 'zh');
    expect(g1Zh.name).toBe('重来');
    expect(g1Zh.sub).toBe('完全卡壳');
    expect(g1Zh.nextDays).toBe('1天后');

    const g1En = getLocalizedGradeMeta(1, 0, 1, [1, 2, 4], 'en');
    expect(g1En.name).toBe('Again');
    expect(g1En.sub).toBe('Blackout');
    expect(g1En.nextDays).toBe('in 1d');

    // Grade 3 (Good)
    const g3Zh = getLocalizedGradeMeta(3, 1, 2, [1, 2, 4], 'zh');
    expect(g3Zh.name).toBe('良好');
    expect(g3Zh.sub).toBe('独立AC');
    expect(g3Zh.nextDays).toBe('4天后');

    const g3En = getLocalizedGradeMeta(3, 1, 2, [1, 2, 4], 'en');
    expect(g3En.name).toBe('Good');
    expect(g3En.sub).toBe('Solved AC');
    expect(g3En.nextDays).toBe('in 4d');

    // Grade 4 (Easy)
    const g4Zh = getLocalizedGradeMeta(4, 0, 1, [1, 2, 4], 'zh');
    expect(g4Zh.name).toBe('简单');
    expect(g4Zh.nextDays).toBe('4天后');

    const g4En = getLocalizedGradeMeta(4, 0, 1, [1, 2, 4], 'en');
    expect(g4En.name).toBe('Easy');
    expect(g4En.nextDays).toBe('in 4d');
  });
});
