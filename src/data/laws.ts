import { ProposedLaw } from '../types/game';

export const CATALOG_LAWS: ProposedLaw[] = [
  {
    id: 'plf_budget_austerite',
    title: 'Projet de Loi de Finances (PLF) : Plan d\'Assainissement Budgétaire',
    category: 'economie',
    summary: 'Réduction de 20 milliards d\'euros de dépenses publiques, gel des embauches de fonctionnaires et rationalisation des agences d\'État.',
    costOrSavings: -20,
    impactPopularity: { retraites: 4, cadres: 5, fonctionnaires: -15, populaires: -8 },
    impactTension: 20,
    supportByGroup: {
      gauche_radicale: 0,
      gauche_sociale: 10,
      centre_majorite: 90,
      droite_republicaine: 85,
      droite_nationale: 25,
      non_inscrits: 40,
    },
    senateSupport: 'favorable',
    status: 'draft'
  },
  {
    id: 'loi_pouvoir_achat_salaires',
    title: 'Loi d\'Urgence Pouvoir d\'Achat & Conditionnalité des Aides',
    category: 'social',
    summary: 'Baisse de la TVA à 5,5% sur les produits énergétiques et prime de partage de la valeur défiscalisée pour les salariés du privé.',
    costOrSavings: 8,
    impactPopularity: { populaires: 15, cadres: 4, jeunesse: 8, rural: 14 },
    impactTension: -15,
    supportByGroup: {
      gauche_radicale: 60,
      gauche_sociale: 80,
      centre_majorite: 70,
      droite_republicaine: 65,
      droite_nationale: 85,
      non_inscrits: 60,
    },
    senateSupport: 'favorable',
    status: 'draft'
  },
  {
    id: 'loi_securite_peines_planchers',
    title: 'Loi sur la Justice Pénale & Rétablissement des Peines Planchers',
    category: 'securite',
    summary: 'Instauration de peines minimales obligatoires pour les agresseurs de personnes dépositaires de l\'autorité publique et construction de 15 000 places de prison.',
    costOrSavings: 3,
    impactPopularity: { retraites: 12, rural: 10, populaires: 6, cadres: 3, jeunesse: -8 },
    impactTension: 10,
    supportByGroup: {
      gauche_radicale: 0,
      gauche_sociale: 15,
      centre_majorite: 75,
      droite_republicaine: 95,
      droite_nationale: 100,
      non_inscrits: 50,
    },
    senateSupport: 'favorable',
    status: 'draft'
  },
  {
    id: 'loi_planification_ecologique_isolation',
    title: 'Grand Plan Climat & Rénovation Thermique Obligatoire',
    category: 'ecologie',
    summary: 'Interdiction de location des passoires thermiques G et F, bonus écologique renforcé pour les véhicules électriques fabriqués en Europe.',
    costOrSavings: 6,
    impactPopularity: { cadres: 10, jeunesse: 14, fonctionnaires: 6, rural: -8, populaires: -5 },
    impactTension: 5,
    supportByGroup: {
      gauche_radicale: 85,
      gauche_sociale: 95,
      centre_majorite: 65,
      droite_republicaine: 30,
      droite_nationale: 10,
      non_inscrits: 40,
    },
    senateSupport: 'neutre',
    status: 'draft'
  },
  {
    id: 'loi_proportionnelle_referendum',
    title: 'Réforme Institutionnelle : Dose de Proportionnelle & Référendum d\'Initiative Citoyenne',
    category: 'institutions',
    summary: 'Introduction de 20% de députés élus à la proportionnelle intégrale et abaissement du seuil de déclenchement du RIP à 1 million d\'électeurs.',
    costOrSavings: 0,
    impactPopularity: { populaires: 8, jeunesse: 12, cadres: 2, retraites: -4 },
    impactTension: -10,
    supportByGroup: {
      gauche_radicale: 90,
      gauche_sociale: 75,
      centre_majorite: 40,
      droite_republicaine: 20,
      droite_nationale: 85,
      non_inscrits: 80,
    },
    senateSupport: 'hostile',
    status: 'draft'
  }
];
