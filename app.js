const express = require('express')
const app = express();
const {getAllEndpoints, getAllTopics, getArticlesById, getAllArticles, getAllCommentsByArticleId, postComment, patchArticleById, deleteCommentById} = require('./controllers/api.controllers')
const {handleServerErrors, handlePsqlError, handleCustomErrors} = require('./controllers/errors.controllers');
const db = require('./db/connection');

app.use(express.json())

app.get("/api", getAllEndpoints);

app.get('/api/topics', getAllTopics)

app.get('/api/articles/:article_id', getArticlesById)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getAllCommentsByArticleId)

app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', patchArticleById)

app.delete('/api/comments/:comment_id', deleteCommentById)

app.use(handlePsqlError)

app.use(handleCustomErrors)

app.use(handleServerErrors)

module.exports = app;