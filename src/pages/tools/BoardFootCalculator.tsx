import { useState } from 'react';
import { Calculator, AlertTriangle, FileCheck, CheckCircle2 } from 'lucide-react';
import { AdSensePlaceholder } from '../../components/AdSensePlaceholder';
import { CalculatorDisclaimer } from '../../components/CalculatorDisclaimer';

export function BoardFootCalculator() {
  const [thickness, setThickness] = useState<number>(1);
  const [width, setWidth] = useState<number>(6);
  const [length, setLength] = useState<number>(10);
  const [quantity, setQuantity] = useState<number>(1);

  // Board Feet = (Thickness in * Width in * Length ft) / 12 * Quantity
  const totalBdFt = (thickness * width * length) / 12 * quantity;
  
  // Highlight red flag if parameters look extremely unusual for standard milling
  const isAlertThreshold = thickness > 12 || width > 24 || length > 30;

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex-1 w-full max-w-6xl mx-auto">
      <div className="border-b border-[#DCD3C7] pb-4 flex items-center gap-3">
        <div className="bg-[#F9F7F4] p-2 text-[#5A4633] border border-[#DCD3C7] rounded-sm shrink-0">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#42372E] tracking-tight">Board Foot Calculator</h1>
          <p className="text-[#8C7A6B] mt-1 font-mono text-[10px] sm:text-xs uppercase">Compliance Module: T-BF-01</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 bg-white border border-[#DCD3C7] p-5 sm:p-6 shadow-sm rounded-sm">
          <h2 className="text-base sm:text-lg font-bold mb-6 flex items-center gap-2 border-b border-[#DCD3C7] pb-2 text-[#42372E]">
            <span className="bg-[#5A4633] text-white w-6 h-6 inline-flex items-center justify-center rounded-full text-xs font-mono shrink-0">1</span>
            Data Entry: Mill Dimensions
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="space-y-2">
              <label htmlFor="thickness-input" className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8C7A6B]">Thickness (Inches)</label>
              <input 
                id="thickness-input"
                type="number" 
                value={thickness || ''} 
                onChange={(e) => setThickness(Number(e.target.value))}
                className="w-full border border-[#DCD3C7] p-3 sm:p-2.5 text-sm bg-[#FAF7F2] text-[#3D342C] focus:border-[#5A4633] focus:ring-1 focus:ring-[#5A4633] transition outline-none rounded-sm min-h-[48px] sm:min-h-auto" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="width-input" className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8C7A6B]">Width (Inches)</label>
              <input 
                id="width-input"
                type="number" 
                value={width || ''} 
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full border border-[#DCD3C7] p-3 sm:p-2.5 text-sm bg-[#FAF7F2] text-[#3D342C] focus:border-[#5A4633] focus:ring-1 focus:ring-[#5A4633] transition outline-none rounded-sm min-h-[48px] sm:min-h-auto" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="length-input" className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8C7A6B]">Length (Feet)</label>
              <input 
                id="length-input"
                type="number" 
                value={length || ''} 
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full border border-[#DCD3C7] p-3 sm:p-2.5 text-sm bg-[#FAF7F2] text-[#3D342C] focus:border-[#5A4633] focus:ring-1 focus:ring-[#5A4633] transition outline-none rounded-sm min-h-[48px] sm:min-h-auto" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="quantity-input" className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8C7A6B]">Quantity (Pieces)</label>
              <input 
                id="quantity-input"
                type="number" 
                min="1"
                value={quantity || ''} 
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border border-[#DCD3C7] p-3 sm:p-2.5 text-sm bg-[#FAF7F2] text-[#3D342C] focus:border-[#5A4633] focus:ring-1 focus:ring-[#5A4633] transition outline-none rounded-sm min-h-[48px] sm:min-h-auto" 
              />
            </div>
          </div>

          {isAlertThreshold && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 mb-2 rounded-sm flex items-start gap-3 shadow-sm" role="alert">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" aria-hidden="true" />
              <div>
                <strong className="font-bold text-sm block">Regulatory Flag: Non-Standard Dimensions</strong>
                <span className="text-xs mt-1 block">The provided dimensions exceed typical structural or furniture-grade milling specs. Please physically verify measurements before cutting.</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="bg-[#5A4633] text-white p-5 sm:p-6 border-t-8 border-[#42372E] flex flex-col rounded-sm shadow-md h-full">
            <h2 className="text-xs sm:text-sm font-mono text-white/70 mb-6 uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4" /> Output Ledger
            </h2>
            
            <div className="mb-6 sm:mb-8">
              <span className="block text-xs sm:text-sm text-white/70 mb-1">Estimated Output</span>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tighter" aria-live="polite">
                {totalBdFt > 0 ? totalBdFt.toFixed(2) : '0.00'}
              </div>
              <span className="block text-[10px] sm:text-xs uppercase font-mono text-white/50 mt-2 tracking-widest">Board Feet (BF)</span>
            </div>

            <div className="mt-auto space-y-4 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Status</span>
                <span className="text-emerald-400 flex items-center gap-1 font-bold"><CheckCircle2 className="w-4 h-4" /> VERIFIED</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Logging Tolerance</span>
                <span className="text-white/90 font-mono">0.00%</span>
              </div>
            </div>
          </div>
          
          <CalculatorDisclaimer />
          
          <AdSensePlaceholder slot="tool_sidebar_ad" />
        </div>
      </div>
      
      <AdSensePlaceholder slot="tool_bottom_ad" className="mt-8 min-h-[90px]" />
    </div>
  );
}
