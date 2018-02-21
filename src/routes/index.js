import Vue from 'vue';
import vueRouter from 'vue-router';
import Vuetify from 'vuetify';

// Components
const App = () => import(/* webpackChunkName: "appConponent" */ '../components/App/App.component');
const Login = () =>   import(/* webpackChunkName: "loginComponent" */ '../components/Login/Login.component');
const Dashboard = () => import(/* webpackChunkName: "dashboardComponent" */ '../components/Dashboard/Dashboard');

// Check authentication status
import { isAuthenticated } from '../api/login.api';


Vue.use(vueRouter);
Vue.use(Vuetify);

const routes = [
  {
    path: '/',
    name: 'app',
    component: App,
  },
  {
    path: '/login', name: 'login', component: Login,
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {requiresAuth: true },
    beforeEnter: async function(to, from, next) {
      if(to.matched.some(record => record.meta.requiresAuth)) {
        const auth = await isAuthenticated();
        if (!auth) {
          next({
            path: '/login',
          });
        } else {
          next();
        }
      } else {
        next();
      }
    }
  },
  {
    path: '*',
    redirect: {name: 'app'},
  }
];

const router = new vueRouter({
  mode: 'history',
  routes,
})

export default router;
