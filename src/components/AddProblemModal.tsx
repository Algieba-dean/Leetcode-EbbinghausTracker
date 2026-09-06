import React, { useState, useEffect } from 'react';
import { Difficulty, Problem } from '../types';
import { X, Sparkles, Loader2, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { getTodayString } from '../utils/ebbinghaus';
import { fetchLeetCodeMeta, FetchedProblemMeta } from '../utils/leetcodeApi';

interface AddProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (problem: Problem) => void;
  initialKeyword?: string;
}

export const AddProblemModal: React.FC<AddProblemModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  initialKeyword = '',
}) => {
  const [smartInput, setSmartInput] = useState(initialKeyword);
  const [isSearching, setIsSearching] = useState(false);
  const [previewMeta, setPreviewMeta] = useState<FetchedProblemMeta | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  // Manual fallback toggle
  const [showManual, setShowManual] = useState(false);
  const [manualNumber, setManualNumber] = useState('');
  const [manualTitle, setManualTitle] = useState('');
  const [manualDiff, setManualDiff] = useState<Difficulty>('Medium');
  const [manualTags, setManualTags] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSmartInput(initialKeyword);
      setPreviewMeta(null);
      setErrorMsg(null);
      setNotes('');
      if (initialKeyword) {
        handleSmartSearch(initialKeyword);
      }
    }
  }, [isOpen, initialKeyword]);

  if (!isOpen) return null;

  const handleSmartSearch = async (queryText?: string) => {
    const q = (queryText !== undefined ? queryText : smartInput).trim();
    if (!q) return;

    setIsSearching(true);
    setErrorMsg(null);
    try {
      const meta = await fetchLeetCodeMeta(q);
      if (meta) {
        setPreviewMeta(meta);
      } else {
        setErrorMsg('未找到匹配的力扣题目，请检查题号（如 206）或完整题目链接');
      }
    } catch {
      setErrorMsg('网络解析失败，请检查网络或使用手动录入');
    } finally {
      setIsSearching(false);
    }
  };

  const handleConfirmAutoAdd = () => {
    if (!previewMeta) return;

    const newProb: Problem = {
      id: `lc-${previewMeta.slug || Date.now()}`,
      number: previewMeta.number,
      title: previewMeta.title,
      slug: previewMeta.slug,
      url: previewMeta.url,
      difficulty: previewMeta.difficulty,
      tags: previewMeta.tags,
      notes: notes.trim(),
      createdAt: Date.now(),
      repetition: 0,
      interval: 1, // 1st day review
      easeFactor: 2.5,
      nextReviewDate: getTodayString(),
      isSample: false,
      history: [],
    };

    onAdd(newProb);
    onClose();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;

    const probNum = manualNumber.trim() || 'Custom';
    const slug = manualTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `problem-${Date.now()}`;
    const tags = manualTags.split(/[,，\s]+/).map((t) => t.trim()).filter(Boolean);

    const newProb: Problem = {
      id: `prob-${Date.now()}`,
      number: probNum,
      title: manualTitle.trim(),
      slug,
      url: `https://leetcode.cn/problems/${slug}/`,
      difficulty: manualDiff,
      tags: tags.length > 0 ? tags : ['算法'],
      notes: notes.trim(),
      createdAt: Date.now(),
      repetition: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: getTodayString(),
      isSample: false,
      history: [],
    };

    onAdd(newProb);
    onClose();
  };

  const difficultyColors = {
    Easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    Hard: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn select-none">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-[360px] overflow-hidden shadow-soft max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-1.5 text-slate-100 font-semibold text-xs">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>智能自动导入题目</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3.5 text-xs overflow-y-auto custom-scrollbar flex-1">
          {/* Smart Input Search Bar */}
          <div className="space-y-1.5">
            <label className="block text-slate-300 font-medium text-xs">
              输入题号、题目名或粘贴力扣链接：
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={smartInput}
                autoFocus
                onChange={(e) => setSmartInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSmartSearch()}
                placeholder="例如 206 / 两数之和 / 粘贴网址"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => handleSmartSearch()}
                disabled={isSearching || !smartInput.trim()}
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium text-xs transition-colors flex items-center gap-1 shrink-0 shadow-sm"
              >
                {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>自动解析</span>}
              </button>
            </div>
          </div>

          {/* Error notice */}
          {errorMsg && (
            <div className="p-2 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px] leading-relaxed">
              {errorMsg}
            </div>
          )}

          {/* Auto Parsed Result Preview Card */}
          {previewMeta && (
            <div className="p-3 rounded-lg bg-slate-950 border border-emerald-500/40 shadow-sm space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  已自动识别力扣官方元数据
                </span>
                <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] border ${difficultyColors[previewMeta.difficulty]}`}>
                  {previewMeta.difficulty}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs font-bold text-slate-400">#{previewMeta.number}</span>
                <span className="text-sm font-semibold text-slate-100">{previewMeta.title}</span>
              </div>

              <div className="flex items-center gap-1 flex-wrap">
                {previewMeta.tags.map((t) => (
                  <span key={t} className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <label className="block text-slate-400 text-[10px] mb-1">思路卡片 / 核心破局要点 (选填)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="可记录关键算法套路或易错点..."
                  className="w-full bg-slate-900 border border-slate-700/60 rounded p-1.5 text-[11px] text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
                />
              </div>

              <button
                type="button"
                onClick={handleConfirmAutoAdd}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm mt-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>立即纳入艾宾浩斯复习计划</span>
              </button>
            </div>
          )}

          {/* Collapsible Manual Add for non-LeetCode custom topics */}
          <div className="pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowManual(!showManual)}
              className="w-full flex items-center justify-between text-[11px] text-slate-400 hover:text-slate-300 py-1"
            >
              <span>非力扣题目？点击展开纯手动模式</span>
              {showManual ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showManual && (
              <form onSubmit={handleManualSubmit} className="mt-2 space-y-2.5 pt-1">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-500 text-[10px] mb-0.5">编号</label>
                    <input
                      type="text"
                      placeholder="题号"
                      value={manualNumber}
                      onChange={(e) => setManualNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 text-xs font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-slate-500 text-[10px] mb-0.5">题目名称 *</label>
                    <input
                      type="text"
                      required
                      placeholder="题目名称"
                      value={manualTitle}
                      onChange={(e) => setManualTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setManualDiff(d)}
                      className={`flex-1 py-1 text-[11px] rounded border font-mono ${
                        manualDiff === d
                          ? 'bg-slate-700 text-white font-bold border-slate-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="标签 (例如 动态规划, 背包)"
                  value={manualTags}
                  onChange={(e) => setManualTags(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                />

                <button
                  type="submit"
                  className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-medium text-xs border border-slate-700 transition-colors"
                >
                  添加手动卡片
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
