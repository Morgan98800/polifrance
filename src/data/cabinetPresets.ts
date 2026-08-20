import { Minister } from '../types/game';

export interface CabinetPreset {
  primeMinister: Minister;
  ministers: Minister[];
  replacements: Record<string, Array<{ name: string; status: string }>>;
}

export const CABINET_PRESETS_BY_CANDIDATE: Record<string, CabinetPreset> = {
  // 1. Rassemblement National (Jordan Bardella / Marine Le Pen)
  'c1_bardella_lepen': {
    primeMinister: {
      id: 'pm_rn',
      role: 'Premier ministre',
      name: 'Jordan Bardella',
      competence: 82,
      loyalty: 95,
      politicalWeight: 90,
      scandalRisk: 10,
      status: '« Nous appliquerons les engagements pris devant les Français sans trembler. »'
    },
    ministers: [
      {
        id: 'min_eco',
        role: 'MINISTRE DE L\'ÉCONOMIE & DU BUDGET (BERCY)',
        name: 'Jean-Philippe Tanguy',
        competence: 85,
        loyalty: 90,
        politicalWeight: 80,
        scandalRisk: 15,
        status: '« Baisse de la TVA sur l\'énergie à 5,5% et traque stricte du gaspillage d\'argent public. »'
      },
      {
        id: 'min_int',
        role: 'MINISTRE DE L\'INTÉRIEUR (BEAUVAU)',
        name: 'Sébastien Chenu',
        competence: 80,
        loyalty: 88,
        politicalWeight: 85,
        scandalRisk: 20,
        status: '« Rétablissement de l\'autorité républicaine partout et tolérance zéro contre la délinquance. »'
      },
      {
        id: 'min_inter',
        role: 'MINISTRE DES AFFAIRES ÉTRANGÈRES & EUROPE',
        name: 'Fabrice Leggeri',
        competence: 88,
        loyalty: 85,
        politicalWeight: 75,
        scandalRisk: 10,
        status: '« Rétablissement du contrôle aux frontières et défense de la souveraineté française à Bruxelles. »'
      },
      {
        id: 'min_travail',
        role: 'MINISTRE DU TRAVAIL & AFFAIRES SOCIALES',
        name: 'Laure Lavalette',
        competence: 78,
        loyalty: 92,
        politicalWeight: 70,
        scandalRisk: 15,
        status: '« Priorité nationale à l\'emploi, revalorisation du travail et soutien aux familles populaires. »'
      }
    ],
    replacements: {
      min_eco: [
        { name: 'Thibault de La Tocnaye', status: '« Réindustrialisation et patriotisme économique. »' },
        { name: 'Matthias Renault', status: '« Audit financier des finances publiques. »' }
      ],
      min_int: [
        { name: 'Laurent Jacobelli', status: '« Fermeté absolue et soutien total aux forces de l\'ordre. »' },
        { name: 'Julien Odoul', status: '« Expulsion systématique des délinquants étrangers. »' }
      ],
      min_inter: [
        { name: 'Hervé Juvin', status: '« Diplomatie de l\'équilibre et Europe des Nations. »' },
        { name: 'Thierry Mariani', status: '« Réaffirmation des intérêts bilatéraux stratégiques. »' }
      ],
      min_travail: [
        { name: 'Thomas Ménagé', status: '« Justice sociale pour les classes moyennes et rurales. »' },
        { name: 'Edwige Diaz', status: '« Défense des services publics dans la France des terroirs. »' }
      ]
    }
  },

  // 2. Centre / Majorité (Gabriel Attal / Édouard Philippe)
  'c2_attal_philippe': {
    primeMinister: {
      id: 'pm_centre',
      role: 'Premier ministre',
      name: 'Édouard Philippe',
      competence: 88,
      loyalty: 80,
      politicalWeight: 92,
      scandalRisk: 12,
      status: '« Dire la vérité sur les comptes publics et réformer avec méthode et solidité. »'
    },
    ministers: [
      {
        id: 'min_eco',
        role: 'MINISTRE DE L\'ÉCONOMIE & FINANCES (BERCY)',
        name: 'Antoine Armand',
        competence: 86,
        loyalty: 88,
        politicalWeight: 78,
        scandalRisk: 10,
        status: '« Rigueur budgétaire, soutien aux entreprises et maintien de l\'attractivité de la France. »'
      },
      {
        id: 'min_int',
        role: 'MINISTRE DE L\'INTÉRIEUR (BEAUVAU)',
        name: 'Gérald Darmanin',
        competence: 85,
        loyalty: 75,
        politicalWeight: 88,
        scandalRisk: 30,
        status: '« Ordre républicain dans la rue et fermeté constante sur la sécurité du quotidien. »'
      },
      {
        id: 'min_inter',
        role: 'MINISTRE DE L\'EUROPE & AFFAIRES ÉTRANGÈRES',
        name: 'Jean-Noël Barrot',
        competence: 84,
        loyalty: 90,
        politicalWeight: 75,
        scandalRisk: 8,
        status: '« Consolider le moteur franco-allemand et l\'autonomie technologique de l\'Europe. »'
      },
      {
        id: 'min_travail',
        role: 'MINISTRE DU TRAVAIL, SANTÉ & SOLIDARITÉS',
        name: 'Catherine Vautrin',
        competence: 82,
        loyalty: 85,
        politicalWeight: 80,
        scandalRisk: 15,
        status: '« Poursuite des concertations syndicales pour atteindre le plein emploi. »'
      }
    ],
    replacements: {
      min_eco: [
        { name: 'Roland Lescure', status: '« Relance industrielle et décarbonation des usines. »' },
        { name: 'Olivia Grégoire', status: '« Soutien aux PME, commerçants et indépendants. »' }
      ],
      min_int: [
        { name: 'Bruno Retailleau', status: '« Ordre strict et restauration de l\'autorité républicaine. »' },
        { name: 'Guillaume Kasbarian', status: '« Réduction de la bureaucratie et simplification. »' }
      ],
      min_inter: [
        { name: 'Stéphane Séjourné', status: '« Diplomatie européenne unie et alliances stratégiques. »' },
        { name: 'Nathalie Loiseau', status: '« Défense de la sécurité européenne et des frontières. »' }
      ],
      min_travail: [
        { name: 'Aurore Bergé', status: '« Valorisation du travail et soutien aux familles. »' },
        { name: 'Astrid Panosyan-Bouvet', status: '« Dialogue social apaisé et inclusion professionnelle. »' }
      ]
    }
  },

  // 3. La France Insoumise (Jean-Luc Mélenchon)
  'c3_melenchon': {
    primeMinister: {
      id: 'pm_lfi',
      role: 'Premier ministre',
      name: 'Manuel Bompard',
      competence: 85,
      loyalty: 95,
      politicalWeight: 88,
      scandalRisk: 10,
      status: '« L\'application stricte du programme du Nouveau Front Populaire pour changer la vie des gens. »'
    },
    ministers: [
      {
        id: 'min_eco',
        role: 'MINISTRE DE L\'ÉCONOMIE & DU BUDGET (BERCY)',
        name: 'Éric Coquerel',
        competence: 88,
        loyalty: 90,
        politicalWeight: 85,
        scandalRisk: 15,
        status: '« Rétablissement de l\'ISF, blocage des prix de première nécessité et taxation des superprofits. »'
      },
      {
        id: 'min_int',
        role: 'MINISTRE DE L\'INTÉRIEUR & LIBERTÉS (BEAUVAU)',
        name: 'Ugo Bernalicis',
        competence: 82,
        loyalty: 88,
        politicalWeight: 75,
        scandalRisk: 25,
        status: '« Rétablissement d\'une police de proximité républicaine et respect strict des libertés civiques. »'
      },
      {
        id: 'min_inter',
        role: 'MINISTRE DES AFFAIRES ÉTRANGÈRES & DE LA PAIX',
        name: 'Arnaud Le Gall',
        competence: 85,
        loyalty: 90,
        politicalWeight: 75,
        scandalRisk: 10,
        status: '« Diplomatie non-alignée, soutien aux peuples opprimés et refus des traités de libre-échange. »'
      },
      {
        id: 'min_travail',
        role: 'MINISTRE DU TRAVAIL, DES RETRAITES & SANTÉ',
        name: 'Clémence Guetté',
        competence: 84,
        loyalty: 92,
        politicalWeight: 80,
        scandalRisk: 12,
        status: '« Abrogation immédiate de la retraite à 64 ans et SMIC net porté à 1 600 euros. »'
      }
    ],
    replacements: {
      min_eco: [
        { name: 'Aurélie Trouvé', status: '« Planification écologique et régulation des marchés financiers. »' },
        { name: 'Hadrien Clouet', status: '« Revalorisation des salaires et égalité fiscale. »' }
      ],
      min_int: [
        { name: 'Danielle Obono', status: '« Lutte intransigeante contre les discriminations et abus. »' },
        { name: 'Antoine Léaument', status: '« Défense de la laïcité républicaine et de l\'ordre public juste. »' }
      ],
      min_inter: [
        { name: 'Younous Omarjee', status: '« Solidarité internationale et souveraineté populaire. »' },
        { name: 'Bastien Lachaud', status: '« Révision doctrinale de la défense nationale. »' }
      ],
      min_travail: [
        { name: 'François Ruffin', status: '« Dignité pour les ouvriers et remise au pas des multinationales. »' },
        { name: 'Mathilde Panot', status: '« Urgence sociale et bouclier tarifaire sur l\'énergie. »' }
      ]
    }
  },

  // 4. Droite Républicaine (Laurent Wauquiez)
  'c4_wauquiez': {
    primeMinister: {
      id: 'pm_lr',
      role: 'Premier ministre',
      name: 'Bruno Retailleau',
      competence: 88,
      loyalty: 82,
      politicalWeight: 90,
      scandalRisk: 15,
      status: '« Restaurer l\'autorité de l\'État, réduire les dépenses et valoriser la France du travail. »'
    },
    ministers: [
      {
        id: 'min_eco',
        role: 'MINISTRE DES FINANCES & DE L\'INDUSTRIE (BERCY)',
        name: 'Olivier Marleix',
        competence: 85,
        loyalty: 85,
        politicalWeight: 80,
        scandalRisk: 10,
        status: '« Baisse massive des impôts de production et coupe franche dans les dépenses publiques. »'
      },
      {
        id: 'min_int',
        role: 'MINISTRE DE L\'INTÉRIEUR & SÉCURITÉ (BEAUVAU)',
        name: 'Julien Dive',
        competence: 82,
        loyalty: 88,
        politicalWeight: 75,
        scandalRisk: 15,
        status: '« Rétablissement des peines planchers et expulsion systématique des délinquants étrangers. »'
      },
      {
        id: 'min_inter',
        role: 'MINISTRE DES AFFAIRES ÉTRANGÈRES & DÉFENSE',
        name: 'François-Xavier Bellamy',
        competence: 86,
        loyalty: 85,
        politicalWeight: 80,
        scandalRisk: 12,
        status: '« Réarmement militaire, indépendance diplomatique et défense des racines européennes. »'
      },
      {
        id: 'min_travail',
        role: 'MINISTRE DU TRAVAIL, SANTÉ & RURALITÉ',
        name: 'Yannick Neuder',
        competence: 84,
        loyalty: 86,
        politicalWeight: 75,
        scandalRisk: 10,
        status: '« Valorisation de l\'effort contre l\'assistanat et plan Marshall pour les hôpitaux de province. »'
      }
    ],
    replacements: {
      min_eco: [
        { name: 'Véronique Louwagie', status: '« Traque rigoureuse des déficits et orthodoxie budgétaire. »' },
        { name: 'Éric Woerth', status: '« Réforme de simplification administrative et fiscale. »' }
      ],
      min_int: [
        { name: 'David Lisnard', status: '« Libertés locales et fermeté républicaine intransigeante. »' },
        { name: 'Michèle Tabarot', status: '« Soutien inconditionnel aux magistrats et forces de police. »' }
      ],
      min_inter: [
        { name: 'Xavier Bertrand', status: '« Diplomatie d\'influence et grands partenariats industriels. »' },
        { name: 'Renaud Muselier', status: '« Coopération méditerranéenne et rayonnement régional. »' }
      ],
      min_travail: [
        { name: 'Annie Genevard', status: '« Soutien aux filières agricoles et revitalisation rurale. »' },
        { name: 'Aurélien Pradié', status: '« Défense des classes moyennes et des travailleurs modestes. »' }
      ]
    }
  },

  // 5. Social-Démocratie / Gauche Européenne (Raphaël Glucksmann)
  'c5_glucksmann': {
    primeMinister: {
      id: 'pm_sd',
      role: 'Premier ministre',
      name: 'Boris Vallaud',
      competence: 86,
      loyalty: 88,
      politicalWeight: 85,
      scandalRisk: 10,
      status: '« Réconcilier la justice sociale, l\'exigence écologique et l\'idéal démocratique européen. »'
    },
    ministers: [
      {
        id: 'min_eco',
        role: 'MINISTRE DE L\'ÉCONOMIE & TRANSITION (BERCY)',
        name: 'Valérie Rabault',
        competence: 90,
        loyalty: 86,
        politicalWeight: 80,
        scandalRisk: 10,
        status: '« Fiscalité équitable sur les hauts patrimoines et investissements massifs dans l\'éducation. »'
      },
      {
        id: 'min_int',
        role: 'MINISTRE DE L\'INTÉRIEUR & CITOYENNETÉ (BEAUVAU)',
        name: 'Nicolas Mayer-Rossignol',
        competence: 84,
        loyalty: 85,
        politicalWeight: 75,
        scandalRisk: 15,
        status: '« Sécurité du quotidien, fermeté contre les narcotrafics et respect absolu de l\'État de droit. »'
      },
      {
        id: 'min_inter',
        role: 'MINISTRE DES AFFAIRES ÉTRANGÈRES & EUROPE',
        name: 'Bernard Cazeneuve',
        competence: 92,
        loyalty: 80,
        politicalWeight: 88,
        scandalRisk: 12,
        status: '« Soutien indéfectible aux démocraties, défense européenne et voix humaniste de la France. »'
      },
      {
        id: 'min_travail',
        role: 'MINISTRE DU TRAVAIL & SANTÉ PUBLIQUE',
        name: 'Arthur Delaporte',
        competence: 82,
        loyalty: 90,
        politicalWeight: 70,
        scandalRisk: 10,
        status: '« Revalorisation des métiers essentiels et grand plan de recrutement dans les hôpitaux. »'
      }
    ],
    replacements: {
      min_eco: [
        { name: 'Pierre Moscovici', status: '« Rigueur sociale et respect des grands équilibres européens. »' },
        { name: 'Hélène Geoffroy', status: '« Investissements ciblés dans les banlieues et quartiers populaires. »' }
      ],
      min_int: [
        { name: 'Jérôme Guedj', status: '« Défense intransigeante de la laïcité et de l\'ordre républicain. »' },
        { name: 'Michaël Delafosse', status: '« Police municipale renforcée et tranquillité publique. »' }
      ],
      min_inter: [
        { name: 'Nathalie Loiseau', status: '« Souveraineté européenne face aux régimes autoritaires. »' },
        { name: 'Sylvie Guillaume', status: '« Pacte humanitaire européen et droits fondamentaux. »' }
      ],
      min_travail: [
        { name: 'Carole Delga', status: '« Soutien aux territoires, aux artisans et à l\'apprentissage. »' },
        { name: 'Olivier Faure', status: '« Dialogue apaisé avec les syndicats et justice salariale. »' }
      ]
    }
  },

  // 6. Les Écologistes (Marine Tondelier)
  'c6_tondelier': {
    primeMinister: {
      id: 'pm_ecolo',
      role: 'Premier ministre',
      name: 'Yannick Jadot',
      competence: 86,
      loyalty: 85,
      politicalWeight: 88,
      scandalRisk: 12,
      status: '« Engager sans attendre la grande bifurcation écologique et sociale de notre pays. »'
    },
    ministers: [
      {
        id: 'min_eco',
        role: 'MINISTRE DE LA TRANSITION ÉCONOMIQUE (BERCY)',
        name: 'Eva Sas',
        competence: 88,
        loyalty: 88,
        politicalWeight: 78,
        scandalRisk: 10,
        status: '« Conditionnement écologique strict de toutes les subventions publiques aux entreprises. »'
      },
      {
        id: 'min_int',
        role: 'MINISTRE DE L\'INTÉRIEUR & LIBERTÉS (BEAUVAU)',
        name: 'Benjamin Lucas',
        competence: 80,
        loyalty: 86,
        politicalWeight: 72,
        scandalRisk: 20,
        status: '« Réforme de l\'IGPN, police de proximité et protection des manifestants écologistes. »'
      },
      {
        id: 'min_inter',
        role: 'MINISTRE DE L\'ÉNERGIE & CLIMAT',
        name: 'David Cormand',
        competence: 85,
        loyalty: 88,
        politicalWeight: 76,
        scandalRisk: 12,
        status: '« Sortie accélérée des énergies fossiles et soutien massif aux énergies renouvelables. »'
      },
      {
        id: 'min_travail',
        role: 'MINISTRE DE L\'AGRICULTURE & ALIMENTATION',
        name: 'Marie Pochon',
        competence: 82,
        loyalty: 90,
        politicalWeight: 75,
        scandalRisk: 10,
        status: '« Rémunération digne des paysans, sortie des pesticides et cantines 100% bio et locales. »'
      }
    ],
    replacements: {
      min_eco: [
        { name: 'Alain Lipietz', status: '« Économie circulaire et taxation des rentes polluantes. »' },
        { name: 'Mélanie Vogel', status: '« Égalité salariale femmes-hommes et justice sociale verte. »' }
      ],
      min_int: [
        { name: 'Sabrina Sebaihi', status: '« Transparence de l\'action policière et conciliation citoyenne. »' },
        { name: 'Guillaume Gontard', status: '« Défense des libertés associatives et des lanceurs d\'alerte. »' }
      ],
      min_inter: [
        { name: 'Delphine Batho', status: '« Souveraineté écologique et sobriété énergétique planifiée. »' },
        { name: 'Karima Delli', status: '« Développement des trains de nuit et des transports propres. »' }
      ],
      min_travail: [
        { name: 'Sandrine Rousseau', status: '« Partage de la valeur, semaine de 32h et écoféminisme. »' },
        { name: 'François Thiollet', status: '« Solidarité intergénérationnelle et grand âge. »' }
      ]
    }
  }
};

export function getPresetCabinetForCandidate(candidateId?: string): CabinetPreset {
  if (candidateId && CABINET_PRESETS_BY_CANDIDATE[candidateId]) {
    return JSON.parse(JSON.stringify(CABINET_PRESETS_BY_CANDIDATE[candidateId]));
  }
  return JSON.parse(JSON.stringify(CABINET_PRESETS_BY_CANDIDATE['c1_bardella_lepen']));
}
