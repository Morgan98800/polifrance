"""
Module 1: Moteur du Marché de Prédiction Politique (Order Book & Sovereign Spread Coupling)
Version pure Python (Zéro dépendance)
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import List, Dict, Optional, Tuple
import math
import time
from math_utils import clip, std_dev, rand_uniform, rand_normal

class OrderSide(Enum):
    BUY = "BUY"
    SELL = "SELL"

class AgentType(Enum):
    HEDGE_FUND = "HEDGE_FUND"
    INSTITUTIONAL_LOBBY = "LOBBY"
    MEDIA_SPECULATOR = "MEDIA"
    INFORMED_INSIDER = "INSIDER"

@dataclass(order=True)
class Order:
    price: float
    volume: float = field(compare=False)
    agent_id: str = field(compare=False)
    side: OrderSide = field(compare=False)
    timestamp: float = field(default_factory=time.time, compare=False)

@dataclass
class MarketAgent:
    id: str
    agent_type: AgentType
    capital: float
    risk_aversion: float
    private_belief: float
    confidence: float

class LimitOrderBook:
    def __init__(self, contract_id: str):
        self.contract_id = contract_id
        self.bids: List[Order] = []
        self.asks: List[Order] = []
        self.price_history: List[float] = [0.50]
        self.trades: List[Tuple[float, float, float]] = []

    def add_order(self, order: Order) -> List[Tuple[float, float]]:
        matched_trades = []
        if order.side == OrderSide.BUY:
            while self.asks and order.volume > 0 and self.asks[0].price <= order.price:
                best_ask = self.asks[0]
                match_vol = min(order.volume, best_ask.volume)
                match_price = best_ask.price
                matched_trades.append((match_price, match_vol))
                
                order.volume -= match_vol
                best_ask.volume -= match_vol
                self.trades.append((match_price, match_vol, time.time()))
                self.price_history.append(match_price)
                
                if best_ask.volume <= 1e-6:
                    self.asks.pop(0)

            if order.volume > 1e-6:
                self.bids.append(order)
                self.bids.sort(key=lambda x: -x.price)
        else:
            while self.bids and order.volume > 0 and self.bids[0].price >= order.price:
                best_bid = self.bids[0]
                match_vol = min(order.volume, best_bid.volume)
                match_price = best_bid.price
                matched_trades.append((match_price, match_vol))
                
                order.volume -= match_vol
                best_bid.volume -= match_vol
                self.trades.append((match_price, match_vol, time.time()))
                self.price_history.append(match_price)
                
                if best_bid.volume <= 1e-6:
                    self.bids.pop(0)

            if order.volume > 1e-6:
                self.asks.append(order)
                self.asks.sort(key=lambda x: x.price)

        return matched_trades

    def get_mid_price(self) -> float:
        if self.bids and self.asks:
            return (self.bids[0].price + self.asks[0].price) / 2.0
        return self.price_history[-1] if self.price_history else 0.50

    def get_vwap(self, window: int = 20) -> float:
        if not self.trades:
            return self.get_mid_price()
        recent = self.trades[-window:]
        total_vol = sum(t[1] for t in recent)
        if total_vol <= 1e-6:
            return self.get_mid_price()
        return sum(t[0] * t[1] for t in recent) / total_vol

    def calculate_volatility(self, window: int = 15) -> float:
        if len(self.price_history) < 3:
            return 0.05
        prices = [clip(p, 0.01, 0.99) for p in self.price_history[-window:]]
        log_returns = [math.log(prices[i] / prices[i-1]) for i in range(1, len(prices))]
        return std_dev(log_returns)


class PredictionMarketEngine:
    def __init__(self, base_bund_rate: float = 2.40):
        self.markets: Dict[str, LimitOrderBook] = {}
        self.agents: List[MarketAgent] = []
        self.base_bund_rate = base_bund_rate
        self._init_default_bots()

    def _init_default_bots(self, count: int = 60):
        types = [AgentType.HEDGE_FUND, AgentType.INSTITUTIONAL_LOBBY, AgentType.MEDIA_SPECULATOR, AgentType.INFORMED_INSIDER]
        for i in range(count):
            a_type = types[i % len(types)]
            agent = MarketAgent(
                id=f"bot_{a_type.value}_{i}",
                agent_type=a_type,
                capital=rand_uniform(50_000, 1_000_000),
                risk_aversion=rand_uniform(0.5, 1.8),
                private_belief=rand_uniform(0.3, 0.7),
                confidence=rand_uniform(0.4, 0.95)
            )
            self.agents.append(agent)

    def create_market(self, reform_id: str):
        self.markets[reform_id] = LimitOrderBook(contract_id=reform_id)

    def simulate_order_flow(self, reform_id: str, institutional_signal: float, noise_level: float = 0.05):
        book = self.markets.get(reform_id)
        if not book:
            return

        for agent in self.agents:
            if agent.agent_type == AgentType.INFORMED_INSIDER:
                weight_signal = 0.75
            elif agent.agent_type == AgentType.HEDGE_FUND:
                weight_signal = 0.50
            elif agent.agent_type == AgentType.INSTITUTIONAL_LOBBY:
                weight_signal = 0.30
            else:
                weight_signal = 0.20

            noise = rand_normal(0, noise_level)
            updated_belief = (1 - weight_signal) * agent.private_belief + weight_signal * institutional_signal + noise
            agent.private_belief = clip(updated_belief, 0.01, 0.99)

            mid_price = book.get_mid_price()
            price_delta = agent.private_belief - mid_price

            threshold = 0.02 * agent.risk_aversion
            if abs(price_delta) > threshold:
                order_volume = (agent.capital * 0.05 * agent.confidence) / (mid_price * 100)
                order_volume = round(max(1.0, order_volume), 2)
                
                if price_delta > 0:
                    target_price = round(min(0.99, mid_price + rand_uniform(0.01, 0.04)), 3)
                    order = Order(price=target_price, volume=order_volume, agent_id=agent.id, side=OrderSide.BUY)
                else:
                    target_price = round(max(0.01, mid_price - rand_uniform(0.01, 0.04)), 3)
                    order = Order(price=target_price, volume=order_volume, agent_id=agent.id, side=OrderSide.SELL)

                book.add_order(order)

    def calculate_sovereign_spread(self, 
                                   reform_id: str, 
                                   structural_deficit_pct: float, 
                                   debt_to_gdp_pct: float,
                                   is_structural_reform: bool = True) -> Dict[str, float]:
        book = self.markets.get(reform_id)
        if not book:
            p_impl = 0.50
            sigma_pol = 0.05
        else:
            p_impl = book.get_vwap()
            sigma_pol = book.calculate_volatility()

        base_spread = 45.0
        macro_spread = (max(0.0, structural_deficit_pct - 3.0) * 18.0) + (max(0.0, debt_to_gdp_pct - 100.0) * 0.85)

        if is_structural_reform:
            political_risk_penalty = 120.0 * sigma_pol * math.pow(1.0 - p_impl, 2)
        else:
            political_risk_penalty = 40.0 * sigma_pol * (1.0 - p_impl)

        total_spread_bps = base_spread + macro_spread + political_risk_penalty
        oat_yield_10y = self.base_bund_rate + (total_spread_bps / 100.0)

        return {
            "p_implied_success": round(p_impl, 4),
            "political_volatility": round(sigma_pol, 4),
            "spread_oat_bund_bps": round(total_spread_bps, 1),
            "oat_10y_yield_pct": round(oat_yield_10y, 3),
            "macro_risk_component": round(macro_spread, 1),
            "political_risk_component": round(political_risk_penalty, 1)
        }
