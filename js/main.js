import { Grid } from "./grid.js"
const GRID_SIZE = 10
const gameBoard = document.getElementById('game-board')



class Game {
    constructor(gridElement) {
        this.board = new Grid(gridElement)
        this.board_value = this.fillHelperElement(0)
        this.flags = this.fillHelperElement(false)
        this.placeMine(10)
        this.startGame()

    }
    startGame() {
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                this.board[i][j].addEventListener('click', () => {
                    this.reveal(i, j)
                    this.printBoard()

                })
                this.board[i][j].addEventListener('contextmenu', (e) => {
                    e.preventDefault()
                    if (this.board[i][j].innerHTML == `<i class="fa-solid fa-flag" style="color: #e31616;"></i>`) {
                        this.board[i][j].innerHTML = ``
                    }
                    else {
                        this.board[i][j].innerHTML = `<i class="fa-solid fa-flag" style="color: #e31616;"></i>`
                    }
                })
            }

        }
    }
    fillHelperElement(value) {
        let arr = []
        for (let i = 0; i < GRID_SIZE; i++) {
            let row = []
            for (let j = 0; j < GRID_SIZE; j++) {
                row.push(
                    value
                )
            }
            arr.push(row)
        }
        return arr
    }
    placeMine(number) {
        let counter = 0
        while (counter < number) {
            let x = parseInt(Math.random() * GRID_SIZE)
            let y = parseInt(Math.random() * GRID_SIZE)
            if (this.board_value[x][y] != -1) {
                this.board_value[x][y] = -1
                counter++
            }
        }
    }
    reveal(x, y) {
        if (this.board_value[x][y] == -1) {
            this.flags[x][y] = true
            // this.board_value[x][y] = -1
            // for (let i = 0; i < GRID_SIZE; i++) {
            //     for (let j = 0; j < GRID_SIZE; j++) {
            //         if (this.board_value[i][j] && i != x && j != y) {

            //             setTimeout(() => {
            //                 this.board[i][j].textContent = '-1'
            //             }, 2000);
            //         }
            //     }

            // }
            // return false
        }
        else if (this.flags[x][y] != true) {
            let mines = this.countMines(x, y)
            this.board_value[x][y] = mines
            this.flags[x][y] = true
            if (mines == 0) {
                if (x > 0) {
                    this.reveal(x - 1, y)
                }
                if (x < GRID_SIZE - 1) {
                    this.reveal(x + 1, y)
                }
                if (y > 0) {
                    this.reveal(x, y - 1)
                }
                if (y < GRID_SIZE - 1) {
                    this.reveal(x, y + 1)
                }
                if (x > 0 && y > 0) {
                    this.reveal(x - 1, y - 1)
                }
                if (x > 0 && y < GRID_SIZE - 1) {
                    this.reveal(x - 1, y + 1)
                }
                if (x < GRID_SIZE - 1 && y > 0) {
                    this.reveal(x + 1, y - 1)
                }
                if (x < GRID_SIZE - 1 && y < GRID_SIZE - 1) {
                    this.reveal(x + 1, y + 1)
                }
            }
            return true
        }
    }
    countMines(x, y) {
        let count = 0
        if (x > 0 && this.board_value[x - 1][y] == -1) {
            count++
        }
        if (x < GRID_SIZE - 1 && this.board_value[x + 1][y] == -1) {
            count++
        }
        if (y > 0 && this.board_value[x][y - 1] == -1) {
            count++
        }
        if (y < GRID_SIZE - 1 && this.board_value[x][y + 1] == -1) {
            count++
        }
        if (x > 0 && y > 0 && this.board_value[x - 1][y - 1] == -1) {
            count++
        }
        if (x < GRID_SIZE - 1 && y > 0 && this.board_value[x + 1][y - 1] == -1) {
            count++
        }
        if (x > 0 && y < GRID_SIZE - 1 && this.board_value[x - 1][y + 1] == -1) {
            count++
        }
        if (x < GRID_SIZE - 1 && y < GRID_SIZE - 1 && this.board_value[x + 1][y + 1] == -1) {
            count++
        }

        return count
    }
    printBoard() {
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (this.flags[i][j]) {
                    this.board[i][j].classList.add('style')
                    if (this.board_value[i][j] == -1) {
                        this.board[i][j].textContent = '*'
                    }
                    else if (this.board_value[i][j] == 1) {
                        this.board[i][j].textContent = '1'
                        this.board[i][j].style.color = 'blue'
                    }
                    else if (this.board_value[i][j] == 2) {
                        this.board[i][j].textContent = '2'
                        this.board[i][j].style.color = 'green'

                    }
                    else if (this.board_value[i][j] == 3) {
                        this.board[i][j].textContent = '3'
                        this.board[i][j].style.color = 'red'

                    }
                    else if (this.board_value[i][j] == 4) {
                        this.board[i][j].textContent = '4'
                        this.board[i][j].style.color = 'darkblue'

                    }
                    else if (this.board_value[i][j] == 5) {
                        this.board[i][j].textContent = 'brown'
                    }
                }
            }
        }
    }
}

let game = new Game(gameBoard)