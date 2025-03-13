const format = require('pg-format');
const db = require('../db/connection');
const checkArticleExists = (table, column, value) => {
    const queryStr = format(`SELECT * FROM %I WHERE %I = $1;`, table, column);
    return db.query(queryStr, [value]).then(({rows}) => {
    if(rows.length === 0){
        return Promise.reject({status: 404, msg: 'article not found'});
    } else {
        return rows
    }
    })
}

const checkCommentExists = (table, column, value) => {
    const queryStr = format(`SELECT * FROM %I WHERE %I = $1;`, table, column);
    return db.query(queryStr, [value]).then(({rows}) => {
    if(rows.length === 0){
        return Promise.reject({status: 404, msg: 'comment not found'});
    } else {
        return rows
    }
    })
}

module.exports = {checkArticleExists, checkCommentExists};