import React, { useState } from 'react';
import { GameState, Minister } from '../types/game';
import { soundEffects } from '../utils/audio';
import { Users, Award, ShieldAlert, RefreshCw, CheckCircle2, User, Flame, TrendingUp, AlertTriangle } from 'lucide-react';

interface CabinetTabProps {
  state: GameState;
  onPerformRemaniement: (effects: { popularityDelta: number; authorityCost: number; message: string }) => void;
}

export const CabinetTab: React.FC<CabinetTabProps> = ({ state, onPerformRemaniement }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Ministers mock / default roster
  const defaultMinisters = [
    {
      id: 'bercy',
      role: 'MINISTRE DE L\'ÉCONOMIE & FINANCES (BERCY)',
      name: 'Antoine Delorme',
      competence: 84,
      loyalty: Math.max(25, 90 - state.turn * 3),
      scandalRisk: state.economy.deficit > 4.5 ? 65 : 20,
      status: state.economy.deficit > 4.5 ? 'Sous pression des agences de notation' : 'Gère le carnet d\'ordres'
    },
    {
      id: 'beauvau',
      role: 'MINISTRE DE L\'INTÉRIEUR (PLACE BEAUVAU)',
      name: 'Général Henri Marchand',
      competence: 78,
      loyalty: 80,
      scandalRisk: 30,
      status: 'Maintien de l\'ordre et Vigipirate'
    },
    {
      id: 'grenelle',
      role: 'MINISTRE DU TRAVAIL & SANTÉ (GRENELLE)',
      name: 'Claire Vasseur',
      competence: 72,
      loyalty: Math.max(15, 80 - state.social.strikeRisk / 2),
      scandalRisk: state.social.strikeRisk > 70 ? 80 : 15,
      status: state.social.strikeRisk > 70 ? 'Menace de démissionner suite aux grèves' : 'Négociations syndicales stables'
    },
    {
      id: 'ecologie',
      role: 'TRANSITION ÉCOLOGIQUE & ÉNERGIE',
      name: 'Marcelle Lefèvre',
      competence: 80,
      loyalty: 75,
      scandalRisk: 25,
      status: 'Relance du nucléaire et parcs éoliens'
    }
  ];

  const ministers = defaultMinisters;

  const handleExecuteRemaniement = () => {
    soundEffects.playStamp();
    setShowConfirmModal(false);
    onPerformRemaniement({
      popularityDelta: 8,
      authorityCost: 20,
      message: 'Le remaniement d\'ampleur a été acté. Les nouveaux ministres prennent leurs fonctions sous un accueil favorable de l\'opinion (+8%).'
    });
    setSuccessMessage('Remaniement gouvernemental officialisé au Journal Officiel.');
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
            Évaluez la loyauté de vos ministres d'État et déclenchez un remaniement en cas d'usure politique.
          </p>
        </div>

        <button
          onClick={() => setShowConfirmModal(true)}
          disabled={state.authorityPoints < 20}
          className="px-4 py-3 bg-[var(--text-main)] hover:bg-[var(--accent-blue)] text-[var(--bg-panel)] hover:text-white font-bold text-xs uppercase border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50"
        >
          <RefreshCw className="w-4 h-4 stroke-[2.5]" />
          <span>Déclencher un Remaniement (20 pts)</span>
        </button>
      </div>

      {/* Message de confirmation */}
      {successMessage && (
        <div className="p-4 bg-[var(--bg-subtle)] border-2 border-[var(--accent-emerald)] text-[var(--accent-emerald)] font-bold text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Grille des 4 Ministres Clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ministers.map((minister) => {
          const isAtRisk = minister.loyalty < 40 || minister.scandalRisk > 60;

          return (
            <div
              key={minister.id}
              className={`p-5 bg-[var(--bg-panel)] border-2 shadow-[3px_3px_0px_var(--border-hard)] space-y-4 ${
                isAtRisk ? 'border-[var(--accent-red)]' : 'border-[var(--border-hard)]'
              }`}
            >
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
                  {isAtRisk ? '⚠️ INSTABLE' : 'EN POSTE'}
                </span>
              </div>

              {/* Jauges Compétence & Loyauté */}
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="opacity-75">Loyauté envers le Président :</span>
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

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="opacity-75">Compétence Technique :</span>
                    <strong>{minister.competence}%</strong>
                  </div>
                  <div className="h-2 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--accent-emerald)]"
                      style={{ width: `${minister.competence}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Statut / Humeur */}
              <div className="p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] text-[11px] font-sans italic opacity-85">
                « {minister.status} »
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Confirmation Remaniement */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-6 shadow-[6px_6px_0px_var(--border-hard)] space-y-4">
            <h3 className="font-display font-black text-xl text-center">
              ENGAGER UN REMANIEMENT MINISTÉRIEL ?
            </h3>
            <p className="text-xs font-sans opacity-85 leading-relaxed">
              Le remaniement remplacera les ministres affaiblis, rétablira la loyauté du cabinet à 100% et vous fera gagner <strong>+8% de popularité</strong> auprès des Français.
            </p>
            <div className="p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] text-xs text-center font-bold text-[var(--accent-amber)]">
              Coût politique : 20 Points d'Autorité
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-[var(--bg-subtle)] border border-[var(--border-hard)] font-bold text-xs uppercase"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleExecuteRemaniement}
                className="px-4 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] font-bold text-xs uppercase border border-[var(--border-hard)]"
              >
                Signer le Décret de Remaniement
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
