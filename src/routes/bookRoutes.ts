import express from 'express';
import bookController from '../controllers/bookController';

const { getBookId, getBook, getBookByTitle, createBook, updateBook, deleteBook, getBookByGenre } = bookController;

const BookStoreBooksRouter = express.Router();


// Define routes
BookStoreBooksRouter.get("/", getBook);
BookStoreBooksRouter.get("/genre/:genre", getBookByGenre);
BookStoreBooksRouter.get("/:title", getBookByTitle);
BookStoreBooksRouter.get("/id/:_id", getBookId);
BookStoreBooksRouter.post("/", createBook);
BookStoreBooksRouter.put("/:_id", updateBook);
BookStoreBooksRouter.delete("/:_id", deleteBook);

export default BookStoreBooksRouter;