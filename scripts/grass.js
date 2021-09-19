class Grass extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        matrix[this.y][this.x] = 1;
        this.multiply = 0;
    }

    mul(){
        this.multiply++

        let emptyCells = this.chooseCell2()
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