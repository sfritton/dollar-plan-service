import { PostgresDB } from "../types";

export async function getTransactions(db: PostgresDB) {
  return await db.any<Budget.Transaction>(
    `
      SELECT *
      FROM transactions
      ORDER BY budget_id, group_id, category_id
    `
  );
}
