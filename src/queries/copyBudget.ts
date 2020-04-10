import { PostgresDB } from "../types";
import { createBudget } from "./createBudget";
import { createGroup } from "./createGroup";
import { createCategory } from "./createCategory";
import { createTransaction } from "./createTransaction";
import { getBudgetById } from "./getBudgetById";

interface Options {
  oldBudgetId: number;
  newBudgetId: number;
}

export async function copyBudget(
  db: PostgresDB,
  { oldBudgetId, newBudgetId }: Options
) {
  // fetch the old budget
  const { categories, groups } = await getBudgetById(db, String(oldBudgetId));

  await Promise.all(
    Object.values(groups).map(async (group) => {
      // copy each group and assign it to the new budget
      const { id: group_id } = await createGroup(db, {
        budget_id: newBudgetId,
        title: group.title,
        is_income: group.is_income,
        sort: group.sort,
      });

      // copy each of the group's categories
      // and assign them to the new budget and the new group
      return await Promise.all(
        Object.values(categories)
          .filter((category) => category.group_id === group.id)
          .map((category) =>
            createCategory(db, {
              budget_id: newBudgetId,
              group_id,
              title: category.title,
              planned_amount: category.planned_amount,
              notes: category.notes ?? "",
              sort: category.sort,
            })
          )
      );
    })
  );
}
