import React, { useState, useMemo } from 'react';
import { ParliamentGroup, IdeologyGroup } from '../types/game';
import { generateHemicycleCoordinates, SeatCoordinate } from '../engine/parliament';
import { Landmark, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface HemicycleProps {
  groups: ParliamentGroup[];
  majorityThreshold?: number; // 289
  onGroupClick?: (group: ParliamentGroup) => void;
}

export const Hemicycle: React.FC<HemicycleProps> = ({ groups, majorityThreshold = 289, onGroupClick }) => {
  const [hoveredSeat, setHoveredSeat] = useState<SeatCoordinate | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<IdeologyGroup | null>(null);

  const seats = useMemo(() => generateHemicycleCoordinates(groups), [groups]);

  const groupMap = useMemo(() => {
    const map = new Map<IdeologyGroup, ParliamentGroup>();
    groups.forEach(g => map.set(g.id, g));
    return map;
  }, [groups]);

  const totalSeats = 577;
  const currentMajority = useMemo(() => {
    return groups
      .filter(g => g.stanceTowardsPlayer === 'loyal' || g.stanceTowardsPlayer === 'coalition')
      .reduce((sum, g) => sum + g.seats, 0);
  }, [groups]);

  const isAbsoluteMajority = currentMajority >= majorityThreshold;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      {/* En-tête de l'hémicycle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800 flex items-center justify-center">
            <Landmark className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-slate-100 text-base flex items-center space-x-2">
              <span>Hémicycle de l'Assemblée nationale</span>
              <span className="text-xs font-normal text-slate-400">(Palais Bourbon — 577 députés)</span>
            </h3>
            <div className="flex items-center space-x-3 text-xs mt-0.5">
              <span className="text-slate-400">Seuil de Majorité Absolue : <strong className="text-amber-400">289</strong></span>
              <span className="text-slate-600">•</span>
              <span className={`font-semibold ${isAbsoluteMajority ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isAbsoluteMajority ? 'Majorité Absolue Assurée' : 'Majorité Relative / Équilibre Fragile'} ({currentMajority} sièges)
              </span>
            </div>
          </div>
        </div>

        {/* Jauge d'équilibre */}
        <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          {isAbsoluteMajority ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-amber-400 animate-pulse" />
          )}
          <span className="text-xs font-medium text-slate-300">
            {isAbsoluteMajority ? 'Stabilité Gouvernementale' : 'Risque de Censure Réel'}
          </span>
        </div>
      </div>

      {/* Visuel SVG de l'hémicycle */}
      <div className="relative w-full aspect-[700/360] flex items-center justify-center my-3 overflow-hidden">
        <svg viewBox="0 0 700 360" className="w-full h-full max-w-2xl select-none">
          {/* Fond de la tribune / Présidence */}
          <circle cx="350" cy="330" r="100" fill="#070d19" stroke="#1e293b" strokeWidth="2" />
          <path d="M 280 330 A 70 70 0 0 1 420 330 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="350" y="322" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600" letterSpacing="1">
            TRIBUNE DU PRÉSIDENT
          </text>

          {/* Ligne médiane de l'hémicycle */}
          <line x1="350" y1="130" x2="350" y2="40" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

          {/* Rendu des 577 sièges */}
          {seats.map((seat) => {
            const group = groupMap.get(seat.groupId);
            const color = group ? group.color : '#64748b';
            const isHovered = hoveredSeat?.seatIndex === seat.seatIndex;
            const isGroupSelected = selectedGroupId === seat.groupId;

            return (
              <circle
                key={seat.seatIndex}
                cx={seat.x}
                cy={seat.y}
                r={isHovered ? 4.5 : (isGroupSelected ? 3.8 : 3)}
                fill={color}
                opacity={selectedGroupId && !isGroupSelected ? 0.25 : 0.95}
                stroke={isHovered ? '#ffffff' : (isGroupSelected ? '#ffffff' : '#0f172a')}
                strokeWidth={isHovered ? 1.5 : 0.5}
                className="transition-all duration-150 cursor-pointer"
                onMouseEnter={() => setHoveredSeat(seat)}
                onMouseLeave={() => setHoveredSeat(null)}
                onClick={() => {
                  if (group && onGroupClick) onGroupClick(group);
                  setSelectedGroupId(selectedGroupId === seat.groupId ? null : seat.groupId);
                }}
              />
            );
          })}
        </svg>

        {/* Tooltip au survol d'un siège */}
        {hoveredSeat && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-slate-700 px-3 py-1.5 rounded-lg shadow-xl text-xs flex items-center space-x-2 pointer-events-none z-10">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: groupMap.get(hoveredSeat.groupId)?.color }}
            />
            <span className="font-bold text-slate-100">
              {groupMap.get(hoveredSeat.groupId)?.name}
            </span>
            <span className="text-slate-400">
              ({groupMap.get(hoveredSeat.groupId)?.seats} sièges)
            </span>
          </div>
        )}
      </div>

      {/* Légende des Groupes Parlementaires */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-3 border-t border-slate-800">
        {groups.map((group) => {
          const isSelected = selectedGroupId === group.id;
          return (
            <button
              key={group.id}
              onClick={() => setSelectedGroupId(isSelected ? null : group.id)}
              className={`p-2 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-800 border-amber-400 ring-1 ring-amber-400'
                  : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: group.color }} />
                <span className="font-bold text-xs text-slate-200 truncate">{group.shortName}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                <span>{group.seats} sièges</span>
                <span className="font-mono text-slate-300">
                  {Math.round((group.seats / totalSeats) * 100)}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
