const endpointsJson = require("../endpoints.json");
const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed');
const db = require('../db/connection');
const data = require('../db/data/test-data/index');

beforeEach(() => {
  return seed(data)
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe('GET: /api/topics', () => {
  test('200: Responds with an array of topic objects with keys slug and description', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({body}) => {
      const {topics} = body;
      expect(topics.length).toBeGreaterThan(0)
      topics.forEach((topic) => {
        expect(topic).toMatchObject({
          slug: expect.any(String),
          description: expect.any(String),
          img_url: expect.any(String)
        })
      })
    })
    })
})

describe('GET: /api/articles/:article_id', () => {
  test('200: Responds with an article object with properties author, title, article_id, body, topic, created_at, votes, article_img_url', () => {
    return request(app)
    .get('/api/articles/2')
    .expect(200)
    .then(({body}) => {
      const article = body.article;
      expect(article.article_id).toBe(2)
      expect(typeof article.article_id).toBe('number')
      expect(typeof article.title).toBe('string')
      expect(typeof article.topic).toBe('string')
      expect(typeof article.author).toBe('string')
      expect(typeof article.body).toBe('string')
      expect(typeof article.created_at).toBe('string')
      expect(typeof article.votes).toBe('number')
      expect(typeof article.article_img_url).toBe('string')
      })
    })
    test('400: responds with bad request if article_id is not a number', () => {
      return request(app)
      .get('/api/articles/bannana')
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('bad request');
      })
    })
    test('404: responds with article not found if article_id is a number but article not found', () => {
      return request(app)
      .get('/api/articles/7777')
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('article not found');
      })
    })
    })