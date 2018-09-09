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
  ul {
    list-style: none;
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
export default {
  name: 'app',
  sockets: {
    connect: function onConnect() {
      console.log('Connected to socket.io');
      // TODO: Save socket id in store to identify which socket is you.
    },
    customError: function onCustomError(err) {
      console.error(err.msg);
    },
    selfJoinedRoom: function onSelfJoinedRoom(res) {
      console.log(res.msg);
      this.$router.push({ name: 'room', params: { roomId: res.roomId } });
      this.$store.commit('setPlayers', res.players);
    },
    playerJoinedRoom: function onPlayerJoinedRoom(res) {
      console.log('playerJoinedRoom', res.msg);
      this.$store.commit('setPlayers', res.players);
    },
    playerLeftRoom: function onPlayerLeftRoom(res) {
      console.log(res.msg);
    },
  },
};
</script>

