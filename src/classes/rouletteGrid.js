import gridProp from "../classes/rouletteGridProp";

//TODO: Make Singleton
export default class grid {
  constructor() {
    this.grindPropTemplate = new gridProp("number", [1], "black");
    this.simpleGrid;
    this.subsets = {
      oddEven: [],
      columns: [],
      thirds: [],
      halfs: [],
      streets: [],
      doubleStreets: [],
      redBlack: [],
    };
    //TODO: Use this in PlayerControls
    this.subsetProps = {
      oddEven: [],
      columns: [],
      thirds: [],
      halfs: [],
      doubleStreet: [],
      redBlack: [],
    };
    this.gridData = this.setupGrid();
  }

  get grid() {
    return this.gridData;
  }

  //Create a simple grid, extract subsets, create an advanced Roulette-Type-Grid
  setupGrid() {
    this.simpleGrid = this.createNumberGrid();
    console.log("simpleGrid");
    console.log(this.simpleGrid);
    this.subsets.redBlack = this.getRedAndBlackNumbers();
    this.subsets.oddEven = this.getOddEvenNumbers();
    this.subsets.columns = this.getColumnNumbers();
    this.subsets.thirds = this.getThirdsNumbers();
    this.subsets.halfs = this.getHalfsNumbers();

    var grid = this.extendNumberGrid(this.simpleGrid);
    //grid = this.transpose2D(grid);
    return grid;
  }

  extendNumberGrid(simpleGrid) {
    let complexGrid = [];
    for (let iRow = 0; iRow < simpleGrid.length; iRow++) {
      complexGrid[iRow] = [];
      for (let i = 0; i < simpleGrid[iRow].length; i++) {
        let num = simpleGrid[iRow][i];
        let color = this.subsets.redBlack[0].includes(num) ? "red" : "black";

        let streetNumbers = this.getStreetNumbers(simpleGrid, iRow);
        let splitNumbersVertical = this.getVerticalSplitNumbers(i, simpleGrid, iRow);

        //TODO: Implement horizontal Splits and DoubleStreet Corners
        //If i = 0 or i = 2 respectively...exception: for dStreet iRow = 0

        let cen = new gridProp("number", [num], color);
        let top = new gridProp("split", splitNumbersVertical, "none");

        let top_left;
        if (iRow > 0 && i == 0) {
          let doubleStreetNumbers = this.getDoubleStreetNumbers(simpleGrid, iRow);
          top_left = new gridProp("doubleStreet", doubleStreetNumbers, "none");
        } else {
          let cornerNumbers = this.getCornerNumbers(i, simpleGrid, iRow);
          top_left = new gridProp("corner", cornerNumbers, "none");
        }

        let cen_left; //If first row index => Street ; else horizontal split
        if (i != 0) {
          let splitNumbersHorizontal = this.getHorizontalSplitNumbers(i, simpleGrid, iRow);
          cen_left = new gridProp("split", splitNumbersHorizontal, "none");
        } else {
          cen_left = new gridProp("street", streetNumbers, "none");
        }

        //HACK: Orderered for visual representation, should be done via Vue/Rendering
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

  getVerticalSplitNumbers(numIndex, simpleGrid, row) {
    let splitnumbers = [];
    splitnumbers.push(simpleGrid[row - 1] ? simpleGrid[row - 1][numIndex] : undefined);
    splitnumbers.push(simpleGrid[row][numIndex]);
    splitnumbers = splitnumbers.filter((x) => x != undefined);
    return splitnumbers;
  }

  getHorizontalSplitNumbers(numIndex, simpleGrid, row) {
    let splitnumbers = [];
    splitnumbers.push(simpleGrid[row][numIndex - 1]);
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

  getDoubleStreetNumbers(simpleGrid, row) {
    let streetNumbers = [];
    for (const num of simpleGrid[row]) {
      streetNumbers.push(num);
    }
    for (const num of simpleGrid[row - 1]) {
      streetNumbers.push(num);
    }
    return streetNumbers;
  }

  getCornerNumbers(numIndex, simpleGrid, row) {
    //top left corner only
    let corners = [];
    //bot right, bot left, top left, top right numbers
    let cornerValues = [];

    cornerValues.push(simpleGrid[row] ? simpleGrid[row][numIndex] : undefined);
    cornerValues.push(simpleGrid[row] ? simpleGrid[row][numIndex - 1] : undefined);
    cornerValues.push(simpleGrid[row - 1] ? simpleGrid[row - 1][numIndex - 1] : undefined);
    cornerValues.push(simpleGrid[row - 1] ? simpleGrid[row - 1][numIndex] : undefined);

    cornerValues = cornerValues.filter((x) => x != undefined);
    corners.push(cornerValues);

    return cornerValues;
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

  //TODO: Sort methods into property "getSubsets.method()" for more clarity
  getRedAndBlackNumbers() {
    let red = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
    let black = this.simpleGrid.flat().filter((x) => !red.includes(x));
    return [red, black];
  }

  getOddEvenNumbers() {
    let odd = this.simpleGrid.flat().filter((x) => x % 2 != 0);
    let even = this.simpleGrid.flat().filter((x) => x % 2 == 0);
    return [odd, even];
  }

  getColumnNumbers() {
    let columnData = [[], [], []];
    //let flatGrid = this.simpleGrid.flat();
    for (let iCol = 0; iCol < 3; iCol++) {
      for (let i = 0; i < 12; i++) {
        columnData[iCol].push(this.simpleGrid[i][iCol]);
      }
    }
    console.log(columnData, "coldata");
    return columnData;
  }

  getThirdsNumbers() {
    let t1 = Array.from(new Array(12), (x, i) => i + 1);
    let t2 = Array.from(new Array(12), (x, i) => i + 13);
    let t3 = Array.from(new Array(12), (x, i) => i + 25);

    return [t1, t2, t3];
  }

  getHalfsNumbers() {
    let h1 = Array.from(new Array(18), (x, i) => i + 1);
    let h2 = Array.from(new Array(18), (x, i) => i + 19);

    return [h1, h2];
  }
  //Could be static
  isNumberRed(num) {
    if (this.subsets.redBlack[0].includes(num)) {
      return true;
    } else {
      return false;
    }
  }
}
