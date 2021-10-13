<template>
  <div class="row m-1">
    <div class="col-6">
      <div class="alert alert-success p-2 m-1" role="alert">
        Money: {{ playerMoney }} $
      </div>
    </div>
    <div class="col-6">
      <div class="alert alert-primary p-2 m-1" role="alert">
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
