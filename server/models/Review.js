const db = require("../db");

const Review = {
  // Create reviews table if it doesn't exist
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        author VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        optionName VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  // Add a new review
  create: (reviewData) => {
    const sql = "INSERT INTO reviews (author, text, optionName) VALUES (?, ?, ?)";
    const values = [reviewData.author, reviewData.text, reviewData.optionName];
    
    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  // Get all reviews
  getAll: () => {
    const sql = "SELECT * FROM reviews ORDER BY created_at DESC";
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  // Get reviews by option name
  getByOption: (optionName) => {
    const sql = "SELECT * FROM reviews WHERE optionName = ? ORDER BY created_at DESC";
    return new Promise((resolve, reject) => {
      db.query(sql, [optionName], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  // Delete a review
  delete: (id) => {
    const sql = "DELETE FROM reviews WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
};

module.exports = Review;
