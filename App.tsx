import React, { useState } from 'react';
import { analyzeAndSuggestTopics, generateFullScript } from './services/geminiService';
import { AppStep, ScriptAnalysisResponse, TopicSuggestion } from './types';
import { StepIndicator } from './components/StepIndicator';
import { AnalysisResult } from './components/AnalysisResult';
import { GeneratedScript } from './components/GeneratedScript';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.INPUT);
  const [inputScript, setInputScript] = useState('');
  const [analysis, setAnalysis] = useState<ScriptAnalysisResponse | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicSuggestion | null>(null);
  const [generatedScript, setGeneratedScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputScript.trim()) {
      setError('대본이나 아이디어를 입력해주세요.');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeAndSuggestTopics(inputScript);
      setAnalysis(result);
      setStep(AppStep.SELECTING);
    } catch (err) {
      setError('분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTopic = async (topic: TopicSuggestion) => {
    if (!analysis) return;
    
    setSelectedTopic(topic);
    setStep(AppStep.GENERATING);
    setLoading(true);
    
    try {
      // Pass original script for context and analyzed tone
      const script = await generateFullScript(topic, inputScript, analysis.tone);
      setGeneratedScript(script);
      setStep(AppStep.RESULT);
    } catch (err) {
      setError('대본 생성 중 오류가 발생했습니다.');
      setStep(AppStep.SELECTING); // Go back if failed
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(AppStep.INPUT);
    setInputScript('');
    setAnalysis(null);
    setSelectedTopic(null);
    setGeneratedScript('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              TubeGenius
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-3 text-white">AI 유튜브 대본 생성기</h2>
            <p className="text-slate-400">기존 대본을 분석하고, 조회수가 터지는 새로운 주제와 대본을 자동으로 생성하세요.</p>
        </div>

        <StepIndicator currentStep={step} />

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center animate-pulse">
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {/* Step 1: Input */}
        {step === AppStep.INPUT && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
            <label htmlFor="scriptInput" className="block text-lg font-semibold text-white mb-2">
              기존 대본이나 아이디어를 입력하세요
            </label>
            <p className="text-sm text-slate-400 mb-4">
              평소 영상 스타일, 말투, 주로 다루는 내용을 파악하기 위해 사용됩니다. (짧아도 괜찮아요!)
            </p>
            <textarea
              id="scriptInput"
              className="w-full h-64 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-200 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all"
              placeholder="예시: 안녕하세요! 오늘은 지난번 댓글에서 요청해주신 '초보자가 실수하는 3가지'에 대해 이야기해보려고 합니다. 첫 번째는..."
              value={inputScript}
              onChange={(e) => setInputScript(e.target.value)}
            />
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAnalyze}
                disabled={loading || !inputScript.trim()}
                className={`
                  flex items-center px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition-all transform hover:-translate-y-0.5
                  ${loading || !inputScript.trim() 
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25'}
                `}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    분석 중...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    분석 및 주제 추천받기
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Selection */}
        {step === AppStep.SELECTING && analysis && (
           <AnalysisResult 
             analysis={analysis} 
             onSelectTopic={handleSelectTopic} 
             isGenerating={false} 
           />
        )}

        {/* Step 2.5: Generating Transition Overlay */}
        {step === AppStep.GENERATING && analysis && (
            <div className="relative">
                 <AnalysisResult 
                    analysis={analysis} 
                    onSelectTopic={() => {}} 
                    isGenerating={true} 
                />
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
                    <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-indigo-500/30 text-center max-w-sm mx-4">
                        <div className="relative w-20 h-20 mx-auto mb-6">
                            <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                            <svg className="absolute inset-0 w-10 h-10 m-auto text-indigo-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">대본 작성 중...</h3>
                        <p className="text-slate-400 mb-1">"{selectedTopic?.title}"</p>
                        <p className="text-slate-500 text-sm">AI가 창의력을 발휘하고 있습니다. 잠시만 기다려주세요.</p>
                    </div>
                </div>
            </div>
        )}

        {/* Step 3: Result */}
        {step === AppStep.RESULT && (
          <GeneratedScript 
            topic={selectedTopic} 
            script={generatedScript} 
            onReset={handleReset} 
          />
        )}

      </main>
    </div>
  );
};

export default App;
