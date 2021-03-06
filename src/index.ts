import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { registerRoutes } from "./routes";

// initialize configuration
dotenv.config();

// dotenv creates environment variables from a .env file
const port = process.env.SERVER_PORT;

const app = express();

// Configure Express to parse incoming JSON data
app.use(express.json());

// TODO: may need to revisit this
// Enable cors for all routes
app.use(cors({ origin: "http://localhost:8000" }));

// define route handlers
registerRoutes(app);

// start the server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server running on port ${port}`);
});
