import express from 'express'
import cors from 'cors';
import dotenv from "dotenv"
import authRoutes from "./routes/AuthRoutes"

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

