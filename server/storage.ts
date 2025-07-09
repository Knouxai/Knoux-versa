import {
  users,
  transformations,
  vipSessions,
  type User,
  type InsertUser,
  type Transformation,
  type InsertTransformation,
  type VipSession,
  type InsertVipSession,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  createTransformation(
    transformation: InsertTransformation,
  ): Promise<Transformation>;
  getTransformation(id: number): Promise<Transformation | undefined>;
  getUserTransformations(userId?: number): Promise<Transformation[]>;

  createVipSession(session: InsertVipSession): Promise<VipSession>;
  getVipSession(sessionKey: string): Promise<VipSession | undefined>;
  deactivateVipSession(sessionKey: string): Promise<void>;
}

// Mock storage for development when database is not available
export class MockStorage implements IStorage {
  private users: User[] = [];
  private transformations: Transformation[] = [];
  private vipSessions: VipSession[] = [];
  private idCounter = 1;

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find((u) => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.idCounter++,
      ...insertUser,
    };
    this.users.push(user);
    return user;
  }

  async createTransformation(
    insertTransformation: InsertTransformation,
  ): Promise<Transformation> {
    const transformation: Transformation = {
      id: this.idCounter++,
      userId: insertTransformation.userId ?? null,
      originalImageUrl: insertTransformation.originalImageUrl,
      transformedImageUrl: insertTransformation.transformedImageUrl,
      prompt: insertTransformation.prompt,
      service: insertTransformation.service,
      selectionData: insertTransformation.selectionData ?? null,
      quality: insertTransformation.quality ?? "standard",
      isVIP: insertTransformation.isVIP ?? false,
      createdAt: new Date(),
    };
    this.transformations.push(transformation);
    return transformation;
  }

  async getTransformation(id: number): Promise<Transformation | undefined> {
    return this.transformations.find((t) => t.id === id);
  }

  async getUserTransformations(userId?: number): Promise<Transformation[]> {
    if (userId) {
      return this.transformations.filter((t) => t.userId === userId);
    }
    return [...this.transformations];
  }

  async createVipSession(
    insertVipSession: InsertVipSession,
  ): Promise<VipSession> {
    const session: VipSession = {
      id: this.idCounter++,
      sessionKey: insertVipSession.sessionKey,
      isActive: insertVipSession.isActive !== undefined ? insertVipSession.isActive : true,
      expiresAt: insertVipSession.expiresAt ?? null,
      createdAt: new Date(),
    };
    this.vipSessions.push(session);
    return session;
  }

  async getVipSession(sessionKey: string): Promise<VipSession | undefined> {
    return this.vipSessions.find(
      (s) => s.sessionKey === sessionKey && s.isActive,
    );
  }

  async deactivateVipSession(sessionKey: string): Promise<void> {
    const session = this.vipSessions.find((s) => s.sessionKey === sessionKey);
    if (session) {
      session.isActive = false;
    }
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    if (!db) throw new Error("Database not available");
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not available");
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error("Database not available");
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createTransformation(
    insertTransformation: InsertTransformation,
  ): Promise<Transformation> {
    if (!db) throw new Error("Database not available");
    const [transformation] = await db
      .insert(transformations)
      .values(insertTransformation)
      .returning();
    return transformation;
  }

  async getTransformation(id: number): Promise<Transformation | undefined> {
    if (!db) throw new Error("Database not available");
    const [transformation] = await db
      .select()
      .from(transformations)
      .where(eq(transformations.id, id));
    return transformation || undefined;
  }

  async getUserTransformations(userId?: number): Promise<Transformation[]> {
    if (!db) throw new Error("Database not available");
    if (userId) {
      return await db
        .select()
        .from(transformations)
        .where(eq(transformations.userId, userId));
    }
    return await db.select().from(transformations);
  }

  async createVipSession(
    insertVipSession: InsertVipSession,
  ): Promise<VipSession> {
    if (!db) throw new Error("Database not available");
    const [session] = await db
      .insert(vipSessions)
      .values(insertVipSession)
      .returning();
    return session;
  }

  async getVipSession(sessionKey: string): Promise<VipSession | undefined> {
    if (!db) throw new Error("Database not available");
    const [session] = await db
      .select()
      .from(vipSessions)
      .where(eq(vipSessions.sessionKey, sessionKey));
    return session || undefined;
  }

  async deactivateVipSession(sessionKey: string): Promise<void> {
    if (!db) throw new Error("Database not available");
    await db
      .update(vipSessions)
      .set({ isActive: false })
      .where(eq(vipSessions.sessionKey, sessionKey));
  }
}

// Use mock storage when database is not available, otherwise use real database storage
export const storage: IStorage = db ? new DatabaseStorage() : new MockStorage();

if (!db) {
  console.warn(
    "⚠️  Using mock storage. Data will not persist between server restarts.",
  );
}
