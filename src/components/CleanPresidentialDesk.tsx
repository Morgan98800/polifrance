import React, { useState } from 'react';
import { GameState, GameEventChoice, GameEvent } from '../types/game';
import { soundEffects } from '../utils/audio';
import { 
  ArrowRight, CheckCircle2, Building2, 
  LineChart, Globe, Radio, History, Play, AlertTriangle, 
  Tv, Gavel, Users, Sparkles 
} from 'lucide-react';

interface CleanPresidentialDeskProps {
  state: GameState;
  onResolveChoice: (choice: GameEventChoice) => void;
  onNavigateSubpage: (page: 'markets' | 'parliament' | 'map' | 'media' | 'history' | 'cabinet') => void;
  onOpen49_3?: () => void;
  onOpenAddress?: () => void;
}

// Jauge Brutaliste Précise avec Accents Subtils et Prévision au Survol
const StrategicBrutalGauge = ({ 
  label, 
  current, 
  projectedDelta = 0, 
  max = 100, 
  dangerThreshold = 0, 
  invertDanger = false,
  accentColor = 'bg-[var(--text-main)]',
  formatFn = (v: number) => `${v}%`,
  thresholdMarker
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
}) => {
  const projectedValue = Math.max(0, Math.min(max, current + projectedDelta));
  const fillPercentage = Math.min(100, Math.max(0, (current / max) * 100));
  const projectedPercentage = Math.min(100, Math.max(0, (projectedValue / max) * 100));

  const isDanger = invertDanger ? current <= dangerThreshold : current >= dangerThreshold;
  const isPositiveForPlayer = invertDanger ? projectedDelta > 0 : projectedDelta < 0;

  return (
    <div className={`p-3 border-2 shadow-[3px_3px_0px_var(--border-hard)] bg-[var(--bg-panel)] transition-colors ${
      isDanger ? 'border-[var(--accent-red)]' : 'border-[var(--border-hard)]'
    }`}>
      {/* En-tête */}
      <div className="flex items-center justify-between mb-2 font-mono">
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">{label}</span>
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

      {/* Barre de Jauge Brutaliste */}
      <div className="h-3.5 w-full bg-[var(--bg-subtle)] border border-[var(--border-hard)] relative overflow-hidden">
        {thresholdMarker !== undefined && (
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-[var(--accent-amber)] z-20"
            style={{ left: `${(thresholdMarker / max) * 100}%` }}
            title="Seuil Critique"
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

      <div className="flex items-center justify-between mt-1.5 font-mono text-[10px]">
        <span className={isDanger ? 'text-[var(--accent-red)] font-bold' : 'opacity-60'}>
          {isDanger ? '⚠️ SEUIL CRITIQUE' : 'STABLE'}
        </span>
        {thresholdMarker !== undefined && (
          <span className="opacity-50 text-[9px]">
            SEUIL : {thresholdMarker}{label.includes('Déficit') ? '%' : ''}
          </span>
        )}
      </div>
    </div>
  );
};

export const CleanPresidentialDesk: React.FC<CleanPresidentialDeskProps> = ({
  state,
  onResolveChoice,
  onNavigateSubpage,
  onOpen49_3,
  onOpenAddress
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
  const seats = acquiredSeats;

  // Projections
  const projPop = hoveredChoice?.effects?.popularityDelta || 0;
  const projStrike = hoveredChoice?.effects?.tensionDelta || 0;
  const projDeficit = hoveredChoice?.effects?.deficitDelta || 0;
  
  // Limites du Mandat (60 mois)
  const totalMonths = 60;
  const currentMonth = state.turn;
  const mandatePercentage = (currentMonth / totalMonths) * 100;

  const handlePickChoice = (choice: GameEventChoice, index: number) => {
    if (isPromulgating) return;

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
      case 'economique': return { name: 'MINISTÈRE DE L\'ÉCONOMIE & FINANCES (BERCY)', accent: 'text-[var(--accent-amber)]' };
      case 'social': return { name: 'MINISTÈRE DU TRAVAIL & SANTÉ (GRENELLE)', accent: 'text-[var(--accent-red)]' };
      case 'securite': return { name: 'MINISTÈRE DE L\'INTÉRIEUR (PLACE BEAUVAU)', accent: 'text-[var(--accent-blue)]' };
      case 'international': return { name: 'MINISTÈRE DES AFFAIRES ÉTRANGÈRES', accent: 'text-[var(--accent-blue)]' };
      case 'environnement': return { name: 'MINISTÈRE DE LA TRANSITION ÉCOLOGIQUE', accent: 'text-[var(--accent-emerald)]' };
      default: return { name: 'PALAIS DE L\'ÉLYSÉE • SECRÉTARIAT GÉNÉRAL', accent: 'text-[var(--accent-amber)]' };
    }
  };

  const ministry = getMinistryHeader(event?.category);

  return (
    <div className={`max-w-5xl mx-auto space-y-6 text-[var(--text-main)] ${strikeRisk >= 85 ? 'animate-shake' : ''}`}>
      
      {/* 1. LIGNE DE TEMPS : MANDAT QUINQUENNAL AVEC AVATAR DU PRÉSIDENT */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-3 shadow-[3px_3px_0px_var(--border-hard)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 bg-[var(--bg-subtle)] border border-[var(--border-hard)] overflow-hidden shrink-0 shadow-[1px_1px_0px_var(--border-hard)]">
            {state.player?.avatar ? (
              <img src={state.player.avatar} alt={state.player.name} className="w-full h-full object-cover" />
            ) : null}
          </div>
          <div className="leading-tight text-left">
            <span className="font-bold uppercase tracking-wider block text-xs">{state.player?.name}</span>
            <span className="text-[9px] opacity-60 uppercase font-mono">{state.mode === 'campaign' ? 'Campagne 2027' : 'Présidence de la République'}</span>
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

      {/* 2. LES 4 JAUGES AVEC COULEURS STRATÉGIQUES & PRÉVISION AU SURVOL */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StrategicBrutalGauge 
          label="1. Popularité" 
          current={popularity} 
          projectedDelta={projPop} 
          max={100} 
          dangerThreshold={30} 
          invertDanger={true} 
          accentColor="bg-[var(--accent-blue)]"
          thresholdMarker={50}
        />
        <StrategicBrutalGauge 
          label="2. Climat Social" 
          current={strikeRisk} 
          projectedDelta={projStrike} 
          max={100} 
          dangerThreshold={75} 
          accentColor="bg-[var(--accent-red)]"
          thresholdMarker={75}
        />
        <StrategicBrutalGauge 
          label="3. Déficit Public" 
          current={deficitVal} 
          projectedDelta={projDeficit} 
          max={10} 
          dangerThreshold={3.1} 
          accentColor="bg-[var(--accent-amber)]"
          thresholdMarker={3.0}
          formatFn={(v) => `-${v.toFixed(1)}%`}
        />
        <StrategicBrutalGauge 
          label="4. Députés Acquis" 
          current={seats} 
          projectedDelta={0} 
          max={577} 
          dangerThreshold={288} 
          invertDanger={true}
          accentColor="bg-[var(--accent-purple)]"
          thresholdMarker={289}
          formatFn={(v) => `${v}`}
        />
      </div>

      {/* 3. BARRE D'ACTIONS DU PRÉSIDENT (49.3, ALLOCUTION TV, CONSEIL DES MINISTRES) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
        
        {/* Prise de Parole 20h */}
        {onOpenAddress && (
          <button
            onClick={() => { soundEffects.playKeystroke(); onOpenAddress(); }}
            className="p-2.5 bg-[var(--bg-panel)] hover:bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center space-x-2 font-bold uppercase transition-all"
          >
            <Tv className="w-4 h-4 text-[var(--accent-red)]" />
            <span>🎙️ Allocution de 20h</span>
          </button>
        )}

        {/* Déclencher le 49.3 */}
        {onOpen49_3 && (
          <button
            onClick={() => { soundEffects.playKeystroke(); onOpen49_3(); }}
            className="p-2.5 bg-[var(--bg-panel)] hover:bg-[var(--accent-red)] hover:text-white border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center space-x-2 font-bold uppercase transition-all group"
          >
            <Gavel className="w-4 h-4 text-[var(--accent-red)] group-hover:text-white" />
            <span>🚨 Dégainer le 49.3</span>
          </button>
        )}

        {/* Conseil des Ministres / Remaniement */}
        <button
          onClick={() => { soundEffects.playKeystroke(); onNavigateSubpage('cabinet'); }}
          className="p-2.5 bg-[var(--bg-panel)] hover:bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center space-x-2 font-bold uppercase transition-all"
        >
          <Users className="w-4 h-4 text-[var(--accent-blue)]" />
          <span>👥 Conseil des Ministres</span>
        </button>

      </div>

      {/* 4. LE DOSSIER DU CONSEIL DES MINISTRES */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-6 sm:p-8 shadow-[4px_4px_0px_var(--border-hard)] space-y-6 relative overflow-hidden">
        
        {/* Tampon de Promulgation */}
        {isPromulgating && (
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none bg-[var(--bg-primary)]/60 backdrop-blur-xs">
            <div className="animate-stamp border-4 border-[var(--accent-emerald)] text-[var(--accent-emerald)] bg-[var(--bg-panel)] px-8 py-4 font-display font-black text-3xl sm:text-5xl uppercase shadow-[6px_6px_0px_var(--border-hard)]">
              DÉCRET {isPromulgating} PROMULGUÉ
            </div>
          </div>
        )}

        {/* En-tête officiel */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-[var(--border-hard)] font-mono text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-bold px-2 py-0.5 bg-[var(--text-main)] text-[var(--bg-panel)] uppercase">
              DOSSIER N° 0{state.turn}
            </span>
            <span className={`font-bold uppercase tracking-wider ${ministry.accent}`}>
              • {ministry.name}
            </span>
          </div>

          <span className="px-2.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] font-bold uppercase">
            ARBITRAGE DU PRÉSIDENT REQUIS
          </span>
        </div>

        {/* Titre & Citation */}
        {event ? (
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black leading-tight tracking-tight text-[var(--text-main)]">
              {event.title}
            </h2>
            <div className="p-4 bg-[var(--bg-subtle)] border-l-4 border-[var(--accent-amber)] font-sans text-sm sm:text-base leading-relaxed italic opacity-95">
              « {event.description} »
            </div>
          </div>
        ) : (
          <div className="p-10 text-center space-y-3 font-mono">
            <CheckCircle2 className="w-12 h-12 mx-auto text-[var(--accent-emerald)]" />
            <h3 className="font-display font-bold text-xl">Aucune crise urgente en attente</h3>
          </div>
        )}

        {/* Les Choix Décisionnels */}
        {event && (
          <div className="space-y-4 pt-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider opacity-70 block">
              ↓ SURVOLEZ UNE OPTION POUR PRÉVISUALISER L'IMPACT SUR LES 4 JAUGES ↓
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.choices.map((choice, idx) => {
                const letter = String.fromCharCode(65 + idx);
                
                return (
                  <div
                    key={choice.id}
                    onMouseEnter={() => setHoveredChoice(choice)}
                    onMouseLeave={() => setHoveredChoice(null)}
                    onClick={() => handlePickChoice(choice, idx)}
                    className="cursor-pointer p-5 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] hover:bg-[var(--bg-subtle)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div>
                      <div className="flex items-start space-x-2.5 mb-2.5">
                        <span className="w-6 h-6 bg-[var(--text-main)] text-[var(--bg-panel)] flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                          {letter}
                        </span>
                        <h4 className="font-display font-bold text-base sm:text-lg leading-snug text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors">
                          {choice.label}
                        </h4>
                      </div>

                      {choice.description && (
                        <p className="text-xs sm:text-sm font-sans opacity-80 leading-normal pl-8.5">
                          {choice.description}
                        </p>
                      )}
                    </div>

                    {/* Résumé des impacts chiffrés subtils */}
                    {choice.effects && (
                      <div className="pt-3 border-t border-[var(--border-hard)]/25 flex flex-wrap gap-1.5 font-mono text-[11px] pl-8.5">
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

                        {choice.effects.deficitDelta !== undefined && (
                          <span className="px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] font-bold opacity-80">
                            Budget : {choice.effects.deficitDelta > 0 ? `+${choice.effects.deficitDelta}%` : `${choice.effects.deficitDelta}%`}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Bouton de Promulgation */}
                    <button
                      type="button"
                      disabled={isPromulgating !== null}
                      className="w-full py-2.5 bg-[var(--text-main)] text-[var(--bg-panel)] group-hover:bg-[var(--accent-blue)] group-hover:text-white font-mono font-bold text-xs uppercase border-2 border-[var(--border-hard)] flex items-center justify-center space-x-2 transition-colors"
                    >
                      <span>Promulguer l'Option {letter}</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 5. LES SOUS-PAGES D'ANALYSE DÉTAILLÉE */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-4 shadow-[4px_4px_0px_var(--border-hard)] space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hard)]">
          <span className="font-bold uppercase tracking-wider opacity-70">
            📊 SOUS-PAGES D'ANALYSE DÉTAILLÉE DU PAYS
          </span>
          <span className="text-[10px] opacity-60">CLIQUEZ POUR OUVRIR</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
          <button
            onClick={() => { soundEffects.playKeystroke(); onNavigateSubpage('markets'); }}
            className="p-3 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold flex flex-col items-center justify-center space-y-1.5 shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <LineChart className="w-5 h-5 stroke-[2] text-[var(--accent-amber)]" />
            <span>1. Bourse & Dette</span>
          </button>

          <button
            onClick={() => { soundEffects.playKeystroke(); onNavigateSubpage('parliament'); }}
            className="p-3 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold flex flex-col items-center justify-center space-y-1.5 shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <Building2 className="w-5 h-5 stroke-[2] text-[var(--accent-blue)]" />
            <span>2. Députés & 49.3</span>
          </button>

          <button
            onClick={() => { soundEffects.playKeystroke(); onNavigateSubpage('map'); }}
            className="p-3 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold flex flex-col items-center justify-center space-y-1.5 shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <Globe className="w-5 h-5 stroke-[2] text-[var(--accent-emerald)]" />
            <span>3. Carte 13 Régions</span>
          </button>

          <button
            onClick={() => { soundEffects.playKeystroke(); onNavigateSubpage('media'); }}
            className="p-3 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold flex flex-col items-center justify-center space-y-1.5 shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <Radio className="w-5 h-5 stroke-[2] text-[var(--accent-red)]" />
            <span>4. Dépêches AFP</span>
          </button>

          <button
            onClick={() => { soundEffects.playKeystroke(); onNavigateSubpage('history'); }}
            className="p-3 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold flex flex-col items-center justify-center space-y-1.5 shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all col-span-2 sm:col-span-1"
          >
            <History className="w-5 h-5 stroke-[2] text-[var(--text-main)]" />
            <span>5. Archives</span>
          </button>
        </div>
      </div>

    </div>
  );
};
