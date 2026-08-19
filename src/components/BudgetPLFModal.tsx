import React, { useState } from 'react';
import { BudgetAllocation } from '../types/game';
import { soundEffects } from '../utils/audio';
import { Building2, HeartPulse, Shield, Leaf, Wallet, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

interface BudgetPLFModalProps {
  yearNumber: number;
  onAdoptBudget: (allocation: BudgetAllocation, effects: {
    deficitDelta: number;
    tensionDelta: number;
    popularityDelta: number;
    message: string;
  }) => void;
}

export const BudgetPLFModal: React.FC<BudgetPLFModalProps> = ({ yearNumber, onAdoptBudget }) => {
  const [allocation, setAllocation] = useState<BudgetAllocation>({
    health: 25,
    security: 25,
    ecology: 25,
    social: 25
  });

  const total = allocation.health + allocation.security + allocation.ecology + allocation.social;
  const remaining = 100 - total;

  const handleAdjust = (sector: keyof BudgetAllocation, delta: number) => {
    soundEffects.playKeystroke();
    const current = allocation[sector];
    const newTarget = Math.max(5, Math.min(60, current + delta));
    
    // Si on augmente, s'assurer qu'on ne dépasse pas 100 au total
    if (delta > 0 && remaining < delta) return;

    setAllocation(prev => ({
      ...prev,
      [sector]: newTarget
    }));
  };

  const handleAdopt = () => {
    soundEffects.playStamp();
    
    // Calcul des répercussions budgétaires et sociales
    let defDelta = 0;
    let tensDelta = 0;
    let popDelta = 0;

    // Social & Pouvoir d'achat
    if (allocation.social >= 35) {
      defDelta += 0.3;
      tensDelta -= 15;
      popDelta += 4;
    } else if (allocation.social <= 15) {
      defDelta -= 0.2;
      tensDelta += 18;
      popDelta -= 6;
    }

    // Santé
    if (allocation.health <= 15) {
      tensDelta += 12;
      popDelta -= 4;
    } else if (allocation.health >= 35) {
      tensDelta -= 8;
      popDelta += 3;
    }

    // Sécurité
    if (allocation.security >= 35) {
      popDelta += 2;
    } else if (allocation.security <= 15) {
      tensDelta += 10;
    }

    // Écologie
    if (allocation.ecology >= 35) {
      popDelta += 3;
    }

    const summaryMessage = `Loi de Finances (PLF Année ${yearNumber}) votée à l'Assemblée : Santé ${allocation.health} Mds, Sécurité ${allocation.security} Mds, Écologie ${allocation.ecology} Mds, Social ${allocation.social} Mds.`;

    onAdoptBudget(allocation, {
      deficitDelta: defDelta,
      tensionDelta: tensDelta,
      popularityDelta: popDelta,
      message: summaryMessage
    });
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in font-mono">
      <div className="bg-[var(--bg-panel)] border-4 border-[var(--text-main)] max-w-3xl w-full p-6 sm:p-8 shadow-[10px_10px_0px_var(--text-main)] space-y-6 text-[var(--text-main)] max-h-[95vh] overflow-y-auto">
        
        {/* Header de session parlementaire */}
        <div className="text-center space-y-2 border-b-2 border-[var(--border-hard)] pb-4">
          <div className="flex items-center justify-center space-x-2 text-[var(--accent-amber)] font-bold text-xs uppercase tracking-wider">
            <Building2 className="w-5 h-5" />
            <span>SESSION PARLEMENTAIRE EXTRAORDINAIRE • PALAIS-BOURBON</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase font-display tracking-tight">
            PROJET DE LOI DE FINANCES (PLF — AN {yearNumber})
          </h2>
          <p className="text-xs opacity-75 font-sans">
            L'Assemblée Nationale doit voter le budget d'investissement de l'État pour les 12 prochains mois. Répartissez vos <strong>100 Milliards d'Euros</strong> d'enveloppe prioritaire.
          </p>
        </div>

        {/* Jauge globale d'allocation */}
        <div className="bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs">
            <span className="font-bold uppercase block">ENVELOPPE NATIONALE :</span>
            <span className="opacity-80">100 Milliards d'Euros à ventiler</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs uppercase font-bold">Reste à allouer :</span>
            <span className={`text-xl font-black px-3 py-1 border-2 border-[var(--border-hard)] ${
              remaining === 0 ? 'bg-[var(--accent-emerald)] text-white' : 'bg-[var(--accent-red)] text-white animate-pulse'
            }`}>
              {remaining} Mds €
            </span>
          </div>
        </div>

        {/* Les 4 Pôles d'Arbitrage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Pôle Santé */}
          <div className="border-2 border-[var(--border-hard)] p-4 bg-[var(--bg-panel)] flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-hard)] pb-2">
              <span className="font-bold text-xs uppercase flex items-center space-x-1.5">
                <HeartPulse className="w-4 h-4 text-[var(--accent-red)]" />
                <span>Santé & Hôpital</span>
              </span>
              <span className="font-black text-sm">{allocation.health} Mds €</span>
            </div>
            <p className="text-[11px] font-sans opacity-70">
              Salaires soignants, modernisation des urgences et couverture territoriale.
            </p>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => handleAdjust('health', -5)}
                className="w-8 h-8 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] font-black hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] transition-colors"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => handleAdjust('health', 5)}
                className="w-8 h-8 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] font-black hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Pôle Sécurité */}
          <div className="border-2 border-[var(--border-hard)] p-4 bg-[var(--bg-panel)] flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-hard)] pb-2">
              <span className="font-bold text-xs uppercase flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-[var(--accent-blue)]" />
                <span>Sécurité & Justice</span>
              </span>
              <span className="font-black text-sm">{allocation.security} Mds €</span>
            </div>
            <p className="text-[11px] font-sans opacity-70">
              Effectifs de police, tribunaux, parc pénitentiaire et matériel d'intervention.
            </p>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => handleAdjust('security', -5)}
                className="w-8 h-8 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] font-black hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] transition-colors"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => handleAdjust('security', 5)}
                className="w-8 h-8 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] font-black hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Pôle Écologie */}
          <div className="border-2 border-[var(--border-hard)] p-4 bg-[var(--bg-panel)] flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-hard)] pb-2">
              <span className="font-bold text-xs uppercase flex items-center space-x-1.5">
                <Leaf className="w-4 h-4 text-[var(--accent-emerald)]" />
                <span>Écologie & Énergie</span>
              </span>
              <span className="font-black text-sm">{allocation.ecology} Mds €</span>
            </div>
            <p className="text-[11px] font-sans opacity-70">
              Nucléaire civil, rénovation thermique, ferroviaire et souveraineté industrielle.
            </p>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => handleAdjust('ecology', -5)}
                className="w-8 h-8 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] font-black hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] transition-colors"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => handleAdjust('ecology', 5)}
                className="w-8 h-8 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] font-black hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Pôle Social */}
          <div className="border-2 border-[var(--border-hard)] p-4 bg-[var(--bg-panel)] flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-hard)] pb-2">
              <span className="font-bold text-xs uppercase flex items-center space-x-1.5">
                <Wallet className="w-4 h-4 text-[var(--accent-amber)]" />
                <span>Social & Pouvoir d'Achat</span>
              </span>
              <span className="font-black text-sm">{allocation.social} Mds €</span>
            </div>
            <p className="text-[11px] font-sans opacity-70">
              Chèques énergie, aides aux ménages modestes, revalorisation des minima sociaux.
            </p>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => handleAdjust('social', -5)}
                className="w-8 h-8 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] font-black hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] transition-colors"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => handleAdjust('social', 5)}
                className="w-8 h-8 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] font-black hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] transition-colors"
              >
                +
              </button>
            </div>
          </div>

        </div>

        {/* Avertissements */}
        {remaining !== 0 && (
          <div className="flex items-center space-x-2 text-xs font-bold text-[var(--accent-red)] bg-[var(--accent-red)]/10 p-3 border-l-4 border-[var(--accent-red)]">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Vous devez allouer exactement 100 Milliards d'euros pour soumettre le budget au vote.</span>
          </div>
        )}

        {/* Bouton de vote */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            disabled={remaining !== 0}
            onClick={handleAdopt}
            className={`px-6 py-3.5 font-bold uppercase text-xs flex items-center space-x-2 border-2 border-[var(--border-hard)] transition-all ${
              remaining === 0
                ? 'bg-[var(--text-main)] text-[var(--bg-panel)] hover:bg-[var(--accent-blue)] hover:text-white shadow-[4px_4px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] cursor-pointer'
                : 'bg-[var(--bg-subtle)] text-[var(--text-main)] opacity-50 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Promulguer le Budget de l'État (PLF)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
