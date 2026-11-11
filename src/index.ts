import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { requestLogger } from './middlewares/requestLogger.js';
import authRouter from './routes/AuthRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import serverRouter from './routes/ServerRouter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use('/', serverRouter);
app.use('/users', authRouter);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

