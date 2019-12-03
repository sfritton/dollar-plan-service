import * as Express from "express";
import { PostgresDB } from "../types";
import { createGroup } from "../queries/createGroup";
import { getGroups } from "../queries/getGroups";

export const registerRoutes = (app: Express.Application, db: PostgresDB) => {
  app.get("/groups", async (req, res) => {
    try {
      const groups = await getGroups(db);
      return res.json(groups);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);

      res.status(500);
      res.json({ error: error.message || error });
    }
  });

  app.post("/groups", async (req, res) => {
    try {
      const id = await createGroup(db, req.body);
      return res.json(id);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);

      res.status(500);
      res.json({ error: err.message || err });
    }
  });
};
