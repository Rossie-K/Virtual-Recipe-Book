import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recipe, RecipeCategory, GroceryItem } from '../types/recipe';
import { INITIAL_RECIPES } from '../data/initialRecipes';
import { setAudioMuted, playPageFlipSound, playStampSound } from '../utils/audio';

interface RecipeContextType {
  recipes: Recipe[];
  activeRecipe: Recipe | null;
  activeRecipeId: string | null;
  setActiveRecipeId: (id: string | null) => void;
  viewMode: 'cover' | 'recipe' | 'index' | 'cooking' | 'shopping' | 'editor';
  setViewMode: (mode: 'cover' | 'recipe' | 'index' | 'cooking' | 'shopping' | 'editor') => void;
  targetServings: number;
  setTargetServings: (servings: number) => void;
  metricMode: boolean;
  setMetricMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean | ((prev: boolean) => boolean)) => void;
  groceryItems: GroceryItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  
  // Actions
  addRecipe: (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateRecipe: (updatedRecipe: Recipe) => void;
  deleteRecipe: (id: string) => void;
  toggleFavorite: (id: string) => void;
  resetToDefaults: () => void;
  addRecipeToGrocery: (recipe: Recipe, servings: number) => void;
  addGroceryItem: (item: Omit<GroceryItem, 'id' | 'isPurchased'>) => void;
  toggleGroceryItem: (id: string) => void;
  removeGroceryItem: (id: string) => void;
  clearPurchasedGrocery: () => void;
  clearAllGrocery: () => void;
  editingRecipe: Recipe | null;
  setEditingRecipe: (recipe: Recipe | null) => void;
  goToNextRecipe: () => void;
  goToPrevRecipe: () => void;
}

const STORAGE_RECIPES_KEY = 'grand_heirloom_recipes_v1';
const STORAGE_GROCERY_KEY = 'grand_heirloom_grocery_v1';
const STORAGE_SOUND_KEY = 'grand_heirloom_sound_v1';

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    if (typeof window === 'undefined') return INITIAL_RECIPES;
    try {
      const stored = localStorage.getItem(STORAGE_RECIPES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load stored recipes, using defaults', e);
    }
    return INITIAL_RECIPES;
  });

  const [activeRecipeId, setActiveRecipeIdState] = useState<string | null>(recipes[0]?.id || null);
  const [viewMode, setViewModeState] = useState<'cover' | 'recipe' | 'index' | 'cooking' | 'shopping' | 'editor'>('recipe');
  const [metricMode, setMetricMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const stored = localStorage.getItem(STORAGE_SOUND_KEY);
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_GROCERY_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const activeRecipe = recipes.find(r => r.id === activeRecipeId) || recipes[0] || null;
  const [targetServings, setTargetServings] = useState<number>(activeRecipe ? activeRecipe.servings : 4);

  // Sync serving size when active recipe changes
  useEffect(() => {
    if (activeRecipe) {
      setTargetServings(activeRecipe.servings);
    }
  }, [activeRecipeId]);

  // Persist recipes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_RECIPES_KEY, JSON.stringify(recipes));
    } catch (e) {
      console.error('Failed to save recipes to localStorage', e);
    }
  }, [recipes]);

  // Persist grocery items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_GROCERY_KEY, JSON.stringify(groceryItems));
    } catch (e) {
      console.error('Failed to save grocery items to localStorage', e);
    }
  }, [groceryItems]);

  // Set sound enabled
  const setSoundEnabled = (val: boolean | ((prev: boolean) => boolean)) => {
    setSoundEnabledState(prev => {
      const next = typeof val === 'function' ? val(prev) : val;
      setAudioMuted(!next);
      localStorage.setItem(STORAGE_SOUND_KEY, JSON.stringify(next));
      return next;
    });
  };

  const setViewMode = (mode: 'cover' | 'recipe' | 'index' | 'cooking' | 'shopping' | 'editor') => {
    if (soundEnabled) playPageFlipSound();
    setViewModeState(mode);
  };

  const setActiveRecipeId = (id: string | null) => {
    if (soundEnabled) playPageFlipSound();
    setActiveRecipeIdState(id);
    if (id && viewMode === 'cover') {
      setViewModeState('recipe');
    }
  };

  const addRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): string => {
    const id = `recipe-${Date.now()}`;
    const newRecipe: Recipe = {
      ...recipeData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isCustom: true
    };
    setRecipes(prev => [newRecipe, ...prev]);
    setActiveRecipeIdState(id);
    setViewModeState('recipe');
    if (soundEnabled) playStampSound();
    return id;
  };

  const updateRecipe = (updatedRecipe: Recipe) => {
    const withTimestamp = {
      ...updatedRecipe,
      updatedAt: new Date().toISOString()
    };
    setRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? withTimestamp : r));
    if (activeRecipeId === updatedRecipe.id) {
      setTargetServings(updatedRecipe.servings);
    }
    if (soundEnabled) playStampSound();
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => {
      const filtered = prev.filter(r => r.id !== id);
      if (activeRecipeId === id) {
        setActiveRecipeIdState(filtered[0]?.id || null);
      }
      return filtered;
    });
  };

  const toggleFavorite = (id: string) => {
    if (soundEnabled) playStampSound();
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  };

  const resetToDefaults = () => {
    if (confirm('Reset your recipe book to the original heirloom collection? (Any custom recipes will be replaced)')) {
      setRecipes(INITIAL_RECIPES);
      setActiveRecipeIdState(INITIAL_RECIPES[0].id);
      localStorage.removeItem(STORAGE_RECIPES_KEY);
    }
  };

  const addRecipeToGrocery = (recipe: Recipe, currentServings: number) => {
    if (soundEnabled) playStampSound();
    const ratio = recipe.servings > 0 ? currentServings / recipe.servings : 1;
    
    const newItems: GroceryItem[] = recipe.ingredients.map(ing => {
      // Determine category
      const n = ing.name.toLowerCase();
      let cat: GroceryItem['category'] = 'Pantry & Grains';
      if (n.includes('onion') || n.includes('garlic') || n.includes('carrot') || n.includes('shallot') || n.includes('blackberry') || n.includes('lemon') || n.includes('orange') || n.includes('thyme') || n.includes('rosemary') || n.includes('apple') || n.includes('herb')) {
        cat = 'Produce';
      } else if (n.includes('butter') || n.includes('milk') || n.includes('cream') || n.includes('egg') || n.includes('cheese') || n.includes('gruyère')) {
        cat = 'Dairy & Eggs';
      } else if (n.includes('chicken') || n.includes('beef') || n.includes('meat') || n.includes('pork')) {
        cat = 'Meats & Seafood';
      } else if (n.includes('cinnamon') || n.includes('nutmeg') || n.includes('clove') || n.includes('sugar') || n.includes('flour') || n.includes('vanilla') || n.includes('yeast') || n.includes('cocoa') || n.includes('starch') || n.includes('salt') || n.includes('pepper')) {
        cat = 'Spices & Baking';
      }

      return {
        id: `groc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        ingredientName: ing.name,
        amount: Math.round(ing.amount * ratio * 100) / 100,
        unit: ing.unit,
        isPurchased: false,
        category: cat
      };
    });

    setGroceryItems(prev => [...newItems, ...prev]);
  };

  const addGroceryItem = (itemData: Omit<GroceryItem, 'id' | 'isPurchased'>) => {
    if (soundEnabled) playStampSound();
    const newItem: GroceryItem = {
      ...itemData,
      id: `manual-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      isPurchased: false,
    };
    setGroceryItems(prev => [newItem, ...prev]);
  };

  const toggleGroceryItem = (id: string) => {
    if (soundEnabled) playStampSound();
    setGroceryItems(prev => prev.map(item => item.id === id ? { ...item, isPurchased: !item.isPurchased } : item));
  };

  const removeGroceryItem = (id: string) => {
    setGroceryItems(prev => prev.filter(item => item.id !== id));
  };

  const clearPurchasedGrocery = () => {
    setGroceryItems(prev => prev.filter(item => !item.isPurchased));
  };

  const clearAllGrocery = () => {
    setGroceryItems([]);
  };

  const currentIndex = recipes.findIndex(r => r.id === activeRecipeId);

  const goToNextRecipe = () => {
    if (recipes.length === 0) return;
    const nextIdx = (currentIndex + 1) % recipes.length;
    setActiveRecipeId(recipes[nextIdx].id);
  };

  const goToPrevRecipe = () => {
    if (recipes.length === 0) return;
    const prevIdx = (currentIndex - 1 + recipes.length) % recipes.length;
    setActiveRecipeId(recipes[prevIdx].id);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        activeRecipe,
        activeRecipeId,
        setActiveRecipeId,
        viewMode,
        setViewMode,
        targetServings,
        setTargetServings,
        metricMode,
        setMetricMode,
        soundEnabled,
        setSoundEnabled,
        groceryItems,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedTag,
        setSelectedTag,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        toggleFavorite,
        resetToDefaults,
        addRecipeToGrocery,
        addGroceryItem,
        toggleGroceryItem,
        removeGroceryItem,
        clearPurchasedGrocery,
        clearAllGrocery,
        editingRecipe,
        setEditingRecipe,
        goToNextRecipe,
        goToPrevRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};
