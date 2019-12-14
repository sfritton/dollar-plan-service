import { PostgresDB, ID } from "../types";

export async function createGroup(
  db: PostgresDB,
  group: Omit<Budget.Group, "id">
) {
  return await db.one<ID>(
    `
      INSERT INTO groups(budget_id, title, is_income, sort)
      VALUES( $[budget_id], $[title], $[is_income], $[sort])
      RETURNING id;
    `,
    group
  );
}
