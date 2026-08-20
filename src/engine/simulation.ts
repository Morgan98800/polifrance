import { GameState, Candidate, GameEvent, GameEventChoice, GameMode, ProposedLaw, CausalityEntry, CandidateTrait, PresidentialLegacyStats, PoliticalCard } from '../types/game';
import { INITIAL_PARLIAMENT_GROUPS, getParliamentForCandidate } from './parliament';
import { GAME_EVENTS } from '../data/events';
import { CANDIDATE_FLAGSHIP_EVENTS } from '../data/candidateSpecificEvents';
import { CATALOG_LAWS } from '../data/laws';
import { CATALOG_POLITICAL_CARDS } from '../data/politicalCards';

const MONTHS_SEQUENCE = [
  'Novembre 2026', 'Décembre 2026', 'Janvier 2027', 'Février 2027', 'Mars 2027', 'Avril 2027', 'Mai 2027 (1er Tour)', 'Mai 2027 (2nd Tour)'
];

export function generateMonthLabel(turn: number): string {
  if (turn < MONTHS_SEQUENCE.length) return MONTHS_SEQUENCE[turn - 1];
  const year = 2027 + Math.floor((turn - 8) / 12);
  const monthNames = ["Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre", "Janvier", "Février", "Mars", "Avril", "Mai"];
  return `${monthNames[(turn - 8) % 12]} ${year}`;
}

export function computePresidentialLegacy(state: GameState): PresidentialLegacyStats {
  const isCensured = state.endGameReason?.includes('censure') || state.endGameReason?.includes('Censure');
  const isBankrupt = state.endGameReason?.includes('Banqueroute') || (state.economy.treasury <= 0 && state.economy.deficit >= 4.5);
  const isInsurrection = state.endGameReason?.includes('Insurrection') || state.social.strikeRisk >= 100;
  const isForcedResignation = state.endGameReason?.includes('Démission') || state.popularity <= 0;
  
  const completedCount = (state.completedProjectsHistory || []).length;
  const cardsPlayedCount = (state.playedCardsHistory || []).length;
  const used49_3 = state.hasUsed49_3ThisSession ? 1 : 0;
  const lawsCount = state.history.length;
  const pop = state.popularity;
  const deficit = state.economy.deficit;
  const debt = state.economy.debt;
  const auth = state.authorityPoints;

  // Calcul du score machiavélique (0 à 100%)
  const machiavellianScore = Math.min(100, Math.max(10, 
    (used49_3 * 30) + 
    (cardsPlayedCount * 12) + 
    (state.hasDissolved ? 20 : 0) + 
    (auth > 75 ? 15 : 0)
  ));

  // Titre Émergent Satirique
  let emergentTitle = "L'Équilibriste des Crises";
  if (used49_3 >= 1 && machiavellianScore >= 60) {
    emergentTitle = "Le Monarque du 49.3";
  } else if (cardsPlayedCount >= 3) {
    emergentTitle = "Le Machiavel de l'Élysée";
  } else if (completedCount >= 2) {
    emergentTitle = "Le Grand Bâtisseur Atomique";
  } else if (deficit >= 5.0) {
    emergentTitle = "Le Naufrageur des Finances";
  } else if (pop >= 60) {
    emergentTitle = "Le Monstre Sacré de l'Opinion";
  } else if (isCensured) {
    emergentTitle = "Le Colosse aux Pieds d'Argile";
  } else if (isInsurrection) {
    emergentTitle = "Le Balayé des Barricades";
  }

  // 3 Faits d'armes clés
  const keyAchievements: string[] = [];
  if (completedCount > 0) {
    keyAchievements.push(`A mené à bien ${completedCount} Grand(s) Chantier(s) d'État structurant(s).`);
  } else {
    keyAchievements.push("N'a pu achever aucun grand chantier d'avenir pour la France.");
  }
  if (state.hasDissolved) {
    keyAchievements.push(`A dissous l'Assemblée Nationale pour recomposer l'Hémicycle (${state.deputiesMajority} sièges).`);
  } else if (used49_3 > 0) {
    keyAchievements.push("A engagé la responsabilité du gouvernement par le 49.3 pour forcer le vote.");
  } else {
    keyAchievements.push("A gouverné dans le respect strict des équilibres parlementaires.");
  }
  if (cardsPlayedCount > 0) {
    keyAchievements.push(`A dégainé ${cardsPlayedCount} coup(s) politique(s) secret(s) du Cabinet Noir.`);
  } else {
    keyAchievements.push(`A terminé son mandat avec un déficit stabilisé à ${deficit}%.`);
  }

  let rank: PresidentialLegacyStats['presidentialRank'] = 'B';
  let figure = {
    name: 'François Mitterrand (1981 – 1995)',
    title: 'Le Sphinx Stratège & Florentin',
    description: 'Une habileté politique remarquable à naviguer entre les tempêtes et à imposer sa marque dans la durée.',
    quote: '« Il faut laisser du temps au temps. »'
  };

  if (isBankrupt || isForcedResignation) {
    rank = 'F';
    figure = {
      name: 'Paul Deschanel (1920)',
      title: 'La Démission Précipitée',
      description: 'Un mandat brisé net par l\'incapacité à maîtriser la dérive des événements.',
      quote: '« La fonction présidentielle est un fardeau écrasant. »'
    };
  } else if (isInsurrection) {
    rank = 'F';
    figure = {
      name: 'Louis-Philippe 1er (1848)',
      title: 'Le Balayé des Barricades',
      description: 'L\'État a ignoré la colère populaire jusqu\'à ce que la rue n\'emporte le pouvoir.',
      quote: '« On ne gouverne pas contre le peuple assemblé. »'
    };
  } else if (isCensured) {
    rank = 'D';
    figure = {
      name: 'Georges Pompidou (Gouvernement censuré en 1962)',
      title: 'La Chute sous le 49.3',
      description: 'Une volonté de passer en force sanctionnée par le vote de défiance du Parlement.',
      quote: '« La censure est le couperet de la démocratie parlementaire. »'
    };
  } else if (state.turn >= 60 || state.victory) {
    if (pop >= 60 && deficit <= 3.0 && auth >= 70 && completedCount >= 2) {
      rank = 'S+';
      figure = {
        name: 'Général Charles de Gaulle (1958 – 1969)',
        title: 'Le Monument de la Ve République',
        description: 'Une autorité historique incontestée, des institutions solides, de grands chantiers industriels achevés et la France respectée dans le monde.',
        quote: '« La France ne peut être la France sans la grandeur. »'
      };
    } else if (pop >= 50 && deficit <= 3.5 && completedCount >= 1) {
      rank = 'A';
      figure = {
        name: 'Georges Pompidou (1969 – 1974)',
        title: 'Le Grand Bâtisseur Industriel',
        description: 'Un quinquennat marqué par la modernisation du pays, l\'investissement d\'avenir et l\'équilibre financier.',
        quote: '« L\'industrie est le nerf de notre indépendance. »'
      };
    } else if (pop >= 38 && deficit <= 4.2) {
      rank = 'B';
      figure = {
        name: 'Jacques Chirac (1995 – 2007)',
        title: 'L\'Équilibriste des Crises',
        description: 'Une capacité d\'écoute et de résistance face aux crises sociales successives.',
        quote: '« Un chef, c\'est fait pour cheffer. »'
      };
    } else {
      rank = 'C';
      figure = {
        name: 'François Hollande (2012 – 2017)',
        title: 'Le Quinquennat Sous Haute Tension',
        description: 'Un mandat marqué par les frondes parlementaires et une usure rapide de la popularité.',
        quote: '« Être président, c\'est être le garant du compromis républicain. »'
      };
    }
  }

  return {
    lawsEnactedCount: lawsCount,
    used49_3Count: used49_3,
    completedProjectsCount: completedCount,
    tacticalCardsPlayedCount: cardsPlayedCount,
    finalDeficit: deficit,
    finalDebt: debt,
    finalRating: state.economy.sovereignRating || 'AA-',
    finalPopularity: pop,
    finalTension: state.social.strikeRisk,
    presidentialRank: rank,
    emergentTitle,
    machiavellianScore,
    keyAchievements,
    historicalFigureMatch: figure
  };
}

export function playPoliticalCard(state: GameState, cardId: string): GameState {
  const next = JSON.parse(JSON.stringify(state)) as GameState;
  const cardIndex = next.tacticalCards.findIndex(c => c.id === cardId);
  if (cardIndex === -1) return next;

  const card = next.tacticalCards[cardIndex];
  if (next.authorityPoints < card.authorityCost) return next;

  // Déduire le coût d'autorité
  next.authorityPoints = Math.max(0, next.authorityPoints - card.authorityCost);

  // Appliquer les effets
  const fx = card.effects;
  if (fx.popularityDelta) next.popularity = Math.min(100, Math.max(0, next.popularity + fx.popularityDelta));
  if (fx.tensionDelta) next.social.strikeRisk = Math.min(100, Math.max(0, next.social.strikeRisk + fx.tensionDelta));
  if (fx.authorityDelta && fx.authorityDelta > 0) next.authorityPoints = Math.min(100, next.authorityPoints + fx.authorityDelta);
  if (fx.seatsGained) next.deputiesMajority = Math.min(577, next.deputiesMajority + fx.seatsGained);
  if (fx.treasuryGained) next.economy.treasury = Number((next.economy.treasury + fx.treasuryGained).toFixed(1));

  if (fx.quashScandal && next.ministers) {
    next.ministers = next.ministers.map(m => ({ ...m, scandalRisk: 5 }));
  }

  // Historique et causalité
  next.playedCardsHistory = next.playedCardsHistory || [];
  next.playedCardsHistory.push(card.name);

  next.causalityLog = next.causalityLog || [];
  next.causalityLog.push({
    turn: next.turn,
    type: 'authority',
    delta: -card.authorityCost,
    reason: `Cabinet Noir : « ${card.name} »`
  });

  // Retirer la carte de la main
  next.tacticalCards.splice(cardIndex, 1);
  next.breakingNews = `COUP DE THÉÂTRE : ${card.effects.message}`;

  return next;
}

export function drawPoliticalCard(state: GameState): GameState {
  const next = JSON.parse(JSON.stringify(state)) as GameState;
  if (next.tacticalCards.length >= 4 || next.authorityPoints < 25) return next;

  next.authorityPoints = Math.max(0, next.authorityPoints - 25);

  const availableCards = CATALOG_POLITICAL_CARDS.filter(
    c => !next.tacticalCards.some(tc => tc.id === c.id)
  );

  if (availableCards.length > 0) {
    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
    next.tacticalCards.push(randomCard);
    next.lastCardDrawTurn = next.turn;
    next.causalityLog = next.causalityLog || [];
    next.causalityLog.push({
      turn: next.turn,
      type: 'authority',
      delta: -25,
      reason: `Cabinet Noir : Pioche de « ${randomCard.name} »`
    });
  }

  return next;
}

export function initializeGame(
  candidate: Candidate, 
  mode: GameMode, 
  isCustom: boolean = false,
  scenario: 'standard' | 'crise_noire' | 'bloque' = 'standard'
): GameState {
  const parliamentGroups = getParliamentForCandidate(candidate.group);
  const initialDeputiesMajority = parliamentGroups
    .filter(g => g.stanceTowardsPlayer === 'loyal' || g.stanceTowardsPlayer === 'coalition')
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

  // 2 cartes tactiques de départ
  const startingCards = [CATALOG_POLITICAL_CARDS[0], CATALOG_POLITICAL_CARDS[1]];

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
    completedProjectsHistory: [],

    // Cabinet Noir
    tacticalCards: startingCards,
    playedCardsHistory: [],
    lastCardDrawTurn: 1,

    funds: candidate.initialFunds,
    authorityPoints: startingAuthority,
    signatures: mode === 'campaign' ? candidate.initialSignatures : 500,
    popularity: startingPop,
    pollingIntentionsFirstRound: startingPop,
    pollingRank: startingPop > 25 ? 1 : (startingPop > 20 ? 2 : 3),
    demographics: { ...candidate.demographics },
    parliament: parliamentGroups,
    deputiesMajority: scenario === 'bloque' ? Math.min(185, initialDeputiesMajority) : initialDeputiesMajority,
    censureThreshold: 289,
    censureThreatLevel: initialDeputiesMajority >= 289 ? 'faible' : 'moderee',
    hasUsed49_3ThisSession: false,
    hasDissolved: false,
    economy: {
      growth: 1.1,
      inflation: 2.2,
      unemployment: 7.4,
      treasury: 50.0,
      monthlyBalance: -1.5,
      taxPolicy: 'normale',
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
      id: 'pm_1', role: 'Premier ministre', name: 'Chef du Gouvernement', competence: 80, loyalty: 85, politicalWeight: 75, scandalRisk: 10, status: 'Supervise l\'action gouvernementale'
    } : null,
    ministers: mode === 'governance' ? [
      { id: 'min_eco', role: 'MINISTRE DE L\'ÉCONOMIE (BERCY)', name: 'Antoine Delorme', competence: 85, loyalty: 90, politicalWeight: 80, scandalRisk: 15, status: 'Gère le budget et la dette' },
      { id: 'min_int', role: 'MINISTRE DE L\'INTÉRIEUR (BEAUVAU)', name: 'Général Henri Marchand', competence: 82, loyalty: 80, politicalWeight: 85, scandalRisk: 20, status: 'Ordre public et forces de sécurité' },
      { id: 'min_travail', role: 'MINISTRE DU TRAVAIL & SANTÉ', name: 'Claire Vasseur', competence: 75, loyalty: 80, politicalWeight: 70, scandalRisk: 25, status: 'Concertations syndicales' },
      { id: 'min_ecolo', role: 'MINISTRE DE L\'ÉNERGIE & TRANSITION', name: 'Marcelle Lefèvre', competence: 80, loyalty: 75, politicalWeight: 65, scandalRisk: 15, status: 'Planification écologique et nucléaire' }
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

  // --- 0. AVANCEMENT DES GRANDS CHANTIERS D'INVESTISSEMENT ---
  if (next.activeProjects && next.activeProjects.length > 0) {
    const remainingProjects = [];
    for (const project of next.activeProjects) {
      // Ponction budgétaire mensuelle du chantier
      next.economy.treasury = Math.max(0, Number((next.economy.treasury - project.costPerTurn).toFixed(1)));
      project.turnsRemaining -= 1;

      if (project.turnsRemaining <= 0) {
        // Le projet est achevé avec succès !
        project.completed = true;
        next.completedProjectsHistory = next.completedProjectsHistory || [];
        next.completedProjectsHistory.push(project.name);

        if (project.effects.growthDelta) next.economy.growth = Number((next.economy.growth + project.effects.growthDelta).toFixed(2));
        if (project.effects.popularityDelta) next.popularity = Math.min(100, next.popularity + project.effects.popularityDelta);
        if (project.effects.permanentAuthorityBonus) next.authorityPoints = Math.min(100, next.authorityPoints + project.effects.permanentAuthorityBonus);
        if (project.effects.monthlyBalanceImpact) next.economy.monthlyBalance = Number((next.economy.monthlyBalance + project.effects.monthlyBalanceImpact).toFixed(1));
        if (project.effects.permanentTensionDiscount) next.social.strikeRisk = Math.max(0, next.social.strikeRisk - project.effects.permanentTensionDiscount);

        logCausality('popularity', project.effects.popularityDelta || 5, `🎉 Inauguration : ${project.name}`);
        next.breakingNews = `INAUGURATION NATIONALE : Le Grand Projet « ${project.name} » est officiellement achevé !`;
      } else {
        remainingProjects.push(project);
      }
    }
    next.activeProjects = remainingProjects;
  }

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

  // Mise à jour de l'électorat démographique
  if (fx.demographicsDelta) {
    for (const [key, val] of Object.entries(fx.demographicsDelta)) {
      const demoKey = key as keyof typeof next.demographics;
      if (next.demographics[demoKey] !== undefined) {
        next.demographics[demoKey] = Math.max(0, Math.min(100, next.demographics[demoKey] + (val || 0)));
      }
    }
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

  // 4. Macro-économie : Trésorerie, Solde et Déficit interconnectés
  const directCost = fx.costTreasury || (defDelta > 0 ? Number((defDelta * 8).toFixed(1)) : 0);
  const directGain = fx.revenueTreasury || (defDelta < 0 ? Number((Math.abs(defDelta) * 8).toFixed(1)) : 0);
  const flowImpact = fx.monthlyBalanceDelta || (defDelta !== 0 ? Number((-defDelta * 0.8).toFixed(1)) : 0);

  if (directCost > 0) {
    next.economy.treasury = Math.max(0, Number((next.economy.treasury - directCost).toFixed(1)));
  }
  if (directGain > 0) {
    next.economy.treasury = Number((next.economy.treasury + directGain).toFixed(1));
  }
  if (flowImpact !== 0) {
    next.economy.monthlyBalance = Number((next.economy.monthlyBalance + flowImpact).toFixed(1));
  }

  // Application du flux mensuel récurrent sur la trésorerie
  next.economy.treasury = Math.max(0, Number((next.economy.treasury + next.economy.monthlyBalance).toFixed(1)));

  // Calcul dynamique du déficit annuel
  const computedDeficit = Number(Math.max(0.8, 2.9 - (next.economy.monthlyBalance * 0.3)).toFixed(1));
  next.economy.deficit = computedDeficit;
  next.economy.debt = Number((next.economy.debt + Math.max(0, computedDeficit - 2.5) * 0.2).toFixed(1));
  next.economy.spreadOatBund = Math.max(30, Math.round(50 + computedDeficit * 12));

  if (fx.growthDelta) {
    next.economy.growth = Number((next.economy.growth + fx.growthDelta).toFixed(2));
  }

  // --- EFFETS SYSTEMIQUES & CASCADES ---
  if (next.authorityPoints > 75 && strikeDelta > 0) {
    const discount = Math.round(strikeDelta * 0.3);
    if (discount > 0) {
      next.social.strikeRisk = Math.max(0, next.social.strikeRisk - discount);
      logCausality('tension', -discount, `Charisme régalien : Autorité forte (>75) amortit la colère`);
    }
  }

  if (next.authorityPoints < 20) {
    next.social.strikeRisk = Math.min(100, next.social.strikeRisk + 2);
    logCausality('tension', 2, `Canard Boiteux : Autorité vacillante (<20), la rue teste l'État`);
  }

  if (next.economy.deficit > 4.5 && next.economy.sovereignRating !== 'A') {
    next.economy.sovereignRating = 'A';
    next.social.strikeRisk = Math.min(100, next.social.strikeRisk + 5);
    next.authorityPoints = Math.max(0, next.authorityPoints - 10);
    logCausality('rating', -1, `Dégradation de la note souveraine par les agences (Déficit hors contrôle)`);
    logCausality('authority', -10, `Perte de crédibilité suite à la dégradation de la note`);
  } else if (next.economy.deficit > 3.0 && next.economy.sovereignRating === 'AA') {
    next.economy.sovereignRating = 'AA-';
    next.economy.spreadOatBund += 20;
    logCausality('rating', -1, `Mise sous surveillance négative (Déficit > 3.0%)`);
  }

  let baseAuthGain = next.social.strikeRisk < 50 ? 10 : 5;
  if (next.economy.sovereignRating === 'A' || next.economy.sovereignRating === 'AA-') {
    baseAuthGain = Math.floor(baseAuthGain / 2);
  }
  next.authorityPoints = Math.min(100, next.authorityPoints + baseAuthGain);

  // Usure du pouvoir (Année 4)
  if (next.turn > 36) {
    next.popularity = Math.max(0, next.popularity - 1);
  }

  // Couplage Organique
  if (next.popularity >= 60) {
    const calmDiscount = Math.round((next.popularity - 55) / 2);
    next.social.strikeRisk = Math.max(0, next.social.strikeRisk - calmDiscount);
  }
  if (next.social.strikeRisk >= 75) {
    const erosion = Math.round((next.social.strikeRisk - 70) / 5);
    next.popularity = Math.max(0, next.popularity - erosion);
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

  // --- SÉLECTION DYNAMIQUE NON-LINÉAIRE DU PROCHAIN ÉVÉNEMENT ---
  let selectedEvent: GameEvent | null = null;

  // A. Paliers Historiques Fixes & Grands Rendez-Vous Géopolitiques
  if (next.turn === 16) {
    selectedEvent = GAME_EVENTS.find(e => e.id === 'evt_sommet_bruxelles_mercosur') || null;
  } else if (next.turn === 24) {
    selectedEvent = GAME_EVENTS.find(e => e.id === 'evt_elections_europeennes_mi_mandat') || null;
  } else if (next.turn === 28) {
    selectedEvent = GAME_EVENTS.find(e => e.id === 'evt_export_nucleaire_epr_europe') || null;
  } else if (next.turn === 36) {
    selectedEvent = GAME_EVENTS.find(e => e.id === 'evt_choc_geopolitique_mondial') || null;
  } else if (next.turn === 44) {
    selectedEvent = GAME_EVENTS.find(e => e.id === 'evt_onu_veto_moment_gaulliste') || null;
  } else if (next.turn === 52) {
    selectedEvent = GAME_EVENTS.find(e => e.id === 'evt_sommet_defense_europeenne') || null;
  }

  // B. Déclenchement de Crises Systémiques Imprévues (Dès le mois 5+)
  if (!selectedEvent && next.turn >= 5) {
    if (next.social.strikeRisk >= 75 && Math.random() < 0.45) {
      selectedEvent = GAME_EVENTS.find(e => e.id === 'evt_greve_bloquante_raffineries') || null;
    } else if (next.economy.deficit >= 4.5 && Math.random() < 0.40) {
      selectedEvent = GAME_EVENTS.find(e => e.id === 'evt_crise_dette_bruxelles') || null;
    }
  }

  // C. Sélection aléatoire standard
  if (!selectedEvent) {
    const availableEvents = GAME_EVENTS.filter(e => e.id !== next.activeEvent?.id);
    selectedEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)] || null;
  }

  next.activeEvent = selectedEvent;
  if (next.activeEvent?.breakingNewsChyron) {
    next.breakingNews = next.activeEvent.breakingNewsChyron;
  }

  // --- CONDITIONS DE GAME OVER STRICTES & CALCUL DU VERDICT ---
  if (next.mode === 'governance') {
    if (next.popularity <= 0) {
      next.gameOver = true;
      next.endGameReason = "Démission forcée. Votre impopularité est absolue, votre propre majorité vous lâche. Vous quittez l'Élysée.";
      next.legacyStats = computePresidentialLegacy(next);
    } else if (next.social.strikeRisk >= 100) {
      next.gameOver = true;
      next.endGameReason = "Insurrection. L'Élysée est assiégé, le pays est totalement bloqué. Le gouvernement tombe sous la pression de la rue.";
      next.legacyStats = computePresidentialLegacy(next);
    } else if (next.economy.treasury <= 0 && next.economy.deficit >= 4.5) {
      next.gameOver = true;
      next.endGameReason = "Banqueroute de l'État. Les caisses de l'État sont vides (0 Mds €) et les marchés refusent de refinancer la dette française.";
      next.legacyStats = computePresidentialLegacy(next);
    } else if (next.turn > 60) {
      next.gameOver = true;
      next.victory = true;
      next.endGameReason = "Fin du quinquennat ! Vous avez survécu à 5 années de crises.";
      next.legacyStats = computePresidentialLegacy(next);
    }
  }

  return next;
}
