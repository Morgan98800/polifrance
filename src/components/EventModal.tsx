import React, { useState } from 'react';
import { GameEvent, GameEventChoice, GameState } from '../types/game';
import { 
  AlertCircle, ChevronRight, Sparkles, Send, 
  TrendingUp, TrendingDown, Users, ShieldAlert, Euro 
} from 'lucide-react';

interface EventModalProps {
  event: GameEvent;
  state: GameState;
  onResolve: (choice: GameEventChoice) => void;
  onClose?: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, state, onResolve }) => {
  const [customActionText, setCustomActionText] = useState('');
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isCustom, setIsCustom] = useState(false);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customActionText.trim()) return;

    // Simulation dynamique de l'action libre personnalisée
    const customChoice: GameEventChoice = {
      id: `custom_choice_${Date.now()}`,
      label: `Décision Libre : ${customActionText.slice(0, 45)}...`,
      description: customActionText,
      costInfluence: 10,
      effects: {
        popularityDelta: 2,
        demographicsDelta: { cadres: 4, populaires: 3, retraites: 2 },
        tensionDelta: -5,
        deficitDelta: 0.05,
        message: `Votre arbitrage présidentiel inédit (« ${customActionText} ») surprend les observateurs politiques et recompose les lignes de débat.`
      }
    };

    onResolve(customChoice);
  };

  const activeChoice = event.choices.find(c => c.id === selectedChoiceId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Liseré républicain */}
        <div className="h-1.5 w-full flex">
          <div className="h-full w-1/3 bg-[#002654]"></div>
          <div className="h-full w-1/3 bg-white"></div>
          <div className="h-full w-1/3 bg-[#ce1126]"></div>
        </div>

        {/* En-tête de crise */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-850 to-slate-900 border-b border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-300 text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Dilemme Stratégique — {event.category}</span>
            </span>
            <span className="text-xs text-slate-400 font-medium">Source : {event.source}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-100 leading-tight">
            {event.title}
          </h2>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            {event.description}
          </p>
        </div>

        {/* Corps des choix */}
        <div className="p-6 sm:p-8 space-y-4">
          <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Options d'Arbitrage Républicain :
          </h3>

          <div className="space-y-3">
            {event.choices.map((choice) => {
              const isSelected = selectedChoiceId === choice.id && !isCustom;
              return (
                <div
                  key={choice.id}
                  onClick={() => {
                    setSelectedChoiceId(choice.id);
                    setIsCustom(false);
                  }}
                  className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all duration-200 text-left ${
                    isSelected
                      ? 'bg-slate-800 border-amber-400 ring-1 ring-amber-400 shadow-lg'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-3">
                      <h4 className="font-bold text-sm sm:text-base text-slate-100 leading-snug">
                        {choice.label}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {choice.description}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                        <ChevronRight className="w-4 h-4 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  {/* Aperçu des impacts prévisionnels */}
                  {choice.effects && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap gap-3 text-xs">
                      {choice.effects.popularityDelta && (
                        <span className={`inline-flex items-center space-x-1 font-semibold ${
                          choice.effects.popularityDelta > 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {choice.effects.popularityDelta > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          <span>Pop. {choice.effects.popularityDelta > 0 ? `+${choice.effects.popularityDelta}` : choice.effects.popularityDelta}%</span>
                        </span>
                      )}
                      {choice.effects.tensionDelta && (
                        <span className={`inline-flex items-center space-x-1 font-semibold ${
                          choice.effects.tensionDelta < 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>Tension {choice.effects.tensionDelta > 0 ? `+${choice.effects.tensionDelta}` : choice.effects.tensionDelta}</span>
                        </span>
                      )}
                      {choice.effects.deficitDelta && (
                        <span className="inline-flex items-center space-x-1 text-slate-300">
                          <Euro className="w-3.5 h-3.5 text-amber-400" />
                          <span>Déficit : {choice.effects.deficitDelta > 0 ? `+${choice.effects.deficitDelta}%` : `${choice.effects.deficitDelta}%`}</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Option Action Personnalisée */}
          <div className="pt-2">
            <div
              onClick={() => {
                setIsCustom(true);
                setSelectedChoiceId(null);
              }}
              className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                isCustom
                  ? 'bg-slate-800 border-amber-400 ring-1 ring-amber-400'
                  : 'bg-slate-950/40 border-dashed border-slate-700 hover:border-amber-400/60'
              }`}
            >
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Formuler une action politique sur-mesure</span>
              </div>
              {isCustom ? (
                <form onSubmit={handleCustomSubmit} className="mt-2 space-y-3">
                  <textarea
                    rows={2}
                    placeholder="Ex: Organiser une conférence nationale du travail à l'Élysée et suspendre les décrets contestés..."
                    value={customActionText}
                    onChange={(e) => setCustomActionText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!customActionText.trim()}
                      className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow"
                    >
                      <span>Exécuter cet Arbitrage</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-xs text-slate-400">
                  Cliquez ici pour rédiger une solution institutionnelle ou une déclaration personnalisée.
                </p>
              )}
            </div>
          </div>

          {/* Bouton de confirmation pour choix prédéfini */}
          {!isCustom && activeChoice && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => onResolve(activeChoice)}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center space-x-2"
              >
                <span>Confirmer et Appliquer la Décision</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
