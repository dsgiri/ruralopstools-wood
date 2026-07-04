import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { useFavorites } from '../hooks/use-favorites';

export function Home() {
  const { favorites, toggleFavorite } = useFavorites();
  const favoriteTools = TOOLS.filter(t => favorites.includes(t.id));

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Header matching design */}
      <header className="bg-white px-6 md:px-8 py-6 md:py-10 border-b border-[#DCD3C7] shrink-0">
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-serif italic text-[#42372E] mb-2 leading-tight">Lumber & Timber Resource Hub</h1>
          <p className="text-sm sm:text-base text-[#8C7A6B] max-w-2xl leading-relaxed">
            Professional-grade calculators for sawyers, woodworkers, and timber owners. 
            Part of the <span className="font-semibold text-[#5A4633]">Rural Utility Cost</span> ecosystem.
          </p>
        </div>
      </header>
      
      <div className="flex flex-1 md:flex-row flex-col border-b border-[#DCD3C7]">
        {/* Main Section */}
        <section className="flex-1 p-4 sm:p-6 md:p-8 order-2 md:order-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#8C7A6B]">Featured Tools</h2>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-2 sm:px-2 sm:py-1 bg-[#E8E0D5] rounded text-[10px] sm:text-xs font-bold text-[#3D342C] min-h-[44px] sm:min-h-auto">ALL TOOLS</button>
              <button className="px-3 py-2 sm:px-2 sm:py-1 hover:bg-[#E8E0D5] rounded text-[10px] sm:text-xs font-bold cursor-pointer transition-colors text-[#8C7A6B] hover:text-[#3D342C] min-h-[44px] sm:min-h-auto">CALCULATORS</button>
              <button className="px-3 py-2 sm:px-2 sm:py-1 hover:bg-[#E8E0D5] rounded text-[10px] sm:text-xs font-bold cursor-pointer transition-colors text-[#8C7A6B] hover:text-[#3D342C] min-h-[44px] sm:min-h-auto">PLANNING</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Aside / Favorites */}
        <aside className="w-full md:w-80 lg:w-96 bg-[#F9F7F4] md:border-l border-b md:border-b-0 border-[#DCD3C7] p-6 flex flex-col gap-6 order-1 md:order-2">
          <div className="flex-1">
             <h2 className="text-xs font-black uppercase tracking-widest text-[#8C7A6B] mb-4 flex items-center gap-2">
               <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
               My Favorites
             </h2>
             <div className="space-y-3">
                {favoriteTools.length > 0 ? favoriteTools.map((t) => (
                  <div key={t.id} className="p-3 bg-white border border-[#DCD3C7] rounded text-sm sm:text-xs flex justify-between items-center group shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-h-[48px] sm:min-h-auto">
                     <span className="font-semibold text-[#42372E] truncate pr-2">{t.title}</span>
                     <button onClick={() => toggleFavorite(t.id)} className="text-[#DCD3C7] hover:text-red-400 cursor-pointer text-lg leading-none shrink-0 ml-2 p-1 focus:outline-none focus:text-red-400" aria-label={`Remove ${t.title} from favorites`}>
                        &times;
                     </button>
                  </div>
                )) : (
                  <div className="p-4 border border-dashed border-[#DCD3C7] rounded text-xs sm:text-[10px] text-center text-[#8C7A6B] uppercase tracking-widest min-h-[48px] flex items-center justify-center bg-white/50">
                    Click heart to add
                  </div>
                )}
             </div>
          </div>
          
          <div className="bg-[#5A4633] text-white rounded-xl p-5 mt-auto">
            <h4 className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Pro Tip</h4>
            <p className="text-sm sm:text-xs leading-relaxed">
              Rough-cut lumber contains higher moisture. Use the <strong>Shrinkage Estimator</strong> before final jointing to ensure project stability.
            </p>
            <button className="inline-block mt-4 text-xs sm:text-[10px] font-bold underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white p-1 -m-1 rounded-sm">View Documentation</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
