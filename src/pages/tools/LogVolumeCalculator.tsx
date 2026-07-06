import { useState } from 'react';
import { TreePine, Printer, ChevronDown } from 'lucide-react';
import { CalculatorDisclaimer } from '../../components/CalculatorDisclaimer';
import { Link } from 'react-router-dom';

export function LogVolumeCalculator() {
  const [diameter, setDiameter] = useState<number>(16);
  const [length, setLength] = useState<number>(16);
  const [quantity, setQuantity] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Doyle Rule: ((D - 4) / 4)^2 * L
  const doyleVolume = Math.max(0, Math.pow((diameter - 4) / 4, 2) * length) * quantity;
  
  // Scribner Decimal C approximation: (0.79 * D^2 - 2 * D - 4) * (L/16)
  const scribnerVolume = Math.max(0, (0.79 * Math.pow(diameter, 2) - 2 * diameter - 4) * (length / 16)) * quantity;
  
  // International 1/4" approximation: (0.22 * D^2 - 0.71 * D) * (L/4)
  const internationalVolume = Math.max(0, (0.22 * Math.pow(diameter, 2) - 0.71 * diameter) * (length / 4)) * quantity;

  return (
    <div className="space-y-12 px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex-1 w-full max-w-6xl mx-auto">
      {/* 1. Above the Fold (Immediate Access) */}
      <div className="border-b border-[#DCD3C7] pb-4 flex items-center gap-3">
        <div className="bg-[#F9F7F4] p-2 text-[#5A4633] border border-[#DCD3C7] rounded-sm shrink-0">
          <TreePine className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#42372E] tracking-tight">Log Volume Calculator</h1>
          <p className="text-[#5A4633] mt-1 text-sm sm:text-base">Estimate usable log volume using Scribner, Doyle, and International 1/4" rules.</p>
        </div>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 bg-white border border-[#DCD3C7] p-5 sm:p-6 shadow-sm rounded-sm">
          <h2 className="text-base sm:text-lg font-bold mb-6 flex items-center gap-2 border-b border-[#DCD3C7] pb-2 text-[#42372E]">
            Log Specifications
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="diameter" className="block text-sm font-bold text-[#42372E] mb-1">
                Small-End Diameter (inside bark)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="diameter"
                  min="5"
                  step="1"
                  value={diameter || ''}
                  onChange={(e) => setDiameter(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-16 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  INCHES
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="length" className="block text-sm font-bold text-[#42372E] mb-1">
                Log Length
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="length"
                  min="8"
                  step="1"
                  value={length || ''}
                  onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-12 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  FEET
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="quantity" className="block text-sm font-bold text-[#42372E] mb-1">
                Quantity of Identical Logs
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                step="1"
                value={quantity || ''}
                onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1" aria-live="polite">
          <div className="bg-[#3D342C] text-[#FAF7F2] p-5 sm:p-6 rounded-sm shadow-md sticky top-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#8C7A6B] mb-4">Volume Estimates (BF)</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[#DCD3C7] text-xs font-bold uppercase mb-1">International 1/4" Rule</p>
                <div className="flex items-baseline gap-1 border-b border-white/10 pb-2">
                  <span className="text-3xl font-extrabold tracking-tight">{internationalVolume.toFixed(0)}</span>
                  <span className="text-[#8C7A6B] text-sm">BF</span>
                </div>
              </div>
              
              <div>
                <p className="text-[#DCD3C7] text-xs font-bold uppercase mb-1">Scribner Rule</p>
                <div className="flex items-baseline gap-1 border-b border-white/10 pb-2">
                  <span className="text-2xl font-bold tracking-tight">{scribnerVolume.toFixed(0)}</span>
                  <span className="text-[#8C7A6B] text-sm">BF</span>
                </div>
              </div>

              <div>
                <p className="text-[#DCD3C7] text-xs font-bold uppercase mb-1">Doyle Rule</p>
                <div className="flex items-baseline gap-1 border-b border-white/10 pb-2">
                  <span className="text-2xl font-bold tracking-tight">{doyleVolume.toFixed(0)}</span>
                  <span className="text-[#8C7A6B] text-sm">BF</span>
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
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>International 1/4":</strong> Highly accurate rule accounting for 1/4" kerf and 1/2" taper per 4 feet of log. Best for modern sawmills.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Scribner:</strong> Based on diagrams of circles. Underestimates small logs, often used in the western US.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Doyle:</strong> Formula-based rule heavily underestimating small logs and overestimating very large logs. Common in the southern and eastern US.</span></li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Definitions & Assumptions</h3>
            <ul className="space-y-3 text-sm text-[#5A4633]">
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Board Foot (BF):</strong> A unit of lumber volume equal to 144 cubic inches.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Small-End Diameter:</strong> Always measure the diameter inside the bark at the smallest end of the log.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Formula Approximations:</strong> These are mathematical approximations of traditional tables. Official scale may vary based on exact log defects and taper.</span></li>
            </ul>
          </section>
        </div>

        {/* 4. Trust and Engagement Elements */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {[
                { q: "Which log rule should I use?", a: "The International 1/4\" rule is considered the most accurate. However, the rule to use often depends on your local geographic region and the agreement with your buyer or mill." },
                { q: "Do these estimates account for log defects?", a: "No. These estimates assume a perfectly sound, straight log. A certified log scaler will deduct volume for rot, sweep, or crook." },
                { q: "Why do the three rules give different answers?", a: "They were created at different times using different assumptions about sawmill kerf (blade thickness), milling practices, and mathematics. Doyle is notoriously inaccurate for small logs." }
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
              <Link to="/tools/board-foot" className="block border border-[#DCD3C7] p-4 rounded-sm bg-white hover:border-[#5A4633] transition-colors group">
                <strong className="block text-[#42372E] group-hover:text-[#5A4633] transition-colors">Board Foot Calculator</strong>
                <span className="text-sm text-[#8C7A6B]">Calculate volume for milled lumber.</span>
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
          <CalculatorDisclaimer customText="Disclaimer: Log rules are mathematical estimates. Actual sawmill yield will vary based on equipment kerf, sawyer skill, and log defects. Always rely on a certified log scaler for commercial transactions." />
      </div>
    </div>
  );
}
