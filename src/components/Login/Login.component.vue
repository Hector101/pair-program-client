<template>
  <div class="login-page">
    <div class="login-page-overlay">
      <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError"
      >
      <span class="google-icon">
        <i class="fa fa-google fa-lg" aria-hidden="true"></i>
      </span>
      <span class="login-text">Sign in with Google</span>
      </g-signin-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import GSignInButton from 'vue-google-signin-button';
  Vue.use(GSignInButton);

  export default {
    data() {
      return {
        googleSignInParams: {
          client_id: process.env.CLIENT_ID,
        },
      }
    },
    computed: {
    },
    methods: {
      onSignInSuccess (googleUser) {
        const profile = googleUser.getBasicProfile();
        const id_token = googleUser.Zi.id_token;
        localStorage.setItem('userProfile', JSON.stringify(profile));
        localStorage.setItem('token', id_token);
        this.$router.push({path: 'dashboard'});
      },
      onSignInError (error) {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('token');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'Login';
</style>
