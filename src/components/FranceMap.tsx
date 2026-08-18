import React, { useState } from 'react';
import { GameState } from '../types/game';
import { MapPin, Flame, Users, AlertTriangle } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export interface RegionData {
  id: string;
  name: string;
  code: string;
  unemploymentRate: number;
  socialTension: 'faible' | 'moderee' | 'elevee' | 'crise';
  dominantSectors: string[];
  electoralBastion: string;
  strikeRiskPct: number;
  coordinates: { x: number; y: number; width: number; height: number };
}

const REGIONS_DATA: RegionData[] = [
  {
    id: 'idf',
    name: 'Île-de-France',
    code: '11',
    unemploymentRate: 6.8,
    socialTension: 'elevee',
    dominantSectors: ['Finance & La Défense', 'Transports RATP/SNCF', 'Tech & Startups'],
    electoralBastion: 'Centre / Renaissance (Ouest) & LFI (Nord/Est)',
    strikeRiskPct: 65,
    coordinates: { x: 235, y: 110, width: 65, height: 50 }
  },
  {
    id: 'hdf',
    name: 'Hauts-de-France',
    code: '32',
    unemploymentRate: 8.9,
    socialTension: 'crise',
    dominantSectors: ['Industrie & Métallurgie', 'Logistique', 'Agriculture'],
    electoralBastion: 'Rassemblement National (Bassin minier)',
    strikeRiskPct: 80,
    coordinates: { x: 240, y: 40, width: 75, height: 60 }
  },
  {
    id: 'ara',
    name: 'Auvergne-Rhône-Alpes',
    code: '84',
    unemploymentRate: 6.4,
    socialTension: 'moderee',
    dominantSectors: ['Chimie & Pharmacie (Lyon)', 'Nucléaire', 'Stations de Ski'],
    electoralBastion: 'Droite Républicaine (LR) & Écolos (Lyon)',
    strikeRiskPct: 40,
    coordinates: { x: 290, y: 220, width: 100, height: 80 }
  },
  {
    id: 'naq',
    name: 'Nouvelle-Aquitaine',
    code: '75',
    unemploymentRate: 6.7,
    socialTension: 'moderee',
    dominantSectors: ['Viticulture (Bordeaux)', 'Aéronautique', 'Agroalimentaire'],
    electoralBastion: 'Social-démocratie (PS) & MoDem / Droite',
    strikeRiskPct: 35,
    coordinates: { x: 120, y: 220, width: 110, height: 110 }
  },
  {
    id: 'occ',
    name: 'Occitanie',
    code: '76',
    unemploymentRate: 8.4,
    socialTension: 'elevee',
    dominantSectors: ['Airbus & Spatial (Toulouse)', 'Viticulture', 'Tourisme'],
    electoralBastion: 'Parti Socialiste / NFP & RN (Littoral)',
    strikeRiskPct: 60,
    coordinates: { x: 190, y: 320, width: 110, height: 80 }
  },
  {
    id: 'paca',
    name: 'Provence-Alpes-Côte d\'Azur',
    code: '93',
    unemploymentRate: 7.6,
    socialTension: 'elevee',
    dominantSectors: ['Grand Port Maritime Marseille', 'Tourisme', 'Défense Toulon'],
    electoralBastion: 'Rassemblement National & Droite',
    strikeRiskPct: 55,
    coordinates: { x: 320, y: 300, width: 95, height: 80 }
  },
  {
    id: 'bre',
    name: 'Bretagne',
    code: '53',
    unemploymentRate: 5.6,
    socialTension: 'faible',
    dominantSectors: ['Agroalimentaire & Élevage', 'Pêche & Naval', 'Numérique Rennes'],
    electoralBastion: 'Centre-Gauche / Centre Républicain',
    strikeRiskPct: 20,
    coordinates: { x: 45, y: 110, width: 90, height: 60 }
  },
  {
    id: 'pdl',
    name: 'Pays de la Loire',
    code: '52',
    unemploymentRate: 5.8,
    socialTension: 'faible',
    dominantSectors: ['Construction Navale (Saint-Nazaire)', 'PME Industrielles'],
    electoralBastion: 'Centre / Écolos (Nantes)',
    strikeRiskPct: 25,
    coordinates: { x: 125, y: 140, width: 80, height: 65 }
  },
  {
    id: 'nor',
    name: 'Normandie',
    code: '28',
    unemploymentRate: 6.9,
    socialTension: 'moderee',
    dominantSectors: ['Ports & Pétrochimie (Le Havre)', 'Filière Laitière', 'Nucléaire'],
    electoralBastion: 'Horizons / Centre-droit & RN rural',
    strikeRiskPct: 45,
    coordinates: { x: 160, y: 70, width: 85, height: 55 }
  },
  {
    id: 'ges',
    name: 'Grand Est',
    code: '44',
    unemploymentRate: 7.2,
    socialTension: 'moderee',
    dominantSectors: ['Viticulture Champagne/Alsace', 'Frontaliers', 'Métallurgie'],
    electoralBastion: 'Droite Républicaine & RN',
    strikeRiskPct: 40,
    coordinates: { x: 320, y: 70, width: 110, height: 85 }
  },
  {
    id: 'bfc',
    name: 'Bourgogne-Franche-Comté',
    code: '27',
    unemploymentRate: 6.3,
    socialTension: 'moderee',
    dominantSectors: ['Automobile (Sochaux)', 'Vins de Bourgogne', 'Bois'],
    electoralBastion: 'PS (Région) / RN (Territoires)',
    strikeRiskPct: 35,
    coordinates: { x: 290, y: 150, width: 85, height: 75 }
  },
  {
    id: 'cvl',
    name: 'Centre-Val de Loire',
    code: '24',
    unemploymentRate: 6.6,
    socialTension: 'faible',
    dominantSectors: ['Cosmetic Valley', 'Céréales & Agriculture', 'Logistique'],
    electoralBastion: 'Centre / Socialistes',
    strikeRiskPct: 25,
    coordinates: { x: 200, y: 160, width: 80, height: 65 }
  },
  {
    id: 'cor',
    name: 'Corse',
    code: '94',
    unemploymentRate: 7.1,
    socialTension: 'moderee',
    dominantSectors: ['Tourisme Balnéaire', 'BTP & Immobilier', 'Agriculture'],
    electoralBastion: 'Nationalistes & Régionalistes Corses',
    strikeRiskPct: 30,
    coordinates: { x: 400, y: 370, width: 35, height: 50 }
  }
];

interface FranceMapProps {
  state: GameState;
  onSelectRegion?: (region: RegionData) => void;
}

export const FranceMap: React.FC<FranceMapProps> = ({ state, onSelectRegion }) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData>(REGIONS_DATA[0]);

  const tensionFillColors = {
    faible: 'fill-[#FFFFFF] stroke-[#1A1A1A] hover:fill-[#2A9D8F]/20',
    moderee: 'fill-[#F4A261] stroke-[#1A1A1A] hover:fill-[#F4A261]/80',
    elevee: 'fill-[#E63946] stroke-[#1A1A1A] hover:fill-[#E63946]/80 text-[#FFFFFF]',
    crise: 'fill-[#E63946] stroke-[#1A1A1A] stroke-2 hover:fill-[#E63946]/90'
  };

  const handleRegionClick = (reg: RegionData) => {
    soundEffects.playKeystroke();
    setSelectedRegion(reg);
    if (onSelectRegion) onSelectRegion(reg);
  };

  return (
    <div className="bg-[#FFFFFF] border-2 border-[#1A1A1A] p-4 text-[#1A1A1A]">
      
      {/* En-Tête Carte */}
      <div className="flex items-center justify-between pb-2 border-b-2 border-[#1A1A1A]">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-[#1A1A1A] stroke-[2]" />
          <h3 className="font-serif font-bold text-sm">
            Carte Vectorielle des Tensions Territoriales
          </h3>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#1A1A1A]/60">13 RÉGIONS</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3 items-center">
        
        {/* Rendu SVG Flat Brutaliste */}
        <div className="lg:col-span-7 relative aspect-[500/440] w-full flex items-center justify-center bg-[#F7F7F5] border-2 border-[#1A1A1A] p-2">
          <svg viewBox="0 0 460 430" className="w-full h-full select-none">
            {REGIONS_DATA.map((reg) => {
              const isSelected = selectedRegion.id === reg.id;
              const { x, y, width, height } = reg.coordinates;
              const isCrisisOrHigh = reg.socialTension === 'crise' || reg.socialTension === 'elevee';
              return (
                <g key={reg.id} className="cursor-pointer" onClick={() => handleRegionClick(reg)}>
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    className={`${tensionFillColors[reg.socialTension]} ${
                      isSelected ? 'stroke-[#1A1A1A] stroke-[3]' : 'stroke-[1.5]'
                    }`}
                  />
                  <text
                    x={x + width / 2}
                    y={y + height / 2 - 3}
                    textAnchor="middle"
                    fill={isCrisisOrHigh ? '#FFFFFF' : '#1A1A1A'}
                    fontSize="9"
                    fontWeight="800"
                    className="pointer-events-none font-mono"
                  >
                    {reg.name.split('-')[0].slice(0, 11).toUpperCase()}
                  </text>
                  <text
                    x={x + width / 2}
                    y={y + height / 2 + 9}
                    textAnchor="middle"
                    fill={isCrisisOrHigh ? '#FFFFFF' : '#1A1A1A'}
                    fontSize="8"
                    fontWeight="600"
                    className="pointer-events-none font-mono"
                  >
                    {reg.unemploymentRate}% CHÔM.
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Fiche Régionale Brutaliste */}
        <div className="lg:col-span-5 bg-[#F7F7F5] p-4 border-2 border-[#1A1A1A] space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]">
            <div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#FFFFFF] border border-[#1A1A1A] uppercase">
                RÉGION #{selectedRegion.code}
              </span>
              <h4 className="font-serif font-black text-base text-[#1A1A1A] mt-1">
                {selectedRegion.name}
              </h4>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 border border-[#1A1A1A] uppercase ${
              selectedRegion.socialTension === 'crise' ? 'bg-[#E63946] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#1A1A1A]'
            }`}>
              {selectedRegion.socialTension.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#FFFFFF] p-2 border border-[#1A1A1A]">
              <span className="text-[10px] text-[#1A1A1A]/60 block">CHÔMAGE</span>
              <strong className="text-sm">{selectedRegion.unemploymentRate}%</strong>
            </div>
            <div className="bg-[#FFFFFF] p-2 border border-[#1A1A1A]">
              <span className="text-[10px] text-[#1A1A1A]/60 block">RISQUE GRÈVE</span>
              <strong className={`text-sm ${selectedRegion.strikeRiskPct > 50 ? 'text-[#E63946]' : 'text-[#1A1A1A]'}`}>
                {selectedRegion.strikeRiskPct}%
              </strong>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-[#1A1A1A]/60 block mb-1">
              FILIÈRES & LOBBYS CLÉS :
            </span>
            <div className="flex flex-wrap gap-1">
              {selectedRegion.dominantSectors.map((sec, idx) => (
                <span key={idx} className="text-[10px] bg-[#FFFFFF] px-1.5 py-0.5 border border-[#1A1A1A]">
                  {sec}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#1A1A1A] text-[11px]">
            <span className="text-[#1A1A1A]/60 block text-[10px]">BASTION ÉLECTORAL :</span>
            <p className="font-sans font-bold text-[#1A1A1A] mt-0.5">{selectedRegion.electoralBastion}</p>
          </div>
        </div>

      </div>

    </div>
  );
};
