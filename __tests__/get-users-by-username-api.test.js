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

describe("GET /api/users:username", () => {
  test("200: responds with user with given username", () => {
    return request(app)
      .get("/api/users/butter_bridge")
      .expect(200)
      .then(({ body }) => {
        expect(body.user).toMatchObject({
          username: "butter_bridge",
          name: expect.any(String),
          avatar_url: expect.any(String),
        });
      });
  });
  test("404: responds with error when given username is not found", () => {
    return request(app)
      .get("/api/users/invalid_user")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
