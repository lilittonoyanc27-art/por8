/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GAMES } from './data';
import { GameId } from '../types';
import { 
  Flashcards, 
  SentenceMatcher, 
  WordBuilder, 
  VocabularyQuiz, 
  DialogueCloze, 
  ComprehensionQuiz 
} from './GamesImplementation';
import { 
  Layers, 
  Shuffle, 
  Hammer, 
  GraduationCap, 
  FileText, 
  Award, 
  ArrowLeft,
  Gamepad2,
  Sparkles
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Layers: Layers,
  Shuffle: Shuffle,
  Hammer: Hammer,
  GraduationCap: GraduationCap,
  FileText: FileText,
  Award: Award,
};

interface GameCenterProps {
  activeGameId?: GameId | null;
  setActiveGameId?: (id: GameId | null) => void;
}

export default function GameCenter({
  activeGameId: pActiveGameId,
  setActiveGameId: pSetActiveGameId
}: GameCenterProps = {}) {
  const [localActiveGameId, setLocalActiveGameId] = useState<GameId | null>(null);

  const activeGameId = pActiveGameId !== undefined ? pActiveGameId : localActiveGameId;
  const setActiveGameId = pSetActiveGameId !== undefined ? pSetActiveGameId : setLocalActiveGameId;

  // Return to the game grid selection
  const handleExitGame = () => {
    setActiveGameId(null);
  };

  const renderActiveGame = () => {
    switch (activeGameId) {
      case 'flash':
        return <Flashcards />;
      case 'match':
        return <SentenceMatcher />;
      case 'build':
        return <WordBuilder />;
      case 'vocab':
        return <VocabularyQuiz />;
      case 'cloze':
        return <DialogueCloze />;
      case 'truefalse':
        return <ComprehensionQuiz />;
      default:
        return null;
    }
  };

  const activeGameInfo = GAMES.find(g => g.id === activeGameId);

  return (
    <div className="space-y-6">
      {/* If a game is active: show the game with back button */}
      {activeGameId ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <button
              id="game-back-to-menu-btn"
              onClick={handleExitGame}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-all mr-auto cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Վերադառնալ Խաղացանկ
            </button>

            <div className="flex items-center gap-2">
              {activeGameInfo && (() => {
                const IconComponent = ICON_MAP[activeGameInfo.iconName] || Gamepad2;
                return <IconComponent className="w-5 h-5 text-indigo-500" />;
              })()}
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm font-sans">
                  {activeGameInfo?.titleArm}
                </h3>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
                  {activeGameInfo?.titleEsp}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-2xl shadow-sm min-h-[400px] flex flex-col justify-center">
            {renderActiveGame()}
          </div>
        </div>
      ) : (
        /* Game Selection Menu Grid */
        <div className="space-y-8 font-sans">
          {/* Section banner introduction */}
          <div className="text-center max-w-lg mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[10px] uppercase font-bold tracking-widest inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Ինտերակտիվ Ուսուցում
            </span>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              6 Ուսուցողական Խաղեր
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-sans font-medium">
              Ամրապնդե՛ք ձեր ստացած գիտելիքները տեքստերից և երկխոսություններից՝ խաղալով մեր 6 տարբեր զվարճալի խաղերը։
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GAMES.map((game) => {
              const IconComponent = ICON_MAP[game.iconName] || Gamepad2;
              return (
                <button
                  key={game.id}
                  id={`game-card-${game.id}`}
                  onClick={() => setActiveGameId(game.id)}
                  className="group block text-left bg-white hover:bg-slate-50 dark:bg-slate-900/60 dark:hover:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-sm relative cursor-pointer"
                >
                  {/* Subtle hover gradient frame */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-indigo-50/10 dark:to-indigo-950/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-all pointer-events-none"></div>

                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition duration-200">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm font-sans tracking-tight">
                        {game.titleArm}
                      </h3>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-serif italic uppercase tracking-wider block">
                        {game.titleEsp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-sans font-medium">
                      {game.descriptionArm}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
