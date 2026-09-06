import React, { useState, useMemo } from 'react';
import { Problem, Difficulty, ReviewGrade } from '../types';
import { ProblemCard } from './ProblemCard';
import { Search, Trash2, ArrowUpDown } from 'lucide-react';
import { useI18n } from '../utils/i18n';

interface ProblemLibraryProps {
  problems: Problem[];
  onRate: (id: string, grade: ReviewGrade) => void;
  onDeleteProblem: (id: string) => void;
}

export const ProblemLibrary: React.FC<ProblemLibraryProps> = ({
  problems,
  onRate,
  onDeleteProblem,
}) => {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | Difficulty>('All');
  const [sortBy, setSortBy] = useState<'nextDate' | 'number' | 'repetition'>('nextDate');

  const filtered = useMemo(() => {
    return problems
      .filter((p) => {
        if (difficultyFilter !== 'All' && p.difficulty !== difficultyFilter) {
          return false;
        }
        if (search.trim()) {
          const query = search.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(query);
          const matchNumber = p.number.includes(query);
          const matchTag = p.tags.some((t) => t.toLowerCase().includes(query));
          const matchNotes = (p.notes || '').toLowerCase().includes(query);
          return matchTitle || matchNumber || matchTag || matchNotes;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'nextDate') {
          return a.nextReviewDate.localeCompare(b.nextReviewDate);
        } else if (sortBy === 'number') {
          return parseInt(a.number || '0', 10) - parseInt(b.number || '0', 10);
        } else {
          return b.repetition - a.repetition;
        }
      });
  }, [problems, search, difficultyFilter, sortBy]);

  return (
    <div className="p-3.5 space-y-3">
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('library.searchPlaceholder')}
            aria-label={t('library.searchAria')}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus-visible:ring-1 focus-visible:ring-emerald-500 transition-colors"
          />
        </div>

        <div className="flex items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-1" role="group" aria-label={t('library.filterDiffAria')}>
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                aria-pressed={difficultyFilter === diff}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors focus-visible:ring-1 focus-visible:ring-emerald-500 ${
                  difficultyFilter === diff
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {diff === 'All' ? t('library.filterAll') : diff}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 shrink-0 text-slate-400 text-[11px]">
            <ArrowUpDown className="w-3 h-3" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label={t('library.sortAria')}
              className="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[11px] text-slate-300 focus:outline-none focus:border-emerald-500 focus-visible:ring-1 focus-visible:ring-emerald-500"
            >
              <option value="nextDate">{t('library.sortNextDate')}</option>
              <option value="number">{t('library.sortNumber')}</option>
              <option value="repetition">{t('library.sortRepetition')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-slate-500 flex items-center justify-between">
        <span>{t('library.matchCount', { count: filtered.length })}</span>
      </div>

      {problems.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-xs px-4 bg-slate-900/40 rounded-xl border border-slate-800/80">
          <p className="font-semibold text-slate-200 mb-1.5">{t('library.emptyLibraryTitle')}</p>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            {t('library.emptyLibraryDesc')}
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-10 text-center text-slate-500 text-xs">
          {t('library.noMatch')}
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((problem) => (
            <div key={problem.id} className="relative group">
              <ProblemCard problem={problem} onRate={onRate} onDelete={onDeleteProblem} showActions={true} />
              <div className="flex items-center justify-between mt-1 px-1 text-[10px] text-slate-500 font-mono">
                <span>{t('library.nextLabel', { date: problem.nextReviewDate })}</span>
                <button
                  onClick={() => {
                    if (confirm(t('library.deleteConfirm', { number: problem.number, title: problem.title }))) {
                      onDeleteProblem(problem.id);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 text-rose-400 hover:text-rose-300 transition-opacity flex items-center gap-1 p-1 rounded focus-visible:opacity-100"
                  title={t('library.deleteBtn')}
                  aria-label={t('card.deleteAria', { number: problem.number, title: problem.title })}
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{t('library.deleteBtn')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
