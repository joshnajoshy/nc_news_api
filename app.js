const express = require('express')
const app = express();
const {getAllEndpoints, getAllTopics, getArticlesById, getAllArticles, getAllCommentsByArticleId} = require('./controllers/api.controllers')
const {handleServerErrors, handlePsqlError, handleCustomErrors} = require('./controllers/errors.controllers')

app.get("/api", getAllEndpoints);

app.get('/api/topics', getAllTopics)

app.get('/api/articles/:article_id', getArticlesById)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getAllCommentsByArticleId)

app.use(handlePsqlError)

app.use(handleCustomErrors)

app.use(handleServerErrors)

module.exports = app;