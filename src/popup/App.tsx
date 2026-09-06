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

export const App: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [activeTab, setActiveTab] = useState<'due' | 'completed' | 'library' | 'calendar'>('due');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(async () => {
    try {
      const [list, s] = await Promise.all([getProblems(), getSettings()]);
      setProblems(list);
      setSettings(s);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleRate = async (id: string, grade: ReviewGrade) => {
    await recordReview(id, grade);
    await refreshData();
  };

  const handleAddProblem = async (newProb: Problem) => {
    await saveProblem(newProb);
    await refreshData();
    setActiveTab('due');
  };

  const handleDeleteProblem = async (id: string) => {
    await deleteProblem(id);
    await refreshData();
  };

  const summary = computeDailySummary(problems);

  return (
    <div className="w-[400px] min-h-[560px] max-h-[600px] flex flex-col bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden select-none">
      <Header
        summary={summary}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
      />

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
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onDataChanged={refreshData}
      />
    </div>
  );
};
