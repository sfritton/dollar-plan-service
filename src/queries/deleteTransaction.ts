import { PostgresDB } from "../types";

export async function deleteTransaction(db: PostgresDB, id: number) {
  return await db.none(
    `
      DELETE FROM transactions
      WHERE id = $[id]
    `,
    { id }
  );
}
