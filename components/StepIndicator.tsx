import React from 'react';
import { AppStep } from '../types';

interface StepIndicatorProps {
  currentStep: AppStep;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: AppStep.INPUT, label: '1. 대본 입력' },
    { id: AppStep.SELECTING, label: '2. 주제 선정' },
    { id: AppStep.RESULT, label: '3. 대본 완성' },
  ];

  const getStepStatus = (stepId: AppStep) => {
    const order = [AppStep.INPUT, AppStep.SELECTING, AppStep.GENERATING, AppStep.RESULT];
    // Treat GENERATING as mostly same level as SELECTING/RESULT transition visually
    const currentIdx = order.indexOf(currentStep === AppStep.GENERATING ? AppStep.SELECTING : currentStep);
    const stepIdx = order.indexOf(stepId);

    if (stepIdx < currentIdx) return 'completed';
    if (stepIdx === currentIdx) return 'current';
    return 'pending';
  };

  return (
    <div className="flex justify-center items-center space-x-4 mb-8 w-full max-w-2xl mx-auto">
      {steps.map((step, index) => {
        const status = getStepStatus(step.id);
        return (
          <React.Fragment key={step.id}>
            <div className={`flex items-center space-x-2 ${
              status === 'pending' ? 'opacity-40' : 'opacity-100'
            }`}>
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2
                ${status === 'current' ? 'border-indigo-500 text-indigo-500 bg-indigo-500/10' : ''}
                ${status === 'completed' ? 'border-green-500 bg-green-500 text-white' : ''}
                ${status === 'pending' ? 'border-slate-600 text-slate-400' : ''}
              `}>
                {status === 'completed' ? '✓' : index + 1}
              </div>
              <span className={`text-sm font-medium ${
                status === 'current' ? 'text-indigo-400' : 'text-slate-300'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-12 h-0.5 bg-slate-700"></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
