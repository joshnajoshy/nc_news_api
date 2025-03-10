const endpoints = require('../endpoints.json');
const {fetchAllTopics, fetchArticleById} = require('../models/api.models')

const getAllEndpoints = (request, response) => {
    response.status(200).send({endpoints})
}

const getAllTopics = (request, response) => {
    fetchAllTopics().then((topics) => {
        response.status(200).send({topics})
    })
}

const getArticlesById = (request, response) => {
const {article_id} = request.params
fetchArticleById(article_id).then((article) => {
    response.status(200).send({article})
})
}

module.exports = {getAllEndpoints, getAllTopics, getArticlesById};