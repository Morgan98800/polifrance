"""
Module 4: Matrice de Loyauté Granulaire des Parlementaires (Modélisation Multi-Agents)
Version pure Python (Zéro dépendance) avec chargement intégral depuis parliamentarians.json
"""

from dataclasses import dataclass
from enum import Enum
from typing import List, Dict, Tuple, Optional
import json
import os
from math_utils import dot, norm, clip, rand_uniform, rand_normal, cosine_similarity

class ChamberType(Enum):
    ASSEMBLEE_NATIONALE = "ASSEMBLEE_NATIONALE"
    SENAT = "SENAT"

class VoteChoice(Enum):
    POUR = "POUR"
    CONTRE = "CONTRE"
    ABSTENTION = "ABSTENTION"

@dataclass
class ParliamentarianAgent:
    id: str
    nom: str
    prenom: str
    chamber: ChamberType
    party_group: str
    constituency_name: str
    departement: str
    
    ideology_vector: List[float] # [Éco, Régalien, Climat] -> [-1.0, 1.0]
    
    w_party: float
    w_constituency: float
    w_lobby: float
    w_personal: float
    
    local_unemployment_rate: float
    local_rurality_index: float
    lobbys_cibles: List[str]
    
    allocated_local_grants_meur: float = 0.0
    executive_favor_score: float = 0.0

class ParliamentMultiAgentEngine:
    def __init__(self):
        self.deputies: List[ParliamentarianAgent] = []
        self.senators: List[ParliamentarianAgent] = []
        self._load_from_json()

    def _load_from_json(self):
        json_path = os.path.join(os.path.dirname(__file__), "parliamentarians.json")
        if os.path.exists(json_path):
            with open(json_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                
            for dep in data.get("deputes", []):
                grp = dep.get("groupe_politique", "")
                if "France Insoumise" in grp: base_ideo = [-0.85, -0.60, 0.80]
                elif "Socialistes" in grp or "Écologiste" in grp: base_ideo = [-0.55, -0.20, 0.75]
                elif "Renaissance" in grp or "Démocrates" in grp or "Horizons" in grp: base_ideo = [0.40, 0.35, 0.40]
                elif "Droite Républicaine" in grp: base_ideo = [0.70, 0.80, -0.20]
                elif "Rassemblement National" in grp: base_ideo = [0.40, 0.95, -0.60]
                else: base_ideo = [0.10, 0.20, 0.10]
                
                loy = dep.get("loyaute_initiale", 0.80)
                lob = dep.get("sensibilite_lobbys", 0.25)
                
                self.deputies.append(ParliamentarianAgent(
                    id=dep["id"],
                    nom=dep.get("nom", "Inconnu"),
                    prenom=dep.get("prenom", "Inconnu"),
                    chamber=ChamberType.ASSEMBLEE_NATIONALE,
                    party_group=grp,
                    constituency_name=dep.get("circonscription", ""),
                    departement=dep.get("departement", ""),
                    ideology_vector=base_ideo,
                    w_party=loy * 0.55,
                    w_constituency=0.25,
                    w_lobby=lob * 0.35,
                    w_personal=0.15,
                    local_unemployment_rate=rand_uniform(5.5, 11.5),
                    local_rurality_index=rand_uniform(0.1, 0.9),
                    lobbys_cibles=dep.get("lobbys_cibles", [])
                ))

            for sen in data.get("senateurs", []):
                grp = sen.get("groupe_politique", "")
                if "Républicains" in grp: base_ideo = [0.75, 0.85, -0.15]
                elif "Socialiste" in grp or "CRCE" in grp: base_ideo = [-0.60, -0.30, 0.60]
                elif "Union Centriste" in grp or "RDPI" in grp: base_ideo = [0.35, 0.30, 0.40]
                else: base_ideo = [0.15, 0.30, 0.00]
                
                loy = sen.get("loyaute_initiale", 0.70)
                lob = sen.get("sensibilite_lobbys", 0.45)
                
                self.senators.append(ParliamentarianAgent(
                    id=sen["id"],
                    nom=sen.get("nom", "Inconnu"),
                    prenom=sen.get("prenom", "Inconnu"),
                    chamber=ChamberType.SENAT,
                    party_group=grp,
                    constituency_name=sen.get("departement", ""),
                    departement=sen.get("departement", ""),
                    ideology_vector=base_ideo,
                    w_party=loy * 0.40,
                    w_constituency=0.35,
                    w_lobby=lob * 0.35,
                    w_personal=0.15,
                    local_unemployment_rate=rand_uniform(6.0, 10.0),
                    local_rurality_index=rand_uniform(0.2, 0.95),
                    lobbys_cibles=sen.get("lobbys_cibles", [])
                ))

    def resolve_chamber_vote(self, 
                             chamber: ChamberType,
                             law_ideology_vector: List[float],
                             party_official_stances: Dict[str, float],
                             sector_lobby_stance: float = 0.0) -> Dict[str, any]:
        agents = self.deputies if chamber == ChamberType.ASSEMBLEE_NATIONALE else self.senators
        votes = {VoteChoice.POUR: 0, VoteChoice.CONTRE: 0, VoteChoice.ABSTENTION: 0}
        individual_results = []

        for agent in agents:
            # Recherche de la consigne du parti
            s_party = 0.0
            for grp_key, stance in party_official_stances.items():
                if grp_key.lower() in agent.party_group.lower():
                    s_party = stance
                    break

            ideo_alignment = cosine_similarity(agent.ideology_vector, law_ideology_vector)
            
            local_pressure = 0.0
            if agent.local_unemployment_rate > 9.0 and law_ideology_vector[0] > 0.3:
                local_pressure -= 0.40
            if agent.local_rurality_index > 0.6 and law_ideology_vector[2] > 0.4:
                local_pressure -= 0.50
            if agent.local_rurality_index > 0.6 and law_ideology_vector[0] < -0.3:
                local_pressure += 0.45

            pork_barrel_bonus = min(0.60, (agent.allocated_local_grants_meur / 25.0) + (agent.executive_favor_score * 0.15))

            u_i = (
                agent.w_party * s_party +
                agent.w_personal * ideo_alignment +
                agent.w_constituency * local_pressure +
                agent.w_lobby * sector_lobby_stance +
                pork_barrel_bonus
            )

            if u_i > 0.08:
                choice = VoteChoice.POUR
            elif u_i < -0.08:
                choice = VoteChoice.CONTRE
            else:
                choice = VoteChoice.ABSTENTION

            votes[choice] += 1
            individual_results.append({
                "id": agent.id,
                "nom": f"{agent.prenom} {agent.nom}",
                "party": agent.party_group,
                "circonscription": agent.constituency_name,
                "utility": round(u_i, 3),
                "vote": choice.value,
                "grants": agent.allocated_local_grants_meur
            })

        majority_threshold = (len(agents) // 2) + 1
        passed = votes[VoteChoice.POUR] >= majority_threshold

        return {
            "chamber": chamber.value,
            "total_members": len(agents),
            "majority_required": majority_threshold,
            "votes_for": votes[VoteChoice.POUR],
            "votes_against": votes[VoteChoice.CONTRE],
            "abstentions": votes[VoteChoice.ABSTENTION],
            "passed": passed,
            "individual_votes": individual_results
        }

    def lobby_deputy_with_grant(self, deputy_id: str, grant_amount_meur: float, favor_points: float = 1.0) -> bool:
        deputy = next((d for d in self.deputies if d.id == deputy_id), None)
        if not deputy:
            return False
        deputy.allocated_local_grants_meur += grant_amount_meur
        deputy.executive_favor_score += favor_points
        return True
