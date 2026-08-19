import React, { useState } from 'react';
import { ShieldAlert, BarChart3, Users, Scale, CheckCircle2, ArrowRight, ArrowLeft, BookOpen, AlertTriangle } from 'lucide-react';
import { Candidate } from '../types/game';
import { soundEffects } from '../utils/audio';

interface OnboardingModalProps {
  player: Candidate;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ player, onClose }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    soundEffects.playStamp();
    setStep(s => Math.min(totalSteps, s + 1));
  };

  const handlePrev = () => {
    soundEffects.playStamp();
    setStep(s => Math.max(1, s - 1));
  };

  const handleStart = () => {
    soundEffects.playKeystroke();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-[var(--bg-panel)] border-4 border-[var(--text-main)] max-w-2xl w-full p-6 shadow-[8px_8px_0px_var(--text-main)] space-y-6 flex flex-col min-h-[500px]">
        
        {/* Header */}
        <div className="text-center space-y-2 border-b-2 border-[var(--border-hard)] pb-4">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--text-main)] flex items-center justify-center space-x-3">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
            <span>Passation de Pouvoir</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm uppercase opacity-80 font-bold">
            Étape {step} sur {totalSteps} • Bienvenue à l'Élysée, {player.name}
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center space-y-6">
          
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <p className="font-bold text-[var(--text-main)] leading-relaxed text-sm sm:text-base border-l-4 border-[var(--text-main)] pl-3">
                Votre mandat commence aujourd'hui. Vous avez <span className="bg-[var(--text-main)] text-[var(--bg-panel)] px-1">60 mois</span> à tenir. Voici les 4 piliers de votre survie politique :
              </p>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 font-mono text-xs sm:text-sm">
                <div className="border-2 border-[var(--border-hard)] bg-[var(--bg-panel)] overflow-hidden">
                  <div className="bg-[var(--text-main)] text-[var(--bg-panel)] p-2 font-bold uppercase flex items-center justify-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Popularité</span>
                  </div>
                  <div className="p-3 opacity-90 leading-tight">
                    Ne tombez jamais à 0%, sous peine de perdre toute légitimité et d'être poussé à la démission forcée.
                  </div>
                </div>

                <div className="border-2 border-[var(--border-hard)] bg-[var(--bg-panel)] overflow-hidden">
                  <div className="bg-[var(--text-main)] text-[var(--bg-panel)] p-2 font-bold uppercase flex items-center justify-center space-x-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Indice de Tension</span>
                  </div>
                  <div className="p-3 opacity-90 leading-tight">
                    Surveillez la rue. Si l'indice atteint 100, le pays se bloque et la révolution gronde. C'est la fin du mandat.
                  </div>
                </div>

                <div className="border-2 border-[var(--border-hard)] bg-[var(--bg-panel)] overflow-hidden">
                  <div className="bg-[var(--text-main)] text-[var(--bg-panel)] p-2 font-bold uppercase flex items-center justify-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>Déficit Public</span>
                  </div>
                  <div className="p-3 opacity-90 leading-tight">
                    Un déficit supérieur à 3.0% affole les marchés, dégrade la note de la France et paralyse votre action.
                  </div>
                </div>

                <div className="border-2 border-[var(--border-hard)] bg-[var(--bg-panel)] overflow-hidden">
                  <div className="bg-[var(--text-main)] text-[var(--bg-panel)] p-2 font-bold uppercase flex items-center justify-center space-x-2">
                    <Scale className="w-4 h-4" />
                    <span>Majorité (577)</span>
                  </div>
                  <div className="p-3 opacity-90 leading-tight">
                    Sous la barre des 289 députés, vous risquez la Censure. Le 49.3 sera votre seule arme, mais à quel prix ?
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in text-[var(--text-main)]">
              <p className="font-bold leading-relaxed text-sm sm:text-base border-l-4 border-[var(--text-main)] pl-3">
                Chaque mois, vous devrez trancher sur un <span className="bg-[var(--text-main)] text-[var(--bg-panel)] px-1">Dossier Critique</span>. Mais attention, gouverner c'est choisir ses problèmes.
              </p>

              <div className="bg-[var(--bg-subtle)] border-2 border-dashed border-[var(--border-hard)] p-4 space-y-4">
                <h3 className="font-black uppercase tracking-wider text-center text-sm border-b-2 border-[var(--border-hard)] pb-2">La Mécanique des Choix</h3>
                <ul className="space-y-3 font-mono text-xs sm:text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="font-black pt-0.5 text-lg leading-none">1.</span>
                    <span><strong>L'impossible équilibre :</strong> Vous ne pouvez pas satisfaire tout le monde. Calmer la rue creuse souvent la dette.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-black pt-0.5 text-lg leading-none">2.</span>
                    <span><strong>Vos Prérogatives :</strong> Si une jauge est dans le rouge, utilisez votre colonne de droite (Allocution, 49.3, Remaniement).</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-black pt-0.5 text-lg leading-none">3.</span>
                    <span><strong>L'Autorité Politique :</strong> C'est votre ressource clé. Elle se régénère chaque mois calme, et se dépense pour vos actions d'urgence.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in text-[var(--text-main)]">
              <p className="font-bold leading-relaxed text-sm sm:text-base border-l-4 border-[var(--text-main)] pl-3">
                L'Élysée est une machine impitoyable. Prenez garde aux <span className="bg-[var(--text-main)] text-[var(--bg-panel)] px-1">Cascades Systémiques</span> et à l'usure de votre pouvoir.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs sm:text-sm">
                <div className="border-2 border-[var(--border-hard)] p-4 space-y-3">
                  <h4 className="font-bold uppercase flex items-center space-x-2 border-b-2 border-[var(--border-hard)] pb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>L'Effet Domino</span>
                  </h4>
                  <p className="opacity-90 leading-relaxed">
                    Si le déficit dérape (&gt;4.5%), la note de la France baisse. La bourse panique, et les marchés détruisent votre génération mensuelle d'Autorité Politique. Une erreur économique vous prive de vos armes.
                  </p>
                </div>
                
                <div className="border-2 border-[var(--border-hard)] p-4 space-y-3">
                  <h4 className="font-bold uppercase flex items-center space-x-2 border-b-2 border-[var(--border-hard)] pb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>L'Usure du Mandat</span>
                  </h4>
                  <p className="opacity-90 leading-relaxed">
                    Au bout de 3 ans, la lassitude s'installe (-1 Pop/mois). De plus, l'homme providentiel n'existe pas : multiplier les Allocutions réduira drastiquement leur effet.
                  </p>
                </div>
              </div>

              <div className="text-center font-bold text-sm bg-[var(--bg-subtle)] p-3 border-2 border-[var(--border-hard)]">
                Surveillez attentivement vos 4 jauges de survie et anticipez les chocs économiques et sociaux.
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="pt-4 border-t-2 border-[var(--border-hard)] flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`p-3 font-bold uppercase text-xs flex items-center space-x-2 border-2 border-[var(--text-main)] transition-colors ${
              step === 1 
                ? 'opacity-0 pointer-events-none' 
                : 'bg-[var(--bg-panel)] hover:bg-[var(--bg-subtle)] text-[var(--text-main)]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Précédent</span>
          </button>

          <div className="flex space-x-2">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full border-2 border-[var(--text-main)] transition-all ${step === i ? 'bg-[var(--text-main)] scale-110' : 'bg-transparent'}`}
              />
            ))}
          </div>

          {step < totalSteps ? (
            <button
              onClick={handleNext}
              className="p-3 bg-[var(--text-main)] text-[var(--bg-panel)] font-bold uppercase text-xs flex items-center space-x-2 hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)] border-2 border-[var(--text-main)] transition-colors shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px]"
            >
              <span className="hidden sm:inline">Suivant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="p-3 bg-[var(--text-main)] text-[var(--bg-panel)] font-bold uppercase text-xs flex items-center space-x-2 hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)] border-2 border-[var(--text-main)] transition-colors shadow-[4px_4px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Prendre mes fonctions</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
