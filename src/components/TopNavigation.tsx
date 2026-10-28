import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import { BookOpen, ShoppingBag, Volume2, VolumeX, Plus, Bookmark } from 'lucide-react';

export const TopNavigation: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    soundEnabled,
    setSoundEnabled,
    groceryItems,
    recipes,
    setEditingRecipe,
  } = useRecipes();

  const favoritesCount = recipes.filter(r => r.isFavorite).length;
  const unpurchasedGroceryCount = groceryItems.filter(i => !i.isPurchased).length;

  const handleCreateNew = () => {
    setEditingRecipe(null);
    setViewMode('editor');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-sm border-b border-[#E7DFD0] px-6 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setViewMode('recipe')}
          className="text-left group cursor-pointer"
        >
          <span className="font-serif text-2xl font-bold tracking-tight text-[#2B231C] group-hover:text-[#6E262E] transition-colors whitespace-nowrap shrink-0">
            The Grand Heirloom
          </span>
        </button>

        {/* Zone 2: 4-5 single-line clean text links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C4E42]">
          <button
            onClick={() => setViewMode('recipe')}
            className={`cursor-pointer whitespace-nowrap transition-colors hover:text-[#2B231C] relative py-1 ${
              viewMode === 'recipe' || viewMode === 'cover'
                ? 'text-[#2B231C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#8C5A2B]'
                : ''
            }`}
          >
            Cookbook
          </button>

          <button
            onClick={() => setViewMode('index')}
            className={`cursor-pointer whitespace-nowrap transition-colors hover:text-[#2B231C] relative py-1 ${
              viewMode === 'index'
                ? 'text-[#2B231C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#8C5A2B]'
                : ''
            }`}
          >
            Recipe Index
          </button>

          <button
            onClick={() => setViewMode('shopping')}
            className={`cursor-pointer whitespace-nowrap transition-colors hover:text-[#2B231C] relative py-1 flex items-center gap-1.5 ${
              viewMode === 'shopping'
                ? 'text-[#2B231C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#8C5A2B]'
                : ''
            }`}
          >
            <span>Pantry & Groceries</span>
            {unpurchasedGroceryCount > 0 && (
              <span className="text-xs bg-[#EAE2D2] text-[#553E2A] px-1.5 py-0.2 rounded font-mono font-medium">
                {unpurchasedGroceryCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setSoundEnabled(prev => !prev)}
            aria-label={soundEnabled ? 'Mute page sounds' : 'Enable page sounds'}
            className="cursor-pointer text-[#6B5C50] hover:text-[#2B231C] flex items-center gap-1.5 py-1 whitespace-nowrap transition-colors"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-[#8C5A2B]" />
                <span className="text-xs">Chimes On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-stone-400" />
                <span className="text-xs text-stone-400">Chimes Muted</span>
              </>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleCreateNew}
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-white bg-[#6E262E] hover:bg-[#581F25] active:scale-98 transition-all rounded shadow-sm whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write New Recipe</span>
          </button>
        </div>
      </div>
    </header>
  );
};
