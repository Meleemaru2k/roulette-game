<template>
  <div class="container">
    <Scoreboard
      :highest-amount-won="playerStats.highestWin"
      :player-money="playerStats.money"
      :current-bet="currentBet"
    />
    <div class="row">
      <div class="bg-light col-12 col-lg-12 p-3 mb-3 rounded row mx-auto">
        <Gamefield />
      </div>
      <div class="bg-dark col-12 col-lg-12 p-3 rounded row mx-auto">
        <PlayerControls
          :number-grid="gamefieldGrid"
          :player-money="playerStats.money"
        />
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
      playerStats: { highestWin: 0, money: 1000, lastBet: 0, lastWin: 0 },
      currentBet: undefined,
      currentAmountBet: 0,
      currentResult: undefined,
      isRolling: false,
    };
  },
  mounted() {
    this.setBetWinPayouts();
    EventBus.on("roundStart", (e) => {
      this.currentBet = e.betData;
      this.currentAmountBet = e.amountBet;
      this.playerStats.money -= e.amountBet;
      this.playerStats.money =
        this.playerStats.money < 10 ? 10 : this.playerStats.money;
    });
    EventBus.on("rollFinished", (result) => {
      console.log("Roll-Result is: " + result);
      console.log("Roll-Bet was: ");
      console.log(this.currentBet.numbers);
      console.log("Money bet was: " + this.currentAmountBet);
      this.calculateReward(result, this.currentBet);
    });
  },
  methods: {
    setHighscore(amountWon) {
      if (amountWon > this.playerStats.highestWin) {
        this.playerStats.highestWin = amountWon;
      }
      return this.playerStats.highestWin;
    },
    setReward(multiplier) {
      let amountWon = parseInt(this.currentAmountBet) * multiplier;
      console.log("Amount won: " + amountWon);
      this.playerStats.money += amountWon;
      this.setHighscore(amountWon);
      this.currentAmountBet = 0;
      this.currentBet = undefined;
      return this.playerStats.money;
    },
    calculateReward(roundResult, roundBet) {
      let betType = roundBet.type;
      console.log("Bet-Type was: " + betType);
      let isWin = this.isWin(roundResult, roundBet);
      console.log("Is it a win? " + isWin);
      let winRatio = 0;
      //var result;
      //use ternary operator for better readablity
      switch (betType) {
        case "number":
          if (isWin) {
            winRatio = this.betWinRatios.get("number");
          }
          break;
        case "corner":
          if (isWin) {
            winRatio = this.betWinRatios.get("corner");
          }
          break;
        case "split":
          if (isWin) {
            winRatio = this.betWinRatios.get("split");
          }
          break;
        case "street":
          if (isWin) {
            winRatio = this.betWinRatios.get("street");
          }
          break;
        case "doubleStreet":
          if (isWin) {
            winRatio = this.betWinRatios.get("doubleStreet");
          }
          break;
        case "color":
          if (isWin) {
            winRatio = this.betWinRatios.get("color");
          }
          break;
        case "odd":
          if (isWin) {
            winRatio = this.betWinRatios.get("oddEven");
          }
          break;
        case "even":
          if (isWin) {
            winRatio = this.betWinRatios.get("oddEven");
          }
          break;
        case "half_a":
          if (isWin) {
            winRatio = this.betWinRatios.get("half");
          }
          break;
        case "half_b":
          if (isWin) {
            winRatio = this.betWinRatios.get("half");
          }
          break;
        case "third_a":
          if (isWin) {
            winRatio = this.betWinRatios.get("third");
          }
          break;
        case "third_b":
          if (isWin) {
            winRatio = this.betWinRatios.get("third");
          }
          break;
        case "third_c":
          if (isWin) {
            winRatio = this.betWinRatios.get("third");
          }
          break;
        case "col_a":
          if (isWin) {
            winRatio = this.betWinRatios.get("col");
          }
          break;
        case "col_b":
          if (isWin) {
            winRatio = this.betWinRatios.get("col");
          }
          break;
        case "col_c":
          if (isWin) {
            winRatio = this.betWinRatios.get("col");
          }
          break;
        //If default => Lose => No reward
        default:
          winRatio = 0;
          break;
      }
      console.log("Win-Ratio is: " + winRatio);
      this.setReward(winRatio);
    },
    isWin(roundResult, roundBet) {
      return roundBet.isNumberIn(roundResult);
    },
    setBetWinPayouts() {
      this.betWinRatios.set("number", 35);
      this.betWinRatios.set("color", 1);
      this.betWinRatios.set("oddEven", 1);
      this.betWinRatios.set("half", 1);
      this.betWinRatios.set("third", 2);
      this.betWinRatios.set("col", 2);
      this.betWinRatios.set("street", 11);
      this.betWinRatios.set("doubleStreet", 5);
      this.betWinRatios.set("split", 17);
      this.betWinRatios.set("corner", 8);
      this.betWinRatios.set("none", 0);
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
