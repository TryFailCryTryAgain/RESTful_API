"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching users ", error: err });
    }
});
const getUsersByFirstName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name } = req.params;
        if (!first_name) {
            res.status(400).json({ first_name: "First_name params is required " });
        }
        const user = yield userModel_1.User.find({ first_name });
        if (!user) {
            res.status(404).json({ message: "No users found with that name! " });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Error Fetching user " });
    }
});
const getUsersByLastName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { last_name } = req.params;
        if (!last_name) {
            res.status(400).json({ first_name: "First_name params is required " });
        }
        const user = yield userModel_1.User.find({ last_name });
        if (!user) {
            res.status(404).json({ message: "No users found with that name! " });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Error Fetching user ", error: err });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required" });
        }
        const user = yield userModel_1.User.findOne({ _id });
        if (!user) {
            res.status(404).json({ message: "No user found with that ID" });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Error Fetching User", error: err });
    }
});
// Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, phone, email, password, adress, ZIP } = req.body;
        const newUser = new userModel_1.User({
            first_name,
            last_name,
            phone,
            email,
            password,
            adress,
            ZIP,
        });
        yield newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(500).json({ message: "Error creating user", error: err });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Debug log
        console.log("Request Params:", req.params);
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required" });
            return;
        }
        const user = yield userModel_1.User.findById({ _id });
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
        yield user.save();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Error Updating user", error: err });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required" });
            return;
        }
        const user = yield userModel_1.User.findById({ _id });
        if (!user) {
            res.status(404).json({ message: "No user found with that ID" });
            return;
        }
        yield user.deleteOne();
        res.status(200).json({ message: "User has been deleted", user });
    }
    catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err });
    }
});
// Export the controller functions
exports.default = {
    getUsers,
    getUsersByFirstName,
    getUsersByLastName,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
