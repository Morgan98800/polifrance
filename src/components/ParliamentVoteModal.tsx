import React, { useState } from 'react';
import { GameState, GameEventChoice } from '../types/game';
import { soundEffects } from '../utils/audio';
import { Building2, PhoneCall, Wallet, AlertTriangle, CheckCircle2, Gavel, ArrowRight, X } from 'lucide-react';

interface ParliamentVoteModalProps {
  state: GameState;
  choice: GameEventChoice;
  onVoteSuccess: (choice: GameEventChoice, bonusEffects?: { costTreasury?: number; costAuthority?: number; tensionDelta?: number }) => void;
  onUse49_3: () => void;
  onCancel: () => void;
}

export const ParliamentVoteModal: React.FC<ParliamentVoteModalProps> = ({
  state,
  choice,
  onVoteSuccess,
  onUse49_3,
  onCancel
}) => {
  const initialVotes = state.deputiesMajority || 240;
  const [currentVotes, setCurrentVotes] = useState(initialVotes);
  const [usedButtons, setUsedButtons] = useState<{ phone?: boolean; budget?: boolean; threat?: boolean }>({});
  const [spentBudget, setSpentBudget] = useState(0);
  const [spentAuthority, setSpentAuthority] = useState(0);
  const [addedTension, setAddedTension] = useState(0);

  const neededVotes = 289;
  const isPassed = currentVotes >= neededVotes;

  const handlePhoneCall = () => {
    if (usedButtons.phone || state.authorityPoints < 8) return;
    soundEffects.playKeystroke();
    setUsedButtons(prev => ({ ...prev, phone: true }));
    setCurrentVotes(v => v + 14);
    setSpentAuthority(a => a + 8);
  };

  const handleBudgetAmendment = () => {
    if (usedButtons.budget || state.economy.treasury < 2) return;
    soundEffects.playStamp();
    setUsedButtons(prev => ({ ...prev, budget: true }));
    setCurrentVotes(v => v + 20);
    setSpentBudget(b => b + 2);
  };

  const handlePoliticalThreat = () => {
    if (usedButtons.threat) return;
    soundEffects.playStamp();
    setUsedButtons(prev => ({ ...prev, threat: true }));
    setCurrentVotes(v => v + 12);
    setAddedTension(t => t + 8);
  };

  const handleConfirmAdoption = () => {
    soundEffects.playStamp();
    onVoteSuccess(choice, {
      costTreasury: spentBudget,
      costAuthority: spentAuthority,
      tensionDelta: addedTension
    });
  };

  // Rendu graphique brutaliste de l'hémicycle (5 rangées de points)
  const rows = [15, 20, 25, 30, 35]; // Nombre de sièges visibles simplifiés
  const totalGraphicSeats = rows.reduce((a, b) => a + b, 0); // 125
  const greenProportion = Math.min(1, currentVotes / 577);
  const greenSeatsCount = Math.round(greenProportion * totalGraphicSeats);

  let seatCounter = 0;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in font-mono">
      <div className="bg-[var(--bg-panel)] border-4 border-[var(--text-main)] max-w-2xl w-full p-5 sm:p-7 shadow-[10px_10px_0px_var(--text-main)] space-y-6 text-[var(--text-main)] relative">
        
        {/* Bouton Fermer */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 border-2 border-[var(--border-hard)] hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 border-b-2 border-[var(--border-hard)] pb-3">
          <div className="flex items-center justify-center space-x-2 text-[var(--accent-purple)] font-bold text-xs uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>PALAIS-BOURBON • SÉANCE DE VOTE SOLENNELLE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase font-display tracking-tight">
            Vote du Projet de Loi
          </h2>
          <p className="text-xs font-sans opacity-80 max-w-lg mx-auto line-clamp-1">
            « {choice.label} »
          </p>
        </div>

        {/* Visualisation de l'Hémicycle */}
        <div className="bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] p-4 flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
          
          {/* Arc de cercle des sièges */}
          <div className="flex flex-col items-center space-y-1.5 my-2">
            {rows.map((rowCount, rIdx) => (
              <div key={rIdx} className="flex space-x-1 justify-center">
                {Array.from({ length: rowCount }).map((_, sIdx) => {
                  seatCounter++;
                  const isVoted = seatCounter <= greenSeatsCount;
                  return (
                    <div
                      key={sIdx}
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-black/40 transition-colors duration-300 ${
                        isVoted ? 'bg-[var(--accent-emerald)] shadow-[0_0_4px_var(--accent-emerald)]' : 'bg-[var(--accent-red)]/50'
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Compteur de voix géant */}
          <div className="flex items-center justify-center space-x-4 border-t-2 border-[var(--border-hard)] pt-3 w-full">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold opacity-75 block">Voix Actuelles :</span>
              <span className={`text-2xl sm:text-3xl font-black ${isPassed ? 'text-[var(--accent-emerald)]' : 'text-[var(--text-main)]'}`}>
                {currentVotes}
              </span>
            </div>
            <div className="text-xl font-black opacity-40">/</div>
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold opacity-75 block">Majorité Requise :</span>
              <span className="text-2xl sm:text-3xl font-black text-[var(--accent-purple)]">
                289
              </span>
            </div>
          </div>

        </div>

        {/* Les 3 Boutons de Pression Parlementaire */}
        {!isPassed ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase">
              <span className="text-[var(--accent-amber)] flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Il manque {neededVotes - currentVotes} voix pour adopter la loi :</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              
              {/* 1. Coup de fil */}
              <button
                type="button"
                disabled={usedButtons.phone || state.authorityPoints < 8}
                onClick={handlePhoneCall}
                className={`p-3 border-2 border-[var(--border-hard)] flex flex-col justify-between text-left transition-all ${
                  usedButtons.phone 
                    ? 'bg-[var(--bg-subtle)] opacity-40 cursor-not-allowed'
                    : state.authorityPoints < 8 
                    ? 'opacity-40 cursor-not-allowed'
                    : 'bg-[var(--bg-panel)] hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer'
                }`}
              >
                <div className="font-bold flex items-center space-x-1 mb-1">
                  <PhoneCall className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                  <span>Appel Présidentiel</span>
                </div>
                <span className="text-[10px] opacity-75">+14 voix</span>
                <span className="text-[9px] font-bold text-[var(--accent-red)] mt-1">-8 Autorité</span>
              </button>

              {/* 2. Amendement financier */}
              <button
                type="button"
                disabled={usedButtons.budget || state.economy.treasury < 2}
                onClick={handleBudgetAmendment}
                className={`p-3 border-2 border-[var(--border-hard)] flex flex-col justify-between text-left transition-all ${
                  usedButtons.budget 
                    ? 'bg-[var(--bg-subtle)] opacity-40 cursor-not-allowed'
                    : state.economy.treasury < 2
                    ? 'opacity-40 cursor-not-allowed'
                    : 'bg-[var(--bg-panel)] hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer'
                }`}
              >
                <div className="font-bold flex items-center space-x-1 mb-1">
                  <Wallet className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
                  <span>Subvention Locale</span>
                </div>
                <span className="text-[10px] opacity-75">+20 voix</span>
                <span className="text-[9px] font-bold text-[var(--accent-red)] mt-1">-2 Mds € Budget</span>
              </button>

              {/* 3. Menace politique */}
              <button
                type="button"
                disabled={usedButtons.threat}
                onClick={handlePoliticalThreat}
                className={`p-3 border-2 border-[var(--border-hard)] flex flex-col justify-between text-left transition-all ${
                  usedButtons.threat 
                    ? 'bg-[var(--bg-subtle)] opacity-40 cursor-not-allowed'
                    : 'bg-[var(--bg-panel)] hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer'
                }`}
              >
                <div className="font-bold flex items-center space-x-1 mb-1">
                  <Gavel className="w-3.5 h-3.5 text-[var(--accent-red)]" />
                  <span>Menace d'Exclusion</span>
                </div>
                <span className="text-[10px] opacity-75">+12 voix</span>
                <span className="text-[9px] font-bold text-[var(--accent-red)] mt-1">+8 Tension</span>
              </button>

            </div>

            {/* Alternative : Recours au 49.3 */}
            <div className="pt-2 flex items-center justify-between border-t border-[var(--border-hard)]">
              <span className="text-[10px] opacity-70">Impossible d'obtenir 289 voix ?</span>
              <button
                type="button"
                onClick={() => { onCancel(); onUse49_3(); }}
                className="px-3 py-1.5 bg-[var(--accent-red)] text-white text-[11px] font-bold uppercase border border-[var(--border-hard)] hover:bg-[var(--accent-red)]/80 flex items-center space-x-1.5 shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px]"
              >
                <Gavel className="w-3.5 h-3.5" />
                <span>Passer en force (Article 49.3)</span>
              </button>
            </div>
          </div>
        ) : (
          /* La loi est adoptée */
          <div className="space-y-4 animate-fade-in text-center">
            <div className="p-3 bg-[var(--accent-emerald)]/15 border-2 border-[var(--accent-emerald)] text-[var(--accent-emerald)] font-bold text-xs flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="uppercase text-sm">MAJORITÉ ATTEINTE ({currentVotes} VOIX) • LA LOI EST ADOPTÉE !</span>
            </div>

            <button
              type="button"
              onClick={handleConfirmAdoption}
              className="w-full py-3.5 bg-[var(--text-main)] text-[var(--bg-panel)] hover:bg-[var(--accent-emerald)] hover:text-white font-bold uppercase text-xs border-2 border-[var(--border-hard)] shadow-[4px_4px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>Promulguer la Loi au Journal Officiel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
