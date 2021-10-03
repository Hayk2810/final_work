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

grassHashiv = 0;

var n = 40;

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
                grassHashiv++;
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

    // console.log(grassArr.length);
    // console.log(grassEaterArr.length);
    // console.log(predatorArr.length);
    // console.log(toxicGrassArr.length);
    // console.log(bonusArr.length);
    // console.log("-------------");

    console.log(grassHashiv)

    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 300)

bombtelArr = []

function paytyun() {
    for(let y = 0; y < n; y++) {
        for(let x = 0; x < n; x++ ){
            matrix[y][x] = 9
        }
    }
    grassArr = []
    grassEaterArr = []
    predatorArr = []
    toxicGrassArr = []
    bonusArr = []
    setTimeout(
        function() {
            for(let y = 0; y < n; y++) {
                for(let x = 0; x < n; x++ ){
                    matrix[y][x] = 0
                }
            }
        },1000
    )
}

function generateBomb() {
    let y = 13
    let x = 15
    for(let i = 0; i < 46; i++) {
        if(i < 3) {
            matrix[y][x] = 666
            for(let k = 0 ; k < 7+(2*i); k++) {
                if(x < 21+i) {
                    x++
                    matrix[y][x] = 666
                } else {
                    x -= 6+2*i
                }
            }
            y++
            x--
        } else if (i > 4 && i < 13) {
            if ( i > 6 && i < 11) {
                x--
                matrix[y][x] = 666
                x++
            }
            for(let k = 0 ; k < 13; k++) {
                if(x < 24) {
                    x++
                    matrix[y][x] = 666
                } else {
                    x -= 12
                }
            }
            matrix[y][x] = 666
            y++
        } else if ( i > 13 && i < 17) {
            x++
            for(let k = 0 ; k < 39-2*i; k++) {
                if(x < 37-i) {
                    x++
                    matrix[y][x] = 666
                } else {
                    x -= 38-2*i
                }
            }
            matrix[y][x] = 666
            y++
        } else if ( i > 17 && i < 24) {
            x++
            matrix[y][x] = 666
        } else if (i > 24 && i < 29) {
            x++
            y--
            matrix[y][x] = 666
        } else if (i > 28 && i < 36) {
            y--
            if(i > 29 && i < 34) {
                x++
                matrix[y][x] = 666
                x--
            }
            matrix[y][x] = 666
        } else if (i > 36 && i < 41) {
            x--
            y-- 
            matrix[y][x] = 666
        } else if (i > 40 && i < 46) {
            x--
            if( i > 41 && i < 44) {
                y--
                matrix[y][x] = 666
                y++
            }
            matrix[y][x] = 666
        }
    }
    matrix[10][19] = 9
    matrix[9][20] = 9
    matrix[8][21] = 9
    matrix[7][22] = 9
    matrix[6][23] = 9
    matrix[5][24] = 9
    matrix[4][25] = 9
    let bx = 25
    let by = 4
    setInterval(
        function() {
            if(bx > 18) {
                matrix[by][bx] = 0
                bx--
                by++
            }
        },3000/7
    )
    setTimeout(
        function() {
            paytyun()
        },3200
    )
}

function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            grassArr.push(new Grass(x, y))
            grassHashiv++;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        matrix[y][x] = 2
        grassEaterArr.push(new GrassEater(x, y))
    }
    io.sockets.emit("send matrix", matrix);
}

function addPredator() {
    for (var i = 0; i < 5; i++) {   
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        matrix[y][x] = 3
        predatorArr.push(new Predator(x, y))
    }
    io.sockets.emit("send matrix", matrix);
}

function addToxicGrass() {
    for (var i = 0; i < 5; i++) {   
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        matrix[y][x] = 4
        toxicGrassArr.push(new ToxicGrass(x, y))
    }
    io.sockets.emit("send matrix", matrix);
}

function addBonus() {
    for (var i = 0; i < 5; i++) {   
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        matrix[y][x] = 5
        bonusArr.push(new Bonus(x, y))
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

let sendData = {
    grassCounter: grassHashiv
}

io.sockets.emit("data", sendData);

io.on('connection', function (socket) {
    createObject();
    socket.on("kill", generateBomb);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
    socket.on("add toxicGrass", addToxicGrass);
    socket.on("add bonus", addBonus);
});
