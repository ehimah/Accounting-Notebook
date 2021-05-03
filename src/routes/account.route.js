const express = require("express");
const accountController = require("../controllers/account.controller");

const router = express.Router();

router.route("/balance").get(accountController.getAccountBalance.handler);
module.exports = router;
