import React from 'react';
import { GameMode, Candidate } from '../types/game';
import { Vote, Landmark, ArrowRight, ShieldCheck, TrendingUp, Users, User } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface ModeSelectProps {
  candidate: Candidate;
  onSelectMode: (mode: GameMode) => void;
  onBack: () => void;
}

export const ModeSelect: React.FC<ModeSelectProps> = ({ candidate, onSelectMode, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 text-[#1A1A1A]">
      
      {/* Profil rappelé Brutaliste */}
      <div className="bg-[#FFFFFF] border-2 border-[#1A1A1A] p-4 shadow-[4px_4px_0px_#1A1A1A] mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 bg-[#F7F7F5] border-2 border-[#1A1A1A] flex items-center justify-center font-serif font-bold text-lg overflow-hidden">
            {candidate.avatar ? (
              <img src={candidate.avatar} alt={candidate.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 stroke-[1.5]" />
            )}
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-[#F7F7F5] border border-[#1A1A1A]">
              FIGURE SÉLECTIONNÉE
            </span>
            <h3 className="font-serif font-black text-xl text-[#1A1A1A] mt-1">{candidate.name}</h3>
            <p className="text-xs font-mono text-[#1A1A1A]/80 font-bold">{candidate.party}</p>
          </div>
        </div>

        <button
          onClick={() => { soundEffects.playKeystroke(); onBack(); }}
          className="px-3 py-1.5 bg-[#F7F7F5] hover:bg-[#FFFFFF] border-2 border-[#1A1A1A] font-mono text-xs font-bold uppercase"
        >
          [ Changer ]
        </button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1A1A1A]">
          Scénario Républicain de Départ
        </h2>
        <p className="mt-2 text-sm font-sans text-[#1A1A1A]/80 max-w-xl mx-auto">
          Conquérez l'Élysée lors d'une campagne féroce ou assumez directement les responsabilités du pouvoir présidentiel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Mode A : Campagne 2027 */}
        <div
          onClick={() => { soundEffects.playStamp(); onSelectMode('campaign'); }}
          className="cursor-pointer p-6 bg-[#FFFFFF] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] hover:bg-[#F7F7F5] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 bg-[#1D3557] text-[#FFFFFF] border border-[#1A1A1A] flex items-center justify-center mb-3">
              <Vote className="w-5 h-5 stroke-[2]" />
            </div>
            
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-[#F7F7F5] border border-[#1A1A1A]">
              SCÉNARIO A
            </span>
            
            <h3 className="text-xl font-serif font-black text-[#1A1A1A] mt-2">
              Campagne Présidentielle 2027
            </h3>
            
            <p className="text-xs font-mono text-[#1A1A1A]/70 mt-1 italic">
              « Départ : Novembre 2026 (6 mois avant le 1er tour) »
            </p>

            <ul className="mt-4 space-y-2 text-xs font-sans text-[#1A1A1A]/90">
              <li className="flex items-start space-x-2">
                <span className="font-mono font-bold text-[#1D3557]">•</span>
                <span>Chasse aux 500 parrainages de maires et levées de fonds</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-mono font-bold text-[#1D3557]">•</span>
                <span>Grands meetings, interviews télévisées au 20h et polémiques</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-mono font-bold text-[#1D3557]">•</span>
                <span>Grand Débat télévisé d'entre-deux-tours et verdict à 20h00</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-3 border-t-2 border-[#1A1A1A] flex items-center justify-between font-mono font-bold text-xs uppercase">
            <span>Lancer la Campagne</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </div>
        </div>

        {/* Mode B : Gouvernance Élysée */}
        <div
          onClick={() => { soundEffects.playStamp(); onSelectMode('governance'); }}
          className="cursor-pointer p-6 bg-[#FFFFFF] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] hover:bg-[#F7F7F5] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 bg-[#1A1A1A] text-[#FFFFFF] border border-[#1A1A1A] flex items-center justify-center mb-3">
              <Landmark className="w-5 h-5 stroke-[2]" />
            </div>
            
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-[#F7F7F5] border border-[#1A1A1A]">
              SCÉNARIO B
            </span>
            
            <h3 className="text-xl font-serif font-black text-[#1A1A1A] mt-2">
              Exercice du Pouvoir à l'Élysée
            </h3>
            
            <p className="text-xs font-mono text-[#1A1A1A]/70 mt-1 italic">
              « Départ : Mai 2027 (Au lendemain de votre investiture) »
            </p>

            <ul className="mt-4 space-y-2 text-xs font-sans text-[#1A1A1A]/90">
              <li className="flex items-start space-x-2">
                <span className="font-mono font-bold text-[#1A1A1A]">•</span>
                <span>Nomination de Matignon et composition du gouvernement</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-mono font-bold text-[#1A1A1A]">•</span>
                <span>Navette parlementaire, vote du budget et usage de l'Article 49.3</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-mono font-bold text-[#1A1A1A]">•</span>
                <span>Gestion des crises sociales, discipline européenne et réformes</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-3 border-t-2 border-[#1A1A1A] flex items-center justify-between font-mono font-bold text-xs uppercase">
            <span>Prendre vos Fonctions</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </div>
        </div>

      </div>
    </div>
  );
};
