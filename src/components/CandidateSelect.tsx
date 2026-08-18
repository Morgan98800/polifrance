import React, { useState } from 'react';
import { Candidate, IdeologyGroup } from '../types/game';
import { CANDIDATES, createCustomCandidate } from '../data/candidates';
import { UserCheck, PlusCircle, Check, ChevronRight, Shield, Users, Award, Landmark, User } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface CandidateSelectProps {
  onSelect: (candidate: Candidate, isCustom: boolean) => void;
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

  const handleCreateCustom = (e: React.FormEvent) => {
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

    onSelect(newCandidate, true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-[#1A1A1A]">
      
      {/* En-tête Brutaliste */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 bg-[#FFFFFF] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] inline-block mb-3">
          ÉLECTION PRÉSIDENTIELLE 2027 • Ve RÉPUBLIQUE
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#1A1A1A] tracking-tight">
          Sélection du Candidat d'État
        </h1>
        <p className="mt-2 text-sm sm:text-base font-sans text-[#1A1A1A]/80">
          Incarnez l’une des 6 figures majeures ou déposez votre propre déclaration de candidature.
        </p>
      </div>

      {!isCreatingCustom ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Grille des 6 candidats officiels */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CANDIDATES.map((candidate) => {
              const isSelected = candidate.id === selectedId;
              return (
                <div
                  key={candidate.id}
                  onClick={() => { soundEffects.playKeystroke(); setSelectedId(candidate.id); }}
                  className={`cursor-pointer p-4 border-2 border-[#1A1A1A] transition-all text-left ${
                    isSelected
                      ? 'bg-[#FFFFFF] shadow-[4px_4px_0px_#1A1A1A] translate-x-[-1px] translate-y-[-1px]'
                      : 'bg-[#F7F7F5] hover:bg-[#FFFFFF] active:translate-x-[2px] active:translate-y-[2px]'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-[#FFFFFF] border-2 border-[#1A1A1A] flex items-center justify-center font-serif font-bold text-base shrink-0 overflow-hidden">
                      {candidate.avatar ? (
                        <img src={candidate.avatar} alt={candidate.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 stroke-[1.5]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-black text-[#1A1A1A] text-base truncate">
                          {candidate.name}
                        </h3>
                        {isSelected && (
                          <span className="w-4 h-4 bg-[#1A1A1A] text-[#FFFFFF] flex items-center justify-center font-bold text-xs">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-mono text-[#1A1A1A]/70 truncate mt-0.5">
                        {candidate.party}
                      </p>
                      <div className="mt-2 font-mono text-[11px] text-[#1A1A1A]/80">
                        <span>Socle 1er tour : <strong>{candidate.basePopularity}%</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bouton Créer son Candidat */}
            <div
              onClick={() => { soundEffects.playKeystroke(); setIsCreatingCustom(true); }}
              className="sm:col-span-2 cursor-pointer p-3.5 border-2 border-dashed border-[#1A1A1A] bg-[#FFFFFF] hover:bg-[#F7F7F5] transition-all flex items-center justify-center space-x-2 text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <PlusCircle className="w-4 h-4 stroke-[2]" />
              <span>Créer une candidature libre sur-mesure</span>
            </div>
          </div>

          {/* Fiche détaillée du candidat sélectionné */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_#1A1A1A] space-y-4 sticky top-24">
            <div className="flex items-center space-x-3.5 pb-4 border-b-2 border-[#1A1A1A]">
              <div className="w-16 h-16 bg-[#F7F7F5] border-2 border-[#1A1A1A] flex items-center justify-center font-serif font-bold text-xl shrink-0 overflow-hidden">
                {activeCandidate.avatar ? (
                  <img src={activeCandidate.avatar} alt={activeCandidate.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 stroke-[1.5]" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-serif font-black text-[#1A1A1A]">
                  {activeCandidate.name}
                </h2>
                <p className="text-xs font-mono text-[#1A1A1A]/80 font-bold">{activeCandidate.party}</p>
                <p className="text-xs font-serif italic text-[#1A1A1A]/60 mt-0.5">{activeCandidate.tagline}</p>
              </div>
            </div>

            {/* Ligne & Doctrine */}
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#1A1A1A]/60 block mb-1">
                LIGNE & DOCTRINE POLITIQUE
              </span>
              <p className="text-xs text-[#1A1A1A] bg-[#F7F7F5] p-2.5 border border-[#1A1A1A] font-sans leading-relaxed">
                {activeCandidate.doctrine}
              </p>
            </div>

            {/* Répartition Sociologique */}
            <div className="pt-2 border-t-2 border-[#1A1A1A]">
              <span className="text-[10px] font-mono font-bold uppercase text-[#1A1A1A]/60 block mb-2">
                ASSISE DÉMOGRAPHIQUE DE DÉPART
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div className="bg-[#F7F7F5] p-2 border border-[#1A1A1A]">
                  <span className="text-[10px] text-[#1A1A1A]/60 block">RETRAITÉS</span>
                  <strong className="text-sm">{activeCandidate.demographics.retraites}%</strong>
                </div>
                <div className="bg-[#F7F7F5] p-2 border border-[#1A1A1A]">
                  <span className="text-[10px] text-[#1A1A1A]/60 block">POPULAIRES</span>
                  <strong className="text-sm">{activeCandidate.demographics.populaires}%</strong>
                </div>
                <div className="bg-[#F7F7F5] p-2 border border-[#1A1A1A]">
                  <span className="text-[10px] text-[#1A1A1A]/60 block">CADRES</span>
                  <strong className="text-sm">{activeCandidate.demographics.cadres}%</strong>
                </div>
                <div className="bg-[#F7F7F5] p-2 border border-[#1A1A1A]">
                  <span className="text-[10px] text-[#1A1A1A]/60 block">JEUNESSE</span>
                  <strong className="text-sm">{activeCandidate.demographics.jeunesse}%</strong>
                </div>
              </div>
            </div>

            {/* Bouton de Validation Brutaliste */}
            <button
              onClick={() => { soundEffects.playStamp(); onSelect(activeCandidate, false); }}
              className="w-full py-3.5 px-4 bg-[#1A1A1A] text-[#FFFFFF] font-mono font-bold text-xs uppercase tracking-wider border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none flex items-center justify-center space-x-2 transition-all mt-4"
            >
              <span>Valider la Candidature</span>
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

        </div>
      ) : (
        /* Formulaire de création brutale */
        <div className="max-w-2xl mx-auto bg-[#FFFFFF] border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_#1A1A1A] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#1A1A1A]">
            <h2 className="text-lg font-serif font-black text-[#1A1A1A] flex items-center space-x-2">
              <Landmark className="w-5 h-5 stroke-[1.5]" />
              <span>Déclaration de Candidature Libre</span>
            </h2>
            <button
              onClick={() => setIsCreatingCustom(false)}
              className="text-xs font-mono text-[#1A1A1A]/60 hover:text-[#1A1A1A] uppercase font-bold"
            >
              [ Retour ]
            </button>
          </div>

          <form onSubmit={handleCreateCustom} className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1A1A1A] uppercase mb-1">
                  Nom & Prénom
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Jean Dupont"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-[#F7F7F5] border-2 border-[#1A1A1A] p-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] uppercase mb-1">
                  Parti / Mouvement
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Mouvement Populaire"
                  value={customParty}
                  onChange={(e) => setCustomParty(e.target.value)}
                  className="w-full bg-[#F7F7F5] border-2 border-[#1A1A1A] p-2 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#1A1A1A] uppercase mb-1">
                Slogan de campagne
              </label>
              <input
                type="text"
                placeholder="ex: « Pour une République d'action »"
                value={customTagline}
                onChange={(e) => setCustomTagline(e.target.value)}
                className="w-full bg-[#F7F7F5] border-2 border-[#1A1A1A] p-2 text-xs focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1A1A1A] uppercase mb-1">
                  Famille Idéologique
                </label>
                <select
                  value={customGroup}
                  onChange={(e) => setCustomGroup(e.target.value as IdeologyGroup)}
                  className="w-full bg-[#F7F7F5] border-2 border-[#1A1A1A] p-2 text-xs focus:outline-none"
                >
                  <option value="gauche_radicale">Gauche de rupture (LFI)</option>
                  <option value="gauche_sociale">Social-démocratie & Écologie</option>
                  <option value="centre_majorite">Centre républicain (Majorité)</option>
                  <option value="droite_republicaine">Droite républicaine (LR)</option>
                  <option value="droite_nationale">Droite nationale (RN)</option>
                  <option value="non_inscrits">Indépendant / Sans étiquette</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] uppercase mb-1">
                  Cœur de Cible Électorale
                </label>
                <select
                  value={customFocus}
                  onChange={(e) => setCustomFocus(e.target.value as any)}
                  className="w-full bg-[#F7F7F5] border-2 border-[#1A1A1A] p-2 text-xs focus:outline-none"
                >
                  <option value="cadres">Cadres & CSP+</option>
                  <option value="populaires">Classes Populaires & Ouvrières</option>
                  <option value="retraites">Retraités & Séniors</option>
                  <option value="jeunesse">Jeunesse & Étudiants</option>
                  <option value="rural">Monde Rural & Périurbain</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#1A1A1A] uppercase mb-1">
                Doctrine & Orientations
              </label>
              <textarea
                rows={2}
                placeholder="Principales orientations du programme..."
                value={customDoctrine}
                onChange={(e) => setCustomDoctrine(e.target.value)}
                className="w-full bg-[#F7F7F5] border-2 border-[#1A1A1A] p-2 text-xs focus:outline-none font-sans"
              />
            </div>

            <div className="pt-3 flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsCreatingCustom(false)}
                className="w-1/3 py-2.5 px-4 bg-[#F7F7F5] border-2 border-[#1A1A1A] font-bold text-xs"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 px-4 bg-[#1A1A1A] text-[#FFFFFF] font-bold text-xs uppercase border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                Enregistrer la Candidature
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
