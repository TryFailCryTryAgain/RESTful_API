import express from 'express';
import { connectToDatabase } from './utils/db';
import { Book } from './models/model';

const app = express();
app.use(express.json());

// Get all books
app.get('/books', async (req, res) => {
  try {
    await connectToDatabase(); // Ensure the database is connected
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err });
  }
});

// Add a new book
app.post('/books', async (req, res) => {
  try {
    await connectToDatabase(); // Ensure the database is connected
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: 'Error creating book', error: err });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});