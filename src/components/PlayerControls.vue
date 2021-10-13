<template>
  <div class="row">
    <!--Number Buttons-->
    <div class="col-12 col-sm-12 col-lg-12">
      <button class="btn btn-success numZeroBtn mx-auto mb-3">0</button>
      <div
        v-for="(row, index) in numberGrid"
        :key="index"
        class="col-12 my-2 mx-1"
      >
        <button
          v-for="(number, index) in row"
          :key="index"
          class="btn btn-light numBtn me-2 my-1"
        >
          {{ number }}
        </button>
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
export default {
  name: "PlayerControls",
  props: {
    msg: String,
    numberGrid: Array,
    playerMoney: { type: Number, default: 999 },
  },
  data() {
    return {
      amountBet: 0,
    };
  },
  methods: {},
  computed: {},
};
</script>

<style scoped lang="scss">
.numBtn {
  min-width: 50px;
}
.numZeroBtn {
  width: 140px;
}
.colorBtn {
  width: 80px;
}
</style>
