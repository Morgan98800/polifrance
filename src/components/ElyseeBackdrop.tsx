import React, { useEffect, useState } from 'react';
import { GameState } from '../types/game';

interface ElyseeBackdropProps {
  state?: GameState | null;
}

export const ElyseeBackdrop: React.FC<ElyseeBackdropProps> = ({ state }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const strikeRisk = state?.social?.strikeRisk ?? 30;
  const isCrisis = strikeRisk >= 75;
  const isTense = strikeRisk >= 50 && strikeRisk < 75;

  // Effet de parallaxe subtil avec la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 8;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. PLAN LOINTAIN : CIEL ATMOSPHÉRIQUE DYNAMIQUE */}
      <div 
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: isCrisis
            ? 'radial-gradient(ellipse at 50% 20%, #2A1118 0%, #150A10 60%, #080509 100%)'
            : isTense
            ? 'radial-gradient(ellipse at 50% 20%, #1F1924 0%, #110F18 60%, #07070D 100%)'
            : 'radial-gradient(ellipse at 50% 20%, #101B30 0%, #0B1220 55%, #060911 100%)',
        }}
      />

      {/* Étoiles & Lueur d'Apparat */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(#FFE8A3_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* 2. PLAN MOYEN 1 : NUAGES VOLUMÉTRIQUES EN PARALLAXE */}
      <div 
        className="absolute top-0 left-0 right-0 h-96 opacity-25 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
        }}
      >
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 400">
          <defs>
            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isCrisis ? "#D44242" : "#D4AF37"} stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path 
            d="M0,150 Q150,90 300,160 T600,140 T900,170 T1200,130 L1200,400 L0,400 Z" 
            fill="url(#cloudGrad)"
          />
          <path 
            d="M0,220 Q200,160 400,230 T800,200 T1200,240 L1200,400 L0,400 Z" 
            fill="url(#cloudGrad)"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* 3. PLAN MOYEN 2 : SILHOUETTE DES TOITS DE PARIS & MONUMENTS */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-72 opacity-35 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px, 0)`,
        }}
      >
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1400 300">
          {/* Ligne d'horizon des toits de Paris en pixel art vectoriel */}
          <path
            d="M0,300 L0,220 L40,220 L45,190 L55,190 L60,220 L120,220 L130,170 L140,170 L150,220 
               L220,220 L240,140 L245,140 L250,220 L320,220 
               L380,220 L395,80 L405,80 L420,220 L480,220 
               L560,220 L580,160 L620,160 L640,220 L720,220 
               L780,220 L800,110 L820,110 L840,220 L920,220 
               L1000,220 L1020,150 L1060,150 L1080,220 L1180,220 
               L1240,220 L1260,180 L1300,180 L1320,220 L1400,220 L1400,300 Z"
            fill="#09101C"
          />
          {/* Dôme des Invalides stylisé */}
          <path
            d="M790,220 Q810,130 830,220 Z"
            fill={isCrisis ? "#D44242" : "#D4AF37"}
            opacity="0.3"
          />
          {/* Flèche Tour Eiffel stylisée au loin */}
          <path
            d="M395,220 L400,70 L405,220 Z"
            fill="#060B14"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* 4. PLAN RAPPROCHÉ : VERRIÈRE & BALUSTRADE DU PALAIS DE L'ÉLYSÉE */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 1.2}px, ${mouseOffset.y * 1.2}px, 0)`,
        }}
      >
        {/* Balustrade d'honneur en bas de fenêtre */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#060911] via-[#090F1C]/80 to-transparent border-t border-[#C5A059]/20" />

        {/* Halo de lustre du Salon Doré en haut de l'écran */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] opacity-20 pointer-events-none"
          style={{
            background: isCrisis
              ? 'radial-gradient(ellipse at 50% 0%, rgba(212, 66, 66, 0.5) 0%, rgba(212, 66, 66, 0) 70%)'
              : 'radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.45) 0%, rgba(212, 175, 55, 0) 70%)',
          }}
        />
      </div>

      {/* 5. VIGNETAGE CINÉMATIQUE DE CONFORT VISUEL */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, transparent 40%, rgba(6, 9, 17, 0.75) 90%)',
        }}
      />

    </div>
  );
};
