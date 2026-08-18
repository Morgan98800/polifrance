"""
Master Game Loop Orchestrator: Intégration des 5 Moteurs Systémiques
Version pure Python (Zéro dépendance)
"""

from typing import Dict, Any, List
import json

from prediction_market import PredictionMarketEngine
from crisis_emergence import CrisisEmergenceEngine
from eu_convergence import EUConvergenceEngine
from parliament_multiagent import ParliamentMultiAgentEngine, ChamberType
from memory_fatigue import MemoryAndFatigueEngine

class PoliFranceUnifiedBackend:
    def __init__(self):
        print("🏛️ [POLIFRANCE BACKEND] Initialisation des 5 moteurs systémiques (Pur Python)...")
        self.market_engine = PredictionMarketEngine()
        self.crisis_engine = CrisisEmergenceEngine()
        self.eu_engine = EUConvergenceEngine()
        self.parliament_engine = ParliamentMultiAgentEngine()
        self.memory_engine = MemoryAndFatigueEngine()
        
        self.current_turn = 1
        self.macro_state = {
            "deficit_pct": 5.4,
            "debt_pct": 113.2,
            "inflation_energie": 0.65,
            "baisse_pouvoir_achat": 0.60,
            "chomage_jeunes": 0.70,
            "retrait_services_publics": 0.55,
            "sentiment_abandon_rural": 0.65
        }

    def execute_game_turn(self, player_action: Dict[str, Any]) -> Dict[str, Any]:
        print(f"\n=======================================================")
        print(f"▶️ EXÉCUTION DU TOUR {self.current_turn} | Action: {player_action.get('type')}")
        print(f"=======================================================")

        turn_report = {"turn": self.current_turn, "action": player_action}

        # 1. ÉVALUATION DE LA MÉMOIRE & FATIGUE INSTITUTIONNELLE
        action_type = player_action.get("type", "STANDARD")
        if action_type in ["ARTICLE_49_3", "VOTE_BLOQUE_44_3", "ORDONNANCE", "REPRESSION_FORCE"]:
            self.memory_engine.record_action(
                action_type=action_type,
                lever_id=player_action.get("target_id", "law_generic"),
                intensity=player_action.get("intensity", 1.0),
                current_turn=self.current_turn
            )
            fatigue_stats = self.memory_engine.evaluate_lever_efficiency(action_type, self.current_turn)
            turn_report["institutional_fatigue"] = fatigue_stats
            print(f"⚠️ [MÉMOIRE & USURE] Charge M(t) = {fatigue_stats['accumulated_memory_charge']} | "
                  f"Efficacité ROI = {fatigue_stats['effective_roi_percentage']}% | "
                  f"Coût Tension = +{fatigue_stats['social_tension_cost']} pts | "
                  f"Vulnérabilité Censure x{fatigue_stats['censure_multiplier']}")

        # 2. VOTE PARLEMENTAIRE GRANULAIRE (577 DÉPUTÉS)
        law_ideo = player_action.get("law_ideology_vector", [0.5, 0.4, -0.2])
        party_stances = player_action.get("party_stances", {
            "LFI": -0.9, "PS_ECOLO": -0.7, "CENTRE_EPR": 0.9, "LR": 0.6, "RN": -0.8, "LIOT_NI": -0.2
        })
        
        if "lobby_deputies" in player_action:
            for dep_id, grant in player_action["lobby_deputies"].items():
                self.parliament_engine.lobby_deputy_with_grant(dep_id, grant_amount_meur=grant)

        assembly_vote = self.parliament_engine.resolve_chamber_vote(
            chamber=ChamberType.ASSEMBLEE_NATIONALE,
            law_ideology_vector=law_ideo,
            party_official_stances=party_stances,
            sector_lobby_stance=player_action.get("lobby_stance", 0.2)
        )
        turn_report["assembly_vote"] = {
            "passed": assembly_vote["passed"],
            "for": assembly_vote["votes_for"],
            "against": assembly_vote["votes_against"],
            "abstentions": assembly_vote["abstentions"]
        }
        print(f"🏛️ [PARLEMENT 577] Scrutin : POUR = {assembly_vote['votes_for']} | "
              f"CONTRE = {assembly_vote['votes_against']} | "
              f"ABST = {assembly_vote['abstentions']} | "
              f"Résultat = {'✅ ADOPTÉ' if assembly_vote['passed'] else '❌ REJETÉ'}")

        # 3. MARCHÉ DE PRÉDICTION & SPREAD OAT-BUND
        contract_id = player_action.get("target_id", "reforme_budgetaire_2027")
        if contract_id not in self.market_engine.markets:
            self.market_engine.create_market(contract_id)

        signal = 0.90 if assembly_vote["passed"] else 0.20
        self.market_engine.simulate_order_flow(contract_id, institutional_signal=signal)
        
        spread_metrics = self.market_engine.calculate_sovereign_spread(
            reform_id=contract_id,
            structural_deficit_pct=self.macro_state["deficit_pct"],
            debt_to_gdp_pct=self.macro_state["debt_pct"]
        )
        turn_report["prediction_market"] = spread_metrics
        print(f"📈 [MARCHÉ & DETTE] P_implied = {spread_metrics['p_implied_success']*100:.1f}% | "
              f"Volatilité = {spread_metrics['political_volatility']} | "
              f"Spread OAT-Bund = {spread_metrics['spread_oat_bund_bps']} bps | "
              f"Taux 10 ans = {spread_metrics['oat_10y_yield_pct']}%")

        # 4. VECTEUR DE CONVERGENCE EUROPÉENNE & SANCTIONS
        eu_delta = player_action.get("eu_policy_delta", {"discipline_budgetaire": -0.10, "marche_unique_aides_etat": -0.05})
        self.eu_engine.apply_policy_action(eu_delta)
        eu_dist, eu_sanctions = self.eu_engine.evaluate_compliance_and_sanctions()
        turn_report["eu_convergence"] = {
            "eu_distance": round(eu_dist, 3),
            "sanctions_triggered": [s.code for s in eu_sanctions]
        }
        print(f"🇪🇺 [CONVERGENCE UE] Distance Traités = {eu_dist:.3f} | "
              f"Sanctions Actives = {[s.level + ':' + s.code for s in eu_sanctions] if eu_sanctions else 'Aucune'}")

        # 5. GÉNÉRATION PROCÉDURALE DE CRISES ÉMERGENTES
        reforms_impact = player_action.get("sector_shocks", {"agriculture": 0.8, "transports": 0.4})
        emergent_crises = self.crisis_engine.trigger_procedural_crises(
            macro_pressure=self.macro_state,
            active_reforms_impact=reforms_impact
        )
        turn_report["emergent_crises"] = [
            {"id": c.id, "title": c.title, "severity": c.severity_score, "is_national": c.is_national_escalation}
            for c in emergent_crises
        ]
        if emergent_crises:
            for c in emergent_crises:
                print(f"🔥 [CRISE ÉMERGENTE] {c.title} (Sévérité: {c.severity_score}/100) -> {c.narrative_summary}")
        else:
            print(f"🕊️ [CLIMAT RÉGIONAL] Aucune crise critique émergente ce tour.")

        self.current_turn += 1
        return turn_report


if __name__ == "__main__":
    backend = PoliFranceUnifiedBackend()

    # SIMULATION TOUR 1 : Vote d'un plan d'austérité budgétaire serré avec lobbying
    print("\n=======================================================")
    print("TEST 1 : Vote parlementaire avec 'Pork Barrel' sur 5 députés")
    print("=======================================================")
    action_turn_1 = {
        "type": "VOTE_SOLENNEL",
        "target_id": "plf_budget_2027",
        "law_ideology_vector": [0.7, 0.4, -0.2],
        "party_stances": {
            "LFI": -1.0, "PS_ECOLO": -0.85, "CENTRE_EPR": 0.95, "LR": 0.50, "RN": -0.90, "LIOT_NI": -0.10
        },
        "lobby_stance": 0.4,
        "lobby_deputies": {
            "deputy_180": 20.0,
            "deputy_181": 15.0,
            "deputy_182": 25.0,
            "deputy_350": 18.0,
            "deputy_351": 22.0
        },
        "eu_policy_delta": {"discipline_budgetaire": 0.15},
        "sector_shocks": {"agriculture": 0.3, "sante": 0.6}
    }
    res_1 = backend.execute_game_turn(action_turn_1)

    # SIMULATION TOUR 2 : Usage de l'Article 49.3
    print("\n=======================================================")
    print("TEST 2 : Passage en force avec l'Article 49.3")
    print("=======================================================")
    action_turn_2 = {
        "type": "ARTICLE_49_3",
        "target_id": "reforme_retraites_urgences",
        "intensity": 1.5,
        "law_ideology_vector": [0.8, 0.6, -0.4],
        "party_stances": {
            "LFI": -1.0, "PS_ECOLO": -1.0, "CENTRE_EPR": 0.90, "LR": 0.30, "RN": -1.0, "LIOT_NI": -0.80
        },
        "eu_policy_delta": {"discipline_budgetaire": -0.20, "marche_unique_aides_etat": -0.30},
        "sector_shocks": {"agriculture": 1.2, "transports": 1.5, "energie": 0.9}
    }
    res_2 = backend.execute_game_turn(action_turn_2)
