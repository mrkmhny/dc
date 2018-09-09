<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  * {
    margin: 0;
    box-sizing: border-box;
  }

  #app {
    min-height: 100vh;
    // & > div {
    //   min-height: 100vh;
    // }
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>

<script>
import io from 'socket.io-client';
export default {
  name: 'app',
  sockets: {
    connect: function() {
      console.log('Connected to socket.io');
      // TODO: Save socket id in store to identify which socket is you.
    },
    selfJoinedRoom: function(res) {
      console.log(res.msg);
      this.$router.push({name: 'room', params: { roomId: res.roomId }})
    },
    playerJoinedRoom: function(res) {
      console.log('playerJoinedRoom', res);
      this.$store.commit('setPlayers', res.roomPlayers);
    },
    playerLeftRoom: function userLeftRoom(res) {
      console.log(res.msg);
    }
  },
}
</script>

