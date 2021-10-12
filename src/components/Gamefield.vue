<template>
  <div>
    <div class="rouletteTableBg">
      <div class="rouletteBall"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameField",
  props: {
    msg: String,
    numberRange: Array,
  },
  data() {
    return {};
  },
  methods: {
    playRound() {},
    calculateReward(roundResult, roundBet) {
      console.log(roundResult, roundBet);
    },
  },
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$roulette-size: 250px;
$ball-size: 15px;
.rouletteTableBg {
  position: relative;
  width: $roulette-size;
  height: $roulette-size;
  border-radius: 100%;
  background: rgb(129, 82, 82);
  background: radial-gradient(
    circle,
    rgba(129, 82, 82, 1) 0%,
    rgba(47, 13, 13, 1) 93%,
    rgba(61, 23, 23, 1) 96%,
    rgba(68, 29, 29, 1) 96%,
    rgba(85, 47, 47, 1) 97%,
    rgba(43, 16, 16, 1) 100%
  );
}
.rouletteBall {
  position: absolute;
  top: $roulette-size - $roulette-size/2 - $ball-size/2;
  left: $roulette-size - $roulette-size/2 - $ball-size/2;
  width: $ball-size;
  height: $ball-size;
  border-radius: 100%;
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(114, 128, 135, 1) 75%,
    rgba(0, 0, 0, 1) 100%
  );
}
</style>
