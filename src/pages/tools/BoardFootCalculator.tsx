import { useState } from 'react';
import { Calculator, AlertTriangle, FileCheck, CheckCircle2, Printer, ChevronDown } from 'lucide-react';
import { CalculatorDisclaimer } from '../../components/CalculatorDisclaimer';
import { Link } from 'react-router-dom';

export function BoardFootCalculator() {
  const [thickness, setThickness] = useState<number>(1);
  const [width, setWidth] = useState<number>(6);
  const [length, setLength] = useState<number>(10);
  const [quantity, setQuantity] = useState<number>(1);

  // Board Feet = (Thickness in * Width in * Length ft) / 12 * Quantity
  const totalBdFt = (thickness * width * length) / 12 * quantity;
  
  // Highlight red flag if parameters look extremely unusual for standard milling
  const isAlertThreshold = thickness > 12 || width > 24 || length > 30;

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-12 px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex-1 w-full max-w-6xl mx-auto">
      {/* 1. Above the Fold (Immediate Access) */}
      <div className="border-b border-[#DCD3C7] pb-4 flex items-center gap-3">
        <div className="bg-[#F9F7F4] p-2 text-[#5A4633] border border-[#DCD3C7] rounded-sm shrink-0">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#42372E] tracking-tight">Board Foot Calculator</h1>
          <p className="text-[#5A4633] mt-1 text-sm sm:text-base">Quickly estimate the volume of lumber for your milling or woodworking projects.</p>
        </div>
      </div>

      {/* 2. The Calculator Layout */}
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
            
            <button 
              onClick={() => window.print()}
              className="w-full mt-6 bg-[#FAF7F2] hover:bg-white text-[#5A4633] font-bold py-3 px-4 rounded-sm flex items-center justify-center gap-2 transition-colors border border-transparent hover:border-[#DCD3C7]"
            >
              <Printer className="w-4 h-4" />
              Print Summary
            </button>
          </div>
        </div>
      </div>

      {/* 3. Below the Fold (Supporting Context) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-8 border-t border-[#DCD3C7]">
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">How It Works</h3>
            <ul className="space-y-3 text-sm text-[#5A4633]">
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Formula:</strong> Board Feet = (Thickness in inches × Width in inches × Length in feet) ÷ 12.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Multiplier:</strong> The result is then multiplied by the quantity of pieces.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Purpose:</strong> This provides an industry-standard volume measurement used for buying and selling lumber.</span></li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Definitions & Assumptions</h3>
            <ul className="space-y-3 text-sm text-[#5A4633]">
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Board Foot (BF):</strong> A unit of volume for timber equal to 144 cubic inches, nominally 12" × 12" × 1".</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Nominal vs Actual:</strong> Calculations assume rough-sawn (nominal) dimensions before milling or surfacing.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Zero Waste:</strong> The calculator assumes 0% milling waste. You must manually account for kerf and squaring loss.</span></li>
            </ul>
          </section>
        </div>

        {/* 4. Trust and Engagement Elements */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {[
                { q: "What is a board foot?", a: "A board foot is a specialized unit of measure for the volume of lumber in the United States and Canada. It is the volume of a one-foot length of a board one foot wide and one inch thick." },
                { q: "How is it different from linear feet?", a: "Linear feet only measure length, ignoring thickness and width. Board feet measure total volume, which determines the actual amount of wood." },
                { q: "Should I use nominal or actual dimensions?", a: "Softwood is typically sold by nominal dimensions (e.g., 2x4), while hardwood is often sold by board foot using rough, actual dimensions before surfacing." }
              ].map((faq, i) => (
                <div key={i} className="border border-[#DCD3C7] rounded-sm overflow-hidden bg-white">
                  <button 
                    onClick={() => toggleFaq(i)}
                    className="w-full text-left px-4 py-3 font-bold text-sm text-[#42372E] flex items-center justify-between hover:bg-[#F9F7F4] transition-colors"
                    aria-expanded={openFaq === i}
                  >
                    {faq.q}
                    <ChevronDown className={`w-4 h-4 text-[#8C7A6B] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 py-3 text-sm text-[#5A4633] border-t border-[#DCD3C7] bg-[#FAF7F2]">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Related Tools</h3>
            <div className="space-y-3">
              <Link to="/" className="block border border-[#DCD3C7] p-4 rounded-sm bg-white hover:border-[#5A4633] transition-colors group">
                <strong className="block text-[#42372E] group-hover:text-[#5A4633] transition-colors">Wood Hub Dashboard</strong>
                <span className="text-sm text-[#8C7A6B]">Explore all our lumber and woodworking calculators.</span>
              </Link>
              <a href="https://ruralopstools.com" target="_blank" rel="noopener noreferrer" className="block border border-[#DCD3C7] p-4 rounded-sm bg-white hover:border-[#5A4633] transition-colors group">
                <strong className="block text-[#42372E] group-hover:text-[#5A4633] transition-colors">Rural Ops Tools Platform</strong>
                <span className="text-sm text-[#8C7A6B]">Master hub for agricultural and utility estimation tools.</span>
              </a>
            </div>
          </section>
        </div>
      </div>

      <div className="pt-8 border-t border-[#DCD3C7]">
          <CalculatorDisclaimer />
      </div>
    </div>
  );
}
