import React, { useState } from 'react';
import { Landmark, AlertTriangle, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

interface ParliamentReportProps {
  lawTitle?: string;
  lawNumber?: string;
  votesFor?: number;
  votesAgainst?: number;
  votesAbstention?: number;
  totalSeats?: number;
  majorityThreshold?: number;
  onUseArticle49_3?: () => void;
  onStandardVote?: () => void;
}

export const ParliamentReportBrutalist: React.FC<ParliamentReportProps> = ({
  lawTitle = "Projet de Loi de Finances Rectificative (PLFR 2027) — Mesures d'Urgence Budgétaire",
  lawNumber = "TEXTE N° 1482 / AN-17",
  votesFor = 245,
  votesAgainst = 280,
  votesAbstention = 52,
  totalSeats = 577,
  majorityThreshold = 289,
  onUseArticle49_3,
  onStandardVote
}) => {
  const [article49Triggered, setArticle49Triggered] = useState(false);

  // Calcul des pourcentages pour la barre fragmentée
  const pctFor = (votesFor / totalSeats) * 100;
  const pctAgainst = (votesAgainst / totalSeats) * 100;
  const pctAbs = (votesAbstention / totalSeats) * 100;
  const thresholdPct = (majorityThreshold / totalSeats) * 100;

  const handle49_3 = () => {
    setArticle49Triggered(true);
    if (onUseArticle49_3) onUseArticle49_3();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 font-sans text-[#1A1A1A]">
      
      {/* Panneau Principal : Rapport Parlementaire Brutaliste */}
      <div className="bg-[#FFFFFF] border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_#1A1A1A] space-y-6">
        
        {/* En-Tête Administratif Brutaliste */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-[#1A1A1A]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#FFFFFF] flex items-center justify-center border border-[#1A1A1A] shrink-0">
              <Landmark className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider block text-[#1A1A1A]">
                ASSEMBLÉE NATIONALE • 17e LÉGISLATURE
              </span>
              <span className="font-mono text-[11px] text-[#1A1A1A]/70">
                {lawNumber}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#F7F7F5] border border-[#1A1A1A]">
              NAVETTE : 2e LECTURE
            </span>
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#E63946] text-[#FFFFFF] border border-[#1A1A1A]">
              MAJORITÉ : {majorityThreshold} REQUIS
            </span>
          </div>
        </div>

        {/* 1. Titre Officiel de la Loi (Police Serif) */}
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#1A1A1A]/60 block mb-1">
            RAPPORT LÉGISLATIF EN DÉLIBÉRATION
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-[#1A1A1A]">
            {lawTitle}
          </h2>
          <p className="text-xs text-[#1A1A1A]/80 mt-2 font-sans leading-relaxed">
            Examen des articles et navette parlementaire. Les projections indiquent un déficit de voix 
            pour atteindre la majorité absolue de 289 sièges. Risque immédiat de rejet en séance plénière.
          </p>
        </div>

        {/* Séparateur Franc */}
        <hr className="border-0 border-t-2 border-[#1A1A1A]" />

        {/* 2. Barre de Progression Fragmentée du Vote */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-mono font-bold">
            <span>PROJECTION DU SCRUTIN SOLENNEL</span>
            <span>TOTAL : {votesFor + votesAgainst + votesAbstention} / {totalSeats}</span>
          </div>

          {/* Barre Fragmentée Segmentée avec Seuil de Majorité */}
          <div className="relative w-full h-8 bg-[#F7F7F5] border-2 border-[#1A1A1A] flex overflow-hidden">
            
            {/* Segment POUR (Vert Data Up) */}
            <div
              style={{ width: `${pctFor}%` }}
              className="bg-[#2A9D8F] h-full border-r-2 border-[#1A1A1A] flex items-center justify-center text-[#FFFFFF] font-mono text-xs font-bold tracking-tight transition-all duration-300"
              title={`POUR : ${votesFor} députés`}
            >
              {votesFor > 40 && `${votesFor} POUR`}
            </div>

            {/* Segment ABSTENTION (Orange Centre) */}
            <div
              style={{ width: `${pctAbs}%` }}
              className="bg-[#F4A261] h-full border-r-2 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] font-mono text-xs font-bold tracking-tight transition-all duration-300"
              title={`ABSTENTION : ${votesAbstention} députés`}
            >
              {votesAbstention > 30 && `${votesAbstention} ABS`}
            </div>

            {/* Segment CONTRE (Rouge Data Down) */}
            <div
              style={{ width: `${pctAgainst}%` }}
              className="bg-[#E63946] h-full flex items-center justify-center text-[#FFFFFF] font-mono text-xs font-bold tracking-tight transition-all duration-300"
              title={`CONTRE : ${votesAgainst} députés`}
            >
              {votesAgainst > 40 && `${votesAgainst} CONTRE`}
            </div>

            {/* Repère Ligne Seuil 289 Sièges (Majorité Absolue) */}
            <div
              style={{ left: `${thresholdPct}%` }}
              className="absolute top-0 bottom-0 w-[3px] bg-[#1A1A1A] z-10 pointer-events-none"
            >
              <div className="absolute -top-7 -translate-x-1/2 bg-[#1A1A1A] text-[#FFFFFF] font-mono text-[10px] font-bold px-1.5 py-0.5 whitespace-nowrap">
                SEUIL 289
              </div>
            </div>
          </div>

          {/* Légende Chiffrée Monospace */}
          <div className="grid grid-cols-3 gap-3 font-mono text-xs pt-1">
            <div className="p-2.5 bg-[#F7F7F5] border border-[#1A1A1A] flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 bg-[#2A9D8F] border border-[#1A1A1A] inline-block"></span>
                <span>POUR :</span>
              </span>
              <strong className="text-sm">{votesFor}</strong>
            </div>

            <div className="p-2.5 bg-[#F7F7F5] border border-[#1A1A1A] flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 bg-[#F4A261] border border-[#1A1A1A] inline-block"></span>
                <span>ABSTENTION :</span>
              </span>
              <strong className="text-sm">{votesAbstention}</strong>
            </div>

            <div className="p-2.5 bg-[#F7F7F5] border border-[#1A1A1A] flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 bg-[#E63946] border border-[#1A1A1A] inline-block"></span>
                <span>CONTRE :</span>
              </span>
              <strong className="text-sm">{votesAgainst}</strong>
            </div>
          </div>
        </div>

        {/* Message d'Alerte Parlementaire */}
        {votesFor < majorityThreshold && !article49Triggered && (
          <div className="p-3 bg-[#F7F7F5] border-2 border-[#E63946] flex items-center space-x-3 text-xs">
            <AlertTriangle className="w-5 h-5 text-[#E63946] shrink-0 stroke-[2]" />
            <div>
              <strong className="text-[#E63946] font-mono uppercase block">DÉFICIT PARLEMENTAIRE CONSTATÉ</strong>
              <span>Il manque actuellement <strong>{majorityThreshold - votesFor} voix</strong> pour garantir l'adoption républicaine du texte.</span>
            </div>
          </div>
        )}

        {article49Triggered && (
          <div className="p-3 bg-[#1A1A1A] text-[#FFFFFF] border-2 border-[#1A1A1A] flex items-center space-x-3 text-xs font-mono">
            <ShieldCheck className="w-5 h-5 text-[#F4A261] shrink-0 stroke-[2]" />
            <div>
              <span className="text-[#F4A261] font-bold block">ENGAGEMENT DE LA RESPONSABILITÉ GOUVERNEMENTALE</span>
              <span>Article 49.3 activé. Le texte est réputé adopté sauf vote d'une motion de censure sous 48h.</span>
            </div>
          </div>
        )}

        {/* Séparateur Franc */}
        <hr className="border-0 border-t-2 border-[#1A1A1A]" />

        {/* 3. Boutons d'Action Bruts avec Hard Shadows */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          <button
            onClick={onStandardVote}
            className="w-full sm:w-auto px-5 py-3 bg-[#FFFFFF] text-[#1A1A1A] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] hover:bg-[#F7F7F5] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center space-x-2"
          >
            <span>Soumettre au Vote Solennel</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Bouton Action Brutale : Article 49.3 */}
          <button
            onClick={handle49_3}
            disabled={article49Triggered}
            className={`w-full sm:w-auto px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#1A1A1A] flex items-center justify-center space-x-2 transition-all ${
              article49Triggered
                ? 'bg-[#E63946]/20 text-[#1A1A1A]/40 border-[#1A1A1A]/40 cursor-not-allowed'
                : 'bg-[#E63946] text-[#FFFFFF] shadow-[4px_4px_0px_#1A1A1A] hover:bg-[#E63946]/90 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'
            }`}
          >
            <AlertTriangle className="w-4 h-4 stroke-[2]" />
            <span>Engager l'Article 49.3 (Passage en Force)</span>
          </button>

        </div>

      </div>

    </div>
  );
};
