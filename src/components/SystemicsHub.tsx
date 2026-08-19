import React from 'react';
import { GameState } from '../types/game';
import { 
  TrendingUp, TrendingDown, Landmark, ShieldAlert, 
  CheckCircle2, AlertTriangle, Scale, Activity, 
  BarChart3, Globe, Euro, Zap, History
} from 'lucide-react';

interface SystemicsHubProps {
  state: GameState;
}

export const SystemicsHub: React.FC<SystemicsHubProps> = ({ state }) => {
  const deficit = Math.abs(state.economy?.deficit || 0);
  const debt = state.economy?.debt || 112;
  const strikeRisk = state.social?.strikeRisk || 0;
  const popularity = state.popularity || 25;

  // Calcul dynamique réaliste du CAC 40 et des indices européens (influencés par la politique du joueur)
  const baseCac40 = Math.round(7650 + (popularity - 30) * 12 - (deficit - 3.0) * 110 - (strikeRisk > 50 ? (strikeRisk - 50) * 9 : 0));
  const cac40DeltaPct = parseFloat((((popularity - 30) * 0.08 - (deficit - 3.0) * 0.45 - (strikeRisk - 40) * 0.03)).toFixed(2));
  
  const baseEuroStoxx = Math.round(4920 + (popularity - 30) * 6 - (deficit - 3.0) * 55);
  const euroStoxxDeltaPct = parseFloat((cac40DeltaPct * 0.65).toFixed(2));

  const baseDax = Math.round(18420 - (deficit - 3.0) * 30);
  const daxDeltaPct = parseFloat((cac40DeltaPct * 0.4).toFixed(2));

  // Taux directeur BCE et Taux d'emprunt France
  const bceRate = 3.25;
  const spreadBps = Math.round(65 + (deficit > 3.0 ? (deficit - 3.0) * 24 : 0) + (strikeRisk > 60 ? (strikeRisk - 60) * 0.8 : 0));
  const oat10yYield = parseFloat((bceRate + 0.10 + (spreadBps / 100)).toFixed(2));
  const annualDebtChargeMds = parseFloat((debt * 32.5 * (oat10yYield / 100)).toFixed(1));

  // Notation Souveraine (Agences de Notation : S&P, Moody's, Fitch)
  const getSovereignRating = () => {
    if (deficit > 6.0) {
      return {
        grade: 'A+',
        agency: 'Standard & Poor\'s / Moody\'s',
        outlook: 'Perspective Négative (Risque de dégradation)',
        alertLevel: 'danger',
        desc: 'Alerte maximale : la trajectoire des finances publiques menace la crédibilité de la signature de la France sur les marchés.'
      };
    } else if (deficit > 4.5) {
      return {
        grade: 'AA-',
        agency: 'Standard & Poor\'s / Fitch',
        outlook: 'Sous Surveillance Négative',
        alertLevel: 'warning',
        desc: 'Surveillance renforcée : Bruxelles et les investisseurs exigent un plan de redressement budgétaire crédible.'
      };
    } else if (deficit > 3.0) {
      return {
        grade: 'AA',
        agency: 'Standard & Poor\'s / Fitch',
        outlook: 'Perspective Stable',
        alertLevel: 'neutral',
        desc: 'Notation solide : la France conserve la confiance des créanciers malgré un dépassement modéré du seuil de Maastricht (3%).'
      };
    } else {
      return {
        grade: 'AA+',
        agency: 'Standard & Poor\'s / Moody\'s',
        outlook: 'Perspective Positive',
        alertLevel: 'success',
        desc: 'Excellente notation : finances publiques maîtrisées sous le seuil de 3%, conditions d\'emprunt optimales.'
      };
    }
  };

  const rating = getSovereignRating();

  // Bulletin d'analyse du marché
  const getMarketSentiment = () => {
    if (cac40DeltaPct >= 0.5) {
      return {
        sentiment: '🟢 Climat des Affaires Favorable',
        analysis: 'Les marchés réagissent positivement aux arbitrages récents. La confiance des investisseurs soutient la place de Paris.'
      };
    } else if (cac40DeltaPct <= -0.8) {
      return {
        sentiment: '🔴 Tensions & Prudence sur les Marchés',
        analysis: 'Le CAC 40 décroche sous l\'effet combiné des tensions sociales et de l\'incertitude budgétaire. Les valeurs bancaires et industrielles sont sous pression.'
      };
    } else {
      return {
        sentiment: '🟡 Marchés en Attente',
        analysis: 'Activité stable sur les places européennes. Les investisseurs attendent les prochaines annonces gouvernementales pour se positionner.'
      };
    }
  };

  const sentiment = getMarketSentiment();

  return (
    <div className="space-y-5 text-[var(--text-main)] font-sans">
      
      {/* En-tête Informatif */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-4 sm:p-5 shadow-[4px_4px_0px_var(--border-hard)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[var(--text-main)] text-[var(--bg-panel)] uppercase">
              Télémétrie Économique
            </span>
            <span className="text-xs font-mono opacity-70">
              Impact Direct de vos Décisions
            </span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl tracking-tight mt-1">
            Bourse de Paris, Taux & Dette Souveraine
          </h2>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="px-3 py-1 bg-[var(--bg-subtle)] border border-[var(--border-hard)] font-bold">
            Mois {state.turn} / 60
          </span>
        </div>
      </div>

      {/* 1. SECTION BOURSE & MARCHÉS EUROPÉENS */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] space-y-4">
        
        <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)]">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-[var(--accent-blue)]" />
            <h3 className="font-display font-bold text-base uppercase tracking-tight">
              1. Marchés Boursiers en Direct
            </h3>
          </div>
          <span className="font-mono text-xs opacity-70">Cotation Continue</span>
        </div>

        {/* 3 Cartouches d'Indices */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
          
          {/* CAC 40 (Paris) */}
          <div className="p-4 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold">🇫🇷 CAC 40 (Paris)</span>
              <span className="text-[10px] opacity-60">FR0003500008</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <strong className="text-2xl font-black">{baseCac40.toLocaleString('fr-FR')} <span className="text-xs font-normal">pts</span></strong>
              <div className={`flex items-center space-x-1 font-bold text-sm ${cac40DeltaPct >= 0 ? 'text-[var(--accent-emerald)]' : 'text-[var(--accent-red)]'}`}>
                {cac40DeltaPct >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{cac40DeltaPct >= 0 ? `+${cac40DeltaPct}` : cac40DeltaPct}%</span>
              </div>
            </div>
          </div>

          {/* EuroStoxx 50 (Zone Euro) */}
          <div className="p-4 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold">🇪🇺 EuroStoxx 50</span>
              <span className="text-[10px] opacity-60">EU0009658145</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <strong className="text-2xl font-black">{baseEuroStoxx.toLocaleString('fr-FR')} <span className="text-xs font-normal">pts</span></strong>
              <div className={`flex items-center space-x-1 font-bold text-sm ${euroStoxxDeltaPct >= 0 ? 'text-[var(--accent-emerald)]' : 'text-[var(--accent-red)]'}`}>
                {euroStoxxDeltaPct >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{euroStoxxDeltaPct >= 0 ? `+${euroStoxxDeltaPct}` : euroStoxxDeltaPct}%</span>
              </div>
            </div>
          </div>

          {/* DAX 40 (Francfort) */}
          <div className="p-4 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold">🇩🇪 DAX 40 (Francfort)</span>
              <span className="text-[10px] opacity-60">DE0008469008</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <strong className="text-2xl font-black">{baseDax.toLocaleString('fr-FR')} <span className="text-xs font-normal">pts</span></strong>
              <div className={`flex items-center space-x-1 font-bold text-sm ${daxDeltaPct >= 0 ? 'text-[var(--accent-emerald)]' : 'text-[var(--accent-red)]'}`}>
                {daxDeltaPct >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{daxDeltaPct >= 0 ? `+${daxDeltaPct}` : daxDeltaPct}%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bulletin d'Analyse Boursière */}
        <div className="p-3 bg-[var(--bg-subtle)] border border-[var(--border-hard)] flex items-start space-x-3 text-xs">
          <Activity className="w-4 h-4 text-[var(--accent-blue)] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-[var(--text-main)]">{sentiment.sentiment}</span>
            <p className="opacity-80 text-xs mt-0.5">{sentiment.analysis}</p>
          </div>
        </div>

      </div>

      {/* 2. SECTION TAUX DIRECTEUR BCE & DETTE SOUVERAINE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Module Taux d'Intérêt */}
        <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] space-y-3 font-mono">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)]">
            <div className="flex items-center space-x-2">
              <Landmark className="w-4 h-4 text-[var(--accent-amber)]" />
              <h3 className="font-display font-bold text-sm uppercase">
                2. Taux Directeur & Emprunt
              </h3>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
              BCE / BERCY
            </span>
          </div>

          <div className="space-y-2.5 text-xs pt-1">
            <div className="flex justify-between items-center p-2 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
              <span className="opacity-80">🏦 Taux Directeur BCE (Refi) :</span>
              <strong className="text-sm">{bceRate.toFixed(2)}%</strong>
            </div>

            <div className="flex justify-between items-center p-2 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
              <span className="opacity-80">🇫🇷 Taux OAT France (10 ans) :</span>
              <strong className="text-sm text-[var(--accent-blue)]">{oat10yYield.toFixed(2)}%</strong>
            </div>

            <div className="flex justify-between items-center p-2 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
              <span className="opacity-80">⚡ Écart vs Allemagne (Spread) :</span>
              <strong className={`text-sm ${spreadBps > 80 ? 'text-[var(--accent-red)]' : 'text-[var(--text-main)]'}`}>
                +{spreadBps} bps
              </strong>
            </div>

            <div className="flex justify-between items-center p-2 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
              <span className="opacity-80">💳 Charge annuelle des intérêts :</span>
              <strong className="text-sm">{annualDebtChargeMds} Mds € / an</strong>
            </div>
          </div>

          <p className="text-[11px] font-sans opacity-70 pt-1">
            💡 Plus le spread s'écarte, plus chaque euro emprunté coûte cher au budget de l'État.
          </p>
        </div>

        {/* Module Notation Souveraine */}
        <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border-hard)]">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-[var(--accent-red)]" />
              <h3 className="font-display font-bold text-sm uppercase">
                3. Notation Souveraine de la France
              </h3>
            </div>
            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
              AGENCES
            </span>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 bg-[var(--bg-subtle)] border border-[var(--border-hard)] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono opacity-70 block">NOTE SOUVERAINE ACTUELLE</span>
                <strong className="text-3xl font-display font-black tracking-tight">{rating.grade}</strong>
                <span className="text-xs font-mono block opacity-80 mt-0.5">{rating.outlook}</span>
              </div>

              <div className="text-right font-mono text-xs">
                <span className="opacity-70 block text-[10px]">DÉFICIT ACTUEL</span>
                <strong className={`text-lg font-black ${deficit > 3.0 ? 'text-[var(--accent-red)]' : 'text-[var(--accent-emerald)]'}`}>
                  -{deficit.toFixed(1)}%
                </strong>
                <span className="text-[10px] opacity-60 block">Seuil Max UE : 3.0%</span>
              </div>
            </div>

            <p className="text-xs font-sans opacity-85 leading-relaxed bg-[var(--bg-subtle)] p-2.5 border border-[var(--border-hard)]">
              {rating.desc}
            </p>
          </div>
        </div>

      </div>

      {/* 3. CONSEILS STRATÉGIQUES POUR LE JOUEUR */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-4 shadow-[3px_3px_0px_var(--border-hard)] text-xs font-mono space-y-1.5">
        <span className="font-bold block uppercase text-[var(--accent-amber)]">
          💡 Règle du Jeu Macroéconomique :
        </span>
        <ul className="list-disc list-inside space-y-1 opacity-80 font-sans">
          <li><strong>Déficit &lt; 3.0%</strong> : La note reste au plus haut (AA+), le CAC 40 prospère et le coût de la dette diminue.</li>
          <li><strong>Déficit &gt; 5.0% ou Grèves &gt; 70%</strong> : Le spread s'envole, le CAC 40 plonge et les agences dégradent la note souveraine.</li>
          <li><strong>Déficit &gt; 6.0%</strong> : Risque d'intervention directe de la Commission européenne et sanction des marchés.</li>
        </ul>
      </div>

    </div>
  );
};
