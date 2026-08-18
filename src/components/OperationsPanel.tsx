import React, { useState } from 'react';
import { GameState } from '../types/game';
import { Hemicycle } from './Hemicycle';
import { FranceMap } from './FranceMap';
import { ParliamentReportBrutalist } from './ParliamentReportBrutalist';
import { PredictionMarketEngine } from '../engine/predictionMarket';
import { 
  Building, MapPin, TrendingUp, Users, Award, 
  DollarSign, CheckCircle2, AlertTriangle, ChevronRight, FileText 
} from 'lucide-react';
import { soundEffects } from '../utils/audio';
import parliamentData from '../data/parliamentarians.json';

interface OperationsPanelProps {
  state: GameState;
  onUpdateState: (newState: GameState) => void;
}

export const OperationsPanel: React.FC<OperationsPanelProps> = ({ state, onUpdateState }) => {
  const [activeView, setActiveView] = useState<'hemicycle' | 'report_493' | 'territory' | 'prediction_market'>('hemicycle');
  const [selectedDeputy, setSelectedDeputy] = useState<any>(parliamentData.deputes[0]);
  const [bribeNotification, setBribeNotification] = useState<string | null>(null);

  const [marketEngine] = useState(() => new PredictionMarketEngine());
  const marketStats = marketEngine.calculateSovereignSpread('reforme_plf_2027', state.economy.deficit, state.economy.debt);

  // Action Pork Barrel : Accorder une subvention locale à ce député
  const handleGrantPorkBarrel = (deputy: any, amountMeur: number) => {
    if (state.funds < amountMeur * 1000) {
      setBribeNotification("Fonds publics insuffisants pour débloquer cet arbitrage local.");
      return;
    }

    soundEffects.playStamp();
    const nextState = { ...state };
    nextState.funds -= amountMeur * 1000;
    nextState.authorityPoints = Math.max(0, nextState.authorityPoints - 2);

    // Mise à jour de la loyauté
    deputy.loyaute_initiale = Math.min(1.0, (deputy.loyaute_initiale || 0.7) + 0.25);
    deputy.bribed = true;

    setBribeNotification(`✅ Arbitrage accordé : +${amountMeur} M€ alloués à ${deputy.circonscription}. Le député ${deputy.prenom} ${deputy.nom} s'engage à voter POUR !`);
    onUpdateState(nextState);
  };

  return (
    <div className="bg-[#FFFFFF] border-2 border-[#1A1A1A] p-5 shadow-[4px_4px_0px_#1A1A1A] space-y-4 flex flex-col justify-between h-full text-[#1A1A1A]">
      
      {/* 1. Sélecteur d'Onglets Brutaliste */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b-2 border-[#1A1A1A] gap-2">
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <button
            onClick={() => { soundEffects.playKeystroke(); setActiveView('hemicycle'); }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 border-2 border-[#1A1A1A] font-bold uppercase transition-all ${
              activeView === 'hemicycle'
                ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-[2px_2px_0px_#1A1A1A]'
                : 'bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#F7F7F5] active:translate-x-[2px] active:translate-y-[2px]'
            }`}
          >
            <Building className="w-3.5 h-3.5 stroke-[2]" />
            <span>Hémicycle 577</span>
          </button>

          <button
            onClick={() => { soundEffects.playKeystroke(); setActiveView('report_493'); }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 border-2 border-[#1A1A1A] font-bold uppercase transition-all ${
              activeView === 'report_493'
                ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-[2px_2px_0px_#1A1A1A]'
                : 'bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#F7F7F5] active:translate-x-[2px] active:translate-y-[2px]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 stroke-[2]" />
            <span>Rapport & 49.3</span>
          </button>

          <button
            onClick={() => { soundEffects.playKeystroke(); setActiveView('territory'); }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 border-2 border-[#1A1A1A] font-bold uppercase transition-all ${
              activeView === 'territory'
                ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-[2px_2px_0px_#1A1A1A]'
                : 'bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#F7F7F5] active:translate-x-[2px] active:translate-y-[2px]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 stroke-[2]" />
            <span>Carte France</span>
          </button>

          <button
            onClick={() => { soundEffects.playKeystroke(); setActiveView('prediction_market'); }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 border-2 border-[#1A1A1A] font-bold uppercase transition-all ${
              activeView === 'prediction_market'
                ? 'bg-[#1A1A1A] text-[#FFFFFF] shadow-[2px_2px_0px_#1A1A1A]'
                : 'bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#F7F7F5] active:translate-x-[2px] active:translate-y-[2px]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 stroke-[2]" />
            <span>Marchés & Prêts</span>
          </button>
        </div>

        <span className="hidden sm:inline-block text-[11px] font-mono text-[#1A1A1A]/60">
          ASSEMBLÉE & RÉGIONS
        </span>
      </div>

      {bribeNotification && (
        <div className="p-2.5 bg-[#F7F7F5] border-2 border-[#1A1A1A] text-xs font-mono font-bold flex items-center justify-between">
          <span>{bribeNotification}</span>
          <button onClick={() => setBribeNotification(null)} className="text-[#1A1A1A] font-bold ml-2">
            ✕
          </button>
        </div>
      )}

      {/* 2. Rendu de la Vue Sélectionnée */}
      <div className="flex-1">
        
        {/* VUE 1 : HÉMICYCLE INTERACTIF & FICHE DÉPUTÉ */}
        {activeView === 'hemicycle' && (
          <div className="space-y-4">
            <Hemicycle
              groups={state.parliament}
              majorityThreshold={state.censureThreshold}
              onGroupClick={() => {}}
            />

            {/* Fiche Député Sélectionné & Négociation Subvention */}
            <div className="bg-[#F7F7F5] p-3.5 border-2 border-[#1A1A1A] space-y-2.5 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1A1A1A]">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 bg-[#1A1A1A] text-[#FFFFFF] flex items-center justify-center font-bold text-xs">
                    {selectedDeputy.id}
                  </div>
                  <div>
                    <h4 className="font-serif font-black text-sm text-[#1A1A1A]">
                      {selectedDeputy.prenom} {selectedDeputy.nom}
                    </h4>
                    <p className="text-[11px] text-[#1A1A1A]/70">
                      {selectedDeputy.circonscription} • {selectedDeputy.groupe_politique}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span>LOYAUTÉ : <strong className="text-[#2A9D8F]">{Math.round(selectedDeputy.loyaute_initiale * 100)}%</strong></span>
                  <span>|</span>
                  <span>LOBBYS : <strong className="text-[#F4A261]">{Math.round(selectedDeputy.sensibilite_lobbys * 100)}%</strong></span>
                </div>
              </div>

              {/* Lobbys cibles & Action Subvention locale */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1 items-center">
                  <span className="text-[10px] uppercase font-bold text-[#1A1A1A]/60 mr-1">Lobbys :</span>
                  {selectedDeputy.lobbys_cibles?.map((lob: string, idx: number) => (
                    <span key={idx} className="text-[10px] bg-[#FFFFFF] px-1.5 py-0.5 border border-[#1A1A1A]">
                      {lob}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => {
                      const randDep = parliamentData.deputes[Math.floor(Math.random() * parliamentData.deputes.length)];
                      setSelectedDeputy(randDep);
                    }}
                    className="py-1.5 px-2.5 bg-[#FFFFFF] hover:bg-[#F7F7F5] border border-[#1A1A1A] text-xs font-bold"
                  >
                    Autre Député
                  </button>

                  <button
                    onClick={() => handleGrantPorkBarrel(selectedDeputy, 15)}
                    className="py-1.5 px-3 bg-[#2A9D8F] text-[#FFFFFF] font-bold text-xs border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  >
                    +15 M€ Aide Locale
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VUE 2 : RAPPORT PARLEMENTAIRE BRUTALISTE & 49.3 */}
        {activeView === 'report_493' && (() => {
          const acquiredVotes = state.parliament
            .filter(g => g.stanceTowardsPlayer === 'loyal' || g.stanceTowardsPlayer === 'coalition')
            .reduce((sum, g) => sum + g.seats, 0);
          return (
            <ParliamentReportBrutalist
              votesFor={acquiredVotes}
              votesAgainst={577 - acquiredVotes - 25}
              votesAbstention={25}
              totalSeats={577}
              majorityThreshold={state.censureThreshold}
              onUseArticle49_3={() => soundEffects.playGavelHammer()}
              onStandardVote={() => soundEffects.playGavelHammer()}
            />
          );
        })()}

        {/* VUE 3 : CARTE DE FRANCE INTERACTIVE */}
        {activeView === 'territory' && (
          <FranceMap state={state} />
        )}

        {/* VUE 4 : MARCHÉ & PRÊTS */}
        {activeView === 'prediction_market' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#F7F7F5] p-3.5 border-2 border-[#1A1A1A] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#1A1A1A]/60 block uppercase font-bold">CHANCES DE VOTE DE LA LOI</span>
                  <div className="text-3xl font-serif font-black text-[#1A1A1A] mt-1">
                    {(marketStats.pImpliedSuccess * 100).toFixed(1)}%
                  </div>
                </div>
                <span className="px-2 py-1 bg-[#2A9D8F] text-[#FFFFFF] border border-[#1A1A1A] font-bold text-[10px]">
                  MARCHÉS
                </span>
              </div>

              <div className="bg-[#F7F7F5] p-3.5 border-2 border-[#1A1A1A] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#1A1A1A]/60 block uppercase font-bold">SURCOÛT EMPRUNTS FRANCE</span>
                  <div className="text-3xl font-serif font-black text-[#E63946] mt-1">
                    +{marketStats.spreadOatBundBps} <span className="text-xs font-mono">bps</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-[#FFFFFF] border border-[#1A1A1A] font-bold text-[10px]">
                  TAUX {marketStats.oat10yYieldPct}%
                </span>
              </div>
            </div>

            {/* Partisans & Opposants */}
            <div className="bg-[#F7F7F5] p-3.5 border-2 border-[#1A1A1A] space-y-2">
              <span className="font-bold text-[11px] uppercase block">
                ANALYSE DU CLIMAT POLITIQUE & ÉCONOMIQUE
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#FFFFFF] p-2.5 border border-[#1A1A1A]">
                  <span className="text-[#2A9D8F] font-bold block mb-1">PARTISANS</span>
                  <p className="text-[#1A1A1A]/80 font-sans text-[11px]">
                    Soutien des milieux économiques et patronaux pour assainir le budget.
                  </p>
                </div>
                <div className="bg-[#FFFFFF] p-2.5 border border-[#1A1A1A]">
                  <span className="text-[#E63946] font-bold block mb-1">OPPOSITIONS</span>
                  <p className="text-[#1A1A1A]/80 font-sans text-[11px]">
                    Menace de blocages syndicaux et de dépôt d'une motion de censure transpartisane.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
