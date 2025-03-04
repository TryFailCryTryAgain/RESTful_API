import { Request, Response } from 'express';
import { Book } from '../models/model'; // Import the mock data and User interface
import { connectToDatabase } from '../utils/db';

const getBook = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: "Error fetching books ", error: err })
    }
};

const getBookByName = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();
        const { title } = req.params;
        if (!title) {
            res.status(400).json({ title: "title params is required "});
            return;
        }
        // Decodes the title (e.g it will replace the %20 with spaces)
        const decodedTitle = decodeURIComponent(title);
        const book = await   Book.findOne({ title: decodedTitle });
        if (!book || book.lenght === 0) {
            res.status(404).json({ message: "No books found with that name! "});
        }
        res.json(book);

    } catch (err) {
        res.status(500).json({ message: "Error fetching books ", error: err })
    }
}

export default {
    getBook,
    getBookByName
};