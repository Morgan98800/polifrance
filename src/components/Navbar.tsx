import React from 'react';
import { GameState } from '../types/game';
import { Landmark, Tv, Zap, User, Settings } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface NavbarProps {
  state: GameState;
  onReset: () => void;
  onOpenDebate?: () => void;
  onOpenSettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  state, 
  onReset, 
  onOpenDebate, 
  onOpenSettings
}) => {
  const isGameRunning = Boolean(state && state.player);

  return (
    <header className="bg-[var(--bg-panel)] border-b-2 border-[var(--border-hard)] sticky top-0 z-50 text-[var(--text-main)]">
      
      {/* Liseré Tricolore Brutaliste Net */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#1D3557]"></div>
        <div className="flex-1 bg-[#FFFFFF]"></div>
        <div className="flex-1 bg-[#E63946]"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Logo & Titre Institutionnel */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[var(--text-main)] text-[var(--bg-panel)] border border-[var(--border-hard)] flex items-center justify-center font-serif font-bold text-base">
            RF
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif font-black text-lg tracking-tight leading-none">
                SIM-POL 2027
              </h1>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] uppercase">
                Ve RÉPUBLIQUE
              </span>
            </div>
            <p className="text-[10px] font-mono opacity-70 leading-tight">
              TERMINAL GOUVERNEMENTAL D'ÉTAT
            </p>
          </div>
        </div>

        {/* Métriques d'En-Tête : Incarnation Présidentielle & Capital d'Autorité */}
        {isGameRunning && (
          <div className="flex items-center space-x-2 sm:space-x-3 font-mono text-xs">
            
            {/* Profil Candidat / Président Actif */}
            <div className="flex items-center space-x-2 px-2.5 py-1 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
              <div className="w-6 h-6 bg-[var(--bg-panel)] border border-[var(--border-hard)] overflow-hidden shrink-0">
                {state.player?.avatar ? (
                  <img src={state.player.avatar} alt={state.player.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 p-0.5" />
                )}
              </div>
              <div className="text-left">
                <span className="font-serif font-black text-xs block leading-tight">{state.player?.name}</span>
                <span className="text-[9px] opacity-60 block leading-none">{state.player?.party}</span>
              </div>
            </div>

            {/* Tour & Date */}
            <div className="px-3 py-1.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] flex items-center space-x-2">
              <span className="font-bold">TOUR {state.turn}</span>
              <span className="opacity-30">|</span>
              <span className="opacity-80">{state.currentDate}</span>
            </div>

            {/* Capital d'Autorité Politique */}
            <div className="px-3 py-1.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 stroke-[2] text-[var(--pol-centre)]" />
              <span>AUTORITÉ :</span>
              <strong className="font-bold text-[var(--pol-centre)]">{state.authorityPoints} pts</strong>
            </div>

          </div>
        )}

        {/* Actions Rapides : Débat TV & Bouton Unique Paramètres */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          
          {isGameRunning && state.mode === 'campaign' && onOpenDebate && (
            <button
              onClick={() => { soundEffects.playKeystroke(); onOpenDebate(); }}
              className="px-2.5 py-1.5 bg-[var(--pol-centre)] text-[#1A1A1A] font-bold uppercase border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center space-x-1.5"
            >
              <Tv className="w-3.5 h-3.5 stroke-[2]" />
              <span>Débat TV</span>
            </button>
          )}

          {/* Bouton Centralisé Paramètres */}
          {onOpenSettings && (
            <button
              onClick={() => { soundEffects.playKeystroke(); onOpenSettings(); }}
              title="Ouvrir les Paramètres"
              className="px-3 py-1.5 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center space-x-1.5 font-bold"
            >
              <Settings className="w-3.5 h-3.5 stroke-[2]" />
              <span>Paramètres</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
