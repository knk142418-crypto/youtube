import React from 'react';
import { ScriptAnalysisResponse, TopicSuggestion } from '../types';

interface AnalysisResultProps {
  analysis: ScriptAnalysisResponse;
  onSelectTopic: (topic: TopicSuggestion) => void;
  isGenerating: boolean;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, onSelectTopic, isGenerating }) => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          분석 리포트
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
            <span className="block text-xs text-slate-400 uppercase tracking-wider mb-1">감지된 톤앤매너</span>
            <span className="text-indigo-300 font-medium">{analysis.tone}</span>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
            <span className="block text-xs text-slate-400 uppercase tracking-wider mb-1">예상 타겟 시청자</span>
            <span className="text-emerald-300 font-medium">{analysis.targetAudience}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          추천 주제 (선택해주세요)
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {analysis.topics.map((topic, idx) => (
            <button
              key={idx}
              disabled={isGenerating}
              onClick={() => onSelectTopic(topic)}
              className="group text-left p-5 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-indigo-500 rounded-xl transition-all duration-200 shadow-md hover:shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-600 group-hover:bg-indigo-500 transition-colors"></div>
              <div className="pl-3">
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {topic.title}
                </h4>
                <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                  {topic.description}
                </p>
                <div className="flex items-center text-xs text-slate-400 bg-slate-900/50 py-1.5 px-3 rounded-full w-fit">
                  <svg className="w-3 h-3 mr-1.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  추천 이유: {topic.reasoning}
                </div>
              </div>
              {isGenerating && (
                <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center backdrop-blur-sm">
                   {/* Loader will be handled globally, but disabling interaction here */}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
