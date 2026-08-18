"""
Module 5: Système de Mémoire et de Fatigue Institutionnelle (Décroissance Exponentielle)
"""

from collections import deque
from dataclasses import dataclass, field
from typing import Dict, List, Optional
import math
import time

@dataclass
class InstitutionalActionLog:
    lever_id: str
    action_type: str        # "ARTICLE_49_3", "VOTE_BLOQUE_44_3", "ORDONNANCE", "BUZZWORD"
    intensity: float        # [0.5, 3.0]
    turn_timestamp: int     # Tour où l'action a eu lieu
    real_timestamp: float = field(default_factory=time.time)

class MemoryAndFatigueEngine:
    """
    Gestionnaire d'usure politique par décroissance exponentielle (Exponential Decay).
    Stocke l'historique dans un Ring Buffer et calcule en temps réel :
    - L'effondrement du ROI politique (rendements décroissants).
    - L'inflation exponentielle du coût en tension sociale et du risque de censure.
    """
    def __init__(self, buffer_capacity: int = 100):
        # Ring buffer pour conserver les N dernières actions institutionnelles
        self.action_history: deque[InstitutionalActionLog] = deque(maxlen=buffer_capacity)
        
        # Demi-vie de mémoire politique en tours de jeu (T_1/2)
        # Plus T_1/2 est grand, plus l'opinion publique met du temps à oublier
        self.half_lives: Dict[str, float] = {
            "ARTICLE_49_3": 8.0,        # Les Français s'en souviennent très longtemps (~8 mois)
            "VOTE_BLOQUE_44_3": 5.0,    # Friction parlementaire
            "ORDONNANCE": 4.0,          # Contournement du débat
            "REPRESSION_FORCE": 10.0,   # Violence d'État / Manifs (marque durablement)
            "BUZZWORD": 2.5             # Éléments de langage répétés (ridicule rapide)
        }

        # Paramètres d'effondrement (Beta) et d'inflation de tension (Gamma)
        self.decay_params: Dict[str, Dict[str, float]] = {
            "ARTICLE_49_3": {"beta_roi": 0.45, "gamma_tension": 0.55, "c0_tension": 15.0},
            "VOTE_BLOQUE_44_3": {"beta_roi": 0.30, "gamma_tension": 0.35, "c0_tension": 8.0},
            "ORDONNANCE": {"beta_roi": 0.25, "gamma_tension": 0.30, "c0_tension": 6.0},
            "REPRESSION_FORCE": {"beta_roi": 0.50, "gamma_tension": 0.70, "c0_tension": 25.0},
            "BUZZWORD": {"beta_roi": 0.60, "gamma_tension": 0.15, "c0_tension": 2.0}
        }

    def record_action(self, action_type: str, lever_id: str, intensity: float, current_turn: int):
        log = InstitutionalActionLog(
            lever_id=lever_id,
            action_type=action_type,
            intensity=intensity,
            turn_timestamp=current_turn
        )
        self.action_history.append(log)

    def calculate_memory_charge(self, action_type: str, current_turn: int) -> float:
        """
        Calcule la charge mémorielle accumulée M(t) par convolution exponentielle :
        M(t) = sum_k A_k * exp( - lambda * (current_turn - turn_k) )
        avec lambda = ln(2) / T_{1/2}
        """
        half_life = self.half_lives.get(action_type, 4.0)
        decay_lambda = math.log(2.0) / half_life
        
        total_memory_charge = 0.0
        for log in self.action_history:
            if log.action_type == action_type:
                dt = current_turn - log.turn_timestamp
                if dt >= 0:
                    weight = log.intensity * math.exp(-decay_lambda * dt)
                    total_memory_charge += weight

        return total_memory_charge

    def evaluate_lever_efficiency(self, action_type: str, current_turn: int, base_roi: float = 1.0) -> Dict[str, float]:
        """
        Calcule le ROI effectif et le contrecoup en tension sociale pour une utilisation au tour t.
        
        ROI_effectif = ROI_0 * exp( - beta * M(t) )
        Cout_Tension = C_0 * exp( gamma * M(t) )
        """
        m_t = self.calculate_memory_charge(action_type, current_turn)
        params = self.decay_params.get(action_type, {"beta_roi": 0.35, "gamma_tension": 0.40, "c0_tension": 10.0})
        
        beta = params["beta_roi"]
        gamma = params["gamma_tension"]
        c0 = params["c0_tension"]

        # Rendements décroissants
        effective_roi = base_roi * math.exp(-beta * m_t)
        
        # Inflation exponentielle du coût en colère publique
        social_tension_cost = c0 * math.exp(gamma * m_t)

        # Risque de censure parlementaire (multiplicateur de fronde)
        censure_vulnerability_multiplier = 1.0 + (0.5 * math.pow(m_t, 1.4))

        return {
            "action_type": action_type,
            "accumulated_memory_charge": round(m_t, 3),
            "effective_roi_percentage": round(effective_roi * 100.0, 1),
            "social_tension_cost": round(social_tension_cost, 1),
            "censure_multiplier": round(censure_vulnerability_multiplier, 2),
            "is_saturation_critical": m_t > 2.5
        }
