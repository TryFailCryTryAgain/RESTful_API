import express from 'express';
import userController from '../controllers/userController'; // Import the default export
import bookController from '../controllers/bookController';

const BookStoreRouter = express.Router();

// Destructure the functions from the imported object
const { getUsers, getUserById, createUser, updateUser, deleteUser } = userController;
const { getBook, getBookByName } = bookController;
// Define routes

BookStoreRouter.get("/book", getBook);
BookStoreRouter.get("/book/:name", getBookByName);

// User Routes
BookStoreRouter.get("/user", getUsers);
BookStoreRouter.get("/user/:id", getUserById);
BookStoreRouter.post("/user", createUser);
BookStoreRouter.put("/user/:id", updateUser);
BookStoreRouter.delete("/user/:id", deleteUser);

// Book Routes



// BookStoreRouter.post("/book", createBook);
// BookStoreRouter.put("/book/:id", updateBook);
// BookStoreRouter.delete("/book/:id", deleteBook);


export default BookStoreRouter;