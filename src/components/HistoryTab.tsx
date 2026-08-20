import React from 'react';
import { GameState } from '../types/game';
import { computePresidentialLegacy } from '../engine/simulation';
import { 
  History, TrendingUp, Sparkles, Shield, Landmark, 
  CheckCircle2, Flame, Award, Skull, Calendar, FileText, Wallet 
} from 'lucide-react';

interface HistoryTabProps {
  state: GameState;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({ state }) => {
  const legacy = state.legacyStats || computePresidentialLegacy(state);
  const historyList = [...state.history].reverse(); // Ordre chronologique pour le graphique

  // Points du graphique SVG
  const maxTurns = Math.max(5, historyList.length);
  const chartWidth = 600;
  const chartHeight = 120;
  const padding = 20;

  const pointsPop = historyList.map((item, idx) => {
    const x = padding + (idx / Math.max(1, historyList.length - 1)) * (chartWidth - padding * 2);
    const y = chartHeight - padding - ((item.popularityAfter || 50) / 100) * (chartHeight - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const totalActs = state.history.length;

  return (
    <div className="max-w-4xl mx-auto space-y-4 text-[var(--text-main)]">
      
      {/* En-tête Archives Épuré */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-4 sm:p-5 shadow-[3px_3px_0px_var(--border-hard)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-blue)] block font-mono">
            MÉMORIAL RÉPUBLICAIN & REGISTRE D'ÉTAT
          </span>
          <h2 className="font-display font-bold text-xl sm:text-2xl mt-0.5">
            Archives & Trajectoire du Mandat
          </h2>
          <p className="text-xs sm:text-sm font-serif opacity-80 mt-1">
            Chronique des arbitrages du Conseil des Ministres, évolution de l'opinion et bilan historique en cours.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs shrink-0">
          <span className="px-3 py-1.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] font-bold">
            {totalActs} {totalActs > 1 ? 'actes promulgués' : 'acte promulgué'}
          </span>
        </div>
      </div>

      {/* 1. COURBE VISUELLE DE TRAJECTOIRE (Popularité dans le temps) */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-4 sm:p-5 shadow-[3px_3px_0px_var(--border-hard)] space-y-3">
        <div className="flex items-center justify-between border-b border-[var(--border-hard)]/30 pb-2">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-[var(--accent-blue)]" />
            <h3 className="font-display font-bold text-sm uppercase">
              Trajectoire de l'Opinion Publique (Mois 1 à {state.turn})
            </h3>
          </div>
          <div className="flex items-center space-x-3 text-[10px] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[var(--accent-blue)] inline-block"></span>
              <span>Popularité (%)</span>
            </span>
          </div>
        </div>

        {/* Graphique SVG */}
        {historyList.length > 1 ? (
          <div className="w-full overflow-x-auto py-2">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-28 overflow-visible">
              {/* Lignes de repères */}
              <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="var(--border-hard)" strokeDasharray="3,3" opacity="0.3" />
              <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} stroke="var(--border-hard)" strokeDasharray="3,3" opacity="0.3" />
              <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="var(--border-hard)" strokeDasharray="3,3" opacity="0.3" />
              
              {/* Seuil de popularité 50% */}
              <text x={padding + 4} y={chartHeight / 2 - 4} fill="var(--text-main)" opacity="0.5" fontSize="8" fontFamily="monospace">Seuil 50%</text>

              {/* Ligne de Popularité */}
              <polyline
                fill="none"
                stroke="var(--accent-blue)"
                strokeWidth="2.5"
                points={pointsPop}
              />

              {/* Points sur la courbe */}
              {historyList.map((item, idx) => {
                const x = padding + (idx / Math.max(1, historyList.length - 1)) * (chartWidth - padding * 2);
                const y = chartHeight - padding - ((item.popularityAfter || 50) / 100) * (chartHeight - padding * 2);
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r="3.5"
                    fill="var(--bg-panel)"
                    stroke="var(--accent-blue)"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </div>
        ) : (
          <div className="p-4 bg-[var(--bg-subtle)] border border-[var(--border-hard)] text-center text-xs font-serif opacity-75">
            La courbe d'opinion s'établira au fil de vos premiers mois à l'Élysée.
          </div>
        )}
      </div>

      {/* 2. LE BILAN HISTORIQUE PROVISOIRE (Carte Noble & Épurée, Sans Boîtes Étriquées) */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-4 sm:p-5 shadow-[3px_3px_0px_var(--border-hard)] space-y-3">
        
        {/* Titre Émergent dans l'Histoire */}
        <div className="pb-3 border-b border-[var(--border-hard)]/30 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 block font-mono">
              JUGEMENT PROVISOIRE DE L'HISTOIRE
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--accent-blue)] mt-0.5">
              « {legacy.emergentTitle} »
            </h3>
          </div>
          <span className="text-xs font-serif italic opacity-75">
            Mois {state.turn} / 60
          </span>
        </div>

        {/* 3 Métriques Stratégiques Claires */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-1">
          
          <div className="p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] space-y-1">
            <span className="text-[10px] uppercase opacity-70 block font-sans font-bold">Méthode & Alignement</span>
            <span className="font-bold text-sm text-[var(--text-main)] block">
              {legacy.machiavellianScore}% Machiavélique
            </span>
            <span className="text-[10px] font-serif opacity-70 block">
              {legacy.machiavellianScore > 50 ? 'Gouvernance autoritaire' : 'Respect institutionnel'}
            </span>
          </div>

          <div className="p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] space-y-1">
            <span className="text-[10px] uppercase opacity-70 block font-sans font-bold">Grands Chantiers</span>
            <span className="font-bold text-sm text-[var(--text-main)] block">
              {(state.completedProjectsHistory || []).length} livrés
            </span>
            <span className="text-[10px] font-serif opacity-70 block">
              {(state.activeProjects || []).length} en cours de réalisation
            </span>
          </div>

          <div className="p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] space-y-1">
            <span className="text-[10px] uppercase opacity-70 block font-sans font-bold">Cabinet Noir</span>
            <span className="font-bold text-sm text-[var(--text-main)] block">
              {(state.playedCardsHistory || []).length} manœuvre{(state.playedCardsHistory || []).length > 1 ? 's' : ''}
            </span>
            <span className="text-[10px] font-serif opacity-70 block">
              {(state.tacticalCards || []).length} dossier{(state.tacticalCards || []).length > 1 ? 's' : ''} en réserve
            </span>
          </div>

        </div>
      </div>

      {/* 3. REGISTRE CHRONOLOGIQUE DES DÉCISIONS */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-4 sm:p-5 shadow-[3px_3px_0px_var(--border-hard)] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)]">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-[var(--text-main)]" />
            <h3 className="font-display font-bold text-sm uppercase">
              Registre Chronologique des Actes d'État
            </h3>
          </div>
          <span className="text-xs font-mono opacity-70">Journal Officiel</span>
        </div>

        <div className="space-y-2.5 pt-1">
          {state.history.length === 0 ? (
            <div className="p-6 bg-[var(--bg-subtle)] border border-[var(--border-hard)] text-center text-xs font-serif opacity-70">
              Aucun arbitrage archivé pour l'instant.
            </div>
          ) : (
            state.history.map((item, idx) => (
              <div
                key={idx}
                className="bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-[var(--accent-blue)] transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[var(--bg-panel)] border border-[var(--border-hard)] flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    M{item.turn}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-[11px] font-mono">
                      <span className="font-bold opacity-75">{item.date}</span>
                      <span className="opacity-40">•</span>
                      <span className="font-bold text-[var(--accent-blue)]">{item.choiceMade}</span>
                    </div>
                    <h4 className="font-display font-bold text-sm mt-0.5 text-[var(--text-main)]">
                      {item.headline}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0 font-mono text-xs">
                  <div className="bg-[var(--bg-panel)] px-2.5 py-1 border border-[var(--border-hard)] text-center">
                    <span className="text-[9px] opacity-60 block">OPINION</span>
                    <strong className="text-[var(--accent-blue)]">{item.popularityAfter}%</strong>
                  </div>
                  <div className="bg-[var(--bg-panel)] px-2.5 py-1 border border-[var(--border-hard)] text-center">
                    <span className="text-[9px] opacity-60 block">TENSION</span>
                    <strong className="uppercase text-[var(--accent-amber)]">{item.tensionAfter}</strong>
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
