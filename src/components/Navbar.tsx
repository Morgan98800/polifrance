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

      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        
        {/* Logo Épuré POLIFRANCE */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          <span className="font-display font-black text-base sm:text-xl tracking-tight uppercase text-[var(--text-main)]">
            POLIFRANCE
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono font-bold px-1 sm:px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] opacity-80">
            2027
          </span>
        </div>

        {/* Métriques d'En-Tête : Incarnation & Autorité */}
        {isGameRunning && (
          <div className="flex items-center space-x-1.5 sm:space-x-3 font-mono text-[11px] sm:text-xs">
            
            {/* Profil Candidat */}
            <div className="hidden xs:flex items-center space-x-1.5 px-2 py-1 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
              <div className="w-5 h-5 bg-[var(--bg-panel)] border border-[var(--border-hard)] overflow-hidden shrink-0">
                {state.player?.avatar ? (
                  <img src={state.player.avatar} alt={state.player.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-3.5 h-3.5 p-0.5" />
                )}
              </div>
              <span className="font-serif font-black text-xs truncate max-w-[80px] sm:max-w-none">{state.player?.name}</span>
            </div>

            {/* Tour & Date */}
            <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] flex items-center space-x-1 sm:space-x-2">
              <span className="font-bold">M{state.turn}</span>
              <span className="hidden sm:inline opacity-30">|</span>
              <span className="hidden sm:inline opacity-80">{state.currentDate}</span>
            </div>

            {/* Capital d'Autorité */}
            <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] flex items-center space-x-1">
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2] text-[var(--accent-amber)] shrink-0" />
              <span className="hidden md:inline">AUTORITÉ :</span>
              <strong className="font-bold text-[var(--accent-amber)]">{state.authorityPoints} <span className="text-[9px]">pts</span></strong>
            </div>

          </div>
        )}

        {/* Actions Rapides : Bouton Paramètres */}
        <div className="flex items-center space-x-2 font-mono text-xs shrink-0">
          {onOpenSettings && (
            <button
              onClick={() => { soundEffects.playKeystroke(); onOpenSettings(); }}
              title="Ouvrir les Paramètres"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center space-x-1 font-bold text-[11px] sm:text-xs"
            >
              <Settings className="w-3.5 h-3.5 stroke-[2]" />
              <span className="hidden sm:inline">Config</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
