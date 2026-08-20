export type IdeologyGroup = 
  | 'gauche_radicale' 
  | 'gauche_sociale' 
  | 'centre_majorite' 
  | 'droite_republicaine' 
  | 'droite_nationale' 
  | 'non_inscrits';

export type GameMode = 'campaign' | 'governance';

export interface DemographicBreakdown {
  retraites: number;      // Retraités & Séniors (0-100)
  populaires: number;     // Classes populaires & Ouvriers
  cadres: number;         // Cadres & CSP+
  jeunesse: number;       // Jeunesse & Étudiants
  fonctionnaires: number; // Fonction publique & Enseignants
  rural: number;          // Monde rural & Périurbain
}

export type CandidateTrait = 'gauche_radicale' | 'droite_conservatrice' | 'centre_liberal' | 'populiste_national';

export interface CausalityEntry {
  turn: number;
  type: 'popularity' | 'tension' | 'deficit' | 'authority' | 'majority' | 'rating' | 'bourse';
  delta: number;
  reason: string;
}

export interface GrandProject {
  id: string;
  name: string;
  category: 'energie' | 'sante' | 'defense' | 'transport';
  icon: string;
  description: string;
  totalCost: number; // en Mds €
  costPerTurn: number; // Mds € prélevé par mois
  durationTurns: number; // durée en mois
  turnsRemaining: number;
  completed: boolean;
  effectDescription: string;
  effects: {
    growthDelta?: number;
    permanentTensionDiscount?: number;
    permanentAuthorityBonus?: number;
    popularityDelta?: number;
    monthlyBalanceImpact?: number;
  };
}

export interface FlashNewsChoice {
  label: string;
  description: string;
  effects: {
    popularityDelta?: number;
    tensionDelta?: number;
    deficitDelta?: number;
    authorityDelta?: number;
    message: string;
  };
}

export interface FlashNewsEvent {
  id: string;
  title: string;
  subtitle: string;
  category: 'scandale' | 'social' | 'international' | 'economie' | 'securite';
  source: string;
  timeLabel: string;
  choices: [FlashNewsChoice, FlashNewsChoice];
  condition?: (state: GameState) => boolean;
}

export interface BudgetAllocation {
  health: number;    // % ou Mds
  security: number;
  ecology: number;
  social: number;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  avatar: string;
  group: IdeologyGroup;
  traits?: CandidateTrait[];
  tagline: string;
  doctrine: string;
  strengths: string[];
  weaknesses: string[];
  basePopularity: number;
  demographics: DemographicBreakdown;
  initialFunds: number; // en k€
  initialInfluence: number;
  initialSignatures: number; // 0-500
}

export interface ParliamentGroup {
  id: IdeologyGroup;
  name: string;
  shortName: string;
  seats: number;
  color: string;
  discipline: number; // 0-1
  stanceTowardsPlayer: 'loyal' | 'coalition' | 'oppose_moderate' | 'oppose_hard';
}

export interface MacroEconomics {
  growth: number;        // Croissance PIB % (ex: 1.1)
  inflation: number;     // Inflation % (ex: 2.3)
  unemployment: number;  // Chômage % (ex: 7.4)
  treasury: number;      // Trésorerie d'État en Mds € (ex: 45.0)
  monthlyBalance: number;// Solde net mensuel en Mds € (ex: -1.5)
  taxPolicy: 'allégée' | 'normale' | 'renforcée'; // Politique fiscale active
  deficit: number;       // Déficit public % PIB calculé (ex: 3.1)
  debt: number;          // Dette publique % PIB (ex: 112.5)
  spreadOatBund: number; // Écart de taux avec l'Allemagne en bps (ex: 75)
  sovereignRating: string; // Ex: "AA", "AA-", "A+"
  ratingAgencyAlert: 'stable' | 'surveillance' | 'degradation_imminente';
  euDeficitWarning: boolean;
}

export interface SocialClimate {
  tensionIndex: 'faible' | 'moderee' | 'elevee' | 'crise';
  strikeRisk: number; // 0-100 (Indice Tension)
  activeFronts: string[]; // ['Intersyndicale', 'Agriculteurs en colère', 'Policiers']
  mediaBarometer: 'tres_favorable' | 'favorable' | 'neutre' | 'hostile' | 'tempete_mediatique';
}

export interface GameEventChoice {
  id: string;
  label: string;
  description: string;
  costFunds?: number; // k€
  costInfluence?: number;
  effects: {
    popularityDelta?: number;
    demographicsDelta?: Partial<DemographicBreakdown>;
    tensionDelta?: number;
    strikeRiskDelta?: number;
    authorityDelta?: number;
    costTreasury?: number; // Dépense directe en Mds € (ex: 8)
    revenueTreasury?: number; // Rentrée directe en Mds € (ex: 12)
    monthlyBalanceDelta?: number; // Impact pérenne sur le flux mensuel (ex: -0.5)
    deficitDelta?: number; // %
    growthDelta?: number;
    signaturesDelta?: number;
    parliamentConfidenceDelta?: number;
    mediaShift?: SocialClimate['mediaBarometer'];
    message: string;
  };
}

export interface GameEvent {
  id: string;
  title: string;
  category: 'social' | 'politique' | 'economique' | 'international' | 'mediatique' | 'parlementaire' | 'securite' | 'environnement';
  description: string;
  source: string;
  icon: string;
  breakingNewsChyron?: string;
  condition?: (state: GameState) => boolean;
  choices: GameEventChoice[];
}

export interface ProposedLaw {
  id: string;
  title: string;
  category: 'economie' | 'securite' | 'social' | 'ecologie' | 'institutions';
  summary: string;
  costOrSavings: number; // Milliards d'€ (+ = coût, - = économies)
  impactPopularity: Partial<DemographicBreakdown>;
  impactTension: number;
  supportByGroup: Record<IdeologyGroup, number>; // Estimation soutien %
  senateSupport: 'favorable' | 'neutre' | 'hostile';
  status: 'draft' | 'assembly_reading' | 'senate_reading' | 'cmp' | 'passed' | 'rejected' | 'adopted_49_3';
}

export interface GameHistoryLog {
  turn: number;
  date: string;
  headline: string;
  choiceMade: string;
  popularityAfter: number;
  tensionAfter: SocialClimate['tensionIndex'];
}

export interface Minister {
  id: string;
  role: string;
  name: string;
  competence: number; // 1-100
  loyalty: number;    // 1-100
  politicalWeight: number; // 1-100
  scandalRisk: number; // 0-100
  status: string;
  roadmap?: string;
}

export interface PoliticalCard {
  id: string;
  name: string;
  category: 'mediatique' | 'parlementaire' | 'social' | 'renseignement' | 'republicain';
  icon: string;
  description: string;
  flavor: string;
  authorityCost: number;
  effects: {
    popularityDelta?: number;
    tensionDelta?: number;
    authorityDelta?: number;
    seatsGained?: number;
    treasuryGained?: number;
    quashScandal?: boolean;
    censureThreatReduction?: number;
    mitigateNextCrisis?: boolean;
    message: string;
  };
}

export interface PresidentialLegacyStats {
  lawsEnactedCount: number;
  used49_3Count: number;
  completedProjectsCount: number;
  tacticalCardsPlayedCount: number;
  finalDeficit: number;
  finalDebt: number;
  finalRating: string;
  finalPopularity: number;
  finalTension: number;
  presidentialRank: 'S+' | 'A' | 'B' | 'C' | 'D' | 'F';
  emergentTitle: string;
  machiavellianScore: number;
  keyAchievements: string[];
  historicalFigureMatch: {
    name: string;
    title: string;
    description: string;
    quote: string;
  };
}

export interface GameState {
  mode: GameMode;
  turn: number; // 1, 2, 3...
  currentDate: string; // "Novembre 2026", "Décembre 2026"...
  countdownWeeks: number; // jusqu'à Mai 2027
  
  // Nouveaux états systémiques
  causalityLog: CausalityEntry[];
  addressCount: number;
  activeProjects: GrandProject[];
  completedProjectsHistory: string[];

  // Cabinet Noir / Manœuvres Tactiques
  tacticalCards: PoliticalCard[];
  playedCardsHistory: string[];
  lastCardDrawTurn?: number;

  // Joueur
  player: Candidate;
  isCustomCandidate: boolean;
  
  // Ressources
  funds: number; // k€
  authorityPoints: number; // Capital politique 0-100
  signatures: number; // 0-500 (campagne)
  
  // Statistiques électorales & opinion
  popularity: number; // 0-100%
  pollingIntentionsFirstRound: number; // % 1er tour
  pollingRank: number;
  demographics: DemographicBreakdown;
  
  // Parlement
  parliament: ParliamentGroup[];
  deputiesMajority: number; // Total fidèles
  censureThreshold: number; // 289
  censureThreatLevel: 'faible' | 'moderee' | 'critique';
  hasUsed49_3ThisSession: boolean;
  hasDissolved: boolean;
  
  // Économie & Social
  economy: MacroEconomics;
  social: SocialClimate;
  
  // Médias
  breakingNews: string;
  newspaperHeadline: string;
  
  // Gouvernement (Mode B)
  primeMinister: Minister | null;
  ministers: Minister[];
  
  // État du tour
  activeEvent: GameEvent | null;
  activeFlashNews?: FlashNewsEvent | null;
  annualBudgetHistory?: Array<{ year: number; allocation: BudgetAllocation; deficitImpact: number }>;
  lastAnnualBudgetTurn?: number;
  activeLaw: ProposedLaw | null;
  history: GameHistoryLog[];
  
  // Fin de partie
  gameOver: boolean;
  victory: boolean;
  endGameReason?: string;
  secondRoundOpponent?: Candidate;
  finalScore?: number;
  legacyStats?: PresidentialLegacyStats;
}
