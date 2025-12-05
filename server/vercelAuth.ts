// Simple Local Authentication for Development & Demo
// For production on Vercel, integrate with Google/GitHub OAuth
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });

  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET environment variable is required");
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  // Setup session middleware
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // Local authentication strategy for development/demo
  // In production on Vercel, integrate with Google/GitHub OAuth
  const DEMO_USERNAME = "admin";
  const DEMO_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  passport.use(
    "local",
    new LocalStrategy.Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username: string, password: string, done: any) => {
        try {
          if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
            const userId = "admin-user-001";
            await storage.upsertUser({
              id: userId,
              email: "admin@portfolio.local",
              firstName: "Admin",
              lastName: "User",
            });
            return done(null, { id: userId, username, email: "admin@portfolio.local" });
          } else {
            return done(null, false, { message: "Invalid credentials" });
          }
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Login route
  app.post("/api/login", passport.authenticate("local", { session: true }), (req, res) => {
    res.json({ message: "Logged in successfully", user: req.user });
  });

  // Logout route
  app.post("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
};
