export class Tetromino {

    constructor() {
      this.orientation = 'u'
      this.matrix = []
      this.x = 3
      this.y = 1
    }
  
    rotate()
    {
      const n = this.matrix.length
  
      let newArray = Array(n).fill().map(()=> []);
      
  
      for(let y = 0; y < n;y++) {
          for(let x = 0; x < n; x++) {
            newArray[y][x] = this.matrix[n - x - 1][y];
          }
      }
  
      this.matrix = newArray
  
      newArray = []
      this.updateOrientation()
  
    }
    
  
    updateOrientation()
    {
      const orientationArray = ['u','r','d','l']
      const oldOrientation = this.orientation
      
      const newOrientIndex = (orientationArray.indexOf(oldOrientation)+1) % 4;
      this.orientation = orientationArray[newOrientIndex]
    }
  
    
    moveRight(){this.x += 1}
    moveLeft(){this.x -= 1}
    moveDown(){this.y += 1}
  
  
  
  
  }
  
  export class TetrominoL extends Tetromino
  {
    constructor() {
      super()
      this.colour = 'B'
      this.matrix = [
          ['B','E','E'],
          ['B','B','B'],
          ['E','E','E']
      ]
    }
  }
  
  export class TetrominoJ extends Tetromino
  {
    constructor() {
      super()
      this.colour = 'J'
      this.matrix = [
        ['E','E','O'],
        ['O','O','O'],
        ['E','E','E']
      ]
    }
  }
  
  export class TetrominoZ extends Tetromino
  {
    constructor() {
      super()
      this.colour = 'R'
      this.matrix = [
        ['R','R','E'],
        ['E','R','R'],
        ['E','E','E']
      ]
    }
  }
  
  export class TetrominoS extends Tetromino
  {
    constructor() {
      super()
      this.colour = 'G'
      this.matrix = [
        ['E','G','G'],
        ['G','G','E'],
        ['E','E','E']
      ]
    }
  }
  
  export class TetrominoI extends Tetromino
  {
    constructor() {
      super()
      this.colour = 'C'
      this.matrix = [
        ['E','E','E','E'],
        ['C','C','C','C'],
        ['E','E','E','E'],
        ['E','E','E','E']
      ]
    }
  }
  
  export class TetrominoO extends Tetromino
  {
    constructor() {
      super()
      this.colour = 'Y'
      this.matrix = [
        ['Y','Y'],
        ['Y','Y']
      ]
    }
  
    rotate()
    {
      // do nothing
    }
  }
  
  export class TetrominoT extends Tetromino
  {
    constructor() {
      super()
      this.colour = 'P'
      this.matrix = [
        ['P','P','P'],
        ['E','P','E'],
        ['E','E','E']
      ]
    }
    
  }
  
  