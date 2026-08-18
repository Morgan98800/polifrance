import React, { useState } from 'react';
import { GameState } from '../types/game';
import { PredictionMarketEngine } from '../engine/predictionMarket';
import { EUConvergenceEngine } from '../engine/euConvergence';
import { MemoryFatigueEngine } from '../engine/memoryFatigue';
import { TrendingUp, Scale, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

interface SystemicsHubProps {
  state: GameState;
}

export const SystemicsHub: React.FC<SystemicsHubProps> = ({ state }) => {
  const [marketEngine] = useState(() => new PredictionMarketEngine());
  const [euEngine] = useState(() => new EUConvergenceEngine());
  const [memoryEngine] = useState(() => {
    const mem = new MemoryFatigueEngine();
    mem.recordAction('ARTICLE_49_3', 1.0, 1);
    return mem;
  });

  const marketStats = marketEngine.calculateSovereignSpread('reforme_plf_2027', state.economy.deficit, state.economy.debt);
  const euStats = euEngine.evaluateSanctions();
  const fatigueStats = memoryEngine.evaluateLever('ARTICLE_49_3', state.turn);

  const chanceLoiPct = Math.round(marketStats.pImpliedSuccess * 100);

  return (
    <div className="space-y-4 text-[var(--text-main)]">
      
      {/* En-tête Allégé et Raccourci */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-4 shadow-[4px_4px_0px_var(--border-hard)] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[var(--text-main)] text-[var(--bg-panel)] flex items-center justify-center font-bold text-sm">
            <Scale className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h2 className="font-serif font-black text-lg">
              Marchés, Europe & 49.3
            </h2>
            <p className="text-xs font-mono opacity-70">
              Impact de vos arbitrages sur la dette, Bruxelles et la colère sociale.
            </p>
          </div>
        </div>

        <span className="font-mono text-xs px-2.5 py-1 bg-[var(--bg-subtle)] border border-[var(--border-hard)] font-bold">
          ACTIF
        </span>
      </div>

      {/* 3 Panneaux Aérés sans sur-imbrication de boîtes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* 1. Marchés Financiers & Dette */}
        <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)]">
              <h3 className="font-serif font-bold text-sm flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 stroke-[2]" />
                <span>Marchés & Dette</span>
              </h3>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
                FINANCES
              </span>
            </div>

            <div className="mt-4 space-y-4 font-mono text-xs">
              <div className="flex items-baseline justify-between">
                <span className="opacity-70">Chance de vote de la loi :</span>
                <span className="text-2xl font-serif font-black text-[var(--text-main)]">{chanceLoiPct}%</span>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[var(--border-hard)]/20">
                <div className="flex justify-between">
                  <span className="opacity-70">Taux d'emprunt France (10 ans) :</span>
                  <strong>{marketStats.oat10yYieldPct}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Surcoût vs Allemagne :</span>
                  <strong className={marketStats.spreadOatBundBps > 80 ? 'text-[var(--pol-gauche)]' : ''}>
                    +{marketStats.spreadOatBundBps} bps
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] font-mono opacity-60 pt-2 border-t border-[var(--border-hard)]">
            Plus les lois sont stables, plus les taux d'emprunt baissent.
          </p>
        </div>

        {/* 2. Relations Union Européenne */}
        <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)]">
              <h3 className="font-serif font-bold text-sm flex items-center space-x-2">
                <Scale className="w-4 h-4 stroke-[2]" />
                <span>Union Européenne</span>
              </h3>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
                BRUXELLES
              </span>
            </div>

            <div className="mt-4 space-y-4 font-mono text-xs">
              <div>
                <div className="flex justify-between items-center mb-1.5 font-bold">
                  <span className="opacity-70">Accord avec Bruxelles :</span>
                  <span className="text-sm">{euStats.compliancePct}%</span>
                </div>
                <div className="w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)] h-2.5 flex">
                  <div
                    className="bg-[var(--pol-droite)] h-full"
                    style={{ width: `${euStats.compliancePct}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-hard)]/20">
                <span className="opacity-70 block mb-1">Statut Commission :</span>
                {euStats.sanctions.length === 0 ? (
                  <span className="text-[var(--pol-ecolo)] font-bold flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5 stroke-[2]" />
                    <span>Conforme aux traités de l'UE.</span>
                  </span>
                ) : (
                  <span className="text-[var(--pol-gauche)] font-bold flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5 stroke-[2]" />
                    <span>Avertissement pour déficit excessif.</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-[11px] font-mono opacity-60 pt-2 border-t border-[var(--border-hard)]">
            Critère de Maastricht : Déficit maximum de 3.0% du PIB.
          </p>
        </div>

        {/* 3. Fatigue du 49.3 & Censure */}
        <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)]">
              <h3 className="font-serif font-bold text-sm flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 stroke-[2]" />
                <span>Usure du 49.3</span>
              </h3>
              {/* Badge neutre non rouge */}
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-[var(--bg-subtle)] text-[var(--text-main)] border border-[var(--border-hard)]">
                ART. 49 AL. 3
              </span>
            </div>

            <div className="mt-4 space-y-4 font-mono text-xs">
              <div>
                <div className="flex justify-between items-center mb-1.5 font-bold">
                  <span className="opacity-70">Efficacité politique :</span>
                  <span className="text-sm">{fatigueStats.effectiveRoiPct}%</span>
                </div>
                <div className="w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)] h-2.5 flex">
                  <div
                    className="bg-[var(--pol-centre)] h-full"
                    style={{ width: `${fatigueStats.effectiveRoiPct}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[var(--border-hard)]/20">
                <div>
                  <span className="opacity-70 block text-[10px]">Colère créée</span>
                  <strong className="text-[var(--pol-gauche)]">+{fatigueStats.socialTensionCost} pts</strong>
                </div>
                <div className="text-right">
                  <span className="opacity-70 block text-[10px]">Risque censure</span>
                  <strong>x{fatigueStats.censureRiskMultiplier}</strong>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] font-mono opacity-60 pt-2 border-t border-[var(--border-hard)]">
            L'opinion publique met environ 8 tours à oublier un 49.3.
          </p>
        </div>

      </div>

    </div>
  );
};
