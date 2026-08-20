import React, { useState } from 'react';
import { GameState, GameEventChoice, GameEvent } from '../types/game';
import { soundEffects } from '../utils/audio';
import { 
  ArrowRight, CheckCircle2, Building2, 
  LineChart, Globe, Radio, History, Play, AlertTriangle, 
  Tv, Gavel, Users, Trophy, Sparkles, Wallet, Shield 
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

// Jauge Brutaliste Épurée
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
      {/* En-tête Jauge */}
      <div>
        <div className="flex items-center justify-between mb-1 font-mono">
          <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">{label}</span>
          <div className="flex items-baseline space-x-1.5">
            <strong className={`font-mono font-black text-lg ${isDanger ? 'text-[var(--accent-red)]' : 'text-[var(--text-main)]'}`}>
              {formatFn(current)}
            </strong>
            {projectedDelta !== 0 && (
              <span className={`text-xs font-bold ${isPositiveForPlayer ? 'text-[var(--accent-emerald)]' : 'text-[var(--accent-red)]'}`}>
                ({projectedDelta > 0 ? '+' : ''}{formatFn(projectedDelta).replace('%', '')})
              </span>
            )}
          </div>
        </div>

        {/* Barre de Jauge */}
        <div className="h-2.5 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)] relative overflow-hidden mb-1.5">
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
        <div className="text-[9px] font-mono opacity-65 pt-1 border-t border-[var(--border-hard)]/20 truncate">
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
  const deficitVal = Math.abs(state.economy.deficit);
  const seats = acquiredSeats || state.deputiesMajority || 240;

  // Projections
  const projPop = hoveredChoice?.effects?.popularityDelta || 0;
  const projStrike = hoveredChoice?.effects?.tensionDelta || 0;
  const projDeficit = hoveredChoice?.effects?.deficitDelta || 0;
  
  // Limites du Mandat (60 mois)
  const totalMonths = 60;
  const currentMonth = state.turn;
  const mandatePercentage = Math.min(100, Math.round((currentMonth / totalMonths) * 100));
  // Vérifie si le dossier nécessite obligatoirement un vote parlementaire (Projet de loi lourd)
  // ou s'il s'agit d'un Décret Exécutif / Arbitrage régalien direct
  const isLegislativeVoteRequired = (choice: GameEventChoice): boolean => {
    if (seats >= 289) return false; // Majorité absolue : vote automatique sans friction
    if (!event) return false;
    
    // Décrets régaliens directs : diplomatie, sécurité d'urgence, gestion médiatique
    if (event.category === 'international' || event.category === 'securite' || event.category === 'mediatique') {
      return false;
    }
    // Projets de loi parlementaires ou réformes budgétaires/sociales structurelles
    if (event.category === 'parlementaire') return true;
    
    const fx = choice.effects;
    const isHeavyBudget = (fx.costTreasury && fx.costTreasury >= 6) || (fx.revenueTreasury && fx.revenueTreasury >= 6);
    const isHeavySocial = fx.deficitDelta !== undefined && Math.abs(fx.deficitDelta) >= 0.3;

    return isHeavyBudget || isHeavySocial || false;
  };

  const handlePickChoice = (choice: GameEventChoice, index: number) => {
    if (isPromulgating) return;

    const requiresVote = isLegislativeVoteRequired(choice);

    // Si le dossier exige un passage devant l'Assemblée et que le joueur n'a pas la majorité absolue
    if (requiresVote && seats < 289 && onStartParliamentVote) {
      soundEffects.playStamp();
      onStartParliamentVote(choice);
      return;
    }

    // Sinon (Décret d'application ou Majorité Absolue), promulgation directe triomphale !
    soundEffects.playStamp();
    const letter = String.fromCharCode(65 + index);
    setIsPromulgating(letter);
    setHoveredChoice(null);

    setTimeout(() => {
      onResolveChoice(choice);
      setIsPromulgating(null);
    }, 650);
  };

  const getMinistryHeader = (cat?: string) => {
    switch (cat) {
      case 'economique': return { name: 'BERCY • ÉCONOMIE', accent: 'text-[var(--accent-amber)]' };
      case 'social': return { name: 'GRENELLE • TRAVAIL', accent: 'text-[var(--accent-red)]' };
      case 'securite': return { name: 'BEAUVAU • INTÉRIEUR', accent: 'text-[var(--accent-blue)]' };
      case 'international': return { name: 'QUAI D\'ORSAY', accent: 'text-[var(--accent-blue)]' };
      case 'environnement': return { name: 'ÉCOLOGIE & ÉNERGIE', accent: 'text-[var(--accent-emerald)]' };
      default: return { name: 'ÉLYSÉE', accent: 'text-[var(--accent-amber)]' };
    }
  };

  const ministry = getMinistryHeader(event?.category);

  return (
    <div className={`max-w-5xl mx-auto space-y-4 text-[var(--text-main)] ${strikeRisk >= 85 ? 'animate-shake' : ''}`}>
      
      {/* 1. LIGNE DE TEMPS : MANDAT QUINQUENNAL */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-3 shadow-[3px_3px_0px_var(--border-hard)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 bg-[var(--bg-subtle)] border border-[var(--border-hard)] overflow-hidden shrink-0 shadow-[1px_1px_0px_var(--border-hard)]">
            {state.player?.avatar ? (
              <img src={state.player.avatar} alt={state.player.name} className="w-full h-full object-cover" />
            ) : null}
          </div>
          <div className="leading-tight text-left">
            <span className="font-bold uppercase tracking-wider block text-xs">{state.player?.name}</span>
            <span className="text-[9px] opacity-60 uppercase font-mono">{state.mode === 'campaign' ? 'Campagne 2027' : 'Présidence'}</span>
          </div>
        </div>
        
        <div className="flex-1 max-w-md mx-auto sm:mx-0 w-full relative h-3 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
          <div 
            className="absolute top-0 left-0 h-full bg-[var(--accent-blue)]"
            style={{ width: `${mandatePercentage}%` }}
          />
        </div>

        <div className="font-bold text-right font-mono">
          MOIS <span className="text-[var(--accent-blue)]">{currentMonth}</span> / {totalMonths}
        </div>
      </div>

      {/* 2. LES 4 JAUGES ESSENTIELLES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StrategicBrutalGauge 
          label="Popularité" 
          current={popularity} 
          projectedDelta={projPop} 
          max={100} 
          dangerThreshold={30} 
          invertDanger={true} 
          accentColor="bg-[var(--accent-blue)]"
          thresholdMarker={50}
          subtitle="Opinion publique nationale"
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
          subtitle="Seuil d'alerte sociale : 75%"
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
          subtitle={`Déficit: ${state.economy.deficit}% | Solde: ${state.economy.monthlyBalance > 0 ? '+' : ''}${state.economy.monthlyBalance} Md/m`}
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
            const perk = v >= 330 ? '💎 Pleins Pouvoirs' : v >= 289 ? '👑 Absolue' : v >= 240 ? '⚖️ Relative' : '⚠️ Hostile';
            return `${v} (${perk})`;
          }}
          subtitle="Majorité absolue : 289 sièges"
        />
      </div>

      {/* 2.5 BANDEAU DE CONTEXTE STRATÉGIQUE (Chantiers & Frondeurs) */}
      {((state.activeProjects && state.activeProjects.length > 0) || popularity < 25) && (
        <div className="space-y-2">
          {state.activeProjects && state.activeProjects.length > 0 && (
            <div className="p-2.5 bg-[var(--accent-purple)]/10 border border-[var(--accent-purple)] flex items-center justify-between font-mono text-[11px]">
              <span className="flex items-center space-x-1.5 font-bold text-[var(--accent-purple)]">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Chantier en cours : {state.activeProjects[0].name} ({state.activeProjects[0].turnsRemaining} mois restants)
                </span>
              </span>
              <span className="font-bold text-[var(--accent-red)] shrink-0">
                -{state.activeProjects.reduce((acc, p) => acc + p.costPerTurn, 0).toFixed(1)} Mds/m
              </span>
            </div>
          )}

          {popularity < 25 && (
            <div className="p-2.5 bg-[var(--accent-red)]/15 border-2 border-[var(--accent-red)] flex items-center justify-between font-mono text-[11px] text-[var(--accent-red)] animate-pulse">
              <span className="flex items-center space-x-1.5 font-bold">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>ALERTE FRONDEURS : Impopularité record (&lt;25%), 35 députés de votre majorité menacent de sécession !</span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* 3. CONTENU PRINCIPAL : DEUX COLONNES (Dossier vs Prérogatives) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* COLONNE DOSSIER (2/3 de l'espace) */}
        <div className="lg:col-span-2 space-y-4">
          {/* LE DOSSIER DU CONSEIL DES MINISTRES */}
          <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 sm:p-6 shadow-[4px_4px_0px_var(--border-hard)] space-y-4 relative overflow-hidden h-full flex flex-col justify-between">
            
            {/* Tampon de Promulgation */}
            {isPromulgating && (
              <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none bg-[var(--bg-primary)]/60 backdrop-blur-xs">
                <div className="animate-stamp border-4 border-[var(--accent-emerald)] text-[var(--accent-emerald)] bg-[var(--bg-panel)] px-8 py-4 font-display font-black text-3xl sm:text-5xl uppercase shadow-[6px_6px_0px_var(--border-hard)]">
                  DÉCRET {isPromulgating} PROMULGUÉ
                </div>
              </div>
            )}

            {/* En-tête Dossier */}
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)] font-mono text-xs mb-4">
                <span className="font-bold px-2 py-0.5 bg-[var(--text-main)] text-[var(--bg-panel)] uppercase">
                  DOSSIER N° 0{state.turn}
                </span>
          <span className={`font-bold uppercase tracking-wider text-[11px] ${ministry.accent}`}>
            {ministry.name}
          </span>
        </div>

        {/* Titre & Description */}
        {event ? (
          <div className="space-y-2.5">
            <h2 className="text-xl sm:text-2xl font-display font-black leading-tight tracking-tight text-[var(--text-main)]">
              {event.title}
            </h2>
            <div className="p-3 bg-[var(--bg-subtle)] border-l-4 border-[var(--accent-amber)] font-sans text-xs sm:text-sm leading-relaxed italic opacity-95">
              « {event.description} »
            </div>
          </div>
        ) : (
          <div className="p-8 text-center space-y-2 font-mono">
            <CheckCircle2 className="w-10 h-10 mx-auto text-[var(--accent-emerald)]" />
            <h3 className="font-display font-bold text-lg">Aucune crise urgente en attente</h3>
          </div>
        )}

        {/* Choix Décisionnels */}
        {event && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {event.choices.map((choice, idx) => {
              const letter = String.fromCharCode(65 + idx);
              
              return (
                <div
                  key={choice.id}
                  onMouseEnter={() => setHoveredChoice(choice)}
                  onMouseLeave={() => setHoveredChoice(null)}
                  onClick={() => handlePickChoice(choice, idx)}
                  className="cursor-pointer p-4 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] hover:bg-[var(--bg-subtle)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex flex-col justify-between space-y-3 group"
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

                  {/* Bouton */}
                  <button
                    type="button"
                    disabled={isPromulgating !== null}
                    className="w-full py-2 bg-[var(--text-main)] text-[var(--bg-panel)] group-hover:bg-[var(--accent-blue)] group-hover:text-white font-mono font-bold text-xs uppercase border-2 border-[var(--border-hard)] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <span>
                      {isLegislativeVoteRequired(choice) 
                        ? `🏛️ Soumettre au Vote (Option ${letter})` 
                        : `⚡ Décret Exécutif (Option ${letter})`}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
        </div>
      </div>
    </div>

        {/* COLONNE PRÉROGATIVES (1/3 de l'espace) */}
        <div className="space-y-4 flex flex-col">
          <div className="bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] p-4 shadow-[3px_3px_0px_var(--border-hard)] flex-1 flex flex-col">
            <div className="flex items-center justify-between border-b-2 border-[var(--border-hard)] pb-2 mb-3">
              <h3 className="font-bold uppercase font-mono text-[11px] tracking-wider">
                Prérogatives Exécutives
              </h3>
              <span className="text-[10px] font-mono font-black px-1.5 py-0.5 bg-[var(--text-main)] text-[var(--bg-panel)]">
                AUTORITÉ : {state.authorityPoints}/100
              </span>
            </div>

            {/* Statut d'Autorité */}
            {state.authorityPoints < 20 && (
              <div className="mb-3 bg-[var(--accent-red)]/15 border border-[var(--accent-red)] p-2 text-center text-[10px] font-bold text-[var(--accent-red)] animate-pulse">
                ⚠️ CANARD BOITEUX (Autorité &lt; 20) : +2 Tension/mois
              </div>
            )}
            {state.authorityPoints > 75 && (
              <div className="mb-3 bg-[var(--accent-emerald)]/15 border border-[var(--accent-emerald)] p-2 text-center text-[10px] font-bold text-[var(--accent-emerald)]">
                👑 CHARISME RÉGALIEN (&gt;75) : -30% Hausse de Tension
              </div>
            )}
            
            {/* Statuts Parlementaires & Perks */}
            {seats >= 330 ? (
              <div className="mb-3 bg-[var(--accent-purple)]/20 border border-[var(--accent-purple)] p-2 text-center text-[10px] font-bold text-[var(--accent-purple)]">
                💎 PLEINS POUVOIRS (&gt;330) : Réforme Constitutionnelle disponible !
              </div>
            ) : seats >= 289 ? (
              <div className="mb-3 bg-[var(--accent-emerald)]/15 border border-[var(--accent-emerald)] p-2 text-center text-[10px] font-bold text-[var(--accent-emerald)]">
                👑 MAJORITÉ ABSOLUE (≥289) : Vote automatique des lois débloqué
              </div>
            ) : seats < 240 ? (
              <div className="mb-3 bg-[var(--accent-red)]/15 border border-[var(--accent-red)] p-2 text-center text-[10px] font-bold text-[var(--accent-red)]">
                ⚠️ CHAMBRE HOSTILE (&lt;240) : Négociations et 49.3 obligatoires
              </div>
            ) : null}
            
            <div className="space-y-3 flex-1 flex flex-col">
              {/* Boutons d'urgence */}
              <div className="grid grid-cols-1 gap-2">
                {/* Super-Pouvoir : Réforme Constitutionnelle (si >= 330 députés) */}
                {seats >= 330 && onEnactConstitutionalReform && (
                  <button
                    onClick={() => { soundEffects.playStamp(); onEnactConstitutionalReform(); }}
                    className="p-2.5 bg-[var(--accent-purple)] text-white hover:bg-[var(--accent-purple)]/80 border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-between font-bold uppercase transition-all text-[11px] cursor-pointer"
                  >
                    <span className="flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Réforme Constitutionnelle</span>
                    </span>
                    <span className="text-[9px] font-mono">
                      Bonus d'État
                    </span>
                  </button>
                )}

                {onOpenAddress && (
                  <button
                    onClick={() => { soundEffects.playKeystroke(); onOpenAddress(); }}
                    className="p-2.5 bg-[var(--bg-panel)] hover:bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-between font-bold uppercase transition-all text-[11px]"
                  >
                    <span className="flex items-center space-x-1.5">
                      <Tv className="w-3.5 h-3.5 text-[var(--accent-red)]" />
                      <span>Allocution 20h</span>
                    </span>
                    <span className="text-[9px] opacity-60 font-mono">
                      {state.addressCount ? `Utilisé (${state.addressCount})` : '100% effet'}
                    </span>
                  </button>
                )}

                {onOpen49_3 && (
                  <button
                    disabled={state.authorityPoints < 30}
                    onClick={() => { soundEffects.playKeystroke(); onOpen49_3(); }}
                    className={`p-2.5 border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] flex items-center justify-between font-bold uppercase transition-all text-[11px] ${
                      state.authorityPoints < 30 
                        ? 'bg-[var(--bg-panel)] opacity-50 cursor-not-allowed'
                        : 'bg-[var(--bg-panel)] hover:bg-[var(--accent-red)] hover:text-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none group'
                    }`}
                  >
                    <span className="flex items-center space-x-1.5">
                      <Gavel className="w-3.5 h-3.5 text-[var(--accent-red)] group-hover:text-white" />
                      <span>Dégainer le 49.3</span>
                    </span>
                    <span className="text-[9px] opacity-75 font-mono">
                      {state.authorityPoints < 30 ? 'Bloqué (<30)' : '-20 Tension'}
                    </span>
                  </button>
                )}

                {/* Bouton Fusible : Sacrifier le Premier Ministre */}
                {onSacrificePrimeMinister && (
                  <button
                    disabled={state.social.strikeRisk < 50 || state.authorityPoints < 20}
                    onClick={() => { soundEffects.playKeystroke(); onSacrificePrimeMinister(); }}
                    className={`p-2.5 border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] flex items-center justify-between font-bold uppercase transition-all text-[11px] ${
                      state.social.strikeRisk < 50 || state.authorityPoints < 20
                        ? 'bg-[var(--bg-panel)] opacity-40 cursor-not-allowed'
                        : 'bg-[var(--bg-panel)] hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer'
                    }`}
                  >
                    <span className="flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                      <span>Remanier (Fusible PM)</span>
                    </span>
                    <span className="text-[9px] opacity-75 font-mono">
                      {state.social.strikeRisk >= 50 ? '-30 Tension' : 'Tension < 50'}
                    </span>
                  </button>
                )}

                {/* Bouton Dissolution de l'Assemblée */}
                {onDissolution && (
                  <button
                    disabled={state.hasDissolved || state.authorityPoints < 30}
                    onClick={() => { soundEffects.playKeystroke(); onDissolution(); }}
                    className={`p-2.5 border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] flex items-center justify-between font-bold uppercase transition-all text-[11px] ${
                      state.hasDissolved || state.authorityPoints < 30
                        ? 'bg-[var(--bg-panel)] opacity-40 cursor-not-allowed'
                        : 'bg-[var(--accent-red)] text-white hover:bg-[var(--text-main)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer group'
                    }`}
                  >
                    <span className="flex items-center space-x-1.5">
                      <AlertTriangle className={`w-3.5 h-3.5 ${state.hasDissolved || state.authorityPoints < 30 ? 'text-[var(--accent-red)]' : 'text-white group-hover:text-[var(--accent-red)]'}`} />
                      <span>Dissoudre l'Assemblée</span>
                    </span>
                    <span className="text-[9px] font-mono opacity-90">
                      {state.hasDissolved ? 'Déjà dissoute' : '-30 Autorité'}
                    </span>
                  </button>
                )}

                {/* Bouton Grands Chantiers de l'État */}
                {onOpenGrandProjects && (
                  <button
                    onClick={() => { soundEffects.playKeystroke(); onOpenGrandProjects(); }}
                    className="p-2.5 bg-[var(--bg-panel)] hover:bg-[var(--accent-purple)] hover:text-white border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-between font-bold uppercase transition-all text-[11px] cursor-pointer group"
                  >
                    <span className="flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--accent-purple)] group-hover:text-white" />
                      <span>Grands Chantiers</span>
                    </span>
                    <span className="text-[9px] font-mono opacity-80">
                      {(state.activeProjects || []).length > 0 
                        ? `${state.activeProjects.length} en cours` 
                        : (state.completedProjectsHistory || []).length > 0 
                        ? `${state.completedProjectsHistory.length} achevé(s)` 
                        : 'Lancer'}
                    </span>
                  </button>
                )}

                {/* Bouton Cabinet Noir & Manœuvres */}
                {onOpenPoliticalCards && (
                  <button
                    onClick={() => { soundEffects.playKeystroke(); onOpenPoliticalCards(); }}
                    className="p-2.5 bg-[var(--bg-panel)] hover:bg-[var(--accent-red)] hover:text-white border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-between font-bold uppercase transition-all text-[11px] cursor-pointer group"
                  >
                    <span className="flex items-center space-x-1.5">
                      <Shield className="w-3.5 h-3.5 text-[var(--accent-red)] group-hover:text-white" />
                      <span>Cabinet Noir</span>
                    </span>
                    <span className="text-[9px] font-mono opacity-80">
                      {(state.tacticalCards || []).length} en main
                    </span>
                  </button>
                )}

                {/* Bouton Politique Fiscale */}
                {onToggleTaxPolicy && (
                  <button
                    onClick={() => { soundEffects.playKeystroke(); onToggleTaxPolicy(); }}
                    className="p-2.5 bg-[var(--bg-panel)] hover:bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-between font-bold uppercase transition-all text-[11px] cursor-pointer"
                  >
                    <span className="flex items-center space-x-1.5">
                      <Wallet className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
                      <span>Fiscalité : {state.economy.taxPolicy || 'normale'}</span>
                    </span>
                    <span className={`text-[9px] font-mono font-bold ${
                      state.economy.taxPolicy === 'renforcée' ? 'text-[var(--accent-emerald)]' : state.economy.taxPolicy === 'allégée' ? 'text-[var(--accent-red)]' : 'opacity-70'
                    }`}>
                      {state.economy.monthlyBalance > 0 ? `+${state.economy.monthlyBalance} Mds/m` : `${state.economy.monthlyBalance || -1.5} Mds/m`}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* BAROMÈTRE ÉLECTORAL SOCIOLOGIQUE */}
          <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-3.5 shadow-[3px_3px_0px_var(--border-hard)] space-y-2.5 font-mono">
            <div className="flex items-center justify-between border-b border-[var(--border-hard)]/30 pb-1.5">
              <span className="font-bold text-xs uppercase flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                <span>Baromètre Sociologique</span>
              </span>
              <span className="text-[9px] opacity-60">ADHÉSION %</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="opacity-75">👵 Retraités</span>
                  <strong>{state.demographics?.retraites || 20}%</strong>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)]/40 overflow-hidden">
                  <div className="h-full bg-[var(--accent-blue)]" style={{ width: `${state.demographics?.retraites || 20}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="opacity-75">👷 Populaires</span>
                  <strong>{state.demographics?.populaires || 20}%</strong>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)]/40 overflow-hidden">
                  <div className="h-full bg-[var(--accent-red)]" style={{ width: `${state.demographics?.populaires || 20}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="opacity-75">💼 Cadres / CSP+</span>
                  <strong>{state.demographics?.cadres || 20}%</strong>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)]/40 overflow-hidden">
                  <div className="h-full bg-[var(--accent-amber)]" style={{ width: `${state.demographics?.cadres || 20}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="opacity-75">🎓 Jeunesse</span>
                  <strong>{state.demographics?.jeunesse || 20}%</strong>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)]/40 overflow-hidden">
                  <div className="h-full bg-[var(--accent-emerald)]" style={{ width: `${state.demographics?.jeunesse || 20}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="opacity-75">🏛️ Fonctionnaires</span>
                  <strong>{state.demographics?.fonctionnaires || 20}%</strong>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)]/40 overflow-hidden">
                  <div className="h-full bg-[var(--accent-purple)]" style={{ width: `${state.demographics?.fonctionnaires || 20}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="opacity-75">🚜 Monde Rural</span>
                  <strong>{state.demographics?.rural || 20}%</strong>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)]/40 overflow-hidden">
                  <div className="h-full bg-[#10b981]" style={{ width: `${state.demographics?.rural || 20}%` }} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
