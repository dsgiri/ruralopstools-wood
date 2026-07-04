import { Link } from 'react-router-dom';
import { getGroupedPortfolio } from '../data/parse-portfolio';
import { Grid, ChevronRight, Anchor } from 'lucide-react';

export function Portfolio() {
  const categories = getGroupedPortfolio();

  return (
    <div className="flex flex-col flex-1 h-full w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs font-bold uppercase tracking-widest text-[#8C7A6B] flex items-center gap-2">
        <Link to="/" className="hover:text-[#5A4633] transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" aria-hidden="true" />
        <span className="text-[#3D342C]" aria-current="page">Network Portfolio</span>
      </nav>

      {/* Header */}
      <header className="border-b border-[#DCD3C7] pb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-[#F9F7F4] p-2 text-[#5A4633] border border-[#DCD3C7] rounded-sm shrink-0">
            <Grid className="w-6 h-6" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#42372E] tracking-tight font-serif italic">
            Ecosystem Portfolio
          </h1>
        </div>
        <p className="text-sm sm:text-base text-[#8C7A6B] max-w-3xl leading-relaxed mt-4">
          The Rural Utility Cost sub-domain network provides localized, specialized calculation tools across operations, predictive modeling, agronomy, and infrastructure. Browse the complete collection of active ecosystem hubs below.
        </p>
      </header>

      {/* Intro section */}
      <section className="bg-white border text-sm border-[#DCD3C7] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] rounded-sm text-[#42372E] mb-8">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-3">
          <Anchor className="w-5 h-5 text-[#5A4633]" aria-hidden="true" />
          Master Hub & Ecosystem Overview
        </h2>
        <p className="leading-relaxed">
          While each module (like this Wood Hub) serves a specific agricultural or rural function, all data models adhere to the central <a href="https://ruralutilitycost.com" className="font-bold underline hover:text-[#5A4633] transition-colors text-[#5A4633]" target="_blank" rel="noopener noreferrer">Rural Utility Cost platform</a> standards. Navigate to the relevant sub-domain to find decision-support tools tailored for your operational requirements.
        </p>
      </section>

      {/* Portfolio Grid */}
      <div className="space-y-12 pb-12">
        {categories.map((category, index) => (
          <section key={category.title} aria-labelledby={`category-${index}`}>
            <h2 
              id={`category-${index}`} 
              className="text-xl font-bold text-[#42372E] mb-6 pb-2 border-b-2 border-[#E8E0D5]"
            >
              {category.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {category.sites.map((site) => (
                <div 
                  key={site.name} 
                  className="bg-white border border-[#DCD3C7] rounded-sm p-5 hover:shadow-md hover:border-[#8C7A6B] transition-all flex flex-col group h-full focus-within:ring-2 focus-within:ring-[#5A4633]"
                >
                  <h3 className="font-bold text-[#42372E] text-lg mb-2 leading-tight">
                    <a 
                      href={site.url}
                      className="focus:outline-none before:absolute before:inset-0 relative z-10 group-hover:text-[#5A4633] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {site.name}
                    </a>
                  </h3>
                  <p className="text-sm text-[#8C7A6B] leading-relaxed flex-1">
                    {site.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between items-center text-[#5A4633]">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 border border-[#DCD3C7] px-2 py-0.5 bg-[#F9F7F4] rounded-sm">
                      {new URL(site.url).hostname.replace('.ruralutilitycost.com', '') === 'ruralutilitycost' ? 'Platform' : new URL(site.url).hostname.replace('.ruralutilitycost.com', '')}
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
