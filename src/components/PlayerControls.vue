<template>
  <div class="row mx-auto">
    <!--Number Buttons-->
    <div class="col-12">
      <label for="amountBet" class="form-label text-light"
        >Your bet: <br />{{ amountBet }} $ on {{ currentBet }}</label
      >
      <input
        v-model="amountBet"
        type="range"
        class="form-range"
        id="amountBet"
        min="0"
        :max="playerMoney"
      />
    </div>
    <div class="col-12">
      <button
        class="btn btn-success m-3"
        @click="roundStart()"
        :disabled="isRolling"
      >
        GO!
      </button>
    </div>
    <div class="col-12 col-sm-12 col-lg-12">
      <button
        class="btn btn-success numZeroBtn mx-auto mb-3"
        @click="betOnZero()"
        :disabled="isRolling"
      >
        0
      </button>
      <div
        v-for="(row, index) in gridData"
        :key="index"
        class="col-12 my-1 mx-auto row g-0"
        style="width: 250px"
      >
        <div v-for="(gridProp, index) in row" :key="index" class="col-4 d-flex">
          <div
            v-for="(gridItem, index) in gridProp"
            :key="index"
            class="col-6 mx-auto"
          >
            <div v-for="(val, index) in gridItem" :key="index" class="mx-auto">
              <button
                v-if="val.type == 'number'"
                class="btn numBtn mx-auto my-1"
                :class="[getColor(val) ? 'btn-danger' : 'btn-dark']"
                :title="val.numbers"
                @click="betOn(val)"
                :disabled="isRolling"
              >
                {{ val.numbers[0] }}
              </button>
              <button
                v-else-if="val.type == 'corner'"
                class="btn btn-secondary numBtn mx-auto my-1"
                :title="val.numbers"
                @click="betOn(val)"
                :disabled="isRolling"
              >
                C
              </button>
              <button
                v-else-if="val.type == 'split'"
                class="btn btn-secondary numBtn mx-auto my-1"
                :title="val.numbers"
                @click="betOn(val)"
                :disabled="isRolling"
              >
                S
              </button>
              <button
                v-else-if="val.type == 'street'"
                class="btn btn-secondary numBtn mx-auto my-1"
                :title="val.numbers"
                @click="betOn(val)"
                :disabled="isRolling"
              >
                R
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mt-3 mx-auto row">
        <div class="col-12">
          <button
            class="btn btn-light colorBtn m-3"
            @click="betOnCol(0)"
            :disabled="isRolling"
          >
            Column 1
          </button>
          <button
            class="btn btn-light colorBtn m-3"
            @click="betOnCol(1)"
            :disabled="isRolling"
          >
            Column 2
          </button>
          <button
            class="btn btn-light colorBtn m-3"
            @click="betOnCol(2)"
            :disabled="isRolling"
          >
            Column 3
          </button>
        </div>
        <div class="col-12">
          <button
            class="btn btn-light colorBtn m-3"
            @click="betOnThird(0)"
            :disabled="isRolling"
          >
            1-12
          </button>
          <button
            class="btn btn-light colorBtn m-3"
            @click="betOnThird(1)"
            :disabled="isRolling"
          >
            12-24
          </button>
          <button
            class="btn btn-light colorBtn m-3"
            @click="betOnThird(2)"
            :disabled="isRolling"
          >
            24-36
          </button>
        </div>
        <div class="col-12">
          <button
            class="btn btn-danger colorBtn m-3"
            @click="betOnColor('red')"
            :disabled="isRolling"
          >
            RED
          </button>
          <button
            class="btn btn-dark colorBtn m-3"
            @click="betOnColor('black')"
            :disabled="isRolling"
          >
            BLACK
          </button>
          <button
            class="btn btn-light colorBtn m-3"
            @click="betOnOddEven('even')"
            :disabled="isRolling"
          >
            Even
          </button>
          <button
            class="btn btn-light colorBtn m-3"
            @click="betOnOddEven('odd')"
            :disabled="isRolling"
          >
            Odd
          </button>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import grid from "../classes/rouletteGrid";
//import gridProp from "../classes/rouletteGridProp"
//import { toRaw } from "vue";
import gridProp from "../classes/rouletteGridProp";
import EventBus from "../eventBus";
export default {
  name: "PlayerControls",
  props: {
    msg: String,
    numberGrid: Object,
    playerMoney: { type: Number, default: 999 },
  },
  data() {
    return {
      amountBet: 0,
      betData: new gridProp("number", [1], "red"),
      gridData: this.numberGrid.grid,
      isRolling: false,
    };
  },
  mounted() {
    EventBus.on("rollFinished", () => {
      this.amountBet = 0;
      this.betData = new gridProp("number", [1], "red");
      this.isRolling = false;
    });
    console.log(this.numberGrid, "ok");
  },
  methods: {
    roundStart() {
      this.isRolling = true;
      EventBus.emit("roundStart", {
        betData: this.betData,
        amountBet: this.amountBet,
      });
    },
    getColor(gridProp) {
      if (gridProp.type == "number") {
        if (this.numberGrid.isNumberRed(gridProp.numbers[0])) {
          return true;
        } else {
          return false;
        }
      } else return false;
    },
    //TODO: Make Subset-Props
    betOn(gridProp) {
      this.betData = gridProp;
    },
    betOnZero() {
      this.betData = new gridProp("number", [0], "green");
    },
    betOnColor(color) {
      if (color == "red") {
        let nums = this.numberGrid.subsets.redBlack[0];
        this.betData = new gridProp("color", nums, color);
      } else {
        let nums = this.numberGrid.subsets.redBlack[1];
        this.betData = new gridProp("color", nums, color);
      }
    },
    betOnOddEven(type) {
      if (type == "odd") {
        let nums = this.numberGrid.subsets.oddEven[0];
        this.betData = new gridProp("odd", nums, "none");
      } else {
        let nums = this.numberGrid.subsets.oddEven[1];
        this.betData = new gridProp("even", nums, "none");
      }
    },
    betOnThird(num) {
      if (num == 0) {
        let nums = this.numberGrid.subsets.thirds[0];
        this.betData = new gridProp("third_a", nums, "none");
      } else if (num == 1) {
        let nums = this.numberGrid.subsets.thirds[1];
        this.betData = new gridProp("third_b", nums, "none");
      } else {
        let nums = this.numberGrid.subsets.thirds[2];
        this.betData = new gridProp("third_c", nums, "none");
      }
    },
    betOnCol(num) {
      if (num == 0) {
        let nums = this.numberGrid.subsets.columns[0];
        this.betData = new gridProp("col_a", nums, "none");
      } else if (num == 1) {
        let nums = this.numberGrid.subsets.columns[1];
        this.betData = new gridProp("col_b", nums, "none");
      } else {
        let nums = this.numberGrid.subsets.columns[2];
        this.betData = new gridProp("col_c", nums, "none");
      }
    },
    betOnHalf(num) {
      if (num == 0) {
        let nums = this.numberGrid.subsets.halfs[0];
        this.betData = new gridProp("half_a", nums, "none");
      } else {
        let nums = this.numberGrid.subsets.halfs[1];
        this.betData = new gridProp("half_b", nums, "none");
      }
    },
  },
  computed: {
    currentBet() {
      var betType = this.betData?.type;
      var result;
      switch (betType) {
        case "number":
          result = this.betData.numbers;
          break;
        case "corner":
          result = this.betData.numbers;
          break;
        case "split":
          result = this.betData.numbers;
          break;
        case "street":
          result = this.betData.numbers;
          break;
        case "doubleStreet":
          result = this.betData.numbers;
          break;
        case "color":
          result = this.betData.color;
          break;
        case "odd":
          result = this.betData.type;
          break;
        case "even":
          result = this.betData.type;
          break;
        case "half_a":
          result = this.betData.numbers;
          break;
        case "half_b":
          result = this.betData.numbers;
          break;
        case "third_a":
          result = this.betData.numbers;
          break;
        case "third_b":
          result = this.betData.numbers;
          break;
        case "third_c":
          result = this.betData.numbers;
          break;
        case "col_a":
          result = this.betData.numbers;
          break;
        case "col_b":
          result = this.betData.numbers;
          break;
        case "col_c":
          result = this.betData.numbers;
          break;
        default:
          result = "...";
          break;
      }

      return result;
    },
  },
};
</script>

<style scoped lang="scss">
.numBtn {
  //min-width: 50px;
  width: 25px;
  height: 25px;
  font-size: 15px;
  text-align: center;
  padding: 2px;
  margin: 0px;
}
.numZeroBtn {
  width: 140px;
}
.colorBtn {
  width: 80px;
}
</style>
