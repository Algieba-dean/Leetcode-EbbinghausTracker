import{g as y,a as S}from"./ebbinghaus-BfJfEXUj.js";const x="lc_ebbinghaus_problems";function z(){const a=window.location.pathname.match(/\/problems\/([^/]+)/),d=a?a[1]:"",s=(document.title||"").match(/^(\d+)\.\s*([^-—|]+)/);let c="",e=d;s&&(c=s[1],e=s[2].trim());let p="Medium";const t=document.body.innerText||"";return t.includes("简单")||t.includes("Easy")?p="Easy":(t.includes("困难")||t.includes("Hard"))&&(p="Hard"),{slug:d,number:c,title:e,difficulty:p}}async function m(){return new Promise(o=>{chrome.storage.local.get([x],a=>{o(a[x]||[])})})}async function w(o){return new Promise(a=>{chrome.storage.local.set({[x]:o},()=>{chrome.runtime.sendMessage({type:"UPDATE_BADGE"}),a()})})}function k(){if(document.getElementById("lc-ebbinghaus-capsule-host"))return;const o=document.createElement("div");o.id="lc-ebbinghaus-capsule-host",o.style.cssText='position: fixed; bottom: 24px; right: 24px; z-index: 999999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',document.body.appendChild(o);const a=o.attachShadow({mode:"open"}),d=document.createElement("style");d.textContent=`
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
  `,a.appendChild(d);const r=document.createElement("div");r.className="card",a.appendChild(r);async function s(){const e=z();if(!e.slug)return;const t=(await m()).find(n=>n.slug===e.slug||e.number&&n.number===e.number);if(t){const n=y(),l=t.lastReviewedDate===n;r.innerHTML=`
        <div class="header">
          <div class="brand">
            <span>🧠 艾宾浩斯复习</span>
          </div>
          <span class="badge">#${t.number||e.number||""}</span>
        </div>
        <div class="info">
          轮次: <strong>第 ${t.repetition+1} 轮</strong> · 间隔 <strong>${t.interval} 天</strong><br>
          ${l?`<span style="color: #34d399">✅ 今日已复习 (下次: ${t.nextReviewDate})</span>`:`下次复习: <strong>${t.nextReviewDate}</strong>`}
        </div>
        ${l?'<div class="success-pill">🎉 记忆已刷新！</div>':`
          <div style="font-size: 10px; color: #94a3b8; margin-bottom: 4px;">做完题目后一键评定：</div>
          <div class="btn-group">
            <button class="btn-rate again" data-grade="1">重来</button>
            <button class="btn-rate hard" data-grade="2">困难</button>
            <button class="btn-rate good" data-grade="3">良好</button>
            <button class="btn-rate easy" data-grade="4">熟练</button>
          </div>
        `}
      `,r.querySelectorAll(".btn-rate").forEach(u=>{u.addEventListener("click",async g=>{const b=g.currentTarget,h=Number(b.dataset.grade),i=S(t,h,n),E={...t,repetition:i.repetition,interval:i.interval,easeFactor:i.easeFactor,nextReviewDate:i.nextReviewDate,lastReviewedDate:n,history:[{id:`log-${Date.now()}`,timestamp:Date.now(),date:n,grade:h,intervalDays:i.interval,repetition:i.repetition,easeFactor:i.easeFactor},...t.history||[]]},f=await m(),v=f.findIndex(D=>D.id===t.id);v>=0&&(f[v]=E),await w(f),s()})})}else{r.innerHTML=`
        <div class="header">
          <div class="brand">
            <span>🧠 艾宾浩斯复习</span>
          </div>
          <span class="badge">未纳入</span>
        </div>
        <div class="info">
          将 <strong>${e.title||e.slug}</strong> 纳入间隔重复计划。
        </div>
        <input type="text" id="capsule-notes" class="notes-input" placeholder="可记录一两句核心破局思路..." />
        <button id="capsule-add-btn" class="btn-add">
          <span>+ 纳入艾宾浩斯复习</span>
        </button>
      `;const n=r.querySelector("#capsule-add-btn");n==null||n.addEventListener("click",async()=>{const l=r.querySelector("#capsule-notes"),u=l?l.value.trim():"",g={id:`lc-${e.slug}`,number:e.number||"0",title:e.title||e.slug,slug:e.slug,url:window.location.href,difficulty:e.difficulty,tags:["力扣"],notes:u,createdAt:Date.now(),repetition:0,interval:1,easeFactor:2.5,nextReviewDate:y(),history:[]},b=await m();b.unshift(g),await w(b),s()})}}s();let c=window.location.href;setInterval(()=>{window.location.href!==c&&(c=window.location.href,s())},2e3)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",k):k();
