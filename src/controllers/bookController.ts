import { Request, Response } from 'express';
import { Book } from '../models/bookModel'; // Import the Book model

const getBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: "Error fetching books ", error: err });
    }
}

const getBookByTitle = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title } = req.params;
        if (!title) {
            res.status(400).json({ title: "title params is required "});
            return;
        }
        // Decodes the title (e.g it will replace the %20 with spaces)
        const decodedTitle = decodeURIComponent(title);
        const book = await Book.findOne({ title: decodedTitle });
        if (!book) {
            res.status(404).json({ message: "No books found with that name! "});
        }
        res.json(book);

    } catch (err) {
        res.status(500).json({ message: "Error fetching books ", error: err })
    }
}

const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, author, genre, price, stock, description, publishedDate } = req.body
        // Decode inputs with %20 in them

        const newBook = new Book({
            title,
            author,
            genre,
            price,
            stock,
            description,
            publishedDate
        });

        await newBook.save();
        res.status(201).json({ message: "New Book has been added", newBook })
    } catch (err) {
        res.status(500).json({ message: "Error creating a new book ", error: err })
    }
};

const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is requried! "});
            return;
        }
        const book = await Book.findById({ _id });
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

        await book.save();
        res.status(200).json({ message: "Book has been updated", book});
    } catch (err) {
        res.status(500).json({ message: "Error updating book", error: err });
    }
}

const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is requried! "});
            return;
        }
        const book = await Book.findById({ _id });
        if (!book) {
            res.status(404).json({ message: "No book found with that ID" });
            return;
        }
        await book.deleteOne();
        res.status(200).json({ message: "Book has been deleted! ", book});
    } catch (err) {
        res.status(500).json({ message: "Error deleting book", error: err});
    }
}

export default {
    getBook,
    getBookByTitle,
    createBook,
    updateBook,
    deleteBook
};