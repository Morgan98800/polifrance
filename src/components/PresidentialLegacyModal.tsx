import React, { useState } from 'react';
import { GameState } from '../types/game';
import { soundEffects } from '../utils/audio';
import { computePresidentialLegacy } from '../engine/simulation';
import { 
  Trophy, Award, Share2, RefreshCw, CheckCircle2, TrendingUp, 
  Flame, Building2, User, Copy, Check, Sparkles, Landmark, Gavel, 
  Wallet, Shield, Zap, Skull 
} from 'lucide-react';

interface PresidentialLegacyModalProps {
  state: GameState;
  onRestart: () => void;
}

export const PresidentialLegacyModal: React.FC<PresidentialLegacyModalProps> = ({ state, onRestart }) => {
  const [copied, setCopied] = useState(false);

  const legacy = state.legacyStats || computePresidentialLegacy(state);
  const figure = legacy.historicalFigureMatch;

  const getRankBadgeColor = (rank: string) => {
    switch (rank) {
      case 'S+': return 'bg-[var(--accent-purple)] text-white border-[var(--accent-purple)] shadow-[0_0_15px_var(--accent-purple)]';
      case 'A': return 'bg-[var(--accent-emerald)] text-white border-[var(--accent-emerald)] shadow-[0_0_12px_var(--accent-emerald)]';
      case 'B': return 'bg-[var(--accent-blue)] text-white border-[var(--accent-blue)]';
      case 'C': return 'bg-[var(--accent-amber)] text-black border-[var(--accent-amber)]';
      case 'D': return 'bg-[var(--accent-red)]/80 text-white border-[var(--accent-red)]';
      case 'F': return 'bg-[var(--accent-red)] text-white border-[var(--accent-red)] shadow-[0_0_15px_var(--accent-red)] animate-pulse';
      default: return 'bg-[var(--text-main)] text-[var(--bg-panel)]';
    }
  };

  const handleCopyShare = () => {
    soundEffects.playStamp();
    const shareText = `🇫🇷 POLIFRANCE 2027 • MON VERDICT PRÉSIDENTIEL
Président : ${state.player.name} (${state.player.party})
👑 Titre Obtenu : « ${legacy.emergentTitle} »
🎖️ Rang Historique : [ RANG ${legacy.presidentialRank} ] (Profil : ${figure.name})
🎭 Alignement : ${legacy.machiavellianScore}% Machiavélique
📊 Score Final : Mois ${state.turn}/60 | Opinion : ${state.popularity}% | Déficit : ${state.economy.deficit}% | Trésorerie : ${state.economy.treasury.toFixed(1)} Mds €
🏗️ Chantiers Livrés : ${legacy.completedProjectsCount} | ⚡ 49.3 Dégainés : ${legacy.used49_3Count} | 🃏 Manœuvres : ${legacy.tacticalCardsPlayedCount}
👉 Peux-tu faire mieux ? Joue à POLIFRANCE 2027 : https://morgan98800.github.io/polifrance/`;

    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in font-mono">
      <div className="max-w-3xl w-full bg-[var(--bg-panel)] border-4 border-[var(--text-main)] p-5 sm:p-7 shadow-[10px_10px_0px_var(--text-main)] space-y-5 text-[var(--text-main)] my-6 max-h-[94vh] overflow-y-auto">
        
        {/* Liseré Tricolore */}
        <div className="h-2 w-full flex">
          <div className="flex-1 bg-[#1D3557]"></div>
          <div className="flex-1 bg-[#FFFFFF]"></div>
          <div className="flex-1 bg-[#E63946]"></div>
        </div>

        {/* En-tête Journal Officiel */}
        <div className="text-center border-b-2 border-[var(--border-hard)] pb-3 space-y-1">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold opacity-60">
            <span>RÉPUBLIQUE FRANÇAISE</span>
            <span>BILAN OFFICIEL DE MANDAT</span>
            <span>MOIS {state.turn} / 60</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tighter uppercase">
            LE VERDICT DE L'HISTOIRE
          </h1>
          <p className="text-xs font-sans opacity-75 max-w-lg mx-auto">
            {state.endGameReason || "Votre mandat à l'Élysée s'achève. Les historiens dressent le bilan de votre action."}
          </p>
        </div>

        {/* CARTE D'IDENTITÉ PRÉSIDENTIELLE (Format Viral / Shareable) */}
        <div className="p-5 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] shadow-[4px_4px_0px_var(--border-hard)] space-y-4 relative overflow-hidden">
          
          {/* Sceau en filigrane */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[var(--border-hard)]/30 pb-4">
            
            {/* Avatar & Identité */}
            <div className="flex items-center space-x-3.5">
              <div className="w-16 h-16 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] overflow-hidden shrink-0 shadow-[2px_2px_0px_var(--border-hard)]">
                {state.player?.avatar ? (
                  <img src={state.player.avatar} alt={state.player.name} className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[var(--accent-blue)] block">
                  {state.player?.party}
                </span>
                <h2 className="font-display font-black text-xl sm:text-2xl leading-tight">
                  {state.player?.name}
                </h2>
                <div className="text-xs font-black text-[var(--accent-purple)] uppercase tracking-wide">
                  « {legacy.emergentTitle} »
                </div>
              </div>
            </div>

            {/* Le Badge de Rang */}
            <div className="text-center shrink-0">
              <span className="text-[9px] uppercase font-bold opacity-75 block mb-0.5">RANG HISTORIQUE</span>
              <div className={`px-4 py-1.5 font-black text-2xl sm:text-3xl border-2 uppercase tracking-wider ${getRankBadgeColor(legacy.presidentialRank)}`}>
                RANG {legacy.presidentialRank}
              </div>
            </div>

          </div>

          {/* Jauge d'Alignement Machiavélique */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-xs font-bold font-mono">
              <span className="flex items-center gap-1 text-[var(--accent-red)]">
                <Skull className="w-3.5 h-3.5" />
                <span>Machiavélique ({legacy.machiavellianScore}%)</span>
              </span>
              <span className="flex items-center gap-1 text-[var(--accent-blue)]">
                <span>Démocrate Républicain ({100 - legacy.machiavellianScore}%)</span>
                <Landmark className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="h-2.5 w-full bg-[var(--bg-panel)] border border-[var(--border-hard)] overflow-hidden flex">
              <div
                className="h-full bg-[var(--accent-red)] transition-all duration-500"
                style={{ width: `${legacy.machiavellianScore}%` }}
              />
              <div
                className="h-full bg-[var(--accent-blue)] transition-all duration-500"
                style={{ width: `${100 - legacy.machiavellianScore}%` }}
              />
            </div>
          </div>

          {/* Faits d'Armes Clés */}
          <div className="p-3 bg-[var(--bg-panel)] border border-[var(--border-hard)] space-y-1.5 text-xs font-sans">
            <span className="font-mono font-bold text-[10px] uppercase opacity-70 block">
              Grand Bilan du Mandat :
            </span>
            <ul className="space-y-1 text-xs list-disc list-inside opacity-90">
              {legacy.keyAchievements.map((act, i) => (
                <li key={i}>{act}</li>
              ))}
            </ul>
          </div>

          {/* Figure Historique Assimilée */}
          <div className="p-3 bg-[var(--bg-panel)] border-l-4 border-[var(--accent-purple)] text-xs space-y-1">
            <div className="flex items-center space-x-1.5 font-bold uppercase text-[10px] text-[var(--accent-purple)]">
              <Landmark className="w-3.5 h-3.5 shrink-0" />
              <span>Profil Assimilé : {figure.name}</span>
            </div>
            <p className="font-sans opacity-90">{figure.description}</p>
            <div className="font-serif italic opacity-95 text-[11px]">
              {figure.quote}
            </div>
          </div>

        </div>

        {/* Grille des 6 Statistiques Clés */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
          
          <div className="p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
            <span className="text-[9px] opacity-70 block uppercase">Popularité Finale</span>
            <strong className="text-sm font-black text-[var(--accent-blue)]">{state.popularity}%</strong>
          </div>

          <div className="p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
            <span className="text-[9px] opacity-70 block uppercase">Déficit Public</span>
            <strong className={`text-sm font-black ${state.economy.deficit <= 3.0 ? 'text-[var(--accent-emerald)]' : 'text-[var(--accent-red)]'}`}>
              {state.economy.deficit}%
            </strong>
          </div>

          <div className="p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
            <span className="text-[9px] opacity-70 block uppercase">Trésorerie Restante</span>
            <strong className="text-sm font-black text-[var(--accent-amber)]">{state.economy.treasury.toFixed(1)} Mds €</strong>
          </div>

          <div className="p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
            <span className="text-[9px] opacity-70 block uppercase">Lois & Décrets</span>
            <strong className="text-sm font-black">{state.history.length} Actes</strong>
          </div>

          <div className="p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
            <span className="text-[9px] opacity-70 block uppercase">Grands Chantiers</span>
            <strong className="text-sm font-black text-[var(--accent-purple)]">
              {(state.completedProjectsHistory || []).length} Achevés
            </strong>
          </div>

          <div className="p-2.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
            <span className="text-[9px] opacity-70 block uppercase">Cabinet Noir</span>
            <strong className="text-sm font-black text-[var(--accent-red)]">
              {(state.playedCardsHistory || []).length} Coups Joués
            </strong>
          </div>

        </div>

        {/* Boutons d'Action & Partage */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t-2 border-[var(--border-hard)]">
          <button
            onClick={handleCopyShare}
            className="w-full sm:w-auto px-5 py-3 bg-[var(--bg-subtle)] hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] text-xs font-bold uppercase border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[var(--accent-emerald)]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Bilan Copié pour X & WhatsApp !' : 'Partager ma Carte Présidentielle'}</span>
          </button>

          <button
            onClick={() => { soundEffects.playStamp(); onRestart(); }}
            className="w-full sm:w-auto px-6 py-3 bg-[var(--text-main)] text-[var(--bg-panel)] hover:bg-[var(--accent-blue)] hover:text-white text-xs font-bold uppercase border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Rejouer une Nouvelle Partie</span>
          </button>
        </div>

      </div>
    </div>
  );
};
