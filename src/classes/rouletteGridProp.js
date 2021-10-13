export default class gridProp {
  //TODO: Winratio in gridProp?
  constructor(type, numbers, color) {
    //Types:
    //number
    //even, odd
    //halfs
    //third
    //Columns
    //Street
    //Doublestreet
    //Split
    //Corner
    //None
    this.type = type;
    this.numbers = numbers;
    this.color = color; //red green white none
  }

  checkType() {
    let possibleTypes = [
      "number",
      "even",
      "odd",
      "half_a",
      "half_b",
      "third_a",
      "third_b",
      "third_c",
      "col_a",
      "col_b",
      "col_c",
      "street",
      "doubleStreet",
      "split",
      "corner",
      "none",
    ];

    if (!possibleTypes.includes(this.type)) {
      //throw console.error("ok");
    }
  }

  isNumberIn(num) {
    if (this.numbers.includes(num)) {
      return true;
    } else {
      return false;
    }
  }
  compareNumbers(prop) {
    for (const num of prop.numbers) {
      let isIn = this.numbers.includes(num);
      if (isIn) {
        return true;
      }
    }
    return false;
  }

  isEven() {
    if (this.type != "number") {
      return undefined;
    } else {
      return this.numbers[0] % 2 === 0 ? 0 : -1;
    }
  }
}
