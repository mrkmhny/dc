<template>
  <div class="room" v-bind:class="{
    'room--ready': ready,
    'room--unready': !ready
    }">
    <ul class="room__players">
      <Player
        v-for="player in players"
        :key="player.id"
        v-bind:player="player"
        class="room__player"
      ></Player>
    </ul>
    <h1>You are in room {{ roomId }}</h1>
    <h3>Waiting for all players...</h3>
    <button v-on:click="ready = !ready">Click when ready</button>
  </div>
</template>

<style lang="scss" scoped>
  .room {
    &--ready {
      background: mediumspringgreen;
    }
    &--unready {
      background: salmon;
    }
    // &__back-home {
    //   margin-left: auto;
    //   margin-right: 0;
    // }
    &__players {
      display: flex;
      width: 100%;
    }
  }
</style>

<script>
import { mapState } from 'vuex';
import Player from '@/components/Player.vue';

export default {
  name: 'room',
  components: {
    Player,
  },
  data: function data() {
    return {
      ready: false,
    };
  },
  computed: {
    ...mapState([
      'roomId',
      'players',
    ]),
  },
  mounted() {
    console.log('players', this.players);
  },
  watch: {
    ready: function onReadyChange(ready) {
      this.$socket.emit('userReady', { ready });
    },
  },
};
</script>

