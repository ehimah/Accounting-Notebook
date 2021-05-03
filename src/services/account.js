const httpStatus = require("http-status");
const { Mutex } = require("async-mutex");
const ApiError = require("../utils/ApiError");

const mutex = new Mutex();

let accountBalance = 0;

const calculateEffectiveAmount = ({ amount, type }) =>
  type === "credit" ? amount : -amount;

const checkTransaction = (transaction) => {
  const effectiveAmount = calculateEffectiveAmount(transaction);
  if (effectiveAmount + accountBalance < 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "New balance cannot be less than zero"
    );
  }
};

const getBalance = () => Promise.resolve(accountBalance);

const updateBalance = async (transaction) => {
  const release = await mutex.acquire();
  try {
    checkTransaction(transaction);
    const newBalance = accountBalance + calculateEffectiveAmount(transaction);
    accountBalance = newBalance;
  } finally {
    release();
  }
};

module.exports = {
  getBalance,
  updateBalance,
};
