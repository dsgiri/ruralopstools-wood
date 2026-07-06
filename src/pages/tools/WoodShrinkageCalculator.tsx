import { useState } from 'react';
import { Scaling, Printer, ChevronDown } from 'lucide-react';
import { CalculatorDisclaimer } from '../../components/CalculatorDisclaimer';
import { Link } from 'react-router-dom';

export function WoodShrinkageCalculator() {
  const [initialDimension, setInitialDimension] = useState<number>(10);
  const [initialMC, setInitialMC] = useState<number>(30); // Green is typically > 30%
  const [finalMC, setFinalMC] = useState<number>(8);
  const [shrinkageCoefficient, setShrinkageCoefficient] = useState<number>(0.08); // Default 8% for tangential oak approx

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Shrinkage logic: Wood only shrinks below the Fiber Saturation Point (FSP), usually ~30%.
  const fsp = 30;
  const startMC = Math.min(initialMC, fsp);
  const endMC = Math.min(finalMC, fsp);
  
  const mcChange = Math.max(0, startMC - endMC);
  
  // Total possible shrinkage if drying from FSP (30%) to 0% is given by the shrinkage coefficient.
  // So shrinkage per 1% MC drop = coefficient / FSP
  const shrinkagePercent = (mcChange * (shrinkageCoefficient)) / fsp;
  const dimensionalLoss = initialDimension * shrinkagePercent;
  const finalDimension = initialDimension - dimensionalLoss;

  return (
    <div className="space-y-12 px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex-1 w-full max-w-6xl mx-auto">
      {/* 1. Above the Fold (Immediate Access) */}
      <div className="border-b border-[#DCD3C7] pb-4 flex items-center gap-3">
        <div className="bg-[#F9F7F4] p-2 text-[#5A4633] border border-[#DCD3C7] rounded-sm shrink-0">
          <Scaling className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#42372E] tracking-tight">Wood Shrinkage Calculator</h1>
          <p className="text-[#5A4633] mt-1 text-sm sm:text-base">Predict tangential and radial shrinkage for lumber drying.</p>
        </div>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 bg-white border border-[#DCD3C7] p-5 sm:p-6 shadow-sm rounded-sm">
          <h2 className="text-base sm:text-lg font-bold mb-6 flex items-center gap-2 border-b border-[#DCD3C7] pb-2 text-[#42372E]">
            Shrinkage Parameters
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="shrinkageType" className="block text-sm font-bold text-[#42372E] mb-1">
                Shrinkage Type (Green to Oven-Dry)
              </label>
              <select
                id="shrinkageType"
                value={shrinkageCoefficient}
                onChange={(e) => setShrinkageCoefficient(parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent text-[#3D342C]"
              >
                <option value="0.08">Red Oak - Tangential (8.6%)</option>
                <option value="0.04">Red Oak - Radial (4.0%)</option>
                <option value="0.078">White Oak - Tangential (10.5%)</option>
                <option value="0.074">Hard Maple - Tangential (9.9%)</option>
                <option value="0.061">Douglas Fir - Tangential (7.6%)</option>
                <option value="0.048">Douglas Fir - Radial (4.8%)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="initialDimension" className="block text-sm font-bold text-[#42372E] mb-1">
                Initial Dimension (Width or Thickness)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="initialDimension"
                  min="0.1"
                  step="0.125"
                  value={initialDimension || ''}
                  onChange={(e) => setInitialDimension(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-20 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  INCHES
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="initialMC" className="block text-sm font-bold text-[#42372E] mb-1">
                Initial Moisture Content
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="initialMC"
                  min="0"
                  max="150"
                  step="1"
                  value={initialMC || ''}
                  onChange={(e) => setInitialMC(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-12 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  %
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="finalMC" className="block text-sm font-bold text-[#42372E] mb-1">
                Final Moisture Content
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="finalMC"
                  min="0"
                  max="30"
                  step="1"
                  value={finalMC || ''}
                  onChange={(e) => setFinalMC(parseFloat(e.target.value) || 0)}
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
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#8C7A6B] mb-4">Dimension Forecast</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[#DCD3C7] text-xs font-bold uppercase mb-1">Final Dimension</p>
                <div className="flex items-baseline gap-1 border-b border-white/10 pb-2">
                  <span className="text-3xl font-extrabold tracking-tight">{finalDimension.toFixed(2)}</span>
                  <span className="text-[#8C7A6B] text-sm">inches</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#DCD3C7] text-xs uppercase mb-1 opacity-80">Total Loss</p>
                  <p className="text-lg font-bold">{dimensionalLoss.toFixed(2)}"</p>
                </div>
                <div>
                  <p className="text-[#DCD3C7] text-xs uppercase mb-1 opacity-80">Shrinkage</p>
                  <p className="text-lg font-bold">{(shrinkagePercent * 100).toFixed(1)}%</p>
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
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Fiber Saturation Point:</strong> Wood only shrinks when moisture drops below the Fiber Saturation Point (FSP), which is approximately 30% for most species. Drying from 80% to 30% causes zero shrinkage.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Directional Shrinkage:</strong> Tangential shrinkage (across the growth rings) is typically twice as much as radial shrinkage (perpendicular to the rings).</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Linear Calculation:</strong> Shrinkage is assumed to be linear from FSP down to 0% MC (oven-dry).</span></li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Definitions & Assumptions</h3>
            <ul className="space-y-3 text-sm text-[#5A4633]">
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Tangential:</strong> Board widths on flatsawn lumber.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Radial:</strong> Board widths on quartersawn lumber, or thickness on flatsawn lumber.</span></li>
            </ul>
          </section>
        </div>

        {/* 4. Trust and Engagement Elements */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {[
                { q: "Why do flatsawn boards cup?", a: "Because tangential shrinkage (outside face) is greater than radial shrinkage (inside face), pulling the board into a cup shape as it dries." },
                { q: "Does wood shrink longitudinally (lengthwise)?", a: "Yes, but it is so minimal (typically 0.1% to 0.2%) that it is ignored for practical woodworking and framing." }
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
              <Link to="/tools/kiln-drying" className="block border border-[#DCD3C7] p-4 rounded-sm bg-white hover:border-[#5A4633] transition-colors group">
                <strong className="block text-[#42372E] group-hover:text-[#5A4633] transition-colors">Kiln Drying Time Estimator</strong>
                <span className="text-sm text-[#8C7A6B]">Estimate required kiln residence time.</span>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <div className="pt-8 border-t border-[#DCD3C7]">
          <CalculatorDisclaimer customText="Disclaimer: Shrinkage values are based on species averages. Individual boards can vary significantly based on growing conditions, tree age, and specific grain orientation." />
      </div>
    </div>
  );
}
