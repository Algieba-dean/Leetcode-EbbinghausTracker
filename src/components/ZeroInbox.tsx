import React from 'react';
import { Award, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

interface ZeroInboxProps {
  onViewLibrary: () => void;
}

export const ZeroInbox: React.FC<ZeroInboxProps> = ({ onViewLibrary }) => {
  const openLeetCode = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
      chrome.tabs.create({ url: 'https://leetcode.cn/problemset/' });
    } else {
      window.open('https://leetcode.cn/problemset/', '_blank');
    }
  };

  return (
    <div className="py-8 px-4 text-center flex flex-col items-center justify-center select-none">
      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 shadow-glow">
        <Award className="w-7 h-7" />
      </div>

      <h3 className="text-sm font-bold text-slate-100 mb-1 flex items-center gap-1.5">
        今日复习任务已全部清空！
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
      </h3>
      <p className="text-xs text-slate-400 max-w-[260px] leading-relaxed mb-5">
        艾宾浩斯记忆模型处于最佳留存点。保持专注与连续打卡，让算法直觉自然沉淀。
      </p>

      <div className="flex flex-col gap-2 w-full max-w-[260px]">
        <button
          onClick={openLeetCode}
          className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <span>去力扣刷一道新题</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onViewLibrary}
          className="w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1 transition-colors border border-slate-700/60"
        >
          <span>浏览题库档案库</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
