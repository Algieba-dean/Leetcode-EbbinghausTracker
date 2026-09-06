import React, { useState } from 'react';
import { Difficulty, Problem } from '../types';
import { X, Plus, Sparkles } from 'lucide-react';
import { getTodayString } from '../utils/ebbinghaus';

interface AddProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (problem: Problem) => void;
}

export const AddProblemModal: React.FC<AddProblemModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [number, setNumber] = useState('');
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [tagsStr, setTagsStr] = useState('');
  const [notes, setNotes] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const probNum = number.trim() || 'Custom';
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `problem-${Date.now()}`;
    const url = customUrl.trim() || `https://leetcode.cn/problems/${slug}/`;
    const tags = tagsStr
      .split(/[,，\s]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    const newProb: Problem = {
      id: `prob-${Date.now()}`,
      number: probNum,
      title: title.trim(),
      slug,
      url,
      difficulty,
      tags: tags.length > 0 ? tags : ['算法'],
      notes: notes.trim(),
      createdAt: Date.now(),
      repetition: 0,
      interval: 1,
      easeFactor: 2.5,
      nextReviewDate: getTodayString(),
      history: [],
    };

    onAdd(newProb);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-[360px] overflow-hidden shadow-soft">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-100 font-semibold text-xs">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>手动录入艾宾浩斯复习题</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-slate-400 mb-1 text-[11px]">题号</label>
              <input
                type="text"
                placeholder="例如 206"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-slate-400 mb-1 text-[11px]">
                题目名称 <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="例如 反转链表"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 text-[11px]">自定义链接 (选填，默认力扣题目页)</label>
            <input
              type="url"
              placeholder="https://leetcode.cn/problems/..."
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 text-[11px]">难度评级</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`py-1 text-center font-mono text-[11px] rounded border transition-colors ${
                    difficulty === d
                      ? d === 'Easy'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                        : d === 'Medium'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/50 font-bold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 text-[11px]">算法分类标签 (逗号分隔)</label>
            <input
              type="text"
              placeholder="例如 链表, 双指针, 递归"
              value={tagsStr}
              onChange={(e) => setTagsStr(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 text-[11px]">解题思路卡片 (选填)</label>
            <textarea
              rows={2}
              placeholder="记录关键破局点、反直觉陷阱或时间复杂度..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded text-slate-400 hover:text-white"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>纳入复习计划</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
