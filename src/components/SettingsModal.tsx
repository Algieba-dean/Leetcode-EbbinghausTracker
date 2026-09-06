import React, { useState, useEffect } from 'react';
import { X, Download, Upload, RotateCcw, Check, Trash2, Sliders } from 'lucide-react';
import {
  exportDataJson,
  importDataJson,
  INITIAL_SAMPLE_PROBLEMS,
  saveProblem,
  clearSampleProblems,
  clearAllProblems,
  getSettings,
  saveSettings,
} from '../utils/storage';
import { DEFAULT_EBBINGHAUS_LADDER } from '../utils/ebbinghaus';
import { UserSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onDataChanged,
}) => {
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [ladderInput, setLadderInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      getSettings().then((s) => {
        setSettings(s);
        setLadderInput((s.ladder || DEFAULT_EBBINGHAUS_LADDER).join(', '));
      });
      setStatusMsg(null);
    }
  }, [isOpen]);

  if (!isOpen || !settings) return null;

  const handleExport = async () => {
    const jsonStr = await exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leetcode-ebbinghaus-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg('数据已成功导出为 JSON 文件！');
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const ok = await importDataJson(content);
      if (ok) {
        setStatusMsg('题库备份导入成功！');
        onDataChanged();
      } else {
        setStatusMsg('导入失败：JSON 格式不正确');
      }
    };
    reader.readAsText(file);
  };

  const handleSaveLadder = async () => {
    const numbers = ladderInput
      .split(/[,，\s]+/)
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n) && n > 0);

    if (numbers.length < 2) {
      setStatusMsg('阶梯至少需要包含 2 个递增天数！');
      return;
    }

    const newSettings: UserSettings = {
      ...settings,
      ladder: numbers,
    };
    await saveSettings(newSettings);
    setSettings(newSettings);
    setStatusMsg(`已更新艾宾浩斯复习阶梯: [${numbers.join(', ')}] 天`);
    onDataChanged();
  };

  const handleResetLadder = async () => {
    const newSettings: UserSettings = {
      ...settings,
      ladder: DEFAULT_EBBINGHAUS_LADDER,
    };
    await saveSettings(newSettings);
    setSettings(newSettings);
    setLadderInput(DEFAULT_EBBINGHAUS_LADDER.join(', '));
    setStatusMsg('已恢复默认标准阶梯：[1, 2, 4, 7, 15, 30, 60, 120] 天');
    onDataChanged();
  };

  const handleClearSample = async () => {
    if (confirm('确定清除预设的示例题目吗？(您自己添加的题目将被保留)')) {
      const removedCount = await clearSampleProblems();
      await onDataChanged();
      if (removedCount > 0) {
        setStatusMsg(`已成功清除 ${removedCount} 道初始预置示例题目！`);
      } else {
        setStatusMsg('题库中没有检测到预设的示例题目。');
      }
    }
  };

  const handleClearAll = async () => {
    if (confirm('⚠️ 警告：确定清空全部题库吗？该操作不可撤销，建议先导出备份！')) {
      await clearAllProblems();
      await onDataChanged();
      setStatusMsg('题库已全部清空！');
    }
  };

  const handleResetSample = async () => {
    if (confirm('是否重新加载默认演示题目数据？')) {
      for (const p of INITIAL_SAMPLE_PROBLEMS) {
        await saveProblem(p);
      }
      await onDataChanged();
      setStatusMsg('已载入演示数据！');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-[370px] overflow-hidden shadow-soft max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 shrink-0">
          <h2 id="settings-modal-title" className="text-xs font-semibold text-slate-100">复习算法设置与数据管理</h2>
          <button
            onClick={onClose}
            aria-label="关闭设置窗口"
            className="text-slate-400 hover:text-white transition-colors rounded p-1 focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4 text-xs overflow-y-auto custom-scrollbar flex-1">
          {statusMsg && (
            <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          {/* Ebbinghaus Ladder Setting */}
          <div className="space-y-2 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                艾宾浩斯复习阶梯 (天数序列)
              </span>
              <button
                onClick={handleResetLadder}
                className="text-[10px] text-slate-400 hover:text-emerald-400 underline"
              >
                恢复标准
              </button>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              每次良好(Good)解答稳步前进1阶，秒杀(Easy)跳跃2阶，完全遗忘(Again)退回第1阶。
            </p>
            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="text"
                value={ladderInput}
                onChange={(e) => setLadderInput(e.target.value)}
                placeholder="例如 1, 2, 4, 7, 15, 30, 60, 120"
                className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 font-mono text-[11px] focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSaveLadder}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium text-[11px] transition-colors"
              >
                保存
              </button>
            </div>
          </div>

          {/* Data Export / Import */}
          <div className="space-y-2">
            <h3 className="text-slate-400 font-medium text-[11px]">数据备份与迁移</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleExport}
                className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 border border-slate-700/60 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>导出题库备份</span>
              </button>

              <label className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 border border-slate-700/60 transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-sky-400" />
                <span>导入备份文件</span>
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
            </div>
          </div>

          {/* Problem Cleanups & Initial Data */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h3 className="text-slate-400 font-medium text-[11px]">题库管理与重置</h3>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={handleClearSample}
                className="w-full p-2 rounded bg-slate-800/80 hover:bg-slate-800 text-slate-300 flex items-center justify-center gap-1.5 border border-slate-700/40 text-xs transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 text-amber-400" />
                <span>一键移除预置示例题目 (保留自选题)</span>
              </button>

              <button
                onClick={handleResetSample}
                className="w-full p-2 rounded bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-300 flex items-center justify-center gap-1.5 border border-slate-700/30 text-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>重新载入初始示例题目</span>
              </button>

              <button
                onClick={handleClearAll}
                className="w-full p-2 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 flex items-center justify-center gap-1.5 border border-rose-500/20 text-xs transition-colors mt-1"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>清空全部题目数据</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
