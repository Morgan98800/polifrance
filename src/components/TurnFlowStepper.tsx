import React from 'react';
import { FileCheck, Users, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export type TurnStep = 'situation' | 'parliament' | 'arbitrage' | 'resolution';

interface TurnFlowStepperProps {
  currentStep: TurnStep;
  onStepChange: (step: TurnStep) => void;
  turnNumber: number;
  dateStr: string;
}

export const TurnFlowStepper: React.FC<TurnFlowStepperProps> = ({
  currentStep,
  onStepChange,
  turnNumber,
  dateStr
}) => {
  const steps: Array<{ id: TurnStep; label: string; icon: any }> = [
    { id: 'situation', label: '1. SITUATION', icon: FileCheck },
    { id: 'parliament', label: '2. PARLEMENT', icon: Users },
    { id: 'arbitrage', label: '3. ARBITRAGE', icon: Scale },
    { id: 'resolution', label: '4. IMPACTS', icon: CheckCircle2 }
  ];

  const handleStepClick = (sId: TurnStep) => {
    soundEffects.playKeystroke();
    onStepChange(sId);
  };

  return (
    <div className="w-full bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-2.5 shadow-[4px_4px_0px_var(--border-hard)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-[var(--text-main)]">
      
      {/* Badge du tour bien cadré */}
      <div className="flex items-center space-x-2.5 bg-[var(--bg-subtle)] px-3 py-1.5 border border-[var(--border-hard)] shrink-0 font-mono text-xs">
        <span className="font-black text-[var(--text-main)]">
          TOUR {turnNumber}
        </span>
        <span className="opacity-40">|</span>
        <span className="font-bold opacity-90">{dateStr}</span>
      </div>

      {/* Stepper à 4 étapes sans troncature et avec fort contraste */}
      <div className="flex items-center justify-start md:justify-end space-x-1.5 sm:space-x-2 font-mono text-xs overflow-x-auto pb-1 md:pb-0 flex-nowrap min-w-0">
        {steps.map((step, idx) => {
          const isActive = currentStep === step.id;
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => handleStepClick(step.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 border-2 border-[var(--border-hard)] font-bold uppercase transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)] translate-x-[1px] translate-y-[1px]'
                    : 'bg-[var(--bg-panel)] text-[var(--text-main)] hover:bg-[var(--bg-subtle)] active:translate-x-[2px] active:translate-y-[2px]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="inline">{step.label}</span>
              </button>
              {idx < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-[var(--text-main)] opacity-80 stroke-[2.5] shrink-0 mx-0.5" />
              )}
            </React.Fragment>
          );
        })}
      </div>

    </div>
  );
};
