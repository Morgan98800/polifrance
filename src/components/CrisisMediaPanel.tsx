import React, { useState } from 'react';
import { GameState } from '../types/game';
import { 
  Radio, Send, TrendingUp, TrendingDown, 
  ShieldAlert, Check, Newspaper, MessageSquare, 
  Flame, Sparkles, Clock, AlertCircle, ArrowRight
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface MediaReaction {
  id: string;
  label: string;
  desc: string;
  effects: {
    popularityDelta?: number;
    tensionDelta?: number;
    deficitDelta?: number;
    authorityCost?: number;
    message: string;
  };
}

interface NewsItem {
  id: string;
  time: string;
  category: string;
  source: string;
  title: string;
  summary: string;
  reactions: MediaReaction[];
}

interface CrisisMediaPanelProps {
  state: GameState;
  onResolveChoice?: (choice: any) => void;
  onApplyReaction?: (reaction: {
    popularityDelta?: number;
    tensionDelta?: number;
    deficitDelta?: number;
    authorityCost?: number;
    message: string;
  }) => void;
}

export const CrisisMediaPanel: React.FC<CrisisMediaPanelProps> = ({ state, onApplyReaction }) => {
  const [reactedNewsIds, setReactedNewsIds] = useState<string[]>([]);
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null);

  const strikeRisk = state.social?.strikeRisk || 0;
  const deficit = Math.abs(state.economy?.deficit || 0);
  const popularity = state.popularity || 25;

  // Dépêches d'actualité dynamiques selon l'état actuel de la France
  const newsItems: NewsItem[] = [
    {
      id: 'news_social',
      time: '14:22',
      category: 'SOCIAL & POUVOIR D\'ACHAT',
      source: 'AFP URGENT',
      title: strikeRisk > 60 
        ? 'Appel intersyndical à une journée de mobilisation nationale sur les salaires'
        : 'Les syndicats demandent une revalorisation ciblée du pouvoir d\'achat',
      summary: strikeRisk > 60
        ? 'Les cortèges s\'organisent dans les grandes métropoles. Les centrales syndicales dénoncent le coût de la vie et menacent de bloquer les transports ferroviaires.'
        : 'Les représentants des salariés demandent l\'ouverture rapide de négociations salariales de branche sous l\'égide du ministère du Travail.',
      reactions: [
        {
          id: 'react_dialogue',
          label: '🤝 Ouvrir une table ronde à Matignon',
          desc: 'Convoquer les syndicats pour négocier un accord d\'apaisement social.',
          effects: {
            popularityDelta: 3,
            tensionDelta: -18,
            deficitDelta: 0.08,
            authorityCost: 5,
            message: 'Matignon annonce l\'ouverture d\'une concertation sociale : La tension retombe immédiatement (-18%).'
          }
        },
        {
          id: 'react_fermete',
          label: '🎙️ Déclaration de fermeté républicaine',
          desc: 'Rappeler sur les plateaux TV que les blocages ne feront pas plier l\'État.',
          effects: {
            popularityDelta: 2,
            tensionDelta: 10,
            authorityCost: 0,
            message: 'Prise de parole martiale : Votre électorat salue l\'autorité, mais la contestation se durcit (+10 tension).'
          }
        },
        {
          id: 'react_cheque',
          label: '💶 Débloquer un chèque d\'urgence énergie',
          desc: 'Aide directe de 150€ pour les 4 millions de foyers les plus modestes.',
          effects: {
            popularityDelta: 5,
            tensionDelta: -10,
            deficitDelta: 0.20,
            authorityCost: 10,
            message: 'Chèque énergie débloqué : Ferveur dans l\'opinion (+5%), mais le déficit public augmente de +0.2%.'
          }
        }
      ]
    },
    {
      id: 'news_economy',
      time: '11:45',
      category: 'ÉCONOMIE & BERCY',
      source: 'LES ÉCHOS / AFP',
      title: deficit > 5.0
        ? 'Alerte budgétaire : La Commission européenne place la France sous surveillance accrue'
        : 'Stabilité des marchés : Les investisseurs saluent la tenue des comptes publics',
      summary: deficit > 5.0
        ? 'Bruxelles demande des gages de sérieux budgétaire pour 2027. Le spread de taux d\'emprunt avec l\'Allemagne commence à frémir à la hausse.'
        : 'L\'agence Standard & Poor\'s souligne la résilience de l\'économie française, tout en recommandant de poursuivre la maîtrise des dépenses.',
      reactions: [
        {
          id: 'react_audit',
          label: '📋 Ordonner une revue des dépenses publiques',
          desc: 'Mandater la Cour des Comptes pour identifier 5 Mds € d\'économies.',
          effects: {
            popularityDelta: 1,
            deficitDelta: -0.3,
            tensionDelta: 5,
            authorityCost: 5,
            message: 'Revue des dépenses lancée : Les agences de notation saluent la rigueur (-0.3% déficit).'
          }
        },
        {
          id: 'react_invest',
          label: '🏭 Plan d\'investissement dans l\'industrie et la transition',
          desc: 'Soutien direct aux usines et à l\'innovation technologique.',
          effects: {
            popularityDelta: 4,
            deficitDelta: 0.15,
            authorityCost: 10,
            message: 'Plan industriel dévoilé : Le CAC 40 grimpe et votre popularité progresse (+4%).'
          }
        }
      ]
    },
    {
      id: 'news_politics',
      time: '09:15',
      category: 'POLITIQUE NATIONALE',
      source: 'LE MONDE / AFP',
      title: 'Tractations à l\'Assemblée : L\'opposition tente de former un front uni',
      summary: 'Les chefs de groupes parlementaires d\'opposition multiplient les réunions en coulisses pour contester les prochains arbitrages du gouvernement.',
      reactions: [
        {
          id: 'react_pacte',
          label: '🤝 Tendre la main aux centristes et modérés',
          desc: 'Accorder des compromis d\'amendements pour élargir le socle présidentiel.',
          effects: {
            popularityDelta: 2,
            tensionDelta: -5,
            authorityCost: 5,
            message: 'Compromis parlementaire trouvé : Le climat politique s\'apaise.'
          }
        },
        {
          id: 'react_interview',
          label: '📺 Grande Interview au JT de 20h',
          desc: 'S\'adresser directement aux Français pour court-circuiter les partis.',
          effects: {
            popularityDelta: 4,
            tensionDelta: 0,
            authorityCost: 8,
            message: 'Audience record au 20h : Votre incarnation présidentielle gagne +4% d\'adhésion.'
          }
        }
      ]
    }
  ];

  const handleTriggerReaction = (newsId: string, reaction: MediaReaction) => {
    if (reactedNewsIds.includes(newsId)) return;

    soundEffects.playAfpNotification();
    if (onApplyReaction) {
      onApplyReaction(reaction.effects);
    }
    setReactedNewsIds(prev => [...prev, newsId]);
    setActiveFeedback(reaction.effects.message);

    setTimeout(() => setActiveFeedback(null), 5000);
  };

  return (
    <div className="space-y-5 text-[var(--text-main)] font-sans">
      
      {/* En-tête Salle de Presse */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-4 sm:p-5 shadow-[4px_4px_0px_var(--border-hard)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[var(--accent-red)] text-white flex items-center justify-center font-bold text-sm shrink-0">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[var(--accent-red)] text-white uppercase">
                Salle de Presse
              </span>
              <span className="font-mono text-xs opacity-70">
                Agence France-Presse (AFP)
              </span>
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl tracking-tight mt-0.5">
              Fil d'Actualité & Réaction Médiatique
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="px-3 py-1 bg-[var(--bg-subtle)] border border-[var(--border-hard)] font-bold">
            🔴 En Direct
          </span>
        </div>
      </div>

      {/* Message de confirmation de la réaction */}
      {activeFeedback && (
        <div className="p-4 bg-[var(--bg-panel)] border-2 border-[var(--accent-emerald)] shadow-[3px_3px_0px_var(--accent-emerald)] text-[var(--accent-emerald)] font-medium text-xs sm:text-sm flex items-start space-x-3 animate-in fade-in duration-200">
          <Check className="w-5 h-5 shrink-0 mt-0.5 stroke-[2.5]" />
          <div>
            <strong className="font-bold block uppercase text-xs">Riposte Médiatique Enregistrée :</strong>
            <span>{activeFeedback}</span>
          </div>
        </div>
      )}

      {/* 1. LES DÉPÊCHES INTERACTIVES : LE PRÉSIDENT PEUT AGIR */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)]">
          <div className="flex items-center space-x-2">
            <Flame className="w-4 h-4 text-[var(--accent-red)]" />
            <h3 className="font-display font-bold text-base uppercase">
              Dépêches Récentes & Ripostes du Président
            </h3>
          </div>
          <span className="text-xs font-mono opacity-70">Décidez d'intervenir pour orienter l'opinion</span>
        </div>

        <div className="space-y-4">
          {newsItems.map((item) => {
            const hasReacted = reactedNewsIds.includes(item.id);

            return (
              <div 
                key={item.id}
                className={`bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] space-y-4 transition-all ${
                  hasReacted ? 'opacity-70 bg-[var(--bg-subtle)]/50' : ''
                }`}
              >
                {/* En-tête dépêche */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[var(--accent-red)]">{item.time}</span>
                    <span className="opacity-40">•</span>
                    <span className="font-bold uppercase px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] text-[10px]">
                      {item.category}
                    </span>
                    <span className="opacity-40">•</span>
                    <span className="opacity-70">{item.source}</span>
                  </div>

                  {hasReacted && (
                    <span className="text-[10px] font-bold text-[var(--accent-emerald)] px-2 py-0.5 bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]">
                      ✓ Riposte effectuée
                    </span>
                  )}
                </div>

                {/* Titre & Contenu */}
                <div className="space-y-1.5">
                  <h4 className="font-display font-black text-base sm:text-lg text-[var(--text-main)]">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm opacity-85 leading-relaxed font-sans">
                    {item.summary}
                  </p>
                </div>

                {/* Options d'intervention du Président */}
                {!hasReacted ? (
                  <div className="pt-3 border-t border-[var(--border-hard)]/40 space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase opacity-75 block">
                      ⚡ Choisir une posture présidentielle :
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {item.reactions.map((react) => (
                        <button
                          key={react.id}
                          type="button"
                          onClick={() => handleTriggerReaction(item.id, react)}
                          className="p-3 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] text-left flex flex-col justify-between space-y-2 transition-all group"
                        >
                          <div>
                            <span className="font-bold text-xs block text-[var(--text-main)] group-hover:text-[var(--accent-blue)]">
                              {react.label}
                            </span>
                            <p className="text-[11px] opacity-75 mt-1 leading-snug">
                              {react.desc}
                            </p>
                          </div>

                          {/* Impact chiffré */}
                          <div className="pt-1.5 border-t border-[var(--border-hard)]/20 flex flex-wrap gap-1 font-mono text-[10px]">
                            {react.effects.popularityDelta && (
                              <span className="text-[var(--accent-emerald)] font-bold">
                                +{react.effects.popularityDelta}% Pop.
                              </span>
                            )}
                            {react.effects.tensionDelta && (
                              <span className={react.effects.tensionDelta < 0 ? 'text-[var(--accent-emerald)]' : 'text-[var(--accent-red)]'}>
                                {react.effects.tensionDelta > 0 ? `+${react.effects.tensionDelta}` : react.effects.tensionDelta} Tension
                              </span>
                            )}
                            {react.effects.deficitDelta && (
                              <span className="text-[var(--accent-amber)] font-bold">
                                +{react.effects.deficitDelta}% Déficit
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 text-xs font-mono text-[var(--text-muted)] italic">
                    Cette dépêche a été traitée par le cabinet présidentiel.
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* 2. KIOSQUE DE PRESSE NATIONALE (À LA UNE) */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b-2 border-[var(--border-hard)]">
          <Newspaper className="w-5 h-5 text-[var(--accent-amber)]" />
          <h3 className="font-display font-bold text-base uppercase">
            Kiosque de la Presse Nationale
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
          
          {/* Le Figaro */}
          <div className="p-3 bg-[var(--bg-subtle)] border border-[var(--border-hard)] space-y-1.5">
            <span className="font-bold text-[10px] text-[#1D3557] uppercase block">LE FIGARO</span>
            <p className="font-serif italic text-xs leading-snug">
              « {popularity > 40 ? 'L\'autorité présidentielle s\'installe avec fermeté' : 'L\'Élysée sous la pression de la grogne territoriale et du budget'} »
            </p>
          </div>

          {/* Le Monde */}
          <div className="p-3 bg-[var(--bg-subtle)] border border-[var(--border-hard)] space-y-1.5">
            <span className="font-bold text-[10px] uppercase block">LE MONDE</span>
            <p className="font-serif italic text-xs leading-snug">
              « {deficit > 5.0 ? 'Alerte sur les comptes : Le gouvernement au défi de la crédibilité' : 'Le délicat compromis politique d\'un quinquennat sous surveillance'} »
            </p>
          </div>

          {/* Les Échos */}
          <div className="p-3 bg-[var(--bg-subtle)] border border-[var(--border-hard)] space-y-1.5">
            <span className="font-bold text-[10px] text-[var(--accent-blue)] uppercase block">LES ÉCHOS</span>
            <p className="font-serif italic text-xs leading-snug">
              « Marchés financiers : Le CAC 40 scrute les arbitrages fiscaux de l'exécutif »
            </p>
          </div>

          {/* Libération */}
          <div className="p-3 bg-[var(--bg-subtle)] border border-[var(--border-hard)] space-y-1.5">
            <span className="font-bold text-[10px] text-[var(--accent-red)] uppercase block">LIBÉRATION</span>
            <p className="font-serif italic text-xs leading-snug">
              « {strikeRisk > 50 ? 'La rue maintient la pression contre la rigueur budgétaire' : 'Le dialogue social en quête d\'un nouveau souffle républicain'} »
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
