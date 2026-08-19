const fs = require('fs');

const EVENTS = [
  {
    id: "evt_retraites_reforme",
    title: "Crise des Retraites : L'Intersyndicale menace de bloquer le pays",
    category: "social",
    source: "Conseil d'Orientation des Retraites • 08:30",
    icon: "Users",
    breakingNewsChyron: "RETRAITES : L'INTERSYNDICALE ANNONCE UNE GRÈVE GÉNÉRALE ILLIMITÉE",
    description: "Le rapport financier des retraites pointe un déficit de 14 milliards d'euros d'ici 2030. Vous devez trancher sur l'équilibre du régime.",
    choices: [
      {
        id: "retraites_retrait",
        label: "Retirer la réforme et combler le trou par une surtaxe sur le capital",
        description: "Écouter la colère populaire pour ramener le calme immédiat, au prix d'une taxe sur les entreprises.",
        costInfluence: 5,
        effects: {
          popularityDelta: 6,
          tensionDelta: -25,
          strikeRiskDelta: -25,
          costTreasury: 10,
          deficitDelta: 0.3,
          demographicsDelta: { populaires: 15, jeunesse: 12, cadres: -8 },
          message: "L'intersyndicale lève les préavis de grève sous les acclamations. Le Medef et la bourse fustigent un coup de massue fiscal."
        }
      },
      {
        id: "retraites_maintien_ferme",
        label: "Maintenir l'âge pivot et engager l'orthodoxie budgétaire",
        description: "Assurer la pérennité financière de la France et rassurer les agences de notation, quitte à affronter la rue.",
        effects: {
          popularityDelta: -7,
          tensionDelta: 25,
          strikeRiskDelta: 25,
          revenueTreasury: 12,
          deficitDelta: -0.4,
          demographicsDelta: { retraites: 10, cadres: 8, populaires: -14 },
          message: "Les marchés saluent votre courage gestionnaire. La rue s'embrase avec des manifestations monstres dans tout le pays."
        }
      },
      {
        id: "retraites_clause_penibilite",
        label: "Négocier un compromis avec la CFDT sur les carrières longues",
        description: "Faire des concessions ciblées pour fracturer le front syndical et faire adopter le texte à l'Assemblée.",
        costInfluence: 10,
        effects: {
          popularityDelta: 2,
          tensionDelta: -10,
          strikeRiskDelta: -10,
          costTreasury: 4,
          deficitDelta: 0.1,
          demographicsDelta: { cadres: 5, populaires: 2 },
          message: "Le compromis est scellé. Les syndicats réformistes se désolidarisent des radicaux, la grève s'essouffle."
        }
      }
    ]
  },
  {
    id: "evt_hopital_urgences",
    title: "Crise Hospitalière : Saturation historique des services d'urgences",
    category: "social",
    source: "Fédération Hospitalière de France • 11:15",
    icon: "HeartPulse",
    breakingNewsChyron: "SANTÉ EN CRISE : LES SOIGNANTS EN GRÈVE ET DÉMISSIONS EN MASSE DANS LES HÔPITAUX",
    description: "Faute de soignants et de lits, des dizaines de services d'urgences ferment la nuit. Les syndicats de médecins exigent un plan d'urgence massif.",
    choices: [
      {
        id: "hopital_plan_massif",
        label: "Débloquer un plan Ségur 2 de 8 milliards d'euros et revaloriser les soignants",
        description: "Injecter massivement des fonds publics pour sauver le système de santé et apaiser les soignants.",
        effects: {
          popularityDelta: 7,
          tensionDelta: -20,
          strikeRiskDelta: -20,
          costTreasury: 8,
          deficitDelta: 0.3,
          demographicsDelta: { fonctionnaires: 15, populaires: 8, retraites: 6 },
          message: "Les soignants saluent un geste historique. Les urgences respirent, mais Bercy s'inquiète du dérapage des comptes sociaux."
        }
      },
      {
        id: "hopital_restructuration",
        label: "Refuser le chéquier et imposer la mutualisation avec les cliniques privées",
        description: "Réorganiser l'offre de soins sans creuser la dette publique, quitte à braquer les syndicats hospitaliers.",
        effects: {
          popularityDelta: -5,
          tensionDelta: 15,
          strikeRiskDelta: 15,
          revenueTreasury: 3,
          deficitDelta: -0.1,
          demographicsDelta: { cadres: 4, fonctionnaires: -12 },
          message: "L'orthodoxie budgétaire est préservée, mais les collectifs d'urgentistes appellent à la démission collective."
        }
      }
    ]
  },
  {
    id: "evt_crise_agricole",
    title: "Colère Paysanne : Les tracteurs convergent vers Paris contre le Mercosur",
    category: "economique",
    source: "FNSEA / Coordination Rurale • 07:00",
    icon: "Tractor",
    breakingNewsChyron: "COLÈRE PAYSANNE : LES AUTOROUTES VERS PARIS TOTALEMENT BLOQUÉES PAR LES AGRICULTEURS",
    description: "Les exploitants agricoles dénoncent les normes environnementales européennes et la concurrence déloyale des importations étrangères.",
    choices: [
      {
        id: "agri_veto_mercosur",
        label: "Poser un veto ferme au traité Mercosur et geler les normes écologiques",
        description: "Soutenir sans réserve le monde paysan contre Bruxelles, au risque d'un isolement diplomatique européen.",
        effects: {
          popularityDelta: 8,
          tensionDelta: -25,
          strikeRiskDelta: -25,
          costTreasury: 3,
          deficitDelta: 0.1,
          demographicsDelta: { rural: 20, populaires: 10, cadres: -6 },
          message: "Les paysans lèvent les barrages dans la joie. La Commission européenne s'indigne de votre unilatéralisme."
        }
      },
      {
        id: "agri_fermete_crs",
        label: "Refuser de céder sur les normes et dégager les autoroutes par les CRS",
        description: "Faire respecter la liberté de circulation et tenir les engagements climatiques de la France.",
        effects: {
          popularityDelta: -6,
          tensionDelta: 20,
          strikeRiskDelta: 20,
          demographicsDelta: { cadres: 8, rural: -22 },
          message: "L'ordre public est rétabli sur les axes routiers, mais les campagnes entrent en sécession contre le pouvoir parisien."
        }
      },
      {
        id: "agri_fonds_calamite",
        label: "Accorder une avance de trésorerie de 2 milliards d'euros et un fonds de calamité",
        description: "Acheter la paix agricole par des subventions ciblées sans rompre avec les traités européens.",
        costInfluence: 5,
        effects: {
          popularityDelta: 3,
          tensionDelta: -10,
          strikeRiskDelta: -10,
          costTreasury: 2,
          deficitDelta: 0.1,
          demographicsDelta: { rural: 6 },
          message: "Les syndicats agricoles acceptent la trêve, mais préviennent que la colère reste intacte."
        }
      }
    ]
  },
  {
    id: "evt_dette_sommation",
    title: "Dette Souveraine : L'écart OAT/Bund s'envole face aux doutes des marchés",
    category: "economique",
    source: "Agence France Trésor • 16:45",
    icon: "TrendingDown",
    breakingNewsChyron: "ALERTE MARCHÉS : LE TAUX D'EMPRUNT DE LA FRANCE FRÔLE LES 4.0%, PANIQUE À BERCY",
    description: "Les investisseurs étrangers s'inquiètent du niveau d'endettement de la France (115% du PIB). La charge de la dette devient le premier budget de l'État.",
    choices: [
      {
        id: "dette_rabot_massif",
        label: "Décréter un coup de rabot immédiat de 12 milliards sur les administrations",
        description: "Prouver aux marchés la rigueur inflexible de votre gouvernement pour faire baisser les taux d'intérêt.",
        effects: {
          popularityDelta: -8,
          tensionDelta: 18,
          strikeRiskDelta: 18,
          revenueTreasury: 12,
          deficitDelta: -0.5,
          demographicsDelta: { cadres: 8, fonctionnaires: -15, populaires: -8 },
          message: "Les taux d'intérêt se détendent immédiatement. Les syndicats de fonctionnaires appellent à la riposte nationale."
        }
      },
      {
        id: "dette_refus_austerite",
        label: "Refuser l'austérité et dénoncer la spéculation financière internationale",
        description: "Protéger les services publics et le modèle social français contre la dictature des marchés.",
        effects: {
          popularityDelta: 6,
          tensionDelta: -10,
          strikeRiskDelta: -10,
          costTreasury: 5,
          deficitDelta: 0.3,
          demographicsDelta: { populaires: 12, cadres: -12 },
          message: "Votre discours souverainiste enflamme l'opinion nationale, mais le spread français atteint un record historique."
        }
      }
    ]
  },
  {
    id: "evt_emeutes_banlieues",
    title: "Violences Urbaines : Nuit d'émeutes après la mort d'un jeune en scooter",
    category: "securite",
    source: "Ministère de l'Intérieur • 03:00",
    icon: "ShieldAlert",
    breakingNewsChyron: "ÉTAT D'URGENCE : COMMISSARIATS ET MAIRIES ATTAQUÉS DANS PLUSIEURS MÉTROPOLES",
    description: "Des centaines de véhicules brûlés et des bâtiments publics incendiés suite à un refus d'obtempérer tragique.",
    choices: [
      {
        id: "emeutes_etat_urgence",
        label: "Décréter l'état d'urgence et déployer le RAID et la BRI sans compromis",
        description: "Rétablir l'ordre républicain avec la plus grande fermeté policière et judiciaire.",
        costInfluence: 5,
        effects: {
          popularityDelta: 5,
          tensionDelta: 20,
          strikeRiskDelta: 20,
          costTreasury: 1,
          demographicsDelta: { retraites: 12, rural: 10, jeunesse: -18 },
          message: "L'autorité de l'État s'impose dans les rues. L'électorat d'ordre applaudit, la jeunesse et la gauche dénoncent une dérive autoritaire."
        }
      },
      {
        id: "emeutes_plan_banlieues",
        label: "Recevoir la famille à l'Élysée et annoncer un plan banlieues de 3 milliards",
        description: "Jouer l'apaisement républicain et investir dans les quartiers populaires délaissés.",
        effects: {
          popularityDelta: -4,
          tensionDelta: -20,
          strikeRiskDelta: -20,
          costTreasury: 3,
          deficitDelta: 0.1,
          demographicsDelta: { jeunesse: 14, populaires: 6, retraites: -10 },
          message: "Le geste d'apaisement éteint les émeutes nocturnes. L'opposition de droite dénonce une capitulation face aux voyous."
        }
      }
    ]
  },
  {
    id: "evt_energie_prix",
    title: "Choc Énergétique : Flambée hivernale des tarifs de l'électricité (+18%)",
    category: "economique",
    source: "Commission de Régulation de l'Énergie • 10:00",
    icon: "Zap",
    breakingNewsChyron: "FACTURES D'ÉLECTRICITÉ : RISQUE DE RUPTURE POUR LES ARTISANS ET LES MÉNAGES",
    description: "Les artisans boulangers et les foyers modestes sont étranglés par les factures d'énergie à l'approche de l'hiver.",
    choices: [
      {
        id: "energie_bouclier_total",
        label: "Rétablir un bouclier tarifaire intégral de 12 milliards d'euros",
        description: "Geler les factures des Français pour préserver le pouvoir d'achat et la paix sociale.",
        effects: {
          popularityDelta: 9,
          tensionDelta: -25,
          strikeRiskDelta: -25,
          costTreasury: 12,
          deficitDelta: 0.4,
          demographicsDelta: { populaires: 15, rural: 12, cadres: 4 },
          message: "Immense soulagement populaire chez les artisans et les familles. La facture de 12 milliards pèse lourdement sur la dette."
        }
      },
      {
        id: "energie_sortie_marche_ue",
        label: "Sortir la France du marché européen de l'électricité par décret",
        description: "Indexer le prix de l'électricité sur les coûts réels de production du nucléaire français.",
        costInfluence: 15,
        effects: {
          popularityDelta: 5,
          tensionDelta: -10,
          strikeRiskDelta: -10,
          costTreasury: 1,
          demographicsDelta: { populaires: 8, rural: 10, cadres: -6 },
          message: "Le prix de l'énergie chute durablement. Berlin et Bruxelles engagent des poursuites judiciaires contre la France."
        }
      },
      {
        id: "energie_cheque_modeste",
        label: "Refuser le bouclier et distribuer un chèque ciblé de 2 milliards aux très modestes",
        description: "Sauvegarder les finances publiques en n'aidant que les ménages les plus vulnérables.",
        effects: {
          popularityDelta: -6,
          tensionDelta: 15,
          strikeRiskDelta: 15,
          costTreasury: 2,
          deficitDelta: 0.1,
          demographicsDelta: { populaires: -10, rural: -8 },
          message: "La rigueur budgétaire est préservée, mais les commerçants et la classe moyenne grondent contre l'abandon de l'État."
        }
      }
    ]
  },
  {
    id: "evt_superprofits_cac40",
    title: "Dividendes Records du CAC40 : Pression sur la taxation des superprofits",
    category: "economique",
    source: "Le Monde Économie • 14:15",
    icon: "TrendingUp",
    breakingNewsChyron: "CAC40 : 70 MILLIARDS DE DIVIDENDES, LES SYNDICATS EXIGENT UNE TAXE DE CRÈVE-CŒUR",
    description: "Les géants de l'énergie et du luxe enregistrent des bénéfices historiques en pleine période d'inflation subie par les ménages.",
    choices: [
      {
        id: "superprofits_taxe_dure",
        label: "Créer une taxe exceptionnelle de 10 milliards d'euros sur les superprofits",
        description: "Faire contribuer les multinationales pour financer les services publics et calmer la colère sociale.",
        effects: {
          popularityDelta: 8,
          tensionDelta: -15,
          strikeRiskDelta: -15,
          revenueTreasury: 10,
          deficitDelta: -0.3,
          demographicsDelta: { populaires: 15, jeunesse: 10, cadres: -10 },
          message: "Plébiscite populaire pour la justice fiscale. Le patronat menace de délocaliser des sièges sociaux et la Bourse baisse."
        }
      },
      {
        id: "superprofits_incitation",
        label: "Refuser la taxe pour préserver l'attractivité et inciter au partage de la valeur",
        description: "Encourager la prime Macron et l'actionnariat salarié plutôt que d'alourdir la fiscalité productive.",
        effects: {
          popularityDelta: -5,
          tensionDelta: 15,
          strikeRiskDelta: 15,
          costTreasury: 0,
          demographicsDelta: { cadres: 10, populaires: -12, jeunesse: -8 },
          message: "Les investisseurs internationaux saluent votre constance libérale. L'opposition dénonce le président des ultra-riches."
        }
      }
    ]
  },
  {
    id: "evt_logement_crise",
    title: "Crise du Logement : Pénurie record et explosion des loyers pour la jeunesse",
    category: "social",
    source: "Fondation Abbé Pierre • 11:30",
    icon: "Home",
    breakingNewsChyron: "LOGEMENT : DES ÉTUDIANTS ET TRAVAILLEURS DANS LA RUE, MARCHÉ DE L'IMMOBILIER BLOQUÉ",
    description: "Les taux d'intérêt élevés bloquent l'accession à la propriété et les offres de location s'effondrent dans toutes les métropoles.",
    choices: [
      {
        id: "logement_encadrement_requisition",
        label: "Encadrer strictement les loyers et lancer un plan de 5 milliards pour le logement social",
        description: "Protéger les locataires et relancer la construction publique au détriment des rentiers.",
        effects: {
          popularityDelta: 6,
          tensionDelta: -15,
          strikeRiskDelta: -15,
          costTreasury: 5,
          deficitDelta: 0.2,
          demographicsDelta: { jeunesse: 18, populaires: 10, cadres: -8, retraites: -6 },
          message: "Les étudiants et les mal-logés soufflent. Les propriétaires bailleurs menacent de retirer leurs biens de la location."
        }
      },
      {
        id: "logement_choc_offre_defisc",
        label: "Créer un grand choc d'offre : déréguler les permis de construire et exonérer les plus-values",
        description: "Libérer l'initiative privée et le BTP sans dépense budgétaire de l'État.",
        effects: {
          popularityDelta: -3,
          tensionDelta: 10,
          strikeRiskDelta: 10,
          costTreasury: 1,
          demographicsDelta: { cadres: 12, populaires: -6, jeunesse: -8 },
          message: "Le secteur du bâtiment reprend des couleurs. Les associations dénoncent un cadeau fiscal aux promoteurs immobiliers."
        }
      }
    ]
  },
  {
    id: "evt_nucleaire_epr",
    title: "Souveraineté Énergétique : Le grand chantier de relance du Nucléaire",
    category: "environnement",
    source: "EDF / Autorité de Sûreté Nucléaire • 15:00",
    icon: "Zap",
    breakingNewsChyron: "NUCLÉAIRE : LANCEMENT DU PROGRAMME DE 6 RÉACTEURS EPR2 POUR 50 MILLIARDS D'EUROS",
    description: "Pour décarboner l'économie et garantir l'indépendance énergétique, la France doit arbitrer le financement des nouveaux réacteurs.",
    choices: [
      {
        id: "nucleaire_grand_emprunt",
        label: "Financer la construction intégrale par un grand emprunt national de 15 milliards",
        description: "Engager l'État dans une stratégie industrielle gaullienne de long terme.",
        effects: {
          popularityDelta: 5,
          tensionDelta: 10,
          strikeRiskDelta: 10,
          costTreasury: 15,
          deficitDelta: 0.5,
          demographicsDelta: { cadres: 10, retraites: 8, jeunesse: -8 },
          message: "Fierté industrielle et souveraineté réaffirmée. Les écologistes organisent des blocages de chantiers, la dette s'alourdit."
        }
      },
      {
        id: "nucleaire_partenariat_prive",
        label: "Ouvrir le capital d'EDF aux fonds souverains et investisseurs privés",
        description: "Moderniser le parc nucléaire sans faire porter le risque financier sur le contribuable français.",
        effects: {
          popularityDelta: -6,
          tensionDelta: 18,
          strikeRiskDelta: 18,
          revenueTreasury: 8,
          deficitDelta: -0.2,
          demographicsDelta: { cadres: 6, populaires: -14, fonctionnaires: -12 },
          message: "Les caisses de l'État sont soulagées, mais les syndicats de l'énergie dénoncent une trahison et coupent le courant aux ministères."
        }
      }
    ]
  },
  {
    id: "evt_chomage_reforme",
    title: "Assurance-Chômage : Durcissement des conditions d'indemnisation",
    category: "social",
    source: "Unédic / Ministère du Travail • 09:30",
    icon: "Briefcase",
    breakingNewsChyron: "EMPLOI : PROJET DE DÉCRET POUR RÉDUIRE LA DURÉE DES ALLOCATIONS CHÔMAGE À 12 MOIS",
    description: "Le gouvernement souhaite inciter au retour à l'emploi et économiser 4 milliards d'euros par an sur les comptes de l'Unédic.",
    choices: [
      {
        id: "chomage_rigueur_decret",
        label: "Signer le décret de durcissement et conditionner le RSA à 15h d'activité",
        description: "Valoriser la valeur travail et réaliser des économies budgétaires immédiates.",
        effects: {
          popularityDelta: -6,
          tensionDelta: 20,
          strikeRiskDelta: 20,
          revenueTreasury: 6,
          deficitDelta: -0.2,
          demographicsDelta: { retraites: 12, cadres: 8, populaires: -16, jeunesse: -12 },
          message: "Les comptes de l'Unédic reviennent à l'équilibre. Les syndicats et les demandeurs d'emploi manifestent devant Pôle Emploi."
        }
      },
      {
        id: "chomage_maintien_droits",
        label: "Maintenir les droits et créer un grand plan de formation aux métiers en pénurie",
        description: "Privilégier l'accompagnement humain et la qualification plutôt que la sanction financière.",
        effects: {
          popularityDelta: 4,
          tensionDelta: -12,
          strikeRiskDelta: -12,
          costTreasury: 4,
          deficitDelta: 0.1,
          demographicsDelta: { populaires: 10, jeunesse: 10, cadres: -4 },
          message: "Le climat social s'apaise chez les travailleurs. Le patronat regrette un manque d'incitation forte à la reprise d'emploi."
        }
      }
    ]
  },
  {
    id: "evt_securite_narcotrafic",
    title: "Lutte contre le Narcotrafic : Guerre des gangs et règlements de comptes",
    category: "securite",
    source: "Procureur de la République de Marseille • 22:00",
    icon: "ShieldAlert",
    breakingNewsChyron: "NARCOTRAFIC : FUSILLADES À LA KALACHNIKOV À MARSEILLE, L'ÉTAT AU DÉFI DES MAFIAS",
    description: "Les réseaux criminels défient l'autorité de l'État dans plusieurs cités avec des armes de guerre et corrompent les institutions locales.",
    choices: [
      {
        id: "narco_militarisation_justice",
        label: "Créer un parquet anti-drogue d'exception et déployer l'armée en appui logistique",
        description: "Frapper fort avec des moyens militaires et judiciaires hors normes pour éradiquer les réseaux.",
        costInfluence: 10,
        effects: {
          popularityDelta: 8,
          tensionDelta: 10,
          strikeRiskDelta: 10,
          costTreasury: 2,
          demographicsDelta: { retraites: 15, rural: 12, populaires: 10, cadres: -4 },
          message: "Succès retentissant : des dizaines de barons tombent et des tonnes de drogues sont saisies. Les magistrats s'inquiètent de la justice d'exception."
        }
      },
      {
        id: "narco_legalisation_encadree",
        label: "Légaliser et encadrer le cannabis sous monopole d'État pour assécher les trafics",
        description: "Casser le modèle économique des dealers et générer 3 milliards de recettes fiscales annuelles.",
        effects: {
          popularityDelta: -3,
          tensionDelta: -10,
          strikeRiskDelta: -10,
          revenueTreasury: 5,
          deficitDelta: -0.2,
          demographicsDelta: { jeunesse: 20, cadres: 6, retraites: -18, rural: -12 },
          message: "Les recettes fiscales affluent à Bercy et les violences de rue baissent. La droite conservatrice hurle à la déchéance morale de la France."
        }
      }
    ]
  },
  {
    id: "evt_defense_otan_ukraine",
    title: "Géopolitique & Défense : Pression alliée pour porter le budget militaire à 3% du PIB",
    category: "international",
    source: "État-Major des Armées / OTAN • 16:00",
    icon: "Globe",
    breakingNewsChyron: "RÉARMEMENT : L'ÉTAT-MAJOR RÉCLAME 10 MILLIARDS SUPPLÉMENTAIRES POUR LES ARMÉES",
    description: "Face aux menaces internationales et aux engagements auprès des alliés, la France doit accélérer la cadence de son économie de guerre.",
    choices: [
      {
        id: "defense_rearmement_massif",
        label: "Allouer 8 milliards d'euros supplémentaires à l'armée et aux commandes de Rafale",
        description: "Garantir le rang de grande puissance militaire et la dissuasion nucléaire française.",
        effects: {
          popularityDelta: 4,
          tensionDelta: 10,
          strikeRiskDelta: 10,
          costTreasury: 8,
          deficitDelta: 0.3,
          demographicsDelta: { cadres: 10, retraites: 10, populaires: -6, jeunesse: -8 },
          message: "L'industrie d'armement tourne à plein régime et les généraux saluent votre vision. La gauche dénonce de l'argent pris aux écoles et hôpitaux."
        }
      },
      {
        id: "defense_diplomatie_frein",
        label: "Refuser la hausse et privilégier une initiative diplomatique de cessez-le-feu",
        description: "Préserver les deniers publics et faire entendre la voix singulière et pacifique de la France.",
        effects: {
          popularityDelta: 2,
          tensionDelta: -5,
          strikeRiskDelta: -5,
          costTreasury: 0,
          demographicsDelta: { populaires: 6, jeunesse: 8, cadres: -8 },
          message: "Votre posture gaullienne d'équilibre est saluée par le tiers-monde, mais nos partenaires de l'OTAN doutent de la fiabilité française."
        }
      }
    ]
  },
  {
    id: "evt_deserts_medicaux",
    title: "Déserts Médicaux : Révolte des maires ruraux privés de médecins généralistes",
    category: "social",
    source: "Association des Maires de France • 10:30",
    icon: "HeartPulse",
    breakingNewsChyron: "SANTÉ RURALE : 6 MILLIONS DE FRANÇAIS SANS MÉDECIN TRAITANT, LES MAIRES EN COLÈRE",
    description: "Des territoires entiers deviennent des déserts médicaux pendant que les jeunes diplômés s'installent en bord de mer et dans les grandes métropoles.",
    choices: [
      {
        id: "deserts_obligation_installation",
        label: "Imposer 3 ans d'exercice obligatoire en zone rurale aux jeunes médecins",
        description: "Faire primer l'égal accès aux soins sur le confort d'installation libéral.",
        effects: {
          popularityDelta: 7,
          tensionDelta: 15,
          strikeRiskDelta: 15,
          costTreasury: 0,
          demographicsDelta: { rural: 22, populaires: 10, cadres: -14 },
          message: "Les campagnes et les élus locaux célèbrent une victoire historique. L'Ordre des médecins et les étudiants en médecine déclenchent une grève totale."
        }
      },
      {
        id: "deserts_prime_volontariat",
        label: "Créer un forfait d'installation de 100 000€ et défiscaliser les cabinets ruraux",
        description: "Inciter financièrement par le portefeuille sans violer la liberté d'installation des soignants.",
        effects: {
          popularityDelta: 3,
          tensionDelta: -5,
          strikeRiskDelta: -5,
          costTreasury: 3,
          deficitDelta: 0.1,
          demographicsDelta: { rural: 10, cadres: 6 },
          message: "L'Ordre des médecins approuve la méthode incitative. L'efficacité sur le terrain reste lente et la facture est payée par l'État."
        }
      }
    ]
  },
  {
    id: "evt_ia_reindustrialisation",
    title: "Tech & Souveraineté : Course mondiale aux méga-usines de semi-conducteurs et d'IA",
    category: "economique",
    source: "Bercy / Tech France • 14:40",
    icon: "Sparkles",
    breakingNewsChyron: "CHIPS ACT FRANÇAIS : UN PROJET DE GIGAFACTORY DE 15 MILLIARDS EN JEU FACE AUX USA",
    description: "Un consortium mondial hésite à installer son usine géante de puces d'intelligence artificielle en France ou en Allemagne.",
    choices: [
      {
        id: "ia_subvention_choc",
        label: "Accorder 6 milliards de subventions publiques et un tarif d'électricité garanti",
        description: "Gagner la bataille technologique du XXIe siècle et créer 10 000 emplois industriels.",
        effects: {
          popularityDelta: 5,
          tensionDelta: -5,
          strikeRiskDelta: -5,
          costTreasury: 6,
          deficitDelta: 0.2,
          demographicsDelta: { cadres: 15, populaires: 8, jeunesse: 10 },
          message: "Victoire industrielle majeure ! La France décroche la Gigafactory. L'Allemagne est furieuse et la note budgétaire est lourde."
        }
      },
      {
        id: "ia_refus_aides_publiques",
        label: "Refuser le chantage aux subventions et s'en remettre au marché libre",
        description: "Protéger l'argent du contribuable contre la surenchère des multinationales de la tech.",
        effects: {
          popularityDelta: -5,
          tensionDelta: 8,
          strikeRiskDelta: 8,
          costTreasury: 0,
          demographicsDelta: { cadres: -12, populaires: -4 },
          message: "L'usine part s'installer en Saxe. L'opposition fustige un décrochage technologique impardonnable de la France."
        }
      }
    ]
  },
  {
    id: "evt_autoroutes_concessions",
    title: "Fin des Concessions d'Autoroutes : Les géants du BTP réclament une prolongation",
    category: "economique",
    source: "Autorité de Régulation des Transports • 17:00",
    icon: "LineChart",
    breakingNewsChyron: "AUTOROUTES : BATAILLE JURIDIQUE ET FINANCIÈRE AUTOUR DES TARIFS DE PÉAGE",
    description: "Les contrats historiques des sociétés concessionnaires arrivent à échéance. Les usagers réclament la gratuité ou la baisse des péages.",
    choices: [
      {
        id: "autoroutes_renationalisation",
        label: "Reprendre les autoroutes dans le giron public et baisser les péages de 30%",
        description: "Redonner du pouvoir d'achat aux automobilistes et réaffirmer la propriété publique des infrastructures stratégiques.",
        effects: {
          popularityDelta: 8,
          tensionDelta: -15,
          strikeRiskDelta: -15,
          costTreasury: 8,
          deficitDelta: 0.2,
          demographicsDelta: { rural: 15, populaires: 14, cadres: -6 },
          message: "Triomphe chez les automobilistes et les transporteurs. Les banques et les majors du BTP attaquent l'État devant le Conseil constitutionnel."
        }
      },
      {
        id: "autoroutes_renouvellement_cash",
        label: "Renouveler les concessions contre un versement immédiat de 10 milliards d'euros",
        description: "Encaisser un chèque colossal pour renflouer les caisses de l'État et assainir la dette.",
        effects: {
          popularityDelta: -7,
          tensionDelta: 15,
          strikeRiskDelta: 15,
          revenueTreasury: 10,
          deficitDelta: -0.3,
          demographicsDelta: { populaires: -14, rural: -12, cadres: 4 },
          message: "Bercy respire grâce aux 10 milliards de recettes exceptionnelles. Les Français dénoncent une rente éternelle offerte aux actionnaires."
        }
      }
    ]
  }
];

const code = `import { GameEvent } from '../types/game';

export const GAME_EVENTS: GameEvent[] = ${JSON.stringify(EVENTS, null, 2)};
`;

fs.writeFileSync('src/data/events.ts', code, 'utf-8');
console.log('src/data/events.ts generated successfully with ' + EVENTS.length + ' highly balanced tradeoff events!');
