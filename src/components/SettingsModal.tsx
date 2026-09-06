import React, { useState } from 'react';
import { X, Download, Upload, RotateCcw, Check } from 'lucide-react';
import { exportDataJson, importDataJson, INITIAL_SAMPLE_PROBLEMS, saveProblem } from '../utils/storage';

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

  if (!isOpen) return null;

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

  const handleResetSample = async () => {
    if (confirm('是否重置并加载默认演示题目数据？')) {
      for (const p of INITIAL_SAMPLE_PROBLEMS) {
        await saveProblem(p);
      }
      onDataChanged();
      setStatusMsg('已重置并载入演示数据！');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-[360px] overflow-hidden shadow-soft">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
          <h2 className="text-xs font-semibold text-slate-100">扩展设置与数据备份</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4 text-xs">
          {statusMsg && (
            <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>{statusMsg}</span>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-slate-400 font-medium text-[11px]">数据备份与迁移</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleExport}
                className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 border border-slate-700/60 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>导出备份</span>
              </button>

              <label className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 border border-slate-700/60 transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-sky-400" />
                <span>导入备份</span>
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h3 className="text-slate-400 font-medium text-[11px]">快捷操作</h3>
            <button
              onClick={handleResetSample}
              className="w-full p-2 rounded bg-slate-800/80 hover:bg-slate-800 text-slate-300 flex items-center justify-center gap-1.5 border border-slate-700/40 text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>重新载入预设示例题目</span>
            </button>
          </div>

          <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            <p className="font-semibold text-slate-300 mb-1">💡 本地优先数据协议</p>
            <p>
              所有刷题数据完全保存在浏览器本地，绝不上报远程服务器。打开任意力扣页面即可自动捕获题目并开始间隔复习。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
