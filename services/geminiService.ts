import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedCaptionsResponse, Tone } from "../types";

export const generateCaptions = async (
  productName: string,
  features: string,
  tone: Tone
): Promise<string[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are a chaotic, high-energy Gen-Z social media manager.
    Create 5 distinct, viral-worthy Instagram ad captions for a product named "${productName}".
    
    Key features to highlight: ${features}.
    The selected specific tone is: ${tone}.

    The captions MUST be:
    - Over-the-top enthusiastic.
    - Full of Gen-Z slang (e.g., no cap, slay, main character energy, it's giving, era, ate and left no crumbs, bet, suss, vibe check).
    - Reflect the "${tone}" vibe specifically.
    - Heavy use of emojis.
    - Short, punchy sentences tailored for short attention spans.
    - Include hashtags.

    Return the result strictly as a JSON object with a 'captions' property containing an array of strings.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            captions: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
        },
      },
    });

    const jsonResponse = JSON.parse(response.text || "{}") as GeneratedCaptionsResponse;
    
    if (!jsonResponse.captions || !Array.isArray(jsonResponse.captions)) {
       throw new Error("Invalid response format from Gemini");
    }

    return jsonResponse.captions;

  } catch (error) {
    console.error("Error generating captions:", error);
    throw error;
  }
};