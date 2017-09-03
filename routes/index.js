require('../util/constants');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

function construct(io) {
    io.sockets.on(connection, function (socket) {
        socket.emit("Start_Chat");

        socket.on("Register_Name", function (data) {
            io.sockets.emit("r_name", "<strong>" + data + "</strong> Has Joined The Chat");
            //Now Listening To A Chat Message
            socket.on("Send_msg", function (data) {
                io.sockets.emit("msg", data);
                //Now Listening To A Chat Message
            })
        })
    });
    return router;
}

module.exports = construct;
