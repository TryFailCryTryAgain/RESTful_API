import express from 'express';
import orderController from '../controllers/orderController';

const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = orderController;

const BookStoreOrderRouter = express.Router();

// Defining Routes
BookStoreOrderRouter.get("/", getOrders);
BookStoreOrderRouter.get("/:_id", getOrderById);
BookStoreOrderRouter.post("/", createOrder);
BookStoreOrderRouter.put("/:_id", updateOrder);
BookStoreOrderRouter.delete("/:_id", deleteOrder);

export default BookStoreOrderRouter;
