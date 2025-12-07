import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SectionHeader from './SectionHeader';
import { generateText, generateTechStack } from '../services/geminiService';
import { TechStackItem } from '../types';

// --- Shared Components ---
const LoadingOverlay = ({ text }: { text: string }) => (
  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-600 border-t-transparent"></div>
    <p className="mt-2 text-sm text-stone-500 font-medium">{text}</p>
  </div>
);

// --- 04. Outbound Architect ---
export const OutboundArchitect: React.FC = () => {
  const [role, setRole] = useState('');
  const [pain, setPain] = useState('');
  const [solution, setSolution] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const prompt = `Write a short cold DM script using the P.A.S. (Problem-Agitation-Solution) framework. Target Audience: ${role || 'Business Owner'}. Pain Point: ${pain || 'inefficiency'}. Proposed Solution: ${solution || 'automation'}. Format with markdown. Keep it under 150 words.`;
    const text = await generateText(prompt);
    setResult(text);
    setLoading(false);
  };

  return (
    <section id="outreach" className="scroll-mt-24">
      <SectionHeader number="04." title="Outbound Architect (The Sniper) ✨" description="Generate hyper-personalized P.A.S. scripts instantly using LLMs." />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-stone-200 p-5 rounded-xl shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-stone-700 uppercase">Script Parameters</h4>
            <input type="text" placeholder="Target Role" className="w-full text-sm p-2 border border-stone-300 rounded focus:border-orange-500 outline-none" value={role} onChange={e => setRole(e.target.value)} />
            <input type="text" placeholder="Core Pain Point" className="w-full text-sm p-2 border border-stone-300 rounded focus:border-orange-500 outline-none" value={pain} onChange={e => setPain(e.target.value)} />
            <input type="text" placeholder="Proposed Solution" className="w-full text-sm p-2 border border-stone-300 rounded focus:border-orange-500 outline-none" value={solution} onChange={e => setSolution(e.target.value)} />
            <button onClick={generate} disabled={loading} className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all">
              {loading ? 'Drafting...' : 'Generate Script ✨'}
            </button>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="bg-white border border-stone-200 rounded-xl shadow-lg h-full flex flex-col min-h-[300px] relative">
            <div className="bg-stone-100 px-6 py-4 border-b border-stone-200"><h4 className="font-bold text-stone-700">Generated Outreach Strategy</h4></div>
            <div className="p-6 flex-grow relative bg-stone-50 font-mono text-sm leading-relaxed text-stone-700">
              {loading && <LoadingOverlay text="Consulting the AI..." />}
              {result ? <ReactMarkdown>{result}</ReactMarkdown> : <div className="text-stone-400 italic text-center mt-10">← Configure parameters to generate.</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 05. Code Wizard ---
export const CodeWizard: React.FC = () => {
  const [instruction, setInstruction] = useState('');
  const [inputData, setInputData] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const prompt = `Write a JavaScript code snippet for an n8n 'Code' node. Task: ${instruction}. Input Data Context: ${inputData}. Return ONLY valid JavaScript code. Do not wrap in markdown code blocks. Assume 'items' is the input array. Use 'return items;' or return the modified array at the end.`;
    let text = await generateText(prompt);
    // Cleanup markdown if AI adds it despite instructions
    text = text.replace(/```javascript/g, '').replace(/```/g, '').trim();
    setCode(text);
    setLoading(false);
  };

  return (
    <section id="code-wizard" className="scroll-mt-24">
      <SectionHeader number="05." title="n8n Code Node Wizard ✨" description="Stop fighting with JavaScript. Describe the data transformation you need." />
      <div className="bg-stone-900 rounded-xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 border-r border-stone-700 space-y-4">
          <textarea rows={3} placeholder="Describe logic..." className="w-full bg-stone-800 text-white p-3 rounded border border-stone-600 focus:border-orange-500 outline-none text-sm font-mono" value={instruction} onChange={e => setInstruction(e.target.value)} />
          <textarea rows={5} placeholder="Input JSON Sample..." className="w-full bg-stone-800 text-white p-3 rounded border border-stone-600 focus:border-orange-500 outline-none text-xs font-mono" value={inputData} onChange={e => setInputData(e.target.value)} />
          <button onClick={generate} disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded font-bold transition-colors">{loading ? 'Coding...' : 'Generate Code ✨'}</button>
        </div>
        <div className="p-6 bg-stone-950 font-mono text-xs text-green-400 overflow-x-auto relative min-h-[200px]">
          {loading && <div className="absolute inset-0 bg-stone-900/90 flex items-center justify-center"><div className="spinner border-white border-t-transparent w-6 h-6 rounded-full animate-spin"></div></div>}
          <pre>{code || '// Generated Code will appear here...'}</pre>
        </div>
      </div>
    </section>
  );
};

// --- 06. Tech X-Ray ---
export const TechXRay: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [stack, setStack] = useState<TechStackItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  const scan = async () => {
    if (!industry) return;
    setLoading(true);
    const data = await generateTechStack(industry);
    setStack(data ? data.stack : []);
    setLoading(false);
  };

  return (
    <section id="tech-xray" className="scroll-mt-24">
      <SectionHeader number="06." title="Niche 'Tech X-Ray' Vision ✨" description="Predict the tech stack of a target industry." />
      <div className="bg-white border border-stone-200 rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
          <div className="w-full md:w-3/4">
            <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Target Industry</label>
            <input type="text" className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="e.g. Med Spas" value={industry} onChange={e => setIndustry(e.target.value)} />
          </div>
          <button onClick={scan} disabled={loading} className="w-full md:w-1/4 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg font-bold hover:brightness-110 transition-all">{loading ? 'Scanning...' : 'Run X-Ray ✨'}</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {!stack && !loading && <div className="col-span-3 text-center py-8 text-stone-400 bg-stone-50 rounded border border-stone-100 border-dashed">Enter an industry to reveal their likely software stack.</div>}
          {stack && stack.map((item, idx) => (
            <div key={idx} className="bg-stone-50 p-4 rounded border border-stone-200">
              <h5 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">{item.category}</h5>
              <div className="text-lg font-bold text-stone-800 mb-2">{item.tools}</div>
              <p className="text-xs text-stone-500 italic">"{item.note}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 07. Inbound Magnet ---
export const InboundMagnet: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const prompt = `You are an expert ghostwriter for LinkedIn. Create content for an n8n automation expert targeting ${niche || 'Agencies'}. Topic: ${topic || 'Automation'}. Output Structure: 1. **3 Viral Hooks** 2. **1 Full Value Post**. Format nicely in Markdown.`;
    const text = await generateText(prompt);
    setContent(text);
    setLoading(false);
  };

  return (
    <section id="inbound" className="scroll-mt-24">
      <SectionHeader number="07." title="Inbound 'Magnet' Engine ✨" description="Use Gemini to write viral LinkedIn 'Authority Posts'." />
      <div className="bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-3">
        <div className="p-6 bg-stone-50 border-r border-stone-200 col-span-1 space-y-4">
          <input type="text" placeholder="Target Niche" className="w-full text-sm p-3 border border-stone-300 rounded focus:border-orange-500 outline-none" value={niche} onChange={e => setNiche(e.target.value)} />
          <input type="text" placeholder="Topic" className="w-full text-sm p-3 border border-stone-300 rounded focus:border-orange-500 outline-none" value={topic} onChange={e => setTopic(e.target.value)} />
          <button onClick={generate} disabled={loading} className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all">{loading ? 'Writing...' : 'Create Content ✨'}</button>
        </div>
        <div className="p-6 col-span-2 bg-white relative min-h-[300px] prose prose-sm prose-orange max-w-none text-stone-600">
           {loading && <LoadingOverlay text="Drafting viral hooks..." />}
           {content ? <ReactMarkdown>{content}</ReactMarkdown> : <div className="text-stone-400 italic text-center mt-10">🤖 Enter a niche to generate.</div>}
        </div>
      </div>
    </section>
  );
};

// --- 08. Proposal Architect ---
export const ProposalArchitect: React.FC = () => {
  const [client, setClient] = useState('');
  const [project, setProject] = useState('');
  const [price, setPrice] = useState('');
  const [proposal, setProposal] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const prompt = `Draft a concise, high-value Proposal / Scope of Work for an n8n automation project. Client: ${client}. Project: ${project}. Retainer: $${price}. Structure: Exec Summary, Solution, ROI, Investment. Tone: Professional. Format in Markdown.`;
    const text = await generateText(prompt);
    setProposal(text);
    setLoading(false);
  };

  return (
    <section id="proposal" className="scroll-mt-24">
      <SectionHeader number="08." title="AI Proposal Architect ✨" description="Instantly generate a value-based 'Scope of Work' proposal." />
      <div className="bg-stone-900 rounded-xl shadow-xl overflow-hidden text-white">
        <div className="p-6 border-b border-stone-700 flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="Client Name" className="bg-stone-800 border border-stone-600 text-white rounded p-2 text-sm w-full" value={client} onChange={e => setClient(e.target.value)} />
          <input type="text" placeholder="Project Name" className="bg-stone-800 border border-stone-600 text-white rounded p-2 text-sm w-full" value={project} onChange={e => setProject(e.target.value)} />
          <input type="text" placeholder="Price ($)" className="bg-stone-800 border border-stone-600 text-white rounded p-2 text-sm w-full" value={price} onChange={e => setPrice(e.target.value)} />
          <button onClick={generate} disabled={loading} className="w-full bg-white text-stone-900 font-bold rounded hover:bg-stone-200 transition-colors">{loading ? 'Drafting...' : 'Draft Proposal ✨'}</button>
        </div>
        <div className="p-8 bg-stone-800 min-h-[300px] font-mono text-sm leading-relaxed text-stone-300 relative">
          {loading && <div className="absolute inset-0 bg-stone-800/90 flex items-center justify-center"><div className="spinner border-white border-t-transparent w-8 h-8 rounded-full animate-spin"></div></div>}
          {proposal ? <ReactMarkdown>{proposal}</ReactMarkdown> : <div>// Proposal preview will appear here...</div>}
        </div>
      </div>
    </section>
  );
};

// --- 09. Delivery Suite ---
export const DeliverySuite: React.FC = () => {
  const [archInput, setArchInput] = useState('');
  const [archOutput, setArchOutput] = useState('');
  const [archLoading, setArchLoading] = useState(false);
  const [docInput, setDocInput] = useState('');
  const [docOutput, setDocOutput] = useState('');
  const [docLoading, setDocLoading] = useState(false);

  const generateArch = async () => {
    setArchLoading(true);
    const prompt = `Act as an n8n System Architect. Design a workflow for: "${archInput}". Output a technical list of steps. 1. Trigger 2. Logic 3. Actions. Include node names.`;
    const text = await generateText(prompt);
    setArchOutput(text);
    setArchLoading(false);
  };

  const generateDoc = async () => {
    setDocLoading(true);
    const prompt = `Act as a Technical Writer. Write client documentation for this n8n workflow: "${docInput}". Structure: Overview, Steps, Requirements. Tone: Professional.`;
    const text = await generateText(prompt);
    setDocOutput(text);
    setDocLoading(false);
  };

  return (
    <section id="delivery" className="scroll-mt-24">
      <SectionHeader number="09." title="Delivery & Ops Suite ✨" description="Design complex architectures and generate client documentation." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="bg-stone-100 p-4 border-b border-stone-200 flex justify-between items-center"><h4 className="font-bold text-stone-700 text-sm">🏗️ System Architect</h4><span className="text-[10px] bg-orange-100 text-orange-800 px-2 py-1 rounded-full uppercase">Design</span></div>
          <div className="p-6 space-y-4 flex-grow relative">
            <textarea rows={3} placeholder="Describe problem..." className="w-full text-sm p-3 border border-stone-300 rounded focus:border-orange-500 outline-none resize-none" value={archInput} onChange={e => setArchInput(e.target.value)} />
            <button onClick={generateArch} disabled={archLoading} className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-2 rounded text-sm font-bold">{archLoading ? 'Designing...' : 'Design Architecture ✨'}</button>
            <div className="bg-stone-50 p-4 rounded border border-stone-200 text-xs font-mono text-stone-600 h-48 overflow-y-auto">{archOutput ? <ReactMarkdown>{archOutput}</ReactMarkdown> : '// Blueprint here...'}</div>
          </div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="bg-stone-100 p-4 border-b border-stone-200 flex justify-between items-center"><h4 className="font-bold text-stone-700 text-sm">📄 Workflow Documenter</h4><span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-1 rounded-full uppercase">Handover</span></div>
          <div className="p-6 space-y-4 flex-grow relative">
            <textarea rows={3} placeholder="Paste workflow description..." className="w-full text-sm p-3 border border-stone-300 rounded focus:border-blue-500 outline-none resize-none" value={docInput} onChange={e => setDocInput(e.target.value)} />
            <button onClick={generateDoc} disabled={docLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-bold">{docLoading ? 'Writing...' : 'Generate Docs ✨'}</button>
            <div className="bg-stone-50 p-4 rounded border border-stone-200 text-xs text-stone-600 h-48 overflow-y-auto">{docOutput ? <ReactMarkdown>{docOutput}</ReactMarkdown> : '// Docs here...'}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
