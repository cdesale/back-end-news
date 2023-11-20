const request = require("supertest");
const app = require("../app");

describe("GET /api", () => {
  test("that responds with all the available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        const { endpoints } = body;
        Object.keys(endpoints).forEach((endpoint) => {
          expect(endpoints[endpoint]).toMatchObject({
            description: expect.any(String),
            queries: expect.any(Array),
            exampleResponse: expect.any(Object),
          });
        });
      });
  });
});
