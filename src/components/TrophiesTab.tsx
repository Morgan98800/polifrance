import React from 'react';
import { GameState } from '../types/game';
import { 
  Trophy, Award, Lock, CheckCircle2, Star, Shield, 
  Flame, Landmark, Zap, Sparkles, Users, RefreshCw, Radio, Globe 
} from 'lucide-react';

interface TrophiesTabProps {
  state: GameState;
}

export const TrophiesTab: React.FC<TrophiesTabProps> = ({ state }) => {
  const strikeRisk = state.social?.strikeRisk || 0;
  const deficit = Math.abs(state.economy?.deficit || 0);
  const seats = (state.parliament || [])
    .filter(g => g.stanceTowardsPlayer === 'loyal' || g.stanceTowardsPlayer === 'coalition')
    .reduce((s, g) => s + g.seats, 0);

  const trophies = [
    {
      id: 'general',
      title: '🎖️ LE MONUMENT DE L\'OPINION',
      desc: 'Maintenir une popularité supérieure à 55% lors du mandat.',
      isUnlocked: state.popularity >= 55,
      category: 'Opinion',
      reward: 'Statut : Homme d\'État Plébiscité'
    },
    {
      id: 'censure_survivor',
      title: '⚡ LE FUNAMBULE DU 49.3',
      desc: 'Engager le 49.3 et surmonter l\'épreuve de la motion de censure.',
      isUnlocked: state.hasUsed49_3ThisSession === true,
      category: 'Parlement',
      reward: 'Statut : Maître des Institutions'
    },
    {
      id: 'regle_or',
      title: '💶 L\'ORTHODOXE DE BERCY',
      desc: 'Maîtriser les comptes et ramener le déficit sous les 3.0% du PIB.',
      isUnlocked: deficit <= 3.0,
      category: 'Budget',
      reward: 'Statut : Rigueur Gestionnaire'
    },
    {
      id: 'paix_sociale',
      title: '🕊️ LE PACIFICATEUR',
      desc: 'Désamorcer la colère populaire et maintenir la grève sous les 20%.',
      isUnlocked: strikeRisk <= 20,
      category: 'Social',
      reward: 'Statut : Maître du Dialogue Social'
    },
    {
      id: 'monarque',
      title: '👑 L\'HYPER-PRÉSIDENT',
      desc: 'Accumuler 80 points ou plus d\'Autorité politique régalienne.',
      isUnlocked: state.authorityPoints >= 80,
      category: 'Autorité',
      reward: 'Statut : Pleine Souveraineté'
    },
    {
      id: 'batisseur',
      title: '⚛️ LE BÂTISSEUR ATOMIQUE',
      desc: 'Mener à son terme au moins un Grand Chantier d\'État pluriannuel.',
      isUnlocked: (state.completedProjectsHistory || []).length >= 1,
      category: 'Chantiers',
      reward: 'Statut : Visionnaire Industriel'
    },
    {
      id: 'machiavel',
      title: '🗂️ LE MACHIAVEL DE L\'OMBRE',
      desc: 'Dégainer au moins 2 manœuvres tactiques secrètes du Cabinet Noir.',
      isUnlocked: (state.playedCardsHistory || []).length >= 2,
      category: 'Cabinet Noir',
      reward: 'Statut : Stratège Redoutable'
    },
    {
      id: 'voix_france',
      title: '🌍 LA VOIX DE LA FRANCE',
      desc: 'Affirmer la stature diplomatique de la France à l\'ONU ou à Bruxelles.',
      isUnlocked: state.history.some(h => h.headline.includes('ONU') || h.headline.includes('Bruxelles') || h.headline.includes('Rafale')),
      category: 'Géopolitique',
      reward: 'Statut : Stature Internationale'
    },
    {
      id: 'pleins_pouvoirs',
      title: '🏛️ LES PLEINS POUVOIRS',
      desc: 'Rassembler une majorité écrasante de plus de 330 députés à l\'Assemblée.',
      isUnlocked: seats >= 330,
      category: 'Parlement',
      reward: 'Statut : Majorité Qualifiée 3/5'
    },
    {
      id: 'poker_dissolution',
      title: '🔄 LE COUP DE POKER',
      desc: 'Dissoudre l\'Assemblée Nationale et réussir le pari des urnes.',
      isUnlocked: state.hasDissolved === true,
      category: 'Stratégie',
      reward: 'Statut : Audace Républicaine'
    },
    {
      id: 'tribun',
      title: '🎙️ LE TRIBUN DU 20H',
      desc: 'S\'adresser solennellement à la Nation lors d\'une allocution télévisée.',
      isUnlocked: (state.addressCount || 0) >= 1,
      category: 'Médias',
      reward: 'Statut : Aisance Cathodique'
    },
    {
      id: 'longevite',
      title: '⏳ LE MANDAT HISTORIQUE',
      desc: 'Gouverner la France pendant 60 mois complets sans faillir.',
      isUnlocked: state.turn >= 60,
      category: 'Histoire',
      reward: 'Statut : Quinquennat Accompli'
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
          <h2 className="font-display font-black text-2xl">Panthéon & Trophées Présidentiels</h2>
          <p className="text-xs opacity-75 font-sans">
            Accomplissez des prouesses politiques, industrielles et diplomatiques pour débloquer les 12 médailles d'État.
          </p>
        </div>

        <div className="px-4 py-2.5 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] font-bold text-xs uppercase flex items-center space-x-2 shrink-0">
          <Trophy className="w-4 h-4 text-[var(--accent-amber)]" />
          <span>{unlockedCount} / {trophies.length} Trophées Débloqués</span>
        </div>
      </div>

      {/* Grille des 12 Trophées */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {trophies.map((trophy) => (
          <div
            key={trophy.id}
            className={`p-4 border-2 shadow-[3px_3px_0px_var(--border-hard)] flex flex-col justify-between space-y-3 transition-all ${
              trophy.isUnlocked
                ? 'bg-[var(--bg-panel)] border-[var(--accent-amber)] shadow-[0_0_10px_var(--accent-amber)]/20'
                : 'bg-[var(--bg-subtle)] border-[var(--border-hard)] opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-[var(--border-hard)]/25 mb-2">
                <span className="text-[9px] font-bold uppercase opacity-60">
                  {trophy.category}
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 border flex items-center gap-1 ${
                  trophy.isUnlocked
                    ? 'bg-[var(--accent-amber)]/20 text-[var(--accent-amber)] border-[var(--accent-amber)]'
                    : 'bg-[var(--bg-panel)] text-[var(--text-main)]/50 border-[var(--border-hard)]'
                }`}>
                  {trophy.isUnlocked ? <CheckCircle2 className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                  <span>{trophy.isUnlocked ? 'DÉBLOQUÉ' : 'VERROUILLÉ'}</span>
                </span>
              </div>

              <h3 className="font-display font-black text-sm text-[var(--text-main)] mb-1">
                {trophy.title}
              </h3>
              <p className="text-xs font-sans opacity-85 leading-relaxed">
                {trophy.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-[var(--border-hard)]/20 text-[10px] text-[var(--accent-blue)] font-bold">
              {trophy.reward}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
