
import { GoogleGenAI } from "@google/genai";

// Standardizing initialization: Use process.env.API_KEY directly as per requirements
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateFashionDesign = async (prompt: string, category: string) => {
  const ai = getAI();
  const fullPrompt = `A high-quality fashion design for ${category} attire. Description: ${prompt}. Professional fashion photography style, elegant, African heritage influence where applicable. High resolution.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: fullPrompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "3:4"
      }
    }
  });

  // Iterating through candidates and parts to find the inline image data as per nano banana model rules
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const generateAppLogo = async () => {
  const ai = getAI();
  const prompt = "A luxurious, elegant logo for a fashion brand named 'Zii-Empire'. Incorporate gold and deep blue colors, minimalist crown or needle element, sophisticated typography, white background.";
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const fetchMarketIntelligence = async () => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: 'Generate 3 high-impact fashion news headlines and short summaries (20 words each) specifically about African fashion trends, Zii-Empire expansion, and global textile market shifts. Format as JSON array of objects with keys: title, summary, category.',
    config: {
      responseMimeType: "application/json"
    }
  });
  
  try {
    // response.text is a getter property, not a method, on the response object
    return JSON.parse(response.text || '[]');
  } catch (e) {
    return [
      { title: "Lagos Fashion Week 2026", summary: "Ankara remains king as modern cuts dominate the runway.", category: "Trend Alert" },
      { title: "Zii-Empire Tech Expansion", summary: "New AI features launched for automated recipe generation.", category: "Internal News" },
      { title: "Cotton Prices Stabilize", summary: "Supply chain improvements lead to lower material costs.", category: "Market Shift" }
    ];
  }
};
