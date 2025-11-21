const db = require("../db");

const User = {
  create: (userData, callback) => {
    const query = `
      INSERT INTO users (fullname, roll, batch, course, email, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      query,
      [
        userData.fullname,
        userData.roll,
        userData.batch,
        userData.course,
        userData.email,
        userData.password,
      ],
      callback
    );
  },

  findByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  }
};

module.exports = User;
