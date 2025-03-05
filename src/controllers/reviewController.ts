import { Request, Response } from 'express';
import { connectToDatabase } from '../utils/db';
import { Review } from '../models/reviewModel'; // Import the Book model
import { connect } from 'http2';

const getReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Error fetching revies", error: err });
    }
}

const getReviewById = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required! "});
            return;
        }
        const review = await Review.findOne({ _id });
        if (!review) {
            res.status(404).json({ message: "No Reviews found with the given ID! "});
        }
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: "Error fetching the review "});
    }
}

const createReview = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();
        const { bookId, userId, rating, comment } = req.body
        const date = Date.now();

        const newReview = new Review({
            bookId,
            userId,
            rating,
            comment,
            date
        });

        await newReview.save();
        res.status(201).json({ message: "New Review has been successfully created!", newReview});
    } catch (err) {
        res.status(500).json({ message: "Failed to create the review", error: err});
    }
}

const updateReview = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();

        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required! "});
            return;
        }
        const review = await Review.findById({ _id });
        if (!review) {
            res.status(404).json({ message: "No review found by the given ID! "});
            return;
        }

        const { bookId, userId, rating, comment } = req.body;

        const oldBookId = review.bookId;
        const oldUserId = review.userId;
        const oldRating = review.rating;
        const oldComment = review.comment;

        review.userId = userId || review.userId;
        review.bookId = bookId || review.bookId;
        review.rating = rating || review.rating;
        review.comment = comment || review.comment;

        if (oldBookId != bookId || oldUserId != userId || oldRating != rating || oldComment != comment) {
            const date = new Date();
            date.setDate(date.getDate());
            review.date = date;
        } else {
            review.date = review.date;
        }
        await review.save();
        res.status(200).json({ message: "Review has been successfully updated! " });
    } catch (err) {
        res.status(500).json({ message: "Failed to update review", error: err });
    }
}

const deleteReview = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();

        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required! "});
            return;
        }
        const review = await Review.findById({ _id });
        if (!review) {
            res.status(404).json({ message: "No Review found by the given ID! "});
            return;
        }
        await review.deleteOne();
        res.status(200).json({ message: "Review has been successfully deleted! "});
    } catch (err) {
        res.status(500).json({ message: "Error deleting the review! ", error: err });
    }
}


export default {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
}