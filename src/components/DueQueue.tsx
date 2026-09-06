import React from 'react';
import { Problem, ReviewGrade } from '../types';
import { ProblemCard } from './ProblemCard';
import { ZeroInbox } from './ZeroInbox';
import { AlertCircle } from 'lucide-react';
import { diffDays, getTodayString } from '../utils/ebbinghaus';

interface DueQueueProps {
  problems: Problem[];
  onRate: (id: string, grade: ReviewGrade) => void;
  onViewLibrary: () => void;
}

export const DueQueue: React.FC<DueQueueProps> = ({
  problems,
  onRate,
  onViewLibrary,
}) => {
  const today = getTodayString();

  // Filter problems due today or earlier, and not reviewed today
  const dueProblems = problems.filter(
    (p) => p.nextReviewDate <= today && p.lastReviewedDate !== today
  );

  // Sort: Overdue first (descending days overdue), then difficulty
  const sorted = [...dueProblems].sort((a, b) => {
    const overdueA = diffDays(today, a.nextReviewDate);
    const overdueB = diffDays(today, b.nextReviewDate);
    if (overdueA !== overdueB) {
      return overdueB - overdueA; // larger overdue first
    }
    return a.nextReviewDate.localeCompare(b.nextReviewDate);
  });

  const overdueCount = sorted.filter((p) => diffDays(today, p.nextReviewDate) > 0).length;

  if (sorted.length === 0) {
    return <ZeroInbox onViewLibrary={onViewLibrary}  />;
  }

  return (
    <div className="space-y-3 p-3.5">
      {/* Overdue alert banner if any */}
      {overdueCount > 0 && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            有 <strong>{overdueCount}</strong> 道题目已超期未复习，建议趁热打铁优先重做！
          </span>
        </div>
      )}

      {/* Problem Cards Queue */}
      <div className="space-y-2.5">
        {sorted.map((problem) => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            onRate={onRate}
            showActions={true}
          />
        ))}
      </div>
    </div>
  );
};
