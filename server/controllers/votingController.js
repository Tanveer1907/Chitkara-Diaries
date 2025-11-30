const Review = require("../models/Review");

// Initialize database table
const initializeDatabase = async () => {
    try {
        await Review.createTable();
        console.log("Reviews table ready");
    } catch (err) {
        console.error("Error creating reviews table:", err);
    }
};

// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.getAll();
        res.json(reviews);
    } catch (err) {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
};

// Add a new review
const addReview = async (req, res) => {
    try {
        const { author, text, optionName } = req.body;

        // Validation
        if (!author || !text || !optionName) {
            return res.status(400).json({
                error: "Missing required fields: author, text, and optionName are required"
            });
        }

        if (author.trim().length === 0 || text.trim().length === 0) {
            return res.status(400).json({
                error: "Author and text cannot be empty"
            });
        }

        const reviewData = {
            author: author.trim(),
            text: text.trim(),
            optionName: optionName.trim()
        };

        const result = await Review.create(reviewData);

        res.status(201).json({
            message: "Review added successfully",
            reviewId: result.insertId,
            review: reviewData
        });
    } catch (err) {
        console.error("Error adding review:", err);
        res.status(500).json({ error: "Failed to add review" });
    }
};

// Get reviews by option
const getReviewsByOption = async (req, res) => {
    try {
        const { optionName } = req.params;
        const reviews = await Review.getByOption(optionName);
        res.json(reviews);
    } catch (err) {
        console.error("Error fetching reviews by option:", err);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        await Review.delete(id);
        res.json({ message: "Review deleted successfully" });
    } catch (err) {
        console.error("Error deleting review:", err);
        res.status(500).json({ error: "Failed to delete review" });
    }
};

module.exports = {
    initializeDatabase,
    getAllReviews,
    addReview,
    getReviewsByOption,
    deleteReview
};
