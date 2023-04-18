const express = require("express");
const transaction = express.Router();
const transactionArray = require("../models/transaction.js");
const { validateURL } = require("../models/validations.js");

// GET all the entries in the database
transaction.get("/", (req, res) => {
  res.json(transactionArray);
});

// SHOW
transaction.get("/:arrayIndex", (req, res) => {
  if (transactionArray[req.params.arrayIndex]){
    res.json(transactionArray[req.params.arrayIndex])
  } else {
    res.status(404).json({ error: "Not Found" })
  }
})

// CREATE a new transaction
transaction.post("/", validateURL, (req, res) => {
  transactionArray.push(req.body);
  res.json(transactionArray[transactionArray.length - 1])
});



// DELETE an existing transaction by array index
transaction.delete("/:arrayIndex", (req, res) => {
    const deletedTransaction = transactionArray.splice(req.params.arrayIndex, 1);
    res.status(200).json(deletedTransaction);
});

// UPDATE an existing transaction by array index
transaction.put("/:arrayIndex", validateURL, async (req, res) => {
  if (transactionArray[req.params.arrayIndex]) {
   transactionArray[req.params.arrayIndex] = req.body;
   res.status(200).json(transactionArray[req.params.arrayIndex]);
    } else {
      res.status(404).json({ error: "Not Found" })
    }
});
module.exports = transaction;
