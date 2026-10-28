import React, { useState } from 'react';
import { useRecipes } from '../context/RecipeContext';
import { Recipe, RecipeCategory, Ingredient, InstructionStep } from '../types/recipe';
import {
  X,
  Plus,
  Trash2,
  Save,
  Image as ImageIcon,
  Clock,
  Users,
  Award,
  Sparkles,
  RotateCcw
} from 'lucide-react';

const CATEGORIES: RecipeCategory[] = [
  'Baking & Pastry',
  'Hearty Mains',
  'Soups & Stews',
  'Cottage Sweets',
  'Heirloom Breads',
  'Warm Drinks',
];

const VINTAGE_STAMPS = [
  'Heirloom Gold',
  'Family Secret',
  'Tried & Beloved',
  'Master Baker',
  'Comfort Food',
  'Cozy Favorite',
  'Holiday Feast'
];

const PRESET_VINTAGE_IMAGES = [
  { label: 'Artisan Sourdough', path: '/src/assets/images/vintage_sourdough_bread_1793188739686.jpg' },
  { label: 'Blackberry Lattice Pie', path: '/src/assets/images/vintage_berry_pie_1793188740795.jpg' },
  { label: 'Herb Roast Chicken', path: '/src/assets/images/vintage_roasted_chicken_1793188742085.jpg' },
  { label: 'Chocolate Olive Oil Torte', path: '/src/assets/images/vintage_chocolate_cake_1793188740779.jpg' }
];

export const RecipeEditorModal: React.FC = () => {
  const {
    editingRecipe,
    setEditingRecipe,
    setViewMode,
    addRecipe,
    updateRecipe,
    setActiveRecipeId,
  } = useRecipes();

  const isEditing = Boolean(editingRecipe);

  // Form State
  const [title, setTitle] = useState(editingRecipe?.title || '');
  const [subtitle, setSubtitle] = useState(editingRecipe?.subtitle || '');
  const [category, setCategory] = useState<RecipeCategory>(editingRecipe?.category || 'Baking & Pastry');
  const [description, setDescription] = useState(editingRecipe?.description || '');
  const [originYear, setOriginYear] = useState(editingRecipe?.originYear || 'Grandmother’s Notebook, 1952');
  const [prepTime, setPrepTime] = useState(editingRecipe?.prepTime || 20);
  const [cookTime, setCookTime] = useState(editingRecipe?.cookTime || 40);
  const [servings, setServings] = useState(editingRecipe?.servings || 4);
  const [difficulty, setDifficulty] = useState<Recipe['difficulty']>(editingRecipe?.difficulty || 'Moderate');
  const [vintageStamp, setVintageStamp] = useState(editingRecipe?.vintageStamp || 'Family Secret');
  const [chefNotes, setChefNotes] = useState(editingRecipe?.chefNotes || '');
  const [heroImage, setHeroImage] = useState(editingRecipe?.heroImage || PRESET_VINTAGE_IMAGES[0].path);
  const [tagsInput, setTagsInput] = useState(editingRecipe?.tags.join(', ') || 'Baking, Comfort Food');

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    editingRecipe?.ingredients || [
      { id: 'ing-1', name: 'Unbleached flour', amount: 2, unit: 'cups', notes: 'sifted' },
      { id: 'ing-2', name: 'European butter', amount: 0.5, unit: 'cup', notes: 'cold, diced' },
      { id: 'ing-3', name: 'Pure vanilla extract', amount: 1, unit: 'tsp', notes: '' }
    ]
  );

  const [instructions, setInstructions] = useState<InstructionStep[]>(
    editingRecipe?.instructions || [
      { id: 'step-1', stepNumber: 1, text: 'Whisk dry ingredients in a vintage stoneware bowl.', tip: 'Ensure all ingredients are room temperature.', durationMinutes: 5 },
      { id: 'step-2', stepNumber: 2, text: 'Cut in cold butter until coarse crumbles form.', tip: '', durationMinutes: 10 }
    ]
  );

  const [errors, setErrors] = useState<string[]>([]);

  // Ingredient helpers
  const handleAddIngredient = () => {
    setIngredients(prev => [
      ...prev,
      { id: `ing-${Date.now()}`, name: '', amount: 1, unit: 'cup', notes: '' }
    ]);
  };

  const handleUpdateIngredient = (idx: number, field: keyof Ingredient, value: any) => {
    setIngredients(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const handleRemoveIngredient = (idx: number) => {
    if (ingredients.length > 1) {
      setIngredients(prev => prev.filter((_, i) => i !== idx));
    }
  };

  // Step helpers
  const handleAddStep = () => {
    setInstructions(prev => [
      ...prev,
      {
        id: `step-${Date.now()}`,
        stepNumber: prev.length + 1,
        text: '',
        tip: '',
        durationMinutes: 10
      }
    ]);
  };

  const handleUpdateStep = (idx: number, field: keyof InstructionStep, value: any) => {
    setInstructions(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const handleRemoveStep = (idx: number) => {
    if (instructions.length > 1) {
      setInstructions(prev =>
        prev
          .filter((_, i) => i !== idx)
          .map((s, i) => ({ ...s, stepNumber: i + 1 }))
      );
    }
  };

  // Custom Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setHeroImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!title.trim()) errs.push('Please enter a recipe title.');
    if (ingredients.some(i => !i.name.trim())) errs.push('All ingredients must have a name.');
    if (instructions.some(s => !s.text.trim())) errs.push('All preparation steps must have text.');

    if (errs.length > 0) {
      setErrors(errs);
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (isEditing && editingRecipe) {
      updateRecipe({
        ...editingRecipe,
        title,
        subtitle,
        category,
        description,
        originYear,
        prepTime: Number(prepTime) || 15,
        cookTime: Number(cookTime) || 30,
        servings: Number(servings) || 4,
        difficulty,
        vintageStamp,
        chefNotes,
        heroImage,
        tags,
        ingredients,
        instructions
      });
      setActiveRecipeId(editingRecipe.id);
    } else {
      const newId = addRecipe({
        title,
        subtitle,
        category,
        description,
        originYear,
        prepTime: Number(prepTime) || 15,
        cookTime: Number(cookTime) || 30,
        servings: Number(servings) || 4,
        difficulty,
        vintageStamp,
        chefNotes,
        heroImage,
        tags,
        ingredients,
        instructions,
        isFavorite: false
      });
      setActiveRecipeId(newId);
    }

    setEditingRecipe(null);
    setViewMode('recipe');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#241C15]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF7F0] border-2 border-[#D8C9B3] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#EDE5D5] border-b border-[#D8C9B3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-[#2A2118]">
              {editingRecipe ? `Modify Recipe: ${editingRecipe.title}` : 'Handwrite New Heirloom Recipe'}
            </span>
          </div>

          <button
            onClick={() => {
              setEditingRecipe(null);
              setViewMode('recipe');
            }}
            className="p-1.5 text-stone-600 hover:text-stone-900 rounded-md hover:bg-[#DDD3C0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {errors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
              <ul className="list-disc pl-4 space-y-1">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold mb-1">
                Recipe Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Cardamom Honey Braided Bread"
                className="w-full px-3.5 py-2 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-serif text-lg text-[#2A2118] focus:border-[#8C5A2B] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold mb-1">
                Subtitle & Heritage Source
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                placeholder="e.g. From Great Aunt Martha's Journal · Autumn 1952"
                className="w-full px-3 py-1.5 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-serif text-sm text-[#2A2118] focus:border-[#8C5A2B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold mb-1">
                Origin / Era
              </label>
              <input
                type="text"
                value={originYear}
                onChange={e => setOriginYear(e.target.value)}
                placeholder="e.g. Farmhouse Hearth, 1934"
                className="w-full px-3 py-1.5 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-serif text-sm text-[#2A2118] focus:border-[#8C5A2B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as RecipeCategory)}
                className="w-full px-3 py-2 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-serif text-sm text-[#2A2118] focus:border-[#8C5A2B] focus:outline-none cursor-pointer"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold mb-1">
                Vintage Stamp
              </label>
              <select
                value={vintageStamp}
                onChange={e => setVintageStamp(e.target.value)}
                className="w-full px-3 py-2 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-serif text-sm text-[#2A2118] focus:border-[#8C5A2B] focus:outline-none cursor-pointer"
              >
                {VINTAGE_STAMPS.map(stamp => (
                  <option key={stamp} value={stamp}>{stamp}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold mb-1">
                Description & Flavor Narrative
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={2}
                placeholder="Describe the aroma, texture, and hearthside appeal of this dish..."
                className="w-full px-3 py-2 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-serif text-sm text-[#2A2118] focus:border-[#8C5A2B] focus:outline-none"
              />
            </div>

            {/* Timings & Servings */}
            <div>
              <label className="block text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold mb-1">
                Prep Time (minutes)
              </label>
              <input
                type="number"
                min="1"
                value={prepTime}
                onChange={e => setPrepTime(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-mono text-sm text-[#2A2118]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold mb-1">
                Cook Time (minutes)
              </label>
              <input
                type="number"
                min="0"
                value={cookTime}
                onChange={e => setCookTime(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-mono text-sm text-[#2A2118]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold mb-1">
                Standard Servings
              </label>
              <input
                type="number"
                min="1"
                value={servings}
                onChange={e => setServings(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-mono text-sm text-[#2A2118]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold mb-1">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as Recipe['difficulty'])}
                className="w-full px-3 py-2 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-serif text-sm text-[#2A2118]"
              >
                <option value="Simple">Simple</option>
                <option value="Moderate">Moderate</option>
                <option value="Artisan">Artisan</option>
              </select>
            </div>
          </div>

          {/* Photo Selection */}
          <div className="border-t border-[#E6DBCA] pt-4">
            <label className="block text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold mb-2">
              Recipe Photograph / Illustration
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              {PRESET_VINTAGE_IMAGES.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setHeroImage(img.path)}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all p-1 bg-white ${
                    heroImage === img.path ? 'border-[#8C5A2B] ring-2 ring-[#8C5A2B]/20' : 'border-[#E0D5C3] opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-[4/3] rounded overflow-hidden">
                    <img src={img.path} alt={img.label} className="w-full h-full object-cover" />
                  </div>
                  <span className="block text-[10px] text-center font-serif text-stone-700 mt-1 truncate">
                    {img.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-500 font-serif">Or upload own image:</span>
              <label className="cursor-pointer px-3 py-1 bg-[#ECE4D4] hover:bg-[#DDD2BE] text-stone-800 text-xs rounded border border-[#D5C7B2] font-serif">
                Browse File...
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Ingredients Builder */}
          <div className="border-t border-[#E6DBCA] pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold">
                Ingredients & Measurements
              </label>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="cursor-pointer inline-flex items-center gap-1 text-xs font-serif text-[#8C5A2B] hover:text-[#6C421B] font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Ingredient</span>
              </button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={ing.id} className="flex items-center gap-2">
                  <input
                    type="number"
                    step="any"
                    value={ing.amount}
                    onChange={e => handleUpdateIngredient(idx, 'amount', Number(e.target.value))}
                    placeholder="Qty"
                    className="w-20 px-2.5 py-1.5 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-mono text-xs"
                    title="Amount"
                  />
                  <input
                    type="text"
                    value={ing.unit}
                    onChange={e => handleUpdateIngredient(idx, 'unit', e.target.value)}
                    placeholder="cups/tbsp/g"
                    className="w-24 px-2 py-1.5 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-mono text-xs"
                    title="Unit"
                  />
                  <input
                    type="text"
                    value={ing.name}
                    onChange={e => handleUpdateIngredient(idx, 'name', e.target.value)}
                    placeholder="Ingredient Name (e.g. Vanilla Bean)"
                    className="flex-1 px-3 py-1.5 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-serif text-sm"
                    required
                  />
                  <input
                    type="text"
                    value={ing.notes || ''}
                    onChange={e => handleUpdateIngredient(idx, 'notes', e.target.value)}
                    placeholder="Notes (e.g. finely chopped)"
                    className="hidden sm:block w-36 px-2.5 py-1.5 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-serif italic text-xs text-stone-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(idx)}
                    className="p-1.5 text-stone-400 hover:text-red-700 transition-colors cursor-pointer"
                    title="Remove ingredient"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Instructions Builder */}
          <div className="border-t border-[#E6DBCA] pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold">
                Preparation Steps
              </label>
              <button
                type="button"
                onClick={handleAddStep}
                className="cursor-pointer inline-flex items-center gap-1 text-xs font-serif text-[#8C5A2B] hover:text-[#6C421B] font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-3">
              {instructions.map((step, idx) => (
                <div key={step.id} className="p-3 bg-[#FCFAF5] border border-[#D5C7B2] rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs text-[#8C5A2B]">
                      Step {idx + 1}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] font-mono text-stone-500">Duration:</span>
                        <input
                          type="number"
                          min="1"
                          value={step.durationMinutes || 10}
                          onChange={e => handleUpdateStep(idx, 'durationMinutes', Number(e.target.value))}
                          className="w-14 px-1.5 py-0.5 border border-[#D5C7B2] rounded text-xs font-mono text-center"
                        />
                        <span className="text-[11px] font-mono text-stone-500">min</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(idx)}
                        className="text-stone-400 hover:text-red-700 cursor-pointer"
                        title="Delete step"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    value={step.text}
                    onChange={e => handleUpdateStep(idx, 'text', e.target.value)}
                    placeholder="Instructions for this step..."
                    className="w-full px-3 py-1.5 bg-white border border-[#D5C7B2] rounded font-serif text-sm text-[#2A2118]"
                    required
                  />

                  <input
                    type="text"
                    value={step.tip || ''}
                    onChange={e => handleUpdateStep(idx, 'tip', e.target.value)}
                    placeholder="Optional heirloom tip / grandmother advice..."
                    className="w-full px-3 py-1 bg-white border border-[#E0D5C3] rounded font-serif italic text-xs text-[#735A43]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Nana's Secret Marginalia & Tags */}
          <div className="border-t border-[#E6DBCA] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold mb-1">
                Chef's Secret / Marginalia Notes
              </label>
              <textarea
                value={chefNotes}
                onChange={e => setChefNotes(e.target.value)}
                rows={2}
                placeholder="Special advice handed down through the family..."
                className="w-full px-3 py-1.5 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-serif italic text-sm text-[#2A2118]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-serif tracking-wider text-stone-600 font-semibold mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="e.g. Baking, Winter, Family Tradition"
                className="w-full px-3 py-1.5 bg-[#FCFAF5] border border-[#D5C7B2] rounded font-serif text-sm text-[#2A2118]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#D8C9B3] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setEditingRecipe(null);
                setViewMode('recipe');
              }}
              className="px-4 py-2 border border-[#C5B7A0] text-stone-700 font-serif text-sm rounded hover:bg-[#EDE5D5] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#6E262E] hover:bg-[#581F25] text-white font-serif font-semibold text-sm rounded shadow-sm cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Save Modifications' : 'Add to Recipe Book'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
