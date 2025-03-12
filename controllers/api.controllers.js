const endpoints = require('../endpoints.json');
const {fetchAllTopics, fetchArticleById, fetchAllArticles, fetchAllCommentsByArticleId, insertComment, updateArticleById} = require('../models/api.models')
const checkExists = require('../models/category.models')

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
    const promises = [fetchAllCommentsByArticleId(article_id)]
    if(article_id){
        promises.push(checkExists('comments', 'article_id', article_id))
    }
    Promise.all(promises).then(([comments]) => {
        response.status(200).send({comments})
    }).catch((error) => {
        next(error)
    })
}

const postComment = (request, response, next) => {
const {username, body} = request.body
const {article_id} = request.params
const promises = [insertComment(username, body, article_id)]
if(article_id){
    promises.push(checkExists('articles', 'article_id', article_id))
}
Promise.all(promises).then(([data]) => {
    response.status(201).send(data[0])
}).catch((error) => {
    next(error)
})
}

const patchArticleById = (request, response, next) => {
const {article_id} = request.params;
const {inc_votes} = request.body;

updateArticleById(article_id, inc_votes).then((updatedArticle) => {
    response.status(200).send({updatedArticle})
}).catch((error) => {
    next(error)
})
}


module.exports = {getAllEndpoints, getAllTopics, getArticlesById, getAllArticles, getAllCommentsByArticleId, postComment, patchArticleById};