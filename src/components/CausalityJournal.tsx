import React from 'react';
import { CausalityEntry } from '../types/game';
import { TrendingDown, TrendingUp, Info } from 'lucide-react';

interface CausalityJournalProps {
  logs: CausalityEntry[];
}

export const CausalityJournal: React.FC<CausalityJournalProps> = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] p-4 shadow-[3px_3px_0px_var(--border-hard)] flex flex-col items-center justify-center opacity-50 min-h-[120px]">
        <Info className="w-5 h-5 mb-2" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-center">Aucun mouvement majeur<br/>ce mois-ci</span>
      </div>
    );
  }

  const getTypeLabel = (type: CausalityEntry['type']) => {
    switch (type) {
      case 'popularity': return 'Popularité';
      case 'tension': return 'Indice Tension';
      case 'deficit': return 'Déficit Public';
      case 'authority': return 'Autorité Politique';
      case 'majority': return 'Majorité';
      case 'rating': return 'Note Souveraine';
      case 'bourse': return 'Marchés Financiers';
      default: return type;
    }
  };

  const getDeltaStyle = (type: CausalityEntry['type'], delta: number) => {
    const isBadIncrease = type === 'tension' || type === 'deficit';
    if (delta > 0) return isBadIncrease ? 'text-[var(--accent-red)]' : 'text-[var(--accent-emerald)]';
    else return isBadIncrease ? 'text-[var(--accent-emerald)]' : 'text-[var(--accent-red)]';
  };

  return (
    <div className="bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] p-4 shadow-[3px_3px_0px_var(--border-hard)] flex flex-col space-y-3 h-full">
      <div className="flex items-center justify-between border-b-2 border-[var(--border-hard)] pb-2">
        <h3 className="font-bold uppercase font-mono text-[11px] tracking-wider">
          Journal de Causalité
        </h3>
        <span className="text-[9px] bg-[var(--text-main)] text-[var(--bg-panel)] px-1.5 py-0.5 font-bold uppercase">
          Ce Mois
        </span>
      </div>
      
      <div className="space-y-2 overflow-y-auto pr-1 flex-1">
        {logs.map((log, index) => {
          const sign = log.delta > 0 ? '+' : '';
          const isNegativeVal = log.delta < 0;
          return (
            <div key={index} className="flex flex-col bg-[var(--bg-panel)] border border-[var(--border-hard)] p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase underline decoration-dashed underline-offset-2 opacity-80">
                  {getTypeLabel(log.type)}
                </span>
                <span className={`text-[11px] font-black font-mono flex items-center ${getDeltaStyle(log.type, log.delta)}`}>
                  {isNegativeVal ? <TrendingDown className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
                  {sign}{log.delta}{log.type === 'deficit' || log.type === 'popularity' ? '%' : ''}
                </span>
              </div>
              <span className="text-[10px] leading-tight opacity-70">
                {log.reason}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
