/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VOCABULARY, TEXT_TOPICS, DIALOGUE_CLOZES, COMPREHENSION_QUIZ } from '../data';
import { VocabularyWord, SentencePair, DialogueFillIn, ComprehensionStatement } from '../types';
import AudioButton from './AudioButton';
import { 
  Check, 
  X, 
  RotateCcw, 
  Award, 
  Layers, 
  Volume2, 
  ArrowRight,
  Shuffle,
  CheckCircle2,
  Zap,
  Hammer,
  RefreshCw,
  CheckCircle,
  HelpCircle,
  Sparkles,
  GraduationCap,
  FileText
} from 'lucide-react';

/* ==========================================
   1. FLASHCARDS GAME
   ========================================== */
export function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [studyAgainIds, setStudyAgainIds] = useState<string[]>([]);

  const card = VOCABULARY[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = (mastered: boolean) => {
    if (mastered) {
      if (!masteredIds.includes(card.id)) {
        setMasteredIds([...masteredIds, card.id]);
        setStudyAgainIds(studyAgainIds.filter(id => id !== card.id));
      }
    } else {
      if (!studyAgainIds.includes(card.id)) {
        setStudyAgainIds([...studyAgainIds, card.id]);
        setMasteredIds(masteredIds.filter(id => id !== card.id));
      }
    }

    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < VOCABULARY.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(VOCABULARY.length);
      }
    }, 200);
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds([]);
    setStudyAgainIds([]);
  };

  const progressPercent = Math.round(((currentIndex) / VOCABULARY.length) * 100);

  if (currentIndex >= VOCABULARY.length) {
    const score = masteredIds.length;
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
          className="bg-gradient-to-br from-indigo-50 to-emerald-50 dark:from-indigo-950/20 dark:to-emerald-950/20 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md inline-block space-y-4"
        >
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 font-sans">
            Ավարտվեց՛
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
            Դուք յուրացրել եք հիշողության քարտերի հավաքածուն:
          </p>
          <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {score} / {VOCABULARY.length}
          </div>
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-350 font-sans">
            Յուրացված բառեր
          </div>
        </motion.div>

        <button
          id="flashcards-restart-btn"
          onClick={resetGame}
          className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-950 hover:bg-slate-800 dark:bg-slate-100 dark:border-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-sm font-semibold transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Փորձել Կրկին
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="flex justify-between items-center text-xs font-semibold font-sans">
        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-indigo-500" />
          Քարտ {currentIndex + 1} / {VOCABULARY.length}
        </span>
        <span className="text-emerald-600 dark:text-emerald-400">{masteredIds.length} յուրացված</span>
      </div>

      <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div 
        className="w-full relative cursor-pointer group"
        style={{ height: '320px', perspective: '1000px' }}
        onClick={handleFlip}
      >
        <div id="flashcard-flippable" className="w-full h-full duration-500 shadow-sm relative rounded-3xl border border-slate-100 dark:border-slate-800/80" 
             style={{ 
               transformStyle: 'preserve-3d', 
               transform: isFlipped ? 'rotateY(180deg)' : 'none' 
             }}>
          
          <div className="absolute inset-0 w-full h-full p-6 bg-white dark:bg-slate-900 rounded-3xl flex flex-col justify-between" 
               style={{ backfaceVisibility: 'hidden' }}>
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 font-sans">
                {card.category}
              </span>
              <AudioButton text={card.spanish} size="md" />
            </div>

            <div className="text-center space-y-2 py-4">
              <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight font-sans">
                {card.spanish}
              </h2>
              <p className="text-[11px] text-slate-450 dark:text-slate-500 font-sans">
                Կտտացրեք քարտը թարգմանությունը տեսնելու համար
              </p>
            </div>

            <div className="flex justify-between items-center pt-2 text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-50 dark:border-slate-800/50 font-sans">
              <span>Իսպաներեն</span>
              <span>Հիշողության Քարտ</span>
            </div>
          </div>

          <div className="absolute inset-0 w-full h-full p-6 bg-slate-50 dark:bg-slate-900/40 rounded-3xl flex flex-col justify-between" 
               style={{ 
                 backfaceVisibility: 'hidden', 
                 transform: 'rotateY(180deg)',
                 border: '1px solid rgba(99, 102, 241, 0.2)'
               }}>
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold text-indigo-450 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 font-sans">
                Թարգմանություն
              </span>
              <AudioButton text={card.spanish} size="sm" />
            </div>

            <div className="text-center space-y-4 py-3">
              <h2 className="text-2xl font-extrabold text-indigo-650 dark:text-indigo-400 font-sans">
                {card.armenian}
              </h2>

              {card.exampleEsp && (
                <div className="text-left bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 max-w-sm mx-auto space-y-1">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-sans">
                    {card.exampleEsp}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-sans">
                    <ArrowRight className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                    <span>{card.exampleArm}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2 text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/50 font-sans">
              <span>Հայերեն թարգմանություն</span>
              <span>Կտտացրու հետ պտտելու</span>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 font-sans">
        <button
          id={`again-btn-${card.id}`}
          onClick={(e) => {
            e.stopPropagation();
            handleNext(false);
          }}
          className="flex items-center justify-center gap-2 py-3 border border-rose-250 dark:border-rose-900/40 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-2xl text-xs font-bold transition-all p-3 shadow-sm active:scale-95 cursor-pointer"
        >
          <X className="w-4 h-4 text-rose-500" />
          Դեռ Չգիտեմ (Again)
        </button>
        <button
          id={`gotit-btn-${card.id}`}
          onClick={(e) => {
            e.stopPropagation();
            handleNext(true);
          }}
          className="flex items-center justify-center gap-2 py-3 border border-emerald-250 dark:border-emerald-900/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-2xl text-xs font-bold transition-all p-3 shadow-sm active:scale-95 cursor-pointer"
        >
          <Check className="w-4 h-4 text-emerald-500" />
          Յուրացրել եմ (Got It!)
        </button>
      </div>
    </div>
  );
}

/* ==========================================
   2. SENTENCE MATCHER GAME
   ========================================== */
interface MatchCard {
  id: string;
  uniqueId: string;
  text: string;
  lang: 'es' | 'hy';
}

export function SentenceMatcher() {
  const [pairs, setPairs] = useState<SentencePair[]>([]);
  const [spanishCards, setSpanishCards] = useState<MatchCard[]>([]);
  const [armenianCards, setArmenianCards] = useState<MatchCard[]>([]);
  const [selectedEsp, setSelectedEsp] = useState<string | null>(null);
  const [selectedArm, setSelectedArm] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);

  const startNewTrial = () => {
    const allSentences: SentencePair[] = [];
    TEXT_TOPICS.forEach(topic => {
      topic.sections.forEach(sec => {
        sec.sentences.forEach(s => {
          allSentences.push(s);
        });
      });
    });

    const shuffled = [...allSentences].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    const espList: MatchCard[] = selected.map(s => ({
      id: s.id,
      uniqueId: `esp-${s.id}`,
      text: s.spanish,
      lang: 'es' as const
    })).sort(() => 0.5 - Math.random());

    const armList: MatchCard[] = selected.map(s => ({
      id: s.id,
      uniqueId: `arm-${s.id}`,
      text: s.armenian,
      lang: 'hy' as const
    })).sort(() => 0.5 - Math.random());

    setPairs(selected);
    setSpanishCards(espList);
    setArmenianCards(armList);
    setSelectedEsp(null);
    setSelectedArm(null);
    setMatchedIds([]);
    setErrors({});
    setTries(0);
  };

  useEffect(() => {
    startNewTrial();
  }, []);

  const handleSelectCard = (card: MatchCard) => {
    if (matchedIds.includes(card.id)) return;

    if (card.lang === 'es') {
      setSelectedEsp(card.id);
      if (selectedArm) {
        checkMatch(card.id, selectedArm);
      }
    } else {
      setSelectedArm(card.id);
      if (selectedEsp) {
        checkMatch(selectedEsp, card.id);
      }
    }
  };

  const checkMatch = (espId: string, armId: string) => {
    setTries(prev => prev + 1);

    if (espId === armId) {
      setMatchedIds(prev => [...prev, espId]);
      setScore(prev => prev + 10);
      setSelectedEsp(null);
      setSelectedArm(null);
    } else {
      setErrors({ [espId]: true, [armId]: true });
      setTimeout(() => {
        setErrors({});
        setSelectedEsp(null);
        setSelectedArm(null);
      }, 800);
    }
  };

  const isGameOver = matchedIds.length === 5 && pairs.length === 5;

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 px-5 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-semibold">
        <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Zap className="w-4 h-4 text-amber-500" />
          Միավորներ՝ <span className="text-indigo-600 dark:text-indigo-400">{score}</span>
        </div>
        <div className="text-slate-500 dark:text-slate-400">
          Փորձեր՝ <span className="text-slate-800 dark:text-slate-200">{tries}</span>
        </div>
      </div>

      {isGameOver ? (
        <div className="max-w-md mx-auto text-center space-y-6 py-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Հիանալի է՛
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
              Դուք ճիշտ համապատասխանեցրիք բոլոր {pairs.length} նախադասությունները։
            </p>
            <div className="flex justify-around pt-2 border-t border-slate-50 dark:border-slate-800/50">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Ընդհանուր միավոր</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-mono mt-1">{score}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Օգտագործված փորձ</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-mono mt-1">{tries}</div>
              </div>
            </div>
          </motion.div>

          <button
            id="matcher-play-again-btn"
            onClick={startNewTrial}
            className="flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
            Ստեղծել նոր զույգեր
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
              Իսպաներեն (Español)
            </h4>
            {spanishCards.map((card) => {
              const isMatched = matchedIds.includes(card.id);
              const isSelected = selectedEsp === card.id;
              const hasError = errors[card.id];

              return (
                <button
                  key={card.uniqueId}
                  id={`match-esp-${card.id}`}
                  disabled={isMatched}
                  onClick={() => handleSelectCard(card)}
                  className={`w-full text-left p-3.5 rounded-xl border-2 transition-all duration-200 text-sm font-medium focus:outline-none relative h-24 overflow-y-auto flex items-center cursor-pointer ${
                    isMatched
                      ? 'border-emerald-100/50 bg-emerald-50/20 text-emerald-400 line-through cursor-not-allowed dark:border-emerald-900/30'
                      : hasError
                      ? 'border-rose-450 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 animate-shake'
                      : isSelected
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-indigo-100 dark:shadow-none font-bold text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-100 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 hover:border-slate-200'
                  }`}
                >
                  <p className="leading-snug">{card.text}</p>
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
              Հայերեն (Armenio)
            </h4>
            {armenianCards.map((card) => {
              const isMatched = matchedIds.includes(card.id);
              const isSelected = selectedArm === card.id;
              const hasError = errors[card.id];

              return (
                <button
                  key={card.uniqueId}
                  id={`match-arm-${card.id}`}
                  disabled={isMatched}
                  onClick={() => handleSelectCard(card)}
                  className={`w-full text-left p-3.5 rounded-xl border-2 transition-all duration-200 text-sm font-medium focus:outline-none h-24 overflow-y-auto flex items-center cursor-pointer ${
                    isMatched
                      ? 'border-emerald-100/50 bg-emerald-50/20 text-emerald-400 line-through cursor-not-allowed dark:border-emerald-900/30'
                      : hasError
                      ? 'border-rose-455 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 animate-shake'
                      : isSelected
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-indigo-100 dark:shadow-none font-bold text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-100 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 hover:border-slate-200'
                  }`}
                >
                  <p className="leading-snug">{card.text}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!isGameOver && (
        <button
          id="matcher-reshuffle-btn"
          onClick={startNewTrial}
          className="flex items-center gap-1.5 mx-auto text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition mt-4 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Խառնել նորից
        </button>
      )}
    </div>
  );
}

/* ==========================================
   3. WORD BUILDER GAME
   ========================================== */
interface WordTile {
  index: number;
  text: string;
}

export function WordBuilder() {
  const [currentSentence, setCurrentSentence] = useState<SentencePair | null>(null);
  const [shuffledTiles, setShuffledTiles] = useState<WordTile[]>([]);
  const [constructedWords, setConstructedWords] = useState<WordTile[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const prepareSentence = () => {
    const viableSentences: SentencePair[] = [];
    TEXT_TOPICS.forEach(topic => {
      topic.sections.forEach(sec => {
        sec.sentences.forEach(s => {
          if (!s.spanish.startsWith('—') && s.spanish.split(' ').length <= 11) {
            viableSentences.push(s);
          }
        });
      });
    });

    const picked = viableSentences[Math.floor(Math.random() * viableSentences.length)];
    if (!picked) return;

    const words = picked.spanish
      .replace(/[¿?¡!]/g, '')
      .split(/\s+/)
      .filter(w => w.trim().length > 0);

    const tiles: WordTile[] = words.map((w, index) => ({
      index,
      text: w
    }));

    const shuffled = [...tiles].sort(() => 0.5 - Math.random());

    setCurrentSentence(picked);
    setShuffledTiles(shuffled);
    setConstructedWords([]);
    setIsDone(false);
    setHasChecked(false);
    setIsCorrect(false);
  };

  useEffect(() => {
    prepareSentence();
  }, []);

  const handleTileSelect = (tile: WordTile) => {
    setConstructedWords([...constructedWords, tile]);
    setShuffledTiles(shuffledTiles.filter(t => t.index !== tile.index));
    setHasChecked(false);
  };

  const handleTileRemove = (tile: WordTile) => {
    setShuffledTiles([...shuffledTiles, tile]);
    setConstructedWords(constructedWords.filter(t => t.index !== tile.index));
    setHasChecked(false);
  };

  const handleCheck = () => {
    if (!currentSentence) return;

    const targetWords = currentSentence.spanish
      .replace(/[¿?¡!]/g, '')
      .split(/\s+/)
      .filter(w => w.trim().length > 0);

    const constructedSentence = constructedWords.map(w => w.text.toLowerCase()).join(' ');
    const targetSentence = targetWords.map(w => w.text.toLowerCase()).join(' ');

    const match = constructedSentence === targetSentence;
    setIsCorrect(match);
    setHasChecked(true);

    if (match) {
      setIsDone(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pt-3 font-sans">
      <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-indigo-950/20 dark:to-emerald-950/20 border border-indigo-100/40 dark:border-indigo-900/30 p-5 rounded-2xl space-y-1.5 shadow-sm text-center">
        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" />
          Թարգմանեք հետևյալ նախադասությունը
        </span>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-1">
          {currentSentence?.armenian}
        </h3>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-400 pl-1 uppercase tracking-wider">
          Կառուցման տիրույթ
        </h4>
        <div className="min-h-16 p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 flex flex-wrap gap-2.5 items-center">
          <AnimatePresence>
            {constructedWords.map((tile) => (
              <motion.button
                key={`con-${tile.index}`}
                id={`con-word-${tile.index}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => handleTileRemove(tile)}
                disabled={isDone}
                className="px-3.5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm transition-all shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
              >
                {tile.text}
              </motion.button>
            ))}
          </AnimatePresence>

          {constructedWords.length === 0 && (
            <span className="text-xs text-slate-400 dark:text-slate-500 pl-1">
              Ընտրեք ներքևի բառերը՝ տեղադրելու համար...
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-400 pl-1 uppercase tracking-wider block">
          Հասանելի բառեր
        </h4>
        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 flex flex-wrap gap-2.5 items-center justify-center min-h-16">
          {shuffledTiles.map((tile) => (
            <button
              key={`shuf-${tile.index}`}
              id={`shuf-word-${tile.index}`}
              onClick={() => handleTileSelect(tile)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-755 text-slate-800 dark:text-slate-200 font-medium text-sm transition cursor-pointer active:scale-95"
            >
              {tile.text}
            </button>
          ))}

          {shuffledTiles.length === 0 && constructedWords.length > 0 && !isDone && (
            <span className="text-xs text-slate-400 dark:text-slate-500 italic">
              Բոլոր բառերն ընտրված են։ Ստուգեք թարգմանությունը։
            </span>
          )}
        </div>
      </div>

      {hasChecked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl flex items-start gap-3 border ${
            isCorrect
              ? 'bg-emerald-50/60 border-emerald-100/50 dark:bg-emerald-950/20 dark:border-emerald-900/30'
              : 'bg-rose-50/60 border-rose-100/50 dark:bg-rose-950/20 dark:border-rose-900/30'
          }`}
        >
          {isCorrect ? (
            <>
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-emerald-800 dark:text-emerald-400">Ճիշտ է՛</p>
                <div className="flex items-center gap-1.5 mt-1 font-semibold text-slate-700 dark:text-slate-350">
                  <span>Լսել արտասանությունը:</span>
                  <AudioButton text={currentSentence?.spanish || ''} size="sm" />
                </div>
              </div>
            </>
          ) : (
            <>
              <HelpCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-rose-800 dark:text-rose-400">Սխալ է</p>
                <p className="text-slate-500 dark:text-slate-400">
                  Բառերի հաջորդականությունը ճիշտ չէ։ Փորձեք փοխել դրանց դիրքը կամ վերսկսեք։
                </p>
              </div>
            </>
          )}
        </motion.div>
      )}

      <div className="flex gap-4">
        {isDone ? (
          <button
            id="builder-next-btn"
            onClick={prepareSentence}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            Հաջորդ Նախադասությունը
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            id="builder-check-btn"
            onClick={handleCheck}
            disabled={constructedWords.length === 0}
            className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold transition shadow-sm disabled:opacity-50 cursor-pointer"
          >
            Ստուգել
          </button>
        )}

        <button
          id="builder-reset-btn"
          onClick={prepareSentence}
          className="px-4 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 rounded-2xl transition active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
          title="Բեռնել նոր նախադասություն"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Փոխել</span>
        </button>
      </div>
    </div>
  );
}

/* ==========================================
   4. VOCABULARY QUIZ GAME
   ========================================== */
interface QuizQuestion {
  id: string;
  word: VocabularyWord;
  direction: 'espToArm' | 'armToEsp';
  questionText: string;
  correctAnswer: string;
  options: string[];
}

export function VocabularyQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const generateQuiz = () => {
    const shuffledVocab = [...VOCABULARY].sort(() => 0.5 - Math.random());
    const subset = shuffledVocab.slice(0, 5);

    const generated: QuizQuestion[] = subset.map((vWord, index) => {
      const directions: ('espToArm' | 'armToEsp')[] = ['espToArm', 'armToEsp'];
      const dir = directions[Math.floor(Math.random() * 2)];

      const isEspToArm = dir === 'espToArm';
      const questionText = isEspToArm 
        ? `Ի՞նչ է նշանակում « ${vWord.spanish} » բառը`
        : `Ինչպե՞ս կլինի իսպաներեն « ${vWord.armenian} » բառը`;

      const correct = isEspToArm ? vWord.armenian : vWord.spanish;

      const wrongOptionsPool = VOCABULARY
        .filter(v => v.id !== vWord.id)
        .map(v => isEspToArm ? v.armenian : v.spanish);

      const uniqueWrong = Array.from(new Set(wrongOptionsPool)).sort(() => 0.5 - Math.random());
      const wrongSubset = uniqueWrong.slice(0, 3);

      const options = [correct, ...wrongSubset].sort(() => 0.5 - Math.random());

      return {
        id: `q-${index}-${vWord.id}`,
        word: vWord,
        direction: dir,
        questionText,
        correctAnswer: correct,
        options
      };
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (isAnswered || !selectedOption) return;

    const currentQuestion = questions[currentIndex];
    const correct = selectedOption === currentQuestion.correctAnswer;
    
    if (correct) {
      setScore(prev => prev + 20);
    }

    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex(prev => prev + 1);
  };

  const isQuizOver = currentIndex >= questions.length && questions.length > 0;

  if (isQuizOver) {
    const passed = score >= 60;
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-6 font-sans">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-4"
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
            passed 
              ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/20' 
              : 'bg-amber-100 text-amber-600 dark:bg-amber-950/20'
          }`}>
            <Award className="w-8 h-8" />
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {passed ? 'Գերազանց է՛' : 'Շարունակիր սովորել'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Դուք ավարտեցիք բառապաշարի թեստային փուլը։
          </p>

          <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 py-2">
            {score} / 100
          </div>

          <p className="text-xs font-semibold text-slate-600 dark:text-slate-350">
            Ճիշտ պատասխաններ՝ {score / 20}-ը 5-ից
          </p>
        </motion.div>

        <button
          id="quiz-restart-btn"
          onClick={generateQuiz}
          className="flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Սկսել նոր փուլ
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-md mx-auto space-y-6 font-sans">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-indigo-500" />
          Հարց {currentIndex + 1} / 5
        </span>
        <span className="text-indigo-600 dark:text-indigo-400">Միավոր՝ {score}</span>
      </div>

      <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${(currentIndex / 5) * 100}%` }}
        />
      </div>

      {currentQuestion && (
        <div className="space-y-5">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 rounded-2xl text-center shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug">
              {currentQuestion.questionText}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option) => {
              const worksAsSelected = selectedOption === option;
              const belongsToAnswered = isAnswered;
              const isCorrectAnswer = option === currentQuestion.correctAnswer;

              let btnStyle = 'border-slate-100 bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200';
              
              if (worksAsSelected && !belongsToAnswered) {
                btnStyle = 'border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-300 font-semibold';
              } else if (belongsToAnswered) {
                if (isCorrectAnswer) {
                  btnStyle = 'border-emerald-500 bg-emerald-50/30 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold';
                } else if (worksAsSelected) {
                  btnStyle = 'border-rose-500 bg-rose-50/30 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400 font-bold';
                } else {
                  btnStyle = 'border-slate-100 bg-slate-50/40 opacity-70 text-slate-400 dark:border-slate-800/50 dark:bg-slate-900/10 cursor-not-allowed';
                }
              }

              return (
                <button
                  key={option}
                  id={`quiz-option-${option.toLowerCase().replace(/[^a-z0-9]/gi, '_')}`}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left p-4 rounded-xl border border-slate-200 transition duration-150 text-sm flex items-center justify-between ${btnStyle} active:scale-98 cursor-pointer`}
                >
                  <span>{option}</span>
                  {belongsToAnswered && isCorrectAnswer && (
                    <Check className="w-4 h-4 text-emerald-500" />
                  )}
                  {belongsToAnswered && worksAsSelected && !isCorrectAnswer && (
                    <X className="w-4 h-4 text-rose-500" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            {!isAnswered ? (
              <button
                id="quiz-submit-btn"
                onClick={handleCheckAnswer}
                disabled={!selectedOption}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold transition disabled:opacity-50 cursor-pointer shadow-sm"
              >
                Պատասխանել
              </button>
            ) : (
              <button
                id="quiz-next-btn"
                onClick={handleNext}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                Հաջորդ հարցը
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   5. DIALOGUE CLOZE GAME
   ========================================== */
export function DialogueCloze() {
  const [items, setItems] = useState<DialogueFillIn[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const initGame = () => {
    const shuffled = [...DIALOGUE_CLOZES].sort(() => 0.5 - Math.random());
    setItems(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
  };

  const handleCheck = () => {
    if (!selectedOption || isAnswered) return;

    const correct = selectedOption === items[currentIndex].blankValue;
    if (correct) {
      setScore(prev => prev + 15);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex(prev => prev + 1);
  };

  const isGameOver = currentIndex >= items.length && items.length > 0;

  if (isGameOver) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-6 font-sans">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-4"
        >
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Ավարտվեց՛
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Դուք լրացրեցիք երկխոսությունների բացթողումների բոլոր վարժությունները:
          </p>

          <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono py-1">
            {score} / {items.length * 15}
          </div>

          <p className="text-xs font-semibold text-slate-600 dark:text-slate-350">
            Ընդհանուր հաջողված պատասխաններ՝ {score / 15} / {items.length}
          </p>
        </motion.div>

        <button
          id="cloze-restart-btn"
          onClick={initGame}
          className="flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Սկսել նորից
        </button>
      </div>
    );
  }

  const activeItem = items[currentIndex];
  const renderedSentence = activeItem 
    ? activeItem.sentenceWithBlank.replace('[blank]', selectedOption ? selectedOption : '____')
    : '';

  const fullRealSentence = activeItem 
    ? activeItem.sentenceWithBlank.replace('[blank]', activeItem.blankValue)
    : '';

  return (
    <div className="max-w-md mx-auto space-y-6 font-sans">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-indigo-500" />
          Բաժին {currentIndex + 1} / {items.length}
        </span>
        <span className="text-indigo-600 dark:text-indigo-400">Միավորներ՝ {score}</span>
      </div>

      <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${(currentIndex / items.length) * 100}%` }}
        />
      </div>

      {activeItem && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50/75 dark:bg-amber-950/20 border border-amber-100/50 dark:border-amber-900/30 rounded-2xl">
            <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wide block mb-1">
              Հայերեն թարգմանություն
            </span>
            <p className="text-xs font-semibold text-amber-900 dark:text-amber-350 leading-relaxed">
              {activeItem.dialogueContext}
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm text-center">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              {renderedSentence}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {activeItem.options.map((opt) => {
              const worksAsSelected = selectedOption === opt;
              const isCorrectBlankVal = opt === activeItem.blankValue;
              
              let btnStyle = 'border-slate-100 hover:border-slate-350 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-700 dark:text-slate-200';
              if (worksAsSelected && !isAnswered) {
                btnStyle = 'border-indigo-500 bg-indigo-50/40 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-300 font-bold';
              } else if (isAnswered) {
                if (isCorrectBlankVal) {
                  btnStyle = 'border-emerald-500 bg-emerald-50/35 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-450 font-bold';
                } else if (worksAsSelected) {
                  btnStyle = 'border-rose-500 bg-rose-50/35 text-rose-800 dark:bg-rose-950/40 dark:text-rose-450 font-bold';
                } else {
                  btnStyle = 'border-slate-100 bg-slate-50/30 opacity-60 text-slate-400 dark:border-slate-850 dark:bg-slate-900/10 cursor-not-allowed';
                }
              }

              return (
                <button
                  key={opt}
                  id={`cloze-option-${opt}`}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`py-3.5 px-4 text-center rounded-xl border transition text-sm font-semibold active:scale-97 cursor-pointer ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            {!isAnswered ? (
              <button
                id="cloze-check-btn"
                onClick={handleCheck}
                disabled={!selectedOption}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold transition disabled:opacity-50 shadow-sm cursor-pointer"
              >
                Ստուգել
              </button>
            ) : (
              <div className="space-y-4">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-sans">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    Ճիշտ արտասանությունը:
                  </span>
                  <AudioButton text={fullRealSentence} size="sm" />
                </div>

                <button
                  id="cloze-next-btn"
                  onClick={handleNext}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  Հաջորդը
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   6. COMPREHENSION QUIZ GAME
   ========================================== */
export function ComprehensionQuiz() {
  const [items, setItems] = useState<ComprehensionStatement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDecision, setSelectedDecision] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    const shuffled = [...COMPREHENSION_QUIZ].sort(() => 0.5 - Math.random());
    setItems(shuffled);
    setCurrentIndex(0);
    setSelectedDecision(null);
    setIsAnswered(false);
    setScore(0);
  };

  useEffect(() => {
    startQuiz();
  }, []);

  const handleSelectDecision = (decision: boolean) => {
    if (isAnswered) return;
    setSelectedDecision(decision);
  };

  const handleCheck = () => {
    if (selectedDecision === null || isAnswered) return;

    const currentItem = items[currentIndex];
    const correct = selectedDecision === currentItem.isCorrect;

    if (correct) {
      setScore(prev => prev + 15);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedDecision(null);
    setIsAnswered(false);
    setCurrentIndex(prev => prev + 1);
  };

  const isGameOver = currentIndex >= items.length && items.length > 0;

  if (isGameOver) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-6 font-sans">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-4"
        >
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Ավարտվեց՛
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Դուք ավարտեցիք Տեքստի Ըմբռնման հարցաշարը:
          </p>

          <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono py-1">
            {score} / {items.length * 15}
          </div>

          <p className="text-xs font-semibold text-slate-600 dark:text-slate-350">
            Ճիշտ պատասխաններ՝ {score / 15} / {items.length}
          </p>
        </motion.div>

        <button
          id="truefalse-restart-btn"
          onClick={startQuiz}
          className="flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Սկսել կրկին
        </button>
      </div>
    );
  }

  const activeItem = items[currentIndex];

  return (
    <div className="max-w-md mx-auto space-y-6 font-sans">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Check className="w-4 h-4 text-indigo-500" />
          Պնդում {currentIndex + 1} / {items.length}
        </span>
        <span className="text-indigo-600 dark:text-indigo-400">Միավոր՝ {score}</span>
      </div>

      <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${(currentIndex / items.length) * 100}%` }}
        />
      </div>

      {activeItem && (
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm space-y-4">
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
              Իսպաներեն Պնդում (Declaración)
            </span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug">
              {activeItem.statement}
            </h3>

            <div className="pt-3 border-t border-slate-50 dark:border-slate-850 space-y-1 text-left">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                Տեքստային հուշում (Հայերեն)
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                « {activeItem.armenianSentence} »
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              id="decision-true-btn"
              disabled={isAnswered}
              onClick={() => handleSelectDecision(true)}
              className={`py-4 rounded-xl border-2 transition font-bold text-sm tracking-tight active:scale-97 cursor-pointer text-center ${
                selectedDecision === true && !isAnswered
                  ? 'border-emerald-500 bg-emerald-50/20 text-emerald-800 dark:text-emerald-400'
                  : isAnswered && activeItem.isCorrect === true
                  ? 'border-emerald-500 bg-emerald-50/25 text-emerald-800 dark:text-emerald-400 cursor-not-allowed'
                  : isAnswered && selectedDecision === true && activeItem.isCorrect !== true
                  ? 'border-rose-500 bg-rose-50/20 text-rose-800 dark:text-rose-400 cursor-not-allowed'
                  : 'border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-slate-200'
              }`}
            >
              ՃԻՇՏ Է (Verdadero)
            </button>

            <button
              id="decision-false-btn"
              disabled={isAnswered}
              onClick={() => handleSelectDecision(false)}
              className={`py-4 rounded-xl border-2 transition font-bold text-sm tracking-tight active:scale-97 cursor-pointer text-center ${
                selectedDecision === false && !isAnswered
                  ? 'border-rose-500 bg-rose-50/20 text-rose-700 dark:text-rose-400'
                  : isAnswered && activeItem.isCorrect === false
                  ? 'border-emerald-500 bg-emerald-50/25 text-emerald-800 dark:text-emerald-400 cursor-not-allowed'
                  : isAnswered && selectedDecision === false && activeItem.isCorrect !== false
                  ? 'border-rose-500 bg-rose-50/20 text-rose-800 dark:text-rose-400 cursor-not-allowed'
                  : 'border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-slate-200'
              }`}
            >
              ՍԽԱԼ Է (Falso)
            </button>
          </div>

          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl flex items-start gap-2.5 border ${
                selectedDecision === activeItem.isCorrect
                  ? 'bg-emerald-50/65 border-emerald-100/50 dark:bg-emerald-950/20 dark:border-emerald-900/30'
                  : 'bg-rose-50/65 border-rose-100/50 dark:bg-rose-950/20 dark:border-rose-900/30'
              }`}
            >
              <HelpCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                selectedDecision === activeItem.isCorrect ? 'text-emerald-500' : 'text-rose-500'
              }`} />
              <div className="text-xs space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  {selectedDecision === activeItem.isCorrect ? 'Ճիշտ պատասխանեցիք՛' : 'Սխալ պատասխան'}
                </p>
                <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                  {activeItem.explanationArm}
                </p>
              </div>
            </motion.div>
          )}

          <div className="pt-2">
            {!isAnswered ? (
              <button
                id="truefalse-check-btn"
                onClick={handleCheck}
                disabled={selectedDecision === null}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[11px] font-bold transition disabled:opacity-50 shadow-sm cursor-pointer"
              >
                Ստուգել Պատասխանը
              </button>
            ) : (
              <button
                id="truefalse-next-btn"
                onClick={handleNext}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                Հաջորդ պնդումը
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
