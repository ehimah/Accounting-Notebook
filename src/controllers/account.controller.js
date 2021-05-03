const httpStatus = require("http-status");
const { catchAsync } = require("../utils/error");
const { accountService } = require("../services");

const getAccountBalanceHandler = catchAsync(async (req, res) => {
  const balance = await accountService.getBalance();
  res.status(httpStatus.OK).send({
    balance,
  });
});

module.exports = {
  getAccountBalance: {
    handler: getAccountBalanceHandler,
  },
};
