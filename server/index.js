import express from 'express'
import dotenv from "dotenv"
import todoRoute from "./routes/todo.route.js"
import cors from 'cors'
import { DbConnection } from './db/db.js'
import cookieParser from "cookie-parser"
import userRouter from './routes/user.route.js'
import { authUser } from './middleware/auth.middleware.js'

const app = express()

dotenv.config()

DbConnection();

const port = process.env.PORT

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/todo" , todoRoute )
app.use("/users" , userRouter)


app.get('/', (req, res) => {
  res.send('server connection established')
})


app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})



