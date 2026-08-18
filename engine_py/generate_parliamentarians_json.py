"""
Script de génération exhaustive des 577 Députés et 348 Sénateurs français
avec attribution territoriale exacte, calibration politique et lobbys locaux ciblés.
"""

import json
import random
from typing import List, Dict, Any

# 1. Base des départements français et nombre de circonscriptions législatives (Total = 577)
DEPARTEMENTS_DEPUTES = [
    ("Ain", "01", 5, "rural_industriel"),
    ("Aisne", "02", 5, "rural_ouvrier"),
    ("Allier", "03", 3, "rural_agricole"),
    ("Alpes-de-Haute-Provence", "04", 2, "rural_tourisme"),
    ("Hautes-Alpes", "05", 2, "montagne_tourisme"),
    ("Alpes-Maritimes", "06", 9, "cote_azur_retraites"),
    ("Ardèche", "07", 3, "rural_artisanal"),
    ("Ardennes", "08", 3, "industriel_ouvrier"),
    ("Ariège", "09", 2, "pyrenees_rural"),
    ("Aube", "10", 3, "viticulture_champagne"),
    ("Aude", "11", 3, "viticulture_mediterranee"),
    ("Aveyron", "12", 3, "elevage_agricole"),
    ("Bouches-du-Rhône", "13", 16, "metropole_portuaire_populaire"),
    ("Calvados", "14", 6, "normandie_mixte"),
    ("Cantal", "15", 2, "elevage_massif_central"),
    ("Charente", "16", 3, "cognac_industrie"),
    ("Charente-Maritime", "17", 5, "littoral_tourisme_peche"),
    ("Cher", "18", 3, "centre_rural_defense"),
    ("Corrèze", "19", 2, "rural_territoires"),
    ("Corse-du-Sud", "2A", 2, "corse_tourisme_territoire"),
    ("Haute-Corse", "2B", 2, "corse_rural_maritime"),
    ("Côte-d'Or", "21", 5, "vins_bourgogne_metropole"),
    ("Côtes-d'Armor", "22", 5, "bretagne_agroalimentaire"),
    ("Creuse", "23", 1, "rural_ultra_agricole"),
    ("Dordogne", "24", 4, "tourisme_foie_gras_rural"),
    ("Doubs", "25", 5, "industrie_automobile_horlogerie"),
    ("Drôme", "26", 4, "vallee_rhone_nucleaire_bio"),
    ("Eure", "27", 5, "normandie_periurbain"),
    ("Eure-et-Loir", "28", 4, "grandes_cultures_cereales"),
    ("Finistère", "29", 8, "peche_maritime_agroalimentaire"),
    ("Gard", "30", 6, "viticulture_periurbain"),
    ("Haute-Garonne", "31", 10, "aeronautique_toulouse_tech"),
    ("Gers", "32", 2, "gastronomie_canard_rural"),
    ("Gironde", "33", 12, "bordeaux_vins_aero_metropole"),
    ("Hérault", "34", 9, "littoral_etudiants_tourisme"),
    ("Ille-et-Vilaine", "35", 8, "rennes_tech_agri_bretagne"),
    ("Indre", "36", 2, "berry_cereales_rural"),
    ("Indre-et-Loire", "37", 5, "chateaux_tourisme_tours"),
    ("Isère", "38", 10, "grenoble_semiconducteurs_alpes"),
    ("Jura", "39", 3, "bois_comte_jurassien"),
    ("Landes", "40", 3, "foret_bois_tourisme_sud_ouest"),
    ("Loir-et-Cher", "41", 3, "sologne_chasse_cereales"),
    ("Loire", "42", 6, "industrie_mecanique_forez"),
    ("Haute-Loire", "43", 2, "massif_central_rural"),
    ("Loire-Atlantique", "44", 10, "nantes_naval_aeronautique"),
    ("Loiret", "45", 6, "cosmetic_valley_logistique"),
    ("Lot", "46", 2, "vallee_lot_patrimoine"),
    ("Lot-et-Garonne", "47", 3, "fruits_legumes_pruneaux"),
    ("Lozère", "48", 1, "ruralite_pastoralisme"),
    ("Maine-et-Loire", "49", 7, "horticulture_vignobles_anjou"),
    ("Manche", "50", 4, "nucleaire_cotentin_peche"),
    ("Marne", "51", 5, "champagne_vins_cereales"),
    ("Haute-Marne", "52", 2, "forges_metallurgie_rural"),
    ("Mayenne", "53", 3, "laitier_elevage_pme"),
    ("Meurthe-et-Moselle", "54", 6, "lorraine_industrie_sante"),
    ("Meuse", "55", 2, "rural_nucleaire_bure"),
    ("Morbihan", "56", 6, "golfe_peche_agro_breton"),
    ("Moselle", "57", 9, "industrie_frontaliers_luxembourg"),
    ("Nièvre", "58", 2, "morvan_bois_elevage"),
    ("Nord", "59", 21, "hauts_de_france_ouvrier_metropole"),
    ("Oise", "60", 7, "periurbain_logistique_industrie"),
    ("Orne", "61", 3, "haras_cheval_agricole"),
    ("Pas-de-Calais", "62", 12, "bassin_minier_littoral"),
    ("Puy-de-Dôme", "63", 5, "michelin_industrie_clermont"),
    ("Pyrénées-Atlantiques", "64", 6, "aeronautique_basque_bearn"),
    ("Hautes-Pyrénées", "65", 2, "pelerinage_lourdes_montagne"),
    ("Pyrénées-Orientales", "66", 4, "maraichage_transfrontalier"),
    ("Bas-Rhin", "67", 9, "strasbourg_europe_alsace"),
    ("Haut-Rhin", "68", 6, "mulhouse_frontaliers_industrie"),
    ("Rhône", "69", 14, "lyon_chimie_pharma_tech"),
    ("Haute-Saône", "70", 2, "rural_artisanal_bois"),
    ("Saône-et-Loire", "71", 5, "vins_charolais_industrie"),
    ("Sarthe", "72", 5, "automobile_mutuelles_agri"),
    ("Savoie", "73", 4, "stations_ski_hydroelectrique"),
    ("Haute-Savoie", "74", 6, "decolletage_frontaliers_suisse"),
    ("Paris", "75", 18, "capitale_finance_cadres_services"),
    ("Seine-Maritime", "76", 10, "ports_le_havre_chimie_rouen"),
    ("Seine-et-Marne", "77", 11, "disneyland_cereales_periurbain"),
    ("Yvelines", "78", 12, "automobile_defense_cadres_versaillais"),
    ("Deux-Sèvres", "79", 3, "mutuelles_niort_marais_poitevin"),
    ("Somme", "80", 5, "baie_somme_industrie_vallee"),
    ("Tarn", "81", 3, "textile_rural_albi"),
    ("Tarn-et-Garonne", "82", 2, "arboriculture_montauban"),
    ("Var", "83", 8, "base_navale_toulon_tourisme_var"),
    ("Vaucluse", "84", 5, "maraichage_avignon_vins"),
    ("Vendée", "85", 5, "puy_du_fou_agro_entreprises"),
    ("Vienne", "86", 4, "futuroscope_poitiers_rural"),
    ("Haute-Vienne", "87", 3, "porcelaine_limoges_bois"),
    ("Vosges", "88", 4, "papeterie_bois_thermalisme"),
    ("Yonne", "89", 3, "chablis_cereales_bourgogne"),
    ("Territoire de Belfort", "90", 2, "alstom_ge_energie_ferroviaire"),
    ("Essonne", "91", 10, "saclay_recherche_evry_banlieue"),
    ("Hauts-de-Seine", "92", 13, "la_defense_finance_medias"),
    ("Seine-Saint-Denis", "93", 12, "banlieues_populaires_stade_france"),
    ("Val-de-Marne", "94", 11, "rungis_hopitaux_metropole"),
    ("Val-d'Oise", "95", 10, "aeroport_roissy_periurbain"),
    ("Guadeloupe", "971", 4, "outremer_sucre_banane_tourisme"),
    ("Martinique", "972", 4, "outremer_rhum_banane_services"),
    ("Guyane", "973", 2, "centre_spatial_kourou_foret"),
    ("La Réunion", "974", 7, "outremer_sucre_energie_jeunesse"),
    ("Mayotte", "976", 2, "outremer_pression_migratoire"),
    ("Nouvelle-Calédonie", "988", 2, "nickel_mines_accords_noumea"),
    ("Polynésie française", "987", 3, "tourisme_perles_peche"),
    ("Saint-Pierre-et-Miquelon", "975", 1, "peche_atlantique_nord"),
    ("Saint-Barthélemy et Saint-Martin", "977", 1, "tourisme_luxe_maritime"),
    ("Wallis-et-Futuna", "986", 1, "coutumes_pacifique"),
    ("Français établis hors de France", "99", 11, "expatriés_diplomatie_consulaire")
]

# 2. Répartition réelle des sièges au Sénat par département (Total = 348)
DEPARTEMENTS_SENATEURS = [
    ("Ain", 3), ("Aisne", 3), ("Allier", 2), ("Alpes-de-Haute-Provence", 1), ("Hautes-Alpes", 1),
    ("Alpes-Maritimes", 5), ("Ardèche", 2), ("Ardennes", 2), ("Ariège", 1), ("Aube", 2),
    ("Aude", 2), ("Aveyron", 2), ("Bouches-du-Rhône", 8), ("Calvados", 3), ("Cantal", 2),
    ("Charente", 2), ("Charente-Maritime", 3), ("Cher", 2), ("Corrèze", 2), ("Corse-du-Sud", 1),
    ("Haute-Corse", 1), ("Côte-d'Or", 3), ("Côtes-d'Armor", 3), ("Creuse", 1), ("Dordogne", 2),
    ("Doubs", 3), ("Drôme", 3), ("Eure", 3), ("Eure-et-Loir", 3), ("Finistère", 4),
    ("Gard", 3), ("Haute-Garonne", 5), ("Gers", 2), ("Gironde", 6), ("Hérault", 4),
    ("Ille-et-Vilaine", 4), ("Indre", 2), ("Indre-et-Loire", 3), ("Isère", 5), ("Jura", 2),
    ("Landes", 2), ("Loir-et-Cher", 2), ("Loire", 4), ("Haute-Loire", 2), ("Loire-Atlantique", 5),
    ("Loiret", 3), ("Lot", 2), ("Lot-et-Garonne", 2), ("Lozère", 1), ("Maine-et-Loire", 4),
    ("Manche", 3), ("Marne", 3), ("Haute-Marne", 2), ("Mayenne", 2), ("Meurthe-et-Moselle", 4),
    ("Meuse", 2), ("Morbihan", 3), ("Moselle", 5), ("Nièvre", 2), ("Nord", 11),
    ("Oise", 4), ("Orne", 2), ("Pas-de-Calais", 7), ("Puy-de-Dôme", 3), ("Pyrénées-Atlantiques", 3),
    ("Hautes-Pyrénées", 2), ("Pyrénées-Orientales", 2), ("Bas-Rhin", 5), ("Haut-Rhin", 4), ("Rhône", 7),
    ("Haute-Saône", 2), ("Saône-et-Loire", 3), ("Sarthe", 3), ("Savoie", 2), ("Haute-Savoie", 3),
    ("Paris", 12), ("Seine-Maritime", 6), ("Seine-et-Marne", 6), ("Yvelines", 6), ("Deux-Sèvres", 2),
    ("Somme", 3), ("Tarn", 2), ("Tarn-et-Garonne", 2), ("Var", 5), ("Vaucluse", 3),
    ("Vendée", 3), ("Vienne", 2), ("Haute-Vienne", 2), ("Vosges", 2), ("Yonne", 2),
    ("Territoire de Belfort", 1), ("Essonne", 5), ("Hauts-de-Seine", 7), ("Seine-Saint-Denis", 6),
    ("Val-de-Marne", 6), ("Val-d'Oise", 5), ("Guadeloupe", 3), ("Martinique", 2), ("Guyane", 2),
    ("La Réunion", 4), ("Mayotte", 2), ("Nouvelle-Calédonie", 2), ("Polynésie française", 2),
    ("Saint-Barthélemy", 1), ("Saint-Martin", 1), ("Saint-Pierre-et-Miquelon", 1), ("Wallis-et-Futuna", 1),
    ("Français établis hors de France", 12)
]

# Noms et prénoms réalistes
PRENOMS_HOMMES = [
    "Jean", "Pierre", "Michel", "Philippe", "Laurent", "Alexandre", "Nicolas", "Julien",
    "Stéphane", "Christophe", "Frédéric", "David", "Guillaume", "Antoine", "Thomas", "Éric",
    "Sébastien", "Maxime", "Olivier", "Jérôme", "Marc", "François", "Arnaud", "Vincent"
]
PRENOMS_FEMMES = [
    "Marie", "Sophie", "Isabelle", "Camille", "Valérie", "Nathalie", "Céline", "Aurélie",
    "Sandrine", "Élodie", "Hélène", "Anne", "Julie", "Laurence", "Caroline", "Virginie",
    "Delphine", "Florence", "Patricia", "Christine", "Emmanuelle", "Aurore", "Clémence"
]
NOMS_FAMILLE = [
    "Martin", "Bernard", "Thomas", "Petit", "Robert", "Richard", "Durand", "Dubois",
    "Moreau", "Laurent", "Simon", "Michel", "Lefebvre", "Leroy", "Roux", "David",
    "Bertrand", "Morel", "Fournier", "Girard", "Bonnet", "Dupont", "Lambert", "Fontaine",
    "Rousseau", "Vincent", "Muller", "Faure", "Andre", "Mercier", "Blanc", "Guerin",
    "Boyer", "Garnier", "Chevalier", "Francois", "Legrand", "Gauthier", "Garcia", "Perrin",
    "Robin", "Clement", "Morin", "Nicolas", "Henry", "Roussel", "Mathieu", "Gautier", "Masson"
]

# Dictionnaire de lobbys thématiques par profil de circonscription
LOBBYS_PAR_PROFIL = {
    "rural_agricole": ["FNSEA / Jeunes Agriculteurs", "Fédération des Chasseurs", "Coopératives céréalières"],
    "rural_industriel": ["Plasturgie / PME Locales", "Fédération Nationale Bovine", "Artisans du BTP"],
    "rural_ouvrier": ["Syndicats Métallurgie", "Coordination Rurale", "Fédération des Chasseurs"],
    "rural_tourisme": ["Fédération de l'Hôtellerie / Plein Air", "Éleveurs Ovins / Loup", "Artisans Ruraux"],
    "montagne_tourisme": ["Domaines Skiables de France", "Éleveurs de Montagne", "Guides & Moniteurs de Ski"],
    "cote_azur_retraites": ["Immobilier / BTP Côte d'Azur", "Fédération des Commerçants", "Association Retraités"],
    "rural_artisanal": ["Chambre des Métiers & de l'Artisanat", "Syndicats Forestiers", "Éleveurs Caprins"],
    "industriel_ouvrier": ["UIMM (Métallurgie)", "CGT / CFDT Industrie", "Automobile Sous-traitance"],
    "pyrenees_rural": ["Pastoralisme Pyrénéen", "Filière Hydroélectricité", "Chasse & Pêche"],
    "viticulture_champagne": ["Union des Maisons de Champagne", "Vignerons Indépendants", "FNSEA"],
    "viticulture_mediterranee": ["Syndicat des Vins du Sud", "FDSEA", "Coopératives Vinicoles"],
    "elevage_agricole": ["Fédération Nationale Bovine", "Interbev (Viande)", "Chasseurs & Ruralité"],
    "metropole_portuaire_populaire": ["Grand Port Maritime", "Dockers / CGT Ports", "Logistique & Fret"],
    "normandie_mixte": ["Filière Laitière Normande", "Industrie Navale", "Tourisme Balnéaire"],
    "elevage_massif_central": ["Fédération Nationale Bovine", "Fromages AOP d'Auvergne", "Élus Ruraux"],
    "cognac_industrie": ["Bureau National Interprofessionnel du Cognac", "Charente BTP", "Vignerons"],
    "littoral_tourisme_peche": ["Comité National des Pêches", "Ostréiculture & Conchyliculture", "Hôtellerie Littorale"],
    "centre_rural_defense": ["Nexter / Industrie Armement", "Céréaliers de France", "Forêt & Chasse"],
    "corse_tourisme_territoire": ["Syndicat Hôtelier Corse", "Agriculteurs / Éleveurs Porcins", "BTP Insulaire"],
    "vins_bourgogne_metropole": ["BIVB (Vins de Bourgogne)", "Chambre de Commerce Dijon", "Agro-Industrie"],
    "bretagne_agroalimentaire": ["Industrie Agroalimentaire Bretonne", "Fédération Porcine", "Pêche Maritime"],
    "rural_ultra_agricole": ["Éleveurs Charolais & Limousins", "Maires Ruraux de France", "Coordination Rurale"],
    "tourisme_foie_gras_rural": ["Filière Palmipèdes Gras", "Fédération Tourisme Dordogne", "Artisans du Patrimoine"],
    "industrie_automobile_horlogerie": ["Stellantis / Sous-traitants Auto", "Horlogerie & Microtechniques", "UIMM"],
    "vallee_rhone_nucleaire_bio": ["Filière Nucléaire EDF (Tricastin)", "Agro-écologie & Vins Côtes du Rhône", "Chimie"],
    "aeronautique_toulouse_tech": ["Airbus & Supply Chain Aéro", "Tech / IA Aerospace Valley", "Syntec Numérique"],
    "bordeaux_vins_aero_metropole": ["CIVB (Vins de Bordeaux)", "Dassault / ArianeGroup", "Medef Gironde"],
    "rennes_tech_agri_bretagne": ["Pôle Numérique Bretagne", "Coopératives Agricoles", "Enseignement Supérieur"],
    "isere_grenoble_semiconducteurs": ["STMicroelectronics / Nanoélectronique", "Commissariat à l'Énergie Atomique (CEA)", "Stations Iséroises"],
    "paris_finance_cadres": ["Fédération Bancaire Française", "Barreau de Paris", "Medef / CAC 40", "Grands Cabinets Conseils"],
    "seine_saint_denis_banlieues": ["Intersyndicale Transports RATP/SNCF", "Logement Social & HLM", "Collectifs Quartiers"],
    "hauts_de_seine_defense": ["Fédération Bancaire", "Industrie Pharmaceutique", "Medef / Multinationales"],
    "outremer": ["Fédération des Entreprises d'Outre-Mer", "Syndicats Bananiers & Sucriers", "Secteur BTP Insulaire"],
    "expatries": ["Chambres de Commerce Françaises à l'Étranger", "Réseau Établissements AEFE", "Consulaires"]
}

# Groupes politiques et répartition réaliste Assemblée Nationale (577)
GROUPES_ASSEMBLEE = [
    ("Rassemblement National & UDR", 142, (0.91, 0.96), (0.10, 0.20)),
    ("Ensemble pour la République / Renaissance", 98, (0.72, 0.82), (0.25, 0.38)),
    ("La France Insoumise - NFP", 72, (0.92, 0.97), (0.05, 0.12)),
    ("Socialistes & Apparentés", 66, (0.76, 0.85), (0.15, 0.25)),
    ("Droite Républicaine (LR)", 47, (0.68, 0.80), (0.35, 0.50)),
    ("Écologiste et Social", 38, (0.84, 0.92), (0.08, 0.18)),
    ("Les Démocrates (MoDem)", 36, (0.75, 0.84), (0.20, 0.32)),
    ("Horizons & Indépendants", 31, (0.78, 0.88), (0.25, 0.40)),
    ("LIOT", 22, (0.42, 0.60), (0.45, 0.65)),
    ("Gauche Démocrate et Républicaine (PCF)", 17, (0.88, 0.94), (0.08, 0.16)),
    ("Non-Inscrits", 8, (0.30, 0.55), (0.30, 0.60))
]

# Groupes politiques et répartition réaliste Sénat (348)
GROUPES_SENAT = [
    ("Les Républicains", 138, (0.64, 0.76), (0.40, 0.55)),
    ("Socialiste, Écologiste et Républicain", 64, (0.72, 0.82), (0.15, 0.28)),
    ("Union Centriste", 57, (0.62, 0.74), (0.35, 0.48)),
    ("Rassemblement des Démocrates, Progressistes et Indépendants (RDPI)", 21, (0.70, 0.80), (0.30, 0.42)),
    ("CRCE-K (Communiste & Citoyen)", 18, (0.86, 0.94), (0.08, 0.15)),
    ("Les Indépendants - République et Territoires", 18, (0.58, 0.70), (0.40, 0.55)),
    ("RDSE (Radicaux de Gauche / Indépendants)", 16, (0.50, 0.65), (0.45, 0.60)),
    ("Écologiste - Solidarité et Territoires", 12, (0.82, 0.90), (0.10, 0.20)),
    ("Non-Inscrits / Droite Nationale", 4, (0.60, 0.80), (0.20, 0.35))
]

def generate_all_parliamentarians():
    random.seed(2027)
    
    # 1. Génération des 577 Députés
    flat_groups_an = []
    for grp_name, count, loy_range, lob_range in GROUPES_ASSEMBLEE:
        for _ in range(count):
            flat_groups_an.append((grp_name, loy_range, lob_range))
    random.shuffle(flat_groups_an)
    
    deputes_list = []
    dep_idx = 1
    
    for dep_name, dep_code, nb_circo, profil in DEPARTEMENTS_DEPUTES:
        for c in range(1, nb_circo + 1):
            if not flat_groups_an:
                break
            grp_name, loy_range, lob_range = flat_groups_an.pop()
            
            is_femme = random.random() < 0.38 # ~38% de femmes à l'Assemblée
            prenom = random.choice(PRENOMS_FEMMES if is_femme else PRENOMS_HOMMES)
            nom = random.choice(NOMS_FAMILLE)
            
            loyaute = round(random.uniform(loy_range[0], loy_range[1]), 2)
            sensibilite_lob = round(random.uniform(lob_range[0], lob_range[1]), 2)
            
            # Choix des lobbys pertinents
            lobbys = LOBBYS_PAR_PROFIL.get(profil, ["PME / Commerce Local", "Association des Maires", "Syndicats Territoriaux"])
            if dep_name == "Paris":
                lobbys = LOBBYS_PAR_PROFIL["paris_finance_cadres"]
            elif dep_name == "Seine-Saint-Denis":
                lobbys = LOBBYS_PAR_PROFIL["seine_saint_denis_banlieues"]
            elif dep_name == "Hauts-de-Seine":
                lobbys = LOBBYS_PAR_PROFIL["hauts_de_seine_defense"]
            elif "outremer" in profil:
                lobbys = LOBBYS_PAR_PROFIL["outremer"]
            elif dep_code == "99":
                lobbys = LOBBYS_PAR_PROFIL["expatries"]

            circo_str = f"{dep_name} ({c}ère circonscription)" if c == 1 else f"{dep_name} ({c}e circonscription)"
            
            depute_obj = {
                "id": f"D{dep_idx:03d}",
                "nom": nom,
                "prenom": prenom,
                "groupe_politique": grp_name,
                "circonscription": circo_str,
                "departement": dep_name,
                "loyaute_initiale": loyaute,
                "sensibilite_lobbys": sensibilite_lob,
                "lobbys_cibles": lobbys[:3]
            }
            deputes_list.append(depute_obj)
            dep_idx += 1

    # 2. Génération des 348 Sénateurs
    flat_groups_senat = []
    for grp_name, count, loy_range, lob_range in GROUPES_SENAT:
        for _ in range(count):
            flat_groups_senat.append((grp_name, loy_range, lob_range))
    random.shuffle(flat_groups_senat)
    
    senateurs_list = []
    sen_idx = 1
    
    for dep_name, nb_sieges in DEPARTEMENTS_SENATEURS:
        for _ in range(nb_sieges):
            if not flat_groups_senat:
                break
            grp_name, loy_range, lob_range = flat_groups_senat.pop()
            
            is_femme = random.random() < 0.36 # ~36% de sénatrices
            prenom = random.choice(PRENOMS_FEMMES if is_femme else PRENOMS_HOMMES)
            nom = random.choice(NOMS_FAMILLE)
            
            loyaute = round(random.uniform(loy_range[0], loy_range[1]), 2)
            sensibilite_lob = round(random.uniform(lob_range[0], lob_range[1]), 2)
            
            # Au Sénat, les maires et filières territoriales sont prédominants
            lobbys_senat = ["Association des Maires de France (AMF)", "FNSEA / Ruralité", "Filière BTP / Notaires"]
            if dep_name in ["Gironde", "Aube", "Marne", "Côte-d'Or", "Hérault"]:
                lobbys_senat = ["Viticulture & Vignerons", "Association des Maires", "Fédération des Chasseurs"]
            elif dep_name in ["Finistère", "Morbihan", "Côtes-d'Armor"]:
                lobbys_senat = ["Agroalimentaire Breton", "Pêche & Littoral", "Maires Ruraux"]
            elif dep_name in ["Paris", "Hauts-de-Seine"]:
                lobbys_senat = ["Immobilier / Logement", "Barreau & Professions Libérales", "Services Publics"]
                
            senateur_obj = {
                "id": f"S{sen_idx:03d}",
                "nom": nom,
                "prenom": prenom,
                "groupe_politique": grp_name,
                "departement": dep_name,
                "loyaute_initiale": loyaute,
                "sensibilite_lobbys": sensibilite_lob,
                "lobbys_cibles": lobbys_senat
            }
            senateurs_list.append(senateur_obj)
            sen_idx += 1

    complete_dataset = {
        "metadata": {
            "version": "1.0",
            "total_deputes": len(deputes_list),
            "total_senateurs": len(senateurs_list),
            "description": "Base intégrale des 577 Députés de l'Assemblée Nationale et 348 Sénateurs de la Ve République (horizon 2026/2027)"
        },
        "deputes": deputes_list,
        "senateurs": senateurs_list
    }
    
    # Écriture dans engine_py/parliamentarians.json et src/data/parliamentarians.json
    with open("/Users/morgancanteri/Documents/polifrance/engine_py/parliamentarians.json", "w", encoding="utf-8") as f:
        json.dump(complete_dataset, f, ensure_ascii=False, indent=2)
        
    with open("/Users/morgancanteri/Documents/polifrance/src/data/parliamentarians.json", "w", encoding="utf-8") as f:
        json.dump(complete_dataset, f, ensure_ascii=False, indent=2)

    print(f"✅ Génération terminée : {len(deputes_list)} Députés et {len(senateurs_list)} Sénateurs générés avec succès !")

if __name__ == "__main__":
    generate_all_parliamentarians()
