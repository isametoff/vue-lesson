<template>
  <form>
    <div class="was-validated">
      <div>
        <input
          type="email"
          autocomplete="email"
          v-model="regData.email"
          placeholder="Email"
        />
      </div>
      <div v-if="allAlerts.email" class="mt-2 mb-0 text-danger">
        {{ allAlerts.email }}
      </div>
      <div>
        <input
          type="text"
          autocomplete="username"
          v-model="regData.login"
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
          v-model="regData.password"
          placeholder="Password"
        />
      </div>
      <div v-if="allAlerts.password">
        <p class="mt-2 mb-0 text-danger">{{ allAlerts.password }}</p>
      </div>
      <div class="mb-3 mt-3">
        <div>
          <input
            id="pwd"
            type="password"
            autocomplete="current-password"
            v-model="regData.password_confirmation"
            placeholder="Password confirm"
          />
        </div>
        <div v-if="allAlerts.password_confirmation">
          <p class="mb-0 text-danger">
            {{ allAlerts.password_confirmation }}
          </p>
        </div>
      </div>
      <div>
        <button type="button" class="btn btn-primary" @click="trySignup">
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
  data() {
    return {
      regData: {
        email: '',
        login: '',
        password: '',
        password_confirmation: '',
      },
    };
  },
  computed: {
    ...mapGetters('user', ['allAlerts']),
  },
  methods: {
    ...mapActions('user', ['registration']),
    async trySignup() {
      let registration = await this.registration({
        email: this.regData.email,
        login: this.regData.login,
        password: this.regData.password,
        password_confirmation: this.regData.password_confirmation,
      });
      if (registration.res) {
        this.regData.email = '';
        this.regData.login = '';
        this.regData.password = '';
      }
    },
  },
};
</script>
