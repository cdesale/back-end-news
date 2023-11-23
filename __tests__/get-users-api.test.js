const request = require("supertest");

const db = require("../db/connection");
const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const app = require("../app");

beforeEach(() => seed({ articleData, commentData, topicData, userData }));
afterAll(() => db.end());

describe("GET /api/users", () => {
  test("that responds with all the users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toHaveLength(4);
        users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
});
