import React, { useState } from 'react';
import { useRecipes } from '../context/RecipeContext';
import {
  ShoppingCart,
  Check,
  Trash2,
  Copy,
  Plus,
  BookOpen,
  Sparkles,
  Printer
} from 'lucide-react';
import { GroceryItem } from '../types/recipe';

const GROCERY_CATEGORIES: GroceryItem['category'][] = [
  'Produce',
  'Dairy & Eggs',
  'Pantry & Grains',
  'Spices & Baking',
  'Meats & Seafood',
  'Other'
];

export const GroceryShoppingView: React.FC = () => {
  const {
    groceryItems,
    addGroceryItem,
    toggleGroceryItem,
    removeGroceryItem,
    clearPurchasedGrocery,
    clearAllGrocery,
    setViewMode,
  } = useRecipes();

  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('1');
  const [newItemUnit, setNewItemUnit] = useState('item');
  const [newItemCategory, setNewItemCategory] = useState<GroceryItem['category']>('Produce');
  const [copiedToast, setCopiedToast] = useState(false);

  const purchasedCount = groceryItems.filter(i => i.isPurchased).length;
  const totalCount = groceryItems.length;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    addGroceryItem({
      recipeId: 'manual',
      recipeTitle: 'Handwritten Pantry Note',
      ingredientName: newItemName.trim(),
      amount: Number(newItemAmount) || 1,
      unit: newItemUnit.trim() || 'item',
      category: newItemCategory
    });

    setNewItemName('');
  };

  const handleCopyClipboard = () => {
    if (groceryItems.length === 0) return;

    let text = `🛒 The Grand Heirloom Market List\n\n`;
    GROCERY_CATEGORIES.forEach(cat => {
      const items = groceryItems.filter(i => i.category === cat && !i.isPurchased);
      if (items.length > 0) {
        text += `[ ${cat.toUpperCase()} ]\n`;
        items.forEach(i => {
          text += `• ${i.amount > 0 ? `${i.amount} ${i.unit} ` : ''}${i.ingredientName} (${i.recipeTitle})\n`;
        });
        text += `\n`;
      }
    });

    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="border-b border-[#E0D5C3] pb-5 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#8C5A2B] font-semibold">
            Market & Provisions
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A2118] tracking-tight mt-1">
            Pantry Shopping Ledger
          </h1>
          <p className="font-serif italic text-sm text-stone-600 mt-1">
            {purchasedCount} of {totalCount} items gathered in basket
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyClipboard}
            disabled={totalCount === 0}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2A2118] text-[#FAF7F0] rounded text-xs font-serif hover:bg-black disabled:opacity-40 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedToast ? 'Copied!' : 'Copy to Clipboard'}</span>
          </button>

          {purchasedCount > 0 && (
            <button
              onClick={clearPurchasedGrocery}
              className="cursor-pointer px-3 py-1.5 bg-[#ECE4D4] hover:bg-[#E0D5C0] text-stone-700 rounded text-xs font-serif transition-colors"
            >
              Clear Checked
            </button>
          )}

          {totalCount > 0 && (
            <button
              onClick={clearAllGrocery}
              className="cursor-pointer px-3 py-1.5 text-stone-500 hover:text-red-700 rounded text-xs font-serif transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Quick Add Custom Item Strip */}
      <form
        onSubmit={handleAddItem}
        className="bg-[#FCFAF5] p-3.5 rounded-lg border border-[#DDD0BC] shadow-xs mb-6 flex flex-wrap items-center gap-2"
      >
        <span className="text-xs font-serif font-semibold text-[#8C5A2B] shrink-0">
          + Add Provision:
        </span>
        <input
          type="text"
          value={newItemName}
          onChange={e => setNewItemName(e.target.value)}
          placeholder="e.g. Maldon flaky sea salt"
          className="flex-1 min-w-[180px] px-3 py-1.5 bg-white border border-[#D5C7B2] rounded text-xs font-serif text-[#2A2118] focus:outline-none focus:border-[#8C5A2B]"
        />
        <input
          type="text"
          value={newItemAmount}
          onChange={e => setNewItemAmount(e.target.value)}
          placeholder="Qty"
          className="w-16 px-2 py-1.5 bg-white border border-[#D5C7B2] rounded text-xs font-mono text-center"
        />
        <input
          type="text"
          value={newItemUnit}
          onChange={e => setNewItemUnit(e.target.value)}
          placeholder="unit"
          className="w-20 px-2 py-1.5 bg-white border border-[#D5C7B2] rounded text-xs font-mono text-center"
        />
        <select
          value={newItemCategory}
          onChange={e => setNewItemCategory(e.target.value as GroceryItem['category'])}
          className="px-2 py-1.5 bg-white border border-[#D5C7B2] rounded text-xs font-serif text-stone-700"
        >
          {GROCERY_CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          type="submit"
          className="cursor-pointer px-3 py-1.5 bg-[#8C5A2B] hover:bg-[#734821] text-white rounded text-xs font-serif font-medium"
        >
          Add
        </button>
      </form>

      {/* Ledger Paper Sheet */}
      {totalCount === 0 ? (
        <div className="py-16 text-center bg-[#FCFAF5] rounded-xl border border-[#E0D5C3] p-8">
          <ShoppingCart className="w-12 h-12 mx-auto text-stone-300 mb-3" />
          <h3 className="font-serif text-xl font-bold text-stone-700">Your basket is empty</h3>
          <p className="font-serif italic text-stone-500 text-sm mt-1 max-w-md mx-auto">
            Browse any recipe in the cookbook and click "Add to Grocery List" to populate your shopping list with scaled ingredients!
          </p>
          <button
            onClick={() => setViewMode('recipe')}
            className="mt-4 px-4 py-2 bg-[#2A2118] text-white rounded text-xs font-serif cursor-pointer hover:bg-black transition-colors"
          >
            Explore Recipes
          </button>
        </div>
      ) : (
        <div className="bg-[#FCFAF5] rounded-xl border border-[#D8CABB] shadow-lg p-6 sm:p-8 space-y-6">
          {GROCERY_CATEGORIES.map(cat => {
            const items = groceryItems.filter(i => i.category === cat);
            if (items.length === 0) return null;

            return (
              <div key={cat} className="space-y-2">
                <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-[#8C5A2B] border-b border-[#E8DEC9] pb-1">
                  {cat} ({items.length})
                </h3>

                <ul className="space-y-1.5">
                  {items.map(item => (
                    <li
                      key={item.id}
                      className={`flex items-center justify-between p-2 rounded transition-colors group ${
                        item.isPurchased
                          ? 'bg-[#EAE4D7]/50 line-through text-stone-400'
                          : 'hover:bg-[#F5EFE4] text-[#2C241D]'
                      }`}
                    >
                      <label className="flex items-center gap-3 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={item.isPurchased}
                          onChange={() => toggleGroceryItem(item.id)}
                          className="w-4 h-4 rounded accent-[#8C5A2B] cursor-pointer"
                        />
                        <span className="font-mono text-xs font-semibold tabular-nums text-[#8C5A2B] shrink-0">
                          {item.amount > 0 ? `${item.amount} ${item.unit}` : ''}
                        </span>
                        <span className="font-serif text-[15px] font-medium">
                          {item.ingredientName}
                        </span>
                        <span className="text-[11px] font-serif italic text-stone-400">
                          — {item.recipeTitle}
                        </span>
                      </label>

                      <button
                        onClick={() => removeGroceryItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-stone-400 hover:text-red-700 transition-opacity cursor-pointer"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
