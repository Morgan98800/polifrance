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

export interface Candidate {
  id: string;
  name: string;
  party: string;
  avatar: string;
  group: IdeologyGroup;
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
  deficit: number;       // Déficit public % PIB (ex: -5.1)
  debt: number;          // Dette publique % PIB (ex: 112.5)
  spreadOatBund: number; // Écart de taux avec l'Allemagne en bps (ex: 75)
  ratingAgencyAlert: 'stable' | 'surveillance' | 'degradation_imminente';
  euDeficitWarning: boolean;
}

export interface SocialClimate {
  tensionIndex: 'faible' | 'moderee' | 'elevee' | 'crise';
  strikeRisk: number; // 0-100%
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
}

export interface GameState {
  mode: GameMode;
  turn: number; // 1, 2, 3...
  currentDate: string; // "Novembre 2026", "Décembre 2026"...
  countdownWeeks: number; // jusqu'à Mai 2027
  
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
  activeLaw: ProposedLaw | null;
  history: GameHistoryLog[];
  
  // Fin de partie
  gameOver: boolean;
  victory: boolean;
  endGameReason?: string;
  secondRoundOpponent?: Candidate;
  finalScore?: number;
}
