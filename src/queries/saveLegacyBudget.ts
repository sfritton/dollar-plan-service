import { PostgresDB } from "../types";
import { createBudget } from "./createBudget";
import { createGroup } from "./createGroup";

export async function saveLegacyBudget(
  db: PostgresDB,
  budget: BudgetLegacy.Budget
) {
  const budget_id = await createBudget(db, budget.date);

  Object.entries(budget.categoryGroups).forEach(async ([key, group]) => {
    const group_id = await createGroup(db, {
      budget_id,
      title: group.title,
      is_income: key === "income"
    });
  });
}
