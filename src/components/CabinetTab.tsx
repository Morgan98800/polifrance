import React, { useState } from 'react';
import { GameState, Minister } from '../types/game';
import { soundEffects } from '../utils/audio';
import { getPresetCabinetForCandidate, CABINET_PRESETS_BY_CANDIDATE } from '../data/cabinetPresets';
import { 
  Users, Award, ShieldAlert, RefreshCw, CheckCircle2, 
  User, Flame, TrendingUp, AlertTriangle, UserX, Target, 
  Building2, Landmark, Shield, Zap, Sparkles 
} from 'lucide-react';

interface CabinetTabProps {
  state: GameState;
  onPerformRemaniement: (effects: { popularityDelta: number; authorityCost: number; message: string }) => void;
  onReplaceSingleMinister?: (ministerId: string, newName: string) => void;
}

export const CabinetTab: React.FC<CabinetTabProps> = ({ 
  state, 
  onPerformRemaniement,
  onReplaceSingleMinister
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [replacingMinister, setReplacingMinister] = useState<Minister | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const preset = getPresetCabinetForCandidate(state.player?.id);
  
  // Utiliser les ministres du state ou initialiser avec le preset réaliste
  const ministers: Minister[] = (state.ministers && state.ministers.length >= 4 && state.ministers[0].name !== 'Bercy')
    ? state.ministers 
    : preset.ministers;

  const primeMinister: Minister = state.primeMinister || preset.primeMinister;

  const handleExecuteRemaniement = () => {
    soundEffects.playStamp();
    setShowConfirmModal(false);
    onPerformRemaniement({
      popularityDelta: 8,
      authorityCost: 20,
      message: 'Le remaniement d\'ampleur a été acté. Les nouveaux ministres prennent leurs fonctions sous un accueil favorable de l\'opinion (+8%).'
    });
    setSuccessMessage('Remaniement gouvernemental général officialisé au Journal Officiel.');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleExecuteReplaceSingle = (replacement: { name: string; status: string }) => {
    if (!replacingMinister) return;
    soundEffects.playStamp();

    if (onReplaceSingleMinister) {
      onReplaceSingleMinister(replacingMinister.id, replacement.name);
    }
    
    setSuccessMessage(`Décret signé : ${replacement.name} est nommé(e) au Gouvernement. Risque de scandale réinitialisé.`);
    setReplacingMinister(null);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const candidateId = state.player?.id || 'c1_bardella_lepen';
  const availableReplacements = (replacingMinister && CABINET_PRESETS_BY_CANDIDATE[candidateId]?.replacements[replacingMinister.id]) 
    || [
      { name: 'Nouveau Ministre d\'État', status: '« Au service de la République et du Président. »' },
      { name: 'Conseiller d\'État', status: '« Rigueur juridique et efficacité administrative. »' }
    ];

  return (
    <div className="max-w-5xl mx-auto space-y-5 text-[var(--text-main)] font-mono">
      
      {/* 1. En-tête Conseil des Ministres & Bouton Remaniement */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-4 sm:p-5 shadow-[4px_4px_0px_var(--border-hard)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-[var(--accent-amber)]">
            <Building2 className="w-3.5 h-3.5" />
            <span>Gouvernement de la République</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl mt-0.5">Cabinet & Conseil des Ministres</h2>
          <p className="text-xs opacity-75 font-sans mt-1 max-w-xl">
            Surveillez la loyauté et l'exposition médiatique de votre équipe. En cas d'usure ou de crise, vous pouvez exfiltrer un ministre ou remanier Matignon.
          </p>
        </div>

        <button
          onClick={() => setShowConfirmModal(true)}
          disabled={state.authorityPoints < 20}
          className="px-4 py-2.5 bg-[var(--text-main)] hover:bg-[var(--accent-blue)] text-[var(--bg-panel)] hover:text-white font-bold text-xs uppercase border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 stroke-[2.5]" />
          <span>Remaniement Général (20 pts)</span>
        </button>
      </div>

      {/* Message de confirmation */}
      {successMessage && (
        <div className="p-3.5 bg-[var(--bg-subtle)] border-2 border-[var(--accent-emerald)] text-[var(--accent-emerald)] font-bold text-xs flex items-center space-x-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 2. Cartouche Spécial : L'Hôtel de Matignon (Premier Ministre) */}
      <div className="p-4 sm:p-5 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] shadow-[4px_4px_0px_var(--border-hard)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center space-x-3.5">
          <div className="w-12 h-12 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] flex items-center justify-center font-display font-black text-lg text-[var(--accent-amber)] shrink-0 shadow-[2px_2px_0px_var(--border-hard)]">
            🏛️
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 bg-[var(--text-main)] text-[var(--bg-panel)]">
                HÔTEL DE MATIGNON
              </span>
              <span className="text-[10px] opacity-70 font-bold">Chef du Gouvernement</span>
            </div>
            <h3 className="font-display font-black text-xl text-[var(--text-main)] mt-0.5">
              {primeMinister.name}
            </h3>
            <p className="text-xs font-sans italic opacity-85 mt-0.5">
              {primeMinister.status}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 border-t md:border-t-0 md:border-l border-[var(--border-hard)]/30 pt-3 md:pt-0 md:pl-4 text-xs font-mono shrink-0">
          <div>
            <span className="text-[10px] opacity-60 block">LOYAUTÉ</span>
            <strong className="text-sm text-[var(--accent-blue)]">{primeMinister.loyalty}%</strong>
          </div>
          <div>
            <span className="text-[10px] opacity-60 block">SCANDALE</span>
            <strong className="text-sm text-[var(--accent-emerald)]">{primeMinister.scandalRisk}%</strong>
          </div>
          <div className="text-[10px] px-2 py-1 bg-[var(--bg-panel)] border border-[var(--border-hard)] opacity-80">
            🛡️ Fusible de Crise
          </div>
        </div>
      </div>

      {/* 3. Grille des 4 Ministres Régaliens Clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {ministers.map((minister) => {
          const isAtRisk = minister.loyalty < 40 || minister.scandalRisk > 50;

          return (
            <div
              key={minister.id}
              className={`p-4 sm:p-5 bg-[var(--bg-panel)] border-2 shadow-[3px_3px_0px_var(--border-hard)] flex flex-col justify-between space-y-3.5 transition-colors ${
                isAtRisk ? 'border-[var(--accent-red)]' : 'border-[var(--border-hard)]'
              }`}
            >
              <div>
                {/* En-tête du Poste */}
                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[var(--border-hard)]/25">
                  <div>
                    <span className="text-[10px] font-bold uppercase opacity-65 block truncate">
                      {minister.role}
                    </span>
                    <h3 className="font-display font-black text-lg text-[var(--text-main)]">
                      {minister.name}
                    </h3>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 border shrink-0 ${
                    isAtRisk 
                      ? 'bg-[var(--accent-red)]/15 text-[var(--accent-red)] border-[var(--accent-red)]/40' 
                      : 'bg-[var(--accent-emerald)]/15 text-[var(--accent-emerald)] border-[var(--accent-emerald)]/40'
                  }`}>
                    {isAtRisk ? '⚠️ SOUS PRESSION' : 'EN POSTE'}
                  </span>
                </div>

                {/* Jauges Loyauté & Risque de Scandale */}
                <div className="space-y-2 text-xs mt-3">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="opacity-75">Loyauté envers l'Élysée :</span>
                      <strong className={minister.loyalty < 40 ? 'text-[var(--accent-red)]' : 'text-[var(--accent-blue)]'}>
                        {minister.loyalty}%
                      </strong>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)]/40 overflow-hidden">
                      <div
                        className={`h-full ${minister.loyalty < 40 ? 'bg-[var(--accent-red)]' : 'bg-[var(--accent-blue)]'}`}
                        style={{ width: `${minister.loyalty}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="opacity-75">Risque de Scandale Médiatique :</span>
                      <strong className={minister.scandalRisk > 50 ? 'text-[var(--accent-red)]' : 'text-[var(--text-main)]'}>
                        {minister.scandalRisk}%
                      </strong>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)]/40 overflow-hidden">
                      <div
                        className={`h-full ${minister.scandalRisk > 50 ? 'bg-[var(--accent-red)]' : 'bg-[var(--accent-amber)]'}`}
                        style={{ width: `${minister.scandalRisk}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Ligne de Conduite & Déclaration */}
                <div className="mt-3 p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] text-[11px] font-serif leading-relaxed opacity-90">
                  {minister.status}
                </div>
              </div>

              {/* Bouton d'action individuelle */}
              <div className="pt-2.5 border-t border-[var(--border-hard)]/25 flex items-center justify-between gap-2">
                <span className="text-[10px] opacity-60">Arbitrage individuel</span>
                <button
                  type="button"
                  disabled={state.authorityPoints < 8}
                  onClick={() => setReplacingMinister(minister)}
                  className="px-3 py-1.5 bg-[var(--bg-subtle)] hover:bg-[var(--accent-red)] hover:text-white border border-[var(--border-hard)] font-bold text-[11px] uppercase flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
                >
                  <UserX className="w-3.5 h-3.5" />
                  <span>Remplacer (8 pts)</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* MODAL DE CHOIX DU REMPLAÇANT */}
      {replacingMinister && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-fade-in font-mono">
          <div className="bg-[var(--bg-panel)] border-4 border-[var(--text-main)] max-w-lg w-full p-5 sm:p-6 shadow-[10px_10px_0px_var(--text-main)] space-y-4 text-[var(--text-main)] relative">
            
            <div className="border-b-2 border-[var(--border-hard)] pb-3">
              <span className="text-[10px] uppercase font-bold opacity-60 block">DÉCRET DE NOMINATION</span>
              <h3 className="font-display font-black text-lg">
                Remplacer le {replacingMinister.role}
              </h3>
              <p className="text-xs font-sans opacity-75 mt-0.5">
                Actuellement occupé par <strong>{replacingMinister.name}</strong>. Choisissez votre nouveau ministre parmi la réserve républicaine :
              </p>
            </div>

            <div className="space-y-2.5">
              {availableReplacements.map((candidateOption, idx) => (
                <div
                  key={idx}
                  onClick={() => handleExecuteReplaceSingle(candidateOption)}
                  className="p-3.5 bg-[var(--bg-subtle)] hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] cursor-pointer transition-all space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <strong className="font-display font-black text-sm group-hover:text-[var(--bg-panel)]">
                      {candidateOption.name}
                    </strong>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[var(--bg-panel)] text-[var(--text-main)] border border-[var(--border-hard)]">
                      Nommer ➔
                    </span>
                  </div>
                  <p className="text-xs font-serif italic opacity-85 group-hover:opacity-100">
                    {candidateOption.status}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setReplacingMinister(null)}
              className="w-full py-2 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold text-xs uppercase"
            >
              Annuler
            </button>

          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMATION DU REMANIEMENT GÉNÉRAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-fade-in font-mono">
          <div className="bg-[var(--bg-panel)] border-4 border-[var(--text-main)] max-w-md w-full p-5 sm:p-6 shadow-[10px_10px_0px_var(--text-main)] space-y-4 text-[var(--text-main)]">
            
            <div className="border-b-2 border-[var(--border-hard)] pb-3">
              <h3 className="font-display font-black text-xl uppercase">
                Décréter un Remaniement Général ?
              </h3>
              <p className="text-xs font-sans opacity-80 mt-1">
                Cette décision réinitialise l'ensemble du gouvernement, purge tous les risques de scandales en cours et offre un rebond d'opinion (+8%).
              </p>
            </div>

            <div className="p-3 bg-[var(--bg-subtle)] border border-[var(--border-hard)] text-xs space-y-1 font-mono">
              <div className="flex justify-between">
                <span>Coût en Autorité :</span>
                <strong className="text-[var(--accent-amber)]">-20 points</strong>
              </div>
              <div className="flex justify-between">
                <span>Gain d'Opinion Publique :</span>
                <strong className="text-[var(--accent-emerald)]">+8%</strong>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] font-bold text-xs uppercase"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleExecuteRemaniement}
                className="flex-1 py-2.5 bg-[var(--text-main)] text-[var(--bg-panel)] hover:bg-[var(--accent-blue)] hover:text-white font-bold text-xs uppercase border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] transition-colors"
              >
                Confirmer le Décret
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
