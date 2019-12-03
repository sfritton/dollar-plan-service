import * as Express from "express";
import { PostgresDB } from "../types";
import { getCategories } from "../queries/getCategories";
import { createCategory } from "../queries/createCategory";

export const registerRoutes = (app: Express.Application, db: PostgresDB) => {
  app.get("/categories", async (req, res) => {
    try {
      const categories = await getCategories(db);
      return res.json(categories);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);

      res.status(500);
      res.json({ error: error.message || error });
    }
  });

  app.post("/categories", async (req, res) => {
    try {
      const id = await createCategory(db, req.body);
      return res.json(id);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);

      res.status(500);
      res.json({ error: err.message || err });
    }
  });
};
