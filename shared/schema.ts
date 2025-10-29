// Schema for Arham Aqeel's Portfolio CMS
// Following javascript_database and javascript_log_in_with_replit blueprints

import { sql, relations } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ============ AUTH TABLES (Required for Replit Auth) ============

// Session storage table - MANDATORY for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - MANDATORY for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// ============ PORTFOLIO CONTENT TABLES ============

// Projects table - stores portfolio projects with case studies
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: varchar("category", { length: 100 }).notNull(), // "Product Management", "Engineering", "Marketing"
  shortDescription: text("short_description").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  technologies: text("technologies").array().notNull().default(sql`ARRAY[]::text[]`),
  timeline: varchar("timeline", { length: 100 }), // e.g., "Apr 2024 – May 2024"
  teamSize: varchar("team_size", { length: 100 }), // e.g., "25-member team"
  role: text("role"), // e.g., "Lead Designer"
  
  // Case study content
  caseStudyHeroImage: text("case_study_hero_image"),
  problemStatement: text("problem_statement"),
  solution: text("solution"),
  process: text("process"), // Can be rich text/markdown
  results: text("results"),
  metrics: jsonb("metrics"), // Array of {label, value} objects
  images: text("images").array().default(sql`ARRAY[]::text[]`), // Additional case study images
  
  // Meta
  featured: boolean("featured").default(false),
  displayOrder: integer("display_order").default(0),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Experience table - professional work experience
export const experiences = pgTable("experiences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  company: text("company").notNull(),
  role: text("role").notNull(),
  duration: varchar("duration", { length: 100 }).notNull(), // e.g., "Mar 2025 – May 2025"
  location: varchar("location", { length: 100 }),
  type: varchar("type", { length: 50 }).notNull(), // "internship", "full-time", "research"
  achievements: text("achievements").array().notNull().default(sql`ARRAY[]::text[]`),
  companyLogo: text("company_logo"),
  
  // Meta
  displayOrder: integer("display_order").default(0),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experiences.$inferSelect;

// Skills table - technical and soft skills
export const skills = pgTable("skills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 100 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // "Product Management", "Analytics", "Design", etc.
  proficiency: integer("proficiency").default(80), // 0-100
  iconName: varchar("icon_name", { length: 100 }), // Lucide icon name
  
  // Meta
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  createdAt: true,
});

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

// Leadership & Initiatives table
export const leadership = pgTable("leadership", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organization: text("organization").notNull(),
  role: text("role").notNull(),
  duration: varchar("duration", { length: 100 }).notNull(),
  description: text("description"),
  contributions: text("contributions").array().notNull().default(sql`ARRAY[]::text[]`),
  logoUrl: text("logo_url"),
  
  // Meta
  displayOrder: integer("display_order").default(0),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertLeadershipSchema = createInsertSchema(leadership).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertLeadership = z.infer<typeof insertLeadershipSchema>;
export type Leadership = typeof leadership.$inferSelect;

// About/Bio content - single record site configuration
export const siteContent = pgTable("site_content", {
  id: varchar("id").primaryKey().default("singleton"), // Only one record
  
  // Hero section
  heroTitle: text("hero_title").notNull(),
  heroSubtitle: text("hero_subtitle").notNull(),
  heroImageUrl: text("hero_image_url"),
  
  // About section
  aboutBio: text("about_bio").notNull(),
  aboutImageUrl: text("about_image_url"),
  location: varchar("location", { length: 100 }),
  availability: varchar("availability", { length: 100 }), // "Open to opportunities"
  
  // Contact info
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  linkedin: varchar("linkedin", { length: 255 }),
  github: varchar("github", { length: 255 }),
  portfolio: varchar("portfolio", { length: 255 }),
  twitter: varchar("twitter", { length: 255 }),
  
  // Resume
  resumeUrl: text("resume_url"),
  
  // Meta
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSiteContentSchema = createInsertSchema(siteContent).omit({
  id: true,
  updatedAt: true,
});

export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type SiteContent = typeof siteContent.$inferSelect;

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  read: true,
  createdAt: true,
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
