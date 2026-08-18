import { Candidate, IdeologyGroup, DemographicBreakdown } from '../types/game';

export const CANDIDATES: Candidate[] = [
  {
    id: 'edouard_philippe',
    name: 'Édouard Philippe',
    party: 'Horizons / Majorité Élargie',
    avatar: './edouard_philippe.jpg',
    group: 'centre_majorite',
    tagline: '« Bâtir pour l\'avenir, avec méthode et fermeté républicaine. »',
    doctrine: 'Centre-droit réformiste, orthodoxie budgétaire, réindustrialisation et fermeté républicaine.',
    strengths: [
      'Forte crédibilité et stature d\'ancien Premier ministre',
      'Assise électorale très puissante chez les retraités et les cadres (CSP+)',
      'Capacité à négocier des majorités de coalition'
    ],
    weaknesses: [
      'Associé au passif des réformes contestées du quinquennat sortant',
      'Faible ancrage dans le monde ouvrier et les banlieues populaires',
      'Concurrence interne serrée au sein du bloc central'
    ],
    basePopularity: 24,
    demographics: {
      retraites: 38,
      populaires: 14,
      cadres: 34,
      jeunesse: 15,
      fonctionnaires: 21,
      rural: 22,
    },
    initialFunds: 8500,
    initialInfluence: 75,
    initialSignatures: 460,
  },
  {
    id: 'jordan_bardella',
    name: 'Jordan Bardella / Marine Le Pen',
    party: 'Rassemblement National',
    avatar: './jordan_bardella.jpg',
    group: 'droite_nationale',
    tagline: '« La France qui travaille, la France qui protège. »',
    doctrine: 'Priorité nationale, baisse de la TVA sur les énergies, régulation stricte des flux migratoires, sécurité régalienne.',
    strengths: [
      'Hégémonie dans les classes populaires et le monde rural/périurbain',
      'Puissance sur les réseaux sociaux et dynamique de jeunesse',
      'Socle d\'intentions de vote du 1er tour extrêmement fidèle'
    ],
    weaknesses: [
      'Plafond de verre républicain au second tour',
      'Méfiance des marchés financiers (spread OAT/Bund) et de Bruxelles',
      'Opposition frontale de l\'intersyndicale et du monde universitaire'
    ],
    basePopularity: 31,
    demographics: {
      retraites: 22,
      populaires: 46,
      cadres: 12,
      jeunesse: 33,
      fonctionnaires: 16,
      rural: 44,
    },
    initialFunds: 7200,
    initialInfluence: 70,
    initialSignatures: 480,
  },
  {
    id: 'jean_luc_melenchon',
    name: 'Jean-Luc Mélenchon / F. Ruffin',
    party: 'Nouveau Front Populaire / LFI',
    avatar: './jean_luc_melenchon.jpg',
    group: 'gauche_radicale',
    tagline: '« L\'Avenir en commun : justice sociale, VIe République et climat. »',
    doctrine: 'Planification écologique, abrogation des réformes de retraites, blocage des prix des produits de première nécessité, constituante.',
    strengths: [
      'Mobilisation militante spectaculaire sur le terrain et meetings monstres',
      'Domination écrasante auprès de la jeunesse étudiante et des banlieues',
      'Programme de rupture sociale très identifiable'
    ],
    weaknesses: [
      'Rejet massif chez les retraités et le patronat (Medef)',
      'Tensions permanentes avec les partenaires de la gauche modérée',
      'Risque de fuite des capitaux et de bras de fer avec les traités européens'
    ],
    basePopularity: 21,
    demographics: {
      retraites: 9,
      populaires: 31,
      cadres: 19,
      jeunesse: 45,
      fonctionnaires: 32,
      rural: 12,
    },
    initialFunds: 5800,
    initialInfluence: 65,
    initialSignatures: 420,
  },
  {
    id: 'gabriel_attal',
    name: 'Gabriel Attal',
    party: 'Renaissance / Bloc Central',
    avatar: './gabriel_attal.jpg',
    group: 'centre_majorite',
    tagline: '« L\'audace républicaine, le travail et l\'autorité. »',
    doctrine: 'Autorité à l\'école, réforme de l\'assurance-chômage, réarmement civique, attractivité économique et liberté d\'entreprendre.',
    strengths: [
      'Aisance médiatique et débatteur redoutable',
      'Maîtrise complète de l\'administration et des rouages de l\'État',
      'Bonnes cotes d\'adhésion dans l\'électorat modéré et urbain'
    ],
    weaknesses: [
      'Responsabilité directe du passif de la majorité sortante et de la dette',
      'Fragilité de la discipline parlementaire au sein du bloc central',
      'Perception d\'une forme d\'arrogance technocratique par les classes populaires'
    ],
    basePopularity: 22,
    demographics: {
      retraites: 32,
      populaires: 13,
      cadres: 31,
      jeunesse: 18,
      fonctionnaires: 23,
      rural: 19,
    },
    initialFunds: 9200,
    initialInfluence: 80,
    initialSignatures: 490,
  },
  {
    id: 'laurent_wauquiez',
    name: 'Laurent Wauquiez / B. Retailleau',
    party: 'Les Républicains / Droite Républicaine',
    avatar: './laurent_wauquiez.jpg',
    group: 'droite_republicaine',
    tagline: '« Restaurer l\'autorité de l\'État et la valeur travail. »',
    doctrine: 'Réduction de 50 milliards de dépenses publiques, durcissement des peines pénales, défense des territoires et du Sénat.',
    strengths: [
      'Réseau d\'élus locaux et de maires exceptionnel pour les 500 parrainages',
      'Majorité stable au Sénat assurant un levier législatif clé',
      'Crédibilité sur la gestion territoriale et les finances locales'
    ],
    weaknesses: [
      'Étau électoral asphyxiant entre le centre macroniste et le RN',
      'Division des cadres du parti entre partisans de l\'union des droites et républicains modérés',
      'Faible écho dans la jeunesse urbaine'
    ],
    basePopularity: 15,
    demographics: {
      retraites: 28,
      populaires: 16,
      cadres: 24,
      jeunesse: 8,
      fonctionnaires: 14,
      rural: 27,
    },
    initialFunds: 6100,
    initialInfluence: 60,
    initialSignatures: 500,
  },
  {
    id: 'raphael_glucksmann',
    name: 'Raphaël Glucksmann',
    party: 'Place Publique / Parti Socialiste',
    avatar: './raphael_glucksmann.jpg',
    group: 'gauche_sociale',
    tagline: '« Réveiller l\'Europe démocratique et la justice sociale. »',
    doctrine: 'Social-démocratie européenne, soutien inconditionnel à l\'Ukraine, réindustrialisation écologique et taxe carbone aux frontières.',
    strengths: [
      'Succès électoral aux Européennes et dynamique pro-européenne',
      'Excellente image chez les cadres urbains et les intellectuels',
      'Capacité à rassembler la gauche modérée républicaine'
    ],
    weaknesses: [
      'Fragilité de l\'appareil militant sur le terrain en dehors des métropoles',
      'Tiraillé entre la tentation du centre et la pression de LFI',
      'Score encore timide dans les classes populaires ouvrières'
    ],
    basePopularity: 17,
    demographics: {
      retraites: 20,
      populaires: 11,
      cadres: 37,
      jeunesse: 26,
      fonctionnaires: 25,
      rural: 10,
    },
    initialFunds: 5200,
    initialInfluence: 55,
    initialSignatures: 390,
  }
];

export const createCustomCandidate = (data: {
  name: string;
  party: string;
  group: IdeologyGroup;
  tagline: string;
  doctrine: string;
  targetFocus: 'populaires' | 'retraites' | 'cadres' | 'jeunesse' | 'rural';
}): Candidate => {
  const baseDemographics: DemographicBreakdown = {
    retraites: 20,
    populaires: 20,
    cadres: 20,
    jeunesse: 20,
    fonctionnaires: 20,
    rural: 20
  };

  baseDemographics[data.targetFocus] = 45;

  return {
    id: `custom_${Date.now()}`,
    name: data.name,
    party: data.party,
    avatar: './edouard_philippe.jpg',
    group: data.group,
    tagline: data.tagline,
    doctrine: data.doctrine,
    strengths: [
      'Candidature citoyenne libre et affranchie des appareils politiques traditionnels',
      'Forte adhésion ciblée sur votre segment électoral prioritaire',
      'Capacité de surprise et d\'inattendu dans les médias'
    ],
    weaknesses: [
      'Nécessité de bâtir rapidement un réseau pour les 500 parrainages de maires',
      'Trésorerie de campagne initiale à consolider',
      'Absence de groupe parlementaire préexistant à l\'Assemblée'
    ],
    basePopularity: 18,
    demographics: baseDemographics,
    initialFunds: 5000,
    initialInfluence: 50,
    initialSignatures: 150,
  };
};
