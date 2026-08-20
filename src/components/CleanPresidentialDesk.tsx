import React, { useState } from 'react';
import { GameState, GameEventChoice, GameEvent } from '../types/game';
import { soundEffects } from '../utils/audio';
import { 
  ArrowRight, CheckCircle2, Globe, Radio, History, AlertTriangle, 
  Tv, Gavel, Users, Trophy, Sparkles, Wallet, Shield, Zap, Sliders, ChevronUp, ChevronDown, X 
} from 'lucide-react';

interface CleanPresidentialDeskProps {
  state: GameState;
  onResolveChoice: (choice: GameEventChoice) => void;
  onNavigateSubpage: (page: 'markets' | 'cabinet' | 'history' | 'trophies' | 'settings') => void;
  onOpen49_3?: () => void;
  onOpenAddress?: () => void;
  onSacrificePrimeMinister?: () => void;
  onToggleTaxPolicy?: () => void;
  onStartParliamentVote?: (choice: GameEventChoice) => void;
  onEnactConstitutionalReform?: () => void;
  onDissolution?: () => void;
  onOpenGrandProjects?: () => void;
  onOpenPoliticalCards?: () => void;
}

export const CleanPresidentialDesk: React.FC<CleanPresidentialDeskProps> = ({
  state,
  onResolveChoice,
  onNavigateSubpage,
  onOpen49_3,
  onOpenAddress,
  onSacrificePrimeMinister,
  onToggleTaxPolicy,
  onStartParliamentVote,
  onEnactConstitutionalReform,
  onDissolution,
  onOpenGrandProjects,
  onOpenPoliticalCards
}) => {
  const [hoveredChoice, setHoveredChoice] = useState<GameEventChoice | null>(null);
  const [isPromulgating, setIsPromulgating] = useState<string | null>(null);
  const [showPrerogativesModal, setShowPrerogativesModal] = useState(false);

  const event: GameEvent | null = state.activeEvent;

  // Calcul Députés
  const acquiredSeats = (state.parliament || [])
    .filter(g => g.stanceTowardsPlayer === 'loyal' || g.stanceTowardsPlayer === 'coalition')
    .reduce((sum, g) => sum + g.seats, 0);

  const popularity = state.popularity;
  const strikeRisk = state.social.strikeRisk;
  const seats = acquiredSeats || state.deputiesMajority || 240;

  // Projections
  const projPop = hoveredChoice?.effects?.popularityDelta || 0;
  const projStrike = hoveredChoice?.effects?.tensionDelta || 0;
  const projDeficit = hoveredChoice?.effects?.deficitDelta || 0;

  // Vérifie si le dossier nécessite obligatoirement un vote parlementaire
  const isLegislativeVoteRequired = (choice: GameEventChoice): boolean => {
    if (seats >= 289) return false;
    if (!event) return false;
    if (event.category === 'international' || event.category === 'securite' || event.category === 'mediatique') return false;
    if (event.category === 'parlementaire') return true;
    
    const fx = choice.effects;
    const isHeavyBudget = (fx?.costTreasury && fx.costTreasury >= 6) || (fx?.revenueTreasury && fx.revenueTreasury >= 6);
    const isHeavySocial = fx?.deficitDelta !== undefined && Math.abs(fx.deficitDelta) >= 0.3;
    return isHeavyBudget || isHeavySocial || false;
  };

  const handlePickChoice = (choice: GameEventChoice, index: number) => {
    if (isPromulgating) return;
    const letter = String.fromCharCode(65 + index);
    const requiresVote = isLegislativeVoteRequired(choice);

    if (requiresVote && onStartParliamentVote) {
      soundEffects.playGavel();
      onStartParliamentVote(choice);
      return;
    }

    soundEffects.playStamp();
    setIsPromulgating(letter);

    setTimeout(() => {
      onResolveChoice(choice);
      setIsPromulgating(null);
      setHoveredChoice(null);
    }, 450);
  };

  const getMinistryHeader = (category?: string) => {
    switch (category) {
      case 'economique': return { name: 'BERCY • ÉCONOMIE', accent: 'text-[var(--accent-amber)]' };
      case 'social': return { name: 'GRENELLE • TRAVAIL', accent: 'text-[var(--accent-red)]' };
      case 'securite': return { name: 'BEAUVAU • INTÉRIEUR', accent: 'text-[var(--accent-blue)]' };
      case 'international': return { name: 'QUAI D\'ORSAY • AFFAIRES ÉTRANGÈRES', accent: 'text-[var(--accent-blue)]' };
      case 'environnement': return { name: 'ÉCOLOGIE & ÉNERGIE', accent: 'text-[var(--accent-emerald)]' };
      default: return { name: 'ÉLYSÉE • CONSEIL DES MINISTRES', accent: 'text-[var(--accent-amber)]' };
    }
  };

  const ministry = getMinistryHeader(event?.category);

  return (
    <div className={`max-w-4xl mx-auto space-y-4 text-[var(--text-main)] font-sans ${strikeRisk >= 85 ? 'animate-shake' : ''}`}>
      
      {/* 1. BARRE DE TÉLÉMÉTRIE D'ÉTAT (Fine, Unifiée, Sans Lourdeur) */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-3 shadow-[3px_3px_0px_var(--border-hard)] grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
        
        {/* Popularité */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="opacity-70 font-bold">POPULARITÉ</span>
            <strong className="font-black text-sm text-[var(--accent-blue)]">{popularity}%</strong>
          </div>
          <div className="h-1.5 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)]/40 overflow-hidden">
            <div className="h-full bg-[var(--accent-blue)]" style={{ width: `${popularity}%` }} />
          </div>
        </div>

        {/* Indice Tension */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="opacity-70 font-bold">TENSION SOCIALE</span>
            <strong className={`font-black text-sm ${strikeRisk >= 75 ? 'text-[var(--accent-red)]' : ''}`}>{strikeRisk}%</strong>
          </div>
          <div className="h-1.5 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)]/40 overflow-hidden">
            <div className={`h-full ${strikeRisk >= 75 ? 'bg-[var(--accent-red)]' : 'bg-[var(--accent-amber)]'}`} style={{ width: `${strikeRisk}%` }} />
          </div>
        </div>

        {/* Compte du Trésor */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="opacity-70 font-bold">TRÉSOR</span>
            <strong className="font-black text-sm text-[var(--accent-amber)]">{state.economy.treasury?.toFixed(1) || '50.0'} Mds €</strong>
          </div>
          <div className="flex justify-between text-[9px] opacity-60">
            <span>Déficit : {state.economy.deficit}%</span>
            <span>{state.economy.monthlyBalance > 0 ? '+' : ''}{state.economy.monthlyBalance} Md/m</span>
          </div>
        </div>

        {/* Hémicycle */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="opacity-70 font-bold">HÉMICYCLE</span>
            <strong className={`font-black text-sm ${seats < 240 ? 'text-[var(--accent-red)]' : 'text-[var(--accent-purple)]'}`}>
              {seats} / 577
            </strong>
          </div>
          <div className="flex justify-between text-[9px] opacity-60">
            <span>Seuil 289</span>
            <span className="font-bold">{seats >= 330 ? '💎 Qualifiée' : seats >= 289 ? '👑 Absolue' : seats >= 240 ? '⚖️ Relative' : '⚠️ Hostile'}</span>
          </div>
        </div>

      </div>

      {/* 2. LE DOSSIER DU CONSEIL DES MINISTRES (Cœur Noble & Central du Jeu) */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 sm:p-7 shadow-[5px_5px_0px_var(--border-hard)] space-y-5 relative overflow-hidden">
        
        {/* Tampon de Promulgation */}
        {isPromulgating && (
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none bg-[var(--bg-primary)]/70 backdrop-blur-xs">
            <div className="animate-stamp border-4 border-[var(--accent-emerald)] text-[var(--accent-emerald)] bg-[var(--bg-panel)] px-8 py-4 font-display font-black text-3xl sm:text-4xl uppercase shadow-[6px_6px_0px_var(--border-hard)]">
              DÉCRET {isPromulgating} PROMULGUÉ
            </div>
          </div>
        )}

        {/* En-tête Dossier */}
        <div className="flex items-center justify-between pb-2.5 border-b-2 border-[var(--border-hard)] font-mono text-xs">
          <span className="font-bold px-2 py-0.5 bg-[var(--text-main)] text-[var(--bg-panel)] uppercase tracking-wider">
            DOSSIER N° {state.turn < 10 ? `0${state.turn}` : state.turn}
          </span>
          <span className={`font-bold uppercase tracking-wider text-xs ${ministry.accent}`}>
            {ministry.name}
          </span>
        </div>

        {/* Titre & Délibération */}
        {event ? (
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-black leading-tight tracking-tight text-[var(--text-main)]">
              {event.title}
            </h2>
            <div className="bg-[var(--bg-subtle)] border-l-4 border-[var(--accent-amber)] p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed font-serif opacity-90">
              {event.description}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center font-mono text-sm opacity-60">
            Aucun arbitrage en attente pour ce mois.
          </div>
        )}

        {/* Les 2 Choix Décisionnels Nobles (Cartes Interactives Directes) */}
        {event && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            {event.choices.map((choice, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const requiresVote = isLegislativeVoteRequired(choice);

              return (
                <div
                  key={choice.id}
                  onMouseEnter={() => setHoveredChoice(choice)}
                  onMouseLeave={() => setHoveredChoice(null)}
                  onClick={() => handlePickChoice(choice, idx)}
                  className="cursor-pointer p-4 sm:p-5 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] hover:border-[var(--accent-blue)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2.5">
                      <span className="w-6 h-6 bg-[var(--text-main)] text-[var(--bg-panel)] flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                        {letter}
                      </span>
                      <h4 className="font-display font-bold text-sm sm:text-base leading-snug text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors">
                        {choice.label}
                      </h4>
                    </div>

                    {choice.description && (
                      <p className="text-xs font-sans opacity-75 leading-relaxed pl-8">
                        {choice.description}
                      </p>
                    )}
                  </div>

                  {/* Conséquences & Bouton Décret */}
                  <div className="space-y-3 pt-2 border-t border-[var(--border-hard)]/20">
                    {choice.effects && (
                      <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                        {choice.effects.popularityDelta !== undefined && (
                          <span className={`px-2 py-0.5 border font-bold ${
                            choice.effects.popularityDelta >= 0 
                              ? 'bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] border-[var(--accent-emerald)]/40' 
                              : 'bg-[var(--accent-red)]/10 text-[var(--accent-red)] border-[var(--accent-red)]/40'
                          }`}>
                            Opinion {choice.effects.popularityDelta >= 0 ? `+${choice.effects.popularityDelta}` : choice.effects.popularityDelta}%
                          </span>
                        )}

                        {choice.effects.tensionDelta !== undefined && (
                          <span className={`px-2 py-0.5 border font-bold ${
                            choice.effects.tensionDelta <= 0 
                              ? 'bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] border-[var(--accent-emerald)]/40' 
                              : 'bg-[var(--accent-red)]/10 text-[var(--accent-red)] border-[var(--accent-red)]/40'
                          }`}>
                            Tension {choice.effects.tensionDelta > 0 ? `+${choice.effects.tensionDelta}` : choice.effects.tensionDelta} pts
                          </span>
                        )}

                        {choice.effects.costTreasury !== undefined && choice.effects.costTreasury > 0 && (
                          <span className="px-2 py-0.5 bg-[var(--accent-red)]/10 text-[var(--accent-red)] border border-[var(--accent-red)]/40 font-bold">
                            -{choice.effects.costTreasury} Mds €
                          </span>
                        )}

                        {choice.effects.revenueTreasury !== undefined && choice.effects.revenueTreasury > 0 && (
                          <span className="px-2 py-0.5 bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/40 font-bold">
                            +{choice.effects.revenueTreasury} Mds €
                          </span>
                        )}
                      </div>
                    )}

                    <button
                      type="button"
                      disabled={isPromulgating !== null}
                      className={`w-full py-2.5 font-mono font-bold text-xs uppercase border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] flex items-center justify-center space-x-2 transition-all ${
                        requiresVote
                          ? 'bg-[var(--accent-purple)] text-white hover:bg-[var(--accent-purple)]/90'
                          : 'bg-[var(--text-main)] text-[var(--bg-panel)] group-hover:bg-[var(--accent-blue)] group-hover:text-white'
                      }`}
                    >
                      {requiresVote ? (
                        <>
                          <Gavel className="w-3.5 h-3.5" />
                          <span>Soumettre au Vote Parlementaire</span>
                        </>
                      ) : (
                        <>
                          <span>Promulguer le Décret {letter}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* 3. BARRE D'OUTILS RÉGALIENNE (Cabinet Noir, Chantiers & Prérogatives) */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-2.5 shadow-[3px_3px_0px_var(--border-hard)] flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
        
        <div className="flex items-center space-x-2">
          {/* Cabinet Noir */}
          {onOpenPoliticalCards && (
            <button
              onClick={() => { soundEffects.playKeystroke(); onOpenPoliticalCards(); }}
              className="px-3 py-2 bg-[var(--bg-subtle)] hover:bg-[var(--accent-red)] hover:text-white border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex items-center space-x-2 font-bold uppercase transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-[var(--accent-red)]" />
              <span>Cabinet Noir</span>
              <span className="px-1.5 py-0.2 bg-[var(--bg-panel)] text-[var(--text-main)] border border-[var(--border-hard)] text-[10px]">
                {(state.tacticalCards || []).length}
              </span>
            </button>
          )}

          {/* Grands Chantiers */}
          {onOpenGrandProjects && (
            <button
              onClick={() => { soundEffects.playKeystroke(); onOpenGrandProjects(); }}
              className="px-3 py-2 bg-[var(--bg-subtle)] hover:bg-[var(--accent-purple)] hover:text-white border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex items-center space-x-2 font-bold uppercase transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
              <span>Grands Chantiers</span>
              <span className="px-1.5 py-0.2 bg-[var(--bg-panel)] text-[var(--text-main)] border border-[var(--border-hard)] text-[10px]">
                {(state.activeProjects || []).length > 0 ? `${state.activeProjects.length} en cours` : 'Lancer'}
              </span>
            </button>
          )}
        </div>

        {/* Bouton pour ouvrir les Prérogatives Exécutives (49.3, Allocution, Dissolution, Fiscalité) */}
        <button
          onClick={() => { soundEffects.playKeystroke(); setShowPrerogativesModal(true); }}
          className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] hover:bg-[var(--accent-amber)] hover:text-black border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex items-center space-x-2 font-bold uppercase transition-all"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Prérogatives Exécutives ({state.authorityPoints} pts)</span>
        </button>

      </div>

      {/* MODAL DES PRÉROGATIVES EXÉCUTIVES (49.3, Allocution, Dissolution, Fiscalité, Remaniement) */}
      {showPrerogativesModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-fade-in font-mono">
          <div className="bg-[var(--bg-panel)] border-4 border-[var(--text-main)] max-w-lg w-full p-5 sm:p-6 shadow-[10px_10px_0px_var(--text-main)] space-y-4 text-[var(--text-main)] relative">
            
            <div className="flex items-center justify-between border-b-2 border-[var(--border-hard)] pb-3">
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-[var(--accent-amber)]" />
                <h3 className="font-display font-black text-lg uppercase">
                  Prérogatives Exécutives de l'Élysée
                </h3>
              </div>
              <button 
                onClick={() => setShowPrerogativesModal(false)}
                className="p-1 hover:bg-[var(--bg-subtle)] border border-[var(--border-hard)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              
              {/* Allocution 20h */}
              {onOpenAddress && (
                <button
                  onClick={() => { setShowPrerogativesModal(false); onOpenAddress(); }}
                  className="p-3 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] flex flex-col justify-between text-left space-y-1"
                >
                  <Tv className="w-4 h-4 text-[var(--accent-blue)]" />
                  <span className="font-bold text-xs uppercase">Allocution 20h</span>
                  <span className="text-[10px] opacity-70">{state.addressCount ? `Utilisé (${state.addressCount})` : 'Calme la tension'}</span>
                </button>
              )}

              {/* Dégainer le 49.3 */}
              {onOpen49_3 && (
                <button
                  disabled={state.authorityPoints < 30}
                  onClick={() => { setShowPrerogativesModal(false); onOpen49_3(); }}
                  className={`p-3 border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] flex flex-col justify-between text-left space-y-1 ${
                    state.authorityPoints < 30 ? 'opacity-40 cursor-not-allowed bg-[var(--bg-panel)]' : 'bg-[var(--bg-subtle)] hover:bg-[var(--accent-red)] hover:text-white'
                  }`}
                >
                  <Gavel className="w-4 h-4 text-[var(--accent-red)]" />
                  <span className="font-bold text-xs uppercase">Arme du 49.3</span>
                  <span className="text-[10px] opacity-70">{state.authorityPoints < 30 ? 'Requis 30 pts' : 'Passage en force'}</span>
                </button>
              )}

              {/* Fusible PM */}
              {onSacrificePrimeMinister && (
                <button
                  disabled={state.social.strikeRisk < 50 || state.authorityPoints < 20}
                  onClick={() => { setShowPrerogativesModal(false); onSacrificePrimeMinister(); }}
                  className={`p-3 border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] flex flex-col justify-between text-left space-y-1 ${
                    state.social.strikeRisk < 50 || state.authorityPoints < 20 ? 'opacity-40 cursor-not-allowed bg-[var(--bg-panel)]' : 'bg-[var(--bg-subtle)] hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)]'
                  }`}
                >
                  <Users className="w-4 h-4 text-[var(--accent-blue)]" />
                  <span className="font-bold text-xs uppercase">Fusible PM</span>
                  <span className="text-[10px] opacity-70">-30 Tension si grève</span>
                </button>
              )}

              {/* Dissolution */}
              {onDissolution && (
                <button
                  disabled={state.hasDissolved || state.authorityPoints < 30}
                  onClick={() => { setShowPrerogativesModal(false); onDissolution(); }}
                  className={`p-3 border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] flex flex-col justify-between text-left space-y-1 ${
                    state.hasDissolved || state.authorityPoints < 30 ? 'opacity-40 cursor-not-allowed bg-[var(--bg-panel)]' : 'bg-[var(--accent-red)] text-white hover:bg-[var(--text-main)]'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-white" />
                  <span className="font-bold text-xs uppercase">Dissoudre l'Assemblée</span>
                  <span className="text-[10px] opacity-80">{state.hasDissolved ? 'Déjà fait' : '-30 pts'}</span>
                </button>
              )}

              {/* Fiscalité */}
              {onToggleTaxPolicy && (
                <button
                  onClick={() => { soundEffects.playKeystroke(); onToggleTaxPolicy(); }}
                  className="sm:col-span-2 p-3 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-4 h-4 text-[var(--accent-amber)]" />
                    <span className="font-bold text-xs uppercase">Politique Fiscale : {state.economy.taxPolicy || 'normale'}</span>
                  </div>
                  <span className={`text-[10px] font-bold ${state.economy.taxPolicy === 'renforcée' ? 'text-[var(--accent-emerald)]' : state.economy.taxPolicy === 'allégée' ? 'text-[var(--accent-red)]' : 'opacity-70'}`}>
                    {state.economy.monthlyBalance > 0 ? `+${state.economy.monthlyBalance}` : state.economy.monthlyBalance} Md/m
                  </span>
                </button>
              )}

              {/* Réforme Constitutionnelle */}
              {seats >= 330 && onEnactConstitutionalReform && (
                <button
                  onClick={() => { setShowPrerogativesModal(false); onEnactConstitutionalReform(); }}
                  className="sm:col-span-2 p-3 bg-[var(--accent-purple)] text-white hover:bg-[var(--accent-purple)]/90 border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] flex items-center justify-between text-left font-bold uppercase text-xs"
                >
                  <span className="flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Réforme Constitutionnelle (3/5)</span>
                  </span>
                  <span className="text-[10px]">Débloqué</span>
                </button>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
