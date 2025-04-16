import express from 'express';
import bookController from '../controllers/bookController';

const { getBookId, getBook, getBookByTitle, createBook, updateBook, deleteBook } = bookController;

const BookStoreBooksRouter = express.Router();


// Define routes
BookStoreBooksRouter.get("/", getBook);
BookStoreBooksRouter.get("/:title", getBookByTitle);
BookStoreBooksRouter.get("/:_id", getBookId);
BookStoreBooksRouter.post("/", createBook); // Doesnt work yet, missing code MIA same as the routes below
BookStoreBooksRouter.put("/:_id", updateBook);
BookStoreBooksRouter.delete("/:_id", deleteBook);

export default BookStoreBooksRouter;