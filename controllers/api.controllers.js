const endpoints = require('../endpoints.json');
const {fetchAllTopics, fetchArticleById, fetchAllArticles, fetchAllCommentsByArticleId} = require('../models/api.models')

const getAllEndpoints = (request, response) => {
    response.status(200).send({endpoints})
}

const getAllTopics = (request, response) => {
    fetchAllTopics().then((topics) => {
        response.status(200).send({topics})
    })
}

const getArticlesById = (request, response, next) => {
const {article_id} = request.params
fetchArticleById(article_id).then((article) => {
    response.status(200).send({article})
}).catch((error) => {
    next(error)
})
}

const getAllArticles = (request, response) => {
    fetchAllArticles().then((articles) => {
        response.status(200).send({articles})
    })
}

const getAllCommentsByArticleId = (request, response, next) => {
    const {article_id} = request.params
    fetchAllCommentsByArticleId(article_id).then((comments) => {
        response.status(200).send({comments})
    }).catch((error) => {
        next(error)
    })
}

module.exports = {getAllEndpoints, getAllTopics, getArticlesById, getAllArticles, getAllCommentsByArticleId};