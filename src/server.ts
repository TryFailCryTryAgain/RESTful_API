import express, { Request, Response } from 'express';
import userRouter from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('User API is live!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});