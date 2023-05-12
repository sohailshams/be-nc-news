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

describe("GET /api/articles/:article_id test suite", () => {
  test("returns an article object", () => {
    const expectedResult = {
      article_id: 1,
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: "2020-07-09T20:11:00.000Z",
      votes: 100,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
    };

    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        expect(typeof response.body.article.article_id).toBe("number");
        expect(typeof response.body.article.title).toBe("string");
        expect(typeof response.body.article.author).toBe("string");
        expect(typeof response.body.article.body).toBe("string");
        expect(typeof response.body.article.topic).toBe("string");
        expect(typeof response.body.article.created_at).toBe("string");
        expect(typeof response.body.article.votes).toBe("number");
        expect(typeof response.body.article.article_img_url).toBe("string");
        expect(response.body.article).toEqual(expectedResult);
      });
  });
});

describe("GET /api/articles - news api test suite", () => {
  test("GET - status: 200 - an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.articles.length).toBe(12);
        response.body.articles.forEach((article) => {
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.title).toBe("string");
          expect(typeof article.author).toBe("string");
          expect(typeof article.comment_count).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
        });
      });
  });
  test("GET - status: 200 - an array of article objects sorted by date in descending order by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("GET - status: 200 - does not return 'body' property on article object", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(article.hasOwnProperty("body")).toBe(false);
        });
      });
  });
});

describe("GET /api/articles/:article_id/comments test suite", () => {
  test("GET - status: 200 - an array of comment objects with correct article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.comments.length).toBe(11);
        response.body.comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.article_id).toBe("number");
        });
      });
  });
  test("GET - status: 200 - an array of comment objects sorted by date in descending order by default", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.comments).toBeSortedBy("created_at", {
          descending: true,
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
        expect(response.body.msg).toBe("Endpoint not found!");
      });
  });
  test("GET /api/articles/:article_id - status:400, responds with an error message when passed wrong article_id", () => {
    return request(app)
      .get("/api/articles/notAnId")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("GET /api/articles/:article_id - status:404, responds with an error message if article_id does not exist", () => {
    return request(app)
      .get("/api/articles/55555")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Article ID does not exist!");
      });
  });
  test("GET /api/articles/:article_id/comments - status:400, responds with an error message when passed wrong article_id", () => {
    return request(app)
      .get("/api/articles/notAnId/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("GET /api/articles/:article_id/comments - status:404, responds with an error message if article_id does not exist", () => {
    return request(app)
      .get("/api/articles/55555/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe(
          "No comment found related to this 55555"
        );
      });
  });
  test("GET /api/articles/1/nonsense - status:404, responds with an error message if passed bad url", () => {
    return request(app)
      .get("/api/articles/1/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Endpoint not found!");
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
