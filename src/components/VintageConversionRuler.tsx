import React, { useState } from 'react';
import { Scale, ChevronRight, ChevronLeft, Flame, Sparkles } from 'lucide-react';

export const VintageConversionRuler: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-0 top-32 z-30 flex items-start">
      {/* Pull Tab / Ribbon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer bg-[#8C5A2B] hover:bg-[#734821] text-[#FAF7F0] px-2.5 py-4 rounded-l-md shadow-md flex flex-col items-center gap-2 border-y border-l border-[#6C421B] transition-transform hover:-translate-x-1"
        title="Kitchen Measurement Ruler"
      >
        <Scale className="w-4 h-4" />
        <span className="text-[10px] uppercase font-bold tracking-widest [writing-mode:vertical-rl] rotate-180">
          Kitchen Guide
        </span>
        {isOpen ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Drawer Panel */}
      {isOpen && (
        <div className="w-72 bg-[#FCFAF5] border border-[#DDD3C1] shadow-2xl p-5 rounded-bl-lg text-[#2D251E] max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#EADFCB] pb-2.5 mb-3.5">
            <h4 className="font-serif font-bold text-lg text-[#2A221A] flex items-center gap-1.5">
              <span>Culinary Equivalents</span>
            </h4>
            <span className="text-[11px] font-mono text-[#8C5A2B]">EST. 1890</span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Flour & Sugar */}
            <div>
              <p className="font-serif font-semibold text-sm text-[#463628] mb-1.5">Baking Essentials (1 Cup)</p>
              <div className="space-y-1 text-stone-600 font-mono text-[11px]">
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>All-Purpose Flour</span>
                  <span className="font-semibold text-stone-800">120g / 4.25 oz</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>Granulated Sugar</span>
                  <span className="font-semibold text-stone-800">200g / 7.1 oz</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>Brown Sugar (Packed)</span>
                  <span className="font-semibold text-stone-800">220g / 7.75 oz</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>Butter (1 Stick)</span>
                  <span className="font-semibold text-stone-800">113g / ½ Cup</span>
                </div>
              </div>
            </div>

            {/* Spoons */}
            <div>
              <p className="font-serif font-semibold text-sm text-[#463628] mb-1.5">Spoons & Liquids</p>
              <div className="space-y-1 text-stone-600 font-mono text-[11px]">
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>1 Tablespoon</span>
                  <span>3 tsp · 15 ml</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>1 Fluid Ounce</span>
                  <span>2 tbsp · 30 ml</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>1 Cup</span>
                  <span>16 tbsp · 240 ml</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-stone-200">
                  <span>1 Pint</span>
                  <span>2 Cups · 480 ml</span>
                </div>
              </div>
            </div>

            {/* Oven Temps */}
            <div>
              <p className="font-serif font-semibold text-sm text-[#463628] mb-1.5 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#B84E34]" />
                <span>Oven Heat Dial</span>
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                <div className="bg-[#F4EFE6] p-1.5 rounded">
                  <span className="block text-stone-500 text-[10px]">Slow</span>
                  <span className="font-semibold">300°F = 150°C</span>
                </div>
                <div className="bg-[#F4EFE6] p-1.5 rounded">
                  <span className="block text-stone-500 text-[10px]">Moderate</span>
                  <span className="font-semibold">350°F = 175°C</span>
                </div>
                <div className="bg-[#F4EFE6] p-1.5 rounded">
                  <span className="block text-stone-500 text-[10px]">Hot</span>
                  <span className="font-semibold">400°F = 200°C</span>
                </div>
                <div className="bg-[#F4EFE6] p-1.5 rounded">
                  <span className="block text-stone-500 text-[10px]">Very Hot</span>
                  <span className="font-semibold">450°F = 230°C</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 italic text-center pt-1 border-t border-stone-200">
              *Flour measured by fluffing and spooning into measuring cup.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
