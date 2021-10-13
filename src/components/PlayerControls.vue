<template>
  <div class="row">
    <!--Number Buttons-->
    <div class="col-12 col-sm-12 col-lg-12">
      <button class="btn btn-success numZeroBtn mx-auto mb-3">0</button>
      <div
        v-for="(row, index) in gridData"
        :key="index"
        class="col-12 my-2 mx-1 row"
        style="width: 350px"
      >
        <div v-for="(gridProp, index) in row" :key="index" class="col-4 row">
          <div v-for="(gridItem, index) in gridProp" :key="index" class="col-4">
            <div v-for="(val, index) in gridItem" :key="index" class="">
              <button
                v-if="val.type == 'number'"
                class="btn numBtn me-2 my-1"
                :class="[getColor(val) ? 'btn-danger' : 'btn-dark']"
              >
                {{ val.numbers[0] }}
              </button>
              <button
                v-else-if="val.type == 'corner'"
                class="btn btn-secondary numBtn me-2 my-1"
              >
                C
              </button>
              <button
                v-else-if="val.type == 'split'"
                class="btn btn-secondary numBtn me-2 my-1"
              >
                I
              </button>
              <button
                v-else-if="val.type == 'street'"
                class="btn btn-secondary numBtn me-2 my-1"
              >
                S
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mt-3 mx-1">
        <button class="btn btn-light colorBtn m-3">1-12</button>
        <button class="btn btn-light colorBtn m-3">12-24</button>
        <button class="btn btn-light colorBtn m-3">24-36</button>
      </div>
    </div>
    <!--Color/Special Buttons-->
    <div class="col-12 col-sm-12 col-lg-12">
      <div class="col">
        <button class="btn btn-danger colorBtn m-3">RED</button>
        <button class="btn btn-dark colorBtn m-3">BLACK</button>
        <button class="btn btn-light colorBtn m-3">Even</button>
        <button class="btn btn-light colorBtn m-3">Odd</button>
        <hr />
      </div>
    </div>
    <div class="col-12">
      <label for="amountBet" class="form-label text-light"
        >Your bet: <br />{{ amountBet }}</label
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
  </div>
</template>

<script>
//import grid from "../classes/rouletteGrid";
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
      gridData: this.numberGrid.grid,
    };
  },
  mounted() {
    console.log(this.numberGrid, "ok");
  },
  methods: {
    getColor(gridProp) {
      console.log(toRaw(gridProp));
      console.log(toRaw(this.numberGrid));
      if (gridProp.type == "number") {
        if (this.numberGrid.isNumberRed(gridProp.numbers[0])) {
          return true;
        } else {
          return false;
        }
      } else return false;
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
