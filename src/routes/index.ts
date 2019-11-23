import * as Express from "express";

export const registerRoutes = (app: Express.Application) => {
  app.get("/budgets/:budgetId", (req, res) => {
    const budgetId = req.params.budgetId;
    res.send(`returns a budget with id ${budgetId}`);
  });

  app.get("/budgets", (req, res) => {
    res.send("returns all budgets");
  });

  app.post("/budgets/:budgetId", (req, res) => {
    res.send("creates a budget if none exists, otherwise returns an error");
  });

  app.put("/budgets/:budgetId", (req, res) => {
    res.send("updates the budget if it exists, otherwise returns an error");
  });
};
