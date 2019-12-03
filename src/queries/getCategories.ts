import { PostgresDB } from "../types";

export async function getCategories(db: PostgresDB) {
  return await db.any<Budget.Category>(
    `
      SELECT *
      FROM categories
      ORDER BY budget_id, group_id
    `
  );
}
