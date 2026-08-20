import React, { useState } from 'react';
import { GameState, GameEventChoice, GameEvent } from '../types/game';
import { soundEffects } from '../utils/audio';
import { 
  ArrowRight, CheckCircle2, Globe, Radio, History, AlertTriangle, 
  Tv, Gavel, Users, Trophy, Sparkles, Wallet, Shield, Zap, Sliders, X 
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
      case 'economique': return { name: 'BERCY • ÉCONOMIE & FINANCES', accent: 'text-[var(--accent-amber)]' };
      case 'social': return { name: 'GRENELLE • AFFAIRES SOCIALES', accent: 'text-[var(--accent-red)]' };
      case 'securite': return { name: 'BEAUVAU • INTÉRIEUR & SÉCURITÉ', accent: 'text-[var(--accent-blue)]' };
      case 'international': return { name: 'QUAI D\'ORSAY • AFFAIRES ÉTRANGÈRES', accent: 'text-[var(--accent-blue)]' };
      case 'environnement': return { name: 'TRANSITION ÉCOLOGIQUE & ÉNERGIE', accent: 'text-[var(--accent-emerald)]' };
      default: return { name: 'ÉLYSÉE • CONSEIL DES MINISTRES', accent: 'text-[var(--accent-amber)]' };
    }
  };

  const ministry = getMinistryHeader(event?.category);

  return (
    <div className={`max-w-4xl mx-auto space-y-4 text-[var(--text-main)] font-sans ${strikeRisk >= 85 ? 'animate-shake' : ''}`}>
      
      {/* 1. BARRE DE TÉLÉMÉTRIE D'ÉTAT (Sobre, Noble, Sans Bruit Visuel) */}
      <div className="bg-[var(--bg-panel)] border border-[var(--border-hard)] p-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.25)] grid grid-cols-2 md:grid-cols-4 gap-3.5 font-mono text-xs">
        
        {/* Popularité */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="opacity-75 font-sans font-bold">POPULARITÉ</span>
            <strong className="font-bold text-sm text-[var(--accent-blue)]">{popularity}%</strong>
          </div>
          <div className="h-1.5 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)]/50 overflow-hidden rounded-xs">
            <div className="h-full bg-[var(--accent-blue)] transition-all duration-500" style={{ width: `${popularity}%` }} />
          </div>
        </div>

        {/* Indice Tension */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="opacity-75 font-sans font-bold">TENSION</span>
            <strong className={`font-bold text-sm ${strikeRisk >= 75 ? 'text-[var(--accent-red)]' : ''}`}>{strikeRisk}%</strong>
          </div>
          <div className="h-1.5 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)]/50 overflow-hidden rounded-xs">
            <div className={`h-full transition-all duration-500 ${strikeRisk >= 75 ? 'bg-[var(--accent-red)]' : 'bg-[var(--accent-amber)]'}`} style={{ width: `${strikeRisk}%` }} />
          </div>
        </div>

        {/* Compte du Trésor */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="opacity-75 font-sans font-bold">TRÉSOR</span>
            <strong className="font-bold text-sm text-[var(--accent-amber)]">{state.economy.treasury?.toFixed(1) || '50.0'} Md €</strong>
          </div>
          <div className="flex justify-between text-[9px] opacity-65 pt-0.5 border-t border-[var(--border-hard)]/30">
            <span>Déficit : {state.economy.deficit}%</span>
            <span>{state.economy.monthlyBalance > 0 ? '+' : ''}{state.economy.monthlyBalance} Md/m</span>
          </div>
        </div>

        {/* Hémicycle */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="opacity-75 font-sans font-bold">HÉMICYCLE</span>
            <strong className={`font-bold text-sm ${seats < 240 ? 'text-[var(--accent-red)]' : 'text-[var(--accent-purple)]'}`}>
              {seats} / 577
            </strong>
          </div>
          <div className="flex justify-between text-[9px] opacity-65 pt-0.5 border-t border-[var(--border-hard)]/30">
            <span>Seuil 289</span>
            <span className="font-bold">{seats >= 330 ? '💎 Qualifiée' : seats >= 289 ? '👑 Absolue' : seats >= 240 ? '⚖️ Relative' : '⚠️ Hostile'}</span>
          </div>
        </div>

      </div>

      {/* 2. LE DOSSIER DU CONSEIL DES MINISTRES (Cœur Noble & Tactile du Jeu) */}
      <div className="premium-panel p-5 sm:p-7 space-y-5 relative overflow-hidden">
        
        {/* Tampon de Promulgation */}
        {isPromulgating && (
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none bg-[var(--bg-primary)]/80 backdrop-blur-xs">
            <div className="animate-stamp border-4 border-[var(--accent-emerald)] text-[var(--accent-emerald)] bg-[var(--bg-panel)] px-8 py-4 font-display font-black text-3xl sm:text-4xl uppercase shadow-[6px_6px_0px_var(--border-hard)]">
              DÉCRET {isPromulgating} PROMULGUÉ
            </div>
          </div>
        )}

        {/* En-tête Dossier */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hard)]/50 font-mono text-xs">
          <span className="font-bold px-2.5 py-0.5 bg-[var(--text-main)] text-[var(--bg-panel)] uppercase tracking-wider text-[10px] rounded-xs shadow-xs">
            DOSSIER N° {state.turn < 10 ? `0${state.turn}` : state.turn}
          </span>
          <span className={`font-bold uppercase tracking-wider text-xs ${ministry.accent}`}>
            {ministry.name}
          </span>
        </div>

        {/* Titre & Délibération */}
        {event ? (
          <div className="space-y-3.5">
            <h2 className="text-xl sm:text-2xl font-display font-bold leading-snug tracking-tight text-[var(--text-main)]">
              {event.title}
            </h2>
            <div className="bg-[var(--bg-subtle)] border-l-4 border-[var(--accent-amber)] p-4 text-sm sm:text-base leading-relaxed font-serif opacity-95 rounded-r-xs shadow-inner">
              « {event.description} »
            </div>
          </div>
        ) : (
          <div className="p-8 text-center font-mono text-sm opacity-60">
            Aucun arbitrage en attente pour ce mois.
          </div>
        )}

        {/* Les 2 Choix Décisionnels Nobles (Cartes Interactives Directes & Symétriques) */}
        {event && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {event.choices.map((choice, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const requiresVote = isLegislativeVoteRequired(choice);

              return (
                <div
                  key={choice.id}
                  onMouseEnter={() => setHoveredChoice(choice)}
                  onMouseLeave={() => setHoveredChoice(null)}
                  onClick={() => handlePickChoice(choice, idx)}
                  className="cursor-pointer p-4 sm:p-5 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border border-[var(--border-hard)] hover:border-[var(--accent-amber)] shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] active:scale-[0.99] transition-all duration-150 flex flex-col justify-between space-y-4 group rounded-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2.5">
                      <span className="w-6 h-6 bg-[var(--text-main)] text-[var(--bg-panel)] flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 rounded-xs shadow-xs">
                        {letter}
                      </span>
                      <h4 className="font-display font-bold text-sm sm:text-base leading-snug text-[var(--text-main)] group-hover:text-[var(--accent-amber)] transition-colors">
                        {choice.label}
                      </h4>
                    </div>

                    {choice.description && (
                      <p className="text-xs sm:text-sm font-serif opacity-80 leading-relaxed pl-8">
                        {choice.description}
                      </p>
                    )}
                  </div>

                  {/* Conséquences & Bouton Décret (Symétrie Parfaite Entre Choix A et B) */}
                  <div className="space-y-3 pt-2 border-t border-[var(--border-hard)]/25">
                    {choice.effects && (
                      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 font-mono text-xs font-bold pt-1">
                        {choice.effects.popularityDelta !== undefined && (
                          <span className={choice.effects.popularityDelta >= 0 ? 'text-[var(--accent-emerald)]' : 'text-[var(--accent-red)]'}>
                            Opinion {choice.effects.popularityDelta >= 0 ? `+${choice.effects.popularityDelta}%` : `${choice.effects.popularityDelta}%`}
                          </span>
                        )}

                        {choice.effects.tensionDelta !== undefined && (
                          <span className={choice.effects.tensionDelta <= 0 ? 'text-[var(--accent-emerald)]' : 'text-[var(--accent-red)]'}>
                            • Tension {choice.effects.tensionDelta > 0 ? `+${choice.effects.tensionDelta} pts` : `${choice.effects.tensionDelta} pts`}
                          </span>
                        )}

                        {choice.effects.costTreasury !== undefined && choice.effects.costTreasury > 0 && (
                          <span className="text-[var(--accent-red)]">
                            • -{choice.effects.costTreasury} Md €
                          </span>
                        )}

                        {choice.effects.revenueTreasury !== undefined && choice.effects.revenueTreasury > 0 && (
                          <span className="text-[var(--accent-emerald)]">
                            • +{choice.effects.revenueTreasury} Md €
                          </span>
                        )}
                      </div>
                    )}

                    <button
                      type="button"
                      disabled={isPromulgating !== null}
                      className="w-full py-2.5 bg-[var(--text-main)] text-[var(--bg-panel)] group-hover:opacity-90 font-mono font-bold text-xs uppercase border border-[var(--border-hard)] shadow-[0_2px_8px_rgba(0,0,0,0.25)] flex items-center justify-center space-x-2 transition-all cursor-pointer rounded-xs active:translate-y-0.5"
                    >
                      {requiresVote ? (
                        <>
                          <Gavel className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
                          <span>Soumettre au Vote Parlementaire</span>
                        </>
                      ) : (
                        <>
                          <span>Promulguer le Décret {letter}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
      <div className="bg-[var(--bg-panel)] border border-[var(--border-hard)] p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.2)] flex flex-wrap items-center justify-between gap-2 font-mono text-xs rounded-xs">
        
        <div className="flex items-center space-x-2">
          {/* Cabinet Noir */}
          {onOpenPoliticalCards && (
            <button
              onClick={() => { soundEffects.playKeystroke(); onOpenPoliticalCards(); }}
              className="px-3 py-2 bg-[var(--bg-subtle)] hover:bg-[var(--accent-red)] hover:text-white border border-[var(--border-hard)] shadow-xs active:translate-y-0.5 flex items-center space-x-2 font-bold uppercase transition-all rounded-xs cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[var(--accent-red)]" />
              <span>Cabinet Noir</span>
              <span className="px-1.5 py-0.2 bg-[var(--bg-panel)] text-[var(--text-main)] border border-[var(--border-hard)] text-[10px] rounded-xs">
                {(state.tacticalCards || []).length}
              </span>
            </button>
          )}

          {/* Grands Chantiers */}
          {onOpenGrandProjects && (
            <button
              onClick={() => { soundEffects.playKeystroke(); onOpenGrandProjects(); }}
              className="px-3 py-2 bg-[var(--bg-subtle)] hover:bg-[var(--accent-purple)] hover:text-white border border-[var(--border-hard)] shadow-xs active:translate-y-0.5 flex items-center space-x-2 font-bold uppercase transition-all rounded-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
              <span>Grands Chantiers</span>
              <span className="px-1.5 py-0.2 bg-[var(--bg-panel)] text-[var(--text-main)] border border-[var(--border-hard)] text-[10px] rounded-xs">
                {(state.activeProjects || []).length > 0 ? `${state.activeProjects.length} en cours` : 'Lancer'}
              </span>
            </button>
          )}
        </div>

        {/* Bouton pour ouvrir les Prérogatives Exécutives */}
        <button
          onClick={() => { soundEffects.playKeystroke(); setShowPrerogativesModal(true); }}
          className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] hover:opacity-90 border border-[var(--border-hard)] shadow-xs active:translate-y-0.5 flex items-center space-x-2 font-bold uppercase transition-all cursor-pointer rounded-xs"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Prérogatives du Président</span>
        </button>

      </div>

      {/* MODAL DES PRÉROGATIVES EXÉCUTIVES */}
      {showPrerogativesModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-fade-in font-mono">
          <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] max-w-lg w-full p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-4 text-[var(--text-main)] relative rounded-xs">
            
            <div className="flex items-center justify-between border-b border-[var(--border-hard)]/50 pb-3">
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-[var(--accent-amber)]" />
                <h3 className="font-display font-bold text-lg uppercase">
                  Prérogatives Régaliennes de l'Élysée
                </h3>
              </div>
              <button 
                onClick={() => setShowPrerogativesModal(false)}
                className="p-1 hover:bg-[var(--bg-subtle)] border border-[var(--border-hard)] cursor-pointer rounded-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              
              {/* Allocution 20h */}
              {onOpenAddress && (
                <button
                  onClick={() => { setShowPrerogativesModal(false); onOpenAddress(); }}
                  className="p-3 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border border-[var(--border-hard)] shadow-xs flex flex-col justify-between text-left space-y-1 cursor-pointer rounded-xs"
                >
                  <Tv className="w-4 h-4 text-[var(--accent-blue)]" />
                  <span className="font-bold text-xs uppercase">Allocution 20h</span>
                  <span className="text-[10px] opacity-70">{state.addressCount ? `Déjà fait (${state.addressCount})` : 'Apaise la rue'}</span>
                </button>
              )}

              {/* Dégainer le 49.3 */}
              {onOpen49_3 && (
                <button
                  disabled={state.authorityPoints < 30}
                  onClick={() => { setShowPrerogativesModal(false); onOpen49_3(); }}
                  className={`p-3 border border-[var(--border-hard)] shadow-xs flex flex-col justify-between text-left space-y-1 rounded-xs ${
                    state.authorityPoints < 30 ? 'opacity-40 cursor-not-allowed bg-[var(--bg-panel)]' : 'bg-[var(--bg-subtle)] hover:bg-[var(--accent-red)] hover:text-white cursor-pointer'
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
                  className={`p-3 border border-[var(--border-hard)] shadow-xs flex flex-col justify-between text-left space-y-1 rounded-xs ${
                    state.social.strikeRisk < 50 || state.authorityPoints < 20 ? 'opacity-40 cursor-not-allowed bg-[var(--bg-panel)]' : 'bg-[var(--bg-subtle)] hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] cursor-pointer'
                  }`}
                >
                  <Users className="w-4 h-4 text-[var(--accent-blue)]" />
                  <span className="font-bold text-xs uppercase">Fusible Matignon</span>
                  <span className="text-[10px] opacity-70">-30 Tension si grève</span>
                </button>
              )}

              {/* Dissolution */}
              {onDissolution && (
                <button
                  disabled={state.hasDissolved || state.authorityPoints < 30}
                  onClick={() => { setShowPrerogativesModal(false); onDissolution(); }}
                  className={`p-3 border border-[var(--border-hard)] shadow-xs flex flex-col justify-between text-left space-y-1 rounded-xs ${
                    state.hasDissolved || state.authorityPoints < 30 ? 'opacity-40 cursor-not-allowed bg-[var(--bg-panel)]' : 'bg-[var(--accent-red)] text-white hover:bg-[var(--text-main)] cursor-pointer'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-white" />
                  <span className="font-bold text-xs uppercase">Dissoudre l'Assemblée</span>
                  <span className="text-[10px] opacity-80">{state.hasDissolved ? 'Déjà exécutée' : '-30 pts'}</span>
                </button>
              )}

              {/* Fiscalité */}
              {onToggleTaxPolicy && (
                <button
                  onClick={() => { soundEffects.playKeystroke(); onToggleTaxPolicy(); }}
                  className="sm:col-span-2 p-3 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border border-[var(--border-hard)] shadow-xs flex items-center justify-between text-left cursor-pointer rounded-xs"
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
                  className="sm:col-span-2 p-3 bg-[var(--accent-purple)] text-white hover:bg-[var(--accent-purple)]/90 border border-[var(--border-hard)] shadow-xs flex items-center justify-between text-left font-bold uppercase text-xs cursor-pointer rounded-xs"
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
