import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import SectionHeader from './SectionHeader';

const data = [
  { year: '2022', agentic: 10, linear: 30 },
  { year: '2023', agentic: 25, linear: 40 },
  { year: '2024', agentic: 45, linear: 48 },
  { year: '2025', agentic: 85, linear: 52 },
  { year: '2026', agentic: 98, linear: 55 },
];

const PainPointCard = ({ title, subtitle, detail, isOpen, onToggle }: { title: string, subtitle: string, detail: React.ReactNode, isOpen: boolean, onToggle: () => void }) => (
  <div 
    className="bg-white p-6 rounded-xl border border-stone-200 hover:shadow-lg cursor-pointer transition-all duration-300 group"
    onClick={onToggle}
  >
    <div className="flex justify-between items-center">
      <h5 className="text-lg font-bold text-stone-800 group-hover:text-orange-600 transition-colors">{title}</h5>
      <span className="text-stone-400 text-xl">{isOpen ? '−' : '+'}</span>
    </div>
    <p className="text-stone-500 text-sm mt-1">{subtitle}</p>
    {isOpen && (
      <div className="mt-4 pt-4 border-t border-stone-100 text-sm text-stone-600">
        {detail}
      </div>
    )}
  </div>
);

const MarketNeeds: React.FC = () => {
  const [openCard, setOpenCard] = useState<string | null>(null);

  const toggle = (id: string) => setOpenCard(openCard === id ? null : id);

  return (
    <section id="market-needs" className="scroll-mt-24">
      <SectionHeader 
        number="01." 
        title="Market Needs & Scientific Validation" 
        description='Analysis of the "Bleeding Neck" problems where simple automation (Zapier) fails.' 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Top 3 "Bleeding Neck" Problems</h4>
          
          <PainPointCard 
            title="Lead Data Decay & Quality"
            subtitle='Founders are drowning in "bad lists".'
            isOpen={openCard === 'pain-1'}
            onToggle={() => toggle('pain-1')}
            detail={<>
              <strong>The Specific Pain:</strong> Marketing agencies buy leads, but 30-40% are invalid. They need <em>enrichment validation</em>.<br/><br/>
              <strong>n8n Advantage:</strong> n8n handles complex loops to ping APIs (Apollo, ZeroBounce) to verify data before it hits the CRM.
            </>}
          />

          <PainPointCard 
            title="The Personalization Scale Paradox"
            subtitle='High volume feels spammy; low volume is too slow.'
            isOpen={openCard === 'pain-2'}
            onToggle={() => toggle('pain-2')}
            detail={<>
              <strong>n8n Advantage:</strong> AI nodes can read a prospect's LinkedIn profile and generate truly unique "Icebreakers" at scale.
            </>}
          />

          <PainPointCard 
            title="Tool Fragmentation"
            subtitle='"Why do I have 10 subscriptions?"'
            isOpen={openCard === 'pain-3'}
            onToggle={() => toggle('pain-3')}
            detail={<>
              <strong>n8n Advantage:</strong> Self-hosting options or volume-agnostic pricing appeals to the 94% of business pros wanting unified platforms.
            </>}
          />
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm h-full min-h-[350px]">
          <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">The Shift to Agentic Automation</h4>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                <XAxis dataKey="year" stroke="#78716c" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#78716c" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e7e5e4' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Legend iconType="circle" />
                <Line 
                  type="monotone" 
                  dataKey="agentic" 
                  name="Agentic Automation (n8n/AI)" 
                  stroke="#ea580c" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#fff', stroke: '#ea580c', strokeWidth: 2 }} 
                  activeDot={{ r: 6 }} 
                  fill="url(#colorAgentic)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="linear" 
                  name="Simple Automation (Zapier)" 
                  stroke="#a8a29e" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  dot={{ r: 3, fill: '#fff', stroke: '#a8a29e', strokeWidth: 2 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketNeeds;
