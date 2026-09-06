import{g as S,G as v,a as A,D as _}from"./ebbinghaus-BQZyJPW5.js";const $="lc_ebbinghaus_problems",L="lc_ebbinghaus_settings";function q(){const d=window.location.pathname.match(/\/problems\/([^/]+)/),c=d?d[1]:"";let b="",n="",l="Medium";const f=["力扣"],t=document.title||"",w=/^(\d+)[\.\s、]+([^-—|]+)/,p=t.match(w);p&&(b=p[1].trim(),n=p[2].trim());const e=document.querySelector('div[data-cypress="QuestionTitle"]')||document.querySelector(".text-title-large")||document.querySelector("h4");if(e&&e.textContent){const o=e.textContent.trim(),r=o.match(/^(\d+)[\.\s、]+(.+)/);r?(b=r[1].trim(),n=r[2].trim()):n||(n=o)}!n&&c&&(n=c.split("-").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" "));const i=document.body.innerText||"",x=document.querySelector('.text-difficulty-easy, [class*="text-olive"]'),y=document.querySelector('.text-difficulty-hard, [class*="text-pink"]'),a=document.querySelector('.text-difficulty-medium, [class*="text-yellow"]');return x||i.includes("简单")||i.includes("Easy")?l="Easy":y||i.includes("困难")||i.includes("Hard")?l="Hard":(a||i.includes("中等")||i.includes("Medium"))&&(l="Medium"),document.querySelectorAll('a[href*="/tag/"]').forEach(o=>{var u;const r=(u=o.textContent)==null?void 0:u.trim();r&&!f.includes(r)&&f.push(r)}),{slug:c,number:b||"0",title:n,difficulty:l,tags:f}}async function h(){return new Promise(s=>{chrome.storage.local.get([$],d=>{s(d[$]||[])})})}async function N(){return new Promise(s=>{chrome.storage.local.get([L],d=>{const c=d[L];s((c==null?void 0:c.ladder)||_)})})}async function D(s){return new Promise(d=>{chrome.storage.local.set({[$]:s},()=>{chrome.runtime.sendMessage({type:"UPDATE_BADGE"}),d()})})}function C(){if(!window.location.pathname.includes("/problems/")||document.getElementById("lc-ebbinghaus-capsule-host"))return;const s=document.createElement("div");s.id="lc-ebbinghaus-capsule-host",s.style.cssText='position: fixed; bottom: 20px; right: 20px; z-index: 9999999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',document.body.appendChild(s);const d=s.attachShadow({mode:"open"}),c=document.createElement("style");c.textContent=`
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
      width: 310px;
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
      font-size: 11px;
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
  `,d.appendChild(c);const b=document.createElement("div");d.appendChild(b);let n=!1;async function l(){var x,y;const t=q();if(!t.slug)return;const w=await h(),p=await N(),e=w.find(a=>a.slug===t.slug||t.number!=="0"&&a.number===t.number);b.innerHTML="";const i=document.createElement("button");if(i.className=`capsule-btn ${n?"active":""}`,e){const a=S(),o=e.nextReviewDate<=a;i.innerHTML=`
        <span class="pulse-dot ${o?"amber":""}"></span>
        <span>🧠 艾宾浩斯: 第${e.repetition+1}阶 (${e.interval}d)</span>
      `}else i.innerHTML=`
        <span class="pulse-dot"></span>
        <span>🧠 艾宾浩斯: + 纳入复习</span>
      `;if(i.onclick=()=>{n=!n,l()},b.appendChild(i),n){const a=document.createElement("div");if(a.className="panel",e){const o=S(),r=e.lastReviewedDate===o;a.innerHTML=`
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
            ${r?'<div style="color: #34d399; margin-top: 3px;">✅ 今日复习已打卡！</div>':'<div style="color: #f59e0b; margin-top: 3px;">⏱️ 今日待做题并评定</div>'}
          </div>

          ${r?'<div class="done-banner">🎉 今日掌握度已更新！</div>':`
            <div style="font-size: 11px; color: #94a3b8; margin-bottom: 4px;">做完后根据记忆熟练度评定：</div>
            <div class="btn-grid">
              <button class="rate-btn again" data-grade="1">
                <div>重来</div>
                <div style="font-size: 9px; opacity: 0.75;">${v[1].getNextDays(e.repetition,e.interval,p)}</div>
              </button>
              <button class="rate-btn hard" data-grade="2">
                <div>困难</div>
                <div style="font-size: 9px; opacity: 0.75;">${v[2].getNextDays(e.repetition,e.interval,p)}</div>
              </button>
              <button class="rate-btn good" data-grade="3">
                <div>良好</div>
                <div style="font-size: 9px; opacity: 0.75;">${v[3].getNextDays(e.repetition,e.interval,p)}</div>
              </button>
              <button class="rate-btn easy" data-grade="4">
                <div>简单</div>
                <div style="font-size: 9px; opacity: 0.75;">${v[4].getNextDays(e.repetition,e.interval,p)}</div>
              </button>
            </div>
          `}

          <div class="footer-actions">
            <span style="color: #64748b;">艾宾浩斯跟踪中</span>
            <button id="capsule-remove-btn" class="del-btn">从复习库移除此题</button>
          </div>
        `,a.querySelectorAll(".rate-btn").forEach(u=>{u.addEventListener("click",async m=>{const E=m.currentTarget,z=Number(E.dataset.grade),g=A(e,z,o,p),M={...e,repetition:g.repetition,interval:g.interval,easeFactor:g.easeFactor,nextReviewDate:g.nextReviewDate,lastReviewedDate:o,history:[{id:`log-${Date.now()}`,timestamp:Date.now(),date:o,grade:z,intervalDays:g.interval,repetition:g.repetition,easeFactor:g.easeFactor},...e.history||[]]},k=await h(),T=k.findIndex(R=>R.id===e.id);T>=0&&(k[T]=M),await D(k),l()})}),(x=a.querySelector("#capsule-remove-btn"))==null||x.addEventListener("click",async()=>{if(confirm(`确定从艾宾浩斯复习库中移除题目 #${e.number} ${e.title} 吗？`)){const m=(await h()).filter(E=>E.id!==e.id);await D(m),l()}})}else a.innerHTML=`
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
            将此题纳入间隔重复复习库。明天起将按照艾宾浩斯遗忘曲线（1d ➔ 2d ➔ 4d ➔ 7d...）准时提醒您二刷三刷！
          </p>

          <textarea id="capsule-notes-input" class="textarea-notes" placeholder="记录核心破局思路或易错点卡片 (选填)..."></textarea>

          <button id="capsule-submit-add" class="add-action-btn">
            <span>🚀 纳入艾宾浩斯复习计划</span>
          </button>
        `,(y=a.querySelector("#capsule-submit-add"))==null||y.addEventListener("click",async()=>{const o=a.querySelector("#capsule-notes-input"),r=o?o.value.trim():"",u={id:`lc-${t.slug||Date.now()}`,number:t.number,title:t.title||t.slug,slug:t.slug,url:window.location.href,difficulty:t.difficulty,tags:t.tags,notes:r,createdAt:Date.now(),repetition:0,interval:1,easeFactor:2.5,nextReviewDate:S(),isSample:!1,history:[]},m=await h();m.unshift(u),await D(m),l()});b.appendChild(a)}}l();let f=window.location.href;setInterval(()=>{window.location.href!==f&&(f=window.location.href,l())},1200)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",C):C();
