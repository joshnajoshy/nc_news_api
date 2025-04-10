// const { Pool } = require("pg");

// const ENV = process.env.NODE_ENV || 'development'

// require('dotenv').config({path: `${__dirname}/../.env.${ENV}`})

// const config = {}

// if(ENV === 'production'){
//     config.connectionString = process.env.DATABASE_URL;
//     config.max = 2;
// }

// const db = new Pool(config);

// if(!process.env.PGDATABASE && !process.env.DATABASE_URL){
//     throw new Error("PGDATABASE or DATABASE_URL not set");
// }else { 
//         console.log(`Connected to ${process.env.PGDATABASE}`)
//      }

// module.exports = db;

// const { Pool } = require('pg');


const { Pool } = require("pg");

module.exports = {
  HOST: process.env.POSTGRESQL_DB_HOST,
  USER: process.env.POSTGRESQL_DB_USER,
  PASSWORD: process.env.POSTGRESQL_DB_PASSWORD,
  DB: process.env.POSTGRESQL_DB,
  dialect: "postgres",
};

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({ path: `${__dirname}/../.env.${ENV}` });

const config = {};

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

const db = new Pool(config);

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
} else {
  console.log(`Connected to ${process.env.PGDATABASE || process.env.DATABASE_URL}`);
}

module.exports = db;
