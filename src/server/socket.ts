import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
require("dotenv").config();

export const serverSocket =  () => {
    console.log("SocketIO sur le port "+process.env.SOCKET);
    io.listen(Number(process.env.SOCKET), {
        transports: ["websocket"],
        cors: {
            origin: process.env.SITE_URL,
            methods: ["GET"],
            credentials: true,
        },
    });
    let users = [];
    function joinUser(socketId, userName, roomName) {
        const user = {
            socketID :  socketId,
            username : userName,
            roomname : roomName
        }
        users.push(user)
        return user;
    }

    function removeUser(id) {
        const getID = users => users.socketID === id;
        const index =  users.findIndex(getID);
        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
    }

    let live = [];
    function joinLive(socketId , userName) {
        const liveConst = {
            name :  socketId,
            code : userName,
        }
        live.push(liveConst)
        return liveConst;
    }

    function removeLive(id) {
        const getLive = live => live.name === id;
        const index =  live.findIndex(getLive);
        if (index !== -1) {
            return live.splice(index, 1)[0];
        }
    }

    function inArray(a, b) {
        var length = b.length;
        for(var i = 0; i < length; i++) {
            if(b[i].name == a) return true;
        }
        return false;
    }

    let thisRoom = "";
    io.on("connection", function (socket) {
        socket.on('live', () => {
            if (!inArray(socket.id, live)) {
                joinLive(socket.id, 'ok')
            }
            socket.emit('live', live)
        })
        socket.on("join room", (data) => {
            let Newuser = joinUser(socket.id, data.username,data.roomName)
            socket.emit('send data' , {id : socket.id ,username:Newuser.username, roomname : Newuser.roomname });
            thisRoom = Newuser.roomname;
            socket.join(Newuser.roomname);
        });
        socket.on("chat", (data) => {
            io.to(thisRoom).emit("chat", {msg:data,id:socket.id});
        });
        socket.on("disconnect", () => {
            removeUser(socket.id)
            removeLive(socket.id)
        });
    });

    
    
}