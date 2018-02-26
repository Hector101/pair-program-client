import Vue from 'vue';
import { ApolloClient } from  'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueAppollo from 'vue-apollo';

import Home from './components/Home/Home.component.vue'
import router from './routes';

import store from './store';
import 'vuetify/dist/vuetify.min.css';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

Vue.use(VueAppollo);

const apolloProvider = new VueAppollo({
  defaultClient: apolloClient,
})

const app = new Vue({
  provide: apolloProvider.provide(),
  store,
  router,
  ...Home
});

app.$mount('#app');
