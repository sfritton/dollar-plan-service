import { PostgresDB } from "../types";

export async function createBudget(
  db: PostgresDB,
  budget: Omit<Budget.Budget, "id">
) {
  return await db.one<number>(
    `
      INSERT INTO budgets(month, year)
      VALUES( $[month], $[year])
      RETURNING id;
    `,
    budget
  );
}
