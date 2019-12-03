import { PostgresDB } from "../types";
import { createBudget } from "./createBudget";
import { createGroup } from "./createGroup";
import { createCategory } from "./createCategory";
import { createTransaction } from "./createTransaction";

export async function saveLegacyBudget(
  db: PostgresDB,
  budget: BudgetLegacy.Budget
) {
  // save the budget
  const { id: budget_id } = await createBudget(db, budget.date);

  await Promise.all(
    Object.entries(budget.categoryGroups).map(async ([key, group]) => {
      // save each group
      const { id: group_id } = await createGroup(db, {
        budget_id,
        title: group.title,
        is_income: key === "income"
      });

      return await Promise.all(
        Object.values(group.categories).map(async category => {
          // save each category
          const { id: category_id } = await createCategory(db, {
            budget_id,
            group_id,
            title: category.title,
            planned_amount: category.plannedAmount,
            notes: category.notes ?? ""
          });

          return await Promise.all(
            Object.values(category.transactions).map(transaction =>
              // save each transaction
              createTransaction(db, {
                budget_id,
                group_id,
                category_id,
                amount: transaction.amount,
                description: transaction.description,
                date: transaction.date
              })
            )
          );
        })
      );
    })
  );

  return budget_id;
}
