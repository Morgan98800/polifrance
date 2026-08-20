import { PoliticalCard } from '../types/game';

export const CATALOG_POLITICAL_CARDS: PoliticalCard[] = [
  {
    id: 'card_fuite_canard',
    name: 'La Fuite dans le Canard Enchaîné',
    category: 'renseignement',
    icon: 'FileText',
    authorityCost: 15,
    description: 'Faire fuiter une note compromettante sur un ténor de l\'opposition pour discréditer ses attaques.',
    flavor: '« En politique, une rumeur bien placée vaut dix régiments. »',
    effects: {
      censureThreatReduction: 20,
      popularityDelta: 3,
      authorityDelta: -15,
      message: 'La presse s\'empare du scandale de l\'opposition. La motion de censure perd toute crédibilité.'
    }
  },
  {
    id: 'card_grand_debat_7h',
    name: 'Le Grand Débat National (7h de direct)',
    category: 'mediatique',
    icon: 'Radio',
    authorityCost: 20,
    description: 'Prendre l\'antenne pendant 7 heures face aux maires et citoyens pour saturer l\'espace médiatique.',
    flavor: '« Quand le Président parle sans interruption, personne ne peut contredire. »',
    effects: {
      popularityDelta: 15,
      tensionDelta: -15,
      authorityDelta: -20,
      message: 'Performance oratoire magistrale. L\'opinion publique salue l\'endurance et l\'écoute du chef de l\'État.'
    }
  },
  {
    id: 'card_diversion_mediatique',
    name: 'La Diversion Médiatique',
    category: 'mediatique',
    icon: 'Sparkles',
    authorityCost: 10,
    description: 'Lancer un grand débat passionné sur un sujet sociétal pour détourner les caméras d\'une crise économique.',
    flavor: '« Regardez la main droite pendant que la main gauche signe les décrets. »',
    effects: {
      tensionDelta: -10,
      popularityDelta: 2,
      authorityDelta: -10,
      mitigateNextCrisis: true,
      message: 'Les plateaux TV s\'enflamment sur la polémique diversion. La crise budgétaire passe au second plan.'
    }
  },
  {
    id: 'card_secret_defense_verrou',
    name: 'Le Secret Défense & Verrouillage',
    category: 'renseignement',
    icon: 'Shield',
    authorityCost: 20,
    description: 'Classifier un dossier sensible « Secret Défense » pour étouffer net une enquête embarrassante.',
    flavor: '« Raison d\'État : ce que le peuple ignore ne peut pas faire tomber le gouvernement. »',
    effects: {
      quashScandal: true,
      authorityDelta: -20,
      tensionDelta: 5,
      message: 'Le Parquet et les journalistes se heurtent au Secret Défense. L\'affaire est classée sans suite.'
    }
  },
  {
    id: 'card_debauchage_transpartisan',
    name: 'Le Débauchage Transpartisan',
    category: 'parlementaire',
    icon: 'Users',
    authorityCost: 25,
    description: 'Offrir des postes et circonscriptions dorées pour faire basculer 15 députés d\'opposition dans votre camp.',
    flavor: '« La fidélité en politique est une question de tarif ministériel. »',
    effects: {
      seatsGained: 15,
      authorityDelta: -25,
      popularityDelta: -3,
      message: '15 députés d\'opposition annoncent leur ralliement solennel à la majorité présidentielle !'
    }
  },
  {
    id: 'card_cagnotte_fiscale_secrete',
    name: 'La Cagnotte Fiscale Surprise',
    category: 'republicain',
    icon: 'Wallet',
    authorityCost: 15,
    description: 'Découvrir opportunément un surplus de recettes de TVA à Bercy pour financer un chèque d\'urgence.',
    flavor: '« On a toujours quelques milliards sous le matelas de Bercy pour les jours de pluie. »',
    effects: {
      treasuryGained: 3.0,
      popularityDelta: 6,
      authorityDelta: -15,
      message: 'Bercy annonce 3 Mds € de recettes fiscales inattendues réinjectées immédiatement dans les caisses de l\'État.'
    }
  },
  {
    id: 'card_operation_col_roule',
    name: 'L\'Opération Col Roulé & Sobriété',
    category: 'social',
    icon: 'Flame',
    authorityCost: 10,
    description: 'Incarner la sobriété énergétique en direct à la télévision avec un col roulé et un plan d\'économies.',
    flavor: '« La communication politique est l\'art de transformer une contrainte en vertu patriotique. »',
    effects: {
      popularityDelta: 5,
      tensionDelta: -8,
      authorityDelta: -10,
      message: 'Le coup de com fait mouche sur les réseaux sociaux. L\'esprit de responsabilité civique progresse.'
    }
  },
  {
    id: 'card_allocution_dorures',
    name: 'L\'Allocution Solennelle sous les Dorures',
    category: 'republicain',
    icon: 'Landmark',
    authorityCost: 0,
    description: 'Prendre la parole solennellement depuis le Salon Doré de l\'Élysée pour réaffirmer la primauté présidentielle.',
    flavor: '« La Ve République donne au Président une voix qui s\'impose à tous les pouvoirs. »',
    effects: {
      authorityDelta: 25,
      popularityDelta: 4,
      tensionDelta: 5,
      message: 'Le discours régalien remet de l\'ordre dans les rangs. Vous regagnez +25 points d\'Autorité politique.'
    }
  }
];
