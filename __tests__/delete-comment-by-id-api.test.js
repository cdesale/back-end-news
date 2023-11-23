const request = require("supertest");

const toBeSortedBy = require("jest-sorted");

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

describe("/api/comments/:comment_id", () => {
  test("respond with a 204 status code", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(() => {
        {
          return db.query(
            `SELECT comment_id from comments WHERE comment_id = 1`
          );
        }
      })
      .then((data) => {
        expect(data.rows.length).toBe(0);
      });
  });
  test("GET:404 sends an appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .delete("/api/comments/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("GET:400 responds with an appropriate error message when given an invalid id", () => {
    return request(app)
      .delete("/api/comments/i")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
