import React, { useEffect } from 'react';
import { GameState } from '../types/game';
import confetti from 'canvas-confetti';
import { Trophy, Award, Radio, RefreshCw, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

interface ElectionNightModalProps {
  state: GameState;
  onRestart: () => void;
}

export const ElectionNightModal: React.FC<ElectionNightModalProps> = ({ state, onRestart }) => {
  const isWinner = state.victory;
  const finalScore = state.pollingIntentionsFirstRound > 50 
    ? (50 + Math.min(6, (state.popularity - 30) * 0.2)).toFixed(1)
    : (48 + Math.min(5, (state.popularity - 25) * 0.15)).toFixed(1);

  useEffect(() => {
    if (isWinner) {
      // Confettis tricolores français (Bleu, Blanc, Rouge, Or)
      const duration = 3.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#002654', '#ffffff', '#ce1126', '#d4af37']
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#002654', '#ffffff', '#ce1126', '#d4af37']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isWinner]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 text-center">
        
        {/* Liseré tricolore */}
        <div className="h-2 w-full flex">
          <div className="h-full w-1/3 bg-[#002654]"></div>
          <div className="h-full w-1/3 bg-white"></div>
          <div className="h-full w-1/3 bg-[#ce1126]"></div>
        </div>

        {/* 20h00 Décompte TV */}
        <div className="p-8 bg-gradient-to-b from-slate-850 to-slate-900 border-b border-slate-800">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-red-950/90 border border-red-800 text-red-300 text-xs font-black uppercase tracking-wider mb-4">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>ESTIMATION OFFICIELLE DE 20H00</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-slate-100">
            20:00:00
          </h2>

          <p className="mt-2 text-sm text-slate-400 font-medium">
            Ministère de l'Intérieur & Instituts de Sondage
          </p>
        </div>

        {/* Affichage du Vainqueur */}
        <div className="p-8 space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={state.player.avatar}
                alt={state.player.name}
                className="w-28 h-28 rounded-3xl object-cover border-4 border-amber-400 shadow-2xl"
              />
              {isWinner && (
                <span className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow">
                  <Trophy className="w-5 h-5" />
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-100 mt-4">
              {state.player.name}
            </h3>
            <p className="text-xs text-amber-400 font-semibold">{state.player.party}</p>

            <div className="mt-4 px-6 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 inline-flex items-center space-x-3">
              <span className="text-xs uppercase text-slate-400 font-bold">Score au 2nd Tour :</span>
              <span className={`text-3xl font-serif font-black ${isWinner ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isWinner ? '52.4%' : `${finalScore}%`}
              </span>
            </div>
          </div>

          {/* Verdict Républicain */}
          <div className={`p-5 rounded-2xl border ${isWinner ? 'bg-emerald-950/60 border-emerald-800' : 'bg-rose-950/60 border-rose-800'} text-slate-200 text-sm leading-relaxed max-w-xl mx-auto`}>
            {isWinner ? (
              <div>
                <strong className="text-emerald-300 block text-base font-serif mb-1">
                  🏛️ ÉLU PRÉSIDENT DE LA RÉPUBLIQUE !
                </strong>
                Les Français vous accordent leur confiance pour présider aux destinées de la Nation sous la Ve République. Vous entrerez à l'Élysée pour constituer votre gouvernement.
              </div>
            ) : (
              <div>
                <strong className="text-rose-300 block text-base font-serif mb-1">
                  Défaite au Second Tour
                </strong>
                Votre campagne n'a pas suffi à briser le plafond de verre républicain. Vous incarnez désormais la principale force d'opposition au nouveau président élu.
              </div>
            )}
          </div>

          {/* Bouton Recommencer */}
          <div className="pt-4">
            <button
              onClick={onRestart}
              className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 inline-flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Lancer une Nouvelle Partie</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
