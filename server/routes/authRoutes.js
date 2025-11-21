const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

// REGISTER Route
router.post("/register", registerUser);

// LOGIN Route
router.post("/login", loginUser);

module.exports = router;
