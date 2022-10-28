import * as regApi from '@/api/registration.js';
import * as authApi from '@/api/auth.js';

export default {
  namespaced: true,
  state: {
    user: null,
    errors: [],
  },
  getters: {
    isLogin: (state) => state.user !== null,
    allAlerts: (state) => state.errors,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    cleanErrors(state) {
      state.errors = [];
    },
    addAlerts(state, { email, login, password, password_confirmation }) {
      state.errors = {
        email: email[0] ?? email,
        login: login[0] ?? login,
        password: password[0] ?? password,
        password_confirmation:
          password_confirmation[0] ?? password_confirmation,
        // email: email,
        // login: login,
        // password: password,
        // password_confirmation: password_confirmation,
      };
    },
  },
  actions: {
    async registration(
      { state, commit },
      { email, login, password, password_confirmation }
    ) {
      let data = await regApi.registration({
        email:email,
        login:login,
        password:password,
        password_confirmation:password_confirmation}
      );
      console.log("🚀 ~ file: user.js ~ line 46 ~ data", data)
      if (data.data.res === true || data.data.data === true) {
        commit('cleanErrors');
      }
      return data;
    },
    async auth({ state }, { login, password }) {
      let data = await authApi.auth(login, password);
      console.log('🚀 ~ file: user.js ~ line 52 ~ auth ~ data', data);
      if (data.data.res === true) {
        commit('cleanErrors');
      }
      return data;
    },
    cleanErrors({ commit }) {
      commit('cleanErrors');
    },
    addAlerts(
      { commit, getters, state },
      { email, login, password, password_confirmation }
    ) {
      commit('addAlerts', {
        email,
        login,
        password,
        password_confirmation,
      });
    },
  },
};
