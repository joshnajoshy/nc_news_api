const format = require('pg-format');
const db = require('../db/connection');
const checkExists = (table, column, value) => {
    let queryStr = format(`SELECT * FROM %I WHERE %I = $1;`, table, column);
    if(!value){
        queryStr = format(`SELECT %I FROM %I `, column, table);
        return db.query(queryStr).then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: 'column not found'});
        } else {
            return rows
        }
        }) 
    }
        return db.query(queryStr, [value]).then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: 'value not found in table'});
        } else {
            return rows
        }
        })
    }

module.exports = checkExists;