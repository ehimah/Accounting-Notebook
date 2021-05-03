const express = require("express");
const httpStatus = require("http-status");
const transactionsRouter = require("./transaction.route");
const accountsRouter = require("./account.route");

const router = express.Router();

router.use("/transactions", transactionsRouter);
router.use("/accounts", accountsRouter);
router.route("/").get((req, res) => {
  res.sendStatus(httpStatus.OK);
});

module.exports = router;
