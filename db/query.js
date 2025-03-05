const db = require("../db/connection")

 db.query(`SELECT * FROM articles`) 
    .then ((data) => {
    console.log(data.rows)
    db.end()
  })