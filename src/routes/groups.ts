import * as Express from "express";
import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";

export const registerRoutes = (
  app: Express.Application,
  db: pgPromise.IDatabase<{}, pg.IClient>
) => {
  app.get("/groups", async (req, res) => {
    try {
      const budgets = await db.any(
        `
          SELECT *
          FROM groups
          ORDER BY budget_id
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

  app.post("/groups", async (req, res) => {
    try {
      const id = await db.one(
        `
          INSERT INTO groups(budget_id, title, is_income)
          VALUES( $[budget_id], $[title], $[is_income])
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
