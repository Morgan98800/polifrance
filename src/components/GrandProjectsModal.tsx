import React from 'react';
import { GameState, GrandProject } from '../types/game';
import { CATALOG_GRAND_PROJECTS } from '../data/grandProjects';
import { soundEffects } from '../utils/audio';
import { Sparkles, Zap, HeartPulse, Shield, Train, CheckCircle2, Clock, X, ArrowRight, Wallet } from 'lucide-react';

interface GrandProjectsModalProps {
  state: GameState;
  onLaunchProject: (project: GrandProject) => void;
  onClose: () => void;
}

export const GrandProjectsModal: React.FC<GrandProjectsModalProps> = ({
  state,
  onLaunchProject,
  onClose
}) => {
  const activeProjects = state.activeProjects || [];
  const completedProjects = state.completedProjectsHistory || [];

  const getProjectIcon = (category: string) => {
    switch (category) {
      case 'energie': return <Zap className="w-5 h-5 text-[var(--accent-amber)]" />;
      case 'sante': return <HeartPulse className="w-5 h-5 text-[var(--accent-red)]" />;
      case 'defense': return <Shield className="w-5 h-5 text-[var(--accent-blue)]" />;
      case 'transport': return <Train className="w-5 h-5 text-[var(--accent-emerald)]" />;
      default: return <Sparkles className="w-5 h-5 text-[var(--accent-purple)]" />;
    }
  };

  const handleLaunch = (project: GrandProject) => {
    soundEffects.playStamp();
    onLaunchProject(project);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in font-mono overflow-y-auto">
      <div className="bg-[var(--bg-panel)] border-4 border-[var(--text-main)] max-w-4xl w-full p-5 sm:p-7 shadow-[10px_10px_0px_var(--text-main)] space-y-6 text-[var(--text-main)] relative my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 border-2 border-[var(--border-hard)] hover:bg-[var(--text-main)] hover:text-[var(--bg-panel)] transition-colors z-10 cursor-pointer"
          title="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* En-tête */}
        <div className="text-center space-y-1.5 border-b-2 border-[var(--border-hard)] pb-4 pr-8 pl-8">
          <div className="flex items-center justify-center space-x-2 text-[var(--accent-purple)] font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>COMMISSARIAT GÉNÉRAL AU PLAN & INVESTISSEMENTS D'AVENIR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase font-display tracking-tight">
            Les Grands Chantiers de la Nation
          </h2>
          <p className="text-xs font-sans opacity-85 max-w-2xl mx-auto leading-relaxed">
            Engagez la puissance financière de l'État dans des chantiers pluriannuels structurants pour transformer durablement la France.
          </p>
        </div>

        {/* Trésorerie disponible */}
        <div className="p-3 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] flex items-center justify-between font-mono text-xs">
          <span className="font-bold flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-[var(--accent-amber)]" />
            <span>Trésorerie Disponible :</span>
          </span>
          <strong className="text-sm font-black text-[var(--accent-amber)]">
            {state.economy.treasury.toFixed(1)} Mds €
          </strong>
        </div>

        {/* Grille des 4 Projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATALOG_GRAND_PROJECTS.map(project => {
            const activeInstance = activeProjects.find(p => p.id === project.id);
            const isCompleted = completedProjects.includes(project.name);
            const isUnderConstruction = !!activeInstance;
            const canAfford = state.economy.treasury >= project.costPerTurn;

            const progressPct = isUnderConstruction 
              ? Math.round(((project.durationTurns - activeInstance.turnsRemaining) / project.durationTurns) * 100)
              : isCompleted ? 100 : 0;

            return (
              <div
                key={project.id}
                className={`p-4 sm:p-5 border-2 shadow-[3px_3px_0px_var(--border-hard)] flex flex-col justify-between space-y-4 transition-all ${
                  isCompleted 
                    ? 'bg-[var(--accent-emerald)]/10 border-[var(--accent-emerald)]'
                    : isUnderConstruction
                    ? 'bg-[var(--bg-subtle)] border-[var(--accent-blue)]'
                    : 'bg-[var(--bg-panel)] border-[var(--border-hard)]'
                }`}
              >
                <div>
                  {/* Titre & Statut */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 border border-[var(--border-hard)] bg-[var(--bg-panel)]">
                        {getProjectIcon(project.category)}
                      </div>
                      <div>
                        <h3 className="font-display font-black text-sm sm:text-base leading-snug">
                          {project.name}
                        </h3>
                        <span className="text-[9px] uppercase font-mono opacity-60">
                          Durée : {project.durationTurns} mois ({project.costPerTurn} Md/mois)
                        </span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border shrink-0 ${
                      isCompleted 
                        ? 'bg-[var(--accent-emerald)] text-white border-[var(--accent-emerald)]'
                        : isUnderConstruction
                        ? 'bg-[var(--accent-blue)] text-white border-[var(--accent-blue)] animate-pulse'
                        : 'bg-[var(--bg-subtle)] border-[var(--border-hard)]'
                    }`}>
                      {isCompleted ? '✓ Terminé' : isUnderConstruction ? '⏳ En Travaux' : 'Disponible'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs font-sans opacity-85 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* Effets permanents */}
                  <div className="p-2.5 bg-[var(--bg-panel)] border border-[var(--border-hard)] text-[10px] space-y-1">
                    <span className="font-bold text-[9px] uppercase opacity-75 block">Bénéfices Nationaux :</span>
                    <span className="text-[var(--accent-emerald)] font-bold block">
                      {project.effectDescription}
                    </span>
                  </div>
                </div>

                {/* Barre de progression ou Bouton de lancement */}
                <div className="pt-2 border-t border-[var(--border-hard)]/30">
                  {isUnderConstruction ? (
                    <div className="space-y-1.5 font-mono text-[10px]">
                      <div className="flex justify-between font-bold">
                        <span>Chantier en cours :</span>
                        <span>{activeInstance.turnsRemaining} mois restants ({progressPct}%)</span>
                      </div>
                      <div className="h-2.5 w-full bg-[var(--bg-panel)] border border-[var(--border-hard)] overflow-hidden">
                        <div
                          className="h-full bg-[var(--accent-blue)] transition-all duration-300 striped-bg-blue"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  ) : isCompleted ? (
                    <div className="p-2 bg-[var(--accent-emerald)]/15 border border-[var(--accent-emerald)] text-[var(--accent-emerald)] text-center font-bold text-xs flex items-center justify-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Projet Opérationnel & Actif</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={!canAfford || isUnderConstruction}
                      onClick={() => handleLaunch(project)}
                      className="w-full py-2.5 bg-[var(--text-main)] text-[var(--bg-panel)] hover:bg-[var(--accent-purple)] hover:text-white font-bold uppercase text-xs border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span>Lancer le Chantier ({project.totalCost} Mds €)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
