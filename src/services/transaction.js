const httpStatus = require("http-status");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../utils/ApiError");
const accountService = require("./account");

const transactionsStore = new Map();

const getTransaction = async (id) => {
  if (transactionsStore.has(id))
    return Promise.resolve(transactionsStore.get(id));

  throw new ApiError(httpStatus.NOT_FOUND, "Transaction Not Found");
};

const getTransactions = () => {
  const values = Array.from(transactionsStore.values()) || [];
  return Promise.resolve(values);
};

const createTransaction = async (transactionInput) => {
  const { amount, type } = transactionInput;
  const transaction = {
    id: uuidv4(),
    amount,
    type,
    effectiveDate: new Date().toUTCString(),
  };

  transactionsStore.set(transaction.id, transaction);
  await accountService.updateBalance(transaction);

  return Promise.resolve(transaction);
};

module.exports = {
  getTransaction,
  getTransactions,
  createTransaction,
};
