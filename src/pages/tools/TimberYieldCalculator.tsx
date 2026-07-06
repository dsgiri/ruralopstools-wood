import { useState } from 'react';
import { Trees, Printer, ChevronDown } from 'lucide-react';
import { CalculatorDisclaimer } from '../../components/CalculatorDisclaimer';
import { Link } from 'react-router-dom';

export function TimberYieldCalculator() {
  const [acres, setAcres] = useState<number>(10);
  const [treesPerAcre, setTreesPerAcre] = useState<number>(50);
  const [avgVolumePerTree, setAvgVolumePerTree] = useState<number>(120);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const totalTrees = acres * treesPerAcre;
  const totalVolumeBf = totalTrees * avgVolumePerTree;
  const totalVolumeMbf = totalVolumeBf / 1000;

  return (
    <div className="space-y-12 px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex-1 w-full max-w-6xl mx-auto">
      {/* 1. Above the Fold (Immediate Access) */}
      <div className="border-b border-[#DCD3C7] pb-4 flex items-center gap-3">
        <div className="bg-[#F9F7F4] p-2 text-[#5A4633] border border-[#DCD3C7] rounded-sm shrink-0">
          <Trees className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#42372E] tracking-tight">Timber Yield Calculator</h1>
          <p className="text-[#5A4633] mt-1 text-sm sm:text-base">Forecast standing timber yield volume for your forest or woodlot.</p>
        </div>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 bg-white border border-[#DCD3C7] p-5 sm:p-6 shadow-sm rounded-sm">
          <h2 className="text-base sm:text-lg font-bold mb-6 flex items-center gap-2 border-b border-[#DCD3C7] pb-2 text-[#42372E]">
            Stand Data
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="acres" className="block text-sm font-bold text-[#42372E] mb-1">
                Total Forest Area
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="acres"
                  min="0.1"
                  step="0.1"
                  value={acres || ''}
                  onChange={(e) => setAcres(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-20 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  ACRES
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="treesPerAcre" className="block text-sm font-bold text-[#42372E] mb-1">
                Avg. Harvestable Trees / Acre
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="treesPerAcre"
                  min="1"
                  step="1"
                  value={treesPerAcre || ''}
                  onChange={(e) => setTreesPerAcre(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-16 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  TREES
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="avgVolumePerTree" className="block text-sm font-bold text-[#42372E] mb-1">
                Avg. Volume per Tree
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="avgVolumePerTree"
                  min="1"
                  step="1"
                  value={avgVolumePerTree || ''}
                  onChange={(e) => setAvgVolumePerTree(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-12 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  BF
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1" aria-live="polite">
          <div className="bg-[#3D342C] text-[#FAF7F2] p-5 sm:p-6 rounded-sm shadow-md sticky top-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#8C7A6B] mb-4">Yield Forecast</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[#DCD3C7] text-xs font-bold uppercase mb-1">Total Yield (MBF)</p>
                <div className="flex items-baseline gap-1 border-b border-white/10 pb-2">
                  <span className="text-3xl font-extrabold tracking-tight">{totalVolumeMbf.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                  <span className="text-[#8C7A6B] text-sm">MBF</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#DCD3C7] text-xs uppercase mb-1 opacity-80">Total Trees</p>
                  <p className="text-lg font-bold">{totalTrees.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[#DCD3C7] text-xs uppercase mb-1 opacity-80">Total BF</p>
                  <p className="text-lg font-bold">{totalVolumeBf.toLocaleString()}</p>
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
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Total Trees:</strong> Calculated by multiplying your acreage by the number of harvestable trees per acre.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Total Volume:</strong> Multiplies total trees by the average volume expected from each tree.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>MBF Conversion:</strong> 1 MBF equals 1,000 Board Feet. Timber is commonly sold by the MBF.</span></li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Definitions & Assumptions</h3>
            <ul className="space-y-3 text-sm text-[#5A4633]">
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>MBF:</strong> Thousand Board Feet. The standard unit of measurement for bulk timber sales.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Harvestable Trees:</strong> Only include trees that meet the minimum diameter and species requirements for your planned harvest.</span></li>
            </ul>
          </section>
        </div>

        {/* 4. Trust and Engagement Elements */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {[
                { q: "How do I determine average volume per tree?", a: "This requires timber cruising. You measure the diameter (DBH) and merchantable height of sample trees, then use a log volume table to estimate board feet per tree." },
                { q: "Is this the exact amount I will be paid for?", a: "No. Standing yield is an estimate. The mill will scale (measure) the delivered logs and apply deductions for defect, rot, or sweep." }
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
              <Link to="/tools/log-volume" className="block border border-[#DCD3C7] p-4 rounded-sm bg-white hover:border-[#5A4633] transition-colors group">
                <strong className="block text-[#42372E] group-hover:text-[#5A4633] transition-colors">Log Volume Calculator</strong>
                <span className="text-sm text-[#8C7A6B]">Calculate volume of individual harvested logs.</span>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <div className="pt-8 border-t border-[#DCD3C7]">
          <CalculatorDisclaimer customText="Disclaimer: Standing timber yield is an estimate based on averages and sampling. Actual harvest yield will vary. We strongly recommend consulting a professional forester before conducting a timber sale." />
      </div>
    </div>
  );
}
