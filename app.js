const express = require('express')
const app = express();
const {getAllEndpoints, getAllTopics, getArticlesById} = require('./controllers/api.controllers')
const handleServerErrors = require('./controllers/errors.controllers')

app.get("/api", getAllEndpoints);

app.get('/api/topics', getAllTopics)

app.get('/api/articles/:article_id', getArticlesById)

app.use(handleServerErrors)

module.exports = app;