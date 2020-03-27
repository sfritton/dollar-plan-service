import { PostgresDB } from "../types";

export async function updateTransaction(
  db: PostgresDB,
  transaction: Budget.Transaction
) {
  return await db.none(
    `
      UPDATE transactions
      SET amount = $[amount], date = $[date], description = $[description]
      WHERE id = $[id]
    `,
    transaction
  );
}
