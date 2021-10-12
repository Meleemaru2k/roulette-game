<template>
  <div class="row m-3">
    <div class="col-6">
      <div class="alert alert-success" role="alert">
        Money: {{ playerMoney }}
      </div>
    </div>
    <div class="col-6">
      <div class="alert alert-primary" role="alert">
        Highest Amount Won: {{ highestAmountWon }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scoreboard",
  props: {
    msg: String,
  },
  data() {
    return { highestAmountWon: 999, playerMoney: 9999 };
  },
  methods: {},
  computed: {},
};
</script>

<style scoped lang="scss">
</style>
