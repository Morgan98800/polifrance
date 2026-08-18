import { GameState, Candidate, GameEvent, GameEventChoice, GameMode, ProposedLaw } from '../types/game';
import { INITIAL_PARLIAMENT_GROUPS } from './parliament';
import { GAME_EVENTS } from '../data/events';
import { CANDIDATE_FLAGSHIP_EVENTS } from '../data/candidateSpecificEvents';
import { CATALOG_LAWS } from '../data/laws';

const MONTHS_SEQUENCE = [
  'Novembre 2026',
  'Décembre 2026',
  'Janvier 2027',
  'Février 2027',
  'Mars 2027',
  'Avril 2027',
  'Mai 2027 (1er Tour)',
  'Mai 2027 (2nd Tour)',
  'Juin 2027 (Législatives)',
  'Juillet 2027',
  'Septembre 2027 (Budget PLF)',
  'Octobre 2027',
  'Novembre 2027',
  'Décembre 2027'
];

export function initializeGame(candidate: Candidate, mode: GameMode, isCustom: boolean = false): GameState {
  const initialDeputiesMajority = INITIAL_PARLIAMENT_GROUPS
    .filter(g => g.id === candidate.group || g.stanceTowardsPlayer === 'coalition')
    .reduce((acc, g) => acc + g.seats, 0);

  // Événement inaugural en accord strict avec le programme du candidat
  const flagshipEvent = CANDIDATE_FLAGSHIP_EVENTS[candidate.id];
  const initialEvent = flagshipEvent || GAME_EVENTS[0] || null;

  return {
    mode,
    turn: 1,
    currentDate: mode === 'campaign' ? 'Novembre 2026' : 'Mai 2027 (Investiture)',
    countdownWeeks: mode === 'campaign' ? 24 : 52,
    player: candidate,
    isCustomCandidate: isCustom,
    funds: candidate.initialFunds,
    authorityPoints: candidate.initialInfluence,
    signatures: mode === 'campaign' ? candidate.initialSignatures : 500,
    popularity: candidate.basePopularity,
    pollingIntentionsFirstRound: candidate.basePopularity,
    pollingRank: candidate.basePopularity > 25 ? 1 : (candidate.basePopularity > 20 ? 2 : 3),
    demographics: { ...candidate.demographics },
    parliament: JSON.parse(JSON.stringify(INITIAL_PARLIAMENT_GROUPS)),
    deputiesMajority: initialDeputiesMajority,
    censureThreshold: 289,
    censureThreatLevel: initialDeputiesMajority >= 289 ? 'faible' : 'moderee',
    hasUsed49_3ThisSession: false,
    economy: {
      growth: 1.1,
      inflation: 2.2,
      unemployment: 7.4,
      deficit: 5.3,
      debt: 112.8,
      spreadOatBund: 78,
      ratingAgencyAlert: 'surveillance',
      euDeficitWarning: true,
    },
    social: {
      tensionIndex: 'moderee',
      strikeRisk: 35,
      activeFronts: ['Intersyndicale', 'Agriculteurs en colère'],
      mediaBarometer: 'neutre',
    },
    breakingNews: 'Lancement officiel des grandes manœuvres politiques pour 2027',
    newspaperHeadline: '« 2027 : La Ve République face au grand défi de la recomposition »',
    primeMinister: mode === 'governance' ? {
      id: 'pm_1',
      role: 'Premier ministre',
      name: 'Chef du Gouvernement',
      competence: 80,
      loyalty: 85,
      politicalWeight: 75,
      scandalRisk: 10
    } : null,
    ministers: mode === 'governance' ? [
      { id: 'min_eco', role: 'Ministre de l\'Économie & Finances', name: 'Bercy', competence: 85, loyalty: 90, politicalWeight: 80, scandalRisk: 5 },
      { id: 'min_int', role: 'Ministre de l\'Intérieur', name: 'Beauvau', competence: 82, loyalty: 80, politicalWeight: 85, scandalRisk: 15 },
      { id: 'min_jus', role: 'Garde des Sceaux, Justice', name: 'Place Vendôme', competence: 78, loyalty: 85, politicalWeight: 70, scandalRisk: 10 },
      { id: 'min_tra', role: 'Ministre du Travail & Santé', name: 'Grenelle', competence: 75, loyalty: 75, politicalWeight: 65, scandalRisk: 12 },
    ] : [],
    activeEvent: initialEvent,
    activeLaw: mode === 'governance' ? CATALOG_LAWS[0] : null,
    history: [
      {
        turn: 0,
        date: mode === 'campaign' ? 'Novembre 2026' : 'Mai 2027',
        headline: mode === 'campaign' ? 'Déclaration de candidature officielle' : 'Cérémonie d\'investiture au Palais de l\'Élysée',
        choiceMade: 'Entrée en fonction',
        popularityAfter: candidate.basePopularity,
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

  // 1. Popularité & Démographie
  if (fx.popularityDelta) {
    next.popularity = Math.min(100, Math.max(5, next.popularity + fx.popularityDelta));
    next.pollingIntentionsFirstRound = Math.min(100, Math.max(5, next.pollingIntentionsFirstRound + fx.popularityDelta * 0.8));
  }

  if (fx.demographicsDelta) {
    Object.entries(fx.demographicsDelta).forEach(([key, val]) => {
      const k = key as keyof typeof next.demographics;
      if (next.demographics[k] !== undefined && typeof val === 'number') {
        next.demographics[k] = Math.min(100, Math.max(0, next.demographics[k] + val));
      }
    });
  }

  // 2. Ressources & Influence
  if (choice.costFunds) {
    next.funds = Math.max(0, next.funds - choice.costFunds);
  }
  if (choice.costInfluence) {
    next.authorityPoints = Math.max(0, next.authorityPoints - choice.costInfluence);
  }
  if (fx.signaturesDelta) {
    next.signatures = Math.min(500, Math.max(0, next.signatures + fx.signaturesDelta));
  }

  // 3. Tension sociale & Climat
  if (fx.tensionDelta) {
    const tensionScores = { faible: 10, moderee: 35, elevee: 65, crise: 90 };
    let currentScore = tensionScores[next.social.tensionIndex] + fx.tensionDelta;
    currentScore = Math.min(100, Math.max(0, currentScore));
    if (currentScore > 75) next.social.tensionIndex = 'crise';
    else if (currentScore > 50) next.social.tensionIndex = 'elevee';
    else if (currentScore > 25) next.social.tensionIndex = 'moderee';
    else next.social.tensionIndex = 'faible';
  }

  if (fx.strikeRiskDelta) {
    next.social.strikeRisk = Math.min(100, Math.max(0, next.social.strikeRisk + fx.strikeRiskDelta));
  }

  if (fx.mediaShift) {
    next.social.mediaBarometer = fx.mediaShift;
  }

  // 4. Macro-économie
  if (fx.deficitDelta) {
    next.economy.deficit = Number((next.economy.deficit + fx.deficitDelta).toFixed(2));
    next.economy.debt = Number((next.economy.debt + fx.deficitDelta * 0.4).toFixed(1));
    next.economy.spreadOatBund = Math.max(30, next.economy.spreadOatBund + (fx.deficitDelta > 0 ? 8 : -6));
  }

  if (fx.growthDelta) {
    next.economy.growth = Number((next.economy.growth + fx.growthDelta).toFixed(2));
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

  // Avancement du temps
  next.turn += 1;
  next.countdownWeeks = Math.max(0, next.countdownWeeks - (next.mode === 'campaign' ? 2 : 4));
  const monthIdx = Math.min(MONTHS_SEQUENCE.length - 1, next.turn);
  next.currentDate = MONTHS_SEQUENCE[monthIdx] || `Mois ${next.turn}`;

  // Choix du prochain événement aléatoire / logique
  const availableEvents = GAME_EVENTS.filter(e => e.id !== next.activeEvent?.id);
  const randomEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
  next.activeEvent = randomEvent || null;
  if (randomEvent?.breakingNewsChyron) {
    next.breakingNews = randomEvent.breakingNewsChyron;
  }

  // Vérification de fin de partie en campagne
  if (next.mode === 'campaign' && next.countdownWeeks <= 0) {
    next.gameOver = true;
    next.victory = next.pollingIntentionsFirstRound >= 22; // Qualifié ou vainqueur
    next.endGameReason = next.victory
      ? 'Félicitations ! Votre campagne vous hisse au second tour puis à la victoire présidentielle !'
      : 'Votre score au 1er tour ne vous permet pas de vous qualifier pour le second tour.';
  }

  return next;
}
