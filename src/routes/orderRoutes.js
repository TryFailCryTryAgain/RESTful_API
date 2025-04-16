"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = __importDefault(require("../controllers/orderController"));
const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = orderController_1.default;
const BookStoreOrderRouter = express_1.default.Router();
// Defining Routes
BookStoreOrderRouter.get("/", getOrders);
BookStoreOrderRouter.get("/:_id", getOrderById);
BookStoreOrderRouter.post("/", createOrder);
BookStoreOrderRouter.put("/:_id", updateOrder);
BookStoreOrderRouter.delete("/:_id", deleteOrder);
exports.default = BookStoreOrderRouter;
