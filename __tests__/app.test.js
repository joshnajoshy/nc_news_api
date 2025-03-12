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

    describe('GET:  /api/articles', () => {
      test('200: responds with an array of all articles with expected properties and article sorted by date', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
          const {articles} = body;
          expect(articles.length).toBeGreaterThan(0)
          expect(articles).toBeSorted({descending: true })
          articles.forEach((article) => {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number)
        })
        expect(article).not.toMatchObject({
          body: expect.any(String)
      })
      })
        })
      })
    })

    describe('GET: /api/articles/:article_id/comments', () => {
      test('200: responds with an array of comments for the specific article', () => {
      return request(app)
      .get('/api/articles/5/comments')
      .expect(200)
      .then(({body}) => {
        const {comments} = body
        expect(comments.length).toBe(2) 
        expect(comments).toBeSorted({descending: true })
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            article_id: expect.any(Number),
            body: expect.any(String),
            votes: expect.any(Number),
            author: expect.any(String),
            created_at: expect.any(String)
          })
          expect(comment.article_id).toBe(5)
        })
      })
      })
      test('400: responds with bad request if article_id is not a number', () => {
        return request(app)
        .get('/api/articles/bannana/comments')
        .expect(400)
        .then(({body}) => {
          expect(body.msg).toBe('bad request');
        })
    })
    test('404: responds with comments not found if article_id is a number but article not found', () => {
      return request(app)
      .get('/api/articles/1000/comments')
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('article not found');
      })
    })
  })

  describe('POST: /api/articles/:article_id/comments', () => {
    test('201: creates a new comment', () => {
      return request(app)
      .post('/api/articles/3/comments')
      .send({
        username: 'butter_bridge',
        body: 'article was a good read'
      })
      .expect(201)
      .then(({body}) => {
        const comment = body
        expect(comment).toMatchObject({
          comment_id: 19,
          article_id: 3,
          author: 'butter_bridge',
          body: 'article was a good read',
          votes: 0
        })
      })
    })
  })