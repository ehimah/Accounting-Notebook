const httpStatus = require("http-status");
const request = require("supertest");
const app = require("../src/app");

describe("Transaction routes", () => {
  const transaction = {
    amount: 100,
    type: "debit",
  };
  describe("POST /transactions", () => {
    test("should return 201", async () => {
      const res = await request(app)
        .post("/transactions")
        .send(transaction)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual(transaction);
    });
  });

  describe("GET /transactions", () => {
    test("should return 200", async () => {
      const res = await request(app)
        .get("/transactions")
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual(
        expect.arrayContaining([expect.objectContaining(transaction)])
      );
      expect(res.body.length).toEqual(1);
    });
  });

  describe("GET /transactions/:id", () => {
    test("should return 200", async () => {
      const listResponse = await request(app)
        .get("/transactions")
        .send()
        .expect(httpStatus.OK);

      expect(listResponse.body.length).toBeGreaterThanOrEqual(1);

      const trans = listResponse.body[0];

      const res = await request(app)
        .get(`/transactions/${trans.id}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual(trans);
    });
  });
});
