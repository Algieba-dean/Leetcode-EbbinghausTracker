// Content Script for LeetCode (leetcode.cn / leetcode.com)
// Built with Shadow DOM for complete CSS isolation and robust LeetCode DOM parsing.

import { Problem, ReviewGrade, Difficulty, UserSettings } from '../types';
import { calculateSM2, getTodayString, DEFAULT_EBBINGHAUS_LADDER } from '../utils/ebbinghaus';
import { DEFAULT_SETTINGS } from '../utils/storage';
import { createI18n, resolveLanguage, getLocalizedGradeMeta } from '../utils/i18n';

const STORAGE_KEY_PROBLEMS = 'lc_ebbinghaus_problems';
const STORAGE_KEY_SETTINGS = 'lc_ebbinghaus_settings';

interface PageMeta {
  slug: string;
  number: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
}

export function extractProblemFromPage(): PageMeta {
  const pathname = window.location.pathname;
  const match = pathname.match(/\/problems\/([^/]+)/);
  const slug = match ? match[1] : '';

  let number = '';
  let title = '';
  let difficulty: Difficulty = 'Medium';
  const tags: string[] = ['力扣'];

  // 1. Try extracting from document.title: "1. 两数之和 - 力扣（LeetCode）" or "1. Two Sum - LeetCode"
  const docTitle = document.title || '';
  const titleRegex = /^(\d+)[\.\s、]+([^-—|]+)/;
  const titleMatch = docTitle.match(titleRegex);

  if (titleMatch) {
    number = titleMatch[1].trim();
    title = titleMatch[2].trim();
  }

  // 2. DOM extraction heuristics for modern LeetCode
  const titleElem =
    document.querySelector('div[data-cypress="QuestionTitle"]') ||
    document.querySelector('.text-title-large') ||
    document.querySelector('h4');

  if (titleElem && titleElem.textContent) {
    const raw = titleElem.textContent.trim();
    const domMatch = raw.match(/^(\d+)[\.\s、]+(.+)/);
    if (domMatch) {
      number = domMatch[1].trim();
      title = domMatch[2].trim();
    } else if (!title) {
      title = raw;
    }
  }

  // Fallback title to slug if still empty
  if (!title && slug) {
    title = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  // 3. Difficulty extraction
  const pageText = document.body.innerText || '';
  const easyElem = document.querySelector('.text-difficulty-easy, [class*="text-olive"]');
  const hardElem = document.querySelector('.text-difficulty-hard, [class*="text-pink"]');
  const mediumElem = document.querySelector('.text-difficulty-medium, [class*="text-yellow"]');

  if (easyElem || pageText.includes('简单') || pageText.includes('Easy')) {
    difficulty = 'Easy';
  } else if (hardElem || pageText.includes('困难') || pageText.includes('Hard')) {
    difficulty = 'Hard';
  } else if (mediumElem || pageText.includes('中等') || pageText.includes('Medium')) {
    difficulty = 'Medium';
  }

  // 4. Tags extraction
  document.querySelectorAll('a[href*="/tag/"]').forEach((el) => {
    const text = el.textContent?.trim();
    if (text && !tags.includes(text)) tags.push(text);
  });

  return { slug, number: number || '0', title, difficulty, tags };
}

export function checkSubmissionAccepted(): boolean {
  const resultLocator = document.querySelector('[data-e2e-locator="submission-result"]');
  if (resultLocator) {
    const text = (resultLocator.textContent || '').trim();
    if (text === '通过' || text === 'Accepted' || text.startsWith('通过\n') || text.startsWith('Accepted\n')) {
      return true;
    }
  }

  const resultBadges = document.querySelectorAll(
    '[class*="text-green"], [class*="text-olive"], [data-cypress*="submission"], [class*="status-success"]'
  );
  for (const el of resultBadges) {
    const text = (el.textContent || '').trim();
    if (text === '通过' || text === 'Accepted') {
      return true;
    }
  }

  return false;
}

function isExtensionValid(): boolean {
  try {
    return typeof chrome !== 'undefined' && !!chrome.runtime && !!chrome.runtime.id;
  } catch {
    return false;
  }
}

function safeSendMessage(message: { type: string; [key: string]: any }): void {
  if (!isExtensionValid()) return;
  try {
    chrome.runtime.sendMessage(message, () => {
      if (chrome.runtime.lastError) {
        // Cleanly swallow any disconnected port/worker errors
      }
    });
  } catch {
    // Ignore context invalidation
  }
}

async function getStoredProblems(): Promise<Problem[]> {
  if (!isExtensionValid()) return [];
  return new Promise((resolve) => {
    try {
      chrome.storage.local.get([STORAGE_KEY_PROBLEMS], (res) => {
        if (chrome.runtime.lastError) {
          resolve([]);
          return;
        }
        resolve(res[STORAGE_KEY_PROBLEMS] || []);
      });
    } catch {
      resolve([]);
    }
  });
}


async function getStoredSettings(): Promise<UserSettings> {
  if (!isExtensionValid()) return DEFAULT_SETTINGS;
  return new Promise((resolve) => {
    try {
      chrome.storage.local.get([STORAGE_KEY_SETTINGS], (res) => {
        if (chrome.runtime.lastError) {
          resolve(DEFAULT_SETTINGS);
          return;
        }
        resolve(res[STORAGE_KEY_SETTINGS] || DEFAULT_SETTINGS);
      });
    } catch {
      resolve(DEFAULT_SETTINGS);
    }
  });
}


async function saveStoredProblems(list: Problem[]): Promise<void> {
  if (!isExtensionValid()) return;
  return new Promise((resolve) => {
    try {
      chrome.storage.local.set({ [STORAGE_KEY_PROBLEMS]: list }, () => {
        if (chrome.runtime.lastError) {
          resolve();
          return;
        }
        safeSendMessage({ type: 'UPDATE_BADGE' });
        resolve();
      });
    } catch {
      resolve();
    }
  });
}

function initCapsule(): void {
  if (!window.location.pathname.includes('/problems/')) return;
  if (document.getElementById('lc-ebbinghaus-capsule-host')) return;

  const host = document.createElement('div');
  host.id = 'lc-ebbinghaus-capsule-host';
  host.style.cssText =
    'position: fixed; bottom: 20px; right: 20px; z-index: 9999999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    .capsule-btn {
      background: #0f172a;
      border: 1px solid #334155;
      color: #f8fafc;
      border-radius: 9999px;
      padding: 7px 14px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 7px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
      transition: all 0.2s ease;
      user-select: none;
    }
    .capsule-btn:hover {
      border-color: #10b981;
      transform: translateY(-1px);
    }
    .capsule-btn.active {
      border-color: #10b981;
      background: #020617;
    }
    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
    }
    .pulse-dot.amber {
      background: #f59e0b;
      box-shadow: 0 0 8px #f59e0b;
    }

    .panel {
      position: absolute;
      bottom: 44px;
      right: 0;
      width: 320px;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 14px;
      color: #f8fafc;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(16, 185, 129, 0.15);
      font-size: 12px;
      animation: fadeIn 0.18s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .title-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
      color: #34d399;
    }
    .badge {
      font-size: 10px;
      font-family: monospace;
      padding: 1px 6px;
      border-radius: 4px;
      background: #1e293b;
      border: 1px solid #475569;
      color: #cbd5e1;
    }
    .badge.easy { color: #34d399; border-color: rgba(52, 211, 153, 0.3); background: rgba(52, 211, 153, 0.1); }
    .badge.medium { color: #fbbf24; border-color: rgba(251, 191, 36, 0.3); background: rgba(251, 191, 36, 0.1); }
    .badge.hard { color: #f87171; border-color: rgba(248, 113, 113, 0.3); background: rgba(248, 113, 113, 0.1); }

    .meta-info {
      font-size: 11px;
      color: #94a3b8;
      line-height: 1.5;
      margin-bottom: 10px;
      background: #020617;
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid #1e293b;
    }
    .meta-info strong {
      color: #e2e8f0;
    }

    .btn-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      margin-top: 6px;
    }
    .rate-btn {
      background: #1e293b;
      border: 1px solid #334155;
      color: #e2e8f0;
      border-radius: 6px;
      padding: 6px 2px;
      font-size: 11px;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
    }
    .rate-btn:hover { filter: brightness(1.25); transform: translateY(-1px); }
    .rate-btn.again { border-color: rgba(239, 68, 68, 0.4); color: #f87171; background: rgba(239, 68, 68, 0.1); }
    .rate-btn.hard { border-color: rgba(245, 158, 11, 0.4); color: #fbbf24; background: rgba(245, 158, 11, 0.1); }
    .rate-btn.good { border-color: rgba(16, 185, 129, 0.4); color: #34d399; background: rgba(16, 185, 129, 0.1); }
    .rate-btn.easy { border-color: rgba(14, 165, 233, 0.4); color: #38bdf8; background: rgba(14, 165, 233, 0.1); }

    .add-action-btn {
      width: 100%;
      background: #059669;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 8px 10px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      font-size: 12px;
      transition: background 0.15s;
    }
    .add-action-btn:hover { background: #10b981; }

    .textarea-notes {
      width: 100%;
      background: #020617;
      border: 1px solid #334155;
      color: #f8fafc;
      border-radius: 6px;
      padding: 7px 8px;
      font-size: 11px;
      margin-bottom: 8px;
      outline: none;
      resize: vertical;
      min-height: 48px;
      font-family: inherit;
    }
    .textarea-notes:focus { border-color: #10b981; }

    .footer-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px solid #1e293b;
      font-size: 10px;
    }
    .del-btn {
      color: #f87171;
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: underline;
      opacity: 0.8;
    }
    .del-btn:hover { opacity: 1; }
    
    .done-banner {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399;
      border-radius: 6px;
      padding: 7px;
      text-align: center;
      font-weight: 500;
      font-size: 11px;
    }

    .auto-ac-banner {
      background: rgba(16, 185, 129, 0.2);
      border: 1px solid #10b981;
      color: #34d399;
      padding: 8px 10px;
      border-radius: 6px;
      margin-bottom: 8px;
      font-size: 11px;
      line-height: 1.4;
      display: flex;
      align-items: center;
      gap: 6px;
    }
  `;
  shadow.appendChild(style);

  const wrapper = document.createElement('div');
  shadow.appendChild(wrapper);

  let isExpanded = false;
  let autoAcNotified = false;

  async function render() {
    const meta = extractProblemFromPage();
    if (!meta.slug) return;

    const problems = await getStoredProblems();
    const settings = await getStoredSettings();
    const ladder = settings.ladder || DEFAULT_EBBINGHAUS_LADDER;
    const lang = resolveLanguage(settings.language, window.location.hostname);
    const { t } = createI18n(lang);

    const existing = problems.find(
      (p) => p.slug === meta.slug || (meta.number !== '0' && p.number === meta.number)
    );

    wrapper.innerHTML = '';

    // 1. Floating Pill Button
    const pill = document.createElement('button');
    pill.className = `capsule-btn ${isExpanded ? 'active' : ''}`;

    if (existing) {
      const today = getTodayString();
      const isDue = existing.nextReviewDate <= today;
      pill.innerHTML = `
        <span class="pulse-dot ${isDue ? 'amber' : ''}"></span>
        <span>${t('capsule.pillTracked', { stage: existing.repetition + 1, interval: existing.interval })}</span>
      `;
    } else {
      pill.innerHTML = `
        <span class="pulse-dot"></span>
        <span>${t('capsule.pillUntracked')}</span>
      `;
    }

    pill.onclick = () => {
      isExpanded = !isExpanded;
      render();
    };
    wrapper.appendChild(pill);

    // 2. Expanded Floating Panel
    if (isExpanded) {
      const panel = document.createElement('div');
      panel.className = 'panel';

      if (existing) {
        const today = getTodayString();
        const isReviewedToday = existing.lastReviewedDate === today;

        panel.innerHTML = `
          ${autoAcNotified ? `<div class="auto-ac-banner">${t('capsule.autoAcBanner')}</div>` : ''}

          <div class="panel-header">
            <div class="title-row">
              <span>${t('capsule.panelTitleTracked')}</span>
            </div>
            <div style="display: flex; gap: 4px;">
              <span class="badge ${existing.difficulty.toLowerCase()}">${existing.difficulty}</span>
              <span class="badge">#${existing.number || meta.number}</span>
            </div>
          </div>

          <div style="font-weight: 600; font-size: 12px; margin-bottom: 6px; color: #f1f5f9;">
            ${existing.title || meta.title}
          </div>

          <div class="meta-info">
            <div>${t('capsule.currentStage', { stage: existing.repetition + 1, interval: existing.interval })}</div>
            <div>${t('capsule.nextReview', { date: existing.nextReviewDate })}</div>
            ${isReviewedToday ? `<div style="color: #34d399; margin-top: 3px;">${t('capsule.reviewedToday')}</div>` : `<div style="color: #f59e0b; margin-top: 3px;">${t('capsule.dueToday')}</div>`}
          </div>

          ${
            isReviewedToday
              ? `<div class="done-banner">${t('capsule.doneBanner')}</div>`
              : `
            <div style="font-size: 11px; color: #94a3b8; margin-bottom: 4px;">${t('capsule.ratePrompt')}</div>
            <div class="btn-grid">
              ${([1, 2, 3, 4] as ReviewGrade[])
                .map((grade) => {
                  const metaGrade = getLocalizedGradeMeta(grade, existing.repetition, existing.interval, ladder, lang);
                  const cls = ['again', 'hard', 'good', 'easy'][grade - 1];
                  return `
                <button class="rate-btn ${cls}" data-grade="${grade}">
                  <div>${metaGrade.name}</div>
                  <div style="font-size: 9px; opacity: 0.75;">${metaGrade.nextDays}</div>
                </button>`;
                })
                .join('')}
            </div>
          `
          }

          <div class="footer-actions">
            <span style="color: #64748b;">${t('capsule.trackingFooter')}</span>
            <button id="capsule-remove-btn" class="del-btn">${t('capsule.removeBtn')}</button>
          </div>
        `;

        panel.querySelectorAll('.rate-btn').forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            const btnEl = e.currentTarget as HTMLElement;
            const grade = Number(btnEl.dataset.grade) as ReviewGrade;
            const update = calculateSM2(existing, grade, today, ladder);

            const updated: Problem = {
              ...existing,
              repetition: update.repetition,
              interval: update.interval,
              easeFactor: update.easeFactor,
              nextReviewDate: update.nextReviewDate,
              lastReviewedDate: today,
              history: [
                {
                  id: `log-${Date.now()}`,
                  timestamp: Date.now(),
                  date: today,
                  grade,
                  intervalDays: update.interval,
                  repetition: update.repetition,
                  easeFactor: update.easeFactor,
                },
                ...(existing.history || []),
              ],
            };

            const list = await getStoredProblems();
            const idx = list.findIndex((p) => p.id === existing.id);
            if (idx >= 0) list[idx] = updated;
            await saveStoredProblems(list);
            render();
          });
        });

        panel.querySelector('#capsule-remove-btn')?.addEventListener('click', async () => {
          if (confirm(t('capsule.removeConfirm', { number: existing.number, title: existing.title }))) {
            const list = await getStoredProblems();
            const filtered = list.filter((p) => p.id !== existing.id);
            await saveStoredProblems(filtered);
            render();
          }
        });
      } else {
        // Not tracked: Instant One-Click Add
        panel.innerHTML = `
          <div class="panel-header">
            <div class="title-row">
              <span>${t('capsule.panelTitleUntracked')}</span>
            </div>
            <div style="display: flex; gap: 4px;">
              <span class="badge ${meta.difficulty.toLowerCase()}">${meta.difficulty}</span>
              <span class="badge">#${meta.number}</span>
            </div>
          </div>

          <div style="font-weight: 600; font-size: 12px; margin-bottom: 6px; color: #f1f5f9;">
            ${meta.title}
          </div>

          <p style="color: #94a3b8; font-size: 11px; margin-bottom: 8px; line-height: 1.4;">
            ${t('capsule.untrackedDesc')}
          </p>

          <textarea id="capsule-notes-input" class="textarea-notes" placeholder="${t('capsule.notesPlaceholder')}"></textarea>

          <button id="capsule-submit-add" class="add-action-btn">
            <span>${t('capsule.submitAdd')}</span>
          </button>
        `;

        panel.querySelector('#capsule-submit-add')?.addEventListener('click', async () => {
          const textarea = panel.querySelector('#capsule-notes-input') as HTMLTextAreaElement;
          const notes = textarea ? textarea.value.trim() : '';

          const newProblem: Problem = {
            id: `lc-${meta.slug || Date.now()}`,
            number: meta.number || '0',
            title: meta.title || meta.slug,
            slug: meta.slug,
            url: window.location.href,
            difficulty: meta.difficulty,
            tags: meta.tags,
            notes,
            createdAt: Date.now(),
            repetition: 0,
            interval: 1, // 1st stage
            easeFactor: 2.5,
            nextReviewDate: getTodayString(),
            isSample: false,
            history: [],
          };

          const list = await getStoredProblems();
          list.unshift(newProblem);
          await saveStoredProblems(list);
          render();
        });
      }

      wrapper.appendChild(panel);
    }
  }

  render();

  // Watch for LeetCode Single Page App client-side route changes
  let lastUrl = window.location.href;
  const timer = setInterval(() => {
    if (!isExtensionValid()) {
      clearInterval(timer);
      observer.disconnect();
      return;
    }
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;
      autoAcNotified = false;
      acHandled = false;
      render();
    }
  }, 1200);

  // Auto AC (Accepted / 通过) Detection via MutationObserver
  let acHandled = false;
  const observer = new MutationObserver(async () => {
    if (!isExtensionValid()) {
      observer.disconnect();
      clearInterval(timer);
      return;
    }

    if (acHandled) return;

    if (checkSubmissionAccepted()) {
      acHandled = true;
      const meta = extractProblemFromPage();
      if (meta.slug) {
        const list = await getStoredProblems();
        const existing = list.find((p) => p.slug === meta.slug);
        if (!existing) {
          const settings = await getStoredSettings();
          const lang = resolveLanguage(settings.language, window.location.hostname);
          const { t } = createI18n(lang);

          // Auto add on real submission AC
          const newProblem: Problem = {
            id: `lc-${meta.slug || Date.now()}`,
            number: meta.number || '0',
            title: meta.title || meta.slug,
            slug: meta.slug,
            url: window.location.href,
            difficulty: meta.difficulty,
            tags: meta.tags,
            notes: t('capsule.autoAcNotes'),
            createdAt: Date.now(),
            repetition: 0,
            interval: 1,
            easeFactor: 2.5,
            nextReviewDate: getTodayString(),
            isSample: false,
            history: [],
          };
          list.unshift(newProblem);
          await saveStoredProblems(list);
          autoAcNotified = true;
          isExpanded = true;
          render();
        }
      }
    }
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCapsule);
} else {
  initCapsule();
}
