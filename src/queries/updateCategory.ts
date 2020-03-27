import { PostgresDB } from "../types";

export async function updateCategory(
  db: PostgresDB,
  category: Budget.Category
) {
  return await db.none(
    `
      UPDATE categories
      SET title = $[title], planned_amount = $[planned_amount], notes = $[notes], sort = $[sort]
      WHERE id = $[id]
    `,
    category
  );
}
