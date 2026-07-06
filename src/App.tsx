/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { BoardFootCalculator } from './pages/tools/BoardFootCalculator';
import { LogVolumeCalculator } from './pages/tools/LogVolumeCalculator';
import { LumberCostEstimator } from './pages/tools/LumberCostEstimator';
import { TimberYieldCalculator } from './pages/tools/TimberYieldCalculator';
import { KilnDryingEstimator } from './pages/tools/KilnDryingEstimator';
import { WoodShrinkageCalculator } from './pages/tools/WoodShrinkageCalculator';
import { WoodworkingPricing } from './pages/tools/WoodworkingPricing';
import { RoughCutPlanner } from './pages/tools/RoughCutPlanner';
import { Portfolio } from './pages/Portfolio';
import { Disclaimer } from './pages/Disclaimer';

// Fallback for tools without specific pages
function ToolPlaceholder() {
  return (
    <div className="w-full flex-1 p-6 md:p-8 flex items-center justify-center">
      <div className="bg-white border border-[#DCD3C7] border-dashed rounded-sm p-16 flex flex-col items-center justify-center w-full max-w-3xl">
        <h2 className="text-xl font-bold text-[#42372E] mb-2 font-serif italic">Module Offline</h2>
        <p className="text-[#8C7A6B] text-center max-w-sm mb-6 text-sm">
          This specific estimator module is currently pending integration into the compliance registry.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          
          {/* Tools */}
          <Route path="/tools/board-foot" element={<BoardFootCalculator />} />
          <Route path="/tools/log-volume" element={<LogVolumeCalculator />} />
          <Route path="/tools/lumber-cost" element={<LumberCostEstimator />} />
          <Route path="/tools/timber-yield" element={<TimberYieldCalculator />} />
          <Route path="/tools/kiln-drying" element={<KilnDryingEstimator />} />
          <Route path="/tools/wood-shrinkage" element={<WoodShrinkageCalculator />} />
          <Route path="/tools/project-pricing" element={<WoodworkingPricing />} />
          <Route path="/tools/rough-cut" element={<RoughCutPlanner />} />
          
          <Route path="/tools/*" element={<ToolPlaceholder />} />
        </Routes>
      </Layout>
    </Router>
  );
}
