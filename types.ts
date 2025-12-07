export interface Opportunity {
  title: string;
  description: string;
  roi: string;
}

export interface TechStackItem {
  category: string;
  tools: string;
  note: string;
}

export interface TechStackResponse {
  stack: TechStackItem[];
}

export interface OpportunityResponse {
  ideas: Opportunity[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai' | 'ai-redteam';
  text: string;
  timestamp: number;
}

export interface ProductContext {
  name: string;
  audience: string;
  problem: string;
}
