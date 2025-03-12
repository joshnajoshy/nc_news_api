const db = require("../db/connection");

const fetchAllTopics = () => {
return db.query(`SELECT * FROM topics`).then(({rows}) => {
return rows;
})
}

const fetchArticleById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id]).then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: 'article not found'})
        }
        return rows[0]
    })
}

const fetchAllArticles = () => {
                return db.query(`SELECT articles.article_id, articles.title, articles.topic,  articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id)::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC`).then(({rows}) => {
                    return rows;
                })
            }

const fetchAllCommentsByArticleId = (article_id) => {
return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [article_id]).then(({rows}) => {
    return rows;
})
}

const insertComment = (username, body, article_id) => {
return db.query(`INSERT INTO comments (article_id, body, author) VALUES ($1, $2, $3) RETURNING *`, [article_id, body, username]).then(({rows}) => {
    return rows;
})
}

module.exports = {fetchAllTopics, fetchArticleById, fetchAllArticles, fetchAllCommentsByArticleId, insertComment};