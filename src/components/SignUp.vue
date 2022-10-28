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
      <div
        v-if="allAlerts.email && data.email.length == data.email.length"
        class="mt-2 mb-0 text-danger"
      >
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
    ...mapGetters('user', ['allAlerts']),
  },
  methods: {
    ...mapActions('user', ['registration', 'cleanAlerts']),
    async trySignUp() {
      let registration = await this.registration({
        email: this.data.email,
        login: this.data.login,
        password: this.data.password,
        password_confirmation: this.data.password_confirmation,
      });
      console.log(
        '🚀 ~ file: SignUp.vue ~ line 90 ~ trySignUp ~ data.email',
        this.data.email.length
      );

      if (registration.res) {
        this.data.email = '';
        this.data.login = '';
        this.data.password = '';
        this.data.password_confirmation = '';
        this.$router.push({ name: 'signin' });
      }
    },
  },
  watch: {},
};
</script>
