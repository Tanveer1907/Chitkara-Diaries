const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",    // apna password daal
  database: "chitkara_diaries"
});

db.connect((err) => {
  if (err) console.log("DB Error:", err);
  else console.log("MYSQL Connected");
});

module.exports = db;
