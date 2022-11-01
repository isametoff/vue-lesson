<template>
  <form>
    <div class="was-validated">
      <div>
        <input
          type="email"
          autocomplete="email"
          v-model="data.email"
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
        <p class="mt-2 mb-0 text-danger">{{ allAlerts.password }}</p>
      </div>
      <div class="mb-3 mt-3">
        <div>
          <input
            id="pwd"
            type="password"
            autocomplete="current-password"
            v-model="data.password_confirmation"
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
        <button type="button" class="btn btn-primary" @click="trySignUp">
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
        email: '',
        login: '',
        password: '',
        password_confirmation: '',
      },
    };
  },
  computed: {
    ...mapGetters('user', ['allAlerts', 'isAlerts']),
    isReg() {
      return this.isAlerts === false ? true : false;
    },
  },
  methods: {
    ...mapActions('user', ['registration', 'cleanErrors']),
    async trySignUp() {
      let registration = await this.registration({
        email: this.data.email,
        login: this.data.login,
        password: this.data.password,
        password_confirmation: this.data.password_confirmation,
        register: this.isReg,
      });

      if (registration.data) {
        this.data.email = '';
        this.data.login = '';
        this.data.password = '';
        this.data.password_confirmation = '';
        this.$router.push({ name: 'signin' });
      }
    },
  },
  watch: {
    data: {
      handler() {
        this.registration({
          email: this.data.email,
          login: this.data.login,
          password: this.data.password,
          password_confirmation: this.data.password_confirmation,
        });
      },
      deep: true,
    },
  },
};
</script>
