(function(exports) {
  "use strict";
  const DEFAULT_EBBINGHAUS_LADDER = [1, 2, 4, 7, 15, 30, 60, 120];
  function getTodayString(d = /* @__PURE__ */ new Date()) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  function addDays(dateStr, days) {
    const d = /* @__PURE__ */ new Date(dateStr + "T00:00:00");
    d.setDate(d.getDate() + days);
    return getTodayString(d);
  }
  function calculateSM2(problem, grade, reviewDate = getTodayString(), ladder = DEFAULT_EBBINGHAUS_LADDER) {
    let rep = problem.repetition ?? 0;
    let ease = problem.easeFactor || 2.5;
    let nextInterval;
    switch (grade) {
      case 1:
        rep = 0;
        nextInterval = ladder[0] || 1;
        ease = Math.max(1.3, ease - 0.2);
        break;
      case 2:
        nextInterval = ladder[Math.min(rep, ladder.length - 1)] || 1;
        ease = Math.max(1.3, ease - 0.15);
        break;
      case 3:
        rep = rep + 1;
        if (rep < ladder.length) {
          nextInterval = ladder[rep];
        } else {
          const last = ladder[ladder.length - 1];
          nextInterval = Math.max(last + 15, Math.round(problem.interval * ease));
        }
        break;
      case 4:
        rep = rep + 2;
        if (rep < ladder.length) {
          nextInterval = ladder[rep];
        } else {
          const last = ladder[ladder.length - 1];
          nextInterval = Math.max(last + 30, Math.round(problem.interval * ease * 1.3));
        }
        ease = Math.min(3.5, ease + 0.15);
        break;
    }
    const nextReviewDate = addDays(reviewDate, nextInterval);
    return {
      repetition: rep,
      interval: nextInterval,
      easeFactor: Number(ease.toFixed(2)),
      nextReviewDate
    };
  }
  const GRADE_CONFIG = {
    1: {
      grade: 1,
      name: "重来",
      sub: "完全卡壳",
      getNextDays: (_rep, _int, ladder = DEFAULT_EBBINGHAUS_LADDER) => `${ladder[0] || 1}天后`
    },
    2: {
      grade: 2,
      name: "困难",
      sub: "勉强写出",
      getNextDays: (rep, _int, ladder = DEFAULT_EBBINGHAUS_LADDER) => {
        const days = ladder[Math.min(rep, ladder.length - 1)] || 1;
        return `${days}天后`;
      }
    },
    3: {
      grade: 3,
      name: "良好",
      sub: "独立AC",
      getNextDays: (rep, int, ladder = DEFAULT_EBBINGHAUS_LADDER) => {
        const nextIdx = rep + 1;
        if (nextIdx < ladder.length) {
          return `${ladder[nextIdx]}天后`;
        }
        return `${Math.round(int * 2.5)}天后`;
      }
    },
    4: {
      grade: 4,
      name: "简单",
      sub: "秒杀跳阶",
      getNextDays: (rep, int, ladder = DEFAULT_EBBINGHAUS_LADDER) => {
        const nextIdx = rep + 2;
        if (nextIdx < ladder.length) {
          return `${ladder[nextIdx]}天后`;
        }
        return `${Math.round(int * 3.2)}天后`;
      }
    }
  };
  const STORAGE_KEY_PROBLEMS = "lc_ebbinghaus_problems";
  const STORAGE_KEY_SETTINGS = "lc_ebbinghaus_settings";
  function extractProblemFromPage() {
    const pathname = window.location.pathname;
    const match = pathname.match(/\/problems\/([^/]+)/);
    const slug = match ? match[1] : "";
    let number = "";
    let title = "";
    let difficulty = "Medium";
    const tags = ["力扣"];
    const docTitle = document.title || "";
    const titleRegex = /^(\d+)[\.\s、]+([^-—|]+)/;
    const titleMatch = docTitle.match(titleRegex);
    if (titleMatch) {
      number = titleMatch[1].trim();
      title = titleMatch[2].trim();
    }
    const titleElem = document.querySelector('div[data-cypress="QuestionTitle"]') || document.querySelector(".text-title-large") || document.querySelector("h4");
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
    if (!title && slug) {
      title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
    const pageText = document.body.innerText || "";
    const easyElem = document.querySelector('.text-difficulty-easy, [class*="text-olive"]');
    const hardElem = document.querySelector('.text-difficulty-hard, [class*="text-pink"]');
    const mediumElem = document.querySelector('.text-difficulty-medium, [class*="text-yellow"]');
    if (easyElem || pageText.includes("简单") || pageText.includes("Easy")) {
      difficulty = "Easy";
    } else if (hardElem || pageText.includes("困难") || pageText.includes("Hard")) {
      difficulty = "Hard";
    } else if (mediumElem || pageText.includes("中等") || pageText.includes("Medium")) {
      difficulty = "Medium";
    }
    document.querySelectorAll('a[href*="/tag/"]').forEach((el) => {
      var _a;
      const text = (_a = el.textContent) == null ? void 0 : _a.trim();
      if (text && !tags.includes(text)) tags.push(text);
    });
    return { slug, number: number || "0", title, difficulty, tags };
  }
  function checkSubmissionAccepted() {
    const resultLocator = document.querySelector('[data-e2e-locator="submission-result"]');
    if (resultLocator) {
      const text = (resultLocator.textContent || "").trim();
      if (text === "通过" || text === "Accepted" || text.startsWith("通过\n") || text.startsWith("Accepted\n")) {
        return true;
      }
    }
    const resultBadges = document.querySelectorAll(
      '[class*="text-green"], [class*="text-olive"], [data-cypress*="submission"], [class*="status-success"]'
    );
    for (const el of resultBadges) {
      const text = (el.textContent || "").trim();
      if (text === "通过" || text === "Accepted") {
        return true;
      }
    }
    return false;
  }
  function isExtensionValid() {
    try {
      return typeof chrome !== "undefined" && !!chrome.runtime && !!chrome.runtime.id;
    } catch {
      return false;
    }
  }
  function safeSendMessage(message) {
    if (!isExtensionValid()) return;
    try {
      chrome.runtime.sendMessage(message, () => {
        if (chrome.runtime.lastError) {
        }
      });
    } catch {
    }
  }
  async function getStoredProblems() {
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
  async function getStoredLadder() {
    if (!isExtensionValid()) return DEFAULT_EBBINGHAUS_LADDER;
    return new Promise((resolve) => {
      try {
        chrome.storage.local.get([STORAGE_KEY_SETTINGS], (res) => {
          if (chrome.runtime.lastError) {
            resolve(DEFAULT_EBBINGHAUS_LADDER);
            return;
          }
          const s = res[STORAGE_KEY_SETTINGS];
          resolve((s == null ? void 0 : s.ladder) || DEFAULT_EBBINGHAUS_LADDER);
        });
      } catch {
        resolve(DEFAULT_EBBINGHAUS_LADDER);
      }
    });
  }
  async function saveStoredProblems(list) {
    if (!isExtensionValid()) return;
    return new Promise((resolve) => {
      try {
        chrome.storage.local.set({ [STORAGE_KEY_PROBLEMS]: list }, () => {
          if (chrome.runtime.lastError) {
            resolve();
            return;
          }
          safeSendMessage({ type: "UPDATE_BADGE" });
          resolve();
        });
      } catch {
        resolve();
      }
    });
  }
  function initCapsule() {
    if (!window.location.pathname.includes("/problems/")) return;
    if (document.getElementById("lc-ebbinghaus-capsule-host")) return;
    const host = document.createElement("div");
    host.id = "lc-ebbinghaus-capsule-host";
    host.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
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
    const wrapper = document.createElement("div");
    shadow.appendChild(wrapper);
    let isExpanded = false;
    let autoAcNotified = false;
    async function render() {
      var _a, _b;
      const meta = extractProblemFromPage();
      if (!meta.slug) return;
      const problems = await getStoredProblems();
      const ladder = await getStoredLadder();
      const existing = problems.find(
        (p) => p.slug === meta.slug || meta.number !== "0" && p.number === meta.number
      );
      wrapper.innerHTML = "";
      const pill = document.createElement("button");
      pill.className = `capsule-btn ${isExpanded ? "active" : ""}`;
      if (existing) {
        const today = getTodayString();
        const isDue = existing.nextReviewDate <= today;
        pill.innerHTML = `
        <span class="pulse-dot ${isDue ? "amber" : ""}"></span>
        <span>🧠 艾宾浩斯: 第${existing.repetition + 1}阶 (${existing.interval}d)</span>
      `;
      } else {
        pill.innerHTML = `
        <span class="pulse-dot"></span>
        <span>🧠 艾宾浩斯: 一键收录</span>
      `;
      }
      pill.onclick = () => {
        isExpanded = !isExpanded;
        render();
      };
      wrapper.appendChild(pill);
      if (isExpanded) {
        const panel = document.createElement("div");
        panel.className = "panel";
        if (existing) {
          const today = getTodayString();
          const isReviewedToday = existing.lastReviewedDate === today;
          panel.innerHTML = `
          ${autoAcNotified ? `<div class="auto-ac-banner">🎉 检测到提交通过！已自动记录。</div>` : ""}

          <div class="panel-header">
            <div class="title-row">
              <span>🧠 艾宾浩斯复习</span>
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
            <div>当前阶段：<strong>第 ${existing.repetition + 1} 阶</strong> (间隔 ${existing.interval} 天)</div>
            <div>下次复习：<strong>${existing.nextReviewDate}</strong></div>
            ${isReviewedToday ? `<div style="color: #34d399; margin-top: 3px;">✅ 今日复习已打卡！</div>` : `<div style="color: #f59e0b; margin-top: 3px;">⏱️ 今日待做题并评定</div>`}
          </div>

          ${isReviewedToday ? `<div class="done-banner">🎉 记忆已刷新至下个周期！</div>` : `
            <div style="font-size: 11px; color: #94a3b8; margin-bottom: 4px;">做完后评定记忆熟练度：</div>
            <div class="btn-grid">
              <button class="rate-btn again" data-grade="1">
                <div>重来</div>
                <div style="font-size: 9px; opacity: 0.75;">${GRADE_CONFIG[1].getNextDays(existing.repetition, existing.interval, ladder)}</div>
              </button>
              <button class="rate-btn hard" data-grade="2">
                <div>困难</div>
                <div style="font-size: 9px; opacity: 0.75;">${GRADE_CONFIG[2].getNextDays(existing.repetition, existing.interval, ladder)}</div>
              </button>
              <button class="rate-btn good" data-grade="3">
                <div>良好</div>
                <div style="font-size: 9px; opacity: 0.75;">${GRADE_CONFIG[3].getNextDays(existing.repetition, existing.interval, ladder)}</div>
              </button>
              <button class="rate-btn easy" data-grade="4">
                <div>简单</div>
                <div style="font-size: 9px; opacity: 0.75;">${GRADE_CONFIG[4].getNextDays(existing.repetition, existing.interval, ladder)}</div>
              </button>
            </div>
          `}

          <div class="footer-actions">
            <span style="color: #64748b;">艾宾浩斯跟踪中</span>
            <button id="capsule-remove-btn" class="del-btn">从复习库移除此题</button>
          </div>
        `;
          panel.querySelectorAll(".rate-btn").forEach((btn) => {
            btn.addEventListener("click", async (e) => {
              const btnEl = e.currentTarget;
              const grade = Number(btnEl.dataset.grade);
              const update = calculateSM2(existing, grade, today, ladder);
              const updated = {
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
                    easeFactor: update.easeFactor
                  },
                  ...existing.history || []
                ]
              };
              const list = await getStoredProblems();
              const idx = list.findIndex((p) => p.id === existing.id);
              if (idx >= 0) list[idx] = updated;
              await saveStoredProblems(list);
              render();
            });
          });
          (_a = panel.querySelector("#capsule-remove-btn")) == null ? void 0 : _a.addEventListener("click", async () => {
            if (confirm(`确定从艾宾浩斯复习库中移除题目 #${existing.number} ${existing.title} 吗？`)) {
              const list = await getStoredProblems();
              const filtered = list.filter((p) => p.id !== existing.id);
              await saveStoredProblems(filtered);
              render();
            }
          });
        } else {
          panel.innerHTML = `
          <div class="panel-header">
            <div class="title-row">
              <span>🧠 艾宾浩斯复习计划</span>
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
            已自动识别题目信息。点击下方按钮即可一键纳入，明天准时开启第 1 轮复习！
          </p>

          <textarea id="capsule-notes-input" class="textarea-notes" placeholder="关键解题思路或易错点卡片 (选填)..."></textarea>

          <button id="capsule-submit-add" class="add-action-btn">
            <span>🚀 一键纳入艾宾浩斯复习</span>
          </button>
        `;
          (_b = panel.querySelector("#capsule-submit-add")) == null ? void 0 : _b.addEventListener("click", async () => {
            const textarea = panel.querySelector("#capsule-notes-input");
            const notes = textarea ? textarea.value.trim() : "";
            const newProblem = {
              id: `lc-${meta.slug || Date.now()}`,
              number: meta.number || "0",
              title: meta.title || meta.slug,
              slug: meta.slug,
              url: window.location.href,
              difficulty: meta.difficulty,
              tags: meta.tags,
              notes,
              createdAt: Date.now(),
              repetition: 0,
              interval: 1,
              // 1st stage
              easeFactor: 2.5,
              nextReviewDate: getTodayString(),
              isSample: false,
              history: []
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
            const newProblem = {
              id: `lc-${meta.slug || Date.now()}`,
              number: meta.number || "0",
              title: meta.title || meta.slug,
              slug: meta.slug,
              url: window.location.href,
              difficulty: meta.difficulty,
              tags: meta.tags,
              notes: "做题提交通过，自动收录",
              createdAt: Date.now(),
              repetition: 0,
              interval: 1,
              easeFactor: 2.5,
              nextReviewDate: getTodayString(),
              isSample: false,
              history: []
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
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCapsule);
  } else {
    initCapsule();
  }
  exports.checkSubmissionAccepted = checkSubmissionAccepted;
  exports.extractProblemFromPage = extractProblemFromPage;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
})(this.LeetCodeContentScript = this.LeetCodeContentScript || {});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2ViYmluZ2hhdXMudHMiLCIuLi8uLi9zcmMvY29udGVudC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9ibGVtLCBSZXZpZXdHcmFkZSB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRUJCSU5HSEFVU19MQURERVIgPSBbMSwgMiwgNCwgNywgMTUsIDMwLCA2MCwgMTIwXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvZGF5U3RyaW5nKGQ6IERhdGUgPSBuZXcgRGF0ZSgpKTogc3RyaW5nIHtcbiAgY29uc3QgeWVhciA9IGQuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoZC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgZGF5ID0gU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpO1xuICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZERheXMoZGF0ZVN0cjogc3RyaW5nLCBkYXlzOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZVN0ciArICdUMDA6MDA6MDAnKTtcbiAgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpICsgZGF5cyk7XG4gIHJldHVybiBnZXRUb2RheVN0cmluZyhkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpZmZEYXlzKGRhdGVTdHIxOiBzdHJpbmcsIGRhdGVTdHIyOiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBkMSA9IG5ldyBEYXRlKGRhdGVTdHIxICsgJ1QwMDowMDowMCcpLmdldFRpbWUoKTtcbiAgY29uc3QgZDIgPSBuZXcgRGF0ZShkYXRlU3RyMiArICdUMDA6MDA6MDAnKS5nZXRUaW1lKCk7XG4gIHJldHVybiBNYXRoLnJvdW5kKChkMSAtIGQyKSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG59XG5cbi8qKlxuICog57uP5YW46Im+5a6+5rWp5pav6Zi25qKvICsgU00tMiDmmbrog73ot4Pov4HosIPluqZcbiAqIOmYtuair+m7mOiupOS4uu+8mjHlpKkgLT4gMuWkqSAtPiA05aSpIC0+IDflpKkgLT4gMTXlpKkgLT4gMzDlpKkgLT4gNjDlpKkgLT4gMTIw5aSpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVTTTIoXG4gIHByb2JsZW06IFByb2JsZW0sXG4gIGdyYWRlOiBSZXZpZXdHcmFkZSxcbiAgcmV2aWV3RGF0ZTogc3RyaW5nID0gZ2V0VG9kYXlTdHJpbmcoKSxcbiAgbGFkZGVyOiBudW1iZXJbXSA9IERFRkFVTFRfRUJCSU5HSEFVU19MQURERVJcbik6IHtcbiAgcmVwZXRpdGlvbjogbnVtYmVyO1xuICBpbnRlcnZhbDogbnVtYmVyO1xuICBlYXNlRmFjdG9yOiBudW1iZXI7XG4gIG5leHRSZXZpZXdEYXRlOiBzdHJpbmc7XG59IHtcbiAgbGV0IHJlcCA9IHByb2JsZW0ucmVwZXRpdGlvbiA/PyAwO1xuICBsZXQgZWFzZSA9IHByb2JsZW0uZWFzZUZhY3RvciB8fCAyLjU7XG4gIGxldCBuZXh0SW50ZXJ2YWw6IG51bWJlcjtcblxuICBzd2l0Y2ggKGdyYWRlKSB7XG4gICAgY2FzZSAxOiAvLyBBZ2FpbiAo6YeN5p2lIMK3IOWujOWFqOmBl+W/mClcbiAgICAgIHJlcCA9IDA7XG4gICAgICBuZXh0SW50ZXJ2YWwgPSBsYWRkZXJbMF0gfHwgMTtcbiAgICAgIGVhc2UgPSBNYXRoLm1heCgxLjMsIGVhc2UgLSAwLjIpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDI6IC8vIEhhcmQgKOWbsOmaviDCtyDli4nlvLrlgZrlh7opXG4gICAgICAvLyDkv53mjIHlnKjlvZPliY3pmLbmoq/vvIzlt6nlm7rlvZPliY3lkajmnJ9cbiAgICAgIG5leHRJbnRlcnZhbCA9IGxhZGRlcltNYXRoLm1pbihyZXAsIGxhZGRlci5sZW5ndGggLSAxKV0gfHwgMTtcbiAgICAgIGVhc2UgPSBNYXRoLm1heCgxLjMsIGVhc2UgLSAwLjE1KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAzOiAvLyBHb29kICjoia/lpb0gwrcg56iz5q2l5o6o6L+bKVxuICAgICAgLy8g6YCS5aKe5LiA6Zi2XG4gICAgICByZXAgPSByZXAgKyAxO1xuICAgICAgaWYgKHJlcCA8IGxhZGRlci5sZW5ndGgpIHtcbiAgICAgICAgbmV4dEludGVydmFsID0gbGFkZGVyW3JlcF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDotoXlh7rpmLbmoq/lkI7mjInlpI3liKnlgI3lop5cbiAgICAgICAgY29uc3QgbGFzdCA9IGxhZGRlcltsYWRkZXIubGVuZ3RoIC0gMV07XG4gICAgICAgIG5leHRJbnRlcnZhbCA9IE1hdGgubWF4KGxhc3QgKyAxNSwgTWF0aC5yb3VuZChwcm9ibGVtLmludGVydmFsICogZWFzZSkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDQ6IC8vIEVhc3kgKOeGn+e7gyDCtyDot7Pnuqfnp5LmnYApXG4gICAgICAvLyDot7Pot4PkuKTpmLbvvIFcbiAgICAgIHJlcCA9IHJlcCArIDI7XG4gICAgICBpZiAocmVwIDwgbGFkZGVyLmxlbmd0aCkge1xuICAgICAgICBuZXh0SW50ZXJ2YWwgPSBsYWRkZXJbcmVwXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGxhc3QgPSBsYWRkZXJbbGFkZGVyLmxlbmd0aCAtIDFdO1xuICAgICAgICBuZXh0SW50ZXJ2YWwgPSBNYXRoLm1heChsYXN0ICsgMzAsIE1hdGgucm91bmQocHJvYmxlbS5pbnRlcnZhbCAqIGVhc2UgKiAxLjMpKTtcbiAgICAgIH1cbiAgICAgIGVhc2UgPSBNYXRoLm1pbigzLjUsIGVhc2UgKyAwLjE1KTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgY29uc3QgbmV4dFJldmlld0RhdGUgPSBhZGREYXlzKHJldmlld0RhdGUsIG5leHRJbnRlcnZhbCk7XG5cbiAgcmV0dXJuIHtcbiAgICByZXBldGl0aW9uOiByZXAsXG4gICAgaW50ZXJ2YWw6IG5leHRJbnRlcnZhbCxcbiAgICBlYXNlRmFjdG9yOiBOdW1iZXIoZWFzZS50b0ZpeGVkKDIpKSxcbiAgICBuZXh0UmV2aWV3RGF0ZSxcbiAgfTtcbn1cblxuLyoqXG4gKiDpooTkvLDlvZPliY3popjnm67nmoTorrDlv4bnlZnlrZjnjocgKDAgLSAxMDAlKVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlUmV0ZW50aW9uUmF0ZShwcm9ibGVtOiBQcm9ibGVtLCBjdXJyZW50RGF0ZTogc3RyaW5nID0gZ2V0VG9kYXlTdHJpbmcoKSk6IG51bWJlciB7XG4gIGlmICghcHJvYmxlbS5sYXN0UmV2aWV3ZWREYXRlKSB7XG4gICAgcmV0dXJuIDEwMDtcbiAgfVxuICBjb25zdCBkYXlzRWxhcHNlZCA9IE1hdGgubWF4KDAsIGRpZmZEYXlzKGN1cnJlbnREYXRlLCBwcm9ibGVtLmxhc3RSZXZpZXdlZERhdGUpKTtcbiAgaWYgKGRheXNFbGFwc2VkID09PSAwKSByZXR1cm4gMTAwO1xuXG4gIGNvbnN0IHN0YWJpbGl0eSA9IE1hdGgubWF4KDEsIHByb2JsZW0uaW50ZXJ2YWwgKiAocHJvYmxlbS5lYXNlRmFjdG9yIC8gMi41KSk7XG4gIGNvbnN0IHJldGVudGlvbiA9IE1hdGguZXhwKC1kYXlzRWxhcHNlZCAvIHN0YWJpbGl0eSk7XG4gIHJldHVybiBNYXRoLm1heCgxMCwgTWF0aC5taW4oMTAwLCBNYXRoLnJvdW5kKHJldGVudGlvbiAqIDEwMCkpKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHcmFkZU1ldGEge1xuICBncmFkZTogUmV2aWV3R3JhZGU7XG4gIG5hbWU6IHN0cmluZztcbiAgc3ViOiBzdHJpbmc7XG4gIGdldE5leHREYXlzOiAocmVwOiBudW1iZXIsIGludGVydmFsOiBudW1iZXIsIGxhZGRlcj86IG51bWJlcltdKSA9PiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBHUkFERV9DT05GSUc6IFJlY29yZDxSZXZpZXdHcmFkZSwgR3JhZGVNZXRhPiA9IHtcbiAgMToge1xuICAgIGdyYWRlOiAxLFxuICAgIG5hbWU6ICfph43mnaUnLFxuICAgIHN1YjogJ+WujOWFqOWNoeWjsycsXG4gICAgZ2V0TmV4dERheXM6IChfcmVwLCBfaW50LCBsYWRkZXIgPSBERUZBVUxUX0VCQklOR0hBVVNfTEFEREVSKSA9PiBgJHtsYWRkZXJbMF0gfHwgMX3lpKnlkI5gLFxuICB9LFxuICAyOiB7XG4gICAgZ3JhZGU6IDIsXG4gICAgbmFtZTogJ+WbsOmavicsXG4gICAgc3ViOiAn5YuJ5by65YaZ5Ye6JyxcbiAgICBnZXROZXh0RGF5czogKHJlcCwgX2ludCwgbGFkZGVyID0gREVGQVVMVF9FQkJJTkdIQVVTX0xBRERFUikgPT4ge1xuICAgICAgY29uc3QgZGF5cyA9IGxhZGRlcltNYXRoLm1pbihyZXAsIGxhZGRlci5sZW5ndGggLSAxKV0gfHwgMTtcbiAgICAgIHJldHVybiBgJHtkYXlzfeWkqeWQjmA7XG4gICAgfSxcbiAgfSxcbiAgMzoge1xuICAgIGdyYWRlOiAzLFxuICAgIG5hbWU6ICfoia/lpb0nLFxuICAgIHN1YjogJ+eLrOeri0FDJyxcbiAgICBnZXROZXh0RGF5czogKHJlcCwgaW50LCBsYWRkZXIgPSBERUZBVUxUX0VCQklOR0hBVVNfTEFEREVSKSA9PiB7XG4gICAgICBjb25zdCBuZXh0SWR4ID0gcmVwICsgMTtcbiAgICAgIGlmIChuZXh0SWR4IDwgbGFkZGVyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gYCR7bGFkZGVyW25leHRJZHhdfeWkqeWQjmA7XG4gICAgICB9XG4gICAgICByZXR1cm4gYCR7TWF0aC5yb3VuZChpbnQgKiAyLjUpfeWkqeWQjmA7XG4gICAgfSxcbiAgfSxcbiAgNDoge1xuICAgIGdyYWRlOiA0LFxuICAgIG5hbWU6ICfnroDljZUnLFxuICAgIHN1YjogJ+enkuadgOi3s+mYticsXG4gICAgZ2V0TmV4dERheXM6IChyZXAsIGludCwgbGFkZGVyID0gREVGQVVMVF9FQkJJTkdIQVVTX0xBRERFUikgPT4ge1xuICAgICAgY29uc3QgbmV4dElkeCA9IHJlcCArIDI7XG4gICAgICBpZiAobmV4dElkeCA8IGxhZGRlci5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGAke2xhZGRlcltuZXh0SWR4XX3lpKnlkI5gO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGAke01hdGgucm91bmQoaW50ICogMy4yKX3lpKnlkI5gO1xuICAgIH0sXG4gIH0sXG59O1xuIiwiLy8gQ29udGVudCBTY3JpcHQgZm9yIExlZXRDb2RlIChsZWV0Y29kZS5jbiAvIGxlZXRjb2RlLmNvbSlcbi8vIEJ1aWx0IHdpdGggU2hhZG93IERPTSBmb3IgY29tcGxldGUgQ1NTIGlzb2xhdGlvbiBhbmQgcm9idXN0IExlZXRDb2RlIERPTSBwYXJzaW5nLlxuXG5pbXBvcnQgeyBQcm9ibGVtLCBSZXZpZXdHcmFkZSwgRGlmZmljdWx0eSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNhbGN1bGF0ZVNNMiwgZ2V0VG9kYXlTdHJpbmcsIERFRkFVTFRfRUJCSU5HSEFVU19MQURERVIsIEdSQURFX0NPTkZJRyB9IGZyb20gJy4uL3V0aWxzL2ViYmluZ2hhdXMnO1xuXG5jb25zdCBTVE9SQUdFX0tFWV9QUk9CTEVNUyA9ICdsY19lYmJpbmdoYXVzX3Byb2JsZW1zJztcbmNvbnN0IFNUT1JBR0VfS0VZX1NFVFRJTkdTID0gJ2xjX2ViYmluZ2hhdXNfc2V0dGluZ3MnO1xuXG5pbnRlcmZhY2UgUGFnZU1ldGEge1xuICBzbHVnOiBzdHJpbmc7XG4gIG51bWJlcjogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBkaWZmaWN1bHR5OiBEaWZmaWN1bHR5O1xuICB0YWdzOiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RQcm9ibGVtRnJvbVBhZ2UoKTogUGFnZU1ldGEge1xuICBjb25zdCBwYXRobmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgY29uc3QgbWF0Y2ggPSBwYXRobmFtZS5tYXRjaCgvXFwvcHJvYmxlbXNcXC8oW14vXSspLyk7XG4gIGNvbnN0IHNsdWcgPSBtYXRjaCA/IG1hdGNoWzFdIDogJyc7XG5cbiAgbGV0IG51bWJlciA9ICcnO1xuICBsZXQgdGl0bGUgPSAnJztcbiAgbGV0IGRpZmZpY3VsdHk6IERpZmZpY3VsdHkgPSAnTWVkaXVtJztcbiAgY29uc3QgdGFnczogc3RyaW5nW10gPSBbJ+WKm+aJoyddO1xuXG4gIC8vIDEuIFRyeSBleHRyYWN0aW5nIGZyb20gZG9jdW1lbnQudGl0bGU6IFwiMS4g5Lik5pWw5LmL5ZKMIC0g5Yqb5omj77yITGVldENvZGXvvIlcIiBvciBcIjEuIFR3byBTdW0gLSBMZWV0Q29kZVwiXG4gIGNvbnN0IGRvY1RpdGxlID0gZG9jdW1lbnQudGl0bGUgfHwgJyc7XG4gIGNvbnN0IHRpdGxlUmVnZXggPSAvXihcXGQrKVtcXC5cXHPjgIFdKyhbXi3igJR8XSspLztcbiAgY29uc3QgdGl0bGVNYXRjaCA9IGRvY1RpdGxlLm1hdGNoKHRpdGxlUmVnZXgpO1xuXG4gIGlmICh0aXRsZU1hdGNoKSB7XG4gICAgbnVtYmVyID0gdGl0bGVNYXRjaFsxXS50cmltKCk7XG4gICAgdGl0bGUgPSB0aXRsZU1hdGNoWzJdLnRyaW0oKTtcbiAgfVxuXG4gIC8vIDIuIERPTSBleHRyYWN0aW9uIGhldXJpc3RpY3MgZm9yIG1vZGVybiBMZWV0Q29kZVxuICBjb25zdCB0aXRsZUVsZW0gPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltkYXRhLWN5cHJlc3M9XCJRdWVzdGlvblRpdGxlXCJdJykgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC10aXRsZS1sYXJnZScpIHx8XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDQnKTtcblxuICBpZiAodGl0bGVFbGVtICYmIHRpdGxlRWxlbS50ZXh0Q29udGVudCkge1xuICAgIGNvbnN0IHJhdyA9IHRpdGxlRWxlbS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgY29uc3QgZG9tTWF0Y2ggPSByYXcubWF0Y2goL14oXFxkKylbXFwuXFxz44CBXSsoLispLyk7XG4gICAgaWYgKGRvbU1hdGNoKSB7XG4gICAgICBudW1iZXIgPSBkb21NYXRjaFsxXS50cmltKCk7XG4gICAgICB0aXRsZSA9IGRvbU1hdGNoWzJdLnRyaW0oKTtcbiAgICB9IGVsc2UgaWYgKCF0aXRsZSkge1xuICAgICAgdGl0bGUgPSByYXc7XG4gICAgfVxuICB9XG5cbiAgLy8gRmFsbGJhY2sgdGl0bGUgdG8gc2x1ZyBpZiBzdGlsbCBlbXB0eVxuICBpZiAoIXRpdGxlICYmIHNsdWcpIHtcbiAgICB0aXRsZSA9IHNsdWdcbiAgICAgIC5zcGxpdCgnLScpXG4gICAgICAubWFwKCh3KSA9PiB3LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdy5zbGljZSgxKSlcbiAgICAgIC5qb2luKCcgJyk7XG4gIH1cblxuICAvLyAzLiBEaWZmaWN1bHR5IGV4dHJhY3Rpb25cbiAgY29uc3QgcGFnZVRleHQgPSBkb2N1bWVudC5ib2R5LmlubmVyVGV4dCB8fCAnJztcbiAgY29uc3QgZWFzeUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1kaWZmaWN1bHR5LWVhc3ksIFtjbGFzcyo9XCJ0ZXh0LW9saXZlXCJdJyk7XG4gIGNvbnN0IGhhcmRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZGlmZmljdWx0eS1oYXJkLCBbY2xhc3MqPVwidGV4dC1waW5rXCJdJyk7XG4gIGNvbnN0IG1lZGl1bUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1kaWZmaWN1bHR5LW1lZGl1bSwgW2NsYXNzKj1cInRleHQteWVsbG93XCJdJyk7XG5cbiAgaWYgKGVhc3lFbGVtIHx8IHBhZ2VUZXh0LmluY2x1ZGVzKCfnroDljZUnKSB8fCBwYWdlVGV4dC5pbmNsdWRlcygnRWFzeScpKSB7XG4gICAgZGlmZmljdWx0eSA9ICdFYXN5JztcbiAgfSBlbHNlIGlmIChoYXJkRWxlbSB8fCBwYWdlVGV4dC5pbmNsdWRlcygn5Zuw6Zq+JykgfHwgcGFnZVRleHQuaW5jbHVkZXMoJ0hhcmQnKSkge1xuICAgIGRpZmZpY3VsdHkgPSAnSGFyZCc7XG4gIH0gZWxzZSBpZiAobWVkaXVtRWxlbSB8fCBwYWdlVGV4dC5pbmNsdWRlcygn5Lit562JJykgfHwgcGFnZVRleHQuaW5jbHVkZXMoJ01lZGl1bScpKSB7XG4gICAgZGlmZmljdWx0eSA9ICdNZWRpdW0nO1xuICB9XG5cbiAgLy8gNC4gVGFncyBleHRyYWN0aW9uXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZio9XCIvdGFnL1wiXScpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgY29uc3QgdGV4dCA9IGVsLnRleHRDb250ZW50Py50cmltKCk7XG4gICAgaWYgKHRleHQgJiYgIXRhZ3MuaW5jbHVkZXModGV4dCkpIHRhZ3MucHVzaCh0ZXh0KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHsgc2x1ZywgbnVtYmVyOiBudW1iZXIgfHwgJzAnLCB0aXRsZSwgZGlmZmljdWx0eSwgdGFncyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tTdWJtaXNzaW9uQWNjZXB0ZWQoKTogYm9vbGVhbiB7XG4gIGNvbnN0IHJlc3VsdExvY2F0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1lMmUtbG9jYXRvcj1cInN1Ym1pc3Npb24tcmVzdWx0XCJdJyk7XG4gIGlmIChyZXN1bHRMb2NhdG9yKSB7XG4gICAgY29uc3QgdGV4dCA9IChyZXN1bHRMb2NhdG9yLnRleHRDb250ZW50IHx8ICcnKS50cmltKCk7XG4gICAgaWYgKHRleHQgPT09ICfpgJrov4cnIHx8IHRleHQgPT09ICdBY2NlcHRlZCcgfHwgdGV4dC5zdGFydHNXaXRoKCfpgJrov4dcXG4nKSB8fCB0ZXh0LnN0YXJ0c1dpdGgoJ0FjY2VwdGVkXFxuJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlc3VsdEJhZGdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJ1tjbGFzcyo9XCJ0ZXh0LWdyZWVuXCJdLCBbY2xhc3MqPVwidGV4dC1vbGl2ZVwiXSwgW2RhdGEtY3lwcmVzcyo9XCJzdWJtaXNzaW9uXCJdLCBbY2xhc3MqPVwic3RhdHVzLXN1Y2Nlc3NcIl0nXG4gICk7XG4gIGZvciAoY29uc3QgZWwgb2YgcmVzdWx0QmFkZ2VzKSB7XG4gICAgY29uc3QgdGV4dCA9IChlbC50ZXh0Q29udGVudCB8fCAnJykudHJpbSgpO1xuICAgIGlmICh0ZXh0ID09PSAn6YCa6L+HJyB8fCB0ZXh0ID09PSAnQWNjZXB0ZWQnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzRXh0ZW5zaW9uVmFsaWQoKTogYm9vbGVhbiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHR5cGVvZiBjaHJvbWUgIT09ICd1bmRlZmluZWQnICYmICEhY2hyb21lLnJ1bnRpbWUgJiYgISFjaHJvbWUucnVudGltZS5pZDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNhZmVTZW5kTWVzc2FnZShtZXNzYWdlOiB7IHR5cGU6IHN0cmluZzsgW2tleTogc3RyaW5nXTogYW55IH0pOiB2b2lkIHtcbiAgaWYgKCFpc0V4dGVuc2lvblZhbGlkKCkpIHJldHVybjtcbiAgdHJ5IHtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShtZXNzYWdlLCAoKSA9PiB7XG4gICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgIC8vIENsZWFubHkgc3dhbGxvdyBhbnkgZGlzY29ubmVjdGVkIHBvcnQvd29ya2VyIGVycm9yc1xuICAgICAgfVxuICAgIH0pO1xuICB9IGNhdGNoIHtcbiAgICAvLyBJZ25vcmUgY29udGV4dCBpbnZhbGlkYXRpb25cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRTdG9yZWRQcm9ibGVtcygpOiBQcm9taXNlPFByb2JsZW1bXT4ge1xuICBpZiAoIWlzRXh0ZW5zaW9uVmFsaWQoKSkgcmV0dXJuIFtdO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICB0cnkge1xuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtTVE9SQUdFX0tFWV9QUk9CTEVNU10sIChyZXMpID0+IHtcbiAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlc1tTVE9SQUdFX0tFWV9QUk9CTEVNU10gfHwgW10pO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXNvbHZlKFtdKTtcbiAgICB9XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRTdG9yZWRMYWRkZXIoKTogUHJvbWlzZTxudW1iZXJbXT4ge1xuICBpZiAoIWlzRXh0ZW5zaW9uVmFsaWQoKSkgcmV0dXJuIERFRkFVTFRfRUJCSU5HSEFVU19MQURERVI7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1NUT1JBR0VfS0VZX1NFVFRJTkdTXSwgKHJlcykgPT4ge1xuICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgcmVzb2x2ZShERUZBVUxUX0VCQklOR0hBVVNfTEFEREVSKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcyA9IHJlc1tTVE9SQUdFX0tFWV9TRVRUSU5HU107XG4gICAgICAgIHJlc29sdmUocz8ubGFkZGVyIHx8IERFRkFVTFRfRUJCSU5HSEFVU19MQURERVIpO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXNvbHZlKERFRkFVTFRfRUJCSU5HSEFVU19MQURERVIpO1xuICAgIH1cbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNhdmVTdG9yZWRQcm9ibGVtcyhsaXN0OiBQcm9ibGVtW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFpc0V4dGVuc2lvblZhbGlkKCkpIHJldHVybjtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IFtTVE9SQUdFX0tFWV9QUk9CTEVNU106IGxpc3QgfSwgKCkgPT4ge1xuICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzYWZlU2VuZE1lc3NhZ2UoeyB0eXBlOiAnVVBEQVRFX0JBREdFJyB9KTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdENhcHN1bGUoKTogdm9pZCB7XG4gIGlmICghd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKCcvcHJvYmxlbXMvJykpIHJldHVybjtcbiAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsYy1lYmJpbmdoYXVzLWNhcHN1bGUtaG9zdCcpKSByZXR1cm47XG5cbiAgY29uc3QgaG9zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBob3N0LmlkID0gJ2xjLWViYmluZ2hhdXMtY2Fwc3VsZS1ob3N0JztcbiAgaG9zdC5zdHlsZS5jc3NUZXh0ID1cbiAgICAncG9zaXRpb246IGZpeGVkOyBib3R0b206IDIwcHg7IHJpZ2h0OiAyMHB4OyB6LWluZGV4OiA5OTk5OTk5OyBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgc2Fucy1zZXJpZjsnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGhvc3QpO1xuXG4gIGNvbnN0IHNoYWRvdyA9IGhvc3QuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG4gICAgKiB7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgfVxuICAgIFxuICAgIC5jYXBzdWxlLWJ0biB7XG4gICAgICBiYWNrZ3JvdW5kOiAjMGYxNzJhO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzMzNDE1NTtcbiAgICAgIGNvbG9yOiAjZjhmYWZjO1xuICAgICAgYm9yZGVyLXJhZGl1czogOTk5OXB4O1xuICAgICAgcGFkZGluZzogN3B4IDE0cHg7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDdweDtcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDE1cHggcmdiYSgwLCAwLCAwLCAwLjQpO1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIH1cbiAgICAuY2Fwc3VsZS1idG46aG92ZXIge1xuICAgICAgYm9yZGVyLWNvbG9yOiAjMTBiOTgxO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpO1xuICAgIH1cbiAgICAuY2Fwc3VsZS1idG4uYWN0aXZlIHtcbiAgICAgIGJvcmRlci1jb2xvcjogIzEwYjk4MTtcbiAgICAgIGJhY2tncm91bmQ6ICMwMjA2MTc7XG4gICAgfVxuICAgIC5wdWxzZS1kb3Qge1xuICAgICAgd2lkdGg6IDdweDtcbiAgICAgIGhlaWdodDogN3B4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgYmFja2dyb3VuZDogIzEwYjk4MTtcbiAgICAgIGJveC1zaGFkb3c6IDAgMCA4cHggIzEwYjk4MTtcbiAgICB9XG4gICAgLnB1bHNlLWRvdC5hbWJlciB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjU5ZTBiO1xuICAgICAgYm94LXNoYWRvdzogMCAwIDhweCAjZjU5ZTBiO1xuICAgIH1cblxuICAgIC5wYW5lbCB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBib3R0b206IDQ0cHg7XG4gICAgICByaWdodDogMDtcbiAgICAgIHdpZHRoOiAzMjBweDtcbiAgICAgIGJhY2tncm91bmQ6ICMwZjE3MmE7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjMzM0MTU1O1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIHBhZGRpbmc6IDE0cHg7XG4gICAgICBjb2xvcjogI2Y4ZmFmYztcbiAgICAgIGJveC1zaGFkb3c6IDAgMTJweCAzMHB4IHJnYmEoMCwgMCwgMCwgMC42KSwgMCAwIDE1cHggcmdiYSgxNiwgMTg1LCAxMjksIDAuMTUpO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgYW5pbWF0aW9uOiBmYWRlSW4gMC4xOHMgZWFzZS1vdXQ7XG4gICAgfVxuICAgIEBrZXlmcmFtZXMgZmFkZUluIHtcbiAgICAgIGZyb20geyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNnB4KTsgfVxuICAgICAgdG8geyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH1cbiAgICB9XG4gICAgXG4gICAgLnBhbmVsLWhlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICB9XG4gICAgLnRpdGxlLXJvdyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogNnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiAjMzRkMzk5O1xuICAgIH1cbiAgICAuYmFkZ2Uge1xuICAgICAgZm9udC1zaXplOiAxMHB4O1xuICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgICAgIHBhZGRpbmc6IDFweCA2cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjMWUyOTNiO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzQ3NTU2OTtcbiAgICAgIGNvbG9yOiAjY2JkNWUxO1xuICAgIH1cbiAgICAuYmFkZ2UuZWFzeSB7IGNvbG9yOiAjMzRkMzk5OyBib3JkZXItY29sb3I6IHJnYmEoNTIsIDIxMSwgMTUzLCAwLjMpOyBiYWNrZ3JvdW5kOiByZ2JhKDUyLCAyMTEsIDE1MywgMC4xKTsgfVxuICAgIC5iYWRnZS5tZWRpdW0geyBjb2xvcjogI2ZiYmYyNDsgYm9yZGVyLWNvbG9yOiByZ2JhKDI1MSwgMTkxLCAzNiwgMC4zKTsgYmFja2dyb3VuZDogcmdiYSgyNTEsIDE5MSwgMzYsIDAuMSk7IH1cbiAgICAuYmFkZ2UuaGFyZCB7IGNvbG9yOiAjZjg3MTcxOyBib3JkZXItY29sb3I6IHJnYmEoMjQ4LCAxMTMsIDExMywgMC4zKTsgYmFja2dyb3VuZDogcmdiYSgyNDgsIDExMywgMTEzLCAwLjEpOyB9XG5cbiAgICAubWV0YS1pbmZvIHtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgIGNvbG9yOiAjOTRhM2I4O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjMDIwNjE3O1xuICAgICAgcGFkZGluZzogOHB4IDEwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjMWUyOTNiO1xuICAgIH1cbiAgICAubWV0YS1pbmZvIHN0cm9uZyB7XG4gICAgICBjb2xvcjogI2UyZThmMDtcbiAgICB9XG5cbiAgICAuYnRuLWdyaWQge1xuICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XG4gICAgICBnYXA6IDVweDtcbiAgICAgIG1hcmdpbi10b3A6IDZweDtcbiAgICB9XG4gICAgLnJhdGUtYnRuIHtcbiAgICAgIGJhY2tncm91bmQ6ICMxZTI5M2I7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjMzM0MTU1O1xuICAgICAgY29sb3I6ICNlMmU4ZjA7XG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgICBwYWRkaW5nOiA2cHggMnB4O1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMTVzIGVhc2U7XG4gICAgfVxuICAgIC5yYXRlLWJ0bjpob3ZlciB7IGZpbHRlcjogYnJpZ2h0bmVzcygxLjI1KTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpOyB9XG4gICAgLnJhdGUtYnRuLmFnYWluIHsgYm9yZGVyLWNvbG9yOiByZ2JhKDIzOSwgNjgsIDY4LCAwLjQpOyBjb2xvcjogI2Y4NzE3MTsgYmFja2dyb3VuZDogcmdiYSgyMzksIDY4LCA2OCwgMC4xKTsgfVxuICAgIC5yYXRlLWJ0bi5oYXJkIHsgYm9yZGVyLWNvbG9yOiByZ2JhKDI0NSwgMTU4LCAxMSwgMC40KTsgY29sb3I6ICNmYmJmMjQ7IGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNTgsIDExLCAwLjEpOyB9XG4gICAgLnJhdGUtYnRuLmdvb2QgeyBib3JkZXItY29sb3I6IHJnYmEoMTYsIDE4NSwgMTI5LCAwLjQpOyBjb2xvcjogIzM0ZDM5OTsgYmFja2dyb3VuZDogcmdiYSgxNiwgMTg1LCAxMjksIDAuMSk7IH1cbiAgICAucmF0ZS1idG4uZWFzeSB7IGJvcmRlci1jb2xvcjogcmdiYSgxNCwgMTY1LCAyMzMsIDAuNCk7IGNvbG9yOiAjMzhiZGY4OyBiYWNrZ3JvdW5kOiByZ2JhKDE0LCAxNjUsIDIzMywgMC4xKTsgfVxuXG4gICAgLmFkZC1hY3Rpb24tYnRuIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgYmFja2dyb3VuZDogIzA1OTY2OTtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgcGFkZGluZzogOHB4IDEwcHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGdhcDogNXB4O1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cztcbiAgICB9XG4gICAgLmFkZC1hY3Rpb24tYnRuOmhvdmVyIHsgYmFja2dyb3VuZDogIzEwYjk4MTsgfVxuXG4gICAgLnRleHRhcmVhLW5vdGVzIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgYmFja2dyb3VuZDogIzAyMDYxNztcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICMzMzQxNTU7XG4gICAgICBjb2xvcjogI2Y4ZmFmYztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIHBhZGRpbmc6IDdweCA4cHg7XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgcmVzaXplOiB2ZXJ0aWNhbDtcbiAgICAgIG1pbi1oZWlnaHQ6IDQ4cHg7XG4gICAgICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgICB9XG4gICAgLnRleHRhcmVhLW5vdGVzOmZvY3VzIHsgYm9yZGVyLWNvbG9yOiAjMTBiOTgxOyB9XG5cbiAgICAuZm9vdGVyLWFjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgICAgcGFkZGluZy10b3A6IDhweDtcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMWUyOTNiO1xuICAgICAgZm9udC1zaXplOiAxMHB4O1xuICAgIH1cbiAgICAuZGVsLWJ0biB7XG4gICAgICBjb2xvcjogI2Y4NzE3MTtcbiAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgIG9wYWNpdHk6IDAuODtcbiAgICB9XG4gICAgLmRlbC1idG46aG92ZXIgeyBvcGFjaXR5OiAxOyB9XG4gICAgXG4gICAgLmRvbmUtYmFubmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMTYsIDE4NSwgMTI5LCAwLjE1KTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMTYsIDE4NSwgMTI5LCAwLjMpO1xuICAgICAgY29sb3I6ICMzNGQzOTk7XG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgICBwYWRkaW5nOiA3cHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgIH1cblxuICAgIC5hdXRvLWFjLWJhbm5lciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDE2LCAxODUsIDEyOSwgMC4yKTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICMxMGI5ODE7XG4gICAgICBjb2xvcjogIzM0ZDM5OTtcbiAgICAgIHBhZGRpbmc6IDhweCAxMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA2cHg7XG4gICAgfVxuICBgO1xuICBzaGFkb3cuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXG4gIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc2hhZG93LmFwcGVuZENoaWxkKHdyYXBwZXIpO1xuXG4gIGxldCBpc0V4cGFuZGVkID0gZmFsc2U7XG4gIGxldCBhdXRvQWNOb3RpZmllZCA9IGZhbHNlO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBjb25zdCBtZXRhID0gZXh0cmFjdFByb2JsZW1Gcm9tUGFnZSgpO1xuICAgIGlmICghbWV0YS5zbHVnKSByZXR1cm47XG5cbiAgICBjb25zdCBwcm9ibGVtcyA9IGF3YWl0IGdldFN0b3JlZFByb2JsZW1zKCk7XG4gICAgY29uc3QgbGFkZGVyID0gYXdhaXQgZ2V0U3RvcmVkTGFkZGVyKCk7XG4gICAgY29uc3QgZXhpc3RpbmcgPSBwcm9ibGVtcy5maW5kKFxuICAgICAgKHApID0+IHAuc2x1ZyA9PT0gbWV0YS5zbHVnIHx8IChtZXRhLm51bWJlciAhPT0gJzAnICYmIHAubnVtYmVyID09PSBtZXRhLm51bWJlcilcbiAgICApO1xuXG4gICAgd3JhcHBlci5pbm5lckhUTUwgPSAnJztcblxuICAgIC8vIDEuIEZsb2F0aW5nIFBpbGwgQnV0dG9uXG4gICAgY29uc3QgcGlsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHBpbGwuY2xhc3NOYW1lID0gYGNhcHN1bGUtYnRuICR7aXNFeHBhbmRlZCA/ICdhY3RpdmUnIDogJyd9YDtcblxuICAgIGlmIChleGlzdGluZykge1xuICAgICAgY29uc3QgdG9kYXkgPSBnZXRUb2RheVN0cmluZygpO1xuICAgICAgY29uc3QgaXNEdWUgPSBleGlzdGluZy5uZXh0UmV2aWV3RGF0ZSA8PSB0b2RheTtcbiAgICAgIHBpbGwuaW5uZXJIVE1MID0gYFxuICAgICAgICA8c3BhbiBjbGFzcz1cInB1bHNlLWRvdCAke2lzRHVlID8gJ2FtYmVyJyA6ICcnfVwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4+8J+noCDoib7lrr7mtanmlq86IOesrCR7ZXhpc3RpbmcucmVwZXRpdGlvbiArIDF96Zi2ICgke2V4aXN0aW5nLmludGVydmFsfWQpPC9zcGFuPlxuICAgICAgYDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGlsbC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxzcGFuIGNsYXNzPVwicHVsc2UtZG90XCI+PC9zcGFuPlxuICAgICAgICA8c3Bhbj7wn6egIOiJvuWuvua1qeaWrzog5LiA6ZSu5pS25b2VPC9zcGFuPlxuICAgICAgYDtcbiAgICB9XG5cbiAgICBwaWxsLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBpc0V4cGFuZGVkID0gIWlzRXhwYW5kZWQ7XG4gICAgICByZW5kZXIoKTtcbiAgICB9O1xuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQocGlsbCk7XG5cbiAgICAvLyAyLiBFeHBhbmRlZCBGbG9hdGluZyBQYW5lbFxuICAgIGlmIChpc0V4cGFuZGVkKSB7XG4gICAgICBjb25zdCBwYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcGFuZWwuY2xhc3NOYW1lID0gJ3BhbmVsJztcblxuICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gZ2V0VG9kYXlTdHJpbmcoKTtcbiAgICAgICAgY29uc3QgaXNSZXZpZXdlZFRvZGF5ID0gZXhpc3RpbmcubGFzdFJldmlld2VkRGF0ZSA9PT0gdG9kYXk7XG5cbiAgICAgICAgcGFuZWwuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICR7YXV0b0FjTm90aWZpZWQgPyBgPGRpdiBjbGFzcz1cImF1dG8tYWMtYmFubmVyXCI+8J+OiSDmo4DmtYvliLDmj5DkuqTpgJrov4fvvIHlt7Loh6rliqjorrDlvZXjgII8L2Rpdj5gIDogJyd9XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGUtcm93XCI+XG4gICAgICAgICAgICAgIDxzcGFuPvCfp6Ag6Im+5a6+5rWp5pav5aSN5LmgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZ2FwOiA0cHg7XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2UgJHtleGlzdGluZy5kaWZmaWN1bHR5LnRvTG93ZXJDYXNlKCl9XCI+JHtleGlzdGluZy5kaWZmaWN1bHR5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYWRnZVwiPiMke2V4aXN0aW5nLm51bWJlciB8fCBtZXRhLm51bWJlcn08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXdlaWdodDogNjAwOyBmb250LXNpemU6IDEycHg7IG1hcmdpbi1ib3R0b206IDZweDsgY29sb3I6ICNmMWY1Zjk7XCI+XG4gICAgICAgICAgICAke2V4aXN0aW5nLnRpdGxlIHx8IG1ldGEudGl0bGV9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWV0YS1pbmZvXCI+XG4gICAgICAgICAgICA8ZGl2PuW9k+WJjemYtuaute+8mjxzdHJvbmc+56ysICR7ZXhpc3RpbmcucmVwZXRpdGlvbiArIDF9IOmYtjwvc3Ryb25nPiAo6Ze06ZqUICR7ZXhpc3RpbmcuaW50ZXJ2YWx9IOWkqSk8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+5LiL5qyh5aSN5Lmg77yaPHN0cm9uZz4ke2V4aXN0aW5nLm5leHRSZXZpZXdEYXRlfTwvc3Ryb25nPjwvZGl2PlxuICAgICAgICAgICAgJHtpc1Jldmlld2VkVG9kYXkgPyBgPGRpdiBzdHlsZT1cImNvbG9yOiAjMzRkMzk5OyBtYXJnaW4tdG9wOiAzcHg7XCI+4pyFIOS7iuaXpeWkjeS5oOW3suaJk+WNoe+8gTwvZGl2PmAgOiBgPGRpdiBzdHlsZT1cImNvbG9yOiAjZjU5ZTBiOyBtYXJnaW4tdG9wOiAzcHg7XCI+4o+x77iPIOS7iuaXpeW+heWBmumimOW5tuivhOWumjwvZGl2PmB9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAke1xuICAgICAgICAgICAgaXNSZXZpZXdlZFRvZGF5XG4gICAgICAgICAgICAgID8gYDxkaXYgY2xhc3M9XCJkb25lLWJhbm5lclwiPvCfjokg6K6w5b+G5bey5Yi35paw6Iez5LiL5Liq5ZGo5pyf77yBPC9kaXY+YFxuICAgICAgICAgICAgICA6IGBcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDExcHg7IGNvbG9yOiAjOTRhM2I4OyBtYXJnaW4tYm90dG9tOiA0cHg7XCI+5YGa5a6M5ZCO6K+E5a6a6K6w5b+G54af57uD5bqm77yaPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyaWRcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJhdGUtYnRuIGFnYWluXCIgZGF0YS1ncmFkZT1cIjFcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PumHjeadpTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDlweDsgb3BhY2l0eTogMC43NTtcIj4ke0dSQURFX0NPTkZJR1sxXS5nZXROZXh0RGF5cyhleGlzdGluZy5yZXBldGl0aW9uLCBleGlzdGluZy5pbnRlcnZhbCwgbGFkZGVyKX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyYXRlLWJ0biBoYXJkXCIgZGF0YS1ncmFkZT1cIjJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PuWbsOmavjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDlweDsgb3BhY2l0eTogMC43NTtcIj4ke0dSQURFX0NPTkZJR1syXS5nZXROZXh0RGF5cyhleGlzdGluZy5yZXBldGl0aW9uLCBleGlzdGluZy5pbnRlcnZhbCwgbGFkZGVyKX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyYXRlLWJ0biBnb29kXCIgZGF0YS1ncmFkZT1cIjNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PuiJr+WlvTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDlweDsgb3BhY2l0eTogMC43NTtcIj4ke0dSQURFX0NPTkZJR1szXS5nZXROZXh0RGF5cyhleGlzdGluZy5yZXBldGl0aW9uLCBleGlzdGluZy5pbnRlcnZhbCwgbGFkZGVyKX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyYXRlLWJ0biBlYXN5XCIgZGF0YS1ncmFkZT1cIjRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PueugOWNlTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDlweDsgb3BhY2l0eTogMC43NTtcIj4ke0dSQURFX0NPTkZJR1s0XS5nZXROZXh0RGF5cyhleGlzdGluZy5yZXBldGl0aW9uLCBleGlzdGluZy5pbnRlcnZhbCwgbGFkZGVyKX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBgXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvb3Rlci1hY3Rpb25zXCI+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiAjNjQ3NDhiO1wiPuiJvuWuvua1qeaWr+i3n+i4quS4rTwvc3Bhbj5cbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJjYXBzdWxlLXJlbW92ZS1idG5cIiBjbGFzcz1cImRlbC1idG5cIj7ku47lpI3kuaDlupPnp7vpmaTmraTpopg8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICBwYW5lbC5xdWVyeVNlbGVjdG9yQWxsKCcucmF0ZS1idG4nKS5mb3JFYWNoKChidG4pID0+IHtcbiAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnRuRWwgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBncmFkZSA9IE51bWJlcihidG5FbC5kYXRhc2V0LmdyYWRlKSBhcyBSZXZpZXdHcmFkZTtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9IGNhbGN1bGF0ZVNNMihleGlzdGluZywgZ3JhZGUsIHRvZGF5LCBsYWRkZXIpO1xuXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkOiBQcm9ibGVtID0ge1xuICAgICAgICAgICAgICAuLi5leGlzdGluZyxcbiAgICAgICAgICAgICAgcmVwZXRpdGlvbjogdXBkYXRlLnJlcGV0aXRpb24sXG4gICAgICAgICAgICAgIGludGVydmFsOiB1cGRhdGUuaW50ZXJ2YWwsXG4gICAgICAgICAgICAgIGVhc2VGYWN0b3I6IHVwZGF0ZS5lYXNlRmFjdG9yLFxuICAgICAgICAgICAgICBuZXh0UmV2aWV3RGF0ZTogdXBkYXRlLm5leHRSZXZpZXdEYXRlLFxuICAgICAgICAgICAgICBsYXN0UmV2aWV3ZWREYXRlOiB0b2RheSxcbiAgICAgICAgICAgICAgaGlzdG9yeTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGlkOiBgbG9nLSR7RGF0ZS5ub3coKX1gLFxuICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgZGF0ZTogdG9kYXksXG4gICAgICAgICAgICAgICAgICBncmFkZSxcbiAgICAgICAgICAgICAgICAgIGludGVydmFsRGF5czogdXBkYXRlLmludGVydmFsLFxuICAgICAgICAgICAgICAgICAgcmVwZXRpdGlvbjogdXBkYXRlLnJlcGV0aXRpb24sXG4gICAgICAgICAgICAgICAgICBlYXNlRmFjdG9yOiB1cGRhdGUuZWFzZUZhY3RvcixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC4uLihleGlzdGluZy5oaXN0b3J5IHx8IFtdKSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBhd2FpdCBnZXRTdG9yZWRQcm9ibGVtcygpO1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gbGlzdC5maW5kSW5kZXgoKHApID0+IHAuaWQgPT09IGV4aXN0aW5nLmlkKTtcbiAgICAgICAgICAgIGlmIChpZHggPj0gMCkgbGlzdFtpZHhdID0gdXBkYXRlZDtcbiAgICAgICAgICAgIGF3YWl0IHNhdmVTdG9yZWRQcm9ibGVtcyhsaXN0KTtcbiAgICAgICAgICAgIHJlbmRlcigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBwYW5lbC5xdWVyeVNlbGVjdG9yKCcjY2Fwc3VsZS1yZW1vdmUtYnRuJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGlmIChjb25maXJtKGDnoa7lrprku47oib7lrr7mtanmlq/lpI3kuaDlupPkuK3np7vpmaTpopjnm64gIyR7ZXhpc3RpbmcubnVtYmVyfSAke2V4aXN0aW5nLnRpdGxlfSDlkJfvvJ9gKSkge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFN0b3JlZFByb2JsZW1zKCk7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IGxpc3QuZmlsdGVyKChwKSA9PiBwLmlkICE9PSBleGlzdGluZy5pZCk7XG4gICAgICAgICAgICBhd2FpdCBzYXZlU3RvcmVkUHJvYmxlbXMoZmlsdGVyZWQpO1xuICAgICAgICAgICAgcmVuZGVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5vdCB0cmFja2VkOiBJbnN0YW50IE9uZS1DbGljayBBZGRcbiAgICAgICAgcGFuZWwuaW5uZXJIVE1MID0gYFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZS1yb3dcIj5cbiAgICAgICAgICAgICAgPHNwYW4+8J+noCDoib7lrr7mtanmlq/lpI3kuaDorqHliJI8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBnYXA6IDRweDtcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYWRnZSAke21ldGEuZGlmZmljdWx0eS50b0xvd2VyQ2FzZSgpfVwiPiR7bWV0YS5kaWZmaWN1bHR5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYWRnZVwiPiMke21ldGEubnVtYmVyfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtd2VpZ2h0OiA2MDA7IGZvbnQtc2l6ZTogMTJweDsgbWFyZ2luLWJvdHRvbTogNnB4OyBjb2xvcjogI2YxZjVmOTtcIj5cbiAgICAgICAgICAgICR7bWV0YS50aXRsZX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxwIHN0eWxlPVwiY29sb3I6ICM5NGEzYjg7IGZvbnQtc2l6ZTogMTFweDsgbWFyZ2luLWJvdHRvbTogOHB4OyBsaW5lLWhlaWdodDogMS40O1wiPlxuICAgICAgICAgICAg5bey6Ieq5Yqo6K+G5Yir6aKY55uu5L+h5oGv44CC54K55Ye75LiL5pa55oyJ6ZKu5Y2z5Y+v5LiA6ZSu57qz5YWl77yM5piO5aSp5YeG5pe25byA5ZCv56ysIDEg6L2u5aSN5Lmg77yBXG4gICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgPHRleHRhcmVhIGlkPVwiY2Fwc3VsZS1ub3Rlcy1pbnB1dFwiIGNsYXNzPVwidGV4dGFyZWEtbm90ZXNcIiBwbGFjZWhvbGRlcj1cIuWFs+mUruino+mimOaAnei3r+aIluaYk+mUmeeCueWNoeeJhyAo6YCJ5aGrKS4uLlwiPjwvdGV4dGFyZWE+XG5cbiAgICAgICAgICA8YnV0dG9uIGlkPVwiY2Fwc3VsZS1zdWJtaXQtYWRkXCIgY2xhc3M9XCJhZGQtYWN0aW9uLWJ0blwiPlxuICAgICAgICAgICAgPHNwYW4+8J+agCDkuIDplK7nurPlhaXoib7lrr7mtanmlq/lpI3kuaA8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIGA7XG5cbiAgICAgICAgcGFuZWwucXVlcnlTZWxlY3RvcignI2NhcHN1bGUtc3VibWl0LWFkZCcpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCB0ZXh0YXJlYSA9IHBhbmVsLnF1ZXJ5U2VsZWN0b3IoJyNjYXBzdWxlLW5vdGVzLWlucHV0JykgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBub3RlcyA9IHRleHRhcmVhID8gdGV4dGFyZWEudmFsdWUudHJpbSgpIDogJyc7XG5cbiAgICAgICAgICBjb25zdCBuZXdQcm9ibGVtOiBQcm9ibGVtID0ge1xuICAgICAgICAgICAgaWQ6IGBsYy0ke21ldGEuc2x1ZyB8fCBEYXRlLm5vdygpfWAsXG4gICAgICAgICAgICBudW1iZXI6IG1ldGEubnVtYmVyIHx8ICcwJyxcbiAgICAgICAgICAgIHRpdGxlOiBtZXRhLnRpdGxlIHx8IG1ldGEuc2x1ZyxcbiAgICAgICAgICAgIHNsdWc6IG1ldGEuc2x1ZyxcbiAgICAgICAgICAgIHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICBkaWZmaWN1bHR5OiBtZXRhLmRpZmZpY3VsdHksXG4gICAgICAgICAgICB0YWdzOiBtZXRhLnRhZ3MsXG4gICAgICAgICAgICBub3RlcyxcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIHJlcGV0aXRpb246IDAsXG4gICAgICAgICAgICBpbnRlcnZhbDogMSwgLy8gMXN0IHN0YWdlXG4gICAgICAgICAgICBlYXNlRmFjdG9yOiAyLjUsXG4gICAgICAgICAgICBuZXh0UmV2aWV3RGF0ZTogZ2V0VG9kYXlTdHJpbmcoKSxcbiAgICAgICAgICAgIGlzU2FtcGxlOiBmYWxzZSxcbiAgICAgICAgICAgIGhpc3Rvcnk6IFtdLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCBsaXN0ID0gYXdhaXQgZ2V0U3RvcmVkUHJvYmxlbXMoKTtcbiAgICAgICAgICBsaXN0LnVuc2hpZnQobmV3UHJvYmxlbSk7XG4gICAgICAgICAgYXdhaXQgc2F2ZVN0b3JlZFByb2JsZW1zKGxpc3QpO1xuICAgICAgICAgIHJlbmRlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChwYW5lbCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCk7XG5cbiAgLy8gV2F0Y2ggZm9yIExlZXRDb2RlIFNpbmdsZSBQYWdlIEFwcCBjbGllbnQtc2lkZSByb3V0ZSBjaGFuZ2VzXG4gIGxldCBsYXN0VXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGlmICghaXNFeHRlbnNpb25WYWxpZCgpKSB7XG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmICE9PSBsYXN0VXJsKSB7XG4gICAgICBsYXN0VXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICBhdXRvQWNOb3RpZmllZCA9IGZhbHNlO1xuICAgICAgYWNIYW5kbGVkID0gZmFsc2U7XG4gICAgICByZW5kZXIoKTtcbiAgICB9XG4gIH0sIDEyMDApO1xuXG4gIC8vIEF1dG8gQUMgKEFjY2VwdGVkIC8g6YCa6L+HKSBEZXRlY3Rpb24gdmlhIE11dGF0aW9uT2JzZXJ2ZXJcbiAgbGV0IGFjSGFuZGxlZCA9IGZhbHNlO1xuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWlzRXh0ZW5zaW9uVmFsaWQoKSkge1xuICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGFjSGFuZGxlZCkgcmV0dXJuO1xuXG4gICAgaWYgKGNoZWNrU3VibWlzc2lvbkFjY2VwdGVkKCkpIHtcbiAgICAgIGFjSGFuZGxlZCA9IHRydWU7XG4gICAgICBjb25zdCBtZXRhID0gZXh0cmFjdFByb2JsZW1Gcm9tUGFnZSgpO1xuICAgICAgaWYgKG1ldGEuc2x1Zykge1xuICAgICAgICBjb25zdCBsaXN0ID0gYXdhaXQgZ2V0U3RvcmVkUHJvYmxlbXMoKTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBsaXN0LmZpbmQoKHApID0+IHAuc2x1ZyA9PT0gbWV0YS5zbHVnKTtcbiAgICAgICAgaWYgKCFleGlzdGluZykge1xuICAgICAgICAgIC8vIEF1dG8gYWRkIG9uIHJlYWwgc3VibWlzc2lvbiBBQ1xuICAgICAgICAgIGNvbnN0IG5ld1Byb2JsZW06IFByb2JsZW0gPSB7XG4gICAgICAgICAgICBpZDogYGxjLSR7bWV0YS5zbHVnIHx8IERhdGUubm93KCl9YCxcbiAgICAgICAgICAgIG51bWJlcjogbWV0YS5udW1iZXIgfHwgJzAnLFxuICAgICAgICAgICAgdGl0bGU6IG1ldGEudGl0bGUgfHwgbWV0YS5zbHVnLFxuICAgICAgICAgICAgc2x1ZzogbWV0YS5zbHVnLFxuICAgICAgICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgIGRpZmZpY3VsdHk6IG1ldGEuZGlmZmljdWx0eSxcbiAgICAgICAgICAgIHRhZ3M6IG1ldGEudGFncyxcbiAgICAgICAgICAgIG5vdGVzOiAn5YGa6aKY5o+Q5Lqk6YCa6L+H77yM6Ieq5Yqo5pS25b2VJyxcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIHJlcGV0aXRpb246IDAsXG4gICAgICAgICAgICBpbnRlcnZhbDogMSxcbiAgICAgICAgICAgIGVhc2VGYWN0b3I6IDIuNSxcbiAgICAgICAgICAgIG5leHRSZXZpZXdEYXRlOiBnZXRUb2RheVN0cmluZygpLFxuICAgICAgICAgICAgaXNTYW1wbGU6IGZhbHNlLFxuICAgICAgICAgICAgaGlzdG9yeTogW10sXG4gICAgICAgICAgfTtcbiAgICAgICAgICBsaXN0LnVuc2hpZnQobmV3UHJvYmxlbSk7XG4gICAgICAgICAgYXdhaXQgc2F2ZVN0b3JlZFByb2JsZW1zKGxpc3QpO1xuICAgICAgICAgIGF1dG9BY05vdGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgICBpc0V4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgICByZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKGRvY3VtZW50LmJvZHkpIHtcbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICB9XG59XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRDYXBzdWxlKTtcbn0gZWxzZSB7XG4gIGluaXRDYXBzdWxlKCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFTyxRQUFNLDRCQUE0QixDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRztBQUU5RCxXQUFTLGVBQWUsSUFBVSxvQkFBSSxRQUFnQjtBQUMzRCxVQUFNLE9BQU8sRUFBRSxZQUFBO0FBQ2YsVUFBTSxRQUFRLE9BQU8sRUFBRSxTQUFBLElBQWEsQ0FBQyxFQUFFLFNBQVMsR0FBRyxHQUFHO0FBQ3RELFVBQU0sTUFBTSxPQUFPLEVBQUUsUUFBQSxDQUFTLEVBQUUsU0FBUyxHQUFHLEdBQUc7QUFDL0MsV0FBTyxHQUFHLElBQUksSUFBSSxLQUFLLElBQUksR0FBRztBQUFBLEVBQ2hDO0FBRU8sV0FBUyxRQUFRLFNBQWlCLE1BQXNCO0FBQzdELFVBQU0sSUFBSSxvQkFBSSxLQUFLLFVBQVUsV0FBVztBQUN4QyxNQUFFLFFBQVEsRUFBRSxRQUFBLElBQVksSUFBSTtBQUM1QixXQUFPLGVBQWUsQ0FBQztBQUFBLEVBQ3pCO0FBWU8sV0FBUyxhQUNkLFNBQ0EsT0FDQSxhQUFxQixlQUFBLEdBQ3JCLFNBQW1CLDJCQU1uQjtBQUNBLFFBQUksTUFBTSxRQUFRLGNBQWM7QUFDaEMsUUFBSSxPQUFPLFFBQVEsY0FBYztBQUNqQyxRQUFJO0FBRUosWUFBUSxPQUFBO0FBQUEsTUFDTixLQUFLO0FBQ0gsY0FBTTtBQUNOLHVCQUFlLE9BQU8sQ0FBQyxLQUFLO0FBQzVCLGVBQU8sS0FBSyxJQUFJLEtBQUssT0FBTyxHQUFHO0FBQy9CO0FBQUEsTUFFRixLQUFLO0FBRUgsdUJBQWUsT0FBTyxLQUFLLElBQUksS0FBSyxPQUFPLFNBQVMsQ0FBQyxDQUFDLEtBQUs7QUFDM0QsZUFBTyxLQUFLLElBQUksS0FBSyxPQUFPLElBQUk7QUFDaEM7QUFBQSxNQUVGLEtBQUs7QUFFSCxjQUFNLE1BQU07QUFDWixZQUFJLE1BQU0sT0FBTyxRQUFR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
