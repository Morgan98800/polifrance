import React, { useState } from 'react';
import { Candidate, IdeologyGroup, GameMode } from '../types/game';
import { CANDIDATES, createCustomCandidate } from '../data/candidates';
import { UserCheck, PlusCircle, Check, ChevronRight, Shield, Users, Award, Landmark, User, Play, Vote } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface CandidateSelectProps {
  onSelect: (candidate: Candidate, isCustom: boolean, mode: GameMode) => void;
}

export const CandidateSelect: React.FC<CandidateSelectProps> = ({ onSelect }) => {
  const [selectedId, setSelectedId] = useState<string>(CANDIDATES[0].id);
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);

  // Formulaire candidat personnalisé
  const [customName, setCustomName] = useState('');
  const [customParty, setCustomParty] = useState('');
  const [customTagline, setCustomTagline] = useState('');
  const [customDoctrine, setCustomDoctrine] = useState('');
  const [customGroup, setCustomGroup] = useState<IdeologyGroup>('centre_majorite');
  const [customFocus, setCustomFocus] = useState<'populaires' | 'retraites' | 'cadres' | 'jeunesse' | 'rural'>('cadres');

  const activeCandidate = CANDIDATES.find(c => c.id === selectedId) || CANDIDATES[0];

  const handleCreateCustom = (e: React.FormEvent, mode: GameMode) => {
    e.preventDefault();
    if (!customName || !customParty) return;

    soundEffects.playStamp();
    const newCandidate = createCustomCandidate({
      name: customName,
      party: customParty,
      group: customGroup,
      tagline: customTagline || '« Pour une République juste et souveraine. »',
      doctrine: customDoctrine || 'Pragmatisme, réformes d\'État et rigueur budgétaire.',
      targetFocus: customFocus
    });

    onSelect(newCandidate, true, mode);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-[var(--text-main)]">
      
      {/* En-tête Brutaliste */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] inline-block mb-2">
          SIM-POL 2027 • TERMINAL D'ÉTAT
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight">
          Choisissez votre Dirigeant & Mode de Jeu
        </h1>
        <p className="mt-1 text-xs sm:text-sm font-sans opacity-80">
          Sélectionnez une figure politique et lancez immédiatement votre mandat ou votre campagne.
        </p>
      </div>

      {!isCreatingCustom ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Grille des 6 candidats officiels (Avatars Pixel Art) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CANDIDATES.map((candidate) => {
              const isSelected = candidate.id === selectedId;
              return (
                <div
                  key={candidate.id}
                  onClick={() => { soundEffects.playKeystroke(); setSelectedId(candidate.id); }}
                  className={`cursor-pointer p-3.5 border-2 border-[var(--border-hard)] transition-all text-left ${
                    isSelected
                      ? 'bg-[var(--bg-panel)] shadow-[4px_4px_0px_var(--border-hard)] translate-x-[-1px] translate-y-[-1px]'
                      : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] active:translate-x-[2px] active:translate-y-[2px]'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-14 h-14 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] flex items-center justify-center font-bold text-base shrink-0 overflow-hidden shadow-[2px_2px_0px_var(--border-hard)]">
                      {candidate.avatar ? (
                        <img src={candidate.avatar} alt={candidate.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 stroke-[1.5]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-black text-sm truncate">
                          {candidate.name}
                        </h3>
                        {isSelected && (
                          <span className="w-4 h-4 bg-[var(--text-main)] text-[var(--bg-panel)] flex items-center justify-center font-bold text-[10px]">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-mono opacity-70 truncate mt-0.5">
                        {candidate.party}
                      </p>
                      <div className="mt-1.5 font-mono text-[10px] opacity-80">
                        <span>Socle électoral : <strong>{candidate.basePopularity}%</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bouton Créer son Candidat */}
            <div
              onClick={() => { soundEffects.playKeystroke(); setIsCreatingCustom(true); }}
              className="sm:col-span-2 cursor-pointer p-3 border-2 border-dashed border-[var(--border-hard)] bg-[var(--bg-panel)] hover:bg-[var(--bg-subtle)] transition-all flex items-center justify-center space-x-2 text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
            >
              <PlusCircle className="w-4 h-4 stroke-[2]" />
              <span>+ Créer un candidat personnalisé</span>
            </div>
          </div>

          {/* Fiche détaillée du candidat sélectionné + Boutons de Démarrage Direct (1-Click Onboarding) */}
          <div className="lg:col-span-5 bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-5 shadow-[4px_4px_0px_var(--border-hard)] space-y-4 sticky top-20">
            
            <div className="flex items-center space-x-3 pb-3 border-b-2 border-[var(--border-hard)]">
              <div className="w-16 h-16 bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] flex items-center justify-center font-bold text-xl shrink-0 overflow-hidden shadow-[2px_2px_0px_var(--border-hard)]">
                {activeCandidate.avatar ? (
                  <img src={activeCandidate.avatar} alt={activeCandidate.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 stroke-[1.5]" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-display font-black truncate">
                  {activeCandidate.name}
                </h2>
                <p className="text-xs font-mono font-bold text-[var(--accent-blue)]">{activeCandidate.party}</p>
                <p className="text-xs font-sans italic opacity-75 mt-0.5 line-clamp-1">{activeCandidate.tagline}</p>
              </div>
            </div>

            {/* Doctrine */}
            <div>
              <span className="text-[10px] font-mono font-bold uppercase opacity-60 block mb-1">
                PROGRAMME & ORIENTATION
              </span>
              <p className="text-xs bg-[var(--bg-subtle)] p-2.5 border border-[var(--border-hard)] font-sans leading-relaxed">
                {activeCandidate.doctrine}
              </p>
            </div>

            {/* Répartition Sociologique */}
            <div className="pt-2 border-t border-[var(--border-hard)]/30 font-mono text-[11px]">
              <span className="text-[10px] font-bold uppercase opacity-60 block mb-1.5">
                BASE SOCIOLOGIQUE INITIALE
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="bg-[var(--bg-subtle)] p-1.5 border border-[var(--border-hard)] flex justify-between">
                  <span className="opacity-70 text-[10px]">RETRAITÉS:</span>
                  <strong>{activeCandidate.demographics.retraites}%</strong>
                </div>
                <div className="bg-[var(--bg-subtle)] p-1.5 border border-[var(--border-hard)] flex justify-between">
                  <span className="opacity-70 text-[10px]">POPULAIRES:</span>
                  <strong>{activeCandidate.demographics.populaires}%</strong>
                </div>
                <div className="bg-[var(--bg-subtle)] p-1.5 border border-[var(--border-hard)] flex justify-between">
                  <span className="opacity-70 text-[10px]">CADRES:</span>
                  <strong>{activeCandidate.demographics.cadres}%</strong>
                </div>
                <div className="bg-[var(--bg-subtle)] p-1.5 border border-[var(--border-hard)] flex justify-between">
                  <span className="opacity-70 text-[10px]">JEUNESSE:</span>
                  <strong>{activeCandidate.demographics.jeunesse}%</strong>
                </div>
              </div>
            </div>

            {/* DÉMARRAGE DIRECT EN 1 CLIC (CHOIX DE MODE INTÉGRÉ) */}
            <div className="pt-3 border-t-2 border-[var(--border-hard)] space-y-2 font-mono text-xs">
              <span className="text-[10px] font-bold uppercase opacity-70 block text-center">
                LANCER LA PARTIE DANS LE MODE DE VOTRE CHOIX :
              </span>

              {/* Mode 1 : Gouvernance Élysée */}
              <button
                onClick={() => { soundEffects.playStamp(); onSelect(activeCandidate, false, 'governance'); }}
                className="w-full py-3 px-3 bg-[var(--text-main)] text-[var(--bg-panel)] font-bold uppercase tracking-wider border-2 border-[var(--border-hard)] shadow-[3px_3px_0px_var(--border-hard)] hover:bg-[var(--accent-blue)] hover:text-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-between transition-all"
              >
                <div className="flex items-center space-x-2">
                  <Landmark className="w-4 h-4 stroke-[2]" />
                  <span>1. Mandat Élysée (5 ans)</span>
                </div>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Mode 2 : Campagne 2027 */}
              <button
                onClick={() => { soundEffects.playStamp(); onSelect(activeCandidate, false, 'campaign'); }}
                className="w-full py-2.5 px-3 bg-[var(--bg-subtle)] hover:bg-[var(--bg-panel)] text-[var(--text-main)] font-bold uppercase tracking-wider border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-between transition-all"
              >
                <div className="flex items-center space-x-2">
                  <Vote className="w-4 h-4 stroke-[2] text-[var(--accent-amber)]" />
                  <span>2. Campagne 2027 (Débats TV)</span>
                </div>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* Formulaire de création sur-mesure */
        <div className="max-w-2xl mx-auto bg-[var(--bg-panel)] border-2 border-[var(--border-hard)] p-6 shadow-[4px_4px_0px_var(--border-hard)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[var(--border-hard)]">
            <h2 className="text-lg font-display font-black flex items-center space-x-2">
              <Landmark className="w-5 h-5 stroke-[1.5]" />
              <span>Créer un Candidat Personnalisé</span>
            </h2>
            <button
              onClick={() => setIsCreatingCustom(false)}
              className="text-xs font-mono opacity-70 hover:opacity-100 uppercase font-bold"
            >
              [ Annuler ]
            </button>
          </div>

          <form onSubmit={(e) => handleCreateCustom(e, 'governance')} className="space-y-3 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold uppercase mb-1">Nom & Prénom</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Alex Martin"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] p-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Parti / Mouvement</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Union Citoyenne"
                  value={customParty}
                  onChange={(e) => setCustomParty(e.target.value)}
                  className="w-full bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] p-2 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase mb-1">Slogan de Campagne</label>
              <input
                type="text"
                placeholder="ex: « L'audace républicaine pour la France. »"
                value={customTagline}
                onChange={(e) => setCustomTagline(e.target.value)}
                className="w-full bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] p-2 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase mb-1">Ligne Politique & Doctrine</label>
              <textarea
                rows={2}
                placeholder="ex: Réindustrialisation verte, justice fiscale et relance par les salaires..."
                value={customDoctrine}
                onChange={(e) => setCustomDoctrine(e.target.value)}
                className="w-full bg-[var(--bg-subtle)] border-2 border-[var(--border-hard)] p-2 text-xs focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={(e) => handleCreateCustom(e as any, 'governance')}
                className="py-3 bg-[var(--text-main)] text-[var(--bg-panel)] font-bold uppercase border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
              >
                🏛️ Lancer en Mandat (5 ans)
              </button>
              <button
                type="button"
                onClick={(e) => handleCreateCustom(e as any, 'campaign')}
                className="py-3 bg-[var(--bg-subtle)] text-[var(--text-main)] font-bold uppercase border-2 border-[var(--border-hard)] shadow-[2px_2px_0px_var(--border-hard)] active:translate-x-[2px] active:translate-y-[2px]"
              >
                🗳️ Lancer en Campagne 2027
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
