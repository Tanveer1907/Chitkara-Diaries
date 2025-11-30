const express = require("express");
const router = express.Router();
const {
    getAllReviews,
    addReview,
    getReviewsByOption,
    deleteReview
} = require("../controllers/votingController");

// Get all reviews
router.get("/reviews", getAllReviews);

// Add a new review
router.post("/add-review", addReview);

// Get reviews by specific option
router.get("/reviews/:optionName", getReviewsByOption);

// Delete a review
router.delete("/reviews/:id", deleteReview);

module.exports = router;
