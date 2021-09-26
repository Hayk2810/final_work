//// matrix[y][x] = 1 - xot
//// matrix[y][x] = 2 - xotaker
//// matrix[y][x] = 3 - gishatich
//// matrix[y][x] = 4 - tunavorxot
//// matrix[y][x] = 5 - bonus

var socket = io();

var side = 10;

function setup() {
    createCanvas(50 * side, 50 * side);
    background("pink");
}

socket.on("weather", function (data) {
    weath = data;
})

// function generateMatrix(side, GrassCount, GrassEaterCount, PredatorCount){
    
//     for (let i = 0; i < side; i++) {   
//         let arr = []   
//         matrix.push(arr)
//         for (let j = 0; j < side; j++) {   
//             matrix[i].push(0)     
//         }     
//     }

//     for (let i = 0; i < GrassCount; i++) {
//         let x = Math.round(random(0, side - 1))
//         let y = Math.round(random(0, side - 1))
//         if (matrix[y][x] == 0) {
//             let gr = new Grass(x,y)
//             grassArr.push(gr)
//             matrix[y][x] = 1;
//         }
//     }
//     // for (let i = 0; i < GrassEaterCount; i++) {
//     //     let x = Math.round(random(0, side - 1))
//     //     let y = Math.round(random(0, side - 1))
//     //     if (matrix[y][x] == 0) {
//     //         let Xt = new Xotaker(x,y)
//     //         xotakerArr.push(Xt)
//     //         matrix[y][x] = 2;
//     //     }
//     // }
//     // for (let i = 0; i < PredatorCount; i++) {
//     //     let x = Math.round(random(0, side - 1))
//     //     let y = Math.round(random(0, side - 1))
//     //     if (matrix[y][x] == 0) {
//     //         let Pr = new Predator(x,y)
//     //         predatorArr.push(Pr)
//     //         matrix[y][x] = 3;
//     //     }
//     // }
// }

bombtelArr = []

// setTimeout(
//     function() {
//         if(grassArr.length != 0 || tunxotArr.length != 0 || xotakerArr.length != 0 || predatorArr.length != 0 || bonusArr.length != 0) {
//             generateBomb()
//         }
//     },20000
// )

function paytyun() {
    for(let y = 0; y < matrixkoxm; y++) {
        for(let x = 0; x < matrixkoxm; x++ ){
            matrix[y][x] = 9
        }
    }
    grassEaterArr = []
    grassArr = []
    // predatorArr = []
    // tunxotArr = []
    // bonusArr = []
    setTimeout(
        function() {
            for(let y = 0; y < matrixkoxm; y++) {
                for(let x = 0; x < matrixkoxm; x++ ){
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
    let time = 3
    document.getElementById("bombtime").innerHTML = time
    time--
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
            paytyun()
            document.getElementById("bombtime").innerHTML = ""
        },3200
    )
}

// function setup(){
//     createCanvas(50 * side, 50 * side)
//     background("gray")

//     // setInterval(
//     //     function() {
//     //         if(grassArr.length != 0 || xotakerArr.length != 0) {
//     //             let x = Math.round(random(0, matrixkoxm-1))
//     //             let y = Math.round(random(0, matrixkoxm-1))
//     //             if (matrix[y][x] == 0) {
//     //             let bonus = new Bonus(x,y)
//     //             bonusArr.push(bonus)
//     //             matrix[y][x] = 5;
//     //             }
//     //         }
//     //     },1500
//     // )

//     // setInterval(
//     //     function() {
//     //         if(xotakerArr.length > 15) {
//     //             let x = Math.round(random(0, matrixkoxm-1))
//     //             let y = Math.round(random(0, matrixkoxm-1))
//     //             if (matrix[y][x] == 0) {
//     //                 let Tun = new TunXot(x,y)
//     //                 tunxotArr.push(Tun)
//     //                 matrix[y][x] = 4;
//     //             }
//     //         }
//     //     },100
//     // )
// }

function nkarel(matrix){
    // console.log(grassArr.length);
    // console.log(xotakerArr.length);
    // console.log(predatorArr.length);
    // console.log(tunxotArr.length);
    // console.log(bonusArr.length);
    // console.log("-------------");
    
    for(var y = 0 ; y < matrix.length ; y++){
        for(var x = 0 ; x < matrix[0].length; x++){
            var obj = matrix[y][x]
            if(obj == 1){
                if(weath == "summer") {
                fill("green");
            }else if (weath == "autumn") {
                fill("#333300");
            }else if (weath == "winter") {
                fill("white");
            }else if (weath == "spring") {
                fill("#4dffa6");
            }
            }else if(obj == 2){
                fill("yellow")
            }

            rect( x * side , y * side , side , side )
            

        }
    }
}

socket.on('send matrix', nkarel)


// function infoblock() {
//     document.getElementById("infoblock").style.display = 'block'
// }

// function infoblockclose() {
//     document.getElementById("infoblock").style.display = 'none'
// }