<template>
  <div class="row mx-auto">
    <!--Number Buttons-->
    <div class="col-12">
      <label for="amountBet" class="form-label text-light"
        >Your bet: <br />{{ amountBet }} $</label
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
                @click="chooseBet(val)"
              >
                {{ val.numbers[0] }}
              </button>
              <button
                v-else-if="val.type == 'corner'"
                class="btn btn-secondary numBtn mx-auto my-1"
                :title="val.numbers"
                @click="chooseBet(val)"
              >
                C
              </button>
              <button
                v-else-if="val.type == 'split'"
                class="btn btn-secondary numBtn mx-auto my-1"
                :title="val.numbers"
                @click="chooseBet(val)"
              >
                S
              </button>
              <button
                v-else-if="val.type == 'street'"
                class="btn btn-secondary numBtn mx-auto my-1"
                :title="val.numbers"
                @click="chooseBet(val)"
              >
                R
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mt-3 mx-auto row">
        <div class="col-12">
          <button class="btn btn-light colorBtn m-3">1-12</button>
          <button class="btn btn-light colorBtn m-3">12-24</button>
          <button class="btn btn-light colorBtn m-3">24-36</button>
        </div>
        <div class="col-12">
          <button class="btn btn-danger colorBtn m-3">RED</button>
          <button class="btn btn-dark colorBtn m-3">BLACK</button>
          <button class="btn btn-light colorBtn m-3">Even</button>
          <button class="btn btn-light colorBtn m-3">Odd</button>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import grid from "../classes/rouletteGrid";
//import gridProp from "../classes/rouletteGridProp"
import { toRaw } from "vue";
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
      betData: null,
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
    chooseBet(gridProp) {
      this.betData = toRaw(gridProp);
    },
  },
  computed: {},
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
