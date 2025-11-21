const db = require("../db");
const bcrypt = require("bcrypt");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { fullname, roll, batch, course, email, password } = req.body;

    if (!fullname || !roll || !batch || !course || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    // Check if email exists
    const checkUser = "SELECT * FROM users WHERE email = ?";
    db.query(checkUser, [email], async (err, result) => {
      if (err) return res.status(500).json({ success: false, message: "Server error" });

      if (result.length > 0) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }

      const hashedPass = await bcrypt.hash(password, 10);

      const sql = "INSERT INTO users (fullname, roll, batch, course, email, password) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(sql, [fullname, roll, batch, course, email, hashedPass], (err, data) => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });

        return res.status(200).json({ success: true, message: "User registered successfully" });
      });
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// LOGIN
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "Server error" });

    if (result.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const user = result[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    return res.json({ success: true, message: "Logged in successfully" });
  });
};
