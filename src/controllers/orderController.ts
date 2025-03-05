import { Request, Response } from 'express';
import { connectToDatabase } from '../utils/db';
import { Order } from '../models/orderModel';
import { Book } from '../models/bookModel';

const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Error fetching orders", error: err });
    }
}

const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();
        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required! "});
            return;
        }
        const order = await Order.findById({ _id });
        if (!order) {
            res.status(404).json({ message: "No order found by the given ID! "});
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: "Error fetching the order! ", error: err});
    }
}

const createOrder = async (req: Request, res: Response): Promise<void> => {
    // Add away so when it gets display, show the title of the book, and display the username of the user_id
    try {
        await connectToDatabase();

        const { userId, bookIds, status } = req.body;

        if (!userId) {
            res.status(400).json({ message: "userId is required" });
            return;
        }

        if (!bookIds || !Array.isArray(bookIds)) {
            res.status(400).json({ message: "bookIds must be an array" });
            return;
        }

        let totalAmount: number = 0;
        for (const bookId of bookIds) {
            const book = await Book.findOne({ _id: bookId });
            if (!book) {
                res.status(404).json({ message: `No book found with ID ${bookId}` });
                return;
            }
            totalAmount += book.price as number;
        }

        const orderDate = new Date();
        orderDate.setDate(orderDate.getDate() + 21);

        const order = new Order({ userId, bookIds, totalAmount, status, orderDate });
        await order.save();

        res.status(201).json(order);
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ message: "Error creating order", error: err });
    }
};

const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();

        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required! "});
            return;
        }
        const order = await Order.findById({ _id });
        if (!order) {
            res.status(404).json({ message: "No order found by the given ID!"});
            return;
        }

        const { userId, bookIds } = req.body;
        const oldBookList = order.bookIds;
        const oldUserId = order.userId;
        const oldTotalAmount = order.totalAmount;

        order.userId = userId || order.userId;
        order.bookIds = bookIds || order.bookIds;

        if (order.bookIds != oldBookList) {
            let totalAmount: number = 0;
            for (const bookId of bookIds) {
                const book = await Book.findOne({ _id: bookId });
                if (!book) {
                    res.status(404).json({ message: `No book found with ID ${bookId}` });
                    return;
                }
                totalAmount += book.price as number;
                order.totalAmount = totalAmount;
            }
        } else {
            order.totalAmount = oldTotalAmount;
        }

        if (order.userId != oldUserId || order.bookIds != oldBookList) {
            const status = "Pending";
            const orderDate = new Date();
            orderDate.setDate(orderDate.getDate() + 21);
            order.orderDate = orderDate;
            order.status = status;

        } else {
            const status = order.status;
            const orderDate = order.orderDate;
            order.orderDate = orderDate;
            order.status = status;
        }

        await order.save();
        res.status(200).json({ message: "Order has been successfully updated! ", order });
    } catch (err) {
        res.status(500).json({ message: "Failed to update order! ", error: err });
    }
}

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        await connectToDatabase();

        const { _id } = req.params;
        if (!_id) {
            res.status(400).json({ _id: "_id params is required! "});
            return;
        }
        const order = await Order.findById({ _id });
        if (!order) {
            res.status(404).json({ message: "No order found with that ID!" });
            return;
        }
        await order.deleteOne();
        res.status(200).json({ message: "Order has been successfully deleted! "});
    } catch (err) {
        res.status(500).json({ message: "Error deleting order ", error: err });
    }
}

export default {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}