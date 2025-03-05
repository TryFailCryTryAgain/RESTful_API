import express from 'express';
import userController from '../controllers/userController'; // Import the default export

const BookStoreUserRouter = express.Router();

// Destructure the functions from the imported object
const { getUsers, createUser, getUsersByFirstName, getUsersByLastName, getUserById, updateUser, deleteUser } = userController;
// User Routes
BookStoreUserRouter.get("/", getUsers);
BookStoreUserRouter.get("/first/:first_name", getUsersByFirstName);
BookStoreUserRouter.get("/last/:last_name", getUsersByLastName);
BookStoreUserRouter.get("/id/:_id", getUserById);
BookStoreUserRouter.post("/", createUser);
BookStoreUserRouter.put("/:_id", updateUser);
BookStoreUserRouter.delete("/:_id", deleteUser);


export default BookStoreUserRouter;