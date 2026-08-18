"""
Module 2: Génération Procédurale de Crises (Algorithme d'Émergence Vectorielle)
Version pure Python (Zéro dépendance)
"""

from dataclasses import dataclass
from typing import List, Dict, Tuple
from math_utils import dot, rand_uniform

@dataclass
class EmergentCrisisPayload:
    id: str
    title: str
    region: str
    sector: str
    severity_score: float
    is_national_escalation: bool
    systemic_feedback: Dict[str, float]
    narrative_summary: str

class CrisisEmergenceEngine:
    def __init__(self):
        self.regions = [
            "Île-de-France", "Auvergne-Rhône-Alpes", "Nouvelle-Aquitaine", 
            "Occitanie", "Hauts-de-France", "Grand Est", "Provence-Alpes-Côte d'Azur",
            "Bretagne", "Pays de la Loire", "Normandie", "Bourgogne-Franche-Comté",
            "Centre-Val de Loire", "Corse"
        ]
        self.sectors = ["agriculture", "sante_hopital", "transport_logistique", "education", "energie", "forces_ordre"]
        
        self.num_regions = len(self.regions)
        self.num_sectors = len(self.sectors)
        
        self.regional_demographics = self._init_regional_demographics()
        self.sectoral_vulnerability = self._init_sectoral_matrix()
        
        self.contagion_matrix = [
            [1.00, 0.10, 0.45, 0.05, 0.30, 0.20],
            [0.10, 1.00, 0.15, 0.40, 0.10, 0.25],
            [0.40, 0.20, 1.00, 0.30, 0.50, 0.35],
            [0.05, 0.30, 0.25, 1.00, 0.10, 0.15],
            [0.35, 0.15, 0.45, 0.10, 1.00, 0.20],
            [0.20, 0.25, 0.35, 0.20, 0.20, 1.00],
        ]

    def _init_regional_demographics(self) -> List[List[float]]:
        demo = []
        for i in range(self.num_regions):
            if i == 0: # Île-de-France
                demo.append([0.45, 0.40, 0.95, 0.65, 0.05])
            elif i == 4: # Hauts-de-France
                demo.append([0.85, 0.75, 0.60, 0.80, 0.40])
            elif i == 7: # Bretagne
                demo.append([0.35, 0.45, 0.40, 0.50, 0.85])
            else:
                demo.append([rand_uniform(0.3, 0.8) for _ in range(5)])
        return demo

    def _init_sectoral_matrix(self) -> List[List[float]]:
        return [[rand_uniform(0.2, 0.8) for _ in range(self.num_sectors)] for _ in range(self.num_regions)]

    def evaluate_field_stress(self, 
                              macro_pressure_vector: List[float], 
                              legislative_impact_vector: List[float]) -> List[List[float]]:
        # 1. Pression régionale = demo (13, 5) . macro (5,) -> (13,)
        reg_pressure = [dot(row, macro_pressure_vector) for row in self.regional_demographics]
        
        # 2. Stress brut = (13, 6)
        raw_stress = []
        for r in range(self.num_regions):
            row_stress = []
            for s in range(self.num_sectors):
                val = (reg_pressure[r] * self.sectoral_vulnerability[r][s]) + legislative_impact_vector[s]
                row_stress.append(val)
            raw_stress.append(row_stress)
            
        # 3. Contagion sectorielle = raw_stress (13, 6) . contagion (6, 6)
        total_stress = []
        for r in range(self.num_regions):
            row_out = []
            for col_idx in range(self.num_sectors):
                contagion_col = [self.contagion_matrix[k][col_idx] for k in range(self.num_sectors)]
                row_out.append(dot(raw_stress[r], contagion_col))
            total_stress.append(row_out)
            
        return total_stress

    def trigger_procedural_crises(self, 
                                  macro_pressure: Dict[str, float], 
                                  active_reforms_impact: Dict[str, float],
                                  critical_threshold: float = 4.2) -> List[EmergentCrisisPayload]:
        v_macro = [
            macro_pressure.get("inflation_energie", 0.5),
            macro_pressure.get("baisse_pouvoir_achat", 0.5),
            macro_pressure.get("chomage_jeunes", 0.5),
            macro_pressure.get("retrait_services_publics", 0.5),
            macro_pressure.get("sentiment_abandon_rural", 0.5)
        ]
        
        v_laws = [
            active_reforms_impact.get("agriculture", 0.0),
            active_reforms_impact.get("sante", 0.0),
            active_reforms_impact.get("transports", 0.0),
            active_reforms_impact.get("education", 0.0),
            active_reforms_impact.get("energie", 0.0),
            active_reforms_impact.get("securite", 0.0)
        ]

        stress_matrix = self.evaluate_field_stress(v_macro, v_laws)
        crises: List[EmergentCrisisPayload] = []

        hotspots = []
        for r in range(self.num_regions):
            for s in range(self.num_sectors):
                if stress_matrix[r][s] >= critical_threshold:
                    hotspots.append((r, s, stress_matrix[r][s]))

        for r_idx, s_idx, score in hotspots:
            region_name = self.regions[r_idx]
            sector_name = self.sectors[s_idx]
            is_national = score > (critical_threshold * 1.4) or (len(hotspots) >= 4)
            title, summary = self._procedural_narrative_generator(region_name, sector_name, score, is_national)
            
            payload = EmergentCrisisPayload(
                id=f"crisis_{region_name[:3].lower()}_{sector_name}_{int(score*10)}",
                title=title,
                region=region_name if not is_national else "Territoire National",
                sector=sector_name,
                severity_score=round(score * 15.0, 1),
                is_national_escalation=is_national,
                systemic_feedback={
                    "tension_sociale_delta": round(score * 2.5, 1),
                    "cout_budgetaire_mrd": round(score * 0.4, 2),
                    "perte_popularite_populaire": round(score * 1.8, 1)
                },
                narrative_summary=summary
            )
            crises.append(payload)

        return crises

    def _procedural_narrative_generator(self, region: str, sector: str, score: float, is_national: bool) -> Tuple[str, str]:
        sector_lexicon = {
            "agriculture": ("Blocage des plateformes logistiques et barrages", "Les agriculteurs et éleveurs dénoncent l'asphyxie financière et les normes."),
            "sante_hopital": ("Saturation critique des urgences et grève des gardes", "Les soignants réclament un plan d'urgence face aux fermetures de lits."),
            "transport_logistique": ("Grève surprise des dépôts de carburant et trains", "Les syndicats de chauffeurs et cheminots paralysent les liaisons."),
            "education": ("Mobilisation des rectorats et journée écoles mortes", "Les enseignants dénoncent les suppressions de postes et conditions d'accueil."),
            "energie": ("Débrayage dans les centrales et coupures ciblées", "Les agents de l'énergie réclament le retour à un tarif réglementé bouclier."),
            "forces_ordre": ("Mouvement 'bavures administratives' et service minimum", "Les fonctionnaires de police expriment leur épuisement opérationnel.")
        }
        
        base_title, desc = sector_lexicon.get(sector, ("Fronde sectorielle", "Tensions locales accrues."))
        if is_national:
            title = f"CONTAGION NATIONALE : {base_title}"
            summary = f"L'embrasement parti de {region} gagne l'ensemble du pays. {desc}"
        else:
            title = f"{region} : {base_title}"
            summary = f"Émergence de fortes tensions en {region}. {desc}"
            
        return title, summary
