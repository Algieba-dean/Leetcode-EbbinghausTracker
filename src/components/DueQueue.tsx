import React, { useMemo } from 'react';
import { Problem, ReviewGrade } from '../types';
import { ProblemCard } from './ProblemCard';
import { ZeroInbox } from './ZeroInbox';
import { AlertCircle } from 'lucide-react';
import { diffDays, getTodayString } from '../utils/ebbinghaus';

interface DueQueueProps {
  problems: Problem[];
  onRate: (id: string, grade: ReviewGrade) => void;
  onDelete: (id: string) => void;
  onViewLibrary: () => void;
  ladder?: number[];
}

export const DueQueue: React.FC<DueQueueProps> = ({
  problems,
  onRate,
  onDelete,
  onViewLibrary,
  ladder,
}) => {
  const today = getTodayString();

  const { sorted, overdueCount } = useMemo(() => {
    const dueProblems = problems.filter(
      (p) => p.nextReviewDate <= today && p.lastReviewedDate !== today
    );

    const list = [...dueProblems].sort((a, b) => {
      const overdueA = diffDays(today, a.nextReviewDate);
      const overdueB = diffDays(today, b.nextReviewDate);
      if (overdueA !== overdueB) {
        return overdueB - overdueA;
      }
      return a.nextReviewDate.localeCompare(b.nextReviewDate);
    });

    const count = list.filter((p) => diffDays(today, p.nextReviewDate) > 0).length;
    return { sorted: list, overdueCount: count };
  }, [problems, today]);

  if (sorted.length === 0) {
    return <ZeroInbox onViewLibrary={onViewLibrary} />;
  }

  return (
    <div className="space-y-3 p-3.5">
      {overdueCount > 0 && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            有 <strong>{overdueCount}</strong> 道题目已超期，建议趁热打铁优先重做！
          </span>
        </div>
      )}

      <div className="space-y-2.5">
        {sorted.map((problem) => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            onRate={onRate}
            onDelete={onDelete}
            showActions={true}
            ladder={ladder}
          />
        ))}
      </div>
    </div>
  );
};
