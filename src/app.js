import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import helmet from "helmet"
import editorRoutes from "./routes/editorRoutes"
import http from "http"
import {Server} from "socket.io"

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/upload", editorRoutes)

const serverHttp = http.createServer(app)

 
const io = new Server(serverHttp, {cors: {origin:'*'} })

export {serverHttp, io}