"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const db_1 = require("../src/utils/db");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Place the connection here
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/user", userRoutes_1.default);
app.use("/book", bookRoutes_1.default);
app.use("/order", orderRoutes_1.default);
app.use("/review", reviewRoutes_1.default);
app.get('/', (req, res) => {
    res.send('User route is working');
});
(0, db_1.connectToDatabase)();
// Error handling middleware
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
