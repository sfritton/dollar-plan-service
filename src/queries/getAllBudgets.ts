import { PostgresDB } from "../types";

export async function getAllBudgets(db: PostgresDB) {
  return await db.any<Budget.Budget>(
    `
      SELECT *
      FROM budgets
      ORDER BY year DESC, month DESC
    `
  );
}
