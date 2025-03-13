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
          expect(articles).toBeSorted('created_at',{descending: true })
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
        expect(comments).toBeSorted('created_at',{descending: true })
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
    test('404: responds with article not found if article_id is a number but article not found', () => {
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
    test('400: responds with bad request if article id is not a number', () => {
      return request(app)
      .post('/api/articles/bannana/comments')
      .send({
        username: 'butter_bridge',
        body: 'article was a good read'
      })
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('bad request')
      })
    })
    test('400: responds with article not found when article_id is a number but article not found', () => {
      return request(app)
      .post('/api/articles/6789/comments')
      .send({
        username: 'butter_bridge',
        body: 'article was a good read'
      })
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('article not found')
      })
    })
  })

  describe('PATCH /api/articles/:article_id', () => {
    test('200: successfully increments an article votes by 1 by article_id', () => {
      const articleUpdate = { inc_votes: 1 };
      return request(app)
      .patch('/api/articles/2')
      .send(articleUpdate)
      .expect(200)
      .then(({body}) => {
        expect(body.updatedArticle.votes).toBe(1)
        expect(typeof body.updatedArticle.article_id).toBe('number')
        expect(typeof body.updatedArticle.title).toBe('string')
        expect(typeof body.updatedArticle.topic).toBe('string')
        expect(typeof body.updatedArticle.author).toBe('string')
        expect(typeof body.updatedArticle.body).toBe('string')
        expect(typeof body.updatedArticle.created_at).toBe('string')
        expect(typeof body.updatedArticle.votes).toBe('number')
        expect(typeof body.updatedArticle.article_img_url).toBe('string')
      })
    })
    test('200: successfully decrements an article votes by 100 by article_id', () => {
      const articleUpdate = { inc_votes: -100 };
      return request(app)
      .patch('/api/articles/1')
      .send(articleUpdate)
      .expect(200)
      .then(({body}) => {
        expect(body.updatedArticle.votes).toBe(0)
      })
  })
  test('400: when inc_votes is not a number', () => {
    const articleUpdate = {inc_votes: 'update'}
    return request(app)
      .patch('/api/articles/2')
      .send(articleUpdate)
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('bad request')
      })
  })
  test('400: when article_id is not a number', () => {
    const articleUpdate = {inc_votes: 1}
    return request(app)
      .patch('/api/articles/bannana')
      .send(articleUpdate)
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('bad request')
      })
  })
  test('404: responds with article not found when article is a number but article not found', () => {
    const articleUpdate = {inc_votes: 1}
    return request(app)
      .patch('/api/articles/7777')
      .send(articleUpdate)
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('article not found')
      })
  })
})

describe('DELETE /api/comments/:comment_id', () => {
  test('204: successfully deletes the comment specified', () => {
  return request(app)
  .delete('/api/comments/1')
  .expect(204)
  .then(({body}) => {
    expect(body).toEqual({})
  })
  })
  test('400: responds with bad request when comment_id is not a number', () => {
    return request(app)
    .delete('/api/comments/bannana')
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe('bad request')
    })
  })
  test('404: responds with comment not found when comment_id is a number but no comment exists', () => {
    return request(app)
    .delete('/api/comments/5555')
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe('comment not found')
    })
  })
})

describe('GET /api/users', () => {
  test('200: responds with an array of all user objects', () => {
    return request(app)
    .get('/api/users')
    .expect(200)
    .then(({body}) => {
      const {users} = body;
      expect(users.length).toBeGreaterThan(0)
      users.forEach((user) => {
        expect(user).toMatchObject({
          username: expect.any(String),
          name: expect.any(String),
          avatar_url: expect.any(String)
        })
      })
    })
  })
})

describe('GET /api/articles?sort_by=created_at', () => {
  test('200: if queried with sort_by, returns an object that is sorted by created_at in descending order', () => {
    return request(app)
    .get('/api/articles?sort_by=created_at&order=desc')
    .expect(200)
    .then(({body}) => {
      const {articles} = body;
      expect(articles.length).toBeGreaterThan(0)
      expect(articles).toBeSortedBy('created_at', {descending: true})
      articles.forEach((article) => {
        expect(article).toMatchObject({
          article_id: expect.any(Number),
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String)
        })
      })
    })
  })
  test('200: if queried with sort_by and order, returns an object that is sorted by created_at in ascending order', () => {
    return request(app)
    .get('/api/articles?sort_by=created_at&order=asc')
    .expect(200)
    .then(({body}) => {
      const {articles} = body;
      expect(articles.length).toBeGreaterThan(0)
      expect(articles).toBeSortedBy('created_at')
      articles.forEach((article) => {
        expect(article).toMatchObject({
          article_id: expect.any(Number),
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String)
        })
      })
    })
  })
  test('400: responds with column doesn\'t exist when column name doesn\'t exist', () => {
    return request(app)
    .get('/api/articles?sort_by=bannana&order=asc')
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe('column doesn\'t exist')
    })
  })
})