import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);

require("dotenv").config();

export const serverSocket =  () => {
    console.log("SocketIO sur le port "+process.env.PORT);
    io.listen(Number(process.env.PORT), {
        transports: ["websocket"],
        cors: {
            origin: process.env.SITE_URL,
            methods: ["GET"],
            credentials: true,
        },
    });
   
}