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

describe("GET /api/articles", () => {
  test("that responds with all the articles, sorting created_at property in descending order, the article object does not have body property", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(13);
        expect(articles).toBeSortedBy("created_at", {
          descending: true,
        });
        articles.forEach((article) => {
          expect(article.hasOwnProperty("body")).toBe(false);
          expect(article).toMatchObject({
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          });
        });
      });
  });
  test("responds with the article of the given query", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(12);
        articles.forEach((article) => {
          expect(articles.hasOwnProperty("body")).toBe(false);
          expect(article.topic).toBe("mitch");
          expect(article).toMatchObject({
            title: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            article_img_url: expect.any(String),
          });
        });
      });
  });
  test("404: responds with an error msg when topic doesn't exist", () => {
    return request(app)
      .get("/api/articles?topic=chaitali")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("200: responds with an error msg when there are no articles for the given topic", () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(0);
        expect(articles).toEqual([]);
      });
  });
  test("200: responds with all articles sorted by title in ascending order", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order=ASC")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(13);
        expect(articles).toBeSortedBy("title");

        articles.forEach((articles) => {
          expect(articles).toMatchObject({
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            article_img_url: expect.any(String),
          });
        });
      });
  });
  test("200: responds with all articles sorted by created_at in ascending order", () => {
    return request(app)
      .get("/api/articles?order=ASC")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(13);
        expect(articles).toBeSortedBy("created_at");

        articles.forEach((articles) => {
          expect(articles).toMatchObject({
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            article_img_url: expect.any(String),
          });
        });
      });
  });
  test("200: responds with all articles sorted by author in descinding order", () => {
    return request(app)
      .get("/api/articles?sort_by=author")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(13);
        expect(articles).toBeSortedBy("author", { descending: true });

        articles.forEach((articles) => {
          expect(articles).toMatchObject({
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            article_img_url: expect.any(String),
          });
        });
      });
  });
  test("200: responds with all articles sorted by comment_count in descending order", () => {
    return request(app)
      .get("/api/articles?sort_by=comment_count")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toHaveLength(13);
        expect(articles).toBeSortedBy("comment_count", { descending: true });

        articles.forEach((articles) => {
          expect(articles).toMatchObject({
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            article_img_url: expect.any(String),
          });
        });
      });
  });
  test("400: responds with error when sort_by query is invalid", () => {
    return request(app)
      .get("/api/articles?sort_by=invalid_query")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid sort by query");
      });
  });
  test("400: responds with error when order query is invalid", () => {
    return request(app)
      .get("/api/articles?order=invalid_query")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid order query");
      });
  });
});
