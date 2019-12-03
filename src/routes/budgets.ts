import * as Express from "express";
import { NOT_FOUND_MESSAGE } from "./constants";
import { PostgresDB } from "../types";
import { getAllBudgets } from "../queries/getAllBudgets";
import { getBudgetById } from "../queries/getBudgetById";
import { createBudget } from "../queries/createBudget";

export const registerRoutes = (app: Express.Application, db: PostgresDB) => {
  app.get("/budgets", async (req, res) => {
    try {
      const budgets = await getAllBudgets(db);
      return res.json(budgets);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);

      res.status(500);
      res.json({ error: error.message || error });
    }
  });

  app.get("/budgets/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const budget = await getBudgetById(db, id);

      return res.json(budget);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);

      res.status(error?.message === NOT_FOUND_MESSAGE ? 404 : 500);
      res.json({ error: error.message || error });
    }
  });

  app.post("/budgets", async (req, res) => {
    try {
      const id = await createBudget(db, req.body);
      return res.json(id);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);

      res.status(500);
      res.json({ error: err.message || err });
    }
  });
};
