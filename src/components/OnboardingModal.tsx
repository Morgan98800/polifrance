import React from 'react';
import { ShieldAlert, BarChart3, Users, Scale, CheckCircle2 } from 'lucide-react';
import { Candidate } from '../types/game';
import { soundEffects } from '../utils/audio';

interface OnboardingModalProps {
  player: Candidate;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ player, onClose }) => {
  const handleStart = () => {
    soundEffects.playKeystroke();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[var(--bg-panel)] border-4 border-[var(--text-main)] max-w-2xl w-full p-6 shadow-[8px_8px_0px_var(--text-main)] space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2 border-b-2 border-[var(--border-hard)] pb-4">
          <h2 className="text-3xl font-black uppercase tracking-tight text-[var(--text-main)]">
            Passation de Pouvoir
          </h2>
          <p className="font-mono text-sm uppercase opacity-80">
            Bienvenue à l'Élysée, {player.name}.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm">
          <p className="font-bold text-[var(--text-main)] leading-relaxed text-base">
            Votre mandat commence aujourd'hui. Vous avez <span className="text-[var(--accent-blue)]">60 mois</span> à tenir avant la fin de votre quinquennat. Chaque mois, un dossier critique atterrira sur votre bureau. Vos décisions façonneront l'avenir du pays.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-[var(--border-hard)] p-3 space-y-2 bg-[var(--bg-subtle)]">
              <div className="flex items-center space-x-2 text-[var(--accent-blue)]">
                <Users className="w-5 h-5" />
                <span className="font-bold uppercase tracking-wider">Popularité</span>
              </div>
              <p className="opacity-80">Ne tombez pas à 0%, ou vous perdrez tout soutien politique et serez poussé à la démission.</p>
            </div>

            <div className="border border-[var(--border-hard)] p-3 space-y-2 bg-[var(--bg-subtle)]">
              <div className="flex items-center space-x-2 text-[var(--accent-red)]">
                <ShieldAlert className="w-5 h-5" />
                <span className="font-bold uppercase tracking-wider">Indice de Tension</span>
              </div>
              <p className="opacity-80">Gardez ce niveau sous contrôle. S'il atteint un indice de 100, la rue se soulèvera (Révolution).</p>
            </div>

            <div className="border border-[var(--border-hard)] p-3 space-y-2 bg-[var(--bg-subtle)]">
              <div className="flex items-center space-x-2 text-[var(--accent-amber)]">
                <BarChart3 className="w-5 h-5" />
                <span className="font-bold uppercase tracking-wider">Déficit Public</span>
              </div>
              <p className="opacity-80">Un déficit au-delà de 3.0% affole les marchés et dégrade la note souveraine de la France.</p>
            </div>

            <div className="border border-[var(--border-hard)] p-3 space-y-2 bg-[var(--bg-subtle)]">
              <div className="flex items-center space-x-2 text-[var(--accent-purple)]">
                <Scale className="w-5 h-5" />
                <span className="font-bold uppercase tracking-wider">Majorité (577)</span>
              </div>
              <p className="opacity-80">Sous les 289 députés, vous êtes en majorité relative. L'opposition peut vous censurer.</p>
            </div>
          </div>

          <div className="bg-[var(--accent-amber)]/10 border-l-4 border-[var(--accent-amber)] p-3 font-mono text-xs text-[var(--text-main)]">
            <strong>CONSEIL :</strong> Utilisez les onglets pour vous informer (Fil AFP, Bourse). En cas de crise, vos <span className="font-bold">Prérogatives Présidentielles</span> (49.3, Allocution, Remaniement) pourraient vous sauver... mais elles ont un coût politique.
          </div>
        </div>

        {/* Action */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-[var(--text-main)] text-[var(--bg-panel)] font-bold uppercase tracking-wider text-sm flex items-center space-x-2 hover:bg-[var(--accent-blue)] transition-colors shadow-[4px_4px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Prendre mes fonctions</span>
          </button>
        </div>

      </div>
    </div>
  );
};
