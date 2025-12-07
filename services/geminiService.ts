import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TechStackResponse, OpportunityResponse } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize client
const ai = new GoogleGenAI({ apiKey });

// Helper to check API key
export const checkApiKey = () => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please configure process.env.API_KEY.");
  }
};

export const generateText = async (prompt: string, systemInstruction?: string): Promise<string> => {
  checkApiKey();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    return response.text || "No response generated.";
  } catch (error: any) {
    console.error("Gemini Text Error:", error);
    return `Error: ${error.message}`;
  }
};

export const generateWithSearch = async (prompt: string): Promise<string> => {
  checkApiKey();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    
    let text = response.text || "";
    
    // Extract grounding chunks for citations
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && chunks.length > 0) {
      text += "\n\n**Verified Sources:**\n";
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
          text += `- [${chunk.web.title}](${chunk.web.uri})\n`;
        }
      });
    }
    
    return text;
  } catch (error: any) {
    console.error("Gemini Search Error:", error);
    return `Error with search: ${error.message}`;
  }
};

export const generateOpportunities = async (industry: string): Promise<OpportunityResponse | null> => {
  checkApiKey();
  const prompt = `Identify 3 high-value 'Agentic Process Automation' use cases (n8n workflows) specifically for the ${industry} industry. Focus on problems that cause 'bleeding neck' pain. Return ONLY valid JSON.`;
  
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      ideas: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            roi: { type: Type.STRING },
          },
          required: ["title", "description", "roi"]
        }
      }
    },
    required: ["ideas"]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });
    
    if (response.text) {
      return JSON.parse(response.text) as OpportunityResponse;
    }
    return null;
  } catch (error) {
    console.error("Gemini JSON Error:", error);
    return null;
  }
};

export const generateTechStack = async (industry: string): Promise<TechStackResponse | null> => {
  checkApiKey();
  const prompt = `Analyze the typical software tech stack for the ${industry} industry. 
  Identify 3 key categories (e.g., CRM, Email, Operations) and the most popular tools they use.
  Return valid JSON.`;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      stack: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            tools: { type: Type.STRING },
            note: { type: Type.STRING },
          },
          required: ["category", "tools", "note"]
        }
      }
    },
    required: ["stack"]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as TechStackResponse;
    }
    return null;
  } catch (error) {
    console.error("Gemini Tech Stack Error:", error);
    return null;
  }
};
