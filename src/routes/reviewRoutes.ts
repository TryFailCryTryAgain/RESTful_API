import express from 'express';
import reviewController from '../controllers/reviewController';

const { getReviews, getReviewById, createReview, updateReview, deleteReview } = reviewController;

const BookStoreReviewRouter = express.Router();

// Defining Routes
BookStoreReviewRouter.get("/", getReviews);
BookStoreReviewRouter.get("/:_id", getReviewById);
BookStoreReviewRouter.post("/", createReview);
BookStoreReviewRouter.put("/:_id", updateReview);
BookStoreReviewRouter.delete("/:_id", deleteReview);

export default BookStoreReviewRouter;
