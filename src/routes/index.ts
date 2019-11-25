import * as Express from "express";
import pgPromise from "pg-promise";
import { registerRoutes as registerBudgetRoutes } from "./budgets";
import { registerRoutes as registerGroupRoutes } from "./groups";
import { registerRoutes as registerCategoryRoutes } from "./categories";
import { registerRoutes as registerTransactionRoutes } from "./transactions";

export const registerRoutes = (app: Express.Application) => {
  const port = parseInt(process.env.PGPORT || "5432", 10);
  const config = {
    database: process.env.PGDATABASE || "postgres",
    host: process.env.PGHOST || "localhost",
    port,
    user: process.env.PGUSER || "postgres"
  };

  const pgp = pgPromise();
  const db = pgp(config);

  registerBudgetRoutes(app, db);
  registerGroupRoutes(app, db);
  registerCategoryRoutes(app, db);
  registerTransactionRoutes(app, db);
};
