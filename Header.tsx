/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles, GraduationCap } from 'lucide-react';

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check initial system class preference
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

  return (
    <header className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Brand Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-indigo-100 dark:shadow-none animate-pulse">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-sans font-bold text-slate-800 dark:text-slate-100 text-base sm:text-lg tracking-tight">
                Իսպաներեն-Հայերեն Ուսուցում
              </h1>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono text-[9px] font-bold">
                v1.1
              </span>
            </div>
            <p className="text-[10px] text-slate-450 dark:text-slate-400 font-sans tracking-wide">
              Spanish Learning & Reading Dashboard (Armenian)
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Subtle decoration display */}
          <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Անվճար Լեզուների Դասընթաց</span>
          </div>

          {/* Theme switcher */}
          <button
            id="theme-toggler-btn"
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
            title="Փոխել գիշերային ռեժիմը (Dark/Light Mode)"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
}
