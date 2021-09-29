require("dotenv").config();
import NodeMediaServer from 'node-media-server';

import {serverSocket} from '@server/socket';
import {multithread} from 'node-multithread';

import express from 'express';
import http from 'http';


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



multithread(() => {
    const app = express();
    const server = http.createServer(app);
    serverSocket();
    var nms = new NodeMediaServer(config)
    nms.run();
    server.listen(process.env.PORT, () => {
        console.log('listening on *:4000');
    });
})

