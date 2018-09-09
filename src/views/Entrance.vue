<template>
<div class="entrance">
  <div id="dc-logo" class="entrance__logo">[LOGO GOES HERE]</div> <!-- TODO: change to img tag -->
    <form class="entrance__form">
      <input
        v-model="nickname" type="text"
        name="nickname" id="entrance__input--nickname"
        class="entrance__input" placeholder="Enter Your Name"
      >
      <div class="entrance__buttons">
        <button
          id="entrance__button--start" class="entrance__button"
          v-on:click="startGame($event)"
        >
          Start Game
        </button>
        <button
          id="button-join" disabled="disabled"
          class="entrance__button entrance__button--join"
        >
          Join Game
        </button>
      </div>
    </form>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'entrance',
  data: function data() {
    return {
      roomName: '',
      nickname: '',
      loading: '',
    };
  },
  methods: {
    startGame: function startGame(event) {
      event.preventDefault();
      // const roomId = Math.floor((Math.random() * 900) + 100);
      const roomId = 111;
      this.$store.commit('setRoomId', roomId);
      console.log(`Attempting to creating room ${this.roomName}`);
      console.log(`Your name is ${this.nickname}`);
      this.$socket.emit('joinRoom', {
        roomId: this.roomId,
        nickname: this.nickname,
      });
    },
  },
  computed: {
    ...mapState([
      'roomId',
      'players',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .entrance {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    background: #42f1f4;

    &__form {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__input {
      width: 100px;
    }

    &__buttons {
      display: flex;
      flex-direction: column;
    }
    &__button {
      width: 100px;
      margin-top: 10px;
    }
    &:first-of-type {
      margin-top: 0px;
    }
  }
</style>

