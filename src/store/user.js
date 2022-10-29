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
        email: email,
        login: login,
        password: password,
        password_confirmation: password_confirmation,
      };
    },
  },
  actions: {
    async registration(
      { state, commit, getters },
      { email, login, password, password_confirmation }
    ) {
      let { res, data } = await regApi.registration({
        email: email,
        login: login,
        password: password,
        password_confirmation: password_confirmation,
      });

      if (res === true) {
        commit('cleanErrors');
      } else {
        let { email, login, password, password_confirmation } = data;
        email = email ? email[0] : '';
        login = login ? login[0] : '';
        password = password ? password[0] : '';
        password_confirmation = password_confirmation
          ? password_confirmation[0]
          : '';
        commit('addAlerts', {
          email,
          login,
          password,
          password_confirmation,
        });
      }
      return data;
    },
    async auth({ state, commit }, { login, password }) {
      let { res, data } = await authApi.auth({
        login: login,
        password: password,
      });

      if (res === true) {
        commit('cleanErrors');
      } else {
        let { login, password } = data;
        login = login ? login[0] : '';
        password = password ? password[0] : '';
        commit('addAlerts', {
          password,
          login,
        });
      }
      return data;
    },
    cleanErrors({ commit }) {
      commit('cleanErrors');
    },
  },
};
