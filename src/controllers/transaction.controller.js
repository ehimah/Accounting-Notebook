const httpStatus = require("http-status");
const Joi = require("joi");
const { catchAsync } = require("../utils/error");
const { transactionService } = require("../services");

const createTransactionHandler = catchAsync(async (req, res) => {
  const transaction = await transactionService.createTransaction(req.body);
  res.status(httpStatus.CREATED).send(transaction);
});

const getTransactionHandler = catchAsync(async (req, res) => {
  const transaction = await transactionService.getTransaction(req.params.id);
  res.status(httpStatus.OK).send(transaction);
});

const getTransactionsHandler = catchAsync(async (req, res) => {
  const transactions = await transactionService.getTransactions();
  res.status(httpStatus.OK).send(transactions);
});

const transactionBodyInputSchema = {
  body: Joi.object().keys({
    type: Joi.string().required().valid("debit", "credit"),
    amount: Joi.number().required().positive().allow(0),
  }),
};
const getTransactionParamInputSchema = {
  params: Joi.object().keys({
    id: Joi.string().guid(),
  }),
};

module.exports = {
  createTransaction: {
    handler: createTransactionHandler,
    inputSchema: transactionBodyInputSchema,
  },
  getTransaction: {
    handler: getTransactionHandler,
    inputSchema: getTransactionParamInputSchema,
  },
  getTransactions: {
    handler: getTransactionsHandler,
  },
};
