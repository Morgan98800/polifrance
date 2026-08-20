import React, { useState } from 'react';
import { 
  Settings, Moon, Sun, Smartphone, Monitor, 
  Volume2, VolumeX, RefreshCw, AlertCircle, Sparkles 
} from 'lucide-react';
import { soundEffects } from '../utils/audio';
import { GameMode } from '../types/game';

interface SettingsTabProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  isMobileMode: boolean;
  onToggleDeviceMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetGame: () => void;
  currentMode?: GameMode;
  onChangeMode?: (mode: GameMode) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  theme,
  onToggleTheme,
  isMobileMode,
  onToggleDeviceMode,
  soundEnabled,
  onToggleSound,
  onResetGame,
  currentMode = 'governance'
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleConfirmReset = () => {
    soundEffects.playStamp();
    setShowConfirmReset(false);
    onResetGame();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 text-[var(--text-main)]">
      
      {/* En-tête Paramètres Épuré */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-4 sm:p-5 shadow-[3px_3px_0px_var(--border-hard)] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-[var(--text-main)] text-[var(--bg-panel)] flex items-center justify-center font-bold">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl">Paramètres & Configuration</h2>
            <p className="text-xs font-serif opacity-75">Personnalisation de l'affichage et gestion du mandat</p>
          </div>
        </div>
      </div>

      {/* Panneau de Configuration Simplifié */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[3px_3px_0px_var(--border-hard)] space-y-4 text-xs font-mono">
        
        {/* 1. Sons & Audio */}
        <div className="flex items-center justify-between py-3 border-b border-[var(--border-hard)]/20">
          <div>
            <span className="font-sans font-bold text-sm block">Effets Sonores</span>
            <span className="text-xs font-serif opacity-75">Bruitages de machine à écrire, dépêches et tampons d'État</span>
          </div>

          <button
            onClick={() => { onToggleSound(); soundEffects.playKeystroke(); }}
            className={`px-3.5 py-2 border-2 border-[var(--border-hard)] font-bold text-xs uppercase shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex items-center space-x-1.5 transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-[var(--accent-emerald)] text-white'
                : 'bg-[var(--bg-subtle)] text-[var(--text-main)]'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{soundEnabled ? 'Activés' : 'Coupés'}</span>
          </button>
        </div>

        {/* 2. Thème Visuel */}
        <div className="flex items-center justify-between py-3 border-b border-[var(--border-hard)]/20">
          <div>
            <span className="font-sans font-bold text-sm block">Thème Visuel</span>
            <span className="text-xs font-serif opacity-75">Ambiance sombre nocturne ou papier d'archive</span>
          </div>

          <button
            onClick={() => { soundEffects.playKeystroke(); onToggleTheme(); }}
            className="px-3.5 py-2 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold text-xs uppercase shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            {theme === 'dark' ? <Moon className="w-4 h-4 text-[var(--accent-blue)]" /> : <Sun className="w-4 h-4 text-[var(--accent-amber)]" />}
            <span>{theme === 'dark' ? 'Sombre' : 'Clair (Papier)'}</span>
          </button>
        </div>

        {/* 3. Disposition Écran (Mobile / PC) */}
        <div className="flex items-center justify-between py-3 border-b border-[var(--border-hard)]/20">
          <div>
            <span className="font-sans font-bold text-sm block">Disposition de l'Interface</span>
            <span className="text-xs font-serif opacity-75">Affichage adapté au bureau ou barre tactile mobile</span>
          </div>

          <button
            onClick={() => { soundEffects.playKeystroke(); onToggleDeviceMode(); }}
            className="px-3.5 py-2 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold text-xs uppercase shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            {isMobileMode ? <Smartphone className="w-4 h-4 text-[var(--accent-purple)]" /> : <Monitor className="w-4 h-4 text-[var(--accent-blue)]" />}
            <span>{isMobileMode ? 'Tactile Mobile' : 'Bureau PC'}</span>
          </button>
        </div>

        {/* 4. Réinitialiser la Partie */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="font-sans font-bold text-sm text-[var(--accent-red)] block">Nouvelle Partie</span>
            <span className="text-xs font-serif opacity-75">Quitter le mandat actuel et choisir un autre candidat</span>
          </div>

          <button
            onClick={() => setShowConfirmReset(true)}
            className="px-3.5 py-2 bg-[var(--accent-red)] text-white hover:bg-[var(--accent-red)]/90 border-2 border-[var(--border-hard)] font-bold text-xs uppercase shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Recommencer</span>
          </button>
        </div>

      </div>

      {/* Modal Confirmation de Réinitialisation */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[var(--bg-panel)] border-4 border-[var(--border-hard)] p-6 shadow-[6px_6px_0px_var(--border-hard)] space-y-4 text-center">
            <AlertCircle className="w-10 h-10 mx-auto text-[var(--accent-red)] stroke-[2]" />
            <h3 className="font-display font-bold text-lg text-[var(--text-main)] uppercase">
              Recommencer une partie ?
            </h3>
            <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-serif">
              Toutes vos décisions, lois votées et indicateurs de ce mandat seront réinitialisés. Vous retournerez à l'écran de choix du Président.
            </p>
            <div className="flex justify-center space-x-3 pt-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] font-bold uppercase shadow-[2px_2px_0px_var(--border-hard)] cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 bg-[var(--accent-red)] text-white border-2 border-[var(--border-hard)] font-bold uppercase shadow-[2px_2px_0px_var(--border-hard)] cursor-pointer"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
