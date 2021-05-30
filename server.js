const http = require('http');
const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');

const moment = require('moment');
const formatMsg = (type, name, msg, id) => {
    return {
        type,
        name,
        msg,
        time: moment().format('HH:mm:ss'),
        id
    }
}

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origins: '*:*'
    }
});

const Sys = "System";

let users = [

]

function joinRoom(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

function leaveRoom(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getCurrentUser(id) {
    return users.filter(user => user.id === id);
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}



io.on("connection", socket => {
    socket.on("joinRoom", ({ username, room }) => {
        const user = joinRoom(socket.id, username, room);
        socket.join(user.room);
        socket.emit('message', formatMsg(Sys, Sys, `歡迎進入聊天室!`));
        socket.broadcast.to(user.room).emit(
            'message',
            formatMsg(Sys, Sys, `${user.username} 加入聊天`)
        );
        io.to(user.room).emit('roomUsers', getRoomUsers(user.room));
    });


    socket.on('message', msg => {
        users.forEach(({ id, username, room }) => {
            if (id === socket.id) {
                io.to(room).emit('message', formatMsg("User", username, msg, id));
            }
        });
    });

    socket.on('disconnect', () => {
        const user = leaveRoom(socket.id);
        if (user) {
            io.to(user.room).emit(
                'message',
                formatMsg(Sys, Sys, `${user.username} 離開聊天室`)
            );

            io.to(user.room).emit('roomUsers', getRoomUsers(user.room));
        }
    });
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));