import { Request, Response } from 'express';
import { Book } from '../models/model'; // Import the mock data and User interface
// import { connectToDatabase } from './utils/db';

const getBook = (req: Request, res: Response): void => {
    res.json(Book);
};

export default {
    getBook
};

