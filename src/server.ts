import express from 'express';
import BookStoreUserRouter from './routes/userRoutes';
import BookStoreBooksRouter from './routes/bookRoutes';
import BookStoreOrderRouter from './routes/orderRoutes';
import BookStoreReviewRouter from './routes/reviewRoutes';
import { connectToDatabase } from '../src/utils/db';
import cors from 'cors';

const app = express();
// Place the connection here
app.use(express.json());
app.use(cors());

app.use("/user", BookStoreUserRouter);
app.use("/book", BookStoreBooksRouter);
app.use("/order", BookStoreOrderRouter);
app.use("/review", BookStoreReviewRouter);

app.get('/', (req, res) => {
  res.send('User route is working');
});

connectToDatabase();


// Error handling middleware


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});