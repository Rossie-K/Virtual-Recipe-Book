import React from 'react';
import { RecipeProvider, useRecipes } from './context/RecipeContext';
import { TopNavigation } from './components/TopNavigation';
import { BookCoverView } from './components/BookCoverView';
import { RecipePageView } from './components/RecipePageView';
import { IndexCatalogView } from './components/IndexCatalogView';
import { GroceryShoppingView } from './components/GroceryShoppingView';
import { CookingModeModal } from './components/CookingModeModal';
import { RecipeEditorModal } from './components/RecipeEditorModal';
import { VintageConversionRuler } from './components/VintageConversionRuler';
import { Heart, Sparkles, BookOpen } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { viewMode } = useRecipes();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EE] text-[#2C241D] selection:bg-[#E8D8C3]">
      {/* Top Bar Navigation */}
      <TopNavigation />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {viewMode === 'cover' && <BookCoverView />}
        {viewMode === 'recipe' && <RecipePageView />}
        {viewMode === 'index' && <IndexCatalogView />}
        {viewMode === 'shopping' && <GroceryShoppingView />}

        {/* Interactive Modals */}
        {viewMode === 'cooking' && <CookingModeModal />}
        {viewMode === 'editor' && <RecipeEditorModal />}
      </main>

      {/* Slide-out Kitchen Measurement Conversion Ruler */}
      <VintageConversionRuler />

      {/* Tasteful Archival Footer */}
      <footer className="border-t border-[#E3D8C4] bg-[#F2ECE0] py-8 px-6 text-center text-xs font-serif text-[#665747]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#8C5A2B]" />
            <span className="font-semibold text-[#2E241A]">
              The Grand Heirloom Virtual Culinary Collection
            </span>
          </div>

          <p className="italic text-stone-500">
            Handcrafted with love for slow cooking, warm ovens & cozy memories.
          </p>

          <span className="text-[11px] font-mono text-stone-400">
            Est. 1878 · Folio Edition
          </span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <RecipeProvider>
      <MainAppContent />
    </RecipeProvider>
  );
}
