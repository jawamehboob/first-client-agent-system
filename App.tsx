import React from 'react';
import MarketNeeds from './components/MarketNeeds';
import TrojanHorse from './components/TrojanHorse';
import Scanner from './components/Scanner';
import { 
  OutboundArchitect, 
  CodeWizard, 
  TechXRay, 
  InboundMagnet, 
  ProposalArchitect, 
  DeliverySuite 
} from './components/Generators';
import AiStudio from './components/AiStudio';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  special?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, special = false }) => (
  <a 
    href={href} 
    className={`${special 
      ? 'text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-full transition-colors' 
      : 'hover:text-orange-600 transition-colors'
    }`}
  >
    {children}
  </a>
);

function App() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center text-white font-bold">N</div>
            <h1 className="text-xl font-bold tracking-tight text-stone-900">Agentic Strategy <span className="text-stone-400 font-light">| Protocol 4.0</span></h1>
          </div>
          <nav className="hidden md:flex gap-4 text-xs font-medium text-stone-500 uppercase tracking-wide">
            <NavLink href="#scanner">Scanner</NavLink>
            <NavLink href="#code-wizard">Wizard ✨</NavLink>
            <NavLink href="#proposal">Proposals ✨</NavLink>
            <NavLink href="#delivery">Delivery ✨</NavLink>
            <NavLink href="#strategist" special>AI Fuel 💎</NavLink>
          </nav>
          <div className="text-xs font-mono bg-stone-100 px-2 py-1 rounded text-stone-500">v4.0 Loaded</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Intro */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-medium uppercase tracking-wide">
            Objective: First High-Ticket Client
          </div>
          <h2 className="text-4xl font-extrabold text-stone-900 tracking-tight sm:text-5xl">
            The n8n First Client Protocol
          </h2>
          <p className="text-lg text-stone-600">
            A strategic synthesis of industry research, focusing on high-value "Agentic Process Automation" (APA) to bridge the gap between simple Zapier tasks and custom AI development.
          </p>
        </section>

        <MarketNeeds />
        <TrojanHorse />
        <Scanner />
        <OutboundArchitect />
        <CodeWizard />
        <TechXRay />
        <InboundMagnet />
        <ProposalArchitect />
        <DeliverySuite />
        <AiStudio />

        {/* Footer */}
        <footer className="border-t border-stone-200 pt-10 pb-20 mt-10 text-center text-stone-400 text-sm">
          &copy; 2024 Shaurya n8n Protocol. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

export default App;