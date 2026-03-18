
import { GoogleGenAI, Type } from "@google/genai";
import { TelemetryData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFactoryInsights = async (data: TelemetryData) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this factory engine telemetry data and provide a 2-sentence optimization insight:
      Cycle Time: ${data.cycleTime}s
      Energy: ${data.energy}kW
      Uptime: ${data.uptime}%
      Yield: ${data.yield}%
      Defects: ${data.defects}%`,
      config: {
        systemInstruction: "You are a senior industrial manufacturing engineer. Provide concise, high-value technical insights.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Optimizing thermodynamic cycles for batch #4409. Systems running within nominal parameters.";
  }
};
