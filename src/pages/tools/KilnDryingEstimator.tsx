import { useState } from 'react';
import { ThermometerSun, Printer, ChevronDown } from 'lucide-react';
import { CalculatorDisclaimer } from '../../components/CalculatorDisclaimer';
import { Link } from 'react-router-dom';

export function KilnDryingEstimator() {
  const [thickness, setThickness] = useState<number>(1);
  const [initialMC, setInitialMC] = useState<number>(45);
  const [targetMC, setTargetMC] = useState<number>(8);
  const [speciesFactor, setSpeciesFactor] = useState<number>(1.5); // Default to medium hardwood

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Rough estimation logic:
  // Base time per inch of thickness for the moisture drop.
  // Generally, drying gets slower as it gets drier.
  const dropRequired = Math.max(0, initialMC - targetMC);
  // Base estimate: days per % drop per inch thickness * species factor
  const baseDaysPerPercentDrop = 0.5; 
  const totalDays = dropRequired * baseDaysPerPercentDrop * Math.pow(thickness, 1.5) * speciesFactor;
  
  // Safe limit minimums
  const estimatedDays = Math.max(1, totalDays);

  return (
    <div className="space-y-12 px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex-1 w-full max-w-6xl mx-auto">
      {/* 1. Above the Fold (Immediate Access) */}
      <div className="border-b border-[#DCD3C7] pb-4 flex items-center gap-3">
        <div className="bg-[#F9F7F4] p-2 text-[#5A4633] border border-[#DCD3C7] rounded-sm shrink-0">
          <ThermometerSun className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#42372E] tracking-tight">Kiln Drying Time Estimator</h1>
          <p className="text-[#5A4633] mt-1 text-sm sm:text-base">Estimate required kiln residence time to reach prescribed moisture thresholds.</p>
        </div>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 bg-white border border-[#DCD3C7] p-5 sm:p-6 shadow-sm rounded-sm">
          <h2 className="text-base sm:text-lg font-bold mb-6 flex items-center gap-2 border-b border-[#DCD3C7] pb-2 text-[#42372E]">
            Lumber Profile
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="species" className="block text-sm font-bold text-[#42372E] mb-1">
                Wood Species Category
              </label>
              <select
                id="species"
                value={speciesFactor}
                onChange={(e) => setSpeciesFactor(parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent text-[#3D342C]"
              >
                <option value="0.8">Softwood (e.g. Pine, Fir)</option>
                <option value="1.2">Fast-Drying Hardwood (e.g. Poplar, Soft Maple)</option>
                <option value="1.5">Medium Hardwood (e.g. Cherry, Walnut, Ash)</option>
                <option value="2.5">Slow-Drying Hardwood (e.g. Oak, Hickory)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="thickness" className="block text-sm font-bold text-[#42372E] mb-1">
                Lumber Thickness
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="thickness"
                  min="0.5"
                  step="0.25"
                  value={thickness || ''}
                  onChange={(e) => setThickness(parseFloat(e.target.value) || 0)}
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
                  max="100"
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
              <label htmlFor="targetMC" className="block text-sm font-bold text-[#42372E] mb-1">
                Target Moisture Content
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="targetMC"
                  min="0"
                  max="100"
                  step="1"
                  value={targetMC || ''}
                  onChange={(e) => setTargetMC(parseFloat(e.target.value) || 0)}
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
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#8C7A6B] mb-4">Drying Estimate</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[#DCD3C7] text-xs font-bold uppercase mb-1">Est. Kiln Time</p>
                <div className="flex items-baseline gap-1 border-b border-white/10 pb-2">
                  <span className="text-4xl font-extrabold tracking-tight">{estimatedDays.toFixed(0)}</span>
                  <span className="text-[#8C7A6B] text-sm">Days</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#DCD3C7] text-xs uppercase mb-1 opacity-80">MC Drop</p>
                  <p className="text-lg font-bold">{dropRequired.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-[#DCD3C7] text-xs uppercase mb-1 opacity-80">Speed Factor</p>
                  <p className="text-lg font-bold">{(speciesFactor).toFixed(1)}x</p>
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
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Species Factor:</strong> Hardwoods dry significantly slower than softwoods. Refractory woods like Oak require very slow drying to prevent checking.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Thickness Exponent:</strong> Drying time increases exponentially (not linearly) with wood thickness. 8/4 lumber takes much more than twice as long as 4/4 lumber.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Moisture Range:</strong> The model considers the total percentage points of moisture that must be removed.</span></li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Definitions & Assumptions</h3>
            <ul className="space-y-3 text-sm text-[#5A4633]">
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Target MC:</strong> 6-8% is standard for interior furniture. 12-15% is typical for exterior construction.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Conventional Kilns:</strong> This estimator assumes a standard dehumidification or conventional steam kiln. Vacuum or RF kilns will be drastically faster.</span></li>
            </ul>
          </section>
        </div>

        {/* 4. Trust and Engagement Elements */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {[
                { q: "Can I speed up the drying process?", a: "Trying to dry wood faster than its safe drying rate will cause severe defects like honeycombing, surface checks, and case hardening." },
                { q: "Should I air dry first?", a: "Air drying lumber to 20-30% MC before putting it in a kiln is highly recommended to save energy and kiln time, especially for slow-drying hardwoods." }
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
                <span className="text-sm text-[#8C7A6B]">Estimate dimensional changes during drying.</span>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <div className="pt-8 border-t border-[#DCD3C7]">
          <CalculatorDisclaimer customText="Disclaimer: Drying time estimates are generalizations. Kiln schedules must be tailored to the specific load, kiln type, and lumber condition to prevent catastrophic wood degradation. Monitor moisture levels daily." />
      </div>
    </div>
  );
}
