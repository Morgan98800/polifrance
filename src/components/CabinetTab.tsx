import React, { useState } from 'react';
import { GameState, Minister } from '../types/game';
import { Landmark, UserCheck, Shield, AlertTriangle, RefreshCw, Award, CheckCircle } from 'lucide-react';

interface CabinetTabProps {
  state: GameState;
  onUpdateState: (newState: GameState) => void;
}

export const CabinetTab: React.FC<CabinetTabProps> = ({ state, onUpdateState }) => {
  const [feedback, setFeedback] = useState<string | null>(null);

  // 1. Remanier un ministre
  const handleReshuffleMinister = (ministerId: string) => {
    const nextState = { ...state };
    nextState.ministers = nextState.ministers.map(m => {
      if (m.id === ministerId) {
        return {
          ...m,
          name: `Nouveau Secrétaire d'État (${['A. Vautrin', 'M. Beaune', 'C. Darmanin', 'S. Le Maire', 'A. Pannier-Runacher'][Math.floor(Math.random() * 5)]})`,
          competence: Math.floor(Math.random() * 20) + 75,
          loyalty: 90,
          scandalRisk: 5
        };
      }
      return m;
    });
    nextState.authorityPoints = Math.max(0, nextState.authorityPoints - 5);
    setFeedback("Remaniement ministériel validé au Journal Officiel ! Le gouvernement affiche une loyauté renouvelée.");
    onUpdateState(nextState);
  };

  // 2. Tenir un Conseil des Ministres solennel
  const handleCabinetCouncil = () => {
    const nextState = { ...state };
    nextState.authorityPoints = Math.min(100, nextState.authorityPoints + 8);
    nextState.popularity = Math.min(100, nextState.popularity + 1);
    setFeedback("Conseil des Ministres tenu à l'Élysée : Présentation de 3 ordonnances de simplification administrative.");
    onUpdateState(nextState);
  };

  return (
    <div className="space-y-6">
      
      {/* En-tête Gouvernement */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800">
              PALAIS DE L'ÉLYSÉE & HÔTEL DE MATIGNON
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-100 mt-1">
              Gouvernement de la République
            </h2>
          </div>
        </div>

        <button
          onClick={handleCabinetCouncil}
          className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-colors flex items-center space-x-2 self-start sm:self-auto"
        >
          <Award className="w-4 h-4" />
          <span>Tenir le Conseil des Ministres</span>
        </button>
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-slate-850 border border-amber-400/60 text-xs sm:text-sm font-medium text-slate-100 flex items-center justify-between">
          <span>{feedback}</span>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-white ml-2">
            Fermer
          </button>
        </div>
      )}

      {/* Fiche Premier Ministre */}
      {state.primeMinister && (
        <div className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
                <UserCheck className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                  Chef du Gouvernement (Matignon)
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-100 mt-1">
                  {state.primeMinister.name}
                </h3>
                <p className="text-xs text-slate-400">Garant de la majorité et de la coordination gouvernementale</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs">
              <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                <span className="text-slate-400">Compétence :</span>
                <div className="font-bold text-emerald-400 text-sm">{state.primeMinister.competence}%</div>
              </div>
              <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                <span className="text-slate-400">Loyauté Élysée :</span>
                <div className="font-bold text-amber-400 text-sm">{state.primeMinister.loyalty}%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grille des Ministres Régaliens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {state.ministers.map((minister) => (
          <div
            key={minister.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="font-bold text-sm text-slate-100 truncate pr-2">
                  {minister.role}
                </h4>
                <span className="text-xs text-slate-400 font-mono">
                  {minister.name}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-400 block text-[10px]">Compétence</span>
                  <span className="font-bold text-emerald-400 text-sm">{minister.competence}%</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-400 block text-[10px]">Loyauté</span>
                  <span className="font-bold text-amber-400 text-sm">{minister.loyalty}%</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-400 block text-[10px]">Risque Affaires</span>
                  <span className={`font-bold text-sm ${minister.scandalRisk > 12 ? 'text-rose-400' : 'text-slate-300'}`}>
                    {minister.scandalRisk}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-end">
              <button
                onClick={() => handleReshuffleMinister(minister.id)}
                className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Remanier ce Portefeuille</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
