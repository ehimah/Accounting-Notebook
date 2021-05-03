const { accountService } = require("../../../src/services");

describe("account service", () => {
  test("should get default balance", async () => {
    await expect(accountService.getBalance()).resolves.toEqual(0);
  });

  test("should set balance from transaction", async () => {
    const transaction = {
      type: "credit",
      amount: 1000,
    };
    await accountService.updateBalance(transaction);
    await expect(accountService.getBalance()).resolves.toEqual(1000);
  });

  test("should throw when new transaction will result in negative balance", async () => {
    const transaction = {
      type: "debit",
      amount: 10000,
    };
    await expect(accountService.updateBalance(transaction)).rejects.toThrow();
  });
});
