import React from 'react';
import { GameState } from '../types/game';
import { History, Calendar, CheckCircle2 } from 'lucide-react';

interface HistoryTabProps {
  state: GameState;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({ state }) => {
  return (
    <div className="space-y-4 text-[var(--text-main)]">
      
      {/* En-tête Journal Brutaliste */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)]">
        <div className="flex items-center space-x-3 pb-3 border-b-2 border-[var(--border-hard)]">
          <div className="w-9 h-9 bg-[var(--text-main)] text-[var(--bg-panel)] flex items-center justify-center font-bold text-sm">
            <History className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
              ARCHIVES DE LA PRÉSIDENCE
            </span>
            <h2 className="text-xl font-serif font-black mt-1">
              Journal de Bord & Décisions d'État
            </h2>
          </div>
        </div>

        {/* Liste des Décisions Archivées */}
        <div className="mt-4 space-y-2.5">
          {state.history.length === 0 ? (
            <div className="p-4 bg-[var(--bg-subtle)] border border-[var(--border-hard)] text-center font-mono text-xs opacity-70">
              Aucun arbitrage archivé pour l'instant. Les décisions apparaîtront ici à la fin de chaque tour.
            </div>
          ) : (
            state.history.map((item, idx) => (
              <div
                key={idx}
                className="bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    T{item.turn}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{item.date}</span>
                      <span className="opacity-40">•</span>
                      <span className="font-bold text-[var(--pol-centre)]">{item.choiceMade}</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm mt-0.5">
                      {item.headline}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center space-x-4 self-end sm:self-auto shrink-0 font-mono text-xs">
                  <div className="bg-[var(--bg-panel)] px-2.5 py-1 border border-[var(--border-hard)] text-center">
                    <span className="text-[10px] opacity-60 block">OPINION</span>
                    <strong>{item.popularityAfter}%</strong>
                  </div>
                  <div className="bg-[var(--bg-panel)] px-2.5 py-1 border border-[var(--border-hard)] text-center">
                    <span className="text-[10px] opacity-60 block">TENSION</span>
                    <strong className="uppercase">{item.tensionAfter}</strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
