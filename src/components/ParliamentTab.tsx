import React, { useState } from 'react';
import { GameState, ProposedLaw, ParliamentGroup } from '../types/game';
import { CATALOG_LAWS } from '../data/laws';
import { calculateVoteOnLaw, calculateCensureMotion } from '../engine/parliament';
import { Hemicycle } from './Hemicycle';
import { 
  Building, Scale, ShieldAlert, Vote, CheckCircle, 
  XCircle, AlertTriangle, RefreshCw, Send, Zap, FileText 
} from 'lucide-react';

interface ParliamentTabProps {
  state: GameState;
  onUpdateState: (newState: GameState) => void;
}

export const ParliamentTab: React.FC<ParliamentTabProps> = ({ state, onUpdateState }) => {
  const [selectedLaw, setSelectedLaw] = useState<ProposedLaw>(CATALOG_LAWS[0]);
  const [voteResult, setVoteResult] = useState<{
    votesFor: number;
    votesAgainst: number;
    abstentions: number;
    passed: boolean;
    breakdownByGroup: any;
  } | null>(null);

  const [censureResult, setCensureResult] = useState<{
    censureVotes: number;
    passed: boolean;
    details: any[];
  } | null>(null);

  const [notification, setNotification] = useState<string | null>(null);

  // 1. Simuler un vote normal à l'Assemblée nationale
  const handleVoteLaw = () => {
    const res = calculateVoteOnLaw(selectedLaw, state.parliament, state.player);
    setVoteResult(res);
    setCensureResult(null);

    const nextState = { ...state };
    if (res.passed) {
      setNotification(`Le projet de loi « ${selectedLaw.title} » est ADOPTÉ par ${res.votesFor} voix contre ${res.votesAgainst} !`);
      nextState.popularity = Math.min(100, nextState.popularity + 3);
      if (selectedLaw.costOrSavings !== 0) {
        nextState.economy.deficit = Number((nextState.economy.deficit + (selectedLaw.costOrSavings > 0 ? 0.15 : -0.3)).toFixed(2));
      }
    } else {
      setNotification(`Le projet de loi « ${selectedLaw.title} » est REJETÉ (${res.votesFor} pour, ${res.votesAgainst} contre).`);
      nextState.popularity = Math.max(5, nextState.popularity - 2);
    }
    onUpdateState(nextState);
  };

  // 2. Engager l'Article 49.3 de la Constitution
  const handleTrigger49_3 = () => {
    const censure = calculateCensureMotion(state.parliament, state.player);
    setCensureResult(censure);
    setVoteResult(null);

    const nextState = { ...state };
    nextState.hasUsed49_3ThisSession = true;
    nextState.authorityPoints = Math.max(0, nextState.authorityPoints - 15);

    if (censure.passed) {
      setNotification(`💥 CATASTROPHE INSTITUTIONNELLE : La motion de censure est adoptée par ${censure.censureVotes} voix (seuil 289) ! Le gouvernement est renversé.`);
      nextState.social.tensionIndex = 'crise';
      nextState.popularity = Math.max(5, nextState.popularity - 8);
      nextState.censureThreatLevel = 'critique';
    } else {
      setNotification(`✅ Victoire parlementaire tendue : La motion de censure recueille ${censure.censureVotes} voix (insuffisant). La loi est adoptée en vertu de l'Article 49.3 !`);
      nextState.social.tensionIndex = nextState.social.tensionIndex === 'faible' ? 'moderee' : 'elevee';
      nextState.popularity = Math.max(5, nextState.popularity - 1);
    }
    onUpdateState(nextState);
  };

  // 3. Recourir à l'Article 12 (Dissolution de l'Assemblée nationale)
  const handleDissolution = () => {
    if (!window.confirm("Êtes-vous certain de vouloir dissoudre l'Assemblée nationale (Article 12) ? De nouvelles élections législatives seront immédiatement convoquées.")) {
      return;
    }

    const nextState = { ...state };
    nextState.history.unshift({
      turn: nextState.turn,
      date: nextState.currentDate,
      headline: 'Dissolution de l\'Assemblée nationale par le Président de la République',
      choiceMade: 'Article 12',
      popularityAfter: nextState.popularity,
      tensionAfter: 'elevee'
    });

    // Recomposition aléatoire des groupes selon la popularité actuelle
    const boost = nextState.popularity > 30 ? 25 : -20;
    nextState.parliament = nextState.parliament.map(g => {
      if (g.id === state.player.group) {
        return { ...g, seats: Math.max(80, Math.min(260, g.seats + boost)) };
      }
      return g;
    });

    setNotification("L'Assemblée nationale est officiellement dissoute. Les forces politiques entrent en campagne législative éclair !");
    onUpdateState(nextState);
  };

  return (
    <div className="space-y-6">
      
      {/* Hémicycle interactif */}
      <Hemicycle groups={state.parliament} majorityThreshold={state.censureThreshold} />

      {/* Notification d'action parlementaire */}
      {notification && (
        <div className="bg-slate-850 border-l-4 border-amber-400 p-4 rounded-xl shadow text-sm font-medium text-slate-100 flex items-center justify-between">
          <span>{notification}</span>
          <button onClick={() => setNotification(null)} className="text-xs text-slate-400 hover:text-white ml-3">
            Fermer
          </button>
        </div>
      )}

      {/* Section Textes de Loi & Leviers Constitutionnels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Liste des Textes disponibles */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h3 className="font-serif font-bold text-slate-100 text-sm flex items-center space-x-2 pb-3 border-b border-slate-800">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Catalogue des Projets de Loi</span>
          </h3>

          <div className="space-y-2 mt-4">
            {CATALOG_LAWS.map((law) => {
              const isSelected = law.id === selectedLaw.id;
              return (
                <div
                  key={law.id}
                  onClick={() => {
                    setSelectedLaw(law);
                    setVoteResult(null);
                    setCensureResult(null);
                  }}
                  className={`cursor-pointer p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-amber-400 ring-1 ring-amber-400'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {law.category}
                  </span>
                  <h4 className="font-bold text-xs text-slate-100 mt-1.5 line-clamp-2">
                    {law.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Détails du texte sélectionné & Boutons d'Action */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  {selectedLaw.category.toUpperCase()}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-black text-slate-100 mt-2">
                  {selectedLaw.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Avis du Sénat :</span>
                <div className="font-bold text-xs text-amber-300 capitalize">
                  {selectedLaw.senateSupport}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {selectedLaw.summary}
            </p>

            {/* Estimation des votes par famille */}
            <div className="mt-4">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                Estimation du vote dans l'hémicycle :
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(selectedLaw.supportByGroup).map(([grpId, supportPct]) => {
                  const grp = state.parliament.find(g => g.id === grpId);
                  if (!grp) return null;
                  return (
                    <div key={grpId} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
                      <div className="flex items-center space-x-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: grp.color }} />
                        <span className="font-bold text-slate-200 truncate">{grp.shortName}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Adhésion :</span>
                        <span className="font-bold text-slate-200">{supportPct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Résultats du vote si déclenché */}
            {voteResult && (
              <div className={`mt-5 p-4 rounded-xl border ${voteResult.passed ? 'bg-emerald-950/80 border-emerald-800' : 'bg-rose-950/80 border-rose-800'}`}>
                <div className="flex items-center space-x-2 font-bold text-sm">
                  {voteResult.passed ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />}
                  <span>{voteResult.passed ? 'TEXTE ADOPTÉ' : 'TEXTE REJETÉ'}</span>
                </div>
                <p className="text-xs mt-1 text-slate-200">
                  Voix POUR : <strong>{voteResult.votesFor}</strong> | Voix CONTRE : <strong>{voteResult.votesAgainst}</strong> | Abstentions : {voteResult.abstentions} (Majorité requise : 289)
                </p>
              </div>
            )}

            {/* Résultats de censure 49.3 si déclenché */}
            {censureResult && (
              <div className={`mt-5 p-4 rounded-xl border ${censureResult.passed ? 'bg-rose-950/90 border-rose-700' : 'bg-emerald-950/90 border-emerald-700'}`}>
                <div className="flex items-center space-x-2 font-bold text-sm">
                  {censureResult.passed ? <AlertTriangle className="w-5 h-5 text-rose-400" /> : <CheckCircle className="w-5 h-5 text-emerald-400" />}
                  <span>{censureResult.passed ? 'GOUVERNEMENT CENSURÉ' : 'MOTION DE CENSURE REJETÉE'}</span>
                </div>
                <p className="text-xs mt-1 text-slate-200">
                  Voix de censure obtenues : <strong>{censureResult.censureVotes}</strong> / 289 requises. {censureResult.passed ? 'Le texte tombe et le Premier ministre doit démissionner.' : 'Le texte est adopté définitivement sous 49.3.'}
                </p>
              </div>
            )}

          </div>

          {/* Outils Constitutionnels & Actions */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-3">
            <button
              onClick={handleVoteLaw}
              className="py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 flex items-center space-x-2 transition-colors"
            >
              <Vote className="w-4 h-4" />
              <span>Soumettre au Vote Solennel</span>
            </button>

            <button
              onClick={handleTrigger49_3}
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-amber-600/20 flex items-center space-x-2 transition-colors"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Engager l'Article 49.3</span>
            </button>

            <button
              onClick={handleDissolution}
              className="py-3 px-4 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 font-bold text-xs transition-colors flex items-center space-x-1.5"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Article 12 (Dissolution)</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
