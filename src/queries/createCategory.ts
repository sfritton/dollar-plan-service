import { PostgresDB } from "../types";

export async function createCategory(
  db: PostgresDB,
  category: Omit<Budget.Category, "id">
) {
  return await db.one<number>(
    `
      INSERT INTO categories(budget_id, title, group_id, planned_amount, notes)
      VALUES( $[budget_id], $[title], $[group_id], $[planned_amount], $[notes])
      RETURNING id;
    `,
    category
  );
}
