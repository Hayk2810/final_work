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

grassArr = [];
grassEaterArr = [];
predatorArr = [];
toxicGrassArr = [];
bonusArr = []
matrix = [];

var n = 50;

weath = "winter";
Grass = require("./scripts/grass")
GrassEater = require("./scripts/grasseater")
Predator = require("./scripts/predator")
ToxicGrass = require("./scripts/toxicgrass")
Bonus = require("./scripts/bonus")

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 3))
        
    }  
}

io.sockets.emit("send matrix", matrix)

function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1 
                grassArr.push(new Grass(x, y))
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater(x, y))
            }
            else if (matrix[y][x] == 3) {
                matrix[y][x] = 2
                predatorArr.push(new Predator(x, y))
            }
            else if (matrix[y][x] == 4) {
                matrix[y][x] = 2
                toxicGrassArr.push(new ToxicGrass(x, y))
            }
            else if (matrix[y][x] == 5) {
                matrix[y][x] = 5
                bonusArr.push(new Bonus(x, y))
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}

function game() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].move();
    }
    for (let i in predatorArr) {
        predatorArr[i].move();
    }
    console.log(grassArr.length);
    console.log(grassEaterArr.length);
    console.log(predatorArr.length);
    console.log(toxicGrassArr.length);
    console.log(bonusArr.length);
    console.log("-------------");
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 300)

function kill() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    toxicGrassArr = []
    bonusArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            grassArr.push(new Grass(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addPredator() {
    for (var i = 0; i < 5; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            predatorArr.push(new Predator(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addToxicGrass() {
    for (var i = 0; i < 5; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            toxicGrassArr.push(new ToxicGrass(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addBonus() {
    for (var i = 0; i < 5; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            bonusArr.push(new Bonus(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
    socket.on("add toxicGrass", addToxicGrass);
    socket.on("add bonus", addBonus);
});