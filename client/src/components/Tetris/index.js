import {Tetromino, TetrominoL, TetrominoJ, TetrominoZ, TetrominoS, TetrominoI, TetrominoO, TetrominoT} from 'Tetrominos'

const KEY     = { ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 }
const coloursMap = {
  'E':'white',
  'B':'#8CA4D4',
  'O':'#FDCDA7',
  'P':'#C2A1DA',
  'R':'#EF8B8B',
  'Y':'#FAF1A2',
  'C':'#D6E9F8',
  'G':'#C5D9A6'
};

export default class Tetris {

  constructor(canvas) {
    this.canvas = canvas
    this.rows = 20
    this.columns = 10

    this.canvas.height = window.innerHeight
    this.canvas.width = (window.innerHeight)/2
    this.scaleFactor = (this.canvas.height/this.rows)

    this.ctx = canvas.getContext("2d")

    this.speed = 3
    this.score = 0

    this.gameBoard = []; //make 10*20 game board
    this.currentTet = {}

    this.resetGameBoard()

    document.addEventListener('keydown', (ev) => this.keyDown(ev), false);
    window.addEventListener('resize', (ev) => this.resizeCanvas(ev), false);

  }

  resetGameBoard()
  {
    this.gameBoard = []
    for (let i = 0; i < this.rows; i++)
    {
      const rowsTemp = Array(this.columns).fill('E')
      this.gameBoard.push(rowsTemp)
    }
    this.score = 0
    this.renderGameBoard()
  }

  resizeCanvas(ev)
  {
    this.canvas.height = window.innerHeight
    this.canvas.width = (window.innerHeight)/2
    this.scaleFactor = (this.canvas.height/this.rows)
    this.renderGameBoard()
  }


  drawRect(x,y, colour) {
    const scaledX = x * this.scaleFactor
    const scaledY = y * this.scaleFactor
    this.ctx.fillStyle = colour;
    this.ctx.fillRect(scaledX,scaledY, this.scaleFactor, this.scaleFactor);

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth   = 0.5;
    this.ctx.strokeRect(scaledX,scaledY, this.scaleFactor, this.scaleFactor);
  }

  drawScore()
  {
    this.ctx.font = `${this.scaleFactor*0.8}px Karla`
    this.ctx.fillStyle = '#aaaaaa';
    this.ctx.textAlign = 'right'
    this.ctx.fillText(this.score, (this.scaleFactor*9.3), (this.scaleFactor*1.3))

  }

  renderGameBoard()
  {
    for (let y = 0; y < this.rows; y++)
    {
      for (let x = 0; x < this.columns; x++)
      {
        const colourOfBlock = coloursMap[this.gameBoard[y][x]]
        this.drawRect(x, y, colourOfBlock)
      }
    }
    this.drawScore()
  }


  redrawPiece()
  {
    this.insertTetromino()
    this.renderGameBoard()
  }

  validMove(piece)
  {
    const n = piece.matrix.length
    for (let y = 0;y < n;y++)
    {
      for (let x = 0; x < n; x++)
      {
        const boardXOffset = piece.x + x
        const boardYOffset = piece.y + y

        if (piece.matrix[y][x] !== 'E') {

          //try to get gameboard at board offsets, if exception, then piece is out of bounds
          try {
            const bounds = this.gameBoard[boardYOffset][boardXOffset]

            if ((bounds !== 'E') || (boardXOffset === this.columns)) {
              throw new Error('hit something')
            }


          } catch (e) {
            return false
          }
        }

      }
    }

    return  true
  }


  clearTetromino()
  {
    const n = this.currentTet.matrix.length
    for (let y = 0;y < n;y++)
    {
      for (let x = 0; x < n; x++)
      {
        const boardXOffset = this.currentTet.x + x
        const boardYOffset = this.currentTet.y + y
        if (this.currentTet.matrix[y][x] !== 'E') this.gameBoard[boardYOffset][boardXOffset] = 'E'
      }
    }
  }

  insertTetromino()
  {
    const n = this.currentTet.matrix.length
    for (let y = 0; y < n; y++)
    {
      for (let x = 0; x < n; x++)
      {
        const boardXOffset = this.currentTet.x + x
        const boardYOffset = this.currentTet.y + y
        if (this.currentTet.matrix[y][x] !== 'E') this.gameBoard[boardYOffset][boardXOffset] = this.currentTet.matrix[y][x] //inital check will make sure not out of bounds

      }
    }
  }



  handleRotation()
  {
    this.clearTetromino();

    let copyPiece = new Tetromino()
    copyPiece.x = this.currentTet.x
    copyPiece.y = this.currentTet.y
    copyPiece.matrix = this.currentTet.matrix
    copyPiece.orientation = this.currentTet.orientation

    copyPiece.rotate()

    if ((this.validMove(copyPiece)) && (this.bottomEmpty(copyPiece))){
      this.currentTet.rotate()
    }

    this.redrawPiece()

  }


  bottomEmpty(piece)
  {
    const n = piece.matrix.length

    for (let y = 0;y < n;y++)
    {
      for (let x = 0; x < n; x++)
      {
        const boardXOffset = piece.x + x;
        const boardYOffsetBelow = piece.y + y + 1;


        if (piece.matrix[y][x] !== 'E')
        {

          //try to get gameboard at board offsets, if exception, then piece is out of bounds
          try {
            const bounds = this.gameBoard[boardYOffsetBelow][boardXOffset]
            if (bounds !== 'E') return false

          } catch (e) {
            return false
          }
        }
      }
    }

    return true

  }

  checkRows()
  {
      let gameBoardCopy = this.gameBoard

      for (let row = this.rows-1 ; row >= 0;row--)
      {
        let filteredRow = (gameBoardCopy[row]).filter((val) => {return val === 'E'})

        if (filteredRow.length === 0)
        {
          this.gameBoard.splice(row, 1)
          const rowsTemp = Array(this.columns).fill('E')
          this.gameBoard.unshift(rowsTemp)
          this.score += 100
          row++
        }
      }

    this.renderGameBoard()
  }

  spawnTetromino()
  {
    this.checkRows()
    this.score += 10

    const tetrominos = [new TetrominoI(), new TetrominoJ(), new TetrominoL(), new TetrominoS(), new TetrominoZ(), new TetrominoO(), new TetrominoT()]

    let newTet = tetrominos[Math.floor(Math.random()*tetrominos.length)];
    if (!this.validMove(newTet)) {
      this.resetGameBoard()
    }

    this.currentTet = newTet

    this.insertTetromino()
  }

  makeMove(direction)
  {
    this.clearTetromino()
    let copyPiece = new Tetromino()
    copyPiece.x = this.currentTet.x
    copyPiece.y = this.currentTet.y
    copyPiece.matrix = this.currentTet.matrix

    switch(direction) {
      case KEY.DOWN:
        copyPiece.moveDown()

        if (this.validMove(copyPiece))
        {
          this.currentTet.moveDown()
        }

        break;
      case KEY.RIGHT:
        copyPiece.moveRight()
        if (this.validMove(copyPiece))
        {
          this.currentTet.moveRight()
        }
        break;
      case KEY.LEFT:
        copyPiece.moveLeft()
        if (this.validMove(copyPiece))
        {
          this.currentTet.moveLeft()
        }
        break;
    }

    if (!this.bottomEmpty(this.currentTet))
    {
      this.insertTetromino()
      this.spawnTetromino()
    }
    else
    {
      this.redrawPiece()
    }

  }




  keyDown(ev) {
      switch(ev.keyCode) {
        case KEY.UP:
          this.handleRotation();
          break;
        case KEY.DOWN:
          this.makeMove(KEY.DOWN);
          break;
        case KEY.RIGHT:
          this.makeMove(KEY.RIGHT);
          break;
        case KEY.LEFT:
          this.makeMove(KEY.LEFT);
          break;
      }
  }

  run()
  {
    this.currentTet = new TetrominoL()

    this.insertTetromino()


    this.renderGameBoard()
    window.animateLoop = () => {


      setTimeout(() => {
        requestAnimationFrame(animateLoop);

        this.makeMove(KEY.DOWN)
        this.renderGameBoard()


      }, 1000 / this.speed);
    }

    animateLoop()
  }

}



