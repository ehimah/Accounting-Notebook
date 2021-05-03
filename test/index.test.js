const request = require("supertest");
const httpStatus = require("http-status");
const app = require("../src/app");

describe("setup should work", () => {
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500)); // FIX - avoid jest open handle error
  });
  test("should return 200", async () => {
    await request(app).get("/").send().expect(httpStatus.OK);
  });
});
