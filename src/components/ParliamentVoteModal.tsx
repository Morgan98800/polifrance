import React, { useState, useEffect } from 'react';
import { GameState, GameEventChoice, ParliamentGroup } from '../types/game';
import { soundEffects } from '../utils/audio';
import { Building2, AlertTriangle, CheckCircle2, Gavel, ArrowRight, X, Users, Check, Flame } from 'lucide-react';

interface ParliamentVoteModalProps {
  state: GameState;
  choice: GameEventChoice;
  onVoteSuccess: (
    choice: GameEventChoice, 
    bonusEffects?: { 
      costTreasury?: number; 
      costAuthority?: number; 
      tensionDelta?: number;
      popularityDelta?: number;
      concessionLog?: string[];
    }
  ) => void;
  onUse49_3: () => void;
  onCancel: () => void;
}

interface OppositionBloc {
  id: string;
  name: string;
  shortName: string;
  seats: number;
  color: string;
  isUnnatural: boolean;
  demands: {
    label: string;
    costTreasury?: number;
    costAuthority?: number;
    tensionDelta?: number;
    popularityDelta?: number;
  };
  accepted: boolean;
}

export const ParliamentVoteModal: React.FC<ParliamentVoteModalProps> = ({
  state,
  choice,
  onVoteSuccess,
  onUse49_3,
  onCancel
}) => {
  const initialVotes = (state.parliament || [])
    .filter(g => g.stanceTowardsPlayer === 'loyal' || g.stanceTowardsPlayer === 'coalition')
    .reduce((sum, g) => sum + g.seats, 0) || state.deputiesMajority || 240;
    
  const neededVotes = 289;

  const [currentVotes, setCurrentVotes] = useState(initialVotes);
  const [spentBudget, setSpentBudget] = useState(0);
  const [spentAuthority, setSpentAuthority] = useState(0);
  const [addedTension, setAddedTension] = useState(0);
  const [addedPopularity, setAddedPopularity] = useState(0);
  
  const [blocs, setBlocs] = useState<OppositionBloc[]>([]);

  useEffect(() => {
    const oppositionGroups = (state.parliament || []).filter(g => 
      (g.stanceTowardsPlayer === 'oppose_moderate' || g.stanceTowardsPlayer === 'oppose_hard') && g.seats > 0
    );

    const fx = choice.effects || {};
    const isSocialSpending = (fx.costTreasury && fx.costTreasury > 0) || (fx.tensionDelta && fx.tensionDelta < 0);
    const isSecurityOrOrder = (fx.tensionDelta && fx.tensionDelta > 0);
    const isBudgetAusterity = (fx.revenueTreasury && fx.revenueTreasury > 0);

    const isPlayerRight = state.player.group === 'droite_nationale' || state.player.group === 'droite_republicaine';
    const isPlayerLeft = state.player.group === 'gauche_radicale' || state.player.group === 'gauche_sociale';

    const generatedBlocs: OppositionBloc[] = oppositionGroups.map(g => {
      const isHard = g.stanceTowardsPlayer === 'oppose_hard';
      const baseMultiplier = isHard ? 1.3 : 1.0;
      
      const isExtremeLeft = g.id === 'gauche_radicale';
      const isExtremeRight = g.id === 'droite_nationale';
      const isUnnatural = (isPlayerRight && isExtremeLeft) || (isPlayerLeft && isExtremeRight);

      let discount = 1.0;

      // Affinité idéologique avec le contenu de la loi
      if (g.id === 'gauche_radicale' || g.id === 'gauche_sociale') {
        if (isSocialSpending) discount -= 0.6; // Très favorable aux lois sociales/dépenses
        if (isBudgetAusterity) discount += 0.5; // Très hostile à la rigueur
      } else if (g.id === 'droite_republicaine') {
        if (isBudgetAusterity) discount -= 0.5; // Favorable aux recettes/économies
        if (isSocialSpending) discount += 0.4;
      } else if (g.id === 'droite_nationale') {
        if (isSecurityOrOrder) discount -= 0.6; // Favorable aux mesures d'ordre
      }

      discount = Math.max(0, discount);
      const finalMultiplier = baseMultiplier * discount;

      let demands: OppositionBloc['demands'] = { label: '' };

      if (isUnnatural) {
        // PACTE CONTRE-NATURE : Calme la rue mais crée un scandale politique (Trahison de la base)
        if (isExtremeLeft) {
          demands = {
            label: "Pacte Social d'Urgence : Blocage des prix & Amnistie syndicale",
            costTreasury: 4,
            tensionDelta: -10, // Gros apaisement de la rue
            costAuthority: 8,  // Capitulation politique
            popularityDelta: -3 // Désaveu des électeurs de droite
          };
        } else {
          demands = {
            label: "Pacte Sécuritaire : Renforcement des frontières & Peines planchers",
            costAuthority: 8,
            tensionDelta: 8,
            popularityDelta: -3 // Désaveu des électeurs de gauche
          };
        }
      } else if (finalMultiplier === 0) {
        demands = { label: "Accord Idéologique Direct (Soutien du projet)" };
      } else {
        switch(g.id) {
          case 'gauche_radicale':
            demands = {
              label: isSecurityOrOrder 
                ? "Garanties sur les libertés publiques & Droit de grève" 
                : "Revalorisation ciblée des minimas sociaux",
              costTreasury: isSocialSpending ? 2 : 4,
              tensionDelta: -6,
              costAuthority: Math.ceil(4 * finalMultiplier)
            };
            break;
          case 'gauche_sociale':
            demands = {
              label: isBudgetAusterity 
                ? "Sanctuarisation des budgets Éducation & Hôpital" 
                : "Garanties de justice fiscale & Climat",
              costTreasury: 2,
              costAuthority: Math.ceil(3 * finalMultiplier)
            };
            break;
          case 'centre_majorite':
            demands = {
              label: "Amendement de modération institutionnelle",
              costTreasury: 1,
              costAuthority: Math.ceil(2 * finalMultiplier)
            };
            break;
          case 'droite_republicaine':
            demands = {
              label: isSocialSpending 
                ? "Gages de maîtrise budgétaire sur les dépenses de fonctionnement" 
                : "Fermeté régalienne & Soutien aux forces de l'ordre",
              tensionDelta: 4,
              costAuthority: Math.ceil(3 * finalMultiplier)
            };
            break;
          case 'droite_nationale':
            demands = {
              label: "Priorité nationale sur l'attribution des aides publiques",
              tensionDelta: 6,
              costAuthority: Math.ceil(5 * finalMultiplier),
              popularityDelta: -1
            };
            break;
          case 'non_inscrits':
          default:
            demands = {
              label: "Subventions d'urgence aux collectivités territoriales",
              costTreasury: 1
            };
            break;
        }
      }

      return {
        id: g.id,
        name: g.name,
        shortName: g.shortName || g.name,
        seats: g.seats,
        color: g.color || '#64748b',
        isUnnatural: !!isUnnatural,
        demands,
        accepted: false
      };
    });

    // Trier par nombre de sièges (les plus gros en premier)
    generatedBlocs.sort((a, b) => b.seats - a.seats);

    setBlocs(generatedBlocs);
  }, [choice, state.parliament, state.player.group]);

  const isPassed = currentVotes >= neededVotes;

  const handleToggleBloc = (blocId: string) => {
    soundEffects.playStamp();
    setBlocs(prev => prev.map(b => {
      if (b.id !== blocId) return b;
      const willAccept = !b.accepted;
      
      // Calculate delta
      const seatsDelta = willAccept ? b.seats : -b.seats;
      const budgetDelta = willAccept ? (b.demands.costTreasury || 0) : -(b.demands.costTreasury || 0);
      const authDelta = willAccept ? (b.demands.costAuthority || 0) : -(b.demands.costAuthority || 0);
      const tensDelta = willAccept ? (b.demands.tensionDelta || 0) : -(b.demands.tensionDelta || 0);
      const popDelta = willAccept ? (b.demands.popularityDelta || 0) : -(b.demands.popularityDelta || 0);
      
      setCurrentVotes(v => v + seatsDelta);
      setSpentBudget(v => v + budgetDelta);
      setSpentAuthority(v => v + authDelta);
      setAddedTension(v => v + tensDelta);
      setAddedPopularity(v => v + popDelta);

      return { ...b, accepted: willAccept };
    }));
  };

  const handleConfirmAdoption = () => {
    soundEffects.playStamp();
    
    const concessionMessages: string[] = blocs
      .filter(b => b.accepted)
      .map(b => `${b.shortName} (${b.demands.label})`);

    onVoteSuccess(choice, {
      costTreasury: spentBudget,
      costAuthority: spentAuthority,
      tensionDelta: addedTension,
      popularityDelta: addedPopularity,
      concessionLog: concessionMessages
    });
  };

  // Rendu graphique brutaliste de l'hémicycle (5 rangées de points)
  const rows = [15, 20, 25, 30, 35]; // Nombre de sièges visibles simplifiés
  const totalGraphicSeats = rows.reduce((a, b) => a + b, 0); // 125
  const greenProportion = Math.min(1, currentVotes / 577);
  const greenSeatsCount = Math.round(greenProportion * totalGraphicSeats);

  let seatCounter = 0;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in font-mono overflow-y-auto">
      <div className="bg-[var(--bg-panel)] border-4 border-[var(--text-main)] max-w-4xl w-full p-4 sm:p-6 md:p-7 shadow-[10px_10px_0px_var(--text-main)] space-y-5 text-[var(--text-main)] relative my-auto">
        
        {/* Bouton Fermer */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 border-2 border-[var(--border-hard)] hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] transition-colors z-10 cursor-pointer"
          title="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 border-b-2 border-[var(--border-hard)] pb-3 pr-8 pl-8">
          <div className="flex items-center justify-center space-x-2 text-[var(--accent-purple)] font-bold text-xs uppercase tracking-wider">
            <Building2 className="w-4 h-4 shrink-0" />
            <span>PALAIS-BOURBON • SÉANCE DE VOTE SOLENNELLE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase font-display tracking-tight">
            Négociation Parlementaire
          </h2>
          <p className="text-xs font-sans opacity-90 max-w-2xl mx-auto leading-relaxed italic">
            Dossier : « {choice.label} »
          </p>
        </div>

        {/* Visualisation de l'Hémicycle */}
        <div className="bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] p-3 sm:p-4 flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
          
          {/* Arc de cercle des sièges */}
          <div className="flex flex-col items-center space-y-1.5 my-1">
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

        {/* Blocs d'Opposition */}
        {!isPassed ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase">
              <span className="text-[var(--accent-amber)] flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Négocier avec les groupes d'opposition (Majorité : 289) :</span>
              </span>
              <span className="text-[11px] font-mono opacity-80">
                Manque : <strong className="text-[var(--accent-red)]">{Math.max(0, neededVotes - currentVotes)}</strong> voix
              </span>
            </div>

            {/* Grille responsive 2 colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {blocs.map(bloc => {
                const isAffordable = state.authorityPoints >= (spentAuthority + (bloc.demands.costAuthority || 0)) &&
                                     state.economy.treasury >= (spentBudget + (bloc.demands.costTreasury || 0));

                return (
                  <button
                    key={bloc.id}
                    type="button"
                    disabled={!bloc.accepted && !isAffordable}
                    onClick={() => handleToggleBloc(bloc.id)}
                    className={`p-3.5 border-2 flex flex-col justify-between text-left transition-all relative overflow-hidden group ${
                      bloc.accepted 
                        ? 'bg-[var(--text-main)] text-[var(--bg-panel)] border-[var(--text-main)] shadow-[3px_3px_0px_var(--border-hard)]'
                        : !isAffordable
                        ? 'bg-[var(--bg-subtle)] border-[var(--border-hard)] opacity-40 cursor-not-allowed'
                        : 'bg-[var(--bg-panel)] border-[var(--border-hard)] hover:bg-[var(--bg-subtle)] shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer'
                    }`}
                  >
                    {/* Indicateur de couleur politique */}
                    <div 
                      className="absolute top-0 left-0 w-2 h-full opacity-90" 
                      style={{ backgroundColor: bloc.color }}
                    />
                    
                    <div className="pl-2.5 w-full">
                      {/* En-tête du groupe avec nom complet et badge de voix */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-display font-black text-xs sm:text-sm leading-snug break-words">
                              {bloc.name}
                            </h4>
                            {bloc.isUnnatural && (
                              <span className="px-1 py-0.5 bg-[var(--accent-red)] text-white font-bold text-[8px] uppercase tracking-wider flex items-center gap-0.5 shrink-0" title="Alliance contre-nature">
                                <Flame className="w-2.5 h-2.5" />
                                Risque
                              </span>
                            )}
                          </div>
                          <span className="text-[9px] uppercase font-mono opacity-70 block mt-0.5">
                            {bloc.shortName}
                          </span>
                        </div>
                        <div className="flex flex-col items-end shrink-0">
                          <span className={`px-2 py-0.5 font-mono text-xs font-black border ${
                            bloc.accepted 
                              ? 'bg-[var(--accent-emerald)] text-black border-[var(--accent-emerald)]' 
                              : 'bg-[var(--bg-subtle)] text-[var(--accent-purple)] border-[var(--border-hard)]'
                          }`}>
                            +{bloc.seats} voix
                          </span>
                          {bloc.accepted && (
                            <span className="text-[9px] font-bold text-[var(--accent-emerald)] flex items-center gap-0.5 mt-1">
                              <Check className="w-3 h-3 stroke-[3]" />
                              Rallié
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Exigences & Compromis */}
                      <div className="mt-2.5 pt-2 border-t border-current/20 space-y-1 font-mono text-[10px]">
                        <div className="font-bold opacity-85 uppercase text-[9px] leading-tight">
                          Exige : <span className="underline">{bloc.demands.label}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {bloc.demands.costTreasury ? (
                            <span className="px-1.5 py-0.5 bg-[var(--accent-red)]/15 border border-[var(--accent-red)]/40 text-[var(--accent-red)] font-bold">
                              -{bloc.demands.costTreasury} Mds € Budget
                            </span>
                          ) : null}
                          {bloc.demands.costAuthority ? (
                            <span className="px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] font-bold">
                              -{bloc.demands.costAuthority} Autorité
                            </span>
                          ) : null}
                          {bloc.demands.tensionDelta && bloc.demands.tensionDelta > 0 ? (
                            <span className="px-1.5 py-0.5 bg-[var(--accent-red)]/15 border border-[var(--accent-red)]/40 text-[var(--accent-red)] font-bold">
                              +{bloc.demands.tensionDelta} Tension
                            </span>
                          ) : null}
                          {bloc.demands.tensionDelta && bloc.demands.tensionDelta < 0 ? (
                            <span className="px-1.5 py-0.5 bg-[var(--accent-emerald)]/15 border border-[var(--accent-emerald)] text-[var(--accent-emerald)] font-bold">
                              {bloc.demands.tensionDelta} Tension (Paix sociale)
                            </span>
                          ) : null}
                          {bloc.demands.popularityDelta ? (
                            <span className="px-1.5 py-0.5 bg-[var(--accent-red)]/20 border border-[var(--accent-red)] text-[var(--accent-red)] font-bold">
                              {bloc.demands.popularityDelta}% Opinion (Désaveu du socle)
                            </span>
                          ) : null}
                          {!bloc.demands.costTreasury && !bloc.demands.costAuthority && !bloc.demands.tensionDelta && (
                            <span className="px-1.5 py-0.5 bg-[var(--accent-emerald)]/15 border border-[var(--accent-emerald)] text-[var(--accent-emerald)] font-bold">
                              ✓ Accord Idéologique Immédiat
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Alternative : Recours au 49.3 */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-[var(--border-hard)]">
              <span className="text-xs opacity-75 text-center sm:text-left">
                Refus des compromis ou manque de voix ?
              </span>
              <button
                type="button"
                onClick={() => { onCancel(); onUse49_3(); }}
                className="w-full sm:w-auto px-4 py-2.5 bg-[var(--accent-red)] text-white text-xs font-bold uppercase border-2 border-[var(--border-hard)] hover:bg-[var(--accent-red)]/80 flex items-center justify-center space-x-2 shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <Gavel className="w-4 h-4" />
                <span>Passer en force (Article 49.3)</span>
              </button>
            </div>
          </div>
        ) : (
          /* La loi est adoptée */
          <div className="space-y-4 animate-fade-in text-center py-2">
            <div className="p-4 bg-[var(--accent-emerald)]/15 border-2 border-[var(--accent-emerald)] text-[var(--accent-emerald)] font-bold text-xs sm:text-sm flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="uppercase tracking-wide">
                MAJORITÉ ATTEINTE ({currentVotes} VOIX) • PROJET DE LOI ADOPTÉ !
              </span>
            </div>

            <button
              type="button"
              onClick={handleConfirmAdoption}
              className="w-full py-3.5 bg-[var(--text-main)] text-[var(--bg-panel)] hover:bg-[var(--accent-emerald)] hover:text-white font-bold uppercase text-xs sm:text-sm border-2 border-[var(--border-hard)] shadow-[4px_4px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center space-x-2 transition-all cursor-pointer"
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
