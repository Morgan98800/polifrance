import React, { useState } from 'react';
import { FlashNewsEvent, FlashNewsChoice } from '../types/game';
import { soundEffects } from '../utils/audio';
import { AlertOctagon, Radio, ArrowRight, ShieldAlert, Zap, TrendingUp, TrendingDown } from 'lucide-react';

interface FlashNewsModalProps {
  event: FlashNewsEvent;
  onResolve: (choice: FlashNewsChoice) => void;
}

export const FlashNewsModal: React.FC<FlashNewsModalProps> = ({ event, onResolve }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChoose = (idx: number) => {
    soundEffects.playStamp();
    setSelectedIdx(idx);
    setIsProcessing(true);

    setTimeout(() => {
      onResolve(event.choices[idx]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in font-mono">
      <div className="bg-[var(--bg-panel)] border-4 border-[var(--accent-red)] max-w-2xl w-full p-5 sm:p-7 shadow-[10px_10px_0px_var(--accent-red)] space-y-6 relative overflow-hidden">
        
        {/* Liseré d'alerte animé */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[var(--accent-red)] animate-pulse" />

        {/* En-tête Flash info */}
        <div className="flex items-center justify-between border-b-2 border-[var(--border-hard)] pb-3 pt-1">
          <div className="flex items-center space-x-2.5 text-[var(--accent-red)] font-black">
            <span className="w-3 h-3 bg-[var(--accent-red)] rounded-full animate-ping" />
            <Radio className="w-5 h-5 stroke-[2.5]" />
            <span className="text-xs sm:text-sm uppercase tracking-widest font-black">
              {event.timeLabel} • FLASH INFO D'URGENCE
            </span>
          </div>
          <span className="text-[10px] opacity-75 font-bold uppercase">
            {event.source}
          </span>
        </div>

        {/* Titre et Sous-titre */}
        <div className="space-y-2 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] p-4">
          <h2 className="text-base sm:text-lg font-black font-display uppercase tracking-tight text-[var(--text-main)] leading-snug">
            {event.title}
          </h2>
          <p className="text-xs sm:text-sm font-sans opacity-85 leading-relaxed">
            {event.subtitle}
          </p>
        </div>

        {/* Arbitrage d'Urgence */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase text-[var(--text-main)]">
            <AlertOctagon className="w-4 h-4 text-[var(--accent-red)]" />
            <span>ARBITRAGE PRÉSIDENTIEL IMMÉDIAT :</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {event.choices.map((choice, index) => {
              const isSelected = selectedIdx === index;
              return (
                <button
                  key={index}
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleChoose(index)}
                  className={`text-left p-4 border-2 border-[var(--border-hard)] transition-all flex flex-col justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--accent-red)] text-white shadow-none translate-x-[2px] translate-y-[2px]'
                      : 'bg-[var(--bg-panel)] hover:bg-[var(--bg-subtle)] text-[var(--text-main)] shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]'
                  }`}
                >
                  <div className="space-y-1.5 mb-2">
                    <div className="flex items-center justify-between font-bold text-xs sm:text-sm uppercase">
                      <span className="flex items-center space-x-2">
                        <span className="w-5 h-5 bg-[var(--text-main)] text-[var(--bg-panel)] flex items-center justify-center font-black text-[11px] shrink-0">
                          {index === 0 ? 'A' : 'B'}
                        </span>
                        <span>{choice.label}</span>
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-[11px] font-sans opacity-75 pl-7">
                      {choice.description}
                    </p>
                  </div>

                  {/* Impact preview */}
                  <div className="flex flex-wrap gap-1.5 pl-7 pt-2 border-t border-[var(--border-hard)]/40 text-[10px] font-bold">
                    {choice.effects.popularityDelta !== undefined && (
                      <span className={`px-1.5 py-0.5 border border-[var(--border-hard)] ${
                        choice.effects.popularityDelta >= 0 ? 'bg-[var(--accent-emerald)]/20 text-[var(--accent-emerald)]' : 'bg-[var(--accent-red)]/20 text-[var(--accent-red)]'
                      }`}>
                        Pop : {choice.effects.popularityDelta > 0 ? `+${choice.effects.popularityDelta}%` : `${choice.effects.popularityDelta}%`}
                      </span>
                    )}
                    {choice.effects.tensionDelta !== undefined && (
                      <span className={`px-1.5 py-0.5 border border-[var(--border-hard)] ${
                        choice.effects.tensionDelta <= 0 ? 'bg-[var(--accent-emerald)]/20 text-[var(--accent-emerald)]' : 'bg-[var(--accent-red)]/20 text-[var(--accent-red)]'
                      }`}>
                        Tension : {choice.effects.tensionDelta > 0 ? `+${choice.effects.tensionDelta}` : `${choice.effects.tensionDelta}`}
                      </span>
                    )}
                    {choice.effects.authorityDelta !== undefined && (
                      <span className="px-1.5 py-0.5 border border-[var(--border-hard)] bg-[var(--bg-subtle)] opacity-80">
                        Autorité : {choice.effects.authorityDelta > 0 ? `+${choice.effects.authorityDelta}` : `${choice.effects.authorityDelta}`}
                      </span>
                    )}
                    {choice.effects.deficitDelta !== undefined && (
                      <span className="px-1.5 py-0.5 border border-[var(--border-hard)] bg-[var(--bg-subtle)] opacity-80">
                        Déficit : {choice.effects.deficitDelta > 0 ? `+${choice.effects.deficitDelta}%` : `${choice.effects.deficitDelta}%`}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
