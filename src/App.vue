<template>
  <div class="container">
    <Scoreboard />
    <div class="row">
      <div class="bg-dark col-12 col-lg-6 p-3 rounded row mx-0">
        <PlayerControls :number-grid="numberGrid" />
      </div>
      <div class="bg-light col-12 col-lg-6 p-3 rounded row mx-0">
        <Gamefield :number-min-max="numberMinMax" />
      </div>
    </div>
  </div>
</template>

<script>
import Scoreboard from "./components/Scoreboard.vue";
import Gamefield from "./components/Gamefield.vue";
import PlayerControls from "./components/PlayerControls.vue";
import { toRaw } from "vue";

export default {
  name: "App",
  components: {
    Gamefield,
    PlayerControls,
    Scoreboard,
  },
  mounted() {
    this.numberGrid = this.setNumberGrid();
    console.log(toRaw(this.numberGrid));
  },
  data() {
    return {
      numberMinMax: [0, 36],
      incrementNumberInterval: 3,
      numberGrid: [],
    };
  },
  methods: {
    setNumberGrid() {
      let grid = [];
      let columns = this.numberMinMax[1] / this.incrementNumberInterval;

      for (let iCol = 0; iCol < columns; iCol++) {
        grid[iCol] = [];
        let colNumStart = 1 + iCol * 3;
        let colNumEnd = colNumStart + 3;

        for (let iNum = colNumStart; iNum < colNumEnd; iNum++) {
          grid[iCol].push(iNum);
        }
      }

      return grid;
    },
    setHighscore(amountWon) {
      console.log(amountWon);
    },
    setMoney(amountWon) {
      console.log(amountWon);
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
