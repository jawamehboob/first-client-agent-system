import React from 'react';
import SectionHeader from './SectionHeader';

const Step = ({ label, title, color, border }: { label: string, title: string, color: string, border: string }) => (
  <div className={`w-full md:w-1/5 bg-stone-800 ${border} p-4 rounded-lg relative flex flex-col items-start justify-center min-h-[80px]`}>
    <div className={`text-xs ${color} uppercase font-mono mb-1`}>{label}</div>
    <div className={`font-bold ${label === 'Action' || label === 'Trigger' ? 'text-stone-200' : 'text-white'}`}>{title}</div>
    {/* Connector Line */}
    <div className="hidden md:block absolute top-1/2 -right-4 w-4 h-0.5 bg-stone-600 transform -translate-y-1/2 last:hidden" style={{ display: title === 'CRM Sync' ? 'none' : 'block' }}></div>
    {/* Mobile Connector */}
    <div className="md:hidden absolute -bottom-4 left-1/2 w-0.5 h-4 bg-stone-600 transform -translate-x-1/2 last:hidden" style={{ display: title === 'CRM Sync' ? 'none' : 'block' }}></div>
  </div>
);

const TrojanHorse: React.FC = () => {
  return (
    <section id="trojan-horse" className="scroll-mt-24">
      <SectionHeader 
        number="02." 
        title='The "Trojan Horse" Offer' 
        description='Sell a specific, tangible outcome: The Infinite Lead Looping Agent.' 
      />

      <div className="bg-stone-900 rounded-2xl p-8 text-white shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <span className="text-9xl font-bold">n8n</span>
        </div>
        
        <h4 className="text-xl font-bold mb-8 text-orange-400">Workflow: The Infinite Lead Looping Agent</h4>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-center justify-between relative z-10">
          <Step label="Trigger" title="New Lead" color="text-stone-400" border="border border-stone-700" />
          <Step label="Agent 1" title="Enrichment" color="text-orange-400" border="border-l-4 border-orange-500 bg-stone-800" />
          <Step label="Agent 2" title="Research" color="text-blue-400" border="border-l-4 border-blue-500 bg-stone-800" />
          <Step label="Agent 3" title="Personalize" color="text-green-400" border="border-l-4 border-green-500 bg-stone-800" />
          <Step label="Action" title="CRM Sync" color="text-stone-400" border="border border-stone-700" />
        </div>
      </div>
    </section>
  );
};

export default TrojanHorse;
