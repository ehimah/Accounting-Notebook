jest.mock("../../../src/services/account");
const { validate } = require("uuid");
const { accountService, transactionService } = require("../../../src/services");

describe("transaction service", () => {
  test("should create transaction", async () => {
    const transaction = {
      type: "credit",
      amount: 1000,
    };
    accountService.updateBalance.mockResolvedValueOnce();
    const expected = await transactionService.createTransaction(transaction);

    expect(validate(expected.id)).toBe(true);
    expect(expected).toMatchObject({
      ...transaction,
      effectiveDate: expect.any(String),
    });
    expect(await transactionService.getTransactions()).toEqual(
      expect.arrayContaining([expected])
    );
  });

  test("should rollback transaction on account update failure", async () => {
    const transaction = {
      type: "debit",
      amount: 2000,
    };
    const listBefore = await transactionService.getTransactions();

    accountService.updateBalance.mockRejectedValueOnce(new Error("Invalid"));
    await expect(
      transactionService.createTransaction(transaction)
    ).rejects.toThrow();

    const listAfter = await transactionService.getTransactions();

    expect(listBefore).toEqual(listAfter);
  });
});
