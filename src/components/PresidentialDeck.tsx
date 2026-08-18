import React, { useState } from 'react';
import { GameState } from '../types/game';
import { soundEffects } from '../utils/audio';
import { ShieldAlert, Users, Sparkles, Check, Lock, Zap } from 'lucide-react';

interface PresidentialDeckProps {
  state: GameState;
  onUseCard: (cardId: string, effects: {
    popularityDelta?: number;
    tensionDelta?: number;
    authorityCost: number;
    seatsBonus?: number;
    message: string;
  }) => void;
}

export const PresidentialDeck: React.FC<PresidentialDeckProps> = ({ state, onUseCard }) => {
  const [usedCards, setUsedCards] = useState<string[]>([]);
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null);

  const cards = [
    {
      id: 'article_16',
      name: '🛡️ ARTICLE 16 : PLEINS POUVOIRS',
      tag: 'Ordre Public',
      cost: 25,
      desc: 'Mesure d\'exception : brise immédiatement les grèves et bloque la contestation.',
      effectSummary: 'Grève -35% • Autorité +10',
      apply: () => ({
        tensionDelta: -35,
        authorityCost: 25,
        message: 'Article 16 engagé : L\'ordre public est rétabli par décret présidentiel.'
      })
    },
    {
      id: 'accord_maires',
      name: '🤝 PACTE DES TERRITOIRES',
      tag: 'Majorité 577',
      cost: 20,
      desc: 'Négociation secrète avec l\'Association des Maires : rallie des députés indécis.',
      effectSummary: '+35 Députés ralliés',
      apply: () => ({
        seatsBonus: 35,
        authorityCost: 20,
        message: 'Pacte territorial conclu : 35 députés modérés rejoignent votre majorité.'
      })
    },
    {
      id: 'fuite_presse',
      name: '🦆 FUITE DANS LA PRESSE',
      tag: 'Contre-Feu',
      cost: 15,
      desc: 'Divulguer un dossier compromettant sur l\'opposition pour reprendre la main.',
      effectSummary: 'Opinion +6% • Tension -15%',
      apply: () => ({
        popularityDelta: 6,
        tensionDelta: -15,
        authorityCost: 15,
        message: 'Révélations dans les médias : L\'opposition est déstabilisée (+6% opinion).'
      })
    }
  ];

  const handleTriggerCard = (card: typeof cards[0]) => {
    if (usedCards.includes(card.id) || state.authorityPoints < card.cost) return;

    soundEffects.playStamp();
    const result = card.apply();
    onUseCard(card.id, result);
    setUsedCards(prev => [...prev, card.id]);
    setActiveFeedback(result.message);

    setTimeout(() => setActiveFeedback(null), 4000);
  };

  return (
    <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-4 shadow-[4px_4px_0px_var(--border-hard)] space-y-3 font-mono text-xs">
      
      {/* En-tête du Deck */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hard)]">
        <div className="flex items-center space-x-2 font-bold uppercase tracking-wider">
          <Zap className="w-4 h-4 text-[var(--accent-amber)]" />
          <span>CARTES TACTIQUES D'INTERVENTION D'ÉTAT (USAGE UNIQUE)</span>
        </div>
        <span className="text-[10px] opacity-70">
          Autorité dispo : <strong>{state.authorityPoints} pts</strong>
        </span>
      </div>

      {/* Message de succès */}
      {activeFeedback && (
        <div className="p-2.5 bg-[var(--bg-subtle)] border border-[var(--accent-emerald)] text-[var(--accent-emerald)] font-bold text-xs flex items-center space-x-2 animate-in fade-in duration-150">
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>{activeFeedback}</span>
        </div>
      )}

      {/* Grille des 3 cartes tactiques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {cards.map((card) => {
          const isUsed = usedCards.includes(card.id);
          const canAfford = state.authorityPoints >= card.cost;
          const isAvailable = !isUsed && canAfford;

          return (
            <div
              key={card.id}
              onClick={() => isAvailable && handleTriggerCard(card)}
              className={`p-3.5 border-2 transition-all flex flex-col justify-between space-y-2.5 ${
                isUsed
                  ? 'opacity-40 border-[var(--border-hard)]/30 bg-[var(--bg-subtle)] cursor-not-allowed'
                  : isAvailable
                    ? 'border-[var(--border-hard)] bg-[var(--bg-panel)] hover:bg-[var(--bg-subtle)] shadow-[3px_3px_0px_var(--border-hard)] cursor-pointer active:translate-x-[2px] active:translate-y-[2px]'
                    : 'opacity-60 border-[var(--border-hard)]/50 bg-[var(--bg-subtle)] cursor-not-allowed'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
                    {card.tag}
                  </span>
                  <span className={`text-[10px] font-bold ${canAfford ? 'text-[var(--accent-amber)]' : 'text-[var(--accent-red)]'}`}>
                    Coût: {card.cost} pts
                  </span>
                </div>

                <h4 className="font-display font-black text-xs sm:text-sm text-[var(--text-main)] mt-1">
                  {card.name}
                </h4>

                <p className="text-[11px] font-sans opacity-75 mt-1 leading-snug">
                  {card.desc}
                </p>
              </div>

              {/* Résumé de l'effet & Bouton */}
              <div className="pt-2 border-t border-[var(--border-hard)]/20 flex items-center justify-between">
                <span className="text-[10px] font-bold text-[var(--accent-emerald)]">
                  {card.effectSummary}
                </span>

                <button
                  type="button"
                  disabled={!isAvailable}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase border border-[var(--border-hard)] ${
                    isUsed 
                      ? 'bg-transparent text-gray-500 border-gray-400' 
                      : isAvailable 
                        ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[1px_1px_0px_var(--border-hard)]' 
                        : 'bg-transparent opacity-50'
                  }`}
                >
                  {isUsed ? 'Utilisé' : 'Activer'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
