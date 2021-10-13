<template>
  <div class="row m-3">
    <div class="col-6">
      <div class="alert alert-success" role="alert">
        Money: {{ playerMoney }} $
      </div>
    </div>
    <div class="col-6">
      <div class="alert alert-primary" role="alert">
        Highest Amount Won: {{ highestAmountWon }} $
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scoreboard",
  props: {
    msg: String,
    highestAmountWon: Number,
    playerMoney: Number,
    currentBet: Object,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    getCurrentBet() {
      if (this.currentBet == undefined) {
        return "a whole lot of nothing.";
      } else {
        return this.currentBet;
      }
    },
  },
};
</script>

<style scoped lang="scss">
//
</style>
