"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const reviewModel_1 = require("../models/reviewModel"); // Import the Book model
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield reviewModel_1.Review.find();
        res.json(reviews);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching revies", error: err });
    }
});
const getReviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required! " });
            return;
        }
        const review = yield reviewModel_1.Review.findOne({ _id });
        if (!review) {
            res.status(404).json({ message: "No Reviews found with the given ID! " });
        }
        res.json(review);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching the review " });
    }
});
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId, userId, rating, comment } = req.body;
        const date = Date.now();
        const newReview = new reviewModel_1.Review({
            bookId,
            userId,
            rating,
            comment,
            date
        });
        yield newReview.save();
        res.status(201).json({ message: "New Review has been successfully created!", newReview });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create the review", error: err });
    }
});
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required! " });
            return;
        }
        const review = yield reviewModel_1.Review.findById({ _id });
        if (!review) {
            res.status(404).json({ message: "No review found by the given ID! " });
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
        }
        else {
            review.date = review.date;
        }
        yield review.save();
        res.status(200).json({ message: "Review has been successfully updated! " });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update review", error: err });
    }
});
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required! " });
            return;
        }
        const review = yield reviewModel_1.Review.findById({ _id });
        if (!review) {
            res.status(404).json({ message: "No Review found by the given ID! " });
            return;
        }
        yield review.deleteOne();
        res.status(200).json({ message: "Review has been successfully deleted! " });
    }
    catch (err) {
        res.status(500).json({ message: "Error deleting the review! ", error: err });
    }
});
exports.default = {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};
