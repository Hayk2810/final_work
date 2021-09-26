let LivingCreature = require('./LivingCreature')

module.exports = class GrassEater extends LivingCreature{
    constructor(x,y, index){
        super(x, y, index);
        this.energy = 10
        this.imunitet = 0
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
            let newCell = this.chooseCell(5)
            let newCell2 = this.chooseCell(4)
            let newCell3 = this.chooseCell(0)
            let emptyCell = newCell[Math.floor(Math.random() * newCell.length)]
            let emptyCell2 = newCell2[Math.floor(Math.random() * newCell2.length)]
            let emptyCell3 = newCell3[Math.floor(Math.random() * newCell3.length)]
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
            } else if (emptyCell2) {
                let x = emptyCell2[0]
                let y = emptyCell2[1]

                matrix[y][x] = 0
                if(this.imunitet == 0) {
                    matrix[this.y][this.x] = 0
                    for (let i in grassEaterArr) {
                        if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                            grassEaterArr.splice(i, 1)
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
        var emptyCells = this.chooseCell(1);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

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
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }
    }

    mul(){
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1]);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
            this.imunitet = 0
        }
    }

    mul2(){
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1]);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            newGrassEater.energy = 10;
            newGrassEater.imunitet = 1
            this.energy = 10;
            this.imunitet = 1
        }
    }

}