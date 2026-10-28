import React, { useState } from 'react';
import { useRecipes } from '../context/RecipeContext';
import {
  Clock,
  Users,
  Flame,
  Bookmark,
  Share2,
  Printer,
  Edit3,
  Play,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { formatAmount, scaleAmount, convertUnit } from '../utils/measurements';
import { motion, AnimatePresence } from 'motion/react';

export const RecipePageView: React.FC = () => {
  const {
    activeRecipe,
    recipes,
    setActiveRecipeId,
    targetServings,
    setTargetServings,
    metricMode,
    setMetricMode,
    addRecipeToGrocery,
    toggleFavorite,
    setViewMode,
    setEditingRecipe,
    goToNextRecipe,
    goToPrevRecipe,
  } = useRecipes();

  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [groceryAddedToast, setGroceryAddedToast] = useState(false);

  if (!activeRecipe) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <BookOpen className="w-12 h-12 text-stone-400 mb-3" />
        <h3 className="font-serif text-2xl font-bold text-stone-700">No recipe selected</h3>
        <button
          onClick={() => setViewMode('index')}
          className="mt-4 px-4 py-2 bg-[#2D231A] text-white rounded text-sm font-serif"
        >
          Browse Recipe Index
        </button>
      </div>
    );
  }

  const baseServings = activeRecipe.servings || 4;
  const isScaled = targetServings !== baseServings;

  const handleToggleIngredient = (id: string) => {
    setCheckedIngredients(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleStep = (id: string) => {
    setCheckedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddGrocery = () => {
    addRecipeToGrocery(activeRecipe, targetServings);
    setGroceryAddedToast(true);
    setTimeout(() => setGroceryAddedToast(false), 2500);
  };

  const handleModifyRecipe = () => {
    setEditingRecipe(activeRecipe);
    setViewMode('editor');
  };

  const handleScalePreset = (factor: number) => {
    setTargetServings(Math.max(1, Math.round(baseServings * factor)));
  };

  const handlePrint = () => {
    window.print();
  };

  // Recipe index count
  const currentIndex = recipes.findIndex(r => r.id === activeRecipe.id);
  const totalRecipes = recipes.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top Ribbon Tabs for Quick Category Browsing */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('index')}
            className="cursor-pointer inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#735A43] hover:text-[#2E241B] font-medium"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Table of Contents</span>
          </button>
          <span className="text-stone-300">·</span>
          <span className="text-xs text-stone-500 font-serif italic">
            Folio {currentIndex + 1} of {totalRecipes}
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleFavorite(activeRecipe.id)}
            className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-serif transition-colors ${
              activeRecipe.isFavorite
                ? 'bg-[#EBD6D8] text-[#8C232C] font-semibold'
                : 'bg-[#ECE5D8] text-[#55473A] hover:bg-[#E2D8C6]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${activeRecipe.isFavorite ? 'fill-[#8C232C]' : ''}`} />
            <span>{activeRecipe.isFavorite ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            onClick={handleModifyRecipe}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-serif bg-[#ECE5D8] text-[#55473A] hover:bg-[#E2D8C6] transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Modify Recipe</span>
          </button>

          <button
            onClick={handlePrint}
            className="cursor-pointer hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-serif bg-[#ECE5D8] text-[#55473A] hover:bg-[#E2D8C6] transition-colors"
            title="Print recipe page"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* The Open Virtual Book */}
      <div className="relative bg-[#FCFAF5] rounded-xl border border-[#DDD1BE] shadow-2xl book-shadow overflow-hidden">
        {/* Book Spine Center Marker (visible on lg screens) */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none z-20">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-stone-400/20 to-transparent shadow-inner" />
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#DDD0BC]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ================= LEFT PAGE ================= */}
          <div className="p-6 sm:p-10 parchment-paper border-b lg:border-b-0 lg:border-r border-[#E5DAC8] relative">
            {/* Header / Origin kicker */}
            <div className="flex items-center justify-between border-b border-[#E6DBCA] pb-3 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#8C5A2B] font-semibold">
                {activeRecipe.category}
              </span>
              <span className="text-xs font-serif italic text-stone-500">
                {activeRecipe.originYear}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-6">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2118] tracking-tight leading-tight">
                {activeRecipe.title}
              </h1>
              {activeRecipe.subtitle && (
                <p className="font-serif italic text-sm text-[#735A43] mt-1.5">
                  {activeRecipe.subtitle}
                </p>
              )}
            </div>

            {/* Recipe Image with Vintage Frame */}
            {activeRecipe.heroImage ? (
              <div className="mb-6 relative group">
                <div className="aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden border-4 border-[#FAF7F0] shadow-md bg-stone-100">
                  <img
                    src={activeRecipe.heroImage}
                    alt={activeRecipe.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Vintage stamp badge in top right */}
                {activeRecipe.vintageStamp && (
                  <div className="absolute -top-2.5 -right-2.5 bg-[#8C232C] text-[#FAF7F0] text-[10px] font-serif uppercase tracking-widest px-2.5 py-1 rounded shadow-md border border-[#F4E3E4] rotate-3 flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    <span>{activeRecipe.vintageStamp}</span>
                  </div>
                )}
              </div>
            ) : null}

            {/* Description */}
            <p className="text-sm text-stone-700 leading-relaxed font-serif text-[15px] mb-6">
              {activeRecipe.description}
            </p>

            {/* Serving Scaler & Unit Switcher Box */}
            <div className="bg-[#F5EFE4] border border-[#DDD1BD] rounded-lg p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Servings Adjuster */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-serif font-semibold text-[#3D3025] flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#8C5A2B]" />
                    <span>Servings:</span>
                  </span>

                  <div className="flex items-center bg-[#FAF7F0] rounded border border-[#D5C7B2] overflow-hidden">
                    <button
                      onClick={() => setTargetServings(Math.max(1, targetServings - 1))}
                      disabled={targetServings <= 1}
                      className="px-2 py-1 text-stone-600 hover:text-black hover:bg-stone-100 disabled:opacity-40 transition-colors cursor-pointer"
                      title="Fewer servings"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-1 font-mono font-bold text-xs text-[#2A2118] tabular-nums">
                      {targetServings}
                    </span>
                    <button
                      onClick={() => setTargetServings(targetServings + 1)}
                      className="px-2 py-1 text-stone-600 hover:text-black hover:bg-stone-100 transition-colors cursor-pointer"
                      title="More servings"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Quick Scale Presets */}
                  <div className="hidden sm:flex items-center gap-1">
                    <button
                      onClick={() => handleScalePreset(0.5)}
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                        targetServings === Math.round(baseServings * 0.5)
                          ? 'bg-[#8C5A2B] text-white font-bold'
                          : 'bg-[#ECE3D2] text-stone-600 hover:bg-[#E0D4BE]'
                      }`}
                    >
                      ½x
                    </button>
                    <button
                      onClick={() => handleScalePreset(1)}
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                        targetServings === baseServings
                          ? 'bg-[#8C5A2B] text-white font-bold'
                          : 'bg-[#ECE3D2] text-stone-600 hover:bg-[#E0D4BE]'
                      }`}
                    >
                      1x
                    </button>
                    <button
                      onClick={() => handleScalePreset(2)}
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                        targetServings === baseServings * 2
                          ? 'bg-[#8C5A2B] text-white font-bold'
                          : 'bg-[#ECE3D2] text-stone-600 hover:bg-[#E0D4BE]'
                      }`}
                    >
                      2x
                    </button>
                  </div>
                </div>

                {/* Imperial vs Metric Toggle */}
                <div className="flex items-center gap-1 bg-[#FAF7F0] p-0.5 rounded border border-[#D5C7B2]">
                  <button
                    onClick={() => setMetricMode(false)}
                    className={`px-2 py-0.5 text-[11px] font-serif rounded cursor-pointer transition-colors ${
                      !metricMode ? 'bg-[#2A2118] text-white font-medium' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Imperial
                  </button>
                  <button
                    onClick={() => setMetricMode(true)}
                    className={`px-2 py-0.5 text-[11px] font-serif rounded cursor-pointer transition-colors ${
                      metricMode ? 'bg-[#2A2118] text-white font-medium' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Metric (g/ml)
                  </button>
                </div>
              </div>

              {isScaled && (
                <p className="text-[11px] text-[#8C5A2B] font-serif italic mt-2 text-right">
                  *Quantities scaled from {baseServings} to {targetServings} servings.
                </p>
              )}
            </div>

            {/* Ingredients Section */}
            <div>
              <div className="flex items-center justify-between border-b border-[#E6DBCA] pb-2 mb-3">
                <h3 className="font-serif font-bold text-lg text-[#2A2118]">
                  Pantry & Ingredients
                </h3>
                <button
                  onClick={handleAddGrocery}
                  className="cursor-pointer inline-flex items-center gap-1 text-xs font-serif text-[#8C5A2B] hover:text-[#5F3D1C] font-semibold"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Grocery List</span>
                </button>
              </div>

              {groceryAddedToast && (
                <div className="mb-3 py-1.5 px-3 bg-[#EAF2EB] text-[#295937] text-xs font-serif rounded border border-[#C5DDCB] flex items-center gap-1.5 animate-fadeIn">
                  <Check className="w-3.5 h-3.5" />
                  <span>Added {activeRecipe.ingredients.length} ingredients to your grocery list!</span>
                </div>
              )}

              <ul className="space-y-2 text-sm">
                {activeRecipe.ingredients.map(ing => {
                  const scaled = scaleAmount(ing.amount, baseServings, targetServings);
                  const converted = convertUnit(scaled, ing.unit, metricMode);
                  const isChecked = checkedIngredients[ing.id];

                  return (
                    <li
                      key={ing.id}
                      onClick={() => handleToggleIngredient(ing.id)}
                      className={`cursor-pointer flex items-baseline gap-2.5 py-1 px-1.5 rounded transition-colors ${
                        isChecked ? 'line-through text-stone-400 bg-stone-100/60' : 'text-[#2D241C] hover:bg-[#F4EFE6]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded accent-[#8C5A2B] cursor-pointer"
                      />
                      <span className="font-mono font-semibold text-xs tabular-nums text-[#8C5A2B] shrink-0">
                        {formatAmount(converted.value)} {converted.unit}
                      </span>
                      <span className="font-serif text-[15px]">
                        {ing.name}
                        {ing.notes && (
                          <span className="text-xs text-stone-500 font-sans italic ml-1.5">
                            ({ing.notes})
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* ================= RIGHT PAGE ================= */}
          <div className="p-6 sm:p-10 parchment-paper flex flex-col justify-between">
            <div>
              {/* Timing & Meta Ribbon (Anti-slop clean text) */}
              <div className="flex items-center justify-between border-b border-[#E6DBCA] pb-3 mb-6">
                <div className="flex items-center gap-3 text-xs text-stone-600 font-serif">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#8C5A2B]" />
                    <span>Prep: {activeRecipe.prepTime}m</span>
                  </span>
                  <span>·</span>
                  <span>Cook: {activeRecipe.cookTime}m</span>
                  <span>·</span>
                  <span className="font-medium text-[#2A2118]">
                    Total: {activeRecipe.prepTime + activeRecipe.cookTime}m
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-stone-500 font-serif">
                  <Flame className="w-3.5 h-3.5 text-[#B84E34]" />
                  <span>{activeRecipe.difficulty}</span>
                </div>
              </div>

              {/* Instructions Header with "Start Cooking Mode" Button */}
              <div className="flex items-center justify-between border-b border-[#E6DBCA] pb-2 mb-4">
                <h3 className="font-serif font-bold text-lg text-[#2A2118]">
                  Step-by-Step Method
                </h3>
                <button
                  onClick={() => setViewMode('cooking')}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4A6054] hover:bg-[#3B4D43] text-white text-xs font-serif font-medium rounded shadow-xs transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Cooking Assistant</span>
                </button>
              </div>

              {/* Steps List */}
              <div className="space-y-4 mb-6">
                {activeRecipe.instructions.map((step) => {
                  const isChecked = checkedSteps[step.id];

                  return (
                    <div
                      key={step.id}
                      onClick={() => handleToggleStep(step.id)}
                      className={`cursor-pointer group flex items-start gap-3 p-2.5 rounded-lg border transition-all ${
                        isChecked
                          ? 'bg-[#EAE5DA]/50 border-stone-200 opacity-60'
                          : 'bg-[#FAF7F1] border-[#EADFCB] hover:border-[#D5C7B0] hover:shadow-xs'
                      }`}
                    >
                      {/* Step Number in Serif Circle */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? 'bg-stone-300 text-stone-600'
                            : 'bg-[#2A2118] text-[#FAF7F0] group-hover:bg-[#8C5A2B]'
                        }`}
                      >
                        {isChecked ? <Check className="w-3.5 h-3.5" /> : step.stepNumber}
                      </div>

                      <div className="flex-1">
                        <p
                          className={`font-serif text-[15px] leading-relaxed ${
                            isChecked ? 'line-through text-stone-500' : 'text-[#2C241D]'
                          }`}
                        >
                          {step.text}
                        </p>

                        {/* Chef Tip / Duration */}
                        <div className="flex items-center gap-3 mt-1.5">
                          {step.durationMinutes && (
                            <span className="text-[11px] font-mono text-[#8C5A2B] bg-[#EFE9DC] px-1.5 py-0.2 rounded">
                              ⏱ ~{step.durationMinutes} min
                            </span>
                          )}
                          {step.tip && (
                            <span className="text-xs text-[#735A43] font-serif italic">
                              Tip: {step.tip}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Nana's / Chef's Marginalia Note */}
              {activeRecipe.chefNotes && (
                <div className="p-4 bg-[#F5EEDB] border-l-2 border-[#8C5A2B] rounded-r-lg mb-6">
                  <p className="text-xs uppercase tracking-widest font-semibold text-[#8C5A2B] mb-1">
                    Heirloom Marginalia & Secret
                  </p>
                  <p className="font-serif italic text-sm text-stone-800 leading-relaxed">
                    "{activeRecipe.chefNotes}"
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Page Footer Navigation */}
            <div className="pt-4 border-t border-[#E6DBCA] flex items-center justify-between text-xs font-serif">
              <button
                onClick={goToPrevRecipe}
                className="cursor-pointer inline-flex items-center gap-1.5 text-[#5C4D3E] hover:text-[#2A2118] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Recipe</span>
              </button>

              <div className="flex items-center gap-1.5">
                {recipes.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => setActiveRecipeId(r.id)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      r.id === activeRecipe.id ? 'w-4 bg-[#8C5A2B]' : 'bg-[#D9CCB7] hover:bg-[#8C5A2B]/60'
                    }`}
                    title={r.title}
                  />
                ))}
              </div>

              <button
                onClick={goToNextRecipe}
                className="cursor-pointer inline-flex items-center gap-1.5 text-[#5C4D3E] hover:text-[#2A2118] transition-colors"
              >
                <span>Next Recipe</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
