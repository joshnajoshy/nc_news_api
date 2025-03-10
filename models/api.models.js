const db = require("../db/connection");

const getAllTopics = () => {
return db.query(`SELECT * FROM topics`).then(({rows}) => {
return rows;
})
}

module.exports = getAllTopics;