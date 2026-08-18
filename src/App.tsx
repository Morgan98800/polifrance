import React, { useState, useEffect } from 'react';
import { Candidate, GameMode, GameState, GameEventChoice } from './types/game';
import { initializeGame, processEventChoice } from './engine/simulation';
import { Navbar } from './components/Navbar';
import { CandidateSelect } from './components/CandidateSelect';
import { CleanPresidentialDesk } from './components/CleanPresidentialDesk';
import { OperationsPanel } from './components/OperationsPanel';
import { FranceMap } from './components/FranceMap';
import { CrisisMediaPanel } from './components/CrisisMediaPanel';
import { SystemicsHub } from './components/SystemicsHub';
import { HistoryTab } from './components/HistoryTab';
import { SettingsTab } from './components/SettingsTab';
import { CabinetTab } from './components/CabinetTab';
import { TVDebateModal } from './components/TVDebateModal';
import { MotionDeCensureModal } from './components/MotionDeCensureModal';
import { PresidentialAddressModal } from './components/PresidentialAddressModal';
import { PresidentialLegacyModal } from './components/PresidentialLegacyModal';
import { soundEffects } from './utils/audio';
import { useDevice } from './hooks/useDevice';
import { useSwipe } from './hooks/useSwipe';
import { 
  ArrowLeft, LineChart, Building2, Globe, Radio, 
  History, Scale, Volume2, VolumeX, ShieldCheck, Landmark, Settings, 
  ChevronLeft, ChevronRight, FileText, Users, Tv, Gavel
} from 'lucide-react';

const STORAGE_KEY = 'polifrance_2027_gamestate';
const THEME_STORAGE_KEY = 'polifrance_2027_theme';

export type ActivePage = 'desk' | 'markets' | 'parliament' | 'map' | 'media' | 'history' | 'cabinet' | 'settings';

const PAGE_ORDER: ActivePage[] = ['desk', 'markets', 'parliament', 'map', 'media', 'history', 'cabinet', 'settings'];

export const App: React.FC = () => {
  const { isMobile: autoDetectedMobile } = useDevice();
  const [overrideMobile, setOverrideMobile] = useState<boolean | null>(null);
  const isMobileMode = overrideMobile !== null ? overrideMobile : autoDetectedMobile;

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [activePage, setActivePage] = useState<ActivePage>('desk');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Modals d'actions majeures
  const [showDebateModal, setShowDebateModal] = useState(false);
  const [showCensureModal, setShowCensureModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

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

  // Synchronisation de l'historique du navigateur
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ActivePage;
      if (PAGE_ORDER.includes(hash)) {
        setActivePage(hash);
      } else {
        setActivePage('desk');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: ActivePage) => {
    soundEffects.playKeystroke();
    setActivePage(page);
    window.location.hash = page === 'desk' ? '' : page;
  };

  // Raccourcis Clavier Globaux : Touche Échap / Backspace pour retour au Bureau
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape' || e.key === 'Backspace') {
        if (showDebateModal) setShowDebateModal(false);
        else if (showCensureModal) setShowCensureModal(false);
        else if (showAddressModal) setShowAddressModal(false);
        else if (activePage !== 'desk') navigateTo('desk');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePage, showDebateModal, showCensureModal, showAddressModal]);

  // Gestes Tactiles Swipe
  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      const currentIndex = PAGE_ORDER.indexOf(activePage);
      if (currentIndex < PAGE_ORDER.length - 1) {
        navigateTo(PAGE_ORDER[currentIndex + 1]);
      }
    },
    onSwipeRight: () => {
      const currentIndex = PAGE_ORDER.indexOf(activePage);
      if (currentIndex > 0) {
        navigateTo(PAGE_ORDER[currentIndex - 1]);
      }
    }
  });

  // Chargement sauvegarde locale
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

  // Sauvegarde automatique
  useEffect(() => {
    if (gameState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  // Résolution d'un dilemme d'événement / arbitrage
  const handleResolveEvent = (choice: GameEventChoice) => {
    if (!gameState) return;
    const nextState = processEventChoice(gameState, choice);
    setGameState(nextState);
    soundEffects.playAfpNotification();
  };

  // Résolution Allocution 20h
  const handleDeliverSpeech = (effects: { popularityDelta: number; tensionDelta: number; deficitDelta: number; authorityDelta: number; message: string }) => {
    if (!gameState) return;
    setGameState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        popularity: Math.min(100, Math.max(0, prev.popularity + effects.popularityDelta)),
        authorityPoints: Math.min(100, Math.max(0, prev.authorityPoints + effects.authorityDelta)),
        economy: {
          ...prev.economy,
          deficit: prev.economy.deficit + effects.deficitDelta
        },
        social: {
          ...prev.social,
          strikeRisk: Math.min(100, Math.max(0, prev.social.strikeRisk + effects.tensionDelta))
        }
      };
    });
  };

  // Résolution 49.3 & Censure
  const handleSurviveCensure = (censureVotes: number) => {
    if (!gameState) return;
    setGameState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        hasUsed49_3ThisSession: true,
        authorityPoints: Math.max(0, prev.authorityPoints - 15),
        social: {
          ...prev.social,
          strikeRisk: Math.min(100, prev.social.strikeRisk + 20)
        }
      };
    });
    setShowCensureModal(false);
  };

  const handleFallCensure = (censureVotes: number) => {
    if (!gameState) return;
    setGameState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        gameOver: true,
        victory: false,
        endGameReason: `Motion de censure adoptée avec ${censureVotes} voix contre le Gouvernement.`
      };
    });
    setShowCensureModal(false);
  };

  // Résolution Remaniement Ministériel
  const handlePerformRemaniement = (effects: { popularityDelta: number; authorityCost: number; message: string }) => {
    if (!gameState) return;
    setGameState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        popularity: Math.min(100, prev.popularity + effects.popularityDelta),
        authorityPoints: Math.max(0, prev.authorityPoints - effects.authorityCost)
      };
    });
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
    localStorage.removeItem(STORAGE_KEY);
    setGameState(null);
    setSelectedCandidate(null);
    setActivePage('desk');
    window.location.hash = '';
  };

  // 1. Écran de sélection directe du candidat et du mode
  if (!gameState) {
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
              onSelect={(cand, isCustom, mode) => {
                setSelectedCandidate(cand);
                const initial = initializeGame(cand, mode || 'governance');
                setGameState(initial);
                setActivePage('desk');
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

  return (
    <div 
      {...swipeHandlers}
      className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] flex flex-col justify-between select-none"
    >
      
      {/* Barre Supérieure d'État */}
      <Navbar
        state={gameState}
        onReset={handleResetGame}
        onOpenDebate={() => setShowDebateModal(true)}
        onOpenSettings={() => navigateTo(activePage === 'settings' ? 'desk' : 'settings')}
      />

      {/* Barre de Navigation des Sous-Pages & Retour Bureau */}
      <div className="bg-[var(--bg-panel)] border-b-2 border-[var(--border-hard)] py-2 px-4 shadow-[0px_2px_0px_var(--border-hard)]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          
          {/* Bouton Bureau Principal */}
          <button
            onClick={() => navigateTo('desk')}
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
              onClick={() => navigateTo('markets')}
              className={`px-2.5 py-1.5 border border-[var(--border-hard)] font-bold uppercase transition-all whitespace-nowrap ${
                activePage === 'markets'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              📈 Bourse & Dette
            </button>

            <button
              onClick={() => navigateTo('parliament')}
              className={`px-2.5 py-1.5 border border-[var(--border-hard)] font-bold uppercase transition-all whitespace-nowrap ${
                activePage === 'parliament'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              🏛️ Députés 577 & 49.3
            </button>

            <button
              onClick={() => navigateTo('cabinet')}
              className={`px-2.5 py-1.5 border border-[var(--border-hard)] font-bold uppercase transition-all whitespace-nowrap ${
                activePage === 'cabinet'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              👥 Ministres
            </button>

            <button
              onClick={() => navigateTo('map')}
              className={`px-2.5 py-1.5 border border-[var(--border-hard)] font-bold uppercase transition-all whitespace-nowrap ${
                activePage === 'map'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              🗺️ Territoires
            </button>

            <button
              onClick={() => navigateTo('media')}
              className={`px-2.5 py-1.5 border border-[var(--border-hard)] font-bold uppercase transition-all whitespace-nowrap ${
                activePage === 'media'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              📰 Fil AFP
            </button>

            <button
              onClick={() => navigateTo('history')}
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
              onClick={() => navigateTo('settings')}
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
        {/* 1. ÉCRAN PRINCIPAL : BUREAU PRÉSIDENTIEL ÉPURÉ            */}
        {/* ========================================================= */}
        {activePage === 'desk' && (
          <CleanPresidentialDesk
            state={gameState}
            onResolveChoice={handleResolveEvent}
            onNavigateSubpage={(page) => navigateTo(page)}
            onOpen49_3={() => setShowCensureModal(true)}
            onOpenAddress={() => setShowAddressModal(true)}
          />
        )}

        {/* ========================================================= */}
        {/* 2. SOUS-PAGE : BOURSE, MARCHÉS, DETTE & ACCORD UE        */}
        {/* ========================================================= */}
        {activePage === 'markets' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)] font-mono text-xs">
              <button
                onClick={() => navigateTo('desk')}
                className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-2 shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>⬅️ RETOUR AU BUREAU (ÉCHAP)</span>
              </button>
              <h2 className="font-display font-black text-lg sm:text-xl">Bourse, Dette Souveraine & Europe</h2>
            </div>
            <SystemicsHub state={gameState} />
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => navigateTo('desk')}
                className="px-4 py-2 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-mono font-bold text-xs uppercase flex items-center space-x-2 shadow-[2px_2px_0px_var(--border-hard)]"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2]" />
                <span>Retour au Bureau Présidentiel</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. SOUS-PAGE : ASSEMBLÉE NATIONALE & 577 DÉPUTÉS          */}
        {/* ========================================================= */}
        {activePage === 'parliament' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)] font-mono text-xs">
              <button
                onClick={() => navigateTo('desk')}
                className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-2 shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>⬅️ RETOUR AU BUREAU (ÉCHAP)</span>
              </button>
              <h2 className="font-display font-black text-lg sm:text-xl">Hémicycle & 577 Députés</h2>
            </div>
            <OperationsPanel
              state={gameState}
              onUpdateState={(next) => setGameState(next)}
            />
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => navigateTo('desk')}
                className="px-4 py-2 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-mono font-bold text-xs uppercase flex items-center space-x-2 shadow-[2px_2px_0px_var(--border-hard)]"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2]" />
                <span>Retour au Bureau Présidentiel</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. SOUS-PAGE : CONSEIL DES MINISTRES & REMANIEMENT        */}
        {/* ========================================================= */}
        {activePage === 'cabinet' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)] font-mono text-xs">
              <button
                onClick={() => navigateTo('desk')}
                className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-2 shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>⬅️ RETOUR AU BUREAU (ÉCHAP)</span>
              </button>
              <h2 className="font-display font-black text-lg sm:text-xl">Cabinet & Conseil des Ministres</h2>
            </div>
            <CabinetTab
              state={gameState}
              onPerformRemaniement={handlePerformRemaniement}
            />
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => navigateTo('desk')}
                className="px-4 py-2 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-mono font-bold text-xs uppercase flex items-center space-x-2 shadow-[2px_2px_0px_var(--border-hard)]"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2]" />
                <span>Retour au Bureau Présidentiel</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. SOUS-PAGE : CARTE DE FRANCE DES 13 RÉGIONS             */}
        {/* ========================================================= */}
        {activePage === 'map' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)] font-mono text-xs">
              <button
                onClick={() => navigateTo('desk')}
                className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-2 shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>⬅️ RETOUR AU BUREAU (ÉCHAP)</span>
              </button>
              <h2 className="font-display font-black text-lg sm:text-xl">Cartographie Régionale</h2>
            </div>
            <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-6 shadow-[4px_4px_0px_var(--border-hard)]">
              <FranceMap
                state={gameState}
                onSelectRegion={(reg) => console.log('Région:', reg)}
              />
            </div>
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => navigateTo('desk')}
                className="px-4 py-2 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-mono font-bold text-xs uppercase flex items-center space-x-2 shadow-[2px_2px_0px_var(--border-hard)]"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2]" />
                <span>Retour au Bureau Présidentiel</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 6. SOUS-PAGE : DÉPÊCHES AFP & SALLE DE PRESSE             */}
        {/* ========================================================= */}
        {activePage === 'media' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)] font-mono text-xs">
              <button
                onClick={() => navigateTo('desk')}
                className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-2 shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>⬅️ RETOUR AU BUREAU (ÉCHAP)</span>
              </button>
              <h2 className="font-display font-black text-lg sm:text-xl">Salle de Presse & Dépêches AFP</h2>
            </div>
            <CrisisMediaPanel
              state={gameState}
              onResolveChoice={handleResolveEvent}
            />
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => navigateTo('desk')}
                className="px-4 py-2 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-mono font-bold text-xs uppercase flex items-center space-x-2 shadow-[2px_2px_0px_var(--border-hard)]"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2]" />
                <span>Retour au Bureau Présidentiel</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 7. SOUS-PAGE : ARCHIVES & JOURNAL DE BORD D'ÉTAT         */}
        {/* ========================================================= */}
        {activePage === 'history' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)] font-mono text-xs">
              <button
                onClick={() => navigateTo('desk')}
                className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-2 shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>⬅️ RETOUR AU BUREAU (ÉCHAP)</span>
              </button>
              <h2 className="font-display font-black text-lg sm:text-xl">Archives Présidentielles</h2>
            </div>
            <HistoryTab state={gameState} />
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => navigateTo('desk')}
                className="px-4 py-2 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-mono font-bold text-xs uppercase flex items-center space-x-2 shadow-[2px_2px_0px_var(--border-hard)]"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2]" />
                <span>Retour au Bureau Présidentiel</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 8. SOUS-PAGE DÉDIÉE : PARAMÈTRES DU TERMINAL D'ÉTAT      */}
        {/* ========================================================= */}
        {activePage === 'settings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)] font-mono text-xs">
              <button
                onClick={() => navigateTo('desk')}
                className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-2 shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>⬅️ RETOUR AU BUREAU (ÉCHAP)</span>
              </button>
              <h2 className="font-display font-black text-lg sm:text-xl">Configuration & Paramètres</h2>
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
                  navigateTo('desk');
                }
              }}
            />
          </div>
        )}

      </main>

      {/* Barre Tactile Inférieure Mobile */}
      {isMobileMode && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-panel)] border-t-2 border-[var(--border-hard)] px-2 py-1.5 shadow-[0px_-2px_0px_var(--border-hard)]">
          <div className="max-w-md mx-auto grid grid-cols-6 gap-1 font-mono text-[9px] text-center font-bold">
            <button
              onClick={() => navigateTo('desk')}
              className={`p-1.5 flex flex-col items-center justify-center space-y-0.5 border ${
                activePage === 'desk'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)] border-[var(--border-hard)]'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-main)] border-transparent'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Bureau</span>
            </button>

            <button
              onClick={() => navigateTo('markets')}
              className={`p-1.5 flex flex-col items-center justify-center space-y-0.5 border ${
                activePage === 'markets'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)] border-[var(--border-hard)]'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-main)] border-transparent'
              }`}
            >
              <LineChart className="w-3.5 h-3.5" />
              <span>Bourse</span>
            </button>

            <button
              onClick={() => navigateTo('parliament')}
              className={`p-1.5 flex flex-col items-center justify-center space-y-0.5 border ${
                activePage === 'parliament'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)] border-[var(--border-hard)]'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-main)] border-transparent'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Députés</span>
            </button>

            <button
              onClick={() => navigateTo('cabinet')}
              className={`p-1.5 flex flex-col items-center justify-center space-y-0.5 border ${
                activePage === 'cabinet'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)] border-[var(--border-hard)]'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-main)] border-transparent'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Ministres</span>
            </button>

            <button
              onClick={() => navigateTo('media')}
              className={`p-1.5 flex flex-col items-center justify-center space-y-0.5 border ${
                activePage === 'media'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)] border-[var(--border-hard)]'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-main)] border-transparent'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>AFP</span>
            </button>

            <button
              onClick={() => navigateTo('settings')}
              className={`p-1.5 flex flex-col items-center justify-center space-y-0.5 border ${
                activePage === 'settings'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)] border-[var(--border-hard)]'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-main)] border-transparent'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Config</span>
            </button>
          </div>
        </nav>
      )}

      {/* Modal Débat TV */}
      {showDebateModal && (
        <TVDebateModal
          state={gameState}
          onFinishDebate={handleFinishDebate}
          onClose={() => setShowDebateModal(false)}
        />
      )}

      {/* Modal 49.3 & Vote de Censure */}
      {showCensureModal && (
        <MotionDeCensureModal
          state={gameState}
          onSurviveCensure={handleSurviveCensure}
          onFallCensure={handleFallCensure}
          onCancel={() => setShowCensureModal(false)}
        />
      )}

      {/* Modal Allocution TV 20h */}
      {showAddressModal && (
        <PresidentialAddressModal
          state={gameState}
          onDeliverSpeech={handleDeliverSpeech}
          onClose={() => setShowAddressModal(false)}
        />
      )}

      {/* Modal Bilan Quinquennal / Fin de Mandat */}
      {(gameState.gameOver || gameState.turn >= 60) && (
        <PresidentialLegacyModal
          state={gameState}
          onRestart={handleResetGame}
        />
      )}

      {/* Pied de page */}
      <footer className={`mt-8 py-6 border-t-2 border-[var(--border-hard)] bg-[var(--bg-panel)] text-center text-xs font-mono opacity-70 ${isMobileMode ? 'pb-20' : ''}`}>
        SIM-POL 2027 • Simulation Institutionnelle et Macroéconomique sous la Constitution de 1958
      </footer>

    </div>
  );
};

export default App;
