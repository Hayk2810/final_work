//// matrix[y][x] = 1 - Grass
//// matrix[y][x] = 2 - GrassEater
//// matrix[y][x] = 3 - Predator
//// matrix[y][x] = 4 - ToxicGrass
//// matrix[y][x] = 5 - Bonus

var socket = io();

var side = 13;

var weath = "winter";

function setup() {
    createCanvas(40 * side, 40 * side);
    background("pink");
}

socket.on("weather", function (data) {
    weath = data;
})

function nkarel(matrix){
    for(var y = 0 ; y < matrix.length ; y++){
        for (var x = 0; x < matrix[0].length; x++) {
            var obj = matrix[y][x];
            if (obj == 1){
                if(weath == "summer") {
                fill("green");
            }else if (weath == "autumn") {
                fill("#333300");
            }else if (weath == "winter") {
                fill("white");
            }else if (weath == "spring") {
                fill("#4dffa6");
            }
            }
            else if (obj == 2) {
                fill("yellow");
            }
            else if(obj == 3){
                fill("red");
            }
            else if(obj == 4){
                fill("#F62196")
            }
            else if(obj == 5){
                fill("#3171E7")
            }
            else if(matrix[y][x] == 666) {
                fill("black")
            }
            else if(matrix[y][x] == 9) {
                fill("white")
            }
            else if (obj == 0){
                fill("grey")
            }
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on('send matrix', nkarel)

function kill() {
    socket.emit("kill")
    let time = 3
    setTimeout(
        function() {
            document.getElementById("bombtime").innerText = time;
            time--;
        },100
    )
    setInterval(
        function() {
            if(time > -1) {
                document.getElementById("bombtime").innerHTML = time
                time--
            }
        },1000
    )
    setTimeout(
        function() {
            document.getElementById("bombtime").innerText = ""
        },3500
    )
    document.querySelector("#kill").disabled = true;
    setTimeout(
        function() {
            document.querySelector("#kill").disabled = false;
        },5000
    )
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPredator() {
    socket.emit("add predator")
}
function addToxicGrass() {
    socket.emit("add toxicGrass")
}
function addBonus() {
    socket.emit("add bonus")
}


// function infoblock() {
//     document.getElementById("infoblock").style.display = 'block'
// }

// function infoblockclose() {
//     document.getElementById("infoblock").style.display = 'none'
// }