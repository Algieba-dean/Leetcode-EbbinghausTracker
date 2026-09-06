import React, { useState } from 'react';
import { Problem, ReviewGrade } from '../types';
import { GRADE_CONFIG, calculateRetentionRate, diffDays, getTodayString } from '../utils/ebbinghaus';
import { ExternalLink, Lightbulb, ChevronDown, ChevronUp, Sparkles, Check } from 'lucide-react';

interface ProblemCardProps {
  problem: Problem;
  onRate: (id: string, grade: ReviewGrade) => void;
  showActions?: boolean;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  onRate,
  showActions = true,
}) => {
  const [showNotes, setShowNotes] = useState(false);
  const [ratedGrade, setRatedGrade] = useState<ReviewGrade | null>(null);

  const today = getTodayString();
  const daysOverdue = diffDays(today, problem.nextReviewDate);
  const isOverdue = daysOverdue > 0;
  const retention = calculateRetentionRate(problem, today);

  const difficultyStyles: Record<string, string> = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Hard: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  };

  const handleRateClick = (grade: ReviewGrade) => {
    setRatedGrade(grade);
    setTimeout(() => {
      onRate(problem.id, grade);
    }, 320);
  };

  const openLeetCode = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
      chrome.tabs.create({ url: problem.url });
    } else {
      window.open(problem.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article
      className={`rounded-lg bg-slate-900 border transition-all duration-300 overflow-hidden ${
        ratedGrade ? 'opacity-40 scale-98 pointer-events-none' : 'hover:border-slate-700'
      } ${isOverdue ? 'border-amber-500/30 shadow-sm' : 'border-slate-800'}`}
    >
      <div className="p-3.5 pb-2">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-bold text-slate-400">
              #{problem.number}
            </span>
            <button
              onClick={openLeetCode}
              className="text-xs font-semibold text-slate-100 hover:text-emerald-400 transition-colors text-left flex items-center gap-1 group"
              title="在力扣中打开"
            >
              <span>{problem.title}</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`px-1.5 py-0.5 text-[10px] font-medium font-mono rounded border ${
                difficultyStyles[problem.difficulty] || difficultyStyles.Medium
              }`}
            >
              {problem.difficulty}
            </span>

            {isOverdue ? (
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                超期 {daysOverdue} 天
              </span>
            ) : (
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                今日到期
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {problem.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-1.5 py-0.2 rounded bg-slate-800/80 text-slate-300 text-[10px]">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
            <span>第 <strong className="text-slate-200">{problem.repetition + 1}</strong> 轮</span>
            <span>·</span>
            <span>当前间隔 <strong className="text-slate-200">{problem.interval}d</strong></span>
            <span>·</span>
            <span title="预估记忆强度">
              留存 <strong className={retention > 70 ? 'text-emerald-400' : retention > 40 ? 'text-amber-400' : 'text-rose-400'}>{retention}%</strong>
            </span>
          </div>
        </div>

        {problem.notes && (
          <div className="mt-2.5 pt-2 border-t border-slate-800/60">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="w-full flex items-center justify-between text-[11px] text-slate-400 hover:text-slate-200 transition-colors py-0.5"
            >
              <span className="flex items-center gap-1 text-amber-400/90 font-medium">
                <Lightbulb className="w-3 h-3" />
                <span>解题思路卡片</span>
              </span>
              {showNotes ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showNotes && (
              <div className="mt-1.5 p-2 rounded bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-sans">
                {problem.notes}
              </div>
            )}
          </div>
        )}
      </div>

      {showActions && (
        <div className="bg-slate-950/90 px-3 py-2 border-t border-slate-800 flex items-center justify-between gap-1.5 select-none">
          <span className="text-[10px] text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-slate-500" />
            评定反馈:
          </span>

          <div className="grid grid-cols-4 gap-1.5 flex-1">
            {([1, 2, 3, 4] as ReviewGrade[]).map((grade) => {
              const meta = GRADE_CONFIG[grade];
              const isSelected = ratedGrade === grade;
              const nextDays = meta.nextDaysText(problem.interval, problem.easeFactor, problem.repetition);

              const gradeColors = {
                1: 'hover:bg-rose-500/20 hover:text-rose-200 text-rose-300 border-rose-500/30 bg-rose-500/10',
                2: 'hover:bg-amber-500/20 hover:text-amber-200 text-amber-300 border-amber-500/30 bg-amber-500/10',
                3: 'hover:bg-emerald-500/20 hover:text-emerald-200 text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
                4: 'hover:bg-sky-500/20 hover:text-sky-200 text-sky-300 border-sky-500/30 bg-sky-500/10',
              }[grade];

              return (
                <button
                  key={grade}
                  onClick={() => handleRateClick(grade)}
                  className={`py-1 px-1 rounded border text-center transition-all ${gradeColors} ${
                    isSelected ? 'ring-2 ring-white font-bold' : ''
                  }`}
                  title={`${meta.name} - ${meta.sub} (${nextDays})`}
                >
                  <div className="text-[11px] font-medium flex items-center justify-center gap-0.5">
                    {isSelected && <Check className="w-2.5 h-2.5" />}
                    {meta.name}
                  </div>
                  <div className="text-[9px] opacity-75 font-mono">{nextDays}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
};
