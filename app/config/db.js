const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
});

connection.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log('db connected success!');
  }
});

module.exports = connection;
