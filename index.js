"use strict";

let express = require('express');
let socket = require('socket.io');

//APP Setup
let app = express();

let server = app.listen(4000,function () {
    console.log('listening...port 4000...');
});

//Static files serve
app.use(express.static('public'));


//Socket setup
let io = socket(server);

io.on('connection',function (socket) {
    console.log('made connection by id',socket.id);

    socket.on('chat',function (msg) {
        console.log(msg);
        io.sockets.emit('chat',msg);
    });

    socket.on('typing',function (handle) {
        socket.broadcast.emit('typing',handle);

    });

});