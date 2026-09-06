import React from 'react';
import { Problem } from '../types';
import { getTodayString, addDays, calculateRetentionRate } from '../utils/ebbinghaus';
import { Calendar, BarChart2, ShieldCheck, AlertTriangle } from 'lucide-react';

interface CalendarForecastProps {
  problems: Problem[];
}

export const CalendarForecast: React.FC<CalendarForecastProps> = ({ problems }) => {
  const today = getTodayString();

  // Next 7 days forecast
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const dateStr = addDays(today, i);
    const d = new Date(dateStr + 'T00:00:00');
    const dayLabel = i === 0 ? '今日' : i === 1 ? '明天' : `${d.getMonth() + 1}/${d.getDate()}`;
    const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()];

    const dueCount = problems.filter((p) => p.nextReviewDate === dateStr).length;
    return {
      dateStr,
      dayLabel,
      weekday,
      dueCount,
    };
  });

  const maxCount = Math.max(1, ...next7Days.map((d) => d.dueCount));

  // Memory Retention distribution
  let strongCount = 0; // > 80%
  let moderateCount = 0; // 50-80%
  let criticalCount = 0; // < 50%

  for (const p of problems) {
    const r = calculateRetentionRate(p, today);
    if (r >= 80) strongCount += 1;
    else if (r >= 50) moderateCount += 1;
    else criticalCount += 1;
  }

  const total = Math.max(1, problems.length);

  return (
    <div className="p-3.5 space-y-4 select-none">
      {/* 7-Day Review Load Forecast */}
      <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            未来 7 天复习负荷分布
          </span>
          <span className="text-[11px] font-mono text-slate-400 font-normal">
            共 {next7Days.reduce((acc, cur) => acc + cur.dueCount, 0)} 题待复习
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1 items-end h-28 pt-4 pb-2 border-b border-slate-800">
          {next7Days.map((day, idx) => {
            const heightPercent = Math.max(8, Math.round((day.dueCount / maxCount) * 100));
            const isToday = idx === 0;

            return (
              <div key={day.dateStr} className="flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[10px] font-mono font-bold text-slate-300">
                  {day.dueCount > 0 ? day.dueCount : '-'}
                </span>
                <div className="w-full max-w-[28px] h-full flex items-end">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t transition-all duration-500 ${
                      isToday
                        ? 'bg-emerald-500'
                        : day.dueCount > 0
                        ? 'bg-slate-700 hover:bg-slate-600'
                        : 'bg-slate-800/40'
                    }`}
                  />
                </div>
                <div className="text-center mt-1">
                  <div className={`text-[10px] font-medium leading-none ${isToday ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                    {day.dayLabel}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5 leading-none">
                    {day.weekday}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Memory Stability Breakdown */}
      <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-2.5">
          <span className="flex items-center gap-1.5">
            <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
            题库记忆留存健康度
          </span>
          <span className="text-[11px] font-mono text-slate-400 font-normal">
            总计 {problems.length} 题
          </span>
        </div>

        <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-800 mb-3">
          <div
            title={`牢固掌握: ${strongCount} 题`}
            style={{ width: `${(strongCount / total) * 100}%` }}
            className="bg-emerald-500 h-full transition-all"
          />
          <div
            title={`稳步记忆: ${moderateCount} 题`}
            style={{ width: `${(moderateCount / total) * 100}%` }}
            className="bg-amber-500 h-full transition-all"
          />
          <div
            title={`临界遗忘: ${criticalCount} 题`}
            style={{ width: `${(criticalCount / total) * 100}%` }}
            className="bg-rose-500 h-full transition-all"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-center gap-1 text-[11px] text-emerald-400 mb-0.5">
              <ShieldCheck className="w-3 h-3" />
              <span>牢固 (&gt;80%)</span>
            </div>
            <div className="font-mono font-bold text-slate-200 text-sm">{strongCount} 题</div>
          </div>

          <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-center gap-1 text-[11px] text-amber-400 mb-0.5">
              <BarChart2 className="w-3 h-3" />
              <span>稳步 (50-80%)</span>
            </div>
            <div className="font-mono font-bold text-slate-200 text-sm">{moderateCount} 题</div>
          </div>

          <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-center gap-1 text-[11px] text-rose-400 mb-0.5">
              <AlertTriangle className="w-3 h-3" />
              <span>临界 (&lt;50%)</span>
            </div>
            <div className="font-mono font-bold text-slate-200 text-sm">{criticalCount} 题</div>
          </div>
        </div>
      </div>
    </div>
  );
};
