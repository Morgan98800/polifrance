import React, { useState } from 'react';
import { GameState } from '../types/game';
import { soundEffects } from '../utils/audio';
import { Tv, Radio, MessageSquare, Award, ArrowRight, X, Users, Flame, TrendingUp } from 'lucide-react';

interface PresidentialAddressModalProps {
  state: GameState;
  onDeliverSpeech: (effects: {
    popularityDelta: number;
    tensionDelta: number;
    deficitDelta: number;
    authorityDelta: number;
    message: string;
  }) => void;
  onClose: () => void;
}

export const PresidentialAddressModal: React.FC<PresidentialAddressModalProps> = ({
  state,
  onDeliverSpeech,
  onClose
}) => {
  const [selectedSpeechIndex, setSelectedSpeechIndex] = useState<number | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [deliveredMessage, setDeliveredMessage] = useState<string | null>(null);

  const speechOptions = [
    {
      title: '1. « Fermeté Martiale & Appel à l\'Ordre Républicain »',
      description: 'Condamner fermement les blocages et rappeler que la loi votée par le Parlement doit s\'appliquer partout sans faiblesse.',
      posture: 'Autorité & Rigueur',
      effects: {
        popularityDelta: 4,
        tensionDelta: -12,
        deficitDelta: 0,
        authorityDelta: 15,
        message: 'Votre allocution de fermeté a rassuré les retraités et le patronat. Les blocages régressent légèrement.'
      }
    },
    {
      title: '2. « Empathie Sociale, Mea Culpa & Chèque d\'Urgence »',
      description: 'Reconnaître la souffrance des classes populaires et débloquer une aide financière immédiate de 2 milliards d\'euros.',
      posture: 'Compromis & Pouvoir d\'Achat',
      effects: {
        popularityDelta: 7,
        tensionDelta: -28,
        deficitDelta: 0.15,
        authorityDelta: -10,
        message: 'Votre geste social désamorce la grève générale. En contrepartie, Bercy s\'inquiète du dérapage budgétaire.'
      }
    },
    {
      title: '3. « Annonce d\'un Grand Référendum National »',
      description: 'Court-circuiter les partis politiques et redonner la parole directe au peuple souverain sur les grandes réformes.',
      posture: 'Coup de Poker Démocratique',
      effects: {
        popularityDelta: 10,
        tensionDelta: -20,
        deficitDelta: 0.05,
        authorityDelta: -25,
        message: 'L\'annonce du référendum crée un séisme politique. L\'opposition est prise de court et la ferveur démocratique remonte.'
      }
    }
  ];

  const handleSelectSpeech = (idx: number) => {
    soundEffects.playStamp();
    setSelectedSpeechIndex(idx);
    setIsBroadcasting(true);

    const speech = speechOptions[idx];
    setTimeout(() => {
      onDeliverSpeech(speech.effects);
      setDeliveredMessage(speech.effects.message);
      setIsBroadcasting(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-6 sm:p-8 shadow-[8px_8px_0px_var(--border-hard)] space-y-6 text-[var(--text-main)] font-mono">
        
        {/* En-tête de l'Allocution de 20h */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--border-hard)]">
          <div className="flex items-center space-x-2 text-[var(--accent-red)] font-bold">
            <span className="w-2.5 h-2.5 bg-[var(--accent-red)] rounded-full animate-ping"></span>
            <Tv className="w-5 h-5 stroke-[2]" />
            <span className="text-xs uppercase tracking-wider">DIRECT • ALLOCUTION PRÉSIDENTIELLE DE 20H00</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs opacity-70 hover:opacity-100 font-bold uppercase"
          >
            [ Fermer ]
          </button>
        </div>

        {/* Studio Élysée & Décor */}
        <div className="p-4 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] flex items-center space-x-4">
          <div className="w-16 h-16 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shrink-0 overflow-hidden shadow-[2px_2px_0px_var(--border-hard)]">
            {state.player?.avatar && (
              <img src={state.player.avatar} alt={state.player.name} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="min-w-0 flex-1 font-sans">
            <span className="text-[10px] font-mono font-bold uppercase text-[var(--accent-amber)] block">
              PALAIS DE L'ÉLYSÉE • SALON DORÉ
            </span>
            <h3 className="font-display font-black text-lg text-[var(--text-main)]">
              Le Président de la République s'adresse à la Nation
            </h3>
            <p className="text-xs opacity-75 font-mono">
              Audience estimée : <strong>23,4 Millions de téléspectateurs</strong> (TF1, France 2, BFMTV)
            </p>
          </div>
        </div>

        {/* Choix des Discours */}
        {!deliveredMessage ? (
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase opacity-70 block">
              CHOISISSEZ LA TONALITÉ DE VOTRE ALLOCUTION :
            </span>

            <div className="space-y-3">
              {speechOptions.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => !isBroadcasting && handleSelectSpeech(idx)}
                  className="cursor-pointer p-4 bg-[var(--bg-panel)] hover:bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between font-display font-black text-sm">
                    <span>{opt.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] group-hover:bg-[var(--text-main)] group-hover:text-[var(--bg-panel)]">
                      {opt.posture}
                    </span>
                  </div>
                  <p className="text-xs font-sans opacity-80 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Feedback de l'allocution */
          <div className="p-6 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] space-y-4 text-center">
            <div className="w-12 h-12 bg-[var(--accent-emerald)] text-white flex items-center justify-center mx-auto border-2 border-[var(--border-hard)] font-bold text-xl shadow-[3px_3px_0px_var(--border-hard)]">
              ✓
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-black text-xl text-[var(--accent-emerald)]">
                ALLOCUTION DIFFUSÉE AVEC SUCCÈS
              </h4>
              <p className="text-xs font-sans opacity-90 leading-relaxed max-w-md mx-auto">
                {deliveredMessage}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-[var(--text-main)] text-[var(--bg-panel)] font-bold text-xs uppercase border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
            >
              Retourner au Bureau Présidentiel
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
