import {Cell} from "./cell.js"

const GRID_SIZE = 10
const CELLS_COUNT = GRID_SIZE*GRID_SIZE

export class Grid{
    constructor(gridElement){
        this.cells = []
        for (let i = 0; i < GRID_SIZE; i++) {
            let row = []
            for (let j = 0; j < GRID_SIZE; j++) {
                row.push(
                    new Cell(gridElement)
                )              
            }
            this.cells.push(row)
        }
        return this.cells
    }
}