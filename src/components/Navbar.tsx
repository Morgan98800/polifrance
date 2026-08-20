import React from 'react';
import { GameState } from '../types/game';
import { Landmark, LineChart, Users, History, Trophy, Settings, Zap, User } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface NavbarProps {
  state: GameState;
  activePage: 'desk' | 'markets' | 'cabinet' | 'history' | 'trophies' | 'settings';
  onNavigate: (page: 'desk' | 'markets' | 'cabinet' | 'history' | 'trophies' | 'settings') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  state, 
  activePage,
  onNavigate
}) => {
  const isGameRunning = Boolean(state && state.player);

  return (
    <header className="bg-[var(--bg-panel)] border-b-2 border-[var(--border-hard)] sticky top-0 z-50 text-[var(--text-main)] shadow-[0px_2px_0px_var(--border-hard)]">
      
      {/* Liseré Tricolore Brutaliste Net */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#1D3557]"></div>
        <div className="flex-1 bg-[#FFFFFF]"></div>
        <div className="flex-1 bg-[#E63946]"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2 font-mono text-xs">
        
        {/* 1. Logo & Identité Présidentielle */}
        <div className="flex items-center space-x-3 shrink-0">
          <div 
            onClick={() => { soundEffects.playKeystroke(); onNavigate('desk'); }}
            className="cursor-pointer flex items-center space-x-1.5 group"
          >
            <span className="font-display font-black text-lg sm:text-xl tracking-tight uppercase text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors">
              POLIFRANCE
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] opacity-80">
              2027
            </span>
          </div>

          {isGameRunning && (
            <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 bg-[var(--bg-subtle)] border border-[var(--border-hard)] shadow-[1px_1px_0px_var(--border-hard)]">
              <div className="w-5 h-5 bg-[var(--bg-panel)] border border-[var(--border-hard)] overflow-hidden shrink-0">
                {state.player?.avatar ? (
                  <img src={state.player.avatar} alt={state.player.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-3.5 h-3.5 p-0.5" />
                )}
              </div>
              <span className="font-serif font-bold text-xs">{state.player?.name}</span>
              <span className="opacity-30">|</span>
              <span className="font-mono font-bold text-[var(--accent-blue)] text-xs">Mois {state.turn}/60</span>
            </div>
          )}
        </div>

        {/* 2. Onglets Principaux Unifiés (Desktop) */}
        {isGameRunning && (
          <div className="hidden sm:flex items-center space-x-1 font-mono text-xs">
            
            <button
              onClick={() => { soundEffects.playKeystroke(); onNavigate('desk'); }}
              className={`px-3 py-1.5 border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-1.5 transition-all ${
                activePage === 'desk'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Bureau</span>
            </button>

            <button
              onClick={() => { soundEffects.playKeystroke(); onNavigate('markets'); }}
              className={`relative px-3 py-1.5 border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-1.5 transition-all ${
                activePage === 'markets'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              {state.economy?.deficit >= 3.0 && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-red)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-red)]"></span>
                </span>
              )}
              <LineChart className="w-3.5 h-3.5" />
              <span>Bourse & Dette</span>
            </button>

            <button
              onClick={() => { soundEffects.playKeystroke(); onNavigate('cabinet'); }}
              className={`relative px-3 py-1.5 border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-1.5 transition-all ${
                activePage === 'cabinet'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              {state.popularity < 30 && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-red)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-red)]"></span>
                </span>
              )}
              <Users className="w-3.5 h-3.5" />
              <span>Ministres</span>
            </button>

            <button
              onClick={() => { soundEffects.playKeystroke(); onNavigate('history'); }}
              className={`px-3 py-1.5 border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-1.5 transition-all ${
                activePage === 'history'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Archives</span>
            </button>

            <button
              onClick={() => { soundEffects.playKeystroke(); onNavigate('trophies'); }}
              className={`px-3 py-1.5 border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-1.5 transition-all ${
                activePage === 'trophies'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
              <span>Panthéon</span>
            </button>

          </div>
        )}

        {/* 3. Métriques d'Action & Paramètres */}
        <div className="flex items-center space-x-2 shrink-0">
          {isGameRunning && (
            <div className="px-2.5 py-1.5 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] flex items-center space-x-1.5 font-bold shadow-[2px_2px_0px_var(--border-hard)]">
              <Zap className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
              <span className="hidden sm:inline text-[10px] opacity-70">AUTORITÉ :</span>
              <strong className="text-[var(--accent-amber)]">{state.authorityPoints} pts</strong>
            </div>
          )}

          <button
            onClick={() => { soundEffects.playKeystroke(); onNavigate(activePage === 'settings' ? 'desk' : 'settings'); }}
            title="Paramètres & Configuration"
            className={`p-1.5 sm:px-2.5 sm:py-1.5 border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-1 transition-all shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] ${
              activePage === 'settings'
                ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
            }`}
          >
            <Settings className="w-3.5 h-3.5 stroke-[2]" />
            <span className="hidden md:inline">Config</span>
          </button>
        </div>

      </div>
    </header>
  );
};
