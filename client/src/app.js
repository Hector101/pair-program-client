import Vue from 'vue';

import Home from './components/Home/Home.component.vue'
import router from './routes';
import config from '../../server/config';

import store from './store';
import 'vuetify/dist/vuetify.min.css';

const app = new Vue({
  store,
  router,
  ...Home
});

app.$mount('#app');
