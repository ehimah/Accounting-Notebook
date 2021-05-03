const express = require("express");
const transactionController = require("../controllers/transaction.controller");

const router = express.Router();

router
  .route("/")
  .get(transactionController.getTransactions.handler)
  .post(transactionController.createTransaction.handler);

router.route("/:id").get(transactionController.getTransaction.handler);
module.exports = router;
