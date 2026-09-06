import React, { useMemo } from 'react';
import { Problem, ReviewGrade } from '../types';
import { getTodayString } from '../utils/ebbinghaus';
import { CheckCircle2, Calendar } from 'lucide-react';
import { ProblemCard } from './ProblemCard';

interface CompletedListProps {
  problems: Problem[];
  onRate: (id: string, grade: ReviewGrade) => void;
}

export const CompletedList: React.FC<CompletedListProps> = ({ problems, onRate }) => {
  const today = getTodayString();
  const completedToday = useMemo(
    () => problems.filter((p) => p.lastReviewedDate === today),
    [problems, today]
  );

  if (completedToday.length === 0) {
    return (
      <div className="py-12 px-4 text-center text-slate-400 select-none">
        <CheckCircle2 className="w-10 h-10 mx-auto mb-2.5 text-slate-600 opacity-60" />
        <p className="text-xs font-medium text-slate-300">今日尚未完成任何复习</p>
        <p className="text-[11px] text-slate-500 mt-1">
          在「今日待办」中完成做题并点击掌握度评定即可记录。
        </p>
      </div>
    );
  }

  return (
    <div className="p-3.5 space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-slate-800/80">
        <span>今日已打卡 {completedToday.length} 题</span>
        <span className="flex items-center gap-1 font-mono text-[11px]">
          <Calendar className="w-3 h-3 text-slate-500" />
          {today}
        </span>
      </div>

      <div className="space-y-2.5">
        {completedToday.map((problem) => (
          <div key={problem.id} className="relative group">
            <ProblemCard problem={problem} onRate={onRate} showActions={false} />
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 px-1 font-mono">
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                已进入下阶段
              </span>
              <span>下次复习日: <strong className="text-slate-200">{problem.nextReviewDate}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
