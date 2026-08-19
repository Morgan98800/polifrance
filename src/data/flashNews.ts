import { FlashNewsEvent } from '../types/game';

export const FLASH_NEWS_EVENTS: FlashNewsEvent[] = [
  {
    id: 'flash_scandal_bercy',
    title: '🔴 FLASH INFO • LE MINISTRE DE L\'ÉCONOMIE ÉPINGLÉ PAR MEDIAPART',
    subtitle: 'Révélations sur un compte non déclaré et conflit d\'intérêts présumé lors de privatisations.',
    category: 'scandale',
    source: 'AFP / Médiapart • 14:02',
    timeLabel: 'URGENT',
    choices: [
      {
        label: 'Exiger sa démission immédiate',
        description: 'Sanctionner sans attendre pour protéger la probité présidentielle, au prix d\'une déstabilisation de votre gouvernement.',
        effects: {
          popularityDelta: 4,
          authorityDelta: -15,
          tensionDelta: -5,
          message: 'Le ministre a remis sa démission. L\'opinion salue votre fermeté éthique, mais Bercy est désorganisé.'
        }
      },
      {
        label: 'Faire bloc et dénoncer une cabale politique',
        description: 'Refuser de céder à la justice médiatique et maintenir le cap économique.',
        effects: {
          popularityDelta: -8,
          authorityDelta: 5,
          tensionDelta: 12,
          message: 'Votre soutien indéfectible scandalise les rédactions et l\'opposition. Une motion de censure menace.'
        }
      }
    ]
  },
  {
    id: 'flash_police_bavure',
    title: '🔴 FLASH INFO • GRAVES AFFRONTEMENTS APRÈS UNE INTERPELLATION À PARIS',
    subtitle: 'Images virales de violences policières en marge d\'un rassemblement non déclaré.',
    category: 'securite',
    source: 'AFP / BFMTV • 21:45',
    timeLabel: 'ÉMEUTES',
    choices: [
      {
        label: 'Soutenir inconditionnellement les Forces de l\'Ordre',
        description: 'Rappeler la difficulté du métier de policier et promettre des sanctions judiciaires sévères pour les casseurs.',
        effects: {
          popularityDelta: 2,
          authorityDelta: 10,
          tensionDelta: 15,
          message: 'La droite et les syndicats de police vous soutiennent. La rue s\'embrase dans plusieurs métropoles.'
        }
      },
      {
        label: 'Saisir l\'IGPN et appeler solennellement à l\'apaisement',
        description: 'Condamner tout usage disproportionné de la force et recevoir les collectifs citoyens.',
        effects: {
          popularityDelta: -3,
          authorityDelta: -10,
          tensionDelta: -15,
          message: 'Le geste d\'apaisement désamorce les violences nocturnes, mais les syndicats de police déposent les armes.'
        }
      }
    ]
  },
  {
    id: 'flash_bruxelles_sommation',
    title: '🔴 FLASH INFO • BRUXELLES ENCLENCHE UNE PROCÉDURE POUR DÉFICIT EXCESSIF',
    subtitle: 'La Commission européenne exige 15 milliards d\'euros d\'économies sous peine de sanctions financières.',
    category: 'economie',
    source: 'AFP / Reuters • 09:30',
    timeLabel: 'BRUXELLES',
    choices: [
      {
        label: 'Engager un bras de fer souverainiste avec la Commission',
        description: 'Affirmer la souveraineté budgétaire de la France et refuser les diktats d\'austérité de Bruxelles.',
        effects: {
          popularityDelta: 6,
          authorityDelta: -10,
          deficitDelta: 0.2,
          tensionDelta: 5,
          message: 'Votre fermeté galvanise l\'opinion nationale, mais le spread OAT/Bund s\'écarte brutalement.'
        }
      },
      {
        label: 'Gager des réformes structurelles et rassurer les partenaires européens',
        description: 'Promettre un plan de rigueur pluriannuel pour calmer les marchés et préserver la note de la France.',
        effects: {
          popularityDelta: -7,
          authorityDelta: 10,
          deficitDelta: -0.3,
          tensionDelta: 10,
          message: 'Bruxelles suspend sa menace et les taux d\'emprunt baissent, mais l\'opposition dénonce votre soumission.'
        }
      }
    ]
  },
  {
    id: 'flash_sncf_greve_surprise',
    title: '🔴 FLASH INFO • GRÈVE SURPRISE RECONDUCTIBLE DANS LES TRANSPORTS',
    subtitle: 'L\'intersyndicale bloque les dépôts et les gares à 48 heures des départs en vacances.',
    category: 'social',
    source: 'AFP / Franceinfo • 06:15',
    timeLabel: 'BLOCAGE',
    choices: [
      {
        label: 'Activer les réquisitions et décréter le service minimum garanti',
        description: 'Envoyer les préfets réquisitionner les cheminots et contrôleurs pour débloquer les Français.',
        effects: {
          popularityDelta: 5,
          authorityDelta: 15,
          tensionDelta: 20,
          message: 'Les trains recommencent à circuler pour les familles, mais les syndicats appellent à la grève générale.'
        }
      },
      {
        label: 'Accorder une prime exceptionnelle d\'urgence de 500€',
        description: 'Dégager une enveloppe immédiate de 300 millions d\'euros pour obtenir la levée des piquets de grève.',
        effects: {
          popularityDelta: -2,
          deficitDelta: 0.1,
          tensionDelta: -25,
          message: 'Le trafic reprend normalement. Les syndicats crient victoire, le patronat s\'inquiète du précédent créé.'
        }
      }
    ]
  },
  {
    id: 'flash_diplomatie_crise',
    title: '🔴 FLASH INFO • TENSIONS GÉOPOLITIQUES MAJEURES AU DÉTROIT D\'ORMUZ',
    subtitle: 'Saisie de pétroliers et envolée immédiate des cours du baril de pétrole (+18%).',
    category: 'international',
    source: 'AFP / Le Monde • 18:40',
    timeLabel: 'GÉOPOLITIQUE',
    choices: [
      {
        label: 'Bloquer les prix à la pompe par décret d\'urgence',
        description: 'Protéger le pouvoir d\'achat des automobilistes ruraux en compensant la hausse sur les caisses de l\'État.',
        effects: {
          popularityDelta: 8,
          deficitDelta: 0.25,
          tensionDelta: -10,
          message: 'Les automobilistes soufflent, mais la facture budgétaire est colossale pour les finances publiques.'
        }
      },
      {
        label: 'Appeler à la sobriété et refuser le bouclier tarifaire',
        description: 'Responsabiliser les entreprises et ménages pour ne pas aggraver la dette souveraine.',
        effects: {
          popularityDelta: -10,
          deficitDelta: -0.05,
          tensionDelta: 18,
          message: 'L\'orthodoxie financière est saluée par la Cour des Comptes, mais la grogne des Gilets Jaunes renaît.'
        }
      }
    ]
  }
];
