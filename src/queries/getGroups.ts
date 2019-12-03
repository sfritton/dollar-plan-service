import { PostgresDB } from "../types";

export async function getGroups(db: PostgresDB) {
  return await db.any<Budget.Group>(
    `
      SELECT *
      FROM groups
      ORDER BY budget_id
    `
  );
}
