import * as Express from "express";
import { PostgresDB } from "../types";
import { getTransactions } from "../queries/getTransactions";
import { createTransaction } from "../queries/createTransaction";
import { getBudgetById } from "../queries/getBudgetById";
import { updateTransaction } from "../queries/updateTransaction";
import { deleteTransaction } from "../queries/deleteTransaction";

interface Modified {
  isNew?: boolean;
  isUpdated?: boolean;
}

interface SaveTransactionsBody {
  id: number;
  transactions: (
    | (Budget.Transaction & Modified)
    | { id: number; isDeleted: true }
  )[];
}

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

  app.post("/transaction", async (req, res) => {
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

  app.post("/transactions", async (req, res) => {
    try {
      const { id, transactions } = req.body as SaveTransactionsBody;

      await Promise.all(
        transactions.map(transaction => {
          if ("isDeleted" in transaction) {
            if (transaction.isDeleted)
              return deleteTransaction(db, transaction.id);
          } else {
            if (transaction.isNew) return createTransaction(db, transaction);
            if (transaction.isUpdated)
              return updateTransaction(db, transaction);
          }
        })
      );

      const budget = await getBudgetById(db, String(id));
      return res.json(budget);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);

      res.status(500);
      res.json({ error: err.message || err });
    }
  });
};
