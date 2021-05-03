const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

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

module.exports = {
  getTransaction,
  getTransactions,
};
