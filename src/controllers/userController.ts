import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { connectToDatabase } from '../utils/db';

// Get all users
const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users ", error: err})
    }
};

const getUsersByFirstName = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();
        const { first_name } = req.params;
        if (!first_name) {
            res.status(400).json({ first_name: "First_name params is required "});
        }
        const user = await User.find({ first_name });
        if (!user) {
            res.status(404).json({ message: "No users found with that name! "});
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error Fetching user "});
    }
}

const getUsersByLastName = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();
        const { last_name } = req.params;
        if (!last_name) {
            res.status(400).json({ first_name: "First_name params is required "});
        }
        const user = await User.find({ last_name });
        if (!user) {
            res.status(404).json({ message: "No users found with that name! "});
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error Fetching user ", error: err });
    }
}

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required" });
        }
        const user = await User.findOne({ _id });
        if (!user) {
            res.status(404).json({ message: "No user found with that ID" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error Fetching User", error: err })
    }
}

// Create a new user
const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();
        const { first_name, last_name, phone, email, password, adress, ZIP } = req.body;

        const newUser = new User({
            first_name,
            last_name,
            phone,
            email,
            password,
            adress,
            ZIP,
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err })
    }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();

        // Debug log
        console.log("Request Params:", req.params);

        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required" });
            return;
        }
        const user = await User.findById({ _id });
        if (!user) {
            res.status(404).json({ message: "No user found with that ID" });
            return;
        }

        const { first_name, last_name, phone, email, password, adress, ZIP } = req.body;

        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.phone = phone || user.phone;
        user.password = password || user.password;
        user.adress = adress || user.adress;
        user.ZIP = ZIP || user.ZIP;

        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error Updating user", error: err })
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();

        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required" });
            return;
        }
        const user = await User.findById({ _id });
        if (!user) {
            res.status(404).json({ message: "No user found with that ID" });
            return;
        }
        await user.deleteOne();
        res.status(200).json({ message: "User has been deleted", user});

    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err });
    }
}

// Export the controller functions
export default {
    getUsers,
    getUsersByFirstName,
    getUsersByLastName,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};