/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function AudioButton({ text, size = 'md', className = '' }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  const speak = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering parent clicks (like revealing armenian translation)

    if (!isSupported) return;

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Clean the text of parenthetical elements like "—" or "[blank]"
      const cleanText = text
        .replace(/^[—\s-]+/, '')
        .replace(/\[blank\]/g, '...')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';

      // Find Spanish voice if possible
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith('es-'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis failed:', err);
      setIsPlaying(false);
    }
  };

  if (!isSupported) {
    return (
      <span className="text-gray-400 cursor-not-allowed opacity-50" title="Audio not supported">
        <VolumeX className="w-4 h-4" />
      </span>
    );
  }

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base'
  };

  return (
    <button
      id={`audio-btn-${text.substring(0, 10).replace(/[^a-z0-9]/gi, '_')}`}
      type="button"
      onClick={speak}
      className={`rounded-full transition-all duration-200 
        ${isPlaying 
          ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 scale-110 animate-pulse' 
          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
        } ${sizeClasses[size]} ${className}`}
      title="Լսել արտասանությունը (Listen Spanish Pronunciation)"
    >
      <Volume2 className={`w-4 h-4 ${isPlaying ? 'scale-110' : ''}`} />
    </button>
  );
}
