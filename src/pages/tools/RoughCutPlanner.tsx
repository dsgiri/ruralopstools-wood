import { useState } from 'react';
import { Axe, Printer, ChevronDown } from 'lucide-react';
import { CalculatorDisclaimer } from '../../components/CalculatorDisclaimer';
import { Link } from 'react-router-dom';

export function RoughCutPlanner() {
  const [targetWidth, setTargetWidth] = useState<number>(4);
  const [targetThickness, setTargetThickness] = useState<number>(2);
  const [kerfWidth, setKerfWidth] = useState<number>(0.125);
  const [shrinkageAllowance, setShrinkageAllowance] = useState<number>(8); // 8%

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Logic: Rough dimension needs to cover Target + Shrinkage + Kerf(s)
  // Shrinkage is based on the green dimension, so Green * (1 - shrinkage) = Target + Planing allowance
  // Let's assume a 1/4" planing allowance per dimension.
  const planingAllowance = 0.25;
  
  const widthBeforePlaning = targetWidth + planingAllowance;
  const thicknessBeforePlaning = targetThickness + planingAllowance;

  // Now add shrinkage allowance
  const roughWidth = widthBeforePlaning / (1 - (shrinkageAllowance / 100)) + kerfWidth;
  const roughThickness = thicknessBeforePlaning / (1 - (shrinkageAllowance / 100)) + kerfWidth;

  return (
    <div className="space-y-12 px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex-1 w-full max-w-6xl mx-auto">
      {/* 1. Above the Fold (Immediate Access) */}
      <div className="border-b border-[#DCD3C7] pb-4 flex items-center gap-3">
        <div className="bg-[#F9F7F4] p-2 text-[#5A4633] border border-[#DCD3C7] rounded-sm shrink-0">
          <Axe className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#42372E] tracking-tight">Rough-Cut Lumber Planner</h1>
          <p className="text-[#5A4633] mt-1 text-sm sm:text-base">Plan saw kerf allowances and shrinkage for milling green logs.</p>
        </div>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 bg-white border border-[#DCD3C7] p-5 sm:p-6 shadow-sm rounded-sm">
          <h2 className="text-base sm:text-lg font-bold mb-6 flex items-center gap-2 border-b border-[#DCD3C7] pb-2 text-[#42372E]">
            Milling Parameters
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="targetThickness" className="block text-sm font-bold text-[#42372E] mb-1">
                Final Target Thickness (S4S)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="targetThickness"
                  min="0"
                  step="0.25"
                  value={targetThickness || ''}
                  onChange={(e) => setTargetThickness(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-20 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  INCHES
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="targetWidth" className="block text-sm font-bold text-[#42372E] mb-1">
                Final Target Width (S4S)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="targetWidth"
                  min="0"
                  step="0.25"
                  value={targetWidth || ''}
                  onChange={(e) => setTargetWidth(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-20 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  INCHES
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="kerfWidth" className="block text-sm font-bold text-[#42372E] mb-1">
                Sawmill Blade Kerf
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="kerfWidth"
                  min="0"
                  step="0.0625"
                  value={kerfWidth || ''}
                  onChange={(e) => setKerfWidth(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-20 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  INCHES
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="shrinkageAllowance" className="block text-sm font-bold text-[#42372E] mb-1">
                Estimated Shrinkage
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="shrinkageAllowance"
                  min="0"
                  step="1"
                  value={shrinkageAllowance || ''}
                  onChange={(e) => setShrinkageAllowance(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-12 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  %
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1" aria-live="polite">
          <div className="bg-[#3D342C] text-[#FAF7F2] p-5 sm:p-6 rounded-sm shadow-md sticky top-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#8C7A6B] mb-4">Required Saw Settings</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[#DCD3C7] text-xs font-bold uppercase mb-1">Setworks Thickness Drop</p>
                <div className="flex items-baseline gap-1 border-b border-white/10 pb-2">
                  <span className="text-3xl font-extrabold tracking-tight">{roughThickness.toFixed(2)}"</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#DCD3C7] text-xs uppercase mb-1 opacity-80">Rough Width</p>
                  <p className="text-lg font-bold">{roughWidth.toFixed(2)}"</p>
                </div>
                <div>
                  <p className="text-[#DCD3C7] text-xs uppercase mb-1 opacity-80">Included Kerf</p>
                  <p className="text-lg font-bold">{kerfWidth}"</p>
                </div>
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
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Planing Allowance:</strong> Adds a fixed 1/4" buffer to both dimensions to account for flattening cupped boards and surfacing marks later.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Shrinkage Buffering:</strong> Increases the rough green dimension to ensure the board will not shrink below the required pre-planing dimensions as it dries.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Blade Kerf:</strong> Accounts for the wood turned to sawdust by the blade on each pass.</span></li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Definitions & Assumptions</h3>
            <ul className="space-y-3 text-sm text-[#5A4633]">
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>S4S:</strong> Surfaced Four Sides. The final, perfectly flat and square dimension required for your project.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Setworks Drop:</strong> The distance the sawmill head needs to lower for each subsequent cut to yield the correct thickness.</span></li>
            </ul>
          </section>
        </div>

        {/* 4. Trust and Engagement Elements */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {[
                { q: "Why add a planing allowance?", a: "As wood dries, it rarely stays perfectly flat. It cups, bows, or twists. You need extra thickness to joint and plane it flat while still maintaining your target dimension." },
                { q: "What is a standard bandsaw kerf?", a: "Portable bandsaws typically have a kerf around 1/8\" to 3/32\". Circular sawmills can have a kerf of 1/4\" or larger." }
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
              <Link to="/tools/wood-shrinkage" className="block border border-[#DCD3C7] p-4 rounded-sm bg-white hover:border-[#5A4633] transition-colors group">
                <strong className="block text-[#42372E] group-hover:text-[#5A4633] transition-colors">Wood Shrinkage Calculator</strong>
                <span className="text-sm text-[#8C7A6B]">Calculate specific species shrinkage rates.</span>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <div className="pt-8 border-t border-[#DCD3C7]">
          <CalculatorDisclaimer customText="Disclaimer: These are planning estimates. Actual milling requires adjusting for specific blade types, log stresses, and operator experience. When in doubt, err on cutting slightly thicker." />
      </div>
    </div>
  );
}
