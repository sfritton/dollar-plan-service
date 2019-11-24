import * as Express from "express";
import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";
import { NOT_FOUND_MESSAGE } from "./constants";

export const registerRoutes = (
  app: Express.Application,
  db: pgPromise.IDatabase<{}, pg.IClient>
) => {
  app.get("/budgets", async (req, res) => {
    try {
      const budgets = await db.any(
        `
          SELECT *
          FROM budgets
          ORDER BY year DESC, month DESC
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

  app.get("/budgets/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const budget = await db.one(
        `
          SELECT *
          FROM budgets
          WHERE id = $[id]
        `,
        { id }
      );
      const groups = await db.any(
        `
          SELECT *
          FROM groups
          WHERE budget_id = $[id]
        `,
        { id }
      );
      return res.json({ ...budget, groups });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);

      res.status(error?.message === NOT_FOUND_MESSAGE ? 404 : 500);
      res.json({ error: error.message || error });
    }
  });

  app.post("/budgets", async (req, res) => {
    try {
      const id = await db.one(
        `
          INSERT INTO budgets(month, year)
          VALUES( $[month], $[year])
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
