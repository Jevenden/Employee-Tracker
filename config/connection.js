import mysql from "mysql2";
import "dotenv/config";

const db = mysql.createConnection(
  {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB,
  },
  console.log("Welcome to the database!")
);

export default db;
