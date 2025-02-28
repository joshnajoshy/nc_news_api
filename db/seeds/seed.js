const db = require("../connection")
const format = require("pg-format")
const convertTimestampToDate = require('../seeds/utils')

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
  .query('DROP TABLE IF EXISTS comments;')
  .then(() => {
    return db.query('DROP TABLE IF EXISTS articles;') 
  })
  .then(() => {
    return db.query('DROP TABLE IF EXISTS users;')
  })
  .then(() => {
    return db.query('DROP TABLE IF EXISTS topics;')
  })
  .then(() => {
    return db.query(`CREATE TABLE topics (
                     slug VARCHAR(50) PRIMARY KEY,
                     description VARCHAR(100) NOT NULL,
                     img_url VARCHAR(1000) NOT NULL
                     );`);
  })
  .then(() => {
    return db.query(`CREATE TABLE users (
                     username VARCHAR(50) PRIMARY KEY,
                     name VARCHAR(100) NOT NULL,
                     avatar_url VARCHAR(1000) NOT NULL
                     );`);
  })
  .then(() => {
    return db.query(`CREATE TABLE articles (
                     article_id SERIAL PRIMARY KEY,
                     title VARCHAR NOT NULL ,
                     topic VARCHAR(50) REFERENCES topics(slug),
                     author VARCHAR(50) REFERENCES users(username),
                     body TEXT,
                     created_at TIMESTAMP,
                     votes INT DEFAULT 0,
                     article_img_url VARCHAR(1000) NOT NULL
                     );`);
  })
  .then(() => {
    return db.query(`CREATE TABLE comments (
                     comment_id SERIAL PRIMARY KEY,
                     article_id SERIAL REFERENCES articles(article_id),
                     body TEXT,
                     votes INT DEFAULT 0,
                     author VARCHAR(50) REFERENCES users(username),
                     created_at TIMESTAMP
                     );`);
  })
  .then(() => {
    const formattedtopics = topicData.map((topicCatagories) => {
      return [topicCatagories.slug, topicCatagories.description, topicCatagories.img_url]
    })
    const insertTopicQuery = format(`INSERT INTO topics (slug, description, img_url) VALUES %L RETURNING *`, formattedtopics);
    return db.query(insertTopicQuery)
  })
  .then(() => {
    const formattedusers = userData.map((userCatagories) => {
      return [userCatagories.username, userCatagories.name, userCatagories.avatar_url]
    })
    const insertUsersQuery = format(`INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *`, formattedusers);
    return db.query(insertUsersQuery)
  })
  .then(() => {
    
    const formattedArticles = articleData.map((articleCatagories) => {
      const timeStampArticles = convertTimestampToDate(articleCatagories.created_at)
      return [articleCatagories.title, articleCatagories.topic, articleCatagories.author, articleCatagories.body, timeStampArticles.created_at, articleCatagories.votes, articleCatagories.article_img_url]
    })
    const insertArticlesQuery = format(`INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`, formattedArticles);
    return db.query(insertArticlesQuery)
  })
  .then(({rows}) => {
    const articleIdData = {}
    const artcileData = rows
    artcileData.forEach((data) => {
      articleIdData[data.article_id] = data.article_id
    })
    const formattedComments = commentData.map((commentCatagories) => {
      const timeStampComments = convertTimestampToDate(commentCatagories.created_at)
      for(const key in articleIdData){
        return [articleIdData[key], commentCatagories.body, commentCatagories.votes, commentCatagories.author, timeStampComments.created_at]
      }
    })
    const insertCommentsQuery = format(`INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L RETURNING *`, formattedComments);
    return db.query(insertCommentsQuery)
  })
};
module.exports = seed;
