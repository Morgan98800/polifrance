import { GameState, Candidate, GameEvent, GameEventChoice, GameMode, ProposedLaw, CausalityEntry, CandidateTrait } from '../types/game';
import { INITIAL_PARLIAMENT_GROUPS } from './parliament';
import { GAME_EVENTS } from '../data/events';
import { CANDIDATE_FLAGSHIP_EVENTS } from '../data/candidateSpecificEvents';
import { CATALOG_LAWS } from '../data/laws';

const MONTHS_SEQUENCE = [
  'Novembre 2026', 'Décembre 2026', 'Janvier 2027', 'Février 2027', 'Mars 2027', 'Avril 2027', 'Mai 2027 (1er Tour)', 'Mai 2027 (2nd Tour)'
];

export function generateMonthLabel(turn: number): string {
  if (turn < MONTHS_SEQUENCE.length) return MONTHS_SEQUENCE[turn - 1];
  const year = 2027 + Math.floor((turn - 8) / 12);
  const monthNames = ["Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre", "Janvier", "Février", "Mars", "Avril", "Mai"];
  return `${monthNames[(turn - 8) % 12]} ${year}`;
}

export function initializeGame(
  candidate: Candidate, 
  mode: GameMode, 
  isCustom: boolean = false,
  scenario: 'standard' | 'crise_noire' | 'bloque' = 'standard'
): GameState {
  const initialDeputiesMajority = INITIAL_PARLIAMENT_GROUPS
    .filter(g => g.id === candidate.group || g.stanceTowardsPlayer === 'coalition')
    .reduce((acc, g) => acc + g.seats, 0);

  const flagshipEvent = CANDIDATE_FLAGSHIP_EVENTS[candidate.id];
  const initialEvent = flagshipEvent || GAME_EVENTS[0] || null;

  let startingDeficit = 5.3;
  let startingDebt = 112.8;
  let startingSpread = 78;
  let startingStrike = 35;
  let startingAuthority = candidate.initialInfluence;
  let startingPop = candidate.basePopularity || 58;

  if (scenario === 'crise_noire') {
    startingDeficit = 6.8;
    startingDebt = 118.5;
    startingSpread = 120;
    startingStrike = 80;
    startingAuthority = Math.max(25, candidate.initialInfluence - 30);
    startingPop = Math.max(35, startingPop - 15);
  } else if (scenario === 'bloque') {
    startingStrike = 55;
    startingAuthority = Math.max(30, candidate.initialInfluence - 20);
    startingPop = Math.max(45, startingPop - 8);
  }

  return {
    mode,
    turn: 1,
    currentDate: mode === 'campaign' ? 'Novembre 2026' : 'Mai 2027 (Investiture)',
    countdownWeeks: mode === 'campaign' ? 24 : 52,
    player: candidate,
    isCustomCandidate: isCustom,
    
    // Nouveaux états systémiques
    causalityLog: [],
    addressCount: 0,
    activeProjects: [],

    funds: candidate.initialFunds,
    authorityPoints: startingAuthority,
    signatures: mode === 'campaign' ? candidate.initialSignatures : 500,
    popularity: startingPop,
    pollingIntentionsFirstRound: startingPop,
    pollingRank: startingPop > 25 ? 1 : (startingPop > 20 ? 2 : 3),
    demographics: { ...candidate.demographics },
    parliament: JSON.parse(JSON.stringify(INITIAL_PARLIAMENT_GROUPS)),
    deputiesMajority: scenario === 'bloque' ? Math.min(185, initialDeputiesMajority) : initialDeputiesMajority,
    censureThreshold: 289,
    censureThreatLevel: initialDeputiesMajority >= 289 ? 'faible' : 'moderee',
    hasUsed49_3ThisSession: false,
    economy: {
      growth: 1.1,
      inflation: 2.2,
      unemployment: 7.4,
      deficit: startingDeficit,
      debt: startingDebt,
      spreadOatBund: startingSpread,
      sovereignRating: startingDeficit > 6.0 ? 'A+' : 'AA-',
      ratingAgencyAlert: startingDeficit > 6.0 ? 'degradation_imminente' : 'surveillance',
      euDeficitWarning: startingDeficit > 3.0,
    },
    social: {
      tensionIndex: 'moderee',
      strikeRisk: startingStrike,
      activeFronts: ['Intersyndicale', 'Agriculteurs en colère'],
      mediaBarometer: 'neutre',
    },
    breakingNews: 'Lancement officiel des grandes manœuvres politiques pour 2027',
    newspaperHeadline: '« 2027 : La Ve République face au grand défi de la recomposition »',
    primeMinister: mode === 'governance' ? {
      id: 'pm_1', role: 'Premier ministre', name: 'Chef du Gouvernement', competence: 80, loyalty: 85, politicalWeight: 75, scandalRisk: 10
    } : null,
    ministers: mode === 'governance' ? [
      { id: 'min_eco', role: 'Ministre de l\'Économie', name: 'Bercy', competence: 85, loyalty: 90, politicalWeight: 80, scandalRisk: 5 },
      { id: 'min_int', role: 'Ministre de l\'Intérieur', name: 'Beauvau', competence: 82, loyalty: 80, politicalWeight: 85, scandalRisk: 15 },
    ] : [],
    activeEvent: initialEvent,
    activeLaw: mode === 'governance' ? CATALOG_LAWS[0] : null,
    history: [
      {
        turn: 0,
        date: mode === 'campaign' ? 'Novembre 2026' : 'Mai 2027',
        headline: mode === 'campaign' ? 'Déclaration de candidature' : 'Investiture',
        choiceMade: 'Entrée en fonction',
        popularityAfter: startingPop,
        tensionAfter: 'moderee'
      }
    ],
    gameOver: false,
    victory: false,
  };
}

export function processEventChoice(state: GameState, choice: GameEventChoice): GameState {
  const next = JSON.parse(JSON.stringify(state)) as GameState;
  const fx = choice.effects;
  const traits = next.player.traits || [];
  
  // Vider le log du tour précédent pour n'afficher que le mois en cours
  next.causalityLog = [];

  const logCausality = (type: CausalityEntry['type'], delta: number, reason: string) => {
    if (delta !== 0) next.causalityLog.push({ turn: next.turn, type, delta, reason });
  };

  // --- APPLICATION DES MODIFICATEURS DE TRAITS ---
  let popDelta = fx.popularityDelta || 0;
  let strikeDelta = fx.strikeRiskDelta || fx.tensionDelta || 0;
  let defDelta = fx.deficitDelta || 0;

  if (traits.includes('gauche_radicale')) {
    if (strikeDelta < 0) strikeDelta *= 1.2; // Calme plus vite la rue
    if (defDelta > 0) defDelta *= 1.3; // Les dépenses coûtent plus cher
  }
  if (traits.includes('droite_conservatrice')) {
    if (strikeDelta > 0) strikeDelta *= 1.2; // La rue s'enflamme plus vite
  }
  if (traits.includes('centre_liberal')) {
    if (defDelta < 0) defDelta *= 1.2; // L'austérité est plus efficace
    if (popDelta < 0) popDelta *= 1.2; // L'austérité coûte plus en popularité
  }
  if (traits.includes('populiste_national')) {
    if (popDelta > 0) popDelta *= 1.2; // Fanbase très réactive
    if (defDelta > 0) defDelta *= 1.5; // Les marchés paniquent plus vite
  }

  // 1. Popularité & Démographie
  if (popDelta) {
    const oldPop = next.popularity;
    next.popularity = Math.min(100, Math.max(0, next.popularity + popDelta));
    logCausality('popularity', next.popularity - oldPop, `Effet du dossier : ${choice.label}`);
    next.pollingIntentionsFirstRound = Math.min(100, Math.max(5, next.pollingIntentionsFirstRound + popDelta * 0.8));
  }

  // 2. Ressources & Influence
  if (choice.costFunds) next.funds = Math.max(0, next.funds - choice.costFunds);
  if (choice.costInfluence) {
    next.authorityPoints = Math.max(0, next.authorityPoints - choice.costInfluence);
    logCausality('authority', -choice.costInfluence, `Coût politique du dossier`);
  }

  // 3. Tension sociale
  if (strikeDelta) {
    const oldStrike = next.social.strikeRisk;
    next.social.strikeRisk = Math.min(100, Math.max(0, next.social.strikeRisk + strikeDelta));
    logCausality('tension', next.social.strikeRisk - oldStrike, `Réaction au dossier`);
    
    const ts = next.social.strikeRisk;
    if (ts > 75) next.social.tensionIndex = 'crise';
    else if (ts > 50) next.social.tensionIndex = 'elevee';
    else if (ts > 25) next.social.tensionIndex = 'moderee';
    else next.social.tensionIndex = 'faible';
  }

  // 4. Macro-économie
  if (defDelta) {
    const oldDef = next.economy.deficit;
    next.economy.deficit = Number((next.economy.deficit + defDelta).toFixed(2));
    logCausality('deficit', next.economy.deficit - oldDef, `Impact budgétaire du dossier`);
    next.economy.debt = Number((next.economy.debt + defDelta * 0.4).toFixed(1));
    next.economy.spreadOatBund = Math.max(30, next.economy.spreadOatBund + (defDelta > 0 ? 8 : -6));
  }
  if (fx.growthDelta) {
    next.economy.growth = Number((next.economy.growth + fx.growthDelta).toFixed(2));
  }

  // --- EFFETS SYSTEMIQUES (CASCADES) ---
  
  // A. Charisme Régalien & Pouvoir de Contrainte
  if (next.authorityPoints > 75 && strikeDelta > 0) {
    const discount = Math.round(strikeDelta * 0.3);
    if (discount > 0) {
      next.social.strikeRisk = Math.max(0, next.social.strikeRisk - discount);
      logCausality('tension', -discount, `Charisme régalien : Autorité forte (>75) amortit la colère`);
    }
  }

  // B. État « Canard Boiteux » (Lame Duck) si Autorité < 20
  if (next.authorityPoints < 20) {
    next.social.strikeRisk = Math.min(100, next.social.strikeRisk + 2);
    logCausality('tension', 2, `Canard Boiteux : Autorité vacillante (<20), la rue teste l'État`);
  }

  // C. Cascade Économique
  if (next.economy.deficit > 4.5 && next.economy.sovereignRating !== 'A') {
    next.economy.sovereignRating = 'A';
    next.social.strikeRisk = Math.min(100, next.social.strikeRisk + 5);
    next.authorityPoints = Math.max(0, next.authorityPoints - 10);
    logCausality('rating', -1, `Dégradation de la note souveraine par les agences (Déficit hors contrôle)`);
    logCausality('authority', -10, `Perte de crédibilité suite à la dégradation de la note`);
    logCausality('tension', 5, `Inquiétude générale face à la dette`);
  } else if (next.economy.deficit > 3.0 && next.economy.sovereignRating === 'AA') {
    next.economy.sovereignRating = 'AA-';
    next.economy.spreadOatBund += 20;
    logCausality('rating', -1, `Mise sous surveillance négative (Déficit > 3.0%)`);
    logCausality('bourse', -5, `Les marchés financiers s'inquiètent de la dérive budgétaire`);
  }

  // D. Génération d'Autorité
  let baseAuthGain = next.social.strikeRisk < 50 ? 10 : 5;
  if (next.economy.sovereignRating === 'A' || next.economy.sovereignRating === 'AA-') {
    baseAuthGain = Math.floor(baseAuthGain / 2); // Malus de la bourse
    logCausality('authority', baseAuthGain, `Génération mensuelle (Malus de défiance des marchés)`);
  } else {
    logCausality('authority', baseAuthGain, `Génération mensuelle naturelle`);
  }
  next.authorityPoints = Math.min(100, next.authorityPoints + baseAuthGain);

  // E. Usure du Pouvoir
  if (next.turn > 36) {
    next.popularity = Math.max(0, next.popularity - 1);
    logCausality('popularity', -1, `Usure du pouvoir (Lassitude démocratique de l'Année 4)`);
  }

  // F. Couplage Organique : Cohérence Popularité vs Tension Sociale
  // 1. L'Effet Étouffement : Une forte adhésion populaire calme naturellement la rue
  if (next.popularity >= 60) {
    const calmDiscount = Math.round((next.popularity - 55) / 2);
    next.social.strikeRisk = Math.max(0, next.social.strikeRisk - calmDiscount);
  }
  // 2. L'Effet Climat Anxiogène : Le blocage prolongé use la cote du président
  if (next.social.strikeRisk >= 75) {
    const erosion = Math.round((next.social.strikeRisk - 70) / 5);
    next.popularity = Math.max(0, next.popularity - erosion);
  }
  // 3. Plafonds et planchers de cohérence politique
  if (next.popularity >= 65) {
    next.social.strikeRisk = Math.min(55, next.social.strikeRisk);
  }
  if (next.popularity <= 25) {
    next.social.strikeRisk = Math.max(35, next.social.strikeRisk);
  }

  // 5. Historique & Prochain tour
  next.history.unshift({
    turn: next.turn,
    date: next.currentDate,
    headline: next.activeEvent?.title || 'Arbitrage politique',
    choiceMade: choice.label,
    popularityAfter: next.popularity,
    tensionAfter: next.social.tensionIndex,
  });

  next.turn += 1;
  next.currentDate = generateMonthLabel(next.turn);

  const availableEvents = GAME_EVENTS.filter(e => e.id !== next.activeEvent?.id);
  next.activeEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)] || null;
  if (next.activeEvent?.breakingNewsChyron) {
    next.breakingNews = next.activeEvent.breakingNewsChyron;
  }

  // --- CONDITIONS DE GAME OVER STRICTES ---
  if (next.mode === 'governance') {
    if (next.popularity <= 0) {
      next.gameOver = true;
      next.endGameReason = "Démission forcée. Votre impopularité est absolue, votre propre majorité vous lâche. Vous quittez l'Élysée.";
    } else if (next.social.strikeRisk >= 100) {
      next.gameOver = true;
      next.endGameReason = "Insurrection. L'Élysée est assiégé, le pays est totalement bloqué. Le gouvernement tombe sous la pression de la rue.";
    } else if (next.turn > 60) {
      next.gameOver = true;
      next.victory = true;
      next.endGameReason = "Fin du quinquennat ! Vous avez survécu à 5 années de crises.";
    }
  }

  return next;
}
