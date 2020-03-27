import { PostgresDB } from "../types";

export async function updateGroup(db: PostgresDB, group: Budget.Group) {
  return await db.none(
    `
      UPDATE groups
      SET title = $[title], is_income = $[is_income], sort = $[sort]
      WHERE id = $[id]
    `,
    group
  );
}
