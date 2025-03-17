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
const orderModel_1 = require("../models/orderModel");
const bookModel_1 = require("../models/bookModel");
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.Order.find();
        res.json(orders);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching orders", error: err });
    }
});
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required! " });
            return;
        }
        const order = yield orderModel_1.Order.findById({ _id });
        if (!order) {
            res.status(404).json({ message: "No order found by the given ID! " });
        }
        res.json(order);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching the order! ", error: err });
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Add away so when it gets display, show the title of the book, and display the username of the user_id
    try {
        const { userId, bookIds, status } = req.body;
        if (!userId) {
            res.status(400).json({ message: "userId is required" });
            return;
        }
        if (!bookIds || !Array.isArray(bookIds)) {
            res.status(400).json({ message: "bookIds must be an array" });
            return;
        }
        let totalAmount = 0;
        for (const bookId of bookIds) {
            const book = yield bookModel_1.Book.findOne({ _id: bookId });
            if (!book) {
                res.status(404).json({ message: `No book found with ID ${bookId}` });
                return;
            }
            totalAmount += book.price;
        }
        const orderDate = new Date();
        orderDate.setDate(orderDate.getDate() + 21);
        const order = new orderModel_1.Order({ userId, bookIds, totalAmount, status, orderDate });
        yield order.save();
        res.status(201).json(order);
    }
    catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ message: "Error creating order", error: err });
    }
});
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required! " });
            return;
        }
        const order = yield orderModel_1.Order.findById({ _id });
        if (!order) {
            res.status(404).json({ message: "No order found by the given ID!" });
            return;
        }
        const { userId, bookIds } = req.body;
        const oldBookList = order.bookIds;
        const oldUserId = order.userId;
        const oldTotalAmount = order.totalAmount;
        order.userId = userId || order.userId;
        order.bookIds = bookIds || order.bookIds;
        if (order.bookIds != oldBookList) {
            let totalAmount = 0;
            for (const bookId of bookIds) {
                const book = yield bookModel_1.Book.findOne({ _id: bookId });
                if (!book) {
                    res.status(404).json({ message: `No book found with ID ${bookId}` });
                    return;
                }
                totalAmount += book.price;
                order.totalAmount = totalAmount;
            }
        }
        else {
            order.totalAmount = oldTotalAmount;
        }
        if (order.userId != oldUserId || order.bookIds != oldBookList) {
            const status = "Pending";
            const orderDate = new Date();
            orderDate.setDate(orderDate.getDate() + 21);
            order.orderDate = orderDate;
            order.status = status;
        }
        else {
            const status = order.status;
            const orderDate = order.orderDate;
            order.orderDate = orderDate;
            order.status = status;
        }
        yield order.save();
        res.status(200).json({ message: "Order has been successfully updated! ", order });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update order! ", error: err });
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required! " });
            return;
        }
        const order = yield orderModel_1.Order.findById({ _id });
        if (!order) {
            res.status(404).json({ message: "No order found with that ID!" });
            return;
        }
        yield order.deleteOne();
        res.status(200).json({ message: "Order has been successfully deleted! " });
    }
    catch (err) {
        res.status(500).json({ message: "Error deleting order ", error: err });
    }
});
exports.default = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
