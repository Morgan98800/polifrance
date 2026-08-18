import React from 'react';
import { GameState } from '../types/game';
import { Trophy, Award, Lock, CheckCircle2, Star, Shield, Flame, Landmark } from 'lucide-react';

interface TrophiesTabProps {
  state: GameState;
}

export const TrophiesTab: React.FC<TrophiesTabProps> = ({ state }) => {
  const strikeRisk = state.social?.strikeRisk || 0;
  const deficit = Math.abs(state.economy?.deficit || 0);

  const trophies = [
    {
      id: 'general',
      title: '🎖️ LE GÉNÉRAL',
      desc: 'Maintenir une popularité supérieure à 55% lors du mandat.',
      isUnlocked: state.popularity >= 55,
      reward: 'Statut : Homme d\'État respecté'
    },
    {
      id: 'censure_survivor',
      title: '⚡ FUNAMBULE DU 49.3',
      desc: 'Engager le 49.3 et survivre au vote de censure à l\'Assemblée.',
      isUnlocked: state.hasUsed49_3ThisSession === true,
      reward: 'Statut : Maître des institutions'
    },
    {
      id: 'regle_or',
      title: '💶 L\'ORTHODOXE DE BERCY',
      desc: 'Maîtriser les comptes et maintenir le déficit sous les 3.0% du PIB.',
      isUnlocked: deficit <= 3.0,
      reward: 'Statut : Rigueur budgétaire'
    },
    {
      id: 'paix_sociale',
      title: '🕊️ LE PACIFICATEUR',
      desc: 'Désamorcer les tensions et maintenir la grève sous les 20%.',
      isUnlocked: strikeRisk <= 20,
      reward: 'Statut : Dialogue social parfait'
    },
    {
      id: 'monarque',
      title: '👑 MONARQUE RÉPUBLICAIN',
      desc: 'Accumuler 80 points ou plus d\'Autorité politique.',
      isUnlocked: state.authorityPoints >= 80,
      reward: 'Statut : Hyper-présidence'
    },
    {
      id: 'tribun',
      title: '🎙️ TRIBUN DE LA NATION',
      desc: 'S\'adresser en direct aux Français lors d\'une allocution de 20h.',
      isUnlocked: state.turn >= 3,
      reward: 'Statut : Aisance cathodique'
    },
    {
      id: 'longevite',
      title: '⏳ QUINQUENNAT ACCOMPLI',
      desc: 'Gouverner la France pendant 60 mois complets.',
      isUnlocked: state.turn >= 60,
      reward: 'Statut : Mandat historique'
    },
    {
      id: 'majorite_solide',
      title: '🏛️ MAJORITÉ DU PEUPLE',
      desc: 'Fédérer plus de 289 députés fidèles à l\'Assemblée.',
      isUnlocked: (state.parliament || []).filter(g => g.stanceTowardsPlayer === 'loyal' || g.stanceTowardsPlayer === 'coalition').reduce((s, g) => s + g.seats, 0) >= 289,
      reward: 'Statut : Majorité absolue'
    }
  ];

  const unlockedCount = trophies.filter(t => t.isUnlocked).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-[var(--text-main)] font-mono">
      
      {/* En-tête Panthéon */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-amber)] block">
            RÉPERTOIRE DES HAUTS FAITS DE LA VE RÉPUBLIQUE
          </span>
          <h2 className="font-display font-black text-2xl">Panthéon Républicain</h2>
          <p className="text-xs opacity-75 font-sans">
            Accomplissez des prouesses politiques au cours de votre mandat pour débloquer ces médailles.
          </p>
        </div>

        <div className="px-4 py-2 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] font-bold text-xs uppercase flex items-center space-x-2 shrink-0">
          <Trophy className="w-4 h-4 text-[var(--accent-amber)]" />
          <span>{unlockedCount} / {trophies.length} Trophées Débloqués</span>
        </div>
      </div>

      {/* Grille des 8 Trophées */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {trophies.map((trophy) => (
          <div
            key={trophy.id}
            className={`p-4 border-2 flex flex-col justify-between space-y-3 transition-all ${
              trophy.isUnlocked
                ? 'bg-[var(--bg-panel)] border-[var(--accent-emerald)] shadow-[3px_3px_0px_var(--accent-emerald)]'
                : 'bg-[var(--bg-subtle)] border-[var(--border-hard)]/40 opacity-70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-black text-xs sm:text-sm">
                  {trophy.title}
                </span>
                {trophy.isUnlocked ? (
                  <span className="w-4 h-4 bg-[var(--accent-emerald)] text-white flex items-center justify-center font-bold text-[10px]">
                    ✓
                  </span>
                ) : (
                  <Lock className="w-3.5 h-3.5 opacity-50" />
                )}
              </div>

              <p className="text-[11px] font-sans opacity-80 leading-snug">
                {trophy.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-[var(--border-hard)]/20 text-[10px] flex items-center justify-between">
              <span className={trophy.isUnlocked ? 'text-[var(--accent-emerald)] font-bold' : 'opacity-50'}>
                {trophy.isUnlocked ? 'DÉBLOQUÉ' : 'VERROUILLÉ'}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
