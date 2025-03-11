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
    return db.query(`ALTER TABLE articles DROP COLUMN body`).then(() => {
        return db.query(`ALTER TABLE articles ADD COLUMN comment_count INT DEFAULT 0`).then(() => {
            return db.query(`UPDATE articles SET comment_count = (SELECT COUNT(article_id) FROM comments WHERE comments.article_id = articles.article_id)`).then(() => {
                return db.query(`SELECT * FROM articles ORDER BY created_at DESC`).then(({rows}) => {
                    return rows;
                })
            })
        })
    })
}

module.exports = {fetchAllTopics, fetchArticleById, fetchAllArticles};