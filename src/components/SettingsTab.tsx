import React, { useState } from 'react';
import { 
  Settings, Moon, Sun, Smartphone, Monitor, 
  Volume2, VolumeX, RefreshCw, Trash2, Shield, Info, Database, Play, AlertCircle 
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
  currentMode = 'governance',
  onChangeMode
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showModeModal, setShowModeModal] = useState(false);

  const handleConfirmReset = () => {
    soundEffects.playStamp();
    setShowConfirmReset(false);
    onResetGame();
  };

  const handleSelectNewMode = (mode: GameMode) => {
    soundEffects.playStamp();
    if (onChangeMode) {
      onChangeMode(mode);
    }
    setShowModeModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-[var(--text-main)] font-mono">
      
      {/* En-tête Paramètres */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[var(--text-main)] text-[var(--bg-panel)] flex items-center justify-center font-bold">
            <Settings className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h2 className="font-display font-black text-2xl">Paramètres du Terminal d'État</h2>
            <p className="text-xs opacity-70">Configuration de l'interface, des périphériques et gestion de partie</p>
          </div>
        </div>

        <span className="text-xs font-bold px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] uppercase">
          CONFIG V2.0
        </span>
      </div>

      {/* 1. GESTION DE LA PARTIE & MODES DE JEU */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hard)] font-bold text-xs uppercase">
          <span className="flex items-center space-x-2 text-[var(--accent-red)]">
            <Trash2 className="w-4 h-4 stroke-[2]" />
            <span>1. Gestion de la Partie & Choix de Mode</span>
          </span>
          <span className="px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)] text-[10px]">
            MODE ACTUEL : {currentMode === 'governance' ? 'GOUVERNANCE ÉLYSÉE' : currentMode === 'campaign' ? 'CAMPAGNE 2027' : 'CRISE IMMÉDIATE'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
          {/* Bouton Réinitialiser avec Confirmation */}
          <button
            onClick={() => setShowConfirmReset(true)}
            className="p-4 bg-[var(--accent-red)] text-white border-2 border-[var(--border-hard)] font-bold uppercase shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex flex-col items-center justify-center space-y-1.5 transition-all text-center"
          >
            <RefreshCw className="w-5 h-5 stroke-[2.5]" />
            <span className="text-sm font-black">Réinitialiser la Partie</span>
            <span className="text-[10px] opacity-90 lowercase font-normal">Effacer la progression et choisir un autre candidat</span>
          </button>

          {/* Bouton Changer de Mode */}
          <button
            onClick={() => setShowModeModal(true)}
            className="p-4 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)] border-2 border-[var(--border-hard)] font-bold uppercase shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex flex-col items-center justify-center space-y-1.5 transition-all text-center"
          >
            <Play className="w-5 h-5 stroke-[2.5] text-[var(--accent-blue)]" />
            <span className="text-sm font-black">Changer de Mode de Jeu</span>
            <span className="text-[10px] opacity-70 lowercase font-normal">Gouvernance, Campagne Électorale ou Crise 100 Jours</span>
          </button>

        </div>
      </div>

      {/* 2. APPARENCE & THÈME */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hard)] font-bold text-xs uppercase">
          <span className="flex items-center space-x-2">
            {theme === 'dark' ? <Moon className="w-4 h-4 stroke-[2]" /> : <Sun className="w-4 h-4 stroke-[2]" />}
            <span>2. Thème Graphique (Brutaliste)</span>
          </span>
          <span className="opacity-60">{theme === 'dark' ? 'Anthracite Pur' : 'Papier Administratif'}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <button
            onClick={() => { if (theme !== 'light') { soundEffects.playKeystroke(); onToggleTheme(); } }}
            className={`p-3.5 border-2 border-[var(--border-hard)] flex flex-col items-center justify-center space-y-2 transition-all ${
              theme === 'light'
                ? 'bg-[#FFFFFF] text-[#141414] shadow-[3px_3px_0px_var(--border-hard)] font-black'
                : 'bg-[var(--bg-subtle)] opacity-70 hover:opacity-100 font-bold'
            }`}
          >
            <Sun className="w-5 h-5 stroke-[2] text-[#D97706]" />
            <span className="uppercase">Mode Clair (Papier)</span>
            <span className="text-[10px] opacity-60">Fond blanc cassé #F7F7F5</span>
          </button>

          <button
            onClick={() => { if (theme !== 'dark') { soundEffects.playKeystroke(); onToggleTheme(); } }}
            className={`p-3.5 border-2 border-[var(--border-hard)] flex flex-col items-center justify-center space-y-2 transition-all ${
              theme === 'dark'
                ? 'bg-[#161616] text-[#FFFFFF] shadow-[3px_3px_0px_var(--border-hard)] font-black'
                : 'bg-[var(--bg-subtle)] opacity-70 hover:opacity-100 font-bold'
            }`}
          >
            <Moon className="w-5 h-5 stroke-[2] text-[#FFFFFF]" />
            <span className="uppercase">Mode Sombre (Anthracite)</span>
            <span className="text-[10px] opacity-60">Fond noir profond #0C0C0C</span>
          </button>
        </div>
      </div>

      {/* 3. AFFICHAGE & PÉRIPHÉRIQUE */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hard)] font-bold text-xs uppercase">
          <span className="flex items-center space-x-2">
            {isMobileMode ? <Smartphone className="w-4 h-4 stroke-[2]" /> : <Monitor className="w-4 h-4 stroke-[2]" />}
            <span>3. Ergonomie d'Écran (Device Layout)</span>
          </span>
          <span className="opacity-60">{isMobileMode ? 'Tactile Mobile' : 'Bureau PC'}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <button
            onClick={() => { if (isMobileMode) { soundEffects.playKeystroke(); onToggleDeviceMode(); } }}
            className={`p-3.5 border-2 border-[var(--border-hard)] flex flex-col items-center justify-center space-y-2 transition-all ${
              !isMobileMode
                ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[3px_3px_0px_var(--border-hard)] font-black'
                : 'bg-[var(--bg-subtle)] opacity-70 hover:opacity-100 font-bold'
            }`}
          >
            <Monitor className="w-5 h-5 stroke-[2]" />
            <span className="uppercase">Mode Bureau (PC)</span>
            <span className="text-[10px] opacity-70">Navigation horizontale avec sous-pages</span>
          </button>

          <button
            onClick={() => { if (!isMobileMode) { soundEffects.playKeystroke(); onToggleDeviceMode(); } }}
            className={`p-3.5 border-2 border-[var(--border-hard)] flex flex-col items-center justify-center space-y-2 transition-all ${
              isMobileMode
                ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[3px_3px_0px_var(--border-hard)] font-black'
                : 'bg-[var(--bg-subtle)] opacity-70 hover:opacity-100 font-bold'
            }`}
          >
            <Smartphone className="w-5 h-5 stroke-[2]" />
            <span className="uppercase">Mode Smartphone</span>
            <span className="text-[10px] opacity-70">Barre d'onglets tactile fixe en bas</span>
          </button>
        </div>
      </div>

      {/* 4. EFFETS SONORES */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hard)] font-bold text-xs uppercase">
          <span className="flex items-center space-x-2">
            {soundEnabled ? <Volume2 className="w-4 h-4 stroke-[2]" /> : <VolumeX className="w-4 h-4 stroke-[2]" />}
            <span>4. Effets Sonores Synthétiques Web Audio</span>
          </span>
          <span className="opacity-60">{soundEnabled ? 'ACTIF' : 'MUET'}</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs opacity-80 max-w-md">
            Sons mécaniques de machine à écrire, dépêches AFP, frappe de marteau parlementaire et tampon officiel d'État.
          </p>
          <button
            onClick={() => { onToggleSound(); soundEffects.playKeystroke(); }}
            className={`px-4 py-2 border-2 border-[var(--border-hard)] font-bold text-xs uppercase shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all ${
              soundEnabled
                ? 'bg-[var(--accent-emerald)] text-white'
                : 'bg-[var(--bg-subtle)] text-[var(--text-main)]'
            }`}
          >
            {soundEnabled ? '🔊 Sons Activés' : '🔇 Sons Coupés'}
          </button>
        </div>
      </div>

      {/* Modal Confirmation de Réinitialisation */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-6 shadow-[6px_6px_0px_var(--border-hard)] space-y-4 text-center">
            <AlertCircle className="w-12 h-12 mx-auto text-[var(--accent-red)] stroke-[2]" />
            <h3 className="font-display font-black text-xl text-[var(--text-main)]">
              RÉINITIALISER LA SIMULATION ?
            </h3>
            <p className="text-xs opacity-80 leading-relaxed font-sans">
              Attention : Toutes vos décisions, votes de lois, indicateurs économiques et progression de votre mandat seront définitivement effacés.
            </p>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] font-bold uppercase text-xs shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 bg-[var(--accent-red)] text-white border-2 border-[var(--border-hard)] font-bold uppercase text-xs shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
              >
                Oui, Réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Choix de Mode de Jeu */}
      {showModeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-6 shadow-[6px_6px_0px_var(--border-hard)] space-y-4">
            <h3 className="font-display font-black text-xl text-[var(--text-main)] text-center">
              CHOISIR UN NOUVEAU MODE DE JEU
            </h3>
            
            <div className="space-y-3 pt-2">
              
              <button
                onClick={() => handleSelectNewMode('governance')}
                className="w-full text-left p-4 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] space-y-1 transition-all"
              >
                <div className="flex items-center justify-between font-bold text-sm">
                  <span>🏛️ 1. Gouvernance & Mandat de 5 Ans</span>
                  <span className="text-[10px] text-[var(--accent-blue)]">RECOMMANDÉ</span>
                </div>
                <p className="text-xs opacity-75 font-sans">Vous êtes élu à l'Élysée. Gérez 60 mois de réformes, 49.3, motions de censure et crises sociales.</p>
              </button>

              <button
                onClick={() => handleSelectNewMode('campaign')}
                className="w-full text-left p-4 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] space-y-1 transition-all"
              >
                <div className="flex items-center justify-between font-bold text-sm">
                  <span>🗳️ 2. Campagne Présidentielle 2027</span>
                  <span className="text-[10px] text-[var(--accent-amber)]">AVEC DÉBATS TV</span>
                </div>
                <p className="text-xs opacity-75 font-sans">Partez de 15-25% dans les sondages. Faites campagne, affrontez vos rivaux au Débat TV et gagnez l'élection.</p>
              </button>

            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowModeModal(false)}
                className="px-4 py-1.5 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] font-bold text-xs uppercase"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
