import { GameEvent, Candidate } from '../types/game';

export const CANDIDATE_FLAGSHIP_EVENTS: Record<string, GameEvent> = {
  edouard_philippe: {
    id: 'flagship_edouard_philippe',
    title: 'Grande Réforme : La Règle d\'Or Budgétaire & Réindustrialisation de l\'Offre',
    category: 'economique',
    source: 'Programme Horizons / Édouard Philippe',
    icon: 'Landmark',
    breakingNewsChyron: 'RÉFORME MAJEURE : Édouard Philippe présente son plan de stabilisation budgétaire et d\'attractivité',
    description: 'Fidèle à votre ligne de responsabilité républicaine, vous devez arbitrer sur la vitesse de réduction des dépenses publiques et la baisse des impôts de production pour stimuler l\'emploi industriel.',
    choices: [
      {
        id: 'philippe_orthodoxie',
        label: 'Appliquer la règle d\'or budgétaire : -30 Mds d\'économies et allègement de charges patronales',
        description: 'Sanctuariser la trajectoire de désendettement pour ramener le déficit sous 3% et rassurer les investisseurs.',
        costInfluence: 5,
        effects: {
          popularityDelta: 3,
          demographicsDelta: { cadres: 10, retraites: 12, populaires: -6 },
          tensionDelta: 15,
          strikeRiskDelta: 20,
          deficitDelta: -0.8,
          message: 'Votre rigueur budgétaire rassure immédiatement Bruxelles et les marchés financiers. Votre socle de retraités et de cadres est enthousiaste, mais les syndicats dénoncent l\'austérité.'
        }
      },
      {
        id: 'philippe_compromis_social',
        label: 'Conditionner la rigueur à un grand pacte de formation industrielle avec les partenaires sociaux',
        description: 'Associer les syndicats réformistes (CFDT) pour éviter un embrasement social.',
        costInfluence: 10,
        effects: {
          popularityDelta: 4,
          demographicsDelta: { cadres: 6, fonctionnaires: 5, populaires: 4 },
          tensionDelta: -10,
          strikeRiskDelta: -15,
          deficitDelta: -0.3,
          message: 'Votre méthode de concertation apaise le climat social. L\'opposition dénonce un manque d\'audace mais l\'opinion salue votre sens du compromis.'
        }
      }
    ]
  },

  jordan_bardella: {
    id: 'flagship_jordan_bardella',
    title: 'Grande Réforme : Baisse de la TVA sur l\'Énergie & Priorité Nationale',
    category: 'politique',
    source: 'Programme Rassemblement National / Jordan Bardella',
    icon: 'Flame',
    breakingNewsChyron: 'RÉFORME MAJEURE : Jordan Bardella dépose son projet de loi sur le pouvoir d\'achat et la préférence nationale',
    description: 'Conformément aux engagements du RN, vous souhaitez abaisser la TVA de 20% à 5,5% sur le carburant, l\'électricité et le gaz, tout en réservant les aides sociales aux ménages français.',
    choices: [
      {
        id: 'bardella_choc_pouvoir_achat',
        label: 'Décret d\'urgence : TVA à 5.5% immédiate sur toutes les énergies et moratoire sur les éoliennes',
        description: 'Rendre du pouvoir d\'achat immédiat aux classes populaires et au monde rural.',
        costInfluence: 5,
        effects: {
          popularityDelta: 6,
          demographicsDelta: { populaires: 15, rural: 14, cadres: -8 },
          tensionDelta: -15,
          strikeRiskDelta: -20,
          deficitDelta: 0.4,
          message: 'Triomphe populaire dans la France périurbaine et rurale ! Bercy s\'alarme du coût fiscal immédiat, mais votre socle électoral est survolté.'
        }
      },
      {
        id: 'bardella_loi_immigration_referendum',
        label: 'Lancer un référendum sur la priorité nationale pour le logement social et l\'emploi',
        description: 'Consulter directement le peuple français pour contourner les blocages juridiques.',
        costInfluence: 15,
        effects: {
          popularityDelta: 4,
          demographicsDelta: { populaires: 12, rural: 10, jeunesse: -6 },
          tensionDelta: 25,
          strikeRiskDelta: 25,
          deficitDelta: 0.0,
          message: 'L\'annonce du référendum crée un séisme politique. La gauche et le Conseil d\'État crient au coup de force, tandis que vos électeurs saluent un acte de courage régalien.'
        }
      }
    ]
  },

  jean_luc_melenchon: {
    id: 'flagship_jean_luc_melenchon',
    title: 'Grande Réforme : Rétablissement de l\'ISF & Blocage des Prix des Produits de Première Nécessité',
    category: 'social',
    source: 'Programme Nouveau Front Populaire / Jean-Luc Mélenchon',
    icon: 'TrendingUp',
    breakingNewsChyron: 'RÉFORME MAJEURE : Jean-Luc Mélenchon ordonne le blocage des prix et la taxation des superprofits',
    description: 'Au cœur du programme de rupture de la gauche : encadrement strict des prix de 100 produits essentiels, relèvement du SMIC à 1600€ net et rétablissement d\'un ISF renforcé.',
    choices: [
      {
        id: 'melenchon_rupture_sociale',
        label: 'Décret de blocage immédiat des prix de l\'alimentation et de l\'énergie + SMIC à 1600€',
        description: 'Protéger sans attendre les familles modestes contre la vie chère.',
        costInfluence: 5,
        effects: {
          popularityDelta: 7,
          demographicsDelta: { populaires: 16, jeunesse: 18, cadres: -12, retraites: -10 },
          tensionDelta: -20,
          strikeRiskDelta: -30,
          deficitDelta: 0.3,
          message: 'Allégresse dans les banlieues populaires et les cortèges syndicaux ! Le Medef menace d\'un gel des embauches et le CAC 40 décroche, mais la ferveur populaire est historique.'
        }
      },
      {
        id: 'melenchon_isf_climat',
        label: 'Créer un ISF climatique et écologique progressif sur les patrimoines supérieurs à 2M€',
        description: 'Financer la bifurcation écologique par la contribution des super-riches.',
        costInfluence: 10,
        effects: {
          popularityDelta: 5,
          demographicsDelta: { jeunesse: 14, populaires: 12, cadres: -14 },
          tensionDelta: -10,
          deficitDelta: -0.5,
          message: 'Les recettes fiscales attendues réduisent le déficit public. La presse économique crie à la fuite des capitaux, mais la jeunesse étudiante applaudit debout.'
        }
      }
    ]
  },

  gabriel_attal: {
    id: 'flagship_gabriel_attal',
    title: 'Grande Réforme : Réarmement de l\'Autorité à l\'École & Valorisation du Travail',
    category: 'politique',
    source: 'Programme Renaissance / Gabriel Attal',
    icon: 'Award',
    breakingNewsChyron: 'RÉFORME MAJEURE : Gabriel Attal lance son plan « Le travail doit payer plus » et la refonte civique',
    description: 'Pour incarner le réarmement civique et républicain : sanctions renforcées dès le premier manquement scolaire, internats éducatifs et réforme de l\'assurance-chômage pour inciter à la reprise d\'activité.',
    choices: [
      {
        id: 'attal_valeur_travail',
        label: 'Durcir l\'accès à l\'assurance-chômage et conditionner le RSA à 15h d\'activité hebdomadaire',
        description: 'Valoriser le travail des classes moyennes qui se lèvent tôt.',
        costInfluence: 5,
        effects: {
          popularityDelta: 4,
          demographicsDelta: { cadres: 10, retraites: 8, populaires: -5 },
          tensionDelta: 10,
          strikeRiskDelta: 15,
          deficitDelta: -0.4,
          message: 'Les classes moyennes laborieuses et les retraités plébiscitent votre fermeté. Les syndicats dénoncent une stigmatisation des demandeurs d\'emploi.'
        }
      },
      {
        id: 'attal_autorite_ecole',
        label: 'Déployer l\'uniforme républicain et les internats disciplinaires dans 200 collèges pilotes',
        description: 'Restaurer le respect de l\'autorité, des professeurs et de la laïcité.',
        costInfluence: 8,
        effects: {
          popularityDelta: 5,
          demographicsDelta: { retraites: 12, cadres: 6, jeunesse: -4 },
          tensionDelta: -5,
          deficitDelta: 0.05,
          message: 'Succès d\'opinion majeur chez les parents et les séniors. Votre stature de réformateur pragmatique de l\'État s\'installe solidement.'
        }
      }
    ]
  },

  bruno_retailleau: {
    id: 'flagship_bruno_retailleau',
    title: 'Grande Réforme : Plan d\'Ordre Républicain, 50 Milliards d\'Économies & Réforme de l\'AME',
    category: 'securite',
    source: 'Programme Les Républicains / Bruno Retailleau',
    icon: 'ShieldCheck',
    breakingNewsChyron: 'RÉFORME MAJEURE : Bruno Retailleau engage le grand coup de rabot sur la dépense publique et l\'ordre régalien',
    description: 'La droite républicaine engage la réduction drastique de la dépense publique, la suppression de l\'Aide Médicale d\'État remplacée par une aide d\'urgence vitale, et le retour des peines planchers automatiques.',
    choices: [
      {
        id: 'retailleau_coupe_50_milliards',
        label: 'Supprimer 100 000 postes administratifs dans les agences d\'État et réduire les subventions associatives',
        description: 'Stopper l\'hémorragie de la dette publique et alléger le fardeau fiscal des entreprises.',
        costInfluence: 5,
        effects: {
          popularityDelta: 4,
          demographicsDelta: { cadres: 8, rural: 12, fonctionnaires: -15 },
          tensionDelta: 20,
          strikeRiskDelta: 25,
          deficitDelta: -0.9,
          message: 'Le Sénat et les maires de France saluent une vraie rupture avec la dérive budgétaire. Les fonctionnaires appellent à manifester, mais le déficit plonge dans le vert.'
        }
      },
      {
        id: 'retailleau_securite_ame',
        label: 'Remplacer l\'AME par une Aide d\'Urgence Vitale et instaurer des peines planchers automatiques',
        description: 'Répondre à l\'exigence régalienne de fermeté pénale et de contrôle des frontières.',
        costInfluence: 10,
        effects: {
          popularityDelta: 5,
          demographicsDelta: { rural: 14, retraites: 10, jeunesse: -8 },
          tensionDelta: 5,
          deficitDelta: -0.1,
          message: 'Votre ligne d\'ordre républicain consolide votre bastion territorial. La droite retrouve son autorité historique sans céder aux outrances.'
        }
      }
    ]
  },

  raphael_glucksmann: {
    id: 'flagship_raphael_glucksmann',
    title: 'Grande Réforme : Traité Écologique Européen & Taxe sur les Super-Riches',
    category: 'international',
    source: 'Programme Place Publique / Raphaël Glucksmann',
    icon: 'Globe',
    breakingNewsChyron: 'RÉFORME MAJEURE : Raphaël Glucksmann défend le réveil de l\'Europe démocratique et l\'impôt vert',
    description: 'Promouvoir une social-démocratie moderne à l\'échelle continentale : grand plan d\'émancipation écologique, taxe européenne sur les transactions financières et réarmement de la défense commune.',
    choices: [
      {
        id: 'glucksmann_taxe_europe_capital',
        label: 'Créer un impôt européen sur les patrimoines financiers pour financer la réindustrialisation verte',
        description: 'Réconcilier justice sociale et transition climatique par la force du marché unique.',
        costInfluence: 5,
        effects: {
          popularityDelta: 5,
          demographicsDelta: { cadres: 12, jeunesse: 10, populaires: 6 },
          tensionDelta: -15,
          deficitDelta: -0.4,
          message: 'Bruxelles et les capitales sociales-démocrates saluent votre leadership européen. La jeunesse diplômée adhère massivement à ce nouvel horizon.'
        }
      },
      {
        id: 'glucksmann_defense_climat',
        label: 'Émettre un grand emprunt vert pour la souveraineté énergétique et la défense démocratique',
        description: 'Investir massivement sans austérité dans les énergies renouvelables et l\'autonomie stratégique.',
        costInfluence: 8,
        effects: {
          popularityDelta: 4,
          demographicsDelta: { jeunesse: 12, cadres: 8, rural: 4 },
          tensionDelta: -10,
          deficitDelta: 0.1,
          message: 'L\'élan européen relance l\'attractivité française sur la scène internationale. La gauche réformiste et écologiste fait bloc derrière votre gouvernement.'
        }
      }
    ]
  }
};
