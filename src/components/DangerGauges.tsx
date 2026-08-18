import React from 'react';
import { GameState } from '../types/game';
import { ShieldAlert, Flame, TrendingUp, AlertTriangle } from 'lucide-react';

interface DangerGaugesProps {
  state: GameState;
}

export const DangerGauges: React.FC<DangerGaugesProps> = ({ state }) => {
  const { economy, social, censureThreshold, parliament } = state;

  // Calcul des députés acquis à la majorité
  const acquiredVotes = (parliament || [])
    .filter(g => g.stanceTowardsPlayer === 'loyal' || g.stanceTowardsPlayer === 'coalition')
    .reduce((sum, g) => sum + g.seats, 0);

  const isCensureRisk = acquiredVotes < censureThreshold;
  const isStrikeRisk = social.strikeRisk >= 75;
  const isDebtRisk = economy.spreadOatBund >= 95;

  return (
    <div className="w-full bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-3 shadow-[4px_4px_0px_var(--border-hard)] text-[var(--text-main)]">
      
      {/* En-tête des 3 Alertes Vitales */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[var(--border-hard)]/30 font-mono text-[10px] font-bold uppercase tracking-wider">
        <span className="flex items-center space-x-1 text-[var(--pol-gauche)]">
          <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>SEUILS CRITIQUES DE SURVIE DU GOUVERNEMENT</span>
        </span>
        <span className="opacity-60">CONDITIONS DE DISSOLUTION</span>
      </div>

      {/* Les 3 Jauges de Danger */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-xs">
        
        {/* 1. SEUIL DE MOTION DE CENSURE (ASSEMBLÉE) */}
        <div className={`p-2.5 border-2 transition-all ${
          isCensureRisk 
            ? 'bg-[var(--pol-gauche)]/10 border-[var(--pol-gauche)] text-[var(--pol-gauche)]' 
            : 'bg-[var(--bg-subtle)] border-[var(--border-hard)]'
        }`}>
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold flex items-center space-x-1">
              <ShieldAlert className="w-3.5 h-3.5 stroke-[2]" />
              <span>1. VOTE DE CENSURE</span>
            </span>
            <strong className="text-sm">
              {acquiredVotes} / {censureThreshold}
            </strong>
          </div>
          <div className="w-full bg-[var(--bg-panel)] border border-[var(--border-hard)] h-2 flex">
            <div
              className={`h-full ${acquiredVotes >= censureThreshold ? 'bg-[var(--pol-ecolo)]' : 'bg-[var(--pol-gauche)]'}`}
              style={{ width: `${Math.min(100, (acquiredVotes / 577) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] block mt-1 opacity-80">
            {isCensureRisk ? '⚠️ DANGER : Chute du gouvernement sous 48h' : '✅ Majorité absolue garantie'}
          </span>
        </div>

        {/* 2. SEUIL DE GRÈVE GÉNÉRALE (RUE) */}
        <div className={`p-2.5 border-2 transition-all ${
          isStrikeRisk 
            ? 'bg-[var(--pol-gauche)]/10 border-[var(--pol-gauche)] text-[var(--pol-gauche)]' 
            : 'bg-[var(--bg-subtle)] border-[var(--border-hard)]'
        }`}>
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5 stroke-[2]" />
              <span>2. COLÈRE & GRÈVE</span>
            </span>
            <strong className="text-sm">
              {social.strikeRisk}%
            </strong>
          </div>
          <div className="w-full bg-[var(--bg-panel)] border border-[var(--border-hard)] h-2 flex">
            <div
              className={`h-full ${social.strikeRisk >= 75 ? 'bg-[var(--pol-gauche)]' : (social.strikeRisk >= 50 ? 'bg-[var(--pol-centre)]' : 'bg-[var(--pol-ecolo)]')}`}
              style={{ width: `${social.strikeRisk}%` }}
            />
          </div>
          <span className="text-[10px] block mt-1 opacity-80">
            {isStrikeRisk ? '🔥 ALERTE : Risque de blocage du pays' : '✅ Climat social sous contrôle'}
          </span>
        </div>

        {/* 3. SEUIL DE FAILLITE / SPREAD OAT (MARCHÉS) */}
        <div className={`p-2.5 border-2 transition-all ${
          isDebtRisk 
            ? 'bg-[var(--pol-gauche)]/10 border-[var(--pol-gauche)] text-[var(--pol-gauche)]' 
            : 'bg-[var(--bg-subtle)] border-[var(--border-hard)]'
        }`}>
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5 stroke-[2]" />
              <span>3. TUTELLE DE LA DETTE</span>
            </span>
            <strong className="text-sm">
              +{economy.spreadOatBund} bps
            </strong>
          </div>
          <div className="w-full bg-[var(--bg-panel)] border border-[var(--border-hard)] h-2 flex">
            <div
              className={`h-full ${economy.spreadOatBund >= 95 ? 'bg-[var(--pol-gauche)]' : (economy.spreadOatBund >= 75 ? 'bg-[var(--pol-centre)]' : 'bg-[var(--pol-ecolo)]')}`}
              style={{ width: `${Math.min(100, (economy.spreadOatBund / 150) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] block mt-1 opacity-80">
            {isDebtRisk ? '⚠️ ALERTE : Surveillance négative des agences' : '✅ Emprunts souverains stables'}
          </span>
        </div>

      </div>

    </div>
  );
};
