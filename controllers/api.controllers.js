const endpoints = require('../endpoints.json');
const {fetchAllTopics, fetchArticleById, fetchAllArticles, fetchAllCommentsByArticleId, insertComment, updateArticleById, deleteComment, fetchAllUsers} = require('../models/api.models')
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

const getAllArticles = (request, response, next) => {
    const {sort_by} = request.query;
    const {order} = request.query;
    const {topic} = request.query;
    const promises = [fetchAllArticles(sort_by, order, topic)]
    if(sort_by && sort_by !== 'comment_count'){
        promises.push(checkExists('articles', sort_by))
    } 
    if(topic){
        promises.push(checkExists('articles', 'topic', topic))
    }
    Promise.all(promises).then(([articles]) => {
        response.status(200).send({articles})
    }).catch((error) => {
        next(error)
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

const getAllUsers = (request, response) => {
    fetchAllUsers().then((users) => {
        response.status(200).send({users})
    })
}

const postComment = (request, response, next) => {
const {username, body, created_at} = request.body
const {article_id} = request.params
const promises = [insertComment(username, body, article_id, created_at)]
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
const promises = [updateArticleById(article_id, inc_votes)]

if(article_id){
    promises.push(checkExists('articles', 'article_id', article_id))
}

Promise.all(promises).then(([updatedArticle]) => {
    response.status(200).send({updatedArticle})
}).catch((error) => {
    next(error)
})
}

const deleteCommentById = (request, response, next) => {
const {comment_id} = request.params 
const promises = [deleteComment(comment_id)]
if(comment_id){
    promises.push(checkExists('comments', 'comment_id', comment_id))
}
Promise.all(promises).then((deletedComment) => {
    response.status(204).send({deletedComment})
}).catch((error) => {
    next(error)
})
}


module.exports = {getAllEndpoints, getAllTopics, getArticlesById, getAllArticles, getAllCommentsByArticleId, postComment, patchArticleById, deleteCommentById, getAllUsers};