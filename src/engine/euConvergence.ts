/**
 * Moteur 3 (TypeScript) : Vecteur de Convergence Européenne & Sanctions
 */

export interface EUSanction {
  level: 'AVERTISSEMENT' | 'GEL_FONDS' | 'RUPTURE';
  code: string;
  title: string;
  withheldFundsMrd: number;
  spreadPenaltyBps: number;
  description: string;
}

export class EUConvergenceEngine {
  public euGravityCenter: number[] = [0.80, 0.85, 0.75, 0.70, 0.90];
  public weights: number[] = [0.30, 0.20, 0.15, 0.10, 0.25];
  public franceVector: number[] = [0.25, 0.60, 0.70, 0.65, 0.85];

  public applyPolicyDelta(delta: Partial<{
    disciplineBudgetaire: number;
    marcheUnique: number;
    climat: number;
    pesc: number;
    etatDeDroit: number;
  }>) {
    const raw = [
      delta.disciplineBudgetaire || 0,
      delta.marcheUnique || 0,
      delta.climat || 0,
      delta.pesc || 0,
      delta.etatDeDroit || 0
    ];
    this.franceVector = this.franceVector.map((val, idx) => {
      return Math.max(-1.0, Math.min(1.0, val + raw[idx]));
    });
  }

  public calculateEuDistance(): number {
    const weightedDiff = this.franceVector.map((val, idx) => {
      return this.weights[idx] * Math.pow(val - this.euGravityCenter[idx], 2);
    });
    return Math.sqrt(weightedDiff.reduce((a, b) => a + b, 0));
  }

  public evaluateSanctions(): { distance: number; sanctions: EUSanction[]; compliancePct: number } {
    const distance = this.calculateEuDistance();
    const sanctions: EUSanction[] = [];

    if (distance >= 0.45) {
      sanctions.push({
        level: 'AVERTISSEMENT',
        code: 'ART_258_AVIS_MOTIVE',
        title: 'Mise en demeure (Art. 258 TFUE)',
        withheldFundsMrd: 0,
        spreadPenaltyBps: 8.0,
        description: 'Bruxelles exige un plan de redressement budgétaire sous 2 mois.'
      });
    }
    if (distance >= 0.70) {
      sanctions.push({
        level: 'GEL_FONDS',
        code: 'GEL_NEXTGEN_EU',
        title: 'Gel des subventions européennes (12.4 Mrd€)',
        withheldFundsMrd: 12.4,
        spreadPenaltyBps: 25.0,
        description: 'Suspension des fonds NextGenEU et surveillance négative des agences de notation.'
      });
    }
    if (distance >= 0.95) {
      sanctions.push({
        level: 'RUPTURE',
        code: 'CJUE_ART_7',
        title: 'Saisine de la CJUE & Procédure Art. 7',
        withheldFundsMrd: 28.0,
        spreadPenaltyBps: 65.0,
        description: 'Crise constitutionnelle avec Bruxelles et fuite de capitaux.'
      });
    }

    const compliancePct = Math.max(0, Math.min(100, Math.round((1.0 - distance / 1.2) * 100)));
    return {
      distance: Number(distance.toFixed(3)),
      sanctions,
      compliancePct
    };
  }
}
