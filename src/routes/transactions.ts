import * as Express from "express";
import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

export const registerRoutes = (
  app: Express.Application,
  db: pgPromise.IDatabase<{}, pg.IClient>
) => {
  app.get("/transactions", async (req, res) => {
    try {
      const budgets = await db.any(
        `
          SELECT *
          FROM transactions
          ORDER BY budget_id, group_id, category_id
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

  app.post("/transactions", async (req, res) => {
    try {
      const id = await db.one(
        `
          INSERT INTO transactions(budget_id, group_id, category_id, amount, date, description)
          VALUES($[budget_id], $[group_id], $[category_id], $[amount], $[date], $[description])
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
