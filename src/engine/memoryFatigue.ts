/**
 * Moteur 5 (TypeScript) : Système de Mémoire et de Fatigue Institutionnelle
 */

export interface ActionRecord {
  type: string;
  intensity: number;
  turn: number;
}

export class MemoryFatigueEngine {
  public history: ActionRecord[] = [];
  public halfLives: Record<string, number> = {
    'ARTICLE_49_3': 8.0,
    'VOTE_BLOQUE_44_3': 5.0,
    'ORDONNANCE': 4.0,
    'REPRESSION': 10.0
  };

  public recordAction(type: string, intensity: number, turn: number) {
    this.history.push({ type, intensity, turn });
  }

  public calculateMemoryCharge(type: string, currentTurn: number): number {
    const halfLife = this.halfLives[type] || 4.0;
    const decayLambda = Math.log(2.0) / halfLife;
    
    let charge = 0;
    for (const item of this.history) {
      if (item.type === type && currentTurn >= item.turn) {
        const dt = currentTurn - item.turn;
        charge += item.intensity * Math.exp(-decayLambda * dt);
      }
    }
    return charge;
  }

  public evaluateLever(type: string, currentTurn: number) {
    const charge = this.calculateMemoryCharge(type, currentTurn);
    const beta = 0.45;
    const gamma = 0.55;
    const c0 = 15.0;

    const effectiveRoi = 100.0 * Math.exp(-beta * charge);
    const socialTensionCost = c0 * Math.exp(gamma * charge);
    const censureRiskMultiplier = 1.0 + 0.5 * Math.pow(charge, 1.4);

    return {
      type,
      memoryCharge: Number(charge.toFixed(2)),
      effectiveRoiPct: Number(effectiveRoi.toFixed(1)),
      socialTensionCost: Number(socialTensionCost.toFixed(1)),
      censureRiskMultiplier: Number(censureRiskMultiplier.toFixed(2)),
      isCritical: charge > 2.2
    };
  }
}
