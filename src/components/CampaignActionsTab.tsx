import React, { useState } from 'react';
import { GameState } from '../types/game';
import { 
  Users, Tv, Flag, Euro, Share2, Sparkles, 
  TrendingUp, Award, CheckCircle, Flame 
} from 'lucide-react';

interface CampaignActionsTabProps {
  state: GameState;
  onUpdateState: (newState: GameState) => void;
}

export const CampaignActionsTab: React.FC<CampaignActionsTabProps> = ({ state, onUpdateState }) => {
  const [feedback, setFeedback] = useState<string | null>(null);

  // 1. Grand Meeting de campagne
  const handleMeeting = (city: string, cost: number) => {
    if (state.funds < cost) {
      setFeedback("Fonds insuffisants pour organiser ce grand meeting régional.");
      return;
    }
    const nextState = { ...state };
    nextState.funds -= cost;
    nextState.popularity = Math.min(100, nextState.popularity + 2);
    nextState.pollingIntentionsFirstRound = Math.min(100, nextState.pollingIntentionsFirstRound + 2.2);
    nextState.authorityPoints = Math.min(100, nextState.authorityPoints + 5);
    nextState.newspaperHeadline = `« Meeting monstre à ${city} : Une démonstration de force républicaine »`;
    setFeedback(`Grand meeting à ${city} réussi ! Plus de 10 000 militants survoltés, gain de +2.2% dans les intentions de vote.`);
    onUpdateState(nextState);
  };

  // 2. Grande Interview TV au Journal de 20h
  const handleTVInterview = () => {
    if (state.authorityPoints < 10) {
      setFeedback("Capital politique insuffisant pour négocier un créneau au 20h ce soir.");
      return;
    }
    const nextState = { ...state };
    nextState.authorityPoints -= 10;
    const gain = Math.floor(Math.random() * 3) + 1; // +1 à +3%
    nextState.popularity = Math.min(100, nextState.popularity + gain);
    nextState.pollingIntentionsFirstRound = Math.min(100, nextState.pollingIntentionsFirstRound + gain);
    nextState.newspaperHeadline = `« Interview exclusive au 20h : Les annonces fortes du candidat »`;
    setFeedback(`Passage très remarqué au journal de 20h devant 7 millions de téléspectateurs (+${gain}% dans les sondages) !`);
    onUpdateState(nextState);
  };

  // 3. Chasse aux Parrainages de Maires
  const handleParrainages = () => {
    if (state.signatures >= 500) {
      setFeedback("Vous avez déjà atteint le seuil constitutionnel des 500 parrainages requis !");
      return;
    }
    const nextState = { ...state };
    const added = Math.min(500 - nextState.signatures, Math.floor(Math.random() * 40) + 30);
    nextState.signatures += added;
    nextState.funds = Math.max(0, nextState.funds - 200); // Frais de déplacement des militants
    setFeedback(`Vos équipes d'élus ruraux ont récolté +${added} signatures d'élus ! (Total : ${nextState.signatures} / 500)`);
    onUpdateState(nextState);
  };

  // 4. Grand Dîner de Levée de Fonds
  const handleFundraiser = () => {
    const nextState = { ...state };
    const raised = Math.floor(Math.random() * 800) + 1000; // 1M€ à 1.8M€
    nextState.funds += raised;
    nextState.authorityPoints = Math.max(0, nextState.authorityPoints - 5);
    setFeedback(`Grand dîner de donateurs républicains à Paris : +${(raised / 1000).toFixed(2)} M€ ajoutés au compte de campagne.`);
    onUpdateState(nextState);
  };

  return (
    <div className="space-y-6">
      
      {/* Statut de campagne */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800">
              QG DE CAMPAGNE 2027
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-100 mt-2">
              Opérations de Terrain & Stratégie Électorale
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400">Objectif 500 Parrainages :</span>
              <div className={`font-bold text-sm ${state.signatures >= 500 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {state.signatures} / 500
              </div>
            </div>
          </div>
        </div>

        {feedback && (
          <div className="mt-4 p-3.5 rounded-xl bg-slate-850 border border-amber-400/60 text-xs sm:text-sm font-medium text-slate-100 flex items-center justify-between">
            <span>{feedback}</span>
            <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-white ml-2">
              Fermer
            </button>
          </div>
        )}
      </div>

      {/* Grille des actions de campagne */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Action 1 : Grand Meeting */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 mb-3">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-100 text-base">Grand Meeting de Masse</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Mobiliser 10 000 partisans à Bercy, Marseille ou Lille pour créer un élan médiatique national.
            </p>
            <div className="mt-3 text-[11px] text-slate-300 space-y-1">
              <div>Coût : <strong className="text-rose-400">800 k€</strong></div>
              <div>Gain estimé : <strong className="text-emerald-400">+2% sondages</strong></div>
            </div>
          </div>
          <button
            onClick={() => handleMeeting('Paris-Bercy', 800)}
            className="mt-4 w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-colors"
          >
            Lancer le Meeting
          </button>
        </div>

        {/* Action 2 : Interview TV 20h */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 mb-3">
              <Tv className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-100 text-base">Invité Spécial au 20h</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Capter l'attention de plusieurs millions de Français et clarifier votre vision pour la France.
            </p>
            <div className="mt-3 text-[11px] text-slate-300 space-y-1">
              <div>Coût : <strong className="text-amber-400">10 pts Autorité</strong></div>
              <div>Gain estimé : <strong className="text-emerald-400">+1% à +3%</strong></div>
            </div>
          </div>
          <button
            onClick={handleTVInterview}
            className="mt-4 w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition-colors"
          >
            Passer au Journal de 20h
          </button>
        </div>

        {/* Action 3 : Chasse aux Parrainages */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-3">
              <Flag className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-100 text-base">Tournée des Maires Ruraux</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Envoyer vos équipes d'élus dans les territoires pour sécuriser les 500 formulaires officiels du Conseil constitutionnel.
            </p>
            <div className="mt-3 text-[11px] text-slate-300 space-y-1">
              <div>Coût : <strong className="text-rose-400">200 k€</strong></div>
              <div>Gain : <strong className="text-emerald-400">+30 à +50 signatures</strong></div>
            </div>
          </div>
          <button
            onClick={handleParrainages}
            className="mt-4 w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-colors"
          >
            Récolter des Signatures
          </button>
        </div>

        {/* Action 4 : Levée de Fonds */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 mb-3">
              <Euro className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-100 text-base">Soirée Donateurs & Mécènes</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Renflouer le compte bancaire officiel de campagne en sollicitant vos réseaux d'entrepreneurs et de bienfaiteurs.
            </p>
            <div className="mt-3 text-[11px] text-slate-300 space-y-1">
              <div>Coût : <strong className="text-amber-400">5 pts Autorité</strong></div>
              <div>Gain : <strong className="text-emerald-400">+1.0 à +1.8 M€</strong></div>
            </div>
          </div>
          <button
            onClick={handleFundraiser}
            className="mt-4 w-full py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow transition-colors"
          >
            Lever des Fonds
          </button>
        </div>

      </div>

    </div>
  );
};
