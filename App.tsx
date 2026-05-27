/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TextReader from './TextReader';
import GameCenter from './GameCenter';
import { ActiveTab, GameId } from './types';
import { 
  BookOpen, 
  Gamepad2, 
  GraduationCap, 
  Heart, 
  Sparkles, 
  Sun, 
  Moon,
  CheckCircle2,
  Trophy
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('reader');
  const [activeGameId, setActiveGameId] = useState<GameId | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showProgressModal, setShowProgressModal] = useState(false);
  
  // Track theme preference on load
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      setTheme(isCurrentlyDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    if (typeof document === 'undefined') return;
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  };

  const handleSelectGameTab = () => {
    setActiveTab('games');
  };

  const handleSelectReaderTab = () => {
    setActiveTab('reader');
    setActiveGameId(null);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-200 overflow-y-auto pb-12">
      
      {/* 1. TOP MAIN HEADER */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-sky-500 rounded-xl flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-sky-500/20">
              L
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans sm:text-3xl">
                LinguArmenia
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                Իսպաներեն հայախոսների համար
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Action Progress Button */}
            <button
              id="dashboard-check-progress-btn"
              onClick={() => setShowProgressModal(true)}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold tracking-tight shadow-md shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Check Progress
            </button>

            {/* In-app theme toggler */}
            <button
              id="theme-switch-icon"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
              title="Փոխել գիշերային ռեժիմը"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. BODY CONTENT CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs Selector Header (Centred and larger!) */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 gap-6 shadow-md transition-colors">
          <div className="flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 font-sans tracking-tight sm:text-xl">
                Ինտերակտիվ Ուսումնական Հարթակ
              </h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                Կարդացեք տեքստերը կամ ստուգեք ձեր ուժերը 6 խաղերում
              </p>
            </div>
          </div>

          {/* Segmented Pill Navigation Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full md:w-auto relative" id="main-nav-tabs">
            <button
              id="nav-tab-reader"
              onClick={handleSelectReaderTab}
              className={`flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-lg text-sm font-bold transition-all relative z-10 w-1/2 md:w-auto cursor-pointer ${
                activeTab === 'reader'
                  ? 'text-indigo-600 dark:text-indigo-300'
                  : 'text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
              }`}
            >
              {activeTab === 'reader' && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <BookOpen className="w-4.5 h-4.5 relative z-10" />
              <span className="relative z-10 font-sans">1. Տեքստեր և թարգմանություններ</span>
            </button>

            <button
              id="nav-tab-games"
              onClick={handleSelectGameTab}
              className={`flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-lg text-sm font-bold transition-all relative z-10 w-1/2 md:w-auto cursor-pointer ${
                activeTab === 'games'
                  ? 'text-indigo-600 dark:text-indigo-300'
                  : 'text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
              }`}
            >
              {activeTab === 'games' && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Gamepad2 className="w-4.5 h-4.5 relative z-10" />
              <span className="relative z-10 font-sans">2. 6 Ուսուցողական Խաղեր</span>
            </button>
          </div>
        </div>

        {/* 3. MAIN CENTRAL INTERACTIVE CONTAINER */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl min-h-[550px] shadow-xl border border-slate-200/60 dark:border-slate-800 flex flex-col overflow-hidden transition-colors">
          <div className="flex-1 p-5 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${activeGameId}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {activeTab === 'reader' ? (
                  <TextReader />
                ) : (
                  <GameCenter activeGameId={activeGameId} setActiveGameId={setActiveGameId} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 4. FOOTER DECORATION */}
        <footer className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 dark:text-slate-500 gap-4 border-t border-slate-250/50 dark:border-slate-800">
          <div className="flex items-center gap-1.5 bg-slate-200/30 dark:bg-slate-900/30 px-3.5 py-1.5 rounded-full">
            <span>© 2026 Իսպաներենի Ուսուցում — LinguArmenia:</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" />
          </div>
          <div className="flex items-center gap-1.5 bg-sky-50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400 px-4 py-1.5 rounded-full border border-sky-100/30 dark:border-sky-900/20 font-medium">
            <span>Պատրաստված է հայ իսպանախոսների համար՝ սիրով</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
        </footer>

      </main>

      {/* PROGRESS SCORE & STATS DIALOG MODAL */}
      <AnimatePresence>
        {showProgressModal && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            {/* Modal glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProgressModal(false)}
              className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
            />

            {/* Achievement dialog card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-3xl p-8 shadow-2xl relative max-w-md w-full z-10"
            >
              {/* Star sparkles ornament decoration */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-tr from-sky-400 to-indigo-500 rounded-2xl rotate-12 flex items-center justify-center shadow-lg shadow-sky-500/20">
                <Trophy className="w-10 h-10 text-white -rotate-12" />
              </div>

              <div className="text-center mt-10 space-y-2">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight">
                  Ձեր Լեզվական Առաջընթացը
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                  LinguArmenia Ինտերակտիվ Ակադեմիա
                </p>
              </div>

              {/* Progress metric badges */}
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider mb-1">Տեքստեր</span>
                  <p className="text-xl font-black text-sky-500 tracking-tight">100%</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">Բոլորն ակտիվ են</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider mb-1">Խաղեր</span>
                  <p className="text-xl font-black text-indigo-500 tracking-tight">6 / 6</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">Պատրաստ են խաղալ</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-350">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                  <span>Բառապաշարի և երկխոսությունների բազա</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-350">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                  <span>Աուդիո ճիշտ արտասանություն իսպաներենով</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-350">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                  <span>6 Ինտերակտիվ ուսուցողական խաղեր</span>
                </div>
              </div>

              <button
                id="close-progress-modal-btn"
                onClick={() => setShowProgressModal(false)}
                className="w-full mt-6 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold py-3 rounded-xl transition-all cursor-pointer"
              >
                Լավ, Շարունակենք Սովորել!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
