import express from "express";
import dotenv from "dotenv";
import { registerRoutes } from "./routes";

// initialize configuration
dotenv.config();

// dotenv creates environment variables from a .env file
const port = process.env.SERVER_PORT;

const app = express();

// define route handlers
registerRoutes(app);

// start the server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server running on port ${port}`);
});
