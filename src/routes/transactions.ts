import * as Express from "express";
import { PostgresDB } from "../types";
import { getTransactions } from "../queries/getTransactions";
import { createTransaction } from "../queries/createTransaction";

export const registerRoutes = (app: Express.Application, db: PostgresDB) => {
  app.get("/transactions", async (req, res) => {
    try {
      const transactions = await getTransactions(db);
      return res.json(transactions);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);

      res.status(500);
      res.json({ error: error.message || error });
    }
  });

  app.post("/transactions", async (req, res) => {
    try {
      const id = await createTransaction(db, req.body);
      return res.json(id);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);

      res.status(500);
      res.json({ error: err.message || err });
    }
  });
};
