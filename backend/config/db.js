const { Pool } = require("pg");
require("dotenv").config();

const dbName = process.env.DATABASE_NAME;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbUser = process.env.DATABASE_USER;

const pool = new Pool({
  user: dbUser,
  host: "localhost",
  database: dbName,
  password: dbPassword,
  port: 5432,
});

pool.connect(function (error) {
  if (error) throw error;
  console.log("Connected");
});

module.exports = pool;
