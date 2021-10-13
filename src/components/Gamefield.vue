<template>
  <div>
    <!-- <div class="rouletteTableBg">
      <div class="rouletteBall"></div>
    </div> -->
    <button type="button" class="btn btn-primary btn-lg rouletteBtn">
      {{ rollResult }}
    </button>
  </div>
</template>

<script>
//import Vue from "vue";
import EventBus from "../eventBus";
export default {
  name: "GameField",
  props: {
    msg: String,
    numberRange: Array,
  },
  data() {
    return {
      numberResult: 0,
      rollResult: 0,
      isRolling: false,
    };
  },
  mounted() {
    EventBus.on("roundStart", (betData) => {
      console.log(betData);
      this.playRound();
    });
    EventBus.on("roundFinished", () => {
      (this.numberResult = 0), (this.rollResult = 0);
    });
  },
  methods: {
    async playRound() {
      this.isRolling = true;
      for (var t = 50; t != 0; t--) {
        let timeOut = -t + 30 * 3;
        await this.sleep(timeOut).then(() => this.rollNumber());
      }
      EventBus.emit("rollFinished", this.rollResult);
      this.isRolling = false;
    },
    rollNumber() {
      var rngNum = Math.floor(Math.random() * 37);
      console.log(rngNum);
      this.rollResult = rngNum;
    },
    //TODO: Make this an importable script
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.rouletteBtn {
  border-radius: 0px;
  width: 100px;
}
//Unused
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
