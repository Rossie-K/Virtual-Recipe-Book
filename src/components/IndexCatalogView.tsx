import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import { RecipeCategory } from '../types/recipe';
import {
  Search,
  Bookmark,
  Clock,
  Users,
  Flame,
  Award,
  BookOpen,
  Filter,
  Plus,
  RotateCcw
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Baking & Pastry',
  'Hearty Mains',
  'Soups & Stews',
  'Cottage Sweets',
  'Heirloom Breads',
  'Warm Drinks'
];

export const IndexCatalogView: React.FC = () => {
  const {
    recipes,
    setActiveRecipeId,
    setViewMode,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    toggleFavorite,
    setEditingRecipe,
    resetToDefaults
  } = useRecipes();

  const [activeFilter, setActiveFilter] = React.useState<'all' | 'favorites' | 'quick'>('all');

  // Filter logic
  const filteredRecipes = recipes.filter(recipe => {
    // Category check
    if (selectedCategory !== 'All' && recipe.category !== selectedCategory) {
      return false;
    }

    // Active subfilter
    if (activeFilter === 'favorites' && !recipe.isFavorite) {
      return false;
    }
    if (activeFilter === 'quick' && (recipe.prepTime + recipe.cookTime) > 45) {
      return false;
    }

    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = recipe.title.toLowerCase().includes(q);
      const inSubtitle = recipe.subtitle.toLowerCase().includes(q);
      const inDesc = recipe.description.toLowerCase().includes(q);
      const inTags = recipe.tags.some(t => t.toLowerCase().includes(q));
      const inIngredients = recipe.ingredients.some(i => i.name.toLowerCase().includes(q));
      return inTitle || inSubtitle || inDesc || inTags || inIngredients;
    }

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title & Index Header */}
      <div className="border-b border-[#E0D5C3] pb-5 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#8C5A2B] font-semibold">
            Table of Contents
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2118] tracking-tight mt-1">
            The Recipe Archive
          </h1>
          <p className="font-serif italic text-sm text-stone-600 mt-1">
            Displaying {filteredRecipes.length} of {recipes.length} treasured dishes
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by ingredient, dish, or era..."
            className="w-full pl-9 pr-4 py-2 bg-[#FCFAF5] border border-[#D5C7B2] rounded-lg font-serif text-sm text-[#2A2118] placeholder:text-stone-400 focus:border-[#8C5A2B] focus:outline-none shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400 hover:text-stone-700"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs & Quick Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        {/* Category Filter Pills (Functional Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer px-3 py-1.5 rounded text-xs font-serif whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#2A2118] text-[#FAF7F0] font-semibold shadow-xs'
                  : 'bg-[#ECE4D4] text-[#55473A] hover:bg-[#E0D5C0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Subfilters */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#ECE4D4] p-0.5 rounded border border-[#DDD0BC]">
            <button
              onClick={() => setActiveFilter('all')}
              className={`cursor-pointer px-2.5 py-1 text-xs font-serif rounded transition-colors ${
                activeFilter === 'all' ? 'bg-white text-[#2A2118] font-semibold shadow-2xs' : 'text-stone-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('favorites')}
              className={`cursor-pointer px-2.5 py-1 text-xs font-serif rounded transition-colors ${
                activeFilter === 'favorites' ? 'bg-white text-[#8C232C] font-semibold shadow-2xs' : 'text-stone-600'
              }`}
            >
              ★ Bookmarked
            </button>
            <button
              onClick={() => setActiveFilter('quick')}
              className={`cursor-pointer px-2.5 py-1 text-xs font-serif rounded transition-colors ${
                activeFilter === 'quick' ? 'bg-white text-[#2A2118] font-semibold shadow-2xs' : 'text-stone-600'
              }`}
            >
              ⚡ Under 45m
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Cards Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="py-16 text-center bg-[#FCFAF5] rounded-xl border border-[#E0D5C3] p-8">
          <BookOpen className="w-12 h-12 mx-auto text-stone-300 mb-3" />
          <h3 className="font-serif text-xl font-bold text-stone-700">No heirloom recipes match your search</h3>
          <p className="font-serif italic text-stone-500 text-sm mt-1">
            Try searching for a different ingredient or clear your active filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setActiveFilter('all');
            }}
            className="mt-4 px-4 py-2 bg-[#2A2118] text-white rounded text-xs font-serif cursor-pointer hover:bg-black transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="group bg-[#FCFAF5] rounded-xl border border-[#E0D5C3] shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Card Thumbnail */}
                <div
                  onClick={() => {
                    setActiveRecipeId(recipe.id);
                    setViewMode('recipe');
                  }}
                  className="aspect-[16/10] bg-[#EFE9DC] relative cursor-pointer overflow-hidden"
                >
                  {recipe.heroImage ? (
                    <img
                      src={recipe.heroImage}
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                      <BookOpen className="w-10 h-10" />
                    </div>
                  )}

                  {/* Stamp */}
                  {recipe.vintageStamp && (
                    <span className="absolute top-2.5 left-2.5 bg-[#FAF7F0]/95 backdrop-blur-xs text-[#8C232C] text-[10px] font-serif uppercase tracking-widest px-2 py-0.5 rounded shadow-xs font-semibold border border-[#E8DEC9]">
                      {recipe.vintageStamp}
                    </span>
                  )}

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                    className="absolute top-2.5 right-2.5 p-1.5 bg-[#FAF7F0]/90 backdrop-blur-xs rounded-full text-stone-600 hover:text-[#8C232C] shadow-xs cursor-pointer transition-colors"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${recipe.isFavorite ? 'fill-[#8C232C] text-[#8C232C]' : ''}`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div
                  onClick={() => {
                    setActiveRecipeId(recipe.id);
                    setViewMode('recipe');
                  }}
                  className="p-5 cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs font-serif text-stone-500 mb-1">
                    <span className="text-[#8C5A2B] font-semibold">{recipe.category}</span>
                    <span>{recipe.originYear}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#2A2118] group-hover:text-[#8C232C] transition-colors leading-snug">
                    {recipe.title}
                  </h3>

                  <p className="font-serif italic text-xs text-[#735A43] mt-1 line-clamp-1">
                    {recipe.subtitle}
                  </p>

                  <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
              </div>

              {/* Bottom Meta & Quick Action */}
              <div className="px-5 py-3 border-t border-[#EDE4D2] bg-[#F7F2E8] flex items-center justify-between text-xs font-serif">
                <div className="flex items-center gap-3 text-stone-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#8C5A2B]" />
                    <span>{recipe.prepTime + recipe.cookTime}m</span>
                  </span>
                  <span>·</span>
                  <span>{recipe.difficulty}</span>
                </div>

                <button
                  onClick={() => {
                    setActiveRecipeId(recipe.id);
                    setViewMode('recipe');
                  }}
                  className="text-xs font-semibold text-[#8C5A2B] group-hover:text-[#6C421B] flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Open Page</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Utility */}
      <div className="mt-12 pt-6 border-t border-[#E0D5C3] flex items-center justify-between text-xs font-serif text-stone-500">
        <span>The Grand Heirloom Virtual Culinary Collection</span>
        <button
          onClick={resetToDefaults}
          className="text-stone-500 hover:text-red-700 underline cursor-pointer"
        >
          Reset to default recipes
        </button>
      </div>
    </div>
  );
};
