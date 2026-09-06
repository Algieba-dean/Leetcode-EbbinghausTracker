// Content Script for LeetCode pages (leetcode.cn / leetcode.com)
// Injected via Shadow DOM to prevent any CSS collision with LeetCode.

import { Problem, ReviewGrade, Difficulty } from '../types';
import { calculateSM2, getTodayString } from '../utils/ebbinghaus';

const STORAGE_KEY_PROBLEMS = 'lc_ebbinghaus_problems';

function extractProblemFromPage(): { slug: string; number: string; title: string; difficulty: Difficulty } {
  const pathname = window.location.pathname; // /problems/reverse-linked-list/
  const match = pathname.match(/\/problems\/([^/]+)/);
  const slug = match ? match[1] : '';

  // Extract from title: "206. 反转链表 - 力扣（LeetCode）"
  const docTitle = document.title || '';
  const titleMatch = docTitle.match(/^(\d+)\.\s*([^-—|]+)/);

  let number = '';
  let title = slug;
  if (titleMatch) {
    number = titleMatch[1];
    title = titleMatch[2].trim();
  }

  // Difficulty fallback or heuristic
  let difficulty: Difficulty = 'Medium';
  const textContent = document.body.innerText || '';
  if (textContent.includes('简单') || textContent.includes('Easy')) {
    difficulty = 'Easy';
  } else if (textContent.includes('困难') || textContent.includes('Hard')) {
    difficulty = 'Hard';
  }

  return { slug, number, title, difficulty };
}

async function getStoredProblems(): Promise<Problem[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_KEY_PROBLEMS], (res) => {
      resolve(res[STORAGE_KEY_PROBLEMS] || []);
    });
  });
}

async function saveStoredProblems(list: Problem[]): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY_PROBLEMS]: list }, () => {
      chrome.runtime.sendMessage({ type: 'UPDATE_BADGE' });
      resolve();
    });
  });
}

function renderFloatingWidget(): void {
  // Prevent duplicate injection
  if (document.getElementById('lc-ebbinghaus-capsule-host')) return;

  const host = document.createElement('div');
  host.id = 'lc-ebbinghaus-capsule-host';
  host.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 999999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: 'open' });

  // Stylesheet inside Shadow Root
  const style = document.createElement('style');
  style.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    .card {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 12px 14px;
      color: #f8fafc;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px -3px rgba(16, 185, 129, 0.15);
      width: 290px;
      font-size: 12px;
      transition: all 0.2s ease;
      user-select: none;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
      color: #34d399;
      font-size: 12px;
    }
    .badge {
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 4px;
      background: #1e293b;
      border: 1px solid #475569;
      color: #cbd5e1;
      font-family: monospace;
    }
    .info {
      font-size: 11px;
      color: #94a3b8;
      margin-bottom: 8px;
      line-height: 1.4;
    }
    .info strong {
      color: #e2e8f0;
    }
    .btn-group {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      margin-top: 6px;
    }
    .btn-rate {
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
    .btn-rate:hover { filter: brightness(1.2); }
    .btn-rate.again { border-color: rgba(239, 68, 68, 0.4); color: #f87171; background: rgba(239, 68, 68, 0.1); }
    .btn-rate.hard { border-color: rgba(245, 158, 11, 0.4); color: #fbbf24; background: rgba(245, 158, 11, 0.1); }
    .btn-rate.good { border-color: rgba(16, 185, 129, 0.4); color: #34d399; background: rgba(16, 185, 129, 0.1); }
    .btn-rate.easy { border-color: rgba(14, 165, 233, 0.4); color: #38bdf8; background: rgba(14, 165, 233, 0.1); }
    .btn-add {
      width: 100%;
      background: #059669;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 7px 10px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 11px;
      transition: background 0.15s;
    }
    .btn-add:hover { background: #10b981; }
    .notes-input {
      width: 100%;
      background: #020617;
      border: 1px solid #334155;
      color: #f8fafc;
      border-radius: 6px;
      padding: 6px 8px;
      font-size: 11px;
      margin-bottom: 6px;
      outline: none;
    }
    .notes-input:focus { border-color: #10b981; }
    .success-pill {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399;
      border-radius: 6px;
      padding: 6px;
      text-align: center;
      font-weight: 500;
      font-size: 11px;
    }
  `;
  shadow.appendChild(style);

  const container = document.createElement('div');
  container.className = 'card';
  shadow.appendChild(container);

  async function updateView() {
    const meta = extractProblemFromPage();
    if (!meta.slug) return;

    const problems = await getStoredProblems();
    const existing = problems.find((p) => p.slug === meta.slug || (meta.number && p.number === meta.number));

    if (existing) {
      const today = getTodayString();
      const isReviewed = existing.lastReviewedDate === today;

      container.innerHTML = `
        <div class="header">
          <div class="brand">
            <span>🧠 艾宾浩斯复习</span>
          </div>
          <span class="badge">#${existing.number || meta.number || ''}</span>
        </div>
        <div class="info">
          轮次: <strong>第 ${existing.repetition + 1} 轮</strong> · 间隔 <strong>${existing.interval} 天</strong><br>
          ${isReviewed ? `<span style="color: #34d399">✅ 今日已复习 (下次: ${existing.nextReviewDate})</span>` : `下次复习: <strong>${existing.nextReviewDate}</strong>`}
        </div>
        ${
          isReviewed
            ? `<div class="success-pill">🎉 记忆已刷新！</div>`
            : `
          <div style="font-size: 10px; color: #94a3b8; margin-bottom: 4px;">做完题目后一键评定：</div>
          <div class="btn-group">
            <button class="btn-rate again" data-grade="1">重来</button>
            <button class="btn-rate hard" data-grade="2">困难</button>
            <button class="btn-rate good" data-grade="3">良好</button>
            <button class="btn-rate easy" data-grade="4">熟练</button>
          </div>
        `
        }
      `;

      container.querySelectorAll('.btn-rate').forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const target = e.currentTarget as HTMLElement;
          const grade = Number(target.dataset.grade) as ReviewGrade;
          const update = calculateSM2(existing, grade, today);

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
          updateView();
        });
      });
    } else {
      // Not tracked yet
      container.innerHTML = `
        <div class="header">
          <div class="brand">
            <span>🧠 艾宾浩斯复习</span>
          </div>
          <span class="badge">未纳入</span>
        </div>
        <div class="info">
          将 <strong>${meta.title || meta.slug}</strong> 纳入间隔重复计划。
        </div>
        <input type="text" id="capsule-notes" class="notes-input" placeholder="可记录一两句核心破局思路..." />
        <button id="capsule-add-btn" class="btn-add">
          <span>+ 纳入艾宾浩斯复习</span>
        </button>
      `;

      const addBtn = container.querySelector('#capsule-add-btn');
      addBtn?.addEventListener('click', async () => {
        const input = container.querySelector('#capsule-notes') as HTMLInputElement;
        const notes = input ? input.value.trim() : '';

        const newProblem: Problem = {
          id: `lc-${meta.slug}`,
          number: meta.number || '0',
          title: meta.title || meta.slug,
          slug: meta.slug,
          url: window.location.href,
          difficulty: meta.difficulty,
          tags: ['力扣'],
          notes,
          createdAt: Date.now(),
          repetition: 0,
          interval: 1,
          easeFactor: 2.5,
          nextReviewDate: getTodayString(), // due today
          history: [],
        };

        const list = await getStoredProblems();
        list.unshift(newProblem);
        await saveStoredProblems(list);
        updateView();
      });
    }
  }

  updateView();
  // Poll title in case LeetCode client-side router changes page
  let lastUrl = window.location.href;
  setInterval(() => {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;
      updateView();
    }
  }, 2000);
}

// Initialize when ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderFloatingWidget);
} else {
  renderFloatingWidget();
}
