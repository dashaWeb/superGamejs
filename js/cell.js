export class Cell{
    constructor(gridElement){
        const cell = document.createElement('div')
        cell.classList.add('cell')
        gridElement.append(cell);
        return cell
    }
}