import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: {
    roomId: '',
    players: [],
  },
  mutations: {
    setRoomId(state, updatedRoomId) {
      state.roomId = updatedRoomId;
    },
    setPlayers(state, updatedPlayers) {
      state.players = updatedPlayers;
      console.log('state.players', state.players);
    },
  },
  actions: {

  },
});
