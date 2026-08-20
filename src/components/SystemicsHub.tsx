import React from 'react';
import { GameState } from '../types/game';
import { 
  TrendingUp, TrendingDown, Landmark, ShieldAlert, 
  CheckCircle2, AlertTriangle, Scale, Activity, 
  BarChart3, Globe, Award 
} from 'lucide-react';

interface SystemicsHubProps {
  state: GameState;
}

export const SystemicsHub: React.FC<SystemicsHubProps> = ({ state }) => {
  const deficit = Math.abs(state.economy?.deficit || 0);
  const debt = state.economy?.debt || 112;
  const strikeRisk = state.social?.strikeRisk || 0;
  const popularity = state.popularity || 50;

  // Calcul réaliste du CAC 40
  const baseCac40 = Math.round(7650 + (popularity - 40) * 15 - (deficit - 3.0) * 120 - (strikeRisk > 50 ? (strikeRisk - 50) * 10 : 0));
  const cac40DeltaPct = parseFloat((((popularity - 40) * 0.08 - (deficit - 3.0) * 0.45 - (strikeRisk - 40) * 0.03)).toFixed(2));

  // Notation Souveraine (S&P / Moody's)
  const getSovereignRating = () => {
    if (deficit > 6.0) {
      return {
        grade: 'A+',
        status: '🔴 Dégradée (Alerte)',
        color: 'text-[var(--accent-red)]',
        border: 'border-[var(--accent-red)]',
        bg: 'bg-[var(--accent-red)]/10',
        desc: 'Crise de confiance : Bruxelles et les marchés s\'inquiètent du dérapage budgétaire.'
      };
    } else if (deficit > 4.5) {
      return {
        grade: 'AA-',
        status: '🟡 Sous Surveillance',
        color: 'text-[var(--accent-amber)]',
        border: 'border-[var(--accent-amber)]',
        bg: 'bg-[var(--accent-amber)]/10',
        desc: 'Avertissement : Les agences exigent un plan de redressement des comptes publics.'
      };
    } else if (deficit > 3.0) {
      return {
        grade: 'AA',
        status: '🟢 Solide & Stable',
        color: 'text-[var(--text-main)]',
        border: 'border-[var(--border-hard)]',
        bg: 'bg-[var(--bg-subtle)]',
        desc: 'Confiance maintenue : La France emprunte à des conditions normales malgré un léger déficit.'
      };
    } else {
      return {
        grade: 'AA+',
        status: '💎 Excellente (Rigueur)',
        color: 'text-[var(--accent-emerald)]',
        border: 'border-[var(--accent-emerald)]',
        bg: 'bg-[var(--accent-emerald)]/10',
        desc: 'Comptes exemplaires : Déficit maîtrisé sous les 3%, les investisseurs plébiscitent la France.'
      };
    }
  };

  const rating = getSovereignRating();

  return (
    <div className="max-w-4xl mx-auto space-y-4 text-[var(--text-main)] font-mono">
      
      {/* En-tête Épuré */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-4 shadow-[3px_3px_0px_var(--border-hard)] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-blue)] block">
            BAROMÈTRE ÉCONOMIQUE & FINANCIER
          </span>
          <h2 className="font-display font-black text-xl">Bourse & Santé des Finances Publiques</h2>
        </div>
        <span className="text-xs px-2.5 py-1 bg-[var(--bg-subtle)] border border-[var(--border-hard)] font-bold">
          Mois {state.turn} / 60
        </span>
      </div>

      {/* Les 3 Cartes Majeures (Une par colonne, compréhensibles instantanément) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        
        {/* 1. La Bourse de Paris (CAC 40) */}
        <div className="p-4 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[4px_4px_0px_var(--border-hard)] flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hard)]/20 mb-2">
              <span className="text-[10px] font-bold uppercase opacity-70 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                <span>Bourse de Paris</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
                CAC 40
              </span>
            </div>

            <div className="pt-1">
              <strong className="text-2xl font-black block">
                {baseCac40.toLocaleString('fr-FR')} <span className="text-xs font-normal">pts</span>
              </strong>
              <div className={`flex items-center gap-1 text-xs font-bold mt-1 ${cac40DeltaPct >= 0 ? 'text-[var(--accent-emerald)]' : 'text-[var(--accent-red)]'}`}>
                {cac40DeltaPct >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{cac40DeltaPct >= 0 ? `+${cac40DeltaPct}% ce mois` : `${cac40DeltaPct}% ce mois`}</span>
              </div>
            </div>
          </div>

          <p className="text-xs font-serif opacity-85 leading-relaxed bg-[var(--bg-subtle)] p-2.5 border border-[var(--border-hard)]">
            {cac40DeltaPct >= 0 
              ? '🟢 Confiance : Les marchés réagissent favorablement à vos arbitrages politiques.' 
              : '🔴 Prudence : Les grèves et l\'incertitude politique pèsent sur les entreprises.'}
          </p>
        </div>

        {/* 2. La Note Souveraine de la France */}
        <div className={`p-4 bg-[var(--bg-panel)] border-2 shadow-[4px_4px_0px_var(--border-hard)] flex flex-col justify-between space-y-3 ${rating.border}`}>
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hard)]/20 mb-2">
              <span className="text-[10px] font-bold uppercase opacity-70 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
                <span>Note de la France</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
                Agences
              </span>
            </div>

            <div className="pt-1">
              <div className="flex items-baseline space-x-2">
                <strong className="text-3xl font-display font-black">
                  {rating.grade}
                </strong>
                <span className="text-xs font-bold opacity-80">{rating.status}</span>
              </div>
              <span className="text-[10px] opacity-60 block mt-1">Évaluation Standard & Poor's / Moody's</span>
            </div>
          </div>

          <p className="text-xs font-serif opacity-85 leading-relaxed bg-[var(--bg-subtle)] p-2.5 border border-[var(--border-hard)]">
            {rating.desc}
          </p>
        </div>

        {/* 3. Les Caisses de l'État & Déficit */}
        <div className="p-4 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[4px_4px_0px_var(--border-hard)] flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hard)]/20 mb-2">
              <span className="text-[10px] font-bold uppercase opacity-70 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
                <span>Caisses de l'État</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-hard)]">
                Bercy
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-baseline">
                <span className="text-[11px] opacity-70">Trésor disponible :</span>
                <strong className="text-base font-black text-[var(--accent-amber)]">
                  {state.economy?.treasury?.toFixed(1) || '50.0'} Mds €
                </strong>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[11px] opacity-70">Déficit annuel :</span>
                <strong className={`text-base font-black ${deficit > 3.0 ? 'text-[var(--accent-red)]' : 'text-[var(--accent-emerald)]'}`}>
                  {deficit.toFixed(1)}%
                </strong>
              </div>
              <div className="flex justify-between items-baseline text-[10px] opacity-60">
                <span>Dette totale :</span>
                <span>{debt.toFixed(1)}% du PIB</span>
              </div>
            </div>
          </div>

          <p className="text-xs font-serif opacity-85 leading-relaxed bg-[var(--bg-subtle)] p-2.5 border border-[var(--border-hard)]">
            {deficit <= 3.0 
              ? '✅ Règle européenne respectée (Déficit < 3%).' 
              : '⚠️ Dérapage : Le seuil européen de 3% est dépassé.'}
          </p>
        </div>

      </div>

      {/* 💡 Règle Simple pour le Joueur */}
      <div className="bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-3.5 shadow-[3px_3px_0px_var(--border-hard)] text-xs font-mono flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-[var(--accent-amber)] font-bold shrink-0">
          <span>💡 Règle simple :</span>
        </div>
        <p className="text-[11px] font-sans opacity-80 leading-snug">
          Si votre <strong>Déficit dépasse 5.0%</strong> ou si la <strong>Grève dépasse 75%</strong>, la note de la France chute et la bourse décroche. Maintenez le déficit sous les <strong>3.0%</strong> pour être salué par les marchés.
        </p>
      </div>

    </div>
  );
};
