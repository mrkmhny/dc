<template>
  <li class="player">{{ player.nickname }}</li>
</template>

<script>
export default {
  name: 'Player',
  props:
    {
      player: {
        type: Object,
        required: true,
      },
    },
  mounted() {
    console.log('this.player', this.player);
  }
};
</script>


<style lang="scss" scoped>
  .player {
    width: 50px;
    height: 50px;
    border: 1px solid blue;
    border-radius: 5px;
  }
</style>

