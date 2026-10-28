import React, { useState, useEffect } from 'react';
import { useRecipes } from '../context/RecipeContext';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Bell,
  Sparkles,
  Flame,
  Volume2,
  VolumeX,
  Utensils
} from 'lucide-react';
import { playClockTickSound, playTimerBell, playStampSound } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';

export const CookingModeModal: React.FC = () => {
  const {
    activeRecipe,
    setViewMode,
    soundEnabled,
    setSoundEnabled,
  } = useRecipes();

  if (!activeRecipe) return null;

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const totalSteps = activeRecipe.instructions.length;
  const currentStep = activeRecipe.instructions[currentStepIdx];

  // Kitchen Timer State
  const initialDuration = (currentStep?.durationMinutes || 10) * 60;
  const [timerSeconds, setTimerSeconds] = useState(initialDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showFinishedConfetti, setShowFinishedConfetti] = useState(false);

  // Sync timer when step changes
  useEffect(() => {
    if (currentStep?.durationMinutes) {
      setTimerSeconds(currentStep.durationMinutes * 60);
      setIsTimerRunning(false);
    }
  }, [currentStepIdx, currentStep?.durationMinutes]);

  // Countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            if (soundEnabled) playTimerBell();
            return 0;
          }
          if (soundEnabled && prev % 2 === 0) {
            playClockTickSound();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, soundEnabled]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (currentStepIdx < totalSteps - 1) {
          e.preventDefault();
          handleNextStep();
        } else if (currentStepIdx === totalSteps - 1) {
          setShowFinishedConfetti(true);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentStepIdx > 0) {
          e.preventDefault();
          handlePrevStep();
        }
      } else if (e.key === 'Escape') {
        setViewMode('recipe');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIdx, totalSteps]);

  const handleNextStep = () => {
    if (soundEnabled) playStampSound();
    if (currentStepIdx < totalSteps - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      setShowFinishedConfetti(true);
      if (soundEnabled) playTimerBell();
    }
  };

  const handlePrevStep = () => {
    if (soundEnabled) playStampSound();
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addTimerTime = (secondsToAdd: number) => {
    setTimerSeconds(prev => prev + secondsToAdd);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#241C15]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF7F0] border-2 border-[#D8C9B3] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#EDE5D5] border-b border-[#D8C9B3] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm font-semibold text-[#8C5A2B] tracking-wider uppercase">
              Kitchen Assistant
            </span>
            <span className="text-stone-400">·</span>
            <h2 className="font-serif font-bold text-lg text-[#2A2118] line-clamp-1">
              {activeRecipe.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(prev => !prev)}
              aria-label="Toggle sound"
              className="p-1.5 text-stone-600 hover:text-stone-900 rounded-md hover:bg-[#DDD3C0] transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
            </button>
            <button
              onClick={() => setViewMode('recipe')}
              aria-label="Close cooking mode"
              className="p-1.5 text-stone-600 hover:text-stone-900 rounded-md hover:bg-[#DDD3C0] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1">
          {showFinishedConfetti ? (
            /* Celebration Screen */
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#EAF2EB] text-[#295937] flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-serif uppercase tracking-widest text-[#8C5A2B] font-bold">
                  Heirloom Achievement Unlocked
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2118] mt-2">
                  Bon Appétit!
                </h3>
                <p className="font-serif italic text-stone-600 text-lg mt-2 max-w-lg mx-auto">
                  You have completed <span className="font-semibold">{activeRecipe.title}</span>. Time to plate, share, and savor every bite.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowFinishedConfetti(false);
                    setCurrentStepIdx(0);
                  }}
                  className="px-5 py-2.5 border border-[#C5B7A0] text-stone-800 font-serif text-sm rounded hover:bg-[#EDE6D8] cursor-pointer"
                >
                  Cook Again
                </button>
                <button
                  onClick={() => setViewMode('recipe')}
                  className="px-6 py-2.5 bg-[#2A2118] text-white font-serif text-sm rounded hover:bg-[#1E1711] shadow cursor-pointer"
                >
                  Return to Recipe Book
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Big Step Instructions */}
              <div className="lg:col-span-7 space-y-6">
                {/* Step Progress Pill Indicator */}
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-serif tracking-widest font-bold text-[#8C5A2B]">
                    Step {currentStepIdx + 1} of {totalSteps}
                  </span>
                  <div className="flex-1 flex gap-1 h-1.5 bg-[#E6DAC7] rounded-full overflow-hidden">
                    {activeRecipe.instructions.map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 transition-all duration-300 ${
                          i <= currentStepIdx ? 'bg-[#8C5A2B]' : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Instruction Text */}
                <div className="bg-[#FCFAF5] p-6 rounded-xl border border-[#E4D9C7] shadow-sm">
                  <p className="font-serif text-xl sm:text-2xl text-[#2B231C] leading-relaxed">
                    {currentStep?.text}
                  </p>

                  {/* Chef Tip */}
                  {currentStep?.tip && (
                    <div className="mt-4 pt-4 border-t border-[#EDE4D2] flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#8C5A2B] shrink-0 mt-1" />
                      <p className="font-serif italic text-sm text-[#735A43]">
                        {currentStep.tip}
                      </p>
                    </div>
                  )}
                </div>

                {/* Navigation Steppers */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStepIdx === 0}
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 border border-[#D5C7B2] rounded-lg font-serif text-sm text-stone-700 hover:bg-[#EDE5D5] disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Step</span>
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 bg-[#8C232C] hover:bg-[#721A22] text-white font-serif text-sm font-semibold rounded-lg shadow-sm transition-all"
                  >
                    <span>
                      {currentStepIdx === totalSteps - 1 ? 'Finish Dish' : 'Next Step'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Vintage Animated Kitchen Timer & Steaming Kettle */}
              <div className="lg:col-span-5 bg-[#F4EFE6] p-6 rounded-xl border border-[#DDD0BC] flex flex-col items-center text-center space-y-6">
                {/* Cute Animated Steam Illustration */}
                <div className="relative w-28 h-24 flex items-end justify-center">
                  {/* Steam Puffs */}
                  <div className="absolute top-0 flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#B3A08A]/60 animate-steam-1 blur-[1px]" />
                    <span className="w-4 h-4 rounded-full bg-[#B3A08A]/70 animate-steam-2 blur-[1px]" />
                    <span className="w-3 h-3 rounded-full bg-[#B3A08A]/60 animate-steam-3 blur-[1px]" />
                  </div>

                  {/* Cute Vintage Pot / Kettle SVG */}
                  <svg className="w-20 h-16 text-[#5A3F2C]" viewBox="0 0 80 60" fill="currentColor">
                    {/* Pot Lid */}
                    <path d="M 25 22 Q 40 14 55 22 Z" fill="#7D573C" />
                    <circle cx="40" cy="15" r="3.5" fill="#CBB38E" />
                    {/* Pot Body */}
                    <path d="M 20 23 L 60 23 Q 65 24 64 36 Q 62 48 40 50 Q 18 48 16 36 Q 15 24 20 23 Z" fill="#8C5A2B" />
                    {/* Side handles */}
                    <path d="M 16 28 C 10 28 10 36 16 36" stroke="#4A3423" strokeWidth="3" fill="none" />
                    <path d="M 64 28 C 70 28 70 36 64 36" stroke="#4A3423" strokeWidth="3" fill="none" />
                    {/* Flame glow */}
                    <ellipse cx="40" cy="53" rx="18" ry="3" fill="#D97706" opacity="0.6" />
                  </svg>
                </div>

                {/* Vintage Timer Display */}
                <div className="w-full">
                  <span className="text-[11px] font-serif uppercase tracking-widest text-[#735A43] font-semibold block mb-1">
                    Brass Kitchen Timer
                  </span>
                  <div className="font-mono text-4xl sm:text-5xl font-bold tracking-tight text-[#2B231C] py-2 bg-[#FAF7F0] border border-[#DDD0BC] rounded-lg shadow-inner tabular-nums">
                    {formatTimer(timerSeconds)}
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`cursor-pointer inline-flex items-center gap-2 px-5 py-2 rounded-lg font-serif text-sm font-semibold transition-all ${
                      isTimerRunning
                        ? 'bg-[#B84E34] text-white hover:bg-[#9B3E26]'
                        : 'bg-[#4A6054] text-white hover:bg-[#3B4D43]'
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>Start Timer</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds((currentStep?.durationMinutes || 10) * 60);
                    }}
                    aria-label="Reset timer"
                    className="cursor-pointer p-2 rounded-lg border border-[#D5C7B2] bg-[#FAF7F0] text-stone-700 hover:bg-[#EDE5D5] transition-colors"
                    title="Reset to step duration"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Add Presets */}
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-serif text-stone-500 mr-1">Add:</span>
                  <button
                    onClick={() => addTimerTime(60)}
                    className="cursor-pointer px-2 py-1 bg-[#FAF7F0] border border-[#D8CCBA] rounded text-[11px] font-mono hover:bg-[#EDE5D5]"
                  >
                    +1m
                  </button>
                  <button
                    onClick={() => addTimerTime(300)}
                    className="cursor-pointer px-2 py-1 bg-[#FAF7F0] border border-[#D8CCBA] rounded text-[11px] font-mono hover:bg-[#EDE5D5]"
                  >
                    +5m
                  </button>
                  <button
                    onClick={() => addTimerTime(600)}
                    className="cursor-pointer px-2 py-1 bg-[#FAF7F0] border border-[#D8CCBA] rounded text-[11px] font-mono hover:bg-[#EDE5D5]"
                  >
                    +10m
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Keyboard navigation tip footer */}
        <div className="px-6 py-2.5 bg-[#EDE5D5]/80 border-t border-[#D8C9B3] text-center text-xs font-serif text-stone-500">
          Pro-tip: Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-stone-300 text-stone-700">Space</kbd> or <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-stone-300 text-stone-700">→</kbd> to advance steps while cooking!
        </div>
      </div>
    </div>
  );
};
