const db = require("../db/connection")

 db.query(`SELECT * FROM comments`) 
    .then ((data) => {
    console.log(data.rows)
    db.end()
  })