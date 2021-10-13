<template>
  <div class="container">
    <Scoreboard
      :highest-amount-won="playerStats.highestWin"
      :player-money="playerStats.money"
      :current-bet="currentBet"
    />
    <div class="row">
      <div class="bg-light col-12 col-lg-12 p-3 mb-3 rounded row mx-auto">
        <Gamefield :number-min-max="numberMinMax" />
      </div>
      <div class="bg-dark col-12 col-lg-12 p-3 rounded row mx-auto">
        <PlayerControls :number-grid="gamefieldGrid" />
      </div>
    </div>
  </div>
</template>

<script>
import Scoreboard from "./components/Scoreboard.vue";
import Gamefield from "./components/Gamefield.vue";
import PlayerControls from "./components/PlayerControls.vue";
//import { toRaw } from "vue";
import gameGrid from "./classes/rouletteGrid";
import EventBus from "./eventBus";

export default {
  name: "App",
  components: {
    Gamefield,
    PlayerControls,
    Scoreboard,
  },
  data() {
    return {
      gamefieldGrid: new gameGrid(),
      betWinRatios: new Map(),
      playerStats: { highestWin: 999, money: 9999, lastBet: 0, lastWin: 0 },
      currentBet: undefined,
      currentResult: undefined,
      isRolling: false,
    };
  },
  mounted() {
    this.setBetWinPayouts();
    EventBus.on("rollFinished", (result) => {
      console.log(result);
    });
  },
  methods: {
    setHighscore(amountWon) {
      if (amountWon > this.playerStats.highestWin) {
        this.playerStats.highestWin = amountWon;
      }
    },
    setMoney(amountWon) {
      this.playerStats.money += amountWon;
    },
    calculateReward(roundResult = Number, roundBet) {
      console.log(roundResult, roundBet);
    },
    checkIfWin: {
      straightUp(roundResult, roundBet) {
        console.log(roundResult, roundBet);
      },
    },
    setBetWinPayouts() {
      this.betWinRatios.set("straightUp", "35");
      this.betWinRatios.set("color", "1");
      this.betWinRatios.set("evenOrOdd", "1");
      this.betWinRatios.set("half", "1");
      this.betWinRatios.set("third", "2");
      this.betWinRatios.set("col", "2");
      this.betWinRatios.set("street", "11");
      this.betWinRatios.set("doubleStreet", "5");
      this.betWinRatios.set("split", "17");
      this.betWinRatios.set("corner", "8");
      this.betWinRatios.set("none", "0");
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
