import mysql from "mysql2";

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "TechHippo1!",
    database: "employee_db",
  },
  console.log(`Connected to the database.`)
);

export default db;
