import React, { useState, useEffect } from 'react';
import { GameState, ParliamentGroup } from '../types/game';
import { soundEffects } from '../utils/audio';
import { ShieldAlert, AlertTriangle, CheckCircle2, XCircle, Gavel, Users, ArrowRight } from 'lucide-react';

interface MotionDeCensureModalProps {
  state: GameState;
  onSurviveCensure: (censureVotes: number) => void;
  onFallCensure: (censureVotes: number) => void;
  onCancel: () => void;
}

export const MotionDeCensureModal: React.FC<MotionDeCensureModalProps> = ({
  state,
  onSurviveCensure,
  onFallCensure,
  onCancel
}) => {
  const [isCounting, setIsCounting] = useState(false);
  const [currentVotes, setCurrentVotes] = useState(0);
  const [groupBreakdowns, setGroupBreakdowns] = useState<Array<{ name: string; seats: number; votingYes: number; color: string }>>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Groupes parlementaires
  const groups = state.parliament || [];
  
  // Calcul prévisionnel des votes de censure
  useEffect(() => {
    let totalCensureVotes = 0;
    const breakdowns = groups.map(g => {
      let votingYes = 0;
      if (g.stanceTowardsPlayer === 'oppose_hard') {
        // 95% des oppositions dures votent la censure
        votingYes = Math.round(g.seats * 0.95);
      } else if (g.stanceTowardsPlayer === 'oppose_moderate') {
        // 50% des modérés basculent si la grève est élevée
        const shiftFactor = state.social.strikeRisk > 70 ? 0.75 : 0.4;
        votingYes = Math.round(g.seats * shiftFactor);
      } else if (g.stanceTowardsPlayer === 'coalition') {
        // Les frondeurs de coalition (10% si colère sociale extrême)
        votingYes = state.social.strikeRisk > 80 ? Math.round(g.seats * 0.15) : 0;
      }
      totalCensureVotes += votingYes;

      return {
        name: g.name,
        seats: g.seats,
        votingYes,
        color: g.color || '#E5E5E5'
      };
    });

    setGroupBreakdowns(breakdowns);
  }, [groups, state.social.strikeRisk]);

  const handleStartVote = () => {
    soundEffects.playGavel();
    setIsCounting(true);
    setCurrentVotes(0);

    const totalCensureVotes = groupBreakdowns.reduce((sum, g) => sum + g.votingYes, 0);

    // Décompte progressif en direct (suspense)
    let voteCounter = 0;
    const interval = setInterval(() => {
      voteCounter += Math.floor(Math.random() * 12) + 5;
      if (voteCounter >= totalCensureVotes) {
        voteCounter = totalCensureVotes;
        setCurrentVotes(totalCensureVotes);
        setIsFinished(true);
        clearInterval(interval);
        
        soundEffects.playGavel();
      } else {
        setCurrentVotes(voteCounter);
        soundEffects.playKeystroke();
      }
    }, 60);
  };

  const handleConclude = () => {
    if (currentVotes >= 289) {
      onFallCensure(currentVotes);
    } else {
      onSurviveCensure(currentVotes);
    }
  };

  const isMotionAdopted = currentVotes >= 289;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-6 sm:p-8 shadow-[8px_8px_0px_var(--border-hard)] space-y-6 text-[var(--text-main)] font-mono">
        
        {/* En-tête de Séance Extraordinaire */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--border-hard)]">
          <div className="flex items-center space-x-2 text-[var(--accent-red)] font-bold">
            <Gavel className="w-5 h-5 stroke-[2.5]" />
            <span className="text-xs uppercase tracking-wider">HÉMICYCLE • SÉANCE DE NUIT</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 bg-[var(--accent-red)] text-white font-black uppercase">
            ARTICLE 49 ALINÉA 3
          </span>
        </div>

        {/* Titre & Enjeu Constitutionnel */}
        <div className="space-y-2 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-[var(--text-main)]">
            Dépôt d'une Motion de Censure Transpartisane
          </h2>
          <p className="text-xs opacity-80 font-sans max-w-lg mx-auto">
            En réponse à votre passage en force par l'article 49.3, les oppositions soumettent la destitution de votre gouvernement au vote de l'Assemblée nationale.
          </p>
        </div>

        {/* Le Compteur Dramatique des 289 Voix */}
        <div className="p-6 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] space-y-3 text-center">
          <span className="text-[11px] font-bold uppercase opacity-75 block">
            MAJORITÉ ABSOLUE REQUISE POUR RENVERSER LE GOUVERNEMENT :
          </span>
          
          <div className="flex items-baseline justify-center space-x-2">
            <strong className={`text-5xl sm:text-6xl font-display font-black ${
              isFinished 
                ? (isMotionAdopted ? 'text-[var(--accent-red)] animate-pulse' : 'text-[var(--accent-emerald)]') 
                : 'text-[var(--text-main)]'
            }`}>
              {currentVotes}
            </strong>
            <span className="text-2xl font-display font-bold opacity-50">/ 289</span>
          </div>

          {/* Barre de Progression de la Censure */}
          <div className="h-4 w-full bg-[var(--bg-panel)] border border-[var(--border-hard)] relative overflow-hidden">
            {/* Seuil 289 */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-[var(--accent-red)] z-20"
              style={{ left: `${(289 / 577) * 100}%` }}
              title="Seuil fatal : 289 voix"
            />
            {/* Remplissage des voix */}
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-75 ${
                currentVotes >= 289 ? 'bg-[var(--accent-red)]' : 'bg-[var(--accent-amber)]'
              }`}
              style={{ width: `${(currentVotes / 577) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] opacity-60">
            <span>0 voix</span>
            <span className="font-bold text-[var(--accent-red)]">SEUIL 289 (CENSURE)</span>
            <span>577 voix</span>
          </div>
        </div>

        {/* Répartition Estimée par Groupe */}
        <div className="space-y-1.5 text-xs">
          <span className="text-[10px] font-bold uppercase opacity-60 block">
            DÉCOMPTE PAR GROUPE PARLEMENTAIRE :
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {groupBreakdowns.map((g, idx) => (
              <div key={idx} className="p-2 bg-[var(--bg-subtle)] border border-[var(--border-hard)] text-[10px] flex justify-between items-center">
                <span className="truncate pr-1 font-bold">{g.name}</span>
                <span className="font-mono text-[var(--accent-red)] font-black shrink-0">
                  {g.votingYes} / {g.seats}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Verdict / Actions */}
        {!isCounting ? (
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="py-3 px-4 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] font-bold text-xs uppercase border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
            >
              ⬅️ Renoncer au 49.3
            </button>
            <button
              type="button"
              onClick={handleStartVote}
              className="flex-1 py-3 px-4 bg-[var(--accent-red)] text-white font-bold text-xs uppercase border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center space-x-2"
            >
              <span>🚨 Lancer le Scrutin & Décompte des Voix</span>
              <Gavel className="w-4 h-4" />
            </button>
          </div>
        ) : isFinished ? (
          <div className="space-y-4 pt-2">
            <div className={`p-4 border-2 ${
              isMotionAdopted ? 'border-[var(--accent-red)] bg-[var(--accent-red)]/10' : 'border-[var(--accent-emerald)] bg-[var(--accent-emerald)]/10'
            } text-center space-y-1 font-sans`}>
              <strong className={`font-display font-black text-lg block ${
                isMotionAdopted ? 'text-[var(--accent-red)]' : 'text-[var(--accent-emerald)]'
              }`}>
                {isMotionAdopted ? '💥 MOTION DE CENSURE ADOPTÉE (289+ VOIX)' : '🛡️ LE GOUVERNEMENT SURVIT AU 49.3 !'}
              </strong>
              <p className="text-xs opacity-90">
                {isMotionAdopted 
                  ? `Avec ${currentVotes} voix pour la censure, le gouvernement est officiellement renversé.`
                  : `Avec ${currentVotes} voix (moins de 289), la motion est rejetée. La loi est adoptée mais la tension sociale grimpe de +20%.`
                }
              </p>
            </div>

            <button
              type="button"
              onClick={handleConclude}
              className={`w-full py-3.5 text-white font-mono font-bold text-xs uppercase border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center space-x-2 ${
                isMotionAdopted ? 'bg-[var(--accent-red)]' : 'bg-[var(--accent-emerald)]'
              }`}
            >
              <span>{isMotionAdopted ? 'Constater la Chute du Gouvernement' : 'Promulguer le Décret & Poursuivre le Mandat'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        ) : (
          <div className="py-4 text-center font-bold text-xs text-[var(--accent-amber)] animate-pulse">
            ⏳ Dépouillement des bulletins dans l'hémicycle en cours...
          </div>
        )}

      </div>
    </div>
  );
};
