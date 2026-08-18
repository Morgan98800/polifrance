import React from 'react';
import { GameState } from '../types/game';
import { 
  Users, TrendingUp, TrendingDown, AlertTriangle, 
  Flame, Radio, Newspaper, ShieldCheck, Scale, Euro, Building
} from 'lucide-react';

interface DashboardProps {
  state: GameState;
  onOpenEvent: () => void;
  onOpenParliament?: () => void;
  onOpenCampaignActions?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  state, 
  onOpenEvent, 
  onOpenParliament, 
  onOpenCampaignActions 
}) => {
  const { player, demographics, economy, social } = state;

  const tensionColors = {
    faible: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
    moderee: 'bg-amber-950/80 text-amber-300 border-amber-800',
    elevee: 'bg-orange-950/80 text-orange-300 border-orange-800',
    crise: 'bg-rose-950/80 text-rose-300 border-rose-800 animate-pulse',
  };

  const mediaColors = {
    tres_favorable: 'text-emerald-400',
    favorable: 'text-emerald-300',
    neutre: 'text-slate-300',
    hostile: 'text-amber-400',
    tempete_mediatique: 'text-rose-400 font-bold animate-pulse',
  };

  return (
    <div className="space-y-6">
      
      {/* Bandeau Breaking News / Édition Spéciale */}
      <div className="bg-gradient-to-r from-red-900/90 via-slate-900 to-red-950/90 border border-red-700/60 rounded-2xl p-3 shadow-lg flex items-center space-x-3 overflow-hidden">
        <div className="flex items-center space-x-1.5 bg-red-600 text-white font-black text-[11px] uppercase tracking-wider px-2.5 py-1 rounded shadow shrink-0">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>INFO EN CONTINU</span>
        </div>
        <div className="text-xs sm:text-sm font-medium text-slate-100 truncate flex-1">
          {state.breakingNews}
        </div>
        {state.activeEvent && (
          <button
            onClick={onOpenEvent}
            className="shrink-0 text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-lg shadow transition-colors"
          >
            Arbitrer la Crise
          </button>
        )}
      </div>

      {/* Profil & Synthèse de Tête */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Carte Identité & Sondage 1er Tour */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center space-x-3.5">
              <img
                src={player.avatar}
                alt={player.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
              />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                  {state.mode === 'campaign' ? 'Candidat 2027' : 'Président de la République'}
                </span>
                <h2 className="font-serif font-black text-xl text-slate-100 mt-1">
                  {player.name}
                </h2>
                <p className="text-xs text-slate-400">{player.party}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 italic mt-3 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
              {player.tagline}
            </p>
          </div>

          {/* Jauge d'opinion globale */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Popularité Globale</span>
                <div className="text-2xl font-serif font-black text-amber-300">
                  {state.popularity}%
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">
                  {state.mode === 'campaign' ? 'Intentions 1er Tour' : 'Confiance du Pays'}
                </span>
                <div className="text-2xl font-serif font-black text-emerald-400">
                  {state.pollingIntentionsFirstRound}%
                </div>
              </div>
            </div>

            <div className="mt-3 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, state.pollingIntentionsFirstRound * 2.5)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Clivages Sociologiques & Démographie */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-serif font-bold text-slate-100 text-sm flex items-center space-x-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Baromètre Sociologique & Électorat</span>
            </h3>
            <span className="text-xs text-slate-400">Cotes d'adhésion par catégorie</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
            
            {/* Retraités */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Retraités & Séniors</span>
                <span className="font-bold text-amber-400">{demographics.retraites}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${demographics.retraites}%` }}
                />
              </div>
            </div>

            {/* Classes Populaires */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Classes Populaires / Ouvriers</span>
                <span className="font-bold text-blue-400">{demographics.populaires}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${demographics.populaires}%` }}
                />
              </div>
            </div>

            {/* Cadres & CSP+ */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Cadres & CSP+</span>
                <span className="font-bold text-emerald-400">{demographics.cadres}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${demographics.cadres}%` }}
                />
              </div>
            </div>

            {/* Jeunesse & Étudiants */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Jeunesse & Étudiants</span>
                <span className="font-bold text-purple-400">{demographics.jeunesse}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-purple-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${demographics.jeunesse}%` }}
                />
              </div>
            </div>

            {/* Fonction Publique */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Fonctionnaires & Enseignants</span>
                <span className="font-bold text-rose-400">{demographics.fonctionnaires}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-rose-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${demographics.fonctionnaires}%` }}
                />
              </div>
            </div>

            {/* Monde Rural & Périurbain */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Monde Rural & Périurbain</span>
                <span className="font-bold text-amber-500">{demographics.rural}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${demographics.rural}%` }}
                />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Rangée Climat Social, Économie & Médias */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Climat Social & Tension */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="font-serif font-bold text-slate-100 text-sm flex items-center space-x-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Climat Social & Rue</span>
              </h4>
              <span className={`text-xs uppercase font-bold px-2 py-0.5 rounded border ${tensionColors[social.tensionIndex]}`}>
                {social.tensionIndex}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Risque de grève interprofessionnelle :</span>
                  <span className="font-bold text-slate-200">{social.strikeRisk}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${social.strikeRisk > 50 ? 'bg-rose-500' : 'bg-amber-400'}`}
                    style={{ width: `${social.strikeRisk}%` }}
                  />
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400">Fronts syndicaux actifs :</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {social.activeFronts.map((front, idx) => (
                    <span key={idx} className="text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                      {front}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>Baromètre médias :</span>
            <span className={mediaColors[social.mediaBarometer]}>
              {social.mediaBarometer.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>

        {/* Macro-Économie & Finances Publiques */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="font-serif font-bold text-slate-100 text-sm flex items-center space-x-2">
                <Euro className="w-4 h-4 text-emerald-400" />
                <span>Macro-Économie & Dette</span>
              </h4>
              {economy.euDeficitWarning && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  Alerte UE
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Déficit Public :</span>
                <div className={`text-base font-bold ${economy.deficit > 3.0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {economy.deficit}% PIB
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Dette Publique :</span>
                <div className="text-base font-bold text-amber-400">
                  {economy.debt}% PIB
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Croissance PIB :</span>
                <div className="text-base font-bold text-slate-200">
                  +{economy.growth}%
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Spread OAT/Bund :</span>
                <div className={`text-base font-bold ${economy.spreadOatBund > 80 ? 'text-rose-400' : 'text-slate-200'}`}>
                  {economy.spreadOatBund} bps
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>Agences de notation :</span>
            <span className="font-semibold text-slate-300 capitalize">
              {economy.ratingAgencyAlert.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Presse & Éditorial */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
              <Newspaper className="w-4 h-4 text-blue-400" />
              <h4 className="font-serif font-bold text-slate-100 text-sm">
                La Grande Une des Quotidiens
              </h4>
            </div>

            <div className="mt-4 bg-slate-950 p-4 rounded-xl border border-slate-800 font-serif italic text-slate-200 text-sm leading-relaxed relative">
              <span className="text-3xl text-slate-700 absolute -top-2 left-2">“</span>
              <p className="relative z-10 pt-1">
                {state.newspaperHeadline}
              </p>
            </div>
          </div>

          {/* Boutons d'Action Rapide */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
            {state.mode === 'governance' && onOpenParliament && (
              <button
                onClick={onOpenParliament}
                className="flex-1 py-2 px-3 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-700/60 text-blue-200 font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
              >
                <Building className="w-3.5 h-3.5" />
                <span>Assemblée</span>
              </button>
            )}
            {state.mode === 'campaign' && onOpenCampaignActions && (
              <button
                onClick={onOpenCampaignActions}
                className="flex-1 py-2 px-3 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-700/60 text-amber-200 font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Actions QG</span>
              </button>
            )}
            {state.activeEvent && (
              <button
                onClick={onOpenEvent}
                className="flex-1 py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-colors flex items-center justify-center space-x-1.5"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Arbitrage</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
