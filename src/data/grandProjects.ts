import { GrandProject } from '../types/game';

export const CATALOG_GRAND_PROJECTS: GrandProject[] = [
  {
    id: 'proj_nucleaire_epr',
    name: 'Plan Relance Nucléaire (6 Réacteurs EPR-2)',
    category: 'energie',
    icon: 'Zap',
    description: 'Bâtir la souveraineté énergétique décarbonée de la France pour les 50 prochaines années.',
    totalCost: 12.0, // 12 Mds € au total
    costPerTurn: 1.0, // 1.0 Md € par mois
    durationTurns: 12, // 12 mois
    turnsRemaining: 12,
    completed: false,
    effectDescription: '+0.5% Croissance permanente, +0.4 Md/m Solde commercial, +10 Autorité',
    effects: {
      growthDelta: 0.5,
      monthlyBalanceImpact: 0.4,
      permanentAuthorityBonus: 10,
      popularityDelta: 5
    }
  },
  {
    id: 'proj_hopital_2030',
    name: 'Grand Plan d\'Urgence Santé & Hôpitaux 2030',
    category: 'sante',
    icon: 'HeartPulse',
    description: 'Rénover les urgences, revaloriser les soignants et supprimer les déserts médicaux.',
    totalCost: 8.0,
    costPerTurn: 0.8,
    durationTurns: 10,
    turnsRemaining: 10,
    completed: false,
    effectDescription: '+12% Popularité permanente, -20 Tension Sociale durable dans le pays',
    effects: {
      popularityDelta: 12,
      permanentTensionDiscount: 20,
      permanentAuthorityBonus: 5
    }
  },
  {
    id: 'proj_defense_lpm',
    name: 'Loi de Programmation Militaire & Bouclier Cyber',
    category: 'defense',
    icon: 'Shield',
    description: 'Moderniser les armées, le spatial militaire et protéger les infrastructures critiques.',
    totalCost: 10.0,
    costPerTurn: 1.0,
    durationTurns: 10,
    turnsRemaining: 10,
    completed: false,
    effectDescription: '+20 Autorité Régalien permanente, +0.3% Croissance industrielle',
    effects: {
      permanentAuthorityBonus: 20,
      growthDelta: 0.3,
      popularityDelta: 4
    }
  },
  {
    id: 'proj_fret_rer',
    name: 'Réseau RER Métropolitains & Fret Ferroviaire',
    category: 'transport',
    icon: 'Train',
    description: 'Développer des transports lourds express dans les 10 grandes métropoles régionales.',
    totalCost: 6.0,
    costPerTurn: 0.6,
    durationTurns: 10,
    turnsRemaining: 10,
    completed: false,
    effectDescription: '+6% Popularité, -10 Tension Sociale, +0.2% Croissance verte',
    effects: {
      popularityDelta: 6,
      permanentTensionDiscount: 10,
      growthDelta: 0.2
    }
  }
];
