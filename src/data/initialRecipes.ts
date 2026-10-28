import { Recipe } from '../types/recipe';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'heirloom-berry-pie',
    title: 'Wild Blackberry & Honey Lattice Pie',
    subtitle: 'From Nana Eleanor’s Orchard Notebook · Summer 1948',
    category: 'Baking & Pastry',
    description: 'A summer garden classic with flaky cold-butter pastry, whole plump blackberries, wild wildflower honey, and a touch of lemon zest bubbling under a golden woven lattice.',
    prepTime: 35,
    cookTime: 50,
    servings: 8,
    difficulty: 'Moderate',
    originYear: 'Orchard Valley, 1948',
    heroImage: '/src/assets/images/vintage_berry_pie_1793188740795.jpg',
    vintageStamp: 'Family Secret',
    isFavorite: true,
    tags: ['Baking', 'Fruit', 'Dessert', 'Summer', 'Heirloom'],
    chefNotes: 'Always keep your butter ice cold. Brush the top lattice with beaten egg yolk and a sprinkle of coarse turbinado sugar right before baking for a sparkling crust.',
    createdAt: '1948-07-14T10:00:00.000Z',
    updatedAt: '2026-10-28T04:00:00.000Z',
    ingredients: [
      { id: 'i-1', name: 'All-purpose flour', amount: 2.5, unit: 'cups', notes: 'chilled before cutting' },
      { id: 'i-2', name: 'Unsalted sweet cream butter', amount: 1, unit: 'cup', notes: 'cut into 1/2-inch cubes and frozen 15 mins' },
      { id: 'i-3', name: 'Ice water with apple cider vinegar', amount: 0.35, unit: 'cup', notes: 'splashed as needed' },
      { id: 'i-4', name: 'Fresh wild blackberries', amount: 6, unit: 'cups', notes: 'rinsed and gently patted dry' },
      { id: 'i-5', name: 'Wildflower honey or raw sugar', amount: 0.75, unit: 'cup', notes: 'adjust to fruit sweetness' },
      { id: 'i-6', name: 'Tapioca starch or cornstarch', amount: 3, unit: 'tbsp', notes: 'to thicken berry juices' },
      { id: 'i-7', name: 'Fresh lemon juice & fine zest', amount: 1, unit: 'tbsp', notes: 'from 1 organic Meyer lemon' },
      { id: 'i-8', name: 'Ground cinnamon & pinch of nutmeg', amount: 0.5, unit: 'tsp', notes: 'freshly grated' },
      { id: 'i-9', name: 'Egg wash + coarse raw sugar', amount: 1, unit: 'whole', notes: 'for golden crust glaze' }
    ],
    instructions: [
      {
        id: 's-1',
        stepNumber: 1,
        text: 'Whisk flour and a half teaspoon of sea salt in a chilled bowl. Cut in frozen butter cubes with a pastry blender or fingertips until pea-sized crumbles appear.',
        tip: 'Do not overwork the dough; butter pockets create the flaky layers.',
        durationMinutes: 10
      },
      {
        id: 's-2',
        stepNumber: 2,
        text: 'Drizzle ice vinegar-water one tablespoon at a time, tossing gently with a fork until the dough barely holds together. Divide into two disks, wrap in butcher paper, and chill for 45 minutes.',
        durationMinutes: 45
      },
      {
        id: 's-3',
        stepNumber: 3,
        text: 'Gently fold blackberries with honey, starch, lemon juice, zest, cinnamon, and nutmeg in an enamel bowl until berries are glossed.',
        tip: 'Let fruit rest 10 minutes so starch starts absorbing early fruit juices.',
        durationMinutes: 10
      },
      {
        id: 's-4',
        stepNumber: 4,
        text: 'Roll bottom crust into a 12-inch circle and drape into your pie dish. Spoon in berry filling. Cut second disk into 1-inch strips and weave an interlocking lattice.',
        durationMinutes: 15
      },
      {
        id: 's-5',
        stepNumber: 5,
        text: 'Crimp edges decoratively. Brush pastry lattice with egg wash and dust with coarse sugar. Bake at 400°F (200°C) for 20 minutes, then reduce to 375°F (190°C) for 35 minutes until the filling bubbles vigorously.',
        tip: 'Cool completely on a wire rack for at least 3 hours before slicing so the fruit sets cleanly.',
        durationMinutes: 55
      }
    ]
  },
  {
    id: 'heirloom-roast-chicken',
    title: 'Cast-Iron French Herb Roasted Chicken',
    subtitle: 'Sunday Supper in Provence · Circa 1932',
    category: 'Hearty Mains',
    description: 'Crisp golden crackling skin basted in herb-infused garlic butter, surrounded by tender caramelized shallots, heirloom carrots, and whole roasted garlic bulbs.',
    prepTime: 20,
    cookTime: 75,
    servings: 4,
    difficulty: 'Moderate',
    originYear: 'Provence, 1932',
    heroImage: '/src/assets/images/vintage_roasted_chicken_1793188742085.jpg',
    vintageStamp: 'Beloved Classic',
    isFavorite: true,
    tags: ['Poultry', 'Cast-Iron', 'Dinner', 'French', 'Comfort Food'],
    chefNotes: 'Pat the chicken completely dry inside and out with kitchen paper towels. A dry skin is the single most important secret for shatteringly crisp skin.',
    createdAt: '1932-10-12T10:00:00.000Z',
    updatedAt: '2026-10-28T04:00:00.000Z',
    ingredients: [
      { id: 'i-10', name: 'Whole free-range chicken', amount: 4.5, unit: 'lbs', notes: 'giblets removed, patted dry' },
      { id: 'i-11', name: 'Softened cultured butter', amount: 4, unit: 'tbsp', notes: 'mixed with sea salt' },
      { id: 'i-12', name: 'Fresh rosemary sprigs', amount: 4, unit: 'whole', notes: 'minced and whole' },
      { id: 'i-13', name: 'Fresh English thyme', amount: 6, unit: 'whole', notes: 'leaves stripped' },
      { id: 'i-14', name: 'Whole garlic heads', amount: 2, unit: 'whole', notes: 'sliced across the equator' },
      { id: 'i-15', name: 'Heirloom carrots & baby shallots', amount: 1, unit: 'lb', notes: 'scrubbed and halved' },
      { id: 'i-16', name: 'Dry white wine or farm cider', amount: 0.5, unit: 'cup', notes: 'for the pan reduction' },
      { id: 'i-17', name: 'Coarse flake salt & black peppercorns', amount: 1.5, unit: 'tsp', notes: 'freshly crushed in mortar' }
    ],
    instructions: [
      {
        id: 's-6',
        stepNumber: 1,
        text: 'Preheat heavy cast-iron skillet in an oven heated to 425°F (220°C). Season the cavity of chicken with salt, pepper, lemon halves, and half the fresh herbs.',
        tip: 'Preheating the skillet sears the bottom skin instantly.',
        durationMinutes: 15
      },
      {
        id: 's-7',
        stepNumber: 2,
        text: 'Carefully slide your fingers between breast meat and skin. Gently massage herb-butter directly underneath the skin, then brush remaining butter over the outside.',
        durationMinutes: 10
      },
      {
        id: 's-8',
        stepNumber: 3,
        text: 'Toss carrots, shallots, and halved garlic heads with olive oil. Scatter across hot skillet, then nestle the trussed chicken breast-side up in the center.',
        durationMinutes: 5
      },
      {
        id: 's-9',
        stepNumber: 4,
        text: 'Roast for 60 to 70 minutes, basting with pan juices at the 40-minute mark, until juices run clear and thigh temperature reads 165°F (74°C).',
        tip: 'Let rest for 15 minutes before carving to allow juices to redistribute.',
        durationMinutes: 70
      },
      {
        id: 's-10',
        stepNumber: 5,
        text: 'Pour white wine into the hot cast iron and scrape up browned bits over low flame to create a savory pan gravy.',
        durationMinutes: 5
      }
    ]
  },
  {
    id: 'heirloom-sourdough',
    title: 'Overnight Farmhouse Sourdough Loaf',
    subtitle: 'Wild Yeast Tradition · Handed Down from 1895',
    category: 'Heirloom Breads',
    description: 'A deep mahogany blistered crust with an open, custard-like crumb and gentle tangy flavor, fermented slowly with natural wild yeast starter.',
    prepTime: 40,
    cookTime: 45,
    servings: 10,
    difficulty: 'Artisan',
    originYear: 'Cotswolds, 1895',
    heroImage: '/src/assets/images/vintage_sourdough_bread_1793188739686.jpg',
    vintageStamp: 'Master Baker',
    isFavorite: true,
    tags: ['Bread', 'Wild Yeast', 'Baking', 'Fermentation', 'Artisan'],
    chefNotes: 'Bake in a preheated cast iron Dutch oven with the lid on for the first 20 minutes to trap the steam for high oven spring and crackly blisters.',
    createdAt: '1895-04-20T10:00:00.000Z',
    updatedAt: '2026-10-28T04:00:00.000Z',
    ingredients: [
      { id: 'i-18', name: 'Stone-ground unbleached bread flour', amount: 450, unit: 'g', notes: 'high protein (approx 3.5 cups)' },
      { id: 'i-19', name: 'Stone-ground whole wheat or rye flour', amount: 50, unit: 'g', notes: 'for rustic earthy notes' },
      { id: 'i-20', name: 'Spring water (tepid ~80°F)', amount: 375, unit: 'g', notes: 'approx 75% hydration' },
      { id: 'i-21', name: 'Active bubbly sourdough starter', amount: 100, unit: 'g', notes: 'fed 4-6 hours prior' },
      { id: 'i-22', name: 'Fine grey sea salt', amount: 10, unit: 'g', notes: 'approx 2 tsp' },
      { id: 'i-23', name: 'Rice flour for banneton dusting', amount: 2, unit: 'tbsp', notes: 'prevents sticking' }
    ],
    instructions: [
      {
        id: 's-11',
        stepNumber: 1,
        text: 'Mix flours and 350g water until no dry pockets remain. Cover bowl and autolyse at room temperature for 45 minutes.',
        durationMinutes: 45
      },
      {
        id: 's-12',
        stepNumber: 2,
        text: 'Dimple in active sourdough starter and remaining 25g water mixed with salt. Perform stretch and folds every 30 minutes for the next 2 hours.',
        tip: 'The dough will transform from shaggy to silky and pillowy.',
        durationMinutes: 120
      },
      {
        id: 's-13',
        stepNumber: 3,
        text: 'Allow dough to bulk ferment until it has risen about 40-50% with domed edges and scattered fermentation bubbles.',
        durationMinutes: 180
      },
      {
        id: 's-14',
        stepNumber: 4,
        text: 'Pre-shape on a lightly floured board, bench rest 20 minutes, then stitch into a tight batard. Place seam-side up in a dusted banneton and chill overnight (12-16 hours).',
        durationMinutes: 720
      },
      {
        id: 's-15',
        stepNumber: 5,
        text: 'Turn dough out onto parchment, slash with a sharp razor blade at a 30-degree angle. Bake in a 475°F (245°C) covered Dutch oven for 20 mins, uncover and bake 25 mins more at 425°F until deep caramelized chestnut.',
        durationMinutes: 45
      }
    ]
  },
  {
    id: 'heirloom-chocolate-torte',
    title: 'Velvet Dark Chocolate Olive Oil Torte',
    subtitle: 'Florentine Salon Recipe · Autumn 1921',
    category: 'Cottage Sweets',
    description: 'An extraordinarily moist, fudgy chocolate torte made with rich dark cocoa, fruity virgin olive oil, espresso extract, and topped with bittersweet ganache swirl.',
    prepTime: 25,
    cookTime: 40,
    servings: 10,
    difficulty: 'Moderate',
    originYear: 'Florence, 1921',
    heroImage: '/src/assets/images/vintage_chocolate_cake_1793188740779.jpg',
    vintageStamp: 'Tried & Beloved',
    isFavorite: false,
    tags: ['Chocolate', 'Dessert', 'Cake', 'Olive Oil', 'Italian'],
    chefNotes: 'Use extra virgin olive oil with fruity and mild grassy notes. It creates a cake that stays miraculously tender and moist for days.',
    createdAt: '1921-11-04T10:00:00.000Z',
    updatedAt: '2026-10-28T04:00:00.000Z',
    ingredients: [
      { id: 'i-24', name: 'Valrhona Dutch-process cocoa powder', amount: 0.75, unit: 'cup', notes: 'sifted' },
      { id: 'i-25', name: 'Strong fresh brewed espresso', amount: 0.5, unit: 'cup', notes: 'piping hot' },
      { id: 'i-26', name: 'Extra virgin olive oil', amount: 0.65, unit: 'cup', notes: 'good quality fragrant oil' },
      { id: 'i-27', name: 'Pasture-raised eggs', amount: 3, unit: 'whole', notes: 'separated into whites & yolks' },
      { id: 'i-28', name: 'Turbinado cane sugar', amount: 1, unit: 'cup', notes: 'divided' },
      { id: 'i-29', name: 'Pure vanilla bean extract', amount: 1.5, unit: 'tsp', notes: 'Madagascar bourbon' },
      { id: 'i-30', name: 'Fine sea salt', amount: 0.5, unit: 'tsp', notes: 'enhances chocolate depth' },
      { id: 'i-31', name: 'Dark chocolate 70% for ganache', amount: 6, unit: 'oz', notes: 'melted with 1/3 cup cream' }
    ],
    instructions: [
      {
        id: 's-16',
        stepNumber: 1,
        text: 'Whisk hot espresso into sifted cocoa powder until smooth and glossy. Let cool slightly for 5 minutes, then whisk in olive oil and vanilla.',
        durationMinutes: 10
      },
      {
        id: 's-17',
        stepNumber: 2,
        text: 'Beat egg yolks with 3/4 cup sugar until pale, thickened ribbons form (about 3 minutes). Stir yolk mixture into cocoa blend.',
        durationMinutes: 5
      },
      {
        id: 's-18',
        stepNumber: 3,
        text: 'In a clean copper or glass bowl, whip egg whites with salt until soft peaks form. Gradually shower in remaining 1/4 cup sugar, beating until glossy firm peaks hold.',
        durationMinutes: 8
      },
      {
        id: 's-19',
        stepNumber: 4,
        text: 'Gently fold whipped whites into the chocolate batter in three gentle additions using a rubber spatula, preserving the airy emulsion.',
        durationMinutes: 5
      },
      {
        id: 's-20',
        stepNumber: 5,
        text: 'Bake in an 8-inch greased springform pan at 325°F (165°C) for 35 to 40 minutes until center is barely set. Cool completely, swirl warm ganache atop, and garnish with fresh raspberries.',
        durationMinutes: 40
      }
    ]
  },
  {
    id: 'heirloom-french-onion-soup',
    title: 'Parisian French Onion Soup Gratinée',
    subtitle: 'Les Halles Market Recipe · Winter 1910',
    category: 'Soups & Stews',
    description: 'Sweet golden onions slowly caramelized down for 50 minutes with butter and thyme, simmered in rich beef stock, topped with crusty sourdough and bubbling broiled Gruyère.',
    prepTime: 20,
    cookTime: 70,
    servings: 6,
    difficulty: 'Moderate',
    originYear: 'Paris, 1910',
    heroImage: '', // Will use elegant fallback SVG illustration
    vintageStamp: 'Comfort Food',
    isFavorite: true,
    tags: ['Soup', 'French', 'Winter', 'Cheese', 'Onions'],
    chefNotes: 'Never rush the onions. Patience is the entire recipe. Low and slow cooking develops that deep mahogany sweetness without burning.',
    createdAt: '1910-01-18T10:00:00.000Z',
    updatedAt: '2026-10-28T04:00:00.000Z',
    ingredients: [
      { id: 'i-32', name: 'Yellow onions', amount: 3, unit: 'lbs', notes: 'thinly sliced pole to pole' },
      { id: 'i-33', name: 'European butter', amount: 3, unit: 'tbsp', notes: 'melted' },
      { id: 'i-34', name: 'Dry white French wine', amount: 0.75, unit: 'cup', notes: 'Sauvignon Blanc or Chardonnay' },
      { id: 'i-35', name: 'Rich roasted beef bone broth', amount: 6, unit: 'cups', notes: 'or deep vegetable stock' },
      { id: 'i-36', name: 'Fresh thyme & bay leaf bundle', amount: 1, unit: 'whole', notes: 'tied with twine' },
      { id: 'i-37', name: 'Stale sourdough baguette slices', amount: 6, unit: 'whole', notes: 'toasted crisp' },
      { id: 'i-38', name: 'Cave-aged Gruyère cheese', amount: 2, unit: 'cups', notes: 'freshly grated' }
    ],
    instructions: [
      {
        id: 's-21',
        stepNumber: 1,
        text: 'Melt butter in a heavy Dutch oven. Add sliced onions with a pinch of salt. Cook over medium-low heat for 45 to 55 minutes, stirring occasionally, until deeply browned and caramelized.',
        tip: 'If onions stick to the bottom, splash a teaspoon of water and scrape up the fond.',
        durationMinutes: 50
      },
      {
        id: 's-22',
        stepNumber: 2,
        text: 'Pour in white wine to deglaze the pot, cooking down until almost dry (3 minutes).',
        durationMinutes: 3
      },
      {
        id: 's-23',
        stepNumber: 3,
        text: 'Pour in hot beef broth, herb bundle, and black pepper. Simmer gently uncovered for 25 minutes to marry the flavors.',
        durationMinutes: 25
      },
      {
        id: 's-24',
        stepNumber: 4,
        text: 'Ladle soup into ovenproof ceramic crocks. Float a toasted baguette slice on each, then mound generously with grated Gruyère cheese.',
        durationMinutes: 5
      },
      {
        id: 's-25',
        stepNumber: 5,
        text: 'Broil under high heat for 3 to 4 minutes until cheese is melted, bubbling, and blistered with golden spots. Serve immediately.',
        durationMinutes: 4
      }
    ]
  },
  {
    id: 'heirloom-mulled-cider',
    title: 'Hearthside Spiced Mulled Apple Cider',
    subtitle: 'New England Autumn Tradition · 1888',
    category: 'Warm Drinks',
    description: 'Freshly pressed cloudy orchard apple cider steeped with whole Ceylon cinnamon quills, fragrant star anise, cloves, allspice berries, and dried blood orange wheels.',
    prepTime: 10,
    cookTime: 30,
    servings: 6,
    difficulty: 'Simple',
    originYear: 'Vermont, 1888',
    heroImage: '', // Will use elegant fallback SVG illustration
    vintageStamp: 'Cozy Favorite',
    isFavorite: false,
    tags: ['Drink', 'Autumn', 'Spiced', 'Cider', 'Non-Alcoholic'],
    chefNotes: 'Keep on the lowest simmer so the delicate apple aromas do not boil off. A splash of dark rum or bourbon can be added for evening gatherings.',
    createdAt: '1888-10-31T10:00:00.000Z',
    updatedAt: '2026-10-28T04:00:00.000Z',
    ingredients: [
      { id: 'i-39', name: 'Fresh unpasteurized cloudy apple cider', amount: 8, unit: 'cups', notes: 'local orchard pressed' },
      { id: 'i-40', name: 'Whole Ceylon cinnamon sticks', amount: 4, unit: 'whole', notes: 'lightly cracked' },
      { id: 'i-41', name: 'Whole star anise pods', amount: 3, unit: 'whole', notes: 'aromatic stars' },
      { id: 'i-42', name: 'Whole cloves & allspice berries', amount: 1, unit: 'tsp', notes: 'tied in cheesecloth' },
      { id: 'i-43', name: 'Organic oranges', amount: 2, unit: 'whole', notes: 'sliced into wheels' },
      { id: 'i-44', name: 'Pure maple syrup', amount: 2, unit: 'tbsp', notes: 'grade A amber' }
    ],
    instructions: [
      {
        id: 's-26',
        stepNumber: 1,
        text: 'Pour apple cider and pure maple syrup into a heavy enameled copper kettle or pot.',
        durationMinutes: 2
      },
      {
        id: 's-27',
        stepNumber: 2,
        text: 'Add cinnamon sticks, star anise pods, the spice bundle, and fresh orange wheels directly into the cider.',
        durationMinutes: 3
      },
      {
        id: 's-28',
        stepNumber: 3,
        text: 'Bring to a gentle whisper of a simmer over medium heat, then immediately drop heat to very low. Steep for 30 minutes to extract the warm essential oils.',
        tip: 'Do not allow to boil vigorously or the cider turns murky.',
        durationMinutes: 30
      },
      {
        id: 's-29',
        stepNumber: 4,
        text: 'Ladle into sturdy ceramic mugs through a small vintage tea strainer. Garnish each cup with a fresh cinnamon stick stirrer and orange wheel.',
        durationMinutes: 5
      }
    ]
  }
];
