import React from 'react';
import { GameState } from '../types/game';
import { 
  Award, Euro, Flame, TrendingUp, ShieldAlert, 
  FileText, Landmark, Globe, Zap, Sparkles, Scale, User 
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface ExecutivePanelProps {
  state: GameState;
  onOpenActionModal?: (actionType: string) => void;
  onOpenCouncilOfMinisters?: () => void;
  onOpenDiplomacy?: () => void;
}

export const ExecutivePanel: React.FC<ExecutivePanelProps> = ({
  state,
  onOpenActionModal,
  onOpenCouncilOfMinisters,
  onOpenDiplomacy
}) => {
  const { player, economy, social } = state;

  const tensionBadgeColors = {
    faible: 'bg-[#2A9D8F] text-[#FFFFFF] border-[#1A1A1A]',
    moderee: 'bg-[#F4A261] text-[#1A1A1A] border-[#1A1A1A]',
    elevee: 'bg-[#E63946] text-[#FFFFFF] border-[#1A1A1A]',
    crise: 'bg-[#E63946] text-[#FFFFFF] border-[#1A1A1A]',
  };

  const handleActionClick = (type: string, callback?: () => void) => {
    soundEffects.playKeystroke();
    if (callback) callback();
    else if (onOpenActionModal) onOpenActionModal(type);
  };

  return (
    <div className="bg-[#FFFFFF] border-2 border-[#1A1A1A] p-5 shadow-[4px_4px_0px_#1A1A1A] space-y-5 flex flex-col justify-between h-full text-[#1A1A1A]">
      
      {/* 1. Carte d'Identité Présidentielle & Faction */}
      <div>
        <div className="flex items-center space-x-3.5 pb-4 border-b-2 border-[#1A1A1A]">
          <div className="w-14 h-14 bg-[#F7F7F5] border-2 border-[#1A1A1A] flex items-center justify-center font-serif font-black text-xl text-[#1A1A1A] shrink-0 overflow-hidden">
            {player.avatar ? (
              <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 stroke-[1.5]" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-[#F7F7F5] border border-[#1A1A1A] inline-block">
              {state.mode === 'campaign' ? 'CANDIDAT 2027' : 'PRÉSIDENCE'}
            </span>
            <h2 className="font-serif font-black text-lg text-[#1A1A1A] truncate mt-1">
              {player.name}
            </h2>
            <p className="text-xs font-mono text-[#1A1A1A]/70 truncate">{player.party}</p>
          </div>
        </div>

        {/* Capital Politique & Trésorerie */}
        <div className="grid grid-cols-2 gap-2 mt-3 font-mono text-xs">
          <div className="bg-[#F7F7F5] p-2.5 border border-[#1A1A1A]">
            <span className="text-[10px] uppercase text-[#1A1A1A]/60 font-bold block">
              AUTORITÉ
            </span>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <Award className="w-4 h-4 text-[#1D3557] stroke-[2]" />
              <strong className="text-base text-[#1A1A1A]">
                {state.authorityPoints} <span className="text-[10px] font-normal">pts</span>
              </strong>
            </div>
          </div>

          <div className="bg-[#F7F7F5] p-2.5 border border-[#1A1A1A]">
            <span className="text-[10px] uppercase text-[#1A1A1A]/60 font-bold block">
              FONDS D'ÉTAT
            </span>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <Euro className="w-4 h-4 text-[#2A9D8F] stroke-[2]" />
              <strong className="text-base text-[#1A1A1A]">
                {(state.funds / 1000).toFixed(1)} <span className="text-[10px] font-normal">M€</span>
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Jauges Clés Permanentes (Flat Design sans dégradé) */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono font-bold text-[#1A1A1A]/60 uppercase tracking-wider block border-b border-[#1A1A1A] pb-1">
          INDICATEURS D'ÉTAT
        </span>

        {/* Popularité Globale */}
        <div className="bg-[#F7F7F5] p-2.5 border border-[#1A1A1A]">
          <div className="flex justify-between items-center text-xs font-mono mb-1">
            <span className="font-bold">POPULARITÉ :</span>
            <strong className="text-sm">{state.popularity}%</strong>
          </div>
          <div className="w-full bg-[#FFFFFF] border border-[#1A1A1A] h-3 flex">
            <div
              className="bg-[#2A9D8F] h-full"
              style={{ width: `${state.popularity}%` }}
            />
          </div>
        </div>

        {/* Tension Sociale */}
        <div className="bg-[#F7F7F5] p-2.5 border border-[#1A1A1A]">
          <div className="flex justify-between items-center text-xs font-mono mb-1">
            <span className="font-bold flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5 text-[#E63946] stroke-[2]" />
              <span>CLIMAT SOCIAL :</span>
            </span>
            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 border ${tensionBadgeColors[social.tensionIndex]}`}>
              {social.tensionIndex}
            </span>
          </div>
          <div className="w-full bg-[#FFFFFF] border border-[#1A1A1A] h-3 flex mt-1">
            <div
              className={`h-full ${social.strikeRisk > 50 ? 'bg-[#E63946]' : 'bg-[#F4A261]'}`}
              style={{ width: `${social.strikeRisk}%` }}
            />
          </div>
        </div>

        {/* Macroéconomie : Déficit & Spread */}
        <div className="bg-[#F7F7F5] p-2.5 border border-[#1A1A1A] font-mono text-xs">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] text-[#1A1A1A]/60 block">DÉFICIT</span>
              <strong className={economy.deficit > 3.0 ? 'text-[#E63946]' : 'text-[#2A9D8F]'}>
                {economy.deficit}% PIB
              </strong>
            </div>
            <div className="h-6 w-px bg-[#1A1A1A]/30" />
            <div className="text-right">
              <span className="text-[10px] text-[#1A1A1A]/60 block">SPREAD OAT</span>
              <strong className={economy.spreadOatBund > 80 ? 'text-[#E63946]' : 'text-[#1A1A1A]'}>
                +{economy.spreadOatBund} bps
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Leviers de l'Exécutif (Boutons Brutalistes) */}
      <div>
        <span className="text-[10px] font-mono font-bold text-[#1A1A1A]/60 uppercase tracking-wider block mb-2">
          LEVIERS DE GOUVERNEMENT
        </span>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
          <button
            onClick={() => handleActionClick('decret')}
            className="p-2.5 bg-[#FFFFFF] hover:bg-[#F7F7F5] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex flex-col items-center justify-center space-y-1 transition-all"
          >
            <FileText className="w-4 h-4 text-[#1D3557] stroke-[2]" />
            <span>Décret</span>
          </button>

          <button
            onClick={() => handleActionClick('reforme')}
            className="p-2.5 bg-[#FFFFFF] hover:bg-[#F7F7F5] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex flex-col items-center justify-center space-y-1 transition-all"
          >
            <Scale className="w-4 h-4 text-[#F4A261] stroke-[2]" />
            <span>Projet Loi</span>
          </button>

          <button
            onClick={() => handleActionClick('conseil_ministres', onOpenCouncilOfMinisters)}
            className="p-2.5 bg-[#FFFFFF] hover:bg-[#F7F7F5] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex flex-col items-center justify-center space-y-1 transition-all"
          >
            <Landmark className="w-4 h-4 text-[#1A1A1A] stroke-[2]" />
            <span>Matignon</span>
          </button>

          <button
            onClick={() => handleActionClick('diplomatie_ue', onOpenDiplomacy)}
            className="p-2.5 bg-[#FFFFFF] hover:bg-[#F7F7F5] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex flex-col items-center justify-center space-y-1 transition-all"
          >
            <Globe className="w-4 h-4 text-[#2A9D8F] stroke-[2]" />
            <span>Sommet UE</span>
          </button>
        </div>
      </div>

    </div>
  );
};
