import React from 'react';
import { GameState } from '../types/game';

interface LiveNewsTickerProps {
  state: GameState;
}

export const LiveNewsTicker: React.FC<LiveNewsTickerProps> = ({ state }) => {
  const strikeRisk = state.social?.strikeRisk || 0;
  const deficit = Math.abs(state.economy?.deficit || 0);
  const seats = (state.parliament || [])
    .filter(g => g.stanceTowardsPlayer === 'loyal' || g.stanceTowardsPlayer === 'coalition')
    .reduce((sum, g) => sum + g.seats, 0);

  const headlineA = strikeRisk > 75 
    ? '🔴 URGENCE SOCIALE : Intersyndicale en alerte maximale • Menace de blocage des raffineries'
    : strikeRisk > 45 
      ? '🟡 CLIMAT SOCIAL : Négociations sous tension à Matignon avec les partenaires sociaux'
      : '🟢 PAIX SOCIALE : Dialogue social fluide • Aucun préavis de grève majeure déposé';

  const headlineB = deficit > 5.0 
    ? `📉 BERCY : Alerte de la Commission européenne sur le déficit (-${deficit.toFixed(1)}% du PIB)`
    : `📈 BOURSE DE PARIS : Le CAC 40 et le spread OAT/Bund restent sous contrôle`;

  const headlineC = seats >= 289
    ? `🏛️ PALAIS-BOURBON : Majorité absolue garantie avec ${seats} députés acquis`
    : `⚠️ ASSEMBLÉE : Majorité relative (${seats}/289) • Risque permanent de motion de censure`;

  const headlineD = state.activeEvent 
    ? `⚡ EN DIRECT : Dossier « ${state.activeEvent.title} » soumis à l'arbitrage du Président`
    : `🇫🇷 ÉLYSÉE : Travaux réguliers du Conseil des Ministres en cours`;

  return (
    <div className="bg-[var(--border-hard)] text-[var(--bg-panel)] border-y border-[var(--border-hard)] py-1.5 px-3 overflow-hidden font-mono text-[11px] select-none flex items-center shadow-inner">
      <div className="flex items-center space-x-2 shrink-0 pr-4 font-black uppercase text-[var(--accent-red)] border-r border-[var(--bg-panel)]/30">
        <span className="w-2 h-2 rounded-full bg-[var(--accent-red)] animate-ping"></span>
        <span className="tracking-wider">INFO DIRECT</span>
      </div>

      <div className="overflow-hidden relative w-full whitespace-nowrap">
        <div className="inline-block animate-ticker pl-4 space-x-8 font-medium">
          <span>{headlineA}</span>
          <span className="opacity-40">•</span>
          <span>{headlineB}</span>
          <span className="opacity-40">•</span>
          <span>{headlineC}</span>
          <span className="opacity-40">•</span>
          <span>{headlineD}</span>
        </div>
      </div>
    </div>
  );
};
