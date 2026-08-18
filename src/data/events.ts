import { GameEvent } from '../types/game';

export const GAME_EVENTS: GameEvent[] = [
  {
    "id": "evt_poly_001",
    "title": "Dégradation imminente de la note souveraine par Moody's",
    "category": "economique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : DÉGRADATION IMMINENTE DE LA NOTE SOUVERAINE PAR MOODY'S",
    "description": "L'agence de notation menace d'abaisser la note de la France à cause du dérapage des finances publiques.",
    "choices": [
      {
        "id": "evt_poly_001_c1",
        "label": "Baisse d'urgence des dépenses de 15 milliards",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.5,
          "tensionDelta": 10,
          "strikeRiskDelta": 15,
          "demographicsDelta": {
            "cadres": 8,
            "populaires": -6
          },
          "message": "Votre décret (« Baisse d'urgence des dépenses de 15 milliards ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_001_c2",
        "label": "Rétablir une surtaxe exceptionnelle sur les super-riches",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": -0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "populaires": 12,
            "cadres": -6
          },
          "message": "Votre décision (« Rétablir une surtaxe exceptionnelle sur les super-riches ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_001_c3",
        "label": "Contester la méthode des agences et soutenir l'investissement",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.2,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "populaires": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Contester la méthode des agences et soutenir l'investissement ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_002",
    "title": "Choc d'inflation sur les produits alimentaires du quotidien (+10%)",
    "category": "economique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : CHOC D'INFLATION SUR LES PRODUITS ALIMENTAIRES DU QUOTIDIEN (+10%)",
    "description": "Le panier moyen des ménages explose, créant une tension majeure sur le pouvoir d'achat.",
    "choices": [
      {
        "id": "evt_poly_002_c1",
        "label": "Chèque carburant et alimentation de 200€ pour les bas salaires",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.5,
          "tensionDelta": 10,
          "strikeRiskDelta": 15,
          "demographicsDelta": {
            "cadres": 8,
            "populaires": -6
          },
          "message": "Votre décret (« Chèque carburant et alimentation de 200€ pour les bas salaires ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_002_c2",
        "label": "Geler temporairement les marges des distributeurs",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": -0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "populaires": 12,
            "cadres": -6
          },
          "message": "Votre décision (« Geler temporairement les marges des distributeurs ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_002_c3",
        "label": "Baisser la TVA à 5.5% sur les produits de base",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.2,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "populaires": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Baisser la TVA à 5.5% sur les produits de base ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_003",
    "title": "Menace de faillite d'un grand groupe industriel automobile",
    "category": "economique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : MENACE DE FAILLITE D'UN GRAND GROUPE INDUSTRIEL AUTOMOBILE",
    "description": "18 000 emplois sont menacés sur 5 sites régionaux sans soutien public.",
    "choices": [
      {
        "id": "evt_poly_003_c1",
        "label": "Prise de participation temporaire de l'État au capital",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.5,
          "tensionDelta": 10,
          "strikeRiskDelta": 15,
          "demographicsDelta": {
            "cadres": 8,
            "populaires": -6
          },
          "message": "Votre décret (« Prise de participation temporaire de l'État au capital ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_003_c2",
        "label": "Accorder un prêt garanti par l'État de 2 milliards",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": -0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "populaires": 12,
            "cadres": -6
          },
          "message": "Votre décision (« Accorder un prêt garanti par l'État de 2 milliards ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_003_c3",
        "label": "Laisser le marché opérer et financer la reconversion des salariés",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.2,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "populaires": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Laisser le marché opérer et financer la reconversion des salariés ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_004",
    "title": "Hausse brutale des taux d'intérêt de la BCE : blocage immobilier",
    "category": "economique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : HAUSSE BRUTALE DES TAUX D'INTÉRÊT DE LA BCE : BLOCAGE IMMOBILIER",
    "description": "L'accès au crédit des jeunes ménages s'effondre, plongeant le bâtiment dans la récession.",
    "choices": [
      {
        "id": "evt_poly_004_c1",
        "label": "Débloquer un super-prêt à taux zéro pour les primo-accédants",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.5,
          "tensionDelta": 10,
          "strikeRiskDelta": 15,
          "demographicsDelta": {
            "cadres": 8,
            "populaires": -6
          },
          "message": "Votre décret (« Débloquer un super-prêt à taux zéro pour les primo-accédants ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_004_c2",
        "label": "Exonérer de droits de succession les dons pour achat immobilier",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": -0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "populaires": 12,
            "cadres": -6
          },
          "message": "Votre décision (« Exonérer de droits de succession les dons pour achat immobilier ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_004_c3",
        "label": "Lancer un plan d'urgence de 50 000 logements sociaux",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.2,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "populaires": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Lancer un plan d'urgence de 50 000 logements sociaux ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_005",
    "title": "Offensive d'un fonds souverain étranger sur une pépite française d'IA",
    "category": "economique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : OFFENSIVE D'UN FONDS SOUVERAIN ÉTRANGER SUR UNE PÉPITE FRANÇAISE D'IA",
    "description": "Une entreprise stratégique de cybersécurité et d'IA risque de passer sous pavillon étranger.",
    "choices": [
      {
        "id": "evt_poly_005_c1",
        "label": "Activer le décret sur les investissements stratégiques et bloquer la vente",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.5,
          "tensionDelta": 10,
          "strikeRiskDelta": 15,
          "demographicsDelta": {
            "cadres": 8,
            "populaires": -6
          },
          "message": "Votre décret (« Activer le décret sur les investissements stratégiques et bloquer la vente ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_005_c2",
        "label": "Bâtir un tour de table avec Bpifrance et des investisseurs européens",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": -0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "populaires": 12,
            "cadres": -6
          },
          "message": "Votre décision (« Bâtir un tour de table avec Bpifrance et des investisseurs européens ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_005_c3",
        "label": "Autoriser le rachat contre des garanties sur l'emploi en France",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.2,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "populaires": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Autoriser le rachat contre des garanties sur l'emploi en France ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_006",
    "title": "Crise de liquidité bancaire européenne : panique sur le CAC 40",
    "category": "economique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : CRISE DE LIQUIDITÉ BANCAIRE EUROPÉENNE : PANIQUE SUR LE CAC 40",
    "description": "La faillite d'une banque d'affaires étrangère fait chuter les cours de 8% en 48 heures.",
    "choices": [
      {
        "id": "evt_poly_006_c1",
        "label": "Déclaration solennelle de garantie totale des dépôts des épargnants",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.5,
          "tensionDelta": 10,
          "strikeRiskDelta": 15,
          "demographicsDelta": {
            "cadres": 8,
            "populaires": -6
          },
          "message": "Votre décret (« Déclaration solennelle de garantie totale des dépôts des épargnants ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_006_c2",
        "label": "Rehausser les exigences de fonds propres des banques françaises",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": -0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "populaires": 12,
            "cadres": -6
          },
          "message": "Votre décision (« Rehausser les exigences de fonds propres des banques françaises ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_006_c3",
        "label": "Créer un fonds de stabilisation souverain d'urgence",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.2,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "populaires": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Créer un fonds de stabilisation souverain d'urgence ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_007",
    "title": "Tensions sur la taxe numérique française : menaces douanières américaines",
    "category": "economique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : TENSIONS SUR LA TAXE NUMÉRIQUE FRANÇAISE : MENACES DOUANIÈRES AMÉRICAINES",
    "description": "Washington menace de taxer à 25% le vin et le luxe français si la taxe GAFA est maintenue.",
    "choices": [
      {
        "id": "evt_poly_007_c1",
        "label": "Maintenir fermement la taxe au nom de la souveraineté fiscale",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.5,
          "tensionDelta": 10,
          "strikeRiskDelta": 15,
          "demographicsDelta": {
            "cadres": 8,
            "populaires": -6
          },
          "message": "Votre décret (« Maintenir fermement la taxe au nom de la souveraineté fiscale ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_007_c2",
        "label": "Négocier un accord d'harmonisation fiscale à l'OCDE",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": -0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "populaires": 12,
            "cadres": -6
          },
          "message": "Votre décision (« Négocier un accord d'harmonisation fiscale à l'OCDE ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_007_c3",
        "label": "Remplacer la taxe par une contribution carbone sur les serveurs",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.2,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "populaires": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Remplacer la taxe par une contribution carbone sur les serveurs ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_008",
    "title": "Pénurie de main-d'œuvre dans les métiers en tension (BTP, restauration)",
    "category": "economique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : PÉNURIE DE MAIN-D'ŒUVRE DANS LES MÉTIERS EN TENSION (BTP, RESTAURATION)",
    "description": "450 000 emplois ne trouvent pas preneurs, bridant la croissance de 0.3%.",
    "choices": [
      {
        "id": "evt_poly_008_c1",
        "label": "Faciliter les régularisations de travailleurs étrangers qualifiés",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.5,
          "tensionDelta": 10,
          "strikeRiskDelta": 15,
          "demographicsDelta": {
            "cadres": 8,
            "populaires": -6
          },
          "message": "Votre décret (« Faciliter les régularisations de travailleurs étrangers qualifiés ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_008_c2",
        "label": "Augmenter les salaires de branche par la négociation obligatoire",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": -0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "populaires": 12,
            "cadres": -6
          },
          "message": "Votre décision (« Augmenter les salaires de branche par la négociation obligatoire ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_008_c3",
        "label": "Doubler les primes d'apprentissage et de reconversion",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.2,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "populaires": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Doubler les primes d'apprentissage et de reconversion ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_009",
    "title": "Dérapage du déficit de la Sécurité Sociale (Trou de la Sécu de 18 Mds)",
    "category": "economique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : DÉRAPAGE DU DÉFICIT DE LA SÉCURITÉ SOCIALE (TROU DE LA SÉCU DE 18 MDS)",
    "description": "Les dépenses de santé et de médicaments dépassent les prévisions de la loi de financement.",
    "choices": [
      {
        "id": "evt_poly_009_c1",
        "label": "Augmenter les franchises médicales et lutter contre les abus",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.5,
          "tensionDelta": 10,
          "strikeRiskDelta": 15,
          "demographicsDelta": {
            "cadres": 8,
            "populaires": -6
          },
          "message": "Votre décret (« Augmenter les franchises médicales et lutter contre les abus ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_009_c2",
        "label": "Hausse ciblée de la CSG sur les revenus du patrimoine",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": -0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "populaires": 12,
            "cadres": -6
          },
          "message": "Votre décision (« Hausse ciblée de la CSG sur les revenus du patrimoine ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_009_c3",
        "label": "Plan d'économies drastique sur les dépenses administratives des caisses",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.2,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "populaires": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Plan d'économies drastique sur les dépenses administratives des caisses ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_010",
    "title": "Désindustrialisation : fermeture annoncée d'une usine chimique dans le Nord",
    "category": "economique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : DÉSINDUSTRIALISATION : FERMETURE ANNONCÉE D'UNE USINE CHIMIQUE DANS LE NORD",
    "description": "Le groupe délocalise vers un pays à faible coût d'énergie, menaçant tout un bassin de vie.",
    "choices": [
      {
        "id": "evt_poly_010_c1",
        "label": "Imposer une pénalité financière exemplaire pour départ injustifié (Loi Florange renforcée)",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.5,
          "tensionDelta": 10,
          "strikeRiskDelta": 15,
          "demographicsDelta": {
            "cadres": 8,
            "populaires": -6
          },
          "message": "Votre décret (« Imposer une pénalité financière exemplaire pour départ injustifié (Loi Florange renforcée) ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_010_c2",
        "label": "Racheter le site par la région pour créer une usine de batteries vertes",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": -0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "populaires": 12,
            "cadres": -6
          },
          "message": "Votre décision (« Racheter le site par la région pour créer une usine de batteries vertes ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_010_c3",
        "label": "Accompagner les salariés avec un plan de reclassement renforcé",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.2,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "populaires": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Accompagner les salariés avec un plan de reclassement renforcé ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_011",
    "title": "Pression sur le Smic : débat sur l'indexation et la trappe à bas salaires",
    "category": "economique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : PRESSION SUR LE SMIC : DÉBAT SUR L'INDEXATION ET LA TRAPPE À BAS SALAIRES",
    "description": "L'écart entre le Smic et les salaires moyens se réduit, créant un sentiment de déclassement.",
    "choices": [
      {
        "id": "evt_poly_011_c1",
        "label": "Revalorisation exceptionnelle du Smic de 5%",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.5,
          "tensionDelta": 10,
          "strikeRiskDelta": 15,
          "demographicsDelta": {
            "cadres": 8,
            "populaires": -6
          },
          "message": "Votre décret (« Revalorisation exceptionnelle du Smic de 5% ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_011_c2",
        "label": "Désmicardiser les grilles en baissant les charges sur les salaires médians",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": -0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "populaires": 12,
            "cadres": -6
          },
          "message": "Votre décision (« Désmicardiser les grilles en baissant les charges sur les salaires médians ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_011_c3",
        "label": "Mettre en place un chèque travail pour récompenser l'effort",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.2,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "populaires": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Mettre en place un chèque travail pour récompenser l'effort ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_012",
    "title": "Crise du modèle agricole : surcoût des engrais et concurrence internationale",
    "category": "economique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : CRISE DU MODÈLE AGRICOLE : SURCOÛT DES ENGRAIS ET CONCURRENCE INTERNATIONALE",
    "description": "Les éleveurs et céréaliers dénoncent des marges négatives et un revenu moyen indigne.",
    "choices": [
      {
        "id": "evt_poly_012_c1",
        "label": "Garantir un prix plancher d'achat aux producteurs agricoles",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.5,
          "tensionDelta": 10,
          "strikeRiskDelta": 15,
          "demographicsDelta": {
            "cadres": 8,
            "populaires": -6
          },
          "message": "Votre décret (« Garantir un prix plancher d'achat aux producteurs agricoles ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_012_c2",
        "label": "Plan d'allègement fiscal sur les carburants non routiers",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": -0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "populaires": 12,
            "cadres": -6
          },
          "message": "Votre décision (« Plan d'allègement fiscal sur les carburants non routiers ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_012_c3",
        "label": "Accélérer la transition vers le bio avec des subventions directes",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.2,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "populaires": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Accélérer la transition vers le bio avec des subventions directes ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_013",
    "title": "Appel à la grève générale de l'Intersyndicale contre la politique salariale",
    "category": "social",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : APPEL À LA GRÈVE GÉNÉRALE DE L'INTERSYNDICALE CONTRE LA POLITIQUE SALARIALE",
    "description": "Les principaux syndicats de salariés s'unissent pour une journée 'France à l'arrêt'.",
    "choices": [
      {
        "id": "evt_poly_013_c1",
        "label": "Ouvrir une grande conférence sociale à Matignon",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.3,
          "tensionDelta": -20,
          "strikeRiskDelta": -25,
          "demographicsDelta": {
            "populaires": 14,
            "fonctionnaires": 12
          },
          "message": "Votre décret (« Ouvrir une grande conférence sociale à Matignon ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_013_c2",
        "label": "Adopter la fermeté et garantir la liberté de travail",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": -2,
          "deficitDelta": 0.0,
          "tensionDelta": 25,
          "strikeRiskDelta": 30,
          "demographicsDelta": {
            "cadres": 10,
            "populaires": -12
          },
          "message": "Votre décision (« Adopter la fermeté et garantir la liberté de travail ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_013_c3",
        "label": "Proposer une prime de pouvoir d'achat défiscalisée",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": 0.1,
          "tensionDelta": -10,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "cadres": 6,
            "fonctionnaires": 6
          },
          "message": "Votre arbitrage (« Proposer une prime de pouvoir d'achat défiscalisée ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_014",
    "title": "Urgences hospitalières en grève : burn-out et démissions massives",
    "category": "social",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : URGENCES HOSPITALIÈRES EN GRÈVE : BURN-OUT ET DÉMISSIONS MASSIVES",
    "description": "Le personnel soignant dénonce l'épuisement général et la dégradation des soins.",
    "choices": [
      {
        "id": "evt_poly_014_c1",
        "label": "Plan Marshall de 4 milliards pour l'hôpital et hausse des primes de garde",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.3,
          "tensionDelta": -20,
          "strikeRiskDelta": -25,
          "demographicsDelta": {
            "populaires": 14,
            "fonctionnaires": 12
          },
          "message": "Votre décret (« Plan Marshall de 4 milliards pour l'hôpital et hausse des primes de garde ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_014_c2",
        "label": "Obligation d'installation des médecins dans les zones sous-dotées",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": -2,
          "deficitDelta": 0.0,
          "tensionDelta": 25,
          "strikeRiskDelta": 30,
          "demographicsDelta": {
            "cadres": 10,
            "populaires": -12
          },
          "message": "Votre décision (« Obligation d'installation des médecins dans les zones sous-dotées ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_014_c3",
        "label": "Débureaucratiser les hôpitaux en redonnant le pouvoir aux médecins",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": 0.1,
          "tensionDelta": -10,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "cadres": 6,
            "fonctionnaires": 6
          },
          "message": "Votre arbitrage (« Débureaucratiser les hôpitaux en redonnant le pouvoir aux médecins ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_015",
    "title": "Blocage des raffineries et dépôts de carburant : stations à sec",
    "category": "social",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : BLOCAGE DES RAFFINERIES ET DÉPÔTS DE CARBURANT : STATIONS À SEC",
    "description": "Les grévistes bloquent 6 raffineries sur 8, menaçant la France de paralysie en 4 jours.",
    "choices": [
      {
        "id": "evt_poly_015_c1",
        "label": "Réquisitionner les salariés grévistes par arrêté préfectoral",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.3,
          "tensionDelta": -20,
          "strikeRiskDelta": -25,
          "demographicsDelta": {
            "populaires": 14,
            "fonctionnaires": 12
          },
          "message": "Votre décret (« Réquisitionner les salariés grévistes par arrêté préfectoral ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_015_c2",
        "label": "Négocier en urgence une prime exceptionnelle de partage de la valeur",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": -2,
          "deficitDelta": 0.0,
          "tensionDelta": 25,
          "strikeRiskDelta": 30,
          "demographicsDelta": {
            "cadres": 10,
            "populaires": -12
          },
          "message": "Votre décision (« Négocier en urgence une prime exceptionnelle de partage de la valeur ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_015_c3",
        "label": "Ouvrir les stocks stratégiques de carburant de l'État",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": 0.1,
          "tensionDelta": -10,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "cadres": 6,
            "fonctionnaires": 6
          },
          "message": "Votre arbitrage (« Ouvrir les stocks stratégiques de carburant de l'État ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_016",
    "title": "Mouvement étudiant : blocage des universités contre la précarité",
    "category": "social",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : MOUVEMENT ÉTUDIANT : BLOCAGE DES UNIVERSITÉS CONTRE LA PRÉCARITÉ",
    "description": "Les assemblées générales étudiantes réclament le repas à 1€ pour tous et le gel des loyers du Crous.",
    "choices": [
      {
        "id": "evt_poly_016_c1",
        "label": "Généraliser le repas à 1€ et revaloriser les bourses étudiantes de 10%",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.3,
          "tensionDelta": -20,
          "strikeRiskDelta": -25,
          "demographicsDelta": {
            "populaires": 14,
            "fonctionnaires": 12
          },
          "message": "Votre décret (« Généraliser le repas à 1€ et revaloriser les bourses étudiantes de 10% ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_016_c2",
        "label": "Proposer une allocation universelle d'autonomie pour les 18-25 ans",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": -2,
          "deficitDelta": 0.0,
          "tensionDelta": 25,
          "strikeRiskDelta": 30,
          "demographicsDelta": {
            "cadres": 10,
            "populaires": -12
          },
          "message": "Votre décision (« Proposer une allocation universelle d'autonomie pour les 18-25 ans ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_016_c3",
        "label": "Faire évacuer les campus pour garantir la tenue des examens",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": 0.1,
          "tensionDelta": -10,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "cadres": 6,
            "fonctionnaires": 6
          },
          "message": "Votre arbitrage (« Faire évacuer les campus pour garantir la tenue des examens ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_017",
    "title": "Crise des retraites complémentaires : négociation tendue entre partenaires sociaux",
    "category": "social",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : CRISE DES RETRAITES COMPLÉMENTAIRES : NÉGOCIATION TENDUE ENTRE PARTENAIRES SOCIAUX",
    "description": "Les syndicats et le patronat s'affrontent sur la revalorisation des pensions de 14 millions de retraités.",
    "choices": [
      {
        "id": "evt_poly_017_c1",
        "label": "Laisser la négociation autonome aux partenaires sociaux",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.3,
          "tensionDelta": -20,
          "strikeRiskDelta": -25,
          "demographicsDelta": {
            "populaires": 14,
            "fonctionnaires": 12
          },
          "message": "Votre décret (« Laisser la négociation autonome aux partenaires sociaux ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_017_c2",
        "label": "Fixer par la loi une revalorisation minimale égale à l'inflation",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": -2,
          "deficitDelta": 0.0,
          "tensionDelta": 25,
          "strikeRiskDelta": 30,
          "demographicsDelta": {
            "cadres": 10,
            "populaires": -12
          },
          "message": "Votre décision (« Fixer par la loi une revalorisation minimale égale à l'inflation ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_017_c3",
        "label": "Proposer une incitation fiscale pour l'épargne retraite individuelle",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": 0.1,
          "tensionDelta": -10,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "cadres": 6,
            "fonctionnaires": 6
          },
          "message": "Votre arbitrage (« Proposer une incitation fiscale pour l'épargne retraite individuelle ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_018",
    "title": "Pénurie aiguë de soignants et d'aides à domicile pour les personnes âgées",
    "category": "social",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : PÉNURIE AIGUË DE SOIGNANTS ET D'AIDES À DOMICILE POUR LES PERSONNES ÂGÉES",
    "description": "Le secteur du grand âge peine à recruter face à la dépendance croissante de la population.",
    "choices": [
      {
        "id": "evt_poly_018_c1",
        "label": "Revaloriser de 15% les grilles indiciaires des métiers du grand âge",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.3,
          "tensionDelta": -20,
          "strikeRiskDelta": -25,
          "demographicsDelta": {
            "populaires": 14,
            "fonctionnaires": 12
          },
          "message": "Votre décret (« Revaloriser de 15% les grilles indiciaires des métiers du grand âge ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_018_c2",
        "label": "Créer un statut d'aidant familial indemnisé par la solidarité nationale",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": -2,
          "deficitDelta": 0.0,
          "tensionDelta": 25,
          "strikeRiskDelta": 30,
          "demographicsDelta": {
            "cadres": 10,
            "populaires": -12
          },
          "message": "Votre décision (« Créer un statut d'aidant familial indemnisé par la solidarité nationale ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_018_c3",
        "label": "Financer la modernisation des EHPAD publics",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": 0.1,
          "tensionDelta": -10,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "cadres": 6,
            "fonctionnaires": 6
          },
          "message": "Votre arbitrage (« Financer la modernisation des EHPAD publics ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_019",
    "title": "Tensions sur la réforme de l'assurance-chômage",
    "category": "social",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : TENSIONS SUR LA RÉFORME DE L'ASSURANCE-CHÔMAGE",
    "description": "Le durcissement des critères d'indemnisation provoque la colère des syndicats.",
    "choices": [
      {
        "id": "evt_poly_019_c1",
        "label": "Maintenir la réforme pour inciter au retour à l'emploi",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.3,
          "tensionDelta": -20,
          "strikeRiskDelta": -25,
          "demographicsDelta": {
            "populaires": 14,
            "fonctionnaires": 12
          },
          "message": "Votre décret (« Maintenir la réforme pour inciter au retour à l'emploi ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_019_c2",
        "label": "Aménager des critères plus souples pour les seniors et saisonniers",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": -2,
          "deficitDelta": 0.0,
          "tensionDelta": 25,
          "strikeRiskDelta": 30,
          "demographicsDelta": {
            "cadres": 10,
            "populaires": -12
          },
          "message": "Votre décision (« Aménager des critères plus souples pour les seniors et saisonniers ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_019_c3",
        "label": "Remplacer les sanctions par un accompagnement personnalisé renforcé",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": 0.1,
          "tensionDelta": -10,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "cadres": 6,
            "fonctionnaires": 6
          },
          "message": "Votre arbitrage (« Remplacer les sanctions par un accompagnement personnalisé renforcé ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_020",
    "title": "Crise du logement : hausse explosive du nombre de sans-abri dans les métropoles",
    "category": "social",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : CRISE DU LOGEMENT : HAUSSE EXPLOSIVE DU NOMBRE DE SANS-ABRI DANS LES MÉTROPOLES",
    "description": "Les associations humanitaires alertent sur la saturation complète du 115 à l'approche de l'hiver.",
    "choices": [
      {
        "id": "evt_poly_020_c1",
        "label": "Réquisitionner les bâtiments et bureaux vacants pour l'hébergement d'urgence",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.3,
          "tensionDelta": -20,
          "strikeRiskDelta": -25,
          "demographicsDelta": {
            "populaires": 14,
            "fonctionnaires": 12
          },
          "message": "Votre décret (« Réquisitionner les bâtiments et bureaux vacants pour l'hébergement d'urgence ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_020_c2",
        "label": "Créer 20 000 places pérennes de 'Logement d'Abord'",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": -2,
          "deficitDelta": 0.0,
          "tensionDelta": 25,
          "strikeRiskDelta": 30,
          "demographicsDelta": {
            "cadres": 10,
            "populaires": -12
          },
          "message": "Votre décision (« Créer 20 000 places pérennes de 'Logement d'Abord' ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_020_c3",
        "label": "Renforcer le budget des associations caritatives de terrain",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": 0.1,
          "tensionDelta": -10,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "cadres": 6,
            "fonctionnaires": 6
          },
          "message": "Votre arbitrage (« Renforcer le budget des associations caritatives de terrain ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_021",
    "title": "Nuit d'émeutes urbaines après un contrôle de police tragique",
    "category": "securite",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : NUIT D'ÉMEUTES URBAINES APRÈS UN CONTRÔLE DE POLICE TRAGIQUE",
    "description": "Des commissariats et mairies sont pris pour cible dans plusieurs banlieues.",
    "choices": [
      {
        "id": "evt_poly_021_c1",
        "label": "Décréter l'état d'urgence local et mobiliser la CRS 8 et le RAID",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.1,
          "tensionDelta": 10,
          "strikeRiskDelta": 10,
          "demographicsDelta": {
            "retraites": 14,
            "rural": 12,
            "jeunesse": -8
          },
          "message": "Votre décret (« Décréter l'état d'urgence local et mobiliser la CRS 8 et le RAID ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_021_c2",
        "label": "Appel solennel au calme et saisine immédiate de l'IGPN",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.0,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 10,
            "cadres": 4
          },
          "message": "Votre décision (« Appel solennel au calme et saisine immédiate de l'IGPN ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_021_c3",
        "label": "Lancer un plan de médiateurs et d'activités pour la jeunesse",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": -0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "cadres": 8,
            "rural": 8
          },
          "message": "Votre arbitrage (« Lancer un plan de médiateurs et d'activités pour la jeunesse ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_022",
    "title": "Fusillade liée au narcotrafic à Marseille : victimes collatérales",
    "category": "securite",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : FUSILLADE LIÉE AU NARCOTRAFIC À MARSEILLE : VICTIMES COLLATÉRALES",
    "description": "Une guerre de territoire entre cartels endeuille un quartier populaire.",
    "choices": [
      {
        "id": "evt_poly_022_c1",
        "label": "Créer une brigade spéciale permanente anti-narcotrafic avec l'armée",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.1,
          "tensionDelta": 10,
          "strikeRiskDelta": 10,
          "demographicsDelta": {
            "retraites": 14,
            "rural": 12,
            "jeunesse": -8
          },
          "message": "Votre décret (« Créer une brigade spéciale permanente anti-narcotrafic avec l'armée ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_022_c2",
        "label": "Durcir les peines pour les guetteurs et dealers de points de vente",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.0,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 10,
            "cadres": 4
          },
          "message": "Votre décision (« Durcir les peines pour les guetteurs et dealers de points de vente ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_022_c3",
        "label": "Lancer un plan de saisie intégrale des patrimoines criminels",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": -0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "cadres": 8,
            "rural": 8
          },
          "message": "Votre arbitrage (« Lancer un plan de saisie intégrale des patrimoines criminels ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_023",
    "title": "Surpopulation carcérale critique : taux d'occupation à 140%",
    "category": "securite",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : SURPOPULATION CARCÉRALE CRITIQUE : TAUX D'OCCUPATION À 140%",
    "description": "Les gardiens de prison bloquent les établissements pour dénoncer l'insécurité.",
    "choices": [
      {
        "id": "evt_poly_023_c1",
        "label": "Construire en urgence 10 000 places de détention modulaires",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.1,
          "tensionDelta": 10,
          "strikeRiskDelta": 10,
          "demographicsDelta": {
            "retraites": 14,
            "rural": 12,
            "jeunesse": -8
          },
          "message": "Votre décret (« Construire en urgence 10 000 places de détention modulaires ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_023_c2",
        "label": "Développer le bracelet électronique et les travaux d'intérêt général",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.0,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 10,
            "cadres": 4
          },
          "message": "Votre décision (« Développer le bracelet électronique et les travaux d'intérêt général ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_023_c3",
        "label": "Mettre en place un mécanisme légal de régulation carcérale",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": -0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "cadres": 8,
            "rural": 8
          },
          "message": "Votre arbitrage (« Mettre en place un mécanisme légal de régulation carcérale ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_024",
    "title": "Cyberattaque majeure contre les systèmes de 12 centres hospitaliers",
    "category": "securite",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : CYBERATTAQUE MAJEURE CONTRE LES SYSTÈMES DE 12 CENTRES HOSPITALIERS",
    "description": "Des pirates bloquent les urgences et exigent 5 millions d'euros de rançon.",
    "choices": [
      {
        "id": "evt_poly_024_c1",
        "label": "Refus absolu de payer et déploiement des cyber-commandos de l'ANSSI",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.1,
          "tensionDelta": 10,
          "strikeRiskDelta": 10,
          "demographicsDelta": {
            "retraites": 14,
            "rural": 12,
            "jeunesse": -8
          },
          "message": "Votre décret (« Refus absolu de payer et déploiement des cyber-commandos de l'ANSSI ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_024_c2",
        "label": "Fonds d'urgence de 300M€ pour blinder les réseaux de santé",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.0,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 10,
            "cadres": 4
          },
          "message": "Votre décision (« Fonds d'urgence de 300M€ pour blinder les réseaux de santé ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_024_c3",
        "label": "Riposte cybernétique officielle contre les infrastructures des pirates",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": -0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "cadres": 8,
            "rural": 8
          },
          "message": "Votre arbitrage (« Riposte cybernétique officielle contre les infrastructures des pirates ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_025",
    "title": "Violence chez les mineurs : rixe mortelle entre bandes rivales",
    "category": "securite",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : VIOLENCE CHEZ LES MINEURS : RIXE MORTELLE ENTRE BANDES RIVALES",
    "description": "L'opinion publique est sous le choc après la mort d'un adolescent de 14 ans.",
    "choices": [
      {
        "id": "evt_poly_025_c1",
        "label": "Abaisser la majorité pénale à 16 ans et peines planchers",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.1,
          "tensionDelta": 10,
          "strikeRiskDelta": 10,
          "demographicsDelta": {
            "retraites": 14,
            "rural": 12,
            "jeunesse": -8
          },
          "message": "Votre décret (« Abaisser la majorité pénale à 16 ans et peines planchers ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_025_c2",
        "label": "Créer des internats éducatifs fermés d'urgence",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.0,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 10,
            "cadres": 4
          },
          "message": "Votre décision (« Créer des internats éducatifs fermés d'urgence ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_025_c3",
        "label": "Rendre les parents pénalement et financièrement responsables",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": -0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "cadres": 8,
            "rural": 8
          },
          "message": "Votre arbitrage (« Rendre les parents pénalement et financièrement responsables ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_026",
    "title": "Menace terroriste : alerte maximale sur les transports parisiens",
    "category": "securite",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : MENACE TERRORISTE : ALERTE MAXIMALE SUR LES TRANSPORTS PARISIENS",
    "description": "Les services de renseignement déjouent un projet d'action violente concertée.",
    "choices": [
      {
        "id": "evt_poly_026_c1",
        "label": "Relever le plan Vigipirate au niveau Urgence Attentat",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.1,
          "tensionDelta": 10,
          "strikeRiskDelta": 10,
          "demographicsDelta": {
            "retraites": 14,
            "rural": 12,
            "jeunesse": -8
          },
          "message": "Votre décret (« Relever le plan Vigipirate au niveau Urgence Attentat ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_026_c2",
        "label": "Déployer 7 000 militaires de l'opération Sentinelle",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.0,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 10,
            "cadres": 4
          },
          "message": "Votre décision (« Déployer 7 000 militaires de l'opération Sentinelle ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_026_c3",
        "label": "Généraliser la vidéosurveillance avec IA algorithmique",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": -0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "cadres": 8,
            "rural": 8
          },
          "message": "Votre arbitrage (« Généraliser la vidéosurveillance avec IA algorithmique ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_027",
    "title": "Affrontements violents entre militants radicaux et forces de l'ordre à Sainte-Soline",
    "category": "securite",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : AFFRONTEMENTS VIOLENTS ENTRE MILITANTS RADICAUX ET FORCES DE L'ORDRE À SAINTE-SOLINE",
    "description": "Des heurts éclatent autour d'un projet d'aménagement contesté.",
    "choices": [
      {
        "id": "evt_poly_027_c1",
        "label": "Dissoudre les groupements violents par décret en Conseil des ministres",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.1,
          "tensionDelta": 10,
          "strikeRiskDelta": 10,
          "demographicsDelta": {
            "retraites": 14,
            "rural": 12,
            "jeunesse": -8
          },
          "message": "Votre décret (« Dissoudre les groupements violents par décret en Conseil des ministres ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_027_c2",
        "label": "Mettre en place un moratoire sur les chantiers litigieux",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.0,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 10,
            "cadres": 4
          },
          "message": "Votre décision (« Mettre en place un moratoire sur les chantiers litigieux ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_027_c3",
        "label": "Ouvrir une enquête parlementaire sur le maintien de l'ordre",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": -0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "cadres": 8,
            "rural": 8
          },
          "message": "Votre arbitrage (« Ouvrir une enquête parlementaire sur le maintien de l'ordre ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_028",
    "title": "Afflux migratoire exceptionnel aux frontières alpines et maritimes",
    "category": "securite",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : AFFLUX MIGRATOIRE EXCEPTIONNEL AUX FRONTIÈRES ALPINES ET MARITIMES",
    "description": "Les centres d'accueil sont débordés par l'arrivée simultanée de 3 000 demandeurs d'asile.",
    "choices": [
      {
        "id": "evt_poly_028_c1",
        "label": "Rétablir des contrôles systématiques aux frontières intérieures",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.1,
          "tensionDelta": 10,
          "strikeRiskDelta": 10,
          "demographicsDelta": {
            "retraites": 14,
            "rural": 12,
            "jeunesse": -8
          },
          "message": "Votre décret (« Rétablir des contrôles systématiques aux frontières intérieures ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_028_c2",
        "label": "Accélérer le traitement des demandes d'asile en 15 jours",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 2,
          "deficitDelta": 0.0,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 10,
            "cadres": 4
          },
          "message": "Votre décision (« Accélérer le traitement des demandes d'asile en 15 jours ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_028_c3",
        "label": "Négocier des accords de réadmission avec les pays d'origine",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": -0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "cadres": 8,
            "rural": 8
          },
          "message": "Votre arbitrage (« Négocier des accords de réadmission avec les pays d'origine ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_029",
    "title": "Projet de construction de 6 réacteurs nucléaires EPR 2 : vote décisif",
    "category": "environnement",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : PROJET DE CONSTRUCTION DE 6 RÉACTEURS NUCLÉAIRES EPR 2 : VOTE DÉCISIF",
    "description": "Le Parlement doit trancher sur la relance nucléaire face aux collectifs écologistes.",
    "choices": [
      {
        "id": "evt_poly_029_c1",
        "label": "Accélérer les procédures pour lancer les chantiers sans délai",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "rural": 12,
            "cadres": -4
          },
          "message": "Votre décret (« Accélérer les procédures pour lancer les chantiers sans délai ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_029_c2",
        "label": "Conditionner le nucléaire à un investissement équivalent dans le renouvelable",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 6,
          "deficitDelta": -0.1,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 14,
            "populaires": 8
          },
          "message": "Votre décision (« Conditionner le nucléaire à un investissement équivalent dans le renouvelable ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_029_c3",
        "label": "Soumettre le choix énergétique de la France à un référendum",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 1,
          "deficitDelta": -0.3,
          "tensionDelta": 15,
          "strikeRiskDelta": 20,
          "demographicsDelta": {
            "cadres": 8,
            "rural": -10
          },
          "message": "Votre arbitrage (« Soumettre le choix énergétique de la France à un référendum ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_030",
    "title": "Sécheresse historique : conflit d'usage de l'eau entre villes et agriculture",
    "category": "environnement",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : SÉCHERESSE HISTORIQUE : CONFLIT D'USAGE DE L'EAU ENTRE VILLES ET AGRICULTURE",
    "description": "Les nappes phréatiques sont au plus bas dans 75 départements.",
    "choices": [
      {
        "id": "evt_poly_030_c1",
        "label": "Financer un réseau de retenues collinaires et de méga-bassines",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "rural": 12,
            "cadres": -4
          },
          "message": "Votre décret (« Financer un réseau de retenues collinaires et de méga-bassines ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_030_c2",
        "label": "Tarification progressive de l'eau avec gratuité des premiers volumes vitaux",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 6,
          "deficitDelta": -0.1,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 14,
            "populaires": 8
          },
          "message": "Votre décision (« Tarification progressive de l'eau avec gratuité des premiers volumes vitaux ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_030_c3",
        "label": "Priorité stricte à l'eau potable et interdiction des arrosages intensifs",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 1,
          "deficitDelta": -0.3,
          "tensionDelta": 15,
          "strikeRiskDelta": 20,
          "demographicsDelta": {
            "cadres": 8,
            "rural": -10
          },
          "message": "Votre arbitrage (« Priorité stricte à l'eau potable et interdiction des arrosages intensifs ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_031",
    "title": "Flambée des cours de l'électricité : l'industrie française étouffée",
    "category": "environnement",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : FLAMBÉE DES COURS DE L'ÉLECTRICITÉ : L'INDUSTRIE FRANÇAISE ÉTOUFFÉE",
    "description": "Le mécanisme européen indexé sur le gaz fait exploser les factures d'usines.",
    "choices": [
      {
        "id": "evt_poly_031_c1",
        "label": "Sortir unilatéralement du marché européen pour appliquer le coût réel du nucléaire",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "rural": 12,
            "cadres": -4
          },
          "message": "Votre décret (« Sortir unilatéralement du marché européen pour appliquer le coût réel du nucléaire ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_031_c2",
        "label": "Négocier une dérogation d'urgence avec la Commission européenne",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 6,
          "deficitDelta": -0.1,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 14,
            "populaires": 8
          },
          "message": "Votre décision (« Négocier une dérogation d'urgence avec la Commission européenne ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_031_c3",
        "label": "Mettre en place un bouclier tarifaire d'État temporaire",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 1,
          "deficitDelta": -0.3,
          "tensionDelta": 15,
          "strikeRiskDelta": 20,
          "demographicsDelta": {
            "cadres": 8,
            "rural": -10
          },
          "message": "Votre arbitrage (« Mettre en place un bouclier tarifaire d'État temporaire ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_032",
    "title": "Incendies monstres dans les Landes : 40 000 hectares menacés",
    "category": "environnement",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : INCENDIES MONSTRES DANS LES LANDES : 40 000 HECTARES MENACÉS",
    "description": "Les pompiers luttent contre des brasiers historiques attisés par la canicule.",
    "choices": [
      {
        "id": "evt_poly_032_c1",
        "label": "Commander immédiatement 12 nouveaux avions bombardiers d'eau Canadair",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "rural": 12,
            "cadres": -4
          },
          "message": "Votre décret (« Commander immédiatement 12 nouveaux avions bombardiers d'eau Canadair ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_032_c2",
        "label": "Interdire l'accès à tous les massifs forestiers et peines maximales pour pyromanie",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 6,
          "deficitDelta": -0.1,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 14,
            "populaires": 8
          },
          "message": "Votre décision (« Interdire l'accès à tous les massifs forestiers et peines maximales pour pyromanie ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_032_c3",
        "label": "Grand plan de reboisement avec des espèces résilientes au climat",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 1,
          "deficitDelta": -0.3,
          "tensionDelta": 15,
          "strikeRiskDelta": 20,
          "demographicsDelta": {
            "cadres": 8,
            "rural": -10
          },
          "message": "Votre arbitrage (« Grand plan de reboisement avec des espèces résilientes au climat ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_033",
    "title": "Débat explosif sur l'interdiction des passoires thermiques (Diagnostic DPE)",
    "category": "environnement",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : DÉBAT EXPLOSIF SUR L'INTERDICTION DES PASSOIRES THERMIQUES (DIAGNOSTIC DPE)",
    "description": "500 000 logements risquent d'être interdits à la location, aggravant la crise du logement.",
    "choices": [
      {
        "id": "evt_poly_033_c1",
        "label": "Repousser de 3 ans le calendrier des interdictions pour donner du temps aux propriétaires",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "rural": 12,
            "cadres": -4
          },
          "message": "Votre décret (« Repousser de 3 ans le calendrier des interdictions pour donner du temps aux propriétaires ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_033_c2",
        "label": "Multiplier par deux le budget de MaPrimeRénov pour les ménages modestes",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 6,
          "deficitDelta": -0.1,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 14,
            "populaires": 8
          },
          "message": "Votre décision (« Multiplier par deux le budget de MaPrimeRénov pour les ménages modestes ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_033_c3",
        "label": "Simplifier drastiquement les règles du calcul DPE",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 1,
          "deficitDelta": -0.3,
          "tensionDelta": 15,
          "strikeRiskDelta": 20,
          "demographicsDelta": {
            "cadres": 8,
            "rural": -10
          },
          "message": "Votre arbitrage (« Simplifier drastiquement les règles du calcul DPE ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_034",
    "title": "Colère des automobilistes contre les Zones à Faibles Émissions (ZFE)",
    "category": "environnement",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : COLÈRE DES AUTOMOBILISTES CONTRE LES ZONES À FAIBLES ÉMISSIONS (ZFE)",
    "description": "L'interdiction des vieux véhicules diesel pénalise les travailleurs périurbains.",
    "choices": [
      {
        "id": "evt_poly_034_c1",
        "label": "Suspendre les ZFE tant que le parc de véhicules électriques n'est pas accessible",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "rural": 12,
            "cadres": -4
          },
          "message": "Votre décret (« Suspendre les ZFE tant que le parc de véhicules électriques n'est pas accessible ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_034_c2",
        "label": "Lancer un leasing social à 50€/mois pour les travailleurs modestes",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 6,
          "deficitDelta": -0.1,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 14,
            "populaires": 8
          },
          "message": "Votre décision (« Lancer un leasing social à 50€/mois pour les travailleurs modestes ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_034_c3",
        "label": "Instaurer des aides régionales massives pour le rétrofit des véhicules",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 1,
          "deficitDelta": -0.3,
          "tensionDelta": 15,
          "strikeRiskDelta": 20,
          "demographicsDelta": {
            "cadres": 8,
            "rural": -10
          },
          "message": "Votre arbitrage (« Instaurer des aides régionales massives pour le rétrofit des véhicules ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_035",
    "title": "Pollution aux polluants éternels (PFAS) dans l'eau potable : scandale sanitaire",
    "category": "environnement",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : POLLUTION AUX POLLUANTS ÉTERNELS (PFAS) DANS L'EAU POTABLE : SCANDALE SANITAIRE",
    "description": "Des analyses révèlent des concentrations toxiques dans l'eau de plusieurs millions d'habitants.",
    "choices": [
      {
        "id": "evt_poly_035_c1",
        "label": "Interdire immédiatement tous les PFAS non essentiels par la loi",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "rural": 12,
            "cadres": -4
          },
          "message": "Votre décret (« Interdire immédiatement tous les PFAS non essentiels par la loi ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_035_c2",
        "label": "Obliger les industriels pollueurs à financer les usines de dépollution",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 6,
          "deficitDelta": -0.1,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "demographicsDelta": {
            "jeunesse": 14,
            "populaires": 8
          },
          "message": "Votre décision (« Obliger les industriels pollueurs à financer les usines de dépollution ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_035_c3",
        "label": "Mettre en place un suivi médical gratuit des populations exposées",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 1,
          "deficitDelta": -0.3,
          "tensionDelta": 15,
          "strikeRiskDelta": 20,
          "demographicsDelta": {
            "cadres": 8,
            "rural": -10
          },
          "message": "Votre arbitrage (« Mettre en place un suivi médical gratuit des populations exposées ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_036",
    "title": "Ultimatum commercial de l'Union Européenne sur le traité Mercosur",
    "category": "international",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : ULTIMATUM COMMERCIAL DE L'UNION EUROPÉENNE SUR LE TRAITÉ MERCOSUR",
    "description": "Bruxelles veut signer l'accord de libre-échange malgré l'opposition des agriculteurs français.",
    "choices": [
      {
        "id": "evt_poly_036_c1",
        "label": "Opposer un veto français irrévocable au Conseil européen",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 6,
          "deficitDelta": 0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "rural": 12,
            "populaires": 10
          },
          "message": "Votre décret (« Opposer un veto français irrévocable au Conseil européen ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_036_c2",
        "label": "Exiger des clauses miroirs sanitaires et environnementales strictes",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.2,
          "tensionDelta": 5,
          "strikeRiskDelta": 5,
          "demographicsDelta": {
            "cadres": 10,
            "jeunesse": 6
          },
          "message": "Votre décision (« Exiger des clauses miroirs sanitaires et environnementales strictes ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_036_c3",
        "label": "Créer un fonds de sauvegarde de 3 milliards d'euros pour les filières agricoles",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.3,
          "tensionDelta": 0,
          "strikeRiskDelta": 0,
          "demographicsDelta": {
            "cadres": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Créer un fonds de sauvegarde de 3 milliards d'euros pour les filières agricoles ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_037",
    "title": "Guerre en Europe de l'Est : vote d'une aide militaire d'urgence de 3 milliards",
    "category": "international",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : GUERRE EN EUROPE DE L'EST : VOTE D'UNE AIDE MILITAIRE D'URGENCE DE 3 MILLIARDS",
    "description": "Le gouvernement doit arbitrer sur la livraison de missiles et de chars lourds.",
    "choices": [
      {
        "id": "evt_poly_037_c1",
        "label": "Livrer les équipements sans restriction pour défendre le droit international",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 6,
          "deficitDelta": 0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "rural": 12,
            "populaires": 10
          },
          "message": "Votre décret (« Livrer les équipements sans restriction pour défendre le droit international ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_037_c2",
        "label": "Privilégier une aide financière et humanitaire sans dégarnir les armées françaises",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.2,
          "tensionDelta": 5,
          "strikeRiskDelta": 5,
          "demographicsDelta": {
            "cadres": 10,
            "jeunesse": 6
          },
          "message": "Votre décision (« Privilégier une aide financière et humanitaire sans dégarnir les armées françaises ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_037_c3",
        "label": "Appeler à l'ouverture immédiate de pourparlers de paix sous égide de l'ONU",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.3,
          "tensionDelta": 0,
          "strikeRiskDelta": 0,
          "demographicsDelta": {
            "cadres": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Appeler à l'ouverture immédiate de pourparlers de paix sous égide de l'ONU ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_038",
    "title": "Sommet Franco-Allemand tendu : désaccord sur le bouclier spatial européen",
    "category": "international",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : SOMMET FRANCO-ALLEMAND TENDU : DÉSACCORD SUR LE BOUCLIER SPATIAL EUROPÉEN",
    "description": "Berlin privilégie du matériel américain, Paris défend la souveraineté européenne.",
    "choices": [
      {
        "id": "evt_poly_038_c1",
        "label": "Affirmer l'autonomie stratégique française et lancer notre propre filière",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 6,
          "deficitDelta": 0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "rural": 12,
            "populaires": 10
          },
          "message": "Votre décret (« Affirmer l'autonomie stratégique française et lancer notre propre filière ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_038_c2",
        "label": "Proposer un compromis industriel 50/50 avec l'Allemagne",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.2,
          "tensionDelta": 5,
          "strikeRiskDelta": 5,
          "demographicsDelta": {
            "cadres": 10,
            "jeunesse": 6
          },
          "message": "Votre décision (« Proposer un compromis industriel 50/50 avec l'Allemagne ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_038_c3",
        "label": "Construire une nouvelle alliance de défense avec l'Italie et le Royaume-Uni",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.3,
          "tensionDelta": 0,
          "strikeRiskDelta": 0,
          "demographicsDelta": {
            "cadres": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Construire une nouvelle alliance de défense avec l'Italie et le Royaume-Uni ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_039",
    "title": "Crise diplomatique en Afrique : expulsion des troupes et diplomates français",
    "category": "international",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : CRISE DIPLOMATIQUE EN AFRIQUE : EXPULSION DES TROUPES ET DIPLOMATES FRANÇAIS",
    "description": "Une junte militaire exige le départ immédiat des forces armées françaises du Sahel.",
    "choices": [
      {
        "id": "evt_poly_039_c1",
        "label": "Organiser le retrait ordonné et redéployer le dispositif au golfe de Guinée",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 6,
          "deficitDelta": 0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "rural": 12,
            "populaires": 10
          },
          "message": "Votre décret (« Organiser le retrait ordonné et redéployer le dispositif au golfe de Guinée ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_039_c2",
        "label": "Suspendre l'ensemble des aides au développement et accords de coopération",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.2,
          "tensionDelta": 5,
          "strikeRiskDelta": 5,
          "demographicsDelta": {
            "cadres": 10,
            "jeunesse": 6
          },
          "message": "Votre décision (« Suspendre l'ensemble des aides au développement et accords de coopération ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_039_c3",
        "label": "Maintenir une présence diplomatique minimale pour protéger les ressortissants",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.3,
          "tensionDelta": 0,
          "strikeRiskDelta": 0,
          "demographicsDelta": {
            "cadres": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Maintenir une présence diplomatique minimale pour protéger les ressortissants ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_040",
    "title": "Sommet de l'OTAN : débat sur l'augmentation du budget de défense à 3% du PIB",
    "category": "international",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : SOMMET DE L'OTAN : DÉBAT SUR L'AUGMENTATION DU BUDGET DE DÉFENSE À 3% DU PIB",
    "description": "Les alliés font pression sur la France pour augmenter drastiquement ses dépenses militaires.",
    "choices": [
      {
        "id": "evt_poly_040_c1",
        "label": "Porter le budget de la défense à 3% du PIB d'ici 2030",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 6,
          "deficitDelta": 0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "rural": 12,
            "populaires": 10
          },
          "message": "Votre décret (« Porter le budget de la défense à 3% du PIB d'ici 2030 ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_040_c2",
        "label": "Maintenir le cap de la Loi de Programmation Militaire actuelle à 2.2%",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": 3,
          "deficitDelta": -0.2,
          "tensionDelta": 5,
          "strikeRiskDelta": 5,
          "demographicsDelta": {
            "cadres": 10,
            "jeunesse": 6
          },
          "message": "Votre décision (« Maintenir le cap de la Loi de Programmation Militaire actuelle à 2.2% ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_040_c3",
        "label": "Financer l'effort de défense par un grand emprunt européen commun",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.3,
          "tensionDelta": 0,
          "strikeRiskDelta": 0,
          "demographicsDelta": {
            "cadres": 6,
            "rural": 6
          },
          "message": "Votre arbitrage (« Financer l'effort de défense par un grand emprunt européen commun ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_041",
    "title": "Dépôt d'une Motion de Censure transpartisane à l'Assemblée Nationale",
    "category": "politique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : DÉPÔT D'UNE MOTION DE CENSURE TRANSPARTISANE À L'ASSEMBLÉE NATIONALE",
    "description": "Les groupes d'opposition s'unissent pour tenter de renverser le gouvernement après un vote serré.",
    "choices": [
      {
        "id": "evt_poly_041_c1",
        "label": "Négocier d'urgence des concessions avec les députés centristes et indépendants",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.0,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "cadres": 8,
            "retraites": 8
          },
          "message": "Votre décret (« Négocier d'urgence des concessions avec les députés centristes et indépendants ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_041_c2",
        "label": "Brandir la menace d'une dissolution immédiate de l'Assemblée nationale",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": -4,
          "deficitDelta": 0.0,
          "tensionDelta": 20,
          "strikeRiskDelta": 25,
          "demographicsDelta": {
            "populaires": -10,
            "jeunesse": -8
          },
          "message": "Votre décision (« Brandir la menace d'une dissolution immédiate de l'Assemblée nationale ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_041_c3",
        "label": "Proposer un remaniement d'ouverture avec entrée de l'opposition au gouvernement",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "cadres": 6,
            "fonctionnaires": 6
          },
          "message": "Votre arbitrage (« Proposer un remaniement d'ouverture avec entrée de l'opposition au gouvernement ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_042",
    "title": "Mise en cause judiciaire d'un ministre régalien de premier plan",
    "category": "politique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : MISE EN CAUSE JUDICIAIRE D'UN MINISTRE RÉGALIEN DE PREMIER PLAN",
    "description": "La presse révèle une enquête préliminaire pour prise illégale d'intérêts.",
    "choices": [
      {
        "id": "evt_poly_042_c1",
        "label": "Exiger la démission immédiate du ministre par souci d'exemplarité",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.0,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "cadres": 8,
            "retraites": 8
          },
          "message": "Votre décret (« Exiger la démission immédiate du ministre par souci d'exemplarité ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_042_c2",
        "label": "Maintenir le ministre en fonctions au nom de la présomption d'innocence",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": -4,
          "deficitDelta": 0.0,
          "tensionDelta": 20,
          "strikeRiskDelta": 25,
          "demographicsDelta": {
            "populaires": -10,
            "jeunesse": -8
          },
          "message": "Votre décision (« Maintenir le ministre en fonctions au nom de la présomption d'innocence ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_042_c3",
        "label": "Confier temporairement le portefeuille au Premier ministre",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "cadres": 6,
            "fonctionnaires": 6
          },
          "message": "Votre arbitrage (« Confier temporairement le portefeuille au Premier ministre ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_043",
    "title": "Pétition citoyenne record pour un Référendum d'Initiative Partagée (RIP)",
    "category": "politique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : PÉTITION CITOYENNE RECORD POUR UN RÉFÉRENDUM D'INITIATIVE PARTAGÉE (RIP)",
    "description": "4,5 millions de citoyens demandent un vote sur l'âge légal de la retraite.",
    "choices": [
      {
        "id": "evt_poly_043_c1",
        "label": "Organiser loyalement le référendum national et respecter le verdict",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.0,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "cadres": 8,
            "retraites": 8
          },
          "message": "Votre décret (« Organiser loyalement le référendum national et respecter le verdict ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_043_c2",
        "label": "Renvoyer le texte au Parlement pour un débat approfondi",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": -4,
          "deficitDelta": 0.0,
          "tensionDelta": 20,
          "strikeRiskDelta": 25,
          "demographicsDelta": {
            "populaires": -10,
            "jeunesse": -8
          },
          "message": "Votre décision (« Renvoyer le texte au Parlement pour un débat approfondi ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_043_c3",
        "label": "Déclarer la proposition contraire aux équilibres budgétaires de l'État",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "cadres": 6,
            "fonctionnaires": 6
          },
          "message": "Votre arbitrage (« Déclarer la proposition contraire aux équilibres budgétaires de l'État ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_044",
    "title": "Crise de gouvernance : désaccord public majeur entre l'Élysée et Matignon",
    "category": "politique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : CRISE DE GOUVERNANCE : DÉSACCORD PUBLIC MAJEUR ENTRE L'ÉLYSÉE ET MATIGNON",
    "description": "Le Premier ministre contredit la ligne présidentielle dans une interview au 20h.",
    "choices": [
      {
        "id": "evt_poly_044_c1",
        "label": "Mettre fin aux fonctions du Premier ministre et remanier le gouvernement",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.0,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "cadres": 8,
            "retraites": 8
          },
          "message": "Votre décret (« Mettre fin aux fonctions du Premier ministre et remanier le gouvernement ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_044_c2",
        "label": "Recadrer fermement le Premier ministre en tête-à-tête et afficher l'unité",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": -4,
          "deficitDelta": 0.0,
          "tensionDelta": 20,
          "strikeRiskDelta": 25,
          "demographicsDelta": {
            "populaires": -10,
            "jeunesse": -8
          },
          "message": "Votre décision (« Recadrer fermement le Premier ministre en tête-à-tête et afficher l'unité ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_044_c3",
        "label": "Assumer un débat démocratique au sommet de l'État",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "cadres": 6,
            "fonctionnaires": 6
          },
          "message": "Votre arbitrage (« Assumer un débat démocratique au sommet de l'État ») a été publié au Conseil des ministres."
        }
      }
    ]
  },
  {
    "id": "evt_poly_045",
    "title": "Fuite de notes stratégiques de défense sur les réseaux sociaux",
    "category": "politique",
    "source": "Palais de l'Élysée & Ministères",
    "icon": "FileText",
    "breakingNewsChyron": "ÉLYSÉE EN DIRECT : FUITE DE NOTES STRATÉGIQUES DE DÉFENSE SUR LES RÉSEAUX SOCIAUX",
    "description": "Des documents confidentiels sur les faiblesses énergétiques de la France sont divulgués.",
    "choices": [
      {
        "id": "evt_poly_045_c1",
        "label": "Saisir la justice militaire et lancer un audit de sécurité à l'Élysée",
        "description": "Option A : Premier arbitrage républicain.",
        "effects": {
          "popularityDelta": 5,
          "deficitDelta": 0.0,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "demographicsDelta": {
            "cadres": 8,
            "retraites": 8
          },
          "message": "Votre décret (« Saisir la justice militaire et lancer un audit de sécurité à l'Élysée ») est promulgué au Journal Officiel."
        }
      },
      {
        "id": "evt_poly_045_c2",
        "label": "Publier une version transparente du rapport pour couper court aux rumeurs",
        "description": "Option B : Deuxième voie d'action stratégique.",
        "effects": {
          "popularityDelta": -4,
          "deficitDelta": 0.0,
          "tensionDelta": 20,
          "strikeRiskDelta": 25,
          "demographicsDelta": {
            "populaires": -10,
            "jeunesse": -8
          },
          "message": "Votre décision (« Publier une version transparente du rapport pour couper court aux rumeurs ») entre en application immédiate."
        }
      },
      {
        "id": "evt_poly_045_c3",
        "label": "Dénoncer une manœuvre de déstabilisation d'une puissance étrangère",
        "description": "Option C : Troisième arbitrage du Conseil des ministres.",
        "effects": {
          "popularityDelta": 4,
          "deficitDelta": 0.1,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "demographicsDelta": {
            "cadres": 6,
            "fonctionnaires": 6
          },
          "message": "Votre arbitrage (« Dénoncer une manœuvre de déstabilisation d'une puissance étrangère ») a été publié au Conseil des ministres."
        }
      }
    ]
  }
];
