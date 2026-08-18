import React, { useState } from 'react';
import { GameState, Candidate } from '../types/game';
import { CANDIDATES } from '../data/candidates';
import { Tv, MessageSquare, Award, ChevronRight, X, Sparkles } from 'lucide-react';

interface TVDebateModalProps {
  state: GameState;
  onFinishDebate: (pollingBonus: number) => void;
  onClose: () => void;
}

interface DebateQuestion {
  id: string;
  theme: string;
  question: string;
  opponentQuote: string;
  options: Array<{
    text: string;
    score: number;
    feedback: string;
  }>;
}

const DEBATE_QUESTIONS: DebateQuestion[] = [
  {
    id: 'eco_dette',
    theme: 'Finances Publiques & Pouvoir d\'Achat',
    question: '« Face à une dette publique de plus de 3 200 milliards d\'euros, comment financez-vous vos promesses sans écraser les Français sous les impôts ? »',
    opponentQuote: '« Mon adversaire vit dans l\'illusion budgétaire. Ses chiffres ne tiennent pas la route face à la réalité des marchés. »',
    options: [
      {
        text: '« Je propose un choc de simplification administrative, la suppression des doublons d\'agences d\'État et la baisse ciblée des charges pour récompenser le travail. »',
        score: 3,
        feedback: 'Réplique percutante et chiffrée. Les cadres et retraités saluent votre sérieux économique.'
      },
      {
        text: '« L\'austérité est un poison économique. Nous financerons l\'investissement d\'avenir par la taxation des superprofits et la lutte contre la fraude fiscale internationale. »',
        score: 2,
        feedback: 'Positionnement de rupture très applaudi par les classes populaires et la jeunesse.'
      },
      {
        text: '« Les Français savent que gouverner, c\'est choisir avec courage. Nous réduirons immédiatement les dépenses de fonctionnement sans toucher à l\'hôpital public. »',
        score: 2,
        feedback: 'Défense républicaine solide qui assoit votre stature d\'homme d\'État.'
      }
    ]
  },
  {
    id: 'secu_autorite',
    theme: 'Sécurité & Ordre Républicain',
    question: '« Le narcotrafic et l\'insécurité frappent désormais les villes moyennes et le monde rural. Quelle est votre réponse d\'autorité immédiate ? »',
    opponentQuote: '« Il faut cesser l\'angélisme et instaurer une fermeté pénale absolue dès la première infraction ! »',
    options: [
      {
        text: '« Tolérance zéro : création d\'un parquet national anti-drogue, peines planchers automatiques et reconduite systématique aux frontières des délinquants étrangers. »',
        score: 3,
        feedback: 'Posture d\'autorité implacable. Vous marquez des points décisifs dans l\'électorat populaire et rural.'
      },
      {
        text: '« Rétablir la police de proximité, doubler les effectifs d\'enquêteurs judiciaires pour asphyxier le blanchiment financier et réinvestir dans la prévention. »',
        score: 2,
        feedback: 'Approche républicaine méthodique saluée par les magistrats et les corps intermédiaires.'
      }
    ]
  },
  {
    id: 'europe_diplomatie',
    theme: 'Europe & Indépendance Nationale',
    question: '« Quelle doit être la place de la France dans l\'Union Européenne et sur la scène géopolitique internationale ? »',
    opponentQuote: '« La France doit retrouver les pleins pouvoirs et refuser le diktat des technocrates non élus de Bruxelles. »',
    options: [
      {
        text: '« Une France puissante dans une Europe souveraine. Nous devons bâtir la défense européenne autonome tout en protégeant notre dissuasion nucléaire. »',
        score: 3,
        feedback: 'Vision géopolitique d\'envergure présidentielle. L\'opinion salue votre hauteur de vue.'
      },
      {
        text: '« La souveraineté populaire prime sur les traités européens. Nous appliquerons la règle d\'or de la préférence nationale et de la commande publique tricolore. »',
        score: 2,
        feedback: 'Ligne souverainiste sans concession qui électrise vos partisans.'
      }
    ]
  }
];

export const TVDebateModal: React.FC<TVDebateModalProps> = ({ state, onFinishDebate, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Adversaire automatique pour le débat
  const opponent = CANDIDATES.find(c => c.id !== state.player.id) || CANDIDATES[1];

  const currentQ = DEBATE_QUESTIONS[currentStep];

  const handleSelectOption = (option: { text: string; score: number; feedback: string }) => {
    const newScore = totalScore + option.score;
    setTotalScore(newScore);
    setLastFeedback(option.feedback);

    setTimeout(() => {
      if (currentStep < DEBATE_QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
        setLastFeedback(null);
      } else {
        setIsCompleted(true);
      }
    }, 1500);
  };

  const handleEnd = () => {
    onFinishDebate(totalScore);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Décor Studio TV */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-slate-900 to-red-950 p-6 sm:p-8 border-b border-slate-800">
          <div className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none" style={{ backgroundImage: "url('/tv_debate.jpg')" }} />
          <div className="relative z-10">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-850/90 border border-slate-700 backdrop-blur"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-red-400 text-xs font-black uppercase tracking-wider mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <Tv className="w-4 h-4" />
              <span>EN DIRECT — LE GRAND DÉBAT DE L'ÉLECTION PRÉSIDENTIELLE 2027</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 items-center">
              {/* Joueur */}
              <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-2xl border border-amber-400/60 backdrop-blur-sm shadow-lg">
                <img
                  src={state.player.avatar}
                  alt={state.player.name}
                  className="w-12 h-12 rounded-xl object-cover border border-amber-400"
                />
                <div className="min-w-0">
                  <span className="text-[10px] text-amber-300 font-bold uppercase">Votre Candidature</span>
                  <h4 className="font-bold text-sm text-slate-100 truncate">{state.player.name}</h4>
                </div>
              </div>

              {/* Adversaire */}
              <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-lg">
                <img
                  src={opponent.avatar}
                  alt={opponent.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-600"
                />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Adversaire de Second Tour</span>
                  <h4 className="font-bold text-sm text-slate-100 truncate">{opponent.name}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corps du Débat */}
        <div className="p-6 sm:p-8">
          {!isCompleted ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Thème : <strong className="text-amber-400">{currentQ.theme}</strong></span>
                <span>Question {currentStep + 1} / {DEBATE_QUESTIONS.length}</span>
              </div>

              {/* Question des Journalistes */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-serif italic text-slate-200 text-sm sm:text-base leading-relaxed">
                <span className="font-sans font-bold text-xs uppercase text-amber-400 block not-italic mb-1">
                  🎙️ Question des Présentateurs :
                </span>
                {currentQ.question}
              </div>

              {/* Attaque de l'Adversaire */}
              <div className="bg-slate-850/80 p-4 rounded-2xl border border-red-900/40 text-xs sm:text-sm text-red-200 italic">
                <span className="font-bold not-italic text-red-400 block text-xs mb-1">
                  ⚔️ Réplique de {opponent.name} :
                </span>
                {currentQ.opponentQuote}
              </div>

              {/* Vos Options de Réplique */}
              <div className="space-y-3 pt-2">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">
                  Votre Réponse au Pupitre :
                </span>
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={Boolean(lastFeedback)}
                    onClick={() => handleSelectOption(opt)}
                    className="w-full text-left p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-400 hover:bg-slate-800 transition-all text-xs sm:text-sm text-slate-100 font-medium leading-relaxed group"
                  >
                    <div className="flex items-start space-x-2">
                      <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform">➔</span>
                      <span>{opt.text}</span>
                    </div>
                  </button>
                ))}
              </div>

              {lastFeedback && (
                <div className="p-4 rounded-xl bg-amber-950/80 border border-amber-700 text-xs text-amber-200 font-medium animate-fadeIn">
                  {lastFeedback}
                </div>
              )}
            </div>
          ) : (
            /* Fin du Débat */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-400">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-100">
                Fin du Grand Débat Télévisé
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Les sondages d'opinion d'après-débat vous déclarent vainqueur de la confrontation avec un gain de <strong className="text-emerald-400">+{totalScore}%</strong> dans les intentions de vote !
              </p>
              <button
                onClick={handleEnd}
                className="mt-6 py-3 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl"
              >
                Enregistrer les Résultats
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
