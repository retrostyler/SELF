// Storage implementation following javascript_database and javascript_log_in_with_replit blueprints
import {
  users,
  projects,
  experiences,
  skills,
  leadership,
  siteContent,
  contactSubmissions,
  type User,
  type UpsertUser,
  type Project,
  type InsertProject,
  type Experience,
  type InsertExperience,
  type Skill,
  type InsertSkill,
  type Leadership,
  type InsertLeadership,
  type SiteContent,
  type InsertSiteContent,
  type ContactSubmission,
  type InsertContactSubmission,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (REQUIRED for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Projects
  getAllProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: string): Promise<void>;

  // Experiences
  getAllExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: string, experience: Partial<InsertExperience>): Promise<Experience>;
  deleteExperience(id: string): Promise<void>;

  // Skills
  getAllSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: string, skill: Partial<InsertSkill>): Promise<Skill>;
  deleteSkill(id: string): Promise<void>;

  // Leadership
  getAllLeadership(): Promise<Leadership[]>;
  createLeadership(leadership: InsertLeadership): Promise<Leadership>;
  updateLeadership(id: string, leadership: Partial<InsertLeadership>): Promise<Leadership>;
  deleteLeadership(id: string): Promise<void>;

  // Site Content
  getSiteContent(): Promise<SiteContent | undefined>;
  updateSiteContent(content: Partial<InsertSiteContent>): Promise<SiteContent>;

  // Contact Submissions
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  markContactAsRead(id: string): Promise<void>;
  deleteContactSubmission(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations (MANDATORY for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Projects
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.displayOrder), desc(projects.createdAt));
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
    return project;
  }

  async createProject(projectData: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(projectData).returning();
    return project;
  }

  async updateProject(id: string, projectData: Partial<InsertProject>): Promise<Project> {
    const [project] = await db
      .update(projects)
      .set({ ...projectData, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Experiences
  async getAllExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).orderBy(desc(experiences.displayOrder), desc(experiences.createdAt));
  }

  async createExperience(experienceData: InsertExperience): Promise<Experience> {
    const [experience] = await db.insert(experiences).values(experienceData).returning();
    return experience;
  }

  async updateExperience(id: string, experienceData: Partial<InsertExperience>): Promise<Experience> {
    const [experience] = await db
      .update(experiences)
      .set({ ...experienceData, updatedAt: new Date() })
      .where(eq(experiences.id, id))
      .returning();
    return experience;
  }

  async deleteExperience(id: string): Promise<void> {
    await db.delete(experiences).where(eq(experiences.id, id));
  }

  // Skills
  async getAllSkills(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(skills.category, desc(skills.displayOrder));
  }

  async createSkill(skillData: InsertSkill): Promise<Skill> {
    const [skill] = await db.insert(skills).values(skillData).returning();
    return skill;
  }

  async updateSkill(id: string, skillData: Partial<InsertSkill>): Promise<Skill> {
    const [skill] = await db
      .update(skills)
      .set(skillData)
      .where(eq(skills.id, id))
      .returning();
    return skill;
  }

  async deleteSkill(id: string): Promise<void> {
    await db.delete(skills).where(eq(skills.id, id));
  }

  // Leadership
  async getAllLeadership(): Promise<Leadership[]> {
    return await db.select().from(leadership).orderBy(desc(leadership.displayOrder), desc(leadership.createdAt));
  }

  async createLeadership(leadershipData: InsertLeadership): Promise<Leadership> {
    const [item] = await db.insert(leadership).values(leadershipData).returning();
    return item;
  }

  async updateLeadership(id: string, leadershipData: Partial<InsertLeadership>): Promise<Leadership> {
    const [item] = await db
      .update(leadership)
      .set({ ...leadershipData, updatedAt: new Date() })
      .where(eq(leadership.id, id))
      .returning();
    return item;
  }

  async deleteLeadership(id: string): Promise<void> {
    await db.delete(leadership).where(eq(leadership.id, id));
  }

  // Site Content
  async getSiteContent(): Promise<SiteContent | undefined> {
    const [content] = await db.select().from(siteContent).limit(1);
    return content;
  }

  async updateSiteContent(contentData: Partial<InsertSiteContent>): Promise<SiteContent> {
    // Check if content exists
    const existing = await this.getSiteContent();
    
    if (existing) {
      const [content] = await db
        .update(siteContent)
        .set({ ...contentData, updatedAt: new Date() })
        .where(eq(siteContent.id, "singleton"))
        .returning();
      return content;
    } else {
      // Create if doesn't exist
      const [content] = await db
        .insert(siteContent)
        .values({ id: "singleton", ...contentData } as any)
        .returning();
      return content;
    }
  }

  // Contact Submissions
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async createContactSubmission(submissionData: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(submissionData).returning();
    return submission;
  }

  async markContactAsRead(id: string): Promise<void> {
    await db
      .update(contactSubmissions)
      .set({ read: true })
      .where(eq(contactSubmissions.id, id));
  }

  async deleteContactSubmission(id: string): Promise<void> {
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  }
}

export const storage = new DatabaseStorage();
