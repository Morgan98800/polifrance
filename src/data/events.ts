import { GameEvent } from '../types/game';

export const GAME_EVENTS: GameEvent[] = [
  {
    "id": "evt_retraites_reforme",
    "title": "Crise des Retraites : L'Intersyndicale menace de bloquer le pays",
    "category": "social",
    "source": "Conseil d'Orientation des Retraites • 08:30",
    "icon": "Users",
    "breakingNewsChyron": "RETRAITES : L'INTERSYNDICALE ANNONCE UNE GRÈVE GÉNÉRALE ILLIMITÉE",
    "description": "Le rapport financier des retraites pointe un déficit de 14 milliards d'euros d'ici 2030. Vous devez trancher sur l'équilibre du régime.",
    "choices": [
      {
        "id": "retraites_retrait",
        "label": "Retirer la réforme et combler le trou par une surtaxe sur le capital",
        "description": "Écouter la colère populaire pour ramener le calme immédiat, au prix d'une taxe sur les entreprises.",
        "costInfluence": 5,
        "effects": {
          "popularityDelta": 6,
          "tensionDelta": -25,
          "strikeRiskDelta": -25,
          "costTreasury": 10,
          "deficitDelta": 0.3,
          "demographicsDelta": {
            "populaires": 15,
            "jeunesse": 12,
            "cadres": -8
          },
          "message": "L'intersyndicale lève les préavis de grève sous les acclamations. Le Medef et la bourse fustigent un coup de massue fiscal."
        }
      },
      {
        "id": "retraites_maintien_ferme",
        "label": "Maintenir l'âge pivot et engager l'orthodoxie budgétaire",
        "description": "Assurer la pérennité financière de la France et rassurer les agences de notation, quitte à affronter la rue.",
        "effects": {
          "popularityDelta": -7,
          "tensionDelta": 25,
          "strikeRiskDelta": 25,
          "revenueTreasury": 12,
          "deficitDelta": -0.4,
          "demographicsDelta": {
            "retraites": 10,
            "cadres": 8,
            "populaires": -14
          },
          "message": "Les marchés saluent votre courage gestionnaire. La rue s'embrase avec des manifestations monstres dans tout le pays."
        }
      },
      {
        "id": "retraites_clause_penibilite",
        "label": "Négocier un compromis avec la CFDT sur les carrières longues",
        "description": "Faire des concessions ciblées pour fracturer le front syndical et faire adopter le texte à l'Assemblée.",
        "costInfluence": 10,
        "effects": {
          "popularityDelta": 2,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "costTreasury": 4,
          "deficitDelta": 0.1,
          "demographicsDelta": {
            "cadres": 5,
            "populaires": 2
          },
          "message": "Le compromis est scellé. Les syndicats réformistes se désolidarisent des radicaux, la grève s'essouffle."
        }
      }
    ]
  },
  {
    "id": "evt_hopital_urgences",
    "title": "Crise Hospitalière : Saturation historique des services d'urgences",
    "category": "social",
    "source": "Fédération Hospitalière de France • 11:15",
    "icon": "HeartPulse",
    "breakingNewsChyron": "SANTÉ EN CRISE : LES SOIGNANTS EN GRÈVE ET DÉMISSIONS EN MASSE DANS LES HÔPITAUX",
    "description": "Faute de soignants et de lits, des dizaines de services d'urgences ferment la nuit. Les syndicats de médecins exigent un plan d'urgence massif.",
    "choices": [
      {
        "id": "hopital_plan_massif",
        "label": "Débloquer un plan Ségur 2 de 8 milliards d'euros et revaloriser les soignants",
        "description": "Injecter massivement des fonds publics pour sauver le système de santé et apaiser les soignants.",
        "effects": {
          "popularityDelta": 7,
          "tensionDelta": -20,
          "strikeRiskDelta": -20,
          "costTreasury": 8,
          "deficitDelta": 0.3,
          "demographicsDelta": {
            "fonctionnaires": 15,
            "populaires": 8,
            "retraites": 6
          },
          "message": "Les soignants saluent un geste historique. Les urgences respirent, mais Bercy s'inquiète du dérapage des comptes sociaux."
        }
      },
      {
        "id": "hopital_restructuration",
        "label": "Refuser le chéquier et imposer la mutualisation avec les cliniques privées",
        "description": "Réorganiser l'offre de soins sans creuser la dette publique, quitte à braquer les syndicats hospitaliers.",
        "effects": {
          "popularityDelta": -5,
          "tensionDelta": 15,
          "strikeRiskDelta": 15,
          "revenueTreasury": 3,
          "deficitDelta": -0.1,
          "demographicsDelta": {
            "cadres": 4,
            "fonctionnaires": -12
          },
          "message": "L'orthodoxie budgétaire est préservée, mais les collectifs d'urgentistes appellent à la démission collective."
        }
      }
    ]
  },
  {
    "id": "evt_crise_agricole",
    "title": "Colère Paysanne : Les tracteurs convergent vers Paris contre le Mercosur",
    "category": "economique",
    "source": "FNSEA / Coordination Rurale • 07:00",
    "icon": "Tractor",
    "breakingNewsChyron": "COLÈRE PAYSANNE : LES AUTOROUTES VERS PARIS TOTALEMENT BLOQUÉES PAR LES AGRICULTEURS",
    "description": "Les exploitants agricoles dénoncent les normes environnementales européennes et la concurrence déloyale des importations étrangères.",
    "choices": [
      {
        "id": "agri_veto_mercosur",
        "label": "Poser un veto ferme au traité Mercosur et geler les normes écologiques",
        "description": "Soutenir sans réserve le monde paysan contre Bruxelles, au risque d'un isolement diplomatique européen.",
        "effects": {
          "popularityDelta": 8,
          "tensionDelta": -25,
          "strikeRiskDelta": -25,
          "costTreasury": 3,
          "deficitDelta": 0.1,
          "demographicsDelta": {
            "rural": 20,
            "populaires": 10,
            "cadres": -6
          },
          "message": "Les paysans lèvent les barrages dans la joie. La Commission européenne s'indigne de votre unilatéralisme."
        }
      },
      {
        "id": "agri_fermete_crs",
        "label": "Refuser de céder sur les normes et dégager les autoroutes par les CRS",
        "description": "Faire respecter la liberté de circulation et tenir les engagements climatiques de la France.",
        "effects": {
          "popularityDelta": -6,
          "tensionDelta": 20,
          "strikeRiskDelta": 20,
          "demographicsDelta": {
            "cadres": 8,
            "rural": -22
          },
          "message": "L'ordre public est rétabli sur les axes routiers, mais les campagnes entrent en sécession contre le pouvoir parisien."
        }
      },
      {
        "id": "agri_fonds_calamite",
        "label": "Accorder une avance de trésorerie de 2 milliards d'euros et un fonds de calamité",
        "description": "Acheter la paix agricole par des subventions ciblées sans rompre avec les traités européens.",
        "costInfluence": 5,
        "effects": {
          "popularityDelta": 3,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "costTreasury": 2,
          "deficitDelta": 0.1,
          "demographicsDelta": {
            "rural": 6
          },
          "message": "Les syndicats agricoles acceptent la trêve, mais préviennent que la colère reste intacte."
        }
      }
    ]
  },
  {
    "id": "evt_dette_sommation",
    "title": "Dette Souveraine : L'écart OAT/Bund s'envole face aux doutes des marchés",
    "category": "economique",
    "source": "Agence France Trésor • 16:45",
    "icon": "TrendingDown",
    "breakingNewsChyron": "ALERTE MARCHÉS : LE TAUX D'EMPRUNT DE LA FRANCE FRÔLE LES 4.0%, PANIQUE À BERCY",
    "description": "Les investisseurs étrangers s'inquiètent du niveau d'endettement de la France (115% du PIB). La charge de la dette devient le premier budget de l'État.",
    "choices": [
      {
        "id": "dette_rabot_massif",
        "label": "Décréter un coup de rabot immédiat de 12 milliards sur les administrations",
        "description": "Prouver aux marchés la rigueur inflexible de votre gouvernement pour faire baisser les taux d'intérêt.",
        "effects": {
          "popularityDelta": -8,
          "tensionDelta": 18,
          "strikeRiskDelta": 18,
          "revenueTreasury": 12,
          "deficitDelta": -0.5,
          "demographicsDelta": {
            "cadres": 8,
            "fonctionnaires": -15,
            "populaires": -8
          },
          "message": "Les taux d'intérêt se détendent immédiatement. Les syndicats de fonctionnaires appellent à la riposte nationale."
        }
      },
      {
        "id": "dette_refus_austerite",
        "label": "Refuser l'austérité et dénoncer la spéculation financière internationale",
        "description": "Protéger les services publics et le modèle social français contre la dictature des marchés.",
        "effects": {
          "popularityDelta": 6,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "costTreasury": 5,
          "deficitDelta": 0.3,
          "demographicsDelta": {
            "populaires": 12,
            "cadres": -12
          },
          "message": "Votre discours souverainiste enflamme l'opinion nationale, mais le spread français atteint un record historique."
        }
      }
    ]
  },
  {
    "id": "evt_emeutes_banlieues",
    "title": "Violences Urbaines : Nuit d'émeutes après la mort d'un jeune en scooter",
    "category": "securite",
    "source": "Ministère de l'Intérieur • 03:00",
    "icon": "ShieldAlert",
    "breakingNewsChyron": "ÉTAT D'URGENCE : COMMISSARIATS ET MAIRIES ATTAQUÉS DANS PLUSIEURS MÉTROPOLES",
    "description": "Des centaines de véhicules brûlés et des bâtiments publics incendiés suite à un refus d'obtempérer tragique.",
    "choices": [
      {
        "id": "emeutes_etat_urgence",
        "label": "Décréter l'état d'urgence et déployer le RAID et la BRI sans compromis",
        "description": "Rétablir l'ordre républicain avec la plus grande fermeté policière et judiciaire.",
        "costInfluence": 5,
        "effects": {
          "popularityDelta": 5,
          "tensionDelta": 20,
          "strikeRiskDelta": 20,
          "costTreasury": 1,
          "demographicsDelta": {
            "retraites": 12,
            "rural": 10,
            "jeunesse": -18
          },
          "message": "L'autorité de l'État s'impose dans les rues. L'électorat d'ordre applaudit, la jeunesse et la gauche dénoncent une dérive autoritaire."
        }
      },
      {
        "id": "emeutes_plan_banlieues",
        "label": "Recevoir la famille à l'Élysée et annoncer un plan banlieues de 3 milliards",
        "description": "Jouer l'apaisement républicain et investir dans les quartiers populaires délaissés.",
        "effects": {
          "popularityDelta": -4,
          "tensionDelta": -20,
          "strikeRiskDelta": -20,
          "costTreasury": 3,
          "deficitDelta": 0.1,
          "demographicsDelta": {
            "jeunesse": 14,
            "populaires": 6,
            "retraites": -10
          },
          "message": "Le geste d'apaisement éteint les émeutes nocturnes. L'opposition de droite dénonce une capitulation face aux voyous."
        }
      }
    ]
  },
  {
    "id": "evt_energie_prix",
    "title": "Choc Énergétique : Flambée hivernale des tarifs de l'électricité (+18%)",
    "category": "economique",
    "source": "Commission de Régulation de l'Énergie • 10:00",
    "icon": "Zap",
    "breakingNewsChyron": "FACTURES D'ÉLECTRICITÉ : RISQUE DE RUPTURE POUR LES ARTISANS ET LES MÉNAGES",
    "description": "Les artisans boulangers et les foyers modestes sont étranglés par les factures d'énergie à l'approche de l'hiver.",
    "choices": [
      {
        "id": "energie_bouclier_total",
        "label": "Rétablir un bouclier tarifaire intégral de 12 milliards d'euros",
        "description": "Geler les factures des Français pour préserver le pouvoir d'achat et la paix sociale.",
        "effects": {
          "popularityDelta": 9,
          "tensionDelta": -25,
          "strikeRiskDelta": -25,
          "costTreasury": 12,
          "deficitDelta": 0.4,
          "demographicsDelta": {
            "populaires": 15,
            "rural": 12,
            "cadres": 4
          },
          "message": "Immense soulagement populaire chez les artisans et les familles. La facture de 12 milliards pèse lourdement sur la dette."
        }
      },
      {
        "id": "energie_sortie_marche_ue",
        "label": "Sortir la France du marché européen de l'électricité par décret",
        "description": "Indexer le prix de l'électricité sur les coûts réels de production du nucléaire français.",
        "costInfluence": 15,
        "effects": {
          "popularityDelta": 5,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "costTreasury": 1,
          "demographicsDelta": {
            "populaires": 8,
            "rural": 10,
            "cadres": -6
          },
          "message": "Le prix de l'énergie chute durablement. Berlin et Bruxelles engagent des poursuites judiciaires contre la France."
        }
      },
      {
        "id": "energie_cheque_modeste",
        "label": "Refuser le bouclier et distribuer un chèque ciblé de 2 milliards aux très modestes",
        "description": "Sauvegarder les finances publiques en n'aidant que les ménages les plus vulnérables.",
        "effects": {
          "popularityDelta": -6,
          "tensionDelta": 15,
          "strikeRiskDelta": 15,
          "costTreasury": 2,
          "deficitDelta": 0.1,
          "demographicsDelta": {
            "populaires": -10,
            "rural": -8
          },
          "message": "La rigueur budgétaire est préservée, mais les commerçants et la classe moyenne grondent contre l'abandon de l'État."
        }
      }
    ]
  },
  {
    "id": "evt_superprofits_cac40",
    "title": "Dividendes Records du CAC40 : Pression sur la taxation des superprofits",
    "category": "economique",
    "source": "Le Monde Économie • 14:15",
    "icon": "TrendingUp",
    "breakingNewsChyron": "CAC40 : 70 MILLIARDS DE DIVIDENDES, LES SYNDICATS EXIGENT UNE TAXE DE CRÈVE-CŒUR",
    "description": "Les géants de l'énergie et du luxe enregistrent des bénéfices historiques en pleine période d'inflation subie par les ménages.",
    "choices": [
      {
        "id": "superprofits_taxe_dure",
        "label": "Créer une taxe exceptionnelle de 10 milliards d'euros sur les superprofits",
        "description": "Faire contribuer les multinationales pour financer les services publics et calmer la colère sociale.",
        "effects": {
          "popularityDelta": 8,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "revenueTreasury": 10,
          "deficitDelta": -0.3,
          "demographicsDelta": {
            "populaires": 15,
            "jeunesse": 10,
            "cadres": -10
          },
          "message": "Plébiscite populaire pour la justice fiscale. Le patronat menace de délocaliser des sièges sociaux et la Bourse baisse."
        }
      },
      {
        "id": "superprofits_incitation",
        "label": "Refuser la taxe pour préserver l'attractivité et inciter au partage de la valeur",
        "description": "Encourager la prime Macron et l'actionnariat salarié plutôt que d'alourdir la fiscalité productive.",
        "effects": {
          "popularityDelta": -5,
          "tensionDelta": 15,
          "strikeRiskDelta": 15,
          "costTreasury": 0,
          "demographicsDelta": {
            "cadres": 10,
            "populaires": -12,
            "jeunesse": -8
          },
          "message": "Les investisseurs internationaux saluent votre constance libérale. L'opposition dénonce le président des ultra-riches."
        }
      }
    ]
  },
  {
    "id": "evt_logement_crise",
    "title": "Crise du Logement : Pénurie record et explosion des loyers pour la jeunesse",
    "category": "social",
    "source": "Fondation Abbé Pierre • 11:30",
    "icon": "Home",
    "breakingNewsChyron": "LOGEMENT : DES ÉTUDIANTS ET TRAVAILLEURS DANS LA RUE, MARCHÉ DE L'IMMOBILIER BLOQUÉ",
    "description": "Les taux d'intérêt élevés bloquent l'accession à la propriété et les offres de location s'effondrent dans toutes les métropoles.",
    "choices": [
      {
        "id": "logement_encadrement_requisition",
        "label": "Encadrer strictement les loyers et lancer un plan de 5 milliards pour le logement social",
        "description": "Protéger les locataires et relancer la construction publique au détriment des rentiers.",
        "effects": {
          "popularityDelta": 6,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "costTreasury": 5,
          "deficitDelta": 0.2,
          "demographicsDelta": {
            "jeunesse": 18,
            "populaires": 10,
            "cadres": -8,
            "retraites": -6
          },
          "message": "Les étudiants et les mal-logés soufflent. Les propriétaires bailleurs menacent de retirer leurs biens de la location."
        }
      },
      {
        "id": "logement_choc_offre_defisc",
        "label": "Créer un grand choc d'offre : déréguler les permis de construire et exonérer les plus-values",
        "description": "Libérer l'initiative privée et le BTP sans dépense budgétaire de l'État.",
        "effects": {
          "popularityDelta": -3,
          "tensionDelta": 10,
          "strikeRiskDelta": 10,
          "costTreasury": 1,
          "demographicsDelta": {
            "cadres": 12,
            "populaires": -6,
            "jeunesse": -8
          },
          "message": "Le secteur du bâtiment reprend des couleurs. Les associations dénoncent un cadeau fiscal aux promoteurs immobiliers."
        }
      }
    ]
  },
  {
    "id": "evt_nucleaire_epr",
    "title": "Souveraineté Énergétique : Le grand chantier de relance du Nucléaire",
    "category": "environnement",
    "source": "EDF / Autorité de Sûreté Nucléaire • 15:00",
    "icon": "Zap",
    "breakingNewsChyron": "NUCLÉAIRE : LANCEMENT DU PROGRAMME DE 6 RÉACTEURS EPR2 POUR 50 MILLIARDS D'EUROS",
    "description": "Pour décarboner l'économie et garantir l'indépendance énergétique, la France doit arbitrer le financement des nouveaux réacteurs.",
    "choices": [
      {
        "id": "nucleaire_grand_emprunt",
        "label": "Financer la construction intégrale par un grand emprunt national de 15 milliards",
        "description": "Engager l'État dans une stratégie industrielle gaullienne de long terme.",
        "effects": {
          "popularityDelta": 5,
          "tensionDelta": 10,
          "strikeRiskDelta": 10,
          "costTreasury": 15,
          "deficitDelta": 0.5,
          "demographicsDelta": {
            "cadres": 10,
            "retraites": 8,
            "jeunesse": -8
          },
          "message": "Fierté industrielle et souveraineté réaffirmée. Les écologistes organisent des blocages de chantiers, la dette s'alourdit."
        }
      },
      {
        "id": "nucleaire_partenariat_prive",
        "label": "Ouvrir le capital d'EDF aux fonds souverains et investisseurs privés",
        "description": "Moderniser le parc nucléaire sans faire porter le risque financier sur le contribuable français.",
        "effects": {
          "popularityDelta": -6,
          "tensionDelta": 18,
          "strikeRiskDelta": 18,
          "revenueTreasury": 8,
          "deficitDelta": -0.2,
          "demographicsDelta": {
            "cadres": 6,
            "populaires": -14,
            "fonctionnaires": -12
          },
          "message": "Les caisses de l'État sont soulagées, mais les syndicats de l'énergie dénoncent une trahison et coupent le courant aux ministères."
        }
      }
    ]
  },
  {
    "id": "evt_chomage_reforme",
    "title": "Assurance-Chômage : Durcissement des conditions d'indemnisation",
    "category": "social",
    "source": "Unédic / Ministère du Travail • 09:30",
    "icon": "Briefcase",
    "breakingNewsChyron": "EMPLOI : PROJET DE DÉCRET POUR RÉDUIRE LA DURÉE DES ALLOCATIONS CHÔMAGE À 12 MOIS",
    "description": "Le gouvernement souhaite inciter au retour à l'emploi et économiser 4 milliards d'euros par an sur les comptes de l'Unédic.",
    "choices": [
      {
        "id": "chomage_rigueur_decret",
        "label": "Signer le décret de durcissement et conditionner le RSA à 15h d'activité",
        "description": "Valoriser la valeur travail et réaliser des économies budgétaires immédiates.",
        "effects": {
          "popularityDelta": -6,
          "tensionDelta": 20,
          "strikeRiskDelta": 20,
          "revenueTreasury": 6,
          "deficitDelta": -0.2,
          "demographicsDelta": {
            "retraites": 12,
            "cadres": 8,
            "populaires": -16,
            "jeunesse": -12
          },
          "message": "Les comptes de l'Unédic reviennent à l'équilibre. Les syndicats et les demandeurs d'emploi manifestent devant Pôle Emploi."
        }
      },
      {
        "id": "chomage_maintien_droits",
        "label": "Maintenir les droits et créer un grand plan de formation aux métiers en pénurie",
        "description": "Privilégier l'accompagnement humain et la qualification plutôt que la sanction financière.",
        "effects": {
          "popularityDelta": 4,
          "tensionDelta": -12,
          "strikeRiskDelta": -12,
          "costTreasury": 4,
          "deficitDelta": 0.1,
          "demographicsDelta": {
            "populaires": 10,
            "jeunesse": 10,
            "cadres": -4
          },
          "message": "Le climat social s'apaise chez les travailleurs. Le patronat regrette un manque d'incitation forte à la reprise d'emploi."
        }
      }
    ]
  },
  {
    "id": "evt_securite_narcotrafic",
    "title": "Lutte contre le Narcotrafic : Guerre des gangs et règlements de comptes",
    "category": "securite",
    "source": "Procureur de la République de Marseille • 22:00",
    "icon": "ShieldAlert",
    "breakingNewsChyron": "NARCOTRAFIC : FUSILLADES À LA KALACHNIKOV À MARSEILLE, L'ÉTAT AU DÉFI DES MAFIAS",
    "description": "Les réseaux criminels défient l'autorité de l'État dans plusieurs cités avec des armes de guerre et corrompent les institutions locales.",
    "choices": [
      {
        "id": "narco_militarisation_justice",
        "label": "Créer un parquet anti-drogue d'exception et déployer l'armée en appui logistique",
        "description": "Frapper fort avec des moyens militaires et judiciaires hors normes pour éradiquer les réseaux.",
        "costInfluence": 10,
        "effects": {
          "popularityDelta": 8,
          "tensionDelta": 10,
          "strikeRiskDelta": 10,
          "costTreasury": 2,
          "demographicsDelta": {
            "retraites": 15,
            "rural": 12,
            "populaires": 10,
            "cadres": -4
          },
          "message": "Succès retentissant : des dizaines de barons tombent et des tonnes de drogues sont saisies. Les magistrats s'inquiètent de la justice d'exception."
        }
      },
      {
        "id": "narco_legalisation_encadree",
        "label": "Légaliser et encadrer le cannabis sous monopole d'État pour assécher les trafics",
        "description": "Casser le modèle économique des dealers et générer 3 milliards de recettes fiscales annuelles.",
        "effects": {
          "popularityDelta": -3,
          "tensionDelta": -10,
          "strikeRiskDelta": -10,
          "revenueTreasury": 5,
          "deficitDelta": -0.2,
          "demographicsDelta": {
            "jeunesse": 20,
            "cadres": 6,
            "retraites": -18,
            "rural": -12
          },
          "message": "Les recettes fiscales affluent à Bercy et les violences de rue baissent. La droite conservatrice hurle à la déchéance morale de la France."
        }
      }
    ]
  },
  {
    "id": "evt_defense_otan_ukraine",
    "title": "Géopolitique & Défense : Pression alliée pour porter le budget militaire à 3% du PIB",
    "category": "international",
    "source": "État-Major des Armées / OTAN • 16:00",
    "icon": "Globe",
    "breakingNewsChyron": "RÉARMEMENT : L'ÉTAT-MAJOR RÉCLAME 10 MILLIARDS SUPPLÉMENTAIRES POUR LES ARMÉES",
    "description": "Face aux menaces internationales et aux engagements auprès des alliés, la France doit accélérer la cadence de son économie de guerre.",
    "choices": [
      {
        "id": "defense_rearmement_massif",
        "label": "Allouer 8 milliards d'euros supplémentaires à l'armée et aux commandes de Rafale",
        "description": "Garantir le rang de grande puissance militaire et la dissuasion nucléaire française.",
        "effects": {
          "popularityDelta": 4,
          "tensionDelta": 10,
          "strikeRiskDelta": 10,
          "costTreasury": 8,
          "deficitDelta": 0.3,
          "demographicsDelta": {
            "cadres": 10,
            "retraites": 10,
            "populaires": -6,
            "jeunesse": -8
          },
          "message": "L'industrie d'armement tourne à plein régime et les généraux saluent votre vision. La gauche dénonce de l'argent pris aux écoles et hôpitaux."
        }
      },
      {
        "id": "defense_diplomatie_frein",
        "label": "Refuser la hausse et privilégier une initiative diplomatique de cessez-le-feu",
        "description": "Préserver les deniers publics et faire entendre la voix singulière et pacifique de la France.",
        "effects": {
          "popularityDelta": 2,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "costTreasury": 0,
          "demographicsDelta": {
            "populaires": 6,
            "jeunesse": 8,
            "cadres": -8
          },
          "message": "Votre posture gaullienne d'équilibre est saluée par le tiers-monde, mais nos partenaires de l'OTAN doutent de la fiabilité française."
        }
      }
    ]
  },
  {
    "id": "evt_deserts_medicaux",
    "title": "Déserts Médicaux : Révolte des maires ruraux privés de médecins généralistes",
    "category": "social",
    "source": "Association des Maires de France • 10:30",
    "icon": "HeartPulse",
    "breakingNewsChyron": "SANTÉ RURALE : 6 MILLIONS DE FRANÇAIS SANS MÉDECIN TRAITANT, LES MAIRES EN COLÈRE",
    "description": "Des territoires entiers deviennent des déserts médicaux pendant que les jeunes diplômés s'installent en bord de mer et dans les grandes métropoles.",
    "choices": [
      {
        "id": "deserts_obligation_installation",
        "label": "Imposer 3 ans d'exercice obligatoire en zone rurale aux jeunes médecins",
        "description": "Faire primer l'égal accès aux soins sur le confort d'installation libéral.",
        "effects": {
          "popularityDelta": 7,
          "tensionDelta": 15,
          "strikeRiskDelta": 15,
          "costTreasury": 0,
          "demographicsDelta": {
            "rural": 22,
            "populaires": 10,
            "cadres": -14
          },
          "message": "Les campagnes et les élus locaux célèbrent une victoire historique. L'Ordre des médecins et les étudiants en médecine déclenchent une grève totale."
        }
      },
      {
        "id": "deserts_prime_volontariat",
        "label": "Créer un forfait d'installation de 100 000€ et défiscaliser les cabinets ruraux",
        "description": "Inciter financièrement par le portefeuille sans violer la liberté d'installation des soignants.",
        "effects": {
          "popularityDelta": 3,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "costTreasury": 3,
          "deficitDelta": 0.1,
          "demographicsDelta": {
            "rural": 10,
            "cadres": 6
          },
          "message": "L'Ordre des médecins approuve la méthode incitative. L'efficacité sur le terrain reste lente et la facture est payée par l'État."
        }
      }
    ]
  },
  {
    "id": "evt_ia_reindustrialisation",
    "title": "Tech & Souveraineté : Course mondiale aux méga-usines de semi-conducteurs et d'IA",
    "category": "economique",
    "source": "Bercy / Tech France • 14:40",
    "icon": "Sparkles",
    "breakingNewsChyron": "CHIPS ACT FRANÇAIS : UN PROJET DE GIGAFACTORY DE 15 MILLIARDS EN JEU FACE AUX USA",
    "description": "Un consortium mondial hésite à installer son usine géante de puces d'intelligence artificielle en France ou en Allemagne.",
    "choices": [
      {
        "id": "ia_subvention_choc",
        "label": "Accorder 6 milliards de subventions publiques et un tarif d'électricité garanti",
        "description": "Gagner la bataille technologique du XXIe siècle et créer 10 000 emplois industriels.",
        "effects": {
          "popularityDelta": 5,
          "tensionDelta": -5,
          "strikeRiskDelta": -5,
          "costTreasury": 6,
          "deficitDelta": 0.2,
          "demographicsDelta": {
            "cadres": 15,
            "populaires": 8,
            "jeunesse": 10
          },
          "message": "Victoire industrielle majeure ! La France décroche la Gigafactory. L'Allemagne est furieuse et la note budgétaire est lourde."
        }
      },
      {
        "id": "ia_refus_aides_publiques",
        "label": "Refuser le chantage aux subventions et s'en remettre au marché libre",
        "description": "Protéger l'argent du contribuable contre la surenchère des multinationales de la tech.",
        "effects": {
          "popularityDelta": -5,
          "tensionDelta": 8,
          "strikeRiskDelta": 8,
          "costTreasury": 0,
          "demographicsDelta": {
            "cadres": -12,
            "populaires": -4
          },
          "message": "L'usine part s'installer en Saxe. L'opposition fustige un décrochage technologique impardonnable de la France."
        }
      }
    ]
  },
  {
    "id": "evt_autoroutes_concessions",
    "title": "Fin des Concessions d'Autoroutes : Les géants du BTP réclament une prolongation",
    "category": "economique",
    "source": "Autorité de Régulation des Transports • 17:00",
    "icon": "LineChart",
    "breakingNewsChyron": "AUTOROUTES : BATAILLE JURIDIQUE ET FINANCIÈRE AUTOUR DES TARIFS DE PÉAGE",
    "description": "Les contrats historiques des sociétés concessionnaires arrivent à échéance. Les usagers réclament la gratuité ou la baisse des péages.",
    "choices": [
      {
        "id": "autoroutes_renationalisation",
        "label": "Reprendre les autoroutes dans le giron public et baisser les péages de 30%",
        "description": "Redonner du pouvoir d'achat aux automobilistes et réaffirmer la propriété publique des infrastructures stratégiques.",
        "effects": {
          "popularityDelta": 8,
          "tensionDelta": -15,
          "strikeRiskDelta": -15,
          "costTreasury": 8,
          "deficitDelta": 0.2,
          "demographicsDelta": {
            "rural": 15,
            "populaires": 14,
            "cadres": -6
          },
          "message": "Triomphe chez les automobilistes et les transporteurs. Les banques et les majors du BTP attaquent l'État devant le Conseil constitutionnel."
        }
      },
      {
        "id": "autoroutes_renouvellement_cash",
        "label": "Renouveler les concessions contre un versement immédiat de 10 milliards d'euros",
        "description": "Encaisser un chèque colossal pour renflouer les caisses de l'État et assainir la dette.",
        "effects": {
          "popularityDelta": -7,
          "tensionDelta": 15,
          "strikeRiskDelta": 15,
          "revenueTreasury": 10,
          "deficitDelta": -0.3,
          "demographicsDelta": {
            "populaires": -14,
            "rural": -12,
            "cadres": 4
          },
          "message": "Bercy respire grâce aux 10 milliards de recettes exceptionnelles. Les Français dénoncent une rente éternelle offerte aux actionnaires."
        }
      }
    ]
  }
,
{
  "id": "evt_elections_europeennes_mi_mandat",
  "title": "🗳️ Élections de Mi-Mandat (Mois 24) : Le Verdict des Urnes",
  "category": "parlementaire",
  "source": "Ministère de l'Intérieur • Soirée Électorale",
  "icon": "Users",
  "breakingNewsChyron": "ÉLECTIONS DE MI-MANDAT : SÉISME ÉLECTORAL ET PARTICIPATION RECORD",
  "description": "À mi-mandat (24 mois), les Français se rendent aux urnes. C'est un vote sanction ou plébiscite direct sur votre politique.",
  "choices": [
    {
      "id": "mi_mandat_cap_ferme",
      "label": "Revendiquer le cap réformateur : « Ni pause, ni recul »",
      "description": "Assumer vos choix impopulaires avec courage régalien, au risque de galvaniser les oppositions.",
      "effects": {
        "popularityDelta": 4,
        "authorityDelta": 15,
        "tensionDelta": 10,
        "message": "Votre base salue un chef d'État qui ne tremble pas. Les oppositions appellent à la censure."
      }
    },
    {
      "id": "mi_mandat_tournant_social",
      "label": "Annoncer le « Grand Tournant Social » du quinquennat",
      "description": "Lâcher du lest et annoncer un plan de soutien au pouvoir d'achat de 6 Mds € pour apaiser le pays.",
      "effects": {
        "popularityDelta": 8,
        "tensionDelta": -15,
        "costTreasury": 6,
        "deficitDelta": 0.2,
        "message": "Soulagement dans l'opinion publique. Bercy et les marchés financiers s'inquiètent de la dérive budgétaire."
      }
    }
  ]
},
{
  "id": "evt_choc_geopolitique_mondial",
  "title": "⚡ Crise Géopolitique & Choc Énergétique Mondial",
  "category": "international",
  "source": "Conseil de Défense • Élysée 06:00",
  "icon": "Globe",
  "breakingNewsChyron": "CRISE INTERNATIONALE : LE BARIL S'ENVOLE, ALERTE MAXIMALE SUR LES MARCHÉS",
  "description": "L'embrasement d'un conflit international fait exploser les cours de l'énergie (+45% sur le pétrole et le gaz). L'inflation menace de plonger le pays en récession.",
  "choices": [
    {
      "id": "bouclier_tarifaire_massif",
      "label": "Déployer un Bouclier Tarifaire Total financé par l'emprunt",
      "description": "Geler les prix du gaz, du carburant et de l'électricité pour protéger ménages et usines (Coût : 12 Mds €).",
      "effects": {
        "popularityDelta": 10,
        "tensionDelta": -20,
        "costTreasury": 12,
        "deficitDelta": 0.4,
        "message": "Les Français applaudissent la protection de l'État. La note souveraine est mise sous haute surveillance par les agences."
      }
    },
    {
      "id": "sobriete_et_aides_ciblees",
      "label": "Appel à la sobriété et chèques d'urgence ciblés aux plus modestes",
      "description": "Préserver les finances publiques (Coût : 3 Mds €) et appeler la Nation à la résilience énergétique.",
      "effects": {
        "popularityDelta": -6,
        "tensionDelta": 15,
        "costTreasury": 3,
        "deficitDelta": 0.1,
        "message": "Les finances résistent, mais la colère monte chez les automobilistes et les artisans."
      }
    }
  ]
},
{
  "id": "evt_greve_bloquante_raffineries",
  "title": "🔥 Alerte Crise : Les Raffineries bloquées, Panique aux Stations-Service",
  "category": "social",
  "source": "Préfecture de Police • 07:15",
  "icon": "Flame",
  "breakingNewsChyron": "PÉNURIE DE CARBURANT : 60% DES STATIONS À SEC, L'ÉCONOMIE AU RALENTI",
  "description": "L'exaspération sociale a poussé les syndicats de l'énergie à couper les vannes. Le pays est menacé de paralysie totale sous 48 heures.",
  "choices": [
    {
      "id": "requisition_force_publique",
      "label": "Ordonner la réquisition par la force publique des personnels stratégiques",
      "description": "Envoyer les forces de l'ordre pour débloquer les dépôts et rétablir la liberté de circulation.",
      "effects": {
        "popularityDelta": 2,
        "authorityDelta": 10,
        "tensionDelta": 20,
        "message": "Le carburant revient dans les stations, mais l'intersyndicale dénonce une dérive autoritaire et durcit le mouvement."
      }
    },
    {
      "id": "prime_pouvoir_achat_patronat",
      "label": "Convoquer une table ronde tripartite et imposer une prime défiscalisée",
      "description": "Faire payer les compagnies pétrolières et accorder un geste financier immédiat (Coût État : 2 Mds €).",
      "effects": {
        "popularityDelta": 6,
        "tensionDelta": -25,
        "costTreasury": 2,
        "message": "Les raffineurs lèvent les piquets de grève. Fin de la crise à la pompe."
      }
    }
  ]
},
{
  "id": "evt_crise_dette_bruxelles",
  "title": "📉 Ultimatum de la Commission Européenne : Procédure pour Déficit",
  "category": "economique",
  "source": "Commission Européenne • Bruxelles 11:30",
  "icon": "LineChart",
  "breakingNewsChyron": "BRUXELLES MENACE PARIS DE SANCTIONS FINANCIÈRES : LE SPREAD S'ENVOLE",
  "description": "Avec un déficit public supérieur aux règles du traité, la Commission Européenne exige un plan d'économies d'urgence de 15 milliards sous peine d'amendes et de sanctions.",
  "choices": [
    {
      "id": "plan_rigueur_conforme",
      "label": "Adopter le plan d'assainissement budgétaire exigé par l'UE",
      "description": "Coupes drastiques dans les dépenses et gel du point d'indice des fonctionnaires (Recettes : 10 Mds €).",
      "effects": {
        "popularityDelta": -10,
        "tensionDelta": 25,
        "revenueTreasury": 10,
        "deficitDelta": -0.5,
        "message": "Bruxelles et les marchés financiers saluent la rigueur retrouvée. Les syndicats de fonctionnaires appellent à la grève générale."
      }
    },
    {
      "id": "bras_de_fer_souverainiste",
      "label": "Refuser les diktats budgétaires : « La France décide de son budget »",
      "description": "Engager le bras de fer politique avec Bruxelles pour défendre les services publics français.",
      "effects": {
        "popularityDelta": 8,
        "authorityDelta": 12,
        "deficitDelta": 0.3,
        "message": "Le patriotisme économique galvanise les Français. Les marchés sanctionnent la France par une hausse des taux d'emprunt."
      }
    }
  ]
}
,
{
  "id": "evt_fin_de_vie_euthanasie",
  "title": "🕊️ Projet de Loi sur la Fin de Vie : L'Aide Active à Mourir au Parlement",
  "category": "parlementaire",
  "source": "Comité Consultatif National d'Éthique • 09:00",
  "icon": "HeartPulse",
  "breakingNewsChyron": "FIN DE VIE : DÉBAT HISTORIQUE ET SOLENNEL DANS L'HÉMICYCLE SUR L'AIDE À MOURIR",
  "description": "Le projet de loi ouvrant un droit strict à l'aide active à mourir fracture l'Assemblée. Les associations de patients réclament la liberté de choisir, le corps médical appelle à la prudence.",
  "choices": [
    {
      "id": "fin_de_vie_legalisation_encadree",
      "label": "Légaliser l'aide active à mourir sous contrôle médical strict",
      "description": "Répondre à l'attente sociétale majeure des Français et garantir la dignité en fin de vie.",
      "effects": {
        "popularityDelta": 6,
        "tensionDelta": -5,
        "authorityDelta": 5,
        "demographicsDelta": {
          "jeunesse": 10,
          "cadres": 8,
          "retraites": -6
        },
        "message": "Le texte est salué par les associations de patients et l'opinion progressiste. Les autorités religieuses et certains soignants expriment leur désaccord."
      }
    },
    {
      "id": "fin_de_vie_soins_palliatifs_seuls",
      "label": "Rejeter l'aide active et financer massivement les soins palliatifs",
      "description": "Consacrer 1.5 Md € au déploiement d'unités de soins palliatifs dans chaque département sans légaliser l'euthanasie.",
      "effects": {
        "popularityDelta": 2,
        "tensionDelta": 5,
        "costTreasury": 2,
        "demographicsDelta": {
          "retraites": 12,
          "cadres": -4
        },
        "message": "Le monde médical et les conservateurs saluent le respect du serment d'Hippocrate. Les partisans du droit à mourir fustigent une lâcheté politique."
      }
    }
  ]
},
{
  "id": "evt_legalisation_cannabis",
  "title": "🌿 Légalisation du Cannabis : Monopole d'État ou Répression Accrue",
  "category": "economique",
  "source": "Conseil d'Analyse Économique • 14:30",
  "icon": "LineChart",
  "breakingNewsChyron": "STUPÉFIANTS : DÉBAT FLAMBOYANT SUR LA CRÉATION D'UN MONOPOLE D'ÉTAT DU CANNABIS",
  "description": "La France reste le premier pays consommateur d'Europe malgré l'une des législations les plus répressives. Un rapport préconise la légalisation avec taxe d'État.",
  "choices": [
    {
      "id": "cannabis_monopole_etat",
      "label": "Créer un Monopole d'État régulé avec taxe sur le cannabis",
      "description": "Assécher les trafics dans les cités et encaisser 2.5 Mds € de recettes fiscales annuelles.",
      "effects": {
        "popularityDelta": 3,
        "tensionDelta": 10,
        "revenueTreasury": 3,
        "deficitDelta": -0.1,
        "demographicsDelta": {
          "jeunesse": 15,
          "populaires": 6,
          "retraites": -15
        },
        "message": "Bercy encaisse de nouvelles recettes fiscales. Les élus de droite et les syndicats policiers dénoncent une capitulation morale de la République."
      }
    },
    {
      "id": "cannabis_toleration_zero",
      "label": "Tolérance Zéro : Forfait amende immédiat et opérations « Place Nette »",
      "description": "Mobiliser les forces de l'ordre pour harceler les points de deal et pénaliser les consommateurs.",
      "effects": {
        "popularityDelta": 2,
        "authorityDelta": 10,
        "tensionDelta": 15,
        "demographicsDelta": {
          "retraites": 14,
          "jeunesse": -12
        },
        "message": "Les saisies et les gardes à vue explosent. Les tribunaux et les prisons dénoncent une saturation totale du système judiciaire."
      }
    }
  ]
},
{
  "id": "evt_intelligence_artificielle_taxe",
  "title": "🤖 Révolution de l'IA : Faut-il taxer l'automatisation des emplois ?",
  "category": "economique",
  "source": "Secrétariat Général pour l'Investissement • 11:00",
  "icon": "Zap",
  "breakingNewsChyron": "INTELLIGENCE ARTIFICIELLE : LA FRANCE EN PREMIÈRE LIGNE SUR LA TAXE AUTOMATISATION",
  "description": "L'essor fulgurant des agents d'IA automatise des milliers d'emplois tertiaires et administratifs. Faut-il prélever une contribution sociale sur les serveurs d'IA ?",
  "choices": [
    {
      "id": "ia_taxe_automatisation",
      "label": "Instaurer une Taxe IA pour abonder le modèle social",
      "description": "Financer la reconversion des salariés impactés et récupérer 4 Mds € auprès des géants de la tech.",
      "effects": {
        "popularityDelta": 6,
        "tensionDelta": -10,
        "revenueTreasury": 4,
        "growthDelta": -0.2,
        "demographicsDelta": {
          "populaires": 10,
          "fonctionnaires": 12,
          "cadres": -10
        },
        "message": "Les salariés et les syndicats saluent la protection sociale face aux machines. Les startups tech dénoncent un frein à l'innovation."
      }
    },
    {
      "id": "ia_hub_mondial_deregulation",
      "label": "Faire de la France le champion mondial de l'IA (Exonérations fiscales)",
      "description": "Attirer les investissements internationaux et les centres de données sans aucune taxe restrictive.",
      "effects": {
        "popularityDelta": -4,
        "growthDelta": 0.4,
        "demographicsDelta": {
          "cadres": 15,
          "populaires": -8
        },
        "message": "Paris attire les plus grands fonds d'investissement mondiaux de l'IA. Les syndicats dénoncent un sacrifice des travailleurs."
      }
    }
  ]
},
{
  "id": "evt_snu_service_national_obligatoire",
  "title": "🎖️ Service National Universel (SNU) : Rendre le séjour obligatoire",
  "category": "securite",
  "source": "État-Major des Armées & Ministère des Armées • 15:30",
  "icon": "Shield",
  "breakingNewsChyron": "SNU OBLIGATOIRE : DÉBAT ENFLAMMÉ AUTOUR DU RÉARMEMENT CIVIQUE DE LA JEUNESSE",
  "description": "Faut-il généraliser le SNU à tous les jeunes de 16 ans (séjour de cohésion de 2 semaines) pour renforcer le civisme et la mixité sociale ?",
  "choices": [
    {
      "id": "snu_rendre_obligatoire",
      "label": "Rendre le SNU obligatoire pour l'ensemble d'une classe d'âge",
      "description": "Assurer la mixité républicaine et le réarmement civique (Coût annuel : 3 Mds €).",
      "effects": {
        "popularityDelta": -3,
        "authorityDelta": 18,
        "tensionDelta": 12,
        "costTreasury": 3,
        "demographicsDelta": {
          "retraites": 16,
          "jeunesse": -20,
          "populaires": 8
        },
        "message": "Les aînés saluent le retour de la discipline républicaine. Les organisations lycéennes manifestent dans les grandes villes."
      }
    },
    {
      "id": "snu_maintien_volontariat",
      "label": "Maintenir le SNU sur la base du volontariat et privilégier l'école",
      "description": "Économiser le budget d'État et éviter un bras de fer avec la jeunesse étudiante.",
      "effects": {
        "popularityDelta": 2,
        "tensionDelta": -5,
        "demographicsDelta": {
          "jeunesse": 12,
          "retraites": -8
        },
        "message": "Bercy préserve ses finances. L'opposition fustige un renoncement à l'autorité civique de la République."
      }
    }
  ]
},
{
  "id": "evt_penurie_eau_megabassines",
  "title": "🌾 Crise de l'Eau & Mégabassines : Tensions entre Agriculteurs et Écolos",
  "category": "environnement",
  "source": "Bureau de Recherches Géologiques et Minières • 10:15",
  "icon": "Globe",
  "breakingNewsChyron": "GESTION DE L'EAU : MANIFESTATIONS SOUS TENSION AUTOUR DES RÉSERVES AGRICOLES",
  "description": "Les nappes phréatiques atteignent des seuils critiques. Les exploitants réclament des réserves de substitution, les militants écologistes dénoncent l'accaparement de l'eau.",
  "choices": [
    {
      "id": "eau_protection_chantiers_bassines",
      "label": "Sécuriser les chantiers de mégabassines pour garantir l'agriculture",
      "description": "Soutenir la souveraineté alimentaire des céréaliers et protéger les chantiers par les forces de l'ordre.",
      "effects": {
        "popularityDelta": -2,
        "authorityDelta": 8,
        "tensionDelta": 15,
        "demographicsDelta": {
          "rural": 18,
          "cadres": -10,
          "jeunesse": -12
        },
        "message": "Le monde agricole salue le soutien indéfectible du Président. Les collectifs écologistes appellent à des blocages nationaux."
      }
    },
    {
      "id": "eau_moratoire_agroecologie",
      "label": "Décréter un moratoire et financer la transition vers l'agroécologie",
      "description": "Allouer 2 Mds € à la transition vers des cultures moins gourmandes en eau.",
      "effects": {
        "popularityDelta": 4,
        "tensionDelta": -10,
        "costTreasury": 2,
        "demographicsDelta": {
          "cadres": 12,
          "jeunesse": 14,
          "rural": -16
        },
        "message": "Les défenseurs de l'environnement célèbrent une victoire historique. Les syndicats agricoles menacent de bloquer les autoroutes."
      }
    }
  ]
},
{
  "id": "evt_contrat_armes_rafale",
  "title": "✈️ Vente Historique de 36 Rafale : Contrat Géant pour l'Industrie",
  "category": "international",
  "source": "Délégation Générale de l'Armement • 16:45",
  "icon": "Globe",
  "breakingNewsChyron": "EXPORTATION DÉFENSE : MÉGA-CONTRAT DE 8 MILLIARDS D'EUROS CONFIRMÉ POUR LE RAFALE",
  "description": "Un partenaire stratégique étranger propose de signer un contrat d'achat ferme de 36 avions de chasse Rafale, garantissant 15 000 emplois industriels.",
  "choices": [
    {
      "id": "rafale_signature_contrat",
      "label": "Signer le contrat et consolider la filière aéronautique française",
      "description": "Encaisser des retombées fiscales majeures et renforcer le rayonnement international de la France.",
      "effects": {
        "popularityDelta": 6,
        "authorityDelta": 10,
        "growthDelta": 0.3,
        "revenueTreasury": 3,
        "demographicsDelta": {
          "populaires": 10,
          "cadres": 8
        },
        "message": "Célébrations dans les usines de Dassault et chez les sous-traitants. La France réaffirme son rang de 2e exportateur mondial d'armes."
      }
    },
    {
      "id": "rafale_conditionner_droits_homme",
      "label": "Conditionner la vente à des garanties diplomatiques strictes",
      "description": "Affirmer la doctrine morale de la diplomatie française, au risque de perdre le marché au profit des États-Unis.",
      "effects": {
        "popularityDelta": -3,
        "authorityDelta": -5,
        "demographicsDelta": {
          "cadres": 6,
          "populaires": -6
        },
        "message": "Le client étranger annule les négociations et commande des F-35 américains. L'opposition fustige un fiasco commercial."
      }
    }
  ]
},
{
  "id": "evt_interdiction_ecrans_mineurs",
  "title": "📱 Régulation des Écrans : Interdire les Smartphones avant 15 ans",
  "category": "social",
  "source": "Commission d'Experts Éducation & Santé • 08:45",
  "icon": "Users",
  "breakingNewsChyron": "SANTÉ PUBLIQUE : RAPPORT CHOC SUR LES EFFETS DES RÉSEAUX SOCIAUX SUR LES ENFANTS",
  "description": "Face à la crise de concentration scolaire et aux troubles anxieux des adolescents, une commission recommande d'interdire l'accès aux smartphones et réseaux sociaux avant 15 ans.",
  "choices": [
    {
      "id": "ecrans_interdiction_legale",
      "label": "Légiférer pour interdire les smartphones et réseaux aux moins de 15 ans",
      "description": "Protéger la santé mentale de la jeunesse et restaurer l'autorité parentale et scolaire.",
      "effects": {
        "popularityDelta": 7,
        "authorityDelta": 12,
        "demographicsDelta": {
          "retraites": 18,
          "populaires": 10,
          "jeunesse": -15
        },
        "message": "Les parents et les enseignants applaudissent une mesure de salubrité publique. Les plateformes numériques menacent de recours juridiques."
      }
    },
    {
      "id": "ecrans_campagne_sensibilisation",
      "label": "Privilégier la sensibilisation et le contrôle parental sans interdiction",
      "description": "Responsabiliser les familles sans imposer une contrainte d'État policière.",
      "effects": {
        "popularityDelta": -2,
        "demographicsDelta": {
          "jeunesse": 8,
          "retraites": -8
        },
        "message": "Le statu quo prévaut. Les pédopsychiatres dénoncent une démission de l'État face aux géants de la tech."
      }
    }
  ]
},
{
  "id": "evt_deserts_medicaux_coercition",
  "title": "🏥 Déserts Médicaux : Obliger l'installation des jeunes médecins",
  "category": "social",
  "source": "Conseil National de l'Ordre des Médecins • 11:15",
  "icon": "HeartPulse",
  "breakingNewsChyron": "SANTÉ EN ZONE RURALE : BRAS DE FER SUR LE CONVENTIONNEMENT SÉLECTIF DES MÉDECINS",
  "description": "Six millions de Français n'ont pas de médecin traitant. L'Assemblée propose d'interdire l'installation des jeunes praticiens dans les zones surdotées pour les envoyer dans les déserts médicaux.",
  "choices": [
    {
      "id": "medecins_installation_obligatoire",
      "label": "Imposer 3 ans d'exercice obligatoire en zone sous-dotée",
      "description": "Garantir l'accès aux soins pour tous les Français dans la ruralité et les banlieues.",
      "effects": {
        "popularityDelta": 8,
        "tensionDelta": 10,
        "demographicsDelta": {
          "rural": 20,
          "populaires": 14,
          "cadres": -12
        },
        "message": "Plébiscite dans la France rurale et périphérique. Les syndicats de médecins et internes décrètent une grève générale des cabinets."
      }
    },
    {
      "id": "medecins_incitations_financieres",
      "label": "Doubler les primes d'installation et défiscaliser les gardes de nuit",
      "description": "Préserver la liberté d'installation tout en attirant les soignants par des bonus financiers (Coût : 1.5 Md €).",
      "effects": {
        "popularityDelta": 2,
        "tensionDelta": -5,
        "costTreasury": 2,
        "demographicsDelta": {
          "cadres": 8,
          "rural": -6
        },
        "message": "Le corps médical est apaisé. Les maires ruraux fustigent un pansement sur une jambe de bois."
      }
    }
  ]
},
{
  "id": "evt_lutte_narcotrafic_etat_urgence",
  "title": "🚨 Narcotrafic & Règlements de Comptes : État d'Urgence Sécuritaire",
  "category": "securite",
  "source": "Office Anti-Stupéfiants (OFAST) • 23:00",
  "icon": "Shield",
  "breakingNewsChyron": "CRIME ORGANISÉ : OPÉRATION NATIONALE COUP DE POING DANS LES PORTS ET LES CITÉS",
  "description": "La violence des cartels de la drogue franchit un cap inacceptable avec des tirs à l'arme de guerre près des écoles. Le ministre de l'Intérieur demande des pouvoirs d'exception.",
  "choices": [
    {
      "id": "narco_parquet_special_armee",
      "label": "Créer un Parquet National Antistupéfiants et déployer l'armée dans les ports",
      "description": "Frapper le crime organisé au sommet et militariser la surveillance des conteneurs maritimes.",
      "effects": {
        "popularityDelta": 9,
        "authorityDelta": 15,
        "tensionDelta": -5,
        "costTreasury": 2,
        "demographicsDelta": {
          "populaires": 16,
          "retraites": 14,
          "cadres": 6
        },
        "message": "Les saisies records de cocaïne et d'avoirs criminels font les gros titres. L'autorité de l'État marque un point décisif."
      }
    },
    {
      "id": "narco_moyens_judiciaires_ordinaires",
      "label": "Renforcer la police de proximité et les éducateurs de rue",
      "description": "Agir sur la prévention sans militariser le maintien de l'ordre.",
      "effects": {
        "popularityDelta": -4,
        "authorityDelta": -8,
        "demographicsDelta": {
          "jeunesse": 8,
          "retraites": -12
        },
        "message": "Le travail social se poursuit, mais l'opinion réclame une réponse régalienne plus musclée."
      }
    }
  ]
},
{
  "id": "evt_privatisation_audiovisuel_public",
  "title": "📺 Avenir de l'Audiovisuel Public : Fusion ou Privatisation partielle",
  "category": "mediatique",
  "source": "Arcom & Commission de la Culture • 14:00",
  "icon": "Tv",
  "breakingNewsChyron": "FRANCE TÉLÉVISIONS & RADIO FRANCE : PROJET DE FUSION DE LA « BBC À LA FRANÇAISE »",
  "description": "L'audiovisuel public coûte 4 milliards d'euros par an au contribuable. Faut-il créer une holding géante unique ou privatiser certaines chaînes pour réduire la dépense ?",
  "choices": [
    {
      "id": "media_fusion_holding_unique",
      "label": "Créer la holding « France Médias » pour rationaliser les coûts",
      "description": "Bâtir un géant public de l'information capable de rivaliser avec les plateformes de streaming.",
      "effects": {
        "popularityDelta": 2,
        "authorityDelta": 6,
        "tensionDelta": 10,
        "costTreasury": 1,
        "demographicsDelta": {
          "cadres": 8,
          "fonctionnaires": -6
        },
        "message": "La holding unifiée est lancée. Les syndicats de journalistes observent une journée de grève de l'antenne."
      }
    },
    {
      "id": "media_privatisation_france2",
      "label": "Privatiser France 2 et recentrer l'État sur l'information et la culture",
      "description": "Désengager l'État, encaisser 1.5 Md € et réduire le budget de fonctionnement annuel de 800M€.",
      "effects": {
        "popularityDelta": -6,
        "tensionDelta": 20,
        "revenueTreasury": 2,
        "deficitDelta": -0.1,
        "demographicsDelta": {
          "cadres": -12,
          "fonctionnaires": -18,
          "populaires": 6
        },
        "message": "Les recettes exceptionnelles soulagent Bercy. Le monde culturel et l'opposition de gauche dénoncent un coup de grâce au service public."
      }
    }
  ]
}
,
{
  "id": "evt_sommet_bruxelles_mercosur",
  "title": "🇪🇺 Conseil Européen à Bruxelles : Le Bras de Fer sur le Traité Mercosur",
  "category": "international",
  "source": "Conseil de l'Union Européenne • Bruxelles 19:30",
  "icon": "Globe",
  "breakingNewsChyron": "SOMMET DE BRUXELLES : PARIS MENACE DE BLOQUER LE TRAITÉ DE LIBRE-ÉCHANGE",
  "description": "La Commission Européenne et l'Allemagne poussent pour ratifier l'accord commercial avec le Mercosur. Les éleveurs français sont prêts à paralyser le pays si vous cédez.",
  "choices": [
    {
      "id": "mercosur_veto_francais",
      "label": "Poser le veto de la France et refuser le traité commercial",
      "description": "Protéger l'agriculture française et exiger des clauses miroirs environnementales strictes.",
      "effects": {
        "popularityDelta": 8,
        "authorityDelta": 12,
        "tensionDelta": -15,
        "demographicsDelta": {
          "rural": 25,
          "populaires": 10,
          "cadres": -6
        },
        "message": "Victoire retentissante pour les agriculteurs français qui lèvent les barrages. Berlin et Bruxelles grincent des dents mais s'inclinent."
      }
    },
    {
      "id": "mercosur_compromis_allemand",
      "label": "Signer l'accord contre des dérogations et fonds de compensation pour nos éleveurs",
      "description": "Favoriser les exportations de notre industrie automobile et aéronautique (Gain Trésorerie : 3 Mds €).",
      "effects": {
        "popularityDelta": -8,
        "tensionDelta": 20,
        "revenueTreasury": 3,
        "growthDelta": 0.3,
        "demographicsDelta": {
          "rural": -20,
          "cadres": 10,
          "populaires": -10
        },
        "message": "Les patrons exportateurs applaudissent. Les syndicats agricoles déversent des tonnes de lisier devant les préfectures."
      }
    }
  ]
},
{
  "id": "evt_onu_veto_moment_gaulliste",
  "title": "🕊️ Moment Gaulliste à l'ONU : Le Veto Historique de la France",
  "category": "international",
  "source": "Conseil de Sécurité des Nations Unies • New York 21:00",
  "icon": "Landmark",
  "breakingNewsChyron": "TENSIONS MONDIALES : LA FRANCE OPPOSE SON VETO À LA RÉSOLUTION DES SUPERPUISSANCES",
  "description": "Une coalition internationale pousse à une intervention militaire précipitée dans un conflit régional. En tant que Président, vous avez le pouvoir historique d'opposer le Veto de la France.",
  "choices": [
    {
      "id": "onu_veto_solennel",
      "label": "Ordonner le Veto de la France : « La France parle au nom de la Paix »",
      "description": "Affirmer la doctrine gaullo-mitterrandienne d'indépendance de la France face aux blocs.",
      "effects": {
        "popularityDelta": 10,
        "authorityDelta": 20,
        "tensionDelta": -10,
        "demographicsDelta": {
          "cadres": 15,
          "jeunesse": 14,
          "populaires": 12,
          "retraites": 10
        },
        "message": "Le discours solennel de l'ambassadeur français à l'ONU est ovationné dans le monde entier. L'opinion publique française salue un chef d'État d'envergure historique."
      }
    },
    {
      "id": "onu_alignement_coalition",
      "label": "S'abstenir et s'aligner sur la position de nos partenaires occidentaux",
      "description": "Préserver l'entente cordiale avec Washington et nos alliés au sein de l'OTAN.",
      "effects": {
        "popularityDelta": -4,
        "authorityDelta": -10,
        "demographicsDelta": {
          "cadres": 4,
          "populaires": -6
        },
        "message": "La France vote avec ses alliés. L'opposition dénonce une diplomatie d'alignement indigne de notre tradition républicaine."
      }
    }
  ]
},
{
  "id": "evt_export_nucleaire_epr_europe",
  "title": "⚛️ Le « Contrat Nucléaire du Siècle » : Vente de 4 Réacteurs EPR en Europe",
  "category": "international",
  "source": "Bercy & Commissariat à l'Énergie Atomique • 15:00",
  "icon": "Zap",
  "breakingNewsChyron": "EXPLOIT INDUSTRIEL : EDF ET LA FRANCE DÉCROCHENT UN MÉGA-CONTRAT DE 12 MILLIARDS",
  "description": "Un pays partenaire d'Europe de l'Est hésite entre le réacteur français EPR-2 et l'offre concurrente américaine de Westinghouse. Votre engagement personnel peut faire basculer le deal.",
  "choices": [
    {
      "id": "nucleaire_garantie_etat_totale",
      "label": "Offrir la garantie d'État et sceller le contrat de 12 Mds €",
      "description": "Assurer 25 ans de travail pour la filière nucléaire française et encaisser 4 Mds € de rentrées fiscales.",
      "effects": {
        "popularityDelta": 7,
        "authorityDelta": 14,
        "revenueTreasury": 4,
        "growthDelta": 0.4,
        "demographicsDelta": {
          "populaires": 14,
          "cadres": 12,
          "rural": 8
        },
        "message": "Triomphe industriel sans précédent pour la technologie française. Les États-Unis accusent le coup."
      }
    },
    {
      "id": "nucleaire_refus_garantie_risque",
      "label": "Refuser d'engager la garantie financière de l'État sur ce chantier",
      "description": "Protéger le budget de l'État contre tout risque de dépassement de coûts (Option de prudence budgétaire).",
      "effects": {
        "popularityDelta": -5,
        "authorityDelta": -6,
        "demographicsDelta": {
          "populaires": -8,
          "cadres": -6
        },
        "message": "Le contrat est attribué aux Américains. La filière nucléaire française fustige un manque d'audace politique impardonnable."
      }
    }
  ]
},
{
  "id": "evt_sommet_defense_europeenne",
  "title": "🛡️ Sommet de la Défense Européenne : « Préférence Européenne » vs Achats US",
  "category": "international",
  "source": "Conseil Européen • Berlin / Paris 18:00",
  "icon": "Shield",
  "breakingNewsChyron": "AUTONOMIE STRATÉGIQUE : PARIS EXIGE QUE LES FONDS DE DÉFENSE ACHÈTENT DU MATÉRIEL EUROPÉEN",
  "description": "L'Union Européenne débloque 20 milliards d'euros pour le réarmement. La France exige que ces fonds soient réservés aux industriels européens (Dassault, Thales, KNDS) plutôt qu'au matériel américain.",
  "choices": [
    {
      "id": "defense_imposer_preference_europeenne",
      "label": "Imposer la « Préférence Européenne » stricte pour les commandes d'armement",
      "description": "Garantir des milliards de commandes militaires pour les usines et arsenaux français.",
      "effects": {
        "popularityDelta": 6,
        "authorityDelta": 10,
        "revenueTreasury": 2,
        "growthDelta": 0.3,
        "demographicsDelta": {
          "populaires": 12,
          "cadres": 10
        },
        "message": "Succès diplomatique majeur : les commandes militaires pleuvent sur les entreprises françaises."
      }
    },
    {
      "id": "defense_compromis_atlantiste",
      "label": "Accepter un compromis flexible pour ne pas froisser les pays baltes et la Pologne",
      "description": "Préserver la cohésion de l'OTAN au détriment exclusif des usines françaises.",
      "effects": {
        "popularityDelta": -3,
        "authorityDelta": -4,
        "demographicsDelta": {
          "populaires": -6
        },
        "message": "Les pays de l'Est achètent des avions américains avec des fonds européens. L'industrie française dénonce une occasion manquée."
      }
    }
  ]
}
];
