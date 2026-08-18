import React, { useState } from 'react';
import { GameState } from '../types/game';
import { soundEffects } from '../utils/audio';
import { Trophy, Award, Share2, RefreshCw, CheckCircle2, TrendingUp, Flame, Building2, User, Copy, Check } from 'lucide-react';

interface PresidentialLegacyModalProps {
  state: GameState;
  onRestart: () => void;
}

export const PresidentialLegacyModal: React.FC<PresidentialLegacyModalProps> = ({ state, onRestart }) => {
  const [copied, setCopied] = useState(false);

  // Détermination du Titre et Profil Historique de Fin
  const isFullMandate = state.turn >= 60;
  const isCensured = state.endGameReason?.includes('censure');
  const isBankrupt = state.economy.deficit > 6.0;
  const isSocialCollapse = state.social.strikeRisk >= 95;
  const isPopular = state.popularity >= 50;

  let title = 'LE BILAN DU QUINQUENNAT (2027 – 2032)';
  let headline = '« Cinq Années de Réformes au Cœur des Tempêtes »';
  let badge = '🏆 MANDAT ACHEVÉ';
  let badgeColor = 'bg-[var(--accent-blue)] text-white';

  if (isCensured) {
    badge = '⚔️ RENVERSÉ PAR L\'ASSEMBLÉE';
    badgeColor = 'bg-[var(--accent-red)] text-white';
    headline = '« 49.3 FATAL : L\'Assemblée Nationale vote la Censure et destitue le Gouvernement »';
  } else if (isSocialCollapse) {
    badge = '🔥 RÉVOLTE SOCIALE';
    badgeColor = 'bg-[var(--accent-red)] text-white';
    headline = '« Grève Générale Totale : La Rue paralyse la France et force la démission »';
  } else if (isBankrupt) {
    badge = '📉 FAILLITE BUDGÉTAIRE';
    badgeColor = 'bg-[var(--accent-amber)] text-black';
    headline = '« Crise de la Dette : La France placée sous tutelle financière de Bruxelles »';
  } else if (isPopular && isFullMandate) {
    badge = '👑 RÉÉLECTION TRIOMPHALE';
    badgeColor = 'bg-[var(--accent-emerald)] text-white';
    headline = '« Plébiscite National : Le Président réconcilie les Français et s\'ouvre la voie de 2032 »';
  }

  const handleCopyShare = () => {
    soundEffects.playStamp();
    const shareText = `🇫🇷 SIM-POL 2027 • MON BILAN PRÉSIDENTIEL
Dirigeant : ${state.player.name} (${state.player.party})
Statut : ${badge}
Score : Mois ${state.turn}/60 | Opinion : ${state.popularity}% | Déficit : -${Math.abs(state.economy.deficit).toFixed(1)}% | Députés : ${state.deputiesMajority}/577
👉 Jouer à SIM-POL 2027 : https://morgan98800.github.io/polifrance/`;

    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-6 sm:p-8 shadow-[8px_8px_0px_var(--border-hard)] space-y-6 text-[var(--text-main)] font-mono my-6">
        
        {/* Liseré Tricolore */}
        <div className="h-1.5 w-full flex">
          <div className="flex-1 bg-[#1D3557]"></div>
          <div className="flex-1 bg-[#FFFFFF]"></div>
          <div className="flex-1 bg-[#E63946]"></div>
        </div>

        {/* En-tête Journal d'État */}
        <div className="text-center border-b-2 border-[var(--border-hard)] pb-4 space-y-1">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold opacity-60">
            <span>ÉDITION SPÉCIALE BILAN</span>
            <span>RÉPUBLIQUE FRANÇAISE</span>
            <span>MOIS {state.turn} / 60</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tighter uppercase">
            LE JOURNAL DE LA RÉPUBLIQUE
          </h1>
        </div>

        {/* La "Une" Historique */}
        <div className="p-5 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] space-y-4">
          
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-black uppercase px-2.5 py-1 border border-[var(--border-hard)] ${badgeColor}`}>
              {badge}
            </span>
            <span className="text-xs opacity-75 font-bold">
              Popularité Finale : <strong>{state.popularity}%</strong>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 h-24 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shrink-0 overflow-hidden shadow-[3px_3px_0px_var(--border-hard)]">
              {state.player?.avatar && (
                <img src={state.player.avatar} alt={state.player.name} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-display font-black text-xl leading-tight">
                {headline}
              </h3>
              <p className="text-xs font-sans opacity-80">
                Bilan politique de <strong>{state.player.name}</strong> sous la bannière {state.player.party}.
              </p>
            </div>
          </div>

          {/* Tableau des Statistiques du Mandat */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[var(--border-hard)]/30 text-xs font-mono text-center">
            <div className="p-2 bg-[var(--bg-panel)] border border-[var(--border-hard)]">
              <span className="text-[10px] opacity-60 block">LONGÉVITÉ</span>
              <strong className="text-sm font-display font-bold">{state.turn} Mois</strong>
            </div>
            <div className="p-2 bg-[var(--bg-panel)] border border-[var(--border-hard)]">
              <span className="text-[10px] opacity-60 block">CLIMAT SOCIAL</span>
              <strong className="text-sm font-display font-bold">{state.social.strikeRisk}%</strong>
            </div>
            <div className="p-2 bg-[var(--bg-panel)] border border-[var(--border-hard)]">
              <span className="text-[10px] opacity-60 block">DÉFICIT FINAL</span>
              <strong className="text-sm font-display font-bold">-{Math.abs(state.economy.deficit).toFixed(1)}%</strong>
            </div>
            <div className="p-2 bg-[var(--bg-panel)] border border-[var(--border-hard)]">
              <span className="text-[10px] opacity-60 block">AUTORITÉ</span>
              <strong className="text-sm font-display font-bold">{state.authorityPoints} pts</strong>
            </div>
          </div>

        </div>

        {/* Boutons d'Action : Partage & Nouvelle Partie */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          
          <button
            type="button"
            onClick={handleCopyShare}
            className="flex-1 py-3 px-4 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold text-xs uppercase shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center space-x-2 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-[var(--accent-emerald)] stroke-[3]" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? '✅ Bilan Copié dans le Presse-Papier !' : '📸 Partager mon Bilan (X / WhatsApp)'}</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="py-3 px-6 bg-[var(--text-main)] hover:bg-[var(--accent-blue)] text-[var(--bg-panel)] hover:text-white border-2 border-[var(--border-hard)] font-bold text-xs uppercase shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center space-x-2 transition-all"
          >
            <RefreshCw className="w-4 h-4 stroke-[2.5]" />
            <span>Nouvelle Partie</span>
          </button>

        </div>

      </div>
    </div>
  );
};
