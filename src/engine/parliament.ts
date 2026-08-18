import { ParliamentGroup, IdeologyGroup, ProposedLaw, Candidate } from '../types/game';

export const INITIAL_PARLIAMENT_GROUPS: ParliamentGroup[] = [
  {
    id: 'gauche_radicale',
    name: 'La France Insoumise & Gauche Démocrate',
    shortName: 'LFI-PCF',
    seats: 92,
    color: '#b91c1c', // Rouge vif
    discipline: 0.95,
    stanceTowardsPlayer: 'oppose_hard'
  },
  {
    id: 'gauche_sociale',
    name: 'Socialistes & Écologistes',
    shortName: 'PS-Écolos',
    seats: 88,
    color: '#ec4899', // Rose fuchsia / vert
    discipline: 0.85,
    stanceTowardsPlayer: 'oppose_moderate'
  },
  {
    id: 'centre_majorite',
    name: 'Ensemble pour la République / Bloc Central',
    shortName: 'EPR-Modem-Horizons',
    seats: 166,
    color: '#eab308', // Jaune ambre
    discipline: 0.80,
    stanceTowardsPlayer: 'loyal'
  },
  {
    id: 'droite_republicaine',
    name: 'La Droite Républicaine / Indépendants',
    shortName: 'LR-DR',
    seats: 47,
    color: '#2563eb', // Bleu royal
    discipline: 0.85,
    stanceTowardsPlayer: 'coalition'
  },
  {
    id: 'droite_nationale',
    name: 'Rassemblement National & Alliés UDR',
    shortName: 'RN-UDR',
    seats: 142,
    color: '#1e3a8a', // Bleu marine sombre
    discipline: 0.98,
    stanceTowardsPlayer: 'oppose_hard'
  },
  {
    id: 'non_inscrits',
    name: 'Libertés, Indépendants, Outre-mer & Territoires',
    shortName: 'LIOT / NI',
    seats: 42,
    color: '#64748b', // Gris ardoise
    discipline: 0.60,
    stanceTowardsPlayer: 'oppose_moderate'
  }
];

export interface SeatCoordinate {
  seatIndex: number;
  groupId: IdeologyGroup;
  x: number;
  y: number;
  angle: number;
  row: number;
}

/**
 * Génère les coordonnées des 577 sièges de l'Assemblée nationale en arc de cercle
 */
export function generateHemicycleCoordinates(groups: ParliamentGroup[]): SeatCoordinate[] {
  const seats: SeatCoordinate[] = [];
  const totalSeats = 577;
  const rows = 12; // 12 rangées de sièges
  const baseRadius = 140;
  const rowSpacing = 20;
  const centerX = 350;
  const centerY = 330;

  // Calcul du nombre de sièges par rangée (augmente avec le rayon)
  const rowCapacities: number[] = [];
  let allocatedSeats = 0;
  for (let r = 0; r < rows; r++) {
    const rowRadius = baseRadius + r * rowSpacing;
    const capacity = Math.round(20 + r * 5.2);
    rowCapacities.push(capacity);
    allocatedSeats += capacity;
  }

  // Ajustement pour faire exactement 577
  const diff = totalSeats - allocatedSeats;
  rowCapacities[rows - 1] += diff;

  // Répartition ordonnée de la gauche vers la droite de l'hémicycle
  const orderedGroups: IdeologyGroup[] = [
    'gauche_radicale',
    'gauche_sociale',
    'non_inscrits',
    'centre_majorite',
    'droite_republicaine',
    'droite_nationale'
  ];

  // Liste plate des groupes pour chaque siège de 0 à 576
  const flatSeatGroups: IdeologyGroup[] = [];
  orderedGroups.forEach(gId => {
    const grp = groups.find(g => g.id === gId);
    const count = grp ? grp.seats : 0;
    for (let i = 0; i < count; i++) {
      flatSeatGroups.push(gId);
    }
  });

  let currentGlobalSeat = 0;
  for (let r = 0; r < rows; r++) {
    const countInRow = rowCapacities[r];
    const radius = baseRadius + r * rowSpacing;
    const startAngle = Math.PI * 0.95; // Gauche
    const endAngle = Math.PI * 0.05;   // Droite

    for (let i = 0; i < countInRow; i++) {
      if (currentGlobalSeat >= totalSeats) break;
      const t = countInRow > 1 ? i / (countInRow - 1) : 0.5;
      const angle = startAngle - t * (startAngle - endAngle);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY - radius * Math.sin(angle);

      const groupId = flatSeatGroups[currentGlobalSeat] || 'non_inscrits';
      seats.push({
        seatIndex: currentGlobalSeat,
        groupId,
        x,
        y,
        angle,
        row: r
      });
      currentGlobalSeat++;
    }
  }

  return seats;
}

export function calculateVoteOnLaw(law: ProposedLaw, groups: ParliamentGroup[], player: Candidate) {
  let votesFor = 0;
  let votesAgainst = 0;
  let abstentions = 0;

  const breakdownByGroup: Record<IdeologyGroup, { for: number; against: number; abstain: number }> = {
    gauche_radicale: { for: 0, against: 0, abstain: 0 },
    gauche_sociale: { for: 0, against: 0, abstain: 0 },
    centre_majorite: { for: 0, against: 0, abstain: 0 },
    droite_republicaine: { for: 0, against: 0, abstain: 0 },
    droite_nationale: { for: 0, against: 0, abstain: 0 },
    non_inscrits: { for: 0, against: 0, abstain: 0 },
  };

  groups.forEach(group => {
    const rawSupport = law.supportByGroup[group.id] || 0;
    // Si le joueur appartient à ce groupe, léger bonus de loyauté
    const playerBonus = group.id === player.group ? 15 : 0;
    const adjustedSupport = Math.min(100, Math.max(0, rawSupport + playerBonus));

    const forCount = Math.round((group.seats * adjustedSupport) / 100);
    const againstCount = Math.round((group.seats * (100 - adjustedSupport) * 0.9) / 100);
    const abstainCount = group.seats - forCount - againstCount;

    votesFor += forCount;
    votesAgainst += againstCount;
    abstentions += Math.max(0, abstainCount);

    breakdownByGroup[group.id] = {
      for: forCount,
      against: againstCount,
      abstain: Math.max(0, abstainCount)
    };
  });

  const passed = votesFor >= 289;
  return {
    votesFor,
    votesAgainst,
    abstentions,
    passed,
    breakdownByGroup,
    majorityNeeded: 289,
  };
}

export function calculateCensureMotion(groups: ParliamentGroup[], player: Candidate) {
  let censureVotes = 0;
  const details: Array<{ groupName: string; votes: number; total: number; color: string }> = [];

  groups.forEach(group => {
    let censureProbability = 0;
    if (group.id === player.group) {
      censureProbability = 0.05; // Très peu de frondeurs
    } else if (group.stanceTowardsPlayer === 'coalition') {
      censureProbability = 0.35; // Risque modéré
    } else if (group.stanceTowardsPlayer === 'oppose_moderate') {
      censureProbability = 0.85;
    } else {
      censureProbability = 0.98; // Oppositions dures
    }

    const groupVotes = Math.round(group.seats * censureProbability * group.discipline);
    censureVotes += groupVotes;
    details.push({
      groupName: group.name,
      votes: groupVotes,
      total: group.seats,
      color: group.color
    });
  });

  const passed = censureVotes >= 289;
  return {
    censureVotes,
    passed,
    details,
    majorityNeeded: 289
  };
}
