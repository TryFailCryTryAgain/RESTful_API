import { Request, Response } from 'express';
import users, { User } from '../models/userModel'; // Import the mock data and User interface

// Get all users
const getUsers = (req: Request, res: Response): void => {
    res.json(users);
};

// Get a user by ID
const getUserById = (req: Request, res: Response): void => {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json(user);
};

// Create a new user
const createUser = (req: Request, res: Response): void => {
    const newUser: User = {
        id: users.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };
    users.push(newUser);
    res.status(201).json(newUser);
};

// Update a user
const updateUser = (req: Request, res: Response): void => {
    const userId = parseInt(req.params.id);
    const { first_name, last_name } = req.body;
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    users[userIndex] = { ...users[userIndex], first_name, last_name };
    res.json({ message: "User updated successfully", user: users[userIndex] });
};

// Delete a user
const deleteUser = (req: Request, res: Response): void => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    users.splice(userIndex, 1);
    res.json({ message: "User deleted successfully" });
};

// Export the controller functions
export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};