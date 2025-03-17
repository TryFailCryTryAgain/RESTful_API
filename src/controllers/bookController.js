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
const bookModel_1 = require("../models/bookModel"); // Import the Book model
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield bookModel_1.Book.find();
        res.json(books);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching books ", error: err });
    }
});
const getBookByTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.params;
        if (!title) {
            res.status(400).json({ title: "title params is required " });
            return;
        }
        // Decodes the title (e.g it will replace the %20 with spaces)
        const decodedTitle = decodeURIComponent(title);
        const book = yield bookModel_1.Book.findOne({ title: decodedTitle });
        if (!book) {
            res.status(404).json({ message: "No books found with that name! " });
        }
        res.json(book);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching books ", error: err });
    }
});
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, genre, price, stock, description, publishedDate } = req.body;
        // Decode inputs with %20 in them
        const newBook = new bookModel_1.Book({
            title,
            author,
            genre,
            price,
            stock,
            description,
            publishedDate
        });
        yield newBook.save();
        res.status(201).json({ message: "New Book has been added", newBook });
    }
    catch (err) {
        res.status(500).json({ message: "Error creating a new book ", error: err });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is requried! " });
            return;
        }
        const book = yield bookModel_1.Book.findById({ _id });
        if (!book) {
            res.status(404).json({ message: "No book found with that ID" });
            return;
        }
        const { title, author, genre, price, stock, description, publishedDate } = req.body;
        book.title = title || book.title;
        book.author = author || book.author;
        book.genre = genre || book.genre;
        book.price = price || book.price;
        book.stock = stock || book.stock;
        book.description = description || book.description;
        book.publishedDate = publishedDate || book.publishedDate;
        yield book.save();
        res.status(200).json({ message: "Book has been updated", book });
    }
    catch (err) {
        res.status(500).json({ message: "Error updating book", error: err });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is requried! " });
            return;
        }
        const book = yield bookModel_1.Book.findById({ _id });
        if (!book) {
            res.status(404).json({ message: "No book found with that ID" });
            return;
        }
        yield book.deleteOne();
        res.status(200).json({ message: "Book has been deleted! ", book });
    }
    catch (err) {
        res.status(500).json({ message: "Error deleting book", error: err });
    }
});
exports.default = {
    getBook,
    getBookByTitle,
    createBook,
    updateBook,
    deleteBook
};
