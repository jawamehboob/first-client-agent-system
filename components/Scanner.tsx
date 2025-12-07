import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { generateOpportunities } from '../services/geminiService';
import { Opportunity } from '../types';

const Scanner: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Opportunity[] | null>(null);

  const handleScan = async () => {
    if (!industry.trim()) return;
    setLoading(true);
    const data = await generateOpportunities(industry);
    setResults(data ? data.ideas : []);
    setLoading(false);
  };

  return (
    <section id="scanner" className="scroll-mt-24">
      <SectionHeader number="03." title="Agentic Opportunity Scanner ✨" description="Use Gemini to scan any industry for high-value 'Trojan Horse' automation ideas." />
      
      <div className="bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-stone-50 border-b border-stone-200">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-2/3">
              <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Target Industry / Niche</label>
              <input 
                type="text" 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Dental Clinics, logistics companies, boutique hotels..." 
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div className="w-full md:w-1/3">
              <button 
                onClick={handleScan}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:brightness-110 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-70"
              >
                {loading ? (
                  <>Scanning <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div></>
                ) : (
                  'Scan for Ideas ✨'
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 min-h-[200px] bg-stone-50/50">
          {!results && !loading && (
            <div className="text-center py-12 text-stone-400">
              <div className="mb-4 text-4xl opacity-20">🤖</div>
              <p>Enter an industry above to unleash the AI agents.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results && results.map((idea, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-stone-200 hover:shadow-md transition-all duration-300">
                 <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">{idx + 1}</div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Opportunity</span>
                </div>
                <h5 className="text-lg font-bold text-stone-800 mb-2">{idea.title}</h5>
                <p className="text-sm text-stone-600 mb-4 h-24 overflow-y-auto custom-scrollbar">{idea.description}</p>
                <div className="pt-4 border-t border-stone-100">
                    <span className="text-xs font-bold text-stone-500 uppercase">Est. Impact:</span>
                    <span className="block text-sm font-bold text-green-600">{idea.roi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scanner;
