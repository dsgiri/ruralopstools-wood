/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { About, Contact, Legal, License, DisclaimerPage } from './pages/StaticPages';
import { BoardFootCalculator } from './pages/tools/BoardFootCalculator';

import { Portfolio } from './pages/Portfolio';

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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/license" element={<License />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          
          {/* Tools */}
          <Route path="/tools/board-foot" element={<BoardFootCalculator />} />
          <Route path="/tools/*" element={<ToolPlaceholder />} />
        </Routes>
      </Layout>
    </Router>
  );
}
