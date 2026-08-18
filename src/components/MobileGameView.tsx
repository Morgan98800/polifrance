import React, { useState } from 'react';
import { GameState, GameEventChoice } from '../types/game';
import { DangerGauges } from './DangerGauges';
import { PresidentialDossierCard } from './PresidentialDossierCard';
import { OperationsPanel } from './OperationsPanel';
import { CrisisMediaPanel } from './CrisisMediaPanel';
import { ExecutivePanel } from './ExecutivePanel';
import { SystemicsHub } from './SystemicsHub';
import { HistoryTab } from './HistoryTab';
import { soundEffects } from '../utils/audio';
import { 
  FileText, Building, Radio, BarChart3, 
  History, Flame, ShieldAlert, Award, TrendingUp, Users 
} from 'lucide-react';

interface MobileGameViewProps {
  state: GameState;
  onResolveChoice: (choice: GameEventChoice) => void;
  onUpdateState: (newState: GameState) => void;
}

export const MobileGameView: React.FC<MobileGameViewProps> = ({
  state,
  onResolveChoice,
  onUpdateState
}) => {
  const [activeMobileTab, setActiveMobileTab] = useState<'dossier' | 'parliament' | 'media' | 'stats' | 'history'>('dossier');

  const handleTabChange = (tab: 'dossier' | 'parliament' | 'media' | 'stats' | 'history') => {
    soundEffects.playKeystroke();
    setActiveMobileTab(tab);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)] pb-24 text-[var(--text-main)]">
      
      {/* 1. Bandeau Compact des 3 Jauges Vitales */}
      <div className="px-3 pt-2">
        <DangerGauges state={state} />
      </div>

      {/* 2. Contenu Dynamique de l'Onglet Mobile Actif */}
      <div className="px-3 pt-3 flex-1">
        
        {/* ONGLET 1 : LE DOSSIER DU TOUR (DÉCISION) */}
        {activeMobileTab === 'dossier' && (
          <div className="space-y-3">
            <PresidentialDossierCard
              event={state.activeEvent}
              turnNumber={state.turn}
              onSelectChoice={onResolveChoice}
            />
          </div>
        )}

        {/* ONGLET 2 : ASSEMBLÉE & 49.3 */}
        {activeMobileTab === 'parliament' && (
          <div className="space-y-3">
            <OperationsPanel
              state={state}
              onUpdateState={onUpdateState}
            />
          </div>
        )}

        {/* ONGLET 3 : DÉPÊCHES AFP & MÉDIAS */}
        {activeMobileTab === 'media' && (
          <div className="space-y-3">
            <CrisisMediaPanel
              state={state}
              onResolveChoice={onResolveChoice}
            />
          </div>
        )}

        {/* ONGLET 4 : BAROMÈTRES & EUROPE */}
        {activeMobileTab === 'stats' && (
          <div className="space-y-4">
            <ExecutivePanel
              state={state}
              onOpenCouncilOfMinisters={() => {}}
              onOpenDiplomacy={() => {}}
            />
            <SystemicsHub state={state} />
          </div>
        )}

        {/* ONGLET 5 : JOURNAL DE BORD */}
        {activeMobileTab === 'history' && (
          <div className="space-y-3">
            <HistoryTab state={state} />
          </div>
        )}

      </div>

      {/* 3. Barre de Navigation Tactile Inférieure Fixe (Bottom Navigation Bar) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-panel)] border-t-2 border-[var(--border-hard)] px-2 py-1.5 shadow-[0px_-2px_0px_var(--border-hard)]">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1 font-mono text-[10px] text-center font-bold">
          
          {/* Dossier */}
          <button
            onClick={() => handleTabChange('dossier')}
            className={`py-2 px-1 border border-[var(--border-hard)] flex flex-col items-center justify-center space-y-1 transition-all ${
              activeMobileTab === 'dossier'
                ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)]'
                : 'bg-[var(--bg-subtle)] text-[var(--text-main)]'
            }`}
          >
            <FileText className="w-4 h-4 stroke-[2]" />
            <span className="truncate">Dossier</span>
          </button>

          {/* Assemblée */}
          <button
            onClick={() => handleTabChange('parliament')}
            className={`py-2 px-1 border border-[var(--border-hard)] flex flex-col items-center justify-center space-y-1 transition-all ${
              activeMobileTab === 'parliament'
                ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)]'
                : 'bg-[var(--bg-subtle)] text-[var(--text-main)]'
            }`}
          >
            <Building className="w-4 h-4 stroke-[2]" />
            <span className="truncate">Voix 577</span>
          </button>

          {/* Dépêches */}
          <button
            onClick={() => handleTabChange('media')}
            className={`py-2 px-1 border border-[var(--border-hard)] flex flex-col items-center justify-center space-y-1 transition-all ${
              activeMobileTab === 'media'
                ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)]'
                : 'bg-[var(--bg-subtle)] text-[var(--text-main)]'
            }`}
          >
            <Radio className="w-4 h-4 stroke-[2]" />
            <span className="truncate">AFP Direct</span>
          </button>

          {/* Baromètres */}
          <button
            onClick={() => handleTabChange('stats')}
            className={`py-2 px-1 border border-[var(--border-hard)] flex flex-col items-center justify-center space-y-1 transition-all ${
              activeMobileTab === 'stats'
                ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)]'
                : 'bg-[var(--bg-subtle)] text-[var(--text-main)]'
            }`}
          >
            <BarChart3 className="w-4 h-4 stroke-[2]" />
            <span className="truncate">États & UE</span>
          </button>

          {/* Journal */}
          <button
            onClick={() => handleTabChange('history')}
            className={`py-2 px-1 border border-[var(--border-hard)] flex flex-col items-center justify-center space-y-1 transition-all ${
              activeMobileTab === 'history'
                ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)]'
                : 'bg-[var(--bg-subtle)] text-[var(--text-main)]'
            }`}
          >
            <History className="w-4 h-4 stroke-[2]" />
            <span className="truncate">Journal</span>
          </button>

        </div>
      </nav>

    </div>
  );
};
