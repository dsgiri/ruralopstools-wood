import { useState } from 'react';
import { Calculator, Printer, ChevronDown } from 'lucide-react';
import { CalculatorDisclaimer } from '../../components/CalculatorDisclaimer';
import { Link } from 'react-router-dom';

export function WoodworkingPricing() {
  const [materialCost, setMaterialCost] = useState<number>(150);
  const [laborHours, setLaborHours] = useState<number>(10);
  const [hourlyRate, setHourlyRate] = useState<number>(45);
  const [overheadMarkup, setOverheadMarkup] = useState<number>(15);
  const [profitMargin, setProfitMargin] = useState<number>(20);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const totalLabor = laborHours * hourlyRate;
  const baseCost = materialCost + totalLabor;
  const overheadAmount = baseCost * (overheadMarkup / 100);
  const breakEven = baseCost + overheadAmount;
  
  // To achieve target profit margin: Price = Cost / (1 - Margin)
  const suggestedPrice = breakEven / (1 - (profitMargin / 100));
  const profitAmount = suggestedPrice - breakEven;

  return (
    <div className="space-y-12 px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex-1 w-full max-w-6xl mx-auto">
      {/* 1. Above the Fold (Immediate Access) */}
      <div className="border-b border-[#DCD3C7] pb-4 flex items-center gap-3">
        <div className="bg-[#F9F7F4] p-2 text-[#5A4633] border border-[#DCD3C7] rounded-sm shrink-0">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#42372E] tracking-tight">Woodworking Project Pricing</h1>
          <p className="text-[#5A4633] mt-1 text-sm sm:text-base">Estimate bespoke project quotes integrating labor, material, and facility overhead data.</p>
        </div>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 bg-white border border-[#DCD3C7] p-5 sm:p-6 shadow-sm rounded-sm">
          <h2 className="text-base sm:text-lg font-bold mb-6 flex items-center gap-2 border-b border-[#DCD3C7] pb-2 text-[#42372E]">
            Cost Inputs
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="materialCost" className="block text-sm font-bold text-[#42372E] mb-1">
                Total Material Costs (incl. waste)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center px-3 text-[#8C7A6B] font-bold">
                  $
                </div>
                <input
                  type="number"
                  id="materialCost"
                  min="0"
                  step="1"
                  value={materialCost || ''}
                  onChange={(e) => setMaterialCost(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:col-span-2">
              <div>
                <label htmlFor="laborHours" className="block text-sm font-bold text-[#42372E] mb-1">
                  Est. Labor Hours
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="laborHours"
                    min="0"
                    step="0.5"
                    value={laborHours || ''}
                    onChange={(e) => setLaborHours(parseFloat(e.target.value) || 0)}
                    className="w-full pl-3 pr-12 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                    HRS
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="hourlyRate" className="block text-sm font-bold text-[#42372E] mb-1">
                  Shop Hourly Rate
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center px-3 text-[#8C7A6B] font-bold">
                    $
                  </div>
                  <input
                    type="number"
                    id="hourlyRate"
                    min="0"
                    step="1"
                    value={hourlyRate || ''}
                    onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="overheadMarkup" className="block text-sm font-bold text-[#42372E] mb-1">
                Shop Overhead Markup
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="overheadMarkup"
                  min="0"
                  step="1"
                  value={overheadMarkup || ''}
                  onChange={(e) => setOverheadMarkup(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-12 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  %
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="profitMargin" className="block text-sm font-bold text-[#42372E] mb-1">
                Target Profit Margin
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="profitMargin"
                  min="0"
                  max="99"
                  step="1"
                  value={profitMargin || ''}
                  onChange={(e) => setProfitMargin(parseFloat(e.target.value) || 0)}
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
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#8C7A6B] mb-4">Quote Summary</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[#DCD3C7] text-xs font-bold uppercase mb-1">Suggested Retail Price</p>
                <div className="flex items-baseline gap-1 border-b border-white/10 pb-2">
                  <span className="text-3xl font-extrabold tracking-tight">${suggestedPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#DCD3C7] text-xs uppercase mb-1 opacity-80">Break Even</p>
                  <p className="text-lg font-bold">${breakEven.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
                <div>
                  <p className="text-[#DCD3C7] text-xs uppercase mb-1 opacity-80">Net Profit</p>
                  <p className="text-lg font-bold">${profitAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
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
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Base Cost:</strong> Calculates direct costs (Materials + Direct Labor).</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Overhead:</strong> Adds a percentage to the base cost to cover shop rent, electricity, tools, and insurance. This creates your Break Even point.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Target Margin:</strong> Uses a true margin calculation (Price = Cost / (1 - Margin)) rather than a simple markup, ensuring you actually keep your target percentage of the final sale price.</span></li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Definitions & Assumptions</h3>
            <ul className="space-y-3 text-sm text-[#5A4633]">
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Labor Rate:</strong> This should be the wage paid to the builder (even if it's you) plus employment taxes. It is NOT profit.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Profit:</strong> The money left over to reinvest in the business, buy new machinery, or save for lean times.</span></li>
            </ul>
          </section>
        </div>

        {/* 4. Trust and Engagement Elements */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {[
                { q: "What's the difference between markup and margin?", a: "Markup is a percentage added to your costs. Margin is the percentage of the final price that is profit. A 50% markup on a $100 cost equals a $150 price. A 50% margin on a $100 cost requires a $200 price." },
                { q: "What should my hourly rate be?", a: "Your hourly rate should reflect your skill level, local market rates for custom work, and whether you are covering payroll taxes and benefits." }
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
              <Link to="/tools/lumber-cost" className="block border border-[#DCD3C7] p-4 rounded-sm bg-white hover:border-[#5A4633] transition-colors group">
                <strong className="block text-[#42372E] group-hover:text-[#5A4633] transition-colors">Lumber Cost Estimator</strong>
                <span className="text-sm text-[#8C7A6B]">Calculate material costs before pricing.</span>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <div className="pt-8 border-t border-[#DCD3C7]">
          <CalculatorDisclaimer customText="Disclaimer: Pricing structures vary wildly by geographic region, skill level, and clientele. This tool provides a mathematical framework for quoting, but you must ensure your inputs reflect your actual business economics." />
      </div>
    </div>
  );
}
