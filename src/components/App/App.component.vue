<template>
  <div class="foo">
    {{ foo }}
    <v-btn
      v-if="authValue == false"
      :to="{path:'login'}"
    >Login</v-btn>
    <v-btn
      :to="{path:'/dashboard'}"
    >Dashboard</v-btn>
  </div>
</template>

<script>
  import { isAuthenticated } from '../../api/login.api';

  export default {
    data() {
      return {
        foo: 'Hello World!!!',
        authValue: null,
      }
    },
    created() {
      this.authenticate();
    },
    computed: {
    },
    methods: {
      authenticate: async function() {
        this.authValue = await isAuthenticated();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'App';
</style>
