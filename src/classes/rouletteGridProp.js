export default class gridProp {
  constructor(type, numbers, color) {
    //Types:
    //number
    //even, odd
    //OneToEighteen ote_a, ote_b
    //OneToTwelve ott_a, ott_b, ott_c
    //Column col_a, col_b, col_c
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

  isEven() {
    if (this.type != "number") {
      return undefined;
    } else {
      return this.numbers[0] % 2 === 0 ? 0 : -1;
    }
  }
}
