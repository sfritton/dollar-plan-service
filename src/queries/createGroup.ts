import { PostgresDB } from "../types";

export async function createGroup(
  db: PostgresDB,
  group: Omit<Budget.Group, "id">
) {
  return await db.one<number>(
    `
      INSERT INTO groups(budget_id, title, is_income)
      VALUES( $[budget_id], $[title], $[is_income])
      RETURNING id;
    `,
    group
  );
}
