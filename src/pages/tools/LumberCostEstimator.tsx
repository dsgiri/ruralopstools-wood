import { useState } from 'react';
import { CircleDollarSign, Printer, ChevronDown } from 'lucide-react';
import { CalculatorDisclaimer } from '../../components/CalculatorDisclaimer';
import { Link } from 'react-router-dom';

export function LumberCostEstimator() {
  const [boardFeet, setBoardFeet] = useState<number>(100);
  const [pricePerBf, setPricePerBf] = useState<number>(4.50);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [wasteFactor, setWasteFactor] = useState<number>(15);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const totalBoardFeetNeeded = boardFeet * (1 + wasteFactor / 100);
  const subtotal = totalBoardFeetNeeded * pricePerBf;
  const tax = subtotal * (taxRate / 100);
  const totalCost = subtotal + tax + shippingCost;
  const costPerUsableBf = totalCost / (boardFeet || 1);

  return (
    <div className="space-y-12 px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex-1 w-full max-w-6xl mx-auto">
      {/* 1. Above the Fold (Immediate Access) */}
      <div className="border-b border-[#DCD3C7] pb-4 flex items-center gap-3">
        <div className="bg-[#F9F7F4] p-2 text-[#5A4633] border border-[#DCD3C7] rounded-sm shrink-0">
          <CircleDollarSign className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#42372E] tracking-tight">Lumber Cost Estimator</h1>
          <p className="text-[#5A4633] mt-1 text-sm sm:text-base">Calculate total lumber project costs including waste, tax, and delivery.</p>
        </div>
      </div>

      {/* 2. The Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 bg-white border border-[#DCD3C7] p-5 sm:p-6 shadow-sm rounded-sm">
          <h2 className="text-base sm:text-lg font-bold mb-6 flex items-center gap-2 border-b border-[#DCD3C7] pb-2 text-[#42372E]">
            Cost Parameters
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="boardFeet" className="block text-sm font-bold text-[#42372E] mb-1">
                Required Usable Board Feet
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="boardFeet"
                  min="1"
                  step="0.1"
                  value={boardFeet || ''}
                  onChange={(e) => setBoardFeet(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-12 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  BF
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="wasteFactor" className="block text-sm font-bold text-[#42372E] mb-1">
                Waste/Overage Factor
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="wasteFactor"
                  min="0"
                  step="1"
                  value={wasteFactor || ''}
                  onChange={(e) => setWasteFactor(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-12 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  %
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="pricePerBf" className="block text-sm font-bold text-[#42372E] mb-1">
                Price per Board Foot
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center px-3 text-[#8C7A6B] font-bold">
                  $
                </div>
                <input
                  type="number"
                  id="pricePerBf"
                  min="0"
                  step="0.01"
                  value={pricePerBf || ''}
                  onChange={(e) => setPricePerBf(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="taxRate" className="block text-sm font-bold text-[#42372E] mb-1">
                Sales Tax Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="taxRate"
                  min="0"
                  step="0.1"
                  value={taxRate || ''}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  className="w-full pl-3 pr-12 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8C7A6B] bg-[#E8E0D5] border-l border-[#DCD3C7] rounded-r-sm text-xs font-bold">
                  %
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="shippingCost" className="block text-sm font-bold text-[#42372E] mb-1">
                Shipping & Delivery Fee
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center px-3 text-[#8C7A6B] font-bold">
                  $
                </div>
                <input
                  type="number"
                  id="shippingCost"
                  min="0"
                  step="1"
                  value={shippingCost || ''}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 bg-[#F9F7F4] border border-[#DCD3C7] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5A4633] focus:border-transparent transition-shadow text-[#3D342C]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1" aria-live="polite">
          <div className="bg-[#3D342C] text-[#FAF7F2] p-5 sm:p-6 rounded-sm shadow-md sticky top-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#8C7A6B] mb-4">Total Cost Estimate</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[#DCD3C7] text-xs font-bold uppercase mb-1">Total Project Cost</p>
                <div className="flex items-baseline gap-1 border-b border-white/10 pb-2">
                  <span className="text-3xl font-extrabold tracking-tight">${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#DCD3C7] text-xs uppercase mb-1 opacity-80">True Cost / BF</p>
                  <p className="text-lg font-bold">${costPerUsableBf.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[#DCD3C7] text-xs uppercase mb-1 opacity-80">Buy Quantity</p>
                  <p className="text-lg font-bold">{totalBoardFeetNeeded.toFixed(1)} BF</p>
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
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Overage Calculation:</strong> First, calculates the total board feet to purchase by adding your waste percentage.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Subtotal:</strong> Multiplies the purchase quantity by the unit price.</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>True Cost / BF:</strong> Shows you how much each <em>usable</em> board foot really costs you after factoring in waste, tax, and delivery.</span></li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Definitions & Assumptions</h3>
            <ul className="space-y-3 text-sm text-[#5A4633]">
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>Waste Factor:</strong> 15% is standard for rough lumber (accounts for knots, checks, and squaring edges).</span></li>
              <li className="flex gap-2"><span className="font-bold shrink-0">•</span><span><strong>True Cost:</strong> Useful for pricing your final woodworking products correctly.</span></li>
            </ul>
          </section>
        </div>

        {/* 4. Trust and Engagement Elements */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold text-[#42372E] mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {[
                { q: "Why should I add a waste factor?", a: "Lumber is rarely perfect. You will lose material to saw kerfs, squaring ends, routing edges, and cutting around defects like knots or splits." },
                { q: "What waste percentage is normal?", a: "For pre-surfaced (S4S) lumber, 10% is typical. For rough-sawn lumber, use 15-20%. For highly defective or figured woods, 30% or more may be required." }
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
              <Link to="/tools/project-pricing" className="block border border-[#DCD3C7] p-4 rounded-sm bg-white hover:border-[#5A4633] transition-colors group">
                <strong className="block text-[#42372E] group-hover:text-[#5A4633] transition-colors">Woodworking Project Pricing</strong>
                <span className="text-sm text-[#8C7A6B]">Price your final built products accurately.</span>
              </Link>
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
