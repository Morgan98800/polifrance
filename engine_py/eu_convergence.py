"""
Module 3: Vecteur de Convergence Européenne et Système de Sanctions Automatiques
Version pure Python (Zéro dépendance)
"""

from dataclasses import dataclass
from typing import List, Dict, Tuple
import math
from math_utils import clip

@dataclass
class EUSanctionEvent:
    level: str
    code: str
    title: str
    withheld_funds_mrd: float
    capital_flight_factor: float
    spread_penalty_bps: float
    legal_deadline_weeks: int
    description: str

class EUConvergenceEngine:
    DIMENSION_NAMES = [
        "discipline_budgetaire",
        "marche_unique_aides_etat",
        "transition_ecologique",
        "politique_etrangere_pesc",
        "etat_de_droit_cjue"
    ]

    def __init__(self):
        self.eu_gravity_center = [0.80, 0.85, 0.75, 0.70, 0.90]
        self.metric_weights = [0.30, 0.20, 0.15, 0.10, 0.25]
        self.france_vector = [0.20, 0.60, 0.70, 0.65, 0.85]
        
        self.warning_threshold = 0.45
        self.infringement_threshold = 0.70
        self.sanction_threshold = 0.95

    def apply_policy_action(self, policy_vector_delta: Dict[str, float]) -> List[float]:
        delta = [
            policy_vector_delta.get("discipline_budgetaire", 0.0),
            policy_vector_delta.get("marche_unique_aides_etat", 0.0),
            policy_vector_delta.get("transition_ecologique", 0.0),
            policy_vector_delta.get("politique_etrangere_pesc", 0.0),
            policy_vector_delta.get("etat_de_droit_cjue", 0.0)
        ]
        self.france_vector = [clip(self.france_vector[i] + delta[i], -1.0, 1.0) for i in range(5)]
        return self.france_vector

    def calculate_eu_distance(self) -> float:
        weighted_sq_diff = [
            self.metric_weights[i] * ((self.france_vector[i] - self.eu_gravity_center[i]) ** 2)
            for i in range(5)
        ]
        return math.sqrt(sum(weighted_sq_diff))

    def evaluate_compliance_and_sanctions(self) -> Tuple[float, List[EUSanctionEvent]]:
        distance = self.calculate_eu_distance()
        sanctions: List[EUSanctionEvent] = []

        if distance >= self.warning_threshold:
            sanctions.append(EUSanctionEvent(
                level="AVERTISSEMENT",
                code="ART_258_AVIS_MOTIVE",
                title="Avis motivé de la Commission Européenne : Mise en demeure",
                withheld_funds_mrd=0.0,
                capital_flight_factor=0.02,
                spread_penalty_bps=8.0,
                legal_deadline_weeks=8,
                description="Bruxelles exige un mémoire en réponse et des engagements correctifs sous 2 mois."
            ))

        if distance >= self.infringement_threshold:
            sanctions.append(EUSanctionEvent(
                level="SANCTION_FINANCIERE",
                code="GEL_FONDS_NEXTGEN_EU",
                title="Gel immédiat des subventions NextGenerationEU et FEDER",
                withheld_funds_mrd=12.4,
                capital_flight_factor=0.08,
                spread_penalty_bps=25.0,
                legal_deadline_weeks=4,
                description="Suspension des décaissements européens. Les agences de notation placent la France sous surveillance négative."
            ))

        if distance >= self.sanction_threshold:
            sanctions.append(EUSanctionEvent(
                level="RUPTURE_INSTITUTIONNELLE",
                code="CJUE_ASTREINTES_ART7",
                title="Saisine de la CJUE : Astreintes journalières record et alerte Article 7",
                withheld_funds_mrd=28.0,
                capital_flight_factor=0.22,
                spread_penalty_bps=65.0,
                legal_deadline_weeks=2,
                description="Crise existentielle avec l'Union. Fuite massive de capitaux vers les bunds allemands et le Trésor américain."
            ))

        return distance, sanctions
