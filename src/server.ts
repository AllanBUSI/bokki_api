require("dotenv").config();
import NodeMediaServer from 'node-media-server';

import {serverSocket} from '@server/socket';
import {multithread} from 'node-multithread';

import express from 'express';
import http from 'http';
import router from '@routes/index';

declare global {
    var myCache: NodeCache;
}
import NodeCache from "node-cache";

import helmet from 'helmet';
import cors from 'cors';

global.myCache = new NodeCache();

import { Server } from "socket.io";


const config = {
    logType: 3,
    rtmp: {
        port: 4444,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 8000,
        allow_origin: '*'
    }
};



// multithread(() => {
    const app = express();
    const server = http.createServer(app);   
    const io = new Server(server); 
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(helmet());
    app.use(
    cors({
            credentials: true,
            origin: "*",
        })
    );
    app.use(router);
    app.use(router);
    var nms = new NodeMediaServer(config)
    nms.run();
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
        console.log('ok');
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
    server.listen(process.env.PORT, () => {
        console.log('listening on *:',process.env.PORT);
    });
// })

