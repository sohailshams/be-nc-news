const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("news api test suite", () => {
  test("GET - /api/topics returns 200 - topics object", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const expectedTopics = [
          {
            description: "The man, the Mitch, the legend",
            slug: "mitch",
          },
          {
            description: "Not dogs",
            slug: "cats",
          },
          {
            description: "what books are made of",
            slug: "paper",
          },
        ];
        expect(response.body.topics.length).toBe(3);
        expect(response.body.topics).toMatchObject(expectedTopics);
        response.body.topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("news api error handling test suite", () => {
  test("status:404, responds with an error message when passed an endpoint that does not exist", () => {
    return request(app)
      .get("/api/notaroute")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toEqual("Endpoint not found!");
      });
  });
});

describe("JSON describing all the available endpoints on your API - test suite", () => {
  test("GET /api returns an object containing all endpoint information", () => {
    return request(app)
      .get("/api")
      .then((response) => {
        expect(response.body.apiInfo.hasOwnProperty("GET /api")).toBe(true);
        expect(response.body.apiInfo["GET /api"]).toEqual({
          description:
            "serves up a json representation of all the available endpoints of the api",
        });
        expect(response.body.apiInfo.hasOwnProperty("GET /api/topics")).toBe(
          true
        );
        expect(response.body.apiInfo["GET /api/topics"]).toEqual({
          description: "serves an array of all topics",
          queries: [],
          exampleResponse: {
            topics: [{ slug: "football", description: "Footie!" }],
          },
        });
        expect(response.body.apiInfo.hasOwnProperty("GET /api/articles")).toBe(
          true
        );
        expect(response.body.apiInfo["GET /api/articles"]).toEqual({
          description: "serves an array of all topics",
          queries: ["author", "topic", "sort_by", "order"],
          exampleResponse: {
            articles: [
              {
                title: "Seafood substitutions are increasing",
                topic: "cooking",
                author: "weegembump",
                body: "Text from the article..",
                created_at: "2018-05-30T15:59:13.341Z",
                votes: 0,
                comment_count: 6,
              },
            ],
          },
        });
        Object.keys(response.body.apiInfo).forEach((key) => {
          expect(typeof response.body.apiInfo[key]).toBe("object");
        });
      });
  });
});
