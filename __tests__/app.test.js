const request = require('supertest');
const app = require('../app.js');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('news api test suite', () => {
  test('GET - /api retuns 200', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then((response) => {
        expect(response.body.msg).toEqual('all ok');
      });
  });
  test('GET - /api/topics returns 200 - topics object', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((response) => {
        // console.log(response.body);
        expect(response.body.topics.length).toBe(3);
        response.body.topics.forEach(topic => {
            expect(typeof topic.slug).toBe('string');
            expect(typeof topic.description).toBe('string');
        })
      });
  });
});

describe('news api error handling test suite', () => {
    test('status:404, responds with an error message when passed an endpoint that does not exist', () => {
      return request(app)
        .get('/api/notaroute')
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toEqual('Endpoint not found!');
        });
    });
  });
  