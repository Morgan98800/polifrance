import React, { useState } from 'react';
import { GameState, GameEventChoice, GameEvent } from '../types/game';
import { soundEffects } from '../utils/audio';
import { 
  ArrowRight, CheckCircle2, Building2, 
  LineChart, Globe, Radio, History, Play, AlertTriangle, 
  Tv, Gavel, Users, Trophy, Sparkles, Wallet, Shield, Zap 
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

// Jauge Brutaliste Épurée & Non-Saturée
const StrategicBrutalGauge = ({ 
  label, 
  current, 
  projectedDelta = 0, 
  max = 100, 
  dangerThreshold = 0, 
  invertDanger = false,
  accentColor = 'bg-[var(--text-main)]',
  formatFn = (v: number) => `${v}%`,
  thresholdMarker,
  subtitle
}: {
  label: string;
  current: number;
  projectedDelta?: number;
  max?: number;
  dangerThreshold?: number;
  invertDanger?: boolean;
  accentColor?: string;
  formatFn?: (v: number) => string;
  thresholdMarker?: number;
  subtitle?: string;
}) => {
  const projectedValue = Math.max(0, Math.min(max, current + projectedDelta));
  const fillPercentage = Math.min(100, Math.max(0, (current / max) * 100));
  const projectedPercentage = Math.min(100, Math.max(0, (projectedValue / max) * 100));

  const isDanger = invertDanger ? current <= dangerThreshold : current >= dangerThreshold;
  const isPositiveForPlayer = invertDanger ? projectedDelta > 0 : projectedDelta < 0;

  return (
    <div className={`p-3 border-2 shadow-[3px_3px_0px_var(--border-hard)] bg-[var(--bg-panel)] transition-colors flex flex-col justify-between ${
      isDanger ? 'border-[var(--accent-red)]' : 'border-[var(--border-hard)]'
    }`}>
      <div>
        <div className="flex items-center justify-between mb-1 font-mono">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider opacity-75 truncate">{label}</span>
          <div className="flex items-baseline space-x-1 shrink-0">
            <strong className={`font-mono font-black text-sm sm:text-base whitespace-nowrap ${isDanger ? 'text-[var(--accent-red)]' : 'text-[var(--text-main)]'}`}>
              {formatFn(current)}
            </strong>
            {projectedDelta !== 0 && (
              <span className={`text-[10px] font-bold ${isPositiveForPlayer ? 'text-[var(--accent-emerald)]' : 'text-[var(--accent-red)]'}`}>
                ({projectedDelta > 0 ? '+' : ''}{formatFn(projectedDelta).replace('%', '')})
              </span>
            )}
          </div>
        </div>

        {/* Barre de Jauge */}
        <div className="h-2 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)] relative overflow-hidden mb-1">
          {thresholdMarker !== undefined && (
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-[var(--accent-amber)] z-20"
              style={{ left: `${(thresholdMarker / max) * 100}%` }}
            />
          )}

          <div 
            className={`absolute top-0 left-0 h-full ${isDanger ? 'bg-[var(--accent-red)]' : accentColor} transition-all duration-300`}
            style={{ width: `${Math.min(fillPercentage, projectedPercentage)}%` }}
          />
          
          {projectedDelta !== 0 && projectedPercentage > fillPercentage && (
            <div 
              className={`absolute top-0 h-full ${isPositiveForPlayer ? 'striped-bg-emerald bg-[var(--accent-emerald)]' : 'striped-bg-red bg-[var(--accent-red)]'} transition-all duration-200`}
              style={{ 
                left: `${fillPercentage}%`,
                width: `${projectedPercentage - fillPercentage}%` 
              }}
            />
          )}

          {projectedDelta !== 0 && projectedPercentage < fillPercentage && (
            <div 
              className="absolute top-0 h-full striped-bg-red bg-[var(--accent-red)]/60 transition-all duration-200"
              style={{ 
                left: `${projectedPercentage}%`,
                width: `${fillPercentage - projectedPercentage}%` 
              }}
            />
          )}
        </div>
      </div>

      {/* Sous-titre Pédagogique */}
      {subtitle && (
        <div className="text-[9px] font-mono opacity-65 pt-0.5 border-t border-[var(--border-hard)]/20 truncate">
          {subtitle}
        </div>
      )}
    </div>
  );
};

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
      default: return { name: 'ÉLYSÉE • DÉCISION DU PRÉSIDENT', accent: 'text-[var(--accent-amber)]' };
    }
  };

  const ministry = getMinistryHeader(event?.category);

  return (
    <div className={`max-w-6xl mx-auto space-y-4 text-[var(--text-main)] font-sans ${strikeRisk >= 85 ? 'animate-shake' : ''}`}>
      
      {/* 1. LES 4 JAUGES ESSENTIELLES DU MANDAT (Alignement parfait) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <StrategicBrutalGauge 
          label="Popularité" 
          current={popularity} 
          projectedDelta={projPop} 
          max={100} 
          dangerThreshold={30} 
          invertDanger={true} 
          accentColor="bg-[var(--accent-blue)]"
          thresholdMarker={50}
          subtitle="Opinion publique"
        />
        <StrategicBrutalGauge 
          label="Indice Tension" 
          current={strikeRisk} 
          projectedDelta={projStrike} 
          max={100} 
          dangerThreshold={75} 
          accentColor="bg-[var(--accent-red)]"
          thresholdMarker={75}
          formatFn={(v) => `${v}%`}
          subtitle="Alerte grève : 75%"
        />
        <StrategicBrutalGauge 
          label="Compte du Trésor" 
          current={state.economy.treasury !== undefined ? state.economy.treasury : 50} 
          projectedDelta={projDeficit !== 0 ? (projDeficit < 0 ? 3 : -3) : 0} 
          max={100} 
          dangerThreshold={15} 
          invertDanger={true} 
          accentColor="bg-[var(--accent-amber)]"
          thresholdMarker={20}
          formatFn={(v) => `${v.toFixed(1)} Mds €`}
          subtitle={`Déficit: ${state.economy.deficit}% | ${state.economy.monthlyBalance > 0 ? '+' : ''}${state.economy.monthlyBalance} Md/m`}
        />
        <StrategicBrutalGauge 
          label="Hémicycle (577)" 
          current={seats} 
          projectedDelta={0} 
          max={577} 
          dangerThreshold={288} 
          invertDanger={true}
          accentColor="bg-[var(--accent-purple)]"
          thresholdMarker={289}
          formatFn={(v) => {
            const perk = v >= 330 ? '💎 Qualifiée' : v >= 289 ? '👑 Absolue' : v >= 240 ? '⚖️ Relative' : '⚠️ Hostile';
            return `${v} (${perk})`;
          }}
          subtitle="Majorité absolue : 289"
        />
      </div>

      {/* 2. ALERTES CONTEXTUELLES CRITIQUES */}
      {((state.activeProjects && state.activeProjects.length > 0) || popularity < 25) && (
        <div className="space-y-2">
          {state.activeProjects && state.activeProjects.length > 0 && (
            <div className="p-2 bg-[var(--accent-purple)]/10 border border-[var(--accent-purple)] flex items-center justify-between font-mono text-[11px]">
              <span className="flex items-center space-x-1.5 font-bold text-[var(--accent-purple)]">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Chantier en cours : {state.activeProjects[0].name} ({state.activeProjects[0].turnsRemaining} mois)</span>
              </span>
              <span className="font-bold text-[var(--accent-red)] shrink-0">
                -{state.activeProjects.reduce((acc, p) => acc + p.costPerTurn, 0).toFixed(1)} Mds/m
              </span>
            </div>
          )}

          {popularity < 25 && (
            <div className="p-2 bg-[var(--accent-red)]/15 border-2 border-[var(--accent-red)] flex items-center justify-between font-mono text-[11px] text-[var(--accent-red)] animate-pulse">
              <span className="flex items-center space-x-1.5 font-bold">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>ALERTE FRONDEURS : Impopularité record (&lt;25%), fronde imminente dans votre majorité !</span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* 3. CONTENU PRINCIPAL : DOSSIER (2/3) vs PRÉROGATIVES (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* COLONNE DOSSIER MAJEUR (8/12) */}
        <div className="lg:col-span-8 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 sm:p-6 shadow-[4px_4px_0px_var(--border-hard)] space-y-4 relative overflow-hidden">
          
          {/* Tampon de Promulgation */}
          {isPromulgating && (
            <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none bg-[var(--bg-primary)]/60 backdrop-blur-xs">
              <div className="animate-stamp border-4 border-[var(--accent-emerald)] text-[var(--accent-emerald)] bg-[var(--bg-panel)] px-8 py-4 font-display font-black text-3xl sm:text-4xl uppercase shadow-[6px_6px_0px_var(--border-hard)]">
                DÉCRET {isPromulgating} PROMULGUÉ
              </div>
            </div>
          )}

          {/* En-tête Dossier */}
          <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)] font-mono text-xs">
            <span className="font-bold px-2 py-0.5 bg-[var(--text-main)] text-[var(--bg-panel)] uppercase">
              DOSSIER N° 0{state.turn}
            </span>
            <span className={`font-bold uppercase tracking-wider text-[11px] ${ministry.accent}`}>
              {ministry.name}
            </span>
          </div>

          {/* Titre & Description */}
          {event ? (
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-display font-black leading-tight tracking-tight text-[var(--text-main)]">
                {event.title}
              </h2>
              <div className="bg-[var(--bg-subtle)] border-l-4 border-[var(--accent-amber)] p-3 sm:p-3.5 text-xs sm:text-sm leading-relaxed font-serif opacity-90">
                {event.description}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center font-mono text-sm opacity-60">
              Aucun arbitrage en attente pour ce mois.
            </div>
          )}

          {/* Choix Décisionnels */}
          {event && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {event.choices.map((choice, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const requiresVote = isLegislativeVoteRequired(choice);

                return (
                  <div
                    key={choice.id}
                    onMouseEnter={() => setHoveredChoice(choice)}
                    onMouseLeave={() => setHoveredChoice(null)}
                    onClick={() => handlePickChoice(choice, idx)}
                    className="cursor-pointer p-4 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] hover:border-[var(--accent-blue)] hover:bg-[var(--bg-subtle)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      <div className="flex items-start space-x-2.5 mb-2">
                        <span className="w-5 h-5 bg-[var(--text-main)] text-[var(--bg-panel)] flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                          {letter}
                        </span>
                        <h4 className="font-display font-bold text-sm sm:text-base leading-snug text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors">
                          {choice.label}
                        </h4>
                      </div>

                      {choice.description && (
                        <p className="text-xs font-sans opacity-80 leading-normal pl-7.5 line-clamp-2">
                          {choice.description}
                        </p>
                      )}
                    </div>

                    {/* Impacts chiffrés */}
                    {choice.effects && (
                      <div className="pt-2 border-t border-[var(--border-hard)]/25 flex flex-wrap gap-1.5 font-mono text-[10px] pl-7.5">
                        {choice.effects.popularityDelta !== undefined && (
                          <span className={`px-1.5 py-0.5 border font-bold ${
                            choice.effects.popularityDelta >= 0 
                              ? 'bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] border-[var(--accent-emerald)]/40' 
                              : 'bg-[var(--accent-red)]/10 text-[var(--accent-red)] border-[var(--accent-red)]/40'
                          }`}>
                            Opinion {choice.effects.popularityDelta >= 0 ? `+${choice.effects.popularityDelta}` : choice.effects.popularityDelta}%
                          </span>
                        )}

                        {choice.effects.tensionDelta !== undefined && (
                          <span className={`px-1.5 py-0.5 border font-bold ${
                            choice.effects.tensionDelta <= 0 
                              ? 'bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] border-[var(--accent-emerald)]/40' 
                              : 'bg-[var(--accent-red)]/10 text-[var(--accent-red)] border-[var(--accent-red)]/40'
                          }`}>
                            Tension {choice.effects.tensionDelta > 0 ? `+${choice.effects.tensionDelta}` : choice.effects.tensionDelta} pts
                          </span>
                        )}

                        {choice.effects.costTreasury !== undefined && choice.effects.costTreasury > 0 && (
                          <span className="px-1.5 py-0.5 bg-[var(--accent-red)]/10 text-[var(--accent-red)] border border-[var(--accent-red)]/40 font-bold">
                            Budget : -{choice.effects.costTreasury} Mds
                          </span>
                        )}

                        {choice.effects.revenueTreasury !== undefined && choice.effects.revenueTreasury > 0 && (
                          <span className="px-1.5 py-0.5 bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/40 font-bold">
                            Budget : +{choice.effects.revenueTreasury} Mds
                          </span>
                        )}

                        {choice.costInfluence !== undefined && choice.costInfluence > 0 && (
                          <span className="px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] font-bold opacity-85">
                            -{choice.costInfluence} Autorité
                          </span>
                        )}
                      </div>
                    )}

                    {/* Bouton d'action */}
                    <button
                      type="button"
                      disabled={isPromulgating !== null}
                      className={`w-full py-2 font-mono font-bold text-xs uppercase border-2 border-[var(--border-hard)] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                        requiresVote
                          ? 'bg-[var(--accent-purple)] text-white hover:bg-[var(--accent-purple)]/90'
                          : 'bg-[var(--text-main)] text-[var(--bg-panel)] group-hover:bg-[var(--accent-blue)] group-hover:text-white'
                      }`}
                    >
                      {requiresVote ? (
                        <>
                          <Gavel className="w-3.5 h-3.5" />
                          <span>Soumettre au Vote (Hémicycle)</span>
                        </>
                      ) : (
                        <>
                          <span>Promulguer le Décret</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Baromètre Sociologique Compact */}
          <div className="pt-3 border-t-2 border-[var(--border-hard)]">
            <div className="flex items-center justify-between mb-2 font-mono text-[10px] opacity-75">
              <span className="font-bold uppercase">Baromètre Sociologique (Électorat)</span>
              <span>Satisfaction par catégorie</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 font-mono text-[10px]">
              {[
                { label: 'Retraités', key: 'retraites', icon: '👵' },
                { label: 'Populaires', key: 'populaires', icon: '👷' },
                { label: 'Cadres', key: 'cadres', icon: '💼' },
                { label: 'Jeunesse', key: 'jeunesse', icon: '🎓' },
                { label: 'Fonctionn.', key: 'fonctionnaires', icon: '🏛️' },
                { label: 'Monde Rural', key: 'rural', icon: '🚜' }
              ].map(item => {
                const val = state.demographics?.[item.key as keyof typeof state.demographics] || 50;
                return (
                  <div key={item.key} className="p-1.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
                    <div className="flex items-center justify-between mb-0.5">
                      <span>{item.icon}</span>
                      <strong className={val < 30 ? 'text-[var(--accent-red)]' : val > 65 ? 'text-[var(--accent-emerald)]' : ''}>{val}%</strong>
                    </div>
                    <div className="h-1 bg-[var(--bg-panel)] w-full overflow-hidden">
                      <div 
                        className={`h-full ${val < 30 ? 'bg-[var(--accent-red)]' : val > 65 ? 'bg-[var(--accent-emerald)]' : 'bg-[var(--accent-blue)]'}`} 
                        style={{ width: `${val}%` }} 
                      />
                    </div>
                    <span className="text-[8px] opacity-60 block truncate mt-0.5">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* COLONNE PRÉROGATIVES EXÉCUTIVES (4/12) - GRILLE 2 COLONNES COMPACTE */}
        <div className="lg:col-span-4 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-4 shadow-[4px_4px_0px_var(--border-hard)] space-y-3 font-mono">
          
          <div className="flex items-center justify-between border-b-2 border-[var(--border-hard)] pb-2">
            <h3 className="font-bold uppercase text-xs tracking-wider">
              Prérogatives d'État
            </h3>
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
              {state.authorityPoints} pts
            </span>
          </div>

          {/* Grille 2x4 des Actions Clés */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            
            {/* 1. Cabinet Noir */}
            {onOpenPoliticalCards && (
              <button
                onClick={() => { soundEffects.playKeystroke(); onOpenPoliticalCards(); }}
                className="p-2.5 bg-[var(--bg-subtle)] hover:bg-[var(--accent-red)] hover:text-white border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex flex-col justify-between text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <Shield className="w-4 h-4 text-[var(--accent-red)] group-hover:text-white" />
                  <span className="text-[9px] px-1 bg-[var(--bg-panel)] group-hover:bg-black/30 border border-[var(--border-hard)] font-bold">
                    {(state.tacticalCards || []).length}
                  </span>
                </div>
                <span className="font-bold text-xs uppercase leading-tight">Cabinet Noir</span>
                <span className="text-[9px] opacity-70 group-hover:opacity-90">Coups tactiques</span>
              </button>
            )}

            {/* 2. Grands Chantiers */}
            {onOpenGrandProjects && (
              <button
                onClick={() => { soundEffects.playKeystroke(); onOpenGrandProjects(); }}
                className="p-2.5 bg-[var(--bg-subtle)] hover:bg-[var(--accent-purple)] hover:text-white border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex flex-col justify-between text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <Sparkles className="w-4 h-4 text-[var(--accent-purple)] group-hover:text-white" />
                  <span className="text-[9px] px-1 bg-[var(--bg-panel)] group-hover:bg-black/30 border border-[var(--border-hard)] font-bold">
                    {(state.activeProjects || []).length}
                  </span>
                </div>
                <span className="font-bold text-xs uppercase leading-tight">Chantiers</span>
                <span className="text-[9px] opacity-70 group-hover:opacity-90">Investissement</span>
              </button>
            )}

            {/* 3. Allocution 20h */}
            {onOpenAddress && (
              <button
                onClick={() => { soundEffects.playKeystroke(); onOpenAddress(); }}
                className="p-2.5 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex flex-col justify-between text-left transition-all cursor-pointer"
              >
                <Tv className="w-4 h-4 text-[var(--accent-blue)] mb-1" />
                <span className="font-bold text-xs uppercase leading-tight">Allocution 20h</span>
                <span className="text-[9px] opacity-70">{state.addressCount ? `Fait (${state.addressCount})` : 'Dispo'}</span>
              </button>
            )}

            {/* 4. Dégainer 49.3 */}
            {onOpen49_3 && (
              <button
                disabled={state.authorityPoints < 30}
                onClick={() => { soundEffects.playKeystroke(); onOpen49_3(); }}
                className={`p-2.5 border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] flex flex-col justify-between text-left transition-all ${
                  state.authorityPoints < 30
                    ? 'bg-[var(--bg-panel)] opacity-40 cursor-not-allowed'
                    : 'bg-[var(--bg-subtle)] hover:bg-[var(--accent-red)] hover:text-white active:translate-x-[1px] active:translate-y-[1px] group cursor-pointer'
                }`}
              >
                <Gavel className="w-4 h-4 text-[var(--accent-red)] group-hover:text-white mb-1" />
                <span className="font-bold text-xs uppercase leading-tight">Arme du 49.3</span>
                <span className="text-[9px] opacity-70 group-hover:opacity-90">{state.authorityPoints < 30 ? '&lt;30 pts' : 'Passage en force'}</span>
              </button>
            )}

            {/* 5. Remanier (Fusible PM) */}
            {onSacrificePrimeMinister && (
              <button
                disabled={state.social.strikeRisk < 50 || state.authorityPoints < 20}
                onClick={() => { soundEffects.playKeystroke(); onSacrificePrimeMinister(); }}
                className={`p-2.5 border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] flex flex-col justify-between text-left transition-all ${
                  state.social.strikeRisk < 50 || state.authorityPoints < 20
                    ? 'bg-[var(--bg-panel)] opacity-40 cursor-not-allowed'
                    : 'bg-[var(--bg-subtle)] hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer'
                }`}
              >
                <Users className="w-4 h-4 text-[var(--accent-blue)] mb-1" />
                <span className="font-bold text-xs uppercase leading-tight">Fusible PM</span>
                <span className="text-[9px] opacity-70">{state.social.strikeRisk >= 50 ? '-30 Tension' : 'Tension &lt; 50'}</span>
              </button>
            )}

            {/* 6. Dissoudre */}
            {onDissolution && (
              <button
                disabled={state.hasDissolved || state.authorityPoints < 30}
                onClick={() => { soundEffects.playKeystroke(); onDissolution(); }}
                className={`p-2.5 border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] flex flex-col justify-between text-left transition-all ${
                  state.hasDissolved || state.authorityPoints < 30
                    ? 'bg-[var(--bg-panel)] opacity-40 cursor-not-allowed'
                    : 'bg-[var(--accent-red)] text-white hover:bg-[var(--text-main)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-white mb-1" />
                <span className="font-bold text-xs uppercase leading-tight">Dissolution</span>
                <span className="text-[9px] opacity-80">{state.hasDissolved ? 'Faite' : '-30 pts'}</span>
              </button>
            )}

            {/* 7. Politique Fiscale */}
            {onToggleTaxPolicy && (
              <button
                onClick={() => { soundEffects.playKeystroke(); onToggleTaxPolicy(); }}
                className="col-span-2 p-2.5 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-between text-left transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <Wallet className="w-4 h-4 text-[var(--accent-amber)]" />
                  <span className="font-bold text-xs uppercase">Fiscalité : {state.economy.taxPolicy || 'normale'}</span>
                </div>
                <span className={`text-[10px] font-bold ${state.economy.taxPolicy === 'renforcée' ? 'text-[var(--accent-emerald)]' : state.economy.taxPolicy === 'allégée' ? 'text-[var(--accent-red)]' : 'opacity-70'}`}>
                  {state.economy.monthlyBalance > 0 ? `+${state.economy.monthlyBalance}` : state.economy.monthlyBalance} Md/m
                </span>
              </button>
            )}

            {/* 8. Réforme Constitutionnelle (si >= 330) */}
            {seats >= 330 && onEnactConstitutionalReform && (
              <button
                onClick={() => { soundEffects.playStamp(); onEnactConstitutionalReform(); }}
                className="col-span-2 p-2.5 bg-[var(--accent-purple)] text-white hover:bg-[var(--accent-purple)]/90 border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-between text-left transition-all cursor-pointer font-bold uppercase text-xs"
              >
                <span className="flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Réforme Constitutionnelle</span>
                </span>
                <span className="text-[9px]">3/5 requis</span>
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
