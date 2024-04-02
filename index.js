import express from 'express';
import cors from "cors";
import http from "http";
import {Server} from 'socket.io'
import 'dotenv/config'

import router from "./routers/index.js";
import connectDb from "./connectDb.js";

const app = express();
const httpServer = http.createServer(app);


global._io = new Server(httpServer, {
    cors: {
        origin: '*',
        credentials: true,
    },
});


app.use(cors());
app.use(express.json());
router(app);


_io.on('connection', (socket) => {
    global._socket = socket;
})



httpServer.listen(3000, async () => {
    await connectDb()
    console.log(`App is listening on port 3000`);
})
