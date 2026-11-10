import express from 'express'
import cors from 'cors';
import dotenv from "dotenv"
import { requestLogger } from './middlewares/requestLogger.js';
import authRouter from './routes/AuthRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use('/', authRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

