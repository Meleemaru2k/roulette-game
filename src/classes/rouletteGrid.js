import gridProp from "../classes/rouletteGridProp";

//TODO: Make Singleton
export default class grid {
  constructor() {
    this.numbersRed = this.setRedNumbers();
    this.grindPropTemplate = new gridProp("number", [1], "black");
    this.gridData = this.setupGrid();
  }
  get grid() {
    return this.gridData;
  }

  setupGrid() {
    var simpleGrid = this.createNumberGrid();
    var grid = this.extendNumberGrid(simpleGrid);
    //grid = this.transpose2D(grid);
    return grid;
  }

  extendNumberGrid(simpleGrid) {
    let complexGrid = [];
    for (let iRow = 0; iRow < simpleGrid.length; iRow++) {
      complexGrid[iRow] = [];
      for (let i = 0; i < simpleGrid[iRow].length; i++) {
        let num = simpleGrid[iRow][i];
        let color = this.numbersRed.includes(num) ? "red" : "black";

        let cornerNumbers = this.getCornerNumbers(i, simpleGrid, iRow);
        let splitNumbers = this.getSplitNumbers(i, simpleGrid, iRow);
        let streetNumbers = this.getStreetNumbers(simpleGrid, iRow);

        let top_left = new gridProp("corner", cornerNumbers, "none");
        let top = new gridProp("split", splitNumbers, "none");
        let cen_left = new gridProp("street", streetNumbers, "none");
        let cen = new gridProp("number", [num], color);

        //HACK: Orderered for visual presentation, should be done via Vue/Rendering
        let gridItem = [
          [top_left, cen_left],
          [top, cen],
        ];
        complexGrid[iRow].push(gridItem);
      }
    }
    console.log(complexGrid);
    return complexGrid;
  }

  getSplitNumbers(numIndex, simpleGrid, row) {
    let splitnumbers = [];
    splitnumbers.push(simpleGrid[row - 1] ? simpleGrid[row - 1][numIndex] : undefined);
    splitnumbers.push(simpleGrid[row][numIndex]);
    splitnumbers = splitnumbers.filter((x) => x != undefined);
    return splitnumbers;
  }

  getStreetNumbers(simpleGrid, row) {
    let streetNumbers = [];
    for (const num of simpleGrid[row]) {
      streetNumbers.push(num);
    }
    return streetNumbers;
  }

  getCornerNumbers(numIndex, simpleGrid, row) {
    //top left corner only
    let corners = [];
    //bot right, bot left, top left, top right
    let cornerValues = [];
    cornerValues.push(simpleGrid[row] ? simpleGrid[row][numIndex] : undefined);
    cornerValues.push(simpleGrid[row] ? simpleGrid[row][numIndex - 1] : undefined);
    cornerValues.push(simpleGrid[row - 1] ? simpleGrid[row - 1][numIndex - 1] : undefined);
    cornerValues.push(simpleGrid[row - 1] ? simpleGrid[row - 1][numIndex] : undefined);
    cornerValues = cornerValues.filter((x) => x != undefined);
    corners.push(cornerValues);
    return corners;

    //console.log(bot_r, bot_l, top_r, top_l);
  }

  createNumberGrid() {
    let numberMinMax = [0, 36];
    let incrementNumberInterval = 3;
    let grid = [];
    let columns = numberMinMax[1] / incrementNumberInterval;

    for (let iCol = 0; iCol < columns; iCol++) {
      grid[iCol] = [];
      let colNumStart = 1 + iCol * 3;
      let colNumEnd = colNumStart + 3;

      for (let iNum = colNumStart; iNum < colNumEnd; iNum++) {
        grid[iCol].push(iNum);
      }
    }

    return grid;
  }

  //https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
  transpose2D(matrix) {
    return matrix[0].map((col, i) => matrix.map((row) => row[i]));
  }

  setRedNumbers() {
    return [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
  }

  //Could be static
  isNumberRed(num) {
    if (this.numbersRed.includes(num)) {
      return true;
    } else {
      return false;
    }
  }
}
