import{g as S,G as D,a as P,D as F}from"./ebbinghaus-BQZyJPW5.js";const A="lc_ebbinghaus_problems",R="lc_ebbinghaus_settings";function C(){const s=window.location.pathname.match(/\/problems\/([^/]+)/),l=s?s[1]:"";let u="",i="",g="Medium";const d=["力扣"],v=document.title||"",h=/^(\d+)[\.\s、]+([^-—|]+)/,w=v.match(h);w&&(u=w[1].trim(),i=w[2].trim());const t=document.querySelector('div[data-cypress="QuestionTitle"]')||document.querySelector(".text-title-large")||document.querySelector("h4");if(t&&t.textContent){const n=t.textContent.trim(),c=n.match(/^(\d+)[\.\s、]+(.+)/);c?(u=c[1].trim(),i=c[2].trim()):i||(i=n)}!i&&l&&(i=l.split("-").map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(" "));const p=document.body.innerText||"",o=document.querySelector('.text-difficulty-easy, [class*="text-olive"]'),e=document.querySelector('.text-difficulty-hard, [class*="text-pink"]'),f=document.querySelector('.text-difficulty-medium, [class*="text-yellow"]');return o||p.includes("简单")||p.includes("Easy")?g="Easy":e||p.includes("困难")||p.includes("Hard")?g="Hard":(f||p.includes("中等")||p.includes("Medium"))&&(g="Medium"),document.querySelectorAll('a[href*="/tag/"]').forEach(n=>{var a;const c=(a=n.textContent)==null?void 0:a.trim();c&&!d.includes(c)&&d.push(c)}),{slug:l,number:u||"0",title:i,difficulty:g,tags:d}}async function y(){return new Promise(r=>{chrome.storage.local.get([A],s=>{r(s[A]||[])})})}async function H(){return new Promise(r=>{chrome.storage.local.get([R],s=>{const l=s[R];r((l==null?void 0:l.ladder)||F)})})}async function $(r){return new Promise(s=>{chrome.storage.local.set({[A]:r},()=>{chrome.runtime.sendMessage({type:"UPDATE_BADGE"}),s()})})}function q(){if(!window.location.pathname.includes("/problems/")||document.getElementById("lc-ebbinghaus-capsule-host"))return;const r=document.createElement("div");r.id="lc-ebbinghaus-capsule-host",r.style.cssText='position: fixed; bottom: 20px; right: 20px; z-index: 9999999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',document.body.appendChild(r);const s=r.attachShadow({mode:"open"}),l=document.createElement("style");l.textContent=`
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
  `,s.appendChild(l);const u=document.createElement("div");s.appendChild(u);let i=!1,g=!1;async function d(){var n,c;const t=C();if(!t.slug)return;const p=await y(),o=await H(),e=p.find(a=>a.slug===t.slug||t.number!=="0"&&a.number===t.number);u.innerHTML="";const f=document.createElement("button");if(f.className=`capsule-btn ${i?"active":""}`,e){const a=S(),b=e.nextReviewDate<=a;f.innerHTML=`
        <span class="pulse-dot ${b?"amber":""}"></span>
        <span>🧠 艾宾浩斯: 第${e.repetition+1}阶 (${e.interval}d)</span>
      `}else f.innerHTML=`
        <span class="pulse-dot"></span>
        <span>🧠 艾宾浩斯: 一键收录</span>
      `;if(f.onclick=()=>{i=!i,d()},u.appendChild(f),i){const a=document.createElement("div");if(a.className="panel",e){const b=S(),E=e.lastReviewedDate===b;a.innerHTML=`
          ${g?'<div class="auto-ac-banner">🎉 检测到提交通过！已自动记录。</div>':""}

          <div class="panel-header">
            <div class="title-row">
              <span>🧠 艾宾浩斯复习</span>
            </div>
            <div style="display: flex; gap: 4px;">
              <span class="badge ${e.difficulty.toLowerCase()}">${e.difficulty}</span>
              <span class="badge">#${e.number||t.number}</span>
            </div>
          </div>

          <div style="font-weight: 600; font-size: 12px; margin-bottom: 6px; color: #f1f5f9;">
            ${e.title||t.title}
          </div>

          <div class="meta-info">
            <div>当前阶段：<strong>第 ${e.repetition+1} 阶</strong> (间隔 ${e.interval} 天)</div>
            <div>下次复习：<strong>${e.nextReviewDate}</strong></div>
            ${E?'<div style="color: #34d399; margin-top: 3px;">✅ 今日复习已打卡！</div>':'<div style="color: #f59e0b; margin-top: 3px;">⏱️ 今日待做题并评定</div>'}
          </div>

          ${E?'<div class="done-banner">🎉 记忆已刷新至下个周期！</div>':`
            <div style="font-size: 11px; color: #94a3b8; margin-bottom: 4px;">做完后评定记忆熟练度：</div>
            <div class="btn-grid">
              <button class="rate-btn again" data-grade="1">
                <div>重来</div>
                <div style="font-size: 9px; opacity: 0.75;">${D[1].getNextDays(e.repetition,e.interval,o)}</div>
              </button>
              <button class="rate-btn hard" data-grade="2">
                <div>困难</div>
                <div style="font-size: 9px; opacity: 0.75;">${D[2].getNextDays(e.repetition,e.interval,o)}</div>
              </button>
              <button class="rate-btn good" data-grade="3">
                <div>良好</div>
                <div style="font-size: 9px; opacity: 0.75;">${D[3].getNextDays(e.repetition,e.interval,o)}</div>
              </button>
              <button class="rate-btn easy" data-grade="4">
                <div>简单</div>
                <div style="font-size: 9px; opacity: 0.75;">${D[4].getNextDays(e.repetition,e.interval,o)}</div>
              </button>
            </div>
          `}

          <div class="footer-actions">
            <span style="color: #64748b;">艾宾浩斯跟踪中</span>
            <button id="capsule-remove-btn" class="del-btn">从复习库移除此题</button>
          </div>
        `,a.querySelectorAll(".rate-btn").forEach(k=>{k.addEventListener("click",async x=>{const z=x.currentTarget,L=Number(z.dataset.grade),m=P(e,L,b,o),_={...e,repetition:m.repetition,interval:m.interval,easeFactor:m.easeFactor,nextReviewDate:m.nextReviewDate,lastReviewedDate:b,history:[{id:`log-${Date.now()}`,timestamp:Date.now(),date:b,grade:L,intervalDays:m.interval,repetition:m.repetition,easeFactor:m.easeFactor},...e.history||[]]},T=await y(),M=T.findIndex(N=>N.id===e.id);M>=0&&(T[M]=_),await $(T),d()})}),(n=a.querySelector("#capsule-remove-btn"))==null||n.addEventListener("click",async()=>{if(confirm(`确定从艾宾浩斯复习库中移除题目 #${e.number} ${e.title} 吗？`)){const x=(await y()).filter(z=>z.id!==e.id);await $(x),d()}})}else a.innerHTML=`
          <div class="panel-header">
            <div class="title-row">
              <span>🧠 艾宾浩斯复习计划</span>
            </div>
            <div style="display: flex; gap: 4px;">
              <span class="badge ${t.difficulty.toLowerCase()}">${t.difficulty}</span>
              <span class="badge">#${t.number}</span>
            </div>
          </div>

          <div style="font-weight: 600; font-size: 12px; margin-bottom: 6px; color: #f1f5f9;">
            ${t.title}
          </div>

          <p style="color: #94a3b8; font-size: 11px; margin-bottom: 8px; line-height: 1.4;">
            已自动识别题目信息。点击下方按钮即可一键纳入，明天准时开启第 1 轮复习！
          </p>

          <textarea id="capsule-notes-input" class="textarea-notes" placeholder="关键解题思路或易错点卡片 (选填)..."></textarea>

          <button id="capsule-submit-add" class="add-action-btn">
            <span>🚀 一键纳入艾宾浩斯复习</span>
          </button>
        `,(c=a.querySelector("#capsule-submit-add"))==null||c.addEventListener("click",async()=>{const b=a.querySelector("#capsule-notes-input"),E=b?b.value.trim():"",k={id:`lc-${t.slug||Date.now()}`,number:t.number,title:t.title||t.slug,slug:t.slug,url:window.location.href,difficulty:t.difficulty,tags:t.tags,notes:E,createdAt:Date.now(),repetition:0,interval:1,easeFactor:2.5,nextReviewDate:S(),isSample:!1,history:[]},x=await y();x.unshift(k),await $(x),d()});u.appendChild(a)}}d();let v=window.location.href;setInterval(()=>{window.location.href!==v&&(v=window.location.href,g=!1,d())},1200);let h=!1;new MutationObserver(async()=>{const t=document.body.innerText||"";if((t.includes("通过")||t.includes("Accepted")||!!document.querySelector('[data-e2e-locator="submission-result"]'))&&!h){h=!0;const o=C();if(o.slug){const e=await y();if(!e.find(n=>n.slug===o.slug)){const n={id:`lc-${o.slug||Date.now()}`,number:o.number,title:o.title||o.slug,slug:o.slug,url:window.location.href,difficulty:o.difficulty,tags:o.tags,notes:"做题自动通过收录",createdAt:Date.now(),repetition:0,interval:1,easeFactor:2.5,nextReviewDate:S(),isSample:!1,history:[]};e.unshift(n),await $(e),g=!0,i=!0,d()}}}}).observe(document.body,{childList:!0,subtree:!0})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",q):q();
