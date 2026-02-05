import {
  type User,
  type InsertUser,
  type PathwayCheck,
  type InsertPathwayCheck,
  type PathwayResults,
  users,
  pathwayChecks,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPathwayCheck(data: InsertPathwayCheck): Promise<PathwayCheck>;
  getPathwayCheck(id: string): Promise<PathwayCheck | undefined>;
  updatePathwayResults(id: string, results: PathwayResults): Promise<PathwayCheck | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createPathwayCheck(data: InsertPathwayCheck): Promise<PathwayCheck> {
    const [check] = await db.insert(pathwayChecks).values(data).returning();
    return check;
  }

  async getPathwayCheck(id: string): Promise<PathwayCheck | undefined> {
    const [check] = await db.select().from(pathwayChecks).where(eq(pathwayChecks.id, id));
    return check;
  }

  async updatePathwayResults(id: string, results: PathwayResults): Promise<PathwayCheck | undefined> {
    const [check] = await db
      .update(pathwayChecks)
      .set({ results })
      .where(eq(pathwayChecks.id, id))
      .returning();
    return check;
  }
}

export const storage = new DatabaseStorage();
