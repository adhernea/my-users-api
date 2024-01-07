import express from 'express'
import userRoutes from "./routes/userRoutes"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(userRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

