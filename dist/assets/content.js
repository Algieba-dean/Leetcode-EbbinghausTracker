(function(){"use strict";const h=[1,2,4,7,15,30,60,120];function y(t=new Date){const r=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${r}-${n}-${a}`}function F(t,r){const n=new Date(t+"T00:00:00");return n.setDate(n.getDate()+r),y(n)}function q(t,r,n=y(),a=h){let o=t.repetition??0,d=t.easeFactor||2.5,s;switch(r){case 1:o=0,s=a[0]||1,d=Math.max(1.3,d-.2);break;case 2:s=a[Math.min(o,a.length-1)]||1,d=Math.max(1.3,d-.15);break;case 3:if(o=o+1,o<a.length)s=a[o];else{const f=a[a.length-1];s=Math.max(f+15,Math.round(t.interval*d))}break;case 4:if(o=o+2,o<a.length)s=a[o];else{const f=a[a.length-1];s=Math.max(f+30,Math.round(t.interval*d*1.3))}d=Math.min(3.5,d+.15);break}const v=F(n,s);return{repetition:o,interval:s,easeFactor:Number(d.toFixed(2)),nextReviewDate:v}}const $={1:{grade:1,name:"重来",sub:"完全卡壳",getNextDays:(t,r,n=h)=>`${n[0]||1}天后`},2:{grade:2,name:"困难",sub:"勉强写出",getNextDays:(t,r,n=h)=>`${n[Math.min(t,n.length-1)]||1}天后`},3:{grade:3,name:"良好",sub:"独立AC",getNextDays:(t,r,n=h)=>{const a=t+1;return a<n.length?`${n[a]}天后`:`${Math.round(r*2.5)}天后`}},4:{grade:4,name:"简单",sub:"秒杀跳阶",getNextDays:(t,r,n=h)=>{const a=t+2;return a<n.length?`${n[a]}天后`:`${Math.round(r*3.2)}天后`}}},z="lc_ebbinghaus_problems",L="lc_ebbinghaus_settings";function R(){const r=window.location.pathname.match(/\/problems\/([^/]+)/),n=r?r[1]:"";let a="",o="",d="Medium";const s=["力扣"],v=document.title||"",f=/^(\d+)[\.\s、]+([^-—|]+)/,S=v.match(f);S&&(a=S[1].trim(),o=S[2].trim());const i=document.querySelector('div[data-cypress="QuestionTitle"]')||document.querySelector(".text-title-large")||document.querySelector("h4");if(i&&i.textContent){const p=i.textContent.trim(),u=p.match(/^(\d+)[\.\s、]+(.+)/);u?(a=u[1].trim(),o=u[2].trim()):o||(o=p)}!o&&n&&(o=n.split("-").map(p=>p.charAt(0).toUpperCase()+p.slice(1)).join(" "));const b=document.body.innerText||"",c=document.querySelector('.text-difficulty-easy, [class*="text-olive"]'),e=document.querySelector('.text-difficulty-hard, [class*="text-pink"]'),m=document.querySelector('.text-difficulty-medium, [class*="text-yellow"]');return c||b.includes("简单")||b.includes("Easy")?d="Easy":e||b.includes("困难")||b.includes("Hard")?d="Hard":(m||b.includes("中等")||b.includes("Medium"))&&(d="Medium"),document.querySelectorAll('a[href*="/tag/"]').forEach(p=>{var l;const u=(l=p.textContent)==null?void 0:l.trim();u&&!s.includes(u)&&s.push(u)}),{slug:n,number:a||"0",title:o,difficulty:d,tags:s}}async function D(){return new Promise(t=>{chrome.storage.local.get([z],r=>{t(r[z]||[])})})}async function I(){return new Promise(t=>{chrome.storage.local.get([L],r=>{const n=r[L];t((n==null?void 0:n.ladder)||h)})})}async function k(t){return new Promise(r=>{chrome.storage.local.set({[z]:t},()=>{chrome.runtime.sendMessage({type:"UPDATE_BADGE"}),r()})})}function C(){if(!window.location.pathname.includes("/problems/")||document.getElementById("lc-ebbinghaus-capsule-host"))return;const t=document.createElement("div");t.id="lc-ebbinghaus-capsule-host",t.style.cssText='position: fixed; bottom: 20px; right: 20px; z-index: 9999999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',document.body.appendChild(t);const r=t.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent=`
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
  `,r.appendChild(n);const a=document.createElement("div");r.appendChild(a);let o=!1,d=!1;async function s(){var p,u;const i=R();if(!i.slug)return;const b=await D(),c=await I(),e=b.find(l=>l.slug===i.slug||i.number!=="0"&&l.number===i.number);a.innerHTML="";const m=document.createElement("button");if(m.className=`capsule-btn ${o?"active":""}`,e){const l=y(),g=e.nextReviewDate<=l;m.innerHTML=`
        <span class="pulse-dot ${g?"amber":""}"></span>
        <span>🧠 艾宾浩斯: 第${e.repetition+1}阶 (${e.interval}d)</span>
      `}else m.innerHTML=`
        <span class="pulse-dot"></span>
        <span>🧠 艾宾浩斯: 一键收录</span>
      `;if(m.onclick=()=>{o=!o,s()},a.appendChild(m),o){const l=document.createElement("div");if(l.className="panel",e){const g=y(),E=e.lastReviewedDate===g;l.innerHTML=`
          ${d?'<div class="auto-ac-banner">🎉 检测到提交通过！已自动记录。</div>':""}

          <div class="panel-header">
            <div class="title-row">
              <span>🧠 艾宾浩斯复习</span>
            </div>
            <div style="display: flex; gap: 4px;">
              <span class="badge ${e.difficulty.toLowerCase()}">${e.difficulty}</span>
              <span class="badge">#${e.number||i.number}</span>
            </div>
          </div>

          <div style="font-weight: 600; font-size: 12px; margin-bottom: 6px; color: #f1f5f9;">
            ${e.title||i.title}
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
                <div style="font-size: 9px; opacity: 0.75;">${$[1].getNextDays(e.repetition,e.interval,c)}</div>
              </button>
              <button class="rate-btn hard" data-grade="2">
                <div>困难</div>
                <div style="font-size: 9px; opacity: 0.75;">${$[2].getNextDays(e.repetition,e.interval,c)}</div>
              </button>
              <button class="rate-btn good" data-grade="3">
                <div>良好</div>
                <div style="font-size: 9px; opacity: 0.75;">${$[3].getNextDays(e.repetition,e.interval,c)}</div>
              </button>
              <button class="rate-btn easy" data-grade="4">
                <div>简单</div>
                <div style="font-size: 9px; opacity: 0.75;">${$[4].getNextDays(e.repetition,e.interval,c)}</div>
              </button>
            </div>
          `}

          <div class="footer-actions">
            <span style="color: #64748b;">艾宾浩斯跟踪中</span>
            <button id="capsule-remove-btn" class="del-btn">从复习库移除此题</button>
          </div>
        `,l.querySelectorAll(".rate-btn").forEach(M=>{M.addEventListener("click",async w=>{const T=w.currentTarget,N=Number(T.dataset.grade),x=q(e,N,g,c),P={...e,repetition:x.repetition,interval:x.interval,easeFactor:x.easeFactor,nextReviewDate:x.nextReviewDate,lastReviewedDate:g,history:[{id:`log-${Date.now()}`,timestamp:Date.now(),date:g,grade:N,intervalDays:x.interval,repetition:x.repetition,easeFactor:x.easeFactor},...e.history||[]]},A=await D(),_=A.findIndex(H=>H.id===e.id);_>=0&&(A[_]=P),await k(A),s()})}),(p=l.querySelector("#capsule-remove-btn"))==null||p.addEventListener("click",async()=>{if(confirm(`确定从艾宾浩斯复习库中移除题目 #${e.number} ${e.title} 吗？`)){const w=(await D()).filter(T=>T.id!==e.id);await k(w),s()}})}else l.innerHTML=`
          <div class="panel-header">
            <div class="title-row">
              <span>🧠 艾宾浩斯复习计划</span>
            </div>
            <div style="display: flex; gap: 4px;">
              <span class="badge ${i.difficulty.toLowerCase()}">${i.difficulty}</span>
              <span class="badge">#${i.number}</span>
            </div>
          </div>

          <div style="font-weight: 600; font-size: 12px; margin-bottom: 6px; color: #f1f5f9;">
            ${i.title}
          </div>

          <p style="color: #94a3b8; font-size: 11px; margin-bottom: 8px; line-height: 1.4;">
            已自动识别题目信息。点击下方按钮即可一键纳入，明天准时开启第 1 轮复习！
          </p>

          <textarea id="capsule-notes-input" class="textarea-notes" placeholder="关键解题思路或易错点卡片 (选填)..."></textarea>

          <button id="capsule-submit-add" class="add-action-btn">
            <span>🚀 一键纳入艾宾浩斯复习</span>
          </button>
        `,(u=l.querySelector("#capsule-submit-add"))==null||u.addEventListener("click",async()=>{const g=l.querySelector("#capsule-notes-input"),E=g?g.value.trim():"",M={id:`lc-${i.slug||Date.now()}`,number:i.number,title:i.title||i.slug,slug:i.slug,url:window.location.href,difficulty:i.difficulty,tags:i.tags,notes:E,createdAt:Date.now(),repetition:0,interval:1,easeFactor:2.5,nextReviewDate:y(),isSample:!1,history:[]},w=await D();w.unshift(M),await k(w),s()});a.appendChild(l)}}s();let v=window.location.href;setInterval(()=>{window.location.href!==v&&(v=window.location.href,d=!1,s())},1200);let f=!1;new MutationObserver(async()=>{const i=document.body.innerText||"";if((i.includes("通过")||i.includes("Accepted")||!!document.querySelector('[data-e2e-locator="submission-result"]'))&&!f){f=!0;const c=R();if(c.slug){const e=await D();if(!e.find(p=>p.slug===c.slug)){const p={id:`lc-${c.slug||Date.now()}`,number:c.number,title:c.title||c.slug,slug:c.slug,url:window.location.href,difficulty:c.difficulty,tags:c.tags,notes:"做题自动通过收录",createdAt:Date.now(),repetition:0,interval:1,easeFactor:2.5,nextReviewDate:y(),isSample:!1,history:[]};e.unshift(p),await k(e),d=!0,o=!0,s()}}}}).observe(document.body,{childList:!0,subtree:!0})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",C):C()})();
