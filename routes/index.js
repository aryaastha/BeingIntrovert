require('../public/js/constants');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

function construct(io) {
    io.sockets.on(connection, function (socket) {
        socket.on(registerRoom, function(room) {
           socket.join(room);
        });
        socket.emit("Start_Chat");

        socket.on(registerName, function (data) {
            io.in(data.room).emit("r_name", "<strong>" + data.name + "</strong> Has Joined The Chat");
            socket.on(sendMessage, function (data) {
                io.in(data.room).emit(receiveMessage, "<strong>" + data.name + "</strong>: " + data.message);
            })
        })
    });
    return router;
}

module.exports = construct;
