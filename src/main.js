import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';
import VueSocketio from 'vue-socket.io';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

const socket = io.connect('http://localhost:3000');
Vue.use(VueSocketio, socket);
Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
