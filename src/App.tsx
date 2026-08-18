import React, { useState, useEffect } from 'react';
import { Candidate, GameMode, GameState, GameEventChoice } from './types/game';
import { initializeGame, processEventChoice } from './engine/simulation';
import { Navbar } from './components/Navbar';
import { CandidateSelect } from './components/CandidateSelect';
import { ModeSelect } from './components/ModeSelect';
import { CleanPresidentialDesk } from './components/CleanPresidentialDesk';
import { OperationsPanel } from './components/OperationsPanel';
import { FranceMap } from './components/FranceMap';
import { CrisisMediaPanel } from './components/CrisisMediaPanel';
import { SystemicsHub } from './components/SystemicsHub';
import { HistoryTab } from './components/HistoryTab';
import { SettingsTab } from './components/SettingsTab';
import { TVDebateModal } from './components/TVDebateModal';
import { ElectionNightModal } from './components/ElectionNightModal';
import { soundEffects } from './utils/audio';
import { useDevice } from './hooks/useDevice';
import { 
  ArrowLeft, LineChart, Building2, Globe, Radio, 
  History, Scale, Volume2, VolumeX, ShieldCheck, Landmark, Settings 
} from 'lucide-react';

const STORAGE_KEY = 'polifrance_2027_gamestate';
const THEME_STORAGE_KEY = 'polifrance_2027_theme';

export type ActivePage = 'desk' | 'markets' | 'parliament' | 'map' | 'media' | 'history' | 'settings';

export const App: React.FC = () => {
  const { isMobile: autoDetectedMobile } = useDevice();
  const [overrideMobile, setOverrideMobile] = useState<boolean | null>(null);
  const isMobileMode = overrideMobile !== null ? overrideMobile : autoDetectedMobile;

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [activePage, setActivePage] = useState<ActivePage>('desk');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Gestion du Thème Sombre / Clair
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as 'light' | 'dark' | null;
      return savedTheme || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleDeviceMode = () => {
    setOverrideMobile(prev => (prev === null ? !autoDetectedMobile : !prev));
  };

  const toggleSound = () => {
    soundEffects.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  // Modals
  const [showDebateModal, setShowDebateModal] = useState(false);

  // Chargement sauvegarde locale au montage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setGameState(parsed);
        setSelectedCandidate(parsed.player);
      }
    } catch (e) {
      console.error('Erreur chargement sauvegarde', e);
    }
  }, []);

  // Sauvegarde automatique lors des changements d'état
  useEffect(() => {
    if (gameState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  // Initialisation après choix du mode
  const handleSelectMode = (mode: GameMode) => {
    if (!selectedCandidate) return;
    const initial = initializeGame(selectedCandidate, mode);
    setGameState(initial);
    setActivePage('desk');
  };

  // Résolution d'un dilemme d'événement / arbitrage
  const handleResolveEvent = (choice: GameEventChoice) => {
    if (!gameState) return;
    const nextState = processEventChoice(gameState, choice);
    setGameState(nextState);
    soundEffects.playAfpNotification();
  };

  // Résolution du Grand Débat TV
  const handleFinishDebate = (bonus: number) => {
    if (!gameState) return;
    const nextState = { ...gameState };
    nextState.popularity = Math.min(100, nextState.popularity + bonus);
    nextState.pollingIntentionsFirstRound = Math.min(100, nextState.pollingIntentionsFirstRound + bonus);
    setGameState(nextState);
    setShowDebateModal(false);
  };

  // Réinitialisation de la partie
  const handleResetGame = () => {
    if (window.confirm("Êtes-vous sûr de vouloir commencer une nouvelle partie ? La progression actuelle sera effacée.")) {
      localStorage.removeItem(STORAGE_KEY);
      setGameState(null);
      setSelectedCandidate(null);
      setActivePage('desk');
    }
  };

  // 1. Écran de sélection du candidat
  if (!selectedCandidate && !gameState) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] flex flex-col justify-between">
        <Navbar 
          state={{} as any} 
          onReset={() => {}}
          onOpenSettings={() => setActivePage(activePage === 'settings' ? 'desk' : 'settings')}
        />
        <main className="flex-1 py-4">
          {activePage === 'settings' ? (
            <SettingsTab
              theme={theme}
              onToggleTheme={toggleTheme}
              isMobileMode={isMobileMode}
              onToggleDeviceMode={toggleDeviceMode}
              soundEnabled={soundEnabled}
              onToggleSound={toggleSound}
              onResetGame={() => {}}
            />
          ) : (
            <CandidateSelect
              onSelect={(cand) => {
                setSelectedCandidate(cand);
              }}
            />
          )}
        </main>
        <footer className="py-6 border-t-2 border-[var(--border-hard)] bg-[var(--bg-panel)] text-center text-xs font-mono opacity-70">
          SIM-POL 2027 • Simulation Politique & Macroéconomique sous la Ve République française
        </footer>
      </div>
    );
  }

  // 2. Écran de sélection du mode de départ
  if (selectedCandidate && !gameState) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] flex flex-col justify-between">
        <Navbar 
          state={{} as any} 
          onReset={() => setSelectedCandidate(null)}
          onOpenSettings={() => setActivePage(activePage === 'settings' ? 'desk' : 'settings')}
        />
        <main className="flex-1 flex items-center py-4">
          {activePage === 'settings' ? (
            <SettingsTab
              theme={theme}
              onToggleTheme={toggleTheme}
              isMobileMode={isMobileMode}
              onToggleDeviceMode={toggleDeviceMode}
              soundEnabled={soundEnabled}
              onToggleSound={toggleSound}
              onResetGame={() => {}}
            />
          ) : (
            <ModeSelect
              candidate={selectedCandidate}
              onSelectMode={handleSelectMode}
              onBack={() => setSelectedCandidate(null)}
            />
          )}
        </main>
        <footer className="py-6 border-t-2 border-[var(--border-hard)] bg-[var(--bg-panel)] text-center text-xs font-mono opacity-70">
          SIM-POL 2027 • Simulation Politique & Macroéconomique sous la Ve République française
        </footer>
      </div>
    );
  }

  if (!gameState) return null;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] flex flex-col justify-between">
      
      {/* Barre Supérieure d'État */}
      <Navbar
        state={gameState}
        onReset={handleResetGame}
        onOpenDebate={() => setShowDebateModal(true)}
        onOpenSettings={() => { soundEffects.playKeystroke(); setActivePage(activePage === 'settings' ? 'desk' : 'settings'); }}
      />

      {/* Barre de Navigation des Sous-Pages & Retour Bureau */}
      <div className="bg-[var(--bg-panel)] border-b-2 border-[var(--border-hard)] py-2 px-4 shadow-[0px_2px_0px_var(--border-hard)]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          
          {/* Bouton Bureau Principal */}
          <button
            onClick={() => { soundEffects.playKeystroke(); setActivePage('desk'); }}
            className={`px-3 py-1.5 border-2 border-[var(--border-hard)] font-black uppercase flex items-center space-x-1.5 transition-all ${
              activePage === 'desk'
                ? 'bg-[var(--text-main)] text-[var(--bg-panel)] shadow-[2px_2px_0px_var(--border-hard)]'
                : 'bg-[var(--bg-subtle)] text-[var(--text-main)] hover:bg-[var(--bg-panel)]'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>📂 Bureau de l'Élysée</span>
          </button>

          {/* Les Sous-Pages d'Analyse + Onglet Paramètres */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            
            <button
              onClick={() => { soundEffects.playKeystroke(); setActivePage('markets'); }}
              className={`px-2.5 py-1.5 border border-[var(--border-hard)] font-bold uppercase transition-all whitespace-nowrap ${
                activePage === 'markets'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              📈 Bourse & Dette
            </button>

            <button
              onClick={() => { soundEffects.playKeystroke(); setActivePage('parliament'); }}
              className={`px-2.5 py-1.5 border border-[var(--border-hard)] font-bold uppercase transition-all whitespace-nowrap ${
                activePage === 'parliament'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              🏛️ Députés 577 & 49.3
            </button>

            <button
              onClick={() => { soundEffects.playKeystroke(); setActivePage('map'); }}
              className={`px-2.5 py-1.5 border border-[var(--border-hard)] font-bold uppercase transition-all whitespace-nowrap ${
                activePage === 'map'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              🗺️ Territoires
            </button>

            <button
              onClick={() => { soundEffects.playKeystroke(); setActivePage('media'); }}
              className={`px-2.5 py-1.5 border border-[var(--border-hard)] font-bold uppercase transition-all whitespace-nowrap ${
                activePage === 'media'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              📰 Fil AFP
            </button>

            <button
              onClick={() => { soundEffects.playKeystroke(); setActivePage('history'); }}
              className={`px-2.5 py-1.5 border border-[var(--border-hard)] font-bold uppercase transition-all whitespace-nowrap ${
                activePage === 'history'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              📖 Archives
            </button>

            {/* Onglet Paramètres */}
            <button
              onClick={() => { soundEffects.playKeystroke(); setActivePage('settings'); }}
              className={`px-2.5 py-1.5 border border-[var(--border-hard)] font-bold uppercase flex items-center space-x-1 transition-all whitespace-nowrap ${
                activePage === 'settings'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              <Settings className="w-3.5 h-3.5 stroke-[2]" />
              <span>Paramètres</span>
            </button>

          </div>

        </div>
      </div>

      {/* Conteneur Principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        
        {/* ========================================================= */}
        {/* 1. ÉCRAN PRINCIPAL : BUREAU PRÉSIDENTIEL ÉPURÉ (DÉFAUT)   */}
        {/* ========================================================= */}
        {activePage === 'desk' && (
          <CleanPresidentialDesk
            state={gameState}
            onResolveChoice={handleResolveEvent}
            onNavigateSubpage={(page) => setActivePage(page)}
          />
        )}

        {/* ========================================================= */}
        {/* 2. SOUS-PAGE : BOURSE, MARCHÉS, DETTE & ACCORD UE        */}
        {/* ========================================================= */}
        {activePage === 'markets' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)]">
              <button
                onClick={() => setActivePage('desk')}
                className="px-3 py-1.5 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-mono font-bold text-xs uppercase flex items-center space-x-1.5 shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2]" />
                <span>Retour au Bureau Présidentiel</span>
              </button>
              <h2 className="font-serif font-black text-xl">Bourse, Dette Souveraine & Europe</h2>
            </div>
            <SystemicsHub state={gameState} />
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. SOUS-PAGE : ASSEMBLÉE NATIONALE & 577 DÉPUTÉS          */}
        {/* ========================================================= */}
        {activePage === 'parliament' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)]">
              <button
                onClick={() => setActivePage('desk')}
                className="px-3 py-1.5 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-mono font-bold text-xs uppercase flex items-center space-x-1.5 shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2]" />
                <span>Retour au Bureau Présidentiel</span>
              </button>
              <h2 className="font-serif font-black text-xl">Hémicycle & Séances Parlementaires</h2>
            </div>
            <OperationsPanel
              state={gameState}
              onUpdateState={(next) => setGameState(next)}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. SOUS-PAGE : CARTE DE FRANCE DES 13 RÉGIONS             */}
        {/* ========================================================= */}
        {activePage === 'map' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)]">
              <button
                onClick={() => setActivePage('desk')}
                className="px-3 py-1.5 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-mono font-bold text-xs uppercase flex items-center space-x-1.5 shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2]" />
                <span>Retour au Bureau Présidentiel</span>
              </button>
              <h2 className="font-serif font-black text-xl">Cartographie Régionale & Tensions</h2>
            </div>
            <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-6 shadow-[4px_4px_0px_var(--border-hard)]">
              <FranceMap
                state={gameState}
                onSelectRegion={(reg) => console.log('Région sélectionnée:', reg)}
              />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. SOUS-PAGE : DÉPÊCHES AFP & SALLE DE PRESSE             */}
        {/* ========================================================= */}
        {activePage === 'media' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)]">
              <button
                onClick={() => setActivePage('desk')}
                className="px-3 py-1.5 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-mono font-bold text-xs uppercase flex items-center space-x-1.5 shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2]" />
                <span>Retour au Bureau Présidentiel</span>
              </button>
              <h2 className="font-serif font-black text-xl">Salle de Presse & Dépêches AFP</h2>
            </div>
            <CrisisMediaPanel
              state={gameState}
              onResolveChoice={handleResolveEvent}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 6. SOUS-PAGE : ARCHIVES & JOURNAL DE BORD D'ÉTAT         */}
        {/* ========================================================= */}
        {activePage === 'history' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)]">
              <button
                onClick={() => setActivePage('desk')}
                className="px-3 py-1.5 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-mono font-bold text-xs uppercase flex items-center space-x-1.5 shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2]" />
                <span>Retour au Bureau Présidentiel</span>
              </button>
              <h2 className="font-serif font-black text-xl">Archives Présidentielles</h2>
            </div>
            <HistoryTab state={gameState} />
          </div>
        )}

        {/* ========================================================= */}
        {/* 7. SOUS-PAGE DÉDIÉE : PARAMÈTRES DU TERMINAL D'ÉTAT      */}
        {/* ========================================================= */}
        {activePage === 'settings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)]">
              <button
                onClick={() => setActivePage('desk')}
                className="px-3 py-1.5 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-mono font-bold text-xs uppercase flex items-center space-x-1.5 shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2]" />
                <span>Retour au Bureau Présidentiel</span>
              </button>
              <h2 className="font-serif font-black text-xl">Configuration & Paramètres</h2>
            </div>
            <SettingsTab
              theme={theme}
              onToggleTheme={toggleTheme}
              isMobileMode={isMobileMode}
              onToggleDeviceMode={toggleDeviceMode}
              soundEnabled={soundEnabled}
              onToggleSound={toggleSound}
              onResetGame={handleResetGame}
              currentMode={gameState.mode}
              onChangeMode={(newMode) => {
                if (selectedCandidate) {
                  const initial = initializeGame(selectedCandidate, newMode);
                  setGameState(initial);
                  setActivePage('desk');
                }
              }}
            />
          </div>
        )}

      </main>

      {/* Modal Grand Débat TV */}
      {showDebateModal && (
        <TVDebateModal
          state={gameState}
          onFinishDebate={handleFinishDebate}
          onClose={() => setShowDebateModal(false)}
        />
      )}

      {/* Modal Soirée Électorale / Fin de Partie */}
      {gameState.gameOver && (
        <ElectionNightModal
          state={gameState}
          onRestart={handleResetGame}
        />
      )}

      {/* Pied de page */}
      <footer className="mt-12 py-6 border-t-2 border-[var(--border-hard)] bg-[var(--bg-panel)] text-center text-xs font-mono opacity-70">
        SIM-POL 2027 • Simulation Institutionnelle et Macroéconomique sous la Constitution de 1958
      </footer>

    </div>
  );
};

export default App;
