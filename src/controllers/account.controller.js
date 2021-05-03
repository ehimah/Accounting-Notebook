const httpStatus = require("http-status");

const { catchAsync } = require("../utils/error");

const getAccountBalanceHandler = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({
    balance: 0,
  });
});

module.exports = {
  getAccountBalance: {
    handler: getAccountBalanceHandler,
  },
};
