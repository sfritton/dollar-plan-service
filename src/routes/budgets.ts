import * as Express from "express";
import { NOT_FOUND_MESSAGE } from "./constants";
import { PostgresDB } from "../types";
import { getAllBudgets } from "../queries/getAllBudgets";
import { getBudgetById } from "../queries/getBudgetById";
import { createBudget } from "../queries/createBudget";
import { saveLegacyBudget } from "../queries/saveLegacyBudget";
import { createGroup } from "../queries/createGroup";
import { updateGroup } from "../queries/updateGroup";
import { createCategory } from "../queries/createCategory";
import { updateCategory } from "../queries/updateCategory";
import { copyBudget } from "../queries/copyBudget";

const path = "/budgets" as const;

interface Modified {
  isNew?: boolean;
  isUpdated?: boolean;
}

interface PutRequestBody {
  id: number;
  groups: (Budget.Group & Modified)[];
  categories: (Budget.Category & Modified)[];
}

export const registerRoutes = (app: Express.Application, db: PostgresDB) => {
  app.get(path, async (req, res) => {
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

  app.get(`${path}/:id`, async (req, res) => {
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

  app.post(`${path}/legacy`, async (req, res) => {
    try {
      const id = await saveLegacyBudget(db, req.body);

      const budget = await getBudgetById(db, String(id));
      return res.json(budget);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);

      res.status(500);
      res.json({ error: error.message || error });
    }
  });

  app.post(path, async (req, res) => {
    try {
      const id = await createBudget(db, req.body);

      if (req.body.isCopying)
        await copyBudget(db, {
          oldBudgetId: req.body.prevBudgetId,
          newBudgetId: id.id,
        });

      return res.json(id);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);

      res.status(500);
      res.json({ error: err.message || err });
    }
  });

  app.put(`${path}`, async (req, res) => {
    try {
      const { id, groups, categories } = req.body as PutRequestBody;

      // Create or update groups, and store their ids
      const groupIds = await Promise.all(
        groups.map(async (group) => {
          if (group.isNew) {
            const { id } = await createGroup(db, group);
            return { id, tempId: group.id };
          }

          if (group.isUpdated) await updateGroup(db, group);

          return { id: group.id, tempId: group.id };
        })
      );

      const groupIdMap = groupIds.reduce<Record<string, number>>(
        (acc, { id, tempId }) => ({
          ...acc,
          [tempId]: Number(id),
        }),
        {}
      );

      // Replace any temporary group_ids before updating categories
      await Promise.all(
        categories.map((category) => {
          if (category.isNew)
            return createCategory(db, {
              ...category,
              group_id: groupIdMap[category.group_id],
            });
          if (category.isUpdated)
            return updateCategory(db, {
              ...category,
              group_id: groupIdMap[category.group_id],
            });
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
