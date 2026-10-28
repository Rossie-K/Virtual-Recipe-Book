import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import { BookOpen, Sparkles, Utensils, Award, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const BookCoverView: React.FC = () => {
  const { setViewMode, recipes, setActiveRecipeId } = useRecipes();

  const totalRecipes = recipes.length;
  const favoritesCount = recipes.filter(r => r.isFavorite).length;

  return (
    <div className="min-h-[calc(100vh-70px)] py-10 px-4 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#F7F3E9] p-6 md:p-10 rounded-2xl border border-[#DDD3C2] shadow-xl book-shadow"
        >
          {/* Visual Book Cover on Left */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group cursor-pointer" onClick={() => setViewMode('recipe')}>
              <div className="relative w-64 sm:w-72 rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-102 group-hover:-rotate-1 border-4 border-[#3D2F22]/20">
                <img
                  src="/src/assets/images/vintage_cookbook_cover_1793188739700.jpg"
                  alt="The Grand Heirloom Family Recipe Book Cover"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Ribbon bookmark overlay */}
                <div className="absolute -top-1 right-8 w-6 h-28 bg-[#8C232C] shadow-md z-10 flex flex-col justify-end">
                  <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[10px] border-b-[#F7F3E9]" />
                </div>
              </div>
              <p className="text-center font-serif text-xs text-stone-500 italic mt-3">
                Click to open heirloom volume
              </p>
            </div>
          </div>

          {/* Editorial Introduction on Right */}
          <div className="md:col-span-7 space-y-6">
            <div className="border-b border-[#E2D7C3] pb-4">
              <span className="text-xs uppercase tracking-widest text-[#8C5A2B] font-semibold block mb-1">
                A Living Kitchen Treasury · Est. 1878
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292119] leading-tight">
                The Grand Heirloom Recipe Book
              </h1>
              <p className="text-sm font-serif italic text-stone-600 mt-2">
                "Where treasured family secrets, hand-scrawled marginalia, and timeless comfort meet."
              </p>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed">
              Step inside a warm virtual cookbook crafted for genuine home bakers and hearthside cooks.
              Scale ingredients with precision, launch interactive step-by-step cooking timers with gentle chimes,
              modify any existing heirloom formula, or handwrite your own family classics to preserve for generations.
            </p>

            {/* Quiet Stats Strip (anti-slop, clean typography) */}
            <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#E2D7C3] text-center">
              <div>
                <span className="block font-serif text-2xl font-bold text-[#2A2118] tabular-nums">
                  {totalRecipes}
                </span>
                <span className="text-xs text-stone-500 font-serif">Curated Recipes</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-[#8C232C] tabular-nums">
                  {favoritesCount}
                </span>
                <span className="text-xs text-stone-500 font-serif">Gold Favorites</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-[#4A6054] tabular-nums">
                  1878–Now
                </span>
                <span className="text-xs text-stone-500 font-serif">Living Archive</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setViewMode('recipe')}
                className="cursor-pointer inline-flex items-center gap-2.5 px-6 py-3 bg-[#2D231A] text-[#FAF7F0] font-serif text-base font-medium rounded hover:bg-[#1E1711] transition-all shadow-md group"
              >
                <BookOpen className="w-4 h-4 text-[#CBB38E]" />
                <span>Open Recipe Book</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setViewMode('index')}
                className="cursor-pointer px-5 py-3 border border-[#C5B7A0] text-[#3D3126] font-serif text-sm font-medium rounded hover:bg-[#EDE6D8] transition-colors"
              >
                Browse Recipe Index
              </button>
            </div>
          </div>
        </motion.div>

        {/* Popular Heritage Highlights Row */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-5 border-b border-[#DDD2BF] pb-2">
            <h2 className="font-serif text-2xl font-bold text-[#2B231C]">
              Featured Table Secrets
            </h2>
            <button
              onClick={() => setViewMode('index')}
              className="text-xs font-semibold uppercase tracking-wider text-[#8C5A2B] hover:text-[#6C421B] transition-colors"
            >
              View Full Archive ({totalRecipes}) →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recipes.slice(0, 4).map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => {
                  setActiveRecipeId(recipe.id);
                  setViewMode('recipe');
                }}
                className="group cursor-pointer bg-[#FCFAF5] p-3 rounded-lg border border-[#E0D5C3] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="aspect-[4/3] rounded overflow-hidden bg-stone-100 mb-2.5 relative">
                  {recipe.heroImage ? (
                    <img
                      src={recipe.heroImage}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#EFE9DC] text-stone-400">
                      <Utensils className="w-8 h-8 opacity-40" />
                    </div>
                  )}
                  <span className="absolute bottom-2 left-2 bg-[#FAF7F0]/90 backdrop-blur-xs text-[10px] font-serif italic text-stone-700 px-2 py-0.5 rounded shadow-xs">
                    {recipe.category}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#29221B] group-hover:text-[#8C232C] transition-colors line-clamp-1">
                  {recipe.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                  {recipe.subtitle}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono mt-2 pt-2 border-t border-stone-200">
                  <span>{recipe.prepTime + recipe.cookTime} min</span>
                  <span>·</span>
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
