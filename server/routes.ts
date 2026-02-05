import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPathwayCheckSchema, type PathwayResults } from "@shared/schema";
import { z } from "zod";

function generatePathwayResults(
  position: string,
  classYear: number,
  targetSchools: string[],
  currentLevel: string
): PathwayResults {
  const positionCompetition: Record<string, number> = {
    "P": 85,
    "C": 65,
    "1B": 55,
    "2B": 60,
    "3B": 58,
    "SS": 75,
    "LF": 50,
    "CF": 70,
    "RF": 52,
    "DH": 45,
    "UTIL": 40,
  };

  const levelMultiplier: Record<string, number> = {
    "varsity_starter": 0.85,
    "varsity_rotation": 0.95,
    "jv": 1.1,
    "travel_elite": 0.9,
    "travel_competitive": 1.0,
  };

  const baseCompetition = positionCompetition[position] || 60;
  const multiplier = levelMultiplier[currentLevel] || 1.0;
  const yearFactor = Math.max(0.8, 1 - (classYear - 2025) * 0.05);

  const competitionScore = Math.round(baseCompetition * multiplier * yearFactor);

  let competitionIndex: "Low" | "Medium" | "High" | "Very High";
  if (competitionScore < 50) competitionIndex = "Low";
  else if (competitionScore < 65) competitionIndex = "Medium";
  else if (competitionScore < 80) competitionIndex = "High";
  else competitionIndex = "Very High";

  let depthChartPosition: string;
  if (competitionScore < 50) depthChartPosition = "#1 – #2";
  else if (competitionScore < 65) depthChartPosition = "#2 – #4";
  else if (competitionScore < 80) depthChartPosition = "#3 – #5";
  else depthChartPosition = "#4 – #6";

  let timelineToStart: string;
  if (competitionScore < 50) timelineToStart = "Freshman Year";
  else if (competitionScore < 65) timelineToStart = "Year 1–2";
  else if (competitionScore < 80) timelineToStart = "Year 2";
  else timelineToStart = "Year 2–3";

  let rosterVolatility: "Stable" | "Moderate" | "High";
  if (position === "P" || position === "C") rosterVolatility = "High";
  else if (position === "SS" || position === "CF") rosterVolatility = "Moderate";
  else rosterVolatility = "Stable";

  const recommendations: string[] = [];
  if (competitionIndex === "Very High") {
    recommendations.push("Consider schools with fewer returning starters at your position");
    recommendations.push("Ask about redshirt opportunities to develop without losing eligibility");
  }
  if (competitionIndex === "High") {
    recommendations.push("Focus on programs with graduating seniors at your position");
    recommendations.push("Discuss development plan with coaching staff");
  }
  if (competitionIndex === "Medium" || competitionIndex === "Low") {
    recommendations.push("You're well-positioned for early playing time");
    recommendations.push("Negotiate for a clear path to starting role");
  }
  recommendations.push("Always verify roster composition before committing");
  recommendations.push("Ask about incoming recruits at your position");

  const verificationQuestions = [
    "How many players are currently ahead of me on the depth chart?",
    "What's your development plan for players at my position?",
    "How many players at my position are graduating in the next 2 years?",
    "What's your typical timeline for freshmen to earn playing time?",
    "Are there any incoming transfers or recruits at my position?",
    "What would I need to demonstrate to earn a starting spot?",
    "How do you handle redshirt decisions?",
    "Can I see the current roster breakdown by position and class year?",
  ];

  const schoolAnalysis = targetSchools.map((school) => {
    const schoolVariance = Math.random() * 20 - 10;
    const schoolScore = Math.max(20, Math.min(100, competitionScore + schoolVariance));

    let projectedPos: string;
    if (schoolScore < 50) projectedPos = "#1 – #2";
    else if (schoolScore < 65) projectedPos = "#2 – #4";
    else if (schoolScore < 80) projectedPos = "#3 – #5";
    else projectedPos = "#4 – #6";

    let time: string;
    if (schoolScore < 50) time = "Freshman";
    else if (schoolScore < 65) time = "Year 1–2";
    else if (schoolScore < 80) time = "Year 2";
    else time = "Year 2–3";

    return {
      school,
      competitionScore: Math.round(schoolScore),
      projectedPosition: projectedPos,
      timeToStart: time,
    };
  });

  return {
    depthChartPosition,
    competitionIndex,
    timelineToStart,
    rosterVolatility,
    recommendations,
    verificationQuestions,
    schoolAnalysis,
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/pathway-check", async (req, res) => {
    try {
      const parsed = insertPathwayCheckSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid request data", details: parsed.error.flatten() });
      }

      const check = await storage.createPathwayCheck(parsed.data);

      const results = generatePathwayResults(
        parsed.data.position,
        parsed.data.classYear,
        parsed.data.targetSchools,
        parsed.data.currentLevel
      );

      const updated = await storage.updatePathwayResults(check.id, results);

      return res.status(201).json(updated);
    } catch (error) {
      console.error("Error creating pathway check:", error);
      return res.status(500).json({ error: "Failed to create pathway check" });
    }
  });

  app.get("/api/pathway-check/:id", async (req, res) => {
    try {
      const check = await storage.getPathwayCheck(req.params.id);
      if (!check) {
        return res.status(404).json({ error: "Pathway check not found" });
      }
      return res.json(check);
    } catch (error) {
      console.error("Error fetching pathway check:", error);
      return res.status(500).json({ error: "Failed to fetch pathway check" });
    }
  });

  return httpServer;
}
