const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

let accountBalance = 0;

const calculateEffectiveAmount = ({ amount, type }) =>
  type === "credit" ? amount : -amount;

const checkTransaction = (transaction) => {
  const effectiveAmount = calculateEffectiveAmount(transaction);
  logger.log(transaction, effectiveAmount);
  if (effectiveAmount + accountBalance < 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "New balance cannot be less than zero"
    );
  }
};

const getBalance = () => Promise.resolve(accountBalance);

const updateBalance = async (transaction) => {
  checkTransaction(transaction);
  const newBalance = accountBalance + calculateEffectiveAmount(transaction);
  accountBalance = newBalance;
};

module.exports = {
  getBalance,
  updateBalance,
};
