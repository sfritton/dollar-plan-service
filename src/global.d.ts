declare namespace Budget {
  interface Budget {
    month: number;
    year: number;
    id: number;
  }

  interface BudgetResponse extends Budget {
    groups: Record<string, Group>;
    categories: Record<string, Category>;
    transactions: Record<string, Transaction>;
  }

  interface Group {
    id: number;
    budget_id: number;
    title: string;
    is_income: boolean;
  }

  interface Category {
    id: number;
    group_id: number;
    budget_id: number;
    title: string;
    planned_amount: number;
    notes: string;
  }

  interface Transaction {
    id: number;
    category_id: number;
    group_id: number;
    budget_id: number;
    amount: number;
    date: number;
    description: string;
  }
}

declare namespace BudgetLegacy {
  interface Budget {
    date: DateClass;
    categoryGroups: Record<string, CategoryGroup>;
  }

  interface CategoryGroup {
    title: string;
    categories: Record<string, Category>;
  }

  interface Category {
    title: string;
    plannedAmount: number;
    transactions: Transaction[];
    notes?: string;
  }

  interface Transaction {
    id: number;
    amount: number;
    date: number;
    description: string;
  }

  interface DateClass {
    month: number;
    year: number;
  }
}
