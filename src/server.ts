import express from 'express';
import BookStoreUserRouter from './routes/userRoutes';
import BookStoreBooksRouter from './routes/bookRoutes';
import BookStoreOrderRouter from './routes/orderRoutes';
import BookStoreReviewRouter from './routes/reviewRoutes';

const app = express();
// Place the connection here
app.use(express.json());

app.use("/user", BookStoreUserRouter);
app.use("/book", BookStoreBooksRouter);
app.use("/order", BookStoreOrderRouter);
app.use("/review", BookStoreReviewRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});