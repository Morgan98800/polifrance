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

  // Effet de parallaxe doux
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
      
      {/* 1. FOND NOCTURNE & DÉGRADÉ D'ÉTAT SOUVERAIN */}
      <div 
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: isCrisis
            ? 'radial-gradient(ellipse at 50% 15%, #2A1118 0%, #150A10 60%, #070407 100%)'
            : isTense
            ? 'radial-gradient(ellipse at 50% 15%, #1D1724 0%, #100E17 60%, #06060C 100%)'
            : 'radial-gradient(ellipse at 50% 15%, #101A2E 0%, #0A101C 60%, #05080E 100%)',
        }}
      />

      {/* 2. TRAME GUILLOCHÉE D'IMPRIMERIE D'ÉTAT (Effet Passeport / Papier Sécurisé) */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(212, 175, 55, 0.45) 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* 3. HALO FEUTRÉ DU LUSTRE CENTRAL DU SALON DORÉ */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-20 pointer-events-none"
        style={{
          background: isCrisis
            ? 'radial-gradient(ellipse at 50% 0%, rgba(212, 66, 66, 0.45) 0%, rgba(212, 66, 66, 0) 70%)'
            : 'radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.4) 0%, rgba(212, 175, 55, 0) 70%)',
        }}
      />

      {/* 4. SILHOUETTE NOCTURNE DES TOITS DE PARIS EN ARRIÈRE-PLAN LOINTAIN */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 opacity-20 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px, 0)`,
        }}
      >
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1400 200">
          <path
            d="M0,200 L0,140 L40,140 L45,120 L55,120 L60,140 L120,140 L130,105 L140,105 L150,140 
               L220,140 L240,85 L245,85 L250,140 L320,140 
               L380,140 L395,35 L405,35 L420,140 L480,140 
               L560,140 L580,100 L620,100 L640,140 L720,140 
               L780,140 L800,65 L820,65 L840,140 L920,140 
               L1000,140 L1020,95 L1060,95 L1080,140 L1180,140 
               L1240,140 L1260,115 L1300,115 L1320,140 L1400,140 L1400,200 Z"
            fill="#09101C"
          />
          {/* Dôme doré des Invalides */}
          <path
            d="M790,140 Q810,75 830,140 Z"
            fill={isCrisis ? "#D44242" : "#D4AF37"}
            opacity="0.3"
          />
          {/* Flèche Tour Eiffel */}
          <path
            d="M397,140 L400,30 L403,140 Z"
            fill="#060A12"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* 5. VIGNETAGE CINÉMATIQUE FEUTRÉ */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, transparent 40%, rgba(5, 7, 13, 0.7) 95%)',
        }}
      />

    </div>
  );
};
