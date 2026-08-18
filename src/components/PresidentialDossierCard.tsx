import React, { useState } from 'react';
import { GameEvent, GameEventChoice } from '../types/game';
import { 
  FileText, ArrowRight, Sparkles, CheckCircle2, 
  AlertTriangle, Shield, TrendingUp, TrendingDown, Users 
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface PresidentialDossierCardProps {
  event: GameEvent | null;
  turnNumber: number;
  onSelectChoice: (choice: GameEventChoice) => void;
}

export const PresidentialDossierCard: React.FC<PresidentialDossierCardProps> = ({
  event,
  turnNumber,
  onSelectChoice
}) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  if (!event) {
    return (
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-8 shadow-[4px_4px_0px_var(--border-hard)] text-center text-[var(--text-main)] space-y-3">
        <CheckCircle2 className="w-10 h-10 text-[var(--pol-ecolo)] mx-auto stroke-[2]" />
        <h3 className="font-serif font-bold text-lg">Aucun dossier en attente sur votre bureau</h3>
        <p className="text-xs font-mono opacity-70 max-w-md mx-auto">
          Les ministères travaillent sur les réformes en cours. Vous pouvez examiner la session parlementaire ou passer au tour suivant.
        </p>
      </div>
    );
  }

  const getMinistryHeader = (cat: string) => {
    switch (cat) {
      case 'economique':
        return { name: 'MINISTÈRE DE L\'ÉCONOMIE (BERCY)', code: 'BERCY-URGENT', color: 'border-[var(--pol-centre)]' };
      case 'social':
        return { name: 'MINISTÈRE DU TRAVAIL & MATIGNON', code: 'SOCIAL-ALERTE', color: 'border-[var(--pol-gauche)]' };
      case 'international':
        return { name: 'QUAI D\'ORSAY & AFFAIRES EUROPÉENNES', code: 'UE-DIPLOMATIE', color: 'border-[var(--pol-droite)]' };
      default:
        return { name: 'PALAIS DE L\'ÉLYSÉE • SECRÉTARIAT GÉNÉRAL', code: 'ÉLYSÉE-DÉCISION', color: 'border-[var(--border-hard)]' };
    }
  };

  const ministry = getMinistryHeader(event.category || 'politique');

  const handleApplyChoice = (choice: GameEventChoice) => {
    soundEffects.playStamp();
    onSelectChoice(choice);
    setSelectedChoiceId(null);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    soundEffects.playStamp();
    const customChoice: GameEventChoice = {
      id: `custom_${Date.now()}`,
      label: `Arbitrage : ${customText.slice(0, 45)}...`,
      description: customText,
      costInfluence: 10,
      effects: {
        popularityDelta: 3,
        demographicsDelta: { cadres: 2, populaires: 2 },
        tensionDelta: -5,
        deficitDelta: 0.05,
        message: `Votre arbitrage présidentiel sur-mesure (« ${customText} ») est promulgué.`
      }
    };
    onSelectChoice(customChoice);
  };

  return (
    <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 sm:p-6 shadow-[4px_4px_0px_var(--border-hard)] space-y-5 text-[var(--text-main)]">
      
      {/* En-Tête du Dossier Administratif */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-[var(--border-hard)]">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] inline-block">
            {ministry.name}
          </span>
          <span className="font-mono text-xs opacity-60 ml-2">DOSSIER T{turnNumber}-#0{event.id.slice(-2) || '01'}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] uppercase">
            {event.category.toUpperCase()}
          </span>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[var(--text-main)] text-[var(--bg-panel)] uppercase">
            PRIORITÉ ÉTAT
          </span>
        </div>
      </div>

      {/* Titre & Description Claire du Dossier */}
      <div>
        <h2 className="font-serif font-black text-xl sm:text-2xl text-[var(--text-main)] leading-snug">
          {event.title}
        </h2>
        <div className="mt-2.5 p-3.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] font-serif italic text-xs sm:text-sm leading-relaxed">
          “{event.description}”
        </div>
      </div>

      {/* Les 2 ou 3 Cartes d'Arbitrage Tranchées */}
      <div className="space-y-3 pt-1">
        <span className="font-mono text-xs font-bold uppercase tracking-wider block opacity-70">
          CHOISISSEZ VOTRE ARBITRAGE PRÉSIDENTIEL :
        </span>

        <div className="grid grid-cols-1 gap-2.5">
          {event.choices.map((choice, idx) => {
            const isSelected = selectedChoiceId === choice.id;
            const letter = String.fromCharCode(65 + idx); // A, B, C

            return (
              <div
                key={choice.id}
                onClick={() => setSelectedChoiceId(choice.id)}
                className={`cursor-pointer p-3.5 border-2 transition-all text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[var(--bg-subtle)] border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] translate-x-[-1px] translate-y-[-1px]'
                    : 'bg-[var(--bg-panel)] border-[var(--border-hard)] hover:bg-[var(--bg-subtle)] active:translate-x-[2px] active:translate-y-[2px]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-[var(--text-main)] text-[var(--bg-panel)] flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      {letter}
                    </span>
                    <div>
                      <h4 className="font-sans font-bold text-sm text-[var(--text-main)] leading-tight">
                        {choice.label}
                      </h4>
                      {choice.description && (
                        <p className="text-xs font-sans opacity-80 mt-1 leading-snug">
                          {choice.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bouton Valider Immédiat si sélectionné */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyChoice(choice);
                    }}
                    className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] font-mono font-bold text-xs uppercase border border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shrink-0"
                  >
                    Promulguer ➔
                  </button>
                </div>

                {/* Aperçu des Impacts Directs (Gains en vert, Coûts en rouge) */}
                {choice.effects && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-[var(--border-hard)]/20 font-mono text-[11px]">
                    {choice.effects.popularityDelta !== undefined && (
                      <span className={`px-1.5 py-0.5 border border-[var(--border-hard)] font-bold ${
                        choice.effects.popularityDelta >= 0 ? 'bg-[var(--pol-ecolo)] text-[#FFFFFF]' : 'bg-[var(--pol-gauche)] text-[#FFFFFF]'
                      }`}>
                        Opinion : {choice.effects.popularityDelta >= 0 ? `+${choice.effects.popularityDelta}` : choice.effects.popularityDelta}%
                      </span>
                    )}

                    {choice.effects.tensionDelta !== undefined && (
                      <span className={`px-1.5 py-0.5 border border-[var(--border-hard)] font-bold ${
                        choice.effects.tensionDelta <= 0 ? 'bg-[var(--pol-ecolo)] text-[#FFFFFF]' : 'bg-[var(--pol-gauche)] text-[#FFFFFF]'
                      }`}>
                        Tension : {choice.effects.tensionDelta > 0 ? `+${choice.effects.tensionDelta}` : choice.effects.tensionDelta} pts
                      </span>
                    )}

                    {choice.effects.deficitDelta !== undefined && (
                      <span className={`px-1.5 py-0.5 border border-[var(--border-hard)] font-bold ${
                        choice.effects.deficitDelta <= 0 ? 'bg-[var(--pol-ecolo)] text-[#FFFFFF]' : 'bg-[var(--pol-gauche)] text-[#FFFFFF]'
                      }`}>
                        Déficit : {choice.effects.deficitDelta > 0 ? `+${choice.effects.deficitDelta}%` : `${choice.effects.deficitDelta}%`}
                      </span>
                    )}

                    {choice.costInfluence ? (
                      <span className="px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] font-bold">
                        Coût : {choice.costInfluence} pts d'autorité
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Option d'Arbitrage Libre */}
        <div className="pt-2">
          {!isCustomMode ? (
            <button
              onClick={() => setIsCustomMode(true)}
              className="w-full py-2 px-3 bg-[var(--bg-panel)] hover:bg-[var(--bg-subtle)] border-2 border-dashed border-[var(--border-hard)] font-mono text-xs font-bold uppercase flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[2]" />
              <span>Rédiger une décision sur-mesure (Saisie libre)</span>
            </button>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-2 font-mono text-xs">
              <textarea
                rows={2}
                placeholder="Votre arbitrage présidentiel personnalisé..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] p-2 text-xs focus:outline-none font-sans"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  className="py-1 px-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!customText.trim()}
                  className="py-1 px-3.5 bg-[var(--text-main)] text-[var(--bg-panel)] font-bold uppercase border border-[var(--border-hard)]"
                >
                  Signer le Décret
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
