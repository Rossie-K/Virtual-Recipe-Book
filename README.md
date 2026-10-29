# 📖 The Grand Heirloom Recipe Book

> An interactive, vintage-styled virtual culinary journal with popular heritage recipes, recipe modification, serving scaler, interactive step-by-step cooking assistant, and a pantry shopping ledger.

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)

---

## ✨ Features

### 📜 1. Virtual Vintage Cookbook Experience
- **Two-Page Open Book Aesthetic**: Designed with warm archival paper textures, subtle page creases, foil stamps, ribbon bookmarks, and classic serif typography (*Cormorant Garamond* paired with *Plus Jakarta Sans*).
- **Curated Heritage Recipes**: Pre-loaded with family classics across Baking, Hearty Mains, Soups & Stews, Cottage Sweets, Heirloom Breads, and Warm Drinks.
- **Folio Book Navigation**: Seamless page-turn navigation, interactive table of contents, and quick bookmarking for favorite recipes.

### ✍️ 2. Recipe Modifier & Handwriting Studio
- **Modify Existing Recipes**: Adapt any heirloom recipe to personal taste—tweak ingredient amounts, swap spices, edit cooking steps, or record personal chef notes in the margins.
- **Handwrite New Recipes**: Complete index-card creator allowing you to add custom recipes with ingredients, duration estimates, step-by-step instructions, heirloom tips, tags, and photos.
- **Persistent Storage**: All changes and additions persist automatically in browser `localStorage`.

### ⚖️ 3. Dynamic Serving Scaler & Unit Converter
- **Instant Ingredient Scaling**: Scale servings ($0.5\times$, $1\times$, $2\times$, or custom steppers) with automatic mathematical recalculation of fractions (e.g., $1\frac{1}{2}\text{ cups}$, $\frac{3}{4}\text{ tsp}$).
- **Metric & Imperial Toggle**: Switch between US Imperial (cups, tablespoons, ounces) and Metric ($g$, $ml$) with a single click.

### ⏱️ 4. Interactive Cooking Assistant
- **Hands-Free Kitchen View**: High-contrast, large-type display designed for easy reading from across the kitchen island.
- **Playful Vintage Animations**:
  - Steaming copper pot with animated rising steam puffs.
  - Working mechanical kitchen timer with start, pause, reset, and quick $+1\text{m} / +5\text{m} / +10\text{m}$ adjustments.
- **Tactile Web Audio Synthesis**: Resonant brass timer bell chime, mechanical clock ticks, and soft paper rustles synthesized via the HTML5 Web Audio API without external audio files.
- **Keyboard Shortcuts**: Press <kbd>Space</kbd> or <kbd>→</kbd> to advance steps while cooking, and <kbd>←</kbd> to go back.

### 🛒 5. Pantry & Market Shopping Ledger
- **Department Grouping**: Automatically imports scaled ingredients from any recipe into a grocery ledger categorized by *Produce*, *Dairy & Eggs*, *Pantry & Grains*, *Spices & Baking*, and *Meats & Seafood*.
- **Interactive Checklists**: Check off items as you gather them in your kitchen or at the market.
- **One-Click Clipboard Export**: Copy the entire shopping list formatted for easy texting or pasting into your mobile notes app.

### 📏 6. Slide-Out Kitchen Equivalents Guide
- Quick-reference bookmark drawer on the edge of the book with baking conversions (flour and sugar cups to grams, butter sticks to ounces, oven temperature dials from $300^\circ\text{F} \leftrightarrow 150^\circ\text{C}$ up to $450^\circ\text{F} \leftrightarrow 230^\circ\text{C}$).

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Motion & Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Sound Engine**: Web Audio API (tactile synthesized acoustic chimes & ticks)
- **State & Storage**: React Context with LocalStorage persistence

---

## 📁 Project Structure

```
├── public/                     # Static public assets
├── src/
│   ├── assets/
│   │   └── images/             # Generated vintage culinary photography
│   ├── components/
│   │   ├── BookCoverView.tsx   # Outer volume cover with entry folio
│   │   ├── CookingModeModal.tsx# Interactive kitchen timer & step assistant
│   │   ├── GroceryShoppingView.tsx # Market ledger & checklist
│   │   ├── IndexCatalogView.tsx# Searchable archive & filter catalog
│   │   ├── RecipeEditorModal.tsx # Recipe modifier and creator modal
│   │   ├── RecipePageView.tsx  # Two-page virtual open cookbook
│   │   ├── TopNavigation.tsx   # One-row, 3-zone header
│   │   └── VintageConversionRuler.tsx # Slide-out measurement converter
│   ├── context/
│   │   └── RecipeContext.tsx   # Recipe state, CRUD actions, and grocery management
│   ├── data/
│   │   └── initialRecipes.ts   # Heritage recipes dataset
│   ├── types/
│   │   └── recipe.ts           # Recipe, Ingredient, and Grocery TypeScript models
│   ├── utils/
│   │   ├── audio.ts            # Web Audio API sound synthesis
│   │   └── measurements.ts     # Fraction scaling and unit conversions
│   ├── App.tsx                 # Root application container
│   ├── index.css               # Parchment styling, fonts & steam animations
│   └── main.tsx                # React DOM entry point
├── index.html                  # HTML entry point with typography links
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18 or higher recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/the-grand-heirloom-recipe-book.git
   cd the-grand-heirloom-recipe-book
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port specified by Vite in your terminal).

---

## 📦 Available Scripts

- `npm run dev` - Launches the Vite development server.
- `npm run build` - Compiles and bundles production-ready assets into the `dist/` folder.
- `npm run preview` - Locally previews the production build.
- `npm run lint` - Runs TypeScript type checking (`tsc --noEmit`).

---

## 📜 License

This project is licensed under the Apache-2.0 License.
