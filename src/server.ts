import express from 'express';
import BookStoreUserRouter from './routes/userRoutes';
import BookStoreBooksRouter from './routes/bookRoutes';

const app = express();
app.use(express.json());

app.use("/user", BookStoreUserRouter);
app.use("/book", BookStoreBooksRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});