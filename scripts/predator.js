class Predator extends LivingCreature{
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 30
        this.amenaker = 0
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