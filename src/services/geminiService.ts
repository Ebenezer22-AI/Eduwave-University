import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, DailyProblem } from "../types";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  private getAI(): GoogleGenAI {
    if (!this.ai) {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing. Please set GEMINI_API_KEY or VITE_GEMINI_API_KEY in your Vercel Environment Variables.");
      }
      this.ai = new GoogleGenAI({ apiKey });
    }
    return this.ai;
  }

  async generateDailyProblem(): Promise<DailyProblem> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a challenging university-level multiple choice problem for today. It can be from Physics, Computer Science, or Economics.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            subject: { type: Type.STRING },
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["id", "subject", "question", "options", "correctAnswer", "explanation"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  }

  async chat(history: ChatMessage[], message: string) {
    const ai = this.getAI();
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `You are Eduwave AI, a brilliant and supportive university tutor. 
        Your goal is to help students understand complex concepts, plan their studies, and provide academic guidance.
        Be encouraging, concise, and use academic examples where appropriate.
        Format your responses using Markdown for clarity (bolding, lists, etc.).`,
      },
    });

    // Convert history to Gemini format
    // Note: In a real app we'd keep track of history properly, 
    // but for this demo we'll just send the current message or a simplified history.
    
    const response = await chat.sendMessage({ message });
    return response.text;
  }
}

export const geminiService = new GeminiService();
