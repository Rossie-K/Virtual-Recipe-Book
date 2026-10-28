export type RecipeCategory =
  | 'Baking & Pastry'
  | 'Hearty Mains'
  | 'Soups & Stews'
  | 'Cottage Sweets'
  | 'Heirloom Breads'
  | 'Warm Drinks';

export interface Ingredient {
  id: string;
  name: string;
  amount: number; // decimal amount for 1 standard serving batch
  unit: string;   // e.g. 'cups', 'tbsp', 'tsp', 'g', 'oz', 'whole', 'cloves', 'pinch'
  notes?: string; // e.g. "room temperature", "coarsely chopped", "freshly grated"
}

export interface InstructionStep {
  id: string;
  stepNumber: number;
  text: string;
  tip?: string;
  durationMinutes?: number;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: RecipeCategory;
  description: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number; // base servings count
  difficulty: 'Simple' | 'Moderate' | 'Artisan';
  originYear: string; // e.g., "Circa 1928", "Autumn 1954", "Grandmother's Journal"
  heroImage: string;
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  chefNotes: string;
  vintageStamp: string; // e.g. "Heirloom Gold", "Tried & Beloved", "Master Baker's Pick", "Family Secret"
  isFavorite: boolean;
  tags: string[];
  isCustom?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GroceryItem {
  id: string;
  recipeId: string;
  recipeTitle: string;
  ingredientName: string;
  amount: number;
  unit: string;
  isPurchased: boolean;
  category: 'Produce' | 'Dairy & Eggs' | 'Pantry & Grains' | 'Spices & Baking' | 'Meats & Seafood' | 'Other';
}
