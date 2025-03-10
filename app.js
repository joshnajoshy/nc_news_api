const express = require('express')
const app = express();
const {getAllEndpoints, getAllTopics} = require('./controllers/api.controllers')

app.get("/api", getAllEndpoints);

app.get('/api/topics', getAllTopics)

module.exports = app;