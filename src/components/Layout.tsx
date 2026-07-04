import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { ShieldCheck, HardHat, FileText, Anchor } from 'lucide-react';
import { FOOTER_LINKS } from '../config/footerLinks';

const NAV_LINKS = [
  { path: '/plan', label: 'Plan', isExternal: true },
  { path: '/forecast', label: 'Forecast', isExternal: true },
  { path: '/what-if', label: 'What If', isExternal: true },
  { path: '/predictor', label: 'Predictor', isExternal: true },
  { path: '/favorites', label: 'My favorites' },
];

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3D342C] flex flex-col font-sans selection:bg-[#E8E0D5]">
      {/* Top Navigation */}
      <nav className="bg-[#F2ECE4] border-b border-[#DCD3C7] px-6 py-3 flex flex-wrap gap-4 justify-between items-center shrink-0">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-[#5A4633] rounded flex items-center justify-center shrink-0">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
          <div className="truncate">
            <span className="font-bold text-sm tracking-tight text-[#5A4633]">RURAL UTILITY COST</span>
            <span className="mx-2 text-[#DCD3C7]">|</span>
            <span className="font-semibold text-sm uppercase tracking-widest text-[#8C7A6B]">Wood</span>
          </div>
        </Link>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-bold uppercase tracking-wider text-[#6D5F52]">
          {NAV_LINKS.map((link, idx) => {
            const isActive = location.pathname === link.path && !link.isExternal;
            return link.isExternal ? (
              <a
                key={idx}
                href={link.path}
                className="hover:text-[#5A4633] transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={idx}
                to={link.path}
                className={cn(
                  "transition-colors",
                  isActive
                    ? "text-[#5A4633] border-b-2 border-[#5A4633] pb-1"
                    : "hover:text-[#5A4633]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Content Injection Area */}
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      {/* Universal Footer */}
      <footer className="bg-[#3D342C] text-[#DCD3C7] p-4 lg:px-8 flex flex-col md:flex-row justify-between items-center shrink-0 gap-4">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[10px] font-bold uppercase tracking-widest">
          {FOOTER_LINKS.map((link, idx) => (
            link.path.startsWith('http') ? (
              <a
                key={idx}
                href={link.path}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={idx}
                to={link.path}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
        <div className="text-[10px] italic opacity-80 text-center md:text-right max-w-sm ml-auto text-[#8C7A6B]">
          <span className="block mb-1">Disclaimer: These figures are estimates. This tool does not replace professional advice. We disclaim all liability. <Link to="/disclaimer" className="underline hover:text-white transition-colors">Read Full Disclaimer</Link>.</span>
          &copy; {new Date().getFullYear()} Rural Utility Cost
        </div>
      </footer>
    </div>
  );
}
