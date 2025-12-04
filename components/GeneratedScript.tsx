import React, { useState } from 'react';
import { TopicSuggestion } from '../types';

interface GeneratedScriptProps {
  topic: TopicSuggestion | null;
  script: string;
  onReset: () => void;
}

export const GeneratedScript: React.FC<GeneratedScriptProps> = ({ topic, script, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl relative">
        <div className="flex justify-between items-start mb-6 border-b border-slate-700 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {topic?.title || "생성된 대본"}
            </h2>
            <p className="text-slate-400 text-sm mt-1">AI가 최적화한 유튜브 대본입니다.</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                copied 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/25'
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>복사완료!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                  <span>대본 복사</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="prose prose-invert prose-slate max-w-none bg-slate-900/50 p-6 rounded-lg border border-slate-700/50 font-medium">
            <pre className="whitespace-pre-wrap font-sans text-slate-200 text-base leading-relaxed">
                {script}
            </pre>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="flex items-center text-slate-400 hover:text-white transition-colors px-6 py-3"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          새로운 대본 만들기
        </button>
      </div>
    </div>
  );
};
