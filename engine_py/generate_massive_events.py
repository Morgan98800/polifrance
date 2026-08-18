import json
import os

def generate_massive_events():
    events = []

    scenarios = [
        # BERCY & ÉCONOMIE
        ("Dégradation imminente de la note souveraine par Moody's", "economique",
         "L'agence de notation menace d'abaisser la note de la France à cause du dérapage des finances publiques.",
         "Baisse d'urgence des dépenses de 15 milliards", "Rétablir une surtaxe exceptionnelle sur les super-riches", "Contester la méthode des agences et soutenir l'investissement"),
        ("Choc d'inflation sur les produits alimentaires du quotidien (+10%)", "economique",
         "Le panier moyen des ménages explose, créant une tension majeure sur le pouvoir d'achat.",
         "Chèque carburant et alimentation de 200€ pour les bas salaires", "Geler temporairement les marges des distributeurs", "Baisser la TVA à 5.5% sur les produits de base"),
        ("Menace de faillite d'un grand groupe industriel automobile", "economique",
         "18 000 emplois sont menacés sur 5 sites régionaux sans soutien public.",
         "Prise de participation temporaire de l'État au capital", "Accorder un prêt garanti par l'État de 2 milliards", "Laisser le marché opérer et financer la reconversion des salariés"),
        ("Hausse brutale des taux d'intérêt de la BCE : blocage immobilier", "economique",
         "L'accès au crédit des jeunes ménages s'effondre, plongeant le bâtiment dans la récession.",
         "Débloquer un super-prêt à taux zéro pour les primo-accédants", "Exonérer de droits de succession les dons pour achat immobilier", "Lancer un plan d'urgence de 50 000 logements sociaux"),
        ("Offensive d'un fonds souverain étranger sur une pépite française d'IA", "economique",
         "Une entreprise stratégique de cybersécurité et d'IA risque de passer sous pavillon étranger.",
         "Activer le décret sur les investissements stratégiques et bloquer la vente", "Bâtir un tour de table avec Bpifrance et des investisseurs européens", "Autoriser le rachat contre des garanties sur l'emploi en France"),
        ("Crise de liquidité bancaire européenne : panique sur le CAC 40", "economique",
         "La faillite d'une banque d'affaires étrangère fait chuter les cours de 8% en 48 heures.",
         "Déclaration solennelle de garantie totale des dépôts des épargnants", "Rehausser les exigences de fonds propres des banques françaises", "Créer un fonds de stabilisation souverain d'urgence"),
        ("Tensions sur la taxe numérique française : menaces douanières américaines", "economique",
         "Washington menace de taxer à 25% le vin et le luxe français si la taxe GAFA est maintenue.",
         "Maintenir fermement la taxe au nom de la souveraineté fiscale", "Négocier un accord d'harmonisation fiscale à l'OCDE", "Remplacer la taxe par une contribution carbone sur les serveurs"),
        ("Pénurie de main-d'œuvre dans les métiers en tension (BTP, restauration)", "economique",
         "450 000 emplois ne trouvent pas preneurs, bridant la croissance de 0.3%.",
         "Faciliter les régularisations de travailleurs étrangers qualifiés", "Augmenter les salaires de branche par la négociation obligatoire", "Doubler les primes d'apprentissage et de reconversion"),
        ("Dérapage du déficit de la Sécurité Sociale (Trou de la Sécu de 18 Mds)", "economique",
         "Les dépenses de santé et de médicaments dépassent les prévisions de la loi de financement.",
         "Augmenter les franchises médicales et lutter contre les abus", "Hausse ciblée de la CSG sur les revenus du patrimoine", "Plan d'économies drastique sur les dépenses administratives des caisses"),
        ("Désindustrialisation : fermeture annoncée d'une usine chimique dans le Nord", "economique",
         "Le groupe délocalise vers un pays à faible coût d'énergie, menaçant tout un bassin de vie.",
         "Imposer une pénalité financière exemplaire pour départ injustifié (Loi Florange renforcée)", "Racheter le site par la région pour créer une usine de batteries vertes", "Accompagner les salariés avec un plan de reclassement renforcé"),
        ("Pression sur le Smic : débat sur l'indexation et la trappe à bas salaires", "economique",
         "L'écart entre le Smic et les salaires moyens se réduit, créant un sentiment de déclassement.",
         "Revalorisation exceptionnelle du Smic de 5%", "Désmicardiser les grilles en baissant les charges sur les salaires médians", "Mettre en place un chèque travail pour récompenser l'effort"),
        ("Crise du modèle agricole : surcoût des engrais et concurrence internationale", "economique",
         "Les éleveurs et céréaliers dénoncent des marges négatives et un revenu moyen indigne.",
         "Garantir un prix plancher d'achat aux producteurs agricoles", "Plan d'allègement fiscal sur les carburants non routiers", "Accélérer la transition vers le bio avec des subventions directes"),

        # MATIGNON, TRAVAIL & SOCIAL
        ("Appel à la grève générale de l'Intersyndicale contre la politique salariale", "social",
         "Les principaux syndicats de salariés s'unissent pour une journée 'France à l'arrêt'.",
         "Ouvrir une grande conférence sociale à Matignon", "Adopter la fermeté et garantir la liberté de travail", "Proposer une prime de pouvoir d'achat défiscalisée"),
        ("Urgences hospitalières en grève : burn-out et démissions massives", "social",
         "Le personnel soignant dénonce l'épuisement général et la dégradation des soins.",
         "Plan Marshall de 4 milliards pour l'hôpital et hausse des primes de garde", "Obligation d'installation des médecins dans les zones sous-dotées", "Débureaucratiser les hôpitaux en redonnant le pouvoir aux médecins"),
        ("Blocage des raffineries et dépôts de carburant : stations à sec", "social",
         "Les grévistes bloquent 6 raffineries sur 8, menaçant la France de paralysie en 4 jours.",
         "Réquisitionner les salariés grévistes par arrêté préfectoral", "Négocier en urgence une prime exceptionnelle de partage de la valeur", "Ouvrir les stocks stratégiques de carburant de l'État"),
        ("Mouvement étudiant : blocage des universités contre la précarité", "social",
         "Les assemblées générales étudiantes réclament le repas à 1€ pour tous et le gel des loyers du Crous.",
         "Généraliser le repas à 1€ et revaloriser les bourses étudiantes de 10%", "Proposer une allocation universelle d'autonomie pour les 18-25 ans", "Faire évacuer les campus pour garantir la tenue des examens"),
        ("Crise des retraites complémentaires : négociation tendue entre partenaires sociaux", "social",
         "Les syndicats et le patronat s'affrontent sur la revalorisation des pensions de 14 millions de retraités.",
         "Laisser la négociation autonome aux partenaires sociaux", "Fixer par la loi une revalorisation minimale égale à l'inflation", "Proposer une incitation fiscale pour l'épargne retraite individuelle"),
        ("Pénurie aiguë de soignants et d'aides à domicile pour les personnes âgées", "social",
         "Le secteur du grand âge peine à recruter face à la dépendance croissante de la population.",
         "Revaloriser de 15% les grilles indiciaires des métiers du grand âge", "Créer un statut d'aidant familial indemnisé par la solidarité nationale", "Financer la modernisation des EHPAD publics"),
        ("Tensions sur la réforme de l'assurance-chômage", "social",
         "Le durcissement des critères d'indemnisation provoque la colère des syndicats.",
         "Maintenir la réforme pour inciter au retour à l'emploi", "Aménager des critères plus souples pour les seniors et saisonniers", "Remplacer les sanctions par un accompagnement personnalisé renforcé"),
        ("Crise du logement : hausse explosive du nombre de sans-abri dans les métropoles", "social",
         "Les associations humanitaires alertent sur la saturation complète du 115 à l'approche de l'hiver.",
         "Réquisitionner les bâtiments et bureaux vacants pour l'hébergement d'urgence", "Créer 20 000 places pérennes de 'Logement d'Abord'", "Renforcer le budget des associations caritatives de terrain"),

        # BEAUVAU, SÉCURITÉ & JUSTICE
        ("Nuit d'émeutes urbaines après un contrôle de police tragique", "securite",
         "Des commissariats et mairies sont pris pour cible dans plusieurs banlieues.",
         "Décréter l'état d'urgence local et mobiliser la CRS 8 et le RAID", "Appel solennel au calme et saisine immédiate de l'IGPN", "Lancer un plan de médiateurs et d'activités pour la jeunesse"),
        ("Fusillade liée au narcotrafic à Marseille : victimes collatérales", "securite",
         "Une guerre de territoire entre cartels endeuille un quartier populaire.",
         "Créer une brigade spéciale permanente anti-narcotrafic avec l'armée", "Durcir les peines pour les guetteurs et dealers de points de vente", "Lancer un plan de saisie intégrale des patrimoines criminels"),
        ("Surpopulation carcérale critique : taux d'occupation à 140%", "securite",
         "Les gardiens de prison bloquent les établissements pour dénoncer l'insécurité.",
         "Construire en urgence 10 000 places de détention modulaires", "Développer le bracelet électronique et les travaux d'intérêt général", "Mettre en place un mécanisme légal de régulation carcérale"),
        ("Cyberattaque majeure contre les systèmes de 12 centres hospitaliers", "securite",
         "Des pirates bloquent les urgences et exigent 5 millions d'euros de rançon.",
         "Refus absolu de payer et déploiement des cyber-commandos de l'ANSSI", "Fonds d'urgence de 300M€ pour blinder les réseaux de santé", "Riposte cybernétique officielle contre les infrastructures des pirates"),
        ("Violence chez les mineurs : rixe mortelle entre bandes rivales", "securite",
         "L'opinion publique est sous le choc après la mort d'un adolescent de 14 ans.",
         "Abaisser la majorité pénale à 16 ans et peines planchers", "Créer des internats éducatifs fermés d'urgence", "Rendre les parents pénalement et financièrement responsables"),
        ("Menace terroriste : alerte maximale sur les transports parisiens", "securite",
         "Les services de renseignement déjouent un projet d'action violente concertée.",
         "Relever le plan Vigipirate au niveau Urgence Attentat", "Déployer 7 000 militaires de l'opération Sentinelle", "Généraliser la vidéosurveillance avec IA algorithmique"),
        ("Affrontements violents entre militants radicaux et forces de l'ordre à Sainte-Soline", "securite",
         "Des heurts éclatent autour d'un projet d'aménagement contesté.",
         "Dissoudre les groupements violents par décret en Conseil des ministres", "Mettre en place un moratoire sur les chantiers litigieux", "Ouvrir une enquête parlementaire sur le maintien de l'ordre"),
        ("Afflux migratoire exceptionnel aux frontières alpines et maritimes", "securite",
         "Les centres d'accueil sont débordés par l'arrivée simultanée de 3 000 demandeurs d'asile.",
         "Rétablir des contrôles systématiques aux frontières intérieures", "Accélérer le traitement des demandes d'asile en 15 jours", "Négocier des accords de réadmission avec les pays d'origine"),

        # ÉNERGIE, ÉCOLOGIE & TERRITOIRES
        ("Projet de construction de 6 réacteurs nucléaires EPR 2 : vote décisif", "environnement",
         "Le Parlement doit trancher sur la relance nucléaire face aux collectifs écologistes.",
         "Accélérer les procédures pour lancer les chantiers sans délai", "Conditionner le nucléaire à un investissement équivalent dans le renouvelable", "Soumettre le choix énergétique de la France à un référendum"),
        ("Sécheresse historique : conflit d'usage de l'eau entre villes et agriculture", "environnement",
         "Les nappes phréatiques sont au plus bas dans 75 départements.",
         "Financer un réseau de retenues collinaires et de méga-bassines", "Tarification progressive de l'eau avec gratuité des premiers volumes vitaux", "Priorité stricte à l'eau potable et interdiction des arrosages intensifs"),
        ("Flambée des cours de l'électricité : l'industrie française étouffée", "environnement",
         "Le mécanisme européen indexé sur le gaz fait exploser les factures d'usines.",
         "Sortir unilatéralement du marché européen pour appliquer le coût réel du nucléaire", "Négocier une dérogation d'urgence avec la Commission européenne", "Mettre en place un bouclier tarifaire d'État temporaire"),
        ("Incendies monstres dans les Landes : 40 000 hectares menacés", "environnement",
         "Les pompiers luttent contre des brasiers historiques attisés par la canicule.",
         "Commander immédiatement 12 nouveaux avions bombardiers d'eau Canadair", "Interdire l'accès à tous les massifs forestiers et peines maximales pour pyromanie", "Grand plan de reboisement avec des espèces résilientes au climat"),
        ("Débat explosif sur l'interdiction des passoires thermiques (Diagnostic DPE)", "environnement",
         "500 000 logements risquent d'être interdits à la location, aggravant la crise du logement.",
         "Repousser de 3 ans le calendrier des interdictions pour donner du temps aux propriétaires", "Multiplier par deux le budget de MaPrimeRénov pour les ménages modestes", "Simplifier drastiquement les règles du calcul DPE"),
        ("Colère des automobilistes contre les Zones à Faibles Émissions (ZFE)", "environnement",
         "L'interdiction des vieux véhicules diesel pénalise les travailleurs périurbains.",
         "Suspendre les ZFE tant que le parc de véhicules électriques n'est pas accessible", "Lancer un leasing social à 50€/mois pour les travailleurs modestes", "Instaurer des aides régionales massives pour le rétrofit des véhicules"),
        ("Pollution aux polluants éternels (PFAS) dans l'eau potable : scandale sanitaire", "environnement",
         "Des analyses révèlent des concentrations toxiques dans l'eau de plusieurs millions d'habitants.",
         "Interdire immédiatement tous les PFAS non essentiels par la loi", "Obliger les industriels pollueurs à financer les usines de dépollution", "Mettre en place un suivi médical gratuit des populations exposées"),

        # EUROPE & GÉOPOLITIQUE
        ("Ultimatum commercial de l'Union Européenne sur le traité Mercosur", "international",
         "Bruxelles veut signer l'accord de libre-échange malgré l'opposition des agriculteurs français.",
         "Opposer un veto français irrévocable au Conseil européen", "Exiger des clauses miroirs sanitaires et environnementales strictes", "Créer un fonds de sauvegarde de 3 milliards d'euros pour les filières agricoles"),
        ("Guerre en Europe de l'Est : vote d'une aide militaire d'urgence de 3 milliards", "international",
         "Le gouvernement doit arbitrer sur la livraison de missiles et de chars lourds.",
         "Livrer les équipements sans restriction pour défendre le droit international", "Privilégier une aide financière et humanitaire sans dégarnir les armées françaises", "Appeler à l'ouverture immédiate de pourparlers de paix sous égide de l'ONU"),
        ("Sommet Franco-Allemand tendu : désaccord sur le bouclier spatial européen", "international",
         "Berlin privilégie du matériel américain, Paris défend la souveraineté européenne.",
         "Affirmer l'autonomie stratégique française et lancer notre propre filière", "Proposer un compromis industriel 50/50 avec l'Allemagne", "Construire une nouvelle alliance de défense avec l'Italie et le Royaume-Uni"),
        ("Crise diplomatique en Afrique : expulsion des troupes et diplomates français", "international",
         "Une junte militaire exige le départ immédiat des forces armées françaises du Sahel.",
         "Organiser le retrait ordonné et redéployer le dispositif au golfe de Guinée", "Suspendre l'ensemble des aides au développement et accords de coopération", "Maintenir une présence diplomatique minimale pour protéger les ressortissants"),
        ("Sommet de l'OTAN : débat sur l'augmentation du budget de défense à 3% du PIB", "international",
         "Les alliés font pression sur la France pour augmenter drastiquement ses dépenses militaires.",
         "Porter le budget de la défense à 3% du PIB d'ici 2030", "Maintenir le cap de la Loi de Programmation Militaire actuelle à 2.2%", "Financer l'effort de défense par un grand emprunt européen commun"),

        # PALAIS DE L'ÉLYSÉE, PARLEMENT & AFFAIRES
        ("Dépôt d'une Motion de Censure transpartisane à l'Assemblée Nationale", "politique",
         "Les groupes d'opposition s'unissent pour tenter de renverser le gouvernement après un vote serré.",
         "Négocier d'urgence des concessions avec les députés centristes et indépendants", "Brandir la menace d'une dissolution immédiate de l'Assemblée nationale", "Proposer un remaniement d'ouverture avec entrée de l'opposition au gouvernement"),
        ("Mise en cause judiciaire d'un ministre régalien de premier plan", "politique",
         "La presse révèle une enquête préliminaire pour prise illégale d'intérêts.",
         "Exiger la démission immédiate du ministre par souci d'exemplarité", "Maintenir le ministre en fonctions au nom de la présomption d'innocence", "Confier temporairement le portefeuille au Premier ministre"),
        ("Pétition citoyenne record pour un Référendum d'Initiative Partagée (RIP)", "politique",
         "4,5 millions de citoyens demandent un vote sur l'âge légal de la retraite.",
         "Organiser loyalement le référendum national et respecter le verdict", "Renvoyer le texte au Parlement pour un débat approfondi", "Déclarer la proposition contraire aux équilibres budgétaires de l'État"),
        ("Crise de gouvernance : désaccord public majeur entre l'Élysée et Matignon", "politique",
         "Le Premier ministre contredit la ligne présidentielle dans une interview au 20h.",
         "Mettre fin aux fonctions du Premier ministre et remanier le gouvernement", "Recadrer fermement le Premier ministre en tête-à-tête et afficher l'unité", "Assumer un débat démocratique au sommet de l'État"),
        ("Fuite de notes stratégiques de défense sur les réseaux sociaux", "politique",
         "Des documents confidentiels sur les faiblesses énergétiques de la France sont divulgués.",
         "Saisir la justice militaire et lancer un audit de sécurité à l'Élysée", "Publier une version transparente du rapport pour couper court aux rumeurs", "Dénoncer une manœuvre de déstabilisation d'une puissance étrangère")
    ]

    event_id = 1
    for title, cat, desc, c1, c2, c3 in scenarios:
        ev_id = f"evt_poly_{event_id:03d}"
        event_id += 1

        if cat == 'economique':
            eff1 = {"popularityDelta": 3, "deficitDelta": -0.5, "tensionDelta": 10, "strikeRiskDelta": 15, "demographicsDelta": {"cadres": 8, "populaires": -6}}
            eff2 = {"popularityDelta": 5, "deficitDelta": -0.2, "tensionDelta": -10, "strikeRiskDelta": -10, "demographicsDelta": {"populaires": 12, "cadres": -6}}
            eff3 = {"popularityDelta": 2, "deficitDelta": 0.2, "tensionDelta": -5, "strikeRiskDelta": -5, "demographicsDelta": {"populaires": 6, "rural": 6}}
        elif cat == 'social':
            eff1 = {"popularityDelta": 5, "deficitDelta": 0.3, "tensionDelta": -20, "strikeRiskDelta": -25, "demographicsDelta": {"populaires": 14, "fonctionnaires": 12}}
            eff2 = {"popularityDelta": -2, "deficitDelta": 0.0, "tensionDelta": 25, "strikeRiskDelta": 30, "demographicsDelta": {"cadres": 10, "populaires": -12}}
            eff3 = {"popularityDelta": 3, "deficitDelta": 0.1, "tensionDelta": -10, "strikeRiskDelta": -15, "demographicsDelta": {"cadres": 6, "fonctionnaires": 6}}
        elif cat == 'securite':
            eff1 = {"popularityDelta": 5, "deficitDelta": 0.1, "tensionDelta": 10, "strikeRiskDelta": 10, "demographicsDelta": {"retraites": 14, "rural": 12, "jeunesse": -8}}
            eff2 = {"popularityDelta": 2, "deficitDelta": 0.0, "tensionDelta": -15, "strikeRiskDelta": -15, "demographicsDelta": {"jeunesse": 10, "cadres": 4}}
            eff3 = {"popularityDelta": 4, "deficitDelta": -0.1, "tensionDelta": -5, "strikeRiskDelta": -5, "demographicsDelta": {"cadres": 8, "rural": 8}}
        elif cat == 'environnement':
            eff1 = {"popularityDelta": 4, "deficitDelta": 0.2, "tensionDelta": -10, "strikeRiskDelta": -10, "demographicsDelta": {"rural": 12, "cadres": -4}}
            eff2 = {"popularityDelta": 6, "deficitDelta": -0.1, "tensionDelta": -15, "strikeRiskDelta": -15, "demographicsDelta": {"jeunesse": 14, "populaires": 8}}
            eff3 = {"popularityDelta": 1, "deficitDelta": -0.3, "tensionDelta": 15, "strikeRiskDelta": 20, "demographicsDelta": {"cadres": 8, "rural": -10}}
        elif cat == 'international':
            eff1 = {"popularityDelta": 6, "deficitDelta": 0.1, "tensionDelta": -5, "strikeRiskDelta": -5, "demographicsDelta": {"rural": 12, "populaires": 10}}
            eff2 = {"popularityDelta": 3, "deficitDelta": -0.2, "tensionDelta": 5, "strikeRiskDelta": 5, "demographicsDelta": {"cadres": 10, "jeunesse": 6}}
            eff3 = {"popularityDelta": 4, "deficitDelta": 0.3, "tensionDelta": 0, "strikeRiskDelta": 0, "demographicsDelta": {"cadres": 6, "rural": 6}}
        else: # politique
            eff1 = {"popularityDelta": 5, "deficitDelta": 0.0, "tensionDelta": -10, "strikeRiskDelta": -10, "demographicsDelta": {"cadres": 8, "retraites": 8}}
            eff2 = {"popularityDelta": -4, "deficitDelta": 0.0, "tensionDelta": 20, "strikeRiskDelta": 25, "demographicsDelta": {"populaires": -10, "jeunesse": -8}}
            eff3 = {"popularityDelta": 4, "deficitDelta": 0.1, "tensionDelta": -5, "strikeRiskDelta": -5, "demographicsDelta": {"cadres": 6, "fonctionnaires": 6}}

        events.append({
            "id": ev_id,
            "title": title,
            "category": cat,
            "source": "Palais de l'Élysée & Ministères",
            "icon": "FileText",
            "breakingNewsChyron": f"ÉLYSÉE EN DIRECT : {title.upper()}",
            "description": desc,
            "choices": [
                {
                    "id": f"{ev_id}_c1",
                    "label": c1,
                    "description": "Option A : Premier arbitrage républicain.",
                    "effects": {**eff1, "message": f"Votre décret (« {c1} ») est promulgué au Journal Officiel."}
                },
                {
                    "id": f"{ev_id}_c2",
                    "label": c2,
                    "description": "Option B : Deuxième voie d'action stratégique.",
                    "effects": {**eff2, "message": f"Votre décision (« {c2} ») entre en application immédiate."}
                },
                {
                    "id": f"{ev_id}_c3",
                    "label": c3,
                    "description": "Option C : Troisième arbitrage du Conseil des ministres.",
                    "effects": {**eff3, "message": f"Votre arbitrage (« {c3} ») a été publié au Conseil des ministres."}
                }
            ]
        })

    return events

if __name__ == '__main__':
    all_events = generate_massive_events()
    print(f"Generated {len(all_events)} massive political events!")
    
    # Save into TypeScript source directly
    ts_content = f"""import {{ GameEvent }} from '../types/game';

export const GAME_EVENTS: GameEvent[] = {json.dumps(all_events, ensure_ascii=False, indent=2)};
"""
    with open('src/data/events.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)
    print("Wrote successfully to src/data/events.ts")
