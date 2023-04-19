const express = require("express");
const app = express();
const cors = require("cors")
const logger = require("morgan")
const transactionsController = require("./Controllers/transactionsController.js")

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(logger('dev'))

// /transactions is the base url endpoint for the routes
// middleware
app.use("/transactions", transactionsController);

// Separation of concerns
// app.use((req, res, next) => {
//   console.log("This code runs for every request");
//   next();
// });

app.get("/", (_, res) => {
  res.send("Welcome to the Transactions App");
})

// 404 page
app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
})

module.exports = app;
