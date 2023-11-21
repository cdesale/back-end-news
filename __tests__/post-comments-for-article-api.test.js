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

describe("POST /api/articles/:article_id/comments", () => {
  test("201: responds with newly inserted comment", () => {
    const newComment = {
      username: "icellusedkars",
      body: " I carry a log — yes. Is it funny to you? It is not to me.",
    };
    return request(app)
      .post("/api/articles/6/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject([
          {
            body: " I carry a log — yes. Is it funny to you? It is not to me.",
            votes: 0,
            author: "icellusedkars",
            article_id: 6,
          },
        ]);
      });
  });
  test("400: responds with an error msg when using invalid article id", () => {
    return request(app)
      .post("/api/articles/i/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("400: responds with an error msg when body of the comment is missing", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({ username: "SampleUser" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing input data");
      });
  });
  test("400: responds with an error msg when username of the comment is missing", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ body: "Sample comment body" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing input data");
      });
  });
  test("404: responds with an error msg when given out of range article id", () => {
    return request(app)
      .post("/api/articles/99/comments")
      .send({ username: "SampleUser", body: "Sample comment body" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
