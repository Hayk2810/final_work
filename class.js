class Grass{
    constructor(x,y){
        this.x = x
        this.y = y 
        this.multiply = 0;
        this.direction = [

            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ]
        matrix[this.y][this.x] = 1
    }

    chooseCell(){
        var found = [];

        for(let i in this.direction){
            
            let x = this.direction[i][0];
            let y = this.direction[i][1];

            if(x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1){
                found.push(this.direction[i])
            }
        }

        return found
    }


    mul(){
        this.multiply++

        let emptyCells = this.chooseCell()
        let randomCell = random(emptyCells)

        if (this.multiply >= 1 && randomCell != undefined) {
            
            let x = randomCell[0]
            let y = randomCell[1]

            if(matrix[y][x] == 0) {
                matrix[y][x] = 1
                let gr = new Grass(x,y)
                grassArr.push(gr)
                this.multiply = 0
            } else if(matrix[y][x] == 5) {
                console.log("xoty kerav bonus");
                matrix[this.y][this.x] = 0;
                matrix[y][x] = 1;

                for (var i in bonusArr) {
                    if (x == bonusArr[i].x && y == bonusArr[i].y) {
                        bonusArr.splice(i, 1);
                        break;
                    }
                }

                this.y = y;
                this.x = x;

                for (let i = 0; i < 10; i++) {
                    let x = Math.round(random(0, matrixkoxm - 1))
                    let y = Math.round(random(0, matrixkoxm - 1))
                    
                    if (matrix[y][x] == 0) {
                        let gr = new Grass(x,y)
                        grassArr.push(gr)
                        matrix[y][x] = 1;
                    }
                }
            }
        }
    }
        
}

class Predator{
    constructor(x,y){
        this.x = x
        this.y = y
        this.energy = 30
        this.amenaker = 0
        this.direction = []
    }

    updateDirection(){
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(ch){
        this.updateDirection()
        var found = [];
        for(let i in this.direction){
            
            let x = this.direction[i][0];
            let y = this.direction[i][1];

            if(x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1){
                if(matrix[y][x] == ch) {
                    found.push(this.direction[i])
                }
            }
        }

        return found
    }

    move(){
        let emptyCell = random(this.chooseCell(2))
        let emptyCell2 = random(this.chooseCell(5))
        let emptyCell3 = random(this.chooseCell(1))
        let emptyCell4 = random(this.chooseCell(4))
        let emptyCell5 = random(this.chooseCell(0))
        if (emptyCell) {
            this.eat()
        }else if(emptyCell2) {
            let x = emptyCell2[0]
            let y = emptyCell2[1]
            matrix[this.y][this.x] = 0;
            matrix[y][x] = 3;

            for (var i in bonusArr) {
                if (x == bonusArr[i].x && y == bonusArr[i].y) {
                    bonusArr.splice(i, 1);
                    break;
                }
            }

            this.y = y;
            this.x = x;
            
            this.amenaker = 1
            this.energy++;
            console.log("gishatich kerav bonus");
        } else if (emptyCell3) {
            if(this.amenaker == 1) {
                this.energy += 2
                let x = emptyCell3[0]
                let y = emptyCell3[1]
                matrix[this.y][this.x] = 0;
                matrix[y][x] = 3;

                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }

                this.y = y;
                this.x = x;
                this.energy += 5;
            } else {
                this.energy--
            }
        } else if (emptyCell4) {
            if(this.amenaker == 1) {
                this.energy++

                let x = emptyCell4[0]
                let y = emptyCell4[1]
                
                matrix[this.y][this.x] = 0;
                matrix[y][x] = 3;

                for (var i in tunxotArr) {
                    if (x == tunxotArr[i].x && y == tunxotArr[i].y) {
                        tunxotArr.splice(i, 1);
                        break;
                    }
                }

                this.y = y;
                this.x = x;
            } else {
                this.energy--
                let x = emptyCell5[0]
                let y = emptyCell5[1]

                matrix[y][x] = 3
                matrix[this.y][this.x] = 0

                this.x = x
                this.y = y
            }
        } else if(emptyCell5) {
            this.energy--
            let x = emptyCell5[0]
            let y = emptyCell5[1]

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0

            this.x = x
            this.y = y
        } 
        if (this.energy >= 70) {
            this.mul()
        }
        if(this.energy <= 0){
            this.die()
        }
    }

    eat(){
        var newCell = random(this.chooseCell(2));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;

            for (var i in xotakerArr) {
                if (newX == xotakerArr[i].x && newY == xotakerArr[i].y) {
                    xotakerArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 5;
        }
    }
    
    die(){
        matrix[this.y][this.x] = 0
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }
    }

    mul(){
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newPredator = new Predator(newCell[0], newCell[1]);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 35;
        }
    }

}

class Xotaker{
    constructor(x,y){
        this.x = x
        this.y = y
        this.energy = 10
        this.imunitet = 0
        this.direction = []
    }

    updateDirection(){
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(ch){
        this.updateDirection()
        var found = [];
        for(let i in this.direction){
            
            let x = this.direction[i][0];
            let y = this.direction[i][1];

            if(x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1){
                
                if(matrix[y][x] == ch){
                    found.push(this.direction[i])
                }

            }
        }

        return found
    }

    chooseCell2(){
        this.updateDirection()
        var found = [];
        for(let i in this.direction){
            
            let x = this.direction[i][0];
            let y = this.direction[i][1];

            if(x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1){
                found.push(this.direction[i])
            }
        }

        return found
    }

    move(){
        this.energy--
        let arr = this.chooseCell(1)
        if(arr.length > 0)
        {
            this.eat()
        }
        else
        {
            let emptyCell = random(this.chooseCell(5))
            let emptyCell2 = random(this.chooseCell(4))
            let emptyCell3 = random(this.chooseCell(0))
            if(emptyCell) {
                let x = emptyCell[0]
                let y = emptyCell[1]
                this.imunitet = 1
                matrix[this.y][this.x] = 0;
                matrix[y][x] = 2;

                for (var i in bonusArr) {
                    if (x == bonusArr[i].x && y == bonusArr[i].y) {
                        bonusArr.splice(i, 1);
                        break;
                    }
                }

                this.y = y;
                this.x = x;

                for(let i = 0; i < 8; i++){
                    this.mul2()
                }
                console.log("xotaker kerav bonus");
            } else if (emptyCell2) {
                let x = emptyCell2[0]
                let y = emptyCell2[1]

                matrix[y][x] = 0
                if(this.imunitet == 0) {
                    matrix[this.y][this.x] = 0
                    for (let i in xotakerArr) {
                        if (this.x == xotakerArr[i].x && this.y == xotakerArr[i].y) {
                            xotakerArr.splice(i, 1)
                            break;
                        }
                    }
                } else { 
                    matrix[this.y][this.x] = 2
                }
                for (let i in tunxotArr) {
                    if (x == tunxotArr[i].x && y == tunxotArr[i].y) {
                        tunxotArr.splice(i, 1)
                        break;
                    }
                }
                } else if(emptyCell3) {
                    let x = emptyCell3[0]
                    let y = emptyCell3[1]
                    matrix[this.y][this.x] = 0
                    this.x = x
                    this.y = y
                    matrix[y][x] = 2
                }

            }

            if(this.energy <= 0){
                this.die()
            }

            if (this.energy >= 15) {
                this.mul()
            }
        }
    eat(){
        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }
    }
    
    die(){
        matrix[this.y][this.x] = 0
            for (var i in xotakerArr) {
                if (this.x == xotakerArr[i].x && this.y == xotakerArr[i].y) {
                    xotakerArr.splice(i, 1)
                    break;
                }
            }
    }

    mul(){
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newGrassEater = new Xotaker(newCell[0], newCell[1]);
            xotakerArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
            this.imunitet = 0
        }
    }

    mul2(){
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newGrassEater = new Xotaker(newCell[0], newCell[1]);
            xotakerArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            newGrassEater.energy = 10;
            newGrassEater.imunitet = 1
            this.energy = 10;
            this.imunitet = 1
        }
    }

}

class TunXot{
    constructor(x,y){
        this.x = x
        this.y = y 
        matrix[this.y][this.x] = 4
    }  
}

class Bonus {
    constructor(x,y){
        this.x = x
        this.y = y 
        matrix[this.y][this.x] = 5
    }
}