import React, { useState, useEffect } from 'react';
import { Candidate, GameMode, GameState, GameEventChoice } from './types/game';
import { initializeGame, processEventChoice } from './engine/simulation';
import { Navbar } from './components/Navbar';
import { CandidateSelect } from './components/CandidateSelect';
import { CleanPresidentialDesk } from './components/CleanPresidentialDesk';
import { SystemicsHub } from './components/SystemicsHub';
import { HistoryTab } from './components/HistoryTab';
import { SettingsTab } from './components/SettingsTab';
import { CabinetTab } from './components/CabinetTab';
import { TrophiesTab } from './components/TrophiesTab';
import { MotionDeCensureModal } from './components/MotionDeCensureModal';
import { PresidentialAddressModal } from './components/PresidentialAddressModal';
import { PresidentialLegacyModal } from './components/PresidentialLegacyModal';
import { OnboardingModal } from './components/OnboardingModal';
import { FlashNewsModal } from './components/FlashNewsModal';
import { ParliamentVoteModal } from './components/ParliamentVoteModal';
import { FLASH_NEWS_EVENTS } from './data/flashNews';
import { FlashNewsEvent, FlashNewsChoice } from './types/game';
import { soundEffects } from './utils/audio';
import { useDevice } from './hooks/useDevice';
import { useSwipe } from './hooks/useSwipe';
import { 
  ArrowLeft, LineChart, Radio, 
  History, Scale, Volume2, VolumeX, ShieldCheck, Landmark, Settings, 
  ChevronLeft, ChevronRight, FileText, Users, Gavel, Trophy, Wallet
} from 'lucide-react';

const STORAGE_KEY = 'polifrance_2027_gamestate';
const THEME_STORAGE_KEY = 'polifrance_2027_theme';

export type ActivePage = 'desk' | 'markets' | 'cabinet' | 'history' | 'trophies' | 'settings';

const PAGE_ORDER: ActivePage[] = ['desk', 'markets', 'cabinet', 'history', 'trophies', 'settings'];

export const App: React.FC = () => {
  const { isMobile: autoDetectedMobile } = useDevice();
  const [overrideMobile, setOverrideMobile] = useState<boolean | null>(null);
  const isMobileMode = overrideMobile !== null ? overrideMobile : autoDetectedMobile;

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [activePage, setActivePage] = useState<ActivePage>('desk');
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Modals d'actions majeures
  const [showCensureModal, setShowCensureModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [activeFlashNews, setActiveFlashNews] = useState<FlashNewsEvent | null>(null);
  const [activeParliamentVoteChoice, setActiveParliamentVoteChoice] = useState<GameEventChoice | null>(null);

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
        if (showCensureModal) setShowCensureModal(false);
        else if (showAddressModal) setShowAddressModal(false);
        else if (activePage !== 'desk') navigateTo('desk');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePage, showCensureModal, showAddressModal]);

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

    // Déclenchement aléatoire d'un Flash Info AFP (40% de chance)
    if (Math.random() < 0.45 && nextState.turn > 1) {
      const randomFlash = FLASH_NEWS_EVENTS[Math.floor(Math.random() * FLASH_NEWS_EVENTS.length)];
      setTimeout(() => {
        soundEffects.playAfpNotification();
        setActiveFlashNews(randomFlash);
      }, 500);
    }
  };

  // Résolution d'un Flash Info AFP d'Urgence
  const handleResolveFlashNews = (choice: FlashNewsChoice) => {
    if (!gameState) return;
    setGameState(prev => {
      if (!prev) return null;
      const fx = choice.effects;
      return {
        ...prev,
        popularity: fx.popularityDelta ? Math.min(100, Math.max(0, prev.popularity + fx.popularityDelta)) : prev.popularity,
        authorityPoints: fx.authorityDelta ? Math.min(100, Math.max(0, prev.authorityPoints + fx.authorityDelta)) : prev.authorityPoints,
        economy: {
          ...prev.economy,
          deficit: fx.deficitDelta ? Number((prev.economy.deficit + fx.deficitDelta).toFixed(2)) : prev.economy.deficit
        },
        social: {
          ...prev.social,
          strikeRisk: fx.tensionDelta ? Math.min(100, Math.max(0, prev.social.strikeRisk + fx.tensionDelta)) : prev.social.strikeRisk
        },
        causalityLog: [
          ...prev.causalityLog,
          { turn: prev.turn, type: 'popularity' as const, delta: fx.popularityDelta || 0, reason: `Flash AFP : ${choice.label}` },
          { turn: prev.turn, type: 'tension' as const, delta: fx.tensionDelta || 0, reason: `Flash AFP : ${choice.label}` },
          { turn: prev.turn, type: 'authority' as const, delta: fx.authorityDelta || 0, reason: `Flash AFP : ${choice.label}` },
          { turn: prev.turn, type: 'deficit' as const, delta: fx.deficitDelta || 0, reason: `Flash AFP : ${choice.label}` }
        ].filter(l => l.delta !== 0)
      };
    });
    setActiveFlashNews(null);
  };

  // Ajustement de la Politique Fiscale
  const handleToggleTaxPolicy = () => {
    if (!gameState) return;
    soundEffects.playStamp();
    setGameState(prev => {
      if (!prev) return null;
      const current = prev.economy.taxPolicy || 'normale';
      let nextPolicy: 'allégée' | 'normale' | 'renforcée' = 'normale';
      let flowDelta = 0;
      let popDelta = 0;
      let tensDelta = 0;

      if (current === 'normale') {
        nextPolicy = 'renforcée';
        flowDelta = 3.5;
        popDelta = -4;
        tensDelta = 8;
      } else if (current === 'renforcée') {
        nextPolicy = 'allégée';
        flowDelta = -5.5;
        popDelta = 6;
        tensDelta = -8;
      } else {
        nextPolicy = 'normale';
        flowDelta = 2.0;
        popDelta = -2;
        tensDelta = 0;
      }

      const newMonthlyBalance = Number(((prev.economy.monthlyBalance || -1.5) + flowDelta).toFixed(1));
      const newDeficit = Number(Math.max(0.8, 2.9 - (newMonthlyBalance * 0.3)).toFixed(1));

      return {
        ...prev,
        popularity: Math.min(100, Math.max(0, prev.popularity + popDelta)),
        social: {
          ...prev.social,
          strikeRisk: Math.min(100, Math.max(0, prev.social.strikeRisk + tensDelta))
        },
        economy: {
          ...prev.economy,
          taxPolicy: nextPolicy,
          monthlyBalance: newMonthlyBalance,
          deficit: newDeficit
        }
      };
    });
  };

  // Démarrage du vote parlementaire (si < 289 députés)
  const handleStartParliamentVote = (choice: GameEventChoice) => {
    setActiveParliamentVoteChoice(choice);
  };

  // Succès du vote parlementaire
  const handleParliamentVoteSuccess = (
    choice: GameEventChoice, 
    bonusEffects?: { costTreasury?: number; costAuthority?: number; tensionDelta?: number }
  ) => {
    if (!gameState) return;

    if (bonusEffects) {
      setGameState(prev => {
        if (!prev) return null;
        return {
          ...prev,
          authorityPoints: bonusEffects.costAuthority ? Math.max(0, prev.authorityPoints - bonusEffects.costAuthority) : prev.authorityPoints,
          social: {
            ...prev.social,
            strikeRisk: bonusEffects.tensionDelta ? Math.min(100, prev.social.strikeRisk + bonusEffects.tensionDelta) : prev.social.strikeRisk
          },
          economy: {
            ...prev.economy,
            treasury: bonusEffects.costTreasury ? Math.max(0, Number((prev.economy.treasury - bonusEffects.costTreasury).toFixed(1))) : prev.economy.treasury
          }
        };
      });
    }

    setActiveParliamentVoteChoice(null);
    handleResolveEvent(choice);
  };

  // Super-Pouvoir : Réforme Constitutionnelle (si >= 330 députés)
  const handleEnactConstitutionalReform = () => {
    if (!gameState || gameState.deputiesMajority < 330) return;
    soundEffects.playStamp();
    setGameState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        authorityPoints: 100,
        popularity: Math.min(100, prev.popularity + 8),
        social: {
          ...prev.social,
          strikeRisk: Math.max(0, prev.social.strikeRisk - 25)
        },
        economy: {
          ...prev.economy,
          monthlyBalance: Number((prev.economy.monthlyBalance + 2.5).toFixed(1)),
          treasury: Number((prev.economy.treasury + 10).toFixed(1))
        },
        causalityLog: [
          ...prev.causalityLog,
          { turn: prev.turn, type: 'authority' as const, delta: 100, reason: "Réforme Constitutionnelle : Pleins Pouvoirs réaffirmés" },
          { turn: prev.turn, type: 'popularity' as const, delta: 8, reason: "Adhésion au nouveau pacte républicain" }
        ]
      };
    });
  };

  // Sacrifice du Premier Ministre (Fusible Politique)
  const handleSacrificePrimeMinister = () => {
    if (!gameState) return;
    if (gameState.authorityPoints < 20 || gameState.social.strikeRisk < 50) return;
    soundEffects.playStamp();

    setGameState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        authorityPoints: Math.max(0, prev.authorityPoints - 25),
        popularity: Math.min(100, prev.popularity + 5),
        social: {
          ...prev.social,
          strikeRisk: Math.max(0, prev.social.strikeRisk - 30)
        },
        primeMinister: {
          id: `pm_${Date.now()}`,
          role: 'Premier ministre',
          name: 'Nouveau Chef du Gouvernement',
          competence: 80,
          loyalty: 90,
          politicalWeight: 75,
          scandalRisk: 5
        },
        causalityLog: [
          ...prev.causalityLog,
          { turn: prev.turn, type: 'authority' as const, delta: -25, reason: "Coût politique du remaniement d'urgence" },
          { turn: prev.turn, type: 'tension' as const, delta: -30, reason: "Démission du Premier Ministre (Fusible politique activé)" },
          { turn: prev.turn, type: 'popularity' as const, delta: 5, reason: "Soulagement de l'opinion suite au remaniement" }
        ].filter(l => l.delta !== 0)
      };
    });
  };

  // Résolution Carte Tactique
  const handleUseTacticalCard = (cardId: string, effects: {
    popularityDelta?: number;
    tensionDelta?: number;
    authorityCost: number;
    seatsBonus?: number;
    message: string;
  }) => {
    if (!gameState) return;
    setGameState(prev => {
      if (!prev) return null;
      let nextDeputies = prev.deputiesMajority;
      let nextParliament = prev.parliament;

      if (effects.seatsBonus) {
        nextDeputies = Math.min(577, prev.deputiesMajority + effects.seatsBonus);
        nextParliament = prev.parliament.map(g => {
          if (g.stanceTowardsPlayer === 'oppose_moderate') {
            return { ...g, stanceTowardsPlayer: 'coalition' as const };
          }
          return g;
        });
      }

      return {
        ...prev,
        authorityPoints: Math.max(0, prev.authorityPoints - effects.authorityCost),
        popularity: effects.popularityDelta ? Math.min(100, prev.popularity + effects.popularityDelta) : prev.popularity,
        deputiesMajority: nextDeputies,
        parliament: nextParliament,
        social: {
          ...prev.social,
          strikeRisk: effects.tensionDelta ? Math.max(0, prev.social.strikeRisk + effects.tensionDelta) : prev.social.strikeRisk
        }
      };
    });
  };

  // Résolution Allocution 20h
  const handleDeliverSpeech = (effects: { popularityDelta: number; tensionDelta: number; deficitDelta: number; authorityDelta: number; message: string }) => {
    if (!gameState) return;
    setGameState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        addressCount: (prev.addressCount || 0) + 1,
        popularity: Math.min(100, Math.max(0, prev.popularity + effects.popularityDelta)),
        authorityPoints: Math.min(100, Math.max(0, prev.authorityPoints + effects.authorityDelta)),
        economy: {
          ...prev.economy,
          deficit: prev.economy.deficit + effects.deficitDelta
        },
        social: {
          ...prev.social,
          strikeRisk: Math.min(100, Math.max(0, prev.social.strikeRisk + effects.tensionDelta))
        },
        causalityLog: [
          ...prev.causalityLog,
          { turn: prev.turn, type: 'popularity' as const, delta: effects.popularityDelta, reason: "Allocution de 20h" },
          { turn: prev.turn, type: 'tension' as const, delta: effects.tensionDelta, reason: "Allocution de 20h" },
          { turn: prev.turn, type: 'authority' as const, delta: effects.authorityDelta, reason: "Coût de l'Allocution de 20h" }
        ].filter(l => l.delta !== 0)
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

  // Résolution d'une réaction sur le Fil AFP
  const handleApplyMediaReaction = (effects: {
    popularityDelta?: number;
    tensionDelta?: number;
    deficitDelta?: number;
    authorityCost?: number;
    message: string;
  }) => {
    if (!gameState) return;
    setGameState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        popularity: effects.popularityDelta ? Math.min(100, Math.max(0, prev.popularity + effects.popularityDelta)) : prev.popularity,
        authorityPoints: effects.authorityCost ? Math.max(0, prev.authorityPoints - effects.authorityCost) : prev.authorityPoints,
        economy: {
          ...prev.economy,
          deficit: effects.deficitDelta ? prev.economy.deficit + effects.deficitDelta : prev.economy.deficit
        },
        social: {
          ...prev.social,
          strikeRisk: effects.tensionDelta ? Math.min(100, Math.max(0, prev.social.strikeRisk + effects.tensionDelta)) : prev.social.strikeRisk
        }
      };
    });
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
              onSelect={(cand, isCustom, mode, scenario) => {
                setSelectedCandidate(cand);
                const initial = initializeGame(cand, mode || 'governance', isCustom, scenario || 'standard');
                setGameState(initial);
                setActivePage('desk');
                setHasSeenOnboarding(false);
              }}
            />
          )}
        </main>
        <footer className="py-6 border-t-2 border-[var(--border-hard)] bg-[var(--bg-panel)] text-center text-xs font-mono opacity-70">
          POLIFRANCE 2027 • Simulation Politique & Macroéconomique
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
              className={`relative px-2.5 py-1.5 border border-[var(--border-hard)] font-bold uppercase transition-all whitespace-nowrap ${
                activePage === 'markets'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              {gameState?.economy?.deficit >= 3.0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-red)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-red)] border border-[var(--bg-panel)]"></span>
                </span>
              )}
              📈 Bourse & Dette
            </button>

            <button
              onClick={() => navigateTo('cabinet')}
              className={`relative px-2.5 py-1.5 border border-[var(--border-hard)] font-bold uppercase transition-all whitespace-nowrap ${
                activePage === 'cabinet'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              {gameState?.popularity < 30 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-red)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-red)] border border-[var(--bg-panel)]"></span>
                </span>
              )}
              👥 Ministres
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

            <button
              onClick={() => navigateTo('trophies')}
              className={`px-2.5 py-1.5 border border-[var(--border-hard)] font-bold uppercase flex items-center space-x-1 transition-all whitespace-nowrap ${
                activePage === 'trophies'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)]'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)]'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 stroke-[2] text-[var(--accent-amber)]" />
              <span>Panthéon</span>
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
              <span>Config</span>
            </button>

          </div>

        </div>
      </div>

      {/* Conteneur Principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex-1 w-full space-y-6 relative">
        
        {/* ONBOARDING MODAL */}
        {gameState.turn === 1 && !hasSeenOnboarding && (
          <OnboardingModal
            player={gameState.player}
            onClose={() => setHasSeenOnboarding(true)}
          />
        )}

        {/* 1. ÉCRAN PRINCIPAL : BUREAU PRÉSIDENTIEL */}
        {activePage === 'desk' && (
          <CleanPresidentialDesk
            state={gameState}
            onResolveChoice={handleResolveEvent}
            onNavigateSubpage={(page) => navigateTo(page)}
            onOpen49_3={() => setShowCensureModal(true)}
            onOpenAddress={() => setShowAddressModal(true)}
            onSacrificePrimeMinister={handleSacrificePrimeMinister}
            onToggleTaxPolicy={handleToggleTaxPolicy}
            onStartParliamentVote={handleStartParliamentVote}
            onEnactConstitutionalReform={handleEnactConstitutionalReform}
          />
        )}

        {/* 2. SOUS-PAGE : BOURSE, DETTE & MARCHÉS */}
        {activePage === 'markets' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)] font-mono text-xs">
              <button
                onClick={() => navigateTo('desk')}
                className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-2 shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Retour Bureau</span>
              </button>
              <h2 className="font-display font-black text-lg sm:text-xl">Bourse, Dette Souveraine & Europe</h2>
            </div>
            <SystemicsHub state={gameState} />
          </div>
        )}

        {/* 3. SOUS-PAGE : CONSEIL DES MINISTRES */}
        {activePage === 'cabinet' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)] font-mono text-xs">
              <button
                onClick={() => navigateTo('desk')}
                className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-2 shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Retour Bureau</span>
              </button>
              <h2 className="font-display font-black text-lg sm:text-xl">Cabinet & Conseil des Ministres</h2>
            </div>
            <CabinetTab
              state={gameState}
              onPerformRemaniement={handlePerformRemaniement}
            />
          </div>
        )}

        {/* 6. SOUS-PAGE : ARCHIVES */}
        {activePage === 'history' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)] font-mono text-xs">
              <button
                onClick={() => navigateTo('desk')}
                className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-2 shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Retour Bureau</span>
              </button>
              <h2 className="font-display font-black text-lg sm:text-xl">Archives Présidentielles</h2>
            </div>
            <HistoryTab state={gameState} />
          </div>
        )}

        {/* 8. SOUS-PAGE : PANTHÉON DES TROPHÉES */}
        {activePage === 'trophies' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)] font-mono text-xs">
              <button
                onClick={() => navigateTo('desk')}
                className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-2 shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Retour Bureau</span>
              </button>
              <h2 className="font-display font-black text-lg sm:text-xl">Panthéon & Succès Débloqués</h2>
            </div>
            <TrophiesTab state={gameState} />
          </div>
        )}

        {/* 9. SOUS-PAGE : PARAMÈTRES */}
        {activePage === 'settings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)] font-mono text-xs">
              <button
                onClick={() => navigateTo('desk')}
                className="px-3.5 py-2 bg-[var(--text-main)] text-[var(--bg-panel)] border-2 border-[var(--border-hard)] font-bold uppercase flex items-center space-x-2 shadow-[3px_3px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Retour Bureau</span>
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
              className={`relative p-1.5 flex flex-col items-center justify-center space-y-0.5 border ${
                activePage === 'markets'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)] border-[var(--border-hard)]'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-main)] border-transparent'
              }`}
            >
              {gameState?.economy?.deficit >= 3.0 && (
                <span className="absolute top-1 right-2 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-red)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-red)] border border-[var(--bg-panel)]"></span>
                </span>
              )}
              <LineChart className="w-3.5 h-3.5" />
              <span>Bourse</span>
            </button>

            <button
              onClick={() => navigateTo('cabinet')}
              className={`relative p-1.5 flex flex-col items-center justify-center space-y-0.5 border ${
                activePage === 'cabinet'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)] border-[var(--border-hard)]'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-main)] border-transparent'
              }`}
            >
              {gameState?.popularity < 30 && (
                <span className="absolute top-1 right-2 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-red)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-red)] border border-[var(--bg-panel)]"></span>
                </span>
              )}
              <Users className="w-3.5 h-3.5" />
              <span>Ministres</span>
            </button>

            <button
              onClick={() => navigateTo('trophies')}
              className={`p-1.5 flex flex-col items-center justify-center space-y-0.5 border ${
                activePage === 'trophies'
                  ? 'bg-[var(--text-main)] text-[var(--bg-panel)] border-[var(--border-hard)]'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-main)] border-transparent'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Trophées</span>
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

      {/* Modal Flash Info AFP d'Urgence */}
      {activeFlashNews && (
        <FlashNewsModal
          event={activeFlashNews}
          onResolve={handleResolveFlashNews}
        />
      )}

      {/* Modal Vote Parlementaire Interactif (Hémicycle) */}
      {activeParliamentVoteChoice && gameState && (
        <ParliamentVoteModal
          state={gameState}
          choice={activeParliamentVoteChoice}
          onVoteSuccess={handleParliamentVoteSuccess}
          onUse49_3={() => {
            setActiveParliamentVoteChoice(null);
            setShowCensureModal(true);
          }}
          onCancel={() => setActiveParliamentVoteChoice(null)}
        />
      )}

      {/* Modal Bilan Quinquennal / Fin de Mandat */}
      {(gameState.gameOver || gameState.turn >= 60) && (
        <PresidentialLegacyModal
          state={gameState}
          onRestart={handleResetGame}
        />
      )}

      {/* Pied de page Épuré */}
      <footer className={`mt-8 py-5 border-t-2 border-[var(--border-hard)] bg-[var(--bg-panel)] text-center text-xs font-mono font-bold uppercase tracking-wider opacity-70 ${isMobileMode ? 'pb-20' : ''}`}>
        POLIFRANCE 2027
      </footer>

    </div>
  );
};

export default App;
