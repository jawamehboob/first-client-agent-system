import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import SectionHeader from './SectionHeader';
import { generateText, generateWithSearch } from '../services/geminiService';
import { ChatMessage, ProductContext } from '../types';

const AiStudio: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'ai', text: "**AI Fuel:** Studio online.\n\n**To get the best results:** Fill out the \"Product Context\" panel on the left. Once I know your product, I can act as your dedicated Co-Founder and Strategist.", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'advisor' | 'redteam'>('advisor');
  const [context, setContext] = useState<ProductContext>({ name: '', audience: '', problem: '' });
  const [contextSaved, setContextSaved] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSaveContext = () => {
    setContextSaved(true);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'ai',
      text: `Context Received. I now know we are selling **${context.name}** to **${context.audience}** to solve **${context.problem}**. How can I help you strategize?`,
      timestamp: Date.now()
    }]);
    setTimeout(() => setContextSaved(false), 3000);
  };

  const handleModeChange = (newMode: 'advisor' | 'redteam') => {
    setMode(newMode);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: newMode === 'redteam' ? 'ai-redteam' : 'ai',
      text: newMode === 'advisor' ? "Switched to Strategist Mode. Let's plan." : "Switched to Red Team. I'm a skeptical buyer now. Pitch me.",
      timestamp: Date.now()
    }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const baseAdvisor = `You are 'AI Fuel', a 2025 Workflow Sales Strategist & Technical Co-Founder. 
    CORE CONTEXT: Industry has shifted to Agentic Automation. Sell outcomes, not hours.
    CURRENT PRODUCT CONTEXT: Name: ${context.name || "Not specified"}, Audience: ${context.audience || "Not specified"}, Problem: ${context.problem || "Not specified"}.
    INSTRUCTIONS: Always reference the specific Product Context. Provide deep, tactical advice.`;

    const baseRedTeam = `You are a SKEPTICAL B2B Buyer in the ${context.audience || "General"} industry.
    I am pitching you ${context.name || "an automation service"}. Your goal is to reject me. Ask hard questions about ROI. Be tough.`;

    const systemPrompt = mode === 'advisor' ? baseAdvisor : baseRedTeam;
    const fullPrompt = `${systemPrompt}\n\nUser Query: ${userMsg.text}`;

    const responseText = await generateText(fullPrompt);

    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: mode === 'redteam' ? 'ai-redteam' : 'ai',
      text: responseText,
      timestamp: Date.now()
    }]);
    setLoading(false);
  };

  const handleNews = async () => {
    if (mode !== 'advisor') handleModeChange('advisor');
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: "Get Daily Intel", timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    
    const prompt = "Find 5 critical, verified news updates or trends in AI Automation and n8n for today. Focus on agentic workflows, API shifts, and high-level strategy shifts relevant to 2025-2027. Format as a semantic list with bold titles.";
    const responseText = await generateWithSearch(prompt);

    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      text: responseText,
      timestamp: Date.now()
    }]);
    setLoading(false);
  };

  return (
    <section id="strategist" className="scroll-mt-24">
      <SectionHeader number="10." title="AI Fuel Studio 💎" description="Your Personal Assistant & Product Strategy Partner." />
      <div className="bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 h-[750px]">
        
        {/* Left: Context */}
        <div className="bg-stone-50 p-6 border-r border-stone-200 col-span-1 lg:col-span-4 flex flex-col h-full overflow-y-auto">
          <div className="mb-6">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">Product Context (The Brain) 🧠</h4>
            <div className="space-y-4">
              <input type="text" placeholder="Product Name" className="w-full text-sm p-2 bg-white border border-stone-300 rounded focus:border-orange-500 outline-none" value={context.name} onChange={e => setContext({...context, name: e.target.value})} />
              <input type="text" placeholder="Target Audience" className="w-full text-sm p-2 bg-white border border-stone-300 rounded focus:border-orange-500 outline-none" value={context.audience} onChange={e => setContext({...context, audience: e.target.value})} />
              <textarea rows={2} placeholder="Core Problem Solved" className="w-full text-sm p-2 bg-white border border-stone-300 rounded focus:border-orange-500 outline-none resize-none" value={context.problem} onChange={e => setContext({...context, problem: e.target.value})} />
              <button onClick={handleSaveContext} className="w-full bg-stone-800 text-white py-2 rounded text-xs font-bold hover:bg-black transition-colors">{contextSaved ? 'Context Updated ✓' : 'Save Context to AI Memory'}</button>
            </div>
          </div>
          <div className="mt-auto border-t border-stone-200 pt-6">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">Modes</h4>
            <select className="w-full text-sm p-2 bg-white border border-stone-300 rounded mb-3" value={mode} onChange={(e) => handleModeChange(e.target.value as any)}>
              <option value="advisor">⚡ AI Fuel (Strategist)</option>
              <option value="redteam">🔴 Red Team (Skeptic)</option>
            </select>
            <button onClick={handleNews} className="w-full text-left p-2 rounded hover:bg-purple-50 text-xs font-bold text-stone-600 hover:text-purple-600 transition-colors mb-2">📡 Get Daily Intel</button>
          </div>
        </div>

        {/* Right: Chat */}
        <div className="col-span-1 lg:col-span-8 flex flex-col bg-white relative">
          <div className="flex-grow overflow-y-auto p-8 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                msg.role === 'user' ? 'bg-stone-100 text-stone-900 ml-auto rounded-br-none' : 
                msg.role === 'ai-redteam' ? 'bg-red-50 text-red-900 border border-red-200 mr-auto rounded-bl-none' :
                'bg-white border border-stone-200 text-stone-700 mr-auto rounded-bl-none shadow-sm'
              }`}>
                {msg.role !== 'user' && <strong className="block mb-1">{msg.role === 'ai-redteam' ? 'Skeptical Buyer:' : 'AI Fuel:'}</strong>}
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {loading && <div className="mr-auto bg-white border border-stone-200 p-3 rounded-xl rounded-bl-none shadow-sm flex gap-1"><span className="typing-dot"></span><span className="typing-dot"></span><span className="typing-dot"></span></div>}
            <div ref={chatEndRef} />
          </div>
          <div className="p-6 bg-stone-50 border-t border-stone-200 mt-auto">
            <div className="relative">
              <textarea 
                rows={2} 
                placeholder="Ask about strategy, code, or sales..." 
                className="w-full pl-4 pr-14 py-4 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none text-sm shadow-sm"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              />
              <button onClick={handleSend} disabled={loading} className="absolute right-3 bottom-3 p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-sm disabled:opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiStudio;
