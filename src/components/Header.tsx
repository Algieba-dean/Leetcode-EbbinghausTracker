import React from 'react';
import { DailySummary } from '../types';
import { Brain, Flame, Plus, Settings, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  summary: DailySummary;
  activeTab: 'due' | 'completed' | 'library' | 'calendar';
  onTabChange: (tab: 'due' | 'completed' | 'library' | 'calendar') => void;
  onOpenAddModal: () => void;
  onOpenSettingsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  summary,
  activeTab,
  onTabChange,
  onOpenAddModal,
  onOpenSettingsModal,
}) => {
  const totalTasksToday = summary.totalDue + summary.completedToday;
  const progressPercent = totalTasksToday > 0 ? Math.round((summary.completedToday / totalTasksToday) * 100) : 100;

  return (
    <header className="bg-slate-900 border-b border-slate-800 pt-3.5 px-4 pb-2.5 select-none">
      {/* Top Brand Bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-100 tracking-tight flex items-center gap-1.5">
              LeetCode 艾宾浩斯
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700/60 font-medium">
                SM-2
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-sans">间隔重复 · 科学掌握算法</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenAddModal}
            title="手动录入新题"
            className="w-7 h-7 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenSettingsModal}
            title="设置与数据管理"
            className="w-7 h-7 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress & Quick Stats Card */}
      <div className="bg-slate-950/70 rounded-lg p-2.5 border border-slate-800/80 mb-3">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-300 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            今日复习进度
          </span>
          <span className="font-mono text-slate-200 text-xs">
            <strong className="text-emerald-400 font-bold">{summary.completedToday}</strong> / {totalTasksToday} 题
            <span className="text-slate-400 ml-1.5 text-[11px]">({progressPercent}%)</span>
          </span>
        </div>

        {/* Progress bar track */}
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Micro KPI stats */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-500" />
            <span>连续 <strong className="text-slate-200 font-mono font-medium">{summary.streakDays}</strong> 天</span>
          </div>
          <div className="flex items-center gap-1">
            <span>总留存率:</span>
            <strong className="text-emerald-400 font-mono font-medium">{summary.retentionRate}%</strong>
          </div>
          <div className="flex items-center gap-1">
            <span>题库:</span>
            <strong className="text-slate-300 font-mono font-medium">{summary.totalTracked}</strong> 题
          </div>
        </div>
      </div>

      {/* Segmented Navigation Tabs */}
      <nav className="flex rounded-lg bg-slate-950/90 p-1 border border-slate-800">
        <button
          onClick={() => onTabChange('due')}
          className={`flex-1 py-1 px-2 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'due'
              ? 'bg-slate-800 text-white shadow-sm font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <span>今日待办</span>
          {summary.totalDue > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {summary.totalDue}
            </span>
          )}
        </button>

        <button
          onClick={() => onTabChange('completed')}
          className={`flex-1 py-1 px-2 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1 ${
            activeTab === 'completed'
              ? 'bg-slate-800 text-white shadow-sm font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <span>已完成</span>
          {summary.completedToday > 0 && (
            <span className="text-[10px] font-mono text-emerald-400">({summary.completedToday})</span>
          )}
        </button>

        <button
          onClick={() => onTabChange('library')}
          className={`flex-1 py-1 px-2 text-xs font-medium rounded-md transition-all ${
            activeTab === 'library'
              ? 'bg-slate-800 text-white shadow-sm font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          题库档案
        </button>

        <button
          onClick={() => onTabChange('calendar')}
          className={`flex-1 py-1 px-2 text-xs font-medium rounded-md transition-all ${
            activeTab === 'calendar'
              ? 'bg-slate-800 text-white shadow-sm font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          日历负荷
        </button>
      </nav>
    </header>
  );
};
