import express from "express";
const app = express();
const port = 3000;

// define route handlers
app.get("/", (req, res, next) => {
  res.send("Hello world!");
});

// start the server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server running on port ${port}`);
});
