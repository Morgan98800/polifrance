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

  // Effet de parallaxe doux avec le curseur
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 14;
      const y = (e.clientY / innerHeight - 0.5) * 9;
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
            ? 'radial-gradient(ellipse at 50% 15%, #35131C 0%, #1A0B13 55%, #080407 100%)'
            : isTense
            ? 'radial-gradient(ellipse at 50% 15%, #241D2C 0%, #13101B 55%, #07070D 100%)'
            : 'radial-gradient(ellipse at 50% 15%, #12213D 0%, #0C1527 55%, #060911 100%)',
        }}
      />

      {/* Rayons de Soleil Volumétriques (Sunbeams) */}
      <div 
        className="absolute -top-10 left-1/4 w-96 h-[600px] opacity-15 pointer-events-none rotate-12"
        style={{
          background: 'linear-gradient(180deg, rgba(212, 175, 55, 0.45) 0%, rgba(212, 175, 55, 0) 100%)',
          filter: 'blur(30px)',
        }}
      />
      <div 
        className="absolute -top-10 right-1/4 w-96 h-[600px] opacity-15 pointer-events-none -rotate-12"
        style={{
          background: isCrisis
            ? 'linear-gradient(180deg, rgba(212, 66, 66, 0.4) 0%, rgba(212, 66, 66, 0) 100%)'
            : 'linear-gradient(180deg, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0) 100%)',
          filter: 'blur(30px)',
        }}
      />

      {/* 2. PLAN MOYEN 1 : NUAGES VOLUMÉTRIQUES EN PARALLAXE */}
      <div 
        className="absolute top-0 left-0 right-0 h-96 opacity-30 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px, 0)`,
        }}
      >
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 400">
          <defs>
            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isCrisis ? "#D44242" : "#D4AF37"} stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path 
            d="M0,130 Q160,70 320,140 T640,120 T960,150 T1200,110 L1200,400 L0,400 Z" 
            fill="url(#cloudGrad)"
          />
          <path 
            d="M0,200 Q220,140 440,210 T880,180 T1200,220 L1200,400 L0,400 Z" 
            fill="url(#cloudGrad)"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* 3. PLAN MOYEN 2 : SILHOUETTE DES TOITS DE PARIS & MONUMENTS HISTORIQUES */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-80 opacity-40 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.6}px, ${mouseOffset.y * 0.6}px, 0)`,
        }}
      >
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1400 320">
          <path
            d="M0,320 L0,220 L40,220 L45,190 L55,190 L60,220 L120,220 L130,170 L140,170 L150,220 
               L220,220 L240,140 L245,140 L250,220 L320,220 
               L380,220 L395,70 L405,70 L420,220 L480,220 
               L560,220 L580,160 L620,160 L640,220 L720,220 
               L780,220 L800,105 L820,105 L840,220 L920,220 
               L1000,220 L1020,150 L1060,150 L1080,220 L1180,220 
               L1240,220 L1260,180 L1300,180 L1320,220 L1400,220 L1400,320 Z"
            fill="#09101C"
          />
          {/* Dôme des Invalides illuminé d'or */}
          <path
            d="M790,220 Q810,120 830,220 Z"
            fill={isCrisis ? "#D44242" : "#D4AF37"}
            opacity="0.35"
          />
          {/* Flèche Tour Eiffel */}
          <path
            d="M396,220 L400,60 L404,220 Z"
            fill="#060A12"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* 4. PLAN MOYEN 3 : GRANDS ARBRES SÉCULAIRES DU PARC DE L'ÉLYSÉE (Style Owlboy) */}
      {/* Arbre Majestueux Gauche */}
      <div 
        className="hidden xl:block absolute -bottom-10 -left-20 w-[420px] h-[640px] opacity-60 pointer-events-none transition-transform duration-300 ease-out animate-sway-slow"
        style={{
          transform: `translate3d(${mouseOffset.x * 1.0}px, ${mouseOffset.y * 1.0}px, 0)`,
          transformOrigin: 'bottom center',
        }}
      >
        <svg viewBox="0 0 400 600" className="w-full h-full">
          {/* Tronc sculpté en bois noble */}
          <path d="M180,600 Q200,420 160,300 Q150,220 180,150" stroke="#161B26" strokeWidth="38" fill="none" strokeLinecap="round" />
          <path d="M160,300 Q110,240 80,180" stroke="#161B26" strokeWidth="22" fill="none" strokeLinecap="round" />
          <path d="M170,250 Q230,190 270,160" stroke="#161B26" strokeWidth="18" fill="none" strokeLinecap="round" />
          {/* Masses de feuillages étagées style pixel art / Owlboy */}
          <ellipse cx="140" cy="180" rx="90" ry="70" fill="#0D201A" />
          <ellipse cx="150" cy="170" rx="75" ry="55" fill="#13362B" />
          <ellipse cx="160" cy="160" rx="60" ry="40" fill={isCrisis ? "#3D1A1E" : "#1B4738"} />
          <ellipse cx="250" cy="160" rx="70" ry="55" fill="#0D201A" />
          <ellipse cx="260" cy="150" rx="55" ry="40" fill="#13362B" />
          <ellipse cx="180" cy="100" rx="80" ry="60" fill="#0D201A" />
          <ellipse cx="190" cy="90" rx="60" ry="45" fill={isCrisis ? "#4A1D22" : "#205442"} />
          <ellipse cx="80" cy="200" rx="50" ry="40" fill="#0E241E" />
        </svg>
      </div>

      {/* Arbre Majestueux Droit */}
      <div 
        className="hidden xl:block absolute -bottom-10 -right-20 w-[420px] h-[640px] opacity-60 pointer-events-none transition-transform duration-300 ease-out animate-sway-slow"
        style={{
          transform: `translate3d(${mouseOffset.x * 1.0}px, ${mouseOffset.y * 1.0}px, 0)`,
          transformOrigin: 'bottom center',
        }}
      >
        <svg viewBox="0 0 400 600" className="w-full h-full">
          <path d="M220,600 Q200,420 240,300 Q250,220 220,150" stroke="#161B26" strokeWidth="38" fill="none" strokeLinecap="round" />
          <path d="M240,300 Q290,240 320,180" stroke="#161B26" strokeWidth="22" fill="none" strokeLinecap="round" />
          <path d="M230,250 Q170,190 130,160" stroke="#161B26" strokeWidth="18" fill="none" strokeLinecap="round" />
          <ellipse cx="260" cy="180" rx="90" ry="70" fill="#0D201A" />
          <ellipse cx="250" cy="170" rx="75" ry="55" fill="#13362B" />
          <ellipse cx="240" cy="160" rx="60" ry="40" fill={isCrisis ? "#3D1A1E" : "#1B4738"} />
          <ellipse cx="150" cy="160" rx="70" ry="55" fill="#0D201A" />
          <ellipse cx="140" cy="150" rx="55" ry="40" fill="#13362B" />
          <ellipse cx="220" cy="100" rx="80" ry="60" fill="#0D201A" />
          <ellipse cx="210" cy="90" rx="60" ry="45" fill={isCrisis ? "#4A1D22" : "#205442"} />
          <ellipse cx="320" cy="200" rx="50" ry="40" fill="#0E241E" />
        </svg>
      </div>

      {/* 5. POUSSIÈRES D'OR EN SUSPENSION (Particules Vivantes) */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full animate-float-dust-1"
          style={{ background: isCrisis ? '#EF4444' : '#F5D77F', boxShadow: '0 0 10px #D4AF37' }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full animate-float-dust-2"
          style={{ background: isCrisis ? '#F87171' : '#FFE8A3', boxShadow: '0 0 8px #D4AF37' }}
        />
        <div 
          className="absolute top-2/3 left-1/3 w-1.5 h-1.5 rounded-full animate-float-dust-1"
          style={{ background: isCrisis ? '#DC2626' : '#E5C365', boxShadow: '0 0 8px #D4AF37' }}
        />
        <div 
          className="absolute top-1/2 right-1/6 w-2 h-2 rounded-full animate-float-dust-2"
          style={{ background: isCrisis ? '#EF4444' : '#F5D77F', boxShadow: '0 0 10px #D4AF37' }}
        />
      </div>

      {/* 6. PLAN RAPPROCHÉ : ÉTENDARD TRICOLORE & BALUSTRADE DU PALAIS */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#05070D] via-[#080D18]/85 to-transparent border-t border-[#C5A059]/25 flex items-center justify-between px-8"
        style={{
          transform: `translate3d(${mouseOffset.x * 1.2}px, 0, 0)`,
        }}
      >
        {/* Drapeau Tricolore Flottant à Gauche */}
        <div className="hidden sm:flex items-center space-x-2.5 opacity-60">
          <div className="w-1 h-10 bg-[#D4AF37] rounded-t-full shadow-xs" />
          <div className="w-8 h-5 flex animate-wave-flag shadow-md border border-white/20">
            <div className="flex-1 bg-[#002654]" />
            <div className="flex-1 bg-[#FFFFFF]" />
            <div className="flex-1 bg-[#CE1126]" />
          </div>
        </div>

        {/* Halo du Lustre Central du Salon Doré */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] opacity-25 pointer-events-none"
          style={{
            background: isCrisis
              ? 'radial-gradient(ellipse at 50% 0%, rgba(212, 66, 66, 0.5) 0%, rgba(212, 66, 66, 0) 70%)'
              : 'radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.45) 0%, rgba(212, 175, 55, 0) 70%)',
          }}
        />

        {/* Drapeau Tricolore Flottant à Droite */}
        <div className="hidden sm:flex items-center space-x-2.5 opacity-60">
          <div className="w-8 h-5 flex animate-wave-flag shadow-md border border-white/20">
            <div className="flex-1 bg-[#002654]" />
            <div className="flex-1 bg-[#FFFFFF]" />
            <div className="flex-1 bg-[#CE1126]" />
          </div>
          <div className="w-1 h-10 bg-[#D4AF37] rounded-t-full shadow-xs" />
        </div>
      </div>

      {/* 7. VIGNETAGE CINÉMATIQUE DE CONFORT VISUEL */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, transparent 35%, rgba(5, 7, 13, 0.8) 95%)',
        }}
      />

    </div>
  );
};
