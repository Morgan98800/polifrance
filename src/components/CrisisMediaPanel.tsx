import React, { useState } from 'react';
import { GameState, GameEventChoice } from '../types/game';
import { 
  Radio, AlertCircle, FileText, Send, Sparkles, 
  TrendingUp, TrendingDown, ShieldAlert, Euro, Users, CheckCircle, ChevronRight 
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface CrisisMediaPanelProps {
  state: GameState;
  onResolveChoice: (choice: GameEventChoice) => void;
}

export const CrisisMediaPanel: React.FC<CrisisMediaPanelProps> = ({ state, onResolveChoice }) => {
  const [hoveredChoice, setHoveredChoice] = useState<GameEventChoice | null>(null);
  const [customActionText, setCustomActionText] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  const activeEvent = state.activeEvent;

  const handleChoiceClick = (choice: GameEventChoice) => {
    soundEffects.playStamp();
    onResolveChoice(choice);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customActionText.trim()) return;

    soundEffects.playStamp();
    const customChoice: GameEventChoice = {
      id: `custom_${Date.now()}`,
      label: `Arbitrage Personnalisé : ${customActionText.slice(0, 40)}...`,
      description: customActionText,
      costInfluence: 10,
      effects: {
        popularityDelta: 2,
        demographicsDelta: { cadres: 3, populaires: 3 },
        tensionDelta: -5,
        deficitDelta: 0.05,
        message: `Votre décision sur-mesure (« ${customActionText} ») est transmise aux ministères pour application immédiate.`
      }
    };
    onResolveChoice(customChoice);
  };

  return (
    <div className="bg-[#FFFFFF] border-2 border-[#1A1A1A] p-5 shadow-[4px_4px_0px_#1A1A1A] space-y-5 flex flex-col justify-between h-full text-[#1A1A1A]">
      
      {/* 1. Dépêches AFP & Veille Informationnelle */}
      <div>
        <div className="flex items-center justify-between pb-2 border-b-2 border-[#1A1A1A]">
          <div className="flex items-center space-x-2 text-[#E63946] text-xs font-mono font-bold uppercase tracking-wider">
            <Radio className="w-4 h-4 stroke-[2]" />
            <span>DÉPÊCHES AFP • DIRECT</span>
          </div>
          <span className="text-[10px] font-mono text-[#1A1A1A]/60">FIL D'INFORMATION</span>
        </div>

        <div className="mt-2.5 space-y-2 max-h-36 overflow-y-auto">
          {/* Dépêche 1 */}
          <div className="bg-[#F7F7F5] p-2.5 border border-[#1A1A1A] text-xs font-mono">
            <div className="flex items-center justify-between text-[10px] text-[#1A1A1A]/60 mb-0.5">
              <span>AFP URGENT • 17:04</span>
              <span className="text-[#E63946] font-bold">ALERTE NATIONALE</span>
            </div>
            <p className="text-[#1A1A1A] font-medium leading-snug font-sans">
              {state.breakingNews}
            </p>
          </div>

          {/* Dépêche 2 */}
          <div className="bg-[#F7F7F5] p-2.5 border border-[#1A1A1A] text-xs font-mono">
            <div className="flex items-center justify-between text-[10px] text-[#1A1A1A]/60 mb-0.5">
              <span>PRESSE • ÉDITO</span>
              <span className="text-[#1D3557] font-bold">À LA UNE</span>
            </div>
            <p className="text-[#1A1A1A]/80 italic font-serif">
              “{state.newspaperHeadline}”
            </p>
          </div>
        </div>
      </div>

      {/* 2. Chambre de Décision : Document Officiel Immersif */}
      <div className="flex-1 flex flex-col justify-between">
        {activeEvent ? (
          <div className="bg-[#F7F7F5] p-4 border-2 border-[#1A1A1A] relative flex flex-col justify-between space-y-3">
            
            {/* Tampon Brutaliste */}
            <div className="absolute top-2 right-2 border-2 border-[#E63946] text-[#E63946] text-[9px] font-mono font-bold px-1.5 py-0.5 uppercase">
              CONFIDENTIEL
            </div>

            <div>
              {/* En-Tête Administratif */}
              <div className="pb-2 border-b border-[#1A1A1A]">
                <span className="text-[10px] font-mono font-bold text-[#1A1A1A]/60 uppercase tracking-wider block">
                  RÉPUBLIQUE FRANÇAISE • DOSSIER D'ÉTAT
                </span>
                <h3 className="font-serif font-black text-lg text-[#1A1A1A] mt-1 leading-tight">
                  {activeEvent.title}
                </h3>
              </div>

              <p className="text-xs text-[#1A1A1A] mt-2 font-serif italic bg-[#FFFFFF] p-2.5 border border-[#1A1A1A] leading-relaxed">
                “{activeEvent.description}”
              </p>
            </div>

            {/* Options d'arbitrage */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono font-bold text-[#1A1A1A]/60 uppercase tracking-wider block">
                ARBITRAGES POSSIBLES :
              </span>

              {activeEvent.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceClick(choice)}
                  onMouseEnter={() => { soundEffects.playKeystroke(); setHoveredChoice(choice); }}
                  onMouseLeave={() => setHoveredChoice(null)}
                  className="w-full text-left p-2.5 bg-[#FFFFFF] hover:bg-[#F7F7F5] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-xs font-sans text-[#1A1A1A] font-semibold leading-tight group flex items-center justify-between"
                >
                  <span className="flex-1 pr-2">➔ {choice.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#1A1A1A]/50 group-hover:translate-x-0.5 transition-transform shrink-0 stroke-[2]" />
                </button>
              ))}

              {/* Saisie Libre */}
              <div className="pt-1">
                {!isCustomMode ? (
                  <button
                    onClick={() => setIsCustomMode(true)}
                    className="w-full py-1.5 px-3 bg-[#FFFFFF] hover:bg-[#F7F7F5] border border-dashed border-[#1A1A1A] text-[#1A1A1A]/70 text-xs font-mono font-bold flex items-center justify-center space-x-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 stroke-[2]" />
                    <span>Rédiger un arbitrage sur-mesure</span>
                  </button>
                ) : (
                  <form onSubmit={handleCustomSubmit} className="space-y-2">
                    <textarea
                      rows={2}
                      placeholder="Texte de votre arbitrage..."
                      value={customActionText}
                      onChange={(e) => setCustomActionText(e.target.value)}
                      className="w-full bg-[#FFFFFF] border-2 border-[#1A1A1A] p-2 text-xs font-sans text-[#1A1A1A] focus:outline-none"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setIsCustomMode(false)}
                        className="py-1 px-2 bg-[#F7F7F5] border border-[#1A1A1A] text-xs font-mono"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        disabled={!customActionText.trim()}
                        className="py-1 px-3 bg-[#1A1A1A] text-[#FFFFFF] font-mono font-bold text-xs border border-[#1A1A1A]"
                      >
                        Signer
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-[#F7F7F5] p-6 border-2 border-[#1A1A1A] text-center text-[#1A1A1A]/70 text-xs font-mono">
            <CheckCircle className="w-8 h-8 text-[#2A9D8F] mx-auto mb-2 stroke-[2]" />
            <span>Aucune crise en attente d'arbitrage. Vous pouvez passer au tour suivant.</span>
          </div>
        )}
      </div>

      {/* 3. Graphe / Tooltip d'Impact Brutaliste (Au survol d'un choix) */}
      {hoveredChoice && hoveredChoice.effects && (
        <div className="bg-[#FFFFFF] p-3 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] text-xs font-mono space-y-1.5">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#1A1A1A]/60">
            <span>IMPACTS ESTIMÉS</span>
            <span>SIMULATION</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            {hoveredChoice.effects.popularityDelta !== undefined && (
              <div className={`p-1.5 border border-[#1A1A1A] font-bold ${hoveredChoice.effects.popularityDelta >= 0 ? 'bg-[#2A9D8F] text-[#FFFFFF]' : 'bg-[#E63946] text-[#FFFFFF]'}`}>
                <span>OPINION : {hoveredChoice.effects.popularityDelta >= 0 ? `+${hoveredChoice.effects.popularityDelta}` : hoveredChoice.effects.popularityDelta}%</span>
              </div>
            )}

            {hoveredChoice.effects.tensionDelta !== undefined && (
              <div className={`p-1.5 border border-[#1A1A1A] font-bold ${hoveredChoice.effects.tensionDelta <= 0 ? 'bg-[#2A9D8F] text-[#FFFFFF]' : 'bg-[#E63946] text-[#FFFFFF]'}`}>
                <span>TENSION : {hoveredChoice.effects.tensionDelta > 0 ? `+${hoveredChoice.effects.tensionDelta}` : hoveredChoice.effects.tensionDelta}</span>
              </div>
            )}

            {hoveredChoice.effects.deficitDelta !== undefined && (
              <div className={`p-1.5 border border-[#1A1A1A] font-bold ${hoveredChoice.effects.deficitDelta <= 0 ? 'bg-[#2A9D8F] text-[#FFFFFF]' : 'bg-[#E63946] text-[#FFFFFF]'}`}>
                <span>DÉFICIT : {hoveredChoice.effects.deficitDelta > 0 ? `+${hoveredChoice.effects.deficitDelta}%` : `${hoveredChoice.effects.deficitDelta}%`}</span>
              </div>
            )}

            {hoveredChoice.effects.growthDelta !== undefined && (
              <div className="p-1.5 bg-[#1D3557] text-[#FFFFFF] border border-[#1A1A1A] font-bold">
                <span>CROISSANCE : +{hoveredChoice.effects.growthDelta}%</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
