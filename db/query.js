const db = require("../db/connection")

 db.query(`SELECT * FROM comments
           WHERE votes > 10`) 
    .then ((data) => {
    console.log(data.rows)
    db.end()
  })