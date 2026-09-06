import React, { useState, useEffect, useCallback } from 'react';
import { Problem, ReviewGrade, UserSettings } from '../types';
import {
  getProblems,
  recordReview,
  saveProblem,
  deleteProblem,
  computeDailySummary,
  getSettings,
} from '../utils/storage';
import { Header } from '../components/Header';
import { DueQueue } from '../components/DueQueue';
import { CompletedList } from '../components/CompletedList';
import { ProblemLibrary } from '../components/ProblemLibrary';
import { CalendarForecast } from '../components/CalendarForecast';
import { AddProblemModal } from '../components/AddProblemModal';
import { SettingsModal } from '../components/SettingsModal';
import { extractSlugFromUrl, fetchLeetCodeMeta } from '../utils/leetcodeApi';
import { getTodayString } from '../utils/ebbinghaus';
import { Sparkles, Check } from 'lucide-react';

export const App: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [activeTab, setActiveTab] = useState<'due' | 'completed' | 'library' | 'calendar'>('due');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalKeyword, setModalKeyword] = useState('');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Active Tab Detection
  const [currentTabProblem, setCurrentTabProblem] = useState<{
    slug: string;
    title: string;
    number: string;
    alreadyTracked: boolean;
  } | null>(null);

  const refreshData = useCallback(async () => {
    try {
      const [list, s] = await Promise.all([getProblems(), getSettings()]);
      setProblems(list);
      setSettings(s);
      return list;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData().then((list) => {
      // Check current active tab in Chrome
      if (typeof chrome !== 'undefined' && chrome.tabs?.query) {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
          const tab = tabs[0];
          if (tab && tab.url && tab.url.includes('/problems/')) {
            const slug = extractSlugFromUrl(tab.url);
            if (slug) {
              const tracked = (list || []).some((p) => p.slug === slug || tab.url?.includes(p.slug));
              // Extract title from tab.title: "206. 反转链表 - 力扣..."
              const docTitle = tab.title || '';
              const match = docTitle.match(/^(\d+)[\.\s、]+([^-—|]+)/);
              const number = match ? match[1] : '';
              const title = match ? match[2].trim() : slug;

              setCurrentTabProblem({
                slug,
                title,
                number,
                alreadyTracked: tracked,
              });
            }
          }
        });
      }
    });
  }, [refreshData]);

  const handleRate = async (id: string, grade: ReviewGrade) => {
    await recordReview(id, grade);
    await refreshData();
  };

  const handleAddProblem = async (newProb: Problem) => {
    await saveProblem(newProb);
    await refreshData();
    if (currentTabProblem && currentTabProblem.slug === newProb.slug) {
      setCurrentTabProblem({ ...currentTabProblem, alreadyTracked: true });
    }
    setActiveTab('due');
  };

  const handleDeleteProblem = async (id: string) => {
    await deleteProblem(id);
    await refreshData();
    if (currentTabProblem) {
      setCurrentTabProblem({ ...currentTabProblem, alreadyTracked: false });
    }
  };

  const handleOneClickImportCurrentTab = async () => {
    if (!currentTabProblem) return;
    const meta = await fetchLeetCodeMeta(currentTabProblem.slug);
    const newProb: Problem = {
      id: `lc-${currentTabProblem.slug}`,
      number: meta?.number || currentTabProblem.number || '0',
      title: meta?.title || currentTabProblem.title || currentTabProblem.slug,
      slug: currentTabProblem.slug,
      url: meta?.url || `https://leetcode.cn/problems/${currentTabProblem.slug}/`,
      difficulty: meta?.difficulty || 'Medium',
      tags: meta?.tags || ['力扣'],
      createdAt: Date.now(),
      repetition: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: getTodayString(),
      isSample: false,
      history: [],
    };

    await saveProblem(newProb);
    await refreshData();
    setCurrentTabProblem({ ...currentTabProblem, alreadyTracked: true });
    setActiveTab('due');
  };

  const summary = computeDailySummary(problems);

  return (
    <div className="w-[400px] min-h-[560px] max-h-[600px] flex flex-col bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden select-none">
      <Header
        summary={summary}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAddModal={() => {
          setModalKeyword('');
          setIsAddModalOpen(true);
        }}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
      />

      {/* Instant Active Tab LeetCode Ingestion Banner */}
      {currentTabProblem && !currentTabProblem.alreadyTracked && (
        <div className="bg-emerald-950/70 border-b border-emerald-500/30 px-3.5 py-2 flex items-center justify-between gap-2 animate-fadeIn">
          <div className="text-[11px] text-emerald-200 truncate flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">
              检测到力扣当前页：<strong>#{currentTabProblem.number} {currentTabProblem.title}</strong>
            </span>
          </div>

          <button
            onClick={handleOneClickImportCurrentTab}
            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium text-[11px] shrink-0 flex items-center gap-1 shadow-sm transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            <span>一键收录</span>
          </button>
        </div>
      )}

      {currentTabProblem && currentTabProblem.alreadyTracked && (
        <div className="bg-slate-900/60 border-b border-slate-800 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-slate-400">
          <span>当前页面题目已在艾宾浩斯复习库中</span>
          <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
            <Check className="w-3 h-3" />
            已跟踪
          </span>
        </div>
      )}

      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-500">
            加载艾宾浩斯记忆库...
          </div>
        ) : (
          <>
            {activeTab === 'due' && (
              <DueQueue
                problems={problems}
                onRate={handleRate}
                onDelete={handleDeleteProblem}
                onViewLibrary={() => setActiveTab('library')}
                ladder={settings?.ladder}
              />
            )}

            {activeTab === 'completed' && (
              <CompletedList problems={problems} onRate={handleRate} />
            )}

            {activeTab === 'library' && (
              <ProblemLibrary
                problems={problems}
                onRate={handleRate}
                onDeleteProblem={handleDeleteProblem}
              />
            )}

            {activeTab === 'calendar' && (
              <CalendarForecast problems={problems} />
            )}
          </>
        )}
      </main>

      <AddProblemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProblem}
        initialKeyword={modalKeyword}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onDataChanged={refreshData}
      />
    </div>
  );
};
