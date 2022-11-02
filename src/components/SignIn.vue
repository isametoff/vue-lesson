<template>
  <form>
    <div class="was-validated">
      <div>
        <input
          type="text"
          autocomplete="username"
          v-model="data.login"
          placeholder="Login"
        />
      </div>
      <div v-if="allAlerts.login">
        <p class="mt-2 mb-0 text-danger">{{ allAlerts.login }}</p>
      </div>
      <div>
        <input
          type="password"
          autocomplete="password"
          v-model="data.password"
          placeholder="Password"
        />
      </div>
      <div v-if="allAlerts.password">
        <p class="mt-2 mb-1 text-danger">{{ allAlerts.password }}</p>
      </div>
      <div v-if="allAlerts.error">
        <p class="mt-2 mb-1 text-danger">{{ allAlerts.error }}</p>
      </div>
      <div>
        <button type="button" class="btn btn-primary" @click="trySignIn">
          Sign Up
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {},
  mounted() {
    this.cleanErrors();
  },
  data() {
    return {
      data: {
        login: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapGetters('user', [
      'allAlerts',
      'isErrors',
      'isAlertsLogin',
      'isAlertsPassword',
    ]),
    isAuth() {
      return this.isAlertsLogin === true && this.isAlertsPassword === true
        ? false
        : true;
    },
  },
  methods: {
    ...mapActions('user', ['auth', 'cleanErrors']),
    async trySignIn() {
      let auth = await this.auth({
        login: this.data.login,
        password: this.data.password,
        isAuth: this.isAuth,
      });
      if (auth.data === true) {
        this.data.login = '';
        this.data.password = '';
        this.$router.push({ name: 'catalog' });
      }
    },
  },
  watch: {
    data: {
      handler() {
        this.auth({
          login: this.data.login,
          password: this.data.password,
        });
      },
      deep: true,
    },
  },
};
</script>
