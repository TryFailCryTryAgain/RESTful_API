"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = __importDefault(require("../controllers/reviewController"));
const { getReviews, getReviewById, createReview, updateReview, deleteReview } = reviewController_1.default;
const BookStoreReviewRouter = express_1.default.Router();
// Defining Routes
BookStoreReviewRouter.get("/", getReviews);
BookStoreReviewRouter.get("/:_id", getReviewById);
BookStoreReviewRouter.post("/", createReview);
BookStoreReviewRouter.put("/:_id", updateReview);
BookStoreReviewRouter.delete("/:_id", deleteReview);
exports.default = BookStoreReviewRouter;
