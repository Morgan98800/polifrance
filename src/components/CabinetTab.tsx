import React, { useState } from 'react';
import { GameState, Minister } from '../types/game';
import { soundEffects } from '../utils/audio';
import { Users, Award, ShieldAlert, RefreshCw, CheckCircle2, User, Flame, TrendingUp, AlertTriangle, UserX, Target } from 'lucide-react';

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

  const ministers = state.ministers && state.ministers.length > 0 ? state.ministers : [
    { id: 'min_eco', role: 'MINISTRE DE L\'ÉCONOMIE (BERCY)', name: 'Antoine Delorme', competence: 85, loyalty: 90, politicalWeight: 80, scandalRisk: 15, status: 'Supervise le budget et la dette' },
    { id: 'min_int', role: 'MINISTRE DE L\'INTÉRIEUR (BEAUVAU)', name: 'Général Henri Marchand', competence: 82, loyalty: 80, politicalWeight: 85, scandalRisk: 20, status: 'Ordre public et forces de sécurité' },
    { id: 'min_travail', role: 'MINISTRE DU TRAVAIL & SANTÉ', name: 'Claire Vasseur', competence: 75, loyalty: 80, politicalWeight: 70, scandalRisk: 25, status: 'Concertations syndicales' },
    { id: 'min_ecolo', role: 'MINISTRE DE L\'ÉNERGIE & CLIMAT', name: 'Marcelle Lefèvre', competence: 80, loyalty: 75, politicalWeight: 65, scandalRisk: 15, status: 'Planification écologique' }
  ];

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

  const handleExecuteReplaceSingle = () => {
    if (!replacingMinister) return;
    soundEffects.playStamp();

    const replacements: Record<string, string[]> = {
      min_eco: ['Alexandre de Courcelles', 'Hélène Grimaldi', 'Julien Moreau'],
      min_int: ['Préfet Laurent Viguier', 'Général Pierre Barreau', 'Valérie Castet'],
      min_travail: ['Nathalie Rochefort', 'Benoît Lambert', 'Sonia Khelifa'],
      min_ecolo: ['Dr. Thomas Perrin', 'Élodie Fontaine', 'Arthur Meyer']
    };

    const names = replacements[replacingMinister.id] || ['Nouveau Ministre d\'État'];
    const randomName = names[Math.floor(Math.random() * names.length)];

    if (onReplaceSingleMinister) {
      onReplaceSingleMinister(replacingMinister.id, randomName);
    }
    
    setSuccessMessage(`Décret signé : ${randomName} est nommé(e) ${replacingMinister.role}. Risque de scandale réinitialisé.`);
    setReplacingMinister(null);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-[var(--text-main)] font-mono">
      
      {/* En-tête Conseil des Ministres */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-amber)] block">
            HÔTEL DE MATIGNON & CONSEIL DES MINISTRES
          </span>
          <h2 className="font-display font-black text-2xl">Composition du Gouvernement</h2>
          <p className="text-xs opacity-75 font-sans">
            Surveillez le risque de scandale et la loyauté de vos ministres. Vous pouvez les exfiltrer individuellement ou remanier l'équipe.
          </p>
        </div>

        <button
          onClick={() => setShowConfirmModal(true)}
          disabled={state.authorityPoints < 20}
          className="px-4 py-3 bg-[var(--text-main)] hover:bg-[var(--accent-blue)] text-[var(--bg-panel)] hover:text-white font-bold text-xs uppercase border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 stroke-[2.5]" />
          <span>Remaniement Général (20 pts)</span>
        </button>
      </div>

      {/* Message de confirmation */}
      {successMessage && (
        <div className="p-4 bg-[var(--bg-subtle)] border-2 border-[var(--accent-emerald)] text-[var(--accent-emerald)] font-bold text-xs flex items-center space-x-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Grille des 4 Ministres Clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ministers.map((minister) => {
          const isAtRisk = minister.loyalty < 40 || minister.scandalRisk > 50;

          return (
            <div
              key={minister.id}
              className={`p-5 bg-[var(--bg-panel)] border-2 shadow-[3px_3px_0px_var(--border-hard)] flex flex-col justify-between space-y-4 ${
                isAtRisk ? 'border-[var(--accent-red)]' : 'border-[var(--border-hard)]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-[var(--border-hard)]/25">
                  <div>
                    <span className="text-[10px] font-bold uppercase opacity-60 block">
                      {minister.role}
                    </span>
                    <h3 className="font-display font-black text-lg text-[var(--text-main)]">
                      {minister.name}
                    </h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 border ${
                    isAtRisk 
                      ? 'bg-[var(--accent-red)]/15 text-[var(--accent-red)] border-[var(--accent-red)]/40' 
                      : 'bg-[var(--accent-emerald)]/15 text-[var(--accent-emerald)] border-[var(--accent-emerald)]/40'
                  }`}>
                    {isAtRisk ? '⚠️ SOUS PRESSION' : 'EN POSTE'}
                  </span>
                </div>

                {/* Jauges Compétence, Loyauté & Risque de Scandale */}
                <div className="space-y-2.5 text-xs mt-3">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="opacity-75">Risque de Scandale Médiatique :</span>
                      <strong className={minister.scandalRisk > 50 ? 'text-[var(--accent-red)]' : 'text-[var(--text-main)]'}>
                        {minister.scandalRisk}%
                      </strong>
                    </div>
                    <div className="h-2 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)] overflow-hidden">
                      <div
                        className={`h-full ${minister.scandalRisk > 50 ? 'bg-[var(--accent-red)]' : 'bg-[var(--accent-amber)]'}`}
                        style={{ width: `${minister.scandalRisk}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="opacity-75">Loyauté envers l'Élysée :</span>
                      <strong className={minister.loyalty < 40 ? 'text-[var(--accent-red)]' : 'text-[var(--text-main)]'}>
                        {minister.loyalty}%
                      </strong>
                    </div>
                    <div className="h-2 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)] overflow-hidden">
                      <div
                        className={`h-full ${minister.loyalty < 40 ? 'bg-[var(--accent-red)]' : 'bg-[var(--accent-blue)]'}`}
                        style={{ width: `${minister.loyalty}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Statut / Humeur */}
                <div className="mt-3 p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] text-[11px] font-sans italic opacity-85">
                  « {minister.status} »
                </div>
              </div>

              {/* Bouton d'action individuelle */}
              <div className="pt-3 border-t border-[var(--border-hard)]/30 flex items-center justify-between gap-2">
                <span className="text-[10px] opacity-60">Exfiltration discrète</span>
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

      {/* Modal Confirmation Remplacement Individuel */}
      {replacingMinister && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-6 shadow-[6px_6px_0px_var(--border-hard)] space-y-4">
            <h3 className="font-display font-black text-xl text-center">
              REMPLACER CE MINISTRE ?
            </h3>
            <p className="text-xs font-sans opacity-85 leading-relaxed text-center">
              Vous allez exfiltrer <strong>{replacingMinister.name}</strong> ({replacingMinister.role}) pour nommer un nouveau profil loyal et éteindre tout risque de scandale.
            </p>
            <div className="p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] text-xs text-center font-bold text-[var(--accent-amber)]">
              Coût : 8 Points d'Autorité
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setReplacingMinister(null)}
                className="px-4 py-2 bg-[var(--bg-subtle)] border border-[var(--border-hard)] font-bold text-xs uppercase cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleExecuteReplaceSingle}
                className="px-4 py-2 bg-[var(--accent-red)] text-white font-bold text-xs uppercase border border-[var(--border-hard)] cursor-pointer"
              >
                Confirmer le Remplacement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmation Remaniement Général */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-6 shadow-[6px_6px_0px_var(--border-hard)] space-y-4">
            <h3 className="font-display font-black text-xl text-center">
              ENGAGER UN REMANIEMENT GÉNÉRAL ?
            </h3>
            <p className="text-xs font-sans opacity-85 leading-relaxed">
              Le remaniement remplacera l'ensemble des ministres affaiblis, rétablira la loyauté du cabinet à 100% et vous fera gagner <strong>+8% de popularité</strong> auprès des Français.
            </p>
            <div className="p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] text-xs text-center font-bold text-[var(--accent-amber)]">
              Coût politique : 20 Points d'Autorité
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-[var(--bg-subtle)] border border-[var(--border-hard)] font-bold text-xs uppercase cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleExecuteRemaniement}
                className="px-4 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] font-bold text-xs uppercase border border-[var(--border-hard)] cursor-pointer"
              >
                Signer le Décret
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
