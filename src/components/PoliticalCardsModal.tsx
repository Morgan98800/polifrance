import React, { useState } from 'react';
import { GameState, PoliticalCard } from '../types/game';
import { soundEffects } from '../utils/audio';
import { 
  FileText, Radio, Sparkles, Shield, Users, Wallet, 
  Flame, Landmark, X, Plus, AlertTriangle, CheckCircle2, Zap 
} from 'lucide-react';

interface PoliticalCardsModalProps {
  state: GameState;
  onPlayCard: (cardId: string) => void;
  onDrawCard: () => void;
  onClose: () => void;
}

export const PoliticalCardsModal: React.FC<PoliticalCardsModalProps> = ({
  state,
  onPlayCard,
  onDrawCard,
  onClose
}) => {
  const [selectedCard, setSelectedCard] = useState<PoliticalCard | null>(null);
  const [justPlayedMessage, setJustPlayedMessage] = useState<string | null>(null);

  const cards = state.tacticalCards || [];
  const canDraw = cards.length < 4 && state.authorityPoints >= 25;

  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-5 h-5 text-[var(--accent-amber)]" />;
      case 'Radio': return <Radio className="w-5 h-5 text-[var(--accent-red)]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[var(--accent-purple)]" />;
      case 'Shield': return <Shield className="w-5 h-5 text-[var(--accent-blue)]" />;
      case 'Users': return <Users className="w-5 h-5 text-[var(--accent-emerald)]" />;
      case 'Wallet': return <Wallet className="w-5 h-5 text-[var(--accent-amber)]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[var(--accent-red)]" />;
      default: return <Landmark className="w-5 h-5 text-[var(--text-main)]" />;
    }
  };

  const handleExecutePlay = (card: PoliticalCard) => {
    soundEffects.playStamp();
    onPlayCard(card.id);
    setJustPlayedMessage(`Manœuvre déclenchée : ${card.effects.message}`);
    setSelectedCard(null);
    setTimeout(() => setJustPlayedMessage(null), 4000);
  };

  const handleDraw = () => {
    soundEffects.playKeystroke();
    onDrawCard();
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in font-mono overflow-y-auto">
      <div className="bg-[var(--bg-panel)] border-4 border-[var(--text-main)] max-w-4xl w-full p-5 sm:p-7 shadow-[10px_10px_0px_var(--text-main)] space-y-6 text-[var(--text-main)] relative my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 border-2 border-[var(--border-hard)] hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] transition-colors z-10 cursor-pointer"
          title="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* En-tête Cabinet Noir */}
        <div className="text-center space-y-1.5 border-b-2 border-[var(--border-hard)] pb-4 pr-8 pl-8">
          <div className="flex items-center justify-center space-x-2 text-[var(--accent-red)] font-bold text-xs uppercase tracking-wider">
            <Shield className="w-4 h-4 shrink-0" />
            <span>CONFIDENTIEL DÉFENSE • CELLULE ÉLYSÉENNE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase font-display tracking-tight">
            Le Cabinet Noir & Manœuvres Politiques
          </h2>
          <p className="text-xs font-sans opacity-85 max-w-2xl mx-auto leading-relaxed">
            Dégainez des coups politiques machiavéliques pour neutraliser les oppositions, étouffer des scandales ou retourner l'opinion publique.
          </p>
        </div>

        {/* Barre d'état & Bouton Piocher */}
        <div className="p-3 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center space-x-4">
            <span>
              Cartes en main : <strong>{cards.length}/4</strong>
            </span>
            <span>
              Autorité : <strong className="text-[var(--accent-amber)]">{state.authorityPoints} pts</strong>
            </span>
          </div>

          <button
            type="button"
            disabled={!canDraw}
            onClick={handleDraw}
            className="px-3.5 py-1.5 bg-[var(--text-main)] text-[var(--bg-panel)] hover:bg-[var(--accent-purple)] hover:text-white font-bold text-xs uppercase border border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-center space-x-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Piocher une Manœuvre (25 pts)</span>
          </button>
        </div>

        {/* Message de succès */}
        {justPlayedMessage && (
          <div className="p-3.5 bg-[var(--bg-subtle)] border-2 border-[var(--accent-emerald)] text-[var(--accent-emerald)] font-bold text-xs flex items-center space-x-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{justPlayedMessage}</span>
          </div>
        )}

        {/* Grille des Cartes en Main */}
        {cards.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-[var(--border-hard)] opacity-70 space-y-2">
            <p className="font-bold text-sm">Votre main est vide.</p>
            <p className="text-xs font-sans">Piochez une nouvelle manœuvre ci-dessus avec vos points d'Autorité.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map(card => {
              const canAfford = state.authorityPoints >= card.authorityCost;

              return (
                <div
                  key={card.id}
                  className="p-4 sm:p-5 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[4px_4px_0px_var(--border-hard)] flex flex-col justify-between space-y-4 hover:border-[var(--accent-purple)] transition-all"
                >
                  <div>
                    {/* Header Carte */}
                    <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[var(--border-hard)]/30">
                      <div className="flex items-center space-x-2.5">
                        <div className="p-2 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
                          {getCardIcon(card.icon)}
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-mono font-bold opacity-60 block">
                            {card.category}
                          </span>
                          <h3 className="font-display font-black text-sm sm:text-base leading-snug">
                            {card.name}
                          </h3>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 text-[10px] font-bold border shrink-0 ${
                        canAfford 
                          ? 'bg-[var(--accent-amber)]/15 text-[var(--accent-amber)] border-[var(--accent-amber)]'
                          : 'bg-[var(--accent-red)]/15 text-[var(--accent-red)] border-[var(--accent-red)]'
                      }`}>
                        {card.authorityCost} PTS
                      </span>
                    </div>

                    {/* Description & Citation Machiavélique */}
                    <p className="text-xs font-sans opacity-90 leading-relaxed mt-2.5 mb-2">
                      {card.description}
                    </p>
                    <div className="p-2 bg-[var(--bg-subtle)] border-l-2 border-[var(--accent-purple)] text-[11px] font-serif italic opacity-85">
                      {card.flavor}
                    </div>
                  </div>

                  {/* Bouton d'action */}
                  <div className="pt-2 border-t border-[var(--border-hard)]/30">
                    <button
                      type="button"
                      disabled={!canAfford}
                      onClick={() => handleExecutePlay(card)}
                      className="w-full py-2.5 bg-[var(--text-main)] text-[var(--bg-panel)] hover:bg-[var(--accent-red)] hover:text-white font-bold uppercase text-xs border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Déclencher la Manœuvre ({card.authorityCost} pts)</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
