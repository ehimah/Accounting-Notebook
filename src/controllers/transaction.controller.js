const httpStatus = require("http-status");
const { catchAsync } = require("../utils/error");

const createTransactionHandler = catchAsync(async (req, res) => {
  res.status(httpStatus.CREATED).send({});
});

const getTransactionHandler = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ id: req.params.id });
});

const getTransactionsHandler = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send([]);
});

module.exports = {
  createTransaction: {
    handler: createTransactionHandler,
  },
  getTransaction: {
    handler: getTransactionHandler,
  },
  getTransactions: {
    handler: getTransactionsHandler,
  },
};
