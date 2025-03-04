import express from 'express';
import userController from '../controllers/userController'; // Import the default export

const userRouter = express.Router();

// Destructure the functions from the imported object
const { getUsers, getUserById, createUser, updateUser, deleteUser } = userController;

// Define routes
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;