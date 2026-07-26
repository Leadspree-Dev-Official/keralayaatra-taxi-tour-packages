import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI client lazily (only if GEMINI_API_KEY is present)
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "keralayaatra-app",
        },
      },
    });
  }
  return aiClient;
}

app.use(express.json());

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// AI Itinerary Planner Endpoint
app.post("/api/generate-itinerary", async (req, res) => {
  try {
    const {
      durationDays,
      travelersCount,
      interests,
      budget,
      cabPreference,
      specialRequirements,
    } = req.body;

    // Validate inputs
    const days = Number(durationDays) || 5;
    const travelers = Number(travelersCount) || 2;
    const interestList = Array.isArray(interests) ? interests.join(", ") : "Nature, Backwaters";
    const budgetLevel = budget || "Standard";
    const cab = cabPreference || "Sedan (Etios/Dzire)";
    const notes = specialRequirements || "None";

    const prompt = `Generate a customized ${days}-day Kerala travel itinerary for ${travelers} travelers.
Interests: ${interestList}.
Budget Preference: ${budgetLevel}.
Cab/Fleet Preference: ${cab}.
Special notes/requirements: ${notes}.

Return a JSON object matching the requested schema. Make sure stay recommendations match the budget category. Ensure estimated costs and driver logistics are fully detailed. Prices must be in Indian Rupees (₹). Make it feel incredibly welcoming, professional, and authentic to Kerala culture.`;

    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are 'Keralayaatra AI', a highly experienced, warm, and professional local travel counselor from Kerala. Generate highly detailed, logistically sound travel itineraries focusing on comfort, local drivers, scenic routes, homestays, hotels, and authentic sights. Always output strictly valid JSON matching the requested schema. Do not include any leading or trailing markdown formatting like \`\`\`json or \`\`\`. Output ONLY raw valid JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "overview", "days", "recommendedFleet", "totalEstimatedCostRange", "curatedTips"],
          properties: {
            title: {
              type: Type.STRING,
              description: "A beautiful, evocative title for the Kerala tour package."
            },
            overview: {
              type: Type.STRING,
              description: "A warm introduction welcoming the traveler and summarizing the vibe of this customized package."
            },
            days: {
              type: Type.ARRAY,
              description: "Day-by-day plan.",
              items: {
                type: Type.OBJECT,
                required: ["dayNumber", "title", "description", "transitTime", "transitCostEst", "stayRecommendation"],
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING, description: "Title of the day, e.g. Kochi Arrival & Munnar Drive" },
                  description: { type: Type.STRING, description: "Detailed guide of the sights, activities, local foods, and route." },
                  transitTime: { type: Type.STRING, description: "Estimated taxi transit time, e.g. 4.5 hours drive" },
                  transitCostEst: { type: Type.INTEGER, description: "Estimated driver/taxi cost in INR for the day (e.g. 3500)" },
                  stayRecommendation: { type: Type.STRING, description: "Name of recommended homestay, hotel, or resort corresponding to their budget tier." }
                }
              }
            },
            recommendedFleet: {
              type: Type.STRING,
              description: "Recommended vehicle based on their cab preference and group size."
            },
            totalEstimatedCostRange: {
              type: Type.STRING,
              description: "Estimated total tour package cost (Cab, driver, stay) in INR, e.g. ₹22,000 - ₹30,000"
            },
            curatedTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 to 4 local tips like weather, local food, driver custom, or best times to visit sights."
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from Gemini");
    }

    // Parse output
    const itinerary = JSON.parse(text.trim());
    res.json({ success: true, itinerary });
  } catch (error: any) {
    console.error("Error generating itinerary:", error);
    res.status(500).json({
      success: false,
      message: "We encountered an issue planning your custom trip. Please try again or contact us directly!",
      details: error.message
    });
  }
});

// Setup Vite Dev server middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
