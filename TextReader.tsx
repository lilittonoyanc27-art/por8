/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TEXT_TOPICS } from './data';
import { TextTopic, SentencePair } from './types';
import AudioButton from './AudioButton';
import { 
  BookOpen, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Settings, 
  HelpCircle, 
  Heart, 
  ArrowRight,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

export default function TextReader() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('weather-text');
  const [revealedSentences, setRevealedSentences] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [textSize, setTextSize] = useState<number>(24); // default px

  const currentTopic = TEXT_TOPICS.find(t => t.id === selectedTopicId) || TEXT_TOPICS[0];

  const toggleSentence = (id: string) => {
    setRevealedSentences(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const revealAllOfTopic = () => {
    const nextRevealed = { ...revealedSentences };
    currentTopic.sections.forEach(section => {
      section.sentences.forEach(sentence => {
        nextRevealed[sentence.id] = true;
      });
    });
    setRevealedSentences(nextRevealed);
  };

  const hideAllOfTopic = () => {
    const nextRevealed = { ...revealedSentences };
    currentTopic.sections.forEach(section => {
      section.sentences.forEach(sentence => {
        nextRevealed[sentence.id] = false;
      });
    });
    setRevealedSentences(nextRevealed);
  };

  // Keep track of how many sentences are revealed
  const totalSentences = currentTopic.sections.reduce((acc, s) => acc + s.sentences.length, 0);
  const revealedCount = currentTopic.sections.reduce((acc, s) => {
    return acc + s.sentences.filter(sentence => revealedSentences[sentence.id]).length;
  }, 0);

  const completionPercent = Math.round((revealedCount / totalSentences) * 100) || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: Nav topics and tools */}
      <div className="lg:col-span-4 space-y-6">
        {/* Topic Selector Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 font-sans tracking-tight">
              Ընտրել Թեման
            </h3>
          </div>

          <div className="space-y-2">
            {TEXT_TOPICS.map((topic) => {
              const isActive = topic.id === selectedTopicId;
              return (
                <button
                  key={topic.id}
                  id={`topic-select-${topic.id}`}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 group relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-50 to-indigo-100/50 border-indigo-200 dark:from-indigo-950/40 dark:to-indigo-900/10 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-medium'
                      : 'border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {/* Active background indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-md"></div>
                  )}

                  <div className="text-sm font-semibold tracking-tight font-sans">
                    {topic.titleArm}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-500 mt-1 truncate">
                    {topic.titleEsp}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Toolbar Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-emerald-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Կառավարման Վահանակ
            </h4>
          </div>

          {/* Quick toggle sentences */}
          <div className="grid grid-cols-2 gap-3">
            <button
              id="reveal-all-btn"
              onClick={revealAllOfTopic}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-emerald-500" />
              Ցուցադրել Բոլորը
            </button>
            <button
              id="hide-all-btn"
              onClick={hideAllOfTopic}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            >
              <EyeOff className="w-4 h-4 text-rose-500" />
              Թաքցնել Բոլորը
            </button>
          </div>

          {/* Font resizing */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span>Տառատեսակի Չափը</span>
              <span className="font-mono">{textSize}px</span>
            </div>
            <div className="flex gap-2">
              <button
                id="font-zoom-out"
                onClick={() => setTextSize(prev => Math.max(18, prev - 2))}
                disabled={textSize <= 18}
                className="flex-1 flex justify-center py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 disabled:opacity-40"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                id="font-zoom-in"
                onClick={() => setTextSize(prev => Math.min(42, prev + 2))}
                disabled={textSize >= 42}
                className="flex-1 flex justify-center py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 disabled:opacity-40"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reading Stats Progress */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400">Ընթերցման առաջընթացը</span>
              <span className="text-indigo-600 dark:text-indigo-400">{completionPercent}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-500" 
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500">
              Բացահայտվել է {revealedCount} {totalSentences}-ից
            </div>
          </div>
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50/75 dark:bg-amber-950/20 rounded-2xl border border-amber-100/50 dark:border-amber-900/30 p-5 space-y-2.5">
          <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Ինչպե՞ս սովորել
          </div>
          <p className="text-xs text-amber-900/80 dark:text-amber-300/80 leading-relaxed font-sans font-medium">
            Սեղմեք յուրաքանչյուր նախադասության վրա՝ նրա հայերեն թարգմանությունը բացելու համար։ Աուդիո կոճակի միջոցով լսեք իսպաներեն ճիշտ արտասանությունը։
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: The Interactive Text Sheet */}
      <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Sheet Title Bar */}
        <div className="border-b border-slate-100 dark:border-slate-800 p-6 bg-slate-50/50 dark:bg-slate-900/50">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight">
            {currentTopic.titleArm}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-serif italic uppercase tracking-wider">
            {currentTopic.titleEsp}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            {currentTopic.descriptionArm}
          </p>
        </div>

        {/* Sentence Listing Container */}
        <div className="p-6 md:p-8 space-y-8">
          {currentTopic.sections.map((section, sIndex) => (
            <div key={section.id} className="space-y-6 pb-2 last:pb-0">
              {section.titleArm && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 px-3">
                    {section.titleArm} ({section.titleEsp})
                  </span>
                  <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                </div>
              )}

              {/* Sentences block */}
              <div className="space-y-4">
                {section.sentences.map((pair) => {
                  const isRevealed = revealedSentences[pair.id];
                  const isFav = favorites[pair.id];

                  return (
                    <motion.div
                      key={pair.id}
                      id={`sentence-card-${pair.id}`}
                      layout="position"
                      onClick={() => toggleSentence(pair.id)}
                      className={`relative flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 group cursor-pointer ${
                        isRevealed
                          ? 'border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/50 dark:bg-indigo-950/20'
                          : 'border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200 dark:border-slate-800 dark:bg-slate-900/30 dark:hover:bg-slate-800'
                      }`}
                    >
                      {/* Left: speaker marker or bullet point */}
                      <div className="pt-1.5 flex flex-col items-center">
                        {pair.speaker ? (
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            pair.speaker === 'A' 
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' 
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                          }`}>
                            {pair.speaker}
                          </span>
                        ) : (
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            isRevealed ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'
                          }`}></div>
                        )}
                      </div>

                      {/* Content space */}
                      <div className="flex-1 space-y-2">
                        {/* Spanish Phrase */}
                        <div 
                          className="font-sans font-medium text-slate-800 dark:text-slate-200 leading-relaxed"
                          style={{ fontSize: `${textSize}px` }}
                        >
                          {pair.spanish}
                        </div>

                        {/* Revealed Armenian Translation */}
                        <AnimatePresence initial={false}>
                          {isRevealed && (
                            <motion.div
                              id={`arm-translation-${pair.id}`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-start gap-1">
                                <ArrowRight className="w-3.5 h-3.5 text-indigo-400 mt-1 flex-shrink-0" />
                                <p 
                                  className="text-slate-600 dark:text-slate-300 font-sans leading-relaxed text-[0.95em]"
                                  style={{ fontSize: `${textSize - 2}px` }}
                                >
                                  {pair.armenian}
                                </p>
                              </div>
                              
                              {/* Commentary if exists */}
                              {pair.commentary && (
                                <div className="mt-2 text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-slate-500 dark:text-slate-400 flex items-start gap-1">
                                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                                  <span>{pair.commentary}</span>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Unrevealed Hint */}
                        {!isRevealed && (
                          <span className="text-[11px] font-sans text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            Կտտացրու՝ թարգմանությունը տեսնելու համար
                          </span>
                        )}
                      </div>

                      {/* Right Control Bar (Speaks Spanish / Stars Favorite) */}
                      <div className="flex items-center gap-1.5 self-center opacity-70 group-hover:opacity-100 transition-all">
                        <AudioButton text={pair.spanish} size="sm" />
                        <button
                          id={`favorite-btn-${pair.id}`}
                          type="button"
                          onClick={(e) => toggleFavorite(pair.id, e)}
                          className={`p-1.5 rounded-full transition-all duration-150 ${
                            isFav 
                              ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/30' 
                              : 'text-slate-400 hover:text-rose-400'
                          }`}
                        >
                          <Heart className="w-4 h-4 fill-current opacity-95" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
