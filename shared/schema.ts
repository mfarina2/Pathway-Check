import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const pathwayChecks = pgTable("pathway_checks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  position: text("position").notNull(),
  classYear: integer("class_year").notNull(),
  targetSchools: text("target_schools").array().notNull(),
  currentLevel: text("current_level").notNull(),
  goals: text("goals"),
  results: jsonb("results"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPathwayCheckSchema = createInsertSchema(pathwayChecks).omit({
  id: true,
  results: true,
  createdAt: true,
});

export type InsertPathwayCheck = z.infer<typeof insertPathwayCheckSchema>;
export type PathwayCheck = typeof pathwayChecks.$inferSelect;

export interface PathwayResults {
  depthChartPosition: string;
  competitionIndex: "Low" | "Medium" | "High" | "Very High";
  timelineToStart: string;
  rosterVolatility: "Stable" | "Moderate" | "High";
  recommendations: string[];
  verificationQuestions: string[];
  schoolAnalysis: {
    school: string;
    competitionScore: number;
    projectedPosition: string;
    timeToStart: string;
  }[];
}

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;

