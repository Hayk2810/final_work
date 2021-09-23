var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

// grassArr = [];
// grassEaterArr = [];
// matrix = [];

// var n = 50;

// weath = "winter";
// Grass = require("./Grass")
// GrassEater = require("./GrassEater")

// function rand(min, max) {
//     return Math.random() * (max - min) + min;
// }

// for (let i = 0; i < n; i++) {
//     matrix[i] = [];
//     for (let j = 0; j < n; j++) {
//         matrix[i][j] = Math.floor(rand(0, 3))
        
//     }  
// }

// io.sockets.emit("send matrix", matrix)
