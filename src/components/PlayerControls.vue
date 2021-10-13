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
      <button class="btn btn-success m-3">GO!</button>
    </div>
    <div class="col-12 col-sm-12 col-lg-12">
      <button class="btn btn-success numZeroBtn mx-auto mb-3">0</button>
      <div
        v-for="(row, index) in gridData"
        :key="index"
        class="col-12 my-2 mx-auto row"
        style="width: 350px"
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
              >
                {{ val.numbers[0] }}
              </button>
              <button
                v-else-if="val.type == 'corner'"
                class="btn btn-secondary numBtn mx-auto my-1"
                :title="val.numbers"
                @click="betOn(val)"
              >
                C
              </button>
              <button
                v-else-if="val.type == 'split'"
                class="btn btn-secondary numBtn mx-auto my-1"
                :title="val.numbers"
                @click="betOn(val)"
              >
                S
              </button>
              <button
                v-else-if="val.type == 'street'"
                class="btn btn-secondary numBtn mx-auto my-1"
                :title="val.numbers"
                @click="betOn(val)"
              >
                R
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mt-3 mx-auto row">
        <div class="col-12">
          <button class="btn btn-light colorBtn m-3" @click="betOnOtt(0)">
            1-12
          </button>
          <button class="btn btn-light colorBtn m-3" @click="betOnOtt(1)">
            12-24
          </button>
          <button class="btn btn-light colorBtn m-3" @click="betOnOtt(2)">
            24-36
          </button>
        </div>
        <div class="col-12">
          <button
            class="btn btn-danger colorBtn m-3"
            @click="betOnColor('red')"
          >
            RED
          </button>
          <button
            class="btn btn-dark colorBtn m-3"
            @click="betOnColor('black')"
          >
            BLACK
          </button>
          <button
            class="btn btn-light colorBtn m-3"
            @click="betOnOddEven('even')"
          >
            Even
          </button>
          <button
            class="btn btn-light colorBtn m-3"
            @click="betOnOddEven('odd')"
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
    };
  },
  mounted() {
    console.log(this.numberGrid, "ok");
  },
  methods: {
    getColor(gridProp) {
      if (gridProp.type == "number") {
        if (this.numberGrid.isNumberRed(gridProp.numbers[0])) {
          return true;
        } else {
          return false;
        }
      } else return false;
    },
    betOn(gridProp) {
      this.betData = gridProp;
    },
    betOnZero() {
      this.betData = new gridProp("number", [0], "green");
    },
    betOnColor(color) {
      this.betData = new gridProp("color", [], color);
    },
  },
  computed: {
    currentBet() {
      if (this.betData?.type == "number") {
        return this.betData.numbers;
      } else if (this.betData?.type == "color") {
        return this.betData.color;
      } else {
        return "...";
      }
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
  padding: 3px;
  margin: 0px;
}
.numZeroBtn {
  width: 140px;
}
.colorBtn {
  width: 80px;
}
</style>
