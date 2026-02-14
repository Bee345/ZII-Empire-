
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateFashionDesign = async (prompt: string, category: string) => {
  const ai = getAI();
  const fullPrompt = `A high-quality fashion design for ${category} attire. Description: ${prompt}. Professional fashion photography style, elegant, African heritage influence where applicable.`;
  
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
