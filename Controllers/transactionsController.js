const express = require("express");
const transactions = express.Router();
const transactionsArray = require("../Models/transaction.js");


// GET all the entries in the database
transactions.get("/", (_, res) => {
    res.json(transactionsArray);
});

// SHOW
transactions.get("/:arrayIndex", (req, res) => {
  if (transactionsArray[req.params.arrayIndex]){
    res.json(transactionsArray[req.params.arrayIndex])
  } else {
    res.status(404).json({ error: "Not Found" })
    response.redirect("*")
  } 
});

// CREATE a new transaction
transactions.post("/", (req, res) => {
  transactionsArray.push(req.body);
  res.json(transactionsArray[transactionsArray.length - 1])
});

// DELETE an existing transaction by array index
transactions.delete("/:arrayIndex", (req, res) => {
    const deletedTransaction = transactionsArray.splice(req.params.arrayIndex, 1);
    res.status(200).json(deletedTransaction);
});

// UPDATE an existing transaction by array index
transactions.put("/:arrayIndex", async (req, res) => {
  if (transactionsArray[req.params.arrayIndex]) {
   transactionsArray[req.params.arrayIndex] = req.body;
   res.status(200).json(transactionsArray[req.params.arrayIndex]);
    } else {
      res.status(404).json({ error: "Not Found" })
    }
});

module.exports = transactions;
