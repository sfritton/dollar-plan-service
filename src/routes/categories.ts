import * as Express from "express";
import { PostgresDB } from "../types";

export const registerRoutes = (app: Express.Application, db: PostgresDB) => {
  app.get("/categories", async (req, res) => {
    try {
      const budgets = await db.any(
        `
          SELECT *
          FROM categories
          ORDER BY budget_id, group_id
        `
      );
      return res.json(budgets);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);

      res.status(500);
      res.json({ error: error.message || error });
    }
  });

  app.post("/categories", async (req, res) => {
    try {
      const id = await db.one(
        `
          INSERT INTO categories(budget_id, title, group_id, planned_amount, notes)
          VALUES( $[budget_id], $[title], $[group_id], $[planned_amount], $[notes])
          RETURNING id;`,
        req.body
      );
      return res.json(id);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);

      res.status(500);
      res.json({ error: err.message || err });
    }
  });
};
