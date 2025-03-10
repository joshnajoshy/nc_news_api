const express = require('express')
const app = express();
const {getAllEndpoints, getAllTopics, getArticlesById} = require('./controllers/api.controllers')
const {handleServerErrors, handlePsqlError} = require('./controllers/errors.controllers')

app.get("/api", getAllEndpoints);

app.get('/api/topics', getAllTopics)

app.get('/api/articles/:article_id', getArticlesById)

app.use(handlePsqlError)

app.use(handleServerErrors)

module.exports = app;