<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Gamefield />
  <PlayerControls />
</template>

<script>
import Gamefield from "./components/Gamefield.vue";
import PlayerControls from "./components/PlayerControls.vue";

export default {
  name: "App",
  components: {
    Gamefield,
    PlayerControls,
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
  margin-top: 60px;
}
</style>
