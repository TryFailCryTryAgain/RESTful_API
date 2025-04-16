"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController")); // Import the default export
const BookStoreUserRouter = express_1.default.Router();
// Destructure the functions from the imported object
const { getUsers, createUser, getUsersByFirstName, getUsersByLastName, getUserById, updateUser, deleteUser } = userController_1.default;
// User Routes
BookStoreUserRouter.get("/", getUsers);
BookStoreUserRouter.get("/first/:first_name", getUsersByFirstName);
BookStoreUserRouter.get("/last/:last_name", getUsersByLastName);
BookStoreUserRouter.get("/id/:_id", getUserById);
BookStoreUserRouter.post("/", createUser);
BookStoreUserRouter.put("/:_id", updateUser);
BookStoreUserRouter.delete("/:_id", deleteUser);
exports.default = BookStoreUserRouter;
