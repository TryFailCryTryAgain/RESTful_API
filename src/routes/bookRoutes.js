"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = __importDefault(require("../controllers/bookController"));
const { getBookId, getBook, getBookByTitle, createBook, updateBook, deleteBook, getBookByGenre } = bookController_1.default;
const BookStoreBooksRouter = express_1.default.Router();
// Define routes
BookStoreBooksRouter.get("/", getBook);
BookStoreBooksRouter.get("/genre/:genre", getBookByGenre);
BookStoreBooksRouter.get("/:title", getBookByTitle);
BookStoreBooksRouter.get("/id/:_id", getBookId);
BookStoreBooksRouter.post("/", createBook); // Doesnt work yet, missing code MIA same as the routes below
BookStoreBooksRouter.put("/:_id", updateBook);
BookStoreBooksRouter.delete("/:_id", deleteBook);
exports.default = BookStoreBooksRouter;
